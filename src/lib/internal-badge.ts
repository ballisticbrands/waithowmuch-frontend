/**
 * The "analytics off" badge — a small fixed pill shown ONLY to browsers that
 * are excluded from analytics. Real visitors never reach this module: it is
 * called from the one branch in main.tsx that runs when isInternalTraffic()
 * is true, so for everyone else it is dead code that never executes.
 *
 * ⚠️ Styles are inline rather than in globals.css on purpose. That stylesheet
 * is INLINED into every prerendered page and already measures 118KB, past the
 * point the build's own guard says inlining pays. Shipping rules for a badge
 * that 99% of visitors can never see would make every real visitor pay for
 * it. Here, the cost lands only on the browsers that render it.
 *
 * ⚠️ It is also why this is plain DOM and not a React component: it attaches
 * to <body>, outside #root, so it cannot interact with the createRoot call
 * that REPLACES #root's prerendered children (see main.tsx), and it survives
 * client-side navigation without the router knowing about it.
 */

const ID = "whm-internal-badge";

/** Pointer-events stay on the button alone so the pill never swallows a click
 *  meant for the page behind it. */
const WRAP_STYLE: Partial<CSSStyleDeclaration> = {
  position: "fixed",
  // Right, not left: the desktop layout has a fixed sidebar down the left and
  // the pill landed on top of its nav links, which is the one place a status
  // indicator must never sit. The bottom-right corner is unused at every
  // breakpoint.
  right: "max(0.75rem, env(safe-area-inset-right))",
  bottom: "max(0.75rem, env(safe-area-inset-bottom))",
  zIndex: "70", // above the infotip (60), the highest the app itself uses
  pointerEvents: "none",
};

const PILL_STYLE: Partial<CSSStyleDeclaration> = {
  pointerEvents: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4em",
  margin: "0",
  padding: "0.3em 0.65em",
  border: "1px solid #d2d2de",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(6px)",
  color: "#5f6072",
  font: "500 11px/1.4 ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  letterSpacing: "0.01em",
  cursor: "pointer",
  opacity: "0.55",
  boxShadow: "0 1px 2px rgba(20,20,27,0.06)",
};

/** Shows the badge. Idempotent — a second call is a no-op, so it is safe if
 *  the analytics entry point is ever reached twice. */
export function showInternalBadge(): void {
  if (document.getElementById(ID)) return;

  const wrap = document.createElement("div");
  wrap.id = ID;
  Object.assign(wrap.style, WRAP_STYLE);

  const pill = document.createElement("button");
  pill.type = "button";
  Object.assign(pill.style, PILL_STYLE);
  pill.title =
    "Analytics is disabled for this browser, so your visits are not counted. " +
    "Click to turn it back on (?internal=0).";
  pill.setAttribute("aria-label", "Analytics disabled for this browser. Activate to re-enable.");

  const dot = document.createElement("span");
  Object.assign(dot.style, {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#b42318",
    flex: "0 0 auto",
  } satisfies Partial<CSSStyleDeclaration>);

  const label = document.createElement("span");
  label.textContent = "analytics off";

  // Faint until looked at, so it reads as a status light rather than a banner.
  // This file is excluded from Tailwind's content globs (see
  // tailwind.config.js) precisely so CSS property names here cannot be
  // mistaken for utility class names and emitted into globals.css.
  const motionOK = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (motionOK) pill.style.transition = "opacity 120ms ease";

  const up = () => { pill.style.opacity = "1"; };
  const down = () => { pill.style.opacity = "0.55"; };
  pill.addEventListener("pointerenter", up);
  pill.addEventListener("pointerleave", down);
  pill.addEventListener("focus", up);
  pill.addEventListener("blur", down);

  // Re-enable. A full navigation, not a history push: the loaders only run on
  // a hard load (see main.tsx), so an SPA-style URL swap would clear the flag
  // and still leave the page untracked until the next reload — which looks
  // exactly like the button not working.
  pill.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("internal", "0");
    window.location.href = url.toString();
  });

  pill.append(dot, label);
  wrap.append(pill);

  // Never in a print-out or a screenshot-for-docs.
  const style = document.createElement("style");
  style.textContent = `@media print{#${ID}{display:none!important}}`;

  document.head.append(style);
  document.body.append(wrap);
}
