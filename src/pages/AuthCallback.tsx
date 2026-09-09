import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { setSession, type SessionUser } from "@/lib/session";

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

    apiFetch<{ token: string; user: SessionUser }>("/v1/auth/magic-link/consume", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((r) => {
        setSession(r.token, r.user);
        navigate("/", { replace: true });
      })
      .catch(() => setFailed(true));
  }, [params, navigate]);

  return failed ? (
    <div data-empty>
      <p>That sign-in link is expired or already used.</p>
      <p style={{ marginTop: "1rem" }}><Link data-btn to="/login">Get a new one</Link></p>
    </div>
  ) : (
    <div data-empty>Signing you in…</div>
  );
}
