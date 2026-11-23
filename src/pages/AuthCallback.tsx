import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { setSession, type SessionUser } from "@/lib/session";
import { trackSignUp, trackLogin, type SignupTouch, type SignupChoicesFromApi } from "@/lib/track";
import { takeIntent } from "@/lib/signup-intent";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  // React 18 StrictMode double-invokes effects in dev. The magic token is
  // SINGLE-USE, so a second call would consume it and fail — this guard is
  // what keeps dev sign-in from appearing broken.
  const consumed = useRef(false);

  useEffect(() => {
    const token = params.get("token");
    if (!token) { setFailed(true); return; }
    if (consumed.current) return;
    consumed.current = true;

    apiFetch<{ token: string; user: SessionUser; isNew?: boolean; touch?: SignupTouch | null; choices?: SignupChoicesFromApi | null; report?: { next: string } | null }>("/v1/auth/magic-link/consume", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((r) => {
        setSession(r.token, r.user);
        // Saved by the form that requested the link. Absent when the link is
        // opened in another browser — the event goes unlabelled, and the User
        // row still has the source the API stored at request time.
        const intent = takeIntent();
        // Fired here rather than on the login form: requesting a link is not
        // signing up, and a good share of requested links are never opened.
        if (r.isNew) trackSignUp("magic_link", intent, r.user.id, r.touch, r.choices);
        else trackLogin("magic_link");
        // A /report/ request this link confirmed: its "on its way" page, from
        // the API, so it lands there even in a browser that never saw the
        // form (desktop form, link opened on the phone).
        const reportNext = r.report?.next?.startsWith("/report/") ? r.report.next : undefined;
        navigate(reportNext ?? intent?.next ?? "/", { replace: true });
      })
      .catch(() => setFailed(true));
  }, [params, navigate]);

  return failed ? (
    <main data-main><div data-empty>
      <p>That link is expired or already used.</p>
      <p style={{ marginTop: "1rem" }}><Link data-btn to="/signup">Get a new one</Link></p>
    </div></main>
  ) : (
    <main data-main><div data-empty>Signing you in…</div></main>
  );
}
