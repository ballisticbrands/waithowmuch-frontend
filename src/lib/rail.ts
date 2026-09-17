import { useSyncExternalStore } from "react";

const KEY = "whm_rail_collapsed_v1";

/**
 * Whether the left rail is collapsed to icons.
 *
 * A preference, so it outlives the route change — collapsing the rail on one
 * profile and finding it expanded again on the next is the toggle not having
 * worked, as far as the reader is concerned.
 *
 * Same wrapping as the session store: a private window or blocked site data can
 * make even the getter throw, and an unhandled throw during render blanks the
 * page. See the note in lib/session.ts.
 */
function read(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const listeners = new Set<() => void>();
let snapshot = read();

export function setRailCollapsed(next: boolean): void {
  try {
    if (next) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    /* ignore — the toggle still works for this tab */
  }
  snapshot = next;
  listeners.forEach((l) => l());
}

export function useRailCollapsed(): [boolean, () => void] {
  const collapsed = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    // Server snapshot for the build-time prerender: the rail ships expanded and
    // collapses on hydration if that is what this reader chose.
    () => false,
  );
  return [collapsed, () => setRailCollapsed(!snapshot)];
}
