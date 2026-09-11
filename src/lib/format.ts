/** Formatting helpers. Money and percentages appear on every card, so the
 *  rules live in one place rather than being re-derived per component. */

const n = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

/** Compact money for cards and axes: $89,988 -> $90.0k, $1,240,000 -> $1.24M.
 *  Whole dollars — cents on a monthly revenue figure are noise, and on an
 *  ESTIMATE they imply a precision the research does not have. */
export function money(value: number | string | null | undefined, currency = "USD"): string {
  const v = n(value);
  if (v === null) return "—";
  const abs = Math.abs(v);
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "";
  const fmt = (x: number, d: number) => x.toFixed(d).replace(/\.0+$/, "");
  if (abs >= 1_000_000) return `${sym}${fmt(v / 1_000_000, 2)}M`;
  if (abs >= 1_000) return `${sym}${fmt(v / 1_000, 1)}k`;
  return `${sym}${Math.round(v).toLocaleString("en-US")}`;
}

export function exactMoney(value: number | string | null | undefined, currency = "USD"): string {
  const v = n(value);
  if (v === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency, maximumFractionDigits: 0,
  }).format(v);
}

/** Counts, not money: 45400 -> 45.4K, 5200000 -> 5.2M. Follower and visit
 *  figures are approximations the platform itself rounds, so printing
 *  "45,400 followers" would dress an estimate up as a headcount. */
export function compact(value: number | string | null | undefined): string {
  const v = n(value);
  if (v === null) return "—";
  const abs = Math.abs(v);
  const fmt = (x: number) => x.toFixed(1).replace(/\.0$/, "");
  if (abs >= 1_000_000) return `${fmt(v / 1_000_000)}M`;
  if (abs >= 1_000) return `${fmt(v / 1_000)}K`;
  return v.toLocaleString("en-US");
}

/** Money at the grain a shelf price is set in — $6.97, not $7.
 *
 *  Whole dollars are right for a monthly total, where cents are noise, and
 *  wrong for a unit price, where they are the entire difference between one
 *  fulfilment fee band and the next. */
export function price(value: number | string | null | undefined, currency = "USD"): string {
  const v = n(value);
  if (v === null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(v);
}

export function percent(value: number | string | null | undefined): string {
  const v = n(value);
  return v === null ? "—" : `${Math.round(v)}%`;
}

/** "Aug 2026" — the grain the figures are actually reported at. */
export function monthLabel(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** "Sep 9, 2026" — day grain, for a reading taken on a particular day rather
 *  than a figure reported for a month. */
export function dayLabel(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

export function yearsSince(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const years = (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000);
  if (years < 1) return "under a year";
  return `${Math.floor(years)} yr${Math.floor(years) === 1 ? "" : "s"}`;
}

export const METHOD_LABEL: Record<string, string> = {
  RESEARCHED: "Researched",
  SELF_REPORTED: "Self-reported",
  INTERVIEW: "Interview",
  VERIFIED: "Verified",
};
