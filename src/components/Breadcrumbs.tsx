import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export type Crumb = { label: string; to?: string };

/**
 * Trail: mark → Ideas → this page. The mark is the home link, so the first
 * crumb carries no text — it is the logo doing double duty, which is why it
 * needs its own accessible name rather than inheriting the crumb's.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav data-crumbs aria-label="Breadcrumb">
      <Link to="/" aria-label="WaitHowMuch home">
        <Logo size={18} />
      </Link>
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
