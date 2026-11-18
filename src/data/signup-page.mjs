/**
 * The words on /signup/, as plain data: one source for the page
 * (src/pages/Login.tsx) and the prerender (scripts/postbuild-spa-routes.mjs),
 * so the crawler-visible copy cannot drift from what a visitor sees.
 *
 * Two interests, given equal weight: the case-study emails, and early access
 * to the WaitHowMuch API for the Claude Code skills (keys are not issued yet).
 * Every visitor sees the same page whatever the UTMs; each column has its own
 * action and `source`, which is the User row's signupSource and the
 * `signup_source` param on GA4's sign_up.
 */
import { BRAND_NAME } from './site.mjs';

export const TITLE = `Sign up to ${BRAND_NAME}`;
export const META_DESCRIPTION =
  `Get an email when ${BRAND_NAME} publishes a new case study, or early access to the ${BRAND_NAME} API for the Claude Code skills.`;

export const COLUMNS = [
  {
    source: 'signup_page_case_studies',
    heading: `Get notified on new ${BRAND_NAME} case studies`,
    lines: [
      'One email when a new Amazon brand breakdown is published: revenue, profit, suppliers.',
      'No spam, and you can unsubscribe any time.',
    ],
    button: 'Notify me',
  },
  {
    source: 'signup_page_api',
    heading: `Early access to the ${BRAND_NAME} API`,
    lines: [
      `One ${BRAND_NAME} key for the Claude Code skills, in place of a separate key for each data provider.`,
      'Keys are not issued yet: sign up for early access.',
    ],
    button: 'Get early access',
  },
];

/** Under both columns. */
export const NOTE = 'No password: we email you a link to confirm your address, or continue with Google.';
export const SENT =
  'If that address can receive mail, a confirmation link is on its way. Open it to finish signing up.';
