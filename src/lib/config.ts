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
};
