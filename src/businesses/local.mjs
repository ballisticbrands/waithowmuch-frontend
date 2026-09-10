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
  'spite-house-games': {
    business: {
      // Not a database id. Prefixed so that it is obvious in a console, a
      // network tab or a bug report that this record never came from the API.
      id: 'local-spite-house-games',
      slug: 'spite-house-games',
      name: 'Spite House Games',
      tagline: 'grown-up gag card games',

      country: 'US',
      currency: 'USD',
      // The seller account trades from 2021; this catalogue does not. The
      // first ASIN under it is dated 2025-01-20, which is the date that
      // describes THIS business. The 2021 account age is on the operator list.
      establishedAt: '2025-01-20',

      researchMethod: 'RESEARCHED',
      // Not LOW: the monthly series comes from badge history and the unit
      // economics from published fee rates, so the shape is well evidenced.
      // Not HIGH either — nobody at the business has confirmed any of it.
      confidence: 'MEDIUM',

      // September 2026, the most recent month in the series below. Profit and
      // margin are modelled, not measured: profit is revenue less cost of
      // goods, Amazon's fees and modelled ad spend, with returns and overhead
      // both set to zero.
      latestPeriod: '2026-09-01',
      latestMonthlyRevenue: '89988',
      latestMonthlyProfit: '25197',
      latestMarginPct: '28',

      // Deliberately null. Nothing public says what was actually spent to
      // start: the printing quotes give a floor for one run and no more, and
      // an invented number here would be indistinguishable on the page from
      // the researched ones.
      startingCost: null,
      startingCostNote: null,

      logoUrl: null,
      publishedAt: '2026-09-10',

      categories: [
        { slug: 'amazon-fba', name: 'Amazon FBA', kind: 'CHANNEL' },
        { slug: 'card-games', name: 'Card games', kind: 'NICHE' },
        { slug: 'private-label', name: 'Private Label', kind: 'MODEL' },
        { slug: 'short-form-video', name: 'Short-form video', kind: 'GROWTH' },
        { slug: 'paid-social', name: 'Paid social', kind: 'GROWTH' },
        { slug: 'consumers', name: 'Consumers', kind: 'AUDIENCE' },
      ],

      // Null because this profile is authored: the blocks in index.mjs render
      // instead of `summary`, which is the fallback for a DB-only page.
      summary: null,

      links: [
        {
          platform: 'AMAZON',
          // The BRAND storefront, not the seller profile. The label says
          // "Amazon store" and the chip under it says "16 ASINs", and the
          // storefront is the page that shows those; /sp?seller= is the
          // feedback record, which is a source rather than a shop and is
          // cited as one below.
          url: 'https://www.amazon.com/stores/SpiteHouseGames/page/06BCACAC-F8E6-41CF-9755-4E4CD40B36ED',
          label: 'Amazon store',
          handle: 'A1JV6NB17MZ485',
          followerCount: null,
          meta: { asins: 16, source: 'Keepa Product API' },
        },
        {
          platform: 'WEBSITE',
          url: 'https://spitehousestudios.com/',
          label: 'spitehousestudios.com',
          handle: null,
          followerCount: null,
          meta: { visitsPerMonth: 12900, source: 'Similarweb' },
        },
        {
          platform: 'TIKTOK',
          url: 'https://www.tiktok.com/@spitehouse_games',
          label: 'TikTok',
          handle: '@spitehouse_games',
          followerCount: 45400,
          meta: { likes: 5200000, videos: 359, createdAt: '2024-11-30' },
        },
        {
          platform: 'INSTAGRAM',
          url: 'https://www.instagram.com/spitehouse_games/',
          label: 'Instagram',
          handle: '@spitehouse_games',
          followerCount: 20000,
          meta: {},
        },
      ],

      sources: [
        {
          title: 'Amazon storefront — Spite House Games',
          url: 'https://www.amazon.com/sp?seller=A1JV6NB17MZ485',
          note: 'Seller identity, feedback record and the size of the catalogue.',
        },
        {
          title: 'The hero listing — “Go F Yourself!”',
          url: 'https://www.amazon.com/dp/B0FMGJSSXT',
          note: 'Category breadcrumb, best-seller rank, price and review count, read 2026-09-10.',
        },
        {
          title: 'Keepa',
          url: 'https://keepa.com',
          note: 'Sales-badge history, which is what the monthly series is built from.',
        },
        {
          title: 'Similarweb',
          url: 'https://www.similarweb.com',
          note: 'Traffic estimate for spitehousestudios.com.',
        },
        {
          title: 'Meta Ad Library',
          url: 'https://www.facebook.com/ads/library/',
          note: 'The ads running against the store from 6 July 2026.',
        },
      ],
    },

    // Monthly series, oldest first, September 2025 to September 2026.
    //
    // Revenue for Sep/Oct/Nov/Dec 2025, Jan 2026 and Jun/Jul/Aug/Sep 2026 is
    // stated outright in the source — June and July on its timeline tab, the
    // rest in its prose. February to May 2026 is NOT: those four months were
    // read off the source's own chart, so treat them as accurate to about
    // ±$100 rather than to the dollar.
    //
    // Profit and ad spend are not separately published for any month. They are
    // the source's model applied at its stated rates — 28% of revenue and
    // ~12% of revenue — which reproduces its headline figures exactly
    // ($89,988 -> $25,197 profit, $10,799 ad spend). Every row is therefore
    // flagged isEstimated.
    //
    // 🚨 Kept as a readable table and expanded into the API's generic row
    // shape below. Hand-writing 39 MetricRows would make a correction to one
    // month a three-line edit in three places.
    months: [
      // month,     revenue
      ['2025-09',    13940],
      ['2025-10',    69700],
      ['2025-11',   278800],
      ['2025-12',   349150],
      ['2026-01',    62717],
      ['2026-02',    55800],
      ['2026-03',    35700],
      ['2026-04',    63000],
      ['2026-05',    57200],
      ['2026-06',    61494],
      ['2026-07',    80420],
      ['2026-08',    96958],
      ['2026-09',    89988],
    ],
  },
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
