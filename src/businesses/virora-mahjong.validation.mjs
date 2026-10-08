/**
 * virora-mahjong — "What it costs to start": the validation launch.
 *
 * 🚨 GENERATED. waithowmuch-research skills/build-ecom-biz-page/scripts/
 * make-validation-launch.mjs virora-mahjong --variant pink --exclude "viora,oh my mahjong,linda li,amalfi,atelier,yellow mountain,sweet jojo,pumiboo"
 * (keywords: ad-keywords.json, read 2026-10-05); the first order and setup costs
 * are the backend's own (starting-cost.ts, model 2026-10-07). Re-run it
 * rather than editing a row. Spy data behind it: adspend.json, retrieved 2026-10-07.
 */
export const VALIDATION_LAUNCH = {
  "model": "2026-10-07",
  "readAt": "2026-10-05",
  "bidsReadAt": "2026-10-07",
  "variant": {
    "kind": "colour",
    "label": "pink",
    "words": [
      "pink"
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
      "id": "set",
      "label": "160-tile 4-layer set",
      "sellingPrice": 229,
      "landedUnitCost": 50.41,
      "units": 50,
      "inventory": 2521,
      "conversion": {
        "market": 0.018337408312958436,
        "line": 0.01833180568285976,
        "rows": 31,
        "listings": 14,
        "clicks": 10593,
        "minRowClicks": 50,
        "from": "2026-09-27",
        "to": "2026-10-03"
      },
      "clicksNeeded": 1091,
      "passClicks": 1091,
      "adsDays": 52,
      "payout": 185.75,
      "moneyBack": 3715,
      "atMinimumClicks": false,
      "widened": true,
      "keywords": [
        {
          "keyword": "pink mahjong set",
          "monthlySearches": 2971,
          "organicRank": 7,
          "cpc": 0.38,
          "cpcFrom": "Amazon",
          "clicks": 202,
          "cost": 77
        },
        {
          "keyword": "mahjong set pink",
          "monthlySearches": 1858,
          "organicRank": 10,
          "cpc": 0.41,
          "cpcFrom": "Amazon",
          "clicks": 126,
          "cost": 52
        },
        {
          "keyword": "mahjong tiles pink",
          "monthlySearches": 1467,
          "organicRank": 2,
          "cpc": 0.35,
          "cpcFrom": "Amazon",
          "clicks": 100,
          "cost": 35
        },
        {
          "keyword": "pink mahjong tiles",
          "monthlySearches": 9744,
          "organicRank": 2,
          "cpc": 0.42,
          "cpcFrom": "Amazon",
          "clicks": 663,
          "cost": 278
        }
      ],
      "clicks": 1091,
      "clickShare": 0.034481071626489335,
      "ads": 442,
      "low": 3753,
      "high": 5383
    },
    {
      "id": "mat",
      "label": "3mm rubber mahjong mat",
      "sellingPrice": 44.7,
      "landedUnitCost": 8.73,
      "units": 50,
      "inventory": 437,
      "conversion": {
        "market": 0.07446808510638298,
        "line": 0.06666666666666667,
        "rows": 9,
        "listings": 3,
        "clicks": 2723,
        "minRowClicks": 50,
        "from": "2026-09-27",
        "to": "2026-10-03"
      },
      "clicksNeeded": 300,
      "passClicks": 269,
      "adsDays": 48,
      "payout": 26.96,
      "moneyBack": 539,
      "atMinimumClicks": true,
      "widened": false,
      "keywords": [
        {
          "keyword": "mahjong mat pink",
          "monthlySearches": 4821,
          "organicRank": 9,
          "cpc": 0.55,
          "cpcFrom": "Amazon",
          "clicks": 300,
          "cost": 165
        }
      ],
      "clicks": 300,
      "clickShare": 0.031546013966673586,
      "ads": 165,
      "low": 1392,
      "high": 3022
    }
  ],
  "together": {
    "inventory": 2958,
    "ads": 607,
    "setup": {
      "low": 790,
      "high": 2420
    },
    "low": 4355,
    "high": 5985,
    "moneyBack": 4254,
    "adsDays": 52
  }
};
