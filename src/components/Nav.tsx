import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { RailIcon, type RailIconName } from "./RailIcons";
import { CrumbTrail } from "./Breadcrumbs";
import { useSession, signOut } from "@/lib/session";
import { useRailCollapsed } from "@/lib/rail";
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
          /* The short label is for phone widths, where the full one would
             crowd the breadcrumbs out of the bar. */
          <Link data-btn to="/signup">
            <svg
              width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={1.9}
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden focusable={false}
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span data-cta-long>Get emails on new case studies (no spam!)</span>
            <span data-cta-short>Get emails (no spam!)</span>
          </Link>
        )}
      </div>
    </header>
  );
}

function RailLink({
  to, label, active, icon, collapsed,
}: { to: string; label: string; active: boolean; icon?: string; collapsed: boolean }) {
  return (
    <Link
      data-rail-link
      data-active={active}
      to={to}
      aria-current={active ? "page" : undefined}
      /* Collapsed, the icon is all that is left on screen — the tooltip is how
         the name is still reachable. Expanded, the label is right there and a
         tooltip repeating it is just noise under the cursor. */
      title={collapsed ? label : undefined}
    >
      <RailIcon name={icon as RailIconName | undefined} />
      <span>{label}</span>
    </Link>
  );
}

/** The toggle glyph: the rail as a box, with a chevron pointing the way the
 *  click will move it. */
function PanelIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden focusable={false}
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9.5 4v16" />
      <path d={collapsed ? "M14 9.5 16.5 12 14 14.5" : "M17 9.5 14.5 12 17 14.5"} />
    </svg>
  );
}

/** The left rail: the primary navigation. Sections are grouped under small
 *  uppercase headings, and the active item is a filled pill.
 *
 *  It collapses to icons — never away entirely. A rail that disappears leaves
 *  no visible way back to itself, and the icons alone still answer "which
 *  section am I in". The choice is remembered across routes and visits; see
 *  lib/rail.ts. */
export function SideRail() {
  const { pathname } = useLocation();
  const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const here = norm(pathname);
  const [collapsed, toggle] = useRailCollapsed();
  const action = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <aside data-rail data-collapsed={collapsed ? "" : undefined}>
      <div data-rail-head>
        <button
          type="button"
          data-rail-toggle
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-controls="rail-nav"
          aria-label={action}
          title={action}
        >
          <PanelIcon collapsed={collapsed} />
        </button>
      </div>

      <nav id="rail-nav" aria-label="Sections">
        <RailLink to="/" label="Home" active={here === "/"} icon="home" collapsed={collapsed} />

        <div data-rail-group>Data</div>
        {COLLECTIONS.map((c) => (
          <RailLink
            key={c.slug}
            to={collectionPath(c.slug)}
            label={c.navLabel ?? c.title}
            active={here === norm(collectionPath(c.slug))}
            icon={c.icon}
            collapsed={collapsed}
          />
        ))}
        <RailLink
          to={collectionPath(MORE.slug)}
          label={MORE.title}
          active={here === norm(collectionPath(MORE.slug))}
          icon={MORE.icon}
          collapsed={collapsed}
        />

        <div data-rail-group>About</div>
        <RailLink
          to="/how-we-research/"
          label="How we research"
          active={here === "/how-we-research/"}
          icon="book"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
}
