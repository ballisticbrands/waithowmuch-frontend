/**
 * Authored business profiles.
 *
 * The prose here is HARDCODED and written by hand. The FIGURES are not: a
 * `stat` block names a metric key and a `chart` block names the series, and
 * both are resolved from the DB at render time.
 *
 * 🚨 That split is the entire design. The moment a revenue number is typed
 * into a paragraph it starts drifting from the chart directly above it, and
 * nothing will ever tell you — the page just quietly contradicts itself. If
 * you want to say a number in prose, use a stat block.
 *
 * Plain .mjs with a sibling .d.ts because scripts/postbuild-spa-routes.mjs is
 * plain Node and imports this same module to emit the crawler-visible copy.
 * Prose that lives only in JSX is invisible to the prerender, and a profile
 * page that renders beautifully while serving an empty shell to Google is the
 * single most expensive defect in this stack.
 *
 * A slug with no entry here falls back to the generic DB-driven page.
 */

/** @type {Record<string, import('./types').Profile>} */
export const PROFILES = {
  'dummy-widgets': {
    intro:
      'A placeholder profile, kept so the renderer has something to exercise. Every word and figure here is invented.',
    blocks: [
      { type: 'heading', text: 'What it is' },
      {
        type: 'prose',
        text:
          'Dummy Widgets Co exists to prove that this page renders: the authored prose, the pulled figures, the chart and the timeline. Replace it with a real profile and delete this entry.',
      },
      { type: 'stat', metric: 'latestMonthlyRevenue', label: 'Revenue / mo' },
      { type: 'stat', metric: 'latestMarginPct', label: 'Margin' },
      { type: 'heading', text: 'The numbers' },
      { type: 'chart' },
      { type: 'heading', text: 'How it grew' },
      {
        type: 'list',
        items: [
          'Short-form video before the first listing went live',
          'One post carried a disproportionate share of the first big month',
          'Paid acquisition arrived late, after organic had already worked',
        ],
      },
      { type: 'heading', text: 'Timeline' },
      {
        type: 'timeline',
        items: [
          { when: 'Early', what: 'Audience built before there was anything to sell' },
          { when: 'Launch', what: 'First product listed' },
          { when: 'Peak', what: 'Seasonal spike, then the long rebuild' },
        ],
      },
      {
        type: 'callout',
        text: 'Figures on this page are modelled from public information, not read from the company’s accounts.',
      },
    ],
  },
};

export function profileFor(slug) {
  return PROFILES[slug];
}
