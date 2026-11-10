import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { gaEvent, trackCtaClick } from "@/lib/track";
import { calculate, type RoasResult } from "@/data/roas.mjs";
import {
  H1, TAGLINE, DOC_TITLE, LEDE, PRIVACY_LINE, SECTIONS, FAQ, RELATED, FBA_CALCULATOR_PATH, EXAMPLE,
} from "@/data/roas-calculator-page.mjs";

/**
 * /tools/roas-calculator/ — ROAS, ACOS, break-even ROAS and ACOS, TACoS and
 * profit after ads.
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
const usd = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;
const usd0 = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`;
/** A fraction as a percentage: 0.25 → "25.0%". */
const pf = (f: number | null | undefined) => (f == null || !Number.isFinite(f) ? "—" : `${(f * 100).toFixed(1).replace("-", "−")}%`);
const x2 = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "—" : n.toFixed(2));

export default function RoasCalculator() {
  useSetCrumbs(() => [{ label: "ROAS calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  const [f, setF] = useState<Fields>(DEFAULTS);

  /* One "calculator_use" per page view, on the first edit. */
  const used = useRef(false);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    gaEvent("calculator_use", { tool: "roas_calculator" });
  };
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { touch(); setF((x) => ({ ...x, [k]: v })); };

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
        <h1>{H1}</h1>
        <p data-fba-tagline>{TAGLINE}</p>

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
              Product cost: goods, packaging, freight and duty. Amazon fees: referral plus FBA, from the{" "}
              <Link to={FBA_CALCULATOR_PATH}>FBA calculator</Link>.
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
              Same period for all three. Total sales include organic ones and give you TACoS.
            </p>
          </form>

          {/* ── Results ──────────────────────────────────────────── */}
          <section data-fba-card data-fba-results aria-live="polite" aria-label="Results">
            <h2 data-fba-card-title>Results</h2>

            {!result ? (
              <p data-fba-empty>Enter a sale price above $0 to see the results.</p>
            ) : (
              <Results r={result} price={price} spend={opt(f.adSpend)} sales={opt(f.adSales)} total={optOrNull(f.totalSales)} />
            )}
          </section>
        </div>

        <p data-fba-source>{PRIVACY_LINE}</p>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />

        <aside data-fba-cta>
          <p>
            We publish the real unit economics of Amazon businesses, ad spend included, with every figure sourced. One email
            when a new case study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("roas_calculator")}>Get emails on new case studies</Link>
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

function Results({ r, price, spend, sales, total }: {
  r: RoasResult; price: number; spend: number; sales: number; total: number | undefined;
}) {
  const noMargin = r.m != null && r.m <= 0;
  const needTotal = "Add total sales to see it.";

  type Row = { key: string; label: string; yours: string; note: string; strong?: boolean; negative?: boolean };
  const rows: Row[] = [
    {
      key: "m", label: "Margin before ads", yours: pf(r.m), negative: noMargin,
      note: noMargin
        ? `Each sale loses ${usd(-(r.preAdProfit ?? 0))} before advertising.`
        : `${usd(r.preAdProfit)} of each ${usd(price)} sale is left after product cost and fees.`,
    },
    {
      key: "beRoas", label: "Break-even ROAS", yours: noMargin ? "None" : x2(r.beRoas), strong: true,
      note: noMargin
        ? "With no margin before ads, no ROAS can break even."
        : `Each $1 of ads must bring back ${usd(r.beRoas)} in sales to break even: 1 ÷ ${pf(r.m)}.`,
    },
    {
      key: "beAcos", label: "Break-even ACOS", yours: noMargin ? "None" : pf(r.beAcos),
      note: noMargin
        ? "There is nothing left over to spend on ads."
        : `Ads can cost up to ${pf(r.beAcos)} of the sales they drive before those sales lose money.`,
    },
    {
      key: "roas", label: "ROAS", yours: x2(r.roas), strong: true,
      negative: r.roas != null && r.beRoas != null && r.roas < r.beRoas - 0.005,
      note: r.roas == null
        ? "Enter ad spend to see it."
        : `Each $1 of ads brought back ${usd(r.roas)} in sales: ${usd0(sales)} ÷ ${usd0(spend)}.`,
    },
    {
      key: "acos", label: "ACOS", yours: pf(r.acos),
      negative: r.acos != null && r.beAcos != null && r.acos > r.beAcos + 0.00005,
      note: r.acos == null
        ? spend > 0 ? "No ad sales, so every ad dollar was lost." : "Enter ad spend and ad sales to see it."
        : `Ads cost ${pf(r.acos)} of the sales they drove: 1 ÷ ROAS.`,
    },
    {
      key: "tacos", label: "TACoS", yours: pf(r.tacos),
      note: r.tacos == null ? "Add total sales to see it." : `Ads cost ${pf(r.tacos)} of all sales, organic included.`,
    },
    {
      key: "perAdUnit", label: "Profit per ad-driven sale", yours: usd(r.profitPerAdUnit),
      negative: (r.profitPerAdUnit ?? 0) < 0,
      note: r.profitPerAdUnit == null
        ? "Needs ad sales to work out."
        : `${usd(price)} × (${pf(r.m)} − ${pf(r.acos)}).`,
    },
    {
      key: "adSales", label: "Profit on ad-driven sales", yours: usd0(r.profitAdSales), strong: true,
      negative: (r.profitAdSales ?? 0) < 0,
      note: r.profitAdSales == null
        ? "Enter ad spend and ad sales."
        : `${usd0(sales)} of ad sales earn ${usd0(sales * (r.m ?? 0))} before ads, less ${usd0(spend)} of ads.`,
    },
    {
      key: "perUnitAll", label: "Profit per unit after ads, all sales",
      yours: usd(r.profitPerUnitAll),
      negative: (r.profitPerUnitAll ?? 0) < 0,
      note: r.profitPerUnitAll == null ? needTotal : `Every unit, after the period's ads: ${usd(price)} × (${pf(r.m)} − ${pf(r.tacos)}).`,
    },
    {
      key: "all", label: "Profit after ads, all sales", yours: usd0(r.profitAll), strong: true,
      negative: (r.profitAll ?? 0) < 0,
      note: r.profitAll == null || total == null ? needTotal : `${usd0(total)} of sales × ${pf(r.m)}, less ${usd0(spend)} of ads.`,
    },
    {
      key: "marginAll", label: "Margin after ads", yours: pf(r.marginAll),
      negative: (r.marginAll ?? 0) < 0,
      note: r.marginAll == null ? needTotal : "Profit after ads as a share of all sales: margin before ads less TACoS.",
    },
  ];

  return (
    <>
      <Verdict r={r} spend={spend} />
      <table data-fba-results-table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} data-strong={row.strong ? "" : undefined}>
              <th scope="row">
                <span data-fba-line>{row.label}</span>
                <span data-fba-note>{row.note}</span>
              </th>
              <td data-fba-num data-negative={row.negative ? "" : undefined}>{row.yours}</td>
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
