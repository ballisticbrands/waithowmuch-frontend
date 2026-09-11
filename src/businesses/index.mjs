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

/**
 * A Spite House listing photo, saved under public/products.
 *
 * Derived from the ASIN rather than typed out nine times, because the path IS
 * the ASIN — and nine hand-copied 10-character ids is a transcription error
 * waiting to point one row at another row's picture, which is the kind of
 * mistake that looks fine and is wrong.
 *
 * 🚨 Local copies, not Amazon's CDN. The images are cut-out product shots
 * lifted from the listings this profile already cites, and hotlinking them
 * would let a listing edit silently blank a column here — the page has no way
 * to notice a remote 404. Refresh them by re-running the fetch when the
 * listings change.
 */
const deckPhoto = (asin) => `/products/spite-house-games/${asin}.jpg`;

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

  'spite-house-games': {
    /* Case-study copy, verbatim from waithowmuch-research
       research/spitehouse/headline.json (writtenAt 2026-09-11). Every figure
       in it is tiered and traced there; the $0.50 freight plug is excluded
       because nobody quoted it.

       🚨 $90K is FROZEN at 2026-09 ($89,988, which money() renders $90k).
       It is not "the latest month" and must not be re-typed to follow one.
       When October lands, this sentence and the card under it will disagree
       — and the snapshot line is what keeps that honest rather than wrong.

       🚨 "NON-holiday high" — do not trim the qualifier. August 2026 was
       $96,958; December 2025 was $349,150, so an unqualified "new high" is
       simply false. The skill names this exact trap, and the sentence was
       rewritten once already to drop the collapse framing WITHOUT dropping
       this word. A qualifier that makes a sentence weaker usually makes it
       true. */
    headline: {
      title: 'How A $6.97 Deck Of Cards Makes $90K/Month',
      subtitle:
        'They built the audience first: the TikTok account opened seven weeks before the first deck was listed, and it now carries 45,400 followers. That audience took the catalogue to a new non-holiday high in August.',
      snapshotMonth: '2026-09',
    },
    /* 🚨 The multiple is the ONE authored number on this page, and it is a
       placeholder rather than a finding. Nothing public prices this business;
       2.5× is the low end of the small-FBA range, picked for a catalogue that
       is one product, one channel and violently seasonal. The valuation card
       multiplies it by trailing-twelve net profit off the series, so the
       figure moves when the data does — but the multiple itself is a knob
       waiting for a real model. Change it here, not in prose. */
    /* 🚨 The multiple is COMPUTED, not chosen. These are the inputs the
       ported model scores — see src/valuation/model.mjs for the rules and
       src/valuation/inputs.mjs for the three house rules that decide what
       goes in here.

       Everything absent is absent ON PURPOSE. Hours worked, suppliers,
       differentiation, Brand Registry, account health and team are answers
       only the owner can give; the model reports them as unscored rather than
       guessing, and the board says so under the columns. */
    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record rather than reads. All four are
             questionnaire answers in the original model, so they are the
             first things to put to the owner. */
          primaryMethod: 'private_label', // own designs, own brand, own listings

          /* Flagship, not category dominance. The shape argues for dominance —
             one product type in every variation — but that definition requires
             owning most of the variations IN THE CATEGORY, and this is #9 in
             Dedicated Deck Card Games with direct competitors on the same
             search page. One SKU takes 62% of revenue and 79% of units, with
             two priced ASINs that have never sold: a hero with filler. */
          catalogStructure: 'flagship',

          /* Differentiation level 3. No tooling — four printers quote this
             deck at $0.50–1.00 — but the game and every card in it are the
             owner's own design, and the spec's level 3 explicitly covers
             products "made from simple customisable materials such as paper".
             The counter-argument is that the object is a standard 52-card
             deck and the mechanic is public-domain Go Fish, which would make
             it level 2; the levels are 0.55 apart, the widest step in the
             model, so this one answer is worth more than any other here. */
          diffTooling: 'no',
          diffCustom: 'yes',

          /* Brand Registry, and this one IS a read rather than an inference:
             the brand runs an Amazon Brand Store at /stores/SpiteHouseGames
             and the hero listing carries A+ content. Amazon gates both behind
             Brand Registry enrolment. The trademark question is left unscored
             — enrolment usually implies a registered mark but not always, and
             it is a separate legal asset that transfers on its own terms. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the catalogue's first listing, not the 2021 account. At
             1.6 years this scores nothing either way — too old for the
             under-18-months penalty, too young for the three-year bonus. */
          sellingSince: '2025-01-20',
          /* The hero listing alone, read from the listing on 2026-09-10; the
             catalogue total is higher but is not published, so this is a
             floor and lands in the 2,500+ band. */
          reviewTotal: 2964,

          /* 🚨 The hero listing's rating standing in for the revenue-weighted
             average the model wants — defensible because that listing is 62%
             of revenue, but it sits EXACTLY on a band boundary. 4.5 scores
             +0.20; anything under it drops to +0.05. If the tail of the
             catalogue rates lower than the hero, this factor is worth a
             quarter of what it is being paid here. */
          ratingWeighted: 4.5,
          sellerFeedbackPct: 86,
          /* RULE 2: Amazon marketplaces measured against each other. Every
             priced listing is Amazon US, so this is 100 — the intended
             answer, not an edge case. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US'],
          /* December against the trailing twelve. Computed from the same
             series the chart draws, via peakMonthSharePct(). */
          peakMonthSharePct: 26.84,
          /* RULE 3: offAmazonSharePct deliberately UNSET. The Shopify store
             and the TikTok Shop are real but cannot be sized from outside
             without three stacked guesses, and the honest range straddled the
             20% band boundary. The figure below is the Amazon business. */
        },
      },
      basis: 'Trailing-twelve net profit at a modelled multiple. The Amazon business only.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    /* Qualitative facts only. Ad spend, TACoS and anything else the metric
       series can answer is derived in MetricCards.tsx. */
    facts: [
      { label: 'SKUs', value: '16', info: 'skus' },
      /* The listing's own breadcrumb, in full. Read from the hero ASIN
         (B0FMGJSSXT) on 2026-09-10, where the best-seller rank is #190 in
         Toys & Games and #9 in Dedicated Deck Card Games. */
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Card Games › Dedicated Deck Card Games',
        note: '#9 in Dedicated Deck Card Games',
        info: 'category',
        wide: true,
      },
      /* 🚨 BOTH CELLS DESCRIBE THE HERO LISTING, deliberately, and that is why
         neither carries a "+" or a weighting rule. A catalogue-wide review
         total and a rating-count-weighted average are the better questions,
         but Amazon publishes rating, review count and star split per LISTING,
         so answering them means reading every ASIN. One listing carrying 62%
         of revenue is one page read, which is what makes this pair automatable
         for every business rather than only for the researched ones. What it
         costs is in the tooltips: a long tail can rate differently, and the
         catalogue total is always higher than the figure shown. */
      { label: 'Product reviews', value: '2,964', note: 'On the hero listing', info: 'reviews' },
      { label: 'Product rating', value: '4.5★', note: 'Hero listing · 77% five-star', info: 'rating' },
      { label: 'Seller feedback', value: '86%', note: 'Over 66 ratings', info: 'sellerFeedback' },
      /* ── How the business is BUILT ─────────────────────────────────
         Three attributes describing the MODEL rather than the numbers,
         carried with the rest because a reader takes them in the same pass.
         Each is one phrase from a fixed list, so the ⓘ carries the
         definition and links to /business-attributes for the list itself.

         🚨 Catalogue and differentiation have NO VALUE yet. A "?" is the
         honest state: both are placements we have not made for this business,
         and a plausible guess on a page like this is worse than a gap —
         the gap is visibly a gap, a guess is not. */
      { label: 'Sourcing', value: 'Private label', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* Both now placed, and both SCORED — the valuation board credits
         differentiation at +0.45 and catalogue shape at −0.10. A "?" here
         while the model prices them would have the page say it had not
         assessed something it had just published a number for. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One SKU is 62% of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      /* Three, not two. The store's own FAQ answers "Why are your prices
         different on Amazon and TikTok?", so TikTok Shop is a selling channel
         they run — it was missing here until the store was read directly. */
      { label: 'Channels', value: 'Amazon US, own store, TikTok Shop', info: 'channels' },
    ],

    /* Multi-select answers against businesses/selling-methods.mjs. Anything
       not listed here is `unchecked` and renders as such — omitting a method
       is never the same as answering "no". */
    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only stream with a public number behind it, because Amazon prints a sales badge on a listing and nobody publishes anything comparable for the others. Every figure elsewhere on this profile — the chart, the margin, the valuation — is this channel and no other.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'spitehousestudios.com, live since 4 April 2025: 37 products from $5.99 to $39.99, and the core deck at $12.99 — 86% more than Amazon charges for it. Shopify publishes no revenue and a visit count is not an order count, so the second-largest thing about this business is invisible from outside.',
      },
      'tiktok-shop': {
        status: 'yes',
        note:
          'Found by reading the store rather than by finding a marketplace listing: their own FAQ answers “Why are your prices different on Amazon and TikTok?”. A reminder that a channel can be absent from every tool and still be running.',
      },
      licensing: {
        status: 'yes',
        note:
          'A USAopoly edition of the game on a Walmart shelf, linked from their own Linktree. Royalty terms are private and never published, so it cannot be valued from outside — but it is the one stream that scales without inventory or ad spend, and the first thing to ask them about.',
      },
      'amazon-international': {
        status: 'no',
        note:
          'Every priced listing is Amazon US. A tenth priced ASIN exists on Amazon Global Store UK, but that is Amazon reselling into the US rather than this operator’s own offer.',
      },
      'other-marketplace': {
        status: 'no',
        note:
          'The Walmart listing belongs to the licensee, not to this seller — which is the distinction between a channel they run and a shelf their brand reached.',
      },
      // 'wholesale-out' left unchecked: no stockists page has been looked for
      // and no wholesale marketplace has been searched.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'From the seller record, and the margin model charges an FBA fee on every unit. It is the largest line in the whole cost stack: $2.56 to move a $6.97 deck, more than twice what the printer charges to make it.',
      },
      fbm: {
        status: 'unchecked',
        note:
          'Nothing read splits the 16 listings between FBA and FBM. A per-ASIN read turns this and the row above into a ratio, which is the honest shape for a per-listing choice.',
      },
      'vendor-1p': { status: 'no' },
      'platform-fulfilled': { status: 'no' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own game, their own card designs, their own brand, and nobody else sells the identical listing.',
      },
      pod: {
        status: 'no',
        note:
          'The printing quotes are 300–500 unit minimums — a production run held as inventory, which is the opposite of printing on demand.',
      },
      'merch-on-demand': { status: 'no' },
      kdp: { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      handmade: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note:
          'A Brand Store at /stores/SpiteHouseGames and A+ content on the hero listing. Amazon gates both behind enrolment, so this is read from the public record rather than asked. Whether a trademark is registered is a separate question and is not answered here.',
      },
      // 'subscribe-save' left unchecked: Amazon prints the box on any listing
      // that offers it, so it is one page read away.
    },

    intro:
      'Spite House Studios LLC sells one joke, well. “Go F Yourself!” is Go Fish for adults — a deck of cards with a gag on it — and the catalogue is that deck, re-cut for a different target each time.',
    /* Section markers drive BOTH the page headings and the table of contents
       down the left — see components/Toc.tsx. The order follows the reference
       information architecture rather than the order the source wrote in:
       how it got here, then what it earns, then why the economics work, then
       where the demand came from. The timeline leads because every figure
       after it is seasonal, and a reader who meets December's $349,150
       before learning this catalogue is one year old reads a spike as a
       run rate. */
    blocks: [
      { type: 'heading', text: 'One joke, sixteen ways' },
      {
        type: 'prose',
        text:
          'Boomers, Mom, Dad, Mom & Dad, Jesus Christ, America in red and blue. Sixteen ASINs, ten of them priced, seven carrying a sold badge, at an $8.87 average order.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION, and that is the same rule as the prose
         above it. "62% of revenue" typed here would be a second copy of a
         number the breakdown block already computes off the item rows, and
         the two would part company the first time a row was corrected. The
         caption says what the object IS; the block says what it earns.

         Narrow on purpose: the box is portrait, and at the full reading
         measure a single product shot stops being evidence and becomes a
         banner. */
      {
        type: 'image',
        src: '/products/spite-house-games/B0FMGJSSXT-hero.jpg',
        alt: 'The “Go F*** Yourself!” card-game box — a blue deck box with a grinning cartoon goldfish and the strapline “Go fish? How about go f*** yourself!”',
        caption:
          '“Go F Yourself!” — the original deck, and the one the rest of the catalogue is a re-cut of. Every other listing is this object with a different target printed on the box.',
        width: 300,
      },

      /* 🚨 Grouped with Overview, not with Brand owner, and the group is the
         reason it can lead. A TOC group is a GAP (see Toc.tsx), so leaving
         this on 'Who and when' would have split that group into two clusters
         either end of the page with the same name. Sharing the synthetic
         Overview group instead makes the two read as one opening cluster —
         what it is, then how it got here — and puts the gap before Revenue,
         which is where the page turns to money. */
      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Two listings in January 2025 that nobody bought, a badge in September, a Christmas that did $349,150 — and then a year spent building a business that does not need December.',
      },
      {
        /* Oldest first, and strictly so: the source lists a few of these out
           of order. Each entry names the strand it belongs to, because the
           whole point of this business's story is that the audience strand
           starts before the selling one. */
        type: 'timeline',
        items: [
          {
            when: '20 Feb 2021',
            tag: 'Web',
            what: 'wouldyoukillhitler.com registered',
            detail:
              'An earlier venture, five years before this catalogue — and still the support address on every legal page of the current store. Its game sits on the shelf here as “I Would Kill Hitler” at $29.',
          },
          {
            when: '20 Oct 2024',
            tag: 'Web',
            what: 'spitehousestudios.com registered',
            detail: 'Six months before the store opens, and three months before the first Amazon listing.',
          },
          {
            when: '30 Nov 2024',
            tag: 'Brand',
            what: 'The TikTok account is created',
            detail:
              '18:15 UTC, from TikTok’s own createTime field, corroborated by the timestamp encoded in the user id 102 seconds apart. Six weeks after the domain and seven weeks before the first listing: the audience was started first.',
          },
          {
            when: '20 Jan 2025',
            tag: 'Amazon',
            what: 'First two listings go up',
            detail: 'The original deck and a second listing, on the same day. Neither carries a sold badge for another eight months.',
          },
          {
            when: '4 Apr 2025',
            tag: 'Web',
            what: 'The Shopify store opens',
            detail:
              'First product published, with the Wayback Machine’s first capture three days later. The deck lists at $12.99 there — the same deck Amazon sells for $6.97.',
          },
          {
            when: '25 Jun 2025',
            tag: 'Brand',
            what: 'A YouTube channel appears, and is left to idle',
            detail:
              '83 videos and 46 subscribers, describing itself as “reposting all of my viral TikTok content, literally phoning it in”. A one-person operation choosing where not to spend effort.',
          },
          {
            when: '6 Aug 2025',
            tag: 'Amazon',
            what: 'Boomers and Jesus Christ',
            detail: 'The first re-cuts of the same joke for a different target, at $12.99 against the original’s $6.97.',
          },
          {
            when: '30 Sep 2025',
            tag: 'Amazon',
            what: 'The badge appears — $13,940',
            detail:
              'Amazon starts printing “bought in past month” on the original deck, which means it crossed roughly 50 sales a month. Keepa’s history starts here.',
          },
          {
            when: '20 Oct 2025',
            tag: 'Brand',
            what: 'A post does 549,228 likes',
            detail:
              'Their pinned Instagram post, and the closest thing to a cause on this profile: October revenue was $69,700 and November was $278,800. The same content runs on TikTok, where the account holds 5.2M likes across 359 videos.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$349,150 — the Christmas month',
            detail: '50,050 units, and four times any month since. A gag gift’s whole year happens in eight weeks.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '82% of it disappears',
            detail: '$62,717. Not a listing problem and not a ranking problem — Christmas ended. The next six months are spent rebuilding.',
          },
          {
            when: '14 Apr 2026',
            tag: 'Amazon',
            what: 'Mom, Dad, and Mom & Dad',
            detail: 'Three more targets in a day, and the first at $19.99 — nearly three times the original’s price for the same object.',
          },
          {
            when: '30 Apr 2026',
            tag: 'Web',
            what: 'Organic search peaks at 8,257 visits',
            detail:
              'Ubersuggest’s estimate for the month, almost all of it landing on one how-to-play page. By August it is 2,859 — down 65% from the peak.',
          },
          {
            when: '3 Jun 2026',
            tag: 'Amazon',
            what: 'America, in red and blue',
            detail: 'Three listings for an election-season gift. The blue one sells; the red one has yet to carry a badge.',
          },
          {
            when: '6 Jul 2026',
            tag: 'Advertising',
            what: 'Meta ads start',
            detail:
              '~32 ads go live under a page called “Spite House Games”, pointing at the $12.99 store price. Amazon revenue that month is $80,420, up from $61,494 in June.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$96,958 — a new non-holiday high',
            detail:
              'Above every month except last December, and on a wider catalogue than last December had. Whatever is driving demand is not the holiday.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Keepa’s badge history shows the shape of a gag gift’s year. December is four Christmases’ worth of a normal month in a single month. January loses 82% of that in four weeks, and the six months after it are the rebuild — which reached a new non-holiday high in August.',
      },
      { type: 'chart' },
      {
        /* Revenue by product, from the source's own monthlySold × buy-box
           price. The rows sum to the headline monthly revenue — the component
           adds them up and says so rather than taking a typed total on
           trust. */
        type: 'breakdown',
        intro:
          'One SKU is the business. The re-cuts at $12.99 and $19.99 are the attempt to sell the same object for more, and two of them have yet to sell at all.',
        items: [
          { name: 'Go F Yourself! — the original Grown Up Go Fish', asin: 'B0FMGJSSXT', image: deckPhoto('B0FMGJSSXT'), listed: '2025-01-20', sold: 8000, price: 6.97, revenue: 55760 },
          { name: 'Go F Yourself Boomers!', asin: 'B0FLCJSFJP', image: deckPhoto('B0FLCJSFJP'), listed: '2025-08-06', sold: 900, price: 12.99, revenue: 11691 },
          { name: 'Go F Yourself Mom & Dad!', asin: 'B0GVKVZDR7', image: deckPhoto('B0GVKVZDR7'), listed: '2026-04-14', sold: 500, price: 19.99, revenue: 9995 },
          { name: 'Go F Yourself America!', asin: 'B0H1XPC49K', image: deckPhoto('B0H1XPC49K'), listed: '2026-06-03', sold: 400, price: 19.99, revenue: 7996 },
          { name: 'Go F Yourself Jesus Christ!', asin: 'B0FLCSBZ2V', image: deckPhoto('B0FLCSBZ2V'), listed: '2025-08-06', sold: 200, price: 12.99, revenue: 2598 },
          { name: 'Go F Yourself Mom!', asin: 'B0GT64XJVT', image: deckPhoto('B0GT64XJVT'), listed: '2026-04-14', sold: 100, price: 12.99, revenue: 1299 },
          { name: 'Go F Yourself America Blue!', asin: 'B0H1XWG51R', image: deckPhoto('B0H1XWG51R'), listed: '2026-06-03', sold: 50, price: 12.99, revenue: 649.5 },
          { name: 'Go F Yourself America Red!', asin: 'B0H1XM57YZ', image: deckPhoto('B0H1XM57YZ'), listed: '2026-06-03', sold: 0, price: 12.99, revenue: 0 },
          { name: 'Go F Yourself Dad!', asin: 'B0GT69P836', image: deckPhoto('B0GT69P836'), listed: '2026-04-14', sold: 0, price: 12.99, revenue: 0 },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, which is why every row reads n+. Revenue is that band times the buy-box price, so each row is a floor rather than a measurement.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. Profit is revenue less cost of goods, Amazon’s fees and modelled ad spend of about 12% of revenue, with returns and overhead both set to zero — so nothing here has been taken out for the things a real month takes out.',
      },

      /* 🚨 THIS SECTION ANSWERS "WHERE DOES THE MONEY COME FROM", not "what
         does a unit cost". It used to argue the fee card — a dollar to print,
         $2.56 to move — which is the same argument Margin breakdown makes
         immediately below it with the supplier quotes and the waterfall behind
         it. Two sections running one argument, and the one holding the
         evidence was second. The cost story now lives once, under Margin
         breakdown; this one is the channel story, which nothing else told. */
      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns' },
      {
        type: 'lede',
        text:
          'Four ways into this business are visible and exactly one of them can be sized. Amazon is the whole of the measured revenue on this profile; everything else here is real but unpriced, or has not been looked for.',
      },
      {
        type: 'prose',
        text:
          'The striking thing is that the two channels selling the same object do not agree on what it is worth. The core deck is $6.97 on Amazon and $12.99 on their own store — the channel doing the volume is the one taking 46% less for the product. Whatever the reason, a buyer inherits both prices and the question of which one is wrong.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Amazon publishes a sales badge; nobody publishes what a Shopify store, a TikTok Shop or a licensing deal takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than quietly counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns' },
      {
        type: 'lede',
        text:
          'Every cent of an $8.87 order, from the printer to what is left — and the largest single line is not the product, it is moving it.',
      },
      {
        type: 'prose',
        text:
          'Four printers in China quote this deck publicly, at minimums a first order could actually meet. The spread is wide because “a deck of cards” covers a lot of paper stocks and box finishes, so the figure used below sits mid-range rather than at the floor.',
      },
      {
        type: 'table',
        caption: 'COGS — what the deck costs to make',
        columns: ['Quote', 'Region', 'MOQ', 'Lead time', 'Unit cost'],
        rows: [
          ['Guangzhou Miyi Printing Co., Ltd', 'Guangdong, CN', '500 sets', 'not quoted', '$0.50–1.00 / deck'],
          ['Shenzhen Gold Sun Color Printing Co., Ltd', 'Guangdong, CN', '300 pieces', 'not quoted', '$0.70–3.00 / deck'],
          ['Guangzhou Zhongtian Paper Product Co., Ltd', 'Guangdong, CN', '500 pieces', 'not quoted', '$0.12–0.99 / deck'],
          ['Tianjin Caile Printing Co., Ltd', 'Tianjin, CN', '100 pieces', 'not quoted', '$0.01–0.55 / deck'],
          ['Freight and inbound — a placeholder, not a quote', 'CN → US', '—', '—', '$0.50 / deck'],
        ],
        note:
          'The freight line is the one figure here that nobody published. It is our placeholder, and the first thing to replace with a real quote — at these prices it moves the margin by more than the printing does.',
      },
      {
        /* 🚨 The margin row is not stored here. The component computes it as
           100% less these lines, so a corrected cost moves the answer rather
           than leaving a total that no longer adds up. It currently resolves
           to 28%, which is the figure on the record and on the chart. */
        type: 'margin',
        basis: { label: 'Average order', value: 8.87 },
        lines: [
          {
            label: 'Cost of goods',
            /* Read by MetricCards to derive the COGS cell on the overview.
               One source of truth: correct the percentage here and the grid
               follows it. */
            key: 'cogs',
            pct: -14,
            detail:
              'About $0.75 to print plus $0.50 to land, against an $8.87 average order. The print half is a published quote; the freight half is ours.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail:
              'Amazon’s published Toys & Games rate — a flat 15% with a $0.30 minimum and no price threshold, so a cheap product gets no relief.',
          },
          {
            label: 'FBA fulfilment',
            pct: -31,
            emphasis: true,
            detail:
              '$2.56 for a small-standard unit under $10 on 8,000 units of a $6.97 deck, and $3.45 in the $10–50 band on the rest. Amazon charges more to move this product than the printer charges to make it.',
          },
          {
            label: 'Advertising',
            pct: -12,
            detail:
              'Computed, not observed. A $0.70–1.00 Toys & Games click at a 10–14% conversion rate costs $5.00–10.00 per ad-attributed sale — a 56–113% ACoS on an $8.87 order — so ads can only ever carry a slice of this catalogue. At 10–20% of units that is 8–17% of revenue.',
          },
        ],
        note:
          'Before returns and overhead, both set to zero here. This is a ceiling on profit rather than profit, and the two missing lines are the ones a real operator would feel first.',
      },
      {
        type: 'prose',
        text:
          'The shape of it is unusual: on most products the factory is the largest cost and the marketplace takes a slice. Here it is the other way round. Fulfilment alone is more than twice the cost of goods, because Amazon prices moving a box by its size and weight rather than by what is in it — and a deck of cards costs about the same to pick, pack and ship whether it sells for $6.97 or $19.99.',
      },
      {
        type: 'callout',
        text:
          'Which is the argument for the $12.99 and $19.99 re-cuts. The same object, the same fulfilment fee, at nearly three times the price — every dollar of that increase lands almost entirely in margin.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'One TikTok account, started seven weeks before the first listing, is carrying this business — because at an $8.87 order, a bought sale costs more than the sale is worth.',
      },
      {
        type: 'prose',
        text:
          'The brand is built on content rather than ads, and it is arithmetic rather than taste. At the published Toys & Games click price and conversion rate, an ad-attributed sale costs $5.00–10.00 against an $8.87 order — a 56–113% ACoS. Paid search cannot carry a catalogue priced like this at any volume, so an audience is not the cheaper option here, it is the only one.',
      },
      {
        type: 'prose',
        text:
          'The audience is real, and it is one channel. The TikTok account was created on 30 November 2024 — seven weeks before the first Amazon listing — and now carries 45.4K followers and 5.2M likes across 359 videos. Instagram mirrors it at 20K, and the YouTube channel, which its own description calls “literally phoning it in”, has 46 subscribers.',
      },
      {
        type: 'prose',
        text:
          'The most suggestive date on the record is 20 October 2025, when a post did 549,228 likes — the month it landed in and the month after it are the two steepest climbs on the chart above.',
      },
      {
        type: 'prose',
        text:
          'They started running Meta ads on 6 July 2026 — about 32 of them, pointing at the store — and Amazon revenue rose in each of the three months that followed. That is a correlation with a date on it rather than a proven cause, and it is the first thing to ask them about.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot tell us is whether the audience converts. The follower counts and the visit estimates are real numbers about attention, and nothing public ties either of them to an order.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Three channels, and only one of them can be priced. Nobody publishes a competitor’s ad bill, so the figure column below is arithmetic — and the counted line under each row is the part somebody actually measured.',
      },
      {
        type: 'prose',
        text:
          'The arithmetic is the finding rather than the input. A $0.70–1.00 Toys & Games click at a 10–14% conversion rate costs $5.00–10.00 per ad-attributed sale, against an $8.87 average order — a 56–113% ACoS. Nothing about that improves with scale, which is why the range below assumes paid search carries only 10–20% of units rather than the catalogue.',
      },
      {
        /* The same 12% that comes off the margin table two sections up, stated
           as a monthly range instead of a share. They agree by construction:
           12% of the $89,988 on the record is $10,799, which sits inside this
           range. If one moves, move the other. */
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: '≈ $7.6K–15.2K / mo',
            note:
              'Computed, not observed. The click price and the conversion rate are published category benchmarks and the unit count is the badge history; the 10–20% ad share is the one assumption. It is also the widest range on this profile — the two ends are a factor of two apart, and the margin moves with them.',
          },
          {
            label: 'Meta (Facebook and Instagram)',
            href: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=spitehousestudios&search_type=keyword_unordered&media_type=all',
            value: 'Not estimable',
            counted: '~32 active US ads, first seen 6 July 2026',
            flag: true,
            note:
              'The dated fact on this section. The ads went live under a page named exactly like the Amazon store and point at the $12.99 store price — and Amazon revenue went $61,494 in June, $80,420 in July and $96,958 in August, the best non-holiday month on record. Meta publishes the creative and the dates and never the money, so there is nothing to price the spend against. A correlation with a date on it, not a cause.',
          },
          {
            label: 'Google Ads',
            value: '$0',
            counted: '0 paid keywords across 17 months of history',
            note:
              'Not “we could not find any”. The paid series reads zero for every month on record, April 2025 to August 2026 — they have never bought a search click, in a category where the head terms go for $0.31–0.44. Set beside the Meta ads, the strategy reads as buying attention rather than intent.',
          },
        ],
        note:
          'The Meta entry is the one worth opening. The creative is public even though the budget is not, and it is the only place the two prices for the same deck sit side by side.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'The half Amazon cannot see — and on this business the half that makes the demand, because at an $8.87 order there is no budget to buy it.',
      },
      /* The same chips the overview opens with, repeated on purpose. Every
         section here is its own page, so a reader who arrived on this one
         from search has not seen them — and this is the page that spends
         several hundred words on an audience whose accounts would otherwise
         be two navigations away. Pulled from the DB record, not authored, so
         the two rows cannot disagree. */
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The site figures are smaller than they first look. Similarweb reports 38.7K visits, but the label on that number is a three-month total rather than a monthly one — so the store runs about 12.9K visits a month, and is down 39% on the month before. 2,859 of those arrive from Google, almost all of them landing on a single how-to-play page.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Own-site visits', value: '~12.9K / mo', note: '38.7K reported over three months, not one' },
          { label: 'Month on month', value: '−39%', note: 'Similarweb, read 9 Sep 2026' },
          { label: 'Of which organic search', value: '2,859 / mo', note: 'August 2026, across 220 ranking keywords' },
          { label: 'Organic peak', value: '8,257 / mo', note: 'April 2026 — down 65% by August' },
          { label: 'Google Ads spend, ever', value: '$0', note: 'Zero paid keywords in 17 months' },
          { label: 'Domain authority', value: '6', note: '53 backlinks from 42 domains' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'TikTok — @spitehouse_games',
            href: 'https://www.tiktok.com/@spitehouse_games',
            value: '45.4K followers · 5.2M likes',
            flag: true,
            note:
              'The engine. 359 videos, and the account was created on 30 November 2024 — six weeks after the domain and seven weeks before the first Amazon listing. The content came first and everything else was built behind it.',
          },
          {
            label: 'Instagram — @spitehouse_games',
            href: 'https://www.instagram.com/spitehouse_games/',
            value: '20K followers · 245 posts',
            note:
              'The mirror, at less than half TikTok’s following. Its pinned post — 20 October 2025 — carries 549,228 likes, and Amazon revenue went from $69,700 in October to $278,800 in November. Note the handle: @spitehousegames without the underscore is an unrelated Seattle studio.',
          },
          {
            label: 'YouTube — @SpiteHouseStudios',
            href: 'https://www.youtube.com/@SpiteHouseStudios/about',
            value: '46 subscribers · 83 videos',
            note:
              'Joined 25 June 2025, and the channel’s own description says it is “reposting all of my viral TikTok content, literally phoning it in”. 83 videos against 46 subscribers is what a channel looks like when nobody is pretending otherwise.',
          },
          {
            label: 'Own store — spitehousestudios.com',
            href: 'https://spitehousestudios.com/',
            value: '~12.9K visits / mo',
            note:
              'Shopify, 37 products from $5.99 to $39.99, live since 4 April 2025. The core deck sells here for $12.99 — the same deck is $6.97 on Amazon, 46% less. Whatever the reason, the cheaper channel is the one doing the volume.',
          },
          {
            label: 'Organic search — 220 keywords, one page',
            href: 'https://spitehousestudios.com/pages/go-fuck-yourself-rules',
            value: '2,859 visits / mo',
            note:
              'Six of their top ten keywords land on one page: the how-to-play rules. It ranks #2 for “go f yourself card game” against 27,100 searches a month — but rules-page intent is people who already own the game, and a single URL carrying the whole organic position is a single point of failure.',
          },
          {
            label: 'Linktree — SpiteHouseGames',
            href: 'https://linktr.ee/SpiteHouseGames',
            note:
              'The TikTok bio’s destination, joined April 2025. It routes to a bundle builder, an expansion-notification signup, a Walmart listing for a USAopoly edition of the game, and a contact address. No Facebook link — the store’s own story page says they will not use it.',
          },
          {
            label: 'wouldyoukillhitler.com',
            href: 'https://wouldyoukillhitler.com/',
            note:
              'Registered 20 February 2021, and still the support address on every legal page of the newer store. An earlier venture folded into this brand — its game is on the shelf here as “I Would Kill Hitler” at $29. The operator has five years of history, not eighteen months.',
          },
        ],
      },
      {
        /* 🚨 Best-seller rank, not Amazon keyword positions, and the note says
           why: Amazon publishes no search volumes and localises its results to
           whoever is looking, so a scraped keyword rank measures the scraper
           as much as the listing. BSR is printed on the listing and is the
           same number for every viewer.

           The hero row is the 10 Sep 2026 reading, which is the same one the
           additional-metrics grid quotes. The day before it read #484 and #26.
           Both are real; the note carries the spread rather than letting the
           page state two ranks for one listing. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Toys & Games', 'Dedicated Deck Card Games', 'Rating'],
        rows: [
          ['Go F Yourself! and its four re-cuts', '#190', '#9', '4.5★ over 2,958 ratings'],
          ['Go F Yourself Mom!', '#14,665', '#315', '4.6★'],
        ],
        note:
          'Rank rather than keyword position, because Amazon publishes no search volumes and localises its results to whoever is looking — a scraped keyword rank is worth less than it appears, while best-seller rank is printed on the listing and is the same number for everyone. It moves daily: the hero listing read #190 and #9 on 10 September 2026 and #484 and #26 the day before. Five SKUs share one parent listing, which is why they share a rank.',
      },
      {
        type: 'table',
        caption: 'Search presence off Amazon',
        columns: ['Term', 'Where', 'Rank', 'Volume / mo'],
        rows: [
          ['go f yourself card game', 'Google', '#2', '27,100'],
          ['go f yourself', 'Google', '#3', '18,100'],
          ['go f yourself game', 'Google', '#5', '14,800'],
          ['gfys', 'Google', '#12', '5,400'],
          ['go f yourself cards', 'Google', '#5', '2,400'],
          ['go f yourself card game near me', 'Google', '#3', '1,600'],
          ['how to play go f yourself', 'Google', '#2', '1,300'],
          ['where to buy go f yourself card game', 'Google', '#6', '1,000'],
          ['spite house games', 'Google', '#1', '880'],
        ],
        note:
          'Read 9 September 2026, across 220 ranking keywords. Every term they hold is a branded one — the phrase, the abbreviation, the store name — and nothing generic ranks at all. Volumes are a keyword tool’s model built from rank data and clickstream, not a count Google published.',
      },
      {
        type: 'callout',
        text:
          'Two of these numbers are attention and none of them is a sale. The follower counts, the visit estimates and the search volumes are all real measurements of interest, and nothing public connects any of them to an order on Amazon.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when' },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Spite House Studios LLC' },
          { label: 'Seller', value: 'Spite House Games', note: 'Merchant A1JV6NB17MZ485' },
          { label: 'Trading since', value: '2021', note: 'The account, not this catalogue' },
          { label: 'Registered address', value: 'Harrisonville, MO, US', note: '117 Lexington At. Ste 100, 64701-2444' },
          { label: 'Seller feedback', value: '86%', note: 'Over 66 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '20 Jan 2025' },
        ],
      },
      {
        type: 'prose',
        text:
          'The account predates this catalogue as wouldyoukillhitler.com, an earlier venture whose address still answers this store’s support mail. It is a young seller account by rating count: 66 seller ratings against 2,958 product reviews on a single listing, 14 of those in the last 30 days.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the buy-box seller on the brand’s best-selling products.',
      },
      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve net profit, and it prices the Amazon business alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'The Shopify store and the TikTok Shop are excluded. Both are real — the store’s own FAQ names them — but neither can be sized from outside without stacking a traffic estimate on an assumed conversion rate on an assumed order value, and the honest range straddled the band boundary that decides whether it scores at all. This figure is the Amazon business.',
      },
      {
        type: 'prose',
        text:
          'The positives are what the business owns: its own game, its own designs, an enrolled brand and the reviews the hero listing has piled up since January 2025. The negatives are all one shape — concentration. Every priced listing sits on Amazon US, a quarter of the year’s revenue arrives in December, and the seller feedback record is thin enough to notice.',
      },
      {
        type: 'prose',
        text:
          'Four of these are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers in the model, taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple — the widest step it has. Brand Registry is firmer: Amazon gates the brand store and the A+ content on the listing behind enrolment. All four are the first things to put to the owner.',
      },
    ],
  },
};

export function profileFor(slug) {
  return PROFILES[slug];
}
