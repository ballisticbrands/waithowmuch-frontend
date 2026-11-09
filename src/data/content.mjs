/**
 * The content plan: every blog post and glossary term, with the keyword
 * evidence behind it.
 *
 * 🚨 `status` is the publish gate. Only `published` entries render, enter the
 * sitemap, or get prerendered. A `draft` is invisible to users and to Google —
 * which is the point: an empty placeholder that Google crawls is thin content,
 * and thin content at scale on a young domain is the one thing that is genuinely
 * hard to recover from. Flip to `published` when the body is written, not before.
 *
 * Plain .mjs with a sibling .d.mts because scripts/postbuild-spa-routes.mjs is
 * plain Node and must read the same source the React app renders from.
 *
 * Keyword volumes are US/month from Google Keyword Planner (2026-10-19 pulls,
 * 2,637 merged keywords). `comp` is Keyword Planner's own competition rating.
 */

import b0 from './posts/how-much-does-amazon-take-from-sellers.mjs';
import b1 from './posts/is-amazon-fba-still-profitable.mjs';
import b2 from './posts/how-much-does-amazon-fba-cost-to-start.mjs';
import b3 from './posts/how-much-do-amazon-sellers-make.mjs';

/** @type {import('./content').Post[]} */
export const POSTS = [
  // ── Tier 1: real volume, LOW competition, answerable from existing research ──
  {
    slug: 'how-much-does-amazon-take-from-sellers',
    title: 'How Much Does Amazon Take From Sellers?',
    kw: 'how much does amazon take from sellers', vol: 480, comp: 'Low',
    tier: 1, status: 'published',
    body: b0,
    angle:
      'Referral fee + FBA fulfilment + storage, worked through on real unit economics ' +
      'rather than the fee table everyone else republishes. Lead with a single ASIN: ' +
      'on a $6.97 product the FBA fee alone is $2.56 — 37% before COGS.',
    cite: ['spite-house-games', 'ototo', 'white-mountain-puzzles'],
  },
  {
    slug: 'is-amazon-fba-still-profitable',
    title: 'Is Amazon FBA Worth It in 2026? Margins From 13 Real Businesses',
    kw: 'is amazon fba worth it', vol: 320, comp: 'Low',
    tier: 1, status: 'published',
    body: b1,
    angle:
      'Answer with the margin distribution across every business researched, not an ' +
      'opinion. State the spread and the worst case, not just the winners. Retargeted ' +
      '2026-11-10 from "amazon profitable" (1,000), whose volume is mostly people asking ' +
      'whether Amazon the company is profitable. "is amazon fba worth it" is 320/mo, SD 20 ' +
      '(Ubersuggest); the slug stays so the indexed URL keeps its history.',
    cite: ['*'],
  },
  {
    slug: 'how-much-does-amazon-fba-cost-to-start',
    title: 'How Much Does Amazon FBA Cost to Start?',
    kw: 'how much does amazon fba cost', vol: 110, comp: 'Low',
    tier: 1, status: 'published',
    body: b2,
    angle:
      'Startup cost actually observed per business, not a budget template. Where ' +
      'startingCost is unknown, say so — the honesty is the differentiator.',
    cite: ['*'],
  },
  {
    slug: 'how-much-do-amazon-sellers-make',
    title: 'How Much Do Amazon Sellers Actually Make?',
    kw: 'how much do amazon sellers make', vol: 90, comp: 'Low',
    tier: 1, status: 'published',
    body: b3,
    angle:
      'The whole 44-keyword cluster ("average amazon seller", "per month", "beginner") ' +
      'is one intent. Cover them in one page with sub-headings rather than four thin posts.',
    cite: ['*'],
  },

  // ── Tier 2: bigger volume, Medium competition ──
  {
    slug: 'how-to-start-selling-on-amazon',
    title: 'How to Start Selling on Amazon (2026)',
    kw: 'how to start amazon selling', vol: 1900, comp: 'Medium',
    tier: 2, status: 'draft',
    angle: 'Beginner head term. Differentiate with real cost and timeline data per step.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-an-amazon-business',
    title: 'How to Start an Amazon Business',
    kw: 'how to start an amazon business', vol: 720, comp: 'Medium',
    tier: 2, status: 'draft',
    angle: 'Business-model framing (private label / wholesale / arbitrage) vs the mechanics post above.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-amazon-fba',
    title: 'How to Start Amazon FBA',
    kw: 'how to start amazon fba', vol: 480, comp: 'Medium',
    tier: 2, status: 'draft',
    angle: 'FBA-specific mechanics. Heavy internal linking to the fees and cost posts.',
    cite: ['*'],
  },

  // ── Niche entry posts (volume lives in beginner niches, not interesting ones) ──
  {
    slug: 'selling-books-on-amazon-fba',
    title: 'Selling Books on Amazon FBA: What It Actually Pays',
    kw: 'selling books on amazon', vol: 9900, comp: 'Low',
    tier: 1, status: 'draft',
    angle:
      'Biggest niche term found, by an order of magnitude. ⚠️ No book case study exists ' +
      'yet — research one first or the post has nothing proprietary in it. ⚠️ The SERP ' +
      'for "selling books on amazon" is mostly authors self-publishing (KDP), not ' +
      'resellers (2026-11-09 SERP check). Decide which reader this is for before writing.',
    cite: [],
  },

  // ── High-volume topics our data does not answer yet (2026-11-09 research) ──
  // Ubersuggest US volumes and SD; full list in Dragon-marketing/skills/WHM-SEO.
  // Each needs a WHM angle found before it is written, not a generic guide.
  {
    slug: 'is-alibaba-legit',
    title: 'Is Alibaba Legit? What Real Amazon Brands Paid Their Suppliers',
    kw: 'is alibaba legit', vol: 18100, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Cluster 18,630/mo, SD 27; cosmosourcing (DA 20) ranks #6, so a small site can get ' +
      'in. Our angle: the factory quotes behind the businesses we model (Accio/Alibaba ' +
      'quotes are already on file for several), not a trust-badge checklist.',
    cite: [],
  },
  {
    slug: 'alibaba-vs-aliexpress',
    title: 'Alibaba vs AliExpress: Unit Costs Compared on Real Products',
    kw: 'alibaba vs aliexpress', vol: 6600, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Cluster 6,940/mo, median SD 21. Price the same products from both against the ' +
      'cost of goods in our margin models.',
    cite: [],
  },
  {
    slug: 'how-much-do-tariffs-add-to-amazon-products',
    title: 'How Much Do Tariffs Add to an Amazon Product?',
    kw: 'tariff calculator', vol: 3600, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Cluster 17,130/mo, SD 11 on the head term. Searchers want a calculator; we have ' +
      'no duty-rate data yet. Our margin models already carry a tariff line per ' +
      'business, so start with those as worked examples and add a tool once rates are sourced.',
    cite: ['*'],
  },
  {
    slug: 'amazon-fba-fees-2026',
    title: 'Amazon FBA Fees 2026: The Full Schedule, Worked on Real Products',
    kw: 'amazon fba fees', vol: 2900, comp: null,
    tier: 1, status: 'draft',
    angle:
      'Cluster 6,120/mo, SD 15. Page 1 is Amazon itself plus Reddit, so the realistic ' +
      'target is the long tail (named fees, size tiers, "2026"). The fee-schedule ' +
      'reference; links to the FBA calculator and leaves "how much does Amazon take" ' +
      'to that post.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-an-amazon-t-shirt-business',
    title: 'How to Start an Amazon T-Shirt Business (2026)',
    kw: 'amazon t shirt business', vol: 30, comp: 'Medium',
    tier: 3, status: 'draft',
    angle:
      'Merges the POD cluster ("selling print on demand on amazon", 50). Low volume but ' +
      'low barrier — a common beginner entry point.',
    cite: [],
  },

  // ── Revenue-research posts: our native territory ──
  {
    slug: 'how-to-check-another-amazon-sellers-revenue',
    title: "How to Check Another Amazon Seller's Revenue",
    kw: null, vol: null, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Methodology post — the exact technique used on every case study. Doubles as the ' +
      'credibility artifact AI crawlers key on, and links naturally to /how-we-research.',
    cite: ['*'],
  },
  {
    slug: 'top-amazon-sellers-by-revenue',
    title: 'Top Amazon Sellers by Revenue',
    kw: null, vol: null, comp: null,
    tier: 2, status: 'draft',
    angle: 'Listicle fed directly from the database; regenerates as the catalogue grows.',
    cite: ['*'],
  },
  {
    slug: 'how-to-analyse-an-amazon-store',
    title: 'How to Analyse an Amazon Store',
    kw: null, vol: null, comp: null,
    tier: 3, status: 'draft',
    angle: 'Teaches the method. Pairs with the revenue-check post.',
    cite: ['*'],
  },
  {
    slug: 'is-amazon-fba-saturated',
    title: 'Is Amazon FBA Saturated?',
    kw: null, vol: null, comp: null,
    tier: 2, status: 'draft',
    angle: 'Answer with launch dates — businesses that started recently and still worked.',
    cite: ['*'],
  },
  {
    slug: 'private-label-vs-wholesale-vs-dropshipping-on-amazon',
    title: 'Private Label vs Wholesale vs Dropshipping on Amazon',
    kw: null, vol: null, comp: null,
    tier: 3, status: 'draft',
    angle: 'Compare on observed margin by model, not theory.',
    cite: ['*'],
  },

  // ── Tool comparison: pure commercial intent ──
  { slug: 'jungle-scout-alternatives', title: 'Jungle Scout Alternatives (2026)',
    kw: null, vol: null, comp: null, tier: 2, status: 'draft',
    angle: 'High intent. Be genuinely even-handed — a rigged comparison reads as one instantly.', cite: [] },
  { slug: 'helium-10-alternatives', title: 'Helium 10 Alternatives (2026)',
    kw: null, vol: null, comp: null, tier: 2, status: 'draft', angle: 'As above.', cite: [] },
  { slug: 'best-amazon-product-research-tools', title: 'Best Amazon Product Research Tools',
    kw: null, vol: null, comp: null, tier: 3, status: 'draft', angle: 'Roundup; the format LLMs cite for "best tool" questions.', cite: [] },
];

/**
 * Glossary: definitional long-tail. Cheap to write, ranks fast on a young
 * domain, and builds the topical authority the bigger posts need.
 * Deliberately 20, not 66 — see the pacing note in the skill.
 */
/** @type {import('./content').Term[]} */
export const TERMS = [
  ['acos', 'ACoS'], ['tacos', 'TACoS'], ['roas', 'ROAS'],
  ['buy-box', 'Buy Box'], ['asin', 'ASIN'], ['fnsku', 'FNSKU'], ['sku', 'SKU'],
  ['bsr', 'Best Sellers Rank (BSR)'], ['fba', 'FBA'], ['fbm', 'FBM'],
  ['referral-fee', 'Referral Fee'], ['fulfilment-fee', 'Fulfilment Fee'],
  ['storage-fee', 'Storage Fee'], ['long-term-storage-fee', 'Long-Term Storage Fee'],
  ['private-label', 'Private Label'], ['retail-arbitrage', 'Retail Arbitrage'],
  ['wholesale', 'Wholesale'], ['dropshipping', 'Dropshipping'],
  ['brand-registry', 'Amazon Brand Registry'], ['a-plus-content', 'A+ Content'],
  ['sell-through-rate', 'Sell-Through Rate'], ['unit-session-percentage', 'Unit Session Percentage'],
  ['landed-cost', 'Landed Cost'], ['contribution-margin', 'Contribution Margin'],
].map(([slug, term]) => ({ slug, term, status: 'draft' }));

export const publishedPosts = () => POSTS.filter((p) => p.status === 'published');
export const publishedTerms = () => TERMS.filter((t) => t.status === 'published');
export const postPath = (slug) => `/blog/${slug}/`;
export const termPath = (slug) => `/glossary/${slug}/`;
