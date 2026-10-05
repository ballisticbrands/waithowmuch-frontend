/**
 * Highmark Collective — revenue by listing, Sep 2026, and the profile's
 * photographs.
 *
 * 🚨 GENERATED from the Keepa pull, not authored. Every row is one ASIN from
 * waithowmuch-research research/highmark-collective/payload.json (read
 * 2026-10-04): `sold` is Amazon's "bought in past month" badge at the
 * September month end, `price` the buy-box price in effect AT THAT MOMENT —
 * not today's, because three of the four products have moved price since
 * April — and `revenue` their product. Regenerate from that file rather than
 * editing a row, or the table stops matching the evidence behind it.
 *
 * All EIGHT listings are here. There is no tail: the catalogue is provably
 * closed at eight ASINs, confirmed by four independent Keepa queries (brand
 * string, two manufacturer strings, title match and the storefront list). They
 * sum to $51,482.00, the 2026-09 revenue row exactly, which check-profile.mjs
 * asserts.
 *
 * 🚨 The faith gift bundle is in at ZERO and must stay. Its badge went to zero
 * around 2026-09-28 after the 2026-06-05 cut from $34.99 to $27.99, so Amazon
 * stopped printing a count — which means under roughly 50 a month, not none.
 * It is still buying sponsored traffic (see the Advertising section), and a
 * row at zero is the only honest way to show a listing that is advertised and
 * not selling.
 *
 * Its own module, like White Mountain's, so the hash map and the rows stay out
 * of index.mjs.
 */

/** Photos from our bucket — never /public, never Amazon's CDN. Values are the
 *  content hashes `npm run product-image` printed on 2026-10-05; keyed by ASIN
 *  so no row types a 64-character hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/highmark-collective/';
const PHOTOS = {
  B0GHZSS4VV: 'a220033edc6ba5e4a4dffb4e88d10e2adc11b76334e07ea438293eaba04800c7',
  B0GJ133W12: '6c2d2709b587e8215534d8b6eec4bc2dbc196bdde0d73435f7843ac6e666efed',
  B0GHZRX7RP: 'bd309fe0306f388d699811d7558fea410cb90e241e06519b0460301ff01c9be6',
  B0GHZMGNTQ: '44a874fef50f2cb3993732fdbac2b7e7855a916f9494da36862c5ac76c09a56a',
  B0GHZN17JP: '155e13965d7ab43e589af55a3d8bd91805afb7c885c7cc62bfeb37290442bd9e',
  B0GHZS4W12: 'cc811efd2a6e132b068249f7547a56701d6861c9ba2e6ebca03a0a725b34573e',
  B0GHZS4DKJ: 'd8ce600ecfc6576d8d6c3741386df862d675b5971e4faf0618c3c74fd299b3a3',
  B0GHZM48XR: '928948e55df08f398ea7d3a2aad694b23c599609d2441b689946e10c0b43425d',
};
/** A photo's bucket URL, by ASIN. */
export const highmarkPhoto = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;

/* Names are the product and the variant, cut from Keepa's SEO titles
   ("Baptism Gifts for Boy or Girl - 10” Praying Lamb Plush 5-Piece Keepsake
   Set"). Three of these are one product — the baptism keepsake set — and three
   more are one product, the journal three-pack, whose ASINs share parent
   B0GWRQ4579. Largest first. */
export const HIGHMARK_BREAKDOWN = [
  {
    name: 'Baptism keepsake set — boy or girl, praying lamb',
    asin: 'B0GHZSS4VV',
    listed: '24 Mar 2026',
    sold: 400,
    price: 36.99,
    revenue: 14796,
    image: highmarkPhoto('B0GHZSS4VV'),
  },
  {
    name: 'Baptism keepsake set — boys',
    asin: 'B0GJ133W12',
    listed: '24 Mar 2026',
    sold: 300,
    price: 36.99,
    revenue: 11097,
    image: highmarkPhoto('B0GJ133W12'),
  },
  {
    name: 'Bible Verse Jar — 200 scripture cards',
    asin: 'B0GHZMGNTQ',
    listed: '18 May 2026',
    sold: 500,
    price: 19.99,
    revenue: 9995,
    image: highmarkPhoto('B0GHZMGNTQ'),
  },
  {
    name: 'Baptism keepsake set — girl',
    asin: 'B0GHZRX7RP',
    listed: '24 Mar 2026',
    sold: 200,
    price: 37.99,
    revenue: 7598,
    image: highmarkPhoto('B0GHZRX7RP'),
  },
  {
    name: 'Christian notebooks, set of 3 — Scripture Botanical',
    asin: 'B0GHZS4W12',
    sold: 200,
    price: 19.99,
    revenue: 3998,
    image: highmarkPhoto('B0GHZS4W12'),
  },
  {
    name: 'Christian notebooks, set of 3 — Blessed Botanical Cross',
    asin: 'B0GHZN17JP',
    sold: 100,
    price: 19.99,
    revenue: 1999,
    image: highmarkPhoto('B0GHZN17JP'),
  },
  {
    name: 'Christian notebooks, set of 3 — Joyful Bloom',
    asin: 'B0GHZS4DKJ',
    sold: 100,
    price: 19.99,
    revenue: 1999,
    image: highmarkPhoto('B0GHZS4DKJ'),
  },
  {
    /* 🚨 Zero is the reading, not a missing row. See the module header. */
    name: 'Faith gift bundle — mug, journal, pen, bracelet, doll',
    asin: 'B0GHZM48XR',
    sold: 0,
    price: 27.99,
    revenue: 0,
    image: highmarkPhoto('B0GHZM48XR'),
  },
];
