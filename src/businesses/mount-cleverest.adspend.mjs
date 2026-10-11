/**
 * mount-cleverest — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/mount-cleverest/adspend.json (read 2026-10-11).
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
    "low": 29,
    "central": 49,
    "high": 74
  },
  "ratePct": {
    "low": 0.074,
    "central": 0.125,
    "high": 0.19
  },
  "products": [
    {
      "id": "mount-cleverest",
      "label": "Mount Cleverest decks",
      "price": 16.99,
      "monthlyUsd": {
        "low": 21,
        "central": 35,
        "high": 52
      },
      "ratePct": {
        "low": 0.095,
        "central": 0.158,
        "high": 0.235
      },
      "perUnit": 0.03
    },
    {
      "id": "100-pics",
      "label": "100 PICS flash cards",
      "price": 12.47,
      "monthlyUsd": {
        "low": 1,
        "central": 2,
        "high": 4
      },
      "ratePct": {
        "low": 0.007,
        "central": 0.013,
        "high": 0.027
      },
      "perUnit": 0
    },
    {
      "id": "smart-cards",
      "label": "SMART CARDS",
      "price": 9.99,
      "monthlyUsd": {
        "low": 7,
        "central": 12,
        "high": 18
      },
      "ratePct": {
        "low": 0.35,
        "central": 0.601,
        "high": 0.901
      },
      "perUnit": 0.06
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["card games","136,162","#23","None","$1.07","$0"],
  ["travel games","52,114","#30","None","$0.97","$0"],
  ["card games for adults","47,409","#21","None","$0.87","$0"],
  ["games for adults","34,667","#47","None","$0.64","$0"],
  ["adult games","33,969","#47","None","$0.65","$0"],
  ["party games for adults","20,166","#45","None","$0.51","$0"],
  ["adult games for game night","15,221","#45","None","$0.58","$0"],
  ["adult card games","13,360","#37","None","$0.85","$0"],
  ["carrooka table top game","12,290","#58","None","$0.63","$0"],
  ["travel games for adults","11,105","#34","None","$0.88","$0"],
  ["card games for families","10,583","#32","None","$1.29","$0"],
  ["fun games for adults","10,046","#43","None","$0.82","$0"],
  ["stocking stuffers for teen boys","9,620","#34","None","$0.86","$0"],
  ["mount cleverest game","9,495","#1","None","$0.66","$0"],
  ["birthday games","9,180","#55","None","$0.46","$0"],
  ["wavelength board game","9,056","#36","None seen","—","$0"],
  ["scattergories","8,888","#56","None seen","$0.43","$0"],
  ["trivia games","8,396","#3","None seen","$1.01","$0"],
  ["family card games","7,711","#27","None seen","$1.42","$0"],
  ["fun games","7,462","#49","None seen","$1.29","$0"],
  ["game night games for groups adult","7,095","#36","None seen","—","$0"],
  ["road trip games","6,950","#40","None seen","$1.06","$0"],
  ["family game","6,833","#59","None seen","$1.71","$0"],
  ["guess in 10","6,560","#49","None seen","—","$0"],
  ["gifts for 17 year old boy","6,315","#53","None seen","—","$0"],
  ["trivia games for adults","6,037","#49","None seen","$1.05","$0"],
  ["state","5,918","#5","None seen","—","$0"],
  ["group games","5,608","#58","None seen","$0.98","$0"],
  ["teen boy stocking stuffers","5,298","#7","None seen","$0.57","$0"],
  ["group games for adults","4,766","#32","None seen","$0.93","$0"],
  ["trivia","4,614","#6","None seen","$1.59","$0"],
  ["dutch blitz","4,555","#24","None seen","$0.44","$0"],
  ["country flags","4,435","#50","None seen","$0.93","$0"],
  ["logo","4,418","#5","None seen","$0.68","$0"],
  ["travel board games","4,194","#53","None seen","$0.88","$0"],
  ["genius game","4,004","#56","None seen","$1.28","$0"],
  ["funny games","3,935","#8","None seen","$1.02","$0"],
  ["games for seniors","3,892","#40","None seen","$0.80","$0"],
  ["teen games","3,892","#58","None seen","$1.40","$0"],
  ["travel game","3,683","#38","None seen","$0.97","$0"],
  ["dutch blitz card game","3,442","#28","None seen","$0.81","$0"],
  ["stop! that! train!","3,424","—","22% of ads","$0.37","$3"],
  ["trivia cards","3,280","#24","None seen","$0.86","$0"],
  ["train toys for boys 6-8","3,257","#9","None seen","—","$0"],
  ["thanksgiving games for adults","3,231","#26","None seen","$0.57","$0"],
  ["camping games for adults","3,147","#43","None seen","—","$0"],
  ["trivial pursuit newest edition","3,112","#26","None seen","$0.68","$0"],
  ["fun card games","2,999","#30","None seen","$0.86","$0"],
  ["fun party games","2,986","#52","None seen","$0.86","$0"],
  ["card games for teens","2,863","#25","None seen","$2.30","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["geography games for kids 8-12","Mount Cleverest decks","551","27% of ads","$0.93","$4.22"],
  ["boys adrift the six factors","Mount Cleverest decks","450","49% of ads","$0.59","$3.94"],
  ["best games","Mount Cleverest decks","1,755","7% of ads","$1.05","$3.74"],
  ["no wrong answers game","Mount Cleverest decks","450","25% of ads","$1.08","$3.58"],
  ["stop! that! train!","SMART CARDS","1,326","22% of ads","$0.37","$3.22"],
  ["jeopardy game","Mount Cleverest decks","1,295","10% of ads","$0.76","$3.06"],
  ["dinosaur playing cards","SMART CARDS","450","30% of ads","$0.63","$2.54"],
  ["geography board game","Mount Cleverest decks","450","14% of ads","$1.18","$2.20"],
  ["train back to boston","SMART CARDS","450","43% of ads","$0.35","$2.04"],
  ["overrated underrated card game","Mount Cleverest decks","450","14% of ads","$1.03","$1.92"],
  ["trivia games for kids","Mount Cleverest decks","392","15% of ads","$0.96","$1.74"],
  ["america's game","SMART CARDS","450","30% of ads","$0.37","$1.49"],
  ["stop that train dvd","SMART CARDS","458","22% of ads","$0.49","$1.46"],
  ["trivia games for family","Mount Cleverest decks","450","14% of ads","$0.75","$1.40"],
  ["trivia card games","Mount Cleverest decks","581","10% of ads","$0.73","$1.32"],
  ["south park game","Mount Cleverest decks","480","25% of ads","$0.37","$1.31"],
  ["professor noggin","Mount Cleverest decks","450","23% of ads","$0.35","$1.08"],
  ["parks roll and hike game","Mount Cleverest decks","513","14% of ads","$0.44","$0.94"],
  ["america games","100 PICS flash cards","450","16% of ads","$0.38","$0.80"],
  ["only murders in the building game","Mount Cleverest decks","450","14% of ads","$0.35","$0.65"],
  ["fun facts game","Mount Cleverest decks","450","5% of ads","$0.92","$0.62"],
  ["leading adult learning","100 PICS flash cards","450","5% of ads","$0.90","$0.61"],
  ["black flag game","100 PICS flash cards","450","10% of ads","$0.36","$0.50"],
  ["slappy camper game","Mount Cleverest decks","450","10% of ads","$0.35","$0.49"],
  ["terrible therapist game","Mount Cleverest decks","450","10% of ads","$0.35","$0.49"],
  ["poorly explained movies game","Mount Cleverest decks","692","5% of ads","$0.46","$0.48"],
  ["animal playing cards","SMART CARDS","450","6% of ads","$0.48","$0.41"],
  ["trivia game","Mount Cleverest decks","1,902","1% of ads","$0.75","$0.34"],
  ["little it","SMART CARDS","450","7% of ads","$0.35","$0.34"],
  ["geography games","Mount Cleverest decks","1,913","1% of ads","$0.85","$0.28"],
  ["old boy deluxe edition","Mount Cleverest decks","450","6% of ads","$0.35","$0.28"],
  ["ww2 games","Mount Cleverest decks","450","3% of ads","$0.44","$0.18"],
  ["timeline game","Mount Cleverest decks","1,211","1% of ads","$0.65","$0.13"],
  ["lego police train","SMART CARDS","421","2% of ads","$0.37","$0.12"],
  ["boys who taint","Mount Cleverest decks","450","2% of ads","$0.35","$0.10"],
  ["the heiress of two worlds","100 PICS flash cards","450","2% of ads","$0.35","$0.10"],
  ["mystery train","SMART CARDS","506","1% of ads","$0.75","$0.09"],
  ["pandasaurus games","Mount Cleverest decks","450","under 1% of ads","$1.36","$0.08"],
  ["flag flash cards","100 PICS flash cards","439","1% of ads","$0.95","$0.07"],
  ["states and capitals flash cards","100 PICS flash cards","1,370","under 1% of ads","$0.41","$0.05"],
  ["ago","100 PICS flash cards","450","1% of ads","$0.51","$0.05"],
  ["worlds f","100 PICS flash cards","1,257","under 1% of ads","$0.35","$0.04"],
  ["flag toys","100 PICS flash cards","450","1% of ads","$0.35","$0.04"],
  ["geography games for kids","Mount Cleverest decks","388","under 1% of ads","$0.76","$0.04"],
  ["state capital flashcards","100 PICS flash cards","682","under 1% of ads","$0.42","$0.03"],
  ["flags of the world flash cards","100 PICS flash cards","450","under 1% of ads","$0.88","$0.03"],
  ["snap dinosaurs","SMART CARDS","450","under 1% of ads","$0.57","$0.03"],
  ["dinosaur cards","SMART CARDS","1,174","under 1% of ads","$0.35","$0.02"],
  ["states and capitals game","100 PICS flash cards","879","under 1% of ads","$0.42","$0.02"],
  ["gilmore girls trivia","Mount Cleverest decks","428","under 1% of ads","$0.40","$0.02"],
  ["train gifts for boys","SMART CARDS","1,126","under 1% of ads","$0.50","$0.01"],
  ["the world's game","100 PICS flash cards","450","under 1% of ads","$0.61","$0.01"],
  ["travel games for kids ages 6-8","100 PICS flash cards","450","under 1% of ads","$0.73","$0.01"],
  ["world wa","100 PICS flash cards","942","under 1% of ads","—","no bid, not priced"],
  ["zany trains","SMART CARDS","686","under 1% of ads","$0.36","$0.00"],
  ["all around the world","100 PICS flash cards","674","under 1% of ads","$0.35","$0.00"],
  ["me and you against the world","100 PICS flash cards","647","under 1% of ads","—","no bid, not priced"],
  ["state and capital flash cards","100 PICS flash cards","642","under 1% of ads","$0.41","$0.00"],
  ["world o","100 PICS flash cards","585","1% of ads","—","no bid, not priced"],
  ["country flash cards","100 PICS flash cards","450","under 1% of ads","$0.44","$0.00"],
  ["the book of 100 drinking games","100 PICS flash cards","450","7% of ads","—","no bid, not priced"],
  ["workd","100 PICS flash cards","450","under 1% of ads","—","no bid, not priced"],
  ["world flags for kids","100 PICS flash cards","450","under 1% of ads","$0.35","$0.00"],
  ["world t","100 PICS flash cards","450","6% of ads","—","no bid, not priced"],
  ["americas gam","SMART CARDS","450","30% of ads","—","no bid, not priced"],
  ["cars playing cards","SMART CARDS","450","under 1% of ads","$0.35","$0.00"],
  ["train in vain the clash","SMART CARDS","450","24% of ads","—","no bid, not priced"],
  ["world hold on","100 PICS flash cards","436","18% of ads","—","no bid, not priced"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 48.76;
