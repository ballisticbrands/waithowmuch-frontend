/**
 * doctor-jupiter — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/doctor-jupiter/adspend.json (read 2026-10-17).
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
    "low": 7826,
    "central": 11864,
    "high": 16416
  },
  "ratePct": {
    "low": 2.051,
    "central": 3.109,
    "high": 4.302
  },
  "products": [
    {
      "id": "my-first-science",
      "label": "My First Science Experiments Kit (ages 4+)",
      "price": 27.18,
      "monthlyUsd": {
        "low": 5961,
        "central": 8760,
        "high": 11780
      },
      "ratePct": {
        "low": 2.109,
        "central": 3.099,
        "high": 4.167
      },
      "perUnit": 0.84
    },
    {
      "id": "ultimate-science",
      "label": "Ultimate Science Experiments Kit (ages 8+)",
      "price": 26.86,
      "monthlyUsd": {
        "low": 98,
        "central": 159,
        "high": 219
      },
      "ratePct": {
        "low": 0.228,
        "central": 0.37,
        "high": 0.509
      },
      "perUnit": 0.1
    },
    {
      "id": "preschool-science",
      "label": "Preschool Science Kit (ages 3-5)",
      "price": 26.99,
      "monthlyUsd": {
        "low": 15,
        "central": 25,
        "high": 37
      },
      "ratePct": {
        "low": 0.051,
        "central": 0.084,
        "high": 0.125
      },
      "perUnit": 0.02
    },
    {
      "id": "paper-airplane-launcher",
      "label": "Paper Airplane Launcher Kit (ages 6+)",
      "price": 24.99,
      "monthlyUsd": {
        "low": 1752,
        "central": 2920,
        "high": 4380
      },
      "ratePct": {
        "low": 6.677,
        "central": 11.128,
        "high": 16.692
      },
      "perUnit": 2.78
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["4 year old girl birthday gifts","180,707","#32","None","$3.20","$0"],
  ["5 year old girl birthday gift","175,310","#19","None","$3.08","$0"],
  ["toys for 4 year old boys","148,371","#36","None","$1.18","$0"],
  ["5 year old boy birthday gift","130,226","#26","None","$2.50","$0"],
  ["crunch labs","114,710","#48","None","$0.35","$0"],
  ["4 year old boy birthday gift","113,479","#24","None","$1.39","$0"],
  ["4 year old boy toys","105,375","#19","None","$1.21","$0"],
  ["stem toys","102,252","#32","None","$1.04","$0"],
  ["boys toys age 4-6","97,696","#48","None","$0.35","$0"],
  ["6 year old boy birthday gift","93,906","#43","None","$2.65","$0"],
  ["5 year old boy toys","82,844","#21","None","$1.10","$0"],
  ["gifts for 4 year old girl","82,159","#20","None","$2.94","$0"],
  ["national geographic kit","81,740","#121","None","$0.45","$0"],
  ["toddler toys 3-4","78,347","#48","None","$1.03","$0"],
  ["science kits for kids age 8-12","78,176","#19","44% of ads","$2.21","$2,259"],
  ["4 year old girl toys","73,747","#18","None seen","—","$0"],
  ["toys for 5 year old girls","73,364","#21","None seen","—","$0"],
  ["7 year old boy birthday gifts","72,319","#21","None seen","—","$0"],
  ["toys for 6 year old boys","70,452","#51","None seen","—","$0"],
  ["toys for 4 year old girls","70,372","#37","None seen","—","$0"],
  ["gifts for 5 year old boy","64,963","#30","None seen","—","$0"],
  ["5 year old girl gifts","64,643","#14","None seen","$1.14","$0"],
  ["girls","61,955","#35","None seen","$0.84","$0"],
  ["gifts for 8 year old boys","59,657","#81","60% of ads","$2.43","$2,621"],
  ["9 year old boy birthday gifts","57,255","#83","None","$2.19","$0"],
  ["toys for 4+ year old girls","56,945","#28","None seen","—","$0"],
  ["gifts for 5 year old girls","54,993","#19","None seen","$1.17","$0"],
  ["toys for 6+ year old boys","53,779","#57","None seen","—","$0"],
  ["gifts for 4 year old boys","53,578","#37","25% of ads","$1.83","$749"],
  ["educational toys for 3 year old","52,838","#26","None seen","—","$0"],
  ["gifts for 6 year old boys","52,265","#47","None seen","—","$0"],
  ["toys for 5+ year old girls","49,656","#13","None seen","—","$0"],
  ["6 year old boy toys","48,356","#43","None seen","—","$0"],
  ["learning & education toys","46,572","#28","None","$0.79","$0"],
  ["science kits for kids age 5-7","46,502","#5","99% of ads","$2.67","$2,540"],
  ["toys for boys 4-6","41,537","#20","None seen","$0.97","$0"],
  ["4 year old girl gifts","40,782","#18","None seen","$1.17","$0"],
  ["4 year old toys","38,038","#27","None seen","$2.41","$0"],
  ["5 year old girl toys","37,103","#14","None seen","—","$0"],
  ["stem toys for 5 year old","36,523","#2","None seen","—","$0"],
  ["gift for 4 year old girl","35,783","#17","None seen","—","$0"],
  ["boy toys age 4","35,617","#59","None seen","$1.68","$0"],
  ["gifts for 5 years old girls","35,237","#18","None seen","$1.47","$0"],
  ["science kit","35,178","#5","57% of ads","$0.71","$426"],
  ["potion kits for kids","34,874","#32","None seen","$0.73","$0"],
  ["gift for 5 year old girl","33,499","#18","None seen","—","$0"],
  ["toys for 4+ year old boys","30,428","#33","None seen","—","$0"],
  ["toys for girls 4-6","30,379","#33","None seen","—","$0"],
  ["space toys","28,934","#56","None seen","$1.25","$0"],
  ["5 year old boy gifts","28,721","#18","None seen","$1.45","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["gifts for 8 year old boys","Paper Airplane Launcher Kit (ages 6+)","59,657","60% of ads","$2.43","$2621.14"],
  ["science kits for kids age 5-7","My First Science Experiments Kit (ages 4+)","46,502","99% of ads","$2.67","$2540.31"],
  ["science kits for kids age 8-12","My First Science Experiments Kit (ages 4+)","78,176","44% of ads","$2.21","$2258.78"],
  ["gifts for 4 year old boys","My First Science Experiments Kit (ages 4+)","53,578","25% of ads","$1.83","$748.89"],
  ["science kits for kids 3-5","My First Science Experiments Kit (ages 4+)","14,543","83% of ads","$1.77","$640.26"],
  ["science kit","My First Science Experiments Kit (ages 4+)","35,178","57% of ads","$0.71","$425.60"],
  ["4 yr old girl birthday gift","My First Science Experiments Kit (ages 4+)","11,790","35% of ads","$3.18","$390.86"],
  ["kids science kits age 5-8","My First Science Experiments Kit (ages 4+)","13,242","36% of ads","$1.48","$212.25"],
  ["kids science kit","My First Science Experiments Kit (ages 4+)","14,812","55% of ads","$0.75","$183.00"],
  ["science experiments for kids 4-6","My First Science Experiments Kit (ages 4+)","6,897","71% of ads","$1.15","$168.28"],
  ["science experiments for kids 9-12","My First Science Experiments Kit (ages 4+)","11,231","34% of ads","$1.00","$114.35"],
  ["educational science kits","My First Science Experiments Kit (ages 4+)","8,804","63% of ads","$0.67","$111.40"],
  ["4 yr old boy birthday gift","My First Science Experiments Kit (ages 4+)","8,475","19% of ads","$2.20","$106.39"],
  ["5 yr old boy birthday gift","My First Science Experiments Kit (ages 4+)","9,664","14% of ads","$2.48","$99.44"],
  ["gift for 8+ year old boy","Paper Airplane Launcher Kit (ages 6+)","3,953","34% of ads","$2.43","$99.05"],
  ["kids science kits age 8-10","My First Science Experiments Kit (ages 4+)","6,619","28% of ads","$1.44","$79.18"],
  ["science kits for kids","My First Science Experiments Kit (ages 4+)","9,860","36% of ads","$0.73","$76.92"],
  ["science for kids","My First Science Experiments Kit (ages 4+)","4,347","27% of ads","$1.98","$69.43"],
  ["stem toys for 6 year old girls","My First Science Experiments Kit (ages 4+)","4,403","34% of ads","$1.76","$67.89"],
  ["gifts for a 4 year old boy","My First Science Experiments Kit (ages 4+)","3,496","35% of ads","$1.83","$62.74"],
  ["paper airplane kit","Paper Airplane Launcher Kit (ages 6+)","15,996","14% of ads","$0.93","$61.59"],
  ["5 years old boy birthday gift","My First Science Experiments Kit (ages 4+)","4,198","19% of ads","$2.50","$61.21"],
  ["toddler science kit","My First Science Experiments Kit (ages 4+)","3,460","63% of ads","$0.82","$53.97"],
  ["kids science experiment kit","Ultimate Science Experiments Kit (ages 8+)","2,293","35% of ads","$1.67","$40.63"],
  ["science kit for kids 6-8","My First Science Experiments Kit (ages 4+)","4,592","20% of ads","$1.46","$40.35"],
  ["science kids","My First Science Experiments Kit (ages 4+)","2,432","27% of ads","$1.98","$39.71"],
  ["science kit for kids","My First Science Experiments Kit (ages 4+)","2,449","67% of ads","$0.73","$36.12"],
  ["volcano science kit","My First Science Experiments Kit (ages 4+)","7,341","25% of ads","$0.65","$35.74"],
  ["boys crafts","Paper Airplane Launcher Kit (ages 6+)","4,918","25% of ads","$0.94","$34.56"],
  ["doctor jupiter science kit","Paper Airplane Launcher Kit (ages 6+)","492","97% of ads","$2.35","$33.79"],
  ["gifts for 4+ year old boys","My First Science Experiments Kit (ages 4+)","2,411","25% of ads","$1.83","$32.54"],
  ["gifts 8 year old boy","Paper Airplane Launcher Kit (ages 6+)","1,842","19% of ads","$2.43","$25.97"],
  ["gift for 4 + year old boy","Ultimate Science Experiments Kit (ages 8+)","1,771","25% of ads","$1.83","$24.75"],
  ["kids science","My First Science Experiments Kit (ages 4+)","3,375","27% of ads","$0.79","$21.20"],
  ["engineering kits for kids","Ultimate Science Experiments Kit (ages 8+)","1,598","21% of ads","$1.10","$9.43"],
  ["kits for kids","Preschool Science Kit (ages 3-5)","1,924","15% of ads","$0.73","$6.13"],
  ["stem mini paper airplane","Paper Airplane Launcher Kit (ages 6+)","450","21% of ads","$1.75","$4.86"],
  ["kids' paper craft kits","Paper Airplane Launcher Kit (ages 6+)","753","19% of ads","$1.11","$4.84"],
  ["stem kits for kids age 6-8","My First Science Experiments Kit (ages 4+)","23,685","under 1% of ads","$1.45","$2.16"],
  ["funluluu paper airplane","Paper Airplane Launcher Kit (ages 6+)","279","22% of ads","$0.93","$1.74"],
  ["paper airplane book","Paper Airplane Launcher Kit (ages 6+)","9,541","under 1% of ads","$2.27","$0.84"],
  ["kids stem","Ultimate Science Experiments Kit (ages 8+)","2,224","1% of ads","$0.87","$0.67"],
  ["barbie science kit","Ultimate Science Experiments Kit (ages 8+)","1,903","1% of ads","$0.41","$0.15"],
  ["crafts for 4 year old boys","Paper Airplane Launcher Kit (ages 6+)","1,325","under 1% of ads","$1.21","$0.09"],
  ["science kits for kids age 12-14","My First Science Experiments Kit (ages 4+)","5,979","under 1% of ads","$1.33","$0.05"],
  ["curved origami book","Paper Airplane Launcher Kit (ages 6+)","450","under 1% of ads","$1.48","$0.04"],
  ["gift for 8 year+ old boy","Paper Airplane Launcher Kit (ages 6+)","932","under 1% of ads","$2.43","$0.02"],
  ["craft paper book","Paper Airplane Launcher Kit (ages 6+)","450","under 1% of ads","$0.54","$0.00"],
  ["+ 20 more small keywords, estimated from the 9 sampled above","My First Science Experiments Kit (ages 4+)","—","Sampled","—","$81.35"],
  ["+ 18 more small keywords, estimated from the 8 sampled above","Ultimate Science Experiments Kit (ages 8+)","—","Sampled","—","$83.39"],
  ["+ 3 more small keywords, estimated from the 1 sampled above","Preschool Science Kit (ages 3-5)","—","Sampled","—","$18.39"],
  ["+ 88 more small keywords, estimated from the 32 sampled above","Paper Airplane Launcher Kit (ages 6+)","—","Sampled","—","$31.34"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 11863.77;
