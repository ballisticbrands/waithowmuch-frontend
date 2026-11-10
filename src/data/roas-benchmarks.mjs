/**
 * Real ad-spend benchmarks for the ROAS calculator.
 *
 * 🚨 Every figure is read from the business's own margin block in
 * src/businesses/index.mjs — the brand-level waterfall its /business/<slug>/
 * page renders (the plain `margin` block, or the `blended` tab of a brand
 * split by product). Nothing is typed in here, so the calculator can never
 * quote a business differently from its profile.
 *
 * What the profiles have, and therefore what this shows:
 *   - advertising as a share of revenue (the margin block's Advertising line),
 *     which is a TACoS: all ad spend over all sales;
 *   - the margin after advertising (100% less every line);
 *   - so the margin before advertising, and from it break-even ROAS and ACOS.
 *
 * What they do NOT have: ad-attributed sales. Nobody outside a seller's ad
 * account can see which sales an ad drove, so no business here has a ROAS or
 * an ACOS, and the page never shows one for them.
 *
 * Most Advertising lines are amazon-adspend-spy's MODELLED Sponsored Products
 * spend, a floor that cannot see automatic campaigns, product-page ads,
 * Sponsored Brands or Display. `basis` carries which kind each one is, read
 * from the line's own detail, so the page can say so beside the number.
 *
 * Which businesses are published comes from the API, as for the FBA
 * calculator: the page and the prerender drop any business not in it.
 */
import { PROFILES } from '../businesses/index.mjs';

/** Caveats a single number cannot carry, in the profile's own terms. */
const NOTES = {
  'kalotoys': "the founders' own marketing share less referral fees; the Amazon ads that can be seen model at under 2%",
  'white-mountain-puzzles': "blends Amazon (about 0.27%, modelled) with a paid Meta and Google programme on their own store; the margin covers all three channels",
  'mount-cleverest': 'Amazon and TikTok Shop together; their TikTok ads have no published spend',
};

/** The brand-level margin block: a plain `margin`, or the blended tab. */
function brandMargin(profile) {
  const blocks = profile?.blocks ?? [];
  const plain = blocks.find((b) => b.type === 'margin');
  if (plain) return plain;
  for (const b of blocks) {
    if (b.type !== 'product-margins') continue;
    const blended = b.products.find((p) => p.blended);
    const m = blended?.blocks.find((x) => x.type === 'margin');
    if (m) return m;
  }
  return null;
}

const FEES = /referral|fulfil|fba|marketplace|creator|card processing|postage/i;
const GOODS = /cost of goods|manufactur|tariff|packet|box|freight|^shipping$/i;

/**
 * One row per business whose brand-level margin has exactly one Advertising
 * line. Percentages are 0–100 here, as the profiles store them.
 */
export function roasBenchmarks() {
  const out = [];
  for (const [slug, profile] of Object.entries(PROFILES)) {
    const block = brandMargin(profile);
    if (!block?.basis?.value || !Array.isArray(block.lines)) continue;
    const ads = block.lines.filter((l) => /advertis/i.test(l.label));
    if (ads.length !== 1 || typeof ads[0].pct !== 'number') continue;
    const adPct = -ads[0].pct;
    const marginPct = 100 + block.lines.reduce((a, l) => a + l.pct, 0);
    const preAdPct = marginPct + adPct;
    const price = block.basis.value;
    const money = (l) => (typeof l.amount === 'number' ? l.amount : (-l.pct / 100) * price);
    const rest = block.lines.filter((l) => l !== ads[0]);
    const fees = rest.filter((l) => FEES.test(l.label));
    const goods = rest.filter((l) => !FEES.test(l.label) && GOODS.test(l.label));
    const other = rest.filter((l) => !fees.includes(l) && !goods.includes(l));
    const sum = (ls) => ls.reduce((a, l) => a + money(l), 0);
    const detail = ads[0].detail ?? '';
    out.push({
      slug,
      priceLabel: block.basis.label,
      price,
      productCost: sum(goods),
      fees: sum(fees),
      otherCosts: sum(other),
      adPct,
      marginPct,
      preAdPct,
      beRoas: preAdPct > 0 ? 100 / preAdPct : null,
      beAcosPct: preAdPct > 0 ? preAdPct : null,
      basis: /self-reported|founders/i.test(detail) ? 'reported' : /modelled/i.test(detail) ? 'modelled' : 'other',
      note: NOTES[slug] ?? null,
    });
  }
  return out.sort((a, b) => b.adPct - a.adPct);
}

/** The middle value, or null for an empty list. */
export function median(xs) {
  const s = xs.filter((x) => typeof x === 'number' && Number.isFinite(x)).sort((a, b) => a - b);
  if (!s.length) return null;
  const i = Math.floor(s.length / 2);
  return s.length % 2 ? s[i] : (s[i - 1] + s[i]) / 2;
}
