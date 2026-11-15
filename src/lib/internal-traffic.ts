/**
 * Internal-traffic opt-out — keeps our own browsing out of analytics.
 *
 * When this returns true NOTHING loads: no GA4, no Clarity, no Meta pixel,
 * no Reddit pixel. Nothing is sent, so nothing needs excluding downstream —
 * which matters, because a GA4 data filter can ONLY be created in the UI
 * (the Admin API exposes no dataFilters resource at v1alpha or v1beta).
 *
 * Three states, in precedence order:
 *
 *   1. `?internal=1`  → opt OUT of analytics, and remember it.
 *   2. `?internal=0`  → opt IN, and remember it. Overrides the host rule
 *                       below, which is how the tracking verifier runs
 *                       against localhost.
 *   3. nothing stored → any host that is not production counts as internal.
 *
 * `?internal=auto` forgets the stored choice and falls back to rule 3.
 *
 * ⚠️ Rule 3 is the one that actually matters. `localhost` was the single
 * largest host in the GA4 property — 191 sessions and 1,290 page views in 60
 * days, more than the real site — because `ga4MeasurementId` is a constant
 * rather than an env var, so `npm run dev` reports into production GA4. A
 * stored flag alone could never have fixed that: localStorage is per ORIGIN,
 * so a flag set on waithowmuch.com does not exist on localhost:5173.
 *
 * ⚠️ Why a stored flag and not GA4's own "Define internal traffic" rule? That
 * rule matches on IP, and a residential IP rotates. When it does the rule
 * silently stops matching and internal sessions rejoin the data with nothing
 * to notice — the failure looks exactly like real traffic arriving. This is
 * independent of the network: wifi, country, tethering and VPNs are all
 * irrelevant to it.
 *
 * ⚠️ The cost of that robustness: localStorage is per browser profile and per
 * origin. Each device and profile that browses the live site needs its own
 * `?internal=1` visit. The URL form (rather than a dev-console one-liner) is
 * what makes that possible on a phone.
 *
 * 🚨 Adding a production hostname? It MUST go in PRODUCTION_HOSTS or that
 * host silently reports nothing. Prefer a redirect to the apex over a second
 * entry here — www currently 301s to the apex, which is why one entry covers
 * both in practice and the second is only belt and braces.
 */

const KEY = "whm_internal";
const PRODUCTION_HOSTS = new Set(["waithowmuch.com", "www.waithowmuch.com"]);

/** localStorage, or undefined where the browser blocks it. Safari private
 *  mode throws on ACCESS, not merely on write, so the guard cannot be a try
 *  around getItem alone. */
function store(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function isProductionHost(): boolean {
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

/**
 * Applies `?internal=…` if present, then reports whether analytics should be
 * skipped for this page view. Called once, before any loader is injected.
 */
export function isInternalTraffic(): boolean {
  const param = new URLSearchParams(window.location.search).get("internal");
  let result: boolean;
  let why: string;

  if (param !== null) {
    const forget = param === "auto";
    const on = !forget && param !== "0" && param !== "false";
    try {
      if (forget) store()?.removeItem(KEY);
      else store()?.setItem(KEY, on ? "1" : "0");
    } catch {
      // Quota, or a blocked store. The answer below is still right for THIS
      // page view; it just will not persist, which is not worth throwing for.
    }
    result = forget ? !isProductionHost() : on;
    why = forget
      ? `?internal=auto — stored choice cleared, following the host rule`
      : `?internal=${param} — saved for this browser`;
  } else {
    const stored = store()?.getItem(KEY);
    if (stored === "1") {
      result = true;
      why = "saved for this browser — ?internal=0 to undo";
    } else if (stored === "0") {
      result = false;
      why = "opted in for this browser";
    } else {
      result = !isProductionHost();
      why = `host "${window.location.hostname}" is not production`;
    }
  }

  // The switch has no UI, so the console line IS the confirmation. Logged on
  // EVERY page load while analytics is off, which is what makes "is it still
  // on?" answerable by opening DevTools rather than by remembering the
  // localStorage key. Real visitors never see it: analytics is on for them
  // and no `?internal=` param is involved, so neither branch fires.
  if (result) console.info(`[whm] analytics DISABLED — ${why}`);
  else if (param !== null) console.info(`[whm] analytics ENABLED — ${why}`);

  return result;
}
