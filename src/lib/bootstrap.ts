import type { BusinessCard, BusinessDetail, FacetCategory, MetricsResponse } from "./api.js";

/**
 * Data the prerender inlined into the page, so the first render does not wait
 * for a network round trip. See the note in postbuild-spa-routes.mjs.
 *
 * Read ONCE and discarded: a client-side navigation to another collection or
 * business must not be served the payload baked in for the landed-on page.
 */
type Bootstrap =
  | { route: "home"; businesses: BusinessCard[] }
  | { route: "ideas"; collection: string; businesses: BusinessCard[]; total: number; categories: FacetCategory[] }
  | {
      route: "business";
      slug: string;
      business: BusinessDetail;
      metrics: MetricsResponse | null;
    };

declare global {
  interface Window {
    __WHM_BOOTSTRAP__?: Bootstrap;
  }
}

function take(): Bootstrap | undefined {
  if (typeof window === "undefined") return undefined;
  const b = window.__WHM_BOOTSTRAP__;
  delete window.__WHM_BOOTSTRAP__;
  return b;
}

// Consumed at module load, before any component mounts — React 18 StrictMode
// double-invokes effects, and a getter that self-destructs on second read
// would hand the second pass `undefined` and flash a spinner.
const initial = take();

/* 🚨 An EMPTY list counts as no bootstrap at all.
 *
 * A build that could not reach the API used to inline `businesses: []`, and
 * the pages below skip their fetch when they have a payload — so the site
 * rendered nothing, fetched nothing, and said nothing. The build now refuses
 * to publish that (postbuild-spa-routes.mjs), and this is the second belt:
 * an empty payload falls through to the API like a cold load. */
export const homeBootstrap = () =>
  initial?.route === "home" && initial.businesses.length > 0 ? initial : undefined;

export const ideasBootstrap = (collection: string) =>
  initial?.route === "ideas" && initial.collection === collection && initial.businesses.length > 0
    ? initial
    : undefined;

export const businessBootstrap = (slug: string) =>
  initial?.route === "business" && initial.slug === slug ? initial : undefined;
