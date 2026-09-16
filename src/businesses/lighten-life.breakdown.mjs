/**
 * LIGHTEN LIFE — revenue by listing, Sep 2026.
 *
 * 🚨 GENERATED, not authored. Every row is one badged ASIN from the 2026-09
 * (live) row of waithowmuch-research research/lighten-life/keepa/brand-series.json
 * (`perAsin`, read 2026-09-15): `sold` is Amazon's "bought in past month" badge,
 * `price` the buy box at the read, `revenue` their product. `listed` is Keepa's
 * listedSince from keepa/catalogue.json. Regenerate from those files rather than
 * editing a row. Names are ours, shortened from the listing titles.
 *
 * The 21 rows sum to $50,975.00, the 2026-09 revenue row exactly, which
 * check-profile.mjs asserts. All 21 sit in EVERHOME CRAFT INC's storefront;
 * the other 101 brand listings carry no badge today and count as zero.
 *
 * 🚨 One row, the top one, had its buy box held by Mili World at the moment of
 * the read (EVERHOME's 90-day share on it is 97.2%). The row says so. Counting
 * both accounts as one brand is the profile's inference, not an established
 * fact — see the Brand owner section.
 */

/** Listing photo, from our bucket — never /public, never Amazon's CDN. All 21
 *  uploaded 2026-09-16 with `npm run product-image`; values are the content
 *  hashes it printed, keyed by ASIN so no row types a hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/lighten-life/';
const PHOTOS = {
  B07YJN8DHX: 'dbe6645ec24c24374a8c3a22653bb7703b3facd025f8f0758ec296e19c8d319d',
  B08CXWGFQM: 'beb41b1d0bed55dc5a84753291a0496554af7d26faf1c0b1bb8dbf29a2a1b8c7',
  B093L6BHMR: '3b3ad924376b461bd325826372829c9dde9a033417d2ea0bee7c30c53a67bf45',
  B094965T6C: 'a194dfd8cd9d67a4c76f7342df010b0335bc8bfcee3d1edc1fa263b0100d8e83',
  B09XHSVV7T: 'ef3854c70d093fc3974adbccc22c6d83f99967b17e0b8e2abf2a5a65e5d0e0da',
  B09XHT3P8N: 'e180f7e42a95dc66c6a8200a8cfe2e490d2a05550b9d99f0618c82198e34e136',
  B0BF9VBCRM: 'e8755ba87d9b3545cf4e9250455de48beac0ff347434d185dc9efc8aab0b080a',
  B0C7GWL9PG: 'b61ba1a6ede257a6c24e84c25c23e5ad47bbf783c568dfb03d78ac94e23ac259',
  B0CPPWVPGS: '15de79e9bfa623f55ae486f9207aaa95e11c7017915611ccbc2b445e5e52ba5d',
  B0CPPX5LB2: 'b38eae301b20e6968964a2419f5015393a4a13ae2855228e2a49010cc7b3eafb',
  B0CPPX93Q5: 'd67585b5e475b71a7f36e0a8a026afd0ff569ab250b3675f9c983127044b87e3',
  B0CPPXBZQG: '919db70629370641defce889631e341cf51dd2010902f3a2414fd1bd77bfdb6a',
  B0CPPXTFYL: '2a76d79ab58f6e80e120cdb22153a4ac840754b69e6796f7adc6dbd136eeacc8',
  B0CPPXTM5D: '17a20ab2e9bb4c08c6505882fcd4a7c8017119c28e460a1663e58a98cabc35ad',
  B0CPQ4HBRY: '5f441342e7d539c88f0cc59659570159ad229b8a66f76d80a939392ff9c42fa0',
  B0CPWFKYVQ: '0d4015e56e19681c78429d8b9dfe1262bfd7209282a095d6a410af35e479b186',
  B0CPWG3DXF: '3532296eccd9bd6fe41a7e81cc1d449c609da5b79f18873e8f9c484205208990',
  B0CPWGWY18: '4ce0ef07f06553e7d60f0e29de064d80109324321cad0e8d481eef5f3a208eb5',
  B0CPWGZK21: 'af09526e8cda2c2e605afcd92d313ef6179c6a049364ea660c9876d01f0213db',
  B0FT31WFW4: 'dda4a55b99607906e2b1572d36572a416831077a218d17f6f57356eb08e6b053',
  B0GVWTCD8S: '64b676cdf95f946dd667b2f800e20bbf2702527833482b5610ee4b9170964ce5',
};
export const lightenLifePhoto = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;
const photo = lightenLifePhoto;

export const LIGHTEN_LIFE_BREAKDOWN = [
  { name: "Cocktail mixing glass set, 20oz glass and four bar tools · buy box held by Mili World at the read", asin: 'B08CXWGFQM', image: photo('B08CXWGFQM'), listed: '2020-07-14', sold: 300, price: 28.99, revenue: 8697.0 },
  { name: "“Daddy’s Sippy Cup” whiskey glass in wooden box", asin: 'B09XHSVV7T', image: photo('B09XHSVV7T'), listed: '2022-04-08', sold: 400, price: 17.99, revenue: 7196.0 },
  { name: "80th birthday “1946” whiskey glass in wooden box", asin: 'B0CPWGZK21', image: photo('B0CPWGZK21'), listed: '2023-12-10', sold: 300, price: 16.99, revenue: 5097.0 },
  { name: "“Grandpa Juice” whiskey glass in wooden box", asin: 'B0BF9VBCRM', image: photo('B0BF9VBCRM'), listed: '2022-09-14', sold: 200, price: 16.99, revenue: 3398.0 },
  { name: "29oz crystal whiskey decanter with stopper", asin: 'B093L6BHMR', image: photo('B093L6BHMR'), listed: '2021-04-27', sold: 100, price: 28.99, revenue: 2899.0 },
  { name: "Whiskey decanter with four glasses, gift box", asin: 'B07YJN8DHX', image: photo('B07YJN8DHX'), listed: '2019-12-06', sold: 50, price: 39.99, revenue: 1999.5 },
  { name: "40th birthday “1986” beer glass in barrel box", asin: 'B0CPPWVPGS', image: photo('B0CPPWVPGS'), listed: '2023-12-07', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: "50th birthday “1976” beer glass in barrel box", asin: 'B0CPPX5LB2', image: photo('B0CPPX5LB2'), listed: '2023-12-07', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: "60th birthday “1966” beer glass in barrel box", asin: 'B0CPPXBZQG', image: photo('B0CPPXBZQG'), listed: '2023-12-07', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: "70th birthday “1956” beer glass in barrel box", asin: 'B0CPPXTFYL', image: photo('B0CPPXTFYL'), listed: '2023-12-07', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: "21st birthday “2005” beer glass in barrel box", asin: 'B0FT31WFW4', image: photo('B0FT31WFW4'), listed: '2025-09-29', sold: 100, price: 19.99, revenue: 1999.0 },
  { name: "Coworker leaving-gift whiskey glass in wooden box", asin: 'B09XHT3P8N', image: photo('B09XHT3P8N'), listed: '2022-04-08', sold: 100, price: 16.99, revenue: 1699.0 },
  { name: "60th birthday “1966” whiskey glass in wooden box", asin: 'B0CPWFKYVQ', image: photo('B0CPWFKYVQ'), listed: '2023-12-10', sold: 100, price: 16.99, revenue: 1699.0 },
  { name: "21st birthday “2005” shot glasses in wooden box", asin: 'B0GVWTCD8S', image: photo('B0GVWTCD8S'), listed: '2026-04-03', sold: 100, price: 15.99, revenue: 1599.0 },
  { name: "50th birthday “1976” whiskey glass pair in barrel box", asin: 'B0CPQ4HBRY', image: photo('B0CPQ4HBRY'), listed: '2023-12-08', sold: 50, price: 25.99, revenue: 1299.5 },
  { name: "80th birthday “1946” beer glass in barrel box", asin: 'B0CPPX93Q5', image: photo('B0CPPX93Q5'), listed: '2023-12-07', sold: 50, price: 19.99, revenue: 999.5 },
  { name: "30th birthday “1996” beer glass in barrel box", asin: 'B0CPPXTM5D', image: photo('B0CPPXTM5D'), listed: '2023-12-07', sold: 50, price: 19.99, revenue: 999.5 },
  { name: "“Old Lives Matter” whiskey glass in wooden box", asin: 'B094965T6C', image: photo('B094965T6C'), listed: '2021-05-06', sold: 50, price: 16.99, revenue: 849.5 },
  { name: "50th birthday “1976” whiskey glass in wooden box", asin: 'B0C7GWL9PG', image: photo('B0C7GWL9PG'), listed: '2023-06-08', sold: 50, price: 16.99, revenue: 849.5 },
  { name: "“The Legend Has Retired” 2026 whiskey glass in wooden box", asin: 'B0CPWG3DXF', image: photo('B0CPWG3DXF'), listed: '2023-12-10', sold: 50, price: 16.99, revenue: 849.5 },
  { name: "70th birthday “1956” whiskey glass in wooden box", asin: 'B0CPWGWY18', image: photo('B0CPWGWY18'), listed: '2023-12-10', sold: 50, price: 16.99, revenue: 849.5 },
];
