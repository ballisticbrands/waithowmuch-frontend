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
export function peakMonthSharePct(series: MetricsResponse | null): number | null;
export function amazonConcentrationPct(
  revenueByMarketplace: Record<string, number>,
): number | null;

export function scoreProfile(
  valuation: Profile["valuation"] | undefined,
  series: MetricsResponse | null,
): Valuation | null;
