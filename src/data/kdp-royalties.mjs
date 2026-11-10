/**
 * Amazon KDP's US royalty and printing-cost rules, as data, plus the
 * arithmetic that applies them. Plain .mjs and JSX-free, so the calculator
 * page, the prerender, the page copy and scripts/check-kdp.mjs all run the
 * same numbers.
 *
 * 🚨 Every figure here was read off KDP's own help pages on 2026-11-10 (see
 * SOURCES), rendered with headless Chrome. Nothing is from memory or a
 * third-party mirror. If KDP changes a rate, change it here, change READ_ON,
 * and re-run scripts/check-kdp.mjs, which asserts KDP's own worked examples.
 *
 * Scope: the Amazon.com (US, USD) marketplace. eBook royalties are modelled for
 * US customers, who pay no VAT on the list price, so the VAT term is zero on
 * the page; `ebookRoyalty70` / `ebookRoyalty35` still take a VAT rate so the
 * checks can assert KDP's European worked examples with the same formula.
 *
 * What is deliberately NOT here:
 *  - the Kindle+ (Kindle Unlimited) per-page rate. KDP announces the monthly
 *    KDP Select Global Fund in dollars but not a per-page (KENP) rate; the rate
 *    is only shown inside each author's own reports. The page asks for it.
 *  - KDP Select All Stars bonuses, Kindle Countdown Deals and price matching;
 *  - eBook sales to customers outside the 70% territories (paid at 35%);
 *  - a minimum list price for Expanded Distribution (not stated on the pages
 *    read; the page only warns when the 40% royalty goes negative);
 *  - every marketplace other than Amazon.com, tax withholding and currency
 *    conversion.
 */

export const READ_ON = '2026-11-10';

export const SOURCES = {
  ebookRoyalties: {
    label: 'eBook Royalties',
    url: 'https://kdp.amazon.com/en_US/help/topic/G200644210',
    used: 'The 35% and 70% royalty options and their formulas; the 70% option applies only to customers in the 70% territories; public-domain books get 35% only.',
  },
  digitalPricing: {
    label: 'Digital Book Pricing Page (last updated April 21, 2026)',
    url: 'https://kdp.amazon.com/en_US/help/topic/G200634500',
    used: 'The 70% territory list (the United States is one), the Amazon.com delivery cost of $0.15/MB with a $0.01 minimum, rounding to 2 decimal places, the rule that a 70% eBook must be priced at least 20% below the physical edition, and the worked examples.',
  },
  ebookListPrice: {
    label: 'eBook List Price Requirements',
    url: 'https://kdp.amazon.com/en_US/help/topic/G200634560',
    used: 'The 70% band of $2.99 to $12.99 on Amazon.com (effective July 7, 2026, up from $9.99), and the 35% minimums by file size ($0.99 / $1.99 / $2.99) and $200 maximum.',
  },
  paperbackRoyalty: {
    label: 'Paperback Royalty',
    url: 'https://kdp.amazon.com/en_US/help/topic/G201834330',
    used: '50% royalty at list prices up to $9.98 and 60% from $9.99 on Amazon.com; 40% for Expanded Distribution; the $15 / 333-page worked example; the $250 maximum.',
  },
  paperbackPrinting: {
    label: 'Paperback Printing Cost',
    url: 'https://kdp.amazon.com/en_US/help/topic/G201834340',
    used: 'The Amazon.com fixed and per-page charges by ink, paper, page band and trim; the regular/large trim boundary; the minimum list price rule (printing cost ÷ royalty rate); the 300-page worked example.',
  },
  hardcoverRoyalty: {
    label: 'Hardcover Royalty',
    url: 'https://kdp.amazon.com/en_US/help/topic/G77F3WPD3KQLJTFS',
    used: 'The same 50% / 60% split at $9.98 / $9.99 on Amazon.com, and the $250 maximum.',
  },
  hardcoverPrinting: {
    label: 'Hardcover Printing Cost',
    url: 'https://kdp.amazon.com/en_US/help/topic/GHT976ZKSKUXBB6H',
    used: 'The Amazon.com hardcover charges (75 to 550 pages, black or premium color only) and the 300-page worked example.',
  },
  printPricing: {
    label: 'Print Book Pricing Page',
    url: 'https://kdp.amazon.com/en_US/help/topic/G8BKPU9AGVZSF9QF',
    used: 'No Expanded Distribution for hardcovers; rounding to 2 decimal places; the $9.99 and $9.98 worked examples; payment about 60 days after month end (90 for Expanded Distribution).',
  },
  kindlePlusRoyalties: {
    label: 'Royalties in Kindle+',
    url: 'https://kdp.amazon.com/en_US/help/topic/G201541130',
    used: 'Kindle+ (Kindle Unlimited) reads are paid from the KDP Select Global Fund by share of KENP read; the rate changes every month.',
  },
  kenp: {
    label: 'Kindle Edition Normalized Page (KENP)',
    url: 'https://kdp.amazon.com/en_US/help/topic/G5HHMLVVEW48MQYW',
    used: 'KENP rate = a marketplace\'s fund ÷ its total KENP read; announced near the 15th of the following month; 3,000 KENP cap per customer per title.',
  },
  fundSeptember2026: {
    label: 'KDP Select Global Fund and All Stars Bonus Update, September 2026 (KDP Community, Oct 15, 2026)',
    url: 'https://www.kdpcommunity.com/s/article/ka0at000000mDm9AAE?language=en_US',
    used: 'The latest announced fund: $65.9 million for September 2026 ($69.3 million with All Stars bonuses). No per-page rate is published.',
  },
};

/** The latest KDP Select Global Fund announcement, for the page copy. */
export const LATEST_FUND = { month: 'September 2026', fundMillions: 65.9, totalMillions: 69.3, announced: '2026-10-15' };

/* ── Rounding ──────────────────────────────────────────────────────────
   KDP rounds delivery costs, printing costs and royalties to 2 decimal
   places. The epsilon keeps 4.825 (stored as 4.82499…) rounding up. */
export const round2 = (n) => Math.round((n + Math.sign(n) * 1e-9) * 100) / 100;
const ceil2 = (n) => Math.ceil(n * 100 - 1e-9) / 100;
const finite = (n) => typeof n === 'number' && Number.isFinite(n);

/* ── eBooks (Amazon.com) ───────────────────────────────────────────── */

export const EBOOK = {
  rate35: 0.35,
  rate70: 0.7,
  /** The 70% option's list-price band on Amazon.com, effective 2026-07-07. */
  band70: { min: 2.99, max: 12.99 },
  /** Minimum list price at 35%, by file size. */
  min35: [
    { belowMb: 3, min: 0.99 },
    { belowMb: 10, min: 1.99 },
    { belowMb: Infinity, min: 2.99 },
  ],
  max35: 200,
  deliveryPerMb: 0.15,
  deliveryMin: 0.01,
  /** A 70% eBook must be listed at least 20% below the physical edition. */
  maxShareOfPrint: 0.8,
};

/** VAT included in a VAT-inclusive price: rate ÷ (1 + rate) × price. Not rounded (KDP's examples are not). */
export const vatIn = (price, vatRate = 0) => (vatRate > 0 ? (vatRate / (1 + vatRate)) * price : 0);

/** Delivery cost at 70%: MB × rate, rounded to the cent, never below the minimum. */
export function deliveryCost(fileMb, perMb = EBOOK.deliveryPerMb, min = EBOOK.deliveryMin) {
  if (!finite(fileMb) || fileMb <= 0) return min;
  return Math.max(min, round2(fileMb * perMb));
}

/** 35% royalty: 0.35 × (price − VAT). */
export const ebookRoyalty35 = ({ price, vatRate = 0 }) => round2(EBOOK.rate35 * (price - vatIn(price, vatRate)));

/** 70% royalty: 0.70 × (price − VAT − delivery). The formula only; eligibility is `ebook70Eligible`. */
export function ebookRoyalty70({ price, fileMb, vatRate = 0, perMb = EBOOK.deliveryPerMb, min = EBOOK.deliveryMin }) {
  return round2(EBOOK.rate70 * (price - vatIn(price, vatRate) - deliveryCost(fileMb, perMb, min)));
}

/** The lowest list price KDP accepts at 35% for a file of this size. */
export function ebookMin35(fileMb) {
  const mb = finite(fileMb) && fileMb > 0 ? fileMb : 0;
  return EBOOK.min35.find((b) => mb < b.belowMb).min;
}

/**
 * Whether the 70% option is open at this price. Reasons, not a boolean, so the
 * page can say why. `printPrice` is the lowest physical-edition list price, if any.
 */
export function ebook70Eligible(price, printPrice) {
  const reasons = [];
  if (!(price >= EBOOK.band70.min - 1e-9)) reasons.push('below-band');
  if (!(price <= EBOOK.band70.max + 1e-9)) reasons.push('above-band');
  if (finite(printPrice) && printPrice > 0 && price > round2(printPrice * EBOOK.maxShareOfPrint) + 1e-9) reasons.push('print-price');
  return reasons;
}

/**
 * Everything about one eBook price: both royalties, which applies, and where
 * the choice flips.
 *  - `fileFlipMb`: above this file size the 35% option pays more at this price
 *    (0.70 × (p − 0.15 × MB) < 0.35 × p ⟺ MB > p ÷ 0.30).
 *  - `match35At`: the 35% list price that earns what $12.99 earns at 70%,
 *    i.e. 2 × (12.99 − delivery); above $12.99 you need at least this.
 */
export function ebookQuote({ price, fileMb, option = '70', printPrice }) {
  const delivery = deliveryCost(fileMb);
  const r35 = ebookRoyalty35({ price });
  const r70 = ebookRoyalty70({ price, fileMb });
  const reasons = ebook70Eligible(price, printPrice);
  const eligible70 = reasons.length === 0;
  const uses70 = option === '70' && eligible70;
  const min35 = ebookMin35(fileMb);
  const flags = [];
  if (price < min35 - 1e-9) flags.push('below-min');
  if (price > EBOOK.max35 + 1e-9) flags.push('above-max');
  if (option === '70' && !eligible70) flags.push('fell-to-35');
  return {
    delivery,
    royalty35: r35,
    royalty70: eligible70 ? r70 : null,
    royalty: uses70 ? r70 : r35,
    rate: uses70 ? 0.7 : 0.35,
    eligible70,
    reasons,
    min35,
    fileFlipMb: price / (2 * EBOOK.deliveryPerMb),
    match35At: round2(2 * (EBOOK.band70.max - delivery)),
    royaltyAtBandMax: ebookRoyalty70({ price: EBOOK.band70.max, fileMb }),
    flags,
  };
}

/* ── Print (Amazon.com) ────────────────────────────────────────────── */

export const PRINT = {
  /** 50% at list prices up to $9.98, 60% from $9.99 (paperback and hardcover). */
  rateLow: 0.5,
  rateHigh: 0.6,
  highFrom: 9.99,
  expanded: 0.4,
  maxPrice: 250,
  /** Large trim: wider than 6.12 in (155.5 mm) or taller than 9 in (228.6 mm). */
  largeOver: { widthIn: 6.12, heightIn: 9 },
};

export const INKS = [
  { id: 'black', label: 'Black ink, white or cream paper' },
  { id: 'groundwood', label: 'Black ink, groundwood paper' },
  { id: 'standard', label: 'Standard color ink' },
  { id: 'premium', label: 'Premium color ink' },
];

/**
 * Amazon.com printing-cost bands. Within a band: fixed + pages × perPage, by
 * trim. `fixedOnlyTo`: up to this many pages only the flat charge applies.
 * A format/ink that is not here is not offered by KDP.
 */
export const PRINT_COSTS = {
  paperback: {
    black: {
      pages: [24, 828], fixedOnlyTo: 110,
      flat: { regular: 2.3, large: 2.84 },
      fixed: { regular: 1.0, large: 1.0 }, perPage: { regular: 0.012, large: 0.017 },
    },
    groundwood: {
      pages: [24, 828], fixedOnlyTo: 112,
      flat: { regular: 2.23, large: 2.75 },
      fixed: { regular: 1.0, large: 1.0 }, perPage: { regular: 0.0114, large: 0.0162 },
    },
    premium: {
      pages: [24, 828], fixedOnlyTo: 40,
      flat: { regular: 3.6, large: 4.2 },
      fixed: { regular: 1.0, large: 1.0 }, perPage: { regular: 0.065, large: 0.08 },
    },
    standard: {
      pages: [72, 600], fixedOnlyTo: 0,
      flat: null,
      fixed: { regular: 1.0, large: 1.0 }, perPage: { regular: 0.0255, large: 0.0402 },
    },
  },
  hardcover: {
    black: {
      pages: [75, 550], fixedOnlyTo: 108,
      flat: { regular: 6.8, large: 7.49 },
      fixed: { regular: 5.65, large: 5.65 }, perPage: { regular: 0.012, large: 0.017 },
    },
    premium: {
      pages: [75, 550], fixedOnlyTo: 0,
      flat: null,
      fixed: { regular: 5.65, large: 5.65 }, perPage: { regular: 0.065, large: 0.08 },
    },
  },
};

/** The royalty rate for a print list price on Amazon.com. */
export const printRate = (price) => (price >= PRINT.highFrom - 1e-9 ? PRINT.rateHigh : PRINT.rateLow);

/**
 * Printing cost on Amazon.com, or an error code: 'ink' (not offered for this
 * format), 'pages-low' / 'pages-high' (outside the band).
 */
export function printingCost({ format, ink, pages, trim }) {
  const spec = PRINT_COSTS[format]?.[ink];
  if (!spec) return { cost: null, error: 'ink' };
  if (!finite(pages) || pages < spec.pages[0]) return { cost: null, error: 'pages-low', range: spec.pages };
  if (pages > spec.pages[1]) return { cost: null, error: 'pages-high', range: spec.pages };
  const t = trim === 'large' ? 'large' : 'regular';
  if (spec.flat && pages <= spec.fixedOnlyTo) {
    return { cost: spec.flat[t], fixed: spec.flat[t], perPage: 0, flat: true, range: spec.pages };
  }
  return {
    cost: round2(spec.fixed[t] + pages * spec.perPage[t]),
    fixed: spec.fixed[t], perPage: spec.perPage[t], flat: false, range: spec.pages,
  };
}

/**
 * The lowest list price KDP accepts: printing cost ÷ royalty rate, with the
 * rate the resulting price would earn. Under $9.99 the rate is 50%, so the
 * floor is cost ÷ 0.5 when that lands at $9.98 or less; otherwise it is the
 * larger of $9.99 and cost ÷ 0.6. Rounded up to the cent.
 */
export function minPrintPrice(cost) {
  if (!finite(cost)) return null;
  const at50 = ceil2(cost / PRINT.rateLow);
  if (at50 <= PRINT.highFrom - 0.01 + 1e-9) return at50;
  return Math.max(PRINT.highFrom, ceil2(cost / PRINT.rateHigh));
}

/** Royalty on one print sale: rate × list price − printing cost. */
export const printRoyalty = (price, cost, rate = printRate(price)) => round2(rate * price - cost);

export function printQuote({ format, ink, pages, trim, price }) {
  const pc = printingCost({ format, ink, pages, trim });
  if (pc.cost == null) return { ...pc, royalty: null, expanded: null, rate: null, minPrice: null, flags: [] };
  const rate = printRate(price);
  const minPrice = minPrintPrice(pc.cost);
  const flags = [];
  if (price < minPrice - 1e-9) flags.push('below-min');
  if (price > PRINT.maxPrice + 1e-9) flags.push('above-max');
  const expanded = format === 'paperback' ? printRoyalty(price, pc.cost, PRINT.expanded) : null;
  if (expanded != null && expanded <= 0) flags.push('expanded-negative');
  return { ...pc, rate, royalty: printRoyalty(price, pc.cost, rate), expanded, minPrice, flags };
}

/* ── The whole book, by month ──────────────────────────────────────── */

/**
 * @param x {{
 *   ebook?: { price, fileMb, option, units, kenp, kenpRate },
 *   paperback?: { price, units, expandedUnits },
 *   hardcover?: { price, units },
 *   print: { pages, ink, trim },
 *   adSpend?: number, oneOff?: number,
 * }}
 * Omit a format to leave it out. `kenpRate` may be null (unknown): KU income is then null.
 */
export function calculate(x) {
  const n = (v) => (finite(v) && v > 0 ? v : 0);
  const out = { ebook: null, paperback: null, hardcover: null, ku: null };
  const printPrices = [x.paperback?.price, x.hardcover?.price].filter((p) => finite(p) && p > 0);
  const lowestPrint = printPrices.length ? Math.min(...printPrices) : undefined;

  let royalties = 0;
  let salesRevenue = 0;
  let salesRoyalties = 0;
  let units = 0;

  if (x.ebook && finite(x.ebook.price) && x.ebook.price > 0) {
    const q = ebookQuote({ price: x.ebook.price, fileMb: x.ebook.fileMb, option: x.ebook.option, printPrice: lowestPrint });
    const u = n(x.ebook.units);
    out.ebook = { ...q, units: u, monthly: q.royalty * u, beAcos: q.royalty / x.ebook.price };
    royalties += out.ebook.monthly; salesRoyalties += out.ebook.monthly; salesRevenue += x.ebook.price * u; units += u;
    const kenp = n(x.ebook.kenp);
    const rate = finite(x.ebook.kenpRate) && x.ebook.kenpRate > 0 ? x.ebook.kenpRate : null;
    out.ku = { kenp, rate, monthly: rate == null ? (kenp > 0 ? null : 0) : kenp * rate };
    if (out.ku.monthly != null) royalties += out.ku.monthly;
  }

  for (const format of ['paperback', 'hardcover']) {
    const f = x[format];
    if (!f || !finite(f.price) || f.price <= 0) continue;
    const q = printQuote({ format, ...x.print, price: f.price });
    const u = n(f.units);
    const ue = format === 'paperback' ? n(f.expandedUnits) : 0;
    if (q.royalty == null) { out[format] = { ...q, units: u, expandedUnits: ue, monthly: null, beAcos: null }; continue; }
    const monthly = q.royalty * u + (q.expanded ?? 0) * ue;
    out[format] = { ...q, units: u, expandedUnits: ue, monthly, beAcos: q.royalty / f.price };
    royalties += monthly;
    /* Ads on Amazon drive Amazon sales, not Expanded Distribution ones. */
    salesRoyalties += q.royalty * u; salesRevenue += f.price * u; units += u + ue;
  }

  const adSpend = n(x.adSpend);
  const oneOff = n(x.oneOff);
  const profit = royalties - adSpend;
  return {
    ...out,
    royalties,
    salesRevenue,
    units,
    adSpend,
    profit,
    /** Break-even ACOS across the Amazon sales: royalties ÷ sales at list price. */
    beAcos: salesRevenue > 0 ? salesRoyalties / salesRevenue : null,
    /** Ad spend as a share of Amazon sales at list price (a TACoS for books). */
    adShare: salesRevenue > 0 && adSpend > 0 ? adSpend / salesRevenue : null,
    oneOff,
    paybackMonths: oneOff > 0 && profit > 0 ? oneOff / profit : oneOff > 0 ? null : 0,
    kuMissingRate: out.ku != null && out.ku.kenp > 0 && out.ku.rate == null,
  };
}
