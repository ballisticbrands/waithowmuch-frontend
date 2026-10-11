/**
 * spite-house-games — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/spitehouse/adspend.json (read 2026-10-11).
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
    "low": 240,
    "central": 399,
    "high": 599
  },
  "ratePct": {
    "low": 0.267,
    "central": 0.443,
    "high": 0.666
  },
  "products": [
    {
      "id": "deck",
      "label": "Deck",
      "price": 8.87,
      "monthlyUsd": {
        "low": 240,
        "central": 399,
        "high": 599
      },
      "ratePct": {
        "low": 0.267,
        "central": 0.443,
        "high": 0.666
      },
      "perUnit": 0.04
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["board games","426,119","#46","None","$0.97","$0"],
  ["games","190,911","#12","None","$0.91","$0"],
  ["card games","136,162","#19","None","$0.97","$0"],
  ["board games for adults","98,723","#6","None","$0.81","$0"],
  ["board game","71,665","#45","None","$1.05","$0"],
  ["family games","70,163","#56","None","$1.37","$0"],
  ["funny gifts","62,127","#15","None","$0.66","$0"],
  ["funny","59,451","#20","None","$0.41","$0"],
  ["gag gifts","58,097","#15","None","$0.44","$0"],
  ["game","53,388","#12","None","$0.64","$0"],
  ["deck of cards","52,298","#33","None","$0.96","$0"],
  ["travel games","52,114","#25","None","$0.85","$0"],
  ["party games","49,398","#11","None","$0.63","$0"],
  ["cards against humanity","49,028","#20","None","$1.31","$0"],
  ["games for adults and family","48,602","#20","None","$1.02","$0"],
  ["card games for adults","47,409","#5","None seen","$1.10","$0"],
  ["games for adults","34,667","#1","None seen","$0.96","$0"],
  ["adult games","33,969","#2","None seen","$0.93","$0"],
  ["drinking games for adults","26,092","#22","None seen","$0.44","$0"],
  ["bachelorette party","24,571","#32","None seen","$1.30","$0"],
  ["funny gifts for men","24,125","#35","None seen","$0.96","$0"],
  ["gag gifts for men","23,102","#19","None seen","$0.67","$0"],
  ["fishing gifts for men","21,151","#29","None seen","$0.92","$0"],
  ["fun stuff","20,968","#30","None seen","$0.75","$0"],
  ["party games for adults","20,166","#6","None seen","$0.92","$0"],
  ["bachelorette games","19,886","#20","None seen","$0.93","$0"],
  ["adult board games","19,389","#6","None seen","$0.80","$0"],
  ["card game","19,214","#14","None seen","$0.87","$0"],
  ["go fish card game","17,820","#8","None seen","$0.76","$0"],
  ["camping games","16,944","#17","None seen","—","$0"],
  ["fishing gifts","15,857","#35","None seen","$0.97","$0"],
  ["gamer gifts","15,774","#18","None seen","—","$0"],
  ["adult games for game night","15,221","#9","None seen","$1.27","$0"],
  ["adult party games","15,020","#4","None seen","$0.68","$0"],
  ["gag gifts funny adult","13,639","#5","None seen","—","$0"],
  ["couples card game","13,436","#40","None seen","$1.89","$0"],
  ["adult card games","13,360","#1","None seen","$0.91","$0"],
  ["go fish","13,159","#8","None seen","$1.66","$0"],
  ["gag gift","12,510","#7","None seen","$0.75","$0"],
  ["bachelorette party games","12,223","#15","None seen","$1.33","$0"],
  ["travel games for adults","11,105","#3","None seen","$0.98","$0"],
  ["2 player games for adults","10,686","#16","None seen","—","$0"],
  ["card games for families","10,583","#35","None seen","$1.17","$0"],
  ["fun games for adults","10,046","#3","None seen","$0.68","$0"],
  ["card deck","9,910","#43","None seen","$0.75","$0"],
  ["game of life","9,353","#25","None seen","$0.48","$0"],
  ["fun gifts","9,009","#20","None seen","$0.81","$0"],
  ["funny stuff","8,926","#27","None seen","$0.63","$0"],
  ["cheap gifts","8,803","#16","None seen","$1.04","$0"],
  ["bachelorette gifts","8,501","#32","None seen","$1.33","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["go fucl yourself card game","Deck","7,907","71% of ads","$1.49","$250.03"],
  ["go f yourself card game","Deck","1,915","62% of ads","$2.06","$73.55"],
  ["go fucl yourself card game go fish","Deck","1,083","62% of ads","$0.71","$14.34"],
  ["go fuxk yourself card game","Deck","450","70% of ads","$1.44","$13.69"],
  ["go fucl yourself card game expansion pack","Deck","450","74% of ads","$0.75","$7.53"],
  ["adult go fish card game, go f yourself","Deck","423","70% of ads","$0.64","$5.72"],
  ["go fucl yourself card game mom and dad","Deck","450","71% of ads","$0.58","$5.54"],
  ["card game go f yourself","Deck","359","71% of ads","$0.57","$4.34"],
  ["go f yourself card game adult party","Deck","450","60% of ads","$0.43","$3.50"],
  ["go f*** yourself card game adult party","Deck","450","60% of ads","$0.43","$3.47"],
  ["adult go fish card game","Deck","450","34% of ads","$0.64","$2.97"],
  ["funny games for family","Deck","599","15% of ads","$0.88","$2.40"],
  ["adult goldfish game","Deck","450","26% of ads","$0.66","$2.30"],
  ["go f yourself game","Deck","300","40% of ads","$0.56","$2.04"],
  ["adult go fish","Deck","450","34% of ads","$0.40","$1.86"],
  ["nda drinking card game","Deck","450","14% of ads","$0.78","$1.46"],
  ["go fish adult version","Deck","450","26% of ads","$0.40","$1.39"],
  ["go fish for adults","Deck","450","14% of ads","$0.73","$1.36"],
  ["adult version of go fish card game","Deck","450","20% of ads","$0.37","$1.01"],
  ["funny games for adults","Deck","2,675","1% of ads","$0.93","$0.49"],
  ["fun drinking games","Deck","1,137","1% of ads","$0.48","$0.10"],
  ["card games for adults and family","Deck","681","under 1% of ads","$1.02","$0.07"],
  ["christmas gag gifts adults funny","Deck","2,238","under 1% of ads","$1.20","$0.05"],
  ["adult card games for game night","Deck","1,317","under 1% of ads","$0.92","$0.03"],
  ["slingz card game","Deck","1,808","under 1% of ads","$1.15","$0.02"],
  ["adult camping games","Deck","450","under 1% of ads","$0.75","$0.02"],
  ["fun card games","Deck","2,999","under 1% of ads","$1.15","$0.01"],
  ["game card","Deck","1,076","under 1% of ads","$0.94","$0.00"],
  ["bachelorette drinking games","Deck","450","under 1% of ads","$0.36","$0.00"],
  ["funny gag gifts for adult party","Deck","450","under 1% of ads","$0.69","$0.00"],
  ["funny playing cards for adults","Deck","450","under 1% of ads","$0.54","$0.00"],
  ["go fish card game for kids","Deck","450","under 1% of ads","$0.79","$0.00"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 399.29;
