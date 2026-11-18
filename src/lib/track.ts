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

/** The campaign behind a signup, as the API returns it with `isNew`. */
export type SignupTouch = {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
};

/** The /signup checkboxes, as the API returns them with `isNew` (read from
 *  the User row; NULL for a signup that never saw them). */
export type SignupChoicesFromApi = {
  wantsApiAccess?: boolean | null;
  wantsCaseStudies?: boolean | null;
};

const yesNo = (v: boolean | null | undefined) => (v == null ? undefined : v ? "yes" : "no");

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    rdt?: ((...args: unknown[]) => void) & { sendEvent?: unknown; callQueue?: unknown[] };
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
 * Reddit pixel event — `rdt('track', …)`.
 *
 * Reddit's standard names: PageVisit, ViewContent, Search, AddToCart,
 * AddToWishlist, Purchase, Lead, SignUp. Only PageVisit, Lead, SignUp,
 * AddToCart and Purchase can be optimisation goals; ViewContent is audience
 * and reporting only.
 *
 * Pass `conversionId` on anything that is ALSO sent server-side: it is the key
 * Reddit uses to merge the two copies. Reusing one id across different events
 * marks all of them as duplicates, so it must be unique per event.
 */
export function redditEvent(name: string, params: Params = {}): void {
  whenReady(() => window.rdt?.("track", name, params));
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
  // Reddit's base code only counts a hard load, exactly like Meta's.
  window.rdt?.("track", "PageVisit");
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
  redditEvent("ViewContent");
}

/**
 * A click on a signup call-to-action — the step between reading and
 * `sign_up`, and the only way to see how many readers are offered the
 * signup and decline. Same name every Dragon product uses for this.
 */
export function trackCtaClick(location: string, target = "/signup"): void {
  gaEvent("cta_click", { cta_location: location, cta_target: target });
}

/**
 * A NEW account. Fired once per user, ever — `isNew` comes from the API,
 * which is the only place that actually knows.
 *
 * 🚨 Do not also fire this on the login screen "because the user got a
 * session". Every returning sign-in issues a session too, and counting those
 * as registrations is the single most common way this metric gets inflated.
 */
export function trackSignUp(
  method: "google" | "magic_link",
  intent?: {
    source: string;
    choices?: { wantsApiAccess: boolean; wantsCaseStudies: boolean };
    choicesChanged?: boolean;
  } | null,
  userId?: string,
  touch?: SignupTouch | null,
  choices?: SignupChoicesFromApi | null,
): void {
  // Where the signup started: the /signup page or the sign-in page. Registered
  // as a GA4 custom dimension, so it is reportable.
  //
  // `touch` is the campaign that brought this person, read back from the User
  // row by the API (last touch, else first). It comes from the server, not
  // from this browser, because a magic link is often opened in another
  // browser — and even in the same one, the email click starts a new GA4
  // session whose own source is the mail client, not the campaign. The three
  // `signup_utm_*` params are registered as event-scoped custom dimensions.
  gaEvent("sign_up", {
    method,
    signup_source: intent?.source,
    signup_utm_source: touch?.utmSource ?? undefined,
    signup_utm_campaign: touch?.utmCampaign ?? undefined,
    signup_utm_content: touch?.utmContent ?? undefined,
    // The two /signup checkboxes, "yes"/"no" (absent off /signup). The API's
    // copy (from the User row) wins over this browser's, for the same reason
    // as touch. `signup_choices_changed` is whether the visitor toggled a box
    // at all: only this browser knows, so it is absent when the link was
    // opened elsewhere. All three are event-scoped custom dimensions.
    signup_wants_api: yesNo(choices?.wantsApiAccess ?? intent?.choices?.wantsApiAccess),
    signup_wants_case_studies: yesNo(choices?.wantsCaseStudies ?? intent?.choices?.wantsCaseStudies),
    signup_choices_changed: yesNo(intent?.choicesChanged),
  });
  metaStandard("CompleteRegistration", { registration_method: method });
  // The backend sends the same event server-side (it is the only copy that
  // survives a magic link opened in another browser). `signup:<userId>` is the
  // shared key that stops Reddit counting one account twice.
  redditEvent("SignUp", userId ? { conversionId: `signup:${userId}` } : {});
}

/** A returning sign-in. Deliberately NOT a Meta event — it optimises nothing. */
export function trackLogin(method: "google" | "magic_link"): void {
  gaEvent("login", { method });
}
