/**
 * Amazon's US FBA fee schedule for 2026, as data, plus the arithmetic that
 * applies it. Plain .mjs and JSX-free, so the prerender, the calculator page
 * and any post can import the same numbers: a blog post quoting a fee and the
 * calculator computing it cannot disagree.
 *
 * 🚨 Every figure here was read off Amazon's own US pages on 2026-11-10 (see
 * SOURCES). Nothing is from memory or a third-party mirror. If Amazon changes a
 * rate, change it here, change READ_ON, and re-run the checks in the PR that
 * introduced this file (Amazon's own worked examples are in EXAMPLES below).
 *
 * What is deliberately NOT here, because it could not be read off a first-party
 * page or it depends on the seller's account rather than the product:
 *  - the Overmax handling fee (2026) and the flat-product / overhang handling
 *    fees (2027) — flagged by `handlingFlags`, never added to a total;
 *  - the storage utilisation surcharge and aged-inventory rates (both depend on
 *    the seller's whole inventory, not on one product);
 *  - inbound placement, low-inventory-level, returns processing, removal and
 *    disposal fees, the lithium-battery fee and SIPP discounts.
 */

export const READ_ON = '2026-11-10';

/** The fuel and logistics-related surcharge, a percentage of the fulfilment
 *  fee. Not included in Amazon's published rate tables; applied on top. */
export const SURCHARGE = { rate: 0.035, since: '2026-04-17' };

export const SOURCES = {
  fbaRates: {
    label: '2027 US FBA fulfillment fee changes (2026 non-peak, 2026 peak and 2027 rate cards)',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GABBX6GZPA8MSZGW',
  },
  fbaFee: {
    label: 'FBA fulfillment fee (fuel and logistics surcharge, peak dates)',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GPDC3KPYAGDTVDJP',
  },
  lowPrice: {
    label: 'Low-Price FBA fulfillment fees',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GMUTB89XM7AATPR3',
  },
  sizeTiers: {
    label: 'Product size tiers',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W',
  },
  shippingWeight: {
    label: 'Shipping weight and dimensional weight',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GEVWP48HPBLEFJEY',
  },
  referral: {
    label: 'Referral fees',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GTG4BAWSY39Z98Z3',
  },
  closingFee: {
    label: 'Selling fees (media closing fee)',
    url: 'https://sell.amazon.com/pricing',
  },
  storage: {
    label: 'Monthly inventory storage fees',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/G3EDYEF6KUCFQTNM',
  },
  unifiedStorage: {
    label: 'Unified monthly storage fee (from 1 February 2027)',
    url: 'https://sellercentral.amazon.com/help/hub/reference/external/GVZX6EAEL2KZ3SGA',
  },
};

/**
 * The three fulfilment-fee periods Amazon publishes. Index order matters: it
 * is the column order of every fee table below.
 */
export const PERIODS = [
  { id: 'nonpeak-2026', label: '2026 non-peak', from: '2026-01-15', to: '2026-10-14' },
  { id: 'peak-2026', label: '2026 holiday peak', from: '2026-10-15', to: '2027-01-14' },
  { id: 'nonpeak-2027', label: '2027 non-peak', from: '2027-01-15', to: '2027-10-14' },
];

/** The period in force on an ISO date (YYYY-MM-DD). Before the first period
 *  starts or after the last ends, the nearest one. */
export function periodFor(isoDate) {
  const d = String(isoDate).slice(0, 10);
  const i = PERIODS.findIndex((p) => d >= p.from && d <= p.to);
  if (i !== -1) return PERIODS[i].id;
  return d < PERIODS[0].from ? PERIODS[0].id : PERIODS[PERIODS.length - 1].id;
}

/* ── Standard-size rates ─────────────────────────────────────────────────
   Each row: [weight band, 2026 non-peak, 2026 peak, 2027 non-peak], and each
   of those is [<$10, $10–$50, >$50]. The first eight rows are small standard
   (by ounce), the next twelve large standard. Above 3 lb (large standard
   only): base plus `step` per `everyLb` interval, or part of one. */
const SMALL_MAX_OZ = [2, 4, 6, 8, 10, 12, 14, 16];
const LARGE_MAX_OZ = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

export const STANDARD = {
  core: {
    rows: [
      ['2 oz or less', [2.43, 3.32, 3.58], [2.62, 3.51, 3.77], [2.64, 3.75, 4.31]],
      ['2+ to 4 oz', [2.49, 3.42, 3.68], [2.68, 3.61, 3.87], [2.72, 3.78, 4.34]],
      ['4+ to 6 oz', [2.56, 3.45, 3.71], [2.76, 3.65, 3.91], [2.80, 3.92, 4.47]],
      ['6+ to 8 oz', [2.66, 3.54, 3.80], [2.86, 3.74, 4.00], [2.83, 3.97, 4.53]],
      ['8+ to 10 oz', [2.77, 3.68, 3.94], [2.98, 3.89, 4.15], [2.87, 4.06, 4.62]],
      ['10+ to 12 oz', [2.82, 3.78, 4.04], [3.03, 3.99, 4.25], [2.92, 4.16, 4.73]],
      ['12+ to 14 oz', [2.92, 3.91, 4.17], [3.14, 4.13, 4.39], [2.96, 4.30, 4.85]],
      ['14+ to 16 oz', [2.95, 3.96, 4.22], [3.17, 4.18, 4.44], [2.99, 4.32, 4.88]],
      ['4 oz or less', [2.91, 3.73, 3.99], [3.15, 3.97, 4.23], [2.91, 3.79, 4.35]],
      ['4+ to 8 oz', [3.13, 3.95, 4.21], [3.39, 4.21, 4.47], [3.13, 4.01, 4.57]],
      ['8+ to 12 oz', [3.38, 4.20, 4.46], [3.66, 4.48, 4.74], [3.38, 4.26, 4.83]],
      ['12+ to 16 oz', [3.78, 4.60, 4.86], [4.07, 4.89, 5.15], [3.78, 4.67, 5.23]],
      ['1+ to 1.25 lb', [4.22, 5.04, 5.30], [4.52, 5.34, 5.60], [4.22, 5.19, 5.75]],
      ['1.25+ to 1.5 lb', [4.60, 5.42, 5.68], [4.91, 5.73, 5.99], [4.60, 5.57, 6.14]],
      ['1.5+ to 1.75 lb', [4.75, 5.57, 5.83], [5.07, 5.89, 6.15], [4.75, 5.72, 6.29]],
      ['1.75+ to 2 lb', [5.00, 5.82, 6.08], [5.33, 6.15, 6.41], [5.00, 5.98, 6.54]],
      ['2+ to 2.25 lb', [5.10, 5.92, 6.18], [5.47, 6.29, 6.55], [5.10, 6.08, 6.64]],
      ['2.25+ to 2.5 lb', [5.28, 6.10, 6.36], [5.67, 6.49, 6.75], [5.28, 6.26, 6.83]],
      ['2.5+ to 2.75 lb', [5.44, 6.26, 6.52], [5.84, 6.66, 6.92], [5.44, 6.42, 6.99]],
      ['2.75+ to 3 lb', [5.85, 6.67, 6.93], [6.26, 7.08, 7.34], [5.85, 6.85, 7.41]],
    ],
    over3lb: { base: [[6.15, 6.97, 7.23], [6.69, 7.51, 7.77], [6.15, 7.16, 7.73]], step: 0.08, everyLb: 0.25 },
  },
  apparel: {
    rows: [
      ['2 oz or less', [2.62, 3.51, 3.77], [2.85, 3.74, 4.00], [2.83, 3.92, 4.54]],
      ['2+ to 4 oz', [2.64, 3.54, 3.80], [2.87, 3.77, 4.03], [2.85, 3.95, 4.57]],
      ['4+ to 6 oz', [2.68, 3.59, 3.85], [2.93, 3.84, 4.10], [2.90, 4.01, 4.62]],
      ['6+ to 8 oz', [2.81, 3.69, 3.95], [3.06, 3.94, 4.20], [3.03, 4.11, 4.72]],
      ['8+ to 10 oz', [3.00, 3.91, 4.17], [3.27, 4.18, 4.44], [3.17, 4.25, 4.74]],
      ['10+ to 12 oz', [3.10, 4.09, 4.35], [3.37, 4.36, 4.62], [3.27, 4.43, 4.92]],
      ['12+ to 14 oz', [3.20, 4.20, 4.46], [3.49, 4.49, 4.75], [3.38, 4.55, 5.03]],
      ['14+ to 16 oz', [3.30, 4.25, 4.51], [3.59, 4.54, 4.80], [3.48, 4.60, 5.08]],
      ['4 oz or less', [3.48, 4.30, 4.56], [3.79, 4.61, 4.87], [3.53, 4.36, 4.93]],
      ['4+ to 8 oz', [3.68, 4.50, 4.76], [4.00, 4.82, 5.08], [3.74, 4.57, 5.13]],
      ['8+ to 12 oz', [3.90, 4.72, 4.98], [4.23, 5.05, 5.31], [3.96, 4.79, 5.35]],
      ['12+ to 16 oz', [4.35, 5.17, 5.43], [4.69, 5.51, 5.77], [4.42, 5.25, 5.81]],
      ['1+ to 1.25 lb', [5.05, 5.87, 6.13], [5.42, 6.24, 6.50], [5.13, 5.96, 6.52]],
      ['1.25+ to 1.5 lb', [5.22, 6.04, 6.30], [5.59, 6.41, 6.67], [5.30, 6.13, 6.69]],
      ['1.5+ to 1.75 lb', [5.32, 6.14, 6.40], [5.71, 6.53, 6.79], [5.40, 6.23, 6.80]],
      ['1.75+ to 2 lb', [5.43, 6.25, 6.51], [5.82, 6.64, 6.90], [5.51, 6.34, 6.91]],
      ['2+ to 2.25 lb', [5.78, 6.60, 6.86], [6.22, 7.04, 7.30], [5.87, 6.70, 7.26]],
      ['2.25+ to 2.5 lb', [5.90, 6.72, 6.98], [6.34, 7.16, 7.42], [5.99, 6.82, 7.38]],
      ['2.5+ to 2.75 lb', [5.95, 6.77, 7.03], [6.41, 7.23, 7.49], [6.04, 6.87, 7.44]],
      ['2.75+ to 3 lb', [6.08, 6.90, 7.16], [6.54, 7.36, 7.62], [6.17, 7.00, 7.57]],
    ],
    over3lb: { base: [[6.15, 6.97, 7.23], [6.82, 7.64, 7.90], [6.24, 7.07, 7.64]], step: 0.16, everyLb: 0.5 },
  },
  dangerous: {
    rows: [
      ['2 oz or less', [3.40, 4.29, 4.55], [3.74, 4.63, 4.89], [3.57, 4.59, 5.15]],
      ['2+ to 4 oz', [3.43, 4.36, 4.62], [3.80, 4.73, 4.99], [3.62, 4.61, 5.17]],
      ['4+ to 6 oz', [3.48, 4.37, 4.63], [3.88, 4.77, 5.03], [3.69, 4.75, 5.32]],
      ['6+ to 8 oz', [3.55, 4.43, 4.69], [3.98, 4.86, 5.12], [3.71, 4.80, 5.37]],
      ['8+ to 10 oz', [3.64, 4.55, 4.81], [4.10, 5.01, 5.27], [3.74, 4.88, 5.45]],
      ['10+ to 12 oz', [3.65, 4.61, 4.87], [4.14, 5.10, 5.36], [3.75, 4.97, 5.54]],
      ['12+ to 14 oz', [3.73, 4.72, 4.98], [4.25, 5.24, 5.50], [3.79, 5.01, 5.57]],
      ['14+ to 16 oz', [3.77, 4.78, 5.04], [4.32, 5.33, 5.59], [3.83, 5.04, 5.60]],
      ['4 oz or less', [3.73, 4.55, 4.81], [4.32, 5.14, 5.40], [3.73, 4.62, 5.18]],
      ['4+ to 8 oz', [3.94, 4.76, 5.02], [4.56, 5.38, 5.64], [3.94, 4.83, 5.40]],
      ['8+ to 12 oz', [4.17, 4.99, 5.25], [4.82, 5.64, 5.90], [4.17, 5.06, 5.63]],
      ['12+ to 16 oz', [4.37, 5.19, 5.45], [5.04, 5.86, 6.12], [4.37, 5.27, 5.83]],
      ['1+ to 1.25 lb', [4.82, 5.64, 5.90], [5.51, 6.33, 6.59], [4.82, 5.79, 6.36]],
      ['1.25+ to 1.5 lb', [5.20, 6.02, 6.28], [5.91, 6.73, 6.99], [5.20, 6.18, 6.74]],
      ['1.5+ to 1.75 lb', [5.35, 6.17, 6.43], [6.08, 6.90, 7.16], [5.35, 6.33, 6.90]],
      ['1.75+ to 2 lb', [5.49, 6.31, 6.57], [6.24, 7.06, 7.32], [5.49, 6.47, 7.04]],
      ['2+ to 2.25 lb', [5.56, 6.38, 6.64], [6.33, 7.15, 7.41], [5.56, 6.55, 7.11]],
      ['2.25+ to 2.5 lb', [5.74, 6.56, 6.82], [6.53, 7.35, 7.61], [5.74, 6.73, 7.29]],
      ['2.5+ to 2.75 lb', [5.90, 6.72, 6.98], [6.70, 7.52, 7.78], [5.90, 6.89, 7.45]],
      ['2.75+ to 3 lb', [6.31, 7.13, 7.39], [7.12, 7.94, 8.20], [6.31, 7.32, 7.88]],
    ],
    over3lb: { base: [[6.61, 7.43, 7.69], [7.51, 8.33, 8.59], [6.61, 7.63, 8.20]], step: 0.08, everyLb: 0.25 },
  },
};

/* ── Bulky and oversize rates ────────────────────────────────────────────
   Per tier: the base for each price band [<$10, $10–$50, >$50], plus `perLb`
   for every pound (or part) above `aboveLb`. Apparel pays the same as core on
   these tiers in every period; dangerous goods have their own. 2026 and 2027
   use different tier structures, so they are separate tables. */
const T26 = (base, perLb, aboveLb) => ({ base, perLb, aboveLb });

export const OVERSIZE_2026 = {
  /* [2026 non-peak, 2026 peak] */
  core: {
    'small-bulky': [T26([6.78, 7.55, 7.55], 0.38, 1), T26([7.82, 8.59, 8.59], 0.38, 1)],
    'large-bulky': [T26([8.58, 9.35, 9.35], 0.38, 1), T26([9.62, 10.39, 10.39], 0.38, 1)],
    'xl-0-50': [T26([25.56, 26.33, 26.33], 0.38, 1), T26([28.29, 29.06, 29.06], 0.38, 1)],
    'xl-50-70': [T26([36.55, 37.32, 37.32], 0.75, 51), T26([39.36, 40.13, 40.13], 0.75, 51)],
    'xl-70-150': [T26([50.55, 51.32, 51.32], 0.75, 71), T26([54.97, 55.74, 55.74], 0.75, 71)],
    'xl-150-plus': [T26([194.18, 194.95, 194.95], 0.19, 151), T26([202.69, 203.46, 203.46], 0.19, 151)],
  },
  dangerous: {
    'small-bulky': [T26([7.50, 8.27, 8.27], 0.38, 1), T26([9.06, 9.83, 9.83], 0.38, 1)],
    'large-bulky': [T26([9.30, 10.07, 10.07], 0.38, 1), T26([10.86, 11.63, 11.63], 0.38, 1)],
    'xl-0-50': [T26([27.67, 28.44, 28.44], 0.38, 1), T26([31.71, 32.48, 32.48], 0.38, 1)],
    'xl-50-70': [T26([39.76, 40.53, 40.53], 0.75, 51), T26([43.86, 44.63, 44.63], 0.75, 51)],
    'xl-70-150': [T26([57.68, 58.45, 58.45], 0.75, 71), T26([64.04, 64.81, 64.81], 0.75, 71)],
    'xl-150-plus': [T26([218.76, 219.53, 219.53], 0.19, 151), T26([230.84, 231.61, 231.61], 0.19, 151)],
  },
};

export const OVERSIZE_2027 = {
  /* 2027 non-peak only; Amazon has not published 2027 peak rates. */
  core: {
    'small-bulky': T26([6.73, 7.51, 7.51], 0.39, 1),
    'medium-bulky': T26([6.88, 7.66, 7.66], 0.39, 1),
    'large-bulky': T26([9.09, 9.88, 9.88], 0.39, 1),
    'xl-bulky': T26([9.31, 10.09, 10.09], 0.39, 1),
    'small-oversize': T26([13.44, 14.22, 14.22], 0.28, 1),
    'medium-oversize': T26([27.36, 28.15, 28.15], 0.56, 51),
    'large-oversize': T26([37.97, 38.75, 38.75], 0.68, 51),
    'long-oversize': T26([62.97, 63.75, 63.75], 0.30, 1),
    'special-oversize-light': T26([71.09, 71.87, 71.87], 0.30, 1),
    'special-oversize-heavy': T26([190.50, 191.28, 191.28], 0.19, 151),
  },
  dangerous: {
    'small-bulky': T26([7.46, 8.24, 8.24], 0.39, 1),
    'medium-bulky': T26([7.61, 8.39, 8.39], 0.39, 1),
    'large-bulky': T26([9.83, 10.61, 10.61], 0.39, 1),
    'xl-bulky': T26([10.04, 10.82, 10.82], 0.39, 1),
    'small-oversize': T26([15.58, 16.36, 16.36], 0.28, 1),
    'medium-oversize': T26([30.62, 31.40, 31.40], 0.56, 51),
    'large-oversize': T26([45.21, 45.99, 45.99], 0.68, 51),
    'long-oversize': T26([70.21, 70.99, 70.99], 0.30, 1),
    'special-oversize-light': T26([78.33, 79.11, 79.11], 0.30, 1),
    'special-oversize-heavy': T26([215.44, 216.23, 216.23], 0.19, 151),
  },
};

export const TIER_LABELS = {
  'small-standard': 'Small standard',
  'large-standard': 'Large standard',
  'small-bulky': 'Small bulky',
  'medium-bulky': 'Medium bulky',
  'large-bulky': 'Large bulky',
  'xl-bulky': 'Extra-large bulky',
  'xl-0-50': 'Extra-large 0 to 50 lb',
  'xl-50-70': 'Extra-large 50+ to 70 lb',
  'xl-70-150': 'Extra-large 70+ to 150 lb',
  'xl-150-plus': 'Extra-large 150+ lb',
  'small-oversize': 'Small oversize',
  'medium-oversize': 'Medium oversize',
  'large-oversize': 'Large oversize',
  'long-oversize': 'Long oversize',
  'special-oversize-light': 'Special oversize light',
  'special-oversize-heavy': 'Special oversize heavy',
};

/** The 2026 size-tier limits, as Amazon's table states them (inches, lb). */
export const SIZE_TIERS_2026 = [
  { tier: 'small-standard', weight: '16 oz', longest: '15 in', median: '12 in', shortest: '0.75 in', girth: '—' },
  { tier: 'large-standard', weight: '20 lb', longest: '18 in', median: '14 in', shortest: '8 in', girth: '—' },
  { tier: 'small-bulky', weight: '50 lb', longest: '37 in', median: '28 in', shortest: '20 in', girth: '130 in' },
  { tier: 'large-bulky', weight: '50 lb', longest: '59 in', median: '33 in', shortest: '33 in', girth: '130 in' },
  { tier: 'xl-0-50', weight: 'over any bulky limit', longest: 'over 59 in', median: 'over 33 in', shortest: 'over 33 in', girth: 'over 130 in' },
];

/* ── Low-price FBA ───────────────────────────────────────────────────────
   Under $10 every category gets the <$10 column through 14 January 2027.
   From 15 January 2027 these fee categories lose it and pay $10–$50 rates. */
export const LOW_PRICE_EXCLUDED_2027 = [
  'automotive', 'compact-appliances', 'musical-instruments', 'media', 'computers',
];

/* ── Referral fees ───────────────────────────────────────────────────────
   kind 'flat'      pct of the whole price.
   kind 'band'      the WHOLE price at the rate of the band it falls in;
                    `bands` is [[upTo, pct], ..., [Infinity, pct]] (upTo inclusive).
   kind 'portion'   each portion of the price at its own rate (marginal),
                    `bands` the same shape.
   `min` is the per-unit minimum (null where Amazon lists none). */
export const REFERRAL_CATEGORIES = [
  { id: '3d-printers', name: '3D Printers', kind: 'portion', bands: [[200, 12], [Infinity, 5]], min: 0.30 },
  { id: 'amazon-device-accessories', name: 'Amazon Device Accessories', kind: 'flat', pct: 45, min: 0.30 },
  { id: 'automotive', name: 'Automotive and Powersports', kind: 'flat', pct: 12, min: 0.30 },
  { id: 'baby', name: 'Baby Products', kind: 'band', bands: [[10, 8], [Infinity, 15]], min: 0.30 },
  { id: 'backpacks', name: 'Backpacks, Handbags, and Luggage', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'power-tools', name: 'Base Equipment Power Tools', kind: 'flat', pct: 12, min: 0.30 },
  { id: 'beauty', name: 'Beauty, Health and Personal Care', kind: 'band', bands: [[10, 8], [Infinity, 15]], min: 0.30 },
  { id: 'business-industrial', name: 'Business, Industrial, and Scientific Supplies', kind: 'flat', pct: 12, min: 0.30 },
  { id: 'clothing', name: 'Clothing and Accessories', kind: 'band', bands: [[15, 5], [20, 10], [Infinity, 17]], min: 0.30, apparel: true },
  { id: 'compact-appliances', name: 'Compact Appliances', kind: 'portion', bands: [[300, 15], [Infinity, 8]], min: 0.30 },
  { id: 'computers', name: 'Computers', kind: 'flat', pct: 8, min: 0.30 },
  { id: 'consumer-electronics', name: 'Consumer Electronics', kind: 'flat', pct: 8, min: 0.30 },
  { id: 'electronics-accessories', name: 'Electronics Accessories', kind: 'portion', bands: [[100, 15], [Infinity, 8]], min: 0.30 },
  { id: 'everything-else', name: 'Everything Else', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'eyewear', name: 'Eyewear', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'footwear', name: 'Footwear', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'full-size-appliances', name: 'Full-Size Appliances', kind: 'flat', pct: 8, min: 0.30 },
  { id: 'furniture', name: 'Furniture', kind: 'portion', bands: [[200, 15], [Infinity, 10]], min: 0.30 },
  { id: 'grocery', name: 'Grocery and Gourmet', kind: 'band', bands: [[15, 8], [Infinity, 15]], min: null },
  { id: 'home-kitchen', name: 'Home and Kitchen', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'jewelry', name: 'Jewelry', kind: 'portion', bands: [[250, 20], [Infinity, 5]], min: 0.30 },
  { id: 'lawn-garden', name: 'Lawn and Garden', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'lawn-mowers', name: 'Lawn Mowers and Snow Throwers', kind: 'band', bands: [[500, 15], [Infinity, 8]], min: 0.30 },
  { id: 'mattresses', name: 'Mattresses', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'media', name: 'Media - Books, DVD, Music, Software, Video', kind: 'flat', pct: 15, min: null, closingFee: 1.80 },
  { id: 'musical-instruments', name: 'Musical Instruments and AV Production', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'office', name: 'Office Products', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'pet', name: 'Pet Products', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'pet-vet-diets', name: 'Pet Products: veterinary diets', kind: 'flat', pct: 22, min: 0.30 },
  { id: 'sports-outdoors', name: 'Sports and Outdoors', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'tires', name: 'Tires', kind: 'flat', pct: 10, min: 0.30 },
  { id: 'tools', name: 'Tools and Home Improvement', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'toys', name: 'Toys and Games', kind: 'flat', pct: 15, min: 0.30 },
  { id: 'video-game-consoles', name: 'Video Game Consoles', kind: 'flat', pct: 8, min: null },
  { id: 'video-games', name: 'Video Games and Gaming Accessories', kind: 'flat', pct: 15, min: null },
  { id: 'watches', name: 'Watches', kind: 'portion', bands: [[1500, 16], [Infinity, 3]], min: 0.30 },
];

export const categoryById = (id) => REFERRAL_CATEGORIES.find((c) => c.id === id);

/** "15%", "8% up to $10, then 15%", ... — one line per category for tables. */
export function referralRateText(c) {
  const usd = (n) => `$${n.toLocaleString('en-US')}`;
  if (c.kind === 'flat') return `${c.pct}%`;
  if (c.kind === 'band') {
    return c.bands.map(([upTo, pct], i) => {
      const prev = i ? c.bands[i - 1][0] : null;
      if (upTo === Infinity) return `${pct}% above ${usd(prev)}`;
      return prev == null ? `${pct}% at ${usd(upTo)} or less` : `${pct}% from ${usd(prev)} to ${usd(upTo)}`;
    }).join(', ');
  }
  return c.bands.map(([upTo, pct], i) =>
    upTo === Infinity ? `${pct}% on the part above ${usd(c.bands[i - 1][0])}` : `${pct}% on the first ${usd(upTo)}`).join(', ');
}

/* ── Monthly storage (per cubic foot) ───────────────────────────────────
   The base rate only: inventory under 181 days old, no utilisation surcharge
   (new and small sellers, or a ratio under 22 weeks). Same figures under the
   unified fee from 1 Feb 2027 for the 0–180 day age tier. */
export const STORAGE = {
  standard: { offPeak: 0.78, peak: 2.40 },
  oversize: { offPeak: 0.56, peak: 1.40 },
  dangerous: { standard: { offPeak: 0.99, peak: 3.63 }, oversize: { offPeak: 0.78, peak: 2.43 } },
  peakMonths: 'October to December',
};

/* ── Arithmetic ──────────────────────────────────────────────────────── */

const EPS = 1e-9;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
export const IN_PER_CM = 1 / 2.54;
export const LB_PER_KG = 2.2046226218;

/** Price band index: 0 under $10, 1 for $10–$50 inclusive, 2 above $50. */
export const priceBand = (price) => (price < 10 ? 0 : price <= 50 ? 1 : 2);

/** Sides sorted longest first, plus the derived measures Amazon uses. */
export function measure({ lengthIn, widthIn, heightIn, weightLb }) {
  const [L, M, S] = [lengthIn, widthIn, heightIn].map(Number).sort((a, b) => b - a);
  const dimLb = (L * M * S) / 139;
  /* Bulky and oversize assume a minimum width and height of 2 in. */
  const dimLbMin2 = (L * Math.max(M, 2) * Math.max(S, 2)) / 139;
  return {
    L, M, S, unitLb: Number(weightLb), dimLb, dimLbMin2,
    lengthPlusGirth: L + 2 * (M + S),
    cubicFeet: (L * M * S) / 1728,
  };
}

/** The size tier for a period. Returns { tier, shippingLb, group } where group
 *  is 'standard' or 'oversize' (Amazon's word for everything above standard). */
export function sizeTier(m, periodId) {
  const { L, M, S, unitLb, dimLb, dimLbMin2, lengthPlusGirth: lg } = m;
  if (unitLb <= 1 + EPS && L <= 15 && M <= 12 && S <= 0.75) {
    return { tier: 'small-standard', shippingLb: unitLb, usesDim: false, group: 'standard' };
  }
  const stdShip = Math.max(unitLb, dimLb);
  if (stdShip <= 20 && L <= 18 && M <= 14 && S <= 8) {
    return { tier: 'large-standard', shippingLb: stdShip, usesDim: dimLb > unitLb, group: 'standard' };
  }
  const ship = Math.max(unitLb, dimLbMin2);
  const usesDim = dimLbMin2 > unitLb;
  const bulky = ship <= 50 && L <= 59 && M <= 33 && S <= 33 && lg <= 130;
  const out = (tier, shippingLb = ship, dim = usesDim) => ({ tier, shippingLb, usesDim: dim, group: 'oversize' });

  if (periodId !== 'nonpeak-2027') {
    if (bulky) return out(L <= 37 && M <= 28 && S <= 20 ? 'small-bulky' : 'large-bulky');
    if (ship <= 50) return out('xl-0-50');
    if (ship <= 70) return out('xl-50-70');
    if (ship <= 150) return out('xl-70-150');
    return out('xl-150-plus', unitLb, false); // 150+ lb is charged on unit weight
  }
  if (bulky) {
    if (L <= 28 && M <= 24 && S <= 20) return out('small-bulky');
    if (L <= 37 && M <= 28 && S <= 20) return out('medium-bulky');
    if (L <= 52 && M <= 28 && S <= 28) return out('large-bulky');
    return out('xl-bulky');
  }
  if (ship > 150) return out('special-oversize-heavy', unitLb, false);
  if (ship <= 50 && L <= 72 && lg <= 130) return out('small-oversize');
  if (ship <= 70 && L <= 78 && lg <= 130) return out('medium-oversize');
  if (L <= 96 && lg <= 130) return out('large-oversize');
  if (L <= 108 && lg <= 165) return out('long-oversize');
  return out('special-oversize-light');
}

/** Extra handling fees that may apply and are NOT in the total. */
export function handlingFlags(m, tier, periodId) {
  if (tier.group !== 'oversize') return [];
  if (periodId !== 'nonpeak-2027') {
    return tier.tier.startsWith('xl-') && tier.tier !== 'xl-150-plus' && (m.L > 96 || m.lengthPlusGirth > 130)
      ? ['Overmax handling fee'] : [];
  }
  const flags = [];
  if (m.S < 4 && m.M >= 25) flags.push('Flat product handling fee');
  if (m.M > 43) flags.push('Overhang handling fee');
  return flags;
}

/**
 * The FBA fulfilment fee for one unit, surcharge included.
 *
 * kind: 'core' | 'apparel' | 'dangerous'
 * category: a REFERRAL_CATEGORIES id (decides low-price eligibility in 2027)
 */
export function fulfilmentFee({ m, tier, price, periodId, kind = 'core', category }) {
  const p = PERIODS.findIndex((x) => x.id === periodId);
  let band = priceBand(price);
  if (band === 0 && periodId === 'nonpeak-2027' && LOW_PRICE_EXCLUDED_2027.includes(category)) band = 1;

  let base;
  let bracket;
  if (tier.group === 'standard') {
    const table = STANDARD[kind];
    const oz = tier.shippingLb * 16;
    if (tier.tier === 'small-standard') {
      const i = SMALL_MAX_OZ.findIndex((max) => oz <= max + EPS);
      base = table.rows[i][p + 1][band];
      bracket = table.rows[i][0];
    } else if (oz <= 48 + EPS) {
      const i = LARGE_MAX_OZ.findIndex((max) => oz <= max + EPS);
      base = table.rows[8 + i][p + 1][band];
      bracket = table.rows[8 + i][0];
    } else {
      const { base: b, step, everyLb } = table.over3lb;
      const steps = Math.ceil((tier.shippingLb - 3) / everyLb - EPS);
      base = b[p][band] + steps * step;
      bracket = `3 lb + ${steps} × ${everyLb === 0.25 ? '4 oz' : 'half-lb'}`;
    }
  } else {
    const dg = kind === 'dangerous' ? 'dangerous' : 'core';
    const rate = periodId === 'nonpeak-2027' ? OVERSIZE_2027[dg][tier.tier] : OVERSIZE_2026[dg][tier.tier][p];
    const steps = Math.max(0, Math.ceil(tier.shippingLb - EPS) - rate.aboveLb);
    base = rate.base[band] + steps * rate.perLb;
    bracket = `${rate.aboveLb === 1 ? 'first lb' : `first ${rate.aboveLb} lb`} + ${steps} lb`;
  }
  base = round2(base);
  return { base, fee: round2(base * (1 + SURCHARGE.rate)), band, bracket };
}

/** The referral fee for one unit at `price` (no shipping or gift wrap). */
export function referralFee(price, categoryId) {
  const c = categoryById(categoryId);
  if (!c || !(price > 0)) return { fee: 0, closingFee: 0, effectivePct: 0, atMinimum: false };
  let fee;
  if (c.kind === 'flat') fee = (price * c.pct) / 100;
  else if (c.kind === 'band') fee = (price * c.bands.find(([upTo]) => price <= upTo)[1]) / 100;
  else {
    fee = 0;
    let lower = 0;
    for (const [upTo, pct] of c.bands) {
      if (price > lower) fee += ((Math.min(price, upTo) - lower) * pct) / 100;
      lower = upTo;
    }
  }
  const atMinimum = c.min != null && fee < c.min;
  if (atMinimum) fee = c.min;
  fee = round2(fee);
  return { fee, closingFee: c.closingFee ?? 0, effectivePct: (fee / price) * 100, atMinimum };
}

/** Monthly storage for one unit, at the base rate. `peak` = October–December. */
export function storagePerUnitMonth(m, tier, { peak, dangerous }) {
  const group = tier.group === 'standard' ? 'standard' : 'oversize';
  const rates = dangerous ? STORAGE.dangerous[group] : STORAGE[group];
  const rate = peak ? rates.peak : rates.offPeak;
  return { rate, cubicFeet: m.cubicFeet, fee: m.cubicFeet * rate };
}

/**
 * Everything the calculator shows, from one set of inputs. All money in USD,
 * per unit unless named otherwise.
 */
export function calculate(input) {
  const {
    price, productCost = 0, inboundShipping = 0, lengthIn, widthIn, heightIn, weightLb,
    category, periodId, dangerous = false, adPct = 0, monthlyUnits = 0,
    storageMonths = 1, storagePeak = false,
  } = input;
  const m = measure({ lengthIn, widthIn, heightIn, weightLb });
  const tier = sizeTier(m, periodId);
  const apparel = !!categoryById(category)?.apparel;
  const kind = dangerous ? 'dangerous' : apparel ? 'apparel' : 'core';
  const fba = fulfilmentFee({ m, tier, price, periodId, kind, category });
  const referral = referralFee(price, category);
  const storageMonth = storagePerUnitMonth(m, tier, { peak: storagePeak, dangerous });
  const storage = storageMonth.fee * Math.max(0, storageMonths);
  const amazonFees = fba.fee + referral.fee + referral.closingFee + storage;
  const landed = productCost + inboundShipping;
  const ads = (price * adPct) / 100;
  const beforeAds = price - amazonFees - landed;
  const profit = beforeAds - ads;
  return {
    m, tier, kind, fba, referral, storage, storageMonth, flags: handlingFlags(m, tier, periodId),
    amazonFees, landed, ads, profit, beforeAds,
    marginPct: price > 0 ? (profit / price) * 100 : null,
    roiPct: landed > 0 ? (profit / landed) * 100 : null,
    breakEvenAcosPct: price > 0 ? (beforeAds / price) * 100 : null,
    monthlyProfit: monthlyUnits > 0 ? profit * monthlyUnits : null,
    monthlyRevenue: monthlyUnits > 0 ? price * monthlyUnits : null,
  };
}

/**
 * Amazon's own worked examples from the rate-card page, with the fee it
 * prints BEFORE the surcharge. Kept as data so a check can assert the
 * arithmetic above against them (scripts/check-fba-fees.mjs).
 */
export const EXAMPLES = [
  { name: 'Mobile device case', dims: [13.8, 9, 0.7], weightLb: 2.88 / 16, price: 9, category: 'electronics-accessories',
    tier: 'small-standard', base: { 'nonpeak-2026': 2.49, 'peak-2026': 2.68, 'nonpeak-2027': 2.72 } },
  { name: 'T-shirt', dims: [13, 9, 0.85], weightLb: 5.4 / 16, price: 20, category: 'everything-else',
    tier: 'large-standard', base: { 'nonpeak-2026': 4.20, 'peak-2026': 4.48, 'nonpeak-2027': 4.26 } },
  { name: 'Iron', dims: [12.6, 6.6, 5.5], weightLb: 3.35, price: 30, category: 'compact-appliances',
    tier: 'large-standard', base: { 'nonpeak-2026': 7.13, 'peak-2026': 7.67, 'nonpeak-2027': 7.32 } },
  { name: 'Iron, under $10', dims: [12.6, 6.6, 5.5], weightLb: 3.35, price: 9, category: 'compact-appliances',
    tier: 'large-standard', base: { 'nonpeak-2026': 6.31, 'peak-2026': 6.85, 'nonpeak-2027': 7.32 } },
  { name: 'Baby cot', dims: [24, 7.5, 6], weightLb: 7.9, price: 60, category: 'baby',
    tier: 'small-bulky', base: { 'nonpeak-2026': 10.21, 'peak-2026': 11.25, 'nonpeak-2027': 10.24 } },
  { name: 'Monitor', dims: [54, 34, 3.5], weightLb: 41, price: 40, category: 'consumer-electronics',
    tier: 'xl-0-50', base: { 'nonpeak-2026': 43.81, 'peak-2026': 46.54, 'nonpeak-2027': 27.10 } },
  { name: 'TV', dims: [65, 20, 7], weightLb: 62, price: 300, category: 'consumer-electronics',
    tier: 'xl-50-70', base: { 'nonpeak-2026': 48.57, 'peak-2026': 51.38, 'nonpeak-2027': 36.55 } },
];
