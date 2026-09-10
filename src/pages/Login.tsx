import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, ApiError } from "@/lib/api";
import { readAttribution } from "@/lib/attribution";
import { setSession, type SessionUser } from "@/lib/session";
import { trackSignUp, trackLogin } from "@/lib/track";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Turnstile } from "@/components/Turnstile";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const navigate = useNavigate();

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch("/v1/auth/magic-link", {
        method: "POST",
        body: JSON.stringify({ email, turnstileToken, attribution: readAttribution() }),
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
        body: JSON.stringify({ credential, attribution: readAttribution() }),
      });
      setSession(r.token, r.user);
      // `isNew` is the server's answer, not a guess from "we just got a
      // session" — every returning sign-in produces one of those too.
      if (r.isNew) trackSignUp("google");
      else trackLogin("google");
      navigate("/");
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
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Sign in</h1>
      <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem", fontSize: "0.875rem" }}>
        Everything here is free to read — an account just remembers you.
      </p>

      {sent ? (
        <div data-empty style={{ marginTop: "1.5rem" }}>
          <p>If that address can receive mail, a sign-in link is on its way.</p>
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
            {busy ? "Sending…" : "Email me a link"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "var(--destructive, #b42318)", fontSize: "0.875rem", marginTop: "0.75rem" }}>{error}</p>}

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
        <GoogleSignIn onCredential={onGoogle} />
      </div>
    </div>
    </main>
  );
}
