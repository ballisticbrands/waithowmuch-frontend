import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { apiFetch, type BusinessCard } from "@/lib/api";
import { roasCalculatorBootstrap } from "@/lib/bootstrap";
import { gaEvent, trackCtaClick } from "@/lib/track";
import { calculate, type RoasResult } from "@/data/roas.mjs";
import { roasBenchmarks, type RoasBenchmark } from "@/data/roas-benchmarks.mjs";
import {
  TITLE, DOC_TITLE, LEDE, PRIVACY_LINE, SECTIONS, FAQ, RELATED, BENCHMARK_INTRO, FBA_CALCULATOR_PATH,
  EXAMPLE, benchmarkSummaryHtml,
} from "@/data/roas-calculator-page.mjs";
import { businessPath } from "@/data/site";

/**
 * /tools/roas-calculator/ — ROAS, ACOS, break-even ROAS and ACOS, TACoS and
 * profit after ads, with the ad spend and margins of real businesses beside
 * them (data/roas-benchmarks.mjs, read from each profile's margin block).
 *
 * Client-side only: nothing is sent anywhere. The words under the calculator
 * come from data/roas-calculator-page.mjs, which the prerender emits too.
 * Laid out with the FBA calculator's data-fba-* styles, so the two tools
 * look and behave alike.
 */

type Fields = {
  price: string; productCost: string; fees: string; otherCosts: string;
  adSpend: string; adSales: string; totalSales: string;
};

const DEFAULTS: Fields = {
  price: String(EXAMPLE.price), productCost: EXAMPLE.productCost.toFixed(2), fees: EXAMPLE.fees.toFixed(2),
  otherCosts: "0", adSpend: "1000", adSales: "4000", totalSales: "10000",
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
/** A fraction as a percentage: 0.25 → "25.0%". */
const pf = (f: number | null | undefined) => (f == null || !Number.isFinite(f) ? "—" : `${(f * 100).toFixed(1).replace("-", "−")}%`);
/** Already a percentage: 25 → "25.0%". */
const pp = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "—" : `${n.toFixed(1).replace("-", "−")}%`);
const x2 = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "—" : n.toFixed(2));

type Published = Pick<BusinessCard, "slug" | "name" | "snapshotMonth">;

/** Published businesses (slug → name). Inlined by the prerender on a landing;
 *  fetched on a client-side navigation. Null until known. */
function usePublished(): Map<string, Published> | null {
  const [list, setList] = useState<Published[] | null>(() => roasCalculatorBootstrap()?.businesses ?? null);
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

export default function RoasCalculator() {
  useSetCrumbs(() => [{ label: "ROAS calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  const [f, setF] = useState<Fields>(DEFAULTS);
  const [compareSlug, setCompareSlug] = useState("");

  /* One "calculator_use" per page view, on the first edit. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool: "roas_calculator" });
  };
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { touch(); setF((x) => ({ ...x, [k]: v })); };

  const published = usePublished();
  const bench = useMemo(
    () => (published ? roasBenchmarks().filter((b) => published.has(b.slug)) : []),
    [published],
  );
  const nameOf = (slug: string) => published?.get(slug)?.name ?? slug;
  const compare = bench.find((b) => b.slug === compareSlug) ?? null;

  const loadPreset = (b: RoasBenchmark) => {
    touch();
    gaEvent("calculator_preset", { tool: "roas_calculator", business_slug: b.slug });
    setF((x) => ({
      ...x,
      price: trim(b.price), productCost: trim(b.productCost), fees: trim(b.fees), otherCosts: trim(b.otherCosts),
    }));
  };

  const price = num(f.price);
  const opt = (s: string) => (Number.isFinite(num(s)) && num(s) >= 0 ? num(s) : 0);
  const optOrNull = (s: string) => (Number.isFinite(num(s)) && num(s) > 0 ? num(s) : undefined);
  const result: RoasResult | null = useMemo(() => {
    if (!(price > 0)) return null;
    return calculate({
      price, productCost: opt(f.productCost), fees: opt(f.fees), otherCosts: opt(f.otherCosts),
      adSpend: opt(f.adSpend), adSales: opt(f.adSales), totalSales: optOrNull(f.totalSales),
    });
  }, [f, price]);

  return (
    <main data-main>
      <div data-fba>
        <h1>{TITLE}</h1>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />
        <p data-fba-source>{PRIVACY_LINE}</p>

        <div data-fba-grid>
          {/* ── Inputs ───────────────────────────────────────────── */}
          <form data-fba-card data-fba-inputs onSubmit={(e) => e.preventDefault()} aria-label="Your product and ads">
            <h2 data-fba-card-title>Per unit</h2>
            <div data-fba-row>
              <Money label="Sale price" value={f.price} onChange={(v) => set("price", v)} />
              <Money label="Product cost" value={f.productCost} onChange={(v) => set("productCost", v)} />
              <Money label="Amazon fees" value={f.fees} onChange={(v) => set("fees", v)} />
              <Money label="Other costs" value={f.otherCosts} onChange={(v) => set("otherCosts", v)} optional />
            </div>
            <p data-roas-hint>
              Product cost is everything to make it and land it: goods, packaging, freight and duty. Amazon fees are the
              referral and FBA fees on one sale; the <Link to={FBA_CALCULATOR_PATH}>FBA calculator</Link> works them out
              from your box and category. Selling elsewhere? Put that platform's and the payment fees there instead.
            </p>

            <h2 data-fba-card-title data-roas-second>Ads, for one period</h2>
            <div data-fba-row>
              <Money label="Ad spend" value={f.adSpend} onChange={(v) => set("adSpend", v)} />
              <Money label="Ad-attributed sales" value={f.adSales} onChange={(v) => set("adSales", v)} />
            </div>
            <div data-fba-row>
              <Money label="Total sales" value={f.totalSales} onChange={(v) => set("totalSales", v)} optional />
            </div>
            <p data-roas-hint>
              Use the same period for all three, a week or a month. Ad-attributed sales are what the ad console credits to
              the ads; total sales include the organic ones too, and give you TACoS.
            </p>
          </form>

          {/* ── Results ──────────────────────────────────────────── */}
          <section data-fba-card data-fba-results aria-live="polite" aria-label="Results">
            <h2 data-fba-card-title>Results</h2>

            <label data-fba-field>
              <span>Compare with a real business</span>
              <select
                data-select value={compareSlug} disabled={!bench.length}
                onChange={(e) => {
                  setCompareSlug(e.target.value);
                  if (e.target.value) gaEvent("calculator_compare", { tool: "roas_calculator", business_slug: e.target.value });
                }}
              >
                <option value="">{published ? "Choose a business…" : "Loading…"}</option>
                {[...bench].sort((a, b) => nameOf(a.slug).localeCompare(nameOf(b.slug))).map((b) => (
                  <option key={b.slug} value={b.slug}>{nameOf(b.slug)}</option>
                ))}
              </select>
            </label>

            {!result ? (
              <p data-fba-empty>Enter a sale price above $0 to see the results.</p>
            ) : (
              <Results r={result} price={price} spend={opt(f.adSpend)} sales={opt(f.adSales)} total={optOrNull(f.totalSales)} compare={compare} />
            )}

            {compare && (
              <div data-fba-compare-note>
                <p>
                  <strong>Theirs: {nameOf(compare.slug)}</strong>, at {usd(compare.price)} ({compare.priceLabel.toLowerCase()}),
                  from the margin breakdown on its <Link to={businessPath(compare.slug)}>case study</Link>.{" "}
                  {compare.basis === "modelled"
                    ? "Its ad share is modelled from the sponsored ads we can see in Amazon search, a floor."
                    : compare.basis === "reported"
                      ? "Its ad share is the founders' own figure."
                      : ""}
                  {compare.note ? ` Note: ${compare.note}.` : ""} No ROAS or ACOS: nobody outside their ad account can see
                  which sales the ads drove.
                </p>
                <button type="button" data-btn data-variant="ghost" onClick={() => loadPreset(compare)}>
                  Load their price and costs
                </button>
              </div>
            )}
          </section>
        </div>

        <aside data-fba-cta>
          <p>
            We publish the real unit economics of Amazon businesses, ad spend included, with every figure sourced. One email
            when a new case study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("roas_calculator")}>Get emails on new case studies</Link>
        </aside>

        <div data-prose data-fba-copy>
          <section id="benchmarks">
            <h2>Real ad spend and margins</h2>
            <p>{BENCHMARK_INTRO}</p>
            {/* Fixed shape whatever the data: the table is reserved before the
                business list arrives, so nothing below it jumps. */}
            <table data-fba-table data-roas-bench>
              <thead>
                <tr>
                  <th>Business</th><th>Ads, % of revenue</th><th>Margin before ads</th><th>Margin after ads</th>
                  <th>Break-even ROAS</th><th>Break-even ACOS</th>
                </tr>
              </thead>
              <tbody>
                {bench.map((b) => (
                  <tr key={b.slug}>
                    <td><Link to={businessPath(b.slug)}>{nameOf(b.slug)}</Link>{b.note || b.basis !== "modelled" ? " *" : ""}</td>
                    <td>{pp(b.adPct)}</td>
                    <td>{pp(b.preAdPct)}</td>
                    <td>{pp(b.marginPct)}</td>
                    <td>{x2(b.beRoas)}</td>
                    <td>{pp(b.beAcosPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bench.length > 0 && (
              <>
                <div dangerouslySetInnerHTML={{ __html: benchmarkSummaryHtml(bench, nameOf, businessPath) }} />
                <ul data-roas-notes>
                  {bench.filter((b) => b.note).map((b) => (
                    <li key={b.slug}>* {nameOf(b.slug)}: {b.note}.</li>
                  ))}
                </ul>
              </>
            )}
          </section>

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

function Verdict({ r, spend }: { r: RoasResult; spend: number }) {
  switch (r.verdict) {
    case "no-margin":
      return (
        <p data-roas-verdict data-tone="bad">
          <strong>No break-even is possible.</strong> Each sale loses {usd(-(r.preAdProfit ?? 0))} before any advertising, so
          no ROAS can pay for the ads. Raise the price or cut costs first; better ads cannot fix this.
        </p>
      );
    case "no-spend":
      return (
        <p data-roas-verdict>
          <strong>Break-even ROAS {x2(r.beRoas)}</strong> (ACOS {pf(r.beAcos)}). Enter a period's ad spend and the sales it drove
          to see whether your ads clear it.
        </p>
      );
    case "no-sales":
      return (
        <p data-roas-verdict data-tone="bad">
          <strong>{usd0(spend)} of ads, no ad sales.</strong> The whole spend is a loss. Break-even is a ROAS of {x2(r.beRoas)}.
        </p>
      );
    case "above":
      return (
        <p data-roas-verdict data-tone="good">
          <strong>Your ads make money.</strong> A ROAS of {x2(r.roas)} is above your break-even of {x2(r.beRoas)}, leaving{" "}
          {usd0(r.profitAdSales)} on the ad-driven sales after the ads.
        </p>
      );
    case "at":
      return (
        <p data-roas-verdict>
          <strong>Your ads break even.</strong> A ROAS of {x2(r.roas)} matches your break-even of {x2(r.beRoas)}: the ad-driven
          sales pay for the ads and leave nothing.
        </p>
      );
    case "below":
      return (
        <p data-roas-verdict data-tone="bad">
          <strong>Your ads lose money.</strong> A ROAS of {x2(r.roas)} is below your break-even of {x2(r.beRoas)}, a loss of{" "}
          {usd0(-(r.profitAdSales ?? 0))} on the ad-driven sales. To break even on them, spend at most {usd0(r.maxSpend)}.
        </p>
      );
    default:
      return <p data-roas-verdict>Enter your ad spend and sales.</p>;
  }
}

function Results({ r, price, spend, sales, total, compare }: {
  r: RoasResult; price: number; spend: number; sales: number; total: number | undefined; compare: RoasBenchmark | null;
}) {
  const c = compare;
  const noMargin = r.m != null && r.m <= 0;
  const needTotal = "Add total sales to see it.";

  type Row = { key: string; label: string; yours: string; note: string; theirs?: string; strong?: boolean; negative?: boolean };
  const rows: Row[] = [
    {
      key: "m", label: "Margin before ads", yours: pf(r.m), theirs: c ? pp(c.preAdPct) : undefined, negative: noMargin,
      note: noMargin
        ? `Each sale loses ${usd(-(r.preAdProfit ?? 0))} before advertising.`
        : `${usd(r.preAdProfit)} of each ${usd(price)} sale is left after product cost and fees.`,
    },
    {
      key: "beRoas", label: "Break-even ROAS", yours: noMargin ? "None" : x2(r.beRoas), theirs: c ? x2(c.beRoas) : undefined, strong: true,
      note: noMargin
        ? "With no margin before ads, no ROAS can break even."
        : `Each $1 of ads must bring back ${usd(r.beRoas)} in sales to break even: 1 ÷ ${pf(r.m)}.`,
    },
    {
      key: "beAcos", label: "Break-even ACOS", yours: noMargin ? "None" : pf(r.beAcos), theirs: c ? pp(c.beAcosPct) : undefined,
      note: noMargin
        ? "There is nothing left over to spend on ads."
        : `Ads can cost up to ${pf(r.beAcos)} of the sales they drive before those sales lose money.`,
    },
    {
      key: "roas", label: "ROAS", yours: x2(r.roas), theirs: c ? "—" : undefined, strong: true,
      negative: r.roas != null && r.beRoas != null && r.roas < r.beRoas - 0.005,
      note: r.roas == null
        ? "Enter ad spend to see it."
        : `Each $1 of ads brought back ${usd(r.roas)} in sales: ${usd0(sales)} ÷ ${usd0(spend)}.`,
    },
    {
      key: "acos", label: "ACOS", yours: pf(r.acos), theirs: c ? "—" : undefined,
      negative: r.acos != null && r.beAcos != null && r.acos > r.beAcos + 0.00005,
      note: r.acos == null
        ? spend > 0 ? "No ad sales, so every ad dollar was lost." : "Enter ad spend and ad sales to see it."
        : `Ads cost ${pf(r.acos)} of the sales they drove: 1 ÷ ROAS.`,
    },
    {
      key: "tacos", label: "TACoS", yours: pf(r.tacos), theirs: c ? pp(c.adPct) : undefined,
      note: r.tacos == null ? "Add total sales to see what share of all revenue goes to ads." : `Ads cost ${pf(r.tacos)} of all sales, organic included.`,
    },
    {
      key: "perAdUnit", label: "Profit per ad-driven sale", yours: usd(r.profitPerAdUnit), theirs: c ? "—" : undefined,
      negative: (r.profitPerAdUnit ?? 0) < 0,
      note: r.profitPerAdUnit == null
        ? "Needs ad sales to work out."
        : `What one ad-driven sale keeps after its share of the ads: ${usd(price)} × (${pf(r.m)} − ${pf(r.acos)}).`,
    },
    {
      key: "adSales", label: "Profit on ad-driven sales", yours: usd0(r.profitAdSales), theirs: c ? "—" : undefined, strong: true,
      negative: (r.profitAdSales ?? 0) < 0,
      note: r.profitAdSales == null
        ? "Enter ad spend and ad sales."
        : `${usd0(sales)} of ad sales earn ${usd0(sales * (r.m ?? 0))} before ads, less ${usd0(spend)} of ads.`,
    },
    {
      key: "perUnitAll", label: "Profit per unit after ads, all sales",
      yours: usd(r.profitPerUnitAll), theirs: c ? usd((c.price * c.marginPct) / 100) : undefined,
      negative: (r.profitPerUnitAll ?? 0) < 0,
      note: r.profitPerUnitAll == null ? needTotal : `Each unit sold, ad-driven or not, after the period's ads: ${usd(price)} × (${pf(r.m)} − ${pf(r.tacos)}).`,
    },
    {
      key: "all", label: "Profit after ads, all sales", yours: usd0(r.profitAll), theirs: c ? "—" : undefined, strong: true,
      negative: (r.profitAll ?? 0) < 0,
      note: r.profitAll == null || total == null ? needTotal : `${usd0(total)} of sales × ${pf(r.m)}, less ${usd0(spend)} of ads.`,
    },
    {
      key: "marginAll", label: "Margin after ads", yours: pf(r.marginAll), theirs: c ? pp(c.marginPct) : undefined,
      negative: (r.marginAll ?? 0) < 0,
      note: r.marginAll == null ? needTotal : "Profit after ads as a share of all sales: margin before ads less TACoS.",
    },
  ];

  return (
    <>
      <Verdict r={r} spend={spend} />
      <table data-fba-results-table>
        {c && (
          <thead>
            <tr><th scope="col"><span data-sr-only>Line</span></th><th scope="col">Yours</th><th scope="col">Theirs</th></tr>
          </thead>
        )}
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} data-strong={row.strong ? "" : undefined}>
              <th scope="row">
                <span data-fba-line>{row.label}</span>
                <span data-fba-note>{row.note}</span>
              </th>
              <td data-fba-num data-negative={row.negative ? "" : undefined}>{row.yours}</td>
              {c && <td data-fba-num data-theirs>{row.theirs}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {r.flags.includes("total-below-ad-sales") && (
        <p data-fba-flag>Total sales are lower than ad-attributed sales. Total sales should include the ad-driven ones.</p>
      )}
    </>
  );
}
