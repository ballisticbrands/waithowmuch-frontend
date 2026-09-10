/** Types for the valuation model. Mirrors sellerconnect's
 *  src/services/valuation/valuation.ts — keep the shapes identical so the two
 *  can be diffed, and so this can move back without a rewrite. */

/** The seller's questionnaire answers, by question name.
 *
 *  🚨 On a researched profile this is mostly EMPTY, and that is correct.
 *  Nobody here has answered anything: leave a key out rather than guessing
 *  it, and the model reports it in `missingSignals` instead of scoring a
 *  fact that was never established. */
export interface ValuationAnswers {
  /** "under5" | "5to10" | "over20" */
  hoursPerWeek?: string;
  /** "1" | "2" | "3" | "4plus" */
  supplierCount?: string;
  /** "redundant" | "per_product" */
  supplierRole?: string;
  /** "exclusive" | "contract" | "reseller" */
  supplierTerms?: string;
  /** private_label | wholesale | handmade | pod | dropship | arbitrage | merch | kdp */
  primaryMethod?: string;
  /** dominance | broad | concentrated | flagship | generalist | churn */
  catalogStructure?: string;
  /** The three-question differentiation diagnostic: "yes" | "no" | "some". */
  diffTooling?: string;
  diffCustom?: string;
  diffVisible?: string;
  /** "yes" | "no" */
  brandRegistry?: string;
  /** "registered" | "licensed" */
  trademark?: string;
  /** "open" | "resolved" | "none" */
  issues?: string;
  /** "healthy" | "warnings" | "at_risk" */
  accountHealth?: string;
  /** "recent" | "past" */
  violations?: string;
  /** "none" | "vas" | "contractors" | "agency" | "employees" | "mixed" */
  team?: string;
  /** "expanding" | "consolidating" */
  skuStrategy?: string;
  [key: string]: unknown;
}

/** Facts we did not have to ask for — read from listings, rank history and
 *  the metric series rather than from the owner. */
export interface ValuationDerived {
  ratingWeighted?: number | null;
  reviewTotal?: number | null;
  /** ISO date of the earliest listing we can see. */
  sellingSince?: string | null;
  /** "fba" | "fbm" | "both" */
  channels?: string | null;
  marketplaces?: string[];
  /** Share of revenue taken by the LARGEST marketplace, 0–100. */
  topMarketplaceSharePct?: number | null;
  /** Share of revenue earned OFF Amazon, 0–100. */
  offAmazonSharePct?: number | null;
  /** Share of trailing revenue in the single biggest month, 0–100. A flat
   *  business sits near 8.3; a Q4 business runs far above it. */
  peakMonthSharePct?: number | null;
  /** Units returned as a share of units sold, 0–100. */
  returnRatePct?: number | null;
  /** Search-volume trend for the niche, as a percentage change. */
  nicheTrendPct?: number | null;
  /** Amazon's Account Health Rating, 0–1000. */
  accountHealthScore?: number | null;
  /** Percentage positive seller feedback over 12 months, 0–100. */
  sellerFeedbackPct?: number | null;
}

export interface ValuationInputs {
  /** Trailing-twelve-month NET profit, in the display currency. */
  netProfitTtm: number | null;
  answers: ValuationAnswers;
  derived?: ValuationDerived;
  /** Defaults to now; injectable so tests do not drift with the calendar. */
  today?: Date;
}

export interface Adjustment {
  label: string;
  /** Added to the base multiple. Signed, and shown to the reader — a number
   *  that moves without saying why is a slot machine. */
  delta: number;
  /** Why this factor moves the price. Written beside the rule rather than in
   *  a lookup keyed by label, which breaks the moment a label is reworded. */
  why?: string;
}

export interface Valuation {
  /** Null when there is no profit to multiply. Not zero: a business we cannot
   *  value is not a business worth nothing. */
  value: number | null;
  multiple: number | null;
  netProfitTtm: number | null;
  adjustments: Adjustment[];
  /** Which inputs would move it most — the honest list of what is unknown. */
  missingSignals: string[];
  version: number;
}

export const VALUATION_VERSION: number;
export const BASE_MULTIPLE: number;
export const MIN_MULTIPLE: number;
export const MAX_MULTIPLE: number;
export function differentiationLevel(answers: ValuationAnswers): 1 | 2 | 3 | 4 | null;
export function valueBusiness(input: ValuationInputs): Valuation;
