/**
 * Wet Noses — revenue by listing, Sep 2026, and the profile's photographs.
 *
 * 🚨 GENERATED from the Keepa pull, not authored. Every row is one ASIN from
 * waithowmuch-research research/wet-noses/keepa/catalogue.json (read
 * 2026-09-15): `sold` is Amazon's "bought in past month" badge, `price` the buy
 * box, `revenue` their product. Regenerate from that file rather than editing a
 * row, or the table stops matching the evidence behind it.
 *
 * All 12 badged listings are here and they sum to $19,941.50, the 2026-09
 * revenue row exactly (check-profile.mjs asserts it). The other 19 priced
 * listings carry no badge (under ~50 a month each) and count as zero.
 *
 * Its own module, like White Mountain's, so the hash map and the rows stay out
 * of index.mjs.
 */

/** Photos from our bucket — never /public, never Amazon's or Shopify's CDN.
 *  Values are the content hashes `npm run product-image` printed on
 *  2026-09-15; keyed so no row types a hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/wet-noses/';
const PHOTOS = {
  B006M3Y5WS: '20a15aeea6592a6596fc2212698ebd797326e349ecb31d38c0b3e50cae3b0416',
  B096GXBK5D: '5df6d440413860f428780d61939d304b4efa2d871a1fe6ed123985f6f6e9fc8a',
  B071VRRJD3: 'f8f2212118da78f0f48c924292ec3fd7073d320871e110d07a08f62d6d8dbfb6',
  B07HM8SLPH: 'e8179548eff9150d3d32abbdebd42fd8d0391fea9a7d9244c73026c32a41787d',
  B07NHV96YC: '273a924161e30225b5ceb2f1144adef7a9429fab0f5dc4364d8d5a29cd35711f',
  B096GCL8L4: 'e3193ac354abd01a53a646eb42bbbdeb92f706c3f1d7266085dc5275f0bc39ff',
  B0040QS2ZK: 'e98ea1e7f9090ecee4d9f45dbfc7fcca1bc3b6defe0d3969fa6f7cdb37e2cb95',
  B096GBWRTT: 'a531cb800ff1c1d7394d038466f11c5b03af2e56d728339b03df9942a51a0a60',
  B096BMTQG9: 'b71dcba90c86e24ac01dbbb57da27c155de9dc82bdef09097b47b81782a65aff',
  B08B576LFP: 'ce02e588d58d97863ea0d527ae42a45172bdcea6e754f86b152ecc96a62373ee',
  B08K9CJG2D: 'cbe5b2a05a4070a134f0304886c924217363d4830137a2f958bcf51b5e90986a',
  B08879KZXF: '56426648958d16fea7e1f4aa2b7999c324e71cdf496c48f80c1ab23765f4541e',
  /* The brand's own photographs from wet-noses.com (DSC00915, DSC02067),
     downscaled to 1600px before upload. */
  dogWithBags: 'e1806d54451903df822fcd902ae96feddcc6a1e779da997ca79feb32ef6ee1df',
  stackedTreats: 'fee8f2db136cb1703d87a45e740cb0f859793c09d99d2a1a6007719f9e8a4e3d',
};
/** A photo's bucket URL, by ASIN or by the brand-photo key above. */
export const wetNosesPhoto = (key) => PHOTOS[key] && `${BUCKET}${PHOTOS[key]}.jpg`;

/* Names are the flavour and pack, cut from Keepa's SEO titles ("Wet Noses
   Organic Crunchy Dog Treats Grain Free – All-Natural, … – Berry Blast, 14oz
   (2 Pack)"). Every one is the Organic Crunchy line. */
export const WET_NOSES_BREAKDOWN = [
  { name: 'Peanut Butter & Banana · 5 lb box', asin: 'B006M3Y5WS', image: wetNosesPhoto('B006M3Y5WS'), listed: '2011-12-14', sold: 100, price: 39.99, revenue: 3999.0 },
  { name: 'Peanut Butter & Banana · two 14oz bags', asin: 'B096GXBK5D', image: wetNosesPhoto('B096GXBK5D'), listed: '2021-08-21', sold: 200, price: 19.99, revenue: 3998.0 },
  { name: 'Berry Blast · two 14oz bags', asin: 'B071VRRJD3', image: wetNosesPhoto('B071VRRJD3'), listed: '2017-05-15', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: 'Pumpkin & Quinoa · 5 lb box', asin: 'B07HM8SLPH', image: wetNosesPhoto('B07HM8SLPH'), listed: '2025-10-21', sold: 50, price: 39.99, revenue: 1999.5 },
  { name: 'Peanut Butter & Molasses · 5 lb box', asin: 'B07NHV96YC', image: wetNosesPhoto('B07NHV96YC'), listed: '2019-01-23', sold: 50, price: 39.99, revenue: 1999.5 },
  { name: 'Carrot & Sweet Potato · two 14oz bags', asin: 'B096GCL8L4', image: wetNosesPhoto('B096GCL8L4'), listed: '2021-06-30', sold: 50, price: 19.99, revenue: 999.5 },
  { name: 'Pumpkin & Quinoa · two 14oz bags', asin: 'B0040QS2ZK', image: wetNosesPhoto('B0040QS2ZK'), listed: '2022-02-03', sold: 50, price: 19.99, revenue: 999.5 },
  { name: 'Peanut Butter & Molasses · two 14oz bags', asin: 'B096GBWRTT', image: wetNosesPhoto('B096GBWRTT'), listed: '2021-06-30', sold: 50, price: 19.99, revenue: 999.5 },
  { name: 'Apple Ginger · two 14oz bags', asin: 'B096BMTQG9', image: wetNosesPhoto('B096BMTQG9'), listed: '2021-06-30', sold: 50, price: 19.99, revenue: 999.5 },
  { name: 'Peanut Butter & Molasses · 14oz bag', asin: 'B08B576LFP', image: wetNosesPhoto('B08B576LFP'), listed: '2020-06-11', sold: 50, price: 12.99, revenue: 649.5 },
  { name: 'Pumpkin & Quinoa · 14oz bag', asin: 'B08K9CJG2D', image: wetNosesPhoto('B08K9CJG2D'), listed: '2020-09-28', sold: 50, price: 12.99, revenue: 649.5 },
  { name: 'Apple & Ginger · 14oz bag', asin: 'B08879KZXF', image: wetNosesPhoto('B08879KZXF'), listed: '2019-01-12', sold: 50, price: 12.99, revenue: 649.5 },
];
