import type { BusinessDetail } from "./api";
import { monthLabel } from "./format";

/**
 * The one sentence every date stamp on a profile uses — under the headline and
 * under each dated section alike.
 *
 * 🚨 One sentence, one date, one place. A profile is a story told at one point
 * in time and not a feed that keeps updating, and the page has to say that the
 * same way everywhere: two stamps worded or dated differently read as two
 * different kinds of date, and a reader reasonably wonders which parts are
 * live. The date is the business's `snapshotMonth` from the database, so every
 * section of a profile carries the same one. The prerender
 * (scripts/postbuild-spa-routes.mjs) mirrors this for the static copy.
 */
export const READING_NOTE = "Figures here are a reading taken then, not a live feed.";

/** "Read Sep 2026. Figures here are a reading taken then, not a live feed." */
export function readingStamp(month: string): string {
  return `Read ${monthLabel(month)}. ${READING_NOTE}`;
}

/** The stamp for a business, from its database snapshotMonth. Null when the
 *  row has none: printing a date nobody recorded would be worse than none. */
export function businessReadingStamp(business: Pick<BusinessDetail, "snapshotMonth">): string | null {
  return business.snapshotMonth ? readingStamp(business.snapshotMonth) : null;
}
