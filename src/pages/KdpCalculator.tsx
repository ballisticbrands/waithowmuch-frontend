import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { gaEvent, trackCtaClick } from "@/lib/track";
import {
  calculate, INKS, EBOOK, PRINT, PRINT_COSTS,
  type KdpResult, type InkId, type Trim, type EbookOption, type PrintQuote,
} from "@/data/kdp-royalties.mjs";
import { TITLE, DOC_TITLE, LEDE, SOURCE_LINE, SECTIONS, FAQ, RELATED, EX } from "@/data/kdp-calculator-page.mjs";

/**
 * /tools/kdp-royalty-calculator/ — KDP royalties per sale for eBook,
 * paperback and hardcover on Amazon.com, printing cost and minimum list price,
 * Kindle Unlimited (Kindle+) page reads, profit after ads, break-even ACOS and
 * months to earn back the up-front costs.
 *
 * Client-side only: nothing is sent anywhere. The rates live in
 * data/kdp-royalties.mjs (read off KDP's help pages, asserted by
 * scripts/check-kdp.mjs); the words under the calculator come from
 * data/kdp-calculator-page.mjs, which the prerender emits too. Laid out with
 * the FBA calculator's data-fba-* styles, like the ROAS calculator.
 */

type Fields = {
  ebookPrice: string; fileMb: string; ebookUnits: string; kenp: string; kenpRate: string;
  pages: string;
  pbPrice: string; pbUnits: string; pbExpanded: string;
  hcPrice: string; hcUnits: string;
  adSpend: string; cover: string; editing: string; isbn: string;
};

const ex = EX.input;
const DEFAULTS: Fields = {
  ebookPrice: String(ex.ebook.price), fileMb: String(ex.ebook.fileMb), ebookUnits: String(ex.ebook.units),
  kenp: "", kenpRate: "",
  pages: String(ex.print.pages),
  pbPrice: String(ex.paperback.price), pbUnits: String(ex.paperback.units), pbExpanded: "",
  hcPrice: String(ex.hardcover.price), hcUnits: String(ex.hardcover.units),
  adSpend: String(ex.adSpend), cover: "300", editing: "600", isbn: "",
};

const num = (s: string) => {
  const n = parseFloat(s.replace(/[$,%\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const opt = (s: string) => (Number.isFinite(num(s)) && num(s) >= 0 ? num(s) : 0);
const usd = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;
const usd0 = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`;
const pf = (f: number | null | undefined) => (f == null || !Number.isFinite(f) ? "—" : `${(f * 100).toFixed(1).replace("-", "−")}%`);
const int = (n: number) => Math.round(n).toLocaleString("en-US");

export default function KdpCalculator() {
  useSetCrumbs(() => [{ label: "KDP royalty calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  const [f, setF] = useState<Fields>(DEFAULTS);
  const [formats, setFormats] = useState({ ebook: true, paperback: true, hardcover: true });
  const [option, setOption] = useState<EbookOption>("70");
  const [ink, setInk] = useState<InkId>("black");
  const [trim, setTrim] = useState<Trim>("regular");

  /* One "calculator_use" per page view, on the first edit. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool: "kdp_calculator" });
  };
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { touch(); setF((x) => ({ ...x, [k]: v })); };
  const toggle = (k: keyof typeof formats) => { touch(); setFormats((x) => ({ ...x, [k]: !x[k] })); };

  const anyPrint = formats.paperback || formats.hardcover;
  const oneOff = opt(f.cover) + opt(f.editing) + opt(f.isbn);
  const result: KdpResult | null = useMemo(() => {
    const priced = (on: boolean, s: string) => on && num(s) > 0;
    if (!priced(formats.ebook, f.ebookPrice) && !priced(formats.paperback, f.pbPrice) && !priced(formats.hardcover, f.hcPrice)) return null;
    const rate = num(f.kenpRate);
    return calculate({
      ebook: priced(formats.ebook, f.ebookPrice)
        ? { price: num(f.ebookPrice), fileMb: opt(f.fileMb), option, units: opt(f.ebookUnits), kenp: opt(f.kenp), kenpRate: rate > 0 ? rate : null }
        : undefined,
      paperback: priced(formats.paperback, f.pbPrice) ? { price: num(f.pbPrice), units: opt(f.pbUnits), expandedUnits: opt(f.pbExpanded) } : undefined,
      hardcover: priced(formats.hardcover, f.hcPrice) ? { price: num(f.hcPrice), units: opt(f.hcUnits) } : undefined,
      print: { pages: num(f.pages), ink, trim },
      adSpend: opt(f.adSpend),
      oneOff,
    });
  }, [f, formats, option, ink, trim, oneOff]);

  return (
    <main data-main>
      <div data-fba>
        <h1>{TITLE}</h1>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />
        <p data-fba-source>{SOURCE_LINE}</p>

        <div data-fba-grid>
          {/* ── Inputs ───────────────────────────────────────────── */}
          <form data-fba-card data-fba-inputs onSubmit={(e) => e.preventDefault()} aria-label="Your book">
            <h2 data-fba-card-title>Your book</h2>
            <div data-kdp-formats role="group" aria-label="Formats">
              <label data-fba-check><input type="checkbox" checked={formats.ebook} onChange={() => toggle("ebook")} /><span>eBook</span></label>
              <label data-fba-check><input type="checkbox" checked={formats.paperback} onChange={() => toggle("paperback")} /><span>Paperback</span></label>
              <label data-fba-check><input type="checkbox" checked={formats.hardcover} onChange={() => toggle("hardcover")} /><span>Hardcover</span></label>
            </div>

            {formats.ebook && (
              <fieldset data-kdp-group>
                <legend data-fba-card-title>Kindle eBook</legend>
                <div data-fba-row>
                  <Money label="List price" value={f.ebookPrice} onChange={(v) => set("ebookPrice", v)} />
                  <label data-fba-field>
                    <span>Royalty option</span>
                    <select data-select value={option} onChange={(e) => { touch(); setOption(e.target.value as EbookOption); }}>
                      <option value="70">70%</option>
                      <option value="35">35%</option>
                    </select>
                  </label>
                </div>
                <div data-fba-row>
                  <Num label="File size (MB)" value={f.fileMb} onChange={(v) => set("fileMb", v)} />
                  <Num label="Sales a month" value={f.ebookUnits} onChange={(v) => set("ebookUnits", v)} />
                </div>
                <div data-fba-row>
                  <Num label="KENP a month" value={f.kenp} onChange={(v) => set("kenp", v)} optional />
                  <Money label="Rate per KENP" value={f.kenpRate} onChange={(v) => set("kenpRate", v)} placeholder="from your report" optional />
                </div>
                <p data-roas-hint>
                  Kindle Unlimited (Kindle+) pages need KDP Select. KDP does not publish the per-page rate: divide a recent
                  month's Kindle+ royalties by its KENP read in your KDP reports.
                </p>
              </fieldset>
            )}

            {anyPrint && (
              <fieldset data-kdp-group>
                <legend data-fba-card-title>Print</legend>
                <div data-fba-row>
                  <Num label="Page count" value={f.pages} onChange={(v) => set("pages", v)} />
                  <label data-fba-field>
                    <span>Trim size</span>
                    <select data-select value={trim} onChange={(e) => { touch(); setTrim(e.target.value as Trim); }}>
                      <option value="regular">Regular</option>
                      <option value="large">Large</option>
                    </select>
                  </label>
                </div>
                <label data-fba-field>
                  <span>Ink and paper</span>
                  <select data-select value={ink} onChange={(e) => { touch(); setInk(e.target.value as InkId); }}>
                    {INKS.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
                  </select>
                </label>
                <p data-roas-hint>
                  Large trim is wider than {PRINT.largeOver.widthIn} in or taller than {PRINT.largeOver.heightIn} in
                  (7 × 10, 8.5 × 11); 5 × 8, 5.5 × 8.5 and 6 × 9 are regular.
                </p>
                {formats.paperback && (
                  <>
                    <div data-fba-row>
                      <Money label="Paperback price" value={f.pbPrice} onChange={(v) => set("pbPrice", v)} />
                      <Num label="Sold a month" value={f.pbUnits} onChange={(v) => set("pbUnits", v)} />
                    </div>
                    <div data-fba-row>
                      <Num label="Expanded Distribution" value={f.pbExpanded} onChange={(v) => set("pbExpanded", v)} optional />
                    </div>
                  </>
                )}
                {formats.hardcover && (
                  <div data-fba-row>
                    <Money label="Hardcover price" value={f.hcPrice} onChange={(v) => set("hcPrice", v)} />
                    <Num label="Sold a month" value={f.hcUnits} onChange={(v) => set("hcUnits", v)} />
                  </div>
                )}
              </fieldset>
            )}

            <fieldset data-kdp-group>
              <legend data-fba-card-title>Costs</legend>
              <div data-fba-row>
                <Money label="Ads a month" value={f.adSpend} onChange={(v) => set("adSpend", v)} optional />
                <Money label="Cover design" value={f.cover} onChange={(v) => set("cover", v)} optional />
              </div>
              <div data-fba-row>
                <Money label="Editing" value={f.editing} onChange={(v) => set("editing", v)} optional />
                <Money label="ISBNs and other" value={f.isbn} onChange={(v) => set("isbn", v)} optional />
              </div>
            </fieldset>
          </form>

          {/* ── Results ──────────────────────────────────────────── */}
          <section data-fba-card data-fba-results aria-live="polite" aria-label="Results">
            <h2 data-fba-card-title>Results, a month on Amazon.com</h2>
            {!result ? (
              <p data-fba-empty>Choose at least one format and enter its list price to see your royalties.</p>
            ) : (
              <Results r={result} pages={num(f.pages)} ink={ink} />
            )}
          </section>
        </div>

        <aside data-fba-cta>
          <p>
            We publish the real revenue and margins of online businesses, with every figure sourced. One email when a new case
            study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("kdp_calculator")}>Get emails on new case studies</Link>
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

function Money({ label, value, onChange, optional, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; optional?: boolean; placeholder?: string;
}) {
  return (
    <label data-fba-field>
      <span>{label}{optional ? <em> optional</em> : null}</span>
      <span data-fba-affix>
        <span aria-hidden>$</span>
        <input data-input inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
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

const INK_NAME: Record<InkId, string> = {
  black: "black ink", groundwood: "black ink on groundwood", standard: "standard color", premium: "premium color",
};

/** Why a print format has no printing cost, in words. */
function printError(q: PrintQuote, format: "paperback" | "hardcover", ink: InkId): string {
  if (q.error === "ink") return "KDP prints hardcovers in black ink or premium color only.";
  const range = q.range ?? PRINT_COSTS[format][ink]?.pages ?? [0, 0];
  return `KDP prints ${INK_NAME[ink]} ${format}s with ${range[0]} to ${range[1]} pages.`;
}

function Verdict({ r }: { r: KdpResult }) {
  if (r.royalties <= 0 && r.adSpend <= 0) {
    return <p data-roas-verdict>Enter how many copies you sell a month to see your monthly royalties and profit.</p>;
  }
  const payback =
    r.oneOff <= 0 ? "" : r.paybackMonths == null
      ? ` At that rate the ${usd0(r.oneOff)} of up-front costs is never earned back.`
      : ` The ${usd0(r.oneOff)} of up-front costs is earned back in ${r.paybackMonths.toFixed(1)} months.`;
  if (r.profit > 0) {
    return (
      <p data-roas-verdict data-tone="good">
        <strong>{usd0(r.profit)} a month after ads.</strong> {usd0(r.royalties)} of royalties
        {r.adSpend > 0 ? `, less ${usd0(r.adSpend)} of Amazon Ads` : ""}.{payback}
      </p>
    );
  }
  return (
    <p data-roas-verdict data-tone="bad">
      <strong>{r.profit < 0 ? `A loss of ${usd0(-r.profit)} a month.` : "No profit this month."}</strong> The ads cost{" "}
      {usd0(r.adSpend)} and the royalties come to {usd0(r.royalties)}.{payback}
    </p>
  );
}

function Results({ r, pages, ink }: { r: KdpResult; pages: number; ink: InkId }) {
  type Row = { key: string; label: string; value: string; note: string; strong?: boolean; negative?: boolean };
  const rows: Row[] = [];

  const e = r.ebook;
  if (e) {
    const why = e.reasons.includes("print-price")
      ? "the 70% option needs the eBook at least 20% below the print price"
      : e.reasons.includes("above-band")
        ? `70% is only for list prices up to ${usd(EBOOK.band70.max)}`
        : `70% is only for list prices from ${usd(EBOOK.band70.min)}`;
    rows.push({
      key: "ebook", label: `eBook royalty per sale (${e.rate === 0.7 ? "70%" : "35%"})`, value: usd(e.royalty), strong: true,
      note: e.rate === 0.7
        ? `0.70 × (list price − ${usd(e.delivery)} delivery for the file). The 35% option would pay ${usd(e.royalty35)}.`
        : e.flags.includes("fell-to-35")
          ? `Paid at 35%: ${why}. 0.35 × list price.`
          : `0.35 × list price.${e.royalty70 != null ? ` The 70% option would pay ${usd(e.royalty70)}.` : ""}`,
    });
    const flip = e.eligible70
      ? `At this price 70% pays more unless the file is over ${e.fileFlipMb.toFixed(1)} MB. Above ${usd(EBOOK.band70.max)} only 35% is allowed, and you would need ${usd(e.match35At)} or more at 35% to beat ${usd(EBOOK.band70.max)} at 70% (${usd(e.royaltyAtBandMax)}).`
      : `${usd(EBOOK.band70.max)} at 70% would pay ${usd(e.royaltyAtBandMax)} a sale; at 35% you need ${usd(e.match35At)} or more to beat it.`;
    rows.push({ key: "flip", label: "Where 35% vs 70% flips", value: e.eligible70 ? `${e.fileFlipMb.toFixed(1)} MB` : usd(e.match35At), note: flip });
    if (e.flags.includes("below-min")) {
      rows.push({ key: "ebmin", label: "Below KDP's minimum", value: usd(e.min35), negative: true, note: `A file this size cannot be listed under ${usd(e.min35)}.` });
    }
  }

  for (const format of ["paperback", "hardcover"] as const) {
    const q = r[format];
    if (!q) continue;
    const name = format === "paperback" ? "Paperback" : "Hardcover";
    if (q.cost == null) {
      rows.push({ key: `${format}-err`, label: `${name} printing cost`, value: "—", negative: true, note: printError(q, format, ink) });
      continue;
    }
    rows.push({
      key: `${format}-cost`, label: `${name} printing cost`, value: usd(q.cost),
      note: q.flat
        ? `A flat ${usd(q.cost)} for ${int(pages)} pages: short books pay the fixed charge only.`
        : `${usd(q.fixed)} + ${int(pages)} pages × $${q.perPage}.`,
    });
    rows.push({
      key: `${format}-royalty`, label: `${name} royalty per sale (${Math.round((q.rate ?? 0) * 100)}%)`, value: usd(q.royalty), strong: true,
      negative: (q.royalty ?? 0) < 0,
      note: `${(q.rate ?? 0).toFixed(2)} × list price − ${usd(q.cost)} printing.${q.rate === PRINT.rateLow ? ` At ${usd(PRINT.highFrom)} or more the rate is 60%.` : ""}`,
    });
    rows.push({
      key: `${format}-min`, label: `Minimum ${format} price`, value: usd(q.minPrice), negative: q.flags.includes("below-min"),
      note: q.flags.includes("below-min")
        ? `Your price is below KDP's floor: printing cost ÷ royalty rate. KDP will not accept it.`
        : `KDP's floor for this page count, ink and trim: printing cost ÷ royalty rate.`,
    });
    if (format === "paperback" && q.expandedUnits > 0) {
      rows.push({
        key: "ed", label: "Expanded Distribution royalty", value: usd(q.expanded), negative: (q.expanded ?? 0) < 0,
        note: `0.40 × list price − ${usd(q.cost)} printing, on ${int(q.expandedUnits)} copies a month.`,
      });
    }
  }

  if (r.ku && (r.ku.kenp > 0 || r.ku.rate != null)) {
    rows.push({
      key: "ku", label: "Kindle Unlimited page reads", value: r.ku.monthly == null ? "—" : usd0(r.ku.monthly),
      note: r.ku.monthly == null
        ? "Enter the rate per KENP from your KDP reports to include page reads."
        : `${int(r.ku.kenp)} KENP × $${r.ku.rate} a page.`,
    });
  }

  const parts = [
    r.ebook ? `eBook ${usd0(r.ebook.monthly)}` : "",
    r.paperback?.monthly != null ? `paperback ${usd0(r.paperback.monthly)}` : "",
    r.hardcover?.monthly != null ? `hardcover ${usd0(r.hardcover.monthly)}` : "",
    r.ku?.monthly ? `page reads ${usd0(r.ku.monthly)}` : "",
  ].filter(Boolean);
  rows.push({
    key: "royalties", label: "Royalties a month", value: usd0(r.royalties), strong: true,
    note: parts.length ? `${parts.join(", ")}.` : "Enter monthly sales to see them.",
  });
  rows.push({
    key: "profit", label: "Profit after ads", value: usd0(r.profit), strong: true, negative: r.profit < 0,
    note: r.adSpend > 0 ? `Royalties less ${usd0(r.adSpend)} of Amazon Ads.` : "No ad spend entered, so this is your royalties.",
  });
  rows.push({
    key: "beAcos", label: "Break-even ACOS", value: pf(r.beAcos),
    note: r.beAcos == null
      ? "Needs copies sold on Amazon."
      : `Royalties ÷ sales at list price. Ads costing more than ${pf(r.beAcos)} of the sales they drive lose money${r.adShare != null ? `; yours are ${pf(r.adShare)} of all sales` : ""}.`,
  });
  rows.push({
    key: "payback", label: "Months to earn back costs",
    value: r.oneOff <= 0 ? "—" : r.paybackMonths == null ? "Never" : r.paybackMonths.toFixed(1), negative: r.oneOff > 0 && r.paybackMonths == null,
    note: r.oneOff <= 0
      ? "Enter cover, editing and ISBN costs to see it."
      : r.paybackMonths == null
        ? `${usd0(r.oneOff)} of up-front costs, and no monthly profit to pay them back.`
        : `${usd0(r.oneOff)} of up-front costs ÷ ${usd0(r.profit)} a month.`,
  });

  return (
    <>
      <Verdict r={r} />
      <table data-fba-results-table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} data-strong={row.strong ? "" : undefined}>
              <th scope="row">
                <span data-fba-line>{row.label}</span>
                <span data-fba-note>{row.note}</span>
              </th>
              <td data-fba-num data-negative={row.negative ? "" : undefined}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {r.paperback?.flags.includes("expanded-negative") && r.paperback.expandedUnits > 0 && (
        <p data-fba-flag>At this price each Expanded Distribution copy loses money: 40% of the list price does not cover printing.</p>
      )}
      {(r.paperback?.flags.includes("above-max") || r.hardcover?.flags.includes("above-max")) && (
        <p data-fba-flag>KDP's maximum print list price on Amazon.com is {usd0(PRINT.maxPrice)}.</p>
      )}
    </>
  );
}
