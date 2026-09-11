/**
 * Frontend-only business records.
 *
 * A slug listed here renders WITHOUT the API: Business.tsx serves this record
 * instead of fetching one, so the page works with nothing in the database.
 * For drafting a profile before the business has been researched and published.
 *
 * 🚨 Two things a local record does not get, both of which matter before it
 * ships rather than while it is being written:
 *
 *   1. It is invisible to `GET /v1/businesses`, so it never appears in a
 *      collection listing, a search or a facet count. The only way to the page
 *      is the URL itself.
 *   2. scripts/postbuild-spa-routes.mjs enumerates the API, so NO static HTML
 *      is written for this route. On GitHub Pages the URL falls through to
 *      404.html — it renders for a person and is a dead page to a crawler,
 *      which is the exact failure the prerender exists to prevent.
 *
 * Both stop being true the moment the business is a row in the database.
 * Treat an entry here as a draft, not as a place to keep a live profile.
 *
 * Plain .mjs with a sibling .d.mts for the same reason as index.mjs — the
 * build scripts are plain Node and cannot import TypeScript.
 *
 * Same rule as the authored profiles next door: a figure belongs in a field,
 * never typed into a sentence. Leave one `null` and the page renders "—",
 * which says "not known" instead of quietly claiming zero.
 */

/** @type {Record<string, import('./types').LocalBusiness>} */
export const LOCAL_BUSINESSES = {
  /* Empty on purpose. Spite House Games lived here until it was seeded into
     the database (backend: prisma/seed-spite-house-games.ts) — which is the
     move every entry here is meant to make, for the two reasons in the note
     above: a local record is invisible to the listing, and the prerender
     enumerates the API, so its URL shipped a crawler nothing.

     Add the next draft here the same way, and delete it the same way. */
};

/** The model the source applies to every month: profit is 28% of revenue and
 *  ad spend ~12%. Stated here once rather than per row. */
const PROFIT_RATE = 0.28;
const AD_RATE = 0.12;

/** Last day of a month, so a period has a real end rather than an implied one. */
const monthEnd = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};

/**
 * A draft's series in the API's own MetricsResponse shape.
 *
 * 🚨 The same shape a fetched profile gets, deliberately: the page then runs
 * ONE code path — toChartPoints for the chart, rowsOfType for everything else
 * — instead of a second one that only local records take and only local
 * records can break.
 */
function seriesOf(months, currency) {
  const metrics = [];
  for (const [ym, revenue] of months) {
    const periodStart = `${ym}-01`;
    const periodEnd = monthEnd(ym);
    const row = (type, value) => ({
      type,
      value: Math.round(value),
      meta: {},
      periodStart,
      periodEnd,
      isEstimated: true,
    });
    metrics.push(row('revenue', revenue));
    metrics.push(row('profit', revenue * PROFIT_RATE));
    metrics.push(row('adSpend', revenue * AD_RATE));
  }
  return {
    currency,
    types: [
      { type: 'revenue', label: 'Revenue', kind: 'FLOW', aggregate: 'sum' },
      { type: 'profit', label: 'Profit', kind: 'FLOW', aggregate: 'sum' },
      { type: 'adSpend', label: 'Ad spend', kind: 'FLOW', aggregate: 'sum' },
    ],
    metrics,
  };
}

export function localBusiness(slug) {
  const rec = LOCAL_BUSINESSES[slug];
  if (!rec) return undefined;
  return { business: rec.business, metrics: seriesOf(rec.months, rec.business.currency) };
}
