import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch, ApiError } from "@/lib/api";
import { readAttribution } from "@/lib/attribution";
import { setSession, type SessionUser } from "@/lib/session";
import { trackSignUp, trackLogin, type SignupTouch } from "@/lib/track";
import {
  intentFromUrl, intentFields, saveIntent, takeIntent,
  type SignupIntent, type SignupSource,
} from "@/lib/signup-intent";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Turnstile } from "@/components/Turnstile";
import { BRAND_NAME } from "@/data/site";
import { TITLE, COLUMNS, NOTE, SENT } from "@/data/signup-page.mjs";

/* /login and /signup both create an account for a new address and sign in an
   existing one, because a magic link cannot tell the difference until it is
   opened. Only the words and the layout differ.

   /signup speaks to two interests with equal weight, in two columns, each
   with its own action: the case-study emails, and early access to the
   WaitHowMuch API for the Claude Code skills. The column a visitor uses is
   the signupSource on the User row and `signup_source` on GA4's sign_up. The
   page is the same for everyone, whatever the UTMs. Copy lives in
   src/data/signup-page.mjs, shared with the prerender. */

type AuthResult = { token: string; user: SessionUser; isNew?: boolean; touch?: SignupTouch | null };

/** The two ways in, shared by both pages. */
function useAuth() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function requestLink(email: string, intent: SignupIntent) {
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

  async function google(credential: string, intent: SignupIntent) {
    setError(null);
    try {
      const r = await apiFetch<AuthResult>("/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential, attribution: { ...readAttribution(), ...intentFields(intent) } }),
      });
      setSession(r.token, r.user);
      // Google finishes on this page, so a link-request intent saved earlier
      // in the session is stale — clear it.
      takeIntent();
      // `isNew` is the server's answer, not a guess from "we just got a
      // session" — every returning sign-in produces one of those too.
      if (r.isNew) trackSignUp("google", intent, r.user.id, r.touch);
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

  return { busy, sent, error, turnstileToken, setTurnstileToken, requestLink, google };
}

const errorStyle = { color: "var(--destructive, #b42318)", fontSize: "0.875rem", marginTop: "0.75rem" } as const;

function SentNotice({ text }: { text: string }) {
  return (
    <div data-empty style={{ marginTop: "1.5rem" }}>
      <p>{text}</p>
      <p style={{ marginTop: "0.75rem", fontSize: "0.875rem" }}>It expires in 20 minutes and works once.</p>
    </div>
  );
}

// ─── /login ──────────────────────────────────────────────────────────

export default function Login() {
  const [params] = useSearchParams();
  const intent = useMemo(() => intentFromUrl("login_page", params), [params]);
  const auth = useAuth();
  const [email, setEmail] = useState("");
  // Carried across the switch link, so `next` survives a change of mind.
  const qs = params.toString();

  useEffect(() => { document.title = `Sign in — ${BRAND_NAME}`; }, []);

  return (
    <main data-main>
    <div style={{ maxWidth: "22rem", margin: "2rem auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Sign in</h1>
      <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem", fontSize: "0.875rem" }}>
        Welcome back. No password — we email you a one-time link.
      </p>

      {auth.sent ? (
        <SentNotice text="If that address can receive mail, a sign-in link is on its way." />
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); void auth.requestLink(email, intent); }}
              style={{ marginTop: "1.5rem" }}>
          <label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: 550 }}>Email</label>
          <input
            id="email" data-input type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" style={{ marginTop: "0.375rem" }}
          />
          <div style={{ marginTop: "0.75rem" }}>
            <Turnstile onToken={auth.setTurnstileToken} />
          </div>
          {/* Disabled until the challenge reports back — an empty token is a
              guaranteed rejection, and a button that silently does nothing
              reads as the site being broken. */}
          <button data-btn type="submit" disabled={auth.busy || !email || auth.turnstileToken === null}
                  style={{ width: "100%", marginTop: "0.75rem" }}>
            {auth.busy ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
      )}

      {auth.error && <p style={errorStyle}>{auth.error}</p>}

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
        <GoogleSignIn onCredential={(c) => void auth.google(c, intent)} text="signin_with" />
      </div>

      <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        New here? <Link to={`/signup${qs ? `?${qs}` : ""}`}>Sign up</Link>
      </p>
    </div>
    </main>
  );
}

// ─── /signup ─────────────────────────────────────────────────────────

export function Signup() {
  const [params] = useSearchParams();
  const auth = useAuth();
  const [emails, setEmails] = useState<Record<string, string>>({});
  const intentFor = (source: SignupSource) => intentFromUrl(source, params);
  // Which column's Google button was clicked. GSI routes every button's
  // credential to one callback (see GoogleSignIn), so the column is noted on
  // click; plain "signup_page" if that never fired.
  const googleFrom = useRef<SignupSource>("signup_page");

  useEffect(() => { document.title = TITLE; }, []);

  return (
    <main data-main>
    <div data-signup>
      <h1>{TITLE}</h1>

      {auth.sent ? (
        <SentNotice text={SENT} />
      ) : (
        <div data-signup-columns>
          {COLUMNS.map((col) => {
            const email = emails[col.source] ?? "";
            const id = `email-${col.source}`;
            return (
              <section key={col.source} data-signup-column>
                <h2>{col.heading}</h2>
                {col.lines.map((l) => <p key={l}>{l}</p>)}
                <form data-signup-form
                      onSubmit={(e) => { e.preventDefault(); void auth.requestLink(email, intentFor(col.source)); }}>
                  <label htmlFor={id}>Email</label>
                  <input
                    id={id} data-input type="email" required autoComplete="email"
                    value={email} onChange={(e) => setEmails((m) => ({ ...m, [col.source]: e.target.value }))}
                    placeholder="you@example.com"
                  />
                  {/* Disabled until the challenge reports back, as on /login. */}
                  <button data-btn type="submit" data-signup-source={col.source}
                          disabled={auth.busy || !email || auth.turnstileToken === null}>
                    {auth.busy ? "Sending…" : col.button}
                  </button>
                  <div data-signup-google>
                    <GoogleSignIn
                      text="signup_with"
                      onClick={() => { googleFrom.current = col.source; }}
                      onCredential={(c) => void auth.google(c, intentFor(googleFrom.current))}
                    />
                  </div>
                </form>
              </section>
            );
          })}
        </div>
      )}

      {!auth.sent && (
        <>
          <p data-signup-note>{NOTE}</p>
          {/* One challenge for the page: whichever column is used spends it. */}
          <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "center" }}>
            <Turnstile onToken={auth.setTurnstileToken} />
          </div>
        </>
      )}
      {auth.error && <p style={{ ...errorStyle, textAlign: "center" }}>{auth.error}</p>}
    </div>
    </main>
  );
}
