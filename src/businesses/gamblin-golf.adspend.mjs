/**
 * gamblin-golf — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/gamblin-golf/adspend.json (read 2026-10-15).
 * Re-run that script rather than editing a row.
 */

/** What the Margin breakdown's advertising line is made of: central and band,
 *  for the whole brand and each product (per-unit at the product's price).
 *  The profile builds the line AND the Advertising section's "Ad spend" table
 *  from this object, so they cannot disagree. */
export const AD_SPEND = {
  "month": "2026-09",
  "strategy": "Category acquisition",
  "monthlyUsd": {
    "low": 119,
    "central": 198,
    "high": 297
  },
  "ratePct": {
    "low": 0.992,
    "central": 1.65,
    "high": 2.475
  },
  "products": [
    {
      "id": "scratch-swing",
      "label": "Scratch & Swing scratch-off golf game",
      "price": 24,
      "monthlyUsd": {
        "low": 119,
        "central": 198,
        "high": 297
      },
      "ratePct": {
        "low": 0.992,
        "central": 1.65,
        "high": 2.475
      },
      "perUnit": 0.4
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["golf game","8,659","#29","None","$0.96","$0"],
  ["golf games","5,431","#19","None","$0.96","$0"],
  ["play nine golf card game","5,411","#42","None","$1.29","$0"],
  ["golf card game","2,910","#4","None","$1.52","$0"],
  ["uno golf","1,918","#41","None","$1.95","$0"],
  ["golf swing","1,713","#58","None","$1.80","$0"],
  ["golf games for adults","1,602","#23","None","$1.02","$0"],
  ["gamblin","1,375","#44","None","$1.18","$0"],
  ["scratch and swing golf game","1,263","#1","None","$1.04","$0"],
  ["golf lego set","1,221","#38","None","$1.26","$0"],
  ["gambling golf scratch off cards","1,205","#1","75% of ads","$1.06","$29"],
  ["golf cornhole game","1,151","#58","None","$1.35","$0"],
  ["golf cards","1,012","#22","None","$1.04","$0"],
  ["golf scratch off cards","896","#1","71% of ads","$1.72","$33"],
  ["scratch and swing","884","#1","28% of ads","$0.97","$7"],
  ["scratch and swing golf cards","689","#1","None seen","—","$0"],
  ["golf card game play 9 hole","677","#22","None seen","—","$0"],
  ["golf pranks","651","#45","None seen","$0.54","$0"],
  ["golf card","650","#24","14% of ads","$1.04","$3"],
  ["swing minder golf reference cards","612","#27","None seen","—","$0"],
  ["gamblin golf scratch off game","567","#1","58% of ads","$1.84","$18"],
  ["golf score cards","496","#60","None seen","$0.84","$0"],
  ["golf gift cards","483","#48","None seen","$0.46","$0"],
  ["golf board game","454","#19","None seen","$0.97","$0"],
  ["bad cards good golfers","450","#17","None seen","—","$0"],
  ["battlegolf game","450","#59","None seen","—","$0"],
  ["beach golf game","450","#40","None seen","$1.28","$0"],
  ["beach golf game for sand","450","#48","None seen","—","$0"],
  ["bottle golf game","450","#22","None seen","—","$0"],
  ["bucket golf score cards","450","—","33% of ads","$1.71","$8"],
  ["chippo golf game","450","#29","None seen","$0.80","$0"],
  ["cornhole golf","450","#52","None seen","$0.76","$0"],
  ["crokinole golf","450","#14","under 1% of ads","—","$0"],
  ["desk golf game","450","#36","under 1% of ads","$0.94","$0"],
  ["fun golf","450","#40","None seen","$1.40","$0"],
  ["fun golf gifts for men","450","#60","None seen","$1.96","$0"],
  ["gamblin golf","450","#1","1% of ads","$1.04","under $1"],
  ["gamblin golf scratch and swing","450","#1","None seen","—","$0"],
  ["gambling golf","450","#1","34% of ads","$1.26","$6"],
  ["gambling golf scratch and swing","450","#1","33% of ads","$2.87","$13"],
  ["game swing","450","#27","None seen","—","$0"],
  ["gift card top golf","450","#45","None seen","—","$0"],
  ["golf bag purse","450","—","None","$0.50","$0"],
  ["golf ball snow globe game","450","—","19% of ads","$2.50","$6"],
  ["golf card games for adults","450","#3","None seen","—","$0"],
  ["golf cards game","450","#3","None seen","$0.51","$0"],
  ["golf charcuterie board","450","#42","None seen","—","$0"],
  ["golf drinking game","450","#20","None seen","$0.82","$0"],
  ["golf fun","450","#48","None seen","$0.97","$0"],
  ["golf game cards","450","#3","2% of ads","$1.46","under $1"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["scratch off golf cards","Scratch & Swing scratch-off golf game","450","96% of ads","$3.51","$45.49"],
  ["golf scratch off cards","Scratch & Swing scratch-off golf game","896","71% of ads","$1.72","$32.87"],
  ["gambling golf scratch off cards","Scratch & Swing scratch-off golf game","1,205","75% of ads","$1.06","$28.75"],
  ["gamblin golf scratch off game","Scratch & Swing scratch-off golf game","567","58% of ads","$1.84","$18.16"],
  ["gambling golf scratch and swing","Scratch & Swing scratch-off golf game","450","33% of ads","$2.87","$12.70"],
  ["golf scratch off game","Scratch & Swing scratch-off golf game","450","37% of ads","$2.40","$11.83"],
  ["scratch & swing scratch off golf card game","Scratch & Swing scratch-off golf game","450","42% of ads","$1.81","$10.38"],
  ["bucket golf score cards","Scratch & Swing scratch-off golf game","450","33% of ads","$1.71","$7.57"],
  ["scratch and swing","Scratch & Swing scratch-off golf game","884","28% of ads","$0.97","$7.15"],
  ["scratch off golf game cards","Scratch & Swing scratch-off golf game","423","43% of ads","$1.30","$7.13"],
  ["golf ball snow globe game","Scratch & Swing scratch-off golf game","450","19% of ads","$2.50","$6.48"],
  ["gambling golf","Scratch & Swing scratch-off golf game","450","34% of ads","$1.26","$5.84"],
  ["golf card","Scratch & Swing scratch-off golf game","650","14% of ads","$1.04","$2.94"],
  ["golf game cards","Scratch & Swing scratch-off golf game","450","2% of ads","$1.46","$0.42"],
  ["gamblin golf","Scratch & Swing scratch-off golf game","450","1% of ads","$1.04","$0.07"],
  ["crokinole golf","Scratch & Swing scratch-off golf game","450","under 1% of ads","—","no bid, not priced"],
  ["desk golf game","Scratch & Swing scratch-off golf game","450","under 1% of ads","$0.94","$0.00"],
  ["golf trip","Scratch & Swing scratch-off golf game","450","under 1% of ads","$1.69","$0.00"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 197.78;
