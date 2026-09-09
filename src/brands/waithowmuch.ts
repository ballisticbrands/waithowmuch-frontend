import type { BrandConfig } from "@ballisticbrands/frontend-shared";

/**
 * WaitHowMuch brand config.
 *
 * ⚠️ This product is deliberately NOT Dragon-branded. No Forest/Lime palette,
 * no pixel dragon, no "get" prefix — BRANDING.md does not apply here. Real
 * branding is still outstanding; everything visual in this repo is placeholder.
 */
export const WAITHOWMUCH: BrandConfig = {
  id: "waithowmuch",
  // ONE ORIGIN. The app and the public profiles share the apex — there is
  // no app.* host, and no landing page. appOrigin is what the shared
  // library builds auth redirects and OAuth popup targets from, so a stale
  // subdomain here would bounce users to a host that no longer exists.
  appHost: "waithowmuch.com",
  appOrigin: "https://waithowmuch.com",
  headerLabel: "WaitHowMuch",
  displayName: "WaitHowMuch",
  metaDescription:
    "Real revenue and profit numbers for businesses you have never heard of. Researched from public data, not self-reported.",
  supportEmail: "hello@waithowmuch.com",
  // GA4 property 553461549 "WaitHowMuch" — its own property, created
  // 2026-09-10 over the Admin API. Stream 15749149975.
  ga4MeasurementId: "G-0K360RYPPB",
  // ⛔ No Clarity project yet — Clarity has no creation API, so this waits
  // on a console step. injectClarity() no-ops on an empty string, so the
  // app is correct meanwhile; fill this in and redeploy.
  clarityId: "",
  // Same postMessage namespace as every other brand — the backend sends this
  // type regardless of tenant.
  oauthMessageType: "dragonbot-oauth-result",
};

/**
 * Meta Pixel (dataset) ID for WaitHowMuch — its own dataset, never a
 * Dragon one. Two products in one dataset are inseparable, because they run
 * the same shared code firing identical event names.
 *
 * Dataset 4044834252476491 ("WaitHowMuch website"), owned by the Dragon
 * Suite portfolio (1843062053072002).
 *
 * Deliberately NOT a BrandConfig field: that type is owned by
 * @ballisticbrands/frontend-shared and has no `metaPixelId`, so adding one
 * would mean publishing the shared package and bumping every sibling repo.
 *
 * Why this has to exist at all: the shared lib's Meta calls are guarded by
 * `typeof window.fbq === "function"`. With no base snippet loaded, every Meta
 * event here silently no-ops — no error, just nothing. Creating the dataset in
 * Business Manager is NOT enough on its own.
 */
export const META_PIXEL_ID = "";
