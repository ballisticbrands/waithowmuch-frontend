import { Link, useNavigate } from "react-router-dom";
import type { BusinessCard } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, percent, monthLabel, ageLabel } from "@/lib/format";
import { startingCostFigure } from "@/lib/starting-cost";
import { Provenance } from "./Provenance";
import { InfoTip } from "./InfoTip";

/** What "To start" means, behind the ⓘ on the column heading. */
const TO_START_INFO = [
  "What it would cost to validate launching a competitor: the least it takes to put a copy of this business on Amazon and find out whether it sells.",
  "It covers a first order of 50 units (30 of them go to Amazon Vine for the first reviews), the ads that test whether the rest sell, and setup — the seller account, a trademark, samples, photos and packaging. It is an estimate, shown at its low end, not what the founders spent.",
  "Each business’s “What it costs to start” section works it out step by step: follow the link under the figure.",
];

/** Column headings for the rows below. Hidden on narrow screens, where the
 *  row folds and each figure carries its own label instead.
 *
 *  The plain headings are aria-hidden, since every row's figure carries its
 *  own label; "To start" is not, because its ⓘ is a real button and a focusable
 *  control must not sit inside an aria-hidden subtree. */
export function IdeaRowHead() {
  return (
    <div data-row-head>
      <span aria-hidden="true" />
      <span aria-hidden="true">Business</span>
      <span aria-hidden="true">Profit / mo</span>
      <span aria-hidden="true">Margin</span>
      <span data-row-head-info>
        To start <InfoTip label="To start" paragraphs={TO_START_INFO} />
      </span>
      <span aria-hidden="true">Age</span>
    </div>
  );
}

export function IdeaRow({ business: b }: { business: BusinessCard }) {
  const navigate = useNavigate();
  const toStart = startingCostFigure(b);
  /* 🚨 Not a <Link>: the whole row already is one, and an <a> inside an <a> is
     invalid HTML that browsers repair by splitting the row apart. A click
     target that cancels the row's navigation and makes its own does the job,
     with role="link" and Enter so it still reads and works as a link. */
  const howItWorks = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${businessPath(b.slug)}to-start/`);
  };
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
          <dd data-figure>{money(toStart, b.currency)}</dd>
          {toStart !== null && (
            <dd data-row-sub>
              <span
                role="link"
                tabIndex={0}
                data-row-link
                onClick={howItWorks}
                onKeyDown={(e) => {
                  if (e.key === "Enter") howItWorks(e);
                }}
              >
                How it’s worked out
              </span>
            </dd>
          )}
        </dl>
        <dl data-row-stat>
          <dt>Age</dt>
          <dd data-figure>{ageLabel(b.establishedAt)}</dd>
        </dl>
      </div>
    </Link>
  );
}
