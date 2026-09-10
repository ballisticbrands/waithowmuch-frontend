import { valueBusiness } from "./model.mjs";

/**
 * How WaitHowMuch fills in the valuation model's inputs.
 *
 * model.mjs is a port and stays byte-identical to sellerconnect's copy so the
 * two can be diffed. This file is the other half: the house rules for what we
 * feed it, and the derivations that can be computed from a profile's own
 * metric series rather than typed.
 *
 * 🚨 Every rule below is a DECISION, not a detail. Each one changes published
 * valuations across every business on the site, so they are written down here
 * with their reasoning rather than being re-decided per profile — which is how
 * two businesses come to be scored on different bases and the leaderboard
 * stops meaning anything.
 */

/**
 * ── RULE 1: age is the CATALOGUE's, not the account's ────────────────────
 *
 * `sellingSince` is the first listing of the catalogue being valued, not the
 * date the seller account was opened. A five-year-old account carrying a
 * catalogue launched last year has not proved that catalogue survives
 * anything, and the age factor is worth 0.5 of the multiple — the largest
 * single positive available without a questionnaire.
 *
 * Spite House Games is the case that settled it: the account trades from 2021
 * under a previous venture, while the catalogue on it starts 2025-01-20. The
 * account reading would have paid it +0.50 for durability it has not shown.
 *
 * This also keeps the score consistent with what the page tells the reader —
 * the Listed-since tooltip already says the figure describes the LISTINGS
 * rather than the company.
 */
export const AGE_BASIS = "catalogue";

/**
 * ── RULE 2: concentration is measured INSIDE Amazon ──────────────────────
 *
 * `topMarketplaceSharePct` is the largest Amazon marketplace as a share of
 * AMAZON revenue — US against CA, MX, UK and the rest. It is not Amazon
 * against Shopify or TikTok Shop.
 *
 * The factor exists to price one specific risk: a suspension, a category
 * restriction or a policy change in one marketplace reaching all of the
 * revenue. That risk is about exposure to a single Amazon storefront, so the
 * denominator has to be the Amazon business. Mixing a DTC channel into it
 * flatters a business that is wholly dependent on one Amazon marketplace and
 * happens to sell a few hundred dollars a month elsewhere.
 *
 * A business selling only on Amazon US scores 100% here, and −0.45. That is
 * the intended answer, not an edge case.
 */
export const CONCENTRATION_SCOPE = "amazon-only";

/**
 * ── RULE 3: off-Amazon revenue is not scored for now ─────────────────────
 *
 * `offAmazonSharePct` is left UNSET rather than estimated. Sizing a Shopify
 * store or a TikTok Shop from outside means multiplying a traffic estimate by
 * an assumed conversion rate by an assumed order value — three guesses whose
 * product would carry +0.15 or +0.35 of the multiple depending on which side
 * of 20% it landed. On Spite House the honest range spanned both.
 *
 * Unset is not neutral in this model: the factor simply does not fire, and the
 * business is valued on its Amazon business alone. Say so wherever the figure
 * is published — a valuation that silently excludes a channel is a different
 * number from one that says it did.
 */
export const OFF_AMAZON = "excluded";

/**
 * Rows of one metric type, oldest first.
 *
 * 🚨 Mirrors rowsOfType in lib/api.ts on purpose: the build scripts are plain
 * Node and cannot import a TypeScript module, and the valuation has to give
 * the same answer in the prerender as in the browser. Six lines duplicated
 * beats two code paths that can disagree about what a business is worth.
 */
function rowsOfType(series, type) {
  return (series?.metrics ?? [])
    .filter((m) => m.type === type)
    .sort((a, b) => a.periodStart.localeCompare(b.periodStart));
}

/** Trailing-twelve net profit from the generic series.
 *
 *  Null under twelve periods rather than annualising what is there: a "TTM"
 *  figure built from seven months is the single most misleading number a
 *  profile can carry, and the model multiplies it by up to 8. */
export function ttmNetProfit(series) {
  const rows = rowsOfType(series, "profit");
  if (rows.length < 12) return null;
  return rows.slice(-12).reduce((a, m) => a + Number(m.value), 0);
}

/** The periods the trailing twelve actually spans, for labelling it. */
export function ttmWindow(series) {
  const rows = rowsOfType(series, "profit");
  if (rows.length < 12) return null;
  return { from: rows[rows.length - 12].periodStart, to: rows[rows.length - 1].periodStart };
}

/** Share of trailing-twelve revenue falling in the single biggest period, 0–100.
 *
 *  The model's seasonality factor wants this. A perfectly flat business sits
 *  at 8.3; anything at or above 25 takes −0.3, because a buyer has to fund a
 *  year of inventory to catch a few weeks of sales. */
export function peakMonthSharePct(series) {
  const rows = rowsOfType(series, "revenue");
  if (rows.length < 12) return null;
  const year = rows.slice(-12).map((m) => Number(m.value));
  const total = year.reduce((a, b) => a + b, 0);
  return total > 0 ? (Math.max(...year) / total) * 100 : null;
}

/**
 * Largest Amazon marketplace as a share of Amazon revenue, 0–100.
 *
 * Pass revenue BY AMAZON MARKETPLACE — `{ US: 89988, CA: 4000 }`. A business
 * on one marketplace returns 100, which is the point of RULE 2. Non-Amazon
 * channels do not belong in this object; leaving them out is the rule, not an
 * omission.
 */
export function amazonConcentrationPct(revenueByMarketplace) {
  const values = Object.values(revenueByMarketplace ?? {}).map(Number).filter((v) => v > 0);
  if (values.length === 0) return null;
  const total = values.reduce((a, b) => a + b, 0);
  return (Math.max(...values) / total) * 100;
}

/**
 * Score one profile — the ONE place the two paths are chosen between.
 *
 * 🚨 The headline cards, the factor board and the prerender all call this. They
 * used to each decide for themselves whether to run the model or use a stated
 * multiple, which is three chances to answer differently and print a valuation
 * the factors underneath do not add up to.
 *
 * A stated multiple returns no adjustments, and that is honest: nothing was
 * scored, so there is nothing to show a reader. The board renders nothing
 * rather than inventing a breakdown for a number somebody typed.
 */
export function scoreProfile(valuation, series) {
  const ttm = ttmNetProfit(series);
  if (!valuation || ttm === null) return null;

  if (valuation.inputs) return valueBusiness({ netProfitTtm: ttm, ...valuation.inputs });

  if (typeof valuation.multiple === "number") {
    return {
      value: Math.round(ttm * valuation.multiple),
      multiple: valuation.multiple,
      netProfitTtm: ttm,
      adjustments: [],
      missingSignals: [],
      /* 0, not VALUATION_VERSION: this figure did not come out of the model,
         and stamping it with the model's version would say it had. */
      version: 0,
    };
  }
  return null;
}
