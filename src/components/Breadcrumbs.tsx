import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

/**
 * Breadcrumbs live in the TOP STRIP, beside the logo — not above the page
 * content. So the trail has to be set by the page but rendered by the shell,
 * which is what this context is for.
 *
 * A context rather than deriving crumbs from the pathname: a business page's
 * final crumb is the business NAME, which is not in the URL and is not known
 * until the fetch resolves.
 */
type Ctx = { crumbs: Crumb[]; setCrumbs: (c: Crumb[]) => void };
const CrumbContext = createContext<Ctx>({ crumbs: [], setCrumbs: () => {} });

export function CrumbProvider({ children }: { children: React.ReactNode }) {
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const value = useMemo(() => ({ crumbs, setCrumbs }), [crumbs]);
  return <CrumbContext.Provider value={value}>{children}</CrumbContext.Provider>;
}

/**
 * Set the trail for the current page.
 *
 * 🚨 `deps` is required and the crumbs are rebuilt from it. Passing a fresh
 * array literal every render without deps would setState on every render and
 * spin forever — the array is a new reference each time, so the effect never
 * settles.
 */
export function useSetCrumbs(build: () => Crumb[], deps: unknown[]): void {
  const { setCrumbs } = useContext(CrumbContext);
  useEffect(() => {
    setCrumbs(build());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function CrumbTrail() {
  const { crumbs } = useContext(CrumbContext);
  if (crumbs.length === 0) return null;
  return (
    <nav data-crumbs aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} style={{ display: "contents" }}>
          <span data-crumb-sep aria-hidden="true">›</span>
          {c.to && i < crumbs.length - 1 ? (
            <Link to={c.to}>{c.label}</Link>
          ) : (
            <span aria-current="page">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
