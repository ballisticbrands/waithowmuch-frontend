import type { BusinessCard } from "./api.js";

/**
 * "To start" is stored as an estimated RANGE — what launching a copy would
 * cost today (backend src/lib/starting-cost.ts). This is where the page
 * decides what single figure to show for it: the LOW end, so a reader is never
 * told a launch costs more than the cheapest honest estimate of it.
 *
 * Mirrored in postbuild-spa-routes.mjs, which is plain Node and cannot import
 * this; change one, change both.
 */

const n = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

/** What the asterisk on a "To test" figure says (owner, 2026-10-25): the
 *  figure is the bare minimum, and a brand-new seller pays fixed costs on top. */
export const FIXED_COSTS_NOTE = "+ fixed costs for a new brand";
/** The same, for a table cell too narrow for it; the column's ⓘ says the rest. */
export const FIXED_COSTS_SHORT = "+ fixed costs";

/** The validation test without fixed costs: first order + any mould + launch
 *  ads (owner, 2026-10-25). Only a profile page has the estimate's breakdown; elsewhere
 *  this is null and the stored range stands. */
export function testCost(b: BusinessCard): number | null {
  const t = (b as { startingCostEstimate?: { breakdown?: { validation?: { together?: { inventory: number; ads: number } } } } | null })
    .startingCostEstimate?.breakdown?.validation?.together as { inventory: number; ads: number; tooling?: number } | undefined;
  return t ? Math.round(t.inventory + (t.tooling ?? 0) + t.ads) : null;
}

export function startingCostRange(b: BusinessCard): { low: number; high: number } | null {
  if (testCost(b) !== null) return null; // one figure, not a range
  const low = n(b.startingCostLow);
  const high = n(b.startingCostHigh);
  // A validation test is stored as one figure (low = high): not a range
  return low !== null && high !== null && low !== high ? { low, high } : null;
}

/** The figure a row or card shows. Falls back to the single stored value for
 *  a business priced before ranges, or an API that predates them. */
export function startingCostFigure(b: BusinessCard): number | null {
  const t = testCost(b);
  if (t !== null) return t;
  const r = startingCostRange(b);
  return r ? Math.round(r.low) : n(b.startingCost);
}
