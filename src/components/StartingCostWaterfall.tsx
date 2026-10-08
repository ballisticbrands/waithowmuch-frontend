import type { StartingCostEstimate } from "@/lib/api";
import { exactMoney, money } from "@/lib/format";

/**
 * The foot of "What it costs to start": the parts as a waterfall, each one
 * starting where the one before it ended, down to the total.
 *
 * 🚨 TWO LANES, NOT ONE. A waterfall stacks single numbers, and two of the parts
 * are ranges. Stacking the midpoints would draw a figure the estimate never
 * produced, so it is run twice — once with every part at its low end (light),
 * once with every part at its high end (dark). The total's two lanes are the
 * published low and high.
 *
 * Drawn from the estimate alone, like the rest of the section, so every business
 * with a published estimate gets it and nothing is authored per profile.
 *
 * Colour does not carry identity: every row is named and figured, and the same
 * figures are in the "Adding it up" table above. Parts are the site's neutral
 * ink and only the total takes the accent, because a sum is a different kind of
 * thing from a part.
 */

type Range = { low: number | string; high: number | string };

const n = (v: number | string | null | undefined): number =>
  v === null || v === undefined || v === "" ? 0 : Number(v);

/** Geometry. Thin marks, a recessive axis, values in a fixed right-hand gutter. */
const W = 760;
const LABEL_W = 132;
const PLOT_X = LABEL_W + 8;
const VALUE_W = 190;
const PLOT_W = W - PLOT_X - VALUE_W;
const ROW_H = 40;
const LANE = 9;

/** A round number above the biggest figure, so the axis ends somewhere sensible. */
function axisMax(v: number): number {
  const step = 10 ** Math.floor(Math.log10(v)) / 2;
  return Math.ceil(v / step) * step;
}

/** What the waterfall draws: the total and the parts. A published estimate has
 *  both; so does anything else that prices a launch the same way. */
export type WaterfallInput = Pick<StartingCostEstimate, "low" | "high"> & {
  breakdown?: { parts?: StartingCostEstimate["breakdown"]["parts"] };
};

export function StartingCostWaterfall({ estimate: e, currency }: { estimate: WaterfallInput; currency: string }) {
  const p = e.breakdown?.parts;
  const total = { low: n(e.low), high: n(e.high) };
  if (!p || !total.high) return null;

  const rows: Array<{ label: string; range: Range }> = [
    { label: "First order", range: p.inventory },
    { label: "Launch ads", range: p.ads },
    { label: "Fixed costs", range: p.setup },
    ...(p.tooling ? [{ label: "Tooling", range: p.tooling }] : []),
  ];

  const max = axisMax(total.high);
  const x = (v: number) => PLOT_X + (v / max) * PLOT_W;
  const H = 30 + (rows.length + 1) * ROW_H + 30;
  const totalY = 34 + rows.length * ROW_H + 6;
  let cumLo = 0;
  let cumHi = 0;

  return (
    <figure data-sc-waterfall="">
      <div data-table-wrap="">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`Launch cost built up part by part: ${exactMoney(total.low, currency)} with every part at its low end, ${exactMoney(total.high, currency)} with every part at its high end.`}
          data-sc-chart=""
        >
          {[0, max / 4, max / 2, (max * 3) / 4, max].map((t) => (
            <g key={t}>
              <line x1={x(t)} y1={26} x2={x(t)} y2={H - 26} data-sc-grid="" />
              <text x={x(t)} y={16} textAnchor="middle" data-sc-tick="">
                {t === 0 ? "$0" : money(t, currency)}
              </text>
            </g>
          ))}

          {rows.map((r, i) => {
            const lo = n(r.range.low);
            const hi = n(r.range.high);
            const y = 34 + i * ROW_H;
            const startLo = cumLo;
            const startHi = cumHi;
            cumLo += lo;
            cumHi += hi;
            const fixed = Math.round(lo) === Math.round(hi);
            return (
              <g key={r.label}>
                <text x={LABEL_W} y={y + LANE + 4} textAnchor="end" data-sc-rowlabel="">
                  {i === 0 ? r.label : `+ ${r.label}`}
                </text>
                <rect x={x(startLo)} y={y} width={Math.max(3, x(startLo + lo) - x(startLo))} height={LANE} rx={2} data-sc-bar="" data-shade="light" />
                <rect x={x(startHi)} y={y + LANE + 2} width={Math.max(3, x(startHi + hi) - x(startHi))} height={LANE} rx={2} data-sc-bar="" />
                <text x={W - 8} y={y + LANE + 4} textAnchor="end" data-sc-value="">
                  {fixed ? exactMoney(lo, currency) : `${exactMoney(lo, currency)}–${exactMoney(hi, currency)}`}
                </text>
              </g>
            );
          })}

          {/* The sum, set apart by a rule and the accent. */}
          <line x1={16} y1={totalY - 12} x2={W - 16} y2={totalY - 12} data-sc-rule="" />
          <text x={LABEL_W} y={totalY + LANE + 4} textAnchor="end" data-sc-rowlabel="" data-strong="">
            = To start
          </text>
          <rect x={x(0)} y={totalY} width={x(total.low) - x(0)} height={LANE} rx={2} data-sc-bar="" data-total="" data-shade="light" />
          <rect x={x(0)} y={totalY + LANE + 2} width={x(total.high) - x(0)} height={LANE} rx={2} data-sc-bar="" data-total="" />
          <text x={W - 8} y={totalY + LANE + 4} textAnchor="end" data-sc-value="" data-strong="">
            {exactMoney(total.low, currency)}–{exactMoney(total.high, currency)}
          </text>
        </svg>
      </div>
      <figcaption data-sc-viz-note="">
        Each part starts where the one before it ended. Light lane: every part at its low end. Dark lane: every part at
        its high end.
      </figcaption>
    </figure>
  );
}
