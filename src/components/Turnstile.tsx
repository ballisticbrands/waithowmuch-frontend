import { useEffect, useRef } from "react";
import { config } from "@/lib/config";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, o: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
    __whmTurnstileReady?: Promise<void>;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  // Cached on window so two mounts (StrictMode's double-invoke, or two widgets)
  // don't each append a copy of the script.
  window.__whmTurnstileReady ??= new Promise<void>((res, rej) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error("turnstile failed to load"));
    document.head.appendChild(s);
  });
  return window.__whmTurnstileReady;
}

/**
 * Invisible-managed Turnstile.
 *
 * 🚨 Emits the literal token "skipped" when the site key is empty, and the
 * backend's verifyTurnstile skips when ITS secret is unset — the two ends agree
 * with no test-mode plumbing. That is what makes local dev and preview builds
 * work: localhost is not on the widget's hostname allowlist, so a real
 * challenge there could only ever fail.
 *
 * On a load error it also reports "skipped" rather than blocking: an ad
 * blocker eating challenges.cloudflare.com must not make sign-in impossible.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!config.turnstileSiteKey) {
      cb.current("skipped");
      return;
    }
    let widgetId: string | undefined;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId = window.turnstile.render(ref.current, {
          sitekey: config.turnstileSiteKey,
          callback: (token: string) => cb.current(token),
          "error-callback": () => cb.current("skipped"),
          "expired-callback": () => cb.current(""),
          appearance: "interaction-only",
        });
      })
      .catch(() => cb.current("skipped"));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          /* already gone */
        }
      }
    };
  }, []);

  return <div ref={ref} />;
}
