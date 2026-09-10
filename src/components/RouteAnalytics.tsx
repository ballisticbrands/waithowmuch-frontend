import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackRouteChange } from "@/lib/track";

/**
 * Counts client-side navigations.
 *
 * Without this the site reports one page view per SESSION rather than per
 * page, because `gtag('config')` and the pixel base code only run on a hard
 * load. On this site that is the difference between knowing which business
 * profiles get read and knowing nothing at all — almost every profile view is
 * an in-app navigation from the index.
 *
 * The "don't double-count the first page" rule lives in `trackRouteChange`,
 * not here: it is really a question about when the LOADERS fired, and this
 * component has no idea when that was.
 *
 * Renders nothing; it exists for the effect.
 */
export function RouteAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackRouteChange(pathname);
  }, [pathname]);
  return null;
}
