/**
 * KALOTOYS — revenue by listing, Sep 2026.
 *
 * 🚨 GENERATED, not authored. Every row is one badged ASIN from the union of
 * waithowmuch-research research/kalotoys/keepa/catalogue.json,
 * keepa-giftora/catalogue.json and keepa-kalotoys-group/catalogue.json (read
 * 2026-09-15), each ASIN counted ONCE: `sold` is Amazon's "bought in past
 * month" badge, `price` the buy box, `revenue` their product. Regenerate from
 * those files rather than editing a row.
 *
 * The 29 rows sum to $156,692.00, the 2026-09 revenue row exactly, which
 * check-profile.mjs asserts. 205 more priced listings carry no badge and count
 * as zero.
 *
 * Each name ends with the account whose storefront lists the ASIN — not who
 * held the buy box. "KALOTOYS GROUP" rows sit in neither of the other two
 * storefronts; that account held the buy box on all ten badged ones probed.
 * 🚨 Giftora and KALOTOYS GROUP are attributed to KaloToys by inference (name,
 * listings, address), not by document.
 *
 * `listed` is omitted where Keepa has no first-listed date, and on B0H3KVJ54K,
 * whose 2022-08-15 is impossible for a B0H ASIN.
 */

/** Listing photo, from our bucket — never /public, never Amazon's CDN. All 29
 *  uploaded 2026-09-15 with `npm run product-image`; values are the content
 *  hashes it printed, keyed by ASIN so no row types a hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/kalotoys/';
const PHOTOS = {
  B0DNVSDMM4: '724a65ffdd7ed10951f0de0b32eac66d9eef7a4289529f4c6db950f3dcc36a9c',
  B0DQZK97MM: '7ba883e4decb95dab03101ff02f91f78432752ad17d7cd52ecaefcf36e1499cd',
  B0DQZKTNCB: '17c2e0bbeb44d86cf963468fa8706264186397f648ecfa0c92e4a04b45234915',
  B0F79BB2YB: '60672af45110a204a1a548700faa3b31c3b74caca3f9c89862448b3baf638237',
  B0F79FY9Z3: 'f38fdf3cee6b348406558ee8d3678e3a23027cd169625a0eae7e12e1ce986504',
  B0F7HLHQJD: '68363f3b0f20b598bec12277f8167555c9514e0a864e5a9f57cf1ccc84a3cd60',
  B0F7HPYL96: '63d8b1d974f50c0dd7ce0430f3f6eb1fada2f14a20c570917b2f330e7860c5f9',
  B0FFH4STGV: '765368bc810e55e4be9432c5dd9cc775cffd4eeb9866bcc79f797f98a1609a0b',
  B0FNXCMXWG: '62804232e4dd51bc4b01dc9ebcff1c329d006c874b940c2e31d44ae940b16bf7',
  B0FNXDM21W: '1b9167106ece7ddbdad484fa205da35914df5256e41b16c0c4fa20f68a233e1a',
  B0GMQZ6FBW: '2fb9e46ecc23a8969566c0cd5b5bcaa18ce469e93f776915c11051d4c81e97b8',
  B0GN7TK1HH: 'b15b921bb76877b1612b8d277666481229f43ddf74f202f622fbdeeb0dc36127',
  B0GSZKV61K: 'f27956c58818d1b6dcf69b7a6f6d29ed33a9d64b6218b1a845a9fdd08f764115',
  B0GSZSCM69: '9eea8c9751b2cf9089545210cc1212ea9d97b087a3b3ff3066e6e68b49391b4d',
  B0GTH264PN: 'f22a00f3f0135b3f03d670be461228a1c44f177b111633b5a326a1972fb40f81',
  B0GTHVWHM8: 'ee260140b8b0093132de0e9bfea16b2ce1e759e559431479f5d925fac016b701',
  B0H3KRWCC9: '9a8a55832cbfe78005de5f1b1491651e9baf5deb2ead3a04983fa4ee479b1c5a',
  B0H3KTSB4M: 'a16dc7b593c4cc94a3567ed84596f5467f011d79b0e4deb1cac4ef8007f9410e',
  B0H3KVJ54K: 'b47d8d3f746027f890740a7dc66a0c9956934b89eed2df1a4b4af640b2943d70',
  B0H3KW1D83: '42023fab60def6d8f1467a2000e2bbbe3d4b4134fffacb1f11720cfeae7e074f',
  B0H3KXYXCJ: 'e2964290a112d33268fb79e2769600b3ca1a8db71a495135de703449005ad766',
  B0H3KZPW8Y: '21ec98d1b8422f46c2296b5960b7409c59b7115ff5a9fd6b04b690b8be876c69',
  B0H6HB2TVN: '98793b70f8a34f2cc822d4a78af8aaa38dc8b23c6184f531885f3e5c046105b3',
  B0H6M6D7T9: '2908eac19a53f29d28b680c3edc222805d3c5a380ba949eefce4b1e901ddc4c2',
  B0H875DF8X: '2a7efd097f59798107b0b930fe7428e4831cab43f8ae9f377ce9cfb0042779ab',
  B0H876CR1J: 'f879e90f833772bc6ba21ef49eb311b6a493dcaa7e0f467df76096a4699eac13',
  B0H8RKY6VQ: 'ac03b27122b1a464234b717bb23f2f36d0c51e9e03724d810937733854f96e4c',
  B0H8RZ8QF7: '95352432a824cd821ecbc5c7568c7e874ff9157a7848b9d4f928ba463f7d6543',
  B0HBPT72LS: 'cab4172886641606bfaddf8620303b9baeaa39bf8054babfba1d08dbc3259c54',
};
export const kalotoysPhoto = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;
const photo = kalotoysPhoto;

export const KALOTOYS_BREAKDOWN = [
  { name: "Personalised name puzzle, 48 animal art sets · Giftora", asin: 'B0GSZSCM69', image: photo('B0GSZSCM69'), listed: '2026-03-18', sold: 1000, price: 34.96, revenue: 34960.0 },
  { name: "Personalised name puzzle, animal story background · Giftora", asin: 'B0GTH264PN', image: photo('B0GTH264PN'), listed: '2026-03-18', sold: 600, price: 34.96, revenue: 20976.0 },
  { name: "Custom name puzzle, animal art backdrop · Giftora", asin: 'B0GSZKV61K', image: photo('B0GSZKV61K'), listed: '2026-03-18', sold: 400, price: 34.96, revenue: 13984.0 },
  { name: "Personalised name puzzle with numbers and shapes · Giftora", asin: 'B0GTHVWHM8', image: photo('B0GTHVWHM8'), listed: '2026-03-18', sold: 300, price: 34.96, revenue: 10488.0 },
  { name: "First day of school sign, cut-out name · KALOTOYS GROUP — listing 1 of 5", asin: 'B0H3KTSB4M', image: photo('B0H3KTSB4M'), listed: '2026-06-01', sold: 400, price: 25.94, revenue: 10376.0 },
  { name: "First day of school sign, cut-out name · KALOTOYS GROUP — listing 2 of 5", asin: 'B0H3KRWCC9', image: photo('B0H3KRWCC9'), listed: '2026-06-01', sold: 300, price: 25.94, revenue: 7782.0 },
  { name: "First day of school sign, cut-out name · KALOTOYS GROUP — listing 3 of 5", asin: 'B0H3KXYXCJ', image: photo('B0H3KXYXCJ'), listed: '2026-06-01', sold: 300, price: 23.94, revenue: 7182.0 },
  { name: "Large Montessori busy board, 17-inch · KALO KIDS + Giftora", asin: 'B0DQZKTNCB', image: photo('B0DQZKTNCB'), listed: '2024-12-20', sold: 200, price: 32.98, revenue: 6596.0 },
  { name: "“Trick or Treat Smell My Feet” Halloween sign kit · KALO KIDS", asin: 'B0H8RKY6VQ', image: photo('B0H8RKY6VQ'), sold: 300, price: 17.98, revenue: 5394.0 },
  { name: "Personalised nursery name sign · Giftora — listing 1 of 5", asin: 'B0FFH4STGV', image: photo('B0FFH4STGV'), sold: 600, price: 6.98, revenue: 4188.0 },
  { name: "Large Montessori busy board, 17-inch · KALO KIDS", asin: 'B0DQZK97MM', image: photo('B0DQZK97MM'), listed: '2024-12-20', sold: 100, price: 32.98, revenue: 3298.0 },
  { name: "Personalised mini licence plate · KALOTOYS GROUP", asin: 'B0H6M6D7T9', image: photo('B0H6M6D7T9'), listed: '2026-02-20', sold: 200, price: 15.97, revenue: 3194.0 },
  { name: "Personalised name puzzle, animals and vehicles · KALO KIDS", asin: 'B0GMQZ6FBW', image: photo('B0GMQZ6FBW'), listed: '2026-02-10', sold: 100, price: 31.9, revenue: 3190.0 },
  { name: "Montessori busy board · KALO KIDS", asin: 'B0FNXDM21W', image: photo('B0FNXDM21W'), listed: '2025-08-27', sold: 100, price: 28.98, revenue: 2898.0 },
  { name: "Personalised nursery name sign · Giftora — listing 2 of 5", asin: 'B0F79BB2YB', image: photo('B0F79BB2YB'), sold: 400, price: 6.86, revenue: 2744.0 },
  { name: "First day of school sign, cut-out name · KALOTOYS GROUP — listing 4 of 5", asin: 'B0H3KZPW8Y', image: photo('B0H3KZPW8Y'), listed: '2026-06-01', sold: 100, price: 25.94, revenue: 2594.0 },
  { name: "Personalised large busy board · Giftora", asin: 'B0DNVSDMM4', image: photo('B0DNVSDMM4'), listed: '2024-11-23', sold: 50, price: 39.83, revenue: 1991.5 },
  { name: "“My Little Boo” Halloween footprint sign kit · KALO KIDS", asin: 'B0H8RZ8QF7', image: photo('B0H8RZ8QF7'), sold: 100, price: 17.98, revenue: 1798.0 },
  { name: "Personalised name puzzle with shapes and numbers · KALO KIDS", asin: 'B0GN7TK1HH', image: photo('B0GN7TK1HH'), listed: '2026-02-13', sold: 50, price: 31.9, revenue: 1595.0 },
  { name: "Montessori busy board · KALO KIDS + Giftora", asin: 'B0FNXCMXWG', image: photo('B0FNXCMXWG'), listed: '2025-08-27', sold: 50, price: 28.98, revenue: 1449.0 },
  { name: "Personalised nursery name sign · Giftora — listing 3 of 5", asin: 'B0F7HPYL96', image: photo('B0F7HPYL96'), sold: 200, price: 6.98, revenue: 1396.0 },
  { name: "Personalised yarn name banner · KALOTOYS GROUP", asin: 'B0H6HB2TVN', image: photo('B0H6HB2TVN'), sold: 50, price: 26.98, revenue: 1349.0 },
  { name: "First day of school sign, cut-out name · KALOTOYS GROUP — listing 5 of 5", asin: 'B0H3KW1D83', image: photo('B0H3KW1D83'), listed: '2026-06-01', sold: 50, price: 25.94, revenue: 1297.0 },
  { name: "First and last day of school board (SS100) · KALOTOYS GROUP", asin: 'B0H875DF8X', image: photo('B0H875DF8X'), listed: '2026-07-09', sold: 50, price: 25.94, revenue: 1297.0 },
  { name: "First and last day of school board (SS101) · KALOTOYS GROUP", asin: 'B0H876CR1J', image: photo('B0H876CR1J'), listed: '2026-07-09', sold: 50, price: 25.94, revenue: 1297.0 },
  { name: "First and last day of school sign · KALO KIDS", asin: 'B0HBPT72LS', image: photo('B0HBPT72LS'), listed: '2026-07-27', sold: 50, price: 24.94, revenue: 1247.0 },
  { name: "Montessori busy board, sensory · KALO KIDS", asin: 'B0H3KVJ54K', image: photo('B0H3KVJ54K'), sold: 50, price: 21.98, revenue: 1099.0 },
  { name: "Personalised nursery name sign · Giftora — listing 4 of 5", asin: 'B0F79FY9Z3', image: photo('B0F79FY9Z3'), sold: 50, price: 11.67, revenue: 583.5 },
  { name: "Personalised nursery name sign · Giftora — listing 5 of 5", asin: 'B0F7HLHQJD', image: photo('B0F7HLHQJD'), sold: 50, price: 8.98, revenue: 449.0 },
];
