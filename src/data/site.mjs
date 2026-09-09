/* Build-script twin of src/data/site.ts. Kept in sync by
 * scripts/check-site-constants.mjs, which fails the build on drift. */
export const SITE = 'https://waithowmuch.com';
export const API_BASE = 'https://api.waithowmuch.com';
export const BRAND_NAME = 'WaitHowMuch';

export function businessPath(slug) {
  return `/business/${slug}/`;
}
