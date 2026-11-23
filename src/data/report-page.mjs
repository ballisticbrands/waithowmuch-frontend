/**
 * The words on /report/, as plain data: one source for the page
 * (src/pages/Report.tsx) and the prerender (scripts/postbuild-spa-routes.mjs).
 *
 * /report/ takes an Amazon store or product, shows the real store name and
 * product photos over a blurred WaitHowMuch dashboard, and asks for an email
 * (or Google) to send the full report to. Two plans, as prominent as the
 * signup itself: Free, and a $99 one-time team verdict (selected by default).
 * Nothing is charged on this page; the free report is always delivered first.
 *
 * 🚧 Placeholder wording (owner, 2026-11-22: "we'll work on all the wording
 * later").
 */
import { BRAND_NAME } from './site.mjs';
import { collectionPath } from './collections.mjs';

export const SOURCE = 'report_page';
export const PATH = '/report/';
export const TITLE = `Get a free ${BRAND_NAME} report on any Amazon store`;
export const META_DESCRIPTION =
  "Paste an Amazon store or product and get a full WaitHowMuch report: revenue, profit, margin, ad spend, COGS and what it would cost to launch your own. Free.";

export const HERO = {
  h1: 'Get a full report on any Amazon store, for free',
  lines: [
    'Paste an Amazon store or product link. We research its revenue, profit, margin, ad spend and costs, the same way we do for our case studies, and email you the full report.',
  ],
  placeholder: 'Amazon store or product link, ASIN or seller ID',
  button: 'Get the report',
};

/** What each pasted-input error means, in the visitor's words. */
export const INPUT_ERRORS = {
  empty: 'Paste an Amazon store or product link.',
  not_amazon: 'That is not an Amazon link. Paste an amazon.com store or product link.',
  us_only: 'Only amazon.com (US) stores for now.',
  short_link: 'Short links (a.co, amzn.to) do not say which store they are. Open it and paste the full amazon.com address.',
  no_asin: 'We could not find a product in that link. Paste the store or product page address.',
  invalid: 'We could not read that. Paste an amazon.com store or product link, an ASIN or a seller ID.',
};

/** The landing page: /report/ with no store yet. 🚧 First draft, to iterate
 *  on with the owner. Every claim here must stay true of what the report
 *  actually contains. */
export const LANDING = {
  eyebrow: 'Free competitor report',
  h1: "See exactly what any Amazon competitor makes, spends and pays for their product",
  sub: 'The only place you get a competitor\'s revenue, COGS, ad spend and traffic sources (organic and paid) in one report. Paste their store or product link, and we email you the full breakdown, for free.',
  trust: ['100% free', 'No credit card', 'Researched by hand, the same way as our case studies'],
  whatHeading: 'You get ALL of this data about your competitor',
  what: [
    { icon: 'revenue', title: 'Revenue', text: 'Monthly revenue for the whole store and for each product, from Amazon\'s own "bought in past month" figures and the buy box price.' },
    { icon: 'cogs', title: 'COGS', text: 'What it costs them to make and ship each unit: real supplier quotes for the same product, plus freight and duties.' },
    { icon: 'ads', title: 'Ad spend', text: 'What they spend on Amazon Ads every month, and the exact keywords they bid on.' },
    { icon: 'traffic', title: 'Traffic sources', text: 'Where their sales come from: organic search vs. paid ads on Amazon, plus their website, social media and external ads.' },
    { icon: 'margin', title: 'Profit and margin', text: 'Revenue minus COGS, Amazon fees and ad spend: what they actually keep each month.' },
    { icon: 'launch', title: 'What it takes to compete', text: 'What it would cost you to launch a similar product: first order, shipping and the ads to get it moving.' },
  ],
  compareHeading: 'Why nobody else gives you this',
  compareLines: [
    'Amazon research tools estimate revenue. That is where they stop.',
    'Revenue alone tells you nothing about whether a product is worth going after. You need to know what it costs to make, what it takes in ads to sell, and where the buyers come from. That is the part we research.',
  ],
  compareCols: ['Typical Amazon research tools', 'WaitHowMuch report'],
  compareRows: [
    ['Revenue estimate', true, true],
    ['COGS from real supplier quotes', false, true],
    ['Monthly ad spend and keywords', false, true],
    ['Organic vs. paid traffic', false, true],
    ['Off-Amazon traffic (site, social, ads)', false, true],
    ['Real profit and margin', false, true],
    ['Checked by a human', false, true],
  ],
  stepsHeading: 'How it works',
  steps: [
    { title: 'Paste a link', text: 'Any amazon.com store, product page, ASIN or seller ID.' },
    { title: 'We research it', text: 'Sales data, ad libraries, supplier quotes and freight rates, pulled together and checked by hand.' },
    { title: 'Get it by email', text: 'Your full report, free. Want our team\'s verdict on it too? That\'s an optional $99, decided after you\'ve read the report.' },
  ],
  proofHeading: 'The same research behind our case studies',
  proofText: 'Every case study on WaitHowMuch is a report like yours. Here are the latest:',
  proofLink: 'See all case studies →',
  finalHeading: 'Which competitor do you want to see?',
};

export const BUILDING = ['Estimating revenue', 'Modelling profit and margin', 'Reading ad spend', 'Pricing COGS', 'Ranking best sellers'];

export const POPUP = {
  title: 'Enter your email to get the full report, for free',
  signedInTitle: 'Get the full report, for free',
  plansHeading: '1. Choose your report',
  signupHeading: '2. Where should we send it?',
  emailButton: 'Send me the report',
  signedInButton: 'Send me the report',
  changeStore: '← Try a different store',
  caseStudies: { text: 'Read all existing case studies →', href: collectionPath('all-ideas') },
};

/** The plans. `verdict_99` is selected by default. The API stores the key
 *  (ReportRequest.plan); the price shown here must match REPORT_PLANS there. */
export const PLANS = [
  {
    key: 'free',
    title: 'Free',
    lines: [
      'The full WaitHowMuch report on this store: monthly revenue, profit and margin, ad spend, COGS, its best sellers and what it would cost to launch your own.',
      'Researched by us and emailed to you.',
    ],
  },
  {
    key: 'verdict_99',
    title: '$99 one-time payment',
    lines: [
      'Everything in the free report, then the WaitHowMuch team goes over it by hand and gives you their verdict: is this worth going after, where the margin really comes from, and what we would do in your place.',
    ],
  },
];

/** Under the plans: the $99 is not a decision for now. */
export const PLAN_NOTE =
  "You don't have to decide now. No payment is taken today: your free report is delivered first, and we only ask for the $99 after you've seen it.";

export const DEFAULT_PLAN = 'verdict_99';

/** After the request is in. */
export const SENT = {
  emailTitle: 'Check your inbox',
  emailText: 'We sent you a link to confirm your email. Your report request is saved; open the link so we know where to send it.',
  doneTitle: 'Your report is on its way',
  doneText: "We're researching this store now and will email you the report as soon as it's ready.",
  doneVerdict: "You picked the $99 team verdict. Nothing is charged now: the free report comes first, and we'll ask about the verdict after you've read it.",
};
