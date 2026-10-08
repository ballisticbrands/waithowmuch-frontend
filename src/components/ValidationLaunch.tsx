import { useState } from "react";
import type { BusinessDetail, ValidationLaunch as Launch } from "@/lib/api";
import { dayLabel, exactMoney, money, price } from "@/lib/format";
import { int, span } from "./StartingCost";
import { StartingCostWaterfall } from "./StartingCostWaterfall";

/**
 * "What it costs to start (2)": the least a seller has to spend to validate the
 * products — whether they sell — priced for each product and for all of them at
 * once. It stands on its own: nothing here refers to, or reads, the section
 * before it.
 *
 * ORDER, by the owner's call: the explanation first (ValidationStrategy, in the
 * Advertising section's strategy container), then every number: the pass lines,
 * the money and a waterfall of it. The numbers sit behind one tab per product
 * and one for the products together, as the Margin breakdown does, so a seller
 * testing one product reads that product's own bill and one testing both reads
 * the sum.
 *
 * 🚨 THE SPEND IS SIZED BY THE TEST: the clicks that sell the paid units at the
 * rate competing listings convert, at each search's cost per click. The
 * conversion line is PER PRODUCT — a $229 set and a $45 mat do not convert
 * alike.
 *
 * 🚨 EVERY FIGURE IS GENERATED, none typed here: `launch` comes from
 * make-validation-launch.mjs, which takes the first order and setup costs from
 * the backend's own estimator.
 */

type Product = Launch["products"][number];

const TOGETHER = "together";

const pct = (v: number) => `${Math.round(v * 100)}%`;
/** A conversion rate: one decimal, because a set's 1.8% is not "2%". */
const rate = (v: number) => `${(v * 100).toFixed(1)}%`;

/**
 * The test, explained, in the Advertising section's strategy container: how it
 * works in the order a seller meets it. Kept at reading width, so it is its own
 * block; the numbers that follow take the full column.
 */
export function ValidationStrategy({ business, launch }: { business: BusinessDetail; launch: Launch }) {
  const currency = business.currency ?? "USD";
  const g = launch.gate;
  return (
    <aside data-strategy="" data-validation-strategy="">
      <p data-strategy-eyebrow="">Validation</p>
      <h3>How to validate a product for the least money</h3>
      <p>
        Validating a product means finding out whether it really sells before you put serious money into it. You do
        not need to win the biggest searches to do that. You need enough shoppers to see the product to tell how many
        of them buy it, and a few reviews to tell what they think. So this plan works backwards from the test: spend
        only what the test needs, and stop the moment it fails.
      </p>
      <ol data-validation-steps="">
        <li>
          <strong>Make your first order in one colour — {launch.colour}.</strong> The searches in this plan all name
          the colour, so the product has to match. One colour is enough to validate; add the others once it works.
        </li>
        <li>
          <strong>Pay for the clicks that test it.</strong> The test is whether the {int(g.paidUnits)} units you sell
          through ads really do sell. How many clicks that takes depends on how often shoppers buy this kind of
          product, and it is never fewer than {int(g.minClicks)}, the least that tells you anything reliable. Use
          searches that name {launch.colour} and that the original brand’s listing already ranks for in the top{" "}
          {launch.maxRank} results without paying for it, starting with the smaller ones.
        </li>
        <li>
          <strong>Check how many clicks turn into orders, before anything else.</strong> Each product has its own
          target, because an expensive product sells less often than a cheap one:{" "}
          {launch.products.map((p, i) => (
            <span key={p.id}>
              {i > 0 ? "; " : ""}
              the {p.label.toLowerCase()} ({money(p.sellingPrice, currency)}) has to sell {int(g.paidUnits)} units within{" "}
              {int(p.clicksNeeded)} clicks, which is {rate(p.conversion.line)} of them
            </span>
          ))}
          . If it does not, stop there: the test has failed, and you have not waited for a single review or spent
          anything more. The problem is the listing, the price or the product, and no search will fix that. Ads stop on
          their own when your stock sells out, so a product that sells quickly costs less than the budget below.
        </li>
        <li>
          <strong>Get your reviews from Vine, not from ads.</strong> {int(g.vineUnits)} of your first{" "}
          {int(g.firstOrderUnits)} units go to Amazon Vine, a free programme that brings in your first reviews however
          the ads do. The other {int(g.paidUnits)} are the ones the ads sell.
        </li>
        <li>
          <strong>Judge the product.</strong> Once you have {int(g.reviews)} reviews, it should average {g.rating}{" "}
          stars or better, with fewer than {pct(g.returns)} of units returned. That is what separates a good product
          from one that only gets clicks.
        </li>
        <li>
          <strong>Look for sales that are not from ads.</strong> Orders from ordinary search growing, or a top-
          {g.organicRank} position on one of your searches, means the listing is starting to stand on its own.
        </li>
      </ol>
      <p>
        If it passes everything, reorder and move on to bigger searches. If it misses, the miss tells you what to fix:
        too few orders per click means the listing, price or product; plenty of orders per click but few clicks means
        the searches are too small; poor reviews or returns means the product.
      </p>
      <p data-starting-cost-source="">
        What this proves, and what it does not. It proves the product sells at its price, and that buyers keep it and
        rate it well. It does not prove the listing can climb to the biggest searches. That takes far more orders, and
        it is the next step once this one has passed.
      </p>
    </aside>
  );
}

export function ValidationLaunch({ business, launch }: { business: BusinessDetail; launch: Launch }) {
  const currency = business.currency ?? "USD";
  const g = launch.gate;
  const many = launch.products.length > 1;
  const [active, setActive] = useState(launch.products[0]!.id);

  const selected: Product[] = active === TOGETHER ? launch.products : launch.products.filter((p) => p.id === active);
  const selection = selected.length ? selected : [launch.products[0]!];
  const totals =
    selection.length === launch.products.length && many
      ? launch.together
      : { inventory: selection[0]!.inventory, ads: selection[0]!.ads, setup: launch.together.setup, low: selection[0]!.low, high: selection[0]!.high };
  const tabId = active === TOGETHER || selection.length > 1 ? TOGETHER : selection[0]!.id;

  const subject = selection.length > 1 ? "Both products together" : `The ${selection[0]!.label.toLowerCase()}`;

  return (
    <section data-starting-cost="" data-validation-launch="">
      {/* ── The numbers: one tab per product, and the products together ── */}
      <h3>What it costs to validate</h3>
      <div role="tablist" aria-label="Product to test" data-product-tabs="">
        {launch.products.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`validate-tab-${p.id}`}
            aria-selected={tabId === p.id}
            aria-controls="validate-panel"
            data-product-tab=""
            onClick={() => setActive(p.id)}
          >
            <span>{p.label}</span>
            <span data-product-share="">{money(p.low, currency)} to start</span>
          </button>
        ))}
        {many && (
          <button
            type="button"
            role="tab"
            id={`validate-tab-${TOGETHER}`}
            aria-selected={tabId === TOGETHER}
            aria-controls="validate-panel"
            data-product-tab=""
            onClick={() => setActive(TOGETHER)}
          >
            <span>Both together</span>
            <span data-product-share="">{money(launch.together.low, currency)} to start</span>
          </button>
        )}
      </div>

      <div role="tabpanel" id="validate-panel" aria-labelledby={`validate-tab-${tabId}`} key={tabId}>
        <p data-starting-cost-lede="">
          {subject} would cost about <strong data-figure="">{money(totals.low, currency)}</strong> to test, and as
          much as {exactMoney(totals.high, currency)}. {selection.length > 1 ? "That is one setup and both first orders, for a seller testing them at the same time." : ""}
        </p>

        <h3>The test, in numbers</h3>
        <div data-table-wrap="">
          <table data-earnings-table="">
            <caption>What {selection.length > 1 ? "each product" : "the product"} has to do to pass</caption>
            <thead>
              <tr>
                <th scope="col">Test</th>
                {selection.map((p) => (
                  <th key={p.id} scope="col">
                    {selection.length > 1 ? p.label : "Pass line"}
                  </th>
                ))}
                <th scope="col" data-note="">What it rests on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1. Clicks to buy</th>
                {selection.map((p) => (
                  <td key={p.id} data-figure="">
                    up to {int(p.clicksNeeded)}
                  </td>
                ))}
                <td data-note="">
                  What sells the {int(g.paidUnits)} paid units at the rate competing listings convert, never under{" "}
                  {int(g.minClicks)}
                </td>
              </tr>
              <tr>
                <th scope="row">2. Orders from the clicks</th>
                {selection.map((p) => (
                  <td key={p.id} data-figure="">
                    {int(g.paidUnits)} units, {rate(p.conversion.line)} of clicks
                  </td>
                ))}
                <td data-note="">
                  How often competing listings turn a click into an order on the product’s searches (the median) —{" "}
                  {selection.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 ? "; " : ""}
                      {selection.length > 1 ? `${p.label.toLowerCase()} ` : ""}
                      {rate(p.conversion.market)} across {int(p.conversion.rows)} listing-and-search pairs
                    </span>
                  ))}
                  . Jungle Scout’s model, the week of {dayLabel(selection[0]!.conversion.from)}
                </td>
              </tr>
              <tr>
                <th scope="row">3. Rating</th>
                {selection.map((p) => (
                  <td key={p.id} data-figure="">
                    {g.rating} or more
                  </td>
                ))}
                <td data-note="">Judged once {int(g.reviews)} reviews are in, which the Vine units supply</td>
              </tr>
              <tr>
                <th scope="row">4. Returns</th>
                {selection.map((p) => (
                  <td key={p.id} data-figure="">
                    Under {pct(g.returns)}
                  </td>
                ))}
                <td data-note="">Of units sold in the launch</td>
              </tr>
              <tr>
                <th scope="row">5. Demand beyond ads</th>
                {selection.map((p) => (
                  <td key={p.id} data-figure="">
                    Top {g.organicRank}, or growing
                  </td>
                ))}
                <td data-note="">A rank on one of the searches, or organic orders rising week on week</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>
          The ads <span data-starting-cost-amount="">{exactMoney(totals.ads, currency)}</span>
        </h3>
        <p>
          The clicks are split across a product’s searches in proportion to their volume, at each search’s cost per
          click. This is the most the test costs — what it takes to fail. A search has to be able to deliver its share:
          the clicks below are at most {pct(g.clickShare)} of the searches over {int(g.windowDays)} days, the smallest
          share a new listing is assumed to win.
        </p>
        {selection.map((p) => (
          <div key={p.id} data-launch-product="">
            <div data-table-wrap="">
              <table data-earnings-table="">
                <caption>
                  {p.label} — {exactMoney(p.ads, currency)} of ads for {int(p.clicks)} clicks
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Search term</th>
                    <th scope="col">Searches a month</th>
                    <th scope="col">Cost per click</th>
                    <th scope="col">Clicks to buy</th>
                    <th scope="col">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {p.keywords.map((k) => (
                    <tr key={k.keyword}>
                      <th scope="row">{k.keyword}</th>
                      <td data-figure="">{int(k.monthlySearches)}</td>
                      <td data-figure="">{price(k.cpc, currency)}</td>
                      <td data-figure="">{int(k.clicks)}</td>
                      <td data-figure="">{exactMoney(k.cost, currency)}</td>
                    </tr>
                  ))}
                  <tr data-total="">
                    <th scope="row">Ads</th>
                    <td />
                    <td />
                    <td data-figure="">{int(p.clicks)}</td>
                    <td data-figure="">{exactMoney(p.ads, currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {(p.widened || p.atMinimumClicks) && (
              <p data-starting-cost-source="">
                {p.widened
                  ? `Competing listings convert ${rate(p.conversion.market)} on these searches, so it takes ${int(p.clicksNeeded)} clicks to sell ${int(g.paidUnits)} units. The ${launch.colour} searches of ${int(launch.band.min)}–${int(launch.band.max)} a month cannot deliver that many, so the smallest ${launch.colour} search above them is added.`
                  : `Competing listings convert ${rate(p.conversion.market)}, which would sell ${int(g.paidUnits)} units in ${int(Math.ceil(g.paidUnits / p.conversion.market))} clicks. The test is never run on fewer than ${int(g.minClicks)}, so that is what it buys, and the ${int(g.paidUnits)} units prove ${rate(p.conversion.line)}.`}
              </p>
            )}
          </div>
        ))}
        <p data-starting-cost-source="">
          Searches a month and best organic rank: Jungle Scout, read {dayLabel(launch.readAt)}. Cost per click: Amazon’s
          suggested exact bid, read {dayLabel(launch.bidsReadAt)}. A bid is not what a click bills — cleared auctions
          run below it — so this errs high.
        </p>

        <h3>Adding it up</h3>
        <div data-table-wrap="">
          <table data-earnings-table="">
            <caption>What it costs to validate: {subject.toLowerCase()}</caption>
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">First order</th>
                <td data-figure="">{exactMoney(totals.inventory, currency)}</td>
              </tr>
              <tr>
                <th scope="row">Launch ads</th>
                <td data-figure="">{exactMoney(totals.ads, currency)}</td>
              </tr>
              <tr>
                <th scope="row">Fixed costs</th>
                <td data-figure="">{span(totals.setup, currency)}</td>
              </tr>
              <tr data-total="">
                <th scope="row">To start</th>
                <td data-figure="">{span({ low: totals.low, high: totals.high }, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The low end is <strong data-figure="">{money(totals.low, currency)}</strong>. The ads are the most the test
          can cost, and the range is the fixed costs: setup is paid once, however many products you test.
        </p>

        <StartingCostWaterfall
          currency={currency}
          estimate={{
            low: totals.low,
            high: totals.high,
            breakdown: {
              parts: {
                inventory: { low: totals.inventory, high: totals.inventory },
                ads: { low: totals.ads, high: totals.ads },
                setup: totals.setup,
                tooling: null,
              },
            },
          }}
        />
      </div>
    </section>
  );
}
