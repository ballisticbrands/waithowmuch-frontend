import { useState } from "react";
import type { Block } from "@/businesses/types";
import { percent, price } from "@/lib/format";

type Margin = Extract<Block, { type: "margin" }>;

/** Cents kept, and the sign dropped — the row already carries a minus. Rounding
 *  to whole dollars on an $8.87 order would round the advertising line to the
 *  same figure as the referral fee. */
const perUnit = (v: number, currency: string) => price(Math.abs(v), currency);

/* ── The donut ─────────────────────────────────────────────────────────
   The same five numbers as the list below, as one circle.

   ── Why a pie is defensible here, when it usually is not ──────────────
   Part-to-whole, five segments, and the parts are an exhaustive split of a
   single real quantity — one $8.87 order. That is the narrow case a pie is
   actually for. The lede claims the largest line is fulfilment rather than
   the product, and a reader confirms that from the circle in about a second;
   in the list it is four rows of arithmetic apart.

   🚨 It SUPPLEMENTS the table, never replaces it. Two of the cost steps sit
   under 3:1 against the card, so every segment is named and figured in the
   legend and stated exactly in the rows below. Nothing here is readable only
   by colour, and no figure exists only as an angle.

   ── Lightness carries size, position carries the list ─────────────────
   Slice ORDER follows the table — cost lines in their authored order, margin
   closing the circle — so the eye can walk the two together. The gray STEP
   is assigned by magnitude instead, darkest to the largest cost, which is a
   second, redundant read of the same fact. */
const DONUT = { size: 240, outer: 100, inner: 62, gap: 1.2 };

/** The four cost steps, lightest (smallest cost) to darkest. `--accent` is
 *  not in here: margin is the answer, not another cost. */
const COST_STEPS = [
  "var(--slice-cost-1)",
  "var(--slice-cost-2)",
  "var(--slice-cost-3)",
  "var(--slice-cost-4)",
];

/** Polar → cartesian with 0° at twelve o'clock running clockwise, which is
 *  the order an eye takes a pie in. */
function polar(r: number, deg: number): readonly [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  const c = DONUT.size / 2;
  return [
    Number((c + r * Math.cos(rad)).toFixed(2)),
    Number((c + r * Math.sin(rad)).toFixed(2)),
  ] as const;
}

/** One annulus sector. The separation between slices is a GAP cut out of the
 *  arc itself, not a stroke drawn around it — a stroke would add a ring of
 *  ink to every segment and thicken the small ones most. */
function sector(from: number, to: number): string {
  const { outer, inner } = DONUT;
  const [x1, y1] = polar(outer, from);
  const [x2, y2] = polar(outer, to);
  const [x3, y3] = polar(inner, to);
  const [x4, y4] = polar(inner, from);
  const large = to - from > 180 ? 1 : 0;
  return `M${x1} ${y1}A${outer} ${outer} 0 ${large} 1 ${x2} ${y2}L${x3} ${y3}A${inner} ${inner} 0 ${large} 0 ${x4} ${y4}Z`;
}

type Segment = { label: string; pct: number; fill: string; money: string };

/** The mid-ring point of a slice, in viewBox units — where the tooltip is
 *  anchored. Anchoring to the slice rather than to the cursor means hover and
 *  keyboard focus put the label in exactly the same place, and it cannot
 *  jitter under the pointer. */
function centroid(from: number, to: number) {
  const [x, y] = polar((DONUT.outer + DONUT.inner) / 2, (from + to) / 2);
  return { x: (x / DONUT.size) * 100, y: (y / DONUT.size) * 100 };
}

function MarginDonut({
  segments,
  marginPct,
}: {
  segments: Segment[];
  marginPct: number;
}) {
  /* 🚨 The hover layer is not a nicety here — it is what makes the chart
     readable. Four of the five slices are steps of one gray ramp, chosen so
     the costs recede behind the answer, and the cost of that choice is that
     two neighbouring steps are genuinely hard to tell apart at a glance.
     Naming the slice under the pointer is the relief. The legend and the
     rows below are the relief for anyone not using a pointer at all. */
  const [active, setActive] = useState<number | null>(null);

  /* A slice per segment, laid out clockwise from twelve. The running cursor
     is in percent and converted at the last moment, so the segments always
     close the circle rather than drifting on rounded degrees. */
  let cursor = 0;
  const slices = segments.map((seg) => {
    const from = cursor * 3.6;
    cursor += seg.pct;
    const to = cursor * 3.6;
    /* Inset by half the gap at each end. On a slice narrower than the gap
       this would invert and paint a sliver backwards, so it is clamped to a
       hairline instead — no segment in this data is that small, but a
       corrected cost could make one. */
    const a = from + DONUT.gap / 2;
    const b = Math.max(a + 0.1, to - DONUT.gap / 2);
    return { ...seg, d: sector(a, b), at: centroid(a, b) };
  });

  const shown = active != null ? slices[active] : undefined;

  return (
    <figure data-donut="" onMouseLeave={() => setActive(null)}>
      <div data-donut-plot="">
        <svg
          viewBox={`0 0 ${DONUT.size} ${DONUT.size}`}
          role="img"
          aria-label={`Where an average order goes: ${segments
            .map((s) => `${s.label} ${Math.round(s.pct)}%`)
            .join(", ")}.`}
        >
          {slices.map((s, i) => (
            <path
              key={s.label}
              d={s.d}
              fill={s.fill}
              /* Everything else steps back rather than the hovered slice
                 lighting up: raising one of five fills changes the colour a
                 reader is trying to match against the legend. */
              data-dim={active != null && active !== i ? "" : undefined}
              tabIndex={0}
              /* The slice is a control, so it says what it is. The visible
                 tooltip is decoration on top of this, not the only copy. */
              role="img"
              aria-label={`${s.label}, ${percent(s.pct)}, ${s.money} of the order`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            />
          ))}
          {/* The hole is the answer, in the one place the eye already is. */}
          <text data-donut-figure="" x="50%" y="50%" dy="-0.2em" textAnchor="middle">
            {percent(marginPct)}
          </text>
          <text data-donut-caption="" x="50%" y="50%" dy="1.45em" textAnchor="middle">
            margin
          </text>
        </svg>

        {/* Anchored to the slice, in percent, so it tracks the donut through
            every width instead of needing a measured pixel box. */}
        {shown && (
          <div
            data-donut-tip=""
            style={{ left: `${shown.at.x}%`, top: `${shown.at.y}%` }}
            role="status"
          >
            <span data-donut-tip-name="">{shown.label}</span>
            <span data-donut-tip-figure="">
              {percent(shown.pct)} · {shown.money}
            </span>
          </div>
        )}
      </div>

      {/* 🚨 Always present, and it carries the figures rather than just the
          swatches. This is the relief for two cost steps sitting under 3:1 —
          identity and value both survive without the colour. Hovering a row
          lights its slice, which answers "which one is Advertising" from the
          side of the chart a reader is already reading. */}
      <ul data-donut-key="">
        {segments.map((s, i) => (
          <li
            key={s.label}
            data-on={active === i ? "" : undefined}
            onMouseEnter={() => setActive(i)}
          >
            <span data-donut-swatch="" style={{ background: s.fill }} aria-hidden="true" />
            <span data-donut-name="">{s.label}</span>
            <span data-donut-pct="" data-figure="">{percent(s.pct)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/**
 * Revenue down to margin, one cost line at a time.
 *
 * ── 🚨 The answer is computed, never typed ───────────────────────────────
 * The margin row is 100% less the lines above it. Typed as a literal it would
 * survive the first correction to a cost line and quietly stop adding up —
 * and a cost breakdown whose total does not follow from its rows is worse
 * than no breakdown, because it looks like arithmetic.
 *
 * ── Percent AND money ────────────────────────────────────────────────────
 * The percentages are what compare across businesses; the per-order money is
 * what makes a $2.75 fulfilment fee on an $8.87 order legible as the problem
 * it is. A reader gets both on the same row rather than doing it in their head.
 */
export function MarginBreakdown({ block, currency }: { block: Margin; currency: string }) {
  const { basis, lines } = block;
  const marginPct = 100 + lines.reduce((a, l) => a + l.pct, 0);

  /* Lightest step to the smallest cost. Ranking by size rather than by
     position means a corrected percentage re-shades the ramp on its own. */
  const bySize = [...lines].sort((a, b) => Math.abs(a.pct) - Math.abs(b.pct));
  const segments: Segment[] = [
    ...lines.map((l) => ({
      label: l.label,
      pct: Math.abs(l.pct),
      fill: COST_STEPS[Math.min(bySize.indexOf(l), COST_STEPS.length - 1)]!,
      money: perUnit((l.pct / 100) * basis.value, currency),
    })),
    {
      label: "Margin",
      pct: Math.max(0, marginPct),
      fill: "var(--accent)",
      money: perUnit((marginPct / 100) * basis.value, currency),
    },
  ];

  return (
    <section data-margin-table="">
      {/* 🚨 Only when the lines actually close a circle. A profile whose costs
          already exceed the order has no part-to-whole to draw, and a donut
          of a negative remainder is a picture of nothing — the table still
          says exactly what happened. */}
      {marginPct > 0 && <MarginDonut segments={segments} marginPct={marginPct} />}
      <ol data-margin="">
        <li data-start="">
          <span data-margin-label="">{basis.label}</span>
          <span data-margin-pct="" data-figure="">100%</span>
          <span data-margin-unit="" data-figure="">{perUnit(basis.value, currency)}</span>
        </li>

        {lines.map((l) => (
          <li key={l.label} data-emphasis={l.emphasis ? "" : undefined}>
            <span data-margin-label="">
              {l.label}
              {l.emphasis && <em data-margin-flag="">Biggest line</em>}
            </span>
            <span data-margin-pct="" data-figure="">
              −{percent(Math.abs(l.pct))}
            </span>
            <span data-margin-unit="" data-figure="">
              −{perUnit((l.pct / 100) * basis.value, currency)}
            </span>
            {l.detail && <p data-margin-detail="">{l.detail}</p>}
          </li>
        ))}

        <li data-total="">
          <span data-margin-label="">Margin</span>
          <span data-margin-pct="" data-figure="">
            {percent(marginPct)}
          </span>
          <span data-margin-unit="" data-figure="">
            {perUnit((marginPct / 100) * basis.value, currency)}
          </span>
          {block.note && <p data-margin-detail="">{block.note}</p>}
        </li>
      </ol>
    </section>
  );
}

type Table = Extract<Block, { type: "table" }>;

/** A plain table. Its own component only so it can sit outside the reading
 *  measure and scroll horizontally on a phone rather than squeezing. */
export function BlockTable({ block }: { block: Table }) {
  return (
    <section data-block-table="">
      {block.caption && <h3>{block.caption}</h3>}
      <div data-table-wrap="">
        <table data-earnings-table="">
          <thead>
            <tr>
              {block.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} data-figure="">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <p data-breakdown-note="">{block.note}</p>}
    </section>
  );
}
