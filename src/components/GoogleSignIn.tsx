import { useEffect, useRef } from "react";
import { config } from "@/lib/config";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (o: { client_id: string; callback: (r: { credential: string }) => void }) => void;
          renderButton: (el: HTMLElement, o: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const SRC = "https://accounts.google.com/gsi/client";

function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
  if (existing) {
    return new Promise((res) => existing.addEventListener("load", () => res(), { once: true }));
  }
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error("gsi failed to load"));
    document.head.appendChild(s);
  });
}

/**
 * Renders nothing when the client ID is empty — which is the correct
 * behaviour for local dev and preview builds, where `localhost` is not on the
 * client's Authorized JavaScript origins and the button would only ever fail.
 *
 * 🚨 Loaded on demand rather than from index.html. The GSI script is ~90KB and
 * blocks nothing on any page except this one; putting it in the document head
 * would put it on the critical path of the profile pages that actually get the
 * traffic.
 */
export function GoogleSignIn({ onCredential }: { onCredential: (credential: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Kept in a ref so re-renders don't re-initialise GSI with a stale closure.
  const cb = useRef(onCredential);
  cb.current = onCredential;

  useEffect(() => {
    if (!config.googleClientId || !ref.current) return;
    let cancelled = false;
    loadGsi()
      .then(() => {
        if (cancelled || !ref.current || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: config.googleClientId,
          callback: (r) => cb.current(r.credential),
        });
        window.google.accounts.id.renderButton(ref.current, {
          theme: "outline", size: "large", width: 320, text: "continue_with",
        });
      })
      .catch(() => {
        /* An ad blocker eating the GSI script must not break magic-link
           sign-in, which is right below it on the page. */
      });
    return () => { cancelled = true; };
  }, []);

  if (!config.googleClientId) return null;
  return <div ref={ref} style={{ minHeight: 44 }} />;
}
