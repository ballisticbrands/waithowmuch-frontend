import { Link } from "react-router-dom";
import type { BusinessCard } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, percent, monthLabel, METHOD_LABEL } from "@/lib/format";

/** One result in the ideas grid. "Idea" is the product's word for a researched
 *  business — the DB calls it a Business, and the two do not need to agree. */
export function IdeaCard({ business: b }: { business: BusinessCard }) {
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
          <dt>Margin</dt>
          <dd data-figure>{percent(b.latestMarginPct)}</dd>
        </div>
        <div data-stat>
          <dt>To start</dt>
          <dd data-figure>{money(b.startingCost, b.currency)}</dd>
        </div>
      </dl>

      <div data-tags>
        <span data-tag>{METHOD_LABEL[b.researchMethod] ?? b.researchMethod}</span>
        {b.latestPeriod && <span data-tag>as of {monthLabel(b.latestPeriod)}</span>}
        {b.categories.slice(0, 3).map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
      </div>
    </Link>
  );
}
