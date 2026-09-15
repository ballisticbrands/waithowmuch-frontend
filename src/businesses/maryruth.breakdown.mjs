/**
 * MaryRuth's — the listing photos and the fifteen largest listings.
 *
 * 🚨 NOT a `breakdown` block, deliberately. The chart is the top 100 listings
 * (research/maryruth/dossier.ts `salesHistory`), and the dossier itemises only
 * the largest 15 of them. A breakdown promises to sum to the snapshot month and
 * these sum to under half of it; padding it with an "everything else" row would
 * sort that row first and have the block name it the best seller. So the rows
 * are a plain table, and the note under it says what is missing.
 *
 * Every row is the dossier's `asins[]` entry as read on 2026-09-09: `sold` is
 * Amazon's "bought in past month" badge (a bracket floor, and the LISTING's
 * sales — other sellers on it included), `priceCents` the buy box. The strings
 * are formatted here from those raw values rather than typed, so a corrected
 * price moves its revenue cell with it.
 */

/** Our bucket, never Amazon's CDN or /public. Content hashes as
 *  `npm run product-image` printed them, 2026-09-15. All three are the best
 *  seller's own listing images (B0CWS5QP8F). */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/maryruth/';
export const MARYRUTH_PHOTOS = {
  /* Main listing image: bottle beside its box. */
  hero: `${BUCKET}f863e20037aaba811176e018af72aa3202faa75c7c6a58ddf019695163a8c0b3.jpg`,
  /* "Upgrade your hair routine" — the product taken as a shot. */
  drink: `${BUCKET}fbbea28812cd3b6efaf1f909001221ded4527cd3a64f1a6f0dbefe10917b8e15.jpg`,
  /* "Multiple essential nutrients in each serving" — the measuring glass. */
  serving: `${BUCKET}a41c323e080ef62075bdf0e9c3c7f9f1c10de9de39066eb3bb2b5413b3472ce4.jpg`,
};

/* [asin, name, monthlySold, priceCents, listed] — dossier `asins`, best-selling first. */
const LISTINGS = [
  ['B0CWS5QP8F', 'Liquid Multivitamin + Hair Growth', 40000, 2688, '2023-08-25'],
  ['B0CGKVHHCY', 'Liquid Multivitamin + Hair Growth, larger size', 20000, 5039, '2023-08-25'],
  ['B0CNDDQ4WR', 'Hair Growth Max Liposomal 10,000mcg Biotin', 10000, 5456, '2023-11-15'],
  ['B00MDRTV8A', 'Liquid Morning Multivitamin — the original, 2014', 20000, 2677, '2014-09-14'],
  ['B0DQLVWK6L', 'Liquid Multivitamin + Hair Growth', 10000, 5022, '2024-12-16'],
  ['B084QD29LR', 'Organic Lymphatic Support Liquid Drops', 30000, 1515, '2020-02-11'],
  ['B07WMX9N2D', 'Kids Multivitamin Gummies, sugar free', 30000, 1446, '2019-08-15'],
  ['B0DKQLNXN3', 'Multivitamin + Hair Growth Gummies', 6000, 6995, '2024-10-23'],
  ['B0DQR8ZY1K', 'Liquid Multivitamin + Hair Growth', 10000, 3995, '2024-12-19'],
  ['B0F3LB24T4', 'Daily Liquid Hair Formula', 10000, 3495, '2025-07-17'],
  ['B07YM21GR5', 'Liquid Iron Supplement', 10000, 2949, '2019-10-01'],
  ['B0BGMGWP14', 'USDA Organic Multivitamin Gummies, ages 4+', 20000, 1447, '2022-09-27'],
  ['B0CZ4GCPXT', 'USDA Organic Prenatal & Postnatal Gummies', 9000, 2995, '2024-03-26'],
  ['B0DQM2SSR2', 'Kids Liquid Morning Multivitamin', 10000, 2499, '2024-12-16'],
  ['B0BGMK8WK8', 'USDA Organic Kids Multivitamin + Postbiotics', 10000, 2495, '2022-09-27'],
];

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MON[m - 1]} ${y}`;
};
const usd = (cents) =>
  `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 })}`;

/** Rows for the `table` block: Listing, ASIN, Listed, Sold / mo, Buy box, Revenue / mo. */
export const MARYRUTH_TOP_LISTINGS = LISTINGS.map(([asin, name, sold, priceCents, listed]) => [
  name,
  asin,
  day(listed),
  `${sold.toLocaleString('en-US')}+`,
  usd(priceCents),
  usd(sold * priceCents),
]);
