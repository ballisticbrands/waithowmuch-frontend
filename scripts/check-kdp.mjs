/**
 * Fails the build if the KDP royalty calculator disagrees with KDP's own
 * worked examples (src/data/kdp-royalties.mjs → SOURCES, read 2026-11-10), or
 * with the hand-worked cases below, or if the page copy stops saying what the
 * arithmetic says.
 *
 * Cheap and offline, like check-fba-fees.mjs and check-roas.mjs. Every expected
 * value is either quoted from a KDP help page (named beside it) or worked by
 * hand in the comment beside it, never taken from the code under test.
 */
import {
  ebookRoyalty35, ebookRoyalty70, deliveryCost, ebookMin35, ebook70Eligible, ebookQuote,
  printingCost, printRate, printRoyalty, minPrintPrice, printQuote, calculate, quoteAt, royaltyCurve,
} from '../src/data/kdp-royalties.mjs';
import { EX, RELATED, ASSUMED_FILE_MB } from '../src/data/kdp-calculator-page.mjs';
import { publishedPosts, postPath } from '../src/data/content.mjs';

let failed = 0;
let checks = 0;
const fail = (msg) => { failed += 1; console.error(`check-kdp: ${msg}`); };
const near = (name, got, want, tol = 1e-9) => {
  checks += 1;
  if (want === null ? got !== null : !(typeof got === 'number' && Math.abs(got - want) <= tol)) fail(`${name}: got ${got}, want ${want}`);
};
const is = (name, got, want) => { checks += 1; if (got !== want) fail(`${name}: got ${got}, want ${want}`); };

/* ── KDP's own worked examples ─────────────────────────────────────── */

/* eBook Royalties / Digital Book Pricing Page, 35%: $0.99 →
   0.35 × ($0.99 − $0.00) = $0.35; at 20% VAT 0.35 × ($0.99 − $0.165) = $0.29. */
near('kdp ebook 35% no VAT', ebookRoyalty35({ price: 0.99 }), 0.35);
near('kdp ebook 35% 20% VAT', ebookRoyalty35({ price: 0.99, vatRate: 0.2 }), 0.29);
/* eBook Royalties, 70%, Spain: €1.99, €0.10/MB, 1 MB, 4% VAT →
   0.70 × (€1.99 − €0.08 − €0.10) = €1.27. */
near('kdp ebook 70% Spain', ebookRoyalty70({ price: 1.99, fileMb: 1, vatRate: 0.04, perMb: 0.1 }), 1.27);
/* Digital Book Pricing Page, 70%, Germany: €2.99, €0.12/MB, 1 MB, 7% VAT →
   0.70 × (€2.99 − €0.20 − €0.12) = €1.87; price-matched to €2.59 → €1.61. */
near('kdp ebook 70% Germany', ebookRoyalty70({ price: 2.99, fileMb: 1, vatRate: 0.07, perMb: 0.12 }), 1.87);
near('kdp ebook 70% Germany matched', ebookRoyalty70({ price: 2.59, fileMb: 1, vatRate: 0.07, perMb: 0.12 }), 1.61);
/* Digital Book Pricing Page, 70% promotional, US: $1.99, $0.15/MB, 1 MB →
   0.70 × ($1.99 − $0.00 − $0.15) = $1.29; at 20% VAT ($0.33) → $1.06. */
near('kdp ebook 70% US promo', ebookRoyalty70({ price: 1.99, fileMb: 1 }), 1.29);
near('kdp ebook 70% US promo 20% VAT', ebookRoyalty70({ price: 1.99, fileMb: 1, vatRate: 0.2 }), 1.06);

/* Paperback Printing Cost, example #1: 300-page black, regular trim, US →
   1.00 + 300 × 0.012 = 4.60. */
near('kdp paperback 300pp cost', printingCost({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular' }).cost, 4.6);
/* Paperback Royalty: $15, 333-page black regular US → 0.60 × 15 − 5.00 = 4.00;
   Expanded Distribution 0.40 × 15 − 5.00 = 1.00. */
const pb333 = printQuote({ format: 'paperback', ink: 'black', pages: 333, trim: 'regular', price: 15 });
near('kdp paperback 333pp cost', pb333.cost, 5.0);
near('kdp paperback $15 royalty', pb333.royalty, 4.0);
near('kdp paperback $15 expanded', pb333.expanded, 1.0);
/* Print Book Pricing Page: 300-page black US paperback at $9.99 →
   (0.60 × 9.99) − 4.60 = 1.39; at $9.98 → (0.50 × 9.98) − 4.60 = 0.39. */
near('kdp paperback $9.99', printQuote({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular', price: 9.99 }).royalty, 1.39);
near('kdp paperback $9.98', printQuote({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular', price: 9.98 }).royalty, 0.39);
/* Hardcover Printing Cost: 300-page black regular US → 5.65 + 300 × 0.012 = 9.25. */
near('kdp hardcover 300pp cost', printingCost({ format: 'hardcover', ink: 'black', pages: 300, trim: 'regular' }).cost, 9.25);

/* ── Hand-worked cases ─────────────────────────────────────────────── */

/* Bands. Black paperback: 24–110 pages flat $2.30 regular / $2.84 large;
   112 pages: 1.00 + 112 × 0.012 = 2.344 → 2.34; large 1.00 + 112 × 0.017 = 2.904 → 2.90. */
near('pb black 24 flat', printingCost({ format: 'paperback', ink: 'black', pages: 24, trim: 'regular' }).cost, 2.3);
near('pb black 110 flat', printingCost({ format: 'paperback', ink: 'black', pages: 110, trim: 'regular' }).cost, 2.3);
near('pb black 110 large flat', printingCost({ format: 'paperback', ink: 'black', pages: 110, trim: 'large' }).cost, 2.84);
near('pb black 112', printingCost({ format: 'paperback', ink: 'black', pages: 112, trim: 'regular' }).cost, 2.34);
near('pb black 112 large', printingCost({ format: 'paperback', ink: 'black', pages: 112, trim: 'large' }).cost, 2.9);
/* Black large 300: 1.00 + 300 × 0.017 = 6.10. */
near('pb black 300 large', printingCost({ format: 'paperback', ink: 'black', pages: 300, trim: 'large' }).cost, 6.1);
/* Groundwood: 112 flat 2.23; 200 pages 1.00 + 200 × 0.0114 = 3.28. */
near('pb groundwood 112', printingCost({ format: 'paperback', ink: 'groundwood', pages: 112, trim: 'regular' }).cost, 2.23);
near('pb groundwood 200', printingCost({ format: 'paperback', ink: 'groundwood', pages: 200, trim: 'regular' }).cost, 3.28);
/* Premium colour: 40 pages flat 3.60 / 4.20; 42 pages 1.00 + 42 × 0.065 = 3.73;
   large 100 pages 1.00 + 100 × 0.08 = 9.00. */
near('pb premium 40', printingCost({ format: 'paperback', ink: 'premium', pages: 40, trim: 'regular' }).cost, 3.6);
near('pb premium 40 large', printingCost({ format: 'paperback', ink: 'premium', pages: 40, trim: 'large' }).cost, 4.2);
near('pb premium 42', printingCost({ format: 'paperback', ink: 'premium', pages: 42, trim: 'regular' }).cost, 3.73);
near('pb premium 100 large', printingCost({ format: 'paperback', ink: 'premium', pages: 100, trim: 'large' }).cost, 9.0);
/* Standard colour, 72–600 only: 150 pages 1.00 + 150 × 0.0255 = 4.825 → 4.83 (KDP rounds to the cent);
   large 150: 1.00 + 150 × 0.0402 = 7.03. 70 pages: not offered. */
near('pb standard 150', printingCost({ format: 'paperback', ink: 'standard', pages: 150, trim: 'regular' }).cost, 4.83);
near('pb standard 150 large', printingCost({ format: 'paperback', ink: 'standard', pages: 150, trim: 'large' }).cost, 7.03);
is('pb standard 70', printingCost({ format: 'paperback', ink: 'standard', pages: 70, trim: 'regular' }).error, 'pages-low');
is('pb black 830', printingCost({ format: 'paperback', ink: 'black', pages: 830, trim: 'regular' }).error, 'pages-high');
/* Hardcover: 75–108 flat 6.80 / 7.49; premium 200 pages 5.65 + 200 × 0.065 = 18.65;
   no standard colour or groundwood; 552 pages too many. */
near('hc black 100', printingCost({ format: 'hardcover', ink: 'black', pages: 100, trim: 'regular' }).cost, 6.8);
near('hc black 100 large', printingCost({ format: 'hardcover', ink: 'black', pages: 100, trim: 'large' }).cost, 7.49);
near('hc premium 200', printingCost({ format: 'hardcover', ink: 'premium', pages: 200, trim: 'regular' }).cost, 18.65);
is('hc standard', printingCost({ format: 'hardcover', ink: 'standard', pages: 200, trim: 'regular' }).error, 'ink');
is('hc groundwood', printingCost({ format: 'hardcover', ink: 'groundwood', pages: 200, trim: 'regular' }).error, 'ink');
is('hc 552', printingCost({ format: 'hardcover', ink: 'black', pages: 552, trim: 'regular' }).error, 'pages-high');
is('hc 74', printingCost({ format: 'hardcover', ink: 'black', pages: 74, trim: 'regular' }).error, 'pages-low');

/* Royalty rate switch at $9.99. */
near('rate 9.98', printRate(9.98), 0.5);
near('rate 9.99', printRate(9.99), 0.6);

/* Minimum list price (printing cost ÷ royalty rate):
   300 pp black: 4.60 ÷ 0.5 = 9.20 (≤ 9.98, so the 50% floor).
   400 pp black: 5.80 ÷ 0.5 = 11.60 > 9.98, and 5.80 ÷ 0.6 = 9.67 < 9.99 → 9.99.
   600 pp black: 8.20 ÷ 0.6 = 13.666… → 13.67.
   110 pp black: 2.30 ÷ 0.5 = 4.60.  Hardcover 300 pp: 9.25 ÷ 0.6 = 15.416… → 15.42. */
near('min 300', minPrintPrice(4.6), 9.2);
near('min 400', minPrintPrice(5.8), 9.99);
near('min 600', minPrintPrice(8.2), 13.67);
near('min 110', minPrintPrice(2.3), 4.6);
near('min hc 300', minPrintPrice(9.25), 15.42);
/* At the minimum the royalty is never negative. */
for (const c of [2.3, 4.6, 5.8, 8.2, 9.25, 4.83, 19.99, 4.99, 5.99]) {
  const p = minPrintPrice(c);
  checks += 1;
  if (printRoyalty(p, c) < 0) fail(`royalty at min price ${p} for cost ${c} is negative`);
  checks += 1;
  if (printRoyalty(Math.round((p - 0.01) * 100) / 100, c) >= 0.005) fail(`a cent below the min price ${p} (cost ${c}) still earns`);
}

/* eBooks, US. Delivery: 0.15 × MB to the cent, $0.01 minimum.
   2 MB → 0.30; 0.05 MB → 0.0075 → 0.01 (minimum); 0.333 MB → 0.04995 → 0.05. */
near('delivery 2MB', deliveryCost(2), 0.3);
near('delivery tiny', deliveryCost(0.05), 0.01);
near('delivery 0.333', deliveryCost(0.333), 0.05);
/* $4.99, 2 MB: 70% → 0.70 × (4.99 − 0.30) = 3.283 → 3.28; 35% → 1.7465 → 1.75. */
const e = ebookQuote({ price: 4.99, fileMb: 2, option: '70' });
near('ebook 4.99 70', e.royalty, 3.28);
near('ebook 4.99 35', e.royalty35, 1.75);
/* The 35% price that matches $12.99 at 70% with 2 MB: 2 × (12.99 − 0.30) = 25.38. */
near('ebook match35At', e.match35At, 25.38);
/* File size where 35% wins at $4.99: 4.99 ÷ 0.30 = 16.633 MB. */
near('ebook fileFlip', e.fileFlipMb, 4.99 / 0.3);
/* At that size the two are equal before rounding: 0.70 × (4.99 − 2.495) = 1.7465 = 0.35 × 4.99. */
near('ebook flip equal', 0.7 * (4.99 - 0.15 * e.fileFlipMb), 0.35 * 4.99, 1e-9);
/* Band: $2.99 and $12.99 are in, $2.98 and $13.00 are out; at $15 with a $14.99 paperback, 20% rule (max 11.99). */
is('band 2.99', ebook70Eligible(2.99).length, 0);
is('band 12.99', ebook70Eligible(12.99).length, 0);
is('band 2.98', ebook70Eligible(2.98)[0], 'below-band');
is('band 13', ebook70Eligible(13)[0], 'above-band');
is('band 20% rule', ebook70Eligible(12.0, 14.99)[0], 'print-price');
is('band 20% ok', ebook70Eligible(11.99, 14.99).length, 0);
/* Out of band, a 70% choice falls back to 35%: $14.99 → 0.35 × 14.99 = 5.2465 → 5.25. */
const hi = ebookQuote({ price: 14.99, fileMb: 1, option: '70' });
near('ebook 14.99 falls to 35', hi.royalty, 5.25);
is('ebook 14.99 flag', hi.flags.includes('fell-to-35'), true);
/* 35% minimums by file size. */
near('min35 1MB', ebookMin35(1), 0.99);
near('min35 3MB', ebookMin35(3), 1.99);
near('min35 10MB', ebookMin35(10), 2.99);

/* ── The page's example, end to end ───────────────────────────────── */
/* eBook $4.99, 2 MB, 70%, 100 a month → 328.00.
   Paperback $14.99, 300 pp black regular: 0.60 × 14.99 − 4.60 = 4.394 → 4.39; 40 a month → 175.60.
   Hardcover $24.99, 300 pp: 0.60 × 24.99 − 9.25 = 5.744 → 5.74; 10 a month → 57.40.
   20,000 KENP at a $0.004 rate (a hand-picked test value, not a KDP figure) → 80.00.
   Royalties 328 + 175.60 + 57.40 + 80 = 641.00; ads 150 → profit 491.00.
   Amazon sales at list: 499 + 599.60 + 249.90 = 1,348.50; sales royalties 561.00 → break-even ACOS 41.60…%.
   One-off 900 → 900 ÷ 491 = 1.833 months. */
const r = calculate({
  ebook: { price: 4.99, fileMb: 2, option: '70', units: 100, kenp: 20000, kenpRate: 0.004 },
  paperback: { price: 14.99, units: 40, expandedUnits: 0 },
  hardcover: { price: 24.99, units: 10 },
  print: { pages: 300, ink: 'black', trim: 'regular' },
  adSpend: 150, oneOff: 900,
});
near('ex ebook monthly', r.ebook.monthly, 328, 1e-6);
near('ex paperback royalty', r.paperback.royalty, 4.39);
near('ex paperback monthly', r.paperback.monthly, 175.6, 1e-6);
near('ex hardcover royalty', r.hardcover.royalty, 5.74);
near('ex hardcover monthly', r.hardcover.monthly, 57.4, 1e-6);
near('ex ku', r.ku.monthly, 80, 1e-6);
near('ex royalties', r.royalties, 641, 1e-6);
near('ex profit', r.profit, 491, 1e-6);
near('ex beAcos', r.beAcos, 561 / 1348.5, 1e-9);
near('ex payback', r.paybackMonths, 900 / 491, 1e-9);
/* No KENP rate: KU unknown, flagged, and left out of the total (641 − 80 = 561). */
const noRate = calculate({
  ebook: { price: 4.99, fileMb: 2, option: '70', units: 100, kenp: 20000, kenpRate: null },
  paperback: { price: 14.99, units: 40, expandedUnits: 0 },
  hardcover: { price: 24.99, units: 10 },
  print: { pages: 300, ink: 'black', trim: 'regular' },
});
is('noRate flag', noRate.kuMissingRate, true);
near('noRate ku', noRate.ku.monthly, null);
near('noRate royalties', noRate.royalties, 561, 1e-6);
/* Losing month: profit ≤ 0 → no payback. */
const loss = calculate({ ebook: { price: 2.99, fileMb: 1, option: '70', units: 10, kenp: 0, kenpRate: null }, print: { pages: 300, ink: 'black', trim: 'regular' }, adSpend: 500, oneOff: 300 });
near('loss payback', loss.paybackMonths, null);
/* Expanded Distribution units count at 40%: 10 × 1.00 on the $15 / 333 pp book. */
const ed = calculate({ paperback: { price: 15, units: 0, expandedUnits: 10 }, print: { pages: 333, ink: 'black', trim: 'regular' } });
near('ed monthly', ed.paperback.monthly, 10, 1e-6);

/* A format can print in its own ink: a premium-color hardcover beside a
   black-ink paperback. 300 pp hardcover premium: 5.65 + 300 × 0.065 = 25.15;
   at $49.99: 0.60 × 49.99 − 25.15 = 4.844 → 4.84. The paperback keeps black ($4.39). */
const mixed = calculate({
  paperback: { price: 14.99, units: 1, expandedUnits: 0 },
  hardcover: { price: 49.99, units: 1, ink: 'premium' },
  print: { pages: 300, ink: 'black', trim: 'regular' },
});
near('mixed ink hardcover cost', mixed.hardcover.cost, 25.15);
near('mixed ink hardcover royalty', mixed.hardcover.royalty, 4.84);
near('mixed ink paperback royalty', mixed.paperback.royalty, 4.39);

/* The copy's example is the same book. */
near('copy EX paperback', EX.result.paperback.royalty, 4.39);
near('copy EX ebook', EX.result.ebook.royalty, 3.28);

/* ── One format at one price (the slider, the pie and the curve) ───── */

/* The split always closes: royalty + cost + Amazon's share = list price. */
const sums = (name, q) => near(`${name} split sums`, Math.round((q.split.royalty + q.split.cost + q.split.amazon) * 100), Math.round(q.price * 100));
/* Print Book Pricing Page, $9.99 / 300 pp: royalty 1.39, printing 4.60, so
   Amazon keeps 9.99 − 1.39 − 4.60 = 4.00 (0.40 × 9.99 = 3.996). */
const s999 = quoteAt({ format: 'paperback', price: 9.99, ink: 'black', pages: 300, trim: 'regular' });
near('split $9.99 royalty', s999.split.royalty, 1.39);
near('split $9.99 printing', s999.split.cost, 4.6);
near('split $9.99 amazon', s999.split.amazon, 4.0);
near('split $9.99 rate', s999.rate, 0.6);
near('split $9.99 min', s999.minPrice, 9.2);
sums('pb $9.99', s999);
/* $9.98: 0.50 × 9.98 − 4.60 = 0.39; Amazon 9.98 − 0.39 − 4.60 = 4.99. */
const s998 = quoteAt({ format: 'paperback', price: 9.98, ink: 'black', pages: 300, trim: 'regular' });
near('split $9.98 royalty', s998.split.royalty, 0.39);
near('split $9.98 amazon', s998.split.amazon, 4.99);
sums('pb $9.98', s998);
/* eBook $4.99, 2 MB, 70%: royalty 3.28, delivery 0.30, Amazon 4.99 − 3.28 − 0.30 = 1.41. */
const e499 = quoteAt({ format: 'ebook', price: 4.99, fileMb: 2, option: '70' });
near('split ebook royalty', e499.split.royalty, 3.28);
near('split ebook delivery', e499.split.cost, 0.3);
near('split ebook amazon', e499.split.amazon, 1.41);
sums('ebook $4.99', e499);
/* eBook $14.99 is 35% only, with no delivery cost: 0.35 × 14.99 = 5.2465 → 5.25; Amazon 9.74. */
const e1499 = quoteAt({ format: 'ebook', price: 14.99, fileMb: 2, option: '70' });
near('split ebook 35% rate', e1499.rate, 0.35);
near('split ebook 35% cost', e1499.split.cost, 0);
near('split ebook 35% royalty', e1499.split.royalty, 5.25);
near('split ebook 35% amazon', e1499.split.amazon, 9.74);
sums('ebook $14.99', e1499);
/* Hardcover $24.99 / 300 pp: 0.60 × 24.99 − 9.25 = 5.744 → 5.74; Amazon 24.99 − 5.74 − 9.25 = 10.00. */
const h2499 = quoteAt({ format: 'hardcover', price: 24.99, ink: 'black', pages: 300, trim: 'regular' });
near('split hc royalty', h2499.split.royalty, 5.74);
near('split hc amazon', h2499.split.amazon, 10.0);
sums('hc $24.99', h2499);
/* Below the minimum the royalty goes negative and the split still closes:
   $5.00 / 300 pp → 0.50 × 5 − 4.60 = −2.10. */
const sNeg = quoteAt({ format: 'paperback', price: 5, ink: 'black', pages: 300, trim: 'regular' });
near('split below-min royalty', sNeg.split.royalty, -2.1);
sums('pb $5', sNeg);
/* Hardcover groundwood is not offered: no quote. */
is('quoteAt not offered', quoteAt({ format: 'hardcover', price: 20, ink: 'groundwood', pages: 300, trim: 'regular' }), null);
is('quoteAt no price', quoteAt({ format: 'ebook', price: 0, fileMb: 2 }), null);

/* The curve carries both sides of every threshold, so the jumps show. */
const cPb = royaltyCurve({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular', from: 4.99, to: 20.99 });
const at = (c, p) => c.find((x) => Math.abs(x.price - p) < 1e-9);
near('curve pb $9.98', at(cPb, 9.98)?.royalty, 0.39);
near('curve pb $9.99', at(cPb, 9.99)?.royalty, 1.39);
near('curve pb min point', at(cPb, 9.2)?.royalty, 0.0);
near('curve pb first', cPb[0].price, 4.99);
near('curve pb last', cPb[cPb.length - 1].price, 20.99);
is('curve pb sorted', cPb.every((x, i) => i === 0 || x.price > cPb[i - 1].price), true);
/* Within one rate the royalty only rises with price. */
is('curve pb rises within a rate', cPb.every((x, i) => i === 0 || x.rate !== cPb[i - 1].rate || x.royalty >= cPb[i - 1].royalty), true);
const cEb = royaltyCurve({ format: 'ebook', fileMb: 2, option: '70', from: 0.99, to: 24.99 });
/* $2.98 → 35%: 1.043 → 1.04; $2.99 → 70%: 0.70 × 2.69 = 1.883 → 1.88. */
near('curve ebook $2.98', at(cEb, 2.98)?.royalty, 1.04);
near('curve ebook $2.99', at(cEb, 2.99)?.royalty, 1.88);
/* $12.99 → 0.70 × 12.69 = 8.883 → 8.88; $13.00 → 0.35 × 13 = 4.55. */
near('curve ebook $12.99', at(cEb, 12.99)?.royalty, 8.88);
near('curve ebook $13.00', at(cEb, 13)?.royalty, 4.55);
is('curve not offered', royaltyCurve({ format: 'hardcover', ink: 'standard', pages: 300, trim: 'regular', from: 5, to: 30 }).length, 0);

/* The default the page assumes for the eBook file (no file-size question up
   front) is the copy's example file, so the calculator opens on the lede's figure. */
near('assumed file MB', ASSUMED_FILE_MB, EX.input.ebook.fileMb);
near('assumed delivery', deliveryCost(ASSUMED_FILE_MB), 0.3);

/* Related reading must not link to a draft post. */
const live = new Set(publishedPosts().map((p) => postPath(p.slug)));
for (const l of RELATED) if (l.href.startsWith('/blog/') && !live.has(l.href)) fail(`related link ${l.href} is not a published post`);

if (failed) process.exit(1);
console.log(`check-kdp: ${checks} checks agree with KDP's examples and the hand-worked cases`);
