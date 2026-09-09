import type { BusinessCard, BusinessDetail, CategoryRef, MetricPoint } from "./api.js";

/**
 * Data the prerender inlined into the page, so the first render does not have
 * to wait for a network round trip. See the note in postbuild-spa-routes.mjs.
 *
 * Read ONCE and then discarded: a client-side navigation to a different
 * business must not be served the payload baked in for the page the visitor
 * originally landed on.
 */
type Bootstrap =
  | { route: "home"; businesses: BusinessCard[]; categories: Array<CategoryRef & { businessCount: number }> }
  | { route: "business"; slug: string; business: BusinessDetail; metrics: MetricPoint[] };

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

export const homeBootstrap = initial?.route === "home" ? initial : undefined;

export const businessBootstrap = (slug: string) =>
  initial?.route === "business" && initial.slug === slug ? initial : undefined;
