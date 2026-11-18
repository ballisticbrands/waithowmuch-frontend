/**
 * First-touch attribution, captured on the FIRST page a visitor lands on and
 * kept until they sign up.
 *
 * First-touch, not last: the whole question this answers is "which Reel /
 * subreddit / search brought this person", and by the time they sign up they
 * are on an internal navigation whose referrer is our own domain.
 *
 * localStorage rather than a cookie: this app is a single origin with no
 * cross-subdomain hop to survive, so a cookie would buy nothing and cost a
 * domain-scoping bug of the kind that silently voided attribution on a
 * sibling repo.
 */
const KEY = "whm_attribution_v1";
/**
 * Last touch: the UTMs of the most recent hard load that carried any. Kept
 * beside first touch, not instead of it, because first touch alone hides a
 * returning visitor's reason for signing up: someone who found us by search
 * last month and signs up from the skills repo README today would otherwise
 * be recorded as search, and the README link would never be credited.
 */
const LAST_KEY = "whm_last_touch_v1";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const camel = (f: string) => f.replace(/_(.)/g, (_, c: string) => c.toUpperCase());

const FIELDS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "fbclid",
  // Reddit appends this to every ad click. The pixel reads it itself, but the
  // server-side event can only carry it if WE store it — and a magic link is
  // often opened in a different browser, where the pixel has no click at all.
  "rdt_cid",
] as const;

export type Attribution = Partial<Record<string, string>>;

export function captureAttribution(): void {
  captureLastTouch();
  try {
    if (localStorage.getItem(KEY)) return; // first touch already recorded
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) {
        // camelCase to match the API's field names.
        data[camel(f)] = v.slice(0, 255);
      }
    }
    // Referrer only when it is genuinely external — our own pages are noise.
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      data.referrer = document.referrer.slice(0, 1024);
    }
    data.landingPage = window.location.href.slice(0, 1024);
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode / blocked storage — attribution is best-effort, never fatal */
  }
}

/** Overwritten by every load whose URL has a utm_*; a load without one leaves it alone. */
function captureLastTouch(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const f of UTM) {
      const v = params.get(f);
      // lastUtmSource, lastUtmCampaign, … — the API's field names.
      if (v) data[camel(`last_${f}`)] = v.slice(0, 255);
    }
    if (Object.keys(data).length) localStorage.setItem(LAST_KEY, JSON.stringify(data));
  } catch {
    /* best-effort, as above */
  }
}

/** First touch plus last touch, in the shape the API's `attribution` takes. */
export function readAttribution(): Attribution {
  try {
    return {
      ...(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Attribution),
      ...(JSON.parse(localStorage.getItem(LAST_KEY) ?? "{}") as Attribution),
    };
  } catch {
    return {};
  }
}
