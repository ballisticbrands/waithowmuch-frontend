/**
 * The one place this app talks to GA4 and the Meta pixel.
 *
 * Nothing else in `src/` should call `gtag` or `fbq` directly. Two reasons
 * that matter here specifically:
 *
 *  1. **Analytics loads late.** `main.tsx` defers both loaders until the page
 *     is idle or the visitor interacts (see the long comment there — it is
 *     worth ~22 points of PSI mobile). So for the first moment of a session
 *     `window.gtag` and `window.fbq` genuinely do not exist, and a direct call
 *     is not a no-op, it is a `TypeError` that takes a React render down with
 *     it. Every call in this file is guarded.
 *  2. **One event, two vendors.** GA4 and Meta name the same moment
 *     differently (`sign_up` / `CompleteRegistration`). Mapping it once here
 *     is what keeps them from drifting apart.
 */

type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
  }
}

/**
 * Flipped by `main.tsx` once the loaders have actually been injected.
 *
 * This exists for route tracking, not for safety. Both loaders fire their own
 * initial page view at inject time, against whatever URL is showing THEN — so
 * a route change before that point is already covered, and firing for it too
 * would double-count the session's first page.
 */
let ready = false;
let lastPath = "";

/**
 * Events fired before the loaders exist, replayed when they arrive.
 *
 * This is not defensive padding — it is load-bearing. Analytics is deferred
 * by up to 2 seconds, and the events that matter most (`view_business` on a
 * profile, `sign_up` on the auth callback) fire from a mount effect that
 * almost always wins that race. Without this buffer they call into
 * `window.gtag === undefined`, no-op, and the page's single most important
 * event is silently never recorded. That failure has no console output and no
 * failed request to notice: the metric is simply always zero.
 *
 * Bounded because an unbounded queue on a page whose loaders never arrive (an
 * ad blocker, a dead network) is just a leak. Twenty is far past anything a
 * real session fires in its first two seconds.
 */
const pending: Array<() => void> = [];
const PENDING_MAX = 20;

function whenReady(fn: () => void): void {
  if (ready) fn();
  else if (pending.length < PENDING_MAX) pending.push(fn);
}

export function markAnalyticsReady(): void {
  ready = true;
  // The loaders just counted this path. Record it so the router's first
  // notification for the same path is recognised as a duplicate.
  lastPath = window.location.pathname;
  // Ordering is preserved: these ran before anything the app fires next.
  while (pending.length) pending.shift()!();
}

/** GA4 event. Buffered until gtag exists, then replayed. */
export function gaEvent(name: string, params: Params = {}): void {
  whenReady(() => window.gtag?.("event", name, params));
}

/**
 * Meta STANDARD event — `fbq('track', …)`.
 *
 * 🚨 Never reach for `trackCustom` on a name from Meta's standard list. It is
 * accepted, it looks identical in Test Events, and it quietly forfeits both
 * the optimisation priors Meta has for that event and its AEM slot. A sibling
 * repo shipped `trackCustom('CompleteRegistration')` and carried the bug into
 * every product that forked it.
 */
export function metaStandard(name: string, params: Params = {}): void {
  whenReady(() => window.fbq?.("track", name, params));
}

/** Meta event that is genuinely ours and not on Meta's standard list. */
export function metaCustom(name: string, params: Params = {}): void {
  whenReady(() => window.fbq?.("trackCustom", name, params));
}

/**
 * A client-side navigation.
 *
 * `gtag('config')` and the pixel's base code only fire on a hard load, so
 * without this every in-app navigation on a single-page app is uncounted —
 * which on this site is nearly all of them, since the profile pages are
 * reached from the index.
 *
 * ⚠️ Known and accepted gap: a navigation made before analytics loads is not
 * counted as a second page view. The loader's own initial view lands on
 * whatever page the visitor is on at that point, so the session and its
 * landing page are still recorded — only the intermediate hop is lost.
 */
export function trackRouteChange(path: string): void {
  // Deliberately NOT buffered, unlike every other event here. A navigation
  // before the loaders exist is already accounted for: they fire their own
  // page view against whatever URL is current when they load, which is the
  // page the visitor navigated TO. Buffering would replay it as a second one.
  if (!ready) return;
  if (path === lastPath) return;
  lastPath = path;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  // Meta's SPA equivalent. 'PageView' is standard, so `track`, not `trackCustom`.
  metaStandard("PageView");
}

/**
 * A visitor reached a business profile — the one thing this site is for, and
 * so the only engagement signal worth a named event.
 *
 * `ViewContent` is a Meta standard event and the natural retargeting seed:
 * "people who read a profile" is the audience any future campaign would want.
 */
export function trackBusinessView(slug: string, name?: string): void {
  gaEvent("view_business", { business_slug: slug, business_name: name });
  metaStandard("ViewContent", {
    content_type: "business",
    content_ids: [slug],
    content_name: name,
  });
}

/**
 * A NEW account. Fired once per user, ever — `isNew` comes from the API,
 * which is the only place that actually knows.
 *
 * 🚨 Do not also fire this on the login screen "because the user got a
 * session". Every returning sign-in issues a session too, and counting those
 * as registrations is the single most common way this metric gets inflated.
 */
export function trackSignUp(method: "google" | "magic_link"): void {
  gaEvent("sign_up", { method });
  metaStandard("CompleteRegistration", { registration_method: method });
}

/** A returning sign-in. Deliberately NOT a Meta event — it optimises nothing. */
export function trackLogin(method: "google" | "magic_link"): void {
  gaEvent("login", { method });
}
