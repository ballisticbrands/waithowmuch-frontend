import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { config } from "./lib/config";
import { captureAttribution } from "./lib/attribution";
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

injectGa4(config.ga4MeasurementId);
injectClarity(config.clarityId);

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
