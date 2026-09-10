import type { Block, MetricKey, Profile } from "@/businesses/types";
import type { BusinessDetail, ChartPoint } from "@/lib/api";
import { Chart } from "./Chart";
import { exactMoney, percent } from "@/lib/format";

/** Resolve a stat reference against the live DB record. Never a literal. */
function statValue(metric: MetricKey, b: BusinessDetail): string {
  switch (metric) {
    case "latestMarginPct":
      return percent(b.latestMarginPct);
    case "latestMonthlyRevenue":
      return exactMoney(b.latestMonthlyRevenue, b.currency);
    case "latestMonthlyProfit":
      return exactMoney(b.latestMonthlyProfit, b.currency);
    case "startingCost":
      return exactMoney(b.startingCost, b.currency);
  }
}

function BlockView({ block, business, metrics }: { block: Block; business: BusinessDetail; metrics: ChartPoint[] }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "prose":
      return <p>{block.text}</p>;
    case "list":
      return <ul>{block.items.map((i, n) => <li key={n}>{i}</li>)}</ul>;
    case "quote":
      return (
        <blockquote style={{ borderLeft: "3px solid var(--border-strong)", paddingLeft: "1rem", margin: "1.25rem 0", color: "var(--muted-foreground)" }}>
          <p style={{ marginBottom: block.attribution ? "0.35rem" : 0 }}>{block.text}</p>
          {block.attribution && <cite style={{ fontSize: "0.8125rem", fontStyle: "normal" }}>— {block.attribution}</cite>}
        </blockquote>
      );
    case "callout":
      return <div data-notice style={{ margin: "1.25rem 0" }}><div>{block.text}</div></div>;
    case "stat":
      return (
        <dl data-stat-row style={{ margin: "1rem 0" }}>
          <div data-stat data-size="lg">
            <dt>{block.label}</dt>
            <dd data-figure>{statValue(block.metric, business)}</dd>
          </div>
        </dl>
      );
    case "chart":
      return <div style={{ margin: "1.25rem 0" }}><Chart points={metrics} currency={business.currency} /></div>;
    case "timeline":
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
          {block.items.map((i, n) => (
            <li key={n} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ minWidth: "6rem", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{i.when}</span>
              <span>{i.what}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export function ProfileBlocks({ profile, business, metrics }: { profile: Profile; business: BusinessDetail; metrics: ChartPoint[] }) {
  return (
    <div data-prose>
      {profile.blocks.map((b, i) => <BlockView key={i} block={b} business={business} metrics={metrics} />)}
    </div>
  );
}
