import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { config } from "./lib/config";
import { captureAttribution } from "./lib/attribution";
import { markAnalyticsReady } from "./lib/track";
import "./globals.css";

captureAttribution();

function injectGa4(measurementId: string): void {
  if (!measurementId) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(s);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer = (window as any).dataLayer || [];
  // 🚨 gtag.js only processes the `arguments` OBJECT pushed to dataLayer.
  // Pushing a rest-param ARRAY is silently ignored, so gtag('config') and
  // every gtag('event') no-op and NO hits are ever sent — not even page_view.
  // That exact bug zeroed a sibling app's GA4 for ~10 days with nothing in the
  // console. Do not "modernise" this to a rest param.
  const gtag: (...args: unknown[]) => void = function () {
    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-explicit-any
    (window as any).dataLayer.push(arguments);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId);
}

function injectClarity(projectId: string): void {
  if (!projectId) return;
  ((c, l, a, r, i) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c as any)[a] = (c as any)[a] || function () {
      // Clarity's queue, like gtag's, expects the arguments object.
      // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-explicit-any
      ((c as any)[a].q = (c as any)[a].q || []).push(arguments);
    };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = `https://www.clarity.ms/tag/${i}`;
    const y = l.getElementsByTagName(r)[0]!;
    y.parentNode!.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
}

function injectMetaPixel(pixelId: string): void {
  if (!pixelId) return;
  // Meta's base snippet, transcribed. The shape is load-bearing: `fbq` must
  // exist as a QUEUEING stub the moment this runs, because the `init` and
  // `track` calls below happen before fbevents.js has downloaded, and the
  // real implementation drains `fbq.queue` when it arrives.
  const w = window as unknown as {
    fbq?: unknown; _fbq?: unknown;
  };
  if (w.fbq) return; // already installed — never init twice, it double-counts
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  w.fbq = fbq;
  w._fbq = fbq;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  fbq("init", pixelId);
  fbq("track", "PageView");
}

/**
 * Analytics loads AFTER the page is interactive, never during mount.
 *
 * Measured on /data/ (PSI mobile, 5 consistent runs): gtag.js alone cost 824ms
 * of bootup and two long tasks of 474ms and 291ms, with Clarity adding 249ms —
 * about 1.07s of script evaluation against 333ms for this app's entire bundle.
 * That is what took the page from 100 to 78. None of it is needed before the
 * visitor can read or click anything.
 *
 * ⚠️ The trade-off is real and deliberate: a visitor who leaves within the
 * first moment may go uncounted, so session counts skew very slightly low.
 * `requestIdleCallback` with a 2s ceiling plus a first-interaction trigger
 * keeps that window small — anyone who scrolls, taps or types is measured
 * immediately. If you would rather have the last fraction of a percent of
 * sessions than the performance, move these calls back up here.
 *
 * ⚠️ The Meta pixel joined these on 2026-09-10 and is deferred on the SAME
 * terms — fbevents.js is another ~70KB of third-party script and would undo
 * the fix on its own. It is NOT in `index.html`, unlike the sibling LP repos,
 * precisely because of that. The one Meta tag that DOES belong in the static
 * head is the domain-verification meta tag, which is inert markup.
 */
function startAnalytics(): void {
  let started = false;
  const go = () => {
    if (started) return;
    started = true;
    injectGa4(config.ga4MeasurementId);
    injectClarity(config.clarityId);
    injectMetaPixel(config.metaPixelId);
    // Each loader above has now counted the CURRENT url. Tell the route
    // tracker so it treats that page as already reported and starts counting
    // from the next navigation instead of double-counting this one.
    markAnalyticsReady();
  };

  // Whichever comes first: the browser going idle, a 2s ceiling, or the
  // visitor actually doing something.
  const opts = { once: true, passive: true } as const;
  for (const evt of ["pointerdown", "keydown", "scroll"] as const) {
    window.addEventListener(evt, go, opts);
  }
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
  }).requestIdleCallback;
  // Safari has no requestIdleCallback, so the timeout is the real path there.
  if (ric) ric(go, { timeout: 2000 });
  else setTimeout(go, 2000);
}

if (document.readyState === "complete") startAnalytics();
else window.addEventListener("load", startAnalytics, { once: true });

const root = document.getElementById("root")!;

// 🚨 createRoot (which REPLACES #root's children), not hydrateRoot.
//
// The prerender writes hand-authored SEO markup — a heading, the summary, the
// headline figures — which is deliberately NOT what React renders. hydrateRoot
// against markup that does not match throws a hydration mismatch, and React 18
// then silently re-renders the whole tree client-side anyway, so you pay the
// cost and get console errors for it.
//
// The known tradeoff: replacing causes a repaint, and on a sibling repo an
// unbounded version of that measured CLS 0.377. It is contained here because
// the prerendered block is short and sits in the same place as the real
// heading. The real fix, if CLS shows up in PSI, is to prerender by rendering
// the ACTUAL React tree with puppeteer (as the LP repos do) — then the markup
// matches and this can become hydrateRoot. Do not flip it before then.
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
