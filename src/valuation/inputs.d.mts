import type { MetricsResponse } from "../lib/api";
import type { Valuation } from "./model";
import type { Profile } from "../businesses/types";

/** "catalogue" — age is dated from the first listing, not the account. */
export const AGE_BASIS: string;
/** "amazon-only" — concentration compares Amazon marketplaces to each other. */
export const CONCENTRATION_SCOPE: string;
/** "excluded" — off-Amazon revenue is not scored while it cannot be sized. */
export const OFF_AMAZON: string;

export function ttmNetProfit(series: MetricsResponse | null): number | null;
export function ttmWindow(series: MetricsResponse | null): { from: string; to: string } | null;
/** The instant a valuation is scored at — the end of the series' last profit
 *  period, or the profile's own `asOf`. Never the wall clock; see RULE 4. */
export function valuationAsOf(
  series: MetricsResponse | null,
  profile?: Profile,
): Date | null;
export function peakMonthSharePct(series: MetricsResponse | null): number | null;
export function amazonConcentrationPct(
  revenueByMarketplace: Record<string, number>,
): number | null;

export function scoreProfile(
  profile: Profile | undefined,
  series: MetricsResponse | null,
): Valuation | null;
