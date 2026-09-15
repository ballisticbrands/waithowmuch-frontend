/**
 * Virora Mahjong — revenue by listing, Sep 2026, and the profile's photos.
 *
 * 🚨 From the evidence, not authored. Every row is one ASIN carrying a sold
 * badge in the 2026-09 month of waithowmuch-research
 * research/virora-mahjong/keepa/brand-series.json (read 2026-09-15): `sold` is
 * Amazon's "bought in past month" badge, `price` the price that file used,
 * `revenue` their product. The eight rows sum to $170,650, the 2026-09 revenue
 * row exactly. Regenerate from that file rather than editing a row.
 *
 * Brand-wide, like the series: two rows are listings another seller account
 * (Xuzhou Yuesu) leads in the buy box, and their names say so. The other 45
 * brand ASINs carry no badge this month and count as zero.
 *
 * Its own module so the profile entry in index.mjs stays prose, and so the
 * photo hashes are typed once.
 */

/** Listing photos in our bucket — never /public, never Amazon's CDN. The values
 *  are the content hashes `npm run product-image` printed on 2026-09-15, keyed
 *  by ASIN so no row types a hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/virora-mahjong/';
const HASHES = {
  B0H793VVWP: '1824fb6ab4bdae0f4f2a5f711e5a76d63cff69ccae7144ca8d17e313f0d0ddb3',
  B0H798Q5HK: '951d2ecb1f12d8073cb9fe579e2000cafe601f0975c2538e472da7be2bb22477',
  B0H79BWVR1: '0eadcb7be18fcac570344b3a62fbd52ef2f91cdcb448ce31c0da694149c31e56',
  B0H7BNHVM1: '505e72253ad1abf17aa10d8488b246d8f42bfcc0fd92a5fcd9a7068c5d543396',
  B0H79FMGR3: 'd75fb818802bc23611a77e1cafd6f9b58bb44939565b9c91db1626309359fd96',
  B0GTYKSTZ6: 'e3bd6fea8e279196fffe81bacef40b7d228636380fb8475cf38554f072629b19',
  B0H1GNJ6TL: '18fa410ea0f087447704b6fb601665e5f938498dcce93144e9cbb48ea4a8cca4',
  B0H2YSFGYR: '44271541822118934d91691807a92b1eba05595d68a4c1d9420d51a5f46a515d',
  /* Two of the best seller's secondary listing images, for the overview. */
  'rack-and-mat': '454265ab1d04774f3232e56f2edf56acbbb9650aea84b837aacdbe9ee3d38445',
  'hand-painting': 'f3533efab3c8128376b2a7ba051d7f791bd4028a2623f816c402aa65374ed88b',
};

/** @param {keyof typeof HASHES} key */
export const viroraPhoto = (key) => `${BUCKET}${HASHES[key]}.jpg`;

/** Largest first. Three sets and five mats; sets are $125,950 of the month. */
export const VIRORA_BREAKDOWN = [
  { name: 'Rose Pink 160-tile 4-layer set', asin: 'B0H793VVWP', image: viroraPhoto('B0H793VVWP'), listed: '2026-07-30', sold: 400, price: 229, revenue: 91600 },
  { name: 'Pink and green 3mm rubber mat', asin: 'B0H798Q5HK', image: viroraPhoto('B0H798Q5HK'), listed: '2025-11-30', sold: 600, price: 45, revenue: 27000 },
  { name: 'Orange 3mm rubber mat', asin: 'B0H79BWVR1', image: viroraPhoto('B0H79BWVR1'), listed: '2025-12-01', sold: 300, price: 45, revenue: 13500 },
  { name: 'Green 160-tile 4-layer set', asin: 'B0H7BNHVM1', image: viroraPhoto('B0H7BNHVM1'), listed: '2026-07-02', sold: 50, price: 229, revenue: 11450 },
  /* Unpriced today; brand-series.json falls back to the $229 set price. */
  { name: 'Purple 160-tile 4-layer set', asin: 'B0GTYKSTZ6', image: viroraPhoto('B0GTYKSTZ6'), listed: '2025-11-30', sold: 50, price: 229, revenue: 11450 },
  { name: 'Rose Pink 160-tile set — a listing Xuzhou Yuesu leads', asin: 'B0H2YSFGYR', image: viroraPhoto('B0H2YSFGYR'), listed: '2026-05-26', sold: 50, price: 229, revenue: 11450 },
  { name: 'Pink 3mm rubber mat', asin: 'B0H79FMGR3', image: viroraPhoto('B0H79FMGR3'), listed: '2025-12-01', sold: 50, price: 45, revenue: 2250 },
  { name: 'Blue rubber mat — a listing Xuzhou Yuesu holds', asin: 'B0H1GNJ6TL', image: viroraPhoto('B0H1GNJ6TL'), listed: '2026-06-22', sold: 50, price: 39, revenue: 1950 },
];
