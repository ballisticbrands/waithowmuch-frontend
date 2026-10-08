import type { BusinessDetail, ChartPoint, MetricsResponse } from "@/lib/api";

type Dec = string | number;
import { rowsOfType } from "@/lib/api";
import type { Block, Fact, Profile } from "@/businesses/types";
import { ageLabel, exactMoney, money, percent, price, monthLabel } from "@/lib/format";
import { startingCostFigure, startingCostRange } from "@/lib/starting-cost";
import { METRIC_INFO } from "@/data/metric-info";
import { scoreProfile, ttmWindow, valuationAsOf } from "@/valuation/inputs.mjs";
import { InfoTip } from "./InfoTip";
import { PerformanceChart } from "./PerformanceChart";

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
/**
 * Revenue, profit and margin in ONE card.
 *
 * They are three readings of the same month off the same row, and as three
 * cards they took the whole headline row — on a phone, three full-width
 * blocks before anything else. Together they also read as what they are: a
 * month's trading, not three unrelated figures. The month is stated once,
 * under all three, for the same reason it was on each card before.
 */
function MonthlyCard({
  revenue,
  profit,
  margin,
  basis,
  link,
}: {
  revenue: string;
  profit: string;
  margin: string;
  basis: string;
  link?: { href: string; label: string };
}) {
  return (
    <div data-card="" data-monthly="">
      <span data-card-label="">Monthly performance</span>
      <dl data-monthly-figures="">
        <div>
          <dt>Revenue</dt>
          <dd data-figure="">{revenue}</dd>
        </div>
        <div>
          <dt>Profit</dt>
          <dd data-figure="">{profit}</dd>
        </div>
        <div>
          <dt>Margin</dt>
          <dd data-figure="">{margin}</dd>
        </div>
      </dl>
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

export function AverageCard({
  label,
  value,
  basis,
  link,
  info,
  infoExtra,
}: {
  label: string;
  value: string;
  basis: string;
  link?: { href: string; label: string };
  /** Key into METRIC_INFO, as on a metric cell: the ⓘ beside the label. */
  info?: string;
  /** This business's own paragraphs, after the shared ones. */
  infoExtra?: string[];
}) {
  const shared = info ? METRIC_INFO[info] : undefined;
  const paragraphs = shared || infoExtra?.length ? [...(shared ?? []), ...(infoExtra ?? [])] : undefined;
  return (
    <div data-card="">
      <span data-card-label="">
        {label}
        {paragraphs && <InfoTip label={label} paragraphs={paragraphs} />}
      </span>
      <strong data-card-value="" data-figure="">
        {value}
      </strong>
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
  infoExtra,
  learnMore,
  wide,
  text,
}: {
  label: string;
  value: string;
  note?: string;
  info?: string;
  /** This business's own paragraphs, after the shared ones. */
  infoExtra?: string[];
  /** Path to the reference page for this attribute — see InfoTip. */
  learnMore?: string;
  wide?: boolean;
  /** This value is WORDS, not a quantity. `data-figure` buys tabular figures
   *  and tightened tracking, which is right for $8.87 and wrong for
   *  "Broad catalogue, low volume each" — set in it, a phrase reads as a code. */
  text?: boolean;
}) {
  const shared = info ? METRIC_INFO[info] : undefined;
  const paragraphs = shared || infoExtra?.length ? [...(shared ?? []), ...(infoExtra ?? [])] : undefined;
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

/** Where a keyword reading came from, as a reader should see it. */
const READING_SOURCE: Record<string, string> = {
  asinsight: "ASINsight's report of Amazon Brand Analytics",
  junglescout: "Jungle Scout",
  amazon_sqp: "Amazon Brand Analytics",
};

/** This business's "to start" working, in the order the formula adds it up. */
function startingCostWorking(b: BusinessDetail): string[] | undefined {
  const e = b.startingCostEstimate;
  if (!e) return undefined;
  const { inputs, breakdown, keywordReading: r } = e;
  const span = (x: { low: Dec; high: Dec }, f = exactMoney) =>
    Number(x.low) === Number(x.high) ? f(x.low, b.currency) : `${f(x.low, b.currency)}–${f(x.high, b.currency)}`;
  /* The validation test (model 2026-10-08 on): what "What it costs to start"
     shows, every product at once. Said in its own terms, not the launch's. */
  const v = breakdown.validation;
  if (v) {
    const t = v.together;
    const products = v.products.length === 1 ? "the product" : `each of its ${v.products.length} products`;
    return [
      `For this business it is the validation test: what it costs to find out whether it sells — ${span(e)}, shown at its low end.`,
      `First order ${exactMoney(t.inventory, b.currency)} — ${v.gate.firstOrderUnits} units of ${products}, ${v.gate.vineUnits} of them to Amazon Vine for the first reviews.`,
      `Test ads ${exactMoney(t.ads, b.currency)} at most — enough clicks on searches naming ${v.variant.kind === "version" ? "each product’s version" : v.variant.label} to show whether the other ${v.gate.paidUnits} sell.`,
      `Setup ${span(breakdown.parts.setup)}. If the test passes, the units the ads sell pay back about ${exactMoney(t.moneyBack, b.currency)} after Amazon’s fees.`,
    ];
  }
  const skus = inputs.launchSkus === 1 ? "one product" : `${inputs.launchSkus} products`;
  const week = monthLabel(r.periodStart);
  const read =
    r.calibrationFactor !== null
      ? `${r.rawVolume.toLocaleString("en-US")} searches in a week of ${week}, from ${READING_SOURCE[r.source] ?? r.source}, adjusted ×${Number(r.calibrationFactor)} to Amazon's own counts`
      : `from ${READING_SOURCE[r.source] ?? r.source}, as of ${week}`;
  const lines = [
    `For this business: ${span(e)}, shown at its low end.`,
    `First order ${span(breakdown.parts.inventory)} — ${skus} at a ${inputs.moq.toLocaleString("en-US")}-unit minimum, ${span(inputs.landedUnitCost, price)} a unit landed.`,
    `Launch ads ${span(breakdown.parts.ads)} — ranking for “${r.keyword}”, about ${Math.round(r.monthlySearches / 1000).toLocaleString(
      "en-US",
    )}k Amazon searches a month (${read}; ${e.competition.toLowerCase()} competition), at ${span({ low: e.cpcLow, high: e.cpcHigh }, price)} a click.`,
    `Setup ${span(breakdown.parts.setup)}${breakdown.parts.tooling ? `, tooling ${span(breakdown.parts.tooling)}` : ""}.`,
  ];
  return e.note ? [...lines, e.note] : lines;
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
  /* 🚨 The four headline cards state ONE MONTH — the latest published one,
     off the Business row — not an average. They used to read a trailing
     twelve months, which is how a broker prices a listing, but a TTM revenue
     beside a single-month profit invites the reader to divide one by the
     other and get a margin the page does not show. One month across all four
     is the only version that survives that arithmetic. The chart below still
     draws every month, and TACoS in Additional metrics is still a TTM ratio
     — it says so on its own note.

     The month is on each basis line rather than in the label: "Monthly
     revenue · Sep 2026" wraps to two lines in a card. */
  const ttm = metrics.length >= 12;
  const recent = ttm ? metrics.slice(-12) : metrics;
  const revenues = recent.map((p) => num(p.revenue) ?? 0);
  /* Ad spend is a metric TYPE now, not a field on a charted point — the chart
     pivot carries revenue and profit only.

     🚨 The type is `ad_spend`, the backend registry's spelling. This read
     `adSpend` before, matched no row, and silently hid both the ad spend
     figure and TACoS on every profile. */
  const allAdRows = rowsOfType(series ?? null, "ad_spend");
  const adRows = allAdRows.length >= 12 ? allAdRows.slice(-12) : allAdRows;
  const adSpends = adRows.map((r) => Number(r.value));

  const n = recent.length;

  /* The three figures the Business row carries for its latest period. The row
     is the same source the /data/ listing, the share card and the crawler HTML
     read, so a card cannot disagree with the row that links to it. */
  const monthlyRevenue = num(b.latestMonthlyRevenue);
  const monthlyProfit = num(b.latestMonthlyProfit);
  /* Stored, not derived — but a row with the two figures and no percentage
     still has a margin, and it is the one the reader would work out. */
  const margin =
    num(b.latestMarginPct) ??
    (monthlyRevenue && monthlyProfit !== null ? (monthlyProfit / monthlyRevenue) * 100 : null);
  const monthBasis = b.latestPeriod ? monthLabel(b.latestPeriod) : "Latest published month";

  /* Ad spend lost its headline card: it is an input, not a result, and on a
     phone it pushed the figures the page is about below the fold. The series
     still draws it on the chart, and what the grid keeps is TACoS — a ratio,
     so it takes the totals rather than the mean of the monthly rates, and
     only when both series cover the same months. */
  const derivedFacts: Fact[] = [];
  if (adSpends.length === n && n > 0) {
    if (sum(revenues)) {
      derivedFacts.push({
        label: "TACoS",
        value: percent((sum(adSpends) / sum(revenues)) * 100),
        note: ttm ? "Ad spend against revenue, trailing 12 months" : "Ad spend against all revenue",
        info: "tacos",
      });
    }
  }
  /* 🚨 COGS is DERIVED from the margin block, never typed here. It is the
     same line the Margin breakdown page draws, so a corrected cost moves both
     at once — two copies of the figure is how the overview comes to disagree
     with the breakdown it links to. Matched on `key`, not on the label. */
  /* A brand split into product tabs keeps its whole-brand margin in the
     `blended` tab — that is the one the profit series is built from. */
  const blended = profile?.blocks
    .flatMap((blk) => (blk.type === "product-margins" ? blk.products.filter((p) => p.blended) : []))
    .flatMap((p) => p.blocks);
  const marginBlock = [...(blended ?? []), ...(profile?.blocks ?? [])].find(
    (blk): blk is Extract<Block, { type: "margin" }> => blk.type === "margin",
  );
  const cogsLine = marginBlock?.lines.find((l) => l.key === "cogs");
  const timeline =
    profile?.blocks.find((blk): blk is Extract<Block, { type: "timeline" }> => blk.type === "timeline")?.items ?? [];
  if (marginBlock && cogsLine) {
    const marginHref = profile ? sectionOf(profile, (blk) => blk.type === "margin" || blk.type === "product-margins") : null;
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

  /* "To start" and the age are CARDS now (the headline row), not cells here:
     two copies of a figure is how an overview comes to disagree with itself. */
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

  const startingCost = startingCostFigure(b);
  const range = startingCost === null ? null : startingCostRange(b);
  const startingCostRangeNote = range
    ? `Estimated, ${exactMoney(range.low, b.currency)}–${exactMoney(range.high, b.currency)}`
    : null;

  const facts = [...derivedFacts, ...(profile?.facts ?? [])];

  return (
    <section data-glance="" aria-label="Key figures">
      <div data-cards="">
        <MonthlyCard
          revenue={monthlyRevenue === null ? "—" : exactMoney(Math.round(monthlyRevenue), b.currency)}
          profit={monthlyProfit === null ? "—" : exactMoney(Math.round(monthlyProfit), b.currency)}
          margin={percent(margin)}
          basis={monthBasis}
          link={n ? { href: chartHref, label: "View the figures" } : undefined}
        />
        {/* What it took to start and how long it has been going: the two
            questions a reader asks straight after "what does it make". Both
            were cells in Additional metrics, where the figures the page is
            about had to be scrolled to. */}
        <AverageCard
          label="To start"
          value={startingCost === null ? "—" : exactMoney(startingCost, b.currency)}
          basis={
            startingCostRangeNote ?? (startingCost === null ? "Not researched yet" : "Estimated")
          }
          info="toStart"
          infoExtra={startingCostWorking(b)}
        />
        <AverageCard
          label="Age"
          value={b.establishedAt ? ageLabel(b.establishedAt) : "—"}
          basis={b.establishedAt ? `Listed ${monthLabel(b.establishedAt)}` : "Listing date unknown"}
          info="listedSince"
        />
      </div>

      {/* Directly under the averages: the chart is the months they were taken
          over. The additional metrics follow it. */}
      {n >= 2 && (
        <PerformanceChart
          points={metrics}
          adSpend={allAdRows}
          timeline={timeline}
          currency={b.currency}
          detail={{ href: chartHref, label: "See Revenue" }}
        />
      )}

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
  profile,
}: {
  business: BusinessDetail;
  series: MetricsResponse | null;
  /* The whole profile, not profile.valuation — scoreProfile reads the frozen
     scoring date off `snapshotMonth`, which the page sets from the row. */
  profile: Profile;
}) {
  const valuation = profile.valuation;
  const scored = scoreProfile(profile, series);
  /* 🚨 The date the model actually scored at, read from the same function that
     scores it rather than restated here. The age factor moves the multiple by
     up to 0.5 depending on this date, so a multiple published without it is a
     figure a reader cannot check. */
  const asOf = valuationAsOf(series, profile);
  const window = ttmWindow(series);
  if (!scored || scored.multiple === null || scored.value === null) return null;
  const { multiple, netProfitTtm: ttmProfit } = scored;

  return (
    <div data-cards="">
      <HeadlineCard
        label="Indicative valuation"
        value={money(scored.value, b.currency)}
        sub={valuation?.basis}
        big
      />
      <HeadlineCard
        label="Multiple"
        value={`${multiple}×`}
        /* Where the multiple came from AND when it was struck. The second half
           is not housekeeping: this business crossed the model's 18-month line
           in July 2026 and the multiple moved 2.5 -> 2.9 on the calendar
           alone. It is pinned now, and saying which month it is pinned to is
           what makes that visible rather than merely fixed. */
        sub={[valuation?.note, asOf ? `Scored as of ${monthLabel(asOf.toISOString())}` : null]
          .filter(Boolean)
          .join(" · ")}
      />
      <HeadlineCard
        label="On"
        value={`${money(ttmProfit, b.currency)} net profit`}
        sub={window ? `Trailing twelve months, ${monthLabel(window.from)} – ${monthLabel(window.to)}` : undefined}
      />
    </div>
  );
}
