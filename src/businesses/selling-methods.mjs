/**
 * The selling-method taxonomy — every way a physical-products business can
 * take money, in ONE list.
 *
 * 🚨 THIS FILE EXISTS SO THAT ANSWERS ARE COMPARABLE. A profile does not name
 * its own methods; it supplies a status against an id from this list. Let a
 * profile invent "tiktok" while another writes "TikTok Shop" and the two are
 * different bars on any chart that counts them, which is the one thing this
 * data is for.
 *
 * ── Multi-select, deliberately ───────────────────────────────────────────
 * A business is not FBA *or* FBM — it is routinely both, and pushing the
 * heavy or slow lines to FBM while the rest stays on FBA is a normal, often
 * deliberate choice. The `Sourcing` attribute on a profile answers a different
 * question ("which single method does most of the revenue come from") because
 * the valuation board needs ONE answer to attach a multiple to. This answers
 * "which are present", and only a multi-select can be counted into a chart:
 * a business labelled "Mixed" belongs to neither the FBA bar nor the FBM bar,
 * so a single-select taxonomy destroys the very thing the chart needs.
 *
 * ── Three states, not two ────────────────────────────────────────────────
 * `yes`, `no`, and `unchecked`. A survey can use two because somebody was
 * asked; this site infers from the public record, so "nobody looked" is a real
 * and common state and it must not be silently folded into "no". Anything a
 * profile does not mention is `unchecked` — which keeps profiles short and,
 * more importantly, keeps the denominator honest: a chart counts a method
 * against the businesses CHECKED for it, never against all of them.
 *
 * Plain .mjs with a sibling .d.mts for the same reason as index.mjs — the
 * build scripts are plain Node and cannot import TypeScript.
 */

/** The four questions the groups answer, in the order a reader asks them. */
export const SELLING_GROUPS = [
  { id: 'channels', title: 'Channels', blurb: 'Where the sale happens.' },
  { id: 'fulfilment', title: 'Fulfilment', blurb: 'Who holds the stock and ships the order.' },
  { id: 'supply', title: 'Supply', blurb: 'Where the goods come from.' },
  { id: 'programs', title: 'Programmes', blurb: 'What the seller is enrolled in.' },
];

/**
 * Every method, with the group it belongs to.
 *
 * 🚨 `wholesale-out` and `wholesale-in` are NOT the same thing and both are
 * needed. Selling your own brand into a retailer is a revenue channel; buying
 * someone else's brand to resell is a supply method. Collapsing them into one
 * "wholesale" row is the single easiest way to make this data meaningless.
 */
export const SELLING_METHODS = [
  // ── Channels ───────────────────────────────────────────────────────────
  { id: 'amazon-domestic', group: 'channels', label: 'Amazon — home marketplace' },
  { id: 'amazon-international', group: 'channels', label: 'Amazon — other marketplaces' },
  { id: 'own-store', group: 'channels', label: 'Own store' },
  { id: 'tiktok-shop', group: 'channels', label: 'TikTok Shop' },
  { id: 'other-marketplace', group: 'channels', label: 'Other marketplaces' },
  { id: 'wholesale-out', group: 'channels', label: 'Wholesale or retail distribution' },
  { id: 'licensing', group: 'channels', label: 'Licensing the brand or IP' },

  // ── Fulfilment ─────────────────────────────────────────────────────────
  { id: 'fba', group: 'fulfilment', label: 'FBA' },
  { id: 'fbm', group: 'fulfilment', label: 'FBM' },
  { id: 'vendor-1p', group: 'fulfilment', label: '1P / Vendor Central' },
  { id: 'platform-fulfilled', group: 'fulfilment', label: 'Platform-fulfilled' },

  // ── Supply ─────────────────────────────────────────────────────────────
  { id: 'private-label', group: 'supply', label: 'Private label' },
  { id: 'white-label', group: 'supply', label: 'White label' },
  { id: 'manufacturer', group: 'supply', label: 'Own manufacturing' },
  { id: 'wholesale-in', group: 'supply', label: 'Wholesale reselling' },
  { id: 'dropship', group: 'supply', label: 'Dropship' },
  { id: 'arbitrage', group: 'supply', label: 'Arbitrage' },
  { id: 'handmade', group: 'supply', label: 'Handmade / artisan' },
  { id: 'pod', group: 'supply', label: 'Print on demand' },
  { id: 'merch-on-demand', group: 'supply', label: 'Merch on Demand' },
  { id: 'kdp', group: 'supply', label: 'KDP' },

  // ── Programmes ─────────────────────────────────────────────────────────
  { id: 'brand-registry', group: 'programs', label: 'Brand Registry' },
  { id: 'amazon-custom', group: 'programs', label: 'Amazon Custom' },
  { id: 'amazon-handmade', group: 'programs', label: 'Amazon Handmade' },
  { id: 'subscribe-save', group: 'programs', label: 'Subscribe & Save' },
  { id: 'b2b', group: 'programs', label: 'Amazon Business (B2B)' },
];

/** The method ids a profile may answer against, for a quick membership test. */
export const SELLING_METHOD_IDS = new Set(SELLING_METHODS.map((m) => m.id));

/**
 * A profile's answers, resolved against the taxonomy and grouped for render.
 *
 * Anything the profile does not mention comes back `unchecked` rather than
 * being dropped — the whole point of the third state is that a method nobody
 * looked for is visible as such.
 */
export function resolveSelling(selling) {
  const answers = selling ?? {};
  return SELLING_GROUPS.map((group) => ({
    ...group,
    methods: SELLING_METHODS.filter((m) => m.group === group.id).map((m) => {
      const a = answers[m.id];
      const status = a?.status ?? 'unchecked';
      return { ...m, status, note: a?.note, flag: a?.flag === true };
    }),
  })).filter((g) => g.methods.length > 0);
}
