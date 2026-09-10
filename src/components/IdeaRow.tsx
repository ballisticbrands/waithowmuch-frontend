import { Link } from "react-router-dom";
import type { BusinessCard } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, percent } from "@/lib/format";

/** Column headings for the rows below. Hidden on narrow screens, where the
 *  row folds and each figure carries its own label instead. */
export function IdeaRowHead() {
  return (
    <div data-row-head aria-hidden="true">
      <span />
      <span>Business</span>
      <span>Revenue / mo</span>
      <span>Margin</span>
      <span>To start</span>
    </div>
  );
}

export function IdeaRow({ business: b }: { business: BusinessCard }) {
  return (
    <Link data-row to={businessPath(b.slug)}>
      {b.logoUrl ? (
        <img data-row-logo src={b.logoUrl} alt="" loading="lazy" width={44} height={44} />
      ) : (
        // alt="" and aria-hidden: the business name is right beside it, so
        // announcing an initial would just be noise.
        <div data-row-logo data-fallback aria-hidden="true">{b.name.charAt(0).toUpperCase()}</div>
      )}

      <div style={{ minWidth: 0 }}>
        <div data-row-name>{b.name}</div>
        {b.tagline && <div data-row-tagline>{b.tagline}</div>}
        {b.categories.length > 0 && (
          <div data-row-tags>
            {b.categories.slice(0, 3).map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
          </div>
        )}
      </div>

      <div data-row-stats style={{ display: "contents" }}>
        <dl data-row-stat>
          <dt>Revenue / mo</dt>
          <dd data-figure>{money(b.latestMonthlyRevenue, b.currency)}</dd>
        </dl>
        <dl data-row-stat>
          <dt>Margin</dt>
          <dd data-figure>{percent(b.latestMarginPct)}</dd>
        </dl>
        <dl data-row-stat>
          <dt>To start</dt>
          <dd data-figure>{money(b.startingCost, b.currency)}</dd>
        </dl>
      </div>
    </Link>
  );
}
