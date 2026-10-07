/**
 * A cost line's share of revenue, as the Margin breakdown prints it — and as
 * every table that restates a margin line must print it, so the two read the
 * same (the Advertising section's "Ad spend" table is built with this).
 *
 * Whole percents stay whole ("15%"); anything else keeps one decimal
 * ("27.2%"), and under 1% two ("0.19%"): a 0.186% advertising line rounded to
 * "0%" reads as "no ads", which is a different claim. Plain .mjs so the
 * profiles (and the prerender, which imports them in Node) can use it.
 */
export function linePct(v) {
  const a = Math.abs(v);
  if (a === 0) return "0%";
  if (a < 1) return `${Number(a.toFixed(2))}%`;
  return Number.isInteger(Number(a.toFixed(3))) ? `${Math.round(a)}%` : `${Number(a.toFixed(1))}%`;
}

/** Dollars for a per-sale or per-month figure in such a table: cents under
 *  $100, whole dollars above. */
export function lineUsd(v) {
  return Math.abs(v) < 100 ? `$${v.toFixed(2)}` : `$${Math.round(v).toLocaleString("en-US")}`;
}

/** A monthly amount in such a table: whole dollars. */
export function monthUsd(v) {
  return `$${Math.round(v).toLocaleString("en-US")}`;
}
