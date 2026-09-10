import { useState } from "react";
import type { ChartPoint } from "@/lib/api";
import { money, percent, monthLabel } from "@/lib/format";

/**
 * The earnings exhibit: paired revenue/profit bars by month, with period
 * controls, trend lines and a table view.
 *
 * ── 🚨 The exhibit and nothing else ──────────────────────────────────────
 * No totals, no averages, no margin printed here. The cards at the top of the
 * page own those on a FIXED basis. A second copy that moved with these period
 * buttons is how a page comes to state two different "average months", where
 * a reader who scrolled past the buttons has no way to know which one they
 * are looking at. A reader who wants a figure for a period reads it off the
 * chart or the table; the summary stays still.
 *
 * ── The table is not an extra ────────────────────────────────────────────
 * The two series are one hue at two lightnesses, because --accent is the only
 * chroma this design system has. The lighter step therefore sits well under
 * 3:1 against the card, and the honest relief for that is exact figures in a
 * table. Remove the toggle and the colour choice stops being defensible.
 */

type Period =
  | { kind: "all" }
  | { kind: "months"; count: number }
  | { kind: "month"; month: string };

const num = (v: number | string | null | undefined): number =>
  v === null || v === undefined || v === "" ? 0 : Number(v);

/* ─── Scales ──────────────────────────────────────────────────────────── */

/** A round ceiling and step, so gridlines land on $50,000 rather than $48,730. */
function scale(max: number): { top: number; ticks: number[] } {
  if (max <= 0) return { top: 1, ticks: [0, 1] };
  const raw = max / 5;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? mag * 10;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + 1e-6; v += step) ticks.push(v);
  return { top, ticks };
}

/** Least-squares endpoints. Null under two points: a direction nobody can
 *  support is worse than no direction at all. */
function fit(values: number[]): [number, number] | null {
  const n = values.length;
  if (n < 2) return null;
  const mx = (n - 1) / 2;
  const my = values.reduce((a, b) => a + b, 0) / n;
  let numer = 0;
  let denom = 0;
  values.forEach((y, i) => {
    numer += (i - mx) * (y - my);
    denom += (i - mx) ** 2;
  });
  const slope = denom === 0 ? 0 : numer / denom;
  return [my + slope * (0 - mx), my + slope * (n - 1 - mx)];
}

/* Two geometries, because a tilted month label is ~18px taller than an
   upright one and the svg is allowed to overflow — left on the upright
   figures, the rotated labels ran straight into the caption below. */
const PLOT = { w: 1000, h: 300, top: 12, right: 8, bottom: 44, left: 62 };
const PLOT_TILT = { ...PLOT, h: 322, bottom: 66 };

/* ─── The card ────────────────────────────────────────────────────────── */

export function EarningsCard({
  points,
  currency,
  id,
}: {
  points: ChartPoint[];
  currency: string;
  /** Set on the first earnings card on a page only — it is the jump target
   *  for "View the figures" on the margin card. */
  id?: string;
}) {
  const [period, setPeriod] = useState<Period>({ kind: "all" });
  const [asTable, setAsTable] = useState(false);

  const rows =
    period.kind === "all"
      ? points
      : period.kind === "months"
        ? points.slice(-period.count)
        : points.filter((p) => p.periodStart.slice(0, 7) === period.month);

  /* The preset asked for against the months that exist. A 12-month button on
     nine months of history is offered and then answered honestly, because the
     shortfall is itself information about the business. */
  const want = period.kind === "months" ? period.count : 0;
  const short = want > 0 && rows.length < want;

  return (
    <section data-earnings="" id={id} aria-label="Earnings">
      <div data-earnings-head="">
        <h2>Earnings</h2>
        {/* Identity is never colour alone: the legend names both series and
            the tooltip repeats the swatch beside each figure. */}
        <div data-series-legend="">
          <span data-series="revenue" /> Revenue
          <span data-series="profit" /> Profit
        </div>
      </div>

      {asTable ? (
        <EarningsTable rows={rows} currency={currency} />
      ) : (
        <EarningsChart rows={rows} currency={currency} />
      )}

      {short && (
        <p data-earnings-note="" role="note">
          There are only {rows.length} months of figures for this business, so a{" "}
          {want}-month view shows every month there is — not {want}.
        </p>
      )}

      <div data-periods="">
        <div data-period-group="" role="group" aria-label="Period">
          {/* A select rather than a fifth pill: one named month is a period of
              its own, not a preset anybody could label. */}
          <label data-period-select="" data-on={period.kind === "month" ? "" : undefined}>
            <span data-visually-hidden="">Show a single month</span>
            <select
              value={period.kind === "month" ? period.month : ""}
              onChange={(e) =>
                setPeriod(e.target.value ? { kind: "month", month: e.target.value } : { kind: "all" })
              }
            >
              <option value="">1 month</option>
              {[...points].reverse().map((p) => (
                <option key={p.periodStart} value={p.periodStart.slice(0, 7)}>
                  {monthLabel(p.periodStart)}
                </option>
              ))}
            </select>
            <span data-select-chevron="" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="13" height="13">
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>

          {[6, 12].map((count) => (
            <button
              key={count}
              type="button"
              data-on={period.kind === "months" && period.count === count ? "" : undefined}
              onClick={() => setPeriod({ kind: "months", count })}
            >
              {count} months
            </button>
          ))}
          <button
            type="button"
            data-on={period.kind === "all" ? "" : undefined}
            onClick={() => setPeriod({ kind: "all" })}
          >
            All time
          </button>
        </div>

        {/* Deliberately a different kind of button from the four beside it.
            Those are one exclusive choice of period; this toggles how that
            choice is DRAWN and is orthogonal to all of them. Given the pill
            treatment it read as a fifth period whose selection would discard
            whichever period you had picked. */}
        <button type="button" data-view-toggle="" aria-pressed={asTable} onClick={() => setAsTable((v) => !v)}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            {asTable ? (
              <path
                d="M2.5 13.5V7m3.5 6.5v-9m3.5 9V9.5m3.5 4v-11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 3.75h12M2 8h12M2 12.25h12M6 3.75v8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            )}
          </svg>
          {asTable ? "Chart" : "Table"}
        </button>
      </div>
    </section>
  );
}

/* ─── The chart ───────────────────────────────────────────────────────── */

function EarningsChart({ rows, currency }: { rows: ChartPoint[]; currency: string }) {
  const [hover, setHover] = useState<number | null>(null);
  if (rows.length === 0) return <div data-empty>No figures published yet.</div>;

  const revenues = rows.map((p) => num(p.revenue));
  const profits = rows.map((p) => num(p.profit));

  // Past twelve labels the months collide, so they tilt rather than thin out:
  // dropping every other label on a seasonal series hides December half the time.
  const tilt = rows.length > 12;
  const P = tilt ? PLOT_TILT : PLOT;

  const { top, ticks } = scale(Math.max(...revenues, 1));
  const iw = P.w - P.left - P.right;
  const ih = P.h - P.top - P.bottom;
  const y = (v: number) => P.top + ih - (v / top) * ih;
  const band = iw / rows.length;
  // A 2px gap between the pair: adjacent bars of two series, not one block.
  const barW = Math.min(64, (band - 2) / 2 - 3);
  const centre = (i: number) => P.left + band * i + band / 2;

  const revTrend = fit(revenues);
  const proTrend = fit(profits);

  return (
    <figure data-chart-wrap="">
      <svg
        viewBox={`0 0 ${P.w} ${P.h}`}
        role="img"
        aria-label={`Revenue and profit by month, ${rows.length} month${rows.length === 1 ? "" : "s"}`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.left} x2={P.w - P.right} y1={y(t)} y2={y(t)} data-grid="" />
            <text x={P.left - 10} y={y(t) + 4} data-ytick="">
              {money(t, currency)}
            </text>
          </g>
        ))}

        {rows.map((p, i) => {
          const c = centre(i);
          const rev = revenues[i]!;
          const pro = profits[i]!;
          return (
            <g
              key={p.periodStart}
              data-group=""
              data-hover={hover === i ? "" : undefined}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {/* A full-height hit target. The bars are thin, and a tooltip you
                  have to hit a 30px column to see is one most readers never find. */}
              <rect x={P.left + band * i} y={P.top} width={band} height={ih} data-hit="" />
              <rect
                x={c - barW - 1}
                y={y(rev)}
                width={barW}
                height={Math.max(1, ih - (y(rev) - P.top))}
                rx="3"
                data-series="revenue"
              />
              <rect
                x={c + 1}
                y={y(pro)}
                width={barW}
                height={Math.max(1, ih - (y(pro) - P.top))}
                rx="3"
                data-series="profit"
              />
              <text
                x={c}
                y={P.h - P.bottom + 20}
                data-xtick=""
                data-tilt={tilt ? "" : undefined}
                transform={tilt ? `rotate(-40 ${c} ${P.h - P.bottom + 20})` : undefined}
              >
                {monthLabel(p.periodStart)}
              </text>
            </g>
          );
        })}

        {revTrend && (
          <line
            x1={centre(0)}
            x2={centre(rows.length - 1)}
            y1={y(revTrend[0])}
            y2={y(revTrend[1])}
            data-trendline="revenue"
          />
        )}
        {proTrend && (
          <line
            x1={centre(0)}
            x2={centre(rows.length - 1)}
            y1={y(proTrend[0])}
            y2={y(proTrend[1])}
            data-trendline="profit"
          />
        )}
      </svg>

      {hover !== null && rows[hover] && (
        <div data-tip="" style={{ left: `${((centre(hover) / P.w) * 100).toFixed(2)}%` }}>
          <strong>{monthLabel(rows[hover]!.periodStart)}</strong>
          <span>
            <i data-series="revenue" /> {money(revenues[hover], currency)} revenue
          </span>
          <span>
            <i data-series="profit" /> {money(profits[hover], currency)} profit
          </span>
        </div>
      )}

      {rows.length >= 2 && (
        <figcaption data-earnings-note="">
          Dashed lines are least-squares trends across the months on screen. On a seasonal
          catalogue they follow the window you pick — a six-month view either side of Christmas
          slopes hard in opposite directions, and neither is the business changing direction.
        </figcaption>
      )}
    </figure>
  );
}

/* ─── The table ───────────────────────────────────────────────────────── */

function EarningsTable({ rows, currency }: { rows: ChartPoint[]; currency: string }) {
  return (
    <div data-table-wrap="">
      <table data-earnings-table="">
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Revenue</th>
            <th scope="col">Profit</th>
            <th scope="col">Margin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const rev = num(p.revenue);
            const pro = num(p.profit);
            return (
              <tr key={p.periodStart}>
                <th scope="row">{monthLabel(p.periodStart)}</th>
                <td data-figure="">{money(rev, currency)}</td>
                <td data-figure="">{money(pro, currency)}</td>
                <td data-figure="">{percent(rev ? (pro / rev) * 100 : null)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
