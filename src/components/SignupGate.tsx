import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gateQuery } from "@/lib/signup-intent";

/**
 * The prompt a signed-out reader gets on reaching for a locked profile
 * section. Modelled on UnlockModal in verifiedmargins-frontend.
 *
 * One sentence naming what the click would have opened, and one call to
 * action. A feature list or a second offer makes it the thing in the way
 * rather than the thing that explains.
 *
 * Native <dialog>: the backdrop, the focus trap and Esc-to-close come from
 * the browser.
 */
export function SignupGate({
  slug, section, sectionTitle, next, onClose,
}: {
  slug: string;
  section: string;
  sectionTitle: string;
  /** Where to return the reader once signed up — the section they asked for. */
  next: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!el.open) el.showModal();
    /* `close` is native — Esc and the ✕ both raise it. */
    const handle = () => onClose();
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, [onClose]);

  const qs = gateQuery(slug, section, next);

  return (
    <dialog
      ref={ref}
      aria-labelledby="gate-title"
      data-gate=""
      /* A click on the backdrop lands on the dialog element itself. */
      onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close(); }}
    >
      <button type="button" onClick={() => ref.current?.close()} aria-label="Close" data-gate-dismiss="">
        ✕
      </button>
      <div data-gate-body="">
        <h2 id="gate-title">Sign up free to unlock {sectionTitle}</h2>
        <p>Every section of every business profile is free with an account.</p>
        <Link data-btn data-gate-cta="" to={`/signup?${qs}`}>
          <LockIcon />
          <span>Sign up free</span>
        </Link>
        <p data-gate-switch="">
          Already have an account? <Link to={`/login?${qs}`}>Sign in</Link>
        </p>
      </div>
    </dialog>
  );
}

/**
 * What a signed-out reader sees in place of a locked section's content — for
 * someone who arrives on the section's URL directly (a search result, a
 * shared link) rather than through the nav.
 */
export function LockedSection({ title, onUnlock }: { title: string; onUnlock: () => void }) {
  return (
    <section data-locked-section="">
      <LockIcon />
      <h2>{title} is for members</h2>
      <p>Create a free account to read this section and every other one on the site.</p>
      <button type="button" data-btn onClick={onUnlock}>Unlock this section</button>
    </section>
  );
}

export function LockIcon() {
  return (
    <svg data-lock-icon="" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" />
    </svg>
  );
}
