/**
 * wet-noses — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/wet-noses/adspend.json (read 2026-10-13).
 * Re-run that script rather than editing a row.
 */

/** What the Margin breakdown's advertising line is made of: central and band,
 *  for the whole brand and each product (per-unit at the product's price).
 *  The profile builds the line AND the Advertising section's "Ad spend" table
 *  from this object, so they cannot disagree. */
export const AD_SPEND = {
  "month": "2026-09",
  "strategy": "Long-tail phrases",
  "monthlyUsd": {
    "low": 628,
    "central": 1047,
    "high": 1570
  },
  "ratePct": {
    "low": 3.149,
    "central": 5.25,
    "high": 7.873
  },
  "products": [
    {
      "id": "dog-treats",
      "label": "Baked dog treats",
      "price": 23.46,
      "monthlyUsd": {
        "low": 628,
        "central": 1047,
        "high": 1570
      },
      "ratePct": {
        "low": 3.149,
        "central": 5.25,
        "high": 7.873
      },
      "perUnit": 1.23
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["milk bones","130,982","—","None","$1.58","$0"],
  ["training treats","35,544","—","19% of ads","$3.24","$660"],
  ["organic dog treats","16,215","#116","under 1% of ads","$7.01","$6"],
  ["low calorie dog treats","13,967","—","None","$5.11","$0"],
  ["milk bone minis","8,495","—","None","$1.61","$0"],
  ["mother hubbard dog treats","5,627","#69","1% of ads","$4.69","$8"],
  ["cookie pal dog treats","4,371","#75","1% of ads","$3.78","$6"],
  ["crunchy dog treats","4,231","#130","1% of ads","$4.64","$8"],
  ["fog treats","4,006","—","None","$6.02","$0"],
  ["merrick dog treats","3,409","#58","None","$4.07","$0"],
  ["individually wrapped dog treats","3,367","—","None","$3.69","$0"],
  ["dog trainer","2,889","—","None","$3.96","$0"],
  ["kirkland dog biscuits","2,852","#38","None","$4.15","$0"],
  ["blue buffalo dental chews","2,613","—","None","$4.37","$0"],
  ["nubs dog treats large","2,553","—","None","$3.83","$0"],
  ["puppy snacks","2,471","—","None","$3.46","$0"],
  ["biljac dry dog food","2,272","—","None","$4.58","$0"],
  ["dog treats bocce","2,216","—","None","$2.25","$0"],
  ["dog treats bacon","2,193","—","None","$4.50","$0"],
  ["grandma lucys organic dog treats","2,117","#40","None seen","—","$0"],
  ["wet noses dog treats","1,860","#1","98% of ads","$2.43","$132"],
  ["fall dog treats","1,759","—","under 1% of ads","$3.96","under $1"],
  ["wet ones for pets","1,628","#51","None seen","—","$0"],
  ["pigs in a blanket dog treats","1,589","—","None","$4.27","$0"],
  ["old mother hubbard dog treats small","1,538","#80","under 1% of ads","$0.69","under $1"],
  ["dog treats in bulk","1,503","—","25% of ads","$4.92","$56"],
  ["blue buffalo puppy treats","1,484","—","None","$3.64","$0"],
  ["organic dog treats small dogs","1,461","#57","None","$4.76","$0"],
  ["healthy dog biscuits","1,447","#100","14% of ads","$2.41","$15"],
  ["3 dog bakery dog treats","1,408","—","None","$5.65","$0"],
  ["dog treats grain free","1,332","#30","None seen","$4.13","$0"],
  ["pumpkin food items","1,233","—","None","$1.26","$0"],
  ["dog nose","1,204","#25","None","$6.99","$0"],
  ["peanut butter dog","1,204","—","None","$1.98","$0"],
  ["fruit dog treats","1,117","#93","None","$3.22","$0"],
  ["crunchy os dog treats","1,045","#80","37% of ads","$3.41","$40"],
  ["dog treats human grade","1,038","—","under 1% of ads","$1.99","under $1"],
  ["milkbone mini","1,034","—","under 1% of ads","$4.95","under $1"],
  ["dog treat bulk","1,019","—","under 1% of ads","$4.26","under $1"],
  ["old mother hubbard dog treats large","989","#53","under 1% of ads","$2.04","under $1"],
  ["organic dog treats for medium dogs","973","#54","None seen","—","$0"],
  ["bark box treats","966","—","None","$3.56","$0"],
  ["dog nose butter","951","—","None","$5.26","$0"],
  ["banana dog treats","914","#58","None seen","$2.04","$0"],
  ["blue buffalo boo bars","884","#32","None seen","$0.52","$0"],
  ["shepherds pie","857","—","None","$0.65","$0"],
  ["honest thief","840","—","18% of ads","$4.01","$18"],
  ["dog treats big bag","833","—","19% of ads","$6.22","$30"],
  ["banana chips for dogs","771","#49","None seen","$0.99","$0"],
  ["portland dog treats","723","#56","None seen","$1.14","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["training treats","Baked dog treats","35,544","19% of ads","$3.24","$659.54"],
  ["wet noses dog treats","Baked dog treats","1,860","98% of ads","$2.43","$132.30"],
  ["dog treats in bulk","Baked dog treats","1,503","25% of ads","$4.92","$56.48"],
  ["crunchy os dog treats","Baked dog treats","1,045","37% of ads","$3.41","$39.96"],
  ["dog treats big bag","Baked dog treats","833","19% of ads","$6.22","$29.67"],
  ["honest thief","Baked dog treats","840","18% of ads","$4.01","$18.38"],
  ["peanut butter banana dog treats","Baked dog treats","450","46% of ads","$2.76","$17.30"],
  ["healthy dog biscuits","Baked dog treats","1,447","14% of ads","$2.41","$15.15"],
  ["doggy delirious dog treats","Baked dog treats","450","22% of ads","$4.91","$14.58"],
  ["bulk dog biscuits","Baked dog treats","450","25% of ads","$3.30","$10.95"],
  ["mother hubbard dog treats","Baked dog treats","5,627","1% of ads","$4.69","$8.39"],
  ["marobones dog treats","Baked dog treats","314","19% of ads","$4.37","$7.96"],
  ["dog treats large breed bulk","Baked dog treats","450","14% of ads","$4.10","$7.93"],
  ["crunchy dog treats","Baked dog treats","4,231","1% of ads","$4.64","$7.83"],
  ["organic dog treats","Baked dog treats","16,215","under 1% of ads","$7.01","$6.48"],
  ["cookie pal dog treats","Baked dog treats","4,371","1% of ads","$3.78","$6.20"],
  ["bocce's bakery crunchy biscuits for dogs","Baked dog treats","450","19% of ads","$1.79","$4.61"],
  ["healthy puppy training treats","Baked dog treats","597","2% of ads","$3.87","$1.55"],
  ["peanut butter dog treat","Baked dog treats","450","1% of ads","$3.62","$0.56"],
  ["dog treat bulk","Baked dog treats","1,019","under 1% of ads","$4.26","$0.34"],
  ["bulk dog treats for large dogs","Baked dog treats","450","under 1% of ads","$6.23","$0.16"],
  ["limited ingredient dog biscuits","Baked dog treats","450","under 1% of ads","$2.91","$0.09"],
  ["nutro blueberry dog treats","Baked dog treats","450","under 1% of ads","$4.98","$0.05"],
  ["fall dog treats","Baked dog treats","1,759","under 1% of ads","$3.96","$0.04"],
  ["old mother hubbard dog treats small","Baked dog treats","1,538","under 1% of ads","$0.69","$0.02"],
  ["dog treats human grade","Baked dog treats","1,038","under 1% of ads","$1.99","$0.02"],
  ["milkbone mini","Baked dog treats","1,034","under 1% of ads","$4.95","$0.02"],
  ["old mother hubbard dog treats large","Baked dog treats","989","under 1% of ads","$2.04","$0.02"],
  ["milkbone halloween treats","Baked dog treats","711","under 1% of ads","$3.06","$0.01"],
  ["dog training treat organic","Baked dog treats","450","under 1% of ads","$3.38","$0.01"],
  ["peanut butter dog treats for small dogs","Baked dog treats","450","under 1% of ads","$4.17","$0.01"],
  ["captain snout","Baked dog treats","273","under 1% of ads","$0.79","$0.01"],
  ["detroit dog rescue wish list","Baked dog treats","450","1% of ads","—","no bid, not priced"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 1046.62;
