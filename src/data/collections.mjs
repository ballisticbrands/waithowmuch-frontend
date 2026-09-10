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
    title: 'All ideas',
    blurb:
      'Every business we have researched, with what it makes and what it cost to start. Figures are estimates unless a profile says otherwise.',
    query: '',
    inNav: true,
  },
  {
    slug: 'amazon-fba',
    title: 'Amazon FBA ideas',
    blurb:
      'Businesses selling physical products through Amazon FBA — what they turn over, what they keep, and how they got their first customers.',
    query: 'channel=amazon-fba',
    inNav: true,
  },
  {
    slug: 'shopify',
    title: 'Shopify ideas',
    blurb:
      'Direct-to-consumer businesses running on Shopify, with revenue, margin and the channel that actually drove their growth.',
    query: 'platform=shopify',
    inNav: true,
  },
];

/** The navbar's last "Data" entry — an index of every collection, not a filter. */
export const MORE = {
  slug: 'more-ideas',
  title: 'More ideas',
  blurb: 'Every way to slice the data — by niche, business model, platform and growth channel.',
  inNav: true,
};

export function collectionBySlug(slug) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function collectionPath(slug) {
  return `/data/${slug}/`;
}
