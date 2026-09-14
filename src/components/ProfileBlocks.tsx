import type { Block, MetricKey, Profile } from "@/businesses/types";
import { sourceWindow, type BusinessDetail, type ChartPoint, type MetricsResponse } from "@/lib/api";
import { EarningsCard } from "./Earnings";
import { dayLabel, exactMoney, percent } from "@/lib/format";
import { MetricCell, ValuationCards } from "./MetricCards";
import { ValuationBoard } from "./ValuationBoard";
import { SalesBreakdown } from "./SalesBreakdown";
import { MarginBreakdown, BlockTable } from "./MarginBreakdown";
import { Channels } from "./Channels";
import { SellingMethods } from "./SellingMethods";
import { ProfileLinks } from "./ProfileLinks";

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

/**
 * "As of" for one section — the day its facts were read.
 *
 * 🚨 A different date from the headline's frozen MONTH and from the date the
 * valuation was scored at, and deliberately so. Those describe a reporting
 * period; this describes when somebody looked. A traffic figure read on Sep 9
 * is not a statement about September, and flattening the three into one date
 * would make two of them wrong.
 */
function SectionAsOf({ value, business }: { value: true | string; business: BusinessDetail }) {
  if (typeof value === "string") {
    return <p data-section-asof="">Effective {dayLabel(value)}.</p>;
  }
  const win = sourceWindow(business.sources);
  /* No dated sources, no claim. Printing "as of —" would be worse than
     silence: it asserts that the question was asked and answered. */
  if (!win) return null;
  return (
    <p data-section-asof="">
      {win.from === win.to
        ? `Read ${dayLabel(win.to)}.`
        : `Read ${dayLabel(win.from)} – ${dayLabel(win.to)}.`}{" "}
      Figures here are a reading taken then, not a live feed.
    </p>
  );
}

function BlockView({ block, business }: { block: Block; business: BusinessDetail }) {
  switch (block.type) {
    case "section":
      /* The marker IS the heading. ProfileBlocks wraps everything up to the
         next marker in a <section> carrying this id, which is what the table
         of contents links to. */
      return (
        <>
          <h2>{block.title}</h2>
          {block.asOf && <SectionAsOf value={block.asOf} business={business} />}
        </>
      );
    case "facts":
      return (
        <dl data-metric-grid="" data-facts-block="">
          {block.items.map((f) => (
            <MetricCell key={f.label} {...f} />
          ))}
        </dl>
      );
    case "heading":
      return <h2>{block.text}</h2>;
    case "lede":
      return <p data-lede="">{block.text}</p>;
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
    case "image":
      /* Not an Exhibit. The wide blocks break out of the 44rem measure because
         a chart or a table needs the column; a photograph of one object does
         not, and at full width it stops being evidence and becomes a banner. */
      return (
        <figure data-figure="">
          {/* 🚨 The cap is on the IMAGE, not the figure. Narrowing the figure
              narrows the caption with it, and a 300px-wide picture then gets a
              300px-wide column of text under it — four ragged lines of what is
              one sentence. The picture is narrow; the sentence is not. */}
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            style={block.width ? { maxWidth: `${block.width}px` } : undefined}
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "links":
      /* Same component and same record as the overview's row, so the two can
         never drift — a follower count corrected in the DB moves both. */
      return <ProfileLinks links={business.links} />;
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
    case "valuation":
    case "valuation-board":
    case "breakdown":
    case "margin":
    case "table":
    case "channels":
    case "selling":
      /* Hoisted out of the prose run by ProfileBlocks below, so these are
         unreachable — kept only because the switch is exhaustive over Block. */
      return null;
    case "timeline":
      return (
        <ol data-timeline="">
          {block.items.map((i, n) => (
            <li key={n}>
              <span data-timeline-when="">{i.when}</span>
              <span data-timeline-head="">
                {i.tag && <em data-timeline-tag="">{i.tag}</em>}
                <strong>{i.what}</strong>
              </span>
              {i.detail && <span data-timeline-detail="">{i.detail}</span>}
            </li>
          ))}
        </ol>
      );
  }
}

/** The sections a profile declares, in page order — the table of contents. */
export function profileSections(
  profile: Profile,
): Array<{ id: string; title: string; group?: string }> {
  return profile.blocks
    .filter((b): b is Extract<Block, { type: "section" }> => b.type === "section")
    .map((b) => ({ id: b.id, title: b.title, group: b.group }));
}

/** Which section holds the earnings chart, so "View the figures" on the
 *  margin card can link to the page it is actually on. */
export function chartSectionId(profile: Profile): string | null {
  let current: string | null = null;
  for (const b of profile.blocks) {
    if (b.type === "section") current = b.id;
    if (b.type === "chart") return current;
  }
  return null;
}

/** A full-width exhibit that breaks out of the 44rem reading measure. */
type Wide = Extract<
  Block,
  {
    type:
      | "chart"
      | "valuation"
      | "valuation-board"
      | "breakdown"
      | "margin"
      | "table"
      | "channels"
      | "selling";
  }
>;
type Run = { kind: "prose"; blocks: Block[] } | { kind: "wide"; block: Wide; first: boolean };
type Section = { id: string | null; runs: Run[] };

/**
 * Group the flat block list into sections, and each section into runs.
 *
 * Two nestings for two reasons. SECTIONS are pages. Inside one, prose is
 * wrapped in [data-prose] — capped at a 44rem reading measure — while the
 * earnings card is an exhibit that wants the full column, so consecutive text
 * blocks are grouped into runs and chart blocks render BETWEEN those runs
 * rather than inside one.
 */
function groupSections(blocks: Block[]): Section[] {
  // The leading section is the unnamed one: whatever a profile says before it
  // declares its first section marker. It belongs to the overview.
  const sections: Section[] = [{ id: null, runs: [] }];
  let seenChart = false;

  for (const block of blocks) {
    if (block.type === "section") {
      // The marker travels with its own section, where it renders as the h2.
      sections.push({ id: block.id, runs: [{ kind: "prose", blocks: [block] }] });
      continue;
    }
    const section = sections[sections.length - 1]!;
    if (
      block.type === "chart" ||
      block.type === "valuation" ||
      block.type === "valuation-board" ||
      block.type === "breakdown" ||
      block.type === "margin" ||
      block.type === "table" ||
      block.type === "channels" ||
      block.type === "selling"
    ) {
      section.runs.push({ kind: "wide", block, first: block.type === "chart" && !seenChart });
      if (block.type === "chart") seenChart = true;
      continue;
    }
    const last = section.runs[section.runs.length - 1];
    if (last && last.kind === "prose") last.blocks.push(block);
    else section.runs.push({ kind: "prose", blocks: [block] });
  }
  return sections;
}

export function ProfileBlocks({
  profile,
  business,
  metrics,
  series,
  only,
}: {
  profile: Profile;
  business: BusinessDetail;
  /** The revenue/profit pivot the chart draws. */
  metrics: ChartPoint[];
  /** The whole series — the valuation reads profit and revenue rows off it. */
  series: MetricsResponse | null;
  /**
   * Which section to render. `undefined` renders the whole profile as one
   * document — the shape a profile with no section markers still uses; `null`
   * renders only the leading unnamed blocks; a string renders that section.
   */
  only?: string | null;
}) {
  const sections = groupSections(profile.blocks)
    .filter((s) => (only === undefined ? true : s.id === only))
    // A profile whose first block is a section marker opens with an empty
    // leading section, which would otherwise render as a stray gap.
    .filter((s) => s.runs.length > 0);

  return (
    <>
      {sections.map((section, i) => (
        <section key={section.id ?? i} id={section.id ?? undefined} data-profile-section="">
          {section.runs.map((run, j) =>
            run.kind === "wide" ? (
              <Exhibit
                key={j}
                block={run.block}
                business={business}
                metrics={metrics}
                series={series}
                profile={profile}
                /* The anchor is only meaningful while the whole profile is on
                   one page; on its own section page the card IS the page. */
                anchor={only === undefined && run.first}
              />
            ) : (
              <div data-prose key={j}>
                {run.blocks.map((b, k) => (
                  <BlockView key={k} block={b} business={business} />
                ))}
              </div>
            ),
          )}
        </section>
      ))}
    </>
  );
}

/** The blocks that need the metric series or the profile, and the full column
 *  to draw in. Everything else is prose and lives inside [data-prose]. */
function Exhibit({
  block,
  business,
  metrics,
  series,
  profile,
  anchor,
}: {
  block: Wide;
  business: BusinessDetail;
  metrics: ChartPoint[];
  series: MetricsResponse | null;
  profile: Profile;
  anchor: boolean;
}) {
  switch (block.type) {
    case "chart":
      return (
        <EarningsCard
          points={metrics}
          currency={business.currency}
          id={anchor ? "earnings" : undefined}
        />
      );
    case "valuation":
      // Nothing to price without a multiple — and the section is then empty by
      // design rather than broken.
      return profile.valuation ? (
        <ValuationCards business={business} series={series} profile={profile} />
      ) : null;
    case "valuation-board":
      return (
        <ValuationBoard
          series={series}
          profile={profile}
          currency={business.currency}
          note={block.note}
        />
      );
    case "breakdown":
      return <SalesBreakdown block={block} currency={business.currency} />;
    case "margin":
      return <MarginBreakdown block={block} currency={business.currency} />;
    case "table":
      return <BlockTable block={block} />;
    case "channels":
      return <Channels block={block} />;
    case "selling":
      return <SellingMethods profile={profile} />;
  }
}
