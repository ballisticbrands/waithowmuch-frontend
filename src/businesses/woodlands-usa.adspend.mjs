/**
 * woodlands-usa — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/woodlands-usa/adspend.json (read 2026-10-17).
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
    "low": 1780,
    "central": 2966,
    "high": 4384
  },
  "ratePct": {
    "low": 2.724,
    "central": 4.539,
    "high": 6.709
  },
  "products": [
    {
      "id": "bamboo-set",
      "label": "Bamboo cooking utensil set (plain and laser-engraved themes)",
      "price": 11.43,
      "monthlyUsd": {
        "low": 1770,
        "central": 2949,
        "high": 4358
      },
      "ratePct": {
        "low": 3.44,
        "central": 5.731,
        "high": 8.47
      },
      "perUnit": 0.66
    },
    {
      "id": "teak-utensil-set",
      "label": "Teak utensil set with holder",
      "price": 30.39,
      "monthlyUsd": {
        "low": 10,
        "central": 17,
        "high": 26
      },
      "ratePct": {
        "low": 0.132,
        "central": 0.224,
        "high": 0.342
      },
      "perUnit": 0.07
    },
    {
      "id": "teak-spatula",
      "label": "Teak spatula / spurtle",
      "price": 7.87,
      "monthlyUsd": {
        "low": 0,
        "central": 0,
        "high": 0
      },
      "ratePct": {
        "low": 0,
        "central": 0,
        "high": 0
      },
      "perUnit": 0
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["nightmare before christmas","262,668","#52","None","$0.49","$0"],
  ["wooden utensil set","262,562","#9","26% of ads","$0.76","$1,546"],
  ["harry potter gifts","197,068","#26","None","$0.57","$0"],
  ["wooden spoons","133,132","#5","16% of ads","$0.62","$387"],
  ["wooden spoons for cooking","126,630","#5","None","$0.53","$0"],
  ["cooking utensils","117,569","#35","None","$1.14","$0"],
  ["nightmare before christmas gifts","56,511","#19","25% of ads","$0.66","$284"],
  ["wooden spatula","45,442","#15","None","$1.26","$0"],
  ["wooden spoon","44,083","#11","None","$0.66","$0"],
  ["wooden spoons bulk","41,082","—","under 1% of ads","$0.75","$1"],
  ["nightm","37,483","#5","None","—","$0"],
  ["wooden cooking utensils","34,646","#6","None","$1.30","$0"],
  ["bamboo","33,893","—","None","$1.89","$0"],
  ["cooking spoons","33,873","#35","None","$1.23","$0"],
  ["teak wooden utensil set","32,107","#10","None","$1.19","$0"],
  ["house essentials for new home","27,166","—","None","$1.53","$0"],
  ["kitchen essentials for new apartment","26,592","—","None","$0.35","$0"],
  ["kitchen nightmares","25,891","—","9% of ads","$1.22","$87"],
  ["star wars gifts","24,305","#21","None seen","$0.73","$0"],
  ["slotted spoon","24,246","#58","None seen","$1.04","$0"],
  ["wooden utensils","23,066","#8","None seen","$1.26","$0"],
  ["bulk wooden spoons","22,705","#39","None seen","$1.37","$0"],
  ["wooden kitchen utensil set","22,338","#11","2% of ads","$0.90","$12"],
  ["harry potter gifts for women","21,796","#4","None seen","—","$0"],
  ["harry potter merch","21,493","#12","None seen","$0.61","$0"],
  ["bamboo utensils","21,395","#9","None","$0.63","$0"],
  ["utensilios de cocina","20,905","—","None","$0.43","$0"],
  ["spurtle","19,468","#43","None seen","$1.35","$0"],
  ["wood spoons","18,637","#5","None","$1.18","$0"],
  ["non toxic cooking utensils","18,218","#57","None seen","$1.31","$0"],
  ["harry potter stuff","18,201","#28","None seen","$0.65","$0"],
  ["wood spatula","17,448","#13","None seen","$1.02","$0"],
  ["star wars gifts for men","15,976","#37","None seen","—","$0"],
  ["cooking spoon","15,386","#43","None seen","$1.23","$0"],
  ["nightmare","15,077","#6","None seen","$0.56","$0"],
  ["star wars decor","14,344","#24","None seen","$0.69","$0"],
  ["kitchen spoons","13,725","#45","None seen","$0.99","$0"],
  ["wooden cooking utensils set","13,724","#11","2% of ads","$1.04","$8"],
  ["wood kitchen utensils","13,288","#27","None","$0.95","$0"],
  ["hufflepuff accessories","12,814","#55","None seen","$0.48","$0"],
  ["christmas kitchen","12,780","#4","None seen","$0.71","$0"],
  ["wood utensils","12,267","#37","35% of ads","$0.64","$83"],
  ["wooden spatula for cooking","11,420","#13","None seen","$2.01","$0"],
  ["harry potter candles","10,999","#23","None seen","$0.65","$0"],
  ["cucharones de cocina","10,662","#41","None seen","$0.72","$0"],
  ["wood cooking utensils set","10,514","#18","36% of ads","$0.79","$90"],
  ["bamboo kitchen utensils","10,258","#4","None","$0.92","$0"],
  ["owala star wars","10,211","#54","None seen","—","$0"],
  ["wooden kitchen utensils set","9,898","#19","None seen","$0.93","$0"],
  ["bamboo spoons","9,737","#6","1% of ads","$0.48","$1"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["wooden utensil set","Bamboo cooking utensil set (plain and laser-engraved themes)","262,562","26% of ads","$0.76","$1546.29"],
  ["wooden spoons","Bamboo cooking utensil set (plain and laser-engraved themes)","133,132","16% of ads","$0.62","$387.29"],
  ["nightmare before christmas gifts","Bamboo cooking utensil set (plain and laser-engraved themes)","56,511","25% of ads","$0.66","$284.21"],
  ["wood cooking utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","10,514","36% of ads","$0.79","$90.13"],
  ["kitchen nightmares","Bamboo cooking utensil set (plain and laser-engraved themes)","25,891","9% of ads","$1.22","$86.52"],
  ["wood utensils","Bamboo cooking utensil set (plain and laser-engraved themes)","12,267","35% of ads","$0.64","$82.69"],
  ["wooden kitchen utensils","Bamboo cooking utensil set (plain and laser-engraved themes)","7,153","27% of ads","$0.96","$54.59"],
  ["wood utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","8,589","26% of ads","$0.73","$48.06"],
  ["kitchen wooden utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","2,787","34% of ads","$1.20","$34.43"],
  ["wood spoon","Bamboo cooking utensil set (plain and laser-engraved themes)","8,977","25% of ads","$0.51","$33.76"],
  ["harry potter kitchen","Bamboo cooking utensil set (plain and laser-engraved themes)","5,487","28% of ads","$0.62","$28.68"],
  ["wooden spoons for cooking bulk","Bamboo cooking utensil set (plain and laser-engraved themes)","2,699","35% of ads","$0.78","$21.95"],
  ["wooden spurtle","Teak utensil set with holder","3,133","18% of ads","$0.99","$17.18"],
  ["wooden utensil","Bamboo cooking utensil set (plain and laser-engraved themes)","4,382","15% of ads","$0.84","$16.61"],
  ["bamboo cooking utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","3,781","21% of ads","$0.66","$15.72"],
  ["wooden kitchen utensil set","Bamboo cooking utensil set (plain and laser-engraved themes)","22,338","2% of ads","$0.90","$11.70"],
  ["wooden cooking utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","13,724","2% of ads","$1.04","$8.14"],
  ["￼nightmare before christmas","Bamboo cooking utensil set (plain and laser-engraved themes)","2,611","20% of ads","$0.49","$7.84"],
  ["cucharones de madera para cocina","Bamboo cooking utensil set (plain and laser-engraved themes)","1,746","15% of ads","$0.78","$6.09"],
  ["wooden spatulas for cooking","Bamboo cooking utensil set (plain and laser-engraved themes)","1,349","6% of ads","$2.07","$4.84"],
  ["bamboo cooking utensils set non toxic","Bamboo cooking utensil set (plain and laser-engraved themes)","806","19% of ads","$0.86","$3.89"],
  ["wood spoons for cooking","Bamboo cooking utensil set (plain and laser-engraved themes)","8,870","1% of ads","$0.73","$2.12"],
  ["bamboo spoon","Bamboo cooking utensil set (plain and laser-engraved themes)","1,825","4% of ads","$0.81","$1.58"],
  ["wood kitchen set","Bamboo cooking utensil set (plain and laser-engraved themes)","724","15% of ads","$0.46","$1.50"],
  ["kitchen utensils set wood","Bamboo cooking utensil set (plain and laser-engraved themes)","3,959","1% of ads","$0.96","$1.24"],
  ["bamboo spoons","Bamboo cooking utensil set (plain and laser-engraved themes)","9,737","1% of ads","$0.48","$1.04"],
  ["wood kitchen utensils set","Bamboo cooking utensil set (plain and laser-engraved themes)","2,529","2% of ads","$0.71","$1.03"],
  ["wooden spoons bulk","Bamboo cooking utensil set (plain and laser-engraved themes)","41,082","under 1% of ads","$0.75","$1.02"],
  ["bamboo spatula","Bamboo cooking utensil set (plain and laser-engraved themes)","5,945","1% of ads","$0.81","$0.91"],
  ["bamboo utensils for cooking","Bamboo cooking utensil set (plain and laser-engraved themes)","2,375","1% of ads","$0.35","$0.36"],
  ["harry potter gift","Bamboo cooking utensil set (plain and laser-engraved themes)","9,076","under 1% of ads","$0.57","$0.29"],
  ["bamboo cooking utensils","Bamboo cooking utensil set (plain and laser-engraved themes)","7,322","under 1% of ads","$1.14","$0.13"],
  ["nightmare before christmas kitchen","Bamboo cooking utensil set (plain and laser-engraved themes)","6,888","under 1% of ads","$0.35","$0.04"],
  ["wood utensils set for cooking","Bamboo cooking utensil set (plain and laser-engraved themes)","3,449","under 1% of ads","$0.97","$0.04"],
  ["wood spoons for eating","Bamboo cooking utensil set (plain and laser-engraved themes)","3,510","under 1% of ads","$0.47","$0.02"],
  ["wooden spoons set","Bamboo cooking utensil set (plain and laser-engraved themes)","3,837","under 1% of ads","$0.75","$0.01"],
  ["flat wooden spatula","Bamboo cooking utensil set (plain and laser-engraved themes)","2,737","under 1% of ads","$0.48","$0.01"],
  ["giant wooden spoon","Bamboo cooking utensil set (plain and laser-engraved themes)","848","under 1% of ads","$0.65","$0.00"],
  ["harry potter gofts","Bamboo cooking utensil set (plain and laser-engraved themes)","840","19% of ads","—","no bid, not priced"],
  ["+ 250 more small keywords, estimated from the 19 sampled above","Bamboo cooking utensil set (plain and laser-engraved themes)","—","Sampled","—","$164.71"],
  ["+ 221 more small keywords, estimated from the 17 sampled above","Teak utensil set with holder","—","Sampled","—","$0.00"],
  ["+ 198 more small keywords, estimated from the 14 sampled above","Teak spatula / spurtle","—","Sampled","—","$0.00"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 2966.66;
