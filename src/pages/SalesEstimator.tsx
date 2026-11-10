import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { Comparables, Notice, Provenance, ToolCopy, Unavailable } from "@/components/SalesToolParts";
import { gaEvent, trackCtaClick } from "@/lib/track";
import { ESTIMATOR, STORE_PATH } from "@/data/sales-tools-page.mjs";
import {
  REFERRAL_CATEGORIES, IN_PER_CM, LB_PER_KG, TIER_LABELS, calculate, periodFor, type CalcResult,
} from "@/data/fba-fees-2026.mjs";
import {
  fmtUnits, lookupProduct, referralCategoryFor, usd0, type ProductSales, type ToolResult,
} from "@/lib/sales-tools";

/**
 * /tools/amazon-sales-estimator/ — one product's monthly sales from Amazon's
 * own "bought in past month" badge (via the backend's Keepa lookup), with fees
 * and profit from the FBA calculator's engine (data/fba-fees-2026.mjs).
 *
 * The words under the tool come from data/sales-tools-page.mjs, which the
 * prerender emits too. `?asin=` makes a result linkable and re-runs on load.
 */

const usd = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;
const today = new Date().toISOString().slice(0, 10);

export default function SalesEstimator() {
  useSetCrumbs(() => [{ label: ESTIMATOR.crumb }], []);
  useEffect(() => { document.title = ESTIMATOR.docTitle; }, []);

  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(() => params.get("asin") ?? "");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ToolResult<ProductSales> | null>(null);

  const run = async (input: string) => {
    if (!input.trim() || busy) return;
    setBusy(true);
    const r = await lookupProduct(input);
    setResult(r);
    setBusy(false);
    gaEvent("tool_lookup", { tool: "sales_estimator", outcome: r.kind });
    if (r.kind === "ok") setParams({ asin: r.data.asin }, { replace: true });
  };

  // A shared or bookmarked ?asin= link runs once on arrival.
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const a = params.get("asin");
    if (a) void run(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main data-main>
      <div data-fba>
        <h1>{ESTIMATOR.title}</h1>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: ESTIMATOR.lede }} />

        <form
          data-fba-card
          data-st-form
          onSubmit={(e) => { e.preventDefault(); void run(q); }}
          aria-label="Look up a product"
        >
          <label data-fba-field>
            <span>ASIN or Amazon product link</span>
            <div data-st-row>
              <input
                data-input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="B0FMGJSSXT or https://www.amazon.com/dp/…"
                autoComplete="off"
                spellCheck={false}
                inputMode="url"
              />
              <button data-btn type="submit" disabled={busy || !q.trim()}>{busy ? "Looking up…" : "Estimate sales"}</button>
            </div>
          </label>
          <p data-fba-empty>US marketplace. Free, no account needed.</p>
        </form>

        <div aria-live="polite">
          {result?.kind === "unavailable" && <Unavailable what="sales estimator" />}
          {(result?.kind === "invalid" || result?.kind === "not_found" || result?.kind === "limited" || result?.kind === "busy") && (
            <Notice tone="warn">{result.message}</Notice>
          )}
          {result?.kind === "ok" && <ProductResult p={result.data} />}
        </div>

        <aside data-fba-cta>
          <p>
            Want the whole store? The seller revenue calculator adds up every listing a seller has. We also publish the real
            unit economics of Amazon businesses, one email when a new case study is out.
          </p>
          <div data-st-ctas>
            <Link data-btn data-variant="ghost" to={STORE_PATH}>Check a store's revenue</Link>
            <Link data-btn to="/signup" onClick={() => trackCtaClick("sales_estimator")}>Get emails on new case studies</Link>
          </div>
        </aside>

        <ToolCopy page={ESTIMATOR} />
      </div>
    </main>
  );
}

function ProductResult({ p }: { p: ProductSales }) {
  const u = p.units;
  const price = p.price ? p.price.cents / 100 : null;
  const [category, setCategory] = useState(() => referralCategoryFor(p.categoryPath));
  const [cost, setCost] = useState("");
  useEffect(() => { setCategory(referralCategoryFor(p.categoryPath)); setCost(""); }, [p.asin, p.categoryPath]);

  const fees: CalcResult | null = useMemo(() => {
    if (!price || !p.package) return null;
    const productCost = parseFloat(cost.replace(/[$,\s]/g, ""));
    return calculate({
      price,
      lengthIn: p.package.lengthMm / 10 * IN_PER_CM,
      widthIn: p.package.widthMm / 10 * IN_PER_CM,
      heightIn: p.package.heightMm / 10 * IN_PER_CM,
      weightLb: p.package.weightG / 1000 * LB_PER_KG,
      category,
      periodId: periodFor(today),
      productCost: Number.isFinite(productCost) && productCost >= 0 ? productCost : 0,
      // Storage depends on how long stock waits, which a listing cannot tell us.
      storageMonths: 0,
    });
  }, [price, p.package, category, cost]);

  const hasCost = cost.trim() !== "" && Number.isFinite(parseFloat(cost));
  const priceSource = p.price?.source === "buy_box" ? "buy box" : p.price?.source === "new" ? "lowest new offer" : "Amazon's price";

  return (
    <section data-fba-card data-st-result aria-label="Result">
      <div data-st-product>
        {p.imageUrl && <img src={p.imageUrl} alt="" width={64} height={64} loading="lazy" />}
        <div>
          <a href={p.url} target="_blank" rel="nofollow noopener noreferrer" data-st-title>{p.title ?? p.asin}</a>
          <p data-fba-empty>
            {p.asin}{p.brand ? ` · ${p.brand}` : ""}
            {p.categoryPath[0] ? ` · ${p.categoryPath[0]}` : ""}
            {p.salesRank ? ` · #${p.salesRank.toLocaleString("en-US")} Best Sellers Rank` : ""}
          </p>
        </div>
      </div>

      <div data-st-stats>
        <div data-st-stat>
          <span>Units a month</span>
          {u.source === "amazon_badge" ? (
            <>
              <strong>{fmtUnits(u.low)}–{fmtUnits(u.high)}</strong>
              <em>Amazon shows "{u.label} bought in past month"</em>
            </>
          ) : (
            <>
              <strong>Under ~50</strong>
              <em>No "bought in past month" badge: Amazon hides it below about 50</em>
            </>
          )}
        </div>
        <div data-st-stat>
          <span>Revenue a month</span>
          <strong>{p.revenue ? `${usd0(p.revenue.lowCents)}–${usd0(p.revenue.highCents)}` : "—"}</strong>
          <em>{p.revenue ? "Units × today's price" : u.source === "none" ? "Not estimated without Amazon's figure" : "No current price"}</em>
        </div>
        <div data-st-stat>
          <span>Price</span>
          <strong>{price ? usd(price) : "—"}</strong>
          <em>{price ? priceSource : "Not currently for sale"}</em>
        </div>
      </div>

      {u.source === "none" && (
        <p data-fba-empty data-st-note>
          {u.lastBadge
            ? <>Keepa last saw a badge on this listing on {new Date(`${u.lastBadge.seenAt}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}: "{u.lastBadge.label} bought in past month". That was then, not now. </>
            : <>Keepa has no record of this listing showing a badge. </>}
          We don't turn sales rank into a number: it would be a guess presented as data.
        </p>
      )}

      <h3 data-fba-card-title data-st-sub>Fees and profit per unit</h3>
      {!price ? (
        <p data-fba-empty>No current price, so fees can't be worked out.</p>
      ) : !p.package || !fees ? (
        <p data-fba-empty>Amazon doesn't list this product's package size, so we can't price its FBA fee. Enter it in the <Link to="/tools/amazon-fba-calculator/">FBA calculator</Link>.</p>
      ) : (
        <>
          <div data-fba-row>
            <label data-fba-field>
              <span>Referral category</span>
              <select data-select value={category} onChange={(e) => setCategory(e.target.value)}>
                {REFERRAL_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label data-fba-field>
              <span>Your cost per unit <em>optional</em></span>
              <span data-fba-affix>
                <span aria-hidden>$</span>
                <input data-input inputMode="decimal" value={cost} placeholder="landed cost" onChange={(e) => setCost(e.target.value)} />
              </span>
            </label>
          </div>
          <table data-fba-results-table>
            <tbody>
              <tr>
                <th scope="row"><span data-fba-line>FBA fulfilment fee</span><span data-fba-note>{TIER_LABELS[fees.tier.tier]}, from Amazon's package size.{p.amazonFbaFeeCents ? ` Amazon currently quotes ${usd(p.amazonFbaFeeCents / 100)}.` : ""}</span></th>
                <td data-fba-num>{usd(fees.fba.fee)}</td>
              </tr>
              <tr>
                <th scope="row"><span data-fba-line>Referral fee</span><span data-fba-note>{fees.referral.atMinimum ? "The per-unit minimum." : `${fees.referral.effectivePct.toFixed(1)}% of price.`}</span></th>
                <td data-fba-num>{usd(fees.referral.fee + fees.referral.closingFee)}</td>
              </tr>
              <tr data-strong>
                <th scope="row"><span data-fba-line>Left after Amazon's fees</span><span data-fba-note>Before product cost, shipping in and ads. Storage excluded.</span></th>
                <td data-fba-num>{usd(price - fees.fba.fee - fees.referral.fee - fees.referral.closingFee)}</td>
              </tr>
              {hasCost && (
                <>
                  <tr data-strong>
                    <th scope="row"><span data-fba-line>Profit per unit</span><span data-fba-note>{fees.marginPct != null ? `${fees.marginPct.toFixed(1)}% margin, before ads and storage.` : ""}</span></th>
                    <td data-fba-num data-negative={fees.profit < 0 ? "" : undefined}>{usd(fees.profit)}</td>
                  </tr>
                  {u.source === "amazon_badge" && (
                    <tr>
                      <th scope="row"><span data-fba-line>Profit a month</span><span data-fba-note>Profit per unit × Amazon's unit range.</span></th>
                      <td data-fba-num>{usd0(fees.profit * u.low * 100)}–{usd0(fees.profit * u.high * 100)}</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
          <p data-fba-empty data-st-note>
            Fees on Amazon's 2026 US rate card, as in our <Link to="/tools/amazon-fba-calculator/">FBA calculator</Link>, where you can add ads, storage and inbound shipping.
          </p>
        </>
      )}

      <Comparables items={p.comparables} />
      <Provenance retrievedAt={p.retrievedAt} />
    </section>
  );
}
