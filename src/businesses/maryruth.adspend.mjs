/**
 * maryruth — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/maryruth/adspend.json (read 2026-10-13).
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
    "low": 18669,
    "central": 30895,
    "high": 41773
  },
  "ratePct": {
    "low": 0.459,
    "central": 0.76,
    "high": 1.027
  },
  "products": [
    {
      "id": "multivitamin-hair",
      "label": "Liquid Multivitamin + Hair Growth",
      "price": 37.31,
      "monthlyUsd": {
        "low": 13512,
        "central": 22305,
        "high": 28903
      },
      "ratePct": {
        "low": 0.453,
        "central": 0.747,
        "high": 0.968
      },
      "perUnit": 0.28
    },
    {
      "id": "biotin-liposomal",
      "label": "Hair Growth Max Liposomal Biotin",
      "price": 54.56,
      "monthlyUsd": {
        "low": 3639,
        "central": 6066,
        "high": 9099
      },
      "ratePct": {
        "low": 0.667,
        "central": 1.112,
        "high": 1.668
      },
      "perUnit": 0.61
    },
    {
      "id": "morning-multivitamin",
      "label": "Liquid Morning Multivitamin",
      "price": 26.77,
      "monthlyUsd": {
        "low": 1518,
        "central": 2524,
        "high": 3771
      },
      "ratePct": {
        "low": 0.284,
        "central": 0.471,
        "high": 0.704
      },
      "perUnit": 0.13
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["multivitamin for women","512,144","#32","None","$3.44","$0"],
  ["hair growth serum","493,155","#36","None","$1.67","$0"],
  ["womens multivitamin","417,286","#18","None","$4.87","$0"],
  ["vitamins","380,341","#11","None","$4.80","$0"],
  ["mary ruth","350,156","#1","None","$1.13","$0"],
  ["mary ruth multivitamin hair growth","323,786","#1","None","$0.89","$0"],
  ["mens multivitamins","317,505","#7","None","$4.11","$0"],
  ["nutrafol women hair growth supplement","306,515","#32","None","$2.02","$0"],
  ["minoxidil for women","306,408","#35","None","$1.79","$0"],
  ["multivitamin for men","278,577","#9","None","$2.97","$0"],
  ["multivitamin","247,686","#18","under 1% of ads","$2.80","$94"],
  ["aveya hair growth spray","240,552","#32","None","$1.77","$0"],
  ["black girl vitamins","236,080","#38","None","$1.68","$0"],
  ["hair growth supplements","231,895","#34","None","$2.23","$0"],
  ["hair care","223,044","#33","None","$2.17","$0"],
  ["generic","202,320","#33","None seen","$1.51","$0"],
  ["rosemary and rice water spray for hair growth","167,058","#45","None seen","—","$0"],
  ["thorne","166,950","—","under 1% of ads","$0.35","$4"],
  ["uro","166,771","#57","None seen","$0.38","$0"],
  ["hair growth","161,821","#30","None seen","$2.03","$0"],
  ["hair","154,617","#32","None seen","—","$0"],
  ["vitamin","143,902","#20","None seen","$2.51","$0"],
  ["calcium supplements for women","131,717","#32","None seen","$4.66","$0"],
  ["ufna batana oil for hair growth","130,577","#45","None seen","—","$0"],
  ["supplements","118,143","#45","None seen","$2.17","$0"],
  ["hair growth oil","117,600","#34","None seen","$3.79","$0"],
  ["kids vitamins","114,922","#5","None seen","$4.09","$0"],
  ["lilyeve hair growth serum","105,434","#43","None seen","—","$0"],
  ["vitamins for women","101,351","#30","None seen","$3.56","$0"],
  ["kids multivitamin","100,930","#59","None seen","$2.29","$0"],
  ["hair products","96,977","#38","None seen","$2.64","$0"],
  ["hair vitamins","94,899","#26","None seen","$2.78","$0"],
  ["mary ruth multivitamin","93,075","#1","83% of ads","$2.80","$6,492"],
  ["bask and lather hair products","86,138","#43","None seen","—","$0"],
  ["mary ruth kids multivitamin","83,345","#3","85% of ads","$4.41","$9,110"],
  ["mary ruth hair growth max","77,020","#2","None seen","—","$0"],
  ["multivitamin for women 50 and over","75,709","#19","None seen","—","$0"],
  ["immune support supplement","74,606","#43","None seen","$6.36","$0"],
  ["womens vitamins","73,276","#31","None seen","$4.92","$0"],
  ["liquid collagen for women","72,808","#31","None seen","$0.90","$0"],
  ["spoiled child collagen liquid","68,659","#32","None seen","—","$0"],
  ["coconut cult","68,443","#31","None seen","$0.94","$0"],
  ["multivitamin for kids","67,082","#4","None seen","$3.30","$0"],
  ["hair products for women","66,609","#40","None seen","$1.28","$0"],
  ["viviscal hair growth supplement for women","65,768","#30","None seen","—","$0"],
  ["arrae","65,427","#40","None seen","—","$0"],
  ["briogeo","63,720","#57","None seen","$1.43","$0"],
  ["mary ruths","63,605","#1","None seen","$5.27","$0"],
  ["ordinary hair growth serum","63,149","#28","None seen","—","$0"],
  ["snidin hair growth spray","59,882","#31","None seen","—","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["mary ruth kids multivitamin","Liquid Multivitamin + Hair Growth","83,345","85% of ads","$4.41","$9109.80"],
  ["mary ruth multivitamin","Liquid Multivitamin + Hair Growth","93,075","83% of ads","$2.80","$6492.32"],
  ["mary ruth kids","Hair Growth Max Liposomal Biotin","24,789","100% of ads","$7.44","$5524.61"],
  ["mary ruth hair growth","Liquid Multivitamin + Hair Growth","28,648","62% of ads","$3.46","$1831.48"],
  ["mary ruth toddler multivitamin","Liquid Morning Multivitamin","15,343","57% of ads","$5.86","$1547.17"],
  ["mary ruth's hair growth","Liquid Multivitamin + Hair Growth","9,281","85% of ads","$3.46","$814.72"],
  ["maryruths liquid multivitamin hair growth","Liquid Multivitamin + Hair Growth","9,983","62% of ads","$3.06","$566.63"],
  ["mary ruth gummies","Liquid Multivitamin + Hair Growth","6,664","85% of ads","$2.86","$483.55"],
  ["mary ruth vitamins","Liquid Multivitamin + Hair Growth","9,894","99% of ads","$1.44","$424.39"],
  ["mary ruth's kids multivitamin","Liquid Multivitamin + Hair Growth","3,359","84% of ads","$4.41","$371.56"],
  ["hair shedding treatment women","Liquid Multivitamin + Hair Growth","5,163","27% of ads","$7.65","$318.62"],
  ["mary ruth b12","Liquid Multivitamin + Hair Growth","3,525","64% of ads","$3.40","$229.64"],
  ["vitamin c liquid","Liquid Morning Multivitamin","7,927","36% of ads","$2.67","$227.88"],
  ["mary ruth multivitamin women","Liquid Multivitamin + Hair Growth","7,200","33% of ads","$2.99","$211.64"],
  ["mery ruth multivitamin","Liquid Multivitamin + Hair Growth","3,005","100% of ads","$2.17","$195.43"],
  ["mary ruth liquid multivitamin","Liquid Multivitamin + Hair Growth","4,420","62% of ads","$2.33","$192.02"],
  ["hair plus","Liquid Multivitamin + Hair Growth","5,246","18% of ads","$6.05","$175.58"],
  ["mary ruth multivitamin kids","Liquid Multivitamin + Hair Growth","8,814","33% of ads","$1.90","$164.69"],
  ["mary ruth men's multivitamin","Liquid Morning Multivitamin","2,036","74% of ads","$3.61","$163.81"],
  ["vitamins mary ruth","Hair Growth Max Liposomal Biotin","855","99% of ads","$6.14","$156.62"],
  ["kids liquid multivitamin","Liquid Morning Multivitamin","4,913","33% of ads","$2.28","$110.16"],
  ["mrs ruths liquid multivitamin hair growth","Hair Growth Max Liposomal Biotin","861","63% of ads","$6.32","$103.11"],
  ["mary ruth's multivitamin","Liquid Multivitamin + Hair Growth","3,127","36% of ads","$2.80","$95.30"],
  ["redensyl hair growth serum","Liquid Multivitamin + Hair Growth","4,091","27% of ads","$2.80","$94.06"],
  ["multivitamin","Liquid Multivitamin + Hair Growth","247,686","under 1% of ads","$2.80","$93.63"],
  ["meryruth vitamin women's hair","Hair Growth Max Liposomal Biotin","749","60% of ads","$6.28","$85.05"],
  ["minoxidil hair growth serum","Liquid Multivitamin + Hair Growth","5,754","33% of ads","$1.49","$84.31"],
  ["multivitamin for women mary ruth","Liquid Morning Multivitamin","1,272","64% of ads","$3.31","$80.43"],
  ["liquid vitamin","Liquid Multivitamin + Hair Growth","3,929","27% of ads","$2.20","$71.13"],
  ["hair growth max","Liquid Multivitamin + Hair Growth","2,524","42% of ads","$2.06","$66.26"],
  ["multivitamin toddler","Liquid Morning Multivitamin","1,229","62% of ads","$2.88","$65.74"],
  ["ruth vitamins","Hair Growth Max Liposomal Biotin","858","98% of ads","$2.01","$50.67"],
  ["vitaminas para el cabello mujer","Liquid Multivitamin + Hair Growth","2,748","42% of ads","$1.41","$49.01"],
  ["liquid multivitamin for men","Liquid Morning Multivitamin","2,351","20% of ads","$3.18","$45.28"],
  ["hair care products for women","Liquid Multivitamin + Hair Growth","1,850","19% of ads","$3.85","$40.79"],
  ["peptides for hair growth women","Hair Growth Max Liposomal Biotin","831","18% of ads","$8.48","$38.98"],
  ["liquid morning multivitamin + hair growth","Hair Growth Max Liposomal Biotin","861","26% of ads","$5.59","$37.04"],
  ["kids vitamins liquid","Liquid Morning Multivitamin","838","42% of ads","$3.43","$36.34"],
  ["liquid multivitamin for women","Liquid Morning Multivitamin","1,035","35% of ads","$3.22","$35.26"],
  ["liquid vitamins for women 50 plus","Liquid Morning Multivitamin","1,060","25% of ads","$4.00","$31.76"],
  ["liquid nighttime multimineral","Liquid Morning Multivitamin","754","66% of ads","$2.07","$30.89"],
  ["para caída de cabello","Hair Growth Max Liposomal Biotin","964","32% of ads","$3.17","$29.58"],
  ["mary ruth women's multivitamin","Liquid Multivitamin + Hair Growth","5,692","5% of ads","$3.71","$28.76"],
  ["ruth","Liquid Multivitamin + Hair Growth","7,065","21% of ads","$0.57","$25.39"],
  ["mary ruth's hair growth max","Liquid Multivitamin + Hair Growth","3,902","6% of ads","$3.08","$22.82"],
  ["multivitamin liquid for women","Liquid Morning Multivitamin","617","54% of ads","$2.22","$22.36"],
  ["best hair thickener for women","Hair Growth Max Liposomal Biotin","450","19% of ads","$8.35","$21.52"],
  ["liquid multi vitamin","Liquid Morning Multivitamin","788","35% of ads","$2.48","$20.74"],
  ["liquid multivitamins","Liquid Morning Multivitamin","655","36% of ads","$2.11","$14.86"],
  ["liquid multivitamins for children","Liquid Morning Multivitamin","585","29% of ads","$2.63","$13.20"],
  ["liquid womens multivitamin","Liquid Morning Multivitamin","557","34% of ads","$2.21","$12.47"],
  ["liquid multivitamins for women","Liquid Multivitamin + Hair Growth","8,285","2% of ads","$3.22","$12.17"],
  ["liquid multivitamins for women 50 plus","Liquid Morning Multivitamin","925","20% of ads","$2.16","$12.09"],
  ["dr root hair growth serum","Liquid Multivitamin + Hair Growth","1,336","36% of ads","$0.73","$10.54"],
  ["morning","Liquid Morning Multivitamin","2,135","15% of ads","$1.06","$10.39"],
  ["maryruth","Liquid Multivitamin + Hair Growth","21,610","1% of ads","$3.03","$10.02"],
  ["liquid multivitamin for adults","Liquid Morning Multivitamin","641","36% of ads","$2.16","$9.26"],
  ["habit womens multivitamin","Liquid Morning Multivitamin","1,181","6% of ads","$3.68","$7.59"],
  ["fsa eligible vitamins","Liquid Morning Multivitamin","4,314","2% of ads","$2.34","$5.81"],
  ["liquid multivitamin","Liquid Multivitamin + Hair Growth","13,477","1% of ads","$2.45","$5.15"],
  ["para el crecimiento del cabello rapido","Hair Growth Max Liposomal Biotin","450","40% of ads","$0.95","$5.14"],
  ["liquid multivitamin for kids","Liquid Morning Multivitamin","2,792","3% of ads","$1.91","$4.42"],
  ["t444z hair products","Hair Growth Max Liposomal Biotin","908","11% of ads","$1.42","$4.26"],
  ["abbey yung hair products pantene","Hair Growth Max Liposomal Biotin","450","11% of ads","$2.66","$3.98"],
  ["thorne","Liquid Morning Multivitamin","166,950","under 1% of ads","$0.35","$3.68"],
  ["noor vitamins for hair growth","Hair Growth Max Liposomal Biotin","450","4% of ads","$6.35","$3.48"],
  ["geritol multivitamin for women over 50","Liquid Morning Multivitamin","4,721","1% of ads","$3.09","$3.15"],
  ["women's multivitamin with iron","Liquid Multivitamin + Hair Growth","11,818","under 1% of ads","$3.70","$2.49"],
  ["best multivitamin for women","Liquid Multivitamin + Hair Growth","4,489","under 1% of ads","$3.86","$2.34"],
  ["sublingual vitamins","Liquid Morning Multivitamin","1,199","2% of ads","$2.48","$2.11"],
  ["hair growth women","Liquid Multivitamin + Hair Growth","6,817","under 1% of ads","$3.78","$2.01"],
  ["now eve multivitamin for women","Liquid Morning Multivitamin","1,121","2% of ads","$3.18","$1.78"],
  ["daily multivitamin adult women","Liquid Multivitamin + Hair Growth","3,954","under 1% of ads","$3.58","$1.44"],
  ["women's daily multivitamin","Liquid Morning Multivitamin","3,432","under 1% of ads","$4.44","$1.42"],
  ["hair and beauty products","Liquid Multivitamin + Hair Growth","1,792","1% of ads","$3.83","$1.24"],
  ["daily womens multivitamin","Liquid Multivitamin + Hair Growth","2,303","under 1% of ads","$5.13","$1.21"],
  ["nordic hair growth supplement","Hair Growth Max Liposomal Biotin","450","1% of ads","$5.12","$0.87"],
  ["powder multivitamin for women","Liquid Morning Multivitamin","574","1% of ads","$3.34","$0.82"],
  ["well bell hair vitamins woman","Hair Growth Max Liposomal Biotin","1,152","1% of ads","$2.08","$0.76"],
  ["grow","Liquid Multivitamin + Hair Growth","6,360","under 1% of ads","$7.68","$0.73"],
  ["pure synergy multivitamin for women","Liquid Morning Multivitamin","660","1% of ads","$4.82","$0.72"],
  ["womens daily multivitamins","Liquid Multivitamin + Hair Growth","18,842","under 1% of ads","$4.09","$0.69"],
  ["vacation mornings travel supplement","Liquid Morning Multivitamin","951","under 1% of ads","$5.59","$0.54"],
  ["woman vitamins","Liquid Multivitamin + Hair Growth","8,050","under 1% of ads","$3.82","$0.46"],
  ["centrum liquid multivitamin","Liquid Morning Multivitamin","628","1% of ads","$2.07","$0.41"],
  ["liquid vitamin b12 drops","Liquid Morning Multivitamin","1,047","1% of ads","$1.97","$0.39"],
  ["tropical oasis liquid multivitamin","Liquid Multivitamin + Hair Growth","1,692","under 1% of ads","$3.77","$0.36"],
  ["hair treatment for hair loss","Liquid Multivitamin + Hair Growth","2,468","under 1% of ads","$1.38","$0.35"],
  ["vita fusion multivitamin gummies women","Liquid Morning Multivitamin","1,575","under 1% of ads","$1.99","$0.32"],
  ["vegan multivitamin for women","Liquid Morning Multivitamin","687","under 1% of ads","$5.83","$0.32"],
  ["nutrafol women's balance hair growth supplements","Liquid Multivitamin + Hair Growth","1,374","under 1% of ads","$1.68","$0.30"],
  ["new chapter liquid multivitamin","Liquid Multivitamin + Hair Growth","1,426","under 1% of ads","$1.58","$0.24"],
  ["nordic naturals multivitamins for women","Liquid Morning Multivitamin","606","under 1% of ads","$3.74","$0.15"],
  ["vegan multivitamins for women","Liquid Multivitamin + Hair Growth","3,687","under 1% of ads","$5.83","$0.13"],
  ["the ordinary multi peptide hair serum","Hair Growth Max Liposomal Biotin","522","under 1% of ads","$3.11","$0.12"],
  ["centrum multivitamin for women","Liquid Morning Multivitamin","2,016","under 1% of ads","$4.02","$0.10"],
  ["multivitamins for men and women","Liquid Morning Multivitamin","2,082","under 1% of ads","$1.73","$0.05"],
  ["multivitamin liquid","Liquid Multivitamin + Hair Growth","2,449","under 1% of ads","$0.96","$0.04"],
  ["nordic naturals women's multivitamin","Liquid Morning Multivitamin","925","under 1% of ads","$4.25","$0.04"],
  ["multivitamin for women nature made","Liquid Morning Multivitamin","1,554","under 1% of ads","$1.65","$0.02"],
  ["throne multivitamins women","Liquid Morning Multivitamin","1,229","under 1% of ads","$2.40","$0.01"],
  ["multivitamin for young women","Liquid Morning Multivitamin","601","under 1% of ads","$4.47","$0.01"],
  ["aceite de sabal","Hair Growth Max Liposomal Biotin","450","13% of ads","—","no bid, not priced"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 30895.18;
