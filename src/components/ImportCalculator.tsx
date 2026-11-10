import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type BusinessCard } from "@/lib/api";
import { gaEvent, trackCtaClick } from "@/lib/track";
import { loadShard, loadSearch, searchHts, type SearchHit } from "@/lib/tariff-client";
import {
  META, COUNTRIES, INCOTERMS, VALID_FROM, VALID_THROUGH, SECTION_232_NOTES, FEES,
  chapterOf, digitsOf, formatCode, findLeaves, lineInfo, overlaysFor, computeDuty, entryFees, customsValue,
  landedCost, bandCheck, type Shard, type Claims, type Need, type DutyResult,
} from "@/data/tariff.mjs";
import { PRESETS, presetById, type TariffPreset } from "@/data/tariff-presets.mjs";
import { dateLabel, CROSS_URL, FBA_CALCULATOR_PATH, LANDED_PATH, CALCULATOR_PATH } from "@/data/tariff-calculator-page.mjs";
import { businessPath } from "@/data/site";

/**
 * The calculator behind /tools/tariff-calculator/ and
 * /tools/landed-cost-calculator/. One component, one engine
 * (data/tariff.mjs): the landed-cost page is the tariff calculator plus
 * freight, insurance, the broker and the trip to Amazon.
 *
 * Client-side only: nothing is sent anywhere. The HTS arrives one chapter at
 * a time (lib/tariff-client.ts); a search by words loads the description index
 * on the first search.
 */

export type Variant = "tariff" | "landed";
type Published = Pick<BusinessCard, "slug" | "name" | "snapshotMonth">;

type Fields = {
  units: string; price: string; incoterm: string; included: string;
  assistTotal: string; assistUnits: string; weightKg: string;
  freight: string; insurance: string; broker: string; inbound: string; other: string;
};

const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[$,%\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const opt = (s: string) => (Number.isFinite(num(s)) && num(s) > 0 ? num(s) : 0);
const trim = (n: number, dp = 2) => String(Math.round(n * 10 ** dp) / 10 ** dp);
const usd = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;
const usd4 = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : Math.abs(n) < 1 && n !== 0 ? `$${n.toFixed(3)}` : usd(n);
const usdShip = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "—" : `${trim(n)}%`);

const clampDate = (iso: string) => (iso < VALID_FROM ? VALID_FROM : iso > VALID_THROUGH ? VALID_THROUGH : iso);
const TODAY = new Date().toISOString().slice(0, 10);
const EXPIRED = TODAY > VALID_THROUGH;

const BLANK: Fields = {
  units: "1000", price: "", incoterm: "FOB", included: "0", assistTotal: "", assistUnits: "",
  weightKg: "", freight: "", insurance: "", broker: "150", inbound: "0.25", other: "",
};

function fieldsFor(p: TariffPreset, variant: Variant, units = 1000): Fields {
  return {
    ...BLANK,
    units: String(units),
    price: trim(p.price),
    assistTotal: p.assist ? String(p.assist.total) : "",
    assistUnits: p.assist ? String(p.assist.units) : "",
    freight: variant === "landed" ? trim(p.freightPerUnit * units) : "",
    insurance: variant === "landed" ? trim(p.price * units * 0.005) : "",
  };
}

/** Published businesses (slug → name): inlined by the prerender on a landing,
 *  fetched on a client-side navigation. Null until known. */
export function usePublished(initial: Published[] | null): Map<string, Published> | null {
  const [list, setList] = useState<Published[] | null>(initial);
  useEffect(() => {
    if (list) return;
    let live = true;
    apiFetch<{ businesses: BusinessCard[] }>("/v1/businesses?limit=100")
      .then((r) => live && setList(r.businesses))
      .catch(() => live && setList([]));
    return () => { live = false; };
  }, [list]);
  return useMemo(() => (list ? new Map(list.map((b) => [b.slug, b])) : null), [list]);
}

export function ImportCalculator({ variant, published, defaultPreset }: {
  variant: Variant; published: Map<string, Published> | null; defaultPreset: string;
}) {
  const tool = variant === "tariff" ? "tariff_calculator" : "landed_cost_calculator";
  const start = presetById(defaultPreset) ?? PRESETS[0];

  const [presetId, setPresetId] = useState(start.id);
  const [code, setCode] = useState<string>(start.code);
  const [query, setQuery] = useState(formatCode(start.code));
  const [country, setCountry] = useState(start.country);
  const [date, setDate] = useState(clampDate(TODAY));
  const [mode, setMode] = useState("ocean");
  const [f, setF] = useState<Fields>(() => fieldsFor(start, variant, variant === "landed" ? 2000 : 1000));
  const [claims, setClaims] = useState<Claims>(start.claims ?? {});

  /* One "calculator_use" per page view, on the first edit. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool });
  };
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { touch(); setF((x) => ({ ...x, [k]: v })); };

  /* ── The chapter the chosen code is in ──────────────────────────────── */
  const [shard, setShard] = useState<Shard | null>(null);
  const [shardErr, setShardErr] = useState<string | null>(null);
  useEffect(() => {
    if (!code) return;
    let live = true;
    const ch = chapterOf(code);
    if (shard?.ch === ch) return;
    setShardErr(null);
    loadShard(ch).then((s) => live && setShard(s)).catch((e) => live && setShardErr(String(e.message ?? e)));
    return () => { live = false; };
  }, [code, shard?.ch]);

  /* ── Search: a code by its digits, or words through the index ──────── */
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [partial, setPartial] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    let live = true;
    const isCode = /^[\d.\s]+$/.test(q);
    if (isCode) {
      const d = digitsOf(q);
      if (d.length < 4) { setHits(null); return; }
      setSearching(true);
      setPartial(false);
      loadShard(chapterOf(d))
        .then((s) => {
          if (!live) return;
          setHits(findLeaves(s, d).slice(0, 60).map((r) => {
            const l = lineInfo(s, r.d);
            return { d: r.d, desc: r.desc, path: l ? l.chain.slice(0, -1).slice(-3).join(" › ") : "" };
          }));
        })
        .catch(() => live && setHits([]))
        .finally(() => live && setSearching(false));
    } else if (q.length >= 3) {
      setSearching(true);
      const t = setTimeout(() => {
        loadSearch()
          .then((idx) => { if (!live) return; const r = searchHts(idx, q); setHits(r.hits); setPartial(r.partial); })
          .catch(() => live && setHits([]))
          .finally(() => live && setSearching(false));
      }, 150);
      return () => { live = false; clearTimeout(t); };
    } else {
      setHits(null);
    }
    return () => { live = false; };
  }, [query, open]);

  const pick = (d: string) => {
    touch();
    setCode(d);
    setQuery(formatCode(d));
    setOpen(false);
    setClaims({});
    setPresetId("");
    gaEvent("calculator_classify", { tool, hts: formatCode(d) });
  };

  const loadPreset = (id: string) => {
    const p = presetById(id);
    setPresetId(id);
    if (!p) return;
    touch();
    gaEvent("calculator_preset", { tool, business_slug: p.slug, preset: p.id });
    setCode(p.code);
    setQuery(formatCode(p.code));
    setCountry(p.country);
    setClaims(p.claims ?? {});
    setF((x) => ({ ...fieldsFor(p, variant, num(x.units) > 0 ? num(x.units) : 1000), broker: x.broker, inbound: x.inbound }));
  };

  /* ── The arithmetic ────────────────────────────────────────────────── */
  const units = num(f.units) > 0 ? Math.round(num(f.units)) : 0;
  const price = num(f.price);
  const term = INCOTERMS.find((t) => t.id === f.incoterm) ?? INCOTERMS[1];
  const line = useMemo(() => (shard && shard.ch === chapterOf(code) ? lineInfo(shard, code) : null), [shard, code]);
  const ov = useMemo(() => (shard && line ? overlaysFor(shard, line.code) : null), [shard, line]);
  const cv = customsValue({
    price: price > 0 ? price : 0, incoterm: term.id, includedPerUnit: units > 0 ? opt(f.included) / units : 0,
    assistTotal: opt(f.assistTotal), assistUnits: opt(f.assistUnits),
  });
  const weightKg = opt(f.weightKg);
  const ready = !!(line && ov && units > 0 && price > 0);
  const result: DutyResult | null = useMemo(() => {
    if (!ready || !line || !ov) return null;
    return computeDuty({ line, ov, countryId: country, date, unitValue: cv.unitValue, units, weightKg, claims });
  }, [ready, line, ov, country, date, cv.unitValue, units, weightKg, claims]);
  const value = cv.unitValue * units;
  const fees = entryFees(value, mode);
  const landed = result && variant === "landed"
    ? landedCost({
      price, units, incoterm: term.id, freight: opt(f.freight), insurance: opt(f.insurance), duty: result.duty ?? 0,
      fees: fees.total, broker: opt(f.broker), assistTotal: opt(f.assistTotal), assistUnits: opt(f.assistUnits),
      inbound: opt(f.inbound), other: opt(f.other),
    })
    : null;
  const needsWeight = !!line && line.general.specific.some((s) => s.per === "kg");
  const band = line && price > 0 ? bandCheck(line.bands, cv.unitValue, weightKg) : null;
  const preset = presetById(presetId);
  const presets = published ? PRESETS.filter((p) => published.has(p.slug)) : [];
  const nameOf = (slug: string) => published?.get(slug)?.name ?? slug;

  const exclusionNeeds = (result?.needs ?? []).filter((n): n is Extract<Need, { kind: "exclusion" }> => typeof n === "object" && n.kind === "exclusion");
  const n52Needs = (result?.needs ?? []).filter((n): n is Extract<Need, { kind: "n52" }> => typeof n === "object" && n.kind === "n52");
  const s232 = (result?.flags ?? []).some((x) => SECTION_232_NOTES.has(x.note));
  const toggle = (kind: "exclusion" | "n52", id: string, on: boolean) => {
    touch();
    setClaims((c) => ({ ...c, [kind]: { ...(c[kind] ?? {}), [id]: on } }));
  };

  const handoff = landed
    ? `${FBA_CALCULATOR_PATH}?cost=${trim(landed.perUnit - opt(f.inbound))}&inbound=${trim(opt(f.inbound))}`
    : result && result.duty != null && price > 0 && units > 0
      ? `${FBA_CALCULATOR_PATH}?cost=${trim(price + result.duty / units + fees.total / units)}`
      : FBA_CALCULATOR_PATH;

  return (
    <div data-fba-grid>
      {/* ── Inputs ─────────────────────────────────────────────────── */}
      <form data-fba-card data-fba-inputs onSubmit={(e) => e.preventDefault()} aria-label="Your product and shipment">
        <h2 data-fba-card-title>Product</h2>
        <label data-fba-field>
          <span>Load a real product</span>
          <select data-select value={presetId} disabled={!presets.length} onChange={(e) => loadPreset(e.target.value)}>
            <option value="">{published ? "Choose a product…" : "Loading…"}</option>
            {presets.map((p) => <option key={p.id} value={p.id}>{nameOf(p.slug)}: {p.product}</option>)}
          </select>
        </label>
        {preset && published?.has(preset.slug) && (
          <p data-roas-hint>
            {preset.basis} <Link to={businessPath(preset.slug)}>{nameOf(preset.slug)}'s case study</Link>.
          </p>
        )}

        <div data-fba-field data-tariff-search>
          <label htmlFor={`hts-${variant}`}><span>HTS code or product description</span></label>
          <input
            id={`hts-${variant}`} data-input value={query} autoComplete="off" spellCheck={false}
            placeholder="e.g. 3924.10 or silicone spatula"
            role="combobox" aria-expanded={open && !!hits?.length} aria-controls={`hts-${variant}-list`}
            onFocus={() => setOpen(true)}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          />
          {open && (searching || hits) && (
            <div data-tariff-hits id={`hts-${variant}-list`} role="listbox">
              {searching && !hits?.length ? <p data-tariff-hint>Searching the schedule…</p> : null}
              {hits && !hits.length && !searching ? <p data-tariff-hint>No line matches. Try fewer or simpler words, or the first 4 to 6 digits of the code.</p> : null}
              {hits?.length && partial ? <p data-tariff-hint>No line has every word. The schedule names materials and uses rather than products ("kitchenware, of plastics", not "spatula"), so these match some of them.</p> : null}
              {hits?.map((h) => (
                <button type="button" role="option" aria-selected={h.d === code} key={h.d} onClick={() => pick(h.d)}>
                  <strong>{formatCode(h.d)}</strong> {h.desc}
                  {h.path && <span>{h.path}</span>}
                </button>
              ))}
              <button type="button" data-tariff-close onClick={() => setOpen(false)}>Close</button>
            </div>
          )}
        </div>

        <div data-tariff-line aria-live="polite">
          {shardErr ? <p data-fba-flag>Could not load the schedule ({shardErr}). Check your connection and try again.</p>
            : !line ? <p data-tariff-hint>{shard ? "Pick a 10-digit line from the list." : "Loading the schedule…"}</p>
              : (
                <>
                  <p data-tariff-path>{line.chain.join(" › ")}</p>
                  <p><strong>{line.display}</strong> · General rate <strong>{line.general.text || "—"}</strong>{line.units ? ` · unit: ${line.units}` : ""}</p>
                </>
              )}
        </div>

        <div data-fba-row>
          <label data-fba-field>
            <span>Made in</span>
            <select data-select value={country} onChange={(e) => { touch(); setCountry(e.target.value); }}>
              {COUNTRIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label data-fba-field>
            <span>Entry date</span>
            <input data-input type="date" min={VALID_FROM} max={VALID_THROUGH} value={date}
              onChange={(e) => { touch(); setDate(e.target.value ? clampDate(e.target.value) : clampDate(TODAY)); }} />
          </label>
        </div>

        <h2 data-fba-card-title data-roas-second>Shipment</h2>
        <div data-fba-row>
          <Num label="Units" value={f.units} onChange={(v) => set("units", v)} />
          <label data-fba-field>
            <span>Shipped by</span>
            <select data-select value={mode} onChange={(e) => { touch(); setMode(e.target.value); }}>
              <option value="ocean">Sea</option>
              <option value="air">Air or courier</option>
              <option value="other">Truck or rail</option>
            </select>
          </label>
        </div>
        <div data-fba-row>
          <Money label="Price per unit" value={f.price} onChange={(v) => set("price", v)} />
          <label data-fba-field>
            <span>Incoterm</span>
            <select data-select value={f.incoterm} onChange={(e) => set("incoterm", e.target.value)}>
              {INCOTERMS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </label>
        </div>
        {term.includesFreight && (
          <div data-fba-row>
            <Money label={`Freight${term.id === "CIF" ? " and insurance" : ""} in that price, whole shipment`} value={f.included} onChange={(v) => set("included", v)} />
          </div>
        )}
        <div data-fba-row>
          <Money label="Moulds and tooling" value={f.assistTotal} onChange={(v) => set("assistTotal", v)} optional />
          <Num label="Units they will make" value={f.assistUnits} onChange={(v) => set("assistUnits", v)} optional />
        </div>
        {needsWeight && (
          <div data-fba-row>
            <Num label="Weight of one unit, kg" value={f.weightKg} onChange={(v) => set("weightKg", v)} />
          </div>
        )}
        <p data-roas-hint>
          Duty is charged on the customs value: the price without international freight and insurance, plus moulds and
          tooling you pay for, spread over the units they make. Here that is <strong>{usd4(cv.unitValue)}</strong> a unit.
        </p>

        {variant === "landed" && (
          <>
            <h2 data-fba-card-title data-roas-second>Getting it to Amazon</h2>
            <div data-fba-row>
              {!term.includesFreight && <Money label="Freight, whole shipment" value={f.freight} onChange={(v) => set("freight", v)} />}
              {term.id !== "CIF" && <Money label="Cargo insurance, whole shipment" value={f.insurance} onChange={(v) => set("insurance", v)} optional />}
            </div>
            <div data-fba-row>
              <Money label="Customs broker, per entry" value={f.broker} onChange={(v) => set("broker", v)} />
              <Money label="Port to Amazon, per unit" value={f.inbound} onChange={(v) => set("inbound", v)} />
            </div>
            <div data-fba-row>
              <Money label="Prep and other, per unit" value={f.other} onChange={(v) => set("other", v)} optional />
            </div>
          </>
        )}
      </form>

      {/* ── Results ────────────────────────────────────────────────── */}
      <section data-fba-card data-fba-results data-tariff-results aria-live="polite" aria-label="Results">
        <h2 data-fba-card-title>{variant === "landed" ? "Landed cost" : "Duty and fees"}</h2>
        <p data-tariff-asof>
          Rates as of {dateLabel(date)}, HTS {META.revision.label.replace(/^(\d{4}) HTS /, "$1 ")}.
          {EXPIRED ? ` This data stopped answering after ${dateLabel(VALID_THROUGH)}; rates may have changed since.` : ""}
        </p>
        {!result ? (
          <p data-fba-empty>{!line ? "Pick an HTS line to see the duty." : "Enter the units and a price above $0 to see the duty."}</p>
        ) : (
          <Results r={result} units={units} fees={fees} mode={mode} />
        )}

        {band && band.ok === false && band.band && (
          <p data-fba-flag>
            This line is for goods {band.band.text.toLowerCase()}; a unit value of {usd(band.v)} does not fit it. Pick the line
            for your value band: the rate differs.
          </p>
        )}

        {result && (exclusionNeeds.length > 0 || n52Needs.length > 0 || s232) && (
          <div data-tariff-claims>
            {exclusionNeeds.map((n) => (
              <label key={n.id} data-fba-check>
                <input type="checkbox" checked={!!claims.exclusion?.[n.id]} onChange={(e) => toggle("exclusion", n.id, e.target.checked)} />
                <span>
                  <strong>My product is:</strong> {n.desc || `the product of statistical number ${n.stats.map(formatCode).join(", ")}`}.{" "}
                  <em>USTR exclusion {n.id}, heading {n.via}, through {dateLabel(n.until)}: it removes the list duty.</em>
                </span>
              </label>
            ))}
            {n52Needs.map((n) => (
              <label key={n.id} data-fba-check>
                <input type="checkbox" checked={!!claims.n52?.[n.id]} onChange={(e) => toggle("n52", n.id, e.target.checked)} />
                <span><strong>My product is:</strong> {n.desc}. <em>Exempt from the 2026 duty under {n.source}.</em></span>
              </label>
            ))}
            {s232 && (
              <label data-fba-check>
                <input type="checkbox" checked={!!claims.s232} onChange={(e) => { touch(); setClaims((c) => ({ ...c, s232: e.target.checked })); }} />
                <span><strong>Section 232 applies to my product</strong> (it meets the note's metal-content or other test). <em>Takes out the 2026 note-52 duty, which does not apply on top of Section 232.</em></span>
              </label>
            )}
          </div>
        )}

        {result?.flags?.map((x) => (
          <div key={x.note} data-tariff-flag>
            <strong>Not included: {x.title}.</strong> This code is named in U.S. note {x.note} to Chapter 99. {x.how} We do not
            compute it, so the total above leaves it out.
          </div>
        ))}

        {result?.notes.map((n) => <p key={n} data-tariff-note>{n}</p>)}

        {landed && result && (
          <table data-fba-results-table data-tariff-landed>
            <thead><tr><th scope="col"><span data-sr-only>Line</span></th><th scope="col">Per unit</th><th scope="col">Shipment</th></tr></thead>
            <tbody>
              {landed.lines.filter((l) => l.perUnit > 0 || l.note).map((l) => (
                <tr key={l.key}>
                  <th scope="row"><span data-fba-line>{l.label}</span>{l.note && <span data-fba-note>{l.note}</span>}</th>
                  <td data-fba-num>{usd4(l.perUnit)}</td>
                  <td data-fba-num>{usdShip(l.perUnit * units)}</td>
                </tr>
              ))}
              <tr data-strong>
                <th scope="row"><span data-fba-line>Landed cost</span>{!result.complete && <span data-fba-note>Leaves out what the notes above say is not computed.</span>}</th>
                <td data-fba-num>{usd(landed.perUnit)}</td>
                <td data-fba-num>{usdShip(landed.total)}</td>
              </tr>
            </tbody>
          </table>
        )}

        <p data-tariff-next>
          {variant === "tariff"
            ? <>Add freight, the broker and the trip to Amazon in the <Link to={LANDED_PATH}>landed cost calculator</Link>, then </>
            : <>Check the duty layer by layer in the <Link to={CALCULATOR_PATH}>tariff calculator</Link>, then </>}
          <Link to={handoff} onClick={() => trackCtaClick(`${tool}_to_fba`, FBA_CALCULATOR_PATH)}>
            take {variant === "landed" ? "this landed cost" : "the cost with duty"} into the FBA calculator
          </Link>{" "}
          for profit after Amazon's fees. An estimate, not a ruling: the classification is CBP's. Search rulings on{" "}
          <a href={CROSS_URL} target="_blank" rel="noopener">CBP CROSS</a>.
        </p>
      </section>
    </div>
  );
}

function Results({ r, units, fees, mode }: {
  r: DutyResult; units: number; fees: ReturnType<typeof entryFees>; mode: string;
}) {
  if (r.outOfRange) return <p data-fba-flag>{r.notes[0]}</p>;
  const per = (n: number | null) => (n == null ? null : n / units);
  const total = r.duty == null ? null : r.duty + fees.total;
  return (
    <table data-fba-results-table>
      <thead><tr><th scope="col"><span data-sr-only>Line</span></th><th scope="col">Shipment</th><th scope="col">Per unit</th></tr></thead>
      <tbody>
        {r.layers.map((l) => (
          <tr key={l.key}>
            <th scope="row">
              <span data-fba-line>{l.label}</span>
              <span data-fba-note>{l.heading} · {l.rateText}</span>
            </th>
            <td data-fba-num>{usdShip(l.amount)}</td>
            <td data-fba-num>{usd4(per(l.amount))}</td>
          </tr>
        ))}
        <tr data-strong>
          <th scope="row">
            <span data-fba-line>Duty{r.complete ? "" : ", as far as computed"}</span>
            <span data-fba-note>{pct(r.rate)} of {usdShip(r.value)} customs value</span>
          </th>
          <td data-fba-num data-negative={r.complete ? undefined : ""}>{usdShip(r.duty)}</td>
          <td data-fba-num>{usd4(per(r.duty))}</td>
        </tr>
        <tr>
          <th scope="row">
            <span data-fba-line>Merchandise processing fee</span>
            <span data-fba-note>
              {(FEES.mpfRate * 100).toFixed(4)}% of the entry{fees.mpfBound === "min" ? `, raised to the ${usd(FEES.mpfMin)} minimum` : fees.mpfBound === "max" ? `, capped at ${usd(FEES.mpfMax)}` : ""}
            </span>
          </th>
          <td data-fba-num>{usdShip(fees.mpf)}</td>
          <td data-fba-num>{usd4(per(fees.mpf))}</td>
        </tr>
        <tr>
          <th scope="row">
            <span data-fba-line>Harbor maintenance fee</span>
            <span data-fba-note>{mode === "ocean" ? `${(FEES.hmfRate * 100).toFixed(3)}% by sea` : "Sea freight only"}</span>
          </th>
          <td data-fba-num>{usdShip(fees.hmf)}</td>
          <td data-fba-num>{usd4(per(fees.hmf))}</td>
        </tr>
        <tr data-strong>
          <th scope="row"><span data-fba-line>Duty and fees</span></th>
          <td data-fba-num>{usdShip(total)}</td>
          <td data-fba-num>{usd4(per(total))}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Money({ label, value, onChange, optional }: { label: string; value: string; onChange: (v: string) => void; optional?: boolean }) {
  return (
    <label data-fba-field>
      <span>{label}{optional ? <em> optional</em> : null}</span>
      <span data-fba-affix>
        <span aria-hidden>$</span>
        <input data-input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
      </span>
    </label>
  );
}

function Num({ label, value, onChange, optional }: { label: string; value: string; onChange: (v: string) => void; optional?: boolean }) {
  return (
    <label data-fba-field>
      <span>{label}{optional ? <em> optional</em> : null}</span>
      <input data-input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
