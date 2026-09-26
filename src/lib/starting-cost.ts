import type { BusinessCard } from "./api.js";

/**
 * "To start" is stored as an estimated RANGE — what launching a copy would
 * cost today (backend src/lib/starting-cost.ts). This is where the page
 * decides what single figure to show for it: the midpoint.
 *
 * Mirrored in postbuild-spa-routes.mjs, which is plain Node and cannot import
 * this; change one, change both.
 */

const n = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

export function startingCostRange(b: BusinessCard): { low: number; high: number } | null {
  const low = n(b.startingCostLow);
  const high = n(b.startingCostHigh);
  return low !== null && high !== null ? { low, high } : null;
}

/** The figure a row or card shows. Falls back to the single stored value for
 *  a business priced before ranges, or an API that predates them. */
export function startingCostFigure(b: BusinessCard): number | null {
  const r = startingCostRange(b);
  return r ? Math.round((r.low + r.high) / 2) : n(b.startingCost);
}
