/**
 * Restoration Games — own-account revenue by listing, Sep 2026, and the
 * profile's photographs.
 *
 * 🚨 GENERATED from the Keepa pull, not authored. Every row is one ASIN from
 * waithowmuch-research research/restoration-games/keepa/brand-series.json
 * (read 2026-09-15): `sold` is Amazon's "bought in past month" badge, `price`
 * the price the series used, `revenue` their product. Regenerate from that file
 * rather than editing a row.
 *
 * 🚨 OWN-ACCOUNT ROWS ONLY. Twelve brand listings carried a badge in
 * September; these eight had Restoration's own account in the buy box at month
 * end and sum to $34,633, the 2026-09 revenue row exactly (check-profile.mjs
 * asserts it). The other four — Unmatched Adventures: TMNT, Robin Hood vs
 * Bigfoot, Slings and Arrows (reseller-held) and Battle of Legends Vol 2 (no
 * holder at month end) — are the $9,386 of brand sales the series leaves out.
 * brand-series.json gives the split by holder, not by listing: the set is the
 * only one that adds to both totals and to pnl.json's September FBA fees
 * ($4,218 — Cobble & Fog's $6.13 fee, not Vol 2's $6.31).
 */

/** Photos from our bucket — never /public, never Amazon's CDN. Values are the
 *  content hashes `npm run product-image` printed on 2026-09-16. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/restoration-games/';
const PHOTOS = {
  B0C6NR9ZC4: '7bc907cb4700900d2ff9078ae5111789a8e6ee72427acdba5f6d91a404d13bc8',
  B0BZ62KRGF: '340e19f4fc276336afd10a1f3fe0ee92e9cf4888075841162f01414b27943637',
  B0F79P73F1: 'd71f852a7d219fcddc92bfd8fcb1f43ec128628e4754f7c086ae497fb588530f',
  B085NRHTYX: 'b30f6b917a2e12d74920ac924cb4c61e16a3a9e7d7a45b05029bfd3f2300e787',
  B0FPP6G4DW: '7a32f0af0588170579219697125af9eaeaeaaa955b4548cf045b662d67219f81',
  B08LVRQNYK: '33e894596b8a1971d1b3a64dae3aad76fbe59de87d969fc534d227179264bf7b',
  B0FPBYZ5RR: '7af2c3b77afd261b343123a459130e112881e0d36d67e1c017dec27adbe1ea66',
  B0GN44SLXX: '74437fbe113868d59709abce5eb52769ab5ac8d12967557a438a60482d870474',
};
/** A listing photo's bucket URL, by ASIN. */
export const restorationPhoto = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;

/* Names cut from Keepa's titles ("Restoration Games Thunder Road Vendetta
   Expansion Carnage at Devil's Run"). Two families and one outlier. */
export const RESTORATION_BREAKDOWN = [
  { name: 'Thunder Road: Vendetta · Maximum Chrome', asin: 'B0C6NR9ZC4', image: restorationPhoto('B0C6NR9ZC4'), listed: '2023-05-30', sold: 100, price: 160.0, revenue: 16000.0 },
  { name: 'Thunder Road: Vendetta', asin: 'B0BZ62KRGF', image: restorationPhoto('B0BZ62KRGF'), listed: '2023-03-21', sold: 100, price: 59.95, revenue: 5995.0 },
  { name: 'Unmatched: Battle of Legends Vol 3', asin: 'B0F79P73F1', image: restorationPhoto('B0F79P73F1'), listed: '2025-05-02', sold: 100, price: 31.46, revenue: 3146.0 },
  { name: 'Unmatched: Cobble & Fog', asin: 'B085NRHTYX', image: restorationPhoto('B085NRHTYX'), listed: '2020-03-09', sold: 50, price: 44.95, revenue: 2247.5 },
  { name: 'Dinosaur Tea Party', asin: 'B0FPP6G4DW', image: restorationPhoto('B0FPP6G4DW'), listed: '2025-09-03', sold: 100, price: 20.0, revenue: 2000.0 },
  { name: 'Unmatched: Battle of Legends Vol 1', asin: 'B08LVRQNYK', image: restorationPhoto('B08LVRQNYK'), listed: '2020-10-26', sold: 50, price: 39.99, revenue: 1999.5 },
  { name: 'Thunder Road: Vendetta · Carnage at Devil’s Run expansion', asin: 'B0FPBYZ5RR', image: restorationPhoto('B0FPBYZ5RR'), listed: '2025-09-01', sold: 50, price: 39.95, revenue: 1997.5 },
  { name: 'Thunder Road: Vendetta · Choppe Shoppe expansion', asin: 'B0GN44SLXX', image: restorationPhoto('B0GN44SLXX'), listed: '2026-05-07', sold: 50, price: 24.95, revenue: 1247.5 },
];
