import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { gaEvent, trackCtaClick } from "@/lib/track";
import {
  calculate, quoteAt, royaltyCurve, minPrintPrice, printingCost, INKS, EBOOK, PRINT, PRINT_COSTS,
  type KdpResult, type InkId, type Trim, type EbookOption, type PriceQuote, type CurvePoint,
  type PrintFormat, type QuoteAtInput,
} from "@/data/kdp-royalties.mjs";
import {
  H1, TAGLINE, DOC_TITLE, LEDE, SOURCE_LINE, SECTIONS, FAQ, RELATED, EX, ASSUMED_FILE_MB,
} from "@/data/kdp-calculator-page.mjs";

/**
 * /tools/kdp-royalty-calculator/ — one format at a time (Kindle eBook,
 * paperback, hardcover; the tab lives in ?format= so each is linkable), a
 * price slider that marks KDP's thresholds on its track, the list price split
 * three ways as a donut, and the royalty across prices as a small curve.
 * Monthly sales, Kindle Unlimited, ads and one-off costs sit in a collapsed
 * "Monthly profit" section underneath.
 *
 * Client-side only: nothing is sent anywhere. The rates live in
 * data/kdp-royalties.mjs (read off KDP's help pages, asserted by
 * scripts/check-kdp.mjs); the words under the calculator come from
 * data/kdp-calculator-page.mjs, which the prerender emits too.
 *
 * 🚨 Nothing moves while the slider is dragged. The scale depends on the book,
 * never on the price under the thumb; the readout lines reserve their height;
 * the results table has a fixed set of rows per format; the donut and the
 * curve are fixed-aspect boxes.
 */

type Format = "ebook" | PrintFormat;
type Book = Omit<QuoteAtInput, "price">;
const FORMATS: Array<{ id: Format; label: string }> = [
  { id: "ebook", label: "Kindle eBook" },
  { id: "paperback", label: "Paperback" },
  { id: "hardcover", label: "Hardcover" },
];
const isFormat = (s: string | null): s is Format => s === "ebook" || s === "paperback" || s === "hardcover";

type Monthly = {
  ebookUnits: string; kenp: string; kenpRate: string;
  pbUnits: string; pbExpanded: string; hcUnits: string;
  adSpend: string; cover: string; editing: string; isbn: string;
};

const ex = EX.input;
const MONTHLY_DEFAULTS: Monthly = {
  ebookUnits: String(ex.ebook.units), kenp: "", kenpRate: "",
  pbUnits: String(ex.paperback.units), pbExpanded: "", hcUnits: String(ex.hardcover.units),
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
const pf = (f: number | null | undefined, dp = 1) =>
  f == null || !Number.isFinite(f) ? "—" : `${(f * 100).toFixed(dp).replace("-", "−")}%`;
const int = (n: number) => Math.round(n).toLocaleString("en-US");
const cents = (n: number) => Math.round(n * 100) / 100;
const same = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/* ── The slider's scale ────────────────────────────────────────────────
   It moves in 50-cent steps on the .49 / .99 grid authors price on, so every
   threshold that matters ($2.99, $9.99, $12.99) is a stop. The typed field
   takes any cent, $9.98 included. */
const STEP = 0.5;
const GRID0 = 0.99;
const floorGrid = (x: number) => cents(GRID0 + STEP * Math.max(0, Math.floor((x - GRID0) / STEP + 1e-9)));
const ceilGrid = (x: number) => cents(GRID0 + STEP * Math.max(0, Math.ceil((x - GRID0) / STEP - 1e-9)));

/** Slider range for a format. It depends on the book, not on the price being
 *  dragged, so the scale holds still under the thumb; only a typed price
 *  outside it widens it. Print starts at half the minimum, so the stretch KDP
 *  refuses is visible on the track. */
function sliderRange(format: Format, minPrice: number | null, price: number) {
  let lo: number;
  let hi: number;
  if (format === "ebook") {
    lo = GRID0;
    hi = 24.99;
  } else {
    const m = minPrice ?? 5;
    lo = floorGrid(m * 0.5);
    hi = Math.min(PRINT.maxPrice, ceilGrid(Math.max(format === "paperback" ? 24.99 : 34.99, m * 2.5)));
  }
  if (Number.isFinite(price) && price > 0) {
    if (price < lo) lo = floorGrid(price);
    if (price > hi) hi = Math.min(format === "ebook" ? EBOOK.max35 : PRINT.maxPrice, ceilGrid(price));
  }
  return { lo, hi };
}

type Zone = { from: number; to: number; tone: "best" | "low" | "below"; label: string };

/** The stretches of the slider track and their legend, from KDP's rules. */
function zonesFor(format: Format, lo: number, hi: number, minPrice: number | null): Zone[] {
  const clip = (z: Zone): Zone => ({ ...z, from: Math.max(lo, z.from), to: Math.min(hi, z.to) });
  const keep = (z: Zone) => z.to > z.from;
  if (format === "ebook") {
    const { min, max } = EBOOK.band70;
    const zones: Zone[] = [
      { from: lo, to: min, tone: "low", label: `35% only under ${usd(min)}` },
      { from: min, to: max, tone: "best", label: `70% from ${usd(min)} to ${usd(max)}` },
      { from: max, to: hi, tone: "low", label: `35% only over ${usd(max)}` },
    ];
    return zones.map(clip).filter(keep);
  }
  const m = minPrice ?? lo;
  const cliff = PRINT.highFrom;
  const zones: Zone[] = [{ from: lo, to: m, tone: "below", label: `Under KDP's minimum, ${usd(m)}` }];
  if (m < cliff) zones.push({ from: m, to: cliff, tone: "low", label: `50% up to ${usd(cliff - 0.01)}` });
  zones.push({ from: Math.max(m, cliff), to: hi, tone: "best", label: `60% from ${usd(Math.max(m, cliff))}` });
  return zones.map(clip).filter(keep);
}

export default function KdpCalculator() {
  useSetCrumbs(() => [{ label: "KDP royalty calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  const [params, setParams] = useSearchParams();
  const fp = params.get("format");
  const format: Format = isFormat(fp) ? fp : "ebook";

  const [prices, setPrices] = useState<Record<Format, string>>({
    ebook: String(ex.ebook.price), paperback: String(ex.paperback.price), hardcover: String(ex.hardcover.price),
  });
  const [fileMb, setFileMb] = useState(String(ASSUMED_FILE_MB));
  const [option, setOption] = useState<EbookOption>("70");
  const [pages, setPages] = useState(String(ex.print.pages));
  const [trim, setTrim] = useState<Trim>("regular");
  const [inks, setInks] = useState<Record<PrintFormat, InkId>>({ paperback: "black", hardcover: "black" });
  const [m, setM] = useState<Monthly>(MONTHLY_DEFAULTS);

  /* One "calculator_use" per page view, on the first edit. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool: "kdp_calculator" });
  };

  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pick = (f: Format) => {
    setParams((p) => { const n = new URLSearchParams(p); n.set("format", f); return n; }, { replace: true, preventScrollReset: true });
  };
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = FORMATS.findIndex((x) => x.id === format);
    const to = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? FORMATS.length - 1 : null;
    if (to == null) return;
    e.preventDefault();
    const j = (to + FORMATS.length) % FORMATS.length;
    pick(FORMATS[j].id);
    tabs.current[j]?.focus();
  };

  const priceStr = prices[format];
  const price = num(priceStr);
  const setPrice = (v: string) => { touch(); setPrices((x) => ({ ...x, [format]: v })); };

  const mb = opt(fileMb) || ASSUMED_FILE_MB;
  const ink: InkId = format === "ebook" ? "black" : inks[format];
  const pagesN = num(pages);
  const book: Book = useMemo(
    () => (format === "ebook" ? { format, fileMb: mb, option } : { format, ink, pages: pagesN, trim }),
    [format, mb, option, ink, pagesN, trim],
  );

  /* The print minimum moves with the book, never with the price. */
  const minPrice = useMemo(() => {
    if (format === "ebook") return null;
    const c = printingCost({ format, ink, pages: pagesN, trim }).cost;
    return c == null ? null : minPrintPrice(c);
  }, [format, ink, pagesN, trim]);
  const printable = format === "ebook" || minPrice != null;

  const q: PriceQuote | null = useMemo(() => (price > 0 ? quoteAt({ ...book, price }) : null), [book, price]);
  const { lo, hi } = sliderRange(format, minPrice, price);
  const zones = zonesFor(format, lo, hi, minPrice);
  const curve = useMemo(
    () => (printable ? royaltyCurve({ ...book, from: lo, to: hi, step: STEP }) : []),
    [book, lo, hi, printable],
  );

  return (
    <main data-main>
      <div data-fba>
        <h1>{H1}</h1>
        <p data-fba-tagline>{TAGLINE}</p>

        <section data-fba-card data-kdp aria-label="KDP royalty calculator">
          <div data-kdp-tabs role="tablist" aria-label="Book format" onKeyDown={onTabKey}>
            {FORMATS.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`kdp-tab-${f.id}`}
                aria-selected={format === f.id}
                aria-controls="kdp-panel"
                tabIndex={format === f.id ? 0 : -1}
                data-kdp-tab
                onClick={() => pick(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div data-kdp-panel id="kdp-panel" role="tabpanel" aria-labelledby={`kdp-tab-${format}`}>
            <div data-kdp-inputs>
              {format !== "ebook" && (
                <>
                  <div data-fba-row>
                    <label data-fba-field>
                      <span>Page count</span>
                      <input data-input inputMode="numeric" value={pages} onChange={(e) => { touch(); setPages(e.target.value); }} />
                    </label>
                    <label data-fba-field>
                      <span>Trim size</span>
                      <select data-select value={trim} onChange={(e) => { touch(); setTrim(e.target.value as Trim); }}>
                        <option value="regular">Regular (6 × 9)</option>
                        <option value="large">Large (8.5 × 11)</option>
                      </select>
                    </label>
                  </div>
                  <label data-fba-field>
                    <span>Ink and paper</span>
                    <select
                      data-select
                      value={ink}
                      onChange={(e) => { touch(); setInks((x) => ({ ...x, [format]: e.target.value as InkId })); }}
                    >
                      {INKS.filter((i) => PRINT_COSTS[format][i.id]).map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
                    </select>
                  </label>
                  <p data-roas-hint>
                    Large: wider than {PRINT.largeOver.widthIn} in or taller than {PRINT.largeOver.heightIn} in.
                  </p>
                </>
              )}

              <PriceControl
                format={format} book={book} priceStr={priceStr} price={price} setPrice={setPrice}
                lo={lo} hi={hi} zones={zones} q={q} minPrice={minPrice} printable={printable}
              />

              {format === "ebook" && (
                <details data-kdp-advanced>
                  <summary>Advanced: file size and royalty option</summary>
                  <div data-fba-row>
                    <label data-fba-field>
                      <span>File size (MB)</span>
                      <input data-input inputMode="decimal" value={fileMb} onChange={(e) => { touch(); setFileMb(e.target.value); }} />
                    </label>
                    <label data-fba-field>
                      <span>Royalty option</span>
                      <select data-select value={option} onChange={(e) => { touch(); setOption(e.target.value as EbookOption); }}>
                        <option value="70">70%</option>
                        <option value="35">35%</option>
                      </select>
                    </label>
                  </div>
                  <p data-roas-hint>
                    70% pays {usd(EBOOK.deliveryPerMb)} per MB for delivery, so 35% pays more only above
                    {price > 0 ? <> {(price / 0.3).toFixed(1)} MB at {usd(price)}</> : <> list price ÷ $0.30 in MB</>}.
                  </p>
                </details>
              )}

              <RoyaltyCurve
                format={format} curve={curve} lo={lo} hi={hi} price={price} royalty={q?.royalty ?? null}
                zones={zones} setPrice={setPrice}
              />
            </div>

            <div data-kdp-results>
              {!printable ? (
                <p data-fba-flag>{printError(format as PrintFormat, ink, pagesN)}</p>
              ) : !q ? (
                <p data-fba-empty>Enter a list price to see your royalty.</p>
              ) : (
                <>
                  <SplitDonut q={q} />
                  <PerSale q={q} pages={pagesN} fileMb={mb} />
                </>
              )}
            </div>
          </div>
        </section>

        <MonthlyProfit
          m={m}
          setM={(k, v) => { touch(); setM((x) => ({ ...x, [k]: v })); }}
          prices={prices}
          fileMb={mb}
          option={option}
          print={{ pages: pagesN, ink: inks.paperback, trim }}
          hcInk={inks.hardcover}
        />

        <p data-fba-source>{SOURCE_LINE}</p>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />

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

/* ── Price: typed field, slider with KDP's thresholds, live readout ───── */

/** Where a price sits along the track, as a CSS length: the thumb's centre
 *  runs from half a thumb in to half a thumb from the end. */
const clamp01 = (f: number) => Math.min(1, Math.max(0, f));
const along = (f: number) => `calc(var(--kdp-thumb) / 2 + (100% - var(--kdp-thumb)) * ${clamp01(f).toFixed(4)})`;
const span = (f: number) => `calc((100% - var(--kdp-thumb)) * ${clamp01(f).toFixed(4)})`;

function PriceControl({ format, book, priceStr, price, setPrice, lo, hi, zones, q, minPrice, printable }: {
  format: Format; book: Book; priceStr: string; price: number; setPrice: (v: string) => void;
  lo: number; hi: number; zones: Zone[]; q: PriceQuote | null; minPrice: number | null; printable: boolean;
}) {
  const frac = (p: number) => (p - lo) / (hi - lo);
  /* The 60% line is only a threshold when the minimum sits below it. */
  const ticks = (format === "ebook"
    ? [EBOOK.band70.min, EBOOK.band70.max]
    : [minPrice ?? NaN, ...(minPrice != null && minPrice < PRINT.highFrom ? [PRINT.highFrom] : [])])
    .filter((t) => t > lo && t < hi)
    .sort((a, b) => a - b);
  /* Scale labels: both ends and each threshold, dropping any that would
     crowd its neighbour on a phone. The ends always stay. */
  const labels: number[] = [lo];
  for (const t of ticks) if (frac(t) - frac(labels[labels.length - 1]) >= 0.17 && frac(hi) - frac(t) >= 0.17) labels.push(t);
  labels.push(hi);
  const sliderValue = Number.isFinite(price) ? Math.min(hi, Math.max(lo, price)) : lo;

  return (
    <div data-kdp-price>
      <div data-kdp-price-head>
        <label htmlFor="kdp-price">List price</label>
        <span data-fba-affix>
          <span aria-hidden>$</span>
          <input id="kdp-price" data-input inputMode="decimal" value={priceStr} onChange={(e) => setPrice(e.target.value)} />
        </span>
      </div>

      <div data-kdp-slider>
        <div data-kdp-track aria-hidden>
          {zones.map((z, i) => (
            <span
              key={z.label}
              data-kdp-zone={z.tone}
              data-first={i === 0 ? "" : undefined}
              data-last={i === zones.length - 1 ? "" : undefined}
              style={{ left: along(frac(z.from)), width: span(frac(z.to) - frac(z.from)) }}
            />
          ))}
          {ticks.map((t) => <span key={t} data-kdp-tick style={{ left: along(frac(t)) }} />)}
        </div>
        <input
          type="range"
          min={lo}
          max={hi}
          step={STEP}
          value={sliderValue}
          disabled={!printable}
          aria-label={`${format === "ebook" ? "eBook" : format === "paperback" ? "Paperback" : "Hardcover"} list price`}
          aria-valuetext={q ? `${usd(price)}: royalty ${usd(q.royalty)} a copy` : usd(price)}
          onChange={(e) => setPrice(Number(e.target.value).toFixed(2))}
        />
      </div>
      <div data-kdp-scale aria-hidden>
        {labels.map((p, i) => (
          <span key={p} data-edge={i === 0 ? "start" : i === labels.length - 1 ? "end" : undefined} style={{ left: along(frac(p)) }}>
            {usd(p)}
          </span>
        ))}
      </div>

      <ul data-kdp-zones aria-label="Royalty rates by list price">
        {zones.map((z) => <li key={z.label}><span data-kdp-swatch={z.tone} aria-hidden />{z.label}</li>)}
      </ul>

      <Readout format={format} book={book} q={q} price={price} minPrice={minPrice} printable={printable} />
    </div>
  );
}

/** The answer under the thumb, so a phone shows it while dragging, and one
 *  line on the threshold that matters at this price. Both reserve their
 *  height, so nothing below moves as the line changes. */
function Readout({ format, book, q, price, minPrice, printable }: {
  format: Format; book: Book; q: PriceQuote | null; price: number; minPrice: number | null; printable: boolean;
}) {
  if (!printable || !q) {
    return <div data-kdp-readout aria-hidden><p data-kdp-earn>&nbsp;</p><p data-kdp-why>&nbsp;</p></div>;
  }
  const at = (p: number, option: EbookOption = "70") => quoteAt({ ...book, option, price: p })?.royalty ?? null;
  let why: string;
  if (format === "ebook") {
    const e = q.ebook!;
    const { min, max } = EBOOK.band70;
    if (e.rate === EBOOK.rate70) why = `In the 70% band. The 35% option would pay ${usd(e.royalty35)}.`;
    else if (price < min) why = `Under ${usd(min)} only 35% is allowed. At ${usd(min)} the 70% option pays ${usd(at(min))}.`;
    else if (price > max) {
      why = price < e.match35At
        ? `Over ${usd(max)} only 35% is allowed. ${usd(max)} at 70% pays more (${usd(e.royaltyAtBandMax)}) until ${usd(e.match35At)}.`
        : `Over ${usd(max)} only 35% is allowed, and here it beats ${usd(max)} at 70% (${usd(e.royaltyAtBandMax)}).`;
    } else why = `You chose 35% under Advanced. The 70% option would pay ${usd(e.royalty70)}.`;
  } else if (minPrice != null && price < minPrice - 1e-9) {
    why = `KDP will not accept a price under ${usd(minPrice)} for this book (printing cost ÷ royalty rate).`;
  } else if (price < PRINT.highFrom) {
    why = `50% under ${usd(PRINT.highFrom)}. At ${usd(PRINT.highFrom)} the rate is 60% and you would earn ${usd(at(PRINT.highFrom))}.`;
  } else if (price > PRINT.maxPrice) {
    why = `KDP's maximum print list price on Amazon.com is ${usd0(PRINT.maxPrice)}.`;
  } else {
    why = minPrice != null && minPrice >= PRINT.highFrom
      ? `60% at every price KDP accepts for this book: each extra dollar adds ${usd(PRINT.rateHigh)} to your royalty.`
      : `60% from ${usd(PRINT.highFrom)}: each extra dollar on the price adds ${usd(PRINT.rateHigh)} to your royalty.`;
  }
  return (
    <div data-kdp-readout aria-live="polite">
      <p data-kdp-earn>
        You earn <strong data-negative={q.royalty < 0 ? "" : undefined}>{usd(q.royalty)}</strong> a copy at {pf(q.rate, 0)}
      </p>
      <p data-kdp-why>{why}</p>
    </div>
  );
}

/* ── Royalty across prices ───────────────────────────────────────────── */

/** Royalty against list price, one run per rate so each jump shows as a step
 *  rather than a slope. The drawing is a stretched SVG; every label is HTML
 *  laid over it, so text stays readable at any width. */
function RoyaltyCurve({ format, curve, lo, hi, price, royalty, zones, setPrice }: {
  format: Format; curve: CurvePoint[]; lo: number; hi: number; price: number; royalty: number | null;
  zones: Zone[]; setPrice: (v: string) => void;
}) {
  if (!curve.length) return null;
  const W = 600;
  const H = 160;
  const yTop = niceCeil(Math.max(...curve.map((c) => c.royalty), 1));
  const minR = Math.min(...curve.map((c) => c.royalty), 0);
  const yBot = minR < 0 ? -niceCeil(-minR) : 0;
  const x = (p: number) => ((p - lo) / (hi - lo)) * W;
  const y = (r: number) => H - ((r - yBot) / (yTop - yBot)) * H;

  const runs: CurvePoint[][] = [];
  for (const c of curve) {
    const last = runs[runs.length - 1];
    if (last && last[last.length - 1].rate === c.rate) last.push(c);
    else runs.push([c]);
  }
  const d = runs.map((r) => r.map((c, i) => `${i ? "L" : "M"}${x(c.price).toFixed(1)} ${y(c.royalty).toFixed(1)}`).join("")).join("");
  const inRange = Number.isFinite(price) && price >= lo && price <= hi && royalty != null;

  /* Prices worth a click: KDP's thresholds and common list prices. */
  const firstOk = zones.find((z) => z.tone !== "below")?.from ?? lo;
  const picks = [...new Set((format === "ebook"
    ? [0.99, 2.99, 4.99, 9.99, 12.99, 14.99]
    : [firstOk, 9.98, 9.99, 14.99, 19.99, 24.99, 29.99, 34.99]
  ).map(cents))]
    .filter((p) => p >= lo && p <= hi && (format === "ebook" || p >= firstOk))
    .slice(0, 6);
  const royaltyAt = (p: number) => curve.find((c) => same(c.price, p))?.royalty ?? null;

  return (
    <figure data-kdp-curve>
      <figcaption>Royalty across prices</figcaption>
      <div data-kdp-plot>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`Royalty per copy from ${usd(lo)} to ${usd(hi)}. ${picks.map((p) => `${usd(p)} pays ${usd(royaltyAt(p))}`).join("; ")}.`}
        >
          {zones.filter((z) => z.tone === "best").map((z) => (
            <rect key={z.label} x={x(z.from)} y={0} width={Math.max(0, x(z.to) - x(z.from))} height={H} data-kdp-curve-band />
          ))}
          <line x1={0} x2={W} y1={y(0)} y2={y(0)} data-kdp-curve-zero vectorEffect="non-scaling-stroke" />
          {inRange && <line x1={x(price)} x2={x(price)} y1={0} y2={H} data-kdp-curve-now vectorEffect="non-scaling-stroke" />}
          <path d={d} data-kdp-curve-line vectorEffect="non-scaling-stroke" />
        </svg>
        <span data-kdp-curve-y style={{ top: "0%" }}>{usd0(yTop)}</span>
        <span data-kdp-curve-y style={{ top: `${(y(0) / H) * 100}%` }}>$0</span>
        {inRange && (
          <span
            data-kdp-curve-dot
            data-negative={royalty! < 0 ? "" : undefined}
            style={{ left: `${(x(price) / W) * 100}%`, top: `${(y(royalty!) / H) * 100}%` }}
            aria-hidden
          />
        )}
      </div>
      <div data-kdp-curve-x aria-hidden><span>{usd(lo)}</span><span>list price</span><span>{usd(hi)}</span></div>
      <div data-kdp-picks role="group" aria-label="Royalty at common prices; choose one to set the price">
        {picks.map((p) => {
          const r = royaltyAt(p);
          return (
            <button key={p} type="button" data-kdp-pick aria-pressed={same(price, p)} onClick={() => setPrice(p.toFixed(2))}>
              <span>{usd(p)}</span>
              <strong data-negative={r != null && r < 0 ? "" : undefined}>{usd(r)}</strong>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

function niceCeil(v: number) {
  if (v <= 1) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const s of [1, 2, 2.5, 5, 10]) if (s * p >= v - 1e-9) return s * p;
  return 10 * p;
}

/* ── Where the list price goes ───────────────────────────────────────── */

const RING = { size: 200, outer: 92, inner: 60, gap: 1.2 };
function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const c = RING.size / 2;
  return [(c + r * Math.cos(rad)).toFixed(2), (c + r * Math.sin(rad)).toFixed(2)];
}
function sector(from: number, to: number): string {
  /* A whole ring cannot be one arc; draw it as two halves. */
  if (to - from >= 359.9) return sector(from, from + 180) + sector(from + 180, from + 359.99);
  const { outer, inner } = RING;
  const [x1, y1] = polar(outer, from);
  const [x2, y2] = polar(outer, to);
  const [x3, y3] = polar(inner, to);
  const [x4, y4] = polar(inner, from);
  const large = to - from > 180 ? 1 : 0;
  return `M${x1} ${y1}A${outer} ${outer} 0 ${large} 1 ${x2} ${y2}L${x3} ${y3}A${inner} ${inner} 0 ${large} 0 ${x4} ${y4}Z`;
}

/** The list price split three ways. The royalty takes the accent (it is the
 *  answer); the printing or delivery cost and Amazon's share sit on the gray
 *  cost ramp. Every slice is named and figured in the legend, so colour is
 *  never the only way to read one. */
function SplitDonut({ q }: { q: PriceQuote }) {
  const parts = [
    { key: "royalty", label: "Your royalty", value: q.split.royalty, fill: "var(--accent)" },
    { key: "amazon", label: "Amazon's share", value: q.split.amazon, fill: "var(--slice-cost-4)" },
    { key: "cost", label: q.format === "ebook" ? "Delivery cost" : "Printing cost", value: q.split.cost, fill: "var(--slice-cost-2)" },
  ];
  /* A negative royalty cannot be a slice: the ring then shows only the
     costs, and the hole says the royalty is below zero. */
  const live = parts.filter((p) => p.value > 0);
  const total = live.reduce((a, p) => a + p.value, 0) || 1;
  const gap = live.length > 1 ? RING.gap / 2 : 0;
  let cursor = 0;
  const slices = live.map((p) => {
    const from = (cursor / total) * 360;
    cursor += p.value;
    const to = (cursor / total) * 360;
    const a = from + gap;
    return { ...p, d: sector(a, Math.max(a + 0.1, to - gap)) };
  });
  const neg = q.royalty < 0;

  return (
    <figure data-kdp-pie>
      <svg
        viewBox={`0 0 ${RING.size} ${RING.size}`}
        role="img"
        aria-label={`Where a ${usd(q.price)} sale goes: ${parts.map((p) => `${p.label.toLowerCase()} ${usd(p.value)}`).join(", ")}.`}
      >
        {slices.map((s) => <path key={s.key} d={s.d} fill={s.fill} />)}
        <text data-kdp-pie-figure data-negative={neg ? "" : undefined} x="50%" y="50%" dy="-0.2em" textAnchor="middle">
          {usd(q.royalty)}
        </text>
        <text data-kdp-pie-caption x="50%" y="50%" dy="1.6em" textAnchor="middle">
          {neg ? "a loss per copy" : `of ${usd(q.price)}`}
        </text>
      </svg>
      <ul data-kdp-pie-key>
        {parts.map((p) => (
          <li key={p.key}>
            <span data-kdp-pie-swatch style={{ background: p.fill }} aria-hidden />
            <span>{p.label}</span>
            <strong data-negative={p.value < 0 ? "" : undefined}>{usd(p.value)}</strong>
            <span data-kdp-pie-pct>{pf(p.value / q.price, 0)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/* ── Per sale, in rows ───────────────────────────────────────────────── */

type Row = { key: string; label: string; value: string; note: string; strong?: boolean; negative?: boolean };

function PerSale({ q, pages, fileMb }: { q: PriceQuote; pages: number; fileMb: number }) {
  const rows: Row[] = [];
  if (q.format === "ebook") {
    const e = q.ebook!;
    const at70 = e.rate === EBOOK.rate70;
    rows.push({
      key: "royalty", label: `Royalty per sale (${at70 ? "70%" : "35%"})`, value: usd(e.royalty), strong: true,
      note: at70 ? `0.70 × (${usd(q.price)} − ${usd(e.delivery)} delivery).` : `0.35 × ${usd(q.price)}.`,
    });
    rows.push({
      key: "delivery", label: "Delivery cost", value: usd(q.split.cost),
      note: at70
        ? `Assumes a ${fileMb} MB file at ${usd(EBOOK.deliveryPerMb)} per MB. Change it under Advanced.`
        : "None: KDP charges delivery at 70% only.",
    });
    rows.push({ key: "amazon", label: "Amazon's share", value: usd(q.split.amazon), note: `${pf(q.split.amazon / q.price, 0)} of the list price.` });
    rows.push(at70
      ? { key: "other", label: "The 35% option would pay", value: usd(e.royalty35), note: `70% pays more unless the file is over ${e.fileFlipMb.toFixed(1)} MB.` }
      : e.royalty70 == null
        ? { key: "other", label: "The 70% option would pay", value: "n/a", note: `70% is open from ${usd(EBOOK.band70.min)} to ${usd(EBOOK.band70.max)} only.` }
        : { key: "other", label: "The 70% option would pay", value: usd(e.royalty70), note: "Switch to it under Advanced." });
    rows.push({
      key: "min", label: "Minimum list price", value: usd(e.min35), negative: e.flags.includes("below-min"),
      note: e.flags.includes("below-min")
        ? "Your price is below it, so KDP will not accept it."
        : `At 35% for a file this size; ${usd(EBOOK.band70.min)} for 70%.`,
    });
  } else {
    const p = q.print!;
    const below = p.flags.includes("below-min");
    rows.push({
      key: "royalty", label: `Royalty per sale (${pf(p.rate, 0)})`, value: usd(p.royalty), strong: true, negative: (p.royalty ?? 0) < 0,
      note: `${(p.rate ?? 0).toFixed(2)} × ${usd(q.price)} − ${usd(p.cost)} printing.`,
    });
    rows.push({
      key: "printing", label: "Printing cost", value: usd(p.cost),
      note: p.flat ? `A flat ${usd(p.cost)} for ${int(pages)} pages.` : `${usd(p.fixed)} + ${int(pages)} pages × $${p.perPage}.`,
    });
    rows.push({ key: "amazon", label: "Amazon's share", value: usd(q.split.amazon), note: `${pf(1 - (p.rate ?? 0), 0)} of the list price.` });
    rows.push({
      key: "min", label: "Minimum list price", value: usd(p.minPrice), negative: below,
      note: below ? "Your price is below it, so KDP will not accept it." : "Printing cost ÷ royalty rate.",
    });
    rows.push(q.format === "paperback"
      ? {
        key: "ed", label: "Expanded Distribution", value: usd(p.expanded), negative: (p.expanded ?? 0) < 0,
        note: (p.expanded ?? 0) < 0
          ? "40% of the price does not cover printing: each copy would lose money."
          : `0.40 × ${usd(q.price)} − ${usd(p.cost)}, for bookstores and libraries.`,
      }
      : { key: "ed", label: "Expanded Distribution", value: "n/a", note: "KDP offers it for paperbacks only." });
  }
  rows.push({
    key: "acos", label: "Break-even ACOS", value: q.royalty > 0 ? pf(q.royalty / q.price) : "—",
    note: "Royalty ÷ list price: the most an ad can cost per sale it drives.",
  });
  return <ResultRows rows={rows} />;
}

function ResultRows({ rows }: { rows: Row[] }) {
  return (
    <table data-fba-results-table data-kdp-table>
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
  );
}

const INK_NAME: Record<InkId, string> = {
  black: "black-ink", groundwood: "groundwood", standard: "standard color", premium: "premium color",
};

/** Why a print format has no printing cost, in words. */
function printError(format: PrintFormat, ink: InkId, pages: number): string {
  const spec = PRINT_COSTS[format][ink];
  if (!spec) return "KDP prints hardcovers in black ink or premium color only.";
  const [a, b] = spec.pages;
  return `KDP prints ${INK_NAME[ink]} ${format}s with ${a} to ${b} pages${Number.isFinite(pages) ? `, not ${int(pages)}` : ""}. Change the page count to see your royalty.`;
}

/* ── Monthly profit (collapsed) ─────────────────────────────────────── */

function MonthlyProfit({ m, setM, prices, fileMb, option, print, hcInk }: {
  m: Monthly; setM: (k: keyof Monthly, v: string) => void; prices: Record<Format, string>;
  fileMb: number; option: EbookOption; print: { pages: number; ink: InkId; trim: Trim }; hcInk: InkId;
}) {
  const eb = num(prices.ebook);
  const pb = num(prices.paperback);
  const hc = num(prices.hardcover);
  const oneOff = opt(m.cover) + opt(m.editing) + opt(m.isbn);

  /* A format is in the month when it has a price and something sold. Each
     print format prints in the ink chosen on its own tab. */
  const r: KdpResult | null = useMemo(() => {
    const ebOn = eb > 0 && (opt(m.ebookUnits) > 0 || opt(m.kenp) > 0);
    const pbOn = pb > 0 && (opt(m.pbUnits) > 0 || opt(m.pbExpanded) > 0);
    const hcOn = hc > 0 && opt(m.hcUnits) > 0;
    if (!ebOn && !pbOn && !hcOn) return null;
    const rate = num(m.kenpRate);
    return calculate({
      ebook: ebOn ? { price: eb, fileMb, option, units: opt(m.ebookUnits), kenp: opt(m.kenp), kenpRate: rate > 0 ? rate : null } : undefined,
      paperback: pbOn ? { price: pb, units: opt(m.pbUnits), expandedUnits: opt(m.pbExpanded) } : undefined,
      hardcover: hcOn ? { price: hc, units: opt(m.hcUnits), ink: hcInk } : undefined,
      print,
      adSpend: opt(m.adSpend),
      oneOff,
    });
  }, [eb, pb, hc, m, fileMb, option, print, hcInk, oneOff]);

  const at = (p: number) => (p > 0 ? ` at ${usd(p)}` : "");

  return (
    <details data-fba-card data-kdp-monthly>
      <summary>
        <span data-kdp-monthly-title>Monthly profit</span>
        <span data-kdp-monthly-sub>Copies sold, Kindle Unlimited page reads, Amazon Ads, and earning back the cover, editing and ISBNs</span>
      </summary>
      <div data-kdp-monthly-grid>
        <form onSubmit={(e) => e.preventDefault()} aria-label="Monthly sales and costs">
          <p data-roas-hint>
            Prices, ink and pages come from the tabs above. Set a format to 0 if you do not publish it.
          </p>
          <fieldset data-kdp-group>
            <legend data-fba-card-title>Kindle eBook</legend>
            <div data-fba-row>
              <Num label={`Sold a month${at(eb)}`} value={m.ebookUnits} onChange={(v) => setM("ebookUnits", v)} />
              <Num label="KENP read a month" value={m.kenp} onChange={(v) => setM("kenp", v)} optional />
            </div>
            <div data-fba-row>
              <Money label="Rate per KENP" value={m.kenpRate} onChange={(v) => setM("kenpRate", v)} placeholder="from your report" optional />
            </div>
            <p data-roas-hint>
              Needs KDP Select. Rate: a month's Kindle+ royalties ÷ its KENP read, from your KDP reports.
            </p>
          </fieldset>
          <fieldset data-kdp-group>
            <legend data-fba-card-title>Print</legend>
            <div data-fba-row>
              <Num label={`Paperbacks a month${at(pb)}`} value={m.pbUnits} onChange={(v) => setM("pbUnits", v)} />
              <Num label={`Hardcovers a month${at(hc)}`} value={m.hcUnits} onChange={(v) => setM("hcUnits", v)} />
            </div>
            <div data-fba-row>
              <Num label="Expanded Distribution" value={m.pbExpanded} onChange={(v) => setM("pbExpanded", v)} optional />
            </div>
          </fieldset>
          <fieldset data-kdp-group>
            <legend data-fba-card-title>Costs</legend>
            <div data-fba-row>
              <Money label="Ads a month" value={m.adSpend} onChange={(v) => setM("adSpend", v)} optional />
              <Money label="Cover design" value={m.cover} onChange={(v) => setM("cover", v)} optional />
            </div>
            <div data-fba-row>
              <Money label="Editing" value={m.editing} onChange={(v) => setM("editing", v)} optional />
              <Money label="ISBNs and other" value={m.isbn} onChange={(v) => setM("isbn", v)} optional />
            </div>
          </fieldset>
        </form>
        <section aria-live="polite" aria-label="Monthly results">
          {!r ? (
            <p data-fba-empty>Enter how many copies you sell a month to see your monthly royalties and profit.</p>
          ) : (
            <MonthlyResults r={r} />
          )}
        </section>
      </div>
    </details>
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

function Verdict({ r }: { r: KdpResult }) {
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

function MonthlyResults({ r }: { r: KdpResult }) {
  const rows: Row[] = [];
  if (r.ebook) {
    rows.push({
      key: "ebook", label: "eBook royalties", value: usd0(r.ebook.monthly),
      note: `${int(r.ebook.units)} × ${usd(r.ebook.royalty)}${r.ebook.flags.includes("fell-to-35") ? ", paid at 35%: 70% needs the eBook at least 20% below your print price" : ""}.`,
    });
  }
  for (const [label, x] of [["Paperback", r.paperback], ["Hardcover", r.hardcover]] as const) {
    if (!x) continue;
    rows.push({
      key: label, label: `${label} royalties`, value: x.monthly == null ? "—" : usd0(x.monthly), negative: x.monthly == null,
      note: x.monthly == null || x.royalty == null
        ? `KDP does not print this ${label.toLowerCase()} with the ink and page count on its tab.`
        : `${int(x.units)} × ${usd(x.royalty)}${x.expandedUnits > 0 ? `, plus ${int(x.expandedUnits)} × ${usd(x.expanded)} Expanded Distribution` : ""}.`,
    });
  }
  if (r.ku && (r.ku.kenp > 0 || r.ku.rate != null)) {
    rows.push({
      key: "ku", label: "Kindle Unlimited page reads", value: r.ku.monthly == null ? "—" : usd0(r.ku.monthly),
      note: r.ku.monthly == null ? "Enter the rate per KENP from your KDP reports to include page reads." : `${int(r.ku.kenp)} KENP × $${r.ku.rate} a page.`,
    });
  }
  rows.push({ key: "royalties", label: "Royalties a month", value: usd0(r.royalties), strong: true, note: "Every format and page reads, added up." });
  rows.push({
    key: "profit", label: "Profit after ads", value: usd0(r.profit), strong: true, negative: r.profit < 0,
    note: r.adSpend > 0 ? `Royalties less ${usd0(r.adSpend)} of Amazon Ads.` : "No ad spend entered, so this is your royalties.",
  });
  rows.push({
    key: "beAcos", label: "Break-even ACOS", value: pf(r.beAcos),
    note: r.beAcos == null
      ? "Needs copies sold on Amazon."
      : `Royalties ÷ sales at list price${r.adShare != null ? `; your ads are ${pf(r.adShare)} of all sales` : ""}.`,
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
      <ResultRows rows={rows} />
    </>
  );
}
