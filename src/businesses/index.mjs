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
 * A Spite House listing photo, by ASIN, from our bucket.
 *
 * Keyed by ASIN with the URL derived from it, so no row types a 64-character
 * hash — a hand-copied one is a transcription error waiting to point one row at
 * another row's picture, which is the kind of mistake that looks fine and is
 * wrong. The values are the content hashes `npm run product-image` printed.
 *
 * 🚨 Bucket copies, not Amazon's CDN and not /public. Hotlinking would let a
 * listing edit silently blank a column here, and the repo carries no images
 * (research: publish-business-profile §4). When a listing changes, re-upload
 * and paste the new hash.
 */
const SPITE_HOUSE_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/';
const DECK_PHOTOS = {
  B0FMGJSSXT: '934f61cfb5ff4af0de9c174b5dff48e38312a8e79a05f415c9abd95da9d21b0a',
  B0FLCJSFJP: '0f96abf0ad4842007f9bd22bcfdc3f7b050c226131ce2f14658921d462a744b2',
  B0GVKVZDR7: '8889ab6dd0a3407283056bf9eca0ff865da8e9d1525914bfeb91702a9a854727',
  B0H1XPC49K: '45f88d5b2a561db9391a389b5ecc99d6fb1b6c8e45e0fb18abcb08cc36a00089',
  B0FLCSBZ2V: 'a6234dccbd300ba8fc3c665d751139e684b3fba5161fd75aa671b2b613611a85',
  B0GT64XJVT: 'c2a4299498a14930df2f612f48a5d1096ccedba3973699b01282bfce6d85fe1b',
  B0H1XWG51R: 'd6fca2bfea588c674f6348436045ba541e7356cc5cb104bdc756f4dae09cfb7a',
  B0H1XM57YZ: '9471449101f945b7d9d6d911a089d309d089af64ded14e518d908c0179c7f893',
  B0GT69P836: 'a3ac534f9fd1675aa46aea00eba3d052eb2d39266c51768df829e35023d6bcbb',
};
const deckPhoto = (asin) => DECK_PHOTOS[asin] && `${SPITE_HOUSE_BUCKET}${DECK_PHOTOS[asin]}.jpg`;

/* 199 generated rows — too many to author inline. See the module's header. */
import { WHITE_MOUNTAIN_BREAKDOWN } from './white-mountain-puzzles.breakdown.mjs';
import { KALOTOYS_BREAKDOWN, kalotoysPhoto } from './kalotoys.breakdown.mjs';
import { MARYRUTH_PHOTOS, MARYRUTH_TOP_LISTINGS } from './maryruth.breakdown.mjs';
import { VIRORA_BREAKDOWN, viroraPhoto } from './virora-mahjong.breakdown.mjs';
import { KAJUN_BREAKDOWN } from './kajun-loaded-tea.breakdown.mjs';
import { WET_NOSES_BREAKDOWN, wetNosesPhoto } from './wet-noses.breakdown.mjs';
import { LIGHTEN_LIFE_BREAKDOWN, lightenLifePhoto } from './lighten-life.breakdown.mjs';

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
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-spite-house-headline.ts, from
       waithowmuch-research research/spitehouse/headline.json, where every
       figure in them is tiered and traced — and the page reads them from the
       row alone. This entry carries only the image beside them. */
    headline: {
      /* The best seller: the original deck is 62% of the revenue, so it is
         the object this whole page is about. The overview's image further
         down shows the second-best seller instead of repeating it. */
      image: {
        src: `${SPITE_HOUSE_BUCKET}ee184f37f7cb5332977b8e15bdbc157d0d0d87a194bbaddb3fcecf4dcf579293.jpg`,
        alt: 'The “Go F*** Yourself!” card-game box — the best-selling deck, a blue box with a grinning cartoon goldfish',
      },
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
          'spitehousestudios.com, live since 4 April 2025: 37 products from $5.99 to $39.99, and the core deck at $12.99 — what Amazon usually charges for it too, though Amazon had it at $6.97 when this was read. Shopify publishes no revenue and a visit count is not an order count, so the second-largest thing about this business is invisible from outside.',
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
          'From the seller record, and the margin model charges an FBA fee on every unit. It is the largest line in the whole cost stack: $2.56 to move the deck at today’s $6.97 and $3.45 at its usual $12.99 — either way more than twice what the printer charges to make it.',
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
         above it: a number typed here would be a second copy of one the
         breakdown block computes, and the two would part company the first
         time a row was corrected.

         The brand's own listing images, not the box. The box is already the
         headline image at the top of the page; these show how the brand sells
         it. Copied into our bucket (products/spite-house-games/) rather than
         hotlinked, so Amazon re-cropping or dropping them cannot change this
         page. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/3a4ef3ca9afdc031b3256f9a8410734af057bf3387b59d23582908f903117ff9.jpg',
            alt: 'Listing image: “So easy a baby could play!” above a cartoon goldfish with a dummy, captioned “(do not play with babies)”',
          },
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/77cc37b8b258535cf663f00436db50bb8de311c2b8248fbdf91fada448edce6c.jpg',
            alt: 'Listing image: “Fish for shameful secrets. ‘Do you have?’” over a fan of illustrated cards with censored prompts',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images. The pitch is the joke: a game anyone can pick up, played for the secrets you would rather not say out loud.',
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
              'First product published, with the Wayback Machine’s first capture three days later. The deck lists at $12.99 there — the price it usually carries on Amazon as well.',
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
            detail: 'The first re-cuts of the same joke for a different target, at the same $12.99 the original usually sells for.',
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
            detail: 'Three more targets in a day, and the first at $19.99 — $7 above the original’s usual $12.99 for the same object.',
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
          'One SKU is the business, and its $6.97 here is a discount — it sells for $12.99 most of the time. The re-cuts at $19.99 are the attempt to sell the same object for more, and two of the $12.99 ones have yet to sell at all.',
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
          '“Sold / mo” is Amazon’s own badge, which is why every row reads n+. Revenue is that band times the buy-box price on the day it was read, so each row is a floor rather than a measurement — and the original deck was on a $6.97 discount from its usual $12.99 that day.',
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
      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Four ways into this business are visible and exactly one of them can be sized. Amazon is the whole of the measured revenue on this profile; everything else here is real but unpriced, or has not been looked for.',
      },
      {
        type: 'prose',
        text:
          'Most of the time the two channels agree on what the core deck is worth: $12.99 on their own store and $12.99 on Amazon. When this profile was read, Amazon had it at $6.97 — 46% less — and every revenue figure here is priced at that $6.97, so the numbers describe a month at the discount rather than at the usual price.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Amazon publishes a sales badge; nobody publishes what a Shopify store, a TikTok Shop or a licensing deal takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than quietly counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
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
              '$2.56 for a small-standard unit under $10 on 8,000 units of the deck at its discounted $6.97, and $3.45 in the $10–50 band on the rest — the band it sits in at its usual $12.99. Amazon charges more to move this product than the printer charges to make it.',
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
          'Which is the argument for the usual $12.99 and the $19.99 re-cuts. The same object, a fulfilment fee 89 cents higher, at up to nearly three times the discounted price — every dollar of that increase lands almost entirely in margin.',
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

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
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
          'The Meta entry is the one worth opening. The creative is public even though the budget is not, and it quotes the deck at its usual $12.99.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
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
              'Shopify, 37 products from $5.99 to $39.99, live since 4 April 2025. The core deck sells here for $12.99, the price it usually carries on Amazon too — though Amazon had it at $6.97 when this was read.',
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

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
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

  'white-mountain-puzzles': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — the backend's White Mountain headline seed, from
       waithowmuch-research research/white-mountain-puzzles/headline.json —
       and the page reads them from the row alone. This entry carries only the
       image beside them. */
    headline: {
      /* The best seller, but only by a hair: it is 2.6% of the month, which is
         the whole point of this profile. */
      image: {
        src: 'https://storage.googleapis.com/verifiedmargins/products/white-mountain-puzzles/9a9f54e3fe2b3a497d2aa1b81f09e912f094a3c44f4cbf3132dfc67ca52cfc6c.jpg',
        alt: 'The “Did You Know” 1,000-piece jigsaw puzzle box by Steve Cameron — a collage of retro trivia signs, marked Made in USA. White Mountain’s best-selling Amazon listing',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record, like Spite House's. Their own
             brand, their own commissioned artwork, their own listings — and,
             by their own account, made in America. The model has no "own
             manufacturing" answer; private label is the nearest one that
             describes what transfers in a sale. */
          primaryMethod: 'private_label',
          /* Broad, and not close. 480 priced listings, the top ten 18% of
             revenue and the top fifty 49%; the best seller is 2.6%. */
          catalogStructure: 'broad',
          /* Level 3. Commissioned art and an oversized 24 × 30 inch
             1,000-piece format are real, visible changes; there is no tooling
             nobody else has — a random-cut die on blue chipboard. The case for
             level 2 is that a jigsaw is a commodity object with a picture on
             it, and the step is worth 0.55 of the multiple. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ, not an inference: the Brand Store at /stores/WhiteMountain
             is gated behind enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the oldest listing still in the catalogue, not 1978. */
          sellingSince: '2011-08-18',
          /* 🚨 The top 20 listings by revenue, not one hero. On Spite House one
             listing was 62% of revenue and could stand for the catalogue; here
             the best seller is 2.6%, and its 308 reviews would score this
             business as having almost no review moat. 3,492 is still a floor —
             481 listings are not in it. */
          reviewTotal: 3492,
          ratingWeighted: 4.64,
          sellerFeedbackPct: 99,
          /* RULE 2. The seller exists on Amazon Canada, but not one CA listing
             carries a sold badge, so Amazon US is all of the measurable Amazon
             revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* December against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 22.31,
          /* RULE 3: offAmazonSharePct unset. Wholesale, the store in Jackson and
             the Shopify site are real and unsized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. The Amazon business only — wholesale, the Jackson store and their own site are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '501', note: '480 priced, 199 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Toys & Games › Puzzles › Jigsaw Puzzles',
        note: 'Best seller #12,601 in Toys & Games',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-20 figures, not the hero listing's, and so NO `info` key: the
         shared ⓘ copy for reviews and rating describes one best-selling
         listing, and on a catalogue where that listing is 2.6% of revenue it
         would describe a number this page deliberately does not show. */
      { label: 'Product reviews', value: '3,492', note: 'Across the top 20 listings — a floor' },
      { label: 'Product rating', value: '4.6★', note: 'Review-weighted, top 20 listings' },
      { label: 'Seller feedback', value: '99%', note: 'Over 10,668 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Made in America, by their own account', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, low volume each', note: 'Top ten listings are 18% of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, wholesale', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it. Every figure on this profile — the chart, the margin, the valuation — is Amazon US and nothing else.',
      },
      'amazon-international': {
        status: 'yes',
        note:
          'The seller account exists on Amazon Canada with 86 ratings, but no Canadian listing sells enough to carry a badge. No account on Amazon UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        note:
          'whitemountainpuzzles.com, on Shopify: 601 products at a median of $19.99 — the same price the best sellers carry on Amazon. Shopify publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'Probably the oldest channel and possibly the largest. A retailer programme with a one-case minimum of twelve puzzles, a spinner-rack scheme, a wholesale portal and trade shows, and “thousands of accounts” by their own account. Nothing public sizes it.',
      },
      'vendor-1p': {
        status: 'no',
        note:
          'Amazon itself offers none of the 255 listings carrying their manufacturer name outside the storefront, and three of 482 inside it.',
      },
      // tiktok-shop, other-marketplace and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record. At about $6.02 a unit it is the largest line in the cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 501 listings between FBA and FBM.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and commissioned artwork, on listings no other seller carries a badge on.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Every puzzle is “manufactured in America”, by their own pages — which does not say whose factory. Left open rather than read as yes.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/WhiteMountain, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'White Mountain Puzzles has made jigsaw puzzles in Jackson, New Hampshire, since 1978, and the founders’ families still own it. Amazon is one of three ways it sells them, and the only one with a public number behind it.',

    blocks: [
      { type: 'heading', text: 'A long tail, not a hit' },
      /* Four paragraphs, one job each: the range, what it is organised by,
         what buyers think of it, and how fast it moves. Every count here is a
         reading dated by the page's snapshot — the catalogue mix from the Keepa
         pull, the collections from the store's public collections.json on
         2026-09-15. No live headline figure is typed in. */
      {
        type: 'prose',
        text:
          'About five hundred puzzles are listed on Amazon. Most are 1,000 pieces at $19.99, but the range runs down through 500- and 300-piece puzzles to a set of six 100-piece minis — and by revenue the 1,000-piece puzzles are about 83% of the month and the 500-piece ones 14%. None of them is the business on its own, and that shape is the most unusual thing about it.',
      },
      {
        type: 'prose',
        text:
          'Themes organise the catalogue: nostalgia and vintage signs, trivia collages, state and regional puzzles, food, animals, beach scenes and famous places, much of it painted by a stable of named artists such as Charlie Girard, Lois Sutton and Steve Cameron. A calendar sits on top of the themes — Christmas, Halloween, autumn, winter, Easter, Valentine’s Day, Mother’s Day and the Fourth of July each have their own collection on the company’s site — and puzzles are graded from beginner to advanced.',
      },
      {
        type: 'prose',
        text:
          'Buyers rate them highly. Eighteen of the twenty best-selling Amazon listings sit at 4.7 stars or above, the twenty together carry 3,492 reviews at a review-weighted 4.6, and the seller account holds 99% positive feedback over more than ten thousand ratings.',
      },
      {
        type: 'prose',
        text:
          'And the catalogue keeps moving. Their own site runs a New Puzzles section — 87 titles, 62 of them added in 2026 so far, the latest on 24 August — and a Coming Soon shelf already stocked with this year’s Christmas puzzles. Amazon shows the same cadence: 68 new listings in 2026.',
      },
      /* The brand's own banner, closing the overview on the shape the first
         paragraph describes. A 1600px JPEG of the screenshot, in the bucket. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/white-mountain-puzzles/644a2d58dfe78a138339c8a1d7b63a50cbcbf645f5f475566569243575795d04.jpg',
            alt: 'White Mountain’s “Shop by Piece Count” banner: tiles for 1,000-, 500- and 300-piece puzzles, each showing box art such as Family Retreat, Harvest Market and Card Games',
          },
        ],
        caption: 'White Mountain’s own banner. The range is shopped by piece count first, then by the theme on the box.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Forty-eight years as a company and fifteen on Amazon — where every year is shaped by one December.',
      },
      {
        /* Oldest first. Year-only entries are the company’s own claims with no
           day attached; they stay on this list and off the overview chart. */
        type: 'timeline',
        items: [
          {
            when: '1978',
            tag: 'Brand',
            what: 'A poster company starts in New Hampshire',
            detail:
              'Founded by Cronan Minton and Ted Wroblewski, by the company’s own account, and later handed to their sons Sean and Colin. It became White Mountain Puzzles, and the families still own it.',
          },
          {
            when: '12 Aug 1999',
            tag: 'Web',
            what: 'whitemountainpuzzles.com registered',
            detail: 'From the domain record. The first archived capture of the site follows eight months later.',
          },
          {
            when: '7 Apr 2000',
            tag: 'Web',
            what: 'The Wayback Machine’s first capture of the site',
          },
          {
            when: '18 Aug 2011',
            tag: 'Amazon',
            what: 'The oldest listing still live: Nostalgic Labels',
            detail:
              'A 1,000-piece candy-wrapper collage. Fifteen years later it still sells enough to carry a badge.',
          },
          {
            when: '16 Feb 2018',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
            detail:
              'The store now carries 601 products at a median of $19.99 — the same price the best sellers carry on Amazon.',
          },
          {
            when: '2018',
            tag: 'Brand',
            what: 'Invited to the White House Made in America Showcase',
            detail: 'One company from each state; this one represented New Hampshire, by its own About page.',
          },
          {
            when: '29 Aug 2018',
            tag: 'Amazon',
            what: 'Mini Cereal Boxes goes up',
            detail: 'Six 100-piece puzzles at $17.99, and eight years later the second-best seller in the catalogue.',
          },
          {
            when: '2021',
            tag: 'Brand',
            what: 'Among the five fastest-growing private companies in New Hampshire',
            detail: 'By the company’s own About page.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '$893,712 — December',
            detail: 'The first Christmas in Amazon’s badge history, and already the biggest month of its year.',
          },
          {
            when: '11 Oct 2024',
            tag: 'Amazon',
            what: 'Did You Know and Crazy State Laws, on the same day',
            detail:
              'Now the first and third best sellers. Ten of the fifteen best-selling listings today went up on or after this date.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '$1,309,574 — December',
            detail: 'Nearly six times the September before it, which at $226,000 is the lowest month in the three years.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: 'November: $948,912',
            detail: 'Twice October, on the way to December.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$1,526,950 — December',
            detail: '76,800 puzzles, three times June, and 22% of the whole year in one month.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: 'January falls 65%',
            detail: '$526,215 — and still above six of the eight months that follow it.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: 'The year’s low: $246,072',
            detail:
              'Only 150 listings carried a badge that month, against 224 in June. A listing that dips under Amazon’s threshold of roughly 50 a month counts as zero, so part of this trough is the floor rather than the business.',
          },
          {
            when: '2026',
            tag: 'Brand',
            what: 'On USA Today’s reader-voted lists for customer service and online stores',
            detail: 'By the company’s own About page.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The badge history reaches back to September 2023, where Amazon’s record of the badge begins, and it holds three Christmases: December came to $893,712 in 2023, $1.31M in 2024 and $1.53M in 2025, and each January gave back between 43% and 67% of it. Outside November to January the catalogue moves between roughly $226,000 and $571,000 a month. The older months are the softer floor — a puzzle discontinued since is not in today’s catalogue and counts as zero — so some of the climb between those Decembers is the method rather than the business. Of each month about a third is kept, before returns and overhead — and on a cost of goods nobody has quoted.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record on each marketplace (2026-09-14) and the
           first pass's per-marketplace read (2026-09-04). 🚨 The largest share
           is valuation derived.topMarketplaceSharePct — the same fact, which
           check-profile.mjs holds the two to. Canada and UK/Germany stay in at
           0% because "looked and found nothing" is the finding. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro:
          'One marketplace carries all of it. The seller account reaches Canada, but nothing listed there sells enough to count.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account live; no listing shows a sold badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges on each marketplace. A listing under roughly 50 sales a month shows no badge, so a small Canadian trade would not appear here.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing is more than 3% of the month. The ten best sellers are 18% of revenue and the top fifty 49%; the rest is a tail of puzzles each selling a few hundred a month or fewer.',
        items: WHITE_MOUNTAIN_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, which is a band — hence n+. Revenue is that band times today’s buy box, so every row is a floor. 281 more priced listings carry no badge, each under roughly 50 a month, and count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling — and the cost of goods under that profit is a placeholder, not a quote. Margin breakdown says which line.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Three channels are visible — Amazon, their own store and wholesale — and only Amazon publishes anything that can be counted.',
      },
      {
        type: 'prose',
        text:
          'Unusually, the channels agree on price. The best sellers are $19.99 on Amazon and $19.99 on whitemountainpuzzles.com, and their retailer page carries an internet sales policy adopted “to preserve the recognized value of our products”. No reseller undercuts them on Amazon either: 255 listings outside their storefront carry the manufacturer’s name, and not one sells enough to show a badge.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store or a wholesale book takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $19.46 average sale, down to the third of it that is left — after Amazon’s two cuts, which together take more than twice what the puzzle costs to make and move.',
      },
      {
        type: 'prose',
        text:
          'A 1,000-piece puzzle is a big box for a $20 product, and Amazon prices fulfilment by size and weight rather than by price: about $6.02 to pick, pack and ship each one. Add the 15% referral fee and Amazon takes 46% of every sale before the puzzle itself is paid for.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 33% — and
           the backend seed builds the profit and ad-spend series from the SAME
           four numbers (COST_LINES). Change one, change both. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 19.46 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -19,
            detail:
              '$3.70 a unit — $2.70 to make and $1.00 to move — against a $19.46 average sale. A placeholder carried over from an earlier pass and never quoted.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
          },
          {
            label: 'FBA fulfilment',
            pct: -31,
            emphasis: true,
            detail:
              'About $6.02 a unit, from the per-listing fees Amazon charges. The largest line here, and the one a bulky, low-priced product cannot negotiate.',
          },
          {
            label: 'Advertising',
            pct: -2,
            detail:
              'Modelled, not observed. They buy sponsored placement on their own brand name and none on generic searches, which puts spend in the low single digits of revenue.',
          },
        ],
        note:
          'Before returns and overhead, both set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'callout',
        text:
          'The cost-of-goods line is the weakest figure on this profile. The $2.70-plus-$1.00 split came from an earlier estimate, and their own pages say every puzzle is manufactured in America, which that split was not built around. It moves the margin more than any other line, and it is the first thing to replace with a real number.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Almost nothing here is bought. They defend their own name on Amazon and advertise nothing else, and the catalogue grows by adding puzzles rather than by promoting them.',
      },
      {
        type: 'prose',
        text:
          'On two generic searches — “1000 piece jigsaw puzzle” and “jigsaw puzzles for adults” — none of the 24 sponsored slots was theirs. On their own brand name, three of twelve were. That is brand defence without acquisition: the demand arrives already looking for White Mountain.',
      },
      {
        type: 'prose',
        text:
          'What they do instead is list. 184 of the 501 listings went up in 2025 or 2026, and ten of today’s fifteen best sellers were listed in October 2024 or later. A catalogue on Amazon since 2011 is being carried by its newest titles.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon the engine is older than the internet: a wholesale book with a one-case minimum of twelve puzzles mixed across more than 350 titles, a spinner-rack programme for shops, and trade shows from Atlanta to Dallas. None of it is public as a number.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot say is how big the other two channels are. A company with thousands of retail accounts and its own store may sell more off Amazon than on it — or far less.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'One channel was measured, and the finding is an absence. The figure is arithmetic; the counted line under it is what somebody actually saw.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: '≈ 2% of revenue',
            counted: '0 of 24 sponsored slots on two generic searches; 3 of 12 on their brand name — read 4 Sep 2026',
            flag: true,
            note:
              'Modelled, not observed. Brand-term clicks are cheap and low-volume, so a footprint that is brand defence and nothing else puts spend in the low single digits of revenue; 2% is the figure the margin uses. Nobody publishes the bill.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note:
              'The Meta Ad Library and a paid-search history were not read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'White Mountain Puzzles Inc' },
          { label: 'Seller', value: 'White Mountain Puzzles', note: 'Merchant A3SL1S5CJP6OII' },
          { label: 'Founded', value: '1978', note: 'By the company’s own account' },
          { label: 'Registered address', value: 'Jackson, NH, US', note: '18 Black Mt Rd, 03846' },
          { label: 'Seller feedback', value: '99%', note: 'Over 10,668 ratings', info: 'sellerFeedback' },
          { label: 'Oldest live listing', value: '18 Aug 2011' },
        ],
      },
      {
        type: 'prose',
        text:
          'Family-owned and, by its own account, run by the founders’ sons, with named staff answering phones for retail, wholesale and a shop in Jackson. The seller account is the brand’s own: it holds the buy box on each of its twenty best sellers between 59% and 100% of the time, and no other seller carries a sold badge on a White Mountain listing.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront.',
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
          'Wholesale, the Jackson shop and whitemountainpuzzles.com are excluded: real channels that cannot be sized from outside. And the net profit being multiplied rests on a placeholder cost of goods, so this figure is only as good as that line.',
      },
      {
        type: 'prose',
        text:
          'The positives are durability: fifteen years of listings, a 99% seller record over more than ten thousand ratings, and a catalogue no single listing can take down. The negative is concentration of another kind — every measured dollar comes from Amazon US.',
      },
      {
        type: 'prose',
        text:
          'Four answers are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers in the model, taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple. Brand Registry is firmer: Amazon gates the brand store behind enrolment. All four are the first things to put to the owner.',
      },
    ],
  },

  kalotoys: {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-kalotoys-headline.ts, from
       waithowmuch-research research/kalotoys/headline.json (reviewed
       2026-09-15) — and the page reads them from the row alone. */
    headline: {
      /* The best seller, and the object the headline is about: one of the four
         $34.96 name puzzles that are half of September 2026. */
      image: {
        src: kalotoysPhoto('B0GSZSCM69'),
        alt: 'A toddler holding up a personalised wooden name puzzle spelling ADELYNN in pink letters, framed by a unicorn, butterfly, rainbow and other animal pieces — the best-selling KALOTOYS listing on Amazon',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand and designs,
             made — by their own account — in their own Hanoi workshops, and the
             customs trail runs from their street address. The model has no
             "own manufacturing" answer; private label is the nearest one that
             describes what transfers. */
          primaryMethod: 'private_label',
          /* Flagship. One product — the personalised name puzzle, in four
             listings on one account — is 51% of the month, and the top ten
             listings 78%, with 370 listings behind them. Not "broad": the tail
             is wide but it does not carry the revenue. The case for "churn" is
             that the hit changed accounts within a year; one hit replacing
             another is not yet a pattern the series can show. */
          catalogStructure: 'flagship',
          /* Level 3. Every best seller is personalised to order — a child's
             name cut from plywood — on their own designs. No tooling nobody
             else has: laser-cut plywood is a commodity process, and rivals
             sell name puzzles on the same search page. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/KALOTOYS is gated behind
             enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: B0DNVSDMM4, 2024-11-23 — the first plausible listing.
             B0H3KVJ54K's 2022-08-15 is an artefact (impossible for a B0H ASIN);
             2020 is the company. */
          sellingSince: '2024-11-23',
          /* Top listings of both storefronts, a floor; variations share
             counts. */
          reviewTotal: 3766,
          ratingWeighted: 4.4,
          /* 🚨 An INFERENCE of a different kind: three accounts, weighted by
             rating count — 30% over 40, 60% over 152, 26% over 43 → 49%. Any
             blend lands in the model's "under 85%" band, so the choice of
             blend does not move the multiple; including the two accounts
             attributed by inference does not either, since KALO KIDS alone is
             30%. */
          sellerFeedbackPct: 49,
          /* A read from Keepa's fees: busy boards and Halloween kits carry an
             FBA fee; the made-to-order name puzzles and nursery signs carry no
             FBA fee and no package dimensions, and KALOTOYS GROUP has no FBA. */
          channels: 'both',
          /* RULE 2. Giftora's account exists on Amazon Canada with 0 ratings;
             Amazon US is all of the measured Amazon revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* August 2026 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 19.47,
          /* RULE 3: offAmazonSharePct unset. Etsy and the websites are, by the
             founders' account, most of the company, and none is sized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. The KALOTOYS brand on Amazon US only — Etsy, their own sites, the Vietnamese store and the company’s other unnamed brands are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '370', note: '234 priced, 29 carrying a sold badge', info: 'skus' },
      /* The best seller's own breadcrumb. No rank beside it: Keepa files these
         listings' main rank under a root node the pull did not name, and a rank
         in an unnamed category says nothing. */
      {
        label: 'Category',
        value: 'Toys & Games › Puzzles › Pegged Puzzles',
        note: 'The best-selling name puzzle',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-listing figures across both storefronts, so NO `info` key — the
         shared ⓘ copy describes one hero listing. */
      { label: 'Product reviews', value: '3,766', note: 'Across the top listings — variations share counts' },
      { label: 'Product rating', value: '4.4★', note: 'Review-weighted, top listings' },
      /* 🚨 Shown, not hidden, and dated: measured and unflattering. A default
         pending the owner-of-the-page's decision (research README). */
      { label: 'Seller feedback', value: '26–60%', note: 'Three US accounts · read 15 Sep 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Made in their own Hanoi workshops, by their own account', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'Four name puzzles are half of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own stores, Etsy', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, through three US seller accounts. Every figure on this profile — the chart, the margin, the valuation — is the KALOTOYS brand on Amazon US and nothing else.',
      },
      /* Unchecked rather than no: an account exists in Canada, but nobody
         looked for a badge there. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'Giftora’s account exists on Amazon Canada with 0 ratings, and no Canadian listing was checked for a badge. None of the three accounts exists on Amazon UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        note:
          'kalotoys.com (Shopify, 175 products at a median $12.99) and kalokid.com (15 products at a median $39.99), plus kalotoys.vn for Vietnam. The founders put their website at 40% of 2023. Shopify publishes no sales.',
      },
      'other-marketplace': {
        status: 'yes',
        flag: true,
        note:
          'Etsy, as KalotoysOfficial — by the founders’ account their primary channel and a top-10 Etsy seller by orders in November 2023. The shop refused a direct fetch, so no sales count was read and the claim is unchecked.',
      },
      // tiktok-shop and wholesale-out left unchecked: nobody looked. The TikTok
      // account is Vietnamese-language and was not opened.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Two of the three accounts carry FBA, and the busy boards and Halloween kits carry Amazon pick-and-pack fees of $4.09–6.13.',
      },
      fbm: {
        status: 'yes',
        flag: true,
        note:
          'The name puzzles and nursery signs — made to order with a child’s name — carry no FBA fee and no package dimensions, so they ship from the seller. That is the half of the month the four name puzzles make up. KALOTOYS GROUP has no FBA at all.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the listings on any of the three seller records.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and designs, on listings no outside seller carries a badge on.',
      },
      manufacturer: {
        status: 'yes',
        note:
          'Two workshops in Hanoi, 2,300 m², by the founders’ own account — self-reported. The customs trail agrees with the shape: the shipper to the US sits at Kalo JSC’s own Hanoi street address.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/KALOTOYS, which Amazon gates behind enrolment.',
      },
      'amazon-handmade': {
        status: 'yes',
        note: 'Some KALOTOYS variations are listed under Handmade Products. The referral rate is 15% either way.',
      },
      // amazon-custom left unchecked: the personalised listings may use it, and
      // nobody looked.
    },

    intro:
      'KaloToys is a Hanoi company that makes wooden Montessori toys and personalised baby gifts in its own workshops. On Amazon US it sells under the KALOTOYS brand through three American seller accounts, none of which carries the company’s name.',

    blocks: [
      { type: 'heading', text: 'Name puzzles, busy boards and school signs' },
      {
        type: 'prose',
        text:
          'Three product families carry the Amazon catalogue: personalised wooden name puzzles, made to order with a child’s name cut from plywood; Montessori busy boards of latches, zips and gears; and, since June 2026, personalised first-day-of-school signs. Around them sit nursery name signs, Halloween sign kits, ornaments and baby baskets — 370 listings in all, 176 of them added between June and August 2026.',
      },
      {
        type: 'prose',
        text:
          'The brand is not the company. The founders told Shark Tank Vietnam in 2024 that in the US they run “a school of small fish”: many small brands they would not name. Everything on this page is the KALOTOYS brand on Amazon US, found across all three seller accounts and counted once — not the company’s Amazon business, and not the company.',
      },
      /* No figures in the caption. The busy board is what the storefront leads
         with; the sign is what summer 2026 was built on. Bucket copies. */
      {
        type: 'images',
        items: [
          {
            src: kalotoysPhoto('B0DQZKTNCB'),
            alt: 'A pink wooden Montessori busy board with number tiles, bells, an abacus, a zip, a shoelace, shape pegs, a bus and a clock, shown beside a baby holding it and its KALO TOYS gift box',
          },
          {
            src: kalotoysPhoto('B0H3KTSB4M'),
            alt: 'A wooden first-day-of-school sign with the name MADISON in raised red letters over dry-erase panels for age, height, favourites and teacher, with a washable marker',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the busy board the storefront leads with, and the personalised school sign that arrived in summer 2026.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A workshop business founded in 2020, on national television in 2024, and on Amazon US through three seller accounts that appeared one after another.',
      },
      {
        /* Oldest first. "2020" is the founders' own claim with no day on it;
           it stays on this list and off the overview chart. */
        type: 'timeline',
        items: [
          {
            when: '2020',
            tag: 'Brand',
            what: 'Founded in Hanoi by Đồng Đức Thành and Lê Trung Anh',
            detail:
              'By their own account, when both were expecting their first children. Two workshops of 2,300 m² today, self-reported, and 100–199 staff on an employer listing.',
          },
          {
            when: '7 Nov 2023',
            tag: 'Web',
            what: 'kalotoys.com registered',
            detail:
              'The Shopify store now lists 175 products at a median $12.99, and prints a Vernon Hills, Illinois address and a Garland, Texas fulfilment address.',
          },
          {
            when: '18 Nov 2023',
            tag: 'Brand',
            what: 'A top-10 Etsy seller by orders, by their own account',
            detail:
              'Not checked: the Etsy shop refused a direct fetch. The founders call Etsy their primary channel and put 2023 at 40% website, 60% marketplaces.',
          },
          {
            when: '6 Aug 2024',
            tag: 'Brand',
            what: 'Shark Tank Vietnam airs: $1M asked for 10%',
            detail:
              'The first $1M deal of season 7, on VTV. On air the founders gave 2023 revenue of 95 billion VND and profit of 9.6 billion VND — company-wide, self-reported and unaudited — and the cost shares the margin on this page is built from.',
          },
          {
            when: '13 Aug 2024',
            tag: 'Brand',
            what: 'The deal is signed, and the “school of small fish” explained',
            detail:
              'Shark Bình and Shark Minh Beta sign $1M for 10%, disbursement conditional; whether it was paid is not public. The CEO says the US business runs many small unnamed brands, after competitors interfered with them.',
          },
          {
            when: '4 Oct 2024',
            tag: 'Web',
            what: 'kalokid.com registered',
            detail: 'A second storefront carrying the same Illinois and Texas addresses. Its 15 products were all created on 22 July 2026.',
          },
          {
            when: '23 Nov 2024',
            tag: 'Amazon',
            what: 'The first KALOTOYS listing with a believable date',
            detail: 'A busy board, B0DNVSDMM4. One listing reads 2022 in Keepa, which is impossible for its ASIN, and is ignored.',
          },
          {
            when: '2 Dec 2024',
            tag: 'Amazon',
            what: 'The Giftora account, trading as “Kalotoys”, is first tracked',
            detail:
              'A Worcester, Massachusetts entity, by Keepa’s first-tracked date, which trails an account’s real opening. Tied to KaloToys by its seller name and listings — an inference, not a document.',
          },
          {
            when: '4 Mar 2025',
            tag: 'Amazon',
            what: 'The first sold badge anywhere in the catalogue',
            detail: 'Amazon prints “bought in past month” from roughly 50 sales a month. The series on this page starts the month after.',
          },
          {
            when: '29 Jul 2025',
            tag: 'Brand',
            what: 'The first public customs record',
            detail:
              'SNAP ECOM JSC — at the same Hanoi street address as Kalo Joint Stock Company — ships busy boards, signs and décor from Hai Phong to KALO KIDS CORPORATION in Illinois. Five bills of lading to June 2026 are visible.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$140,330 — the Christmas month',
            detail: '4.4 times the January that followed. Ordinary for toys, and not the year’s high.',
          },
          {
            when: '16 Feb 2026',
            tag: 'Amazon',
            what: 'KALO KIDS CORPORATION is first tracked',
            detail: 'The account behind the brand store’s landing listing, at the Vernon Hills address kalotoys.com prints.',
          },
          {
            when: '18 Mar 2026',
            tag: 'Amazon',
            what: 'Four personalised name puzzles go up on Giftora',
            detail: 'All four at $34.96. Six months later they are 51% of September’s brand revenue.',
          },
          {
            when: '10 Jun 2026',
            tag: 'Amazon',
            what: 'KALOTOYS GROUP is first tracked',
            detail:
              'Sachse, Texas, a few miles from the Garland fulfilment address, with no FBA. It holds the buy box on every badged listing probed outside the other two storefronts. Tied to KaloToys by name, listings and geography — an inference, not a document.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$181,557 — back to school beats Christmas',
            detail:
              'Personalised first-day-of-school signs and 176 new listings in three months, most of them outside the original storefront. The best month on record.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The brand’s Amazon year has two peaks, not one. December 2025 did $140,330, ordinary for toys; August 2026 then did $181,557 on back-to-school signs, and September 2026 was 4.1 times September 2025. Of each month a little under a third is left after Amazon’s fee, the goods, fulfilment and advertising — before overhead, and on cost shares the founders gave for the whole company in 2023.',
      },
      {
        type: 'prose',
        text:
          'The series counts all 370 listings carrying the KALOTOYS brand, manufacturer or name, each once, whichever of the three accounts lists it. That matters here more than usual: the storefront’s own seller accounts for under a fifth of the month, and measured off that account alone this page would describe a business about a fifth of the size.',
      },
      { type: 'chart' },
      {
        /* From each account's Keepa seller record on UK, DE and CA
           (2026-09-15). 🚨 The largest share is valuation
           derived.topMarketplaceSharePct — check-profile.mjs holds the two
           together. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. One of the three accounts exists in Canada, with no ratings.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Giftora’s account exists with 0 ratings; no Canadian listing was checked for a badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No account for any of the three sellers' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Each account’s seller id was looked up on every marketplace.',
      },
      {
        /* Generated from the three Keepa catalogues — see the module's header.
           The rows sum to the 2026-09 revenue row, which check-profile.mjs
           asserts. */
        type: 'breakdown',
        intro:
          'Four name puzzles at $34.96 are half of the month, and all four sit on the Giftora account. The school signs behind them arrived in June; the busy boards the storefront leads with are a small part of what sells.',
        items: KALOTOYS_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the buy box on 15 September 2026, so every row is a floor. 205 more priced listings carry no badge, each under roughly 50 a month, and count as zero; at up to 50 each they could add as much again. The account after each name is the storefront that lists it, not who held the buy box.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. Three of the four cost lines under the profit are the founders’ own company-wide shares for 2023, not measurements of this brand — Margin breakdown says which, and why the same founders’ reported margin was far lower.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is one of at least three ways KaloToys sells, and by the founders’ own account not the main one. It is the only one with a public number behind it.',
      },
      {
        type: 'prose',
        text:
          'The founders put 2023 at 40% through their own website and 60% through marketplaces, with Etsy the one they called primary. On Amazon, fulfilment is split by product rather than by account: the busy boards and Halloween kits carry Amazon FBA fees, while the name puzzles and nursery signs — made to order with a child’s name — carry no FBA fee and no package dimensions, so they ship from the seller.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store or an Etsy shop takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $25.07 average sale, down to a little under a third of it — a contribution ceiling built on the founders’ own cost shares, not a net margin.',
      },
      {
        type: 'prose',
        text:
          'Only one line here is measured for this brand: Amazon’s 15% referral fee. The other three are the founders’ own shares for the whole company in 2023, stated on Shark Tank Vietnam and applied here to one brand on one marketplace three years later. The one cross-check available agrees with the fulfilment line: Amazon charges $5.52–6.13 to pick and pack a $29–33 busy board, 17–19% of its price.',
      },
      {
        type: 'table',
        caption: 'The cost shares — what the founders said, and what is used here',
        columns: ['Line', 'Stated by the founders (2023, company-wide)', 'Used here', 'Basis'],
        rows: [
          ['Amazon referral fee', '—', '15%', 'Measured: Amazon’s published Toys & Games and Handmade rate; 15.01% per listing in Keepa'],
          ['Cost of goods', '~16%', '16%', 'Self-reported, VTV, 6 Aug 2024'],
          ['Shipping and fulfilment', '20–22%', '21%', 'Self-reported midpoint. FBA pick-and-pack on the busy boards is 17–19%; the made-to-order listings carry their own freight'],
          ['Advertising', '30–33% “marketing, including platform commissions”', '16.5%', 'Self-reported midpoint less the 15% referral fee it included. The weakest line'],
          ['Operating costs', '3–4% of revenue a month', 'Not deducted', 'Self-reported; left out, which is one reason the remainder is a ceiling'],
        ],
        note:
          'Unaudited figures given on television for the whole company — Etsy, their websites and every brand they run. Nothing here is a supplier quote or a figure from this brand’s books.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 31.5% — and
           the backend seed builds the profit and ad-spend series from the SAME
           four numbers (COST_LINES in seed-kalotoys.ts). Change one, change
           both. Three of the four are DERIVED from self-reported shares; the
           labels below must keep saying so. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 25.07 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -16,
            detail:
              'About $4.01 of a $25.07 sale. Derived from the founders’ self-reported ~16% for the whole company in 2023, not quoted for any product. Plywood imported from Russia and cut in their own Hanoi workshops, by their own account.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published rate for Toys & Games and for Handmade — 15% either way, and 15.01% per listing in Keepa. The one measured line.',
          },
          {
            label: 'Shipping and fulfilment',
            pct: -21,
            /* The largest line — the component labels the emphasised line
               "Biggest line", so it belongs here, not on advertising. */
            emphasis: true,
            detail:
              'Freight from Vietnam and delivery to the customer, at the founders’ self-reported 20–22% midpoint. Derived. Consistent with the $5.52–6.13 FBA fee on the busy boards; the made-to-order listings ship themselves.',
          },
          {
            label: 'Advertising',
            pct: -16.5,
            detail:
              'Derived, on a self-reported basis: the founders’ 30–33% marketing share, which they said included platform commissions, less the 15% referral fee. The weakest line — the sponsored footprint on Amazon neither confirms nor contradicts it.',
          },
        ],
        note:
          'Derived, self-reported basis: three of the four lines are the founders’ own 2023 company-wide shares. Returns, payroll, overhead and the US entities’ own costs are all at zero here, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The same founders reported 2023 profit of 9.6 billion VND on 95 billion of revenue: a 10.1% net margin. Their cost shares leave 31.5%, or about 28% after the operating costs they named, so roughly 18 points of cost go unnamed — payroll, R&D, depreciation, interest, or the costs of Etsy and the websites that sit outside “marketing”. The profit on this page is what one Amazon brand contributes before those, and the company-level margin may be nearer 10%.',
      },
      {
        type: 'callout',
        text:
          'The margin block and the profit series on the chart are one model, so they cannot disagree. What neither can say is which side of that 18-point gap this brand sits on — the first thing to put to the owner.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Growth here is listing, not buying: new personalised products, put up on new seller accounts, fast enough that the account holding the hit changed within a year.',
      },
      {
        type: 'prose',
        text:
          'Almost none of the year’s growth came from the listings that were selling a year earlier. Four name puzzles went up on the Giftora account on 18 March 2026 and reached about 2,300 units a month by September. A run of personalised first-day-of-school signs followed in June, largely on the KALOTOYS GROUP account Keepa first saw that month, and 176 listings went up between June and August.',
      },
      {
        type: 'prose',
        text:
          'On a made-to-order catalogue that is the model rather than an accident. A personalised product is cheap to design and list, and whichever account lists the one that catches becomes, for a season, most of the business. The other side of it is a wide tail that sells little: of 234 priced listings, 29 carry a sold badge.',
      },
      {
        type: 'prose',
        text:
          'Television did not visibly move Amazon. The Shark Tank episode aired in August 2024, months before the first KALOTOYS listing with a believable date, and nothing in the catalogue carried a sold badge until March 2025.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot yet show is whether summer 2026 is a new level or a season. The series holds one back-to-school with the school signs in it.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Brand defence, and a toe in one generic niche. Nobody publishes the bill, so the figure below is the founders’ share; the counted lines are what a US search showed.',
      },
      {
        type: 'prose',
        text:
          'On the two generic busy-board searches, none of 24 sponsored slots was theirs: the product the storefront leads with buys no generic demand. On “personalized name puzzle for toddlers” they held one sponsored slot, at position 2, beside four organic results in the top ten. The sharpest finding is on their own name — a Sponsored Brands banner and 5 of 12 Sponsored Products slots are theirs, and the other 7 are competitors buying the KALOTOYS search.',
      },
      {
        type: 'prose',
        text:
          'A first read delivered to Israel and showed no KALOTOYS ads anywhere, their own name included. Amazon serves sponsored placements by delivery address, so it was discarded and redone for New York.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products and Sponsored Brands',
            href: 'https://www.amazon.com/s?k=kalotoys',
            value: '≈ 16.5% of revenue',
            counted:
              '0 of 24 slots on two busy-board searches · 1 of 12 on “personalized name puzzle for toddlers” · 5 of 12 and a brand banner on “kalotoys” · 2 of 12 on “kalotoys busy board” — New York delivery, 15 Sep 2026',
            flag: true,
            note:
              'Derived on a self-reported basis, not observed: the founders’ 30–33% company-wide marketing share less the 15% referral fee inside it. The footprint looks lighter than that — defence and one niche — but a footprint is not a spend, so it neither confirms nor contradicts the level.',
          },
          {
            label: 'Competitors on their name',
            value: '7 of 12',
            counted: 'Sponsored slots on the search “kalotoys” held by other brands, among them Joyreal and Potatomato',
            note: 'Rivals pay to appear when a shopper types this brand. The name has search demand worth taking, and they do not hold all of it.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note:
              'The Meta Ad Library and paid-search history were not read. Absent here means unexamined, not zero — and the founders’ marketing share covers every channel, not Amazon alone.',
          },
        ],
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Off Amazon there are three stores, an Etsy shop and three social accounts — and no reading of how many people visit any of them.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Traffic was not measured and no follower count was read. The Instagram and Facebook accounts are the ones kalotoys.com links to; the TikTok account is a Vietnamese-language one, whose follower figure came from a search summary and was not checked. The addresses are the stranger part: an Illinois registered address, a Texas fulfilment address, an Instagram tagged Houston, and a Hanoi company behind all of them.',
      },
      {
        /* 🚨 No rank table and no keyword table. Keepa files these listings'
           main rank under a root node the pull did not name, and no off-Amazon
           keyword read was taken — the Amazon search read is on Advertising. */
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Etsy — KalotoysOfficial',
            href: 'https://www.etsy.com/shop/KalotoysOfficial',
            value: 'Not read',
            flag: true,
            note:
              'By the founders’ account their primary channel, and a top-10 Etsy seller by orders in November 2023. The shop page returned 403 to a direct fetch, so no sales count was read and the claim is unchecked.',
          },
          {
            label: 'Own store — kalotoys.com',
            href: 'https://kalotoys.com/',
            value: '175 products',
            note:
              'Shopify, median $12.99 (range $2–59.99), products created November 2024 to September 2025. Prints a Vernon Hills, Illinois address and a fulfilment address at 1121 S Jupiter Road, Garland, Texas.',
          },
          {
            label: 'Own store — kalokid.com',
            href: 'https://kalokid.com/pages/about-us',
            value: '15 products',
            note: 'All created on 22 July 2026, at a median $39.99. The same Illinois and Texas addresses, with a US and an Australian phone number.',
          },
          {
            label: 'Vietnamese store — kalotoys.vn',
            href: 'https://kalotoys.vn/',
            note: 'The domestic line the founders described launching in 2024. Found through search, not opened.',
          },
          {
            label: 'Instagram — @kalotoys_official',
            href: 'https://www.instagram.com/kalotoys_official/',
            value: 'Count not read',
            note: 'Linked from kalotoys.com, and tagged Houston, Texas.',
          },
          {
            label: 'Facebook — kalotoys.official',
            href: 'https://www.facebook.com/kalotoys.official',
            value: 'Count not read',
            note: 'Linked from kalotoys.com.',
          },
          {
            label: 'TikTok — @kalotoys',
            href: 'https://www.tiktok.com/@kalotoys',
            value: '~18.7K, unchecked',
            note: '“KaloToys – Đồ Chơi Montessori”, in Vietnamese. The count is a search summary’s; the page was not opened.',
          },
        ],
      },
      {
        type: 'callout',
        text:
          'None of these can be sized from outside, and by the founders’ account together they are most of the company. The figures on this page describe the part that can be.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Công ty Cổ phần Kalo', note: 'Kalo Joint Stock Company · tax code 0110509128' },
          { label: 'Registered address', value: 'Hanoi, Vietnam', note: 'No. 35 Nguyen Xien, Khuong Dinh Ward' },
          { label: 'Founded', value: '2020', note: 'By Đồng Đức Thành (CEO) and Lê Trung Anh, by their own account' },
          { label: 'Staff', value: '100–199', note: 'Employer listing' },
          { label: 'Seller feedback', value: '26–60%', note: 'Three US accounts · read 15 Sep 2026', info: 'sellerFeedback' },
          { label: 'First listing', value: '23 Nov 2024' },
        ],
      },
      {
        /* 🚨 All three accounts named, and the two tied to KaloToys by
           inference SAY so in their row. A default pending the page owner's
           decision on how to name them (research README). */
        type: 'table',
        caption: 'The three US seller accounts',
        columns: ['Account', 'Legal name and address', 'Seller feedback', 'First tracked', 'Link to KaloToys'],
        rows: [
          [
            'KALOTOYS OFFICIAL · A343UID6F5X37S',
            'KALO KIDS CORPORATION, Vernon Hills, IL',
            '30% over 40 ratings',
            '16 Feb 2026',
            'Printed address and customs trail: kalotoys.com prints the same address, and US customs records ship to it from SNAP ECOM JSC at Kalo JSC’s Hanoi street address',
          ],
          [
            'Kalotoys · A2PA1HBQL5NIQH',
            'Giftora, Worcester, MA',
            '60% over 152 ratings',
            '2 Dec 2024',
            'Inference: its seller name, 31 KALOTOYS listings and a share of the buy box on two KALO KIDS listings — no document',
          ],
          [
            'KALOTOYS GROUP · A3783D15T8P9ZQ',
            'KALOTOYS GROUP, Sachse, TX',
            '26% over 43 ratings',
            '10 Jun 2026',
            'Inference: its name, its listings and a Texas address a few miles from the brand’s Garland fulfilment address — no document',
          ],
        ],
        note:
          'Feedback and addresses from Keepa’s seller records, read 15 September 2026; first-tracked dates are Keepa’s and trail an account’s real opening. Of September 2026’s brand revenue, 58.6% came through listings in Giftora’s storefront, 13.1% in KALO KIDS CORPORATION’s, 5.1% in both, and 23.2% outside both, where KALOTOYS GROUP holds the buy box.',
      },
      {
        type: 'prose',
        text:
          'None of the three carries the company’s name, and all three run seller feedback far under Amazon’s comfort line — 26%, 30% and 60% positive when read. That rates dispatch and service rather than the products, which hold 4.4 stars across the top listings. The founders explained the unnamed accounts on air: many small brands, kept anonymous because competitors had interfered with them before.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from Keepa’s seller records for the three accounts, the brand store, US customs records and the founders’ interviews. Nobody at KaloToys has confirmed the link between the company and the Giftora or KALOTOYS GROUP accounts.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve profit, and it prices the KALOTOYS brand on Amazon US alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Etsy, kalotoys.com, kalokid.com, the Vietnamese store and the company’s other unnamed US brands are excluded: by the founders’ account most of the company, and none of it sizeable from outside. The profit being multiplied is a contribution ceiling on self-reported cost shares — the same founders reported a 10.1% net margin for 2023 — so on that basis this figure is an upper bound.',
      },
      {
        type: 'prose',
        text:
          'The positives are what the brand owns: its own designs made in its own workshops, personalisation a copier has to rebuild, an enrolled brand store and the reviews its top listings have gathered. The negatives are service and concentration: seller feedback of 26–60% across all three accounts, every measured dollar on Amazon US, and four listings carrying half the month.',
      },
      {
        type: 'prose',
        text:
          'Five inputs are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken from the public record; seller feedback is a blend of three accounts, two of them tied to the brand by inference; and the FBA-and-FBM answer is read from which listings carry Amazon’s fee. Brand Registry is firmer: Amazon gates the brand store behind enrolment. All of them are the first things to put to the owner.',
      },
    ],
  },

  maryruth: {
    /* 🚨 No headline copy here. Title, subtitle and snapshot month live on the
       Business row — backend prisma/seed-maryruth-headline.ts, from
       waithowmuch-research research/maryruth/headline.json (reviewed
       2026-09-15). This entry carries only the image beside them. */
    headline: {
      image: {
        src: MARYRUTH_PHOTOS.hero,
        alt: 'MaryRuth’s Liquid Morning Multivitamin + Hair Growth in Peach Mango — an amber 15.22 fl oz bottle standing beside its orange-and-white box. The best-selling listing in the catalogue',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand, their own
             formulations, their own listings; whose factory makes them is not
             public. Private label is what transfers in a sale. */
          primaryMethod: 'private_label',
          /* Broad. 617 listings carry the name, the top 20 are half of revenue
             and the top 50 are 73%; the single largest listing is about 7% of
             the month. */
          catalogStructure: 'broad',
          /* Level 3, and the most arguable answer here. A liquid, USDA-organic
             formulation is a real change of form and materials from a capsule
             multivitamin; no tooling protects it. The case for level 2 is that
             a contract manufacturer can approximate a supplement formula for
             anyone. The step is worth 0.55 of the multiple. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/MaryRuthOrganics is gated behind
             enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the first listing, 2014-09-07 — also establishedAt. */
          sellingSince: '2014-09-07',
          /* 🚨 The research's reading of "39,143 Amazon ratings" at 4.5 stars.
             Which listings that count covers is not stated. It lands in the
             25,000+ band with room to spare; the 4.5 sits EXACTLY on a band
             boundary, and anything lower drops the factor from +0.20 to +0.05. */
          reviewTotal: 39143,
          ratingWeighted: 4.5,
          sellerFeedbackPct: 99,
          /* 🚨 topMarketplaceSharePct and marketplaces deliberately UNSET. The
             pull was Amazon US and no other marketplace was read, so how
             concentrated the Amazon business is cannot be answered — and 100
             would be a guess. The model lists it as missing; the board note
             says so. */
          /* Largest month against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 11.19,
          /* RULE 3: offAmazonSharePct unset. 22,780 retail doors and their own
             store are real, and most of the company, and unsized. */
        },
      },
      basis:
        'Trailing-twelve modelled net profit at a modelled multiple. The Amazon listings only — other sellers’ sales on them included — and not the company.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '617', note: '268 in their own storefront · 253 priced', info: 'skus' },
      /* Top level only: the research read ranks in Health & Household and not
         the deeper branch, so no `info` (its copy promises the full breadcrumb). */
      { label: 'Category', value: 'Health & Household', note: 'Hair-growth parent listing #143', wide: true },
      /* No `info` on these two: the shared ⓘ describes the hero listing, and
         the research does not say which listings the 39,143 covers. */
      { label: 'Product reviews', value: '39,143', note: 'Amazon ratings, as read 9 Sep 2026' },
      { label: 'Product rating', value: '4.5★', note: 'Against 2.6 on Trustpilot, over 25 reviews' },
      { label: 'Seller feedback', value: '99%', note: 'Over 36,747 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Own formulations; the factory is not public', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, long tail', note: 'Top 20 listings are half of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, 22,780 retail doors', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, and every figure on this profile is it. It is also a LISTING figure: Amazon’s badge counts what a listing sold, and the brand shares its listings with other sellers.',
      },
      'own-store': {
        status: 'yes',
        note:
          'maryruthorganics.com, on Shopify: 267 products at a $24.95 median, with Subscribe & Save at 10% off. The hero Liquid Morning Multivitamin is $42.95 there against $26.77 for the comparable Amazon listing. Shopify publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'The channel that reframes the rest. Their own store locator returns 22,780 US doors across 323 retailer banners — CVS, Walmart, Target, Ulta, Kroger, Whole Foods — and live product pages at Walmart, Target and Whole Foods were confirmed independently. Nobody publishes what a door sells.',
      },
      // amazon-international, tiktok-shop, other-marketplace and licensing
      // left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'FBA enabled on the seller record, and the margin model charges an FBA fee on every unit.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits their 268 storefront listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'unchecked',
        note:
          'Amazon itself appears as one of the offers on their top listings, which can mean Amazon buys the stock wholesale. The offer lists do not say on what terms.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and formulations, sold under their own name. The buy box on the top listings resolves to MaryRuth Organics, LLC.',
      },
      manufacturer: {
        status: 'unchecked',
        note: 'The products are described as largely US-made, which does not say whose factory. Left open rather than read as yes.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/MaryRuthOrganics, which Amazon gates behind enrolment.',
      },
      'subscribe-save': {
        status: 'yes',
        note: 'Advertised in the best-selling listing’s own images, and offered at 10% off on their own store. Subscription billing is also what the two open law-firm investigations are about.',
      },
    },

    intro:
      'MaryRuth’s makes liquid vitamins — a morning multivitamin you drink rather than swallow — along with gummies, liposomals and probiotic drops. Amazon is one of the ways it sells them, and the only one with a public number behind it.',

    blocks: [
      { type: 'heading', text: 'A multivitamin you drink' },
      {
        type: 'prose',
        text:
          'It started as a fix for one complaint. By the founder’s own account, clients of her Manhattan nutrition practice said capsule vitamins made them nauseous, so she made a liquid one and sold the first bottles off a bookshelf in the office — and, in her words, “I just happened to start putting them on Amazon.” The listing dates agree with her: the first ASIN went up on 7 September 2014, and maryruthorganics.com was registered on 31 December 2014.',
      },
      /* 🚨 The README's first rule for this business: say it is one channel
         before saying anything else about money. Kept in the overview so no
         reader reaches the chart without it. */
      {
        type: 'prose',
        text:
          'Read every figure on this page as one channel. The brand’s own store locator returns 22,780 US retail doors across 323 banners, and Forbes estimated the whole company at about $600M of trailing revenue in August 2026. Next to that estimate, the Amazon listings measured here are less than a third of the company.',
      },
      {
        type: 'prose',
        text:
          'And the Amazon figure is softer than a channel figure usually is. 617 listings carry the MaryRuth’s name; their own storefront holds 268 of them, and one kids’ multivitamin listing carries 298 competing offers. Amazon’s sales badge counts what a listing sold, not what each seller on it sold, and nothing public splits the two.',
      },
      /* No figures in the caption. The best seller's own secondary images —
         the hero already shows the bottle. Before/after claim images on the
         same listing were left out on purpose. */
      {
        type: 'images',
        items: [
          {
            src: MARYRUTH_PHOTOS.drink,
            alt: 'Listing image: a woman drinking an orange shot of the liquid multivitamin under the words “Upgrade your hair routine”, with Clean Label Project and B Corp marks',
          },
          {
            src: MARYRUTH_PHOTOS.serving,
            alt: 'Listing image: a MaryRuth’s measuring glass filled with orange liquid, labelled “Multiple essential nutrients in each serving” — vitamins A, B, C, E and zinc',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images for its best seller. The pitch is the format: a daily multivitamin taken as a measured shot rather than a capsule.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Amazon came first, the website second and the retail doors later — the first listing went up four months before the domain was registered, the reverse of the usual order.',
      },
      {
        /* Oldest first — the dossier had 2024-12-31 before 2024-08-15. Events
           with no published day stay month- or year-only: on this list, off the
           chart, rather than given a day nobody recorded. */
        type: 'timeline',
        items: [
          {
            when: '2013',
            tag: 'Brand',
            what: 'A nutrition practice in Manhattan, before there is a product',
            detail:
              'The founder’s own account: a private practice whose clients said capsule vitamins made them nauseous. The liquid multivitamin is the answer to that complaint, and she says she sold the first bottles off a bookshelf in the office.',
          },
          {
            when: '7 Sep 2014',
            tag: 'Amazon',
            what: 'First Amazon listing — before the website',
            detail:
              'The Liquid Morning Multivitamin that went up a week later is still among the five largest earners twelve years on.',
          },
          {
            when: '31 Dec 2014',
            tag: 'Web',
            what: 'maryruthorganics.com registered',
            detail: 'Four months after the first ASIN. The first archived capture of the site is 22 June 2015.',
          },
          {
            when: 'Oct 2018',
            tag: 'Brand',
            what: 'A YouTube channel, and $11M in sales',
            detail:
              'The channel joined in October 2018. Forbes reports that year’s revenue at $11M, attributed to the company, on the way to $23M in 2019.',
          },
          {
            when: '15 Aug 2019',
            tag: 'Amazon',
            what: 'Kids Multivitamin Gummies',
            detail:
              'The move from liquids into gummies and into children’s vitamins. Today it sells 30,000+ a month — on a listing that carries 298 offers.',
          },
          {
            when: '21 Jan 2021',
            tag: 'Brand',
            what: 'The TikTok account is created',
            detail:
              'From TikTok’s own createTime, corroborated by the timestamp inside the user id. It now carries 624,900 followers and 1,691 videos — the brand’s largest owned channel.',
          },
          {
            when: 'Aug 2021',
            tag: 'Brand',
            what: 'Butterfly Equity buys in',
            detail: 'A private-equity stake, in a year Forbes reports the company’s revenue at $135M.',
          },
          {
            when: '27 Sep 2022',
            tag: 'Amazon',
            what: 'USDA Organic gummies, for kids',
            detail:
              'Two of today’s fifteen largest listings went up this day, in a 2022 cohort of 113 new listings — the year the catalogue stops being a product line and becomes a shelf.',
          },
          {
            when: 'Jul 2023',
            tag: 'Brand',
            what: 'B Corp certified, at a score of 81.6',
            detail:
              'Against a passing mark of 80 and a median of 50.9 — a third-party audit of how the company operates, which is a different thing from an audit of its numbers.',
          },
          {
            when: '25 Aug 2023',
            tag: 'Amazon',
            what: 'Liquid Multivitamin + Hair Growth',
            detail:
              'The listing that changes the catalogue. It is the single biggest earner today, and “mary ruth hair growth” is now the second-largest Google search they rank for, at 74,000 a month.',
          },
          {
            when: '15 Aug 2024',
            tag: 'Brand',
            what: 'Butterfly sells the majority of its stake',
            detail:
              'Per the law firm that ran the deal, Butterfly kept a board seat and King Street financed the buyer. No price was disclosed. The claim that Butterfly “nearly tripled” the company is the seller describing its own track record.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '153 listings in a year, the catalogue’s biggest cohort',
            detail: 'More new ASINs in 2024 than in 2014 through 2021 combined.',
          },
          {
            when: '31 Mar 2025',
            tag: 'Advertising',
            what: 'Paid search peaks, then stops',
            detail:
              'Ubersuggest’s paid series runs from September 2024 and peaks in March 2025 at 19 keywords. From October 2025 it reads zero — while Similarweb calls paid search their largest channel in August 2026. The two do not agree.',
          },
          {
            when: 'Oct 2025',
            tag: 'Brand',
            what: '$420M of debt, and ~97% ownership',
            detail:
              'A Capital One facility due 2030, which Forbes reports left the founder owning about 97% of the company — in the year EBITDA first topped $100M.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: '$18.0M — the biggest month in the series',
            detail:
              '693,100 units. Unlike a gift business, December dips below November in every year of this series, and January recovers.',
          },
          {
            when: '27 Aug 2026',
            tag: 'Brand',
            what: 'Forbes puts the company at ~$600M and ~$125M EBITDA',
            detail:
              'An estimate, not a filing: this is a private company and none of it is audited. Set against it, the Amazon listings on this page are less than a third of the company — one estimate divided by another.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The line is Amazon’s own sales badge across the hundred best-selling listings, month by month from August 2023, which is as far back as Keepa recorded it for them. It climbs from about $5.7M that August to a high of $18.0M in November 2025; calendar 2025 came in 32% above 2024, and the last twelve months only about 3% above the twelve before. Of each month, a little under half is kept after cost of goods, Amazon’s fees and modelled advertising.',
      },
      {
        type: 'prose',
        text:
          'Some of the month-to-month wobble is Amazon’s rounding rather than the business. The badge moves in brackets, and at this volume a single listing stepping from 20,000 to 40,000 a month moves the total by half a million dollars.',
      },
      { type: 'chart' },
      {
        /* A table, not a breakdown — see maryruth.breakdown.mjs for why. */
        type: 'table',
        caption: 'The fifteen largest listings',
        columns: ['Listing', 'ASIN', 'Listed', 'Sold / mo', 'Buy box', 'Revenue / mo'],
        rows: MARYRUTH_TOP_LISTINGS,
        note:
          'The fifteen largest of 253 priced listings, read 9 September 2026 — together a little under half of the month on the chart, which is the top hundred. The other 85 are not itemised in this research, so no full breakdown is drawn. “Sold / mo” is Amazon’s badge, a bracket floor, and it counts the listing’s sales whoever made them. Five hair-growth listings share one parent.',
      },
      {
        type: 'callout',
        text:
          'Revenue cuts both ways here. Listings outside the top hundred count as zero, which makes it a floor on the catalogue; other sellers’ sales on the same listings count in full, which makes it a ceiling on the brand. Profit is a ceiling twice over — it takes the same margin off every unit and sets returns, overhead and inbound freight to zero.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Three channels are visible — Amazon, their own store and thousands of retail doors — and Amazon is the only one that publishes anything countable, which is not the same as being the biggest.',
      },
      {
        type: 'prose',
        text:
          'The channels do not agree on price. The hero Liquid Morning Multivitamin is $42.95 on maryruthorganics.com against $26.77 for the comparable Amazon listing, where the brand holds the buy box but shares the page: 177 offers on the original morning multivitamin, 38 on the hair-growth listing, 298 on the kids’ gummies.',
      },
      {
        type: 'prose',
        text:
          'The retail footprint comes from their own store locator, which returns every door: 6,750 CVS, 4,581 Walmart, 2,019 Target, 1,511 Ulta and 427 Whole Foods among 323 banners. Nobody publishes what a door sells, so what follows says which methods are in use and not what each is worth. A method nobody looked for is listed as unchecked.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $25.15 average sale, down to the little under half that is left — on a model that treats every unit sold on these listings as theirs.',
      },
      {
        type: 'prose',
        text:
          'Three of the four lines are published rates or quotes. The referral fee is Amazon’s own schedule, fulfilment the 2026 FBA rate card, and cost of goods is priced from supplier quotes for comparable bottles and gummies. Advertising is the one computed line.',
      },
      {
        type: 'table',
        caption: 'COGS — what it costs to make',
        columns: ['Quote', 'Region', 'MOQ', 'Lead time', 'Unit cost'],
        rows: [
          ['Guangzhou Green Health Pharmaceutical Technology Co., Ltd', 'Guangdong, CN', '3,000 bottles', 'not quoted', '$2.80–3.10 / bottle'],
          ['Guangzhou Marian Health Food Co., Ltd — gummies', 'Guangdong, CN', '500 pieces', 'not quoted', '$1.00–3.00 / unit'],
          /* 🚨 INVENTED in the dossier: nobody quoted it and it has no number.
             Kept, labelled, never quoted — and deducted nowhere. */
          ['Freight, duty and inbound — invented, nobody measured this', 'CN → US', '—', '—', 'not quoted'],
        ],
        note:
          'These price the category, not this brand: small minimums, from factories making product that is neither USDA-organic nor US-made, which much of MaryRuth’s is. So the cost-of-goods line could be high for a buyer of this volume or low for what it actually buys. The freight row has no figure, and nothing is deducted for it anywhere — which leaves the profit higher than a real month.',
      },
      {
        /* 🚨 100% less these lines is the profit rate the backend seed builds the
           series from (COST_LINES in seed-maryruth.ts). Change one, change both —
           check-profile.mjs fails if they drift. */
        type: 'margin',
        basis: { label: 'Average selling price, Sep 2026', value: 25.15 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -12,
            detail:
              'About $3.00 a unit, from the published quotes above. Not this brand’s cost: the quotes are small-order, non-organic and made in China.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published rate for Beauty, Health and Personal Care items above $10.',
          },
          {
            label: 'FBA fulfilment',
            pct: -18,
            emphasis: true,
            detail:
              'About $4.50 a unit blended: liquid vitamins in 15oz glass are large-standard at $4.60–5.42, gummies small-standard at $3.45–3.78. Which band a listing falls in depends on dimensions nobody published.',
          },
          {
            label: 'Advertising',
            pct: -8,
            detail:
              'Computed, not observed. A $1.10–1.40 Health & Household click at an 11–14% conversion rate is $7.86–12.73 per ad-attributed sale, a 32–51% ACoS; with an assumed 20–40% of units carried by ads, that is about 8% of revenue.',
          },
        ],
        note:
          'Before returns, overhead and inbound freight, all set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The model has a blind spot that matters more here than on most profiles: it applies the margin to every unit a listing sold, and on these listings some of those units are other sellers’. Forbes puts the whole company at roughly 20% EBITDA margins, after the overheads, retail costs and marketing this waterfall leaves out — so what is left below is what the listings could clear, not what the brand does.',
      },
      {
        type: 'callout',
        text:
          'The cost-of-goods line is the least certain figure on this profile, and the freight line has no figure at all. A real quote for either moves the margin more than anything else here.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Demand here is people looking for MaryRuth’s by name — and the founder is a bigger audience than the brand.',
      },
      {
        type: 'prose',
        text:
          'The five largest Google searches they rank for all contain the brand name: “mary ruths” at 90,500 a month, then “mary ruth hair growth” at 74,000. Organic search brings about 230,000 visits a month across 18,032 ranking keywords, and the first generic term, “kids vitamins”, sits at #3.',
      },
      {
        type: 'prose',
        text:
          'The product that moved the catalogue was hair growth. The Liquid Multivitamin + Hair Growth listing went up in August 2023, is now the largest earner, shares a parent ranked #143 in Health & Household with four other listings, and has turned its own name into their second-largest search term.',
      },
      {
        type: 'prose',
        text:
          'The audience is split between a person and a brand. The founder’s Instagram carries 733K followers against 28K on the brand’s own account, she runs her own Meta advertiser page, and creator handles run branded content paired with her name. TikTok is the brand’s real owned channel, at 624,900 followers since January 2021.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon, the growth is on shelves: 22,780 doors across 323 banners by their own locator, and an Inc. 5000 record of 1,336% three-year growth in 2022 and 642% in 2023.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot say is how the channels split. Forbes’ company estimate and the Amazon series are two estimates by different methods, and no public source divides the company’s revenue between Amazon, its own store and retail.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'One channel is counted, one is arithmetic, and one is a disagreement — and the page shows the disagreement rather than choosing a side.',
      },
      {
        type: 'prose',
        text:
          'Meta’s library gives an authoritative count of live ads on their own page. Amazon spend is computed from published category benchmarks, and it is the same model as the advertising line in Margin breakdown. On Google, Similarweb says paid search is their largest channel while Ubersuggest says they buy no paid keywords at all.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: '≈ $1.0M–2.6M / mo',
            note:
              'Computed, not observed. A $1.10–1.40 Health & Household click at an 11–14% conversion rate is $7.86–12.73 per ad-attributed sale, a 32–51% ACoS on a $24.87 order. Carrying 20–40% of the catalogue’s badge units that way lands the spend here, at 6–16% TACoS; the 20–40% is the one assumption. Amazon publishes nothing about a competitor’s spend.',
          },
          {
            label: 'Meta (Facebook and Instagram)',
            href: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&view_all_page_id=582115538507595&search_type=page&media_type=all',
            value: 'Not estimable',
            counted: '~390 active US ads on the brand page',
            note:
              'The page-scoped count, three times what a keyword search shows. The founder has her own advertiser page and creator handles run branded content paired with her name — a whitelisting operation rather than a few boosted posts. Meta publishes the ads and never the money, and the library shows only active ads.',
          },
          {
            label: 'Google Ads',
            value: 'The two sources disagree',
            counted: '25.95% of site traffic from paid search (Similarweb) vs 0 paid keywords (Ubersuggest), August 2026',
            flag: true,
            note:
              'Ubersuggest’s paid series ran from September 2024, peaked at 19 keywords in March 2025 and reads zero from October 2025. The likely reconciliation is Shopping and Performance Max, which Ubersuggest does not index — but neither source settles it, so both are shown.',
          },
        ],
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'For this business the half Amazon cannot see is most of the business: thousands of retail doors, a founder with a larger following than the brand, and a site found almost entirely by its own name.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The site figure needs one correction. Similarweb’s 750.8K visits is labelled a three-month total, so the store runs about 250,000 visits a month — 83.5% of them from the US, from an audience Similarweb reads as 76.9% female and concentrated in the 25–34 bracket.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Own-site visits', value: '~250K / mo', note: '750.8K reported over three months, not one' },
          { label: 'Month on month', value: '+6.6%', note: 'Similarweb, read 9 Sep 2026' },
          { label: 'Of which organic search', value: '230,773 / mo', note: 'August 2026, across 18,032 keywords' },
          { label: 'Domain authority', value: '40', note: '594,768 backlinks from 4,248 domains' },
          { label: 'Live Meta ads', value: '~390', note: 'Page-scoped count on their own page' },
          { label: 'Retail doors', value: '22,780', note: '323 banners, from their own store locator' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: '22,780 retail doors — their own store locator',
            href: 'https://www.maryruthorganics.com/pages/find-a-store',
            value: '323 retailer banners',
            flag: true,
            note:
              'The finding that reframes everything else here. The locator’s API returns every door: 6,750 CVS, 4,581 Walmart, 2,019 Target, 1,511 Ulta, 1,193 Kroger, 826 Publix, 640 Vitamin Shoppe, 598 Sam’s Club, 576 GNC, 497 Sprouts, 427 Whole Foods. Live product pages at Walmart, Target and Whole Foods were confirmed independently.',
          },
          {
            label: 'Founder’s Instagram — @maryruthghiyam',
            href: 'https://www.instagram.com/maryruthghiyam/',
            value: '733K followers · 750 posts',
            flag: true,
            note:
              '26 times the brand’s own Instagram, which has 28K followers and 156 posts. On this business the founder is the channel: she has her own Meta advertiser page, and creator handles pair their branded content with her name rather than the brand’s.',
          },
          {
            label: 'TikTok — @maryruthorganics',
            href: 'https://www.tiktok.com/@maryruthorganics',
            value: '624.9K followers · 2.4M likes',
            note:
              '1,691 videos, and the account was created on 21 January 2021 — measured twice, from TikTok’s own createTime and from the timestamp in the user id, which agree to within 106 seconds. The brand’s largest owned channel.',
          },
          {
            label: 'Facebook — MaryRuth Organics',
            href: 'https://www.facebook.com/maryruthorganics/',
            value: '264,031 likes',
            note:
              '6,874 “talking about this”, and the page that runs their ~390 live ads. Its transparency panel claims a creation date of 2004, before Facebook Pages existed — a merged-page artifact rather than a date.',
          },
          {
            label: 'YouTube and the dormant channels',
            href: 'https://www.youtube.com/@maryruthorganics',
            value: '8.98K subscribers · 945 videos',
            note:
              'Joined October 2018. X (@MaryRuths, 9,874 followers) is their oldest account, from July 2013, and last posted in 2025; Pinterest’s newest board is from 2021. Two channels left to idle is a choice, and at this size a visible one.',
          },
          {
            label: 'Own store — maryruthorganics.com',
            href: 'https://www.maryruthorganics.com/',
            value: '~250K visits / mo',
            note:
              'Shopify, 267 products, median price $24.95, Subscribe & Save at 10% off. The hero Liquid Morning Multivitamin is $42.95 here against $26.77 for the comparable Amazon listing.',
          },
          {
            label: 'Organic search — 18,032 keywords',
            href: 'https://neilpatel.com/ubersuggest/',
            value: '230,773 visits / mo',
            note:
              'Domain authority 40 on 594,768 backlinks from 4,248 domains. The five largest keywords by volume are all the brand’s own name — “mary ruths” at #1 against 90,500 searches, “mary ruth hair growth” at #2 against 74,000. They rank #3 for “kids vitamins” too, where a click costs $9.14.',
          },
        ],
      },
      {
        /* Best-seller rank, not Amazon keyword positions: Amazon publishes no
           volumes and localises results, while BSR is the same for everyone. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Health & Household', 'Note'],
        rows: [
          ['Liquid Multivitamin + Hair Growth, and its variations', '#143', 'Five ASINs share this parent listing; between them, the largest earner in the catalogue.'],
          ['Kids Multivitamin Gummies', '#535', '30,000+ a month at $14.46 — on a listing with 298 competing offers.'],
          ['Liquid Morning Multivitamin (2014)', '#1,063', 'The original product, still among the five largest earners twelve years after it was listed. 177 offers on it.'],
          ['Organic Lymphatic Support Liquid Drops', '#3,015', '30,000+ a month at $15.15 — high volume at a modest rank, which is what a cheap repeat purchase looks like.'],
        ],
        note:
          'Read from Keepa on 9 September 2026. Rank rather than keyword position, because Amazon publishes no search volumes and localises results to whoever is looking; best-seller rank is the same number for everyone. It moves daily.',
      },
      {
        type: 'table',
        caption: 'Search presence off Amazon',
        columns: ['Term', 'Where', 'Rank', 'Volume / mo'],
        rows: [
          ['mary ruths', 'Google', '#1', '90,500'],
          ['mary ruth hair growth', 'Google', '#2', '74,000'],
          ['mary ruth vitamins', 'Google', '#1', '40,500'],
          ['mary ruth organics', 'Google', '#1', '18,100'],
          ['mary ruth hair growth max', 'Google', '#4', '14,800'],
          ['liquid morning multivitamin hair growth', 'Google', '#3', '12,100'],
          ['kids vitamins', 'Google', '#3', '9,900'],
          ['vegan iron vitamins', 'Google', '#5', '9,900'],
          ['hair skin & nails gummy', 'Google', '#6', '8,100'],
          ['vegan liquid vitamins', 'Google', '#2', '6,600'],
        ],
        note:
          'Read 9 September 2026 from Ubersuggest, across 18,032 ranking keywords. The five largest all contain the brand name. Volumes are a keyword tool’s model of Google, not a count Google published, and say nothing about Amazon.',
      },
      {
        type: 'callout',
        text:
          'None of these numbers is a sale. Follower counts, visit estimates and search volumes measure attention, and nothing public connects any of them to an order on Amazon or in a store.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'MRO MaryRuth, LLC' },
          { label: 'Seller', value: 'MaryRuth Organics, LLC', note: 'Merchant A3V1QNHQ2M2TBN' },
          { label: 'First listing', value: '7 Sep 2014', note: 'Four months before the domain' },
          { label: 'Registered address', value: 'Los Angeles, CA, US', note: '1171 S Robertson #148, 90035' },
          { label: 'Seller feedback', value: '99%', note: 'Over 36,747 ratings · 345 in 30 days', info: 'sellerFeedback' },
          { label: 'Ownership', value: 'Founder, ~97%', note: 'Per Forbes, after a $420M facility in Oct 2025' },
        ],
      },
      {
        type: 'prose',
        text:
          'A private, founder-led company. Butterfly Equity took a stake in 2021 and sold the majority of it in August 2024, and Forbes reports the founder owning about 97% after a $420M Capital One facility closed in October 2025. The seller record is the sharpest thing about it: 99% positive over 36,747 ratings, 345 of them in the last thirty days. Where it operates from is less clear — the seller record gives Los Angeles, and the site’s terms give only a Delaware registered agent and New York governing law.',
      },
      {
        /* 🚨 The dossier's `record`, under its own rules: the regulator's
           classification leads, the company's framing sits beside it, the checks
           that came back clean are here too, and a law firm advertising for
           claimants is labelled as that and not as a case. */
        type: 'table',
        caption: 'The public record',
        columns: ['Record', 'Finding', 'What it is'],
        rows: [
          ['FDA recall, Class I', 'F-0214-2022', 'Organic Infants Liquid Probiotic, 25,673 units, for Pseudomonas aeruginosa. Initiated October 2021, terminated February 2022. Class I is the FDA’s most serious tier and the classification is the FDA’s; the company’s own notice is headed “Out of an Abundance of Caution”.'],
          ['FDA warning letters', 'None', 'Checked across the FDA’s published set for 2017 to 8 September 2026. No second recall either.'],
          ['California Prop 65 notices', 'None', 'No 60-day notice names the company; the search was validated against terms that do return results.'],
          ['Lead disclosed, highest lot', '33 ppb', 'Consumer Reports found MaryRuth’s among the few brands publishing lot-level heavy-metal results at all, and its highest disclosed lead figure the highest of those reviewed. A disclosure finding, not a contamination ranking.'],
          ['Subscription-billing investigations', '2 open', 'A plaintiffs’ firm inviting customers to get in touch, April and May 2026 — not a filed case, not a regulator and not a finding against anyone.'],
          ['Lawsuits', 'None open', 'A 2022 trademark suit with the company as defendant and a 2025 website-accessibility suit, both terminated; a 2024 state false-advertising class action over a kids’ focus product, voluntarily dismissed without prejudice. None concerned product safety.'],
          ['Better Business Bureau', 'F', 'Not accredited, driven by failure to respond to 10 of 12 complaints rather than by the complaints’ merit.'],
          ['Trustpilot', '2.6 / 5', 'On only 25 reviews — too thin to set against 39,143 Amazon ratings at 4.5, and shown beside them rather than instead.'],
        ],
        note: 'Read 9 September 2026 from the regulators’ and courts’ own records and the sources named for each.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the buy-box seller on the brand’s best-selling products and from the public records above.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business, and this is not a price for the company. It is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve modelled profit on the Amazon listings alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Retail and their own store are excluded, and on Forbes’ estimate they are most of the company. Marketplace concentration is unscored too: no Amazon marketplace outside the US was read, so it is left out rather than guessed. And the profit being multiplied is a ceiling twice over — other sellers’ sales on the same listings, and a cost model with returns, overhead and freight at zero. Confidence on this profile is low.',
      },
      {
        type: 'prose',
        text:
          'The positives are durability and depth: twelve years of listings, a seller record at 99% over tens of thousands of ratings, reviews in the top band and revenue spread across the year rather than piled into one season. The model has no factor for what most weakens the figure — the reseller share of the listings — so the multiple is only as good as the profit under it.',
      },
      {
        type: 'prose',
        text:
          'Four answers are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple: a liquid, organic formulation is a real change of form, but a supplement is also something a contract manufacturer can approximate. The rating of 4.5 sits exactly on a band boundary. Brand Registry is firmer — Amazon gates the brand store behind enrolment. All of these are the first things to put to the owner.',
      },
    ],
  },

  'virora-mahjong': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-virora-mahjong-headline.ts, from
       waithowmuch-research research/virora-mahjong/headline.json — and the
       page reads them from the row alone. */
    headline: {
      /* The best seller, and more than half of the snapshot month by itself. */
      image: {
        src: viroraPhoto('B0H793VVWP'),
        alt: 'The Rose Pink 160-tile American mahjong set laid out in rows — dots, bams, craks, flowers, winds and butterfly jokers in pink and green on white tiles. Virora’s best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation`, deliberately. The series is ten months (December 2025
       to September 2026), so there is no trailing twelve to multiply, and the
       page would render an empty section. Add it — with inputs, and
       peakMonthSharePct from score-valuation.mjs — once twelve profit months
       exist, which will include the brand's first Christmas. */

    facts: [
      { label: 'SKUs', value: '53', note: '21 in the storefront seller’s own list; 8 badged in September', info: 'skus' },
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Tile Games',
        note: 'Best seller #21,842 in Toys & Games',
        info: 'category',
        wide: true,
      },
      /* The best seller's own listing — it is 54% of the snapshot month, so it
         can stand for the catalogue the way Spite House's hero did. */
      { label: 'Product reviews', value: '80', note: 'On the best-selling listing', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Best-selling listing', info: 'rating' },
      { label: 'Seller feedback', value: '95%', note: 'Storefront seller, over 22 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Own brand and trademark; the factory is unnamed', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* Sets carry the money and mats are the add-on sold to the same buyer.
         Not "Trend / seasonal churn": the relisting churn is the same set under
         new ASINs, not a catalogue retired and replaced. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'Sets are 74% of September; mats sold alongside', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* Not placed. A 4-layer acrylic set that Alibaba lists in volume argues
         for a low level; their own "hand-painted" claim argues higher and is
         unchecked. A "?" is the honest state until someone looks. */
      { label: 'Differentiation', value: '?', note: 'Not placed yet', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it. Every figure on this profile is Amazon US — counted across all three seller accounts that sell the brand’s listings, not the storefront seller alone.',
      },
      'amazon-international': {
        status: 'unchecked',
        note:
          'The storefront seller has an Amazon Canada account with no ratings, and no Canadian listing was read. It has no account on Amazon UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'viroramahjong.com, on Shopify: 30 products, the oldest record from 12 February 2026. Sets at $229, as on Amazon, and Christmas sets on pre-order at $299 — which Amazon does not carry. Shopify publishes no sales.',
      },
      'tiktok-shop': {
        status: 'unchecked',
        note: 'Their site links a TikTok account. Whether it runs a shop was not checked.',
      },
      // other-marketplace, wholesale-out and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'From the seller record, and Amazon charges an FBA fee on each listing read: $8.97 on a set and $11.29 on a mat, which is rolled and ships oversize.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 53 listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the brand’s listings.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand name, on listings under a trademark the storefront seller’s LLC owns — the trademark read second-hand, from a search index.',
      },
      /* 🚨 Unchecked, not yes. "Handcrafted by experienced artisans" is their
         own marketing, and a 4-layer acrylic set is listed in volume by
         Alibaba factories. A self-report does not answer this. */
      handmade: {
        status: 'unchecked',
        note:
          'Their marketing says the sets are shaped and painted by hand. Nobody has checked it, and near-identical 4-layer acrylic sets are listed in volume by factories.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Two of the three seller accounts are e-commerce companies in Xuzhou, China. Whether any of them owns the factory is not known.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/ViroraMahjong, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Virora Mahjong sells 160-tile acrylic American mahjong sets and rubber table mats, almost entirely on Amazon. The brand is ten months old there, and three different seller accounts sell its listings.',

    blocks: [
      { type: 'heading', text: 'One set, listed many times' },
      {
        type: 'prose',
        text:
          'Fifty-three Amazon listings carry the brand. Most are 160-tile, 4-layer acrylic American sets in Rose Pink, Purple, Green and Pink, with racks, dice and a tile bag in a gift box. Beside them sit mini sets for children, 3mm rubber table mats in a run of floral colourways, and — in the same storefront — three Pumiboo Christian sound books for toddlers.',
      },
      {
        type: 'prose',
        text:
          'The same set is often listed several times over. The Rose Pink set exists as at least five ASINs, and Amazon’s sold badge moves from one to the next within weeks. Two of the three accounts that sell the listings are e-commerce companies in Xuzhou, China, and one of them trades under the brand’s own name.',
      },
      /* 🚨 No figures in the caption. The brand's own secondary listing images
         from the best seller, in our bucket — the hero already shows the set. */
      {
        type: 'images',
        items: [
          {
            src: viroraPhoto('rack-and-mat'),
            alt: 'Listing image: layered pink, white and green mahjong tiles standing on clear acrylic racks over one of the brand’s pink-and-green floral mats',
          },
          {
            src: viroraPhoto('hand-painting'),
            alt: 'Listing image: a hand painting a tile with a fine brush beside rows of finished tiles, captioned “A Rare Traditional Craft, Mastered by Few and Made to Last”',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the set on its racks over one of their mats, and the hand-painting their marketing leans on — their own claim, and not one anybody has checked.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A Washington LLC, a trademark, a toddler’s sound book — and then, in eight months, a mahjong line that went from a first badge to its biggest month, sold through three accounts.',
      },
      {
        /* Oldest first. The LLC formation and trademark dates were read
           through a search index because both pages blocked the fetch, and
           each says so. Month-end revenue events sit on the last day of the
           month so the dot lands on the chart's point. */
        type: 'timeline',
        items: [
          {
            when: '4 Jun 2024',
            tag: 'Brand',
            what: 'Pacific Edge Innovations LLC is formed in Washington',
            detail:
              'The LLC behind the Amazon storefront. Read second-hand: the state-filing page was blocked, and the date comes from a search index’s copy of it.',
          },
          {
            when: '10 Sep 2025',
            tag: 'Brand',
            what: 'The VIRORA MAHJONG trademark is filed',
            detail: 'In the LLC’s name, by a search index’s copy of the record — also second-hand.',
          },
          {
            when: '20 Oct 2025',
            tag: 'Amazon',
            what: 'The catalogue’s first listing is a sound book',
            detail: 'A Pumiboo Christian sound book for toddlers. Three of them still sit in the storefront beside the mahjong line.',
          },
          {
            when: '11 Nov 2025',
            tag: 'Amazon',
            what: 'The first mahjong listing: a pink 160-tile set',
            detail:
              'First seen at $199. Over the last 90 days the account leading its buy box is Xuzhou Yuesu, not the storefront seller.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$27,135 — the first month with a sold badge',
            detail: 'One set listing at 100+ and the Pumiboo books. The chart starts here.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '$19,900 — the lowest month on the chart',
            detail: 'Two set listings at 50+ each, and nothing else badged.',
          },
          {
            when: '11 Feb 2026',
            tag: 'Brand',
            what: 'A YouTube channel opens',
            detail: 'Four videos reviewing their own sets, and nine subscribers when it was read.',
          },
          {
            when: '12 Feb 2026',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
            detail: 'viroramahjong.com now carries 30 products, with sets at the same $229 as on Amazon.',
          },
          {
            when: '8 Apr 2026',
            tag: 'Amazon',
            what: 'A second account called “Virora Mahjong” appears',
            detail:
              'Xuzhou Yuesu E-commerce Co., Ltd., first tracked by Keepa on this day. It now leads the buy box on 19 of the 32 brand listings outside the storefront.',
          },
          {
            when: '21 Apr 2026',
            tag: 'Brand',
            what: 'The trademark is registered',
            detail: 'Owner Pacific Edge Innovations LLC — read second-hand, and worth checking on the USPTO’s own system.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: '$158,142 — June more than doubles May',
            detail: 'Mats show up in the badge history for the first time. Most of the month sits on listings the Xuzhou account leads.',
          },
          {
            when: '30 Jul 2026',
            tag: 'Amazon',
            what: 'Today’s best seller goes up',
            detail: 'The Rose Pink set at $229, with the storefront seller holding its buy box outright.',
          },
          {
            when: '31 Jul 2026',
            tag: 'Amazon',
            what: '$213,050 — July',
            detail: 'An older Rose Pink listing carries 500+ at month end. It loses its badge on 18 August.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$302,245 — the biggest month so far',
            detail:
              'Eleven times December, and split almost evenly: $152,950 on the storefront seller’s listings and $149,295 on listings mostly held by Xuzhou Yuesu.',
          },
          {
            when: '8 Sep 2026',
            tag: 'Amazon',
            what: 'Six new listings in a day',
            detail: 'Among them four mats in new colourways. The relisting has not slowed.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Web',
            what: 'Christmas sets on pre-order at $299',
            detail:
              'Read on their own store this day; when pre-orders opened is not recorded. The refund policy already stretches returns for deliveries from 15 November to 25 December.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Amazon’s badge history for this brand starts in December 2025, its first month with a sold badge, so the chart holds ten months and no Christmas. Spring sat between $65,000 and $81,000 a month; June doubled it, and August came to $302,245, eleven times December. The last point is the live badge on 15 September — a trailing thirty days, not a calendar month — and it is lower mostly because listings the Xuzhou account holds lost their badges while the storefront seller’s held theirs. Of each month a little under half is kept, at September’s cost rates, and on a set cost nobody has quoted.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup only: the account exists
           with no ratings, and no Canadian listing was read (Keepa tokens ran
           out). The note says so rather than letting 0% read as measured. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US. The storefront seller has a Canadian account, but nothing there was read.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings; listings not examined' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further, so a small Canadian trade would not show here.',
      },
      {
        /* See virora-mahjong.breakdown.mjs. The rows sum to the 2026-09
           revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'Four set listings at $229 and four mats at $45 or less. The best seller, a Rose Pink set listed at the end of July, is more than half of the month on its own, and mats outsell sets nearly two to one by units.',
        items: VIRORA_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the price in effect, so every row is a floor. The purple set has no buy box today and is counted at the $229 set price. Two rows are listings another seller account leads; they are in because the series counts the brand, not one seller. The other 45 listings carry no badge and count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The series counts every listing carrying the brand, whichever of three seller accounts holds it — the storefront seller’s listings alone read nothing at all for May and June. Ten months is not a trailing twelve, so this profile carries no valuation yet.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Two channels are visible — Amazon and their own store — and on Amazon the brand is sold by three seller accounts rather than one.',
      },
      {
        type: 'prose',
        text:
          'The channels agree on price. A set is $229 on Amazon and $229 on viroramahjong.com, and a mat is $45 on both. The store also sells what Amazon does not: bags, a rack-and-pusher set and, when it was read, Christmas sets on pre-order at $299. It has no About page, and Shopify publishes no sales.',
      },
      {
        type: 'prose',
        text:
          'On Amazon the storefront seller holds the buy box on its own best sellers, 100% of the time on the top set. The listings outside its storefront are a different picture: an account in Xuzhou leads the buy box on most of them. What follows is presence rather than share, and a method nobody looked for is listed as unchecked.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'A little under half of a $110 average sale is left — and the line that decides it, what a set costs to make, is the one nobody has quoted.',
      },
      {
        type: 'prose',
        text:
          'Two products carry the costs. A set sells for $229 and a mat for $45, and in September the brand sold 550 sets and 1,000 mats. The set cost comes from Alibaba search results for the same 4-layer, 160-tile acrylic set; the product pages returned a CAPTCHA, so no price tier was ever read. The mat cost comes from a search result in the same way. Every $10 on the set cost moves September’s profit by about $6,600.',
      },
      {
        type: 'table',
        caption: 'COGS — what a set and a mat cost to make and land',
        columns: ['Line', 'What was read', 'MOQ', 'Tier', 'Unit cost'],
        rows: [
          ['160-tile 4-layer acrylic set', 'An Alibaba listing, from its search snippet — the page is behind a CAPTCHA', '1 set', 'Search snippet', '$69–129'],
          ['Custom acrylic mahjong sets', 'Alibaba search results', '50 sets', 'Search snippet', '$18–70'],
          ['Set cost used below', 'Inside the volume range — not a quote', '—', 'Derived, weak', '$45 / set'],
          ['3mm rubber mahjong mat', 'An Alibaba listing, from its search snippet — the page is behind a CAPTCHA', '1 mat', 'Derived, weak', '$8.18 / mat'],
          ['Tariff', '7.5% Section 301 List 4A plus a 12.5% China tier, from a secondary summary; China origin assumed', '—', 'Derived', '20% of unit cost'],
          ['Freight and inbound — a placeholder, not a quote', 'Ocean freight alone is about $0.30 a set on the FBX01 index', '—', 'ASSUMED', '$1.50 / unit'],
          ['Mini sets and sound books', 'No basis at all; neither sold in September', '—', 'ASSUMED', '$30 / $4'],
        ],
        note:
          'Search snippets price the category, not this brand’s supplier. The $45 sits inside the volume range and is our choice, and the freight line is ours too — the two things to replace with a real quote first.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 46% — and
           the backend seed builds the profit and ad-spend series from the SAME
           six numbers (COST_LINES). Change one, change both.
           🚨 Whole percents on purpose: they are September's pnl.json rates
           rounded (19.3, 3.86, 1.36, 9.51, 15, 5), and one-decimal rounding
           would sum to 54.1% and move the headline's $78.5k to $78.3k. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 110.1 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -19,
            emphasis: true,
            detail:
              '$45 a set and $8.18 a mat, on September’s 550 sets and 1,000 mats: 19.3% of revenue. Both from Alibaba search snippets — derived, and weak.',
          },
          {
            label: 'Tariff',
            pct: -4,
            detail: '20% of unit cost, from a secondary summary of the Section 301 rates, assuming China origin. 3.9% of revenue.',
          },
          {
            label: 'Freight and inbound',
            pct: -1,
            detail: 'ASSUMED: $1.50 a unit. Only about $0.30 of it derives from the ocean-freight index; the rest is a placeholder. 1.4% of revenue.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
          },
          {
            label: 'FBA fulfilment',
            pct: -10,
            detail:
              'Measured per listing: $8.97 on a set and $11.29 on a mat, which is rolled to 876 mm and ships oversize. 9.5% of revenue.',
          },
          {
            label: 'Advertising',
            pct: -5,
            detail:
              'ASSUMED: a 5% placeholder. No sponsored placement of theirs was seen on four searches, which argues for less — but one read cannot rule out other ad types.',
          },
        ],
        note:
          'The rates are September’s mix, rounded to whole percents, and every month on the chart carries them — months that sold more sets, mini sets or books would come out differently at their own mix. Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit.',
      },
      {
        type: 'prose',
        text:
          'The shape is the reverse of a cheap product’s. On a $229 set Amazon’s fulfilment fee is under 4% of the price and the factory is the cost; on a $45 mat the fee is a quarter of the price. So the mix matters: a month heavy on mats keeps less of each dollar than a month heavy on sets.',
      },
      {
        type: 'callout',
        text:
          'The set cost is the weakest figure on this profile and the one that moves it most. It stands in for a quote nobody has read, with advertising and freight as placeholders beside it — the first three numbers to replace.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Eleven times in eight months, with almost no audience off Amazon — whatever grew this brand, the public record did not catch it.',
      },
      {
        type: 'prose',
        text:
          'The climb came in two steps. December to May was a small business finding its level; June doubled it and August added half again. Both steps sit on a handful of badged listings, and in June and July most of the volume was on listings the Xuzhou account holds — so the growth belongs to the brand, and whose account booked it moved from one month to the next.',
      },
      {
        type: 'prose',
        text:
          'Relisting is how the catalogue grows, and it blurs the record. The Rose Pink set exists as at least five ASINs. One carried a 400–500 badge in late July and lost it on 18 August; another picked up 400–500 in September; six new ASINs went up on 8 September. A month-end read misses whatever moved mid-month, so each month here is more of a floor than a badge series usually is.',
      },
      {
        type: 'prose',
        text:
          'Sets are $229 now. Set listings were read at $169–209 before July, but those were different ASINs and several of the older prices are fallbacks, so the record shows newer listings at $229 more clearly than it shows the same set being repriced.',
      },
      {
        type: 'prose',
        text:
          'The first Christmas is ahead of the series, and they are preparing for it: Christmas sets on pre-order on their own store, and a refund policy that already extends returns across the holiday.',
      },
      {
        type: 'callout',
        text:
          'What the record cannot say is where the buyers come from. No bought placement was seen on Amazon, and the social accounts are close to empty — which leaves organic search, off-Amazon spend nobody read, or something else entirely.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'One read on one day, and the finding is an absence — including on their own brand name, where competitors bought every sponsored slot.',
      },
      {
        type: 'prose',
        text:
          'On “virora mahjong” all twelve sponsored results were other American mahjong sets and a mat, and nothing of theirs defended the term — while Virora’s own listings held organic #1 and 17 of the 60 results. On three generic searches they ranked organically between #9 and #41 and bought nothing. A logged-out read cannot see Sponsored Brands or Display elsewhere on the page, dayparting, or TikTok and influencer spend, and it says nothing about earlier months.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: '≈ 5% of revenue — assumed',
            counted: '0 of 48 sponsored slots on four searches — read 15 Sep 2026',
            flag: true,
            note:
              'The figure is a placeholder, and the same 5% the margin takes off. The count is the measured part, and it argues for less than 5%, not more. Nobody publishes the bill.',
          },
          {
            label: 'Meta, TikTok and Google',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        type: 'table',
        caption: 'Four Amazon searches, 15 September 2026',
        columns: ['Search', 'Sponsored slots', 'Theirs', 'Their organic positions'],
        rows: [
          ['american mahjong set', '12', '0', '#31'],
          ['mahjong mat', '12', '0', '#28, #41'],
          ['mahjong tiles', '12', '0', '#9, #24'],
          ['virora mahjong', '12', '0 — all 12 are competitors', '#1, and 16 more of 60'],
        ],
        note:
          'Headless Chrome, logged out, US, one read per term, matched against all 53 brand listings. Amazon localises and rotates its results, so this is a reading on a day, not a rank that holds.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'A Shopify store and three social accounts their site links to — one with nine subscribers, two whose counts could not be read.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Off Amazon there is little to measure. The YouTube channel opened in February 2026 and holds four videos of their own sets. Instagram and TikTok showed no follower count to a logged-out reader, so their size is unknown rather than small. Visits to the store were not measured, and there is no keyword data for it.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Shopify products', value: '30', note: 'Oldest record 12 Feb 2026' },
          { label: 'YouTube', value: '9 subscribers', note: '4 videos, joined 11 Feb 2026' },
          { label: 'Instagram and TikTok', value: 'Unread', note: 'No count shown logged out' },
          { label: 'Store visits', value: 'Not measured' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — viroramahjong.com',
            href: 'https://www.viroramahjong.com/',
            value: '30 products',
            flag: true,
            note:
              'Shopify, with sets at $229 as on Amazon, mats at $45, bags at $59 and Christmas sets on pre-order at $299. No About page. Its footer links the three accounts below and a Facebook profile.',
          },
          {
            label: 'Instagram — @viroramahjongofficial',
            href: 'https://www.instagram.com/viroramahjongofficial/',
            value: 'Count unread',
            note: 'A post seen in search results calls it “the official home of Virora Mahjong”. The follower count did not show logged out.',
          },
          {
            label: 'TikTok — @viroramahjong',
            href: 'https://www.tiktok.com/@viroramahjong',
            value: 'Count unread',
            note: 'Linked from their store. The follower count did not show logged out, and whether it runs a TikTok Shop was not checked.',
          },
          {
            label: 'YouTube — @ViroraMahjong',
            href: 'https://www.youtube.com/@ViroraMahjong/about',
            value: '9 subscribers · 4 videos',
            note: 'Joined 11 February 2026. Reviews of their own tile sets.',
          },
        ],
      },
      {
        /* Best-seller rank off the listing via Keepa, not keyword positions —
           those are under Advertising, where the read is dated to one search. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Toys & Games', 'Subcategory', 'Rating'],
        rows: [
          ['Rose Pink 160-tile set', '#21,842', '#178 · Tile Games', '4.6★ over 80 reviews'],
          ['Pink and green rubber mat', '#15,463', '#24 · Game Mats & Boards', '4.9★ over 56 reviews'],
          ['Orange rubber mat', '#16,721', '#29 · Game Mats & Boards', '4.7★ over 71 reviews'],
          ['Green 160-tile set', '#31,653', '#256 · Tile Games', '4.8★ over 41 reviews'],
        ],
        note:
          'Read through Keepa on 15 September 2026. Rank moves daily. Variations share a parent listing, so a colour can carry its siblings’ rank and reviews.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Pacific Edge Innovations LLC', note: 'A Washington LLC' },
          { label: 'Seller', value: 'Virora Mahjong Official', note: 'Merchant A3UF1IAE6RV84W' },
          { label: 'Registered address', value: 'Spokane, WA, US', note: '100 N Howard St #7045, 99201 — a suite number' },
          { label: 'LLC formed', value: '4 Jun 2024', note: 'Read second-hand, from a search index' },
          { label: 'Trademark', value: 'VIRORA MAHJONG', note: 'Registered 21 Apr 2026 — read second-hand' },
          { label: 'Seller feedback', value: '95%', note: 'Over 22 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '20 Oct 2025', note: 'First mahjong listing 11 Nov 2025' },
          { label: 'Also selling the brand', value: 'Two accounts in Xuzhou, China', note: 'Xuzhou Yuesu E-commerce · Pacikwest USA' },
        ],
      },
      {
        type: 'prose',
        text:
          'The storefront seller is a Washington LLC with a Spokane suite address and a young account: 22 seller ratings. Its state filing and its trademark could not be opened — both pages blocked the fetch — so the formation date, a principal address in Lynnwood, Washington, and the trademark’s registration were read from a search engine’s copy of those pages. They are second-hand until someone reads the originals.',
      },
      {
        /* 🚨 The relationship between the three accounts is an INFERENCE and
           must stay worded as one. Shared brand name, shared listings and a
           shared county are circumstantial; nothing read ties them by
           ownership. Do not tighten this into a finding. */
        type: 'prose',
        text:
          'Two more Amazon accounts sell the brand’s listings, and both are e-commerce companies in Feng County, Xuzhou, Jiangsu, at the same postcode. Xuzhou Yuesu E-commerce Co., Ltd. trades as “Virora Mahjong” itself and leads the buy box on 19 of the 32 brand listings outside the storefront. Pacikwest USA, whose registered business name is run-together pinyin for Xuzhou Maixi E-commerce, turns up in earlier buy-box history. The shared name, shared listings and shared county read like one group selling through a US company — but that is an inference, not an established fact, and this profile’s decision to count all three accounts’ revenue as one brand’s rests on the same inference.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the seller record behind the brand’s Amazon storefront and from the buy-box history of the brand’s other listings.',
      },
    ],
  },

  'kajun-loaded-tea': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-kajun-loaded-tea-headline.ts, from
       waithowmuch-research research/kajun-loaded-tea/headline.json (reviewed
       2026-09-15) — and the page reads them from the row alone. */
    headline: {
      /* The best seller, the Louisiana Legends 10-pack — though at 6.8% of the
         month it leads by very little, which is the point of the subtitle. */
      image: {
        src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/358a9367e37488e32c0f96083281b194a9d0fdcb2b1be5b6e7884b6c355856b5.jpg',
        alt: 'The Kajun Loaded Tea variety 10-pack: ten cartoon-gator flavour packets — Crawdaddy Candy, Jazz Berry Jam, Fat Tuesday, Rougarou Rush and others — lined up in front of a gator-print mailer, between a purple and a red iced drink. The best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation` and no Valuation section, on purpose. The badge series
       is nine months (Jan–Sep 2026); the model multiplies trailing-twelve net
       profit and valuation/inputs.mjs refuses to annualise fewer months. Add
       `valuation.inputs` once twelve profit months exist — not before. */

    facts: [
      { label: 'SKUs', value: '44', note: '43 priced, 43 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Grocery & Gourmet Food › Beverages › Bottled Beverages, Water & Drink Mixes › Powdered Drink Mixes & Flavorings › Soft Drink Mixes',
        note: '40 of the 44 listings; best rank #7,268 in Grocery & Gourmet Food',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-20 figures, not one hero's, so NO `info` key: the shared ⓘ copy
         describes a single best-selling listing, and here that listing is 6.8%
         of revenue with 30 reviews. */
      { label: 'Product reviews', value: '3,439', note: 'Across the top 20 listings — a floor' },
      { label: 'Product rating', value: '4.45★', note: 'Review-weighted, top 20 listings' },
      { label: 'Seller feedback', value: '94%', note: 'Over 141 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Who makes the packets is not known', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* An INFERENCE, placed by us: one product type — a box of five packets —
         in every flavour, holding 34 of 48 organic results on its own category
         search. The case against is that "loaded tea" is a narrow term and a
         rival outspends them on it. Differentiation is left out rather than
         guessed: nothing scores it on this profile, and the formula is unknown. */
      { label: 'Catalogue', value: 'Category dominance', note: 'One box in 40 flavours — inferred', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store; TikTok Shop and Etsy unsized', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it. Every figure on this profile — the chart, the breakdown, the margin — is Amazon US and nothing else.',
      },
      'amazon-international': {
        status: 'no',
        note:
          'The seller id does not exist on Amazon UK, Germany or Canada. Other Amazon marketplaces were not looked up.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'kajunloadedtea.com, on Shopify, read directly: 69 products, singles at $3.19 and five-packs at $15.95 — the Amazon price. It came before Amazon, and Shopify publishes no sales, so the channel that may be the older and larger one is unsized.',
      },
      /* 🚨 unchecked, NOT yes and NOT no. A TikTok Shop and an Etsy shop under
         the brand name exist in search results, but both pages refused a
         direct read (404 / 403), so neither was opened, let alone sized. */
      'tiktok-shop': {
        status: 'unchecked',
        note:
          'A store page appears in a search engine’s index with 38.3K followers and 272.4K items sold over its life; a direct fetch returned 404. Probably live and possibly large — but not read, and not sized.',
      },
      'other-marketplace': {
        status: 'unchecked',
        note: 'An Etsy shop under the brand name appears in search results; the page returned 403 and nothing on it was read.',
      },
      'wholesale-out': {
        status: 'no',
        note:
          'Not yet: their wholesale page reads “Coming Soon”, with an email sign-up and a login at wholesale.kajunloadedtea.com but no terms. One to re-check.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the 44 storefront listings, nor any of the 65 other listings under the brand name.',
      },
      // licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record, with a per-listing FBA fee on every box — the largest line in the cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the listings between FBA and FBM. Their own store ships from a “facility” of its own, by its About page.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand, flavour names and packet art, on listings where they hold 100% of the buy box.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Where the packets are filled is not known. The cost model prices them from Chinese OEM sachet quotes, which says nothing about who actually makes them.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/KajunLoadedTea, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Kajun Loaded Tea sells sugar-free energy-tea powder from Denham Springs, Louisiana, in packets named for the state — Crawdaddy Candy, Fat Tuesday, Rougarou Rush. It sold through its own store before it came to Amazon, where the catalogue is one box of five packets in 40 flavours.',

    blocks: [
      { type: 'heading', text: 'One box, forty flavours' },
      /* Dated readings only — prices and counts as read on 2026-09-15. No live
         headline figure is typed in. */
      {
        type: 'prose',
        text:
          'Almost every listing is the same object: a box of five single-serve powder packets, each made up into a large iced drink with caffeine from green tea and guarana and no sugar. Forty single-flavour boxes sell at $15.95, beside a Crew Favorites variety 5-pack at the same price, a Louisiana Legends 10-pack at $31.90 and a caffeine-free 6-pack at $19.14.',
      },
      {
        type: 'prose',
        text:
          'The names do the selling. Voodoo Queen, Gumbo Yaya, Atchafalaya Apple, Fais do-do — each flavour is a blend of two to five candy and fruit notes with a Louisiana name and its own cartoon gator on the packet, and the range is organised by flavour rather than by what the drink does. Every Amazon box carries the same caffeine; the one exception is the caffeine-free UNLoaded variety pack listed in August 2026.',
      },
      {
        type: 'prose',
        text:
          'Buyers rate them well rather than exceptionally. The twenty best-selling listings run from 4.2 to 4.8 stars, with 3,439 reviews between them at a review-weighted 4.45, and the seller account holds 94% positive feedback over 141 ratings — a young account by count.',
      },
      /* The brand's own images from its Shopify store, not listing thumbnails —
         the breakdown already shows every box. In our bucket, not hotlinked. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/b2ae883b58c90f99aef717bf121452f2b51c40b51c9307dc4666220b194d040a.jpg',
            alt: 'Kajun’s own product image for Crawdaddy Candy: a red iced drink in a clear cup beside its packet, which shows a cartoon crawfish-gator in a top hat, over copy about zero calories, zero sugar and caffeine from green tea and guarana',
          },
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/7c6809d904136ee4f6b7f326bd6c7555dcfb6cfaaf9adaa240e08908512a665a.jpg',
            alt: 'Kajun’s own “What’s in a Kajun Loaded Tea?” image: a blue drink in a glass jar beside a tie-dyed packet with the Mardi Gras heart logo, listing a green tea base, caffeine and vitamins',
          },
        ],
        caption: 'Two of the brand’s own product images, from its Shopify store: a packet beside the drink it makes, and what goes into one.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A brand with its own domain since 2023 and its own store before Amazon — then nine months of badge history in which Amazon revenue rose every month.',
      },
      {
        /* Oldest first. 🚨 The trademark dates (first use 2023-02-28, filed
           2025-08-07, registered 2026-02-24) are NOT dots: they were read from a
           search engine's index of a page that returned 403, and the dossier
           says to check TSDR before quoting any of them. */
        type: 'timeline',
        items: [
          {
            when: '23 Mar 2023',
            tag: 'Web',
            what: 'kajunloadedtea.com registered',
            detail:
              'From the domain record. The trademark claims use in commerce from a month earlier, but that date is a reading of a search index and has not been checked against the USPTO’s own record.',
          },
          {
            when: '22 Apr 2025',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store: Crawdaddy Candy',
            detail:
              'Most of the core flavours follow on 29 April, at $3.19 a packet and $15.95 a five-pack — the price Amazon carries now. Shopify publishes no sales, so what the store sold before Amazon is not known.',
          },
          {
            when: '2 Oct 2025',
            tag: 'Amazon',
            what: 'The first Amazon listings go up',
            detail:
              '38 of today’s 44 storefront listings were listed in October 2025 and four more in November: one catalogue launched at once, not a stream of launches.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '$6,380 — the first month with a badge',
            detail:
              'Only three listings had crossed Amazon’s threshold of roughly 50 sales a month; the rest count as zero. October to December are unmeasured, not empty, so this is a starting point for the data rather than for the business.',
          },
          {
            when: '28 Feb 2026',
            tag: 'Amazon',
            what: 'February: $94,105, with 22 listings badged',
            detail:
              'The steepest step on the chart. Much of it is listings crossing the badge threshold — partly the business, partly the method.',
          },
          {
            when: '8 Apr 2026',
            tag: 'Amazon',
            what: 'Sour Swamp Pop reaches 1,000 a month',
            detail:
              'Since July its badge has flipped between 1,000 and 2,000 more than a dozen times. This page counts it, and twelve other listings, at 1,000.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: 'June: $376,420, up 55% on May',
            detail:
              '40 listings badged, the same as May — so this rise is the same listings selling more, not more listings being counted.',
          },
          {
            when: '24 Jul 2026',
            tag: 'Amazon',
            what: 'The Louisiana Legends variety 10-pack is listed',
            detail: 'At $31.90, twice the single box. By September it is the best-selling listing in the catalogue.',
          },
          {
            when: '4 Aug 2026',
            tag: 'Amazon',
            what: 'A caffeine-free UNLoaded variety 6-pack',
            detail:
              'The first Amazon listing outside the caffeinated format. The UNLoaded flavours were already on their own store, where the product records date from February 2026.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: 'August: $464,145',
            detail: '41 listings badged. The climb flattens here: the live September reading is only just above it.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        /* 🚨 "About half the month is capped" is load-bearing: 13 listings,
           47.5% of September, show the 1,000 badge, which is the bottom of a
           bracket. Keep it wherever revenue is explained. */
        type: 'prose',
        text:
          'The series is Amazon’s own “bought in past month” badge on every listing, read at each month end since January 2026 and priced at the September buy box — nine months, because no listing sold enough to carry a badge before then. It is a floor twice over. A listing under about 50 sales a month counts as zero, and about half of the latest month sits on thirteen listings showing 1,000, which is the bottom of a bracket rather than a count; six of them have shown 2,000 at points since July. Of what it sells, a little over a third is kept once Amazon’s fees, the packets and modelled advertising come off — before returns, storage and overhead, and on two costs nobody has quoted.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record looked up on each marketplace
           (2026-09-15). UK, DE and CA stay in at 0% because "looked and found no
           account" is the finding. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. The same seller id does not exist on Amazon UK, Germany or Canada.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon UK, Germany and Canada', short: 'UK, DE, CA', share: 0, note: 'No seller account on any of the three' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Other Amazon marketplaces were not looked up.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The 43
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing is 7% of the month. The ten best sellers are 37% of revenue and the top twenty about two thirds — and 40 of the 43 rows are the same $15.95 box in a different flavour.',
        items: KAJUN_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, which is a band — hence n+ — and 13 rows sit on 1,000, the bottom of a bracket that runs to 2,000. Revenue is that band times the 15 September 2026 buy box, so every row is a floor. The 44th storefront listing, a 25-packet variety bundle, has no price and no badge and is not a row.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The floor is the badge: about half the month is capped at 1,000 a listing. The ceiling is the cost model: returns, storage and overhead are zero, and two of its five lines are placeholders. Margin breakdown says which.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is the only channel with a number behind it, and it may not be the biggest. The brand sold through its own store first, and its TikTok Shop and Etsy shop are real but unsized.',
      },
      {
        type: 'prose',
        text:
          'The two channels that could be read agree on price: $15.95 for a box of five on Amazon and on kajunloadedtea.com, where a single packet is $3.19 — exactly what the Amazon box works out to per packet. Nobody else sells on their listings either: this seller holds 100% of the buy box on each of its twenty best sellers, and Amazon itself offers none of the 44.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store, a TikTok Shop or an Etsy shop takes, so this says which methods are in use and not what each is worth. A channel only glimpsed in a search index, or never looked for, is listed as unchecked rather than counted.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $16.56 average sale, down to the little over a third that is left — after Amazon takes more than twice what the box and its packets cost.',
      },
      {
        type: 'prose',
        text:
          'Amazon’s two cuts are the largest part of the stack. Grocery’s referral fee is 15% on a sale above $15.00 and 8% at or below it, and the box sells at $15.95 — 95 cents over the line. FBA charges $3.54 to pick, pack and ship a box of five whatever it sells for. Together they take 37% of the sale.',
      },
      {
        type: 'table',
        caption: 'COGS — what the box costs to make',
        columns: ['Quote', 'Region', 'MOQ', 'Unit cost', 'Per box of five'],
        rows: [
          ['Guangdong Jbyk Pharmaceutical Technology — electrolyte drink-mix sachets', 'Guangdong, CN', '30,000 pieces', '$0.22–0.35 / packet', '$1.10–1.75'],
          ['Shenzhen Lifeworth Biotechnology — energy drink-mix sachets', 'Guangdong, CN', '500 bags', '$0.45–0.50 / packet', '$2.25–2.50'],
          ['Used below — the midpoint of the two ranges', '—', '—', '$0.36 / packet', '$1.80'],
          ['Outer box + inbound freight to FBA — a placeholder, not a quote', '—', '—', '—', '$0.75'],
        ],
        note:
          'These price the category, not Kajun: Chinese OEM quotes for similar sachets, published on Alibaba. Where Kajun’s packets are actually filled is not known, and a US co-packer would cost more. The box-and-freight line is our placeholder; nobody quoted it.',
      },
      {
        /* 🚨 The margin row is 100% less these lines — 36.7% — and the backend
           seed builds the profit and ad-spend series from the SAME five numbers
           (COST_LINES). Change one, change both. Two lines are placeholders and
           must keep saying so. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 16.56 },
        lines: [
          {
            label: 'Packets — powder, sachet, fill',
            key: 'cogs',
            pct: -11.3,
            detail:
              '147,400 packets at $0.36 each — a little over five packets per sale on average, because of the 10-pack. Derived from the published sachet prices above, not a quote to Kajun.',
          },
          {
            label: 'Outer box + inbound freight',
            pct: -4.5,
            detail: '$0.75 a box. A placeholder, not a quote — nobody published a carton or a freight lane for this business.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Grocery & Gourmet rate for a sale above $15.00.',
          },
          {
            label: 'FBA fulfilment',
            pct: -21.6,
            emphasis: true,
            detail:
              '$3.54 per box of five and $4.35 per 10-pack, from Keepa’s per-listing fees. The largest line, and one the price does not move. The 6-pack’s fee was not read and is charged at $3.54.',
          },
          {
            label: 'Advertising',
            pct: -10.9,
            detail:
              'Computed on a placeholder. A Food and Grocery click at $0.80–1.10 converting at 15–17% costs $4.71–7.33 per ad-attributed sale, $6.02 at the midpoint; taking 30% of units as ad-attributed is our placeholder, not a reading. The sponsored footprint under it is measured — see Advertising.',
          },
        ],
        note:
          'Before returns, storage, overhead and owner pay, all set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The shape is the reverse of most physical products. What is inside the box is the smallest real cost, and the largest is getting it to the customer through Amazon — which charges by the box, not by the price, and takes its referral cut at the higher of Grocery’s two rates.',
      },
      {
        type: 'callout',
        text:
          'Two lines here are ours, not theirs: $0.75 a box for the carton and freight, and the 30% of units taken as ad-attributed. Across the ranges the dossier tested, they are the difference between keeping under a third of a sale and over two fifths — and both are the first things to replace with real numbers.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'A brand new to Amazon, not a new brand: the names, the store and the following existed first, and the Amazon catalogue went up in one go and filled in month by month.',
      },
      {
        type: 'prose',
        text:
          'Almost the whole catalogue went up in October and November 2025, and nothing sold enough to carry a badge until January. Then the badges spread — 3 listings in January, 22 in February, 32 in April, 40 by May — and from May the count barely moved while revenue kept climbing. The first half of the chart is listings arriving in the data; the second half is the same listings selling more.',
      },
      {
        type: 'prose',
        text:
          'That is demand that arrived already formed. The brand’s own press pitch calls it women-founded and “well-known on TikTok” with “a strong, community-driven following”, and a search engine’s index of its TikTok Shop shows 38.3K followers and 272.4K items sold over its life. Neither figure was read on the page itself, so they describe a following rather than measure one.',
      },
      {
        type: 'prose',
        text:
          'The newer growth is format, not flavour. The two listings added since launch are bundles — the Louisiana Legends 10-pack in July 2026, now the best seller, and a caffeine-free 6-pack in August — a bigger order on the same packets rather than another name.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot say is how much of this demand Amazon created and how much it only collected. Their own store and their TikTok Shop sell the same boxes, and neither publishes a number.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'They pay to be seen on their own category and still sit below a rival who buys the top of it. The spend is arithmetic; the placements under it were counted.',
      },
      {
        type: 'prose',
        text:
          'On “loaded tea packets” and “loaded tea” Kajun holds 34 and 31 of the 48 organic results on the first page, yet The Loaded Tea Shop takes sponsored positions 1 to 4 and the Sponsored Brands banner on both, and Kajun’s own sponsored cards begin at 12 and 14. They buy all twelve sponsored slots on their own name — and on the wider “energy drink packets sugar free” they appear nowhere, sponsored or organic.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            href: 'https://www.amazon.com/s?k=loaded+tea+packets',
            value: '≈ 10.9% of revenue',
            counted:
              '6 of 12 sponsored slots on “loaded tea packets”, 5 of 12 on “loaded tea”, 12 of 12 on “kajun loaded tea”, 0 of 12 on “energy drink packets sugar free” — read 15 Sep 2026',
            flag: true,
            note:
              'Computed, not observed, and on a placeholder: $6.02 per ad-attributed sale from Food and Grocery benchmarks, times 30% of units — a share nobody published. Nobody publishes the bill.',
          },
          {
            label: 'Amazon Sponsored Brands',
            value: 'None seen',
            counted: 'The banner on both category searches was The Loaded Tea Shop’s — read 15 Sep 2026',
            note: 'One logged-out read of one results page per search. Not seen on the day, which is not proof of none.',
          },
          {
            label: 'Meta, TikTok and Google ads',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read for this profile. Absent here means unexamined, not zero.',
          },
        ],
        note: 'Search results are localised and change by the hour. These are one read each, first page only, with delivery set to Denham Springs (70726).',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Traffic was not measured. What can be shown is where they appear: on Amazon’s search page, where most of their category’s organic results are theirs, and off it, where most figures are readings from a search index.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Their own site links Facebook, Instagram, TikTok, Pinterest, Snapchat and Discord, but only the store itself was read directly. The TikTok and Instagram counts below come from a search engine’s index of pages that refused a direct read, and are labelled so; the chips above carry no follower count for the same reason.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — kajunloadedtea.com',
            href: 'https://kajunloadedtea.com/',
            value: '69 products',
            flag: true,
            note:
              'Shopify, read from the store’s public products.json: 41 base flavours, 13 bundles, 6 caffeine-free, 6 free gifts and 2 “Kajun Kicker” packets. The Shop app rates the store 4.8 over 4.3K reviews. Its wholesale page reads “Coming Soon”. No sales and no visit count were read.',
          },
          {
            label: 'TikTok Shop — KaJun Loaded Tea',
            href: 'https://shop.tiktok.com/us/store/kajun-loaded-tea/7495049602692581527',
            value: '38.3K followers · 272.4K items sold (search-index reading)',
            note:
              'From a search engine’s index of the store page, not the page itself, which returned 404 to a direct fetch. “Items sold” is TikTok’s lifetime counter, not a monthly figure. Possibly a large channel; nothing public sizes it.',
          },
          {
            label: 'Instagram — @kajunloadedtea',
            href: 'https://www.instagram.com/kajunloadedtea/',
            value: '12K followers · 148 posts (search-index reading)',
            note: 'From a search engine’s index of the profile; not opened.',
          },
          {
            label: 'Facebook — Kajun Loaded Tea',
            href: 'https://www.facebook.com/kajunloadedtea/',
            note: 'Located in Denham Springs, matching the seller’s registered address.',
          },
          {
            label: 'Etsy — KaJunLoadedTea',
            href: 'https://www.etsy.com/shop/KaJunLoadedTea',
            note: 'A shop under the brand name appears in search results. The page returned 403 and its sales were not read, and their own site does not link it.',
          },
          {
            /* 🚨 No href, deliberately: ownership unconfirmed. */
            label: 'kajunloaded.shop',
            note:
              'A second store selling caffeine-free “UNLoaded” blends under the same flavour names, with no address, no owner and no link to kajunloadedtea.com. Whether it belongs to KajunTea LLC is not known, so it is not linked here and not counted anywhere.',
          },
        ],
      },
      {
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Grocery & Gourmet Food', 'Subcategory', 'Rating'],
        rows: [
          ['Variety 5-pack — Crew Favorites', '#7,268', '#70 Soft Drink Mixes', '4.3★ over 39 reviews'],
          ['Kajun Cotton Candy', '#8,942', '#93 Soft Drink Mixes', '4.2★ over 286 reviews'],
          ['Crawdaddy Candy', '#9,169', '#94 Soft Drink Mixes', '4.5★ over 396 reviews'],
          ['Variety 10-pack — Louisiana Legends', '#10,129', '#1 Tea Gifts', '4.5★ over 30 reviews'],
          ['Sour Swamp Pop', '#10,479', '#109 Soft Drink Mixes', '4.4★ over 303 reviews'],
        ],
        note:
          'Best-seller rank, read through Keepa on 15 September 2026; it moves daily. The twenty best-selling listings run from #7,268 to #23,366 in the whole Grocery & Gourmet Food department.',
      },
      {
        type: 'table',
        caption: 'Search presence on Amazon',
        columns: ['Search', 'Organic results theirs', 'Sponsored slots theirs', 'Sponsored positions 1–4'],
        rows: [
          ['loaded tea packets', '34 of 48', '6 of 12', 'The Loaded Tea Shop'],
          ['loaded tea', '31 of 48', '5 of 12', 'The Loaded Tea Shop'],
          ['kajun loaded tea', '45 of 48', '12 of 12', 'Kajun'],
          ['energy drink packets sugar free', '0 of 48', '0 of 12', 'Other brands'],
        ],
        note:
          'One logged-out read per search: the first results page of 60 cards, delivery set to 70726, 15 September 2026. Amazon localises results and publishes no search volumes, so this is a snapshot of placement, not a rank history.',
      },
      {
        type: 'callout',
        text:
          'None of this is a visit or a sale. Traffic to their store was not measured and the off-Amazon follower counts were read from an index rather than the platforms, so the size of the business off Amazon is the largest unknown on this profile.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'KajunTea LLC' },
          { label: 'Seller', value: 'Kajun Loaded Tea', note: 'Merchant A3QX48VACMQW7I' },
          { label: 'Registered address', value: 'Denham Springs, LA, US', note: '9072 Lockhart Rd, 70726' },
          { label: 'Seller feedback', value: '94%', note: 'Over 141 ratings', info: 'sellerFeedback' },
          { label: 'First Amazon listing', value: '2 Oct 2025' },
          { label: 'Domain registered', value: '23 Mar 2023', note: 'kajunloadedtea.com' },
          { label: 'Trademark', value: 'KAJUN LOADED TEA', note: 'Reg. 8154318 — read from a search index, not checked on TSDR' },
        ],
      },
      {
        /* 🚨 No founder name. A search summary offers one; no page that was
           opened carries it, so it is not used (dossier README). */
        type: 'prose',
        text:
          'Women-founded, by the brand’s own press pitch, and based in Denham Springs, where both the seller record and the Facebook page place it. No founder is named here: a search summary offers a name, but no page that was opened does. The seller account is the brand’s own — it holds the buy box on every one of its twenty best sellers, and Keepa first tracked it in November 2025, a few weeks after the first listing.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront.',
      },
      /* Valuation omitted: nine profit months, and the model needs twelve. */
    ],
  },

  'wet-noses': {
    /* 🚨 No headline copy here. Title, subtitle and snapshot month live on the
       Business row — backend prisma/seed-wet-noses-headline.ts, from
       waithowmuch-research research/wet-noses/headline.json (reviewed
       2026-09-15). This entry carries only the image beside them. */
    headline: {
      /* The best seller by revenue, and only just: the 5 lb box and its
         two-bag sibling are within a dollar of each other. */
      image: {
        src: wetNosesPhoto('B006M3Y5WS'),
        alt: 'A 5 lb box of Wet Noses Organic Crunchy Peanut Butter & Banana dog treats, with a beagle behind it — the best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation`, and no valuation section. The series is eleven months
       — it starts at November 2025, when Wet Noses' own account took the buy
       box (see the Revenue section and the backend seed) — and the model will
       not price a trailing twelve it does not have. The reseller months before
       it are not this business's revenue, so borrowing them to reach twelve
       would value the wrong thing. Add it back after 2026-10 is in the series. */

    /* 🚨 This profile is the AMAZON CHANNEL of a manufacturer. Every figure is
       Amazon US; the distributor, Petco, co-manufacturing and wet-noses.com are
       real and unsized. Prose that reads the Amazon number as the company's is
       wrong, however natural it sounds. */
    facts: [
      { label: 'SKUs', value: '31', note: '31 priced, 12 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Pet Supplies › Dogs › Treats › Cookies, Biscuits & Snacks',
        note: 'Best seller #6,294 in Pet Supplies, #501 in Cookies, Biscuits & Snacks',
        info: 'category',
        wide: true,
      },
      /* The best seller's own listing, like Spite House's pair — Amazon counts
         reviews per flavour across this parent, so a summed top-20 total would
         count the same reviews two or three times. */
      { label: 'Product reviews', value: '2,161', note: 'On the best-selling listing', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Best-selling listing', info: 'rating' },
      /* 29 ratings is a young ACCOUNT, not a young business — Keepa first saw
         it on 8 November 2025. */
      { label: 'Seller feedback', value: '93%', note: 'Over 29 ratings', info: 'sellerFeedback' },
      /* 🚨 No Sourcing cell. The attribute is one phrase from a fixed list
         (/business-attributes/) and the list has no "own manufacturing" —
         and they are not private label: they bake their own, by their own
         account and the deal press, and their private-label work is for other
         brands. White Mountain took "Private label" as the nearest answer
         because its valuation needed one; with no valuation here, a gap beats
         a wrong phrase. The selling matrix records `manufacturer: yes`. */
      /* Concentrated, not flagship: twelve badged listings, the top one 20% of
         the month — but every one is the same Organic Crunchy treat in three
         pack sizes. A plateau, not a cliff. Placed by us; not scored, since
         there is no valuation. */
      { label: 'Catalogue', value: 'Concentrated bets, few SKUs', note: 'One treat line in three pack sizes', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      // Differentiation left out: not placed, and nothing here scores it.
      { label: 'Channels', value: 'Amazon US, own store, a national pet distributor, Petco, co-manufacturing', info: 'channels', wide: true },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, and every figure on this profile. Their own account has held the buy box since November 2025; before that, resellers did.',
      },
      'amazon-international': {
        status: 'no',
        note: 'The seller id was looked up on Amazon UK, Germany and Canada and does not exist on any of them.',
      },
      'own-store': {
        status: 'yes',
        note:
          'wet-noses.com, on Shopify: 36 products at a median of $12.99, including 20 lb bulk buckets at $119.99. The 14oz bag is $12.99 there and on Amazon. Shopify publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'Probably the larger business. Pet Food Experts has been their exclusive US distributor to independent pet retail since 1 April 2024, Purrks cat treats sell in Petco by the company’s account, and their wholesale page sells 5 lb boxes and 20 lb buckets to retailers at prices given on request. The distributor’s “12,000+ locations” are the stores it serves, not stores stocking Wet Noses. Nothing public sizes any of it.',
      },
      // tiktok-shop, other-marketplace and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record. $4.76 to $8.04 a unit by pack size, and the largest line in the Amazon cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 31 listings between FBA and FBM.',
      },
      /* Unchecked rather than no: Amazon itself won 11% of the buy box on one
         Soft & Chewy listing over 90 days, which is an Amazon offer but does
         not say whether it is a vendor relationship. */
      'vendor-1p': {
        status: 'unchecked',
        note: 'Amazon holds an offer on one storefront listing and on none of the 150 outside it. Whether that is a Vendor Central relationship is not visible from outside.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      manufacturer: {
        status: 'yes',
        flag: true,
        note:
          '“We run our own kitchens and work our own ovens”, in their words, and the 2020 and 2023 deal press describes an 80,000 sq ft SQF Level III certified plant in Monroe, Washington. Not checked independently. The same plant makes private-label and co-manufactured treats for other brands.',
      },
      'private-label': {
        status: 'no',
        note: 'They make their own brand rather than buying it in. Their private-label work runs the other way, for other brands.',
      },
      'wholesale-in': { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/WetNoses, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Wet Noses bakes organic, human-grade dog treats in Monroe, Washington, and has since 1998 by its own account; private equity has controlled it since 2023. This profile is the part of it that sells on Amazon — one channel among several, and the only one with a public number.',

    blocks: [
      { type: 'heading', text: 'A treat maker, seen through one channel' },
      {
        type: 'prose',
        text:
          'On Amazon the brand lists 31 products, and every one that sells enough to carry a badge is the same product: the Organic Crunchy treat, in peanut butter, pumpkin, berry, apple and carrot flavours, sold as a 14oz bag, two bags or a 5 lb box. Newer lines — Soft Baked dog treats and Purrks cat treats — are listed and have yet to show a badge.',
      },
      {
        type: 'prose',
        text:
          'This page describes that channel, not the company. Wet Noses also sells through a national pet distributor, puts its cat treats into Petco, runs its own store and makes treats for other brands from its own plant. None of those publishes a figure, so none of them is in the numbers here — and nothing public says whether Amazon is a large part of the business or a small one.',
      },
      /* 🚨 No figures in the caption. The brand's own site photographs, not
         the listing images — the best seller's box is already the headline
         image, and these show the object inside it. */
      {
        type: 'images',
        items: [
          {
            src: wetNosesPhoto('dogWithBags'),
            alt: 'A black-and-tan puppy eating paw-stamped treats from the floor of a kitchen, beside three 14oz Wet Noses bags: Berry Blast, Pumpkin & Quinoa and Peanut Butter & Molasses',
          },
          {
            src: wetNosesPhoto('stackedTreats'),
            alt: 'A stack of round orange Wet Noses biscuits on a granite counter, the front one stamped with a paw print and “Organic dog treats”, with carrots and berries behind',
          },
        ],
        caption: 'Two of the brand’s own photographs, from wet-noses.com: the crunchy treat in its 14oz bags, and the biscuit itself.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A 1998 brand whose Amazon listings were sold by other people for at least two years, until its own seller account took them over in November 2025.',
      },
      {
        /* Oldest first. Year-only entries are the company’s own claims with no
           day attached; they stay on this list and off the chart. Only the
           events from November 2025 fall inside the chart's series. */
        type: 'timeline',
        items: [
          {
            when: '1998',
            tag: 'Brand',
            what: 'Wet Noses is founded',
            detail: 'By Jasmine Galligan, by the company’s own account. Not checked.',
          },
          {
            when: '24 Aug 2001',
            tag: 'Web',
            what: 'wet-noses.com registered',
            detail: 'From the domain record. The first archived capture of the site follows eleven months later.',
          },
          {
            when: '20 Jul 2002',
            tag: 'Web',
            what: 'The Wayback Machine’s first capture of the site',
          },
          {
            when: '14 Dec 2011',
            tag: 'Amazon',
            what: 'The oldest listing still live: the 5 lb Peanut Butter & Banana box',
            detail: 'Fifteen years on it is the best-selling listing in the catalogue.',
          },
          {
            when: '6 Feb 2020',
            tag: 'Brand',
            what: 'Recapitalised by VisioCap and Beach Point Capital',
            detail:
              'Cascadia Capital advised, and described a maker of branded and private-label treats under Wet Noses, Doggy Delirious and Best Homies, in an 80,000 sq ft SQF Level III facility. No deal value was published.',
          },
          {
            when: '18 Nov 2021',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
          },
          {
            when: '16 Feb 2023',
            tag: 'Brand',
            what: 'Beach Point Capital takes a controlling stake',
            detail:
              'Its Tactical Fund, on terms nobody published. The founder returns as chief executive, and the money is for manufacturing capacity, including private-label contract manufacturing. From deal press.',
          },
          {
            when: '30 Sep 2023',
            tag: 'Amazon',
            what: 'Amazon’s badge history begins — with resellers in the buy box',
            detail:
              'NaturVet’s seller account holds it on most of the listings that sell, and Petco’s on three. Sales on these listings from here to October 2025 are the brand’s, not Wet Noses’ own revenue, which is why the chart does not start here.',
          },
          {
            when: '1 Apr 2024',
            tag: 'Brand',
            what: 'Pet Food Experts becomes the exclusive US distributor',
            detail: 'To independent pet retailers, announced by the distributor.',
          },
          {
            when: '13 May 2025',
            tag: 'Amazon',
            what: 'MODA Works takes over the buy box',
            detail:
              'A Florida multi-brand pet reseller, first on the 5 lb box and within eight days on most of the listings that sell. It holds them through October.',
          },
          {
            when: '8 Nov 2025',
            tag: 'Amazon',
            what: 'Wet Noses’ own seller account appears, and starts winning its listings',
            detail:
              'Keepa first tracks the account that day, and it wins its first buy box the same day. Nothing public announced the change or says why it happened: it is read from the buy-box record, listing by listing, through to February 2026.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: '$11,995 — the handover month, and the weakest of the series',
            detail: 'Less than half of October’s total on the same listings, while the buy box changed hands.',
          },
          {
            when: '6 Apr 2026',
            tag: 'Amazon',
            what: 'Purrks cat treats and Soft Baked dog treats listed',
            detail: 'Six listings in a day. None of them carries a sold badge by September.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: '$30,640 — the best month',
            detail: 'Not a holiday month. Across the whole badge history these listings show no December peak; dog treats are bought all year.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Amazon',
            what: 'Their own account wins 82% of the buy box',
            detail: 'Weighted by revenue, over the 90 days to this read. MODA Works still wins 6.5%.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The chart starts in November 2025 on purpose. Amazon’s badge history on these listings reaches back to September 2023, but until October 2025 resellers held the buy box — NaturVet’s seller account and Petco, then MODA Works — so the retail revenue in those months was theirs, and Wet Noses was paid a wholesale price nobody publishes. November 2025 is the first month its own account held the buy box, and it was the weakest month since: the listings changed hands through it. From then on the months run between about $12,600 and $30,600 with no December spike. Of each month roughly three dollars in ten is left after Amazon’s fees, cost of goods and advertising, before returns and overhead — and two of those cost lines are our placeholders.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record looked up on each marketplace
           (2026-09-15). No valuation, so no RULE 2 figure to agree with — but
           100 is still what it would be. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Amazon US is all of it. The seller account does not exist on the UK, German or Canadian marketplaces.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon UK, Germany and Canada', short: 'UK, DE, CA', share: 0, note: 'Seller id looked up on each; no account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. This is the Amazon channel alone — the distributor, Petco, co-manufacturing and wet-noses.com are not in it.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'Every listing that sells enough to carry a badge is the same Organic Crunchy treat in three pack sizes. The 5 lb Peanut Butter & Banana box and its two-bag sibling are 40% of the month between them.',
        items: WET_NOSES_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s badge, and every one here sits in its lowest brackets — 50+, 100+ or 200+ — so each row is a coarse floor: a listing showing 50+ could be selling 99. Revenue is that band times the buy box on 15 September 2026. 19 more priced listings carry no badge and count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badge brackets are coarse, the cost of goods and the advertising under the profit are placeholders rather than quotes, and returns and overhead are set to zero.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'On Amazon the story is who does the selling. Off Amazon there are at least four more channels, and none of them can be counted.',
      },
      {
        type: 'prose',
        text:
          'Keepa records who held the buy box on the twelve listings that carry a badge. NaturVet’s seller account held most of them, and Petco three, through April 2025; MODA Works, a Florida multi-brand pet reseller, held them from May to October 2025; and Wet Noses’ own account has held them since November 2025. Over the 90 days to 15 September 2026 their own account won 82% of the buy box, weighted by revenue. That the company began selling its own listings is an inference from that record — nothing public announces it, or says why.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon, the company sells through Pet Food Experts, its exclusive US distributor to independent pet retail since April 2024; puts Purrks cat treats into Petco; runs a 36-product Shopify store; and offers private-label and co-manufacturing to other brands. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $23.46 average sale, down to the roughly three dollars in ten that are left — and the largest thing Amazon takes is not its commission but the cost of moving a heavy box.',
      },
      {
        type: 'prose',
        text:
          'Baked treats are heavy for their price, and Amazon charges fulfilment by size and weight: $4.76 to pick, pack and ship a 14oz bag and $8.04 for a 5 lb box, $6.83 a unit across September — more than the 15% referral fee takes. Cost of goods is the line nobody could source. No bakery, co-packer or Wet Noses’ own wholesale page publishes a per-pound price, so the figure below is ours.',
      },
      {
        type: 'table',
        caption: 'COGS — what it costs to make',
        columns: ['Line', 'Per lb', '14oz bag', 'Two 14oz bags', '5 lb box'],
        rows: [
          ['Made in their own plant — a placeholder, not a quote', '$2.00', '$1.75', '$3.50', '$10.00'],
          ['Inbound freight to an FBA warehouse — a placeholder, not a quote', '$0.25', '$0.22', '$0.44', '$1.25'],
          ['For comparison: their own 20 lb bulk bucket, retail on wet-noses.com', '$6.00', '—', '—', '—'],
          ['Buy box on Amazon', '—', '$12.99', '$19.99', '$39.99'],
        ],
        note:
          'Net weights from the listing titles. The bucket is $119.99 for 20 lb — a retail price, so a ceiling on cost rather than a cost. Both placeholder rows are the first thing to replace with a real figure: on the 5 lb box they come to more than a quarter of the price.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 31.23% — and
           the backend seed builds the profit and ad-spend series from the SAME
           four numbers (COST_LINES). Change one, change both. Two decimals
           because September's P&L gives them; the page rounds for display. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 23.46 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -22.64,
            detail:
              '$2.00 a pound to make and $0.25 to land, over the weight of every badged unit sold in September. Our placeholder, not a quote — nobody publishes the figure.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Pet Products rate: 15%, with a $0.30 minimum.',
          },
          {
            label: 'FBA fulfilment',
            pct: -29.13,
            emphasis: true,
            detail:
              'Measured: each listing’s own pick-and-pack fee, $4.76 on a 14oz bag to $8.04 on a 5 lb box, times September’s badged units. The largest line here.',
          },
          {
            label: 'Advertising',
            pct: -2,
            detail:
              'Modelled, not observed — a placeholder, not a quote. They buy sponsored slots on their own brand name and none on generic searches, which puts spend in the low single digits of revenue.',
          },
        ],
        note: 'Before returns and overhead, both set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'callout',
        text:
          'Two of these four lines are ours. Referral and fulfilment are Amazon’s own fees and measured; cost of goods and advertising are placeholders, and cost of goods moves the margin more than any other line. It is also where a manufacturer selling its own treats should be strongest — which nobody outside the company can see.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'One channel was read, and it shows defence: they buy their own name on Amazon and nothing else. The figure is arithmetic; the counted line under it is what was actually seen.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            href: 'https://www.amazon.com/s?k=wet+noses+dog+treats',
            value: '≈ 2% of revenue',
            counted: '0 of 36 sponsored slots on three generic searches; 6 of 12 on “wet noses dog treats” — read 15 Sep 2026',
            flag: true,
            note:
              'Modelled, not observed. On “organic dog treats”, “grain free dog treats” and “human grade dog treats” none of the twelve sponsored slots was theirs; on their own name they held positions 1, 2, 3, 4, 11 and 19. Brand-term clicks are cheap and few, so spend sits in the low single digits of revenue; 2% is the figure the margin uses. Read with a Monroe, Washington delivery address — an earlier read from another country showed no ads at all and was discarded.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note: 'The Meta Ad Library and a paid-search history were not read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Their site links four social accounts, and on Amazon the demand arrives already typing the brand’s name.',
      },
      /* The same chips the overview opens with. 🚨 None carries a follower
         count: nobody read them, and the seed says so rather than guessing. */
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Follower counts and site traffic were not read for this profile, so the chips above carry no audience figure. What was read is Amazon search. On “wet noses dog treats”, 24 of the first page’s organic results carry the brand’s name; across three generic searches, one Wet Noses listing appears once, at position 48 on “organic dog treats”.',
      },
      {
        type: 'table',
        caption: 'Where they show up in Amazon search',
        columns: ['Search', 'Sponsored slots theirs', 'Organic results with the name', 'Best organic position'],
        rows: [
          ['wet noses dog treats', '6 of 12', '24', '#5'],
          ['organic dog treats', '0 of 12', '1', '#48'],
          ['grain free dog treats', '0 of 12', '0', '—'],
          ['human grade dog treats', '0 of 12', '0', '—'],
        ],
        note:
          'Read 15 September 2026 in Chrome with delivery set to Monroe, Washington, 60 results a page. Amazon localises search to whoever is looking, so these positions describe that reader on that day. A few organic results on the brand term are listings outside the brand’s own storefront.',
      },
      {
        type: 'callout',
        text:
          'Nothing public says where that branded demand comes from — the distributor’s shelves, the brand’s own site or its socials — because none of them publishes a number.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Wet Noses Natural Dog Treat Company, LLC' },
          { label: 'Seller', value: 'Wet Noses Natural Dog Treats', note: 'Merchant A3IMT2GVAXXI9L' },
          { label: 'Founded', value: '1998', note: 'By the company’s own account' },
          { label: 'Seller account first seen', value: '8 Nov 2025', note: 'By Keepa — the account, not the brand' },
          { label: 'Registered address', value: 'Monroe, WA, US', note: '14439 167th Ave, 98272' },
          { label: 'Seller feedback', value: '93%', note: 'Over 29 ratings', info: 'sellerFeedback' },
          { label: 'Controlling owner', value: 'Beach Point Capital', note: 'Tactical Fund, since Feb 2023 — deal press, terms undisclosed' },
          { label: 'Oldest live listing', value: '14 Dec 2011' },
        ],
      },
      {
        type: 'prose',
        text:
          'An old company on a new seller account. Private equity has been in the business since at least February 2020, when VisioCap and Beach Point Capital recapitalised it with Cascadia Capital advising; in February 2023 Beach Point’s Tactical Fund took a controlling stake and the founder, Jasmine Galligan, returned as chief executive. Neither deal’s terms were published. The 80,000 sq ft plant and its SQF and human-grade certifications are the company’s, its advisers’ and its distributor’s descriptions, not checked here.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront, and from the deal announcements.',
      },
    ],
  },

  'lighten-life': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-lighten-life-headline.ts, from
       waithowmuch-research research/lighten-life/headline.json (reviewed
       2026-09-16) — and the page reads them from the row alone. */
    headline: {
      /* Not the revenue leader, deliberately. That is the mixing-glass bar kit,
         whose buy box Mili World happened to hold at the moment of the read.
         This one sold the most units in the month, and it is the object the
         title names: a drinking glass. */
      image: {
        src: lightenLifePhoto('B09XHSVV7T'),
        alt: 'A whiskey glass printed “Daddy’s Sippy Cup” in white script, filled with whiskey, beside an open pale wooden gift box lined in black with the lighten life wreath logo inside the lid — a best-selling LIGHTEN LIFE listing',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand on the glass,
             the box and the listings, and no other brand's goods in the
             catalogue. 🚨 The trademark is registered to a third company,
             Shenzhen Tangson Houseware, not to either seller account, so
             whether the seller owns the brand is unestablished — the first
             question for the owner. */
          primaryMethod: 'private_label',
          /* Broad. No listing is over a fifth of September 2026 and 21 of 122
             listings carry a badge, spread over whiskey glasses, beer glasses,
             decanters and a bar kit. Not "dominance": the year-dated gift
             glass is a crowded search, where they rank mid-page (46–57) on
             generic gift terms. */
          catalogStructure: 'broad',
          /* Level 2. A printed design — a year, a joke — on a stock glass in a
             stock wooden or barrel box. Visible, and a rival orders the same
             print from the same kind of factory. No tooling, and nothing
             custom-made to form or function. */
          diffTooling: 'no',
          diffCustom: 'no',
          diffVisible: 'yes',
          /* A READ: the Brand Store at /stores/LIGHTENLIFE is gated behind
             enrolment. */
          brandRegistry: 'yes',
          /* 🚨 `trademark` left out on purpose. The mark is registered and
             live, but its owner is neither seller, so whether it would convey
             in a sale is unknown. Scoring "registered" would pay +0.2 for an
             asset nobody has shown the business holds. */
        },
        derived: {
          /* RULE 1: B07YJLZTNB, a decanter and glass set, 2019-12-05 — the
             catalogue's first listing. Not EVERHOME's account (Keepa first saw
             it 2025-12-26). */
          sellingSince: '2019-12-05',
          /* Top 20 listings, each variation family counted ONCE (the
             birthday-glass family shares 3,688 across its ages; the beer glasses
             2,171). A floor. */
          reviewTotal: 11568,
          /* Revenue-weighted over September's badged listings: 4.79. */
          ratingWeighted: 4.8,
          /* 🚨 A blend of the two accounts by rating count — EVERHOME 100% over
             32, Mili World 99% over 881 → 99%. Both sit in the model's 98%+
             band, so the blend does not move the multiple. */
          sellerFeedbackPct: 99,
          /* channels left unset: EVERHOME's record shows FBA, and nobody
             checked for FBM. The model scores only "both". */
          /* RULE 2. EVERHOME has an Amazon Canada account with 0 ratings; Amazon
             US is all of the measured revenue. Mili World's footprint outside
             the US was not checked. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* December 2025 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 26.14,
          /* RULE 3: offAmazonSharePct unset. Walmart and Bed Bath & Beyond
             listings exist and their sellers were never read. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. The LIGHTEN LIFE brand on Amazon US only, counted across both seller accounts that have held its buy box — Walmart, Bed Bath & Beyond and any other retail are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '122', note: '72 in the current storefront; 21 carrying a sold badge', info: 'skus' },
      /* The whiskey glasses' own breadcrumb — most of the badged listings sit
         under it. */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Dining & Entertaining › Glassware & Drinkware › Cocktail Drinkware › Old Fashioned Glasses',
        note: 'The whiskey-glass listings',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-listing figures, so NO `info` key — the shared ⓘ copy describes
         one hero listing. */
      { label: 'Product reviews', value: '11,568', note: 'Top 20 listings, each variation family counted once' },
      { label: 'Product rating', value: '4.8★', note: 'Revenue-weighted, September’s badged listings' },
      { label: 'Seller feedback', value: '99–100%', note: 'Mili World and EVERHOME · read 15 Sep 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their brand on the box; the maker is unnamed', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, long tail', note: 'No listing is a fifth of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 2', note: 'Printed designs on stock glass', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US', note: 'Listings seen on other retailers, sellers unread', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a number behind it. Every figure on this profile is the LIGHTEN LIFE brand on Amazon US, across both seller accounts that have held its buy box.',
      },
      /* Unchecked rather than no: an account exists in Canada, and Mili
         World's non-US accounts were never looked up. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'EVERHOME has an Amazon Canada account with 0 ratings and none on Amazon UK or Germany. Mili World was not looked up outside the US.',
      },
      'own-store': {
        status: 'no',
        note:
          'No brand site was found. lifelightenup.com uses the name, but it is a template store that also sells Vitra, Alessi and Hay, and nothing ties it to the brand.',
      },
      /* Unchecked, not yes: the listings exist, but whether this business is
         the one selling them is exactly what was not read. */
      'other-marketplace': {
        status: 'unchecked',
        flag: true,
        note:
          'LIGHTEN LIFE items show up on walmart.com, bedbathandbeyond.com and advancedmixology.com in search results. The sellers were not read — Walmart returned a CAPTCHA.',
      },
      // tiktok-shop, wholesale-out and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'Both seller records show FBA, and every badged listing carries an Amazon pick-and-pack fee: $5.61 on a boxed whiskey glass, $6.90 on the bar kit.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the brand’s listings, on either seller record.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand on the glass, the box and the listings. The trademark is registered to a third company in Shenzhen, so who owns the brand is a separate question.',
      },
      /* Unchecked: Wenxi County is a glassware county, and that is context,
         not evidence that either Shanxi account makes the glass. */
      manufacturer: {
        status: 'unchecked',
        note:
          'Mili World is registered in Wenxi County, Shanxi, which is known for glassware. Nothing read shows who makes these glasses.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/LIGHTENLIFE, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'LIGHTEN LIFE sells gift glassware on Amazon: birthday and retirement whiskey glasses in wooden boxes, beer glasses in barrel boxes, and whiskey decanter sets. The brand has been listed since December 2019, and in 2026 its buy box moved from a company in Shanxi, China, to one in California.',

    blocks: [
      { type: 'heading', text: 'A year on a glass, in a wooden box' },
      {
        type: 'prose',
        text:
          'Most of what sells is one idea, reprinted for each age. A 12oz rocks glass reads “1946 Vintage — Aged to Perfection” for an 80th birthday, or “1976” for a 50th, and ships in a pale wooden box with the brand’s wreath inside the lid. A 16oz pint glass does the same in a barrel-shaped box. Around them sit joke glasses — “Daddy’s Sippy Cup”, “Grandpa Juice”, a coworker leaving gift — decanter sets, a 29oz decanter and a cocktail mixing glass kit.',
      },
      {
        type: 'prose',
        text:
          'Three companies appear in the public record, and none is shown to be connected to the others. The trademark belongs to Shenzhen Tangson Houseware. Until 2026 the buy box was held by Mili World, a home-products company in Wenxi County, Shanxi. Since June it has been held by EVERHOME CRAFT INC, at an address in Ontario, California. Everything on this page counts the brand across both seller accounts, and that choice rests on an inference.',
      },
      /* No figures in the caption. The two year-dated glasses are the
         catalogue's idea; bucket copies of the brand's own listing images. */
      {
        type: 'images',
        items: [
          {
            src: lightenLifePhoto('B0CPWGZK21'),
            alt: 'A whiskey glass printed “Limited Edition 1946 Vintage — Aged to Perfection” under a crown and laurel, with ice and whiskey, beside an open wooden gift box holding the same glass',
          },
          {
            src: lightenLifePhoto('B0CPPXBZQG'),
            alt: 'A pint of beer in a glass printed “1966 Vintage — Aged to Perfection”, beside a dark wooden barrel-shaped gift box with iron hoops and a brass clasp',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the year-dated whiskey glass in its wooden box, and the beer glass in its barrel box.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A trademark filed from Shenzhen in 2019, six years of listings, and in 2026 a buy box that moved from Shanxi to California in five months.',
      },
      {
        /* Oldest first. Month-end revenue events sit on the last day of the
           month so the dot lands on the chart's point. The 2018 first-use date
           is the registrant's own claim on the trademark record. */
        type: 'timeline',
        items: [
          {
            when: '27 Sep 2018',
            tag: 'Brand',
            what: 'First use of the LIGHTEN LIFE mark, by the registrant’s claim',
            detail: 'The date Shenzhen Tangson Houseware gave the USPTO for first use in commerce. A claim on the filing, not something checked.',
          },
          {
            when: '14 Jan 2019',
            tag: 'Brand',
            what: 'Shenzhen Tangson Houseware files the trademark',
            detail: 'Class 21: beer glasses, drinking glasses, glass carafes, wine pourers and more. Registered on 23 July 2019.',
          },
          {
            when: '5 Dec 2019',
            tag: 'Amazon',
            what: 'The first LIGHTEN LIFE listing: a whiskey decanter and glass set',
            detail: 'A second decanter set, the one still selling with four glasses, went up the next day.',
          },
          {
            when: '14 Jul 2020',
            tag: 'Amazon',
            what: 'The cocktail mixing glass set is listed',
            detail: 'A 20oz glass with a spoon, jigger, strainer and muddler. Six years on it is still one of the brand’s top listings.',
          },
          {
            when: '23 Nov 2021',
            tag: 'Amazon',
            what: 'Keepa first tracks Mili World',
            detail: 'The Shanxi account that held the brand’s buy box through January 2026. A first-tracked date trails an account’s real opening.',
          },
          {
            when: '8 Apr 2022',
            tag: 'Amazon',
            what: '“Daddy’s Sippy Cup” goes up',
            detail: 'A joke whiskey glass, listed the same day as a coworker leaving gift. In September 2026 it sold more units than any other listing.',
          },
          {
            when: '7 Dec 2023',
            tag: 'Amazon',
            what: 'The year-dated birthday glasses arrive',
            detail:
              'Beer glasses in barrel boxes on 7 December, one listing per age, and most of the whiskey-glass ages on 10 December (a 50th had gone up in June). The whiskey-glass family now carries about 3,680 reviews, shared across its ages.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '$249,792 — the biggest month on the chart',
            detail: 'The first December in the badge history. Each December since has been smaller.',
          },
          {
            when: '30 Apr 2024',
            tag: 'Amazon',
            what: 'A second Wenxi account stops appearing',
            detail:
              'Perfect Drinkware, in the same Shanxi town as Mili World, held the buy box on one LIGHTEN LIFE listing at every month end from September 2023 to April 2024.',
          },
          {
            when: '30 Sep 2024',
            tag: 'Amazon',
            what: 'The retired listings have made their last sales',
            detail:
              'A 34oz decanter, a cold brew coffee maker, 51st, 61st and 81st birthday glasses, and boss and husband gift sets: 21 listings that brought in $351K from September 2023, none of it after this month.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '$197,630 — December',
            detail: 'Down a fifth on December 2023.',
          },
          {
            when: '23 Sep 2025',
            tag: 'Brand',
            what: 'The trademark owner files its six-year declaration of use',
            detail: 'Shenzhen Tangson Houseware had filed a change of address eleven days earlier. The USPTO accepted the declaration on 10 February 2026.',
          },
          {
            when: '26 Dec 2025',
            tag: 'Amazon',
            what: 'Keepa first tracks EVERHOME CRAFT INC',
            detail: 'Trading as Home Gift Ever, at 2131 South Grove Avenue, Ontario, California.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$188,139 — the last December under Mili World',
            detail: 'The smallest of the three Decembers on the chart.',
          },
          {
            when: '28 Feb 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds its first buy box at a month end',
            detail: 'On $849.50 of the month’s $42,079. Mili World held the rest.',
          },
          {
            when: '30 Apr 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds most of the month',
            detail: '$27,537 of $37,242, listing by listing, with Mili World stepping back rather than competing.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: '$23,339 — the lowest month in the series',
            detail: 'Both accounts still held buy boxes. This read cannot say whether the handoff, tariffs or demand made it low.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: 'Every buy box at the month end is EVERHOME’s',
            detail: 'And again at the end of July and August.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds the buy box on 70 of 72 priced listings',
            detail:
              'Mili World held the other two when read, one of them the cocktail mixing glass kit, although EVERHOME had held that listing 97.2% of the previous 90 days.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'This is a December business. The three Decembers on the chart did $249,792, $197,630 and $188,139, three to five times an ordinary month, and each was smaller than the one before. A little over a quarter of each month is kept after the glass, duty, freight, Amazon’s two fees and advertising. That share uses September 2026’s cost rates for every month, and a glass cost nobody has quoted.',
      },
      {
        type: 'prose',
        text:
          'The series counts all 122 listings carrying the brand, each once, whichever account held the buy box. The count matters here: 21 listings no longer in the current storefront sold in 2023 and 2024. Measured off today’s storefront alone, September 2023 reads $35K. Brand-wide it was $80K.',
      },
      { type: 'chart' },
      {
        /* From EVERHOME's Keepa seller record on UK, DE and CA (2026-09-15).
           Mili World's was not looked up outside the US, and the note says so.
           🚨 The largest share is valuation derived.topMarketplaceSharePct —
           check-profile.mjs holds the two together. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. The current seller has a Canadian account with no ratings.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'EVERHOME’s account exists with 0 ratings; no Canadian listing was checked for a badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No EVERHOME account. Mili World was not looked up outside the US' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Only the current seller’s id was looked up on each marketplace.',
      },
      {
        /* Generated from the brand series — see the module's header. The rows
           sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing carries the month. The mixing glass kit and the joke whiskey glasses lead, and behind them are the year-dated glasses, one listing per age, each selling 50 or 100 a month.',
        items: LIGHTEN_LIFE_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the buy box on 15 September 2026, so every row is a floor. The other 101 brand listings carry no badge and count as zero. One row’s buy box was Mili World’s at the moment of the read, and the row says so.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. This chart also joins two seller accounts into one business: Mili World in Shanxi through January 2026, and EVERHOME CRAFT INC in California from June. That is an inference. Nothing read ties the two companies together, or ties either one to the trademark’s owner.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'One marketplace, one fulfilment method, one account at a time. The account changed in 2026, and the way a sale reaches the customer did not.',
      },
      {
        type: 'prose',
        text:
          'Every badged listing is fulfilled by Amazon, and both seller records show FBA. When the buy box moved in spring 2026, the listings, prices and reviews stayed. The best-selling whiskey glasses have been $16.99 since December 2024, with a few short discounts. Off Amazon, the brand’s items appear on Walmart, Bed Bath & Beyond and a bar-supply site. Nobody read who sells them there, so those channels are unchecked, not counted.',
      },
      {
        type: 'prose',
        text:
          'What follows shows which methods are present, not what share each one has. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon’s fulfilment fee is the biggest cost on a $20 gift. After it, the glass, duty, freight, the referral fee and advertising, a little over a quarter of each sale is left. That figure is a ceiling.',
      },
      {
        type: 'prose',
        text:
          'Two lines are measured: Amazon’s 15% referral fee and its pick-and-pack fee, read per listing. On a $16.99 boxed whiskey glass that fee is $5.61, a third of the price, because Amazon charges for the box’s size and weight, not its value. The goods are the weak part. No supplier quoted. Glass and wooden-box prices come from Made-in-China list prices, and no barrel box was priced at all. Every dollar of unit cost moves a 2,500-unit month by about $3,000 once duty is added.',
      },
      {
        type: 'table',
        caption: 'COGS — what a glass and a box cost to make and land',
        columns: ['Line', 'What was read', 'Tier', 'Unit cost'],
        rows: [
          ['Whiskey glass in wooden box', 'Printed rocks glass $0.35–0.69 and wooden box $0.50–3.70 (Made-in-China list prices); ~$0.10 of printing assumed', 'Derived, weak', '$2.60'],
          ['16oz beer glass in barrel box', 'Glass at the top of the rocks-glass range; wooden box $2.50. No barrel box priced', 'Derived, weak', '$3.20'],
          ['Glass pair in barrel box', 'Two printed glasses and a wooden box; barrel shape and printing premium assumed', 'Derived, weak', '$4.50'],
          ['Decanter with four glasses', '7-piece decanter set $7.50–8.50, MOQ 250', 'Derived, weak', '$8.00'],
          ['Mixing glass kit', '20oz mixing glass $1.50–2.37; spoon, jigger, strainer, muddler and box assumed at $1.75', 'Derived, weak', '$4.00'],
          ['29oz decanter, shot glasses — a placeholder, not a quote', 'No price read for either', 'ASSUMED', '$4.00 / $2.20'],
          ['Tariff', 'HTSUS 7013.37 at 22.5%, Section 301 at 7.5%, plus the China duty in force two months before sale. Both the lag and China origin are assumed', 'Derived', '$0.99 a unit in Sep 2026'],
          ['Freight and inbound', 'Package volume at the FBX01 container rate (Freightos), plus $0.35 a unit for drayage and placement — a placeholder, not a quote', 'Derived + ASSUMED', '$0.91 a unit in Sep 2026'],
        ],
        note:
          'List prices describe the category, not this brand’s supplier. The glass and box costs carry most of the units, so they are the first thing to replace with a real quote. Freight uses today’s container rate for every month, which overstates 2024–25.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 27.63% — and
           the backend seed builds the profit and ad-spend series from the SAME
           six numbers (COST_LINES in seed-lighten-life.ts). Change one, change
           both.
           🚨 Two decimals on purpose: September 2026's pnl.json rates. Whole
           percents sum to 72 and move the headline's $14.1k to $14.3k. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 20.39 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -15.19,
            detail:
              'About $3.10 of a $20.39 sale: glass and box by product, on September’s mix. Derived from supplier list prices and weak. The 29oz decanter, the shot glasses and part of the bar kit are placeholders, not quotes.',
          },
          {
            label: 'Tariff',
            pct: -4.84,
            detail:
              'About $0.99. The 22.5% MFN rate on glasses under $3, Section 301’s 7.5% and the 10% China duty in force at an assumed import two months earlier. Derived from published rates. China origin is assumed from the sellers, and any IEEPA refund is left out.',
          },
          {
            label: 'Freight and inbound',
            pct: -4.47,
            detail:
              'About $0.91. Ocean freight from package volume at the FBX01 rate, plus $0.35 a unit for drayage, brokerage and placement — a placeholder, not a quote.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s Kitchen rate, and 15% on every LIGHTEN LIFE listing in Keepa. Measured.',
          },
          {
            label: 'FBA fulfilment',
            pct: -28.87,
            /* The largest line — the component labels the emphasised line
               "Biggest line". */
            emphasis: true,
            detail:
              'About $5.89. Amazon’s pick-and-pack fee, read per listing on 15 September 2026: $5.61 on a boxed whiskey glass, $6.90 on the bar kit, $8.56 on the decanter set. Measured.',
          },
          {
            label: 'Advertising',
            pct: -4,
            detail:
              'ASSUMED: a 4% placeholder. What was measured is the footprint: sponsored slots on the brand’s own name and none on four generic searches. That suggests a small budget, and it cannot show the bill.',
          },
        ],
        note:
          'September 2026’s rates, and every month on the chart carries them, although tariffs, freight and the product mix all differed in earlier months. Storage, returns, glass breakage, coupons and overhead are not modelled, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'Tariffs move the rate more than the business does. The additional China duty was nothing before 2025, reached 30% during 2025, and is 10% on September 2026’s goods. The same glass kept a different share in each month. The dossier’s month-by-month model uses each month’s own duty and freight. In that model September 2026 keeps more than September 2025, although it sold less, and September 2025 to August 2026 keeps about $181,500 — less than this chart’s single set of rates gives.',
      },
      {
        type: 'callout',
        text:
          'The glass and box costs move this profile most. They stand in for a quote nobody has read, with advertising and part of freight as placeholders beside them. Those are the first three numbers to replace.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'There is no growth to report. The brand is shrinking, and this read cannot say why.',
      },
      {
        type: 'prose',
        text:
          'Every month of 2026 so far sold less than the same month of 2025. January to August came to $331,800, against $485,914 a year earlier, down 32%. The twelve months to August 2026 were down 20% on the twelve before. The decline is not only this year: each December was smaller than the last.',
      },
      {
        type: 'prose',
        text:
          'Part of the older decline is a pruned catalogue. By October 2024, 21 listings had stopped selling for good: a 34oz decanter, a cold brew coffee maker, 51st, 61st and 81st birthday glasses, and boss and husband gift sets. What is left is the year-dated glasses, the joke glasses, the decanters and the bar kit. New listings are the same idea at new ages: a 21st-birthday pint glass in September 2025, and 21st-birthday shot glasses in April 2026.',
      },
      {
        type: 'prose',
        text:
          'The 2026 drop lines up with the seller handoff. May 2026, the lowest month in the series, came when both accounts held buy boxes. It also lines up with changing China tariffs, and with whatever gift demand did. A handoff can cost sales through lost buy boxes, stock stranded in one account, or a new account’s limits. None of that is visible from outside.',
      },
      {
        type: 'callout',
        text:
          'Whether 2026 is a transition or a trend is the open question. June 2026, the first month fully under the new account, was the best month of 2026. July and August fell back.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Brand defence and nothing else. They buy the sponsored slots on their own name, and none on the generic gift and bar searches where their listings rank mid-page.',
      },
      {
        type: 'prose',
        text:
          'On “lighten life”, 8 of 12 sponsored slots were theirs, including the top four. The other four were red-light therapy products bidding on the word “light”. On four generic searches — decanter sets, whiskey-glass gifts, 50th-birthday gifts and mixing glasses — they held none of 48 sponsored slots. Their organic positions there ranged from #9 to #57. The #9 was “cocktail mixing glass”, the one generic search where a listing of theirs sits on the first rows.',
      },
      {
        type: 'prose',
        text:
          'A first read defaulted to Israel delivery. Amazon serves sponsored results by delivery address, so it was discarded and repeated for New York. A logged-out read cannot see Sponsored Brands or Display elsewhere on the page, and it cannot see spend off Amazon.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            href: 'https://www.amazon.com/s?k=lighten+life',
            value: '≈ 4% of revenue — assumed',
            counted: '8 of 12 sponsored slots on “lighten life” · 0 of 48 on four generic searches — New York delivery, 15 Sep 2026',
            flag: true,
            note:
              'The figure is a placeholder, the same 4% the margin deducts. The count is the measured part. Defence alone usually costs low single digits, and one read cannot rule out other ad types.',
          },
          {
            label: 'Others on their name',
            value: '4 of 12',
            counted: 'Sponsored slots on “lighten life” held by red-light therapy products',
            note: 'Bidding on the word “light”, not on the brand. No glassware competitor was buying the name.',
          },
          {
            label: 'Meta, TikTok and Google',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        type: 'table',
        caption: 'Five Amazon searches, 15 September 2026',
        columns: ['Search', 'Sponsored slots', 'Theirs', 'Their organic positions'],
        rows: [
          ['whiskey decanter set', '12', '0', '#16, #27, #57'],
          ['whiskey glasses gifts for men', '12', '0', '#47'],
          ['50th birthday gifts for men', '12', '0', '#46'],
          ['cocktail mixing glass', '12', '0', '#9, #55'],
          ['lighten life', '12', '8 — positions 1–4, 11, 13, 19, 20', '—'],
        ],
        note:
          'Headless Chrome, logged out, delivery set to New York 10001 and checked on the page, one read per term, matched against every brand listing. Amazon localises and rotates results, so this is a reading on a day, not a rank that holds.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'There is no brand site, no social account tied to the brand, and no traffic reading. Demand here is Amazon search.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The one chip is the Amazon brand store. A search for the brand turned up a template web store using the name, a Facebook page called “Lighten Life” and listings on other retailers. None of them was tied to the brand, and none was measured. The Amazon ranks below are the demand the record shows: the year-dated glasses sit near the top of their narrow categories.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Walmart',
            href: 'https://www.walmart.com/c/brand/lighten-life',
            value: 'Seller not read',
            flag: true,
            note: 'Search results show a LIGHTEN LIFE item on walmart.com. The page returned a CAPTCHA, so who sells it is unknown.',
          },
          {
            label: 'Bed Bath & Beyond and advancedmixology.com',
            value: 'Seller not read',
            note: 'Both appear in search results carrying LIGHTEN LIFE items. Neither was opened.',
          },
          {
            label: 'lifelightenup.com',
            href: 'https://lifelightenup.com/',
            value: 'Not the brand’s, as far as read',
            note: 'A WooCommerce template store using the name, which also sells Vitra, Alessi and Hay. Nothing ties it to this brand.',
          },
          {
            label: 'Facebook — “Lighten Life” (@ltuplife)',
            value: 'Unread',
            note: 'Found in search. Its content was not read, and it is not confirmed as the brand’s page.',
          },
        ],
      },
      {
        /* Keepa's rank on the listing, read 15 Sep 2026: the root category and
           the listing's narrowest category. Keyword positions are under
           Advertising, dated to one search. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Home & Kitchen', 'Narrowest category', 'Rating'],
        rows: [
          ['60th birthday beer glass', '#11,176', '#9 · Beer Glasses', '4.8★ over 2,168 reviews'],
          ['80th birthday whiskey glass', '#12,155', '#18 · Old Fashioned Glasses', '4.8★ over 3,679 reviews'],
          ['Cocktail mixing glass kit', '#22,607', '#35 · Bar Sets', '4.7★ over 234 reviews'],
          ['“Daddy’s Sippy Cup” whiskey glass', '#23,760', '#53 · Old Fashioned Glasses', '4.9★ over 799 reviews'],
          ['29oz whiskey decanter', '#38,573', '#20 · Liquor Decanters', '4.7★ over 511 reviews'],
          ['Decanter with four glasses', '#70,476', '#63 · Liquor Decanters', '4.7★ over 1,255 reviews'],
        ],
        note:
          'Read through Keepa on 15 September 2026. Rank moves daily. Variations share a parent listing, so each age of a birthday glass carries its family’s reviews and a near-identical rank.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        /* 🚨 Three companies, and NO row says or implies they are one. The
           trademark owner was read directly on TSDR at publish (2026-09-16);
           the seller rows are Keepa's records (2026-09-15). */
        type: 'facts',
        items: [
          { label: 'Trademark owner', value: 'Shenzhen Tangson Houseware Co., Ltd', note: 'Shenzhen, China · USPTO reg. 5813494, read 16 Sep 2026' },
          { label: 'Trademark', value: 'LIGHTEN LIFE', note: 'Registered 23 Jul 2019 · class 21 · live' },
          { label: 'Storefront seller', value: 'EVERHOME CRAFT INC', note: 'Home Gift Ever · Ontario, CA · merchant AGUGC2ZZUQ1D0' },
          { label: 'Seller before 2026', value: 'Mili World', note: 'Shanxi Mili Home Products Co., Ltd · Wenxi County, Shanxi' },
          { label: 'Seller feedback', value: '99–100%', note: 'Mili World 99% over 881 · EVERHOME 100% over 32', info: 'sellerFeedback' },
          { label: 'First listing', value: '5 Dec 2019' },
        ],
      },
      {
        type: 'table',
        caption: 'The seller accounts that have held the buy box',
        columns: ['Account', 'Legal name and address', 'Seller feedback', 'First tracked', 'Buy box'],
        rows: [
          [
            'Mili World · AO5CCMZMFKMI4',
            'ShanXi MiLi JiaJuYongPin YouXianZeRenGongSi, Tongcheng Town, Wenxi County, Shanxi, China',
            '99% over 881 ratings',
            '23 Nov 2021',
            'Every attributed month end from September 2023 to January 2026, handing over February to May 2026. Two listings when read',
          ],
          [
            'Home Gift Ever · AGUGC2ZZUQ1D0',
            'EVERHOME CRAFT INC, 2131 South Grove Avenue, Unit E, Ontario, California',
            '100% over 32 ratings',
            '26 Dec 2025',
            'From February 2026; every month end of June to August 2026; 70 of 72 priced listings when read',
          ],
          [
            'Perfect Drinkware · A1RI9VLL1PE5MB',
            'Shanxi Jingming Home Products Co., Ltd, Tongcheng Town, Wenxi County, Shanxi, China',
            '98% over 130 ratings',
            '—',
            'One listing, at month ends September 2023 to April 2024. Its own brand is “comome”',
          ],
        ],
        note:
          'Keepa’s seller records, read 15 September 2026. First-tracked dates are Keepa’s and trail an account’s real opening. The Chinese legal names are run-together pinyin on the records.',
      },
      {
        type: 'prose',
        text:
          'The brand has three companies around it, and nothing read connects them. The trademark, filed in January 2019 and still live, belongs to Shenzhen Tangson Houseware. The six years of listings sold through Mili World, a home-products company in a Shanxi county known for glassware. From February to June 2026, the buy box moved listing by listing to EVERHOME CRAFT INC in California, and Mili stepped back rather than competing. A job posting describes EVERHOME as a growing brand in Ontario, California, expanding into retail and wholesale. It does not name the brand.',
      },
      {
        /* 🚨 The relationship is an INFERENCE and must stay worded as one.
           Never tighten this into a sale, a licence or common ownership. The
           California filing was seen only through a search index and is kept
           out of the copy until read directly. */
        type: 'prose',
        text:
          'A clean handoff like this reads as one operation changing its US selling entity, but that is an inference, not a finding. Nothing read says whether the three companies share owners, or whether the change was a transfer, a licence, a new distributor or something else. Counting both seller accounts’ revenue as one brand’s rests on that inference, and so does everything priced on this page.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the seller records behind the brand’s Amazon listings, their buy-box history, and the USPTO trademark record.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model, a 2.6 base multiple moved by what the public record supports, applied to trailing-twelve profit. It prices the LIGHTEN LIFE brand on Amazon US as if one operation ran it throughout.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Walmart, Bed Bath & Beyond and any other retail are excluded because nobody read who sells there. The profit being multiplied carries September 2026’s cost rates into every month, on glass costs nobody has quoted, before storage, returns and breakage. On that basis it is an upper bound, and the decline since 2025 is in the trailing twelve but not in the multiple.',
      },
      {
        type: 'prose',
        text:
          'The positives are age and reputation: six years of listings, reviews in the thousands on the year-dated glasses, near-perfect seller feedback on both accounts, and an enrolled brand store. The negatives are the shape of the year and the reach of the business. December is over a quarter of the trailing twelve, every measured dollar is on Amazon US, and the product is a printed design on a stock glass that a rival can order.',
      },
      {
        type: 'prose',
        text:
          'The whole figure rests on one inference: that Mili World and EVERHOME CRAFT INC are one operation, so the months before the handoff are this business’s record. Nothing read establishes it. The trademark belongs to a third company, so the model does not score it. Sourcing, catalogue shape and differentiation level are questionnaire answers taken from the public record, and the feedback figure blends the two accounts. Brand Registry is firmer, because Amazon gates the brand store behind enrolment. All of these are the first things to put to the owner.',
      },
    ],
  },
};

export function profileFor(slug) {
  return PROFILES[slug];
}
