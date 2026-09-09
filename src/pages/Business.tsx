import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBusiness, getMetrics, type BusinessDetail, type MetricPoint } from "@/lib/api";
import { Chart } from "@/components/Chart";
import { Provenance } from "@/components/Provenance";
import { exactMoney, percent, monthLabel, yearsSince } from "@/lib/format";
import { BRAND_NAME } from "@/data/site";
import { businessBootstrap } from "@/lib/bootstrap";

export default function Business() {
  const { slug = "" } = useParams();
  const boot = businessBootstrap(slug);
  const [b, setB] = useState<BusinessDetail | null>(boot?.business ?? null);
  const [points, setPoints] = useState<MetricPoint[]>(boot?.metrics ?? []);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    // The landed-on page already has everything inlined. A client-side
    // navigation to a DIFFERENT business does not, so this still runs there.
    if (businessBootstrap(slug)) return;
    let cancelled = false;
    getBusiness(slug)
      .then((r) => { if (!cancelled) setB(r.business); })
      .catch(() => { if (!cancelled) setMissing(true); });
    getMetrics(slug, "month")
      .then((r) => { if (!cancelled) setPoints(r.metrics); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (b) document.title = `${b.name} — ${BRAND_NAME}`;
  }, [b]);

  if (missing) {
    return (
      <div data-empty>
        <p>No published business at <code>{slug}</code>.</p>
        <p style={{ marginTop: "1rem" }}><Link to="/">Back to all businesses</Link></p>
      </div>
    );
  }
  if (!b) return <div data-empty>Loading…</div>;

  const age = yearsSince(b.establishedAt);

  return (
    <article>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.025em" }}>{b.name}</h1>
      {b.tagline && <p style={{ color: "var(--muted-foreground)", marginTop: "0.375rem" }}>{b.tagline}</p>}

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginTop: "0.875rem" }}>
        <Provenance method={b.researchMethod} confidence={b.confidence} />
        {age && <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{age} old</span>}
        {b.categories.map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
      </div>

      <dl data-stat-row style={{ marginTop: "1.5rem" }}>
        <div data-stat>
          <dt>Revenue / mo</dt>
          <dd data-figure>{exactMoney(b.latestMonthlyRevenue, b.currency)}</dd>
        </div>
        <div data-stat>
          <dt>Profit / mo</dt>
          <dd data-figure>{exactMoney(b.latestMonthlyProfit, b.currency)}</dd>
        </div>
        <div data-stat>
          <dt>Margin</dt>
          <dd data-figure>{percent(b.latestMarginPct)}</dd>
        </div>
        <div data-stat>
          <dt>As of</dt>
          <dd data-figure>{monthLabel(b.latestPeriod)}</dd>
        </div>
      </dl>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "0.75rem" }}>Monthly</h2>
        <Chart points={points} currency={b.currency} />
        {points.some((p) => p.derivedFrom === "MONTH") && (
          // Saying this out loud is the point of storing `derivedFrom` at all.
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
            Monthly estimates spread evenly across each month — daily variation
            is not measured.
          </p>
        )}
      </section>

      {b.summary && (
        <section style={{ marginTop: "2rem" }} className="prose">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "0.75rem" }}>Notes</h2>
          {b.summary.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: "0.75rem" }}>{p}</p>)}
        </section>
      )}

      {b.links.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "0.75rem" }}>Links</h2>
          <ul>
            {b.links.map((l) => (
              <li key={l.url} style={{ marginBottom: "0.375rem" }}>
                <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
                  {l.label ?? l.handle ?? l.platform.toLowerCase()}
                </a>
                {l.followerCount != null && (
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                    {" "}· {l.followerCount.toLocaleString("en-US")} followers
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {b.sources.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "0.75rem" }}>Sources</h2>
          <ol style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {b.sources.map((s) => (
              <li key={s.url} style={{ marginBottom: "0.375rem" }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.title}</a>
                {s.note && ` — ${s.note}`}
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  );
}
