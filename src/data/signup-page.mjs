/**
 * The words on /signup/, as plain data: one source for the page
 * (src/pages/Login.tsx) and the prerender (scripts/postbuild-spa-routes.mjs),
 * so the crawler-visible copy cannot drift from what a visitor sees.
 *
 * One form: email or Google, and two checkboxes, both ticked by default. What
 * the visitor leaves ticked lands on the User row (wantsApiAccess /
 * wantsCaseStudies) and on GA4's sign_up. `wantsCaseStudies` is the
 * case-study mailing consent. Every visitor sees the same page.
 */
import { BRAND_NAME } from './site.mjs';
import { collectionPath } from './collections.mjs';

export const SOURCE = 'signup_page';
export const TITLE = `Sign up to ${BRAND_NAME} for free`;
export const META_DESCRIPTION =
  'Get free case studies on successful Amazon stores by email, and early access to spy on any Amazon store with your own AI agent.';

/** The FREE skills repo, through the API's tracked redirect (counted as a
 *  ReadmeHit click with readme "signup"). */
export const SKILLS_LINK = 'https://api.waithowmuch.com/go/repo?from=signup';

/** The two offers, each a heading, its explanation and a link, shown above the form,
 *  written as what the visitor gets. */
export const SECTIONS = [
  {
    heading: 'Get FREE case studies on successful Amazon stores',
    lines: [
      'See what a real Amazon brand makes, what it keeps, and who manufactures its products, in one email each time we publish a new breakdown.',
      'No spam. Unsubscribe any time.',
    ],
    link: { text: 'Read our FREE case studies here →', href: collectionPath('all-ideas'), external: false },
  },
  {
    heading: 'Spy on Amazon stores with your own AI agent',
    lines: [
      'Ask your AI agent what any Amazon store sells, earns and spends on ads, using our free skills.',
      'Get early access to one key that replaces a separate subscription for each data provider.',
    ],
    link: { text: 'See our FREE skills here →', href: SKILLS_LINK, external: true },
  },
];

/** Checkbox labels, in the same order as SECTIONS. `link` is the part of the
 *  label that is a link (placed after `before`). */
export const CHOICES = [
  {
    key: 'wantsCaseStudies',
    before: 'Email me FREE case studies on successful Amazon stores',
    link: '',
  },
  {
    key: 'wantsApiAccess',
    before: 'Give me early access to spy on Amazon stores with my AI agent, using your ',
    link: 'FREE skills',
  },
];

export const BUTTON = 'Sign me up';
export const NONE_CHECKED = 'Tick at least one to sign up.';
export const NOTE = 'No password needed: we email you a link to confirm, or continue with Google.';
export const SENT =
  'Check your inbox: if that address can receive mail, your confirmation link is on its way. Open it to finish signing up.';
