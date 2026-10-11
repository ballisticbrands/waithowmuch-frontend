import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { listBusinesses, listCategories, type BusinessCard, type FacetCategory } from "@/lib/api";
import { collectionBySlug, collectionPath, COLLECTIONS, MORE } from "@/data/collections.mjs";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { IdeaRow, IdeaRowHead } from "@/components/IdeaRow";
import { Filters, EMPTY_FILTERS, toQuery, type FilterState } from "@/components/Filters";
import { ideasBootstrap } from "@/lib/bootstrap";
import { BRAND_NAME } from "@/data/site";
import { searchBusinesses } from "@/lib/search";

export default function Ideas() {
  const { collection = "all-ideas" } = useParams();
  const meta = collectionBySlug(collection);
  const boot = ideasBootstrap(collection);

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [rows, setRows] = useState<BusinessCard[] | null>(boot?.businesses ?? null);
  const [total, setTotal] = useState<number | null>(boot?.total ?? null);
  const [facets, setFacets] = useState<FacetCategory[]>(boot?.categories ?? []);
  const [error, setError] = useState(false);
  const first = useRef(true);
  /* The search box filters the loaded rows in the browser (lib/search.ts) and
     lives in the URL, so a search can be shared and survives a reload. */
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const setQ = (v: string) =>
    setParams((p) => { const n = new URLSearchParams(p); if (v) n.set("q", v); else n.delete("q"); return n; }, { replace: true });
  const shown = useMemo(() => (rows ? searchBusinesses(rows, q) : null), [rows, q]);

  useEffect(() => {
    if (facets.length) return;
    listCategories().then((r) => setFacets(r.categories)).catch(() => {});
  }, [facets.length]);

  useEffect(() => {
    if (meta) document.title = `${meta.title} — ${BRAND_NAME}`;
  }, [meta]);

  useSetCrumbs(
    () => (meta ? [{ label: "Case studies", to: collectionPath("all-ideas") }, { label: meta.title }] : []),
    [meta?.slug],
  );

  const query = useMemo(() => {
    const parts = [meta?.query, toQuery(filters)].filter(Boolean);
    return parts.join("&");
  }, [meta, filters]);

  useEffect(() => {
    // The landed-on page already has its default results inlined; skip the
    // duplicate fetch on the very first pass only.
    if (first.current) {
      first.current = false;
      if (boot && filters === EMPTY_FILTERS) return;
    }
    let cancelled = false;
    setRows(null);
    setError(false);
    listBusinesses(query)
      .then((r) => {
        if (cancelled) return;
        setRows(r.businesses);
        setTotal(r.total);
      })
      .catch(() => !cancelled && setError(true));
    // Cancellation matters: toggling chips quickly otherwise lets a slower
    // earlier request resolve last and overwrite newer results.
    return () => { cancelled = true; };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!meta) {
    return (
      <main data-main>
        <div data-empty>
          <p>No such collection.</p>
          <p style={{ marginTop: "1rem" }}><Link to={collectionPath("all-ideas")}>All case studies →</Link></p>
        </div>
      </main>
    );
  }

  return (
    <main data-main>
        <h1 style={{ marginBottom: "1.25rem" }}>{meta.title}</h1>

        <div data-search>
          <label htmlFor="case-search" data-sr-only>Search case studies by name</label>
          <input
            id="case-search"
            data-input
            data-search-input
            type="search"
            placeholder="Search by name — e.g. Mary Ruth, Spite House, mahjong"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <Filters state={filters} onChange={setFilters} facets={facets} total={total} />

        {error && <div data-empty>Could not load case studies. Refresh to try again.</div>}
        {!error && rows === null && <div data-empty>Loading…</div>}
        {!error && rows?.length === 0 && (
          <div data-empty>
            <p style={{ margin: 0 }}>Nothing matches these filters.</p>
            <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              <button data-btn data-variant="ghost" onClick={() => setFilters(EMPTY_FILTERS)}>Clear filters</button>
            </p>
          </div>
        )}
      {q && shown && rows && rows.length > 0 && (
        <p data-result-count>
          {shown.length === 0 ? `No case study matches “${q}”` : `${shown.length} of ${rows.length} match “${q}”`}
          {" · "}
          <button data-btn data-variant="ghost" onClick={() => setQ("")}>Clear search</button>
        </p>
      )}
      {shown && shown.length > 0 && (
        <div data-rows>
          <IdeaRowHead />
          {shown.map((b) => <IdeaRow key={b.id} business={b} />)}
        </div>
      )}
    </main>
  );
}

/** The "More case studies" nav entry: an index of every way to slice the data. */
export function MoreIdeas() {
  const [facets, setFacets] = useState<FacetCategory[]>([]);
  useEffect(() => {
    listCategories().then((r) => setFacets(r.categories)).catch(() => {});
    document.title = `${MORE.title} — ${BRAND_NAME}`;
  }, []);

  const groups: Array<[string, string]> = [
    ["NICHE", "By niche"],
    ["MODEL", "By business model"],
    ["PLATFORM", "By platform"],
    ["CHANNEL", "By channel"],
    ["GROWTH", "By growth channel"],
    ["AUDIENCE", "By who it sells to"],
  ];

  useSetCrumbs(() => [{ label: "Case studies", to: collectionPath("all-ideas") }, { label: MORE.title }], []);

  return (
    <main data-main>
        <h1>{MORE.title}</h1>
        <p style={{ color: "var(--muted-foreground)", margin: "0.5rem 0 2rem", maxWidth: "44rem" }}>{MORE.blurb}</p>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.0625rem", fontWeight: 650, marginBottom: "0.75rem" }}>Collections</h2>
          <div data-chips>
            {COLLECTIONS.map((c) => (
              <Link key={c.slug} data-chip to={collectionPath(c.slug)}>{c.title}</Link>
            ))}
          </div>
        </section>

        {groups.map(([kind, label]) => {
          const items = facets.filter((f) => f.kind === kind);
          if (!items.length) return null;
          return (
            <section key={kind} style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.0625rem", fontWeight: 650, marginBottom: "0.75rem" }}>{label}</h2>
              <div data-chips>
                {items.map((f) => (
                  <Link key={f.slug} data-chip to={`${collectionPath("all-ideas")}?niche=${encodeURIComponent(f.slug)}`}>
                    {f.name} <span style={{ opacity: 0.55 }}>{f.businessCount}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

      {facets.length === 0 && <div data-empty>No categories yet.</div>}
    </main>
  );
}
