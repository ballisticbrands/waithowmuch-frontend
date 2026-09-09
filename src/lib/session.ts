import { useSyncExternalStore } from "react";

const KEY = "whm_session_v1";

export type SessionUser = { id: string; email: string; role: "MEMBER" | "ADMIN" };
type Stored = { token: string; user: SessionUser };

// Every localStorage access is wrapped: a private window, blocked site data or
// a thumbnail-capture context can make even the *getter* throw, and an
// unhandled throw here happens during render and blanks the whole page.
function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

const listeners = new Set<() => void>();
// useSyncExternalStore compares snapshots by reference, so returning a fresh
// object each call would loop forever. Cache and only swap on a real change.
let snapshot: Stored | null = read();

function emit() {
  snapshot = read();
  listeners.forEach((l) => l());
}

export function setSession(token: string, user: SessionUser): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ token, user }));
  } catch {
    /* ignore — an in-memory session still works for this tab */
  }
  emit();
}

export function clearSession(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export const getToken = (): string | null => snapshot?.token ?? null;

export function useSession(): { user: SessionUser | null; signedIn: boolean } {
  const s = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    // Server snapshot for the build-time prerender: never signed in.
    () => null,
  );
  return { user: s?.user ?? null, signedIn: !!s };
}

export function signOut(): void {
  clearSession();
}
