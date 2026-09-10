import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getBusiness, getMetrics, linkMetaNumber, toChartPoints,
  type BusinessDetail, type MetricsResponse,
} from "@/lib/api";
import { profileFor } from "@/businesses/index.mjs";
import { ProfileBlocks } from "@/components/ProfileBlocks";
import { ResearchedNotice } from "@/components/ResearchedNotice";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { Chart } from "@/components/Chart";
import { businessBootstrap } from "@/lib/bootstrap";
import { collectionPath, BRAND_NAME_SAFE } from "@/lib/nav-helpers";
import { exactMoney, percent, monthLabel } from "@/lib/format";
import { trackBusinessView } from "@/lib/track";

export default function Business() {
  const { slug = "" } = useParams();
  const boot = businessBootstrap(slug);
  const [b, setB] = useState<BusinessDetail | null>(boot?.business ?? null);
  const [series, setSeries] = useState<MetricsResponse | null>(boot?.metrics ?? null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (businessBootstrap(slug)) return;
    let cancelled = false;
    getBusiness(slug)
      .then((r) => !cancelled && setB(r.business))
      .catch(() => !cancelled && setMissing(true));
    getMetrics(slug)
      .then((r) => !cancelled && setSeries(r))
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (b) document.title = `${b.name} — ${BRAND_NAME_SAFE}`;
  }, [b]);

  // Fires exactly once per slug, and only once the page has resolved one way
  // or the other.
  //
  // The naive version — a `[slug]`-keyed effect — fires at mount, which beats
  // the API response on every page that is not prerendered, so the event
  // ships with `business_name: undefined` and GA4 shows a column of blanks.
  // The other naive version, keying on `b`, double-counts: `b` changes again
  // when the fetch lands on top of the bootstrap value.
  const viewFired = useRef<string | null>(null);
  useEffect(() => {
    if (!slug || viewFired.current === slug) return;
    if (!b && !missing) return; // still resolving — wait for a name or a 404
    viewFired.current = slug;
    if (b) trackBusinessView(slug, b.name);
  }, [slug, b, missing]);

  // The final crumb is the business NAME, which is not in the URL — hence a
  // context the page pushes into rather than crumbs derived from the path.
  useSetCrumbs(
    () => [
      { label: "Ideas", to: collectionPath("all-ideas") },
      { label: b?.name ?? (missing ? "Not found" : "…") },
    ],
    [b?.name, missing],
  );

  if (missing) {
    return (
      <main data-main>
        <div data-empty>
          <p>No published idea at <code>{slug}</code>.</p>
          <p style={{ marginTop: "1rem" }}><Link to={collectionPath("all-ideas")}>All ideas →</Link></p>
        </div>
      </main>
    );
  }
  if (!b) return <main data-main><div data-empty>Loading…</div></main>;

  // An authored profile if one exists for this slug; otherwise the page falls
  // back to whatever the DB alone can say.
  const profile = profileFor(slug);
  // Only FLOW types are charted; see toChartPoints.
  const points = toChartPoints(series);

  return (
    <main data-main>
        <h1>{b.name}</h1>
        {b.tagline && (
          <p style={{ color: "var(--muted-foreground)", margin: "0.4rem 0 0", fontSize: "1.0625rem" }}>{b.tagline}</p>
        )}

        <div style={{ margin: "1.25rem 0" }}>
          <ResearchedNotice method={b.researchMethod} />
        </div>

        <dl data-stat-row style={{ flexWrap: "wrap", rowGap: "1rem" }}>
          <div data-stat data-size="lg">
            <dt>Revenue / mo</dt>
            <dd data-figure>{exactMoney(b.latestMonthlyRevenue, b.currency)}</dd>
          </div>
          <div data-stat data-size="lg">
            <dt>Profit / mo</dt>
            <dd data-figure>{exactMoney(b.latestMonthlyProfit, b.currency)}</dd>
          </div>
          <div data-stat data-size="lg">
            <dt>Margin</dt>
            <dd data-figure>{percent(b.latestMarginPct)}</dd>
          </div>
          <div data-stat data-size="lg">
            <dt>To start</dt>
            <dd data-figure>{exactMoney(b.startingCost, b.currency)}</dd>
          </div>
          <div data-stat data-size="lg">
            <dt>As of</dt>
            <dd data-figure>{monthLabel(b.latestPeriod)}</dd>
          </div>
        </dl>

        {b.categories.length > 0 && (
          <div data-tags style={{ marginTop: "1.25rem" }}>
            {b.categories.map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
          </div>
        )}

        {profile ? (
          <>
            {profile.intro && (
              <p data-prose style={{ marginTop: "2rem", fontSize: "1.0625rem" }}>{profile.intro}</p>
            )}
            <div style={{ marginTop: "1.5rem" }}>
              <ProfileBlocks profile={profile} business={b} metrics={points} />
            </div>
          </>
        ) : (
          <section style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.75rem" }}>Monthly</h2>
            <Chart points={points} currency={b.currency} />
          </section>
        )}

        {b.links.length > 0 && (
          <section style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.75rem" }}>Links</h2>
            <ul data-prose style={{ listStyle: "none", padding: 0 }}>
              {b.links.map((l) => (
                <li key={l.url} style={{ marginBottom: "0.35rem" }}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
                    {l.label ?? l.handle ?? l.platform.toLowerCase()}
                  </a>
                  {linkMetaNumber(l, "followerCount") != null && (
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                      {" "}· {linkMetaNumber(l, "followerCount")!.toLocaleString("en-US")} followers
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {b.sources.length > 0 && (
          <section style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.75rem" }}>Sources</h2>
            <ol data-prose style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {b.sources.map((s) => (
                <li key={s.url} style={{ marginBottom: "0.35rem" }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.title}</a>
                  {s.note && ` — ${s.note}`}
                </li>
              ))}
            </ol>
        </section>
      )}
    </main>
  );
}
