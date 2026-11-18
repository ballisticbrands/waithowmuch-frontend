import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch, ApiError } from "@/lib/api";
import { readAttribution } from "@/lib/attribution";
import { setSession, type SessionUser } from "@/lib/session";
import { trackSignUp, trackLogin, type SignupTouch, type SignupChoicesFromApi } from "@/lib/track";
import {
  intentFromUrl, intentFields, saveIntent, takeIntent,
  type SignupIntent, type SignupChoices,
} from "@/lib/signup-intent";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Turnstile } from "@/components/Turnstile";
import { BRAND_NAME } from "@/data/site";
import {
  SOURCE, TITLE, SECTIONS, CHOICES, SKILLS_LINK, BUTTON, NONE_CHECKED, NOTE, SENT,
} from "@/data/signup-page.mjs";

/* /login and /signup both create an account for a new address and sign in an
   existing one, because a magic link cannot tell the difference until it is
   opened. Only the words and the layout differ.

   /signup is one form (email or Google) with two checkboxes, both ticked by
   default: early access to the WaitHowMuch API for the free skills, and
   case-study emails. What is left ticked goes to the API with the
   attribution (User.wantsApiAccess / wantsCaseStudies, the latter being the
   case-study mailing consent) and onto GA4's sign_up. With neither ticked
   the form cannot be sent. Copy lives in src/data/signup-page.mjs, shared
   with the prerender. */

type AuthResult = {
  token: string; user: SessionUser; isNew?: boolean;
  touch?: SignupTouch | null; choices?: SignupChoicesFromApi | null;
};

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
      if (r.isNew) trackSignUp("google", intent, r.user.id, r.touch, r.choices);
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

const DEFAULT_CHOICES: SignupChoices = { wantsApiAccess: true, wantsCaseStudies: true };

export function Signup() {
  const [params] = useSearchParams();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [choices, setChoices] = useState<SignupChoices>(DEFAULT_CHOICES);
  const [changed, setChanged] = useState(false);
  const none = !choices.wantsApiAccess && !choices.wantsCaseStudies;
  // Read at submit time, and by the Google callback (GoogleSignIn keeps the
  // latest callback in a ref, so this closure is never stale).
  const intent = (): SignupIntent => ({ ...intentFromUrl(SOURCE, params), choices, choicesChanged: changed });

  useEffect(() => { document.title = TITLE; }, []);

  const toggle = (key: keyof SignupChoices) => {
    setChoices((c) => ({ ...c, [key]: !c[key] }));
    setChanged(true);
  };

  return (
    <main data-main>
    <div data-signup>
      <h1>{TITLE}</h1>

      <div data-signup-sections>
        {SECTIONS.map((sec) => (
          <section key={sec.heading} data-signup-section>
            <h2>{sec.heading}</h2>
            {sec.lines.map((l) => <p key={l}>{l}</p>)}
          </section>
        ))}
      </div>

      {auth.sent ? (
        <SentNotice text={SENT} />
      ) : (
        <form data-signup-form
              onSubmit={(e) => { e.preventDefault(); if (!none) void auth.requestLink(email, intent()); }}>
          <label htmlFor="email">Email</label>
          <input
            id="email" data-input type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <div data-signup-choices>
            {CHOICES.map((c) => (
              <div key={c.key} data-signup-choice>
                <input id={`choice-${c.key}`} type="checkbox" name={c.key}
                       checked={choices[c.key]} onChange={() => toggle(c.key)} />
                {/* The link sits OUTSIDE the <label>, so following it never
                    toggles the box. */}
                <span>
                  <label htmlFor={`choice-${c.key}`}>{c.before}</label>
                  {c.link && (
                    <a href={SKILLS_LINK} target="_blank" rel="noopener">{c.link}</a>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Disabled until the challenge reports back, as on /login. */}
          <button data-btn type="submit" data-signup-source={SOURCE}
                  disabled={auth.busy || !email || none || auth.turnstileToken === null}>
            {auth.busy ? "Sending…" : BUTTON}
          </button>
          {none && <p data-signup-hint role="status">{NONE_CHECKED}</p>}

          {/* GSI's button cannot be disabled, so with nothing ticked it is
              dimmed, made inert, and its callback refuses. */}
          <div data-signup-google aria-disabled={none || undefined}
               style={none ? { opacity: 0.4, pointerEvents: "none" } : undefined}>
            <GoogleSignIn
              text="signup_with"
              onCredential={(cred) => { if (!none) void auth.google(cred, intent()); }}
            />
          </div>
        </form>
      )}

      {!auth.sent && (
        <>
          <p data-signup-note>{NOTE}</p>
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
