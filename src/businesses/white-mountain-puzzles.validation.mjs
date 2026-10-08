/**
 * white-mountain-puzzles — "What it costs to start": the validation launch.
 *
 * 🚨 GENERATED. waithowmuch-research skills/build-ecom-biz-page/scripts/
 * make-validation-launch.mjs white-mountain-puzzles --variant fun,funny --variant-kind theme
 * (keywords: adspend/js-keywords-by-asin.json, read 2026-10-07); the first order and setup costs
 * are the backend's own (starting-cost.ts, model 2026-10-07). Re-run it
 * rather than editing a row. Spy data behind it: adspend.json, retrieved 2026-10-07.
 */
export const VALIDATION_LAUNCH = {
  "model": "2026-10-07",
  "readAt": "2026-10-07",
  "bidsReadAt": "2026-10-07",
  "variant": {
    "kind": "theme",
    "label": "fun",
    "words": [
      "fun",
      "funny"
    ]
  },
  "band": {
    "min": 1000,
    "max": 5500
  },
  "maxRank": 25,
  "gate": {
    "minClicks": 300,
    "firstOrderUnits": 50,
    "vineUnits": 30,
    "paidUnits": 20,
    "reviews": 10,
    "rating": 4.2,
    "returns": 0.1,
    "organicRank": 20,
    "reviewsBeforeAds": 5,
    "failBelowUnits": 10,
    "clickShare": 0.04,
    "windowDays": 60
  },
  "products": [
    {
      "id": "puzzle",
      "label": "Jigsaw puzzle",
      "sellingPrice": 19.52,
      "landedUnitCost": 3.4,
      "units": 50,
      "inventory": 170,
      "conversion": {
        "market": 0.07949717489378477,
        "line": 0.06666666666666667,
        "rows": 22,
        "listings": 13,
        "clicks": 4042,
        "minRowClicks": 50,
        "from": "2026-09-27",
        "to": "2026-10-03"
      },
      "clicksNeeded": 300,
      "passClicks": 252,
      "adsDays": 44,
      "payout": 10.54,
      "moneyBack": 211,
      "atMinimumClicks": true,
      "widened": false,
      "keywords": [
        {
          "keyword": "fun puzzles for adults",
          "monthlySearches": 2824,
          "organicRank": 11,
          "cpc": 1.1,
          "cpcFrom": "Jungle Scout",
          "clicks": 162,
          "cost": 178
        },
        {
          "keyword": "funny puzzles",
          "monthlySearches": 2419,
          "organicRank": 16,
          "cpc": 0.65,
          "cpcFrom": "Amazon",
          "clicks": 138,
          "cost": 90
        }
      ],
      "clicks": 300,
      "clickShare": 0.02900692987475364,
      "ads": 268,
      "low": 1228,
      "high": 2858
    }
  ],
  "together": {
    "inventory": 170,
    "ads": 268,
    "setup": {
      "low": 790,
      "high": 2420
    },
    "low": 1228,
    "high": 2858,
    "moneyBack": 211,
    "adsDays": 44
  }
};
