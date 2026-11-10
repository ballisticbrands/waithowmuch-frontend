/**
 * The words on the two Keepa-backed tools, as plain data:
 *   /tools/amazon-sales-estimator/          (one product)
 *   /tools/amazon-seller-revenue-calculator/ (a whole seller)
 *
 * 🚨 JSX-free on purpose, like fba-calculator-page.mjs: the prerender
 * (scripts/postbuild-spa-routes.mjs) emits exactly these strings as the
 * crawler HTML, and pages/SalesEstimator.tsx / StoreRevenue.tsx render the
 * same strings under the tool. One source, two renderers.
 *
 * Routes come from Ubersuggest (US, 2026-11-10): "amazon sales estimator"
 * 590/mo SD 34, "amazon sales calculator" 480 SD 34, "amazon sales estimator
 * free" 140, "free amazon sales estimator" 90, "amazon sales estimator by
 * asin" 40; "amazon seller revenue calculator" 50 SD 38 ("amazon store
 * revenue" has no measurable volume).
 *
 * The worked examples are real lookups, dated, not live figures: they say
 * what the tool returned on the day, which is how a reader should read them.
 */

export const ESTIMATOR_PATH = '/tools/amazon-sales-estimator/';
export const STORE_PATH = '/tools/amazon-seller-revenue-calculator/';
export const FBA_PATH = '/tools/amazon-fba-calculator/';

/** Data attribution, shown under both tools. Keepa is where the badge
 *  history and prices come from; Amazon is where the badge itself comes from. */
export const ATTRIBUTION =
  'Sales figures: Amazon\'s "bought in past month" badge and prices, via <a href="https://keepa.com" rel="nofollow noopener">Keepa</a>. Estimates, not the seller\'s accounts.';

const EXAMPLE_DATE = '10 November 2026';

// ─── Amazon sales estimator ──────────────────────────────────────────

export const ESTIMATOR = {
  path: ESTIMATOR_PATH,
  crumb: 'Amazon sales estimator',
  title: 'Amazon Sales Estimator: Monthly Sales by ASIN',
  /* The visible H1 and the one line above the tool; `title` stays the JSON-LD name. */
  h1: 'Amazon sales estimator',
  tagline: 'Monthly units and revenue for any ASIN, from Amazon\'s own "bought in past month" figure, plus fees and profit.',
  docTitle: 'Amazon Sales Estimator by ASIN (Free) | WaitHowMuch',
  description:
    "Free Amazon sales estimator: paste an ASIN or product link and see monthly units from Amazon's own \"bought in past month\" figure, revenue, FBA fees and profit per unit.",
  lede: `Paste an ASIN or an Amazon product link and see how many units it sells a month, read from <strong>Amazon's own "bought in past month" figure</strong> rather than guessed from its sales rank. You get the price, a monthly revenue range, Amazon's FBA and referral fees on the 2026 rate card, and profit per unit at the cost you enter.`,
  sections: [
    {
      id: 'how',
      title: 'How the estimate works',
      html: `<p>Since 2023 Amazon has printed a line under many listings: "1K+ bought in past month". It is Amazon's own count of orders, rounded down to a bucket. This tool reads that figure for the ASIN you paste, as recorded by Keepa, and multiplies it by the current price (the buy box where Keepa has it, otherwise the lowest new offer, which on a brand's own listing is usually the same thing) to give monthly revenue.</p>
<p>Because the badge is a floor, the answer is a range. "1K+" means at least 1,000 and fewer than 2,000, so a $20 product showing it sold between $20,000 and $39,980 that month. We show both ends rather than pretending to know the middle.</p>
<p>On ${EXAMPLE_DATE}, Spite House Games' adult Go Fish deck (ASIN B0FMGJSSXT) showed 10K+ bought in the past month at $9.99: between $99,900 and $199,790 of sales on one listing. The same company's <a href="/business/spite-house-games/">case study</a> shows what that turns into after Amazon's cut, printing and ads.</p>`,
    },
    {
      id: 'why-badge',
      title: "Why Amazon's own figure beats a sales-rank guess",
      html: `<p>Most Amazon sales estimators start from Best Sellers Rank and run it through a model: rank 2,000 in Toys is "about 900 a month". The rank is real, but the conversion is the tool vendor's guess. It is calibrated on a sample of sellers, it differs by category, and it moves hour to hour with every order. Two well-known tools can disagree by a factor of two on the same listing.</p>
<p>The badge is not a model. It is Amazon counting its own orders and publishing the result. It is coarse, but it is never invented, which matters when you are about to spend money on a product because of it. Where we have the badge we use it; where we do not, we say so.</p>`,
    },
    {
      id: 'limits',
      title: 'What it cannot tell you',
      html: `<ul>
<li><strong>Listings under about 50 a month show no badge.</strong> Amazon hides it below that, so the tool reports "under ~50 a month" and, when Keepa recorded a badge on the listing earlier, the last one it showed and when. It does not convert sales rank into a number for these listings: we have not been able to calibrate a rank model we would stand behind.</li>
<li><strong>Variations can share a figure.</strong> On some listings with sizes or colours, the badge counts the whole variation family, not the one child you pasted.</li>
<li><strong>It is one month.</strong> A card game in December and the same game in June can differ by three or four times. Do not multiply one month by twelve.</li>
<li><strong>Fees and profit are estimates.</strong> They use the packaged size and weight Amazon lists and our <a href="${FBA_PATH}">FBA fee calculator</a>'s 2026 rate card, and the referral category is our best match to the listing's category, which you can change.</li>
<li><strong>US marketplace only</strong>, for now.</li>
</ul>`,
    },
  ],
  faq: [
    {
      q: 'How can I see how many sales a product has on Amazon?',
      a: 'Look under the price on the listing for "bought in past month". That is Amazon\'s own count of the last 30 days, rounded down to a bucket such as 100+, 1K+ or 10K+. Paste the ASIN or link into the estimator above to see the figure, the price and the revenue range it implies, plus the fees.',
    },
    {
      q: 'Is this Amazon sales estimator free?',
      a: 'Yes. Product lookups are free and need no account. Results are cached for 24 hours, so the figure you see may be up to a day old; the time it was read is shown under the result.',
    },
    {
      q: 'How accurate is an Amazon sales estimate by ASIN?',
      a: 'With a badge, the floor is exact: it is Amazon\'s number. The true figure sits between that floor and the next bucket up, so "1K+" is 1,000 to 1,999. Revenue is that range times today\'s price, so price changes during the month are not reflected. Without a badge, all we can honestly say is "under about 50".',
    },
    {
      q: 'Why not estimate sales from the Best Sellers Rank?',
      a: 'Because the result would be our guess dressed up as data. Rank-to-sales curves differ by category and move constantly, and every vendor\'s curve is different. We show the rank for context, but only Amazon\'s badge drives the units and revenue.',
    },
    {
      q: 'Can I check a whole Amazon store\'s sales?',
      a: `Yes, with the <a href="${STORE_PATH}">Amazon seller revenue calculator</a>: paste a seller ID or storefront link and it adds up the badge times the price across every listing in the store that carries one.`,
    },
    {
      q: 'Where does the data come from?',
      a: 'The badge, price, category, package size and rank are Amazon\'s, read through Keepa, a service that has tracked Amazon listings since 2011. Fees are computed from Amazon\'s published 2026 rate card.',
    },
  ],
  related: [
    { href: STORE_PATH, label: 'Amazon seller revenue calculator' },
    { href: FBA_PATH, label: 'Amazon FBA calculator: 2026 fees and profit' },
    { href: '/blog/how-much-does-amazon-take-from-sellers/', label: 'How much does Amazon take from sellers?' },
  ],
};

// ─── Amazon seller revenue calculator ────────────────────────────────

export const STORE = {
  path: STORE_PATH,
  crumb: 'Amazon seller revenue calculator',
  title: 'Amazon Seller Revenue Calculator: Any Store\'s Monthly Sales',
  h1: 'Amazon seller revenue calculator',
  tagline: 'Paste a seller ID or storefront link to estimate the whole store\'s monthly revenue from Amazon\'s own sales figures.',
  docTitle: 'Amazon Seller Revenue Calculator (Free) | WaitHowMuch',
  description:
    "Estimate any Amazon seller's monthly revenue: paste a seller ID or storefront link and we add up Amazon's \"bought in past month\" figure times price across the whole store.",
  lede: `Paste an Amazon seller ID, a storefront link or one of the seller's products, and see roughly what the whole store sells a month. We add up <strong>Amazon's own "bought in past month" figure times the price</strong> across every listing in the store that shows one, the same method behind every Amazon case study on this site. The first lookup is free; a free account unlocks more.`,
  sections: [
    {
      id: 'how',
      title: 'How the store total is worked out',
      html: `<p>First we find the seller's full catalogue, not just the products on its brand-store page. A storefront page is a shop window: for White Mountain Puzzles it showed 43 products when the seller actually listed 497. Then we take every listing that carries Amazon's "bought in past month" badge, best sellers first, and add up badge × current price (the buy box where Keepa has it, otherwise the lowest new offer).</p>
<p>The result is a range, because every badge is a floor bucket: "1K+" is 1,000 to 1,999. The low end is what Amazon's figures prove the store sold at least; the high end is what they allow at most for those listings.</p>
<p>On ${EXAMPLE_DATE}, MaryRuth Organics' storefront had 281 listings, 196 of them with a badge. The top 100 alone added up to between $14.2 million and $21.2 million a month. Our <a href="/business/maryruth/">MaryRuth case study</a>, built by the same method across the full year, puts it at about $15 million.</p>`,
    },
    {
      id: 'finding-the-seller',
      title: 'Finding a seller ID',
      html: `<p>A seller ID is the code after <code>seller=</code> in the link on a seller's name: open any product, click the seller's name next to "Sold by", and copy the address. It starts with an A and is 13 or 14 characters long, like A3C12G0C3DENHY. You can also paste a product link or ASIN and we look up who holds its buy box. Brand-store links (<code>/stores/…</code>) do not contain the seller ID, so they will not work on their own.</p>`,
    },
    {
      id: 'limits',
      title: 'Why the real figure is usually higher',
      html: `<ul>
<li><strong>Listings without a badge count as zero.</strong> Each sells under about 50 a month, but a store with hundreds of them can add a meaningful amount we do not count.</li>
<li><strong>Large stores are capped.</strong> We price the 100 best-selling badged listings. When a store has more, the result says so, and the total is a floor for that reason too.</li>
<li><strong>Other sellers on the same listing.</strong> The badge counts every seller's orders on a listing, so a store reselling popular products is credited with sales it shares.</li>
<li><strong>One month, one marketplace.</strong> US only, and seasonal stores swing a lot: annualise with care.</li>
</ul>
<p>Store results are cached for up to three days.</p>`,
    },
  ],
  faq: [
    {
      q: 'How do I find out how much an Amazon seller makes?',
      a: 'Add up what each of its listings sells. Amazon shows a "bought in past month" figure on listings above about 50 orders a month; multiply each by its price and sum them across the seller\'s whole catalogue. This calculator does that from a seller ID. Revenue is not profit: after Amazon\'s fees, product cost and ads, the businesses we profile keep between about a fifth and a half of it.',
    },
    {
      q: 'Is the Amazon seller revenue calculator free?',
      a: 'Yes. The first store lookup needs nothing. After that, a free account (email only, or Google) unlocks up to 20 lookups a day. Product-level lookups on the sales estimator need no account at all.',
    },
    {
      q: 'Can I look up an Amazon store by brand name?',
      a: 'Not reliably, so we do not offer it. Brand names on Amazon are free text: a search for one common word matches thousands of unrelated listings. A seller ID identifies exactly one business. Paste one of the brand\'s products and we find its seller for you.',
    },
    {
      q: 'How accurate is it?',
      a: 'It is a floor, by construction, and usually a close one for brands whose sales are concentrated in a few listings. It runs low for stores with long tails of small listings or more than 100 badged products. For the businesses we have profiled in full, it lands in the same range as the case study.',
    },
    {
      q: 'Does it show profit?',
      a: `No, revenue only: a store's costs are not public. For one product, the <a href="${ESTIMATOR_PATH}">Amazon sales estimator</a> works out Amazon's fees and profit per unit at a product cost you enter.`,
    },
  ],
  related: [
    { href: ESTIMATOR_PATH, label: 'Amazon sales estimator by ASIN' },
    { href: FBA_PATH, label: 'Amazon FBA calculator: 2026 fees and profit' },
    { href: '/how-we-research/', label: 'How we research a business' },
  ],
};

/** FAQ answer as plain text, for JSON-LD. */
export const faqPlain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
