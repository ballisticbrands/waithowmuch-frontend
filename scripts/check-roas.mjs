/**
 * Fails the build if the ROAS calculator's arithmetic is wrong, if the worked
 * examples in its copy stop saying what the copy claims, or if a benchmark
 * disagrees with the profile it was read from.
 *
 * Cheap and offline, like check-fba-fees.mjs. Every expected value below is
 * worked by hand in the comment beside it, not taken from the code under test.
 */
import {
  calculate, preAdMargin, breakEvenRoas, breakEvenAcos, roasOf, acosOf, tacosOf, acosToRoas, roasToAcos,
} from '../src/data/roas.mjs';
import { roasBenchmarks, median } from '../src/data/roas-benchmarks.mjs';
import { EX_GOOD, EX_BAD, EX_CHEAP, EX_LOSS, RELATED } from '../src/data/roas-calculator-page.mjs';
import { publishedPosts, postPath } from '../src/data/content.mjs';

let failed = 0;
let checks = 0;
const fail = (msg) => { failed += 1; console.error(`check-roas: ${msg}`); };
const near = (name, got, want, tol = 1e-6) => {
  checks += 1;
  if (want === null ? got !== null : !(typeof got === 'number' && Math.abs(got - want) <= tol)) {
    fail(`${name}: got ${got}, want ${want}`);
  }
};
const is = (name, got, want) => { checks += 1; if (got !== want) fail(`${name}: got ${got}, want ${want}`); };

/* $30 price, $7.50 product, $10.50 fees → $12 left = 40% margin before ads.
   Break-even ROAS 1 / 0.4 = 2.5, break-even ACOS 40%.
   $1,000 of ads, $4,000 of ad sales: ROAS 4, ACOS 25%.
   Profit on ad sales: 4,000 × 0.4 − 1,000 = 600; per unit 30 × (0.40 − 0.25) = 4.50
   (and 600 ÷ (4,000 ÷ 30) = 4.50, the same thing two ways).
   $10,000 total: TACoS 10%; profit 10,000 × 0.4 − 1,000 = 3,000; per unit 30 × 0.3 = 9; margin 30%. */
near('good.m', EX_GOOD.m, 0.4);
near('good.beRoas', EX_GOOD.beRoas, 2.5);
near('good.beAcos', EX_GOOD.beAcos, 0.4);
near('good.roas', EX_GOOD.roas, 4);
near('good.acos', EX_GOOD.acos, 0.25);
near('good.profitAdSales', EX_GOOD.profitAdSales, 600);
near('good.profitPerAdUnit', EX_GOOD.profitPerAdUnit, 4.5);
near('good.profitPerAdUnit (two ways)', EX_GOOD.profitAdSales / EX_GOOD.adUnits, 4.5);
near('good.tacos', EX_GOOD.tacos, 0.1);
near('good.profitAll', EX_GOOD.profitAll, 3000);
near('good.profitPerUnitAll', EX_GOOD.profitPerUnitAll, 9);
near('good.marginAll', EX_GOOD.marginAll, 0.3);
near('good.maxSpend', EX_GOOD.maxSpend, 1600);
is('good.verdict', EX_GOOD.verdict, 'above');

/* Same product, $2,000 of ad sales: ROAS 2, ACOS 50%; 2,000 × 0.4 − 1,000 = −200;
   most it could have spent: 2,000 × 0.4 = 800. No total → no TACoS. */
near('bad.roas', EX_BAD.roas, 2);
near('bad.acos', EX_BAD.acos, 0.5);
near('bad.profitAdSales', EX_BAD.profitAdSales, -200);
near('bad.maxSpend', EX_BAD.maxSpend, 800);
near('bad.tacos', EX_BAD.tacos, null);
near('bad.profitAll', EX_BAD.profitAll, null);
is('bad.verdict', EX_BAD.verdict, 'below');

/* $22 price: (22 − 18) / 22 = 0.181818…; break-even ROAS 5.5;
   4,000 × 4/22 − 1,000 = −272.727… */
near('cheap.m', EX_CHEAP.m, 4 / 22);
near('cheap.beRoas', EX_CHEAP.beRoas, 5.5);
near('cheap.profitAdSales', EX_CHEAP.profitAdSales, 4000 * (4 / 22) - 1000);

/* $15 price, $15.50 of costs: margin −0.5/15; no break-even of either kind. */
near('loss.m', EX_LOSS.m, -0.5 / 15);
near('loss.beRoas', EX_LOSS.beRoas, null);
near('loss.beAcos', EX_LOSS.beAcos, null);
near('loss.preAdProfit', EX_LOSS.preAdProfit, -0.5);
is('loss.verdict', EX_LOSS.verdict, 'no-margin');

/* Exactly zero margin: still no break-even (1 / 0 is not a ROAS). */
const zero = calculate({ price: 20, productCost: 8, fees: 12, adSpend: 100, adSales: 500 });
near('zero.m', zero.m, 0);
near('zero.beRoas', zero.beRoas, null);
is('zero.verdict', zero.verdict, 'no-margin');

/* At break-even the ad-driven sales make exactly nothing: 2.5 ROAS on 40%. */
const at = calculate({ price: 30, productCost: 7.5, fees: 10.5, adSpend: 1000, adSales: 2500 });
near('at.profitAdSales', at.profitAdSales, 0);
near('at.profitPerAdUnit', at.profitPerAdUnit, 0);
is('at.verdict', at.verdict, 'at');

/* No spend: no ROAS, no ACOS of note, but break-even still shows. */
const none = calculate({ price: 30, productCost: 7.5, fees: 10.5, adSpend: 0, adSales: 0 });
near('none.roas', none.roas, null);
near('none.acos', none.acos, null);
near('none.beRoas', none.beRoas, 2.5);
is('none.verdict', none.verdict, 'no-spend');

/* Spend with no sales: ROAS 0, ACOS undefined, the whole spend lost. */
const dud = calculate({ price: 30, productCost: 7.5, fees: 10.5, adSpend: 250, adSales: 0 });
near('dud.roas', dud.roas, 0);
near('dud.acos', dud.acos, null);
near('dud.profitAdSales', dud.profitAdSales, -250);
is('dud.verdict', dud.verdict, 'no-sales');

/* A total below the ad sales is flagged, not silently used. */
const odd = calculate({ price: 30, productCost: 7.5, fees: 10.5, adSpend: 100, adSales: 1000, totalSales: 500 });
is('odd.flag', odd.flags.includes('total-below-ad-sales'), true);

/* Identities, over a grid of inputs: ACOS = 1 / ROAS, BE ACOS = 1 / BE ROAS,
   and profit on ad sales = units × per-unit profit. */
for (const price of [5, 19.99, 30, 249]) {
  for (const costShare of [0.1, 0.45, 0.8]) {
    for (const [spend, sales] of [[50, 75], [1000, 4000], [333.33, 2900]]) {
      const r = calculate({ price, productCost: price * costShare * 0.5, fees: price * costShare * 0.5, adSpend: spend, adSales: sales, totalSales: sales * 2.5 });
      const tag = `${price}/${costShare}/${spend}/${sales}`;
      near(`acos=1/roas ${tag}`, r.acos * r.roas, 1, 1e-9);
      near(`beAcos=1/beRoas ${tag}`, r.beAcos * r.beRoas, 1, 1e-9);
      near(`m ${tag}`, r.m, 1 - costShare, 1e-9);
      near(`unit×units ${tag}`, r.profitPerAdUnit * r.adUnits, r.profitAdSales, 1e-6);
      near(`allUnit×units ${tag}`, r.profitPerUnitAll * r.totalUnits, r.profitAll, 1e-6);
      near(`tacos<acos ${tag}`, r.tacos < r.acos ? 1 : 0, 1);
    }
  }
}
near('acosToRoas(0.25)', acosToRoas(0.25), 4);
near('roasToAcos(5)', roasToAcos(5), 0.2);
near('acosToRoas(0)', acosToRoas(0), null);
near('preAdMargin no price', preAdMargin({ price: 0 }), null);
near('breakEvenRoas(-0.1)', breakEvenRoas(-0.1), null);
near('breakEvenAcos(0.3)', breakEvenAcos(0.3), 0.3);
near('roasOf(500,0)', roasOf(500, 0), null);
near('acosOf(100,0)', acosOf(100, 0), null);
near('tacosOf(100,undefined)', tacosOf(100, undefined), null);
near('median odd', median([3, 1, 2]), 2);
near('median even', median([4, 1, 3, 2]), 2.5);

/* Benchmarks: each one's numbers must add up, and there must be some. */
const bench = roasBenchmarks();
if (bench.length < 5) fail(`only ${bench.length} benchmarks (expected the published profiles' margins)`);
for (const b of bench) {
  near(`${b.slug} pre = after + ads`, b.preAdPct, b.marginPct + b.adPct, 1e-9);
  if (b.preAdPct > 0) near(`${b.slug} beRoas × pre`, b.beRoas * b.preAdPct, 100, 1e-9);
  near(`${b.slug} costs add up`, (b.productCost + b.fees + b.otherCosts) / b.price, 1 - b.preAdPct / 100, 1e-3);
  if (!(b.adPct >= 0 && b.adPct < 100)) fail(`${b.slug}: ad share ${b.adPct}% is out of range`);
}

/* Related reading must not link to a draft post (a 404 in production). */
const live = new Set(publishedPosts().map((p) => postPath(p.slug)));
for (const r of RELATED) if (r.href.startsWith('/blog/') && !live.has(r.href)) fail(`related link ${r.href} is not a published post`);

if (failed) process.exit(1);
console.log(`check-roas: ${checks} checks agree, ${bench.length} benchmarks add up`);
