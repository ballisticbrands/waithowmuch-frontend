import { Link } from "react-router-dom";
import type { BusinessDetail } from "@/lib/api";
import { dayLabel, exactMoney, money, price } from "@/lib/format";
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

export function StartingCost({ business }: { business: BusinessDetail }) {
  const e = business.startingCostEstimate;
  const currency = business.currency ?? "USD";

  // No published estimate is a legitimate state, not an error: §3a leaves the
  // figure NULL for a business with no supplier quote carrying a minimum order.
  if (!e) {
    return (
      <section data-starting-cost="">
        <p data-empty="">
          No launch-cost estimate for this business. One needs a supplier quote with a minimum order — without it a
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
  const marginHref = `/business/${business.slug}/margin#cogs-breakdown`;
  const shippingHref = `/business/${business.slug}/margin#shipping-breakdown`;
  const landedHref = `/business/${business.slug}/margin#landed-cost`;

  // Freight is inside landedUnitCost, so the make half is what remains of it.
  const landedLow = n(inputs.landedUnitCost.low);
  const makeLow = f && landedLow !== null ? landedLow - f.perUnit : null;

  return (
    <section data-starting-cost="">
      <p data-starting-cost-lede="">
        Launching a copy of this business today would cost about{" "}
        <strong data-figure="">{money(e.midpoint, currency)}</strong>, somewhere between{" "}
        {exactMoney(e.low, currency)} and {exactMoney(e.high, currency)}. It is an estimate, not a quote
        {inputs.asOf ? <>, and it describes {dayLabel(inputs.asOf)}</> : null}. Here is each part of it.
      </p>

      {/* ── 1. The first order ─────────────────────────────────────── */}
      <h3>
        1. The first order{" "}
        {parts ? <span data-starting-cost-amount="">{span(parts.inventory, currency)}</span> : null}
      </h3>
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
            {f && (
              <tr>
                <th scope="row">Shipping cost</th>
                <td data-figure="">{price(f.perUnit, currency)}</td>
                <td data-note="">
                  {f.placeholder ? (
                    <>A flat placeholder — no package dimensions were available for this product</>
                  ) : (
                    <>
                      This puzzle’s carton at a read sea-freight rate
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
                Unit cost plus shipping — what one unit costs in Amazon’s warehouse, before a single sale
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
                  What those clicks convert to — more than one minimum run at the high end, reordered out of sales
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
        {span({ low: e.low, high: e.high }, currency)} range turns on how much of the keyword a launch has to buy, and
        that is the least knowable part of it.
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
