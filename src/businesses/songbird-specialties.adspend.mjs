/**
 * songbird-specialties — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/songbird-specialties/adspend.json (read 2026-10-17).
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
    "low": 155,
    "central": 250,
    "high": 361
  },
  "ratePct": {
    "low": 0.47,
    "central": 0.758,
    "high": 1.094
  },
  "products": [
    {
      "id": "singing-bird-pourer",
      "label": "Singing bird wine bottle pourer",
      "price": 29.99,
      "monthlyUsd": {
        "low": 155,
        "central": 250,
        "high": 361
      },
      "ratePct": {
        "low": 0.47,
        "central": 0.758,
        "high": 1.094
      },
      "perUnit": 0.23
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["wine stopper","59,197","#108","under 1% of ads","$0.86","$1"],
  ["wine accessories","15,459","#40","None","$2.48","$0"],
  ["wine gifts","13,571","#33","under 1% of ads","$1.63","$2"],
  ["wine stoppers","13,405","#88","None","$1.58","$0"],
  ["wine gifts for women","7,878","#56","None","$1.39","$0"],
  ["fun kitchen gadgets","6,514","#91","None","$0.65","$0"],
  ["wine gift","4,840","#31","1% of ads","$1.72","$4"],
  ["wine accessories for wine lovers","4,836","#52","None","$1.78","$0"],
  ["fun wine glasses","4,585","#33","None","$1.15","$0"],
  ["wine pourer","4,561","#43","26% of ads","$1.64","$58"],
  ["bird gifts","4,222","#36","None","$1.00","$0"],
  ["wine decor","3,559","#35","None","$0.66","$0"],
  ["wine lovers gifts for women","3,286","#57","None","$1.86","$0"],
  ["bird gifts for women","3,096","—","None","$1.06","$0"],
  ["turquoise kitchen accessories","2,926","#55","None","$0.41","$0"],
  ["bird lover gifts for women","2,701","#35","None","$1.11","$0"],
  ["wine pourer spout","2,619","#16","None seen","$1.55","$0"],
  ["hennessy liquor","2,261","—","None","$0.35","$0"],
  ["bird lover gifts","2,239","#34","None seen","$0.68","$0"],
  ["wine tasting","2,138","#54","None seen","$0.67","$0"],
  ["gifts for wine lovers","2,079","#36","None","$1.72","$0"],
  ["wine stopper cute","1,860","#33","None seen","$0.88","$0"],
  ["wine lover gifts","1,859","#51","1% of ads","$1.87","under $1"],
  ["cute wine stopper","1,741","#35","None seen","$1.27","$0"],
  ["songbird","1,648","—","49% of ads","$1.02","$25"],
  ["gifts for wine lovers for women","1,554","#67","None","$1.63","$0"],
  ["wine topper","1,540","—","None","$1.02","$0"],
  ["bird sounds","1,294","—","37% of ads","$1.23","$18"],
  ["wine gifts for men","1,246","—","None","$1.67","$0"],
  ["bird gift","1,172","#39","None seen","$1.05","$0"],
  ["chirpy top wine pourer","1,165","#4","100% of ads","$1.04","$27"],
  ["funny wine gifts","1,088","#16","None seen","$1.12","$0"],
  ["bottle pourer","1,064","#93","None","$0.91","$0"],
  ["wine stuff","1,063","—","None","$1.62","$0"],
  ["bird gifts for bird lovers","997","#18","None","$0.90","$0"],
  ["wine stopper funny","972","#35","None","$0.74","$0"],
  ["wine bottle decor","962","#54","None seen","$0.79","$0"],
  ["songbird ocarina","915","—","None","$1.02","$0"],
  ["wine pourers","843","#41","34% of ads","$1.64","$14"],
  ["turquoise gifts","840","#34","None seen","$0.83","$0"],
  ["wine bottle accessories","829","#46","None seen","$0.88","$0"],
  ["songb","813","—","19% of ads","—","$0"],
  ["bird wine pourer that chirps","749","#1","None","$0.49","$0"],
  ["wine pourer and stopper","744","#29","None","$1.10","$0"],
  ["wine toppers","717","—","None","$1.02","$0"],
  ["chirping bird wine pourer","604","#1","None","$2.36","$0"],
  ["wine spout","576","#31","None","$1.58","$0"],
  ["wine bottle filler","478","—","None","$1.68","$0"],
  ["songbird bottle pourer","476","#1","100% of ads","$1.35","$19"],
  ["bird bottle opener","450","#41","None seen","$0.90","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["wine pourer","Singing bird wine bottle pourer","4,561","26% of ads","$1.64","$57.96"],
  ["whistling bird wine pourer","Singing bird wine bottle pourer","450","100% of ads","$2.36","$31.86"],
  ["chirpy top wine pourer","Singing bird wine bottle pourer","1,165","100% of ads","$1.04","$26.74"],
  ["songbird","Singing bird wine bottle pourer","1,648","49% of ads","$1.02","$24.91"],
  ["songbird bottle pourer","Singing bird wine bottle pourer","476","100% of ads","$1.35","$19.22"],
  ["bird sounds","Singing bird wine bottle pourer","1,294","37% of ads","$1.23","$17.74"],
  ["song bird bottle pourer","Singing bird wine bottle pourer","450","100% of ads","$1.07","$14.45"],
  ["wine pourers","Singing bird wine bottle pourer","843","34% of ads","$1.64","$14.25"],
  ["songbird specialties bottle pourers","Singing bird wine bottle pourer","450","72% of ads","$0.97","$9.40"],
  ["unusual gifts for wine lovers","Singing bird wine bottle pourer","450","34% of ads","$1.78","$8.16"],
  ["bird chirping wine pourer","Singing bird wine bottle pourer","450","100% of ads","$0.49","$6.62"],
  ["songbirds keep singing","Singing bird wine bottle pourer","450","46% of ads","$0.93","$5.83"],
  ["wine lover gift","Singing bird wine bottle pourer","450","18% of ads","$1.87","$4.66"],
  ["wine gift","Singing bird wine bottle pourer","4,840","1% of ads","$1.72","$3.62"],
  ["wine gifts","Singing bird wine bottle pourer","13,571","under 1% of ads","$1.63","$1.66"],
  ["wine stopper","Singing bird wine bottle pourer","59,197","under 1% of ads","$0.86","$1.22"],
  ["wine lover gifts","Singing bird wine bottle pourer","1,859","1% of ads","$1.87","$0.63"],
  ["wine lovers gifts for men","Singing bird wine bottle pourer","450","1% of ads","$1.83","$0.36"],
  ["gift for wine lover women","Singing bird wine bottle pourer","450","1% of ads","$1.63","$0.13"],
  ["wine pourer dragon spout","Singing bird wine bottle pourer","450","1% of ads","$0.64","$0.13"],
  ["songb","Singing bird wine bottle pourer","813","19% of ads","—","no bid, not priced"],
  ["gift for wine lover","Singing bird wine bottle pourer","450","under 1% of ads","$1.72","$0.00"],
  ["songbi","Singing bird wine bottle pourer","344","36% of ads","—","no bid, not priced"],
  ["+ 22 more small keywords, estimated from the 50 sampled above","Singing bird wine bottle pourer","—","Sampled","—","$0.00"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 249.55;
