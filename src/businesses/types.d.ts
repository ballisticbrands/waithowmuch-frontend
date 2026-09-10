/** A metric key on the Business record that a `stat` block may reference. */
export type MetricKey =
  | "latestMonthlyRevenue"
  | "latestMonthlyProfit"
  | "latestMarginPct"
  | "startingCost";

export type Block =
  | { type: "heading"; text: string }
  | { type: "prose"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; text: string }
  /** Renders a figure pulled from the DB — never a hardcoded number. */
  | { type: "stat"; metric: MetricKey; label: string }
  /** Renders the monthly series from the DB. */
  | { type: "chart" }
  | { type: "timeline"; items: Array<{ when: string; what: string }> };

export type Profile = {
  /** Rendered under the name, above the figures. */
  intro?: string;
  blocks: Block[];
};

export function profileFor(slug: string): Profile | undefined;
