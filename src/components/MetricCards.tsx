import type { BusinessDetail, ChartPoint, MetricsResponse } from "@/lib/api";
import { latestOfType, rowsOfType } from "@/lib/api";
import type { Block, Fact, Profile } from "@/businesses/types";
import { exactMoney, money, percent, price, monthLabel } from "@/lib/format";
import { METRIC_INFO } from "@/data/metric-info";
import { scoreProfile, ttmWindow } from "@/valuation/inputs.mjs";
import { InfoTip } from "./InfoTip";

/**
 * The cards at the top of a business profile.
 *
 * Three rows, in the order a reader actually asks the questions: what is it
 * worth, what does it earn, and then everything else. The first two rows are
 * three cards each; the third is one card holding a grid, because twelve
 * separate boxes stop being scannable at about the sixth.
 *
 * ── Cards, but hairlines ─────────────────────────────────────────────────
 * The card SHAPE is borrowed; the surface is not. globals.css carries exactly
 * one shadow and says depth is carried by hairlines rather than blur, so
 * these are 1px borders on --card. A shadowed card grid here would be the
 * only blurred thing on the site.
 *
 * ── 🚨 Every figure is computed, none is typed ───────────────────────────
 * The averages, the margin, the trailing-twelve profit and the valuation all
 * derive from the metric series, so they cannot drift from the chart further
 * down the same page. An authored profile supplies the MULTIPLE and the
 * qualitative facts — words, and one number that is explicitly a knob — and
 * nothing else. See the note in businesses/index.mjs.
 */

/* ─── Primitives ──────────────────────────────────────────────────────── */

/** A headline figure. `big` is for the one number the row is about. */
export function HeadlineCard({
  label,
  value,
  sub,
  big,
}: {
  label: string;
  value: string;
  sub?: string;
  big?: boolean;
}) {
  return (
    <div data-card="" data-big={big ? "" : undefined}>
      <span data-card-label="">{label}</span>
      <strong data-card-value="" data-figure="">
        {value}
      </strong>
      {sub && <span data-card-sub="">{sub}</span>}
    </div>
  );
}

/**
 * An averaged figure, with the basis it was averaged over.
 *
 * 🚨 `basis` is not optional. An average with no divisor on it is the kind of
 * number a reader assumes is a trailing year when it might be six weeks, and
 * on this page every figure is supposed to say how it was reached.
 */
export function AverageCard({
  label,
  value,
  basis,
  series,
  link,
}: {
  label: string;
  value: string;
  basis: string;
  series?: number[];
  link?: { href: string; label: string };
}) {
  return (
    <div data-card="">
      <span data-card-label="">{label}</span>
      <strong data-card-value="" data-figure="">
        {value}
      </strong>
      {/* Three points is the floor. Below it the line is a corner, which
          suggests a trajectory the data cannot support. */}
      {series && series.length >= 3 && <Sparkline series={series} />}
      <span data-card-sub="">{basis}</span>
      {link && (
        <a data-card-jump="" href={link.href}>
          {link.label}
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path
              d="M8 3v10M4 9.5L8 13.5L12 9.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

/** One cell of the additional-metrics grid.
 *
 *  `info` is a key into METRIC_INFO — the ⓘ appears only when the key resolves,
 *  so a fact with no definition written yet renders as a plain cell rather
 *  than as an icon that opens an empty panel. */
export function MetricCell({
  label,
  value,
  note,
  info,
  learnMore,
  wide,
  text,
}: {
  label: string;
  value: string;
  note?: string;
  info?: string;
  /** Path to the reference page for this attribute — see InfoTip. */
  learnMore?: string;
  wide?: boolean;
  /** This value is WORDS, not a quantity. `data-figure` buys tabular figures
   *  and tightened tracking, which is right for $8.87 and wrong for
   *  "Broad catalogue, low volume each" — set in it, a phrase reads as a code. */
  text?: boolean;
}) {
  const paragraphs = info ? METRIC_INFO[info] : undefined;
  return (
    <div data-metric="" data-wide={wide ? "" : undefined}>
      <dt>
        {label}
        {paragraphs && <InfoTip label={label} paragraphs={paragraphs} learnMore={learnMore} />}
      </dt>
      <dd data-figure={text ? undefined : ""} data-text={text ? "" : undefined}>{value}</dd>
      {note && <span data-metric-note="">{note}</span>}
    </div>
  );
}

/** Shape only — no axis, no labels. It says "rising", "spiky" or "flat". */
export function Sparkline({ series }: { series: number[] }) {
  const w = 200;
  const h = 34;
  const min = Math.min(...series);
  const max = Math.max(...series);
  // A flat series would divide by zero and put every point at NaN.
  const span = max - min || 1;
  const pts = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - 2 - ((v - min) / span) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} data-spark="" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ─── The composed section ────────────────────────────────────────────── */

const num = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** Per-order money at the grain an order is actually priced in — $1.24, not
 *  $1. exactMoney rounds to whole units, which on an $8.87 order collapses
 *  every cost line onto the same figure. */
const perOrder = (v: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Math.abs(v));

/**
 * The section a block sits in, so a tooltip can link to the page that argues
 * the figure in full.
 *
 * 🚨 Returns null on an UNPAGINATED profile too, and that is correct: with no
 * section markers the whole profile is one page, the margin table is already
 * on screen, and a "Learn more" pointing at the page you are reading is worse
 * than none.
 */
function sectionOf(profile: Profile, match: (b: Block) => boolean): string | null {
  let current: string | null = null;
  for (const b of profile.blocks) {
    if (b.type === "section") current = b.id;
    if (match(b)) return current;
  }
  return null;
}

export function TopMetrics({
  business: b,
  metrics,
  series,
  profile,
  chartHref = "#earnings",
}: {
  business: BusinessDetail;
  metrics: ChartPoint[];
  /** The whole series. `metrics` is the revenue/profit pivot; anything else —
   *  ad spend here — has to be read from the rows. */
  series?: MetricsResponse | null;
  profile?: Profile;
  /** Where "View the figures" jumps to. */
  chartHref?: string;
}) {
  const revenues = metrics.map((p) => num(p.revenue) ?? 0);
  const profits = metrics.map((p) => num(p.profit) ?? 0);
  /* Ad spend is a metric TYPE now, not a field on a charted point — the chart
     pivot carries revenue and profit only. */
  const adSpends = rowsOfType(series ?? null, "adSpend").map((r) => Number(r.value));

  const n = metrics.length;
  const avgRevenue = n ? sum(revenues) / n : num(b.latestMonthlyRevenue);
  const avgProfit = n ? sum(profits) / n : num(b.latestMonthlyProfit);

  // From the totals, not the mean of the monthly rates: a mean of percentages
  // weights a $14k month the same as a $349k one.
  const margin = n && sum(revenues) ? (sum(profits) / sum(revenues)) * 100 : num(b.latestMarginPct);

  const basis = n
    ? n === 1
      ? `${monthLabel(metrics[0]!.periodStart)} only`
      : `Averaged over ${n} months, ${monthLabel(metrics[0]!.periodStart)} – ${monthLabel(metrics[n - 1]!.periodStart)}`
    : "Latest published month";

  // Ad spend is on the series but has no home in the headline rows, so it
  // lands here — derived, never typed. TACoS is a ratio, so it takes the
  // totals rather than the mean of the monthly rates.
  const derivedFacts: Fact[] = [];
  if (adSpends.length === n && n > 0) {
    derivedFacts.push({
      label: "Ad spend / mo",
      value: exactMoney(latestOfType(series ?? null, "adSpend"), b.currency),
      note: "Latest month",
      info: "adSpend",
    });
    if (sum(revenues)) {
      derivedFacts.push({
        label: "TACoS",
        value: percent((sum(adSpends) / sum(revenues)) * 100),
        note: "Ad spend against all revenue",
        info: "tacos",
      });
    }
  }
  /* 🚨 COGS is DERIVED from the margin block, never typed here. It is the
     same line the Margin breakdown page draws, so a corrected cost moves both
     at once — two copies of the figure is how the overview comes to disagree
     with the breakdown it links to. Matched on `key`, not on the label. */
  const marginBlock = profile?.blocks.find(
    (blk): blk is Extract<Block, { type: "margin" }> => blk.type === "margin",
  );
  const cogsLine = marginBlock?.lines.find((l) => l.key === "cogs");
  if (marginBlock && cogsLine) {
    const marginHref = profile ? sectionOf(profile, (blk) => blk.type === "margin") : null;
    derivedFacts.push({
      label: "COGS",
      value: percent(Math.abs(cogsLine.pct)),
      note: `${perOrder((cogsLine.pct / 100) * marginBlock.basis.value, b.currency)} of a ${perOrder(
        marginBlock.basis.value,
        b.currency,
      )} order`,
      info: "cogs",
      learnMore: marginHref ? `/business/${encodeURIComponent(b.slug)}/${marginHref}/` : undefined,
    });
  }

  /* Yes/no, and read off the same answer the valuation board scores rather
     than authored a second time in the facts array. */
  const registry = profile?.valuation?.inputs?.answers?.brandRegistry;
  if (registry === "yes" || registry === "no") {
    derivedFacts.push({
      label: "Brand Registry",
      value: registry === "yes" ? "Yes" : "No",
      info: "brandRegistry",
      text: true,
    });
  }

  if (num(b.startingCost) !== null) {
    derivedFacts.push({
      label: "To start",
      value: exactMoney(b.startingCost, b.currency),
      info: "toStart",
    });
  }
  /* Both prices come off the sales-breakdown block rather than being typed
     beside it, so the grid and the table on the Revenue page cannot disagree
     — and the blend moves the moment a row is corrected.

     🚨 The blended figure is revenue over UNITS, not over orders. Nothing
     public says how many items a customer buys at once, so an "average order"
     here would claim a denominator nobody has. */
  const breakdown = profile?.blocks.find((blk) => blk.type === "breakdown");
  if (breakdown && breakdown.type === "breakdown") {
    const rows = breakdown.items;
    const revenue = sum(rows.map((r) => r.revenue));
    const units = sum(rows.map((r) => r.sold ?? 0));
    const top = rows.reduce((a, r) => (r.revenue > a.revenue ? r : a), rows[0]!);

    if (top?.price !== undefined) {
      derivedFacts.push({
        label: "Top seller retail price",
        value: price(top.price, b.currency),
        note: units > 0 ? `${Math.round(((top.sold ?? 0) / units) * 100)}% of units` : undefined,
        info: "topSellerPrice",
      });
    }
    if (units > 0 && revenue > 0) {
      derivedFacts.push({
        label: "Avg. retail price",
        value: price(revenue / units, b.currency),
        note: `Blended across ${rows.filter((r) => r.price !== undefined).length} priced SKUs`,
        info: "avgRetailPrice",
      });
    }
  }

  if (b.establishedAt) {
    derivedFacts.push({
      label: "Listed since",
      value: b.establishedAt.slice(0, 4),
      info: "listedSince",
    });
  }
  const facts = [...derivedFacts, ...(profile?.facts ?? [])];

  return (
    <section data-glance="" aria-label="Key figures">
      <div data-cards="">
        <AverageCard
          label="Avg. monthly revenue"
          value={avgRevenue === null ? "—" : exactMoney(Math.round(avgRevenue), b.currency)}
          basis={basis}
          series={revenues}
        />
        <AverageCard
          label="Avg. monthly profit"
          value={avgProfit === null ? "—" : exactMoney(Math.round(avgProfit), b.currency)}
          basis={basis}
          series={profits}
        />
        <AverageCard
          label="Profit margin"
          value={percent(margin)}
          basis={n ? "Total profit against total revenue over the same months" : "Latest published month"}
          link={n ? { href: chartHref, label: "View the figures" } : undefined}
        />
      </div>

      {facts.length > 0 && (
        <div data-card="" data-metric-card="">
          <h2 data-card-label="">Additional metrics</h2>
          <dl data-metric-grid="">
            {facts.map((f) => (
              <MetricCell key={f.label} {...f} />
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

/**
 * The valuation cards — its own section rather than the top of the overview.
 *
 * 🚨 The VALUE is never stored. It is the profile's multiple applied to
 * trailing-twelve net profit summed from the metric series, so it cannot
 * disagree with the chart, and it disappears entirely when there are fewer
 * than twelve months: a "TTM" figure built from seven is the single most
 * misleading number a profile can carry.
 */
export function ValuationCards({
  business: b,
  series,
  valuation,
}: {
  business: BusinessDetail;
  series: MetricsResponse | null;
  valuation: NonNullable<Profile["valuation"]>;
}) {
  const scored = scoreProfile(valuation, series);
  const window = ttmWindow(series);
  if (!scored || scored.multiple === null || scored.value === null) return null;
  const { multiple, netProfitTtm: ttmProfit } = scored;

  return (
    <div data-cards="">
      <HeadlineCard
        label="Indicative valuation"
        value={money(scored.value, b.currency)}
        sub={valuation.basis}
        big
      />
      <HeadlineCard label="Multiple" value={`${multiple}×`} sub={valuation.note} />
      <HeadlineCard
        label="On"
        value={`${money(ttmProfit, b.currency)} net profit`}
        sub={window ? `Trailing twelve months, ${monthLabel(window.from)} – ${monthLabel(window.to)}` : undefined}
      />
    </div>
  );
}
