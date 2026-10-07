import { useState } from "react";
import { Link } from "react-router-dom";
import type { BusinessDetail, StartingCostEstimate } from "@/lib/api";
import { dayLabel, exactMoney, money, price } from "@/lib/format";
import { InfoTip } from "./InfoTip";
import { StartingCostWaterfall } from "./StartingCostWaterfall";

/**
 * "What it costs to start" — the launch-cost estimate, opened up.
 *
 * FOUR PARTS, IN THE ORDER THE MONEY IS SPENT: the first order, the ads that
 * make it sell, the fixed costs before either, then the total — closed by a
 * waterfall of the same parts (StartingCostWaterfall). Each part shows
 * its own arithmetic and names where its numbers came from, because a single
 * midpoint invites more trust than an estimate has earned.
 *
 * 🚨 IT RENDERS ONLY WHAT THE ESTIMATE CARRIES. Nothing is authored per business
 * — no prose in index.mjs restates a figure that might later change. An estimate
 * priced before a field existed simply omits that row, which is why every block
 * is guarded rather than assumed.
 *
 * ONE TAB PER PRODUCT for a brand whose margin breakdown is split by product
 * (`products` on the block): each tab is the same four parts for that product's
 * own published estimate, and its links open that product's margin tab.
 *
 * 🚨 ATTRIBUTION IS NOT DECORATION. The freight rate comes from Freightos, whose
 * licence requires "clear acknowledgement of Freightos with a link to
 * www.freightos.com". It renders wherever a freight-derived figure is shown.
 */

type Range = { low: number | string; high: number | string };

const n = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

/** A range, exact. This page exists to be precise: money()'s "$6k" for $5,969
 *  reads as a rounder, more confident figure than the estimate is. */
function span(r: Range | null | undefined, currency: string): string {
  const low = n(r?.low);
  const high = n(r?.high);
  if (low === null || high === null) return "—";
  return Math.round(low) === Math.round(high)
    ? exactMoney(low, currency)
    : `${exactMoney(low, currency)}–${exactMoney(high, currency)}`;
}

const int = (v: number | string | null | undefined) => {
  const x = n(v);
  return x === null ? "—" : Math.round(x).toLocaleString("en-US");
};

/**
 * Click share as a percentage.
 *
 * 🚨 NOT lib/format's percent(): that takes whole-percent units (a -14 margin
 * line) and rounds to integers, so a 0.015 share renders "0%" — and even fixed,
 * rounding 1.5% to "2%" overstates a figure the whole ad budget is built on.
 */
const sharePct = (v: number | string | null | undefined): string => {
  const x = n(v);
  if (x === null) return "—";
  const pct = x * 100;
  return `${pct < 10 ? Math.round(pct * 10) / 10 : Math.round(pct)}%`;
};

const COMPETITION_LABEL: Record<string, string> = {
  LOW: "a quiet keyword",
  MEDIUM: "a contested keyword",
  HIGH: "a crowded keyword",
};

export function StartingCost({
  business,
  products,
}: {
  business: BusinessDetail;
  products?: Array<{ id: string; label: string }>;
}) {
  const [active, setActive] = useState(products?.[0]?.id);
  if (!products?.length) return <EstimateView business={business} estimate={business.startingCostEstimate} />;

  const product = products.find((p) => p.id === active) ?? products[0]!;
  const estimate = business.productStartingCosts?.find((e) => e.product === product.id);
  return (
    <div data-product-margins="">
      <div role="tablist" aria-label="Product" data-product-tabs="">
        {products.map((p) => {
          const e = business.productStartingCosts?.find((x) => x.product === p.id);
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`start-tab-${p.id}`}
              aria-selected={p.id === product.id}
              aria-controls={`start-panel-${p.id}`}
              data-product-tab=""
              onClick={() => setActive(p.id)}
            >
              <span>{p.label}</span>
              {e && <span data-product-share="">{money(e.midpoint, business.currency ?? "USD")} to start</span>}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`start-panel-${product.id}`} aria-labelledby={`start-tab-${product.id}`}>
        <EstimateView key={product.id} business={business} estimate={estimate} product={product} />
      </div>
    </div>
  );
}

function EstimateView({
  business,
  estimate: e,
  product,
}: {
  business: BusinessDetail;
  estimate: StartingCostEstimate | null | undefined;
  /** Set when this is one product's tab. */
  product?: { id: string; label: string };
}) {
  const currency = business.currency ?? "USD";

  // No published estimate is a legitimate state, not an error: §3a leaves the
  // figure NULL for a business with no supplier quote carrying a minimum order.
  if (!e) {
    return (
      <section data-starting-cost="">
        <p data-empty="">
          No launch-cost estimate for {product ? `the ${product.label.toLowerCase()}` : "this business"}. One needs a supplier quote with a minimum order — without it a
          figure would be invented rather than estimated.
        </p>
      </section>
    );
  }

  const parts = e.breakdown?.parts;
  const w = e.breakdown?.working ?? { monthlySearches: 0 };
  const setupItems = e.breakdown?.setupItems ?? [];
  const inputs = e.inputs;
  const f = inputs.freight;
  const kr = e.keywordReading;
  // A product tab's links open the same product's margin tab.
  const margin = `/business/${business.slug}/margin${product ? `?product=${product.id}` : ""}`;
  const marginHref = `${margin}#cogs-breakdown`;
  const shippingHref = `${margin}#shipping-breakdown`;
  const landedHref = `${margin}#landed-cost`;
  const launchProducts = e.breakdown?.products?.length ? e.breakdown.products : null;

  // Freight and duty are inside landedUnitCost, so the make part is what
  // remains of it.
  const duty = inputs.duty;
  const landedLow = n(inputs.landedUnitCost.low);
  const makeLow = f && landedLow !== null ? landedLow - f.perUnit - (duty?.perUnit ?? 0) : null;

  return (
    <section data-starting-cost="">
      <p data-starting-cost-lede="">
        Launching a copy of {product ? `the ${product.label.toLowerCase()}` : "this business"} today would cost about{" "}
        <strong data-figure="">{money(e.midpoint, currency)}</strong>, somewhere between{" "}
        {exactMoney(e.low, currency)} and {exactMoney(e.high, currency)}. It is an estimate, not a quote
        {inputs.asOf ? <>, and it describes {dayLabel(inputs.asOf)}</> : null}. Here is each part of it.
      </p>

      {launchProducts ? (
        <LaunchParts business={business} estimate={e} products={launchProducts} />
      ) : (
        <>
      {/* ── 1. The first order ─────────────────────────────────────── */}
      <h3>
        1. The first order{" "}
        {parts ? <span data-starting-cost-amount="">{span(parts.inventory, currency)}</span> : null}
      </h3>
      {w.firstOrderUnits ? (
        /* Model 2026-10-05 on: a fixed launch order, whatever the supplier's
           minimum — owner's call (backend FIRST_ORDER_UNITS). */
        <p>
          The first order is <strong>{int(w.firstOrderUnits)} units</strong> per product
          {w.vineUnits ? (
            <>
              : {int(w.vineUnits)} go to Amazon Vine for the first reviews, and {int(w.firstOrderUnits - w.vineUnits)}{" "}
              are there to watch sell before committing to a production run
            </>
          ) : null}
          . This launch buys {int(inputs.launchSkus)} {Number(inputs.launchSkus) === 1 ? "product" : "products"}
          {Number(inputs.moq) > w.firstOrderUnits ? (
            <>
              , and the supplier quotes ask for at least {int(inputs.moq)}, so an order this small is one to negotiate
              rather than one quoted
            </>
          ) : null}
          .
          {w.unitsPerSku ? (
            <>
              {" "}
              The ads below are expected to sell {int(w.unitsPerSku.low)}–{int(w.unitsPerSku.high)} units; everything
              past the first order is reordered out of sales.
            </>
          ) : null}
        </p>
      ) : (
        <p>
          A supplier will not press a single unit. The smallest run the quotes allow is{" "}
          <strong>{int(inputs.moq)} units</strong> per product, and this launch buys{" "}
          {int(inputs.launchSkus)} {Number(inputs.launchSkus) === 1 ? "product" : "products"}
          {w.unitsPerSku ? (
            <>
              {" "}
              — {int(w.unitsPerSku.low)}–{int(w.unitsPerSku.high)} units, the minimum at the low end and as many as the
              ads can sell at the high one
            </>
          ) : null}
          .
        </p>
      )}

      <div data-table-wrap="">
        <table data-earnings-table="">
          <caption>What one unit costs to have in stock</caption>
          <thead>
            <tr>
              <th scope="col">Line</th>
              <th scope="col">Per unit</th>
              <th scope="col" data-note="">Where it comes from</th>
            </tr>
          </thead>
          <tbody>
            {makeLow !== null && (
              <tr>
                <th scope="row">Unit cost</th>
                <td data-figure="">{price(makeLow, currency)}</td>
                <td data-note="">
                  The average of the supplier quotes
                  <span data-margin-links="">
                    <Link to={marginHref}>See COGS breakdown</Link>
                  </span>
                </td>
              </tr>
            )}
            {duty && (
              <tr>
                <th scope="row">Tariff</th>
                <td data-figure="">{price(duty.perUnit, currency)}</td>
                <td data-note="">
                  {duty.basis ?? "Duty paid at the border"}
                  <span data-margin-links="">
                    <Link to={landedHref}>See landed cost</Link>
                  </span>
                </td>
              </tr>
            )}
            {f && (
              <tr>
                <th scope="row">Shipping cost</th>
                <td data-figure="">{price(f.perUnit, currency)}</td>
                <td data-note="">
                  {f.placeholder ? (
                    <>A flat placeholder — no package dimensions were available for this product</>
                  ) : (
                    <>
                      This product’s own carton at a read sea-freight rate
                      <span data-margin-links="">
                        <Link to={shippingHref}>See shipping breakdown</Link>
                      </span>
                    </>
                  )}
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Landed cost</th>
              <td data-figure="">{price(inputs.landedUnitCost.low, currency)}</td>
              <td data-note="">
                {duty ? "Unit cost, tariff and shipping" : "Unit cost plus shipping"} — what one unit costs in Amazon’s
                warehouse, before a single sale
                <span data-margin-links="">
                  <Link to={landedHref}>See landed cost</Link>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* ── 2. Launch ads ──────────────────────────────────────────── */}
      <h3>
        2. Launch ads {parts ? <span data-starting-cost-amount="">{span(parts.ads, currency)}</span> : null}
      </h3>
      <p>
        Stock nobody can find does not sell. A copy has to buy its way onto the first page of{" "}
        <strong>“{inputs.niche.keyword}”</strong>, which takes{" "}
        {int(w.monthlySearches ?? inputs.niche.monthlySearches)} searches a month —{" "}
        {COMPETITION_LABEL[e.competition] ?? e.competition.toLowerCase()}.
      </p>

      <div data-table-wrap="">
        <table data-earnings-table="">
          <caption>How the ad budget is worked out</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Figure</th>
              <th scope="col" data-note="">Where it comes from</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Searches a month</th>
              <td data-figure="">{int(w.monthlySearches ?? inputs.niche.monthlySearches)}</td>
              <td data-note="">
                Amazon searches a month for “{inputs.niche.keyword}”, from {kr?.source ?? inputs.niche.source}
              </td>
            </tr>
            {w.clickShare && (
              <tr>
                <th scope="row">Share of clicks needed</th>
                <td data-figure="">
                  {sharePct(w.clickShare.low)}–{sharePct(w.clickShare.high)}
                </td>
                <td data-note="">What a new listing has to take on a keyword this contested to start selling</td>
              </tr>
            )}
            {w.clicks && (
              <tr>
                <th scope="row">Clicks to buy</th>
                <td data-figure="">
                  {int(w.clicks.low)}–{int(w.clicks.high)}
                </td>
                <td data-note="">
                  Searches a month × the share above, across a{" "}
                  {w.launchDays ? `${int(w.launchDays.low)}–${int(w.launchDays.high)} day` : "60–90 day"} launch
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Cost per click</th>
              <td data-figure="">
                {price(e.cpcLow, currency)}–{price(e.cpcHigh, currency)}
              </td>
              <td data-note="">
                Amazon’s own suggested Sponsored Products bids
              </td>
            </tr>
            {w.launchUnits && (
              <tr>
                <th scope="row">Units that sells</th>
                <td data-figure="">
                  {int(w.launchUnits.low)}–{int(w.launchUnits.high)}
                </td>
                <td data-note="">
                  {w.firstOrderUnits
                    ? `What those clicks convert to — the first ${int(w.firstOrderUnits)} units, then reorders paid for by sales`
                    : "What those clicks convert to — more than one minimum run at the high end, reordered out of sales"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p data-starting-cost-source="">{e.cpcSource}</p>
      <p data-starting-cost-source="">
        None of this spend is expected to pay itself back. The estimate treats every launch dollar as spent, and the
        sales it buys restock nothing.
      </p>

        </>
      )}

      {/* ── 3. Fixed costs ─────────────────────────────────────────── */}
      <h3>
        3. Fixed costs {parts ? <span data-starting-cost-amount="">{span(parts.setup, currency)}</span> : null}
      </h3>
      <p>Paid once, before anything sells.</p>
      {setupItems.length > 0 && (
        <div data-table-wrap="">
          <table data-earnings-table="">
            <caption>Setup, line by line</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Cost</th>
                <th scope="col" data-note="">What prices it</th>
              </tr>
            </thead>
            <tbody>
              {setupItems.map((i) => (
                <tr key={i.label}>
                  <th scope="row">{i.label}</th>
                  <td data-figure="">{span(i.cost, currency)}</td>
                  <td data-note="">{i.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p data-starting-cost-source="">
        No barcode line: an FBA seller labels units with Amazon’s own FNSKU, which is free. A GS1 prefix is only needed
        by a brand that wants its own GTINs, so charging every launch for one priced the exception.
      </p>

      {/* ── 4. The total ───────────────────────────────────────────── */}
      <h3>4. Adding it up</h3>
      {parts && (
        <div data-table-wrap="">
          <table data-earnings-table="">
            <caption>The whole launch</caption>
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">First order</th>
                <td data-figure="">{span(parts.inventory, currency)}</td>
              </tr>
              <tr>
                <th scope="row">Launch ads</th>
                <td data-figure="">{span(parts.ads, currency)}</td>
              </tr>
              <tr>
                <th scope="row">Fixed costs</th>
                <td data-figure="">{span(parts.setup, currency)}</td>
              </tr>
              {parts.tooling && (
                <tr>
                  <th scope="row">Tooling</th>
                  <td data-figure="">{span(parts.tooling, currency)}</td>
                </tr>
              )}
              <tr data-total="">
                <th scope="row">To start</th>
                <td data-figure="">{span({ low: e.low, high: e.high }, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p>
        The page shows the midpoint, <strong data-figure="">{money(e.midpoint, currency)}</strong>. The spread is wide
        because the ads are: {parts ? `${span(parts.ads, currency)} of a ` : ""}
        {span({ low: e.low, high: e.high }, currency)} range turns on how much of {launchProducts ? "each search" : "the keyword"} a
        launch has to buy, and that is the least knowable part of it.
      </p>
      {inputs.note && <p data-starting-cost-source="">{inputs.note}</p>}
      <StartingCostWaterfall estimate={e} currency={currency} />
      <p data-starting-cost-meta="">
        Priced with model {e.modelVersion}
        {e.publishedAt ? `, published ${dayLabel(e.publishedAt)}` : " (not yet published)"}. Every input is a dated
        reading and none is refreshed afterwards — the figure records what a launch cost then, not now.
      </p>
    </section>
  );
}


type LaunchProducts = NonNullable<StartingCostEstimate["breakdown"]["products"]>;

/**
 * Parts 1 and 2 for a launch priced product by product (model 2026-10-07 on):
 * the first order split by product, and the launch ads split by product AND by
 * the searches each would buy its way onto page one of.
 *
 * 🚨 "Cost per month" is searches × the share of them a launch has to take ×
 * the cost of a click — an estimate of what holding page one for that search
 * costs, not a quote. Its ⓘ says so.
 */
function LaunchParts({
  business,
  estimate: e,
  products,
}: {
  business: BusinessDetail;
  estimate: StartingCostEstimate;
  products: LaunchProducts;
}) {
  const currency = business.currency ?? "USD";
  const parts = e.breakdown.parts;
  const w = e.breakdown.working;
  const marginFor = (id: string) => `/business/${business.slug}/margin?product=${id}#landed-cost`;
  return (
    <>
      {/* ── 1. The first order, by product ─────────────────────────── */}
      <h3>
        1. The first order <span data-starting-cost-amount="">{span(parts.inventory, currency)}</span>
      </h3>
      <p>
        The first order is <strong>{int(w.firstOrderUnits)} units</strong> of each product it launches
        {w.vineUnits ? (
          <>
            : {int(w.vineUnits)} go to Amazon Vine for the first reviews, and {int((w.firstOrderUnits ?? 0) - w.vineUnits)} are
            there to watch sell before committing to a production run
          </>
        ) : null}
        . Everything the ads sell past it is reordered out of sales. Each product is the one the Margin breakdown
        prices, at its landed cost there.
      </p>
      <div data-table-wrap="">
        <table data-earnings-table="">
          <caption>The first order, by product</caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Units</th>
              <th scope="col">Landed cost per unit</th>
              <th scope="col">First order</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <th scope="row">
                  {p.label}
                  <span data-margin-links="">
                    <Link to={marginFor(p.id)}>See landed cost</Link>
                  </span>
                </th>
                <td data-figure="">{int(p.units)}</td>
                <td data-figure="">{price(p.landedUnitCost.low, currency)}</td>
                <td data-figure="">{span(p.inventory, currency)}</td>
              </tr>
            ))}
            <tr data-total="">
              <th scope="row">First order</th>
              <td data-figure="">{int(products.reduce((a, p) => a + p.units, 0))}</td>
              <td />
              <td data-figure="">{span(parts.inventory, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── 2. Launch ads, by product and by search ────────────────── */}
      <h3>
        2. Launch ads <span data-starting-cost-amount="">{span(parts.ads, currency)}</span>
      </h3>
      <p>
        Stock nobody can find does not sell. Each product has to buy its way onto the first page of the searches
        below, which is what the launch ads pay for. The searches are the ones a listing of the original brand already
        ranks on, so they are searches a copy can plausibly hold.
      </p>
      {products.map((p) => (
        <div key={p.id} data-launch-product="">
          <div data-table-wrap="">
            <table data-earnings-table="">
              <caption>
                {p.label} — {span(p.ads, currency)} of launch ads
              </caption>
              <thead>
                <tr>
                  <th scope="col">Search term</th>
                  <th scope="col">Searches a month</th>
                  <th scope="col">Cost per click</th>
                  <th scope="col">
                    Cost per month{" "}
                    <InfoTip
                      label="Cost per month"
                      paragraphs={[
                        "What it costs a month to be on page one of Amazon for this search term.",
                        "It is an estimate, not a quote: the term’s search volume (SV) a month, times the click-through (CTR) a new listing has to win to sell on a term this contested, times the cost of a click.",
                      ]}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.keywords.map((k) => (
                  <tr key={k.keyword}>
                    <th scope="row">{k.keyword}</th>
                    <td data-figure="">{int(k.monthlySearches)}</td>
                    <td data-figure="">{price(k.cpc.low, currency)}</td>
                    <td data-figure="">{span(k.monthlyCost, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {e.inputs.launch && (
        <p data-starting-cost-source="">
          Searches a month and cost per click: {e.inputs.launch.source}. The launch runs {int(w.launchDays?.low)}–
          {int(w.launchDays?.high)} days, so each search’s launch spend is its cost per month for that long; a product’s
          ads are never put under {span({ low: 1000, high: 2000 }, currency)}.
        </p>
      )}
      <p data-starting-cost-source="">
        None of this spend is expected to pay itself back. The estimate treats every launch dollar as spent, and the
        sales it buys restock nothing.
      </p>
      <p data-starting-cost-validate="">
        <strong>You can test a business like this before you commit to it.</strong> Choose which search terms you want
        to try to launch on, put the first order of each product behind them, and see whether the clicks turn into
        orders. Swap in your own terms — a cheaper search costs less a month to hold, and the cost per month above is
        what to compare them with. Scale up only on the ones that sell.
      </p>
    </>
  );
}
