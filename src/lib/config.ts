// Build-time configuration. Vite inlines VITE_* into the client bundle.
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL ?? "https://api.waithowmuch.com").replace(/\/$/, ""),

  // Google OAuth Web client ID. Public by design — it ships in the bundle.
  // When empty the sign-in button renders nothing at all, so a missing button
  // here is almost always an empty client ID rather than a bug.
  // 🚨 https://waithowmuch.com must be on this client's Authorized JavaScript
  // origins in the Google Cloud console.
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",

  ga4MeasurementId: "G-0K360RYPPB",
  clarityId: "yfrezqqmrh",
};
