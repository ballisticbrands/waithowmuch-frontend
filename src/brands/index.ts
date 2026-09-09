// Single-brand registry for waithowmuch-frontend.
//
// This repo builds the whole of WaitHowMuch on waithowmuch.com —
// the app AND the public seller profiles. There is no separate app host.
// The BrandConfig type is owned by @ballisticbrands/frontend-shared.

import { WAITHOWMUCH } from "./waithowmuch";

export type { BrandConfig } from "@ballisticbrands/frontend-shared";
export { WAITHOWMUCH };
export { META_PIXEL_ID } from "./waithowmuch";

/** The one brand this repo builds. */
export function activeBrand() {
  return WAITHOWMUCH;
}
