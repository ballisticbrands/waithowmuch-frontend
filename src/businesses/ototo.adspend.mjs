/**
 * ototo — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/ototo/adspend.json (read 2026-10-12).
 * Re-run that script rather than editing a row.
 */

/** What the Margin breakdown's advertising line is made of: central and band,
 *  for the whole brand and each product (per-unit at the product's price).
 *  The profile builds the line AND the Advertising section's "Ad spend" table
 *  from this object, so they cannot disagree. */
export const AD_SPEND = {
  "month": "2026-08",
  "strategy": "Long-tail phrases",
  "monthlyUsd": {
    "low": 103,
    "central": 171,
    "high": 256
  },
  "ratePct": {
    "low": 0.397,
    "central": 0.66,
    "high": 0.987
  },
  "products": [
    {
      "id": "spatula",
      "label": "Splatypus jar spatula",
      "price": 9.95,
      "monthlyUsd": {
        "low": 52,
        "central": 86,
        "high": 129
      },
      "ratePct": {
        "low": 0.523,
        "central": 0.864,
        "high": 1.296
      },
      "perUnit": 0.09
    },
    {
      "id": "scissors",
      "label": "Elizabat kitchen scissors",
      "price": 9.99,
      "monthlyUsd": {
        "low": 14,
        "central": 24,
        "high": 36
      },
      "ratePct": {
        "low": 0.14,
        "central": 0.24,
        "high": 0.36
      },
      "perUnit": 0.02
    },
    {
      "id": "opener",
      "label": "Vino bat corkscrew and bottle opener",
      "price": 19.95,
      "monthlyUsd": {
        "low": 37,
        "central": 61,
        "high": 91
      },
      "ratePct": {
        "low": 0.618,
        "central": 1.019,
        "high": 1.52
      },
      "perUnit": 0.2
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["kitchen gadgets","198,004","#33","None","$0.35","$0"],
  ["gothic decor","85,001","#49","None","$0.35","$0"],
  ["goth","76,009","#28","None","$0.89","$0"],
  ["gadgets","59,088","#51","None","$0.42","$0"],
  ["gothic","40,917","#12","None","$0.35","$0"],
  ["gothic home decor","37,172","#31","None","$0.35","$0"],
  ["halloween kitchen","33,404","#15","under 1% of ads","$0.56","under $1"],
  ["unique gifts","31,917","#27","None","$0.35","$0"],
  ["witchy home decor","30,429","#57","None","$0.35","$0"],
  ["halloween baking","29,734","#60","None","$0.48","$0"],
  ["witchy gifts for women","22,992","#47","None","$0.35","$0"],
  ["mini spatula","22,604","#53","None","$0.35","$0"],
  ["small spatula","21,965","#57","None","$0.35","$0"],
  ["bat decor","21,570","#24","None","$0.35","$0"],
  ["witchy","18,211","#38","None","$0.35","$0"],
  ["spooky gifts","16,303","#54","None","$0.35","$0"],
  ["goth decor","15,787","#25","None seen","$0.35","$0"],
  ["horror gifts","14,974","#28","None seen","$0.65","$0"],
  ["halloween themed gifts","14,772","#34","None seen","$0.55","$0"],
  ["halloween dishes","14,309","#34","None seen","$0.35","$0"],
  ["mud pie halloween","14,195","—","None","$0.40","$0"],
  ["spurtle","13,700","#34","None seen","$1.35","$0"],
  ["ototo","13,668","#2","None seen","$0.91","$0"],
  ["halloween utensil holder","12,394","#54","None seen","$0.35","$0"],
  ["wine gifts","11,472","#45","None seen","$1.97","$0"],
  ["halloween prizes for adults","11,413","#20","None seen","$0.35","$0"],
  ["halloween office supplies","10,969","#59","None seen","$0.62","$0"],
  ["gothic accessories","10,278","#42","None seen","$0.48","$0"],
  ["gadget","9,962","#7","None seen","$0.75","$0"],
  ["cork screw wine bottle opener","9,535","#46","None seen","$2.22","$0"],
  ["cooking gadgets","9,306","#43","None seen","$0.68","$0"],
  ["whimsigoth decor","9,248","#60","None seen","—","$0"],
  ["spooky basket stuffers for men","8,796","#70","3% of ads","$1.04","$7"],
  ["cool kitchen gadgets","8,633","#12","None seen","$0.64","$0"],
  ["spooky gifts for women","8,536","#24","None seen","$0.87","$0"],
  ["bats decor","8,337","#49","None seen","$0.98","$0"],
  ["johanna parker halloween","8,242","#37","None seen","$0.35","$0"],
  ["jar spatula","8,208","#27","1% of ads","$0.35","under $1"],
  ["quirky home decor","7,831","#26","None seen","$0.59","$0"],
  ["spooky home decor","7,790","#29","None seen","$0.60","$0"],
  ["cute halloween stuff","7,741","—","14% of ads","$0.78","$25"],
  ["kitchen witch","7,712","#26","None seen","$0.63","$0"],
  ["cooking gifts","7,321","#17","None seen","$1.39","$0"],
  ["halloween cutting board","7,250","#42","None seen","$0.75","$0"],
  ["witchy stuff","6,978","#35","None seen","$0.65","$0"],
  ["halloween kitchen accessories","6,914","#1","None seen","$0.50","$0"],
  ["halloween gift ideas","6,898","#44","None seen","$0.74","$0"],
  ["halloween decor kitchen","6,612","#49","None seen","$0.35","$0"],
  ["whimsy goth","6,606","#2","None seen","—","$0"],
  ["kitchen gadget","6,557","#9","2% of ads","$0.35","$1"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["ototo halloween","Splatypus jar spatula","2,670","86% of ads","$0.41","$28.35"],
  ["cute halloween stuff","Vino bat corkscrew and bottle opener","7,741","14% of ads","$0.78","$25.05"],
  ["goth kitchen accessories","Elizabat kitchen scissors","1,819","72% of ads","$0.35","$13.82"],
  ["ototo gracula garlic crusher","Splatypus jar spatula","450","99% of ads","$0.56","$7.51"],
  ["spooky basket stuffers for men","Vino bat corkscrew and bottle opener","8,796","3% of ads","$1.04","$6.94"],
  ["spooky birthday gifts for women","Vino bat corkscrew and bottle opener","876","18% of ads","$1.41","$6.83"],
  ["peanut butter scoop","Splatypus jar spatula","450","37% of ads","$1.25","$6.17"],
  ["halloween wine stopper","Vino bat corkscrew and bottle opener","2,009","17% of ads","$0.55","$5.69"],
  ["spooky kitchen accessories","Splatypus jar spatula","798","67% of ads","$0.35","$5.61"],
  ["ototo+halloween","Splatypus jar spatula","450","100% of ads","$0.41","$5.53"],
  ["ototo cat","Splatypus jar spatula","450","100% of ads","$0.35","$4.72"],
  ["romantic goth","Vino bat corkscrew and bottle opener","1,276","28% of ads","$0.41","$4.35"],
  ["oxo gadgets","Splatypus jar spatula","450","33% of ads","$0.95","$4.20"],
  ["eto wine","Vino bat corkscrew and bottle opener","450","68% of ads","$0.46","$4.20"],
  ["paw spoon","Splatypus jar spatula","450","65% of ads","$0.35","$3.07"],
  ["spooky wine glasses","Vino bat corkscrew and bottle opener","1,632","10% of ads","$0.65","$3.06"],
  ["goth kitchen utensils","Splatypus jar spatula","450","57% of ads","$0.35","$2.70"],
  ["pizza ladle","Splatypus jar spatula","450","18% of ads","$1.02","$2.54"],
  ["corporate goth accessories","Vino bat corkscrew and bottle opener","450","33% of ads","$0.56","$2.48"],
  ["oxo kitchen gadgets","Splatypus jar spatula","450","18% of ads","$0.95","$2.36"],
  ["bat accessories","Elizabat kitchen scissors","5,459","4% of ads","$0.35","$2.31"],
  ["gothic kitchen utensils","Splatypus jar spatula","450","43% of ads","$0.35","$2.03"],
  ["peanut butter knife for jar","Splatypus jar spatula","280","26% of ads","$0.89","$1.98"],
  ["mini jar scraper spatula","Splatypus jar spatula","998","14% of ads","$0.35","$1.45"],
  ["kitchen gadget","Splatypus jar spatula","6,557","2% of ads","$0.35","$1.32"],
  ["punk rock gifts","Vino bat corkscrew and bottle opener","718","4% of ads","$1.39","$1.18"],
  ["spooky accessories","Elizabat kitchen scissors","1,357","6% of ads","$0.45","$1.04"],
  ["nordic ware skull","Elizabat kitchen scissors","419","24% of ads","$0.35","$1.04"],
  ["jar spatula","Splatypus jar spatula","8,208","1% of ads","$0.35","$0.93"],
  ["phantom of the opera gifts","Elizabat kitchen scissors","637","14% of ads","$0.35","$0.93"],
  ["oxo+gadgets","Splatypus jar spatula","450","7% of ads","$0.95","$0.93"],
  ["gothic gift","Elizabat kitchen scissors","450","18% of ads","$0.35","$0.87"],
  ["platapus","Splatypus jar spatula","424","14% of ads","$0.49","$0.86"],
  ["halloween kitchen","Splatypus jar spatula","33,404","under 1% of ads","$0.56","$0.84"],
  ["cannon beer opener","Vino bat corkscrew and bottle opener","450","10% of ads","$0.58","$0.81"],
  ["bat kitchen","Elizabat kitchen scissors","710","10% of ads","$0.35","$0.77"],
  ["pokemon kitchen accessories","Elizabat kitchen scissors","450","10% of ads","$0.54","$0.76"],
  ["nightmare before christmas kitchen","Elizabat kitchen scissors","6,396","1% of ads","$0.35","$0.73"],
  ["cute goth","Elizabat kitchen scissors","450","15% of ads","$0.35","$0.73"],
  ["prepara thumb scraper","Splatypus jar spatula","450","14% of ads","$0.35","$0.65"],
  ["nordic ware halloween","Splatypus jar spatula","450","6% of ads","$0.56","$0.47"],
  ["spatty daddy","Splatypus jar spatula","553","3% of ads","$1.08","$0.45"],
  ["cute kitchen stuff","Splatypus jar spatula","4,386","1% of ads","$0.35","$0.38"],
  ["halloween kitchen utensils","Splatypus jar spatula","3,232","1% of ads","$0.56","$0.33"],
  ["halloween bottle opener","Elizabat kitchen scissors","2,009","1% of ads","$0.35","$0.26"],
  ["silicone cookie scoop","Splatypus jar spatula","340","3% of ads","$0.81","$0.24"],
  ["spooky season gifts","Elizabat kitchen scissors","1,566","1% of ads","$0.66","$0.19"],
  ["silly scissors","Elizabat kitchen scissors","578","1% of ads","$1.57","$0.17"],
  ["nutella spoon","Splatypus jar spatula","450","4% of ads","$0.35","$0.17"],
  ["playing card bottle opener","Vino bat corkscrew and bottle opener","450","1% of ads","$0.84","$0.16"],
  ["salinger","Vino bat corkscrew and bottle opener","1,226","1% of ads","$0.36","$0.07"],
  ["nightmare before christmas kitchen stuff","Elizabat kitchen scissors","845","1% of ads","$0.35","$0.07"],
  ["spatty last drop spatula","Splatypus jar spatula","450","2% of ads","$0.35","$0.07"],
  ["revenge gifts for ex","Vino bat corkscrew and bottle opener","450","1% of ads","$0.84","$0.06"],
  ["cute bottle opener","Elizabat kitchen scissors","1,832","under 1% of ads","$0.73","$0.03"],
  ["mini kitchen gadgets","Vino bat corkscrew and bottle opener","1,381","under 1% of ads","$1.40","$0.03"],
  ["lobster bottle opener","Vino bat corkscrew and bottle opener","450","1% of ads","$0.38","$0.03"],
  ["cute kitchen utensils","Splatypus jar spatula","1,281","under 1% of ads","$0.35","$0.02"],
  ["beer bat","Vino bat corkscrew and bottle opener","450","under 1% of ads","$0.35","$0.02"],
  ["bird bottle opener","Vino bat corkscrew and bottle opener","450","under 1% of ads","$0.37","$0.02"],
  ["cooking scraper tool","Splatypus jar spatula","806","under 1% of ads","$0.96","$0.01"],
  ["halloween wine bottle cover","Splatypus jar spatula","831","under 1% of ads","$0.55","$0.00"],
  ["bottle cooler sleeve","Splatypus jar spatula","450","under 1% of ads","$0.79","$0.00"],
  ["ototot","Splatypus jar spatula","450","100% of ads","—","no bid, not priced"],
  ["spaddy daddy spatula","Splatypus jar spatula","450","under 1% of ads","$0.35","$0.00"],
  ["prime time deals of the day clearance","Elizabat kitchen scissors","450","6% of ads","—","no bid, not priced"],
  ["wine opener cute","Elizabat kitchen scissors","450","under 1% of ads","$1.56","$0.00"],
  ["jurassic park bottle opener claw","Vino bat corkscrew and bottle opener","450","17% of ads","—","no bid, not priced"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 170.59;
