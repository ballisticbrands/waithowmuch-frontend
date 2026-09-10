import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useSession, signOut } from "@/lib/session";
import { COLLECTIONS, MORE, collectionPath } from "@/data/collections.mjs";
import { BRAND_NAME } from "@/data/site";

function DataMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Close on outside click and on Escape. Hover alone opens this for pointer
  // users (CSS), but touch has no hover, so the click path has to work — and
  // once it does, it needs a way back out.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Any /data/* route counts as being in this section.
  const active = pathname.startsWith("/data");

  return (
    <div data-menu data-open={open} ref={ref}>
      <button
        data-nav-link
        data-active={active}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
      >
        Data <span aria-hidden="true" style={{ fontSize: "0.7em", opacity: 0.6 }}>▾</span>
      </button>
      <div data-menu-panel role="menu">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            data-menu-item
            data-active={pathname.startsWith(collectionPath(c.slug))}
            to={collectionPath(c.slug)}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {c.title}
          </Link>
        ))}
        <Link
          data-menu-item
          data-active={pathname.startsWith(collectionPath(MORE.slug))}
          to={collectionPath(MORE.slug)}
          role="menuitem"
          onClick={() => setOpen(false)}
        >
          {MORE.title}
        </Link>
      </div>
    </div>
  );
}

export function Nav() {
  const { user, signedIn } = useSession();
  const { pathname } = useLocation();

  return (
    <header data-header>
      <div data-header-inner>
        <Link data-brand to="/">
          <Logo size={30} />
          <span>{BRAND_NAME}</span>
        </Link>

        <nav data-nav aria-label="Main">
          <Link data-nav-link data-active={pathname === "/"} to="/">Home</Link>
          <DataMenu />
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {signedIn ? (
            <>
              <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{user?.email}</span>
              <button data-btn data-variant="quiet" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <Link data-btn to="/login">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
