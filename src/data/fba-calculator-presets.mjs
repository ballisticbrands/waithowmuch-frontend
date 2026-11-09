/**
 * "Compare with a real business" presets for the FBA calculator.
 *
 * 🚨 The money comes from the business's own margin block in
 * src/businesses/index.mjs — the same per-unit lines its /business/<slug>/
 * page renders — so the calculator can never quote a business differently
 * from its profile. The public API does not carry per-unit figures, which is
 * why this reads the profiles and not /v1/businesses.
 *
 * The one thing written here by hand is each product's package size, because
 * the profiles state it only in prose (the FBA line's detail). Each entry
 * quotes the sentence it was copied from. Only products whose margin block
 * gives a dollar amount for every line AND whose package size is stated are
 * listed; see the PR for the ones left out and why.
 *
 * Business names, and whether a business is published at all, come from the
 * API (/v1/businesses): the page and the prerender both drop any preset whose
 * business is not in that list, so a preset can never link to a dead profile.
 */
import { profileFor } from '../businesses/index.mjs';

/** Units are as the profile states them: in/oz, in/lb or cm/kg. */
const PRESETS = [
  { slug: 'spite-house-games', product: null, category: 'toys',
    pkg: { dims: [3.7, 2.8, 0.87], unit: 'in', weight: 3.5, weightUnit: 'oz' } }, // "packs to 3.7 × 2.8 × 0.87 in at 3.5 oz"
  { slug: 'doctor-jupiter', product: 'my-first-science', category: 'toys',
    pkg: { dims: [13.4, 10.0, 2.0], unit: 'in', weight: 1.65, weightUnit: 'lb' } }, // "13.4 × 10.0 × 2.0 in and 1.65 lb"
  { slug: 'doctor-jupiter', product: 'ultimate-science', category: 'toys',
    pkg: { dims: [13.3, 9.9, 1.9], unit: 'in', weight: 1.90, weightUnit: 'lb' } }, // "13.3 × 9.9 × 1.9 in and 1.90 lb"
  { slug: 'doctor-jupiter', product: 'preschool-science', category: 'toys',
    pkg: { dims: [11.5, 9.9, 2.1], unit: 'in', weight: 1.52, weightUnit: 'lb' } }, // "11.5 × 9.9 × 2.1 in and 1.52 lb"
  { slug: 'doctor-jupiter', product: 'paper-airplane-launcher', category: 'toys',
    pkg: { dims: [13.5, 10.0, 1.3], unit: 'in', weight: 1.37, weightUnit: 'lb' } }, // "13.5 × 10.0 × 1.3 in and 1.37 lb"
  { slug: 'ototo', product: 'scissors', category: 'home-kitchen',
    pkg: { dims: [9.6, 4.8, 0.79], unit: 'in', weight: 5.3, weightUnit: 'oz' } }, // "9.6 × 4.8 × 0.79 in at 5.3 oz"
  { slug: 'ototo', product: 'spatula', category: 'home-kitchen',
    pkg: { dims: [9.2, 2.4, 0.94], unit: 'in', weight: 2.1, weightUnit: 'oz' } }, // "9.2 × 2.4 × 0.94 in at 2.1 oz"
  { slug: 'ototo', product: 'opener', category: 'home-kitchen',
    pkg: { dims: [7.8, 6.1, 1.65], unit: 'in', weight: 9.2, weightUnit: 'oz' } }, // "7.8 × 6.1 × 1.65 in at 9.2 oz"
  { slug: 'virora-mahjong', product: 'set', category: 'toys',
    pkg: { dims: [43.6, 25, 7.4], unit: 'cm', weight: 3.25, weightUnit: 'kg' } }, // "a 43.6 × 25 × 7.4 cm, 3.25 kg box"
  { slug: 'draft-top', product: null, category: 'home-kitchen',
    pkg: { dims: [6.46, 3.46, 1.06], unit: 'in', weight: 3.2, weightUnit: 'oz' } }, // "6.46 × 3.46 × 1.06 in and 3.2 oz"
  { slug: 'woodlands-usa', product: 'bamboo-set', category: 'home-kitchen',
    pkg: { dims: [12.0, 10.0, 0.94], unit: 'in', weight: 9.9, weightUnit: 'oz' } }, // "12.0 × 10.0 × 0.94 in and 9.9 oz"
  { slug: 'woodlands-usa', product: 'teak-utensil-set', category: 'home-kitchen',
    pkg: { dims: [13.8, 4.6, 4.0], unit: 'in', weight: 1.59, weightUnit: 'lb' } }, // "13.8 × 4.6 × 4.0 in and 1.59 lb"
  { slug: 'woodlands-usa', product: 'teak-spatula', category: 'home-kitchen',
    pkg: { dims: [12.0, 2.4, 0.59], unit: 'in', weight: 3.8, weightUnit: 'oz' } }, // "12.0 × 2.4 × 0.59 in and 3.8 oz"
  /* Highmark's listings sit in four category trees; every one is charged 15%,
     so the 15% "Everything Else" fee category reproduces the measured rate. */
  { slug: 'highmark-collective', product: 'baptism', category: 'everything-else',
    pkg: { dims: [10.9, 8.6, 5.6], unit: 'in', weight: 29, weightUnit: 'oz' } }, // "packs to 10.9 × 8.6 × 5.6 in at 29 oz"
  { slug: 'highmark-collective', product: 'jar', category: 'everything-else',
    pkg: { dims: [6.1, 6.0, 5.3], unit: 'in', weight: 26, weightUnit: 'oz' } }, // "packs to 6.1 × 6.0 × 5.3 in at 26 oz"
  { slug: 'lighten-life', product: 'whiskey-glass', category: 'home-kitchen',
    pkg: { dims: [15.9, 14.4, 12.9], unit: 'cm', weight: 0.621, weightUnit: 'kg' } }, // "a 159 × 144 × 129 mm, 621 g box"
  { slug: 'lighten-life', product: 'beer-glass', category: 'home-kitchen',
    pkg: { dims: [19.3, 14.5, 14.1], unit: 'cm', weight: 0.750, weightUnit: 'kg' } }, // "a 193 × 145 × 141 mm, 750 g box"
  { slug: 'lighten-life', product: 'cocktail-set', category: 'home-kitchen',
    pkg: { dims: [27.6, 13.7, 13.3], unit: 'cm', weight: 1.338, weightUnit: 'kg' } }, // "a 276 × 137 × 133 mm, 1,338 g box"
  { slug: 'mount-cleverest', product: 'mount-cleverest', category: 'toys',
    pkg: { dims: [6.6, 5.7, 1.7], unit: 'in', weight: 8.1, weightUnit: 'oz' } }, // "packs to 6.6 × 5.7 × 1.7 in at 8.1 oz"
  { slug: 'mount-cleverest', product: 'flash-cards', category: 'toys',
    pkg: { dims: [4.3, 3.0, 1.3], unit: 'in', weight: 5.3, weightUnit: 'oz' } }, // "packs to 4.3 × 3.0 × 1.3 in at 5.3 oz"
  { slug: 'restoration-games', product: 'thunder-road', category: 'toys',
    pkg: { dims: [15, 11.5, 6.3], unit: 'in', weight: 10.05, weightUnit: 'lb' } }, // "packs to 15 × 11.5 × 6.3 in at 10.05 lb"
  { slug: 'songbird-specialties', product: null, category: 'home-kitchen',
    pkg: { dims: [7.5, 4.6, 2.3], unit: 'in', weight: 5.0, weightUnit: 'oz' } }, // "7.5 × 4.6 × 2.3 in and 5.0 oz"
  { slug: 'bizzikins', product: null, category: 'toys',
    pkg: { dims: [16.1, 9.2, 3.9], unit: 'in', weight: 17.3, weightUnit: 'oz' } }, // "a 16.1 × 9.2 × 3.9 in box at 17.3 oz"
];

/** The margin block for a business, or for one product tab of it. */
function marginBlock(profile, product) {
  const blocks = profile?.blocks ?? [];
  if (!product) return blocks.find((b) => b.type === 'margin') ?? null;
  for (const b of blocks) {
    if (b.type !== 'product-margins' && b.type !== 'product-tabs') continue;
    const p = b.products.find((x) => x.id === product);
    if (p) return { margin: p.blocks.find((x) => x.type === 'margin') ?? null, label: p.label };
  }
  return null;
}

const sum = (lines) => lines.reduce((a, l) => a + l.amount, 0);
const toIn = (v, unit) => (unit === 'cm' ? v / 2.54 : v);
const toLb = (v, unit) => (unit === 'oz' ? v / 16 : unit === 'kg' ? v * 2.2046226218 : unit === 'g' ? v / 453.59237 : v);

/**
 * Each preset with its per-unit lines resolved from the profile. A preset
 * whose block is missing, or whose lines lack a dollar amount, is dropped
 * rather than shown with a hole in it.
 */
export function fbaPresets() {
  const out = [];
  for (const p of PRESETS) {
    const profile = profileFor(p.slug);
    if (!profile) continue;
    const found = marginBlock(profile, p.product);
    const block = p.product ? found?.margin : found;
    if (!block || !block.basis?.value) continue;
    const lines = block.lines;
    if (lines.some((l) => typeof l.amount !== 'number')) continue;
    const pick = (re) => lines.filter((l) => re.test(l.label));
    const goods = pick(/cost of goods|manufactur|tariff/i);
    const freight = pick(/^shipping$|freight/i);
    const referral = pick(/referral/i);
    const fba = pick(/fba/i);
    const ads = pick(/advertis/i);
    /* Every line must land in exactly one bucket, or the profit here would
       differ from the profile's. */
    if (goods.length + freight.length + referral.length + fba.length + ads.length !== lines.length) continue;
    if (!goods.length || referral.length !== 1 || fba.length !== 1) continue;

    const price = block.basis.value;
    const r = {
      productCost: sum(goods), inboundShipping: sum(freight), referral: sum(referral), fba: sum(fba), ads: sum(ads),
    };
    const profit = price - r.productCost - r.inboundShipping - r.referral - r.fba - r.ads;
    out.push({
      id: p.product ? `${p.slug}:${p.product}` : p.slug,
      slug: p.slug,
      product: p.product ? found.label : null,
      category: p.category,
      priceLabel: block.basis.label,
      price,
      ...r,
      adPct: price > 0 ? (r.ads / price) * 100 : 0,
      profit,
      marginPct: (profit / price) * 100,
      pkg: p.pkg,
      lengthIn: toIn(p.pkg.dims[0], p.pkg.unit),
      widthIn: toIn(p.pkg.dims[1], p.pkg.unit),
      heightIn: toIn(p.pkg.dims[2], p.pkg.unit),
      weightLb: toLb(p.pkg.weight, p.pkg.weightUnit),
    });
  }
  return out;
}
