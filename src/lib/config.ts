// Build-time configuration. Vite inlines VITE_* into the client bundle.
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL ?? "https://api.waithowmuch.com").replace(/\/$/, ""),

  // Google OAuth Web client ID. Public by design — it ships in the bundle.
  // When empty the sign-in button renders nothing at all, so a missing button
  // here is almost always an empty client ID rather than a bug.
  // 🚨 https://waithowmuch.com must be on this client's Authorized JavaScript
  // origins in the Google Cloud console.
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",

  // Cloudflare Turnstile public site key — NOT a secret (site keys are served
  // to browsers in plaintext; only the paired secret, which lives on the
  // backend, is sensitive). Shared widget: waithowmuch.com is on its hostname
  // allowlist in the Cloudflare dashboard.
  //
  // Deliberately NOT defaulted to the real key: an empty value here is what
  // makes local dev and preview builds skip the challenge, and localhost is
  // not allowlisted.
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "",

  ga4MeasurementId: "G-0K360RYPPB",
  clarityId: "yfrezqqmrh",

  // Meta dataset ("WaitHowMuch website") in the Dragon Suite portfolio.
  // Organic only — there is no ad account spend behind this and no CAPI. It
  // is here so the audience and the events exist if that ever changes, which
  // is not something you can backfill.
  //
  // 🔍 Sanity-check any pixel ID before trusting it: a wrong-but-valid ID
  // sends every event to someone else's dataset and nothing anywhere errors.
  //   curl -s https://connect.facebook.net/signals/config/<ID> | wc -c
  // A real ID returns ~300KB of config; a bogus one ~30KB. This one measured
  // 316,245 bytes on 2026-09-10.
  metaPixelId: "1079875758342522",
};
