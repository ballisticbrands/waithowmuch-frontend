/**
 * bizzikins — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/bizzikins/adspend.json (read 2026-10-11).
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
    "low": 27,
    "central": 45,
    "high": 68
  },
  "ratePct": {
    "low": 0.131,
    "central": 0.218,
    "high": 0.33
  },
  "products": [
    {
      "id": "doll",
      "label": "2-in-1 activity doll",
      "price": 37.5,
      "monthlyUsd": {
        "low": 27,
        "central": 45,
        "high": 68
      },
      "ratePct": {
        "low": 0.131,
        "central": 0.218,
        "high": 0.33
      },
      "perUnit": 0.08
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["busy book for 1+ year old","5,576","#59","None","$0.61","$0"],
  ["18 month old girl toys","3,583","—","None","$1.14","$0"],
  ["airplane toddler travel essentials","3,110","—","19% of ads","$1.01","$18"],
  ["travel toys for 1+ year old","2,338","#41","None","$0.79","$0"],
  ["soft dolls for toddlers 1-3","1,895","#30","None","$0.66","$0"],
  ["seek and find toy","1,351","#31","None","$0.63","$0"],
  ["busy bag for toddlers 1-3","1,234","—","under 1% of ads","$0.56","under $1"],
  ["on the go toddler toys","1,173","—","None","$0.60","$0"],
  ["gigglescape toys","1,117","#15","None","$0.90","$0"],
  ["toys for plane travel 1 year old","1,080","#44","None","$0.60","$0"],
  ["felt book","1,042","—","None","$0.71","$0"],
  ["airplane toys for 1+ year old","994","#54","None","$0.77","$0"],
  ["montessori busy book 1 year old","978","#141","32% of ads","$0.80","$7"],
  ["baby toys for airplane travel","836","#43","None","$0.93","$0"],
  ["airplane travel essentials toddler","830","—","None","$1.06","$0"],
  ["pretend make up for toddlers 1-3","796","—","None","$0.49","$0"],
  ["toys for plane travel 2 year old","705","#45","None seen","—","$0"],
  ["busy book for baby","622","—","1% of ads","$0.57","under $1"],
  ["activity book baby","557","—","None","$0.59","$0"],
  ["bizzikins doll","512","#1","58% of ads","$0.79","$7"],
  ["mrs rachel doll","507","#33","None seen","—","$0"],
  ["1 year old girl travel toys","450","—","None","$0.85","$0"],
  ["18 month old activities","450","—","under 1% of ads","$0.77","under $1"],
  ["18 month old travel toys","450","—","None","$0.65","$0"],
  ["18 month travel toys","450","—","5% of ads","$0.66","under $1"],
  ["airplane essentials for toddlers","450","—","None","$1.04","$0"],
  ["airplane travel essentials for toddler","450","—","None","$1.06","$0"],
  ["astronaut doll","450","#24","None seen","$0.75","$0"],
  ["baby car toys for back seat rear facing","450","#30","None seen","—","$0"],
  ["baby travel toys 12-18 months","450","—","None","$0.65","$0"],
  ["bizzikins","450","#1","56% of ads","$1.18","$9"],
  ["buddy poppy","450","#13","None seen","$0.36","$0"],
  ["busy book baby 6 to 12 months","450","#43","None seen","—","$0"],
  ["busy doll","450","#3","None seen","$0.57","$0"],
  ["busy doll for toddlers 1-3","450","#4","None seen","—","$0"],
  ["camping stuffed animals","450","#38","None seen","—","$0"],
  ["danny go toys for kids 2-4","450","#29","None seen","—","$0"],
  ["diy felt busy book supplies","450","—","None","$0.84","$0"],
  ["jelly cat book","450","#38","None","$0.51","$0"],
  ["leapfrog scout and violet 100 words book, purple","450","#41","None seen","—","$0"],
  ["leyadoll soft baby doll book","450","#39","under 1% of ads","$0.67","under $1"],
  ["maileg toys","450","#44","None seen","$0.45","$0"],
  ["miss rachel speak and sing doll","450","#16","None seen","—","$0"],
  ["montessori doll","450","#40","None seen","$0.61","$0"],
  ["poppy doll","450","#18","None seen","$0.58","$0"],
  ["space baby toys","450","#57","None seen","$1.25","$0"],
  ["taf toys busy book","450","#54","None seen","—","$0"],
  ["tiba toes busy book","450","#20","None seen","—","$0"],
  ["toddler busy toys for travel","450","#25","None seen","—","$0"],
  ["toddler dolls age 2-4","450","#53","None seen","—","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["airplane toddler travel essentials","2-in-1 activity doll","3,110","19% of ads","$1.01","$18.20"],
  ["bizzikins","2-in-1 activity doll","450","56% of ads","$1.18","$8.97"],
  ["montessori busy book 1 year old","2-in-1 activity doll","978","32% of ads","$0.80","$7.41"],
  ["bizzikins doll","2-in-1 activity doll","512","58% of ads","$0.79","$7.01"],
  ["travel toys for 3+ year old","2-in-1 activity doll","450","27% of ads","$0.80","$2.90"],
  ["18 month travel toys","2-in-1 activity doll","450","5% of ads","$0.66","$0.44"],
  ["busy book for baby","2-in-1 activity doll","622","1% of ads","$0.57","$0.09"],
  ["busy bag for toddlers 1-3","2-in-1 activity doll","1,234","under 1% of ads","$0.56","$0.03"],
  ["18 month old activities","2-in-1 activity doll","450","under 1% of ads","$0.77","$0.01"],
  ["leyadoll soft baby doll book","2-in-1 activity doll","450","under 1% of ads","$0.67","$0.01"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 45.07;
