import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { CrumbTrail } from "./Breadcrumbs";
import { useSession, signOut } from "@/lib/session";
import { COLLECTIONS, MORE, collectionPath } from "@/data/collections.mjs";
import { BRAND_NAME } from "@/data/site";

/** The thin strip across the top: mark, the breadcrumb trail beside it, and
 *  auth pinned to the right. Deliberately shallow — the real navigation is the
 *  rail below it. */
export function TopBar() {
  const { user, signedIn } = useSession();
  return (
    <header data-topbar>
      <Link data-brand to="/">
        <Logo size={26} />
        <span>{BRAND_NAME}?</span>
      </Link>

      <CrumbTrail />

      <div data-topbar-right>
        {signedIn ? (
          <>
            <span data-topbar-email>{user?.email}</span>
            <button data-btn data-variant="quiet" onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link data-btn data-variant="quiet" to="/login">Sign in</Link>
            <Link data-btn to="/login">Join</Link>
          </>
        )}
      </div>
    </header>
  );
}

function RailLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link data-rail-link data-active={active} to={to} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

/** The left rail: the primary navigation. Sections are grouped under small
 *  uppercase headings, and the active item is a filled pill. */
export function SideRail() {
  const { pathname } = useLocation();
  const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const here = norm(pathname);

  return (
    <aside data-rail>
      <nav aria-label="Sections">
        <RailLink to="/" label="Home" active={here === "/"} />

        <div data-rail-group>Data</div>
        {COLLECTIONS.map((c) => (
          <RailLink
            key={c.slug}
            to={collectionPath(c.slug)}
            label={c.navLabel ?? c.title}
            active={here === norm(collectionPath(c.slug))}
          />
        ))}
        <RailLink
          to={collectionPath(MORE.slug)}
          label={MORE.title}
          active={here === norm(collectionPath(MORE.slug))}
        />

        <div data-rail-group>About</div>
        <RailLink to="/how-we-research/" label="How we research" active={here === "/how-we-research/"} />
      </nav>
    </aside>
  );
}
