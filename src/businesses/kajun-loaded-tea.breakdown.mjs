/**
 * Kajun Loaded Tea — revenue by listing, Sep 2026.
 *
 * 🚨 GENERATED, not authored. Every row is one ASIN from the Keepa pull in
 * waithowmuch-research research/kajun-loaded-tea/keepa/catalogue.json (read
 * 2026-09-15): `sold` is Amazon's "bought in past month" badge, `price` the buy
 * box, `revenue` their product. Regenerate from that file rather than editing a
 * row, or the table stops matching the evidence behind it.
 *
 * Names are the flavour name cut from Keepa's SEO titles ("Kajun Loaded Tea
 * Packets – Sour Swamp Pop | Blue Blast + Rainbow Candy …"). One listing
 * (B0G1TPQ7BK) carries no flavour name, so it is named by its flavours.
 *
 * 🚨 41 listings at $15.95, not the 42 the dossier's payload.json and README
 * say: catalogue.json has 41 at $15.95 (one of them the Crew Favorites
 * variety 5-pack), one 10-pack at $31.90 and one caffeine-free 6-pack at
 * $19.14. The 44th storefront ASIN (B0H96SQFD8, a 25-packet variety bundle)
 * has no price and no badge and is not a row.
 *
 * All 43 priced listings are here — there is no hit, so a top-N cut would
 * stop summing to the month — and they sum to $470,206.00, the 2026-09
 * revenue row exactly. 13 rows sit on the 1,000 badge, which is a bracket
 * floor, not a count: 47.5% of the month is capped.
 */

/** Listing photo, from our bucket — never /public, never Amazon's CDN. All
 *  43 uploaded 2026-09-15; values are the content hashes
 *  `npm run product-image` printed, keyed by ASIN so no row types a hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/';
const PHOTOS = {
  B0FTMZKZWM: 'c93add5f1496fe1d657b62a19115ec3ed78b1f92544127bf23d2968a42859d87',
  B0FVB1FRB5: 'd1ee10b083611ce21e7c68dd59f182706f2fb3d4606d81942cf2ebbb358604c5',
  B0FVB5TQ2V: '2c71711c23ef7b62abafae27a873c4f76a572acb91325c4b1b30cbd655c90182',
  B0FVB64N3C: '977586b98232ff0352f53c4ffdf6f8131678cbfb02f9ebccff2e84572f6ba207',
  B0FVBCBNYH: '5edd5b93b25cb33260e9311a81c0990d2090cdb7794764de27be95b31fa1cbd8',
  B0FWMM9GW8: '3a46ef210a5f8b686a188b4b2071382dbdb567e1c01291d13cac11a52c6fc29d',
  B0FWMR8CNZ: 'd0780d7e0f80741fd6bc7d06c389ef3f2f917da694ffd7bf3d91b272ae2196c1',
  B0FWMW62F1: 'c0f8a955e8c190ff417c744b1deb207915407718430b5158daf1faef3871d64d',
  B0FWMWK43D: '2bd4817cebce2ac214f1aa25399944356c2175af2b0e100545d90a9c6023062c',
  B0FWMZQHM5: '726c1b4dc646ebcb4ec9d9a4db35f48ae3becb91411ff18137cbda5849347698',
  B0FWN4RPH3: '4c54daebd46266d0a03116fd9ed97b35aacacc997adac2c579acb78ab3b76ce2',
  B0FWN4T5XY: '435100b2c38b945d0d4da93af542af004361253ba11d2b9b43db81cfb66dc80f',
  B0FZVRZV7W: '4f66ff5787581f3df598c861ca64d0efdba7adc7036ad740e78aee9a9f1c5e3f',
  B0FZWBCXJN: 'fb8334ddab72809240c2498815d5c9f65eed672b81c4f4336b9263301bb0b2fb',
  B0FZWT6V74: '30ed2ac7cd2f6a0e7fce6cdcc60f5129bac967167b250ba8024ad95634cfba0e',
  B0FZWWNXGM: '07b2c47c8a4f3159f57302f6c05ce6fa571232d3ee632186fc3e1ab30c7cce66',
  B0FZWZR26F: '31165360ab73543e105d1c5b9ef63e982a6ad759b1af5f23226a3982eb4df6e9',
  B0FZX4MXG3: 'a04cc26b6b6d3c0ac5a26998ce8aab64211c6a46f5921f99ea8beddeaf0ecd25',
  B0FZX97G3B: 'e23be3260210ffe7d9eac4ce431b2c8356e8a9383813a315dc053879fa71cf02',
  B0FZX9SWQZ: 'bb7fc9c381242ae53c938dde0241522bfb3250ab695e5d8e9cdf30cd3100cd71',
  B0FZXMD8Q9: '30646e916bdbad99c22c6c2a7501fff09a77587711214ab8f417537040d1630e',
  B0FZXQ69N6: '3ddcfdbbf67507de9cc6332a8ed395632b327d1f92b97c2eba0206ff44cd7a6c',
  B0FZXS33W5: '5e91fb55c2f0d66bf4388a24eef5c1437ce41a7370e8fcfa615c84ce1a564e1f',
  B0FZXWNKDL: 'b4e4edcfe22a78bcd4c164093e370d0caf8f9d4f40b1d2a1b8d4f61ebbbe3c69',
  B0FZXY3J51: '65bf0bf0029a212b64d7c1f4ef391f8adc66fb564e08e2778a743d9269b80c2c',
  B0FZXY6MGY: '8269b2da5e33c4c0c14c0981fc9a2a85b8fa9e45b4ea74f59a03fdd715daa8dc',
  B0G1T8WN3F: 'b382beae5aac4494af58b0f2e975d151d23af0b809ada6572d0c66a00650b944',
  B0G1TJ8L3X: '8b2c40580b7d934382235e117865262095db0322f16b8db3fc57aa7617d83a4d',
  B0G1TNH2SB: 'b05cf96c8de6ec288628b8868482e499a08e0716e624f5db89231437b2221155',
  B0G1TNQBNH: '6255434cbe446dcdc594c802826effee3ef1374ef139f4fce82d73e006f6ba32',
  B0G1TPQ7BK: '74a07d747d37350ba6e6763c7df252a409d36e88f7073987b7738a6182bcc6a3',
  B0G1TRFMGN: '48939212236c6ed68000e3e6822c92071c980d79e0a4598d939a85b191120a33',
  B0G1TRT3XY: '60b1092e0a95780693c6e5b39497f62408fc328490a6eb454a85d4c18520dbff',
  B0G1TS6HCZ: '95e8d3b0b5dbd3d07d5c8bf609c115d7452ce249e12ab4e0d0630b319b319d85',
  B0G1TTBV3S: '26acd4b1f85094b281bafd01adc20efebdc074f27a013d3fe2256c996d393a93',
  B0G1TWMZGC: '25b9626067a8e28689777af976c2499bf2e7c6021a80905bdf9a0e4f170d750b',
  B0G1ZZJKGW: '4d22cca47af703cf912b0d007dfcb8808c701369179718c109da6da587b669c0',
  B0G21B3PYB: 'ff0ee023c577ecde7a27f8c0c96157a29304c6b9f8becf836b76c1b615b1ac2c',
  B0G21NQRRL: 'fdb00aa7efe77c9c5ae8dd3c883dbdab43bcbaf3057c131e62ba189fca31f6a0',
  B0G21W95SH: '5121f06491020d20aa81f71ddd95d1a136295500c58a7a8f6ca330a1904a7924',
  B0HBGJNJKW: '4ad7063ead5f650771bfd33e355a8f8fd6026a55c626e2a256d49809b5486652',
  B0HBGY78P6: '358a9367e37488e32c0f96083281b194a9d0fdcb2b1be5b6e7884b6c355856b5',
  B0HCX5LWPK: '7d628c92110b7ce82b96cf6bcd4fd5edbcd87a4bb7ae102e2f0d5efc0a35f276',
};
const photo = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;

export const KAJUN_BREAKDOWN = [
  { name: "Variety 10-pack — Louisiana Legends", asin: 'B0HBGY78P6', image: photo('B0HBGY78P6'), listed: '2026-07-24', sold: 1000, price: 31.9, revenue: 31900.0 },
  { name: "Crawdaddy Candy · box of 5", asin: 'B0FVBCBNYH', image: photo('B0FVBCBNYH'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Creole Crush · box of 5", asin: 'B0FVB1FRB5', image: photo('B0FVB1FRB5'), listed: '2025-10-08', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Delta Dream · box of 5", asin: 'B0FWMR8CNZ', image: photo('B0FWMR8CNZ'), listed: '2025-10-16', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Fat Tuesday · box of 5", asin: 'B0G21B3PYB', image: photo('B0G21B3PYB'), listed: '2025-11-12', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Fleur-de-Tea · box of 5", asin: 'B0FZWT6V74', image: photo('B0FZWT6V74'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Go-Geaux Juice · box of 5", asin: 'B0G1TNH2SB', image: photo('B0G1TNH2SB'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Green Gator · box of 5", asin: 'B0FZX4MXG3', image: photo('B0FZX4MXG3'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Hurricane Party · box of 5", asin: 'B0FZVRZV7W', image: photo('B0FZVRZV7W'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Kajun Cotton Candy · box of 5", asin: 'B0FVB5TQ2V', image: photo('B0FVB5TQ2V'), listed: '2025-10-16', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Sour Swamp Pop · box of 5", asin: 'B0FZXWNKDL', image: photo('B0FZXWNKDL'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Variety 5-pack — Crew Favorites", asin: 'B0HBGJNJKW', image: photo('B0HBGJNJKW'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Watermelon Jubilee · box of 5", asin: 'B0FZXY3J51', image: photo('B0FZXY3J51'), listed: '2025-10-02', sold: 1000, price: 15.95, revenue: 15950.0 },
  { name: "Beaucoup Berry · box of 5", asin: 'B0FVB64N3C', image: photo('B0FVB64N3C'), listed: '2025-10-16', sold: 900, price: 15.95, revenue: 14355.0 },
  { name: "Sweet Parish Peach · box of 5", asin: 'B0G21NQRRL', image: photo('B0G21NQRRL'), listed: '2025-11-12', sold: 900, price: 15.95, revenue: 14355.0 },
  { name: "Honey Island Hopper · box of 5", asin: 'B0FZX9SWQZ', image: photo('B0FZX9SWQZ'), listed: '2025-10-02', sold: 800, price: 15.95, revenue: 12760.0 },
  { name: "Parish Punch · box of 5", asin: 'B0FZXQ69N6', image: photo('B0FZXQ69N6'), listed: '2025-10-02', sold: 800, price: 15.95, revenue: 12760.0 },
  { name: "Magnolia Mixer · box of 5", asin: 'B0G1ZZJKGW', image: photo('B0G1ZZJKGW'), listed: '2025-10-02', sold: 700, price: 15.95, revenue: 11165.0 },
  { name: "Parade Punch · box of 5", asin: 'B0FZX97G3B', image: photo('B0FZX97G3B'), listed: '2025-10-02', sold: 700, price: 15.95, revenue: 11165.0 },
  { name: "Pontchartrain Punch · box of 5", asin: 'B0FWMZQHM5', image: photo('B0FWMZQHM5'), listed: '2025-10-16', sold: 700, price: 15.95, revenue: 11165.0 },
  { name: "Rougarou Rush · box of 5", asin: 'B0G1TJ8L3X', image: photo('B0G1TJ8L3X'), listed: '2025-10-02', sold: 700, price: 15.95, revenue: 11165.0 },
  { name: "King Crawfish · box of 5", asin: 'B0G1TWMZGC', image: photo('B0G1TWMZGC'), listed: '2025-10-02', sold: 600, price: 15.95, revenue: 9570.0 },
  { name: "Nola Nights · box of 5", asin: 'B0FZWBCXJN', image: photo('B0FZWBCXJN'), listed: '2025-10-02', sold: 600, price: 15.95, revenue: 9570.0 },
  { name: "Atchafalaya Apple · box of 5", asin: 'B0G1TRT3XY', image: photo('B0G1TRT3XY'), listed: '2025-10-02', sold: 500, price: 15.95, revenue: 7975.0 },
  { name: "Banana Foster · box of 5", asin: 'B0FWN4RPH3', image: photo('B0FWN4RPH3'), listed: '2025-10-16', sold: 500, price: 15.95, revenue: 7975.0 },
  { name: "Fais do-do · box of 5", asin: 'B0G1TTBV3S', image: photo('B0G1TTBV3S'), listed: '2025-10-02', sold: 500, price: 15.95, revenue: 7975.0 },
  { name: "Louisiana Sunrise · box of 5", asin: 'B0FZXMD8Q9', image: photo('B0FZXMD8Q9'), listed: '2025-10-02', sold: 500, price: 15.95, revenue: 7975.0 },
  { name: "Caffeine-free UNLoaded variety 6-pack", asin: 'B0HCX5LWPK', image: photo('B0HCX5LWPK'), listed: '2026-08-04', sold: 400, price: 19.14, revenue: 7656.0 },
  { name: "Bananas on Bourbon St · box of 5", asin: 'B0G1TRFMGN', image: photo('B0G1TRFMGN'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Blue Bayou · box of 5", asin: 'B0FTMZKZWM', image: photo('B0FTMZKZWM'), listed: '2025-11-05', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Cher Bae-Bae · box of 5", asin: 'B0G1TS6HCZ', image: photo('B0G1TS6HCZ'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "French Quarter Quencher · box of 5", asin: 'B0FZWZR26F', image: photo('B0FZWZR26F'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Gumbo Yaya · box of 5", asin: 'B0G1T8WN3F', image: photo('B0G1T8WN3F'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Jazz Berry Jam · box of 5", asin: 'B0FWMW62F1', image: photo('B0FWMW62F1'), listed: '2025-10-16', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Lagniappe Lemonade · box of 5", asin: 'B0FWMWK43D', image: photo('B0FWMWK43D'), listed: '2025-10-16', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "River Boat Berry · box of 5", asin: 'B0FWMM9GW8', image: photo('B0FWMM9GW8'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Tropical Storm · box of 5", asin: 'B0FZXS33W5', image: photo('B0FZXS33W5'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Voodoo Queen · box of 5", asin: 'B0G1TNQBNH', image: photo('B0G1TNQBNH'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Watermelon, Cucumber Lime + Pineapple (no flavour name on the listing) · box of 5", asin: 'B0G1TPQ7BK', image: photo('B0G1TPQ7BK'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Zydeco Zing · box of 5", asin: 'B0FZXY6MGY', image: photo('B0FZXY6MGY'), listed: '2025-10-02', sold: 400, price: 15.95, revenue: 6380.0 },
  { name: "Satsuma Sipper · box of 5", asin: 'B0G21W95SH', image: photo('B0G21W95SH'), listed: '2025-10-02', sold: 300, price: 15.95, revenue: 4785.0 },
  { name: "Zulu Lemonade · box of 5", asin: 'B0FWN4T5XY', image: photo('B0FWN4T5XY'), listed: '2025-10-16', sold: 300, price: 15.95, revenue: 4785.0 },
  { name: "Bayou Breeze · box of 5", asin: 'B0FZWWNXGM', image: photo('B0FZWWNXGM'), listed: '2025-10-02', sold: 200, price: 15.95, revenue: 3190.0 },
];
