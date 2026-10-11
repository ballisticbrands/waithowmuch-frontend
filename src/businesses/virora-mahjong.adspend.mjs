/**
 * virora-mahjong — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/virora-mahjong/adspend.json (read 2026-10-07).
 * Re-run that script rather than editing a row.
 */

/** What the Margin breakdown's advertising line is made of: central and band,
 *  for the whole brand and each product (per-unit at the product's price).
 *  The profile builds the line AND the Advertising section's "Ad spend" table
 *  from this object, so they cannot disagree. */
export const AD_SPEND = {
  "month": "2026-09",
  "strategy": "Brand defence",
  "monthlyUsd": {
    "low": 155,
    "central": 317,
    "high": 446
  },
  "ratePct": {
    "low": 0.091,
    "central": 0.186,
    "high": 0.261
  },
  "products": [
    {
      "id": "set",
      "label": "160-tile 4-layer set",
      "price": 229,
      "monthlyUsd": {
        "low": 112,
        "central": 229,
        "high": 323
      },
      "ratePct": {
        "low": 0.089,
        "central": 0.182,
        "high": 0.256
      },
      "perUnit": 0.42
    },
    {
      "id": "mat",
      "label": "3mm rubber mahjong mat",
      "price": 45,
      "monthlyUsd": {
        "low": 43,
        "central": 88,
        "high": 123
      },
      "ratePct": {
        "low": 0.096,
        "central": 0.197,
        "high": 0.275
      },
      "perUnit": 0.09
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["mahjong set","462,965","#31","None","$0.58","$0"],
  ["mahjong mat","354,388","#10","None","$0.87","$0"],
  ["mahjong tiles","275,197","#9","None","$0.38","$0"],
  ["mahjong","197,808","#39","None","$1.19","$0"],
  ["american mahjong set","96,395","#28","None","$0.56","$0"],
  ["mahjong tile set","85,531","#15","None","$0.70","$0"],
  ["majiang set","65,936","#46","None","$0.69","$0"],
  ["mahjong mats","44,598","#12","None","$0.96","$0"],
  ["american mahjong tiles","36,636","#11","None","$0.45","$0"],
  ["mah jongg sets","35,060","#20","None","$0.63","$0"],
  ["mahjong sets","32,842","#28","None","$0.57","$0"],
  ["mahjong mats for table","30,000","#13","None","$0.81","$0"],
  ["mahjong tiles american","27,325","#9","None","$0.39","$0"],
  ["mahjong mat with rules","26,359","#8","None","$0.73","$0"],
  ["mahjong game set","20,994","#19","None","$0.54","$0"],
  ["virora mahjong tiles","12,923","#1","90% of ads","$0.35","$187"],
  ["mahjong clearance","12,152","#35","None seen","—","$0"],
  ["american mahjong","11,423","#24","None seen","$0.52","$0"],
  ["american mahjong mat","11,171","#17","None seen","$0.95","$0"],
  ["mah jongg mat","10,662","#8","None seen","$0.63","$0"],
  ["mah jong","10,344","#51","None seen","$0.43","$0"],
  ["yellow mountain american mahjong sets","9,358","#33","None seen","—","$0"],
  ["green mahjong tiles","9,306","#15","None","$0.48","$0"],
  ["pink mahjong tiles","9,146","#9","None seen","$0.42","$0"],
  ["american mahjong tile set","9,137","#16","None seen","$0.51","$0"],
  ["fall mahjong mat","8,868","#48","14% of ads","$0.72","$41"],
  ["mahjong atelier","8,713","#23","None seen","—","$0"],
  ["sweet jojo mahjong tiles","8,024","#33","None seen","—","$0"],
  ["green mahjong mat","7,912","#39","None seen","—","$0"],
  ["pink mahjong mat","7,873","#8","None seen","—","$0"],
  ["mahjong sets for beginners","7,843","#55","None seen","—","$0"],
  ["oh my mahjong","7,419","#3","None","$0.39","$0"],
  ["mah jong mats","7,355","#17","None seen","$0.75","$0"],
  ["mahjong set for beginners complete","7,318","#34","None seen","—","$0"],
  ["mini mahjong travel set","7,304","#44","None seen","$1.54","$0"],
  ["mah jong tiles","7,117","#11","None seen","$0.89","$0"],
  ["neoprene mahjong mat","6,592","#12","None seen","—","$0"],
  ["mahjong tiles set","6,137","#9","None seen","$1.04","$0"],
  ["oh my mahjong tiles","5,980","#2","under 1% of ads","$0.42","under $1"],
  ["engraved mahjong tiles","5,844","#9","None seen","$0.40","$0"],
  ["mahjong set american","5,827","#31","None seen","$3.31","$0"],
  ["tortoise mahjong tiles","5,817","#54","None seen","—","$0"],
  ["mah jong mat","5,776","#22","None seen","$0.75","$0"],
  ["mahjong gift","5,702","#8","None seen","$0.57","$0"],
  ["majong","5,649","#18","None seen","$0.51","$0"],
  ["mahjongg sets on sale","5,556","#44","None seen","—","$0"],
  ["pearl mahjong tiles","5,518","#11","None seen","—","$0"],
  ["american mahjong sets","5,412","#20","None seen","$0.56","$0"],
  ["luxury mahjong set","5,285","#7","None seen","—","$0"],
  ["orange mahjong tiles","5,147","#60","None seen","—","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["virora mahjong tiles","160-tile 4-layer set","12,923","90% of ads","$0.35","$187.32"],
  ["fall mahjong mat","3mm rubber mahjong mat","8,868","14% of ads","$0.72","$40.80"],
  ["orange mahjong mat","3mm rubber mahjong mat","4,199","26% of ads","$0.54","$26.92"],
  ["virora","160-tile 4-layer set","1,478","100% of ads","$0.35","$23.90"],
  ["non-slip rubber mahjong mats","3mm rubber mahjong mat","450","39% of ads","$0.79","$6.33"],
  ["american mahjong tile sets 160 pieces","160-tile 4-layer set","450","35% of ads","$0.69","$5.07"],
  ["green and orange mahjong mat","3mm rubber mahjong mat","450","25% of ads","$0.70","$3.58"],
  ["acrylic mahjong tile sets","160-tile 4-layer set","958","14% of ads","$0.52","$3.34"],
  ["mahjielle mahjong mat","3mm rubber mahjong mat","450","26% of ads","$0.60","$3.19"],
  ["blossom mahjong tiles","160-tile 4-layer set","450","42% of ads","$0.35","$3.09"],
  ["red white and blue mahjong mat","3mm rubber mahjong mat","450","26% of ads","$0.56","$3.03"],
  ["premium mahjong tiles","160-tile 4-layer set","665","10% of ads","$0.76","$2.42"],
  ["virora christmas mahjong tiles","160-tile 4-layer set","677","18% of ads","$0.35","$1.95"],
  ["4 layer acrylic mahjong tiles","160-tile 4-layer set","450","15% of ads","$0.40","$1.24"],
  ["pumpkin mahjong mat","3mm rubber mahjong mat","1,773","2% of ads","$0.68","$1.06"],
  ["coral mahjong mat","3mm rubber mahjong mat","450","6% of ads","$0.53","$0.69"],
  ["luxury mahjong tiles","160-tile 4-layer set","3,077","1% of ads","$0.59","$0.67"],
  ["red white blue mahjong mat","3mm rubber mahjong mat","450","5% of ads","$0.67","$0.64"],
  ["veteb mahjong mat","3mm rubber mahjong mat","450","3% of ads","$0.68","$0.42"],
  ["mah jong mat with rules","3mm rubber mahjong mat","1,127","1% of ads","$0.84","$0.25"],
  ["american mah jongg tiles","160-tile 4-layer set","766","1% of ads","$0.59","$0.23"],
  ["pink and orange mahjong mat","3mm rubber mahjong mat","450","1% of ads","$0.61","$0.18"],
  ["rolled mahjong mat no creases","3mm rubber mahjong mat","1,694","under 1% of ads","$0.74","$0.16"],
  ["peach mahjong mat","3mm rubber mahjong mat","450","1% of ads","$0.55","$0.15"],
  ["americana mahjong mat","3mm rubber mahjong mat","450","1% of ads","$0.70","$0.11"],
  ["oh my mahjong tiles","160-tile 4-layer set","5,980","under 1% of ads","$0.42","$0.03"],
  ["viora mahjong tiles","160-tile 4-layer set","3,918","under 1% of ads","$0.41","$0.03"],
  ["acrylic mahjong tiles","160-tile 4-layer set","2,986","under 1% of ads","$0.38","$0.03"],
  ["atelier mahjong tiles","160-tile 4-layer set","2,445","under 1% of ads","$0.52","$0.03"],
  ["neoprene mahjong playing mat table","3mm rubber mahjong mat","450","under 1% of ads","$0.71","$0.03"],
  ["mahjong mat orange","3mm rubber mahjong mat","892","under 1% of ads","$0.48","$0.02"],
  ["mahjong tiles green","160-tile 4-layer set","2,818","under 1% of ads","$0.58","$0.01"],
  ["pretty mahjong mat","3mm rubber mahjong mat","450","under 1% of ads","$0.66","$0.01"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 316.93;
