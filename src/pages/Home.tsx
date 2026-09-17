import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { listBusinesses, type BusinessCard } from "@/lib/api";
import { homeBootstrap } from "@/lib/bootstrap";
import { collectionPath } from "@/data/collections.mjs";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { RailIcon } from "@/components/RailIcons";

/** The front door: the case studies as cards, newest first. */
export default function Home() {
  const boot = homeBootstrap();
  const [rows, setRows] = useState<BusinessCard[] | null>(boot?.businesses ?? null);
  const [error, setError] = useState(false);
  useSetCrumbs(() => [{ label: "Home" }], []);

  useEffect(() => {
    // The prerender inlined the same list; only fetch when it did not.
    if (boot) return;
    let cancelled = false;
    listBusinesses("sort=newest")
      .then((r) => !cancelled && setRows(r.businesses))
      .catch(() => !cancelled && setError(true));
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main data-main>
      <h1 style={{ marginBottom: "0.5rem" }}>What these businesses actually make</h1>
      <p data-home-lede>
        Researched case studies of small businesses — what they sell, what they
        earn, and how the figures were reached.
      </p>

      {/* The way into the database: the home page is the newest case studies,
          and the filters are how a reader finds the one they came for. */}
      <Link data-btn data-filter-cta to={collectionPath("all-ideas")}>
        <RailIcon name="filter" size={22} />
        Filter
      </Link>

      {error && <div data-empty>Could not load case studies. Refresh to try again.</div>}
      {!error && rows === null && <div data-empty>Loading…</div>}
      {rows && rows.length > 0 && (
        <div data-case-cards>
          {rows.map((b) => <CaseStudyCard key={b.id} business={b} />)}
        </div>
      )}

    </main>
  );
}
