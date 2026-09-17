import { Link } from "react-router-dom";
import type { BusinessCard } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, percent, monthLabel, ageLabel } from "@/lib/format";
import { Provenance } from "./Provenance";

/** Column headings for the rows below. Hidden on narrow screens, where the
 *  row folds and each figure carries its own label instead. */
export function IdeaRowHead() {
  return (
    <div data-row-head aria-hidden="true">
      <span />
      <span>Business</span>
      <span>Profit / mo</span>
      <span>Margin</span>
      <span>To start</span>
      <span>Age</span>
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
        {/* The researched headline is the row's title; the business name
            leads the line beneath it, followed by the headline's subtitle
            (or the tagline, for a business without researched copy yet). A
            business without a headline keeps its name as the title. */}
        <div data-row-name>{b.title || b.name}</div>
        {b.title ? (
          <div data-row-subtitle>
            {[b.name, b.subtitle || b.tagline].filter(Boolean).join(" · ")}
          </div>
        ) : (
          (b.subtitle || b.tagline) && <div data-row-subtitle>{b.subtitle || b.tagline}</div>
        )}

        {/* Where the figures came from, and what month they were true of.
            A business row is DYNAMIC — `latestMonthlyRevenue` is rewritten on
            every metric refresh — so an undated number quietly claims to be
            current forever. Saying the month is what makes a moving figure an
            honest one, and it is the half of `researchMethod` a reader can
            actually act on. */}
        <div data-row-provenance>
          <Provenance method={b.researchMethod} />
          {b.latestPeriod && <span data-row-asof>as of {monthLabel(b.latestPeriod)}</span>}
        </div>

        {b.categories.length > 0 && (
          <div data-row-tags>
            {b.categories.slice(0, 3).map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
          </div>
        )}
      </div>

      {/* display is set in CSS, not inline: the narrow-screen rule has to be
          able to override it, and an inline style always wins over a media query. */}
      <div data-row-stats>
        <dl data-row-stat>
          <dt>Profit / mo</dt>
          <dd data-figure>{money(b.latestMonthlyProfit, b.currency)}</dd>
        </dl>
        <dl data-row-stat>
          <dt>Margin</dt>
          <dd data-figure>{percent(b.latestMarginPct)}</dd>
          {b.latestMonthlyRevenue != null && (
            <dd data-row-sub data-figure>{money(b.latestMonthlyRevenue, b.currency)} revenue</dd>
          )}
        </dl>
        <dl data-row-stat>
          <dt>To start</dt>
          <dd data-figure>{money(b.startingCost, b.currency)}</dd>
        </dl>
        <dl data-row-stat>
          <dt>Age</dt>
          <dd data-figure>{ageLabel(b.establishedAt)}</dd>
        </dl>
      </div>
    </Link>
  );
}
