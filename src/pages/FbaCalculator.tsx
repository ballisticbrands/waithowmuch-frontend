import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { gaEvent, trackCtaClick } from "@/lib/track";
import {
  PERIODS, REFERRAL_CATEGORIES, TIER_LABELS, IN_PER_CM, LB_PER_KG, calculate, categoryById, periodFor,
  type PeriodId, type CalcResult,
} from "@/data/fba-fees-2026.mjs";
import {
  H1, TAGLINE, DOC_TITLE, LEDE, SOURCE_LINE, SECTIONS, FAQ, RELATED, RESULT_NOTES,
} from "@/data/fba-calculator-page.mjs";

/**
 * /tools/amazon-fba-calculator/ — an FBA fee and profit calculator on
 * Amazon's published US rate card (data/fba-fees-2026.mjs).
 *
 * Client-side only: nothing is sent anywhere. The words under the calculator
 * come from data/fba-calculator-page.mjs, which the prerender emits too.
 */

type Units = "imperial" | "metric";
type Fields = {
  price: string; productCost: string; inboundShipping: string;
  length: string; width: string; height: string; weight: string;
  category: string; dangerous: boolean; adPct: string; monthlyUnits: string;
  storageMonths: string; storagePeak: boolean;
};

const today = new Date().toISOString().slice(0, 10);
const thisMonth = new Date().getMonth(); // 0-based; October is 9

const DEFAULTS: Fields = {
  price: "24.99", productCost: "4.50", inboundShipping: "0.75",
  length: "9", width: "6", height: "2", weight: "0.8",
  category: "home-kitchen", dangerous: false, adPct: "10", monthlyUnits: "300",
  storageMonths: "1", storagePeak: thisMonth >= 9,
};

const num = (s: string) => {
  const n = parseFloat(s.replace(/[$,%\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const trim = (n: number, dp = 2) => String(Math.round(n * 10 ** dp) / 10 ** dp);
const usd = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;
const usd0 = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`;
const pct = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "—" : `${n.toFixed(1)}%`);

/* The tariff and landed-cost calculators hand their result across as
   ?cost=<product cost per unit>&inbound=<inbound shipping per unit>. */
function fromQuery(): Fields {
  if (typeof window === "undefined") return DEFAULTS;
  const q = new URLSearchParams(window.location.search);
  const ok = (k: string) => { const v = num(q.get(k) ?? ""); return v >= 0 ? String(v) : null; };
  return { ...DEFAULTS, productCost: ok("cost") ?? DEFAULTS.productCost, inboundShipping: ok("inbound") ?? DEFAULTS.inboundShipping };
}

export default function FbaCalculator() {
  useSetCrumbs(() => [{ label: "Amazon FBA calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  const [period, setPeriod] = useState<PeriodId>(() => periodFor(today));
  const [units, setUnits] = useState<Units>("imperial");
  const [f, setF] = useState<Fields>(fromQuery);

  /* One "calculator_use" per page view, on the first edit — enough to tell
     visitors who used it from ones who only read. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool: "fba_calculator" });
  };
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { touch(); setF((x) => ({ ...x, [k]: v })); };

  const switchUnits = (to: Units) => {
    if (to === units) return;
    const k = to === "metric" ? 1 / IN_PER_CM : IN_PER_CM;
    const w = to === "metric" ? 1 / LB_PER_KG : LB_PER_KG;
    const conv = (s: string, by: number) => (Number.isFinite(num(s)) ? trim(num(s) * by) : s);
    setF((x) => ({
      ...x, length: conv(x.length, k), width: conv(x.width, k), height: conv(x.height, k), weight: conv(x.weight, w),
    }));
    setUnits(to);
  };

  const result: CalcResult | null = useMemo(() => {
    const k = units === "metric" ? IN_PER_CM : 1;
    const w = units === "metric" ? LB_PER_KG : 1;
    const v = {
      price: num(f.price), lengthIn: num(f.length) * k, widthIn: num(f.width) * k, heightIn: num(f.height) * k,
      weightLb: num(f.weight) * w,
    };
    if (Object.values(v).some((x) => !(x > 0))) return null;
    const opt = (s: string) => (Number.isFinite(num(s)) && num(s) >= 0 ? num(s) : 0);
    return calculate({
      ...v,
      productCost: opt(f.productCost), inboundShipping: opt(f.inboundShipping),
      category: f.category, periodId: period, dangerous: f.dangerous,
      adPct: opt(f.adPct), monthlyUnits: opt(f.monthlyUnits),
      storageMonths: opt(f.storageMonths), storagePeak: f.storagePeak,
    });
  }, [f, units, period]);

  const lenUnit = units === "metric" ? "cm" : "in";
  const wUnit = units === "metric" ? "kg" : "lb";
  const cat = categoryById(f.category);

  return (
    <main data-main>
      <div data-fba>
        <h1>{H1}</h1>
        <p data-fba-tagline>{TAGLINE}</p>

        <div data-fba-grid>
          {/* ── Inputs ───────────────────────────────────────────── */}
          <form data-fba-card data-fba-inputs onSubmit={(e) => e.preventDefault()} aria-label="Your product">
            <h2 data-fba-card-title>Your product</h2>

            <label data-fba-field>
              <span>Fee period</span>
              <select data-select value={period} onChange={(e) => { touch(); setPeriod(e.target.value as PeriodId); }}>
                {PERIODS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.from.slice(5).replace("-", "/")}/{p.from.slice(2, 4)} – {p.to.slice(5).replace("-", "/")}/{p.to.slice(2, 4)})
                  </option>
                ))}
              </select>
            </label>

            <div data-fba-row data-cols="3">
              <Money label="Sale price" value={f.price} onChange={(v) => set("price", v)} />
              <Money label="Product cost / unit" value={f.productCost} onChange={(v) => set("productCost", v)} />
              <Money label="Inbound shipping / unit" value={f.inboundShipping} onChange={(v) => set("inboundShipping", v)} />
            </div>

            <div data-fba-subhead>
              <span>Packaged size and weight</span>
              <div data-fba-toggle role="group" aria-label="Units">
                <button type="button" aria-pressed={units === "imperial"} onClick={() => switchUnits("imperial")}>in / lb</button>
                <button type="button" aria-pressed={units === "metric"} onClick={() => switchUnits("metric")}>cm / kg</button>
              </div>
            </div>
            <div data-fba-row data-cols="4">
              <Num label={`Length (${lenUnit})`} value={f.length} onChange={(v) => set("length", v)} />
              <Num label={`Width (${lenUnit})`} value={f.width} onChange={(v) => set("width", v)} />
              <Num label={`Height (${lenUnit})`} value={f.height} onChange={(v) => set("height", v)} />
              <Num label={`Weight (${wUnit})`} value={f.weight} onChange={(v) => set("weight", v)} />
            </div>

            <label data-fba-field>
              <span>Referral fee category</span>
              <select data-select value={f.category} onChange={(e) => set("category", e.target.value)}>
                {REFERRAL_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label data-fba-check>
              <input type="checkbox" checked={f.dangerous} onChange={(e) => set("dangerous", e.target.checked)} />
              <span>Dangerous goods (hazmat)</span>
            </label>

            <div data-fba-row data-cols="2">
              <Num label="Ad spend, % of sales" value={f.adPct} onChange={(v) => set("adPct", v)} optional />
              <Num label="Units sold a month" value={f.monthlyUnits} onChange={(v) => set("monthlyUnits", v)} optional />
            </div>
            <div data-fba-row data-cols="2">
              <Num label="Months in storage" value={f.storageMonths} onChange={(v) => set("storageMonths", v)} optional />
              <label data-fba-check data-fba-check-inline>
                <input type="checkbox" checked={f.storagePeak} onChange={(e) => set("storagePeak", e.target.checked)} />
                <span>Stored October–December</span>
              </label>
            </div>
          </form>

          {/* ── Results ──────────────────────────────────────────── */}
          <section data-fba-card data-fba-results aria-live="polite" aria-label="Results">
            <h2 data-fba-card-title>Per unit</h2>

            {!result ? (
              <p data-fba-empty>Enter a price above $0 and the box's length, width, height and weight to see the fees.</p>
            ) : (
              <Results r={result} price={num(f.price)} cat={cat?.name ?? ""} />
            )}

          </section>
        </div>

        <p data-fba-source dangerouslySetInnerHTML={{ __html: SOURCE_LINE }} />
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />

        <aside data-fba-cta>
          <p>
            We publish the real unit economics of Amazon businesses, with every figure sourced. One email when a new case
            study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("fba_calculator")}>Get emails on new case studies</Link>
        </aside>

        <div data-prose data-fba-copy>
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}

          <section id="faq">
            <h2>Frequently asked questions</h2>
            {FAQ.map((x) => (
              <div key={x.q} data-fba-faq>
                <h3>{x.q}</h3>
                <p dangerouslySetInnerHTML={{ __html: x.a }} />
              </div>
            ))}
          </section>

          <section id="related">
            <h2>Related reading</h2>
            <ul>{RELATED.map((r) => <li key={r.href}><Link to={r.href}>{r.label}</Link></li>)}</ul>
          </section>
        </div>
      </div>
    </main>
  );
}

function Money({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label data-fba-field>
      <span>{label}</span>
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

function Results({ r, price, cat }: { r: CalcResult; price: number; cat: string }) {
  const shipping = `${trim(r.tier.shippingLb, 2)} lb shipping weight${r.tier.usesDim ? " (dimensional)" : ""}`;
  const band = ["under $10", "$10–$50", "over $50"][r.fba.band];

  type Row = { key: keyof typeof RESULT_NOTES; label: string; yours: string; strong?: boolean; detail?: string; negative?: boolean };
  const rows: Row[] = [
    { key: "tier", label: "Size tier", yours: TIER_LABELS[r.tier.tier], detail: `${shipping}, ${band} rate` },
    { key: "fba", label: "FBA fulfilment fee", yours: usd(r.fba.fee),
      detail: `${usd(r.fba.base)} from the rate card${r.kind === "apparel" ? " (apparel)" : r.kind === "dangerous" ? " (dangerous goods)" : ""}` },
    { key: "referral", label: "Referral fee", yours: usd(r.referral.fee + r.referral.closingFee),
      detail: `${cat}: ${r.referral.atMinimum ? "the per-unit minimum" : `${r.referral.effectivePct.toFixed(1)}% of price`}${r.referral.closingFee ? `, incl. ${usd(r.referral.closingFee)} closing fee` : ""}` },
    { key: "storage", label: "Storage", yours: usd(r.storage),
      detail: `${trim(r.storageMonth.cubicFeet, 3)} cu ft at $${r.storageMonth.rate.toFixed(2)} a month` },
    { key: "amazonFees", label: "Total Amazon fees", yours: usd(r.amazonFees), strong: true,
      detail: price > 0 ? `${((r.amazonFees / price) * 100).toFixed(1)}% of price` : undefined },
    { key: "landed", label: "Landed cost", yours: usd(r.landed) },
    { key: "ads", label: "Advertising", yours: usd(r.ads) },
    { key: "profit", label: "Profit per unit", yours: usd(r.profit), strong: true, negative: r.profit < 0 },
    { key: "margin", label: "Margin", yours: pct(r.marginPct), strong: true },
    { key: "roi", label: "ROI", yours: pct(r.roiPct) },
    { key: "acos", label: "Break-even ACOS", yours: pct(r.breakEvenAcosPct) },
    { key: "monthly", label: "Profit a month", yours: usd0(r.monthlyProfit), strong: true },
  ];

  return (
    <>
      <table data-fba-results-table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} data-strong={row.strong ? "" : undefined}>
              <th scope="row">
                <span data-fba-line>{row.label}</span>
                <span data-fba-note>{RESULT_NOTES[row.key]}{row.detail ? ` ${row.detail}.` : ""}</span>
              </th>
              <td data-fba-num data-negative={row.negative ? "" : undefined}>{row.yours}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {r.flags.length > 0 && (
        <p data-fba-flag>
          Not included: this box may also be charged the {r.flags.join(" and the ")}, which this calculator does not price.
        </p>
      )}
    </>
  );
}
