import type { BusinessCard } from "@/lib/api";

/**
 * Search the case-study list by name, instantly, in the browser.
 *
 * Everything is compared in one "compact" form: lower case, accents dropped,
 * "&" read as "and", and every space and punctuation mark removed. That is what
 * makes "Mary Ruth", "maryruth" and "MaryRuth's" one name, and "spite house"
 * find "Spite House Games".
 *
 * A query matches a business when either
 *   - the whole query, compacted, is inside its name or slug, or
 *   - every word of the query is inside its name, slug, tagline, headline or
 *     categories ("mahjong", "dog treats", "card game").
 * Name matches rank first, a name that STARTS with the query above one that
 * merely contains it; then the list's own order.
 *
 * 🚨 Client-side over the rows already loaded. The API returns 24 a page and
 * this page loads one, so past 24 case studies the search needs the API to
 * take a `q` parameter instead.
 */
export const compact = (s: string | null | undefined) =>
  (s ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const words = (q: string) =>
  q.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").split(/[^a-z0-9]+/).filter(Boolean);

function score(b: BusinessCard, q: string): number {
  const whole = compact(q);
  if (!whole) return 0;
  const name = compact(b.name);
  const slug = compact(b.slug);
  if (name.startsWith(whole) || slug.startsWith(whole)) return 3;
  if (name.includes(whole) || slug.includes(whole)) return 2;
  const hay = [b.name, b.slug, b.tagline, b.title, b.subtitle, ...b.categories.map((c) => c.name)].map(compact).join(" ");
  const ws = words(q);
  return ws.length && ws.every((w) => hay.includes(w)) ? 1 : 0;
}

/** The rows that match, best first; all of them, untouched, for an empty query. */
export function searchBusinesses(rows: BusinessCard[], q: string): BusinessCard[] {
  if (!compact(q)) return rows;
  return rows
    .map((b, i) => ({ b, i, s: score(b, q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((r) => r.b);
}
