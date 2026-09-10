/**
 * The "Data" section's collections — one per navbar entry.
 *
 * Plain .mjs with a sibling .d.ts rather than a .ts file, because
 * scripts/postbuild-spa-routes.mjs is plain Node and must import the SAME
 * module the React app renders from. The alternative — a .ts and a hand-kept
 * .mjs twin — is exactly the drift that check-site-constants.mjs exists to
 * police, and there is no reason to create a second instance of that problem.
 *
 * `query` is appended to /v1/businesses. Empty means "everything published".
 */
export const COLLECTIONS = [
  {
    slug: 'all-ideas',
    title: 'The Idea Database',
    /** Shown in the nav, where "The Idea Database" would be too long. */
    navLabel: 'All ideas',
    icon: 'database',
    query: '',
    inNav: true,
  },
  {
    slug: 'amazon-fba',
    title: 'Amazon FBA ideas',
    navLabel: 'Amazon FBA',
    icon: 'parcel',
    query: 'channel=amazon-fba',
    inNav: true,
  },
  {
    slug: 'shopify',
    title: 'Shopify ideas',
    navLabel: 'Shopify',
    icon: 'bag',
    query: 'platform=shopify',
    inNav: true,
  },
];

/** The navbar's last "Data" entry — an index of every collection, not a filter. */
export const MORE = {
  slug: 'more-ideas',
  title: 'More ideas',
  icon: 'grid',
  blurb: 'Every way to slice the data — by niche, business model, platform and growth channel.',
  inNav: true,
};

/** Meta descriptions. Kept OUT of `blurb` because these are not rendered on
 *  the page — they are <meta> only, and conflating "what the page says" with
 *  "what the search result says" is how a page ends up serving copy to
 *  crawlers that no visitor ever sees. */
export const DESCRIPTIONS = {
  'all-ideas': 'Revenue, profit, margin and starting cost for businesses you have never heard of. Researched from public data, with sources on every profile.',
  'amazon-fba': 'Amazon FBA businesses with their monthly revenue, margin and what it cost to start. Researched from public data.',
  shopify: 'Shopify businesses with their monthly revenue, margin and what it cost to start. Researched from public data.',
  'more-ideas': 'Browse researched businesses by niche, business model, platform and growth channel.',
};

export function collectionBySlug(slug) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** The default collection lives at /data/ itself, not /data/all-ideas/.
 *  🚨 One function, used by the router, the nav, the prerender and the
 *  sitemap — so the canonical URL cannot disagree with the link that points
 *  at it. */
export function collectionPath(slug) {
  return slug === 'all-ideas' ? '/data/' : `/data/${slug}/`;
}
