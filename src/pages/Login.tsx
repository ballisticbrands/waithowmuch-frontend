import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch, ApiError } from "@/lib/api";
import { readAttribution } from "@/lib/attribution";
import { setSession, type SessionUser } from "@/lib/session";
import { trackSignUp, trackLogin } from "@/lib/track";
import { intentFromUrl, intentFields, saveIntent, takeIntent } from "@/lib/signup-intent";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Turnstile } from "@/components/Turnstile";
import { BRAND_NAME } from "@/data/site";

type Mode = "signup" | "login";

/* The two pages are one form — both routes create an account for a new
   address and sign in an existing one, because a magic link cannot tell the
   difference until it is opened. Only the words change, so the reader who
   asked for case-study emails is not greeted with "Sign in". */
const COPY: Record<Mode, {
  title: string; lede: string; button: string; sent: string; google: "signup_with" | "signin_with";
  switch?: { text: string; link: string; to: string };
}> = {
  signup: {
    title: "Get emails on new case studies",
    lede: "One email when a new case study is published. No spam, and you can unsubscribe any time.",
    button: "Confirm my email",
    sent: "If that address can receive mail, a confirmation link is on its way. Open it to start getting case studies.",
    google: "signup_with",
  },
  login: {
    title: "Sign in",
    lede: "Welcome back. No password — we email you a one-time link.",
    button: "Email me a sign-in link",
    sent: "If that address can receive mail, a sign-in link is on its way.",
    google: "signin_with",
    switch: { text: "New here?", link: "Get emails on new case studies", to: "/signup" },
  },
};

function AuthPage({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const copy = COPY[mode];
  const intent = useMemo(() => intentFromUrl(mode, params), [mode, params]);
  // Carried across the switch link, so `next` survives a change of mind.
  const qs = params.toString();

  useEffect(() => {
    document.title = `${copy.title} — ${BRAND_NAME}`;
  }, [copy.title]);

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      // Saved before the request: the link is opened in another page load,
      // and the callback reads this back to label the event and redirect.
      saveIntent(intent);
      await apiFetch("/v1/auth/magic-link", {
        method: "POST",
        body: JSON.stringify({
          email, turnstileToken,
          attribution: { ...readAttribution(), ...intentFields(intent) },
        }),
      });
      // The API answers 202 whether or not the address has an account, so this
      // screen must too — anything conditional here would leak exactly what
      // the constant-response endpoint is protecting.
      setSent(true);
    } catch {
      setError("Could not send the link. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle(credential: string) {
    setError(null);
    try {
      const r = await apiFetch<{ token: string; user: SessionUser; isNew?: boolean }>("/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential, attribution: { ...readAttribution(), ...intentFields(intent) } }),
      });
      setSession(r.token, r.user);
      // Google finishes on this page, so a link-request intent saved earlier
      // in the session is stale — clear it.
      takeIntent();
      // `isNew` is the server's answer, not a guess from "we just got a
      // session" — every returning sign-in produces one of those too.
      if (r.isNew) trackSignUp("google", intent);
      else trackLogin("google");
      navigate(intent.next ?? "/");
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === "google_signin_unconfigured"
          ? "Google sign-in is not configured yet."
          : "Google sign-in failed.",
      );
    }
  }

  return (
    <main data-main>
    <div style={{ maxWidth: "22rem", margin: "2rem auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{copy.title}</h1>
      <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem", fontSize: "0.875rem" }}>
        {copy.lede}
      </p>

      {sent ? (
        <div data-empty style={{ marginTop: "1.5rem" }}>
          <p>{copy.sent}</p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem" }}>It expires in 20 minutes and works once.</p>
        </div>
      ) : (
        <form onSubmit={requestLink} style={{ marginTop: "1.5rem" }}>
          <label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: 550 }}>Email</label>
          <input
            id="email" data-input type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" style={{ marginTop: "0.375rem" }}
          />
          <div style={{ marginTop: "0.75rem" }}>
            <Turnstile onToken={setTurnstileToken} />
          </div>
          {/* Disabled until the challenge reports back — an empty token is a
              guaranteed rejection, and a button that silently does nothing
              reads as the site being broken. */}
          <button data-btn type="submit" disabled={busy || !email || turnstileToken === null}
                  style={{ width: "100%", marginTop: "0.75rem" }}>
            {busy ? "Sending…" : copy.button}
          </button>
        </form>
      )}

      {error && <p style={{ color: "var(--destructive, #b42318)", fontSize: "0.875rem", marginTop: "0.75rem" }}>{error}</p>}

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
        <GoogleSignIn onCredential={onGoogle} text={copy.google} />
      </div>

      {copy.switch && (
        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {copy.switch.text}{" "}
          <Link to={`${copy.switch.to}${qs ? `?${qs}` : ""}`}>{copy.switch.link}</Link>
        </p>
      )}
    </div>
    </main>
  );
}

export default function Login() {
  return <AuthPage mode="login" />;
}

export function Signup() {
  return <AuthPage mode="signup" />;
}
