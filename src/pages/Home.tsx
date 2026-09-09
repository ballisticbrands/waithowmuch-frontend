import { useEffect, useRef, useState } from "react";
import { listBusinesses, listCategories, type BusinessCard as Card, type CategoryRef } from "@/lib/api";
import { BusinessCard } from "@/components/BusinessCard";
import { homeBootstrap } from "@/lib/bootstrap";

type Sort = "revenue" | "profit" | "margin" | "newest";

export default function Home() {
  // Seeded from the payload the prerender inlined, so the default view paints
  // without a network round trip.
  const [businesses, setBusinesses] = useState<Card[] | null>(homeBootstrap?.businesses ?? null);
  const [categories, setCategories] = useState<Array<CategoryRef & { businessCount: number }>>(
    homeBootstrap?.categories ?? [],
  );
  const [sort, setSort] = useState<Sort>("revenue");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (homeBootstrap?.categories?.length) return;
    listCategories().then((r) => setCategories(r.categories)).catch(() => {});
  }, []);

  // Tracks whether this is the very first pass, so the bootstrapped default
  // view is not immediately thrown away and refetched.
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (homeBootstrap && sort === "revenue" && category === "") return;
    }
    let cancelled = false;
    setBusinesses(null);
    setError(false);
    const q = `?sort=${sort}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
    listBusinesses(q)
      .then((r) => { if (!cancelled) setBusinesses(r.businesses); })
      .catch(() => { if (!cancelled) setError(true); });
    // Cancellation matters here: switching filters quickly otherwise lets a
    // slower earlier request resolve last and overwrite the newer results.
    return () => { cancelled = true; };
  }, [sort, category]);

  return (
    <>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
        Wait, how much?
      </h1>
      <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem", maxWidth: "42rem" }}>
        Revenue and profit for businesses you have never heard of. Most figures
        are modelled from public data — every profile says which.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <select data-input style={{ width: "auto" }} value={sort}
                onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by">
          <option value="revenue">Top revenue</option>
          <option value="profit">Top profit</option>
          <option value="margin">Best margin</option>
          <option value="newest">Newest</option>
        </select>
        <select data-input style={{ width: "auto" }} value={category}
                onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name} ({c.businessCount})</option>
          ))}
        </select>
      </div>

      {error && <div data-empty>Could not load businesses. Refresh to try again.</div>}
      {!error && businesses === null && <div data-empty>Loading…</div>}
      {!error && businesses?.length === 0 && (
        <div data-empty>No businesses published yet.</div>
      )}
      {businesses && businesses.length > 0 && (
        <div data-grid>
          {businesses.map((b) => <BusinessCard key={b.id} business={b} />)}
        </div>
      )}
    </>
  );
}
