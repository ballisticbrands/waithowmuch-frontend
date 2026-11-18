/**
 * Where a sign-up started, and where to send the reader afterwards.
 *
 * Built from the /signup or /login URL (plus an optional same-origin
 * `?next=<path>`) and kept in localStorage, because a magic link finishes in a
 * different page load, often a different tab, from the one that asked for it.
 * The callback reads it back to label the `sign_up` event and to redirect.
 *
 * The same source goes to the API with the attribution blob, so the User row
 * records it too. See README → "Signup source".
 */
const KEY = "whm_signup_intent_v1";

/** One per /signup column (src/data/signup-page.mjs), or the sign-in page.
 *  Plain "signup_page" is a Google sign-in on /signup whose column is not
 *  known (see GoogleSignIn's onClick). The API's allowlist must match. */
export type SignupSource =
  | "signup_page_case_studies" | "signup_page_api" | "signup_page" | "login_page";

export type SignupIntent = {
  source: SignupSource;
  next?: string;
};

/** Only same-origin paths. `//evil.com` is a protocol-relative URL, not a path. */
function safeNext(v: string | null): string | undefined {
  return v && v.startsWith("/") && !v.startsWith("//") ? v.slice(0, 512) : undefined;
}

export function intentFromUrl(source: SignupSource, params: URLSearchParams): SignupIntent {
  return { source, next: safeNext(params.get("next")) };
}

export function saveIntent(intent: SignupIntent): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(intent));
  } catch {
    /* best-effort: without it the reader lands on / and the event is unlabelled */
  }
}

export function takeIntent(): SignupIntent | null {
  try {
    const raw = localStorage.getItem(KEY);
    localStorage.removeItem(KEY);
    if (!raw) return null;
    const i = JSON.parse(raw) as SignupIntent;
    return { ...i, next: safeNext(i.next ?? null) };
  } catch {
    return null;
  }
}

/** The field the API stores on a NEW User row. */
export const intentFields = (i: SignupIntent) => ({ signupSource: i.source });
