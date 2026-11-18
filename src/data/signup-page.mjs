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

export const SOURCE = 'signup_page';
export const TITLE = `Sign up to ${BRAND_NAME}`;
export const META_DESCRIPTION =
  `Sign up for early access to the ${BRAND_NAME} API for the free Claude Code skills, and an email when ${BRAND_NAME} publishes a new case study.`;

/** The FREE skills repo, through the API's tracked redirect (counted as a
 *  ReadmeHit click with readme "signup"). */
export const SKILLS_LINK = 'https://api.waithowmuch.com/go/repo?from=signup';

/** The two offers, each a heading with its explanation, shown above the form. */
export const SECTIONS = [
  {
    heading: `Early access to the ${BRAND_NAME} API`,
    lines: [
      `One ${BRAND_NAME} key for the Claude Code skills, in place of a separate key for each data provider.`,
      'Keys are not issued yet: sign up for early access.',
    ],
  },
  {
    heading: `Free ${BRAND_NAME} case studies`,
    lines: [
      'One email when a new Amazon brand breakdown is published: revenue, profit, suppliers.',
      'No spam, and you can unsubscribe any time.',
    ],
  },
];

/** Checkbox labels. `link` is the part of the label that is a link. */
export const CHOICES = [
  {
    key: 'wantsApiAccess',
    before: `Get early access to ${BRAND_NAME} API to use with our `,
    link: 'FREE skills',
  },
  {
    key: 'wantsCaseStudies',
    before: `Get notified on new ${BRAND_NAME} case studies - FREE`,
    link: '',
  },
];

export const BUTTON = 'Sign up';
export const NONE_CHECKED = 'Tick at least one to sign up.';
export const NOTE = 'No password: we email you a link to confirm your address, or continue with Google.';
export const SENT =
  'If that address can receive mail, a confirmation link is on its way. Open it to finish signing up.';
