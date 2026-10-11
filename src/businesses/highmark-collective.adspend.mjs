/**
 * highmark-collective — the Advertising section's tables.
 *
 * 🚨 GENERATED. waithowmuch-research skills/amazon-adspend-spy/scripts/
 * profile-tables.mjs from research/highmark-collective/adspend.json (read 2026-10-07).
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
    "low": 1230,
    "central": 1260,
    "high": 3295
  },
  "ratePct": {
    "low": 2.389,
    "central": 2.447,
    "high": 6.4
  },
  "products": [
    {
      "id": "baptism",
      "label": "Baptism keepsake set",
      "price": 37.21,
      "monthlyUsd": {
        "low": 1080,
        "central": 1105,
        "high": 2875
      },
      "ratePct": {
        "low": 3.225,
        "central": 3.299,
        "high": 8.584
      },
      "perUnit": 1.23
    },
    {
      "id": "jar",
      "label": "Bible verse jar",
      "price": 19.99,
      "monthlyUsd": {
        "low": 66,
        "central": 68,
        "high": 185
      },
      "ratePct": {
        "low": 0.66,
        "central": 0.68,
        "high": 1.851
      },
      "perUnit": 0.14
    },
    {
      "id": "journals",
      "label": "Bible-study journals (3-pack)",
      "price": 19.99,
      "monthlyUsd": {
        "low": 84,
        "central": 87,
        "high": 235
      },
      "ratePct": {
        "low": 1.051,
        "central": 1.088,
        "high": 2.939
      },
      "perUnit": 0.22
    }
  ]
};

/** The 50 biggest keywords a listing of theirs ranks on (organic top 60, or an
 *  ad): Jungle Scout exact monthly searches, best positions, Amazon's own
 *  suggested exact bid (Jungle Scout's where Amazon gave none), and the
 *  modelled ad spend a month on that keyword. */
export const TOP_KEYWORDS = [
  ["journal for women","222,549","—","under 1% of ads","$0.48","$8"],
  ["baptism gifts for girl","68,956","#45","19% of ads","$1.36","$718"],
  ["baptism gifts for boys","59,843","#38","None","$1.56","$0"],
  ["bible journal","51,620","—","None","$0.39","$0"],
  ["prayer journal","42,464","#44","None","$0.69","$0"],
  ["journal notebook","39,282","—","None","$0.63","$0"],
  ["prayer journal for women","27,589","#54","None","$0.52","$0"],
  ["bible notebook","23,940","#90","None","$0.76","$0"],
  ["gratitude journal for women","19,184","—","None","$0.75","$0"],
  ["bible verse jar","12,934","#12","None","$1.15","$0"],
  ["christian journals for women","11,720","#36","None","$0.48","$0"],
  ["christian notebook","8,873","#30","15% of ads","$0.63","$33"],
  ["diary for women","8,561","—","None","$0.69","$0"],
  ["sermon notes notebook","8,292","#40","None","$0.61","$0"],
  ["christening gifts for girls","8,227","#9","None","$1.37","$0"],
  ["leather journals for women","7,604","—","None","$0.58","$0"],
  ["recuerdos de bautizo para niño","7,508","#27","None seen","—","$0"],
  ["daily journal for women","7,309","—","None","$0.72","$0"],
  ["christening gifts for boys","7,293","#10","None","$1.06","$0"],
  ["read me when bible verses jar","6,592","#14","None seen","—","$0"],
  ["christian birthday gifts for women","6,048","—","None","$0.78","$0"],
  ["cute journals for women","5,945","—","None","$0.42","$0"],
  ["notebook for bible notes","5,878","#42","None seen","$0.36","$0"],
  ["bible gifts for women","5,606","#60","None","$0.61","$0"],
  ["baby baptism gifts for girl","5,579","#18","None","$1.65","$0"],
  ["baptism candle set","5,081","#52","None seen","$0.69","$0"],
  ["christian notebook for women","4,901","#8","None","$0.43","$0"],
  ["church notebook","4,799","#46","None seen","$0.39","$0"],
  ["bible gifts","4,749","#54","None","$0.74","$0"],
  ["boy baptism gifts","4,708","#24","None seen","$1.97","$0"],
  ["faith based gifts for women","4,618","—","under 1% of ads","$0.86","under $1"],
  ["bible verses in a jar","4,566","#13","under 1% of ads","$1.43","under $1"],
  ["bible verse","4,460","#34","None seen","$1.33","$0"],
  ["baby boy baptism gifts","4,305","#22","19% of ads","$1.36","$45"],
  ["baby baptism gifts boy","4,057","#24","under 1% of ads","$1.40","under $1"],
  ["girl baptism gifts","4,008","#35","34% of ads","$1.63","$89"],
  ["baby dedication gifts for girls","3,915","#19","None","$1.24","$0"],
  ["baby girl baptism gifts","3,898","#18","None","$1.37","$0"],
  ["baptism gifts for baby girl","3,788","#22","25% of ads","$1.49","$45"],
  ["prayer closet essentials","3,763","#58","None seen","—","$0"],
  ["catholic baptism gifts for boys","3,564","#33","None seen","$1.27","$0"],
  ["journal notebooks","3,489","—","None","$0.55","$0"],
  ["bible notes journal","3,400","#53","None seen","$0.58","$0"],
  ["women's journal","3,231","#81","under 1% of ads","$0.49","under $1"],
  ["bible study notebook for women","3,195","#21","None","$0.66","$0"],
  ["bible study tools","3,103","—","None","$0.63","$0"],
  ["catholic baptism gifts for girl","3,061","#29","under 1% of ads","$1.16","under $1"],
  ["baptism cards for boy","3,034","#42","None seen","$1.10","$0"],
  ["notebook for bible study","3,013","#38","None","$0.36","$0"],
  ["journal for women christian","2,982","#46","None seen","$0.48","$0"],
];

/** Every keyword an ad of theirs was seen on, biggest modelled spend first:
 *  keyword, product, searches a month, their ads, cost per click, modelled
 *  spend a month (to the cent, so the rows visibly add up to the total). */
export const AD_KEYWORDS = [
  ["baptism gifts for girl","Baptism keepsake set","68,956","19% of ads","$1.36","$718.06"],
  ["girl baptism gifts","Baptism keepsake set","4,008","34% of ads","$1.63","$88.55"],
  ["baptism gifts for baby girl","Baptism keepsake set","3,788","25% of ads","$1.49","$44.70"],
  ["baby boy baptism gifts","Baptism keepsake set","4,305","19% of ads","$1.36","$44.64"],
  ["christian notebook","Bible-study journals (3-pack)","8,873","15% of ads","$0.63","$32.56"],
  ["baptism gifts for girls","Baptism keepsake set","2,423","19% of ads","$1.46","$25.03"],
  ["baptism gift for girl","Baptism keepsake set","1,767","19% of ads","$1.36","$18.32"],
  ["baby boy baptism gift","Baptism keepsake set","1,250","25% of ads","$1.36","$17.34"],
  ["baby dedication gifts for boys","Baptism keepsake set","2,903","14% of ads","$1.02","$17.14"],
  ["girls baptism gifts","Baptism keepsake set","1,348","26% of ads","$1.23","$16.98"],
  ["baby baptism gift","Baptism keepsake set","2,074","14% of ads","$1.33","$15.48"],
  ["christian notebooks","Bible-study journals (3-pack)","2,620","34% of ads","$0.42","$14.92"],
  ["baby girl christening gift","Baptism keepsake set","690","34% of ads","$1.52","$14.22"],
  ["baptism gifts for boy","Baptism keepsake set","780","29% of ads","$1.56","$13.97"],
  ["baptism gift for boys","Baptism keepsake set","450","43% of ads","$1.56","$12.11"],
  ["christian gifts sets for women","Bible verse jar","450","61% of ads","$1.03","$11.30"],
  ["baptism gifts for boys from grandparents","Baptism keepsake set","450","35% of ads","$1.76","$11.20"],
  ["prayer cards for women","Bible verse jar","2,392","14% of ads","$0.80","$10.95"],
  ["baptism boy","Baptism keepsake set","450","34% of ads","$1.60","$9.83"],
  ["boy christening gift","Baptism keepsake set","450","35% of ads","$1.37","$8.75"],
  ["baptism gifts for infant girl","Baptism keepsake set","450","25% of ads","$1.83","$8.41"],
  ["journal for women","Bible-study journals (3-pack)","222,549","under 1% of ads","$0.48","$8.14"],
  ["baptism gift girl","Baptism keepsake set","848","16% of ads","$1.36","$7.21"],
  ["pretty journals for women","Bible-study journals (3-pack)","1,847","19% of ads","$0.48","$6.76"],
  ["god says you are gifts for women","Bible verse jar","1,779","19% of ads","$0.48","$6.63"],
  ["baptism girl","Baptism keepsake set","450","34% of ads","$1.00","$6.10"],
  ["graduation gifts for her christian","Bible verse jar","450","25% of ads","$1.30","$5.97"],
  ["womens journals for writing christian","Bible-study journals (3-pack)","968","19% of ads","$0.72","$5.33"],
  ["christian gifts for sister","Bible verse jar","450","45% of ads","$0.64","$5.21"],
  ["prayer jar with scriptures for women","Bible verse jar","811","19% of ads","$0.74","$4.55"],
  ["womens bible journal notebook","Bible-study journals (3-pack)","450","34% of ads","$0.68","$4.15"],
  ["christian journal gift set for women","Bible-study journals (3-pack)","450","33% of ads","$0.61","$3.61"],
  ["scriptures in a jar","Bible verse jar","642","14% of ads","$0.98","$3.53"],
  ["christian thank you gifts for women","Bible verse jar","450","25% of ads","$0.75","$3.44"],
  ["baby dedication gift ideas","Baptism keepsake set","450","21% of ads","$0.90","$3.34"],
  ["gifts for spiritual women","Bible verse jar","450","19% of ads","$0.95","$3.26"],
  ["bible verse jar for teacher","Bible verse jar","450","16% of ads","$1.09","$3.19"],
  ["christian bridal shower gifts","Bible verse jar","450","19% of ads","$0.75","$2.58"],
  ["journals for bible study","Bible-study journals (3-pack)","1,013","14% of ads","$0.40","$2.32"],
  ["bible notebooks","Bible-study journals (3-pack)","1,020","14% of ads","$0.39","$2.28"],
  ["faith-based gifts for women","Bible verse jar","450","26% of ads","$0.49","$2.28"],
  ["church notebook for women","Bible-study journals (3-pack)","450","26% of ads","$0.47","$2.17"],
  ["faith notebooks for women","Bible-study journals (3-pack)","450","29% of ads","$0.36","$1.88"],
  ["bible verses in a jar","Bible verse jar","4,566","under 1% of ads","$1.43","$0.94"],
  ["baptism gift boy","Baptism keepsake set","827","2% of ads","$1.56","$0.92"],
  ["painting proverbs","Bible-study journals (3-pack)","450","14% of ads","$0.35","$0.87"],
  ["gifts for women christian","Bible verse jar","450","2% of ads","$1.88","$0.65"],
  ["religious grandma gifts","Bible verse jar","450","4% of ads","$0.90","$0.57"],
  ["baby boy christening gifts","Baptism keepsake set","720","1% of ads","$1.25","$0.52"],
  ["scripture verse jar","Bible verse jar","450","2% of ads","$1.35","$0.48"],
  ["grandma bible verse jar","Bible verse jar","450","2% of ads","$1.03","$0.43"],
  ["baptism gifts for baby","Baptism keepsake set","712","1% of ads","$1.31","$0.42"],
  ["jar with bible verses","Bible verse jar","461","2% of ads","$1.03","$0.41"],
  ["dedication gifts for boys","Baptism keepsake set","898","1% of ads","$0.86","$0.35"],
  ["baptism blanket for boys","Baptism keepsake set","940","1% of ads","$0.93","$0.33"],
  ["catholic notebook","Bible-study journals (3-pack)","1,341","1% of ads","$0.43","$0.27"],
  ["notebooks for bible study","Bible-study journals (3-pack)","748","2% of ads","$0.45","$0.26"],
  ["dedication","Baptism keepsake set","450","1% of ads","$1.11","$0.26"],
  ["bible items","Bible verse jar","450","2% of ads","$0.76","$0.26"],
  ["god is above bible verse jar","Bible verse jar","1,576","under 1% of ads","$1.09","$0.25"],
  ["biblical journal for women","Bible-study journals (3-pack)","837","2% of ads","$0.38","$0.25"],
  ["baptism gifts for baby boys","Baptism keepsake set","1,349","under 1% of ads","$1.54","$0.22"],
  ["catholic baptism gifts for girl","Baptism keepsake set","3,061","under 1% of ads","$1.16","$0.20"],
  ["journal notebook for women","Bible-study journals (3-pack)","2,191","under 1% of ads","$0.51","$0.20"],
  ["grandma bible gifts","Bible verse jar","450","1% of ads","$1.00","$0.19"],
  ["bible verses jar","Bible verse jar","1,601","under 1% of ads","$1.43","$0.17"],
  ["teen boy baptism gift","Baptism keepsake set","450","1% of ads","$1.12","$0.17"],
  ["scripture jar with bible verses","Bible verse jar","1,189","under 1% of ads","$0.81","$0.16"],
  ["bible jar","Bible verse jar","1,359","under 1% of ads","$1.08","$0.15"],
  ["jar of bible verses","Bible verse jar","712","under 1% of ads","$1.26","$0.15"],
  ["baby christening gifts","Baptism keepsake set","1,450","under 1% of ads","$1.17","$0.13"],
  ["baptism gift for baby","Baptism keepsake set","450","1% of ads","$1.31","$0.12"],
  ["baptism gift bags girl","Baptism keepsake set","639","under 1% of ads","$0.97","$0.11"],
  ["baby baptism gifts boy","Baptism keepsake set","4,057","under 1% of ads","$1.40","$0.09"],
  ["scripture jar","Bible verse jar","720","under 1% of ads","$0.82","$0.08"],
  ["baby girl dedication gift","Baptism keepsake set","450","under 1% of ads","$0.98","$0.08"],
  ["women's journal","Bible-study journals (3-pack)","3,231","under 1% of ads","$0.49","$0.07"],
  ["baptism gifts for boys catholic","Baptism keepsake set","1,945","under 1% of ads","$1.30","$0.07"],
  ["baby girl baptism","Baptism keepsake set","450","under 1% of ads","$1.76","$0.06"],
  ["mothers day bible verse jar","Bible verse jar","450","under 1% of ads","$1.20","$0.06"],
  ["god journal for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.76","$0.05"],
  ["clever fox prayer journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.61","$0.04"],
  ["prayer joirnal","Bible-study journals (3-pack)","450","under 1% of ads","$1.29","$0.04"],
  ["spiral notebook for bible notes","Bible-study journals (3-pack)","450","under 1% of ads","$0.44","$0.04"],
  ["prayer journal notebook","Bible-study journals (3-pack)","1,754","under 1% of ads","$0.52","$0.03"],
  ["notebook bible","Bible-study journals (3-pack)","949","under 1% of ads","$0.35","$0.03"],
  ["christian gratitude journal for women","Bible-study journals (3-pack)","643","under 1% of ads","$0.75","$0.03"],
  ["faith gift","Bible verse jar","450","under 1% of ads","$0.96","$0.03"],
  ["read when bible verse jar","Bible verse jar","450","under 1% of ads","$1.10","$0.03"],
  ["bible paper sheets","Bible-study journals (3-pack)","450","under 1% of ads","$0.45","$0.03"],
  ["christian stationery for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.60","$0.03"],
  ["girly notebooks for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.38","$0.03"],
  ["gratitude journal for women christian","Bible-study journals (3-pack)","450","under 1% of ads","$0.74","$0.03"],
  ["inspirational journals for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.62","$0.03"],
  ["faith based gifts for women","Bible verse jar","4,618","under 1% of ads","$0.86","$0.02"],
  ["devocionales para mujeres","Bible verse jar","450","under 1% of ads","$0.55","$0.02"],
  ["bible study journals for scripture reflection","Bible-study journals (3-pack)","450","under 1% of ads","$0.59","$0.02"],
  ["notebook for bible","Bible-study journals (3-pack)","450","under 1% of ads","$0.35","$0.02"],
  ["whatever you ask weekly prayer journal for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.50","$0.02"],
  ["bible study accessories","Bible-study journals (3-pack)","2,352","under 1% of ads","$0.66","$0.01"],
  ["prayer notebook","Bible-study journals (3-pack)","1,700","under 1% of ads","$0.42","$0.01"],
  ["bible study journals","Bible-study journals (3-pack)","1,322","under 1% of ads","$0.40","$0.01"],
  ["baptism gift bags for boys","Baptism keepsake set","812","under 1% of ads","$1.10","$0.01"],
  ["baptism gift for baby boy","Baptism keepsake set","450","under 1% of ads","$1.36","$0.01"],
  ["baptism gifts for baby boy","Baptism keepsake set","450","under 1% of ads","$1.36","$0.01"],
  ["girl baptism gift","Baptism keepsake set","450","under 1% of ads","$1.23","$0.01"],
  ["washed by the water baptism gift","Baptism keepsake set","450","under 1% of ads","$1.88","$0.01"],
  ["birthday gift for christian woman","Bible verse jar","450","under 1% of ads","$0.84","$0.01"],
  ["religious teacher gifts","Bible verse jar","450","under 1% of ads","$0.77","$0.01"],
  ["large journal for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.58","$0.01"],
  ["notebook bible study","Bible-study journals (3-pack)","450","under 1% of ads","$0.79","$0.01"],
  ["scripture journal for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.41","$0.01"],
  ["scripture mapping journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.55","$0.01"],
  ["women's bible journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.72","$0.01"],
  ["christian journal for women","Bible-study journals (3-pack)","2,359","under 1% of ads","$0.48","$0.00"],
  ["bible journal notebook","Bible-study journals (3-pack)","2,197","under 1% of ads","$0.41","$0.00"],
  ["beautiful journals for women","Bible-study journals (3-pack)","1,472","under 1% of ads","$0.48","$0.00"],
  ["god box for prayers and worries","Bible verse jar","534","under 1% of ads","$0.66","$0.00"],
  ["baby baptism","Baptism keepsake set","450","under 1% of ads","$0.96","$0.00"],
  ["baby boy christian gifts","Baptism keepsake set","450","under 1% of ads","$1.29","$0.00"],
  ["baby religious gifts","Baptism keepsake set","450","under 1% of ads","$1.10","$0.00"],
  ["baptism gift for teen girl","Baptism keepsake set","450","under 1% of ads","$1.33","$0.00"],
  ["bible gifts for mom","Bible verse jar","450","under 1% of ads","$1.61","$0.00"],
  ["frasco de versículos por emociones","Bible verse jar","450","under 1% of ads","$0.35","$0.00"],
  ["versiculos biblicos","Bible verse jar","450","under 1% of ads","$0.52","$0.00"],
  ["b0gxtqtl6p","Bible-study journals (3-pack)","450","2% of ads","—","no bid, not priced"],
  ["bible study tools for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.58","$0.00"],
  ["bible verse journals for women","Bible-study journals (3-pack)","450","under 1% of ads","$0.43","$0.00"],
  ["blank bible journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.71","$0.00"],
  ["study notebooks","Bible-study journals (3-pack)","450","under 1% of ads","$0.63","$0.00"],
  ["women bible journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.72","$0.00"],
  ["women prayer journal","Bible-study journals (3-pack)","450","under 1% of ads","$0.75","$0.00"],
];

/** What AD_KEYWORDS' spend column adds up to — the advertising line, unrounded. */
export const AD_KEYWORDS_TOTAL = 1260.03;
