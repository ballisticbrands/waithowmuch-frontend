/**
 * draft-top — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/draft-top/adspend.json (read 2026-10-15).
 * Re-run that script rather than editing a row.
 */

/** What the Margin breakdown's advertising line is made of: central and band,
 *  for the whole brand and each product (per-unit at the product's price).
 *  The profile builds the line AND the Advertising section's "Ad spend" table
 *  from this object, so they cannot disagree. */
export const AD_SPEND = {
  "month": "2026-09",
  "strategy": "Brand defence plus a few generic searches",
  "monthlyUsd": {
    "low": 3178,
    "central": 5080,
    "high": 7432
  },
  "ratePct": {
    "low": 3.045,
    "central": 4.868,
    "high": 7.121
  },
  "products": [
    {
      "id": "lift",
      "label": "Draft Top Lift can opener",
      "price": 25.99,
      "monthlyUsd": {
        "low": 3178,
        "central": 5080,
        "high": 7432
      },
      "ratePct": {
        "low": 3.045,
        "central": 4.868,
        "high": 7.121
      },
      "perUnit": 1.27
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["soda can opener","27,646","#12","None","$1.74","$0"],
  ["mexico","23,455","#60","None","$0.45","$0"],
  ["shark tank","19,290","#25","None","$0.35","$0"],
  ["can opener smooth edge","16,347","#27","None","$1.32","$0"],
  ["beer can opener","14,626","#1","None","$1.09","$0"],
  ["draft top beer can opener","12,071","#1","36% of ads","$11.31","$1,488"],
  ["smooth edge can opener","11,758","#24","None","$1.48","$0"],
  ["beer bottle opener","11,532","#45","None","$1.65","$0"],
  ["draft top","11,443","#1","36% of ads","$11.85","$1,479"],
  ["destapadores de cerveza","10,765","#22","None","$1.69","$0"],
  ["beer opener","9,632","#26","None","$1.69","$0"],
  ["pop can opener","5,417","#33","None","$1.73","$0"],
  ["cap gun bottle opener","4,140","#36","None","$1.64","$0"],
  ["beer can opener smooth edge","4,052","#1","36% of ads","$2.28","$101"],
  ["destapador de cerveza","3,764","#8","None","$1.68","$0"],
  ["soda can opener for long nails","2,978","#60","None seen","—","$0"],
  ["beer accessories","2,847","#29","None seen","$0.66","$0"],
  ["beer can top remover","2,809","#1","None seen","$2.18","$0"],
  ["destapador de latas","2,777","#33","None seen","$1.23","$0"],
  ["can topper","2,769","#6","None seen","$0.56","$0"],
  ["can top remover","2,704","#1","None seen","$1.75","$0"],
  ["pop top can opener","2,616","#25","None seen","$0.57","$0"],
  ["draft","2,322","#22","None seen","—","$0"],
  ["draft top lift","2,313","#1","100% of ads","$9.48","$658"],
  ["can opener for nails","1,905","#41","None seen","—","$0"],
  ["can cutter","1,726","#2","None seen","$0.74","$0"],
  ["soda opener","1,682","#32","None seen","$1.93","$0"],
  ["draft top can opener","1,615","#1","97% of ads","$12.58","$377"],
  ["soda can opener keychain","1,597","#42","None seen","—","$0"],
  ["draft top lift can opener","1,527","#1","97% of ads","$9.42","$419"],
  ["can tops","1,522","#58","None seen","$0.79","$0"],
  ["can cutter top remover","1,484","#1","None seen","$2.06","$0"],
  ["pop can opener tool","1,356","#10","None seen","—","$0"],
  ["mini can opener","1,221","#57","None seen","$1.32","$0"],
  ["aluminum can opener","1,198","#1","None seen","$1.44","$0"],
  ["can lid opener","1,189","#3","None seen","$1.78","$0"],
  ["coke can opener","1,173","#11","None seen","$1.13","$0"],
  ["beer accessories for men","1,168","#27","None seen","$0.80","$0"],
  ["topless can opener","1,166","#1","None seen","$1.04","$0"],
  ["shotgun beer tool","1,153","#34","None seen","$0.63","$0"],
  ["pop top can opener tool","1,136","#8","None seen","—","$0"],
  ["top cut can opener","1,127","#31","None seen","$1.48","$0"],
  ["bella can opener","1,103","#59","None seen","$1.55","$0"],
  ["drink can opener","1,082","#3","None seen","$1.53","$0"],
  ["can top opener","1,014","#1","None seen","$1.96","$0"],
  ["can top cutter","953","#1","None seen","—","$0"],
  ["soda can openers","950","#16","None seen","—","$0"],
  ["can opener for soda","925","#9","None seen","—","$0"],
  ["destapador de latas de cerveza","909","#1","None seen","—","$0"],
  ["abridor de cerveza","889","#45","None seen","$1.09","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["draft top beer can opener","Draft Top Lift can opener","12,071","36% of ads","$11.31","$1488.37"],
  ["draft top","Draft Top Lift can opener","11,443","36% of ads","$11.85","$1478.71"],
  ["draft top lift","Draft Top Lift can opener","2,313","100% of ads","$9.48","$657.82"],
  ["draft top lift can opener","Draft Top Lift can opener","1,527","97% of ads","$9.42","$418.54"],
  ["draft top can opener","Draft Top Lift can opener","1,615","97% of ads","$12.58","$377.40"],
  ["draft top lid","Draft Top Lift can opener","450","100% of ads","$10.81","$145.92"],
  ["draft top pro can opener","Draft Top Lift can opener","450","97% of ads","$9.94","$130.29"],
  ["beer can opener smooth edge","Draft Top Lift can opener","4,052","36% of ads","$2.28","$100.50"],
  ["draft top lid opener","Draft Top Lift can opener","450","36% of ads","$9.80","$47.65"],
  ["draft top seamless can opener","Draft Top Lift can opener","450","36% of ads","$9.42","$46.00"],
  ["drafting top can opener","Draft Top Lift can opener","450","36% of ads","$9.46","$45.55"],
  ["draft top topless beverage can opener","Draft Top Lift can opener","450","36% of ads","$9.10","$44.46"],
  ["drafttop beer can opener","Draft Top Lift can opener","647","100% of ads","$2.14","$41.54"],
  ["can opener beer","Draft Top Lift can opener","474","36% of ads","$2.20","$11.25"],
  ["seamless can opener beer","Draft Top Lift can opener","450","34% of ads","$2.24","$10.41"],
  ["can opener for beer","Draft Top Lift can opener","450","33% of ads","$2.20","$9.74"],
  ["beer can opener tool","Draft Top Lift can opener","450","33% of ads","$2.09","$9.25"],
  ["can beer opener","Draft Top Lift can opener","450","36% of ads","$1.72","$8.42"],
  ["draft top lift beer soda can opener","Draft Top Lift can opener","450","97% of ads","$0.63","$8.22"],
  ["beer can top opener","Draft Top Lift can opener","450","1% of ads","$2.24","$0.44"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 5080.48;
