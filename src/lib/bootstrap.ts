import type { BusinessCard, BusinessDetail, CaseStudy, FacetCategory, MetricsResponse } from "./api.js";

/**
 * Data the prerender inlined into the page, so the first render does not wait
 * for a network round trip. See the note in postbuild-spa-routes.mjs.
 *
 * Read ONCE and discarded: a client-side navigation to another collection or
 * business must not be served the payload baked in for the landed-on page.
 */
type Bootstrap =
  | { route: "ideas"; collection: string; businesses: BusinessCard[]; total: number; categories: FacetCategory[] }
  | {
      route: "business";
      slug: string;
      business: BusinessDetail;
      metrics: MetricsResponse | null;
      /* 🚨 Inlined alongside the business, not fetched on mount. The prerender
         writes the headline into the static HTML, so a first render that had
         to wait for /case-studies would hydrate without it — the headline
         would vanish and then reappear, which is worse than not having one. */
      caseStudy?: CaseStudy | null;
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

export const ideasBootstrap = (collection: string) =>
  initial?.route === "ideas" && initial.collection === collection ? initial : undefined;

export const businessBootstrap = (slug: string) =>
  initial?.route === "business" && initial.slug === slug ? initial : undefined;
