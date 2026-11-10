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
 * Every post carries a `category` (one of CATEGORIES in blog.mjs) and, once
 * published, a `published` date (YYYY-MM-DD). An optional `image`
 * ({ src, alt, width, height }) replaces the black title card as the hero and
 * the og:image. The build fails on a published post missing category or date.
 *
 * Keyword volumes are US/month from Google Keyword Planner (2026-10-19 pulls,
 * 2,637 merged keywords). `comp` is Keyword Planner's own competition rating.
 */

import b0 from './posts/how-much-does-amazon-take-from-sellers.mjs';
import b1 from './posts/is-amazon-fba-still-profitable.mjs';
import b2 from './posts/how-much-does-amazon-fba-cost-to-start.mjs';
import b3 from './posts/how-much-do-amazon-sellers-make.mjs';
import b4 from './posts/amazon-fba-fees-2026.mjs';
import b5 from './posts/jungle-scout-alternatives.mjs';
import b6 from './posts/helium-10-alternatives.mjs';
import b7 from './posts/best-amazon-product-research-tools.mjs';
import b8 from './posts/best-products-to-sell-on-amazon.mjs';
import b9 from './posts/top-amazon-sellers-by-revenue.mjs';
import b10 from './posts/how-much-does-it-cost-to-start-an-ecommerce-business.mjs';
import b11 from './posts/private-label-vs-wholesale-vs-dropshipping-on-amazon.mjs';
import b12 from './posts/amazon-seller-insurance-requirement-2026.mjs';
import b13 from './posts/amazon-referral-fees-by-category.mjs';
import b14 from './posts/selling-books-on-amazon-fba.mjs';
import b15 from './posts/is-alibaba-legit.mjs';
import b16 from './posts/alibaba-vs-aliexpress.mjs';
import b17 from './posts/how-much-do-tariffs-add-to-amazon-products.mjs';
import b18 from './posts/amazon-fba-storage-fees.mjs';
import b19 from './posts/how-to-start-amazon-fba-with-no-money.mjs';
import b20 from './posts/how-to-start-selling-on-amazon.mjs';
import b21 from './posts/amazon-fba-courses.mjs';
import b22 from './posts/best-3pl-for-ecommerce.mjs';
import b23 from './posts/print-on-demand-vs-dropshipping.mjs';

/** @type {import('./content').Post[]} */
export const POSTS = [
  // ── Tier 1: real volume, LOW competition, answerable from existing research ──
  {
    slug: 'how-much-does-amazon-take-from-sellers', category: 'Fees & costs', published: '2026-10-20',
    title: 'How Much Does Amazon Take From Sellers?',
    kw: 'how much does amazon take from sellers', vol: 480, comp: 'Low',
    tier: 1, status: 'published',
    body: b0,
    angle:
      'Referral fee + FBA fulfilment + storage, worked through on real unit economics ' +
      'rather than the fee table everyone else republishes. Lead with a single ASIN: ' +
      'on a $6.97 product the FBA fee alone is $3.01 — 43% before COGS.',
    cite: ['spite-house-games', 'ototo', 'white-mountain-puzzles'],
  },
  {
    slug: 'is-amazon-fba-still-profitable', category: 'Data & rankings', published: '2026-10-20',
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
    slug: 'how-much-does-amazon-fba-cost-to-start', category: 'Fees & costs', published: '2026-10-20',
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
    slug: 'how-much-do-amazon-sellers-make', category: 'Data & rankings', published: '2026-10-20',
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
    slug: 'how-to-start-selling-on-amazon', published: '2026-11-10', category: 'Getting started',
    title: 'How to Start Selling on Amazon (2026)',
    kw: 'how to start amazon selling', vol: 1900, comp: 'Medium',
    tier: 2, status: 'published', body: b20,
    angle: 'Beginner head term. Differentiate with real cost and timeline data per step.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-an-amazon-business', category: 'Getting started',
    title: 'How to Start an Amazon Business',
    kw: 'how to start an amazon business', vol: 720, comp: 'Medium',
    tier: 2, status: 'draft',
    angle: 'Business-model framing (private label / wholesale / arbitrage) vs the mechanics post above.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-amazon-fba', category: 'Getting started',
    title: 'How to Start Amazon FBA',
    kw: 'how to start amazon fba', vol: 480, comp: 'Medium',
    tier: 2, status: 'draft',
    angle: 'FBA-specific mechanics. Heavy internal linking to the fees and cost posts.',
    cite: ['*'],
  },

  // ── Niche entry posts (volume lives in beginner niches, not interesting ones) ──
  {
    slug: 'selling-books-on-amazon-fba', category: 'Getting started', published: '2026-11-10',
    title: 'Selling Books on Amazon FBA: What It Actually Pays',
    kw: 'selling books on amazon', vol: 9900, comp: 'Low',
    tier: 1, status: 'published', body: b14,
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
    slug: 'is-alibaba-legit', category: 'Sourcing', published: '2026-11-10',
    title: 'Is Alibaba Legit? What Real Amazon Brands Paid Their Suppliers',
    kw: 'is alibaba legit', vol: 18100, comp: null,
    tier: 2, status: 'published', body: b15,
    angle:
      'Cluster 18,630/mo, SD 27; cosmosourcing (DA 20) ranks #6, so a small site can get ' +
      'in. Our angle: the factory quotes behind the businesses we model (Accio/Alibaba ' +
      'quotes are already on file for several), not a trust-badge checklist.',
    cite: ['draft-top', 'songbird-specialties', 'gamblin-golf', 'ototo', 'restoration-games'],
  },
  {
    slug: 'alibaba-vs-aliexpress', category: 'Sourcing', published: '2026-11-10',
    title: 'Alibaba vs AliExpress: Unit Costs Compared on Real Products',
    kw: 'alibaba vs aliexpress', vol: 6600, comp: null,
    tier: 2, status: 'published', body: b16,
    angle:
      'Cluster 6,940/mo, median SD 21. Price the same products from both against the ' +
      'cost of goods in our margin models.',
    cite: ['spite-house-games', 'white-mountain-puzzles', 'draft-top', 'ototo', 'songbird-specialties'],
  },
  {
    slug: 'how-much-do-tariffs-add-to-amazon-products', category: 'Sourcing', published: '2026-11-10',
    title: 'How Much Do Tariffs Add to an Amazon Product?',
    kw: 'tariff calculator', vol: 3600, comp: null,
    tier: 2, status: 'published', body: b17,
    angle:
      'Cluster 17,130/mo, SD 11 on the head term. Searchers want a calculator; we have ' +
      'no duty-rate data yet. Our margin models already carry a tariff line per ' +
      'business, so start with those as worked examples and add a tool once rates are sourced.',
    cite: ['*'],
  },
  {
    slug: 'amazon-fba-fees-2026', category: 'Fees & costs', published: '2026-11-10',
    title: 'Amazon FBA Fees 2026: The Full Schedule, Worked on Real Products',
    kw: 'amazon fba fees', vol: 2900, comp: null,
    tier: 1, status: 'published',
    body: b4,
    angle:
      'Cluster 6,120/mo, SD 15. Page 1 is Amazon itself plus Reddit, so the realistic ' +
      'target is the long tail (named fees, size tiers, "2026"). The fee-schedule ' +
      'reference; links to the FBA calculator and leaves "how much does Amazon take" ' +
      'to that post.',
    cite: [
      'white-mountain-puzzles', 'spite-house-games', 'draft-top', 'songbird-specialties',
      'doctor-jupiter', 'virora-mahjong', 'restoration-games', 'lighten-life', 'wet-noses',
      'ototo', 'highmark-collective', 'kajun-loaded-tea', 'maryruth', 'gamblin-golf',
    ],
  },

  // ── Trend radar picks: ship within ~48h of the spike (Dragon-marketing/skills/WHM-trend-radar) ──
  {
    slug: 'amazon-seller-insurance-requirement-2026', category: 'Policy', published: '2026-11-10',
    title: "Amazon's New Liability Insurance Rule: Who Needs It and What It Costs",
    kw: 'amazon seller insurance', vol: 140, comp: null,
    tier: 1, status: 'published', body: b12,
    angle:
      'Trigger: Amazon\'s announcement posted 2026-09-03, effective 2026-11-02 (Seller Forums, news and announcements, ' +
      'thread 287d5c33-8278-4802-ba69-2f58f7dda408; 4.9k views). The rule: $1M per ' +
      'occurrence and aggregate was already required within 30 days of a $10k gross-proceeds ' +
      'month; now it is required REGARDLESS of sales for categories with enhanced safety ' +
      'listing requirements (children\'s products, cosmetics, ingestibles, lithium batteries, ' +
      'more), and China-based sellers must buy through the Amazon Insurance Accelerator. ' +
      'WHM angle: which of our businesses sit in those categories (toys, supplements, drink ' +
      'mixes...), and the premium as a share of revenue for a launch-stage seller vs an ' +
      'established one. Premium figures must come from insurer quotes or published rate ' +
      'pages, never from memory. Keywords: 140/mo, SD 28, $33 CPC; "requirements" 40/mo ' +
      '(Ubersuggest lags new policies; the forum thread is the real signal).',
    cite: ['*'],
  },

  // ── Added from the 2026-11-09 research shortlist (clusters 6, 7, 12) ──
  {
    slug: 'best-products-to-sell-on-amazon', category: 'Data & rankings', published: '2026-11-10',
    title: 'The Best Products to Sell on Amazon, Ranked by Real Seller Revenue',
    kw: 'best products to sell on amazon', vol: 720, comp: null,
    tier: 1, status: 'published', body: b8,
    angle:
      'Cluster 1,670/mo, median SD 37; secondaries "for beginners" (170), "fba" (170), ' +
      '"trending products to sell on amazon" (50/19). Fit 3: this is literally the WHM ' +
      'database filtered by product and sorted by revenue, with margin and startup cost ' +
      'beside each. Every other list is opinion; ours is measured.',
    cite: ['*'],
  },
  {
    slug: 'how-much-does-it-cost-to-start-an-ecommerce-business', category: 'Fees & costs', published: '2026-11-10',
    title: 'How Much Does It Cost to Start an E-commerce Business? Real Numbers',
    kw: 'how much does it cost to start a business', vol: 1000, comp: null,
    tier: 2, status: 'published', body: b10,
    angle:
      'Cluster 3,740/mo, but SD 35-42 on the generic phrasings, so aim at the "online / ' +
      'e-commerce" variants. Niche long tail (jewelry, clothing, skincare, coffee, ' +
      'supplements, candles, board games) is 10-40/mo each: cover them as sections of this ' +
      'one hub, not separate posts. Distinct from how-much-does-amazon-fba-cost-to-start, ' +
      'which is Amazon-only: link to it rather than repeat it.',
    cite: ['*'],
  },
  {
    slug: 'amazon-referral-fees-by-category', category: 'Fees & costs', published: '2026-11-10',
    title: 'Amazon Referral Fees by Category (2026)',
    kw: 'amazon referral fee', vol: 260, comp: null,
    tier: 2, status: 'published', body: b13,
    angle:
      'Cluster 730/mo, median SD 10 (head term SD 34; "by category" variants SD 41-46). ' +
      'The full category table plus minimums and tiered categories, with which category ' +
      'each WHM business sells in and what it pays. Must not duplicate amazon-fba-fees-2026: ' +
      'that post summarises referral fees and links here for the full table.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-an-amazon-t-shirt-business', category: 'Getting started',
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
    slug: 'how-to-check-another-amazon-sellers-revenue', category: 'Data & rankings',
    title: "How to Check Another Amazon Seller's Revenue",
    kw: null, vol: null, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Methodology post — the exact technique used on every case study. Doubles as the ' +
      'credibility artifact AI crawlers key on, and links naturally to /how-we-research.',
    cite: ['*'],
  },
  {
    slug: 'top-amazon-sellers-by-revenue', category: 'Data & rankings', published: '2026-11-10',
    title: 'Top Amazon Sellers by Revenue',
    kw: 'top amazon sellers', vol: 720, comp: null,
    tier: 2, status: 'published', body: b9,
    angle: 'Listicle fed directly from the database; regenerates as the catalogue grows.',
    cite: ['*'],
  },
  {
    slug: 'how-to-analyse-an-amazon-store', category: 'Data & rankings',
    title: 'How to Analyse an Amazon Store',
    kw: null, vol: null, comp: null,
    tier: 3, status: 'draft',
    angle: 'Teaches the method. Pairs with the revenue-check post.',
    cite: ['*'],
  },
  {
    slug: 'is-amazon-fba-saturated', category: 'Data & rankings',
    title: 'Is Amazon FBA Saturated?',
    kw: null, vol: null, comp: null,
    tier: 2, status: 'draft',
    angle: 'Answer with launch dates — businesses that started recently and still worked.',
    cite: ['*'],
  },
  {
    slug: 'private-label-vs-wholesale-vs-dropshipping-on-amazon', category: 'Getting started', published: '2026-11-10',
    title: 'Private Label vs Wholesale vs Dropshipping on Amazon',
    kw: 'private label vs wholesale', vol: 30, comp: null,
    tier: 3, status: 'published', body: b11,
    angle: 'Compare on observed margin by model, not theory.',
    cite: ['*'],
  },

  // ── Batch 2 (2026-11-10): the research's "not covered yet" list ──
  {
    slug: 'amazon-fba-storage-fees', published: '2026-11-10', category: 'Fees & costs',
    title: 'Amazon FBA Storage Fees in 2026: Monthly, Aged and Peak, Worked on Real Stock',
    kw: 'fba amazon storage fees', vol: 170, comp: null,
    tier: 2, status: 'published', body: b18,
    angle:
      'Cluster 440/mo, median SD 19. Monthly storage by season and size, the aged-inventory ' +
      'surcharge, utilisation surcharge, the Feb 2027 unified fee. Use src/data/fba-fees-2026.mjs ' +
      'and the FBA calculator (which already computes storage); don\'t repeat amazon-fba-fees-2026 ' +
      'prose, go deeper with worked examples on our businesses\' real box sizes.',
    cite: ['*'],
  },
  {
    slug: 'de-minimis-for-ecommerce-sellers', category: 'Policy',
    title: 'The End of De Minimis: What It Costs E-commerce Sellers',
    kw: 'will de minimis come back', vol: 390, comp: null,
    tier: 2, status: 'draft',
    angle:
      'Cluster 40,080/mo but median SD 46: a long shot on the head terms, realistic on the ' +
      'seller long tail. What the suspension changed (Federal Register 2026-12670 / 2026-12669), ' +
      'who pays what now, and what it means for a small brand importing from China, with our ' +
      'businesses\' tariff lines as worked examples. Link the tariffs post and the tariff calculator.',
    cite: ['*'],
  },
  {
    slug: 'how-to-start-amazon-fba-with-no-money', published: '2026-11-10', category: 'Getting started',
    title: 'Can You Start Amazon FBA With Little or No Money? Real Budgets',
    kw: 'how to start amazon fba with no money', vol: 30, comp: null,
    tier: 3, status: 'published', body: b19,
    angle:
      'Cluster 90/mo, SD 27, fit 3. The cheapest real first tests in our database ("to test" ' +
      'cost), what can and can\'t be skipped, and honest answers on "no money" (it isn\'t zero).',
    cite: ['*'],
  },
  {
    slug: 'amazon-fba-courses', published: '2026-11-10', category: 'Getting started',
    title: 'Are Amazon FBA Courses Worth It? What the Numbers Say',
    kw: 'amazon fba course', vol: 320, comp: null,
    tier: 3, status: 'published', body: b21,
    angle:
      'Cluster 700/mo, SD 41: above our usual ceiling. Angle: what a course costs vs what a ' +
      'first product test costs in our data. Course prices from official pages only; no ' +
      'ratings, no "we took the course" claims.',
    cite: ['*'],
  },
  {
    slug: 'best-3pl-for-ecommerce', published: '2026-11-10', category: 'Sourcing',
    title: '3PL for E-commerce: When You Need One and What It Costs',
    kw: '3pl for ecommerce', vol: 880, comp: null,
    tier: 2, status: 'published', body: b22,
    angle:
      'Cluster 920/mo, SD 22, fit 1. FBA vs 3PL vs AWD on real cost lines; published 3PL ' +
      'pricing from official pages only; which of our businesses run multi-channel (White ' +
      'Mountain, Mount Cleverest, Kalotoys) and how they fulfil.',
    cite: ['*'],
  },
  {
    slug: 'print-on-demand-vs-dropshipping', published: '2026-11-10', category: 'Getting started',
    title: 'Print on Demand vs Dropshipping: Which Makes More Per Sale?',
    kw: 'print on demand vs dropshipping', vol: 90, comp: null,
    tier: 3, status: 'published', body: b23,
    angle:
      'Cluster 150/mo, SD 5. Unit economics of both, from official POD price lists and ' +
      'platform fees, against a private-label product in our data as the third option.',
    cite: ['white-mountain-puzzles'],
  },

  // ── Tool comparison: pure commercial intent ──
  { slug: 'jungle-scout-alternatives', category: 'Tools', published: '2026-11-10', title: 'Jungle Scout Alternatives (2026)',
    kw: 'jungle scout alternatives', vol: 90, comp: null, tier: 2, status: 'published', body: b5,
    angle: 'High intent. Be genuinely even-handed — a rigged comparison reads as one instantly.', cite: ['*'] },
  { slug: 'helium-10-alternatives', category: 'Tools', published: '2026-11-10', title: 'Helium 10 Alternatives (2026)',
    kw: 'helium 10 alternatives', vol: 90, comp: null, tier: 2, status: 'published', body: b6, angle: 'As above.', cite: ['*'] },
  { slug: 'best-amazon-product-research-tools', category: 'Tools', published: '2026-11-10', title: 'Best Amazon Product Research Tools',
    kw: 'product research amazon', vol: 480, comp: null, tier: 3, status: 'published', body: b7, angle: 'Roundup; the format LLMs cite for "best tool" questions.', cite: ['*'] },
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
