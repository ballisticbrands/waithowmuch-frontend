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

const FIELDS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "fbclid",
] as const;

export type Attribution = Partial<Record<string, string>>;

export function captureAttribution(): void {
  try {
    if (localStorage.getItem(KEY)) return; // first touch already recorded
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) {
        // camelCase to match the API's field names.
        data[f.replace(/_(.)/g, (_, c: string) => c.toUpperCase())] = v.slice(0, 255);
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

export function readAttribution(): Attribution {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
