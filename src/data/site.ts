/** Public identity of the site. One place, so the client route, the build-time
 *  prerender and the sitemap can never disagree about a URL's shape.
 *  🚨 Twin of src/data/site.mjs — scripts/check-site-constants.mjs fails the
 *  build if they drift. */
export const SITE = "https://waithowmuch.com";
export const API_BASE = "https://api.waithowmuch.com";
export const BRAND_NAME = "WaitHowMuch";

/** One business's public URL path. Trailing slash: the prerender writes these
 *  as directories, so the unslashed form 301s. Canonical, og:url and the
 *  sitemap all use this shape. */
export function businessPath(slug: string): string {
  return `/business/${slug}/`;
}
