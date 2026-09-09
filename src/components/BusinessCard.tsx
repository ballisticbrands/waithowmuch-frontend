import { Link } from "react-router-dom";
import type { BusinessCard as Card } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, percent, monthLabel } from "@/lib/format";
import { Provenance } from "./Provenance";

export function BusinessCard({ business: b }: { business: Card }) {
  return (
    <Link data-card to={businessPath(b.slug)}>
      <div data-card-name>{b.name}</div>
      {b.tagline && <div data-card-tagline>{b.tagline}</div>}

      <dl data-stat-row>
        <div data-stat>
          <dt>Revenue / mo</dt>
          <dd data-figure>{money(b.latestMonthlyRevenue, b.currency)}</dd>
        </div>
        <div data-stat>
          <dt>Profit / mo</dt>
          <dd data-figure>{money(b.latestMonthlyProfit, b.currency)}</dd>
        </div>
        <div data-stat>
          <dt>Margin</dt>
          <dd data-figure>{percent(b.latestMarginPct)}</dd>
        </div>
      </dl>

      <div style={{ marginTop: "0.875rem", display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "center" }}>
        <Provenance method={b.researchMethod} />
        {b.latestPeriod && (
          <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            as of {monthLabel(b.latestPeriod)}
          </span>
        )}
      </div>

      {b.categories.length > 0 && (
        <div style={{ marginTop: "0.625rem" }}>
          {b.categories.map((c) => (
            <span data-tag key={c.slug}>{c.name}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
