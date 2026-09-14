import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { BusinessEvent, ChartPoint, MetricRow } from "@/lib/api";
import { eventDateLabel, exactMoney, money, monthLabel } from "@/lib/format";
import { scale } from "./Earnings";

/**
 * Revenue, profit and ad spend as three lines on one axis, with the business's
 * dated events (BusinessEvent rows) sitting on the revenue line.
 *
 * Ported from VerifiedMargins' sourced-dossier ProfitChart (DemoSourced.tsx)
 * and re-cut for this site:
 *
 *  - Revenue is the primary series here, not profit. It takes the accent, the
 *    wash beneath it and the event dots, because most of a timeline's events
 *    are revenue moments ("the badge appears", "$349,150 — the Christmas
 *    month").
 *  - Colour is never the only difference: revenue is solid, profit dashed and
 *    ad spend dotted, so the three survive greyscale and colour blindness.
 *  - 🚨 ONE axis. Ad spend is a sliver of revenue, and a second scale that drew
 *    it as tall would invent a relationship the numbers do not have.
 *  - A month with no figure is a gap in the line, never a zero.
 *
 * The palette is validated, not picked — see --series-* in globals.css.
 */

type Month = {
  key: string;
  periodStart: string;
  /** Month END. A monthly figure is the month's total, so an event on the
   *  31st belongs to that month's point rather than to the next one's. */
  t: number;
  revenue: number | null;
  profit: number | null;
  ads: number | null;
};

type Series = "revenue" | "profit" | "ads";

const SERIES: Array<{ key: Series; label: string }> = [
  { key: "revenue", label: "Revenue" },
  { key: "profit", label: "Profit" },
  { key: "ads", label: "Ad spend" },
];

const DAY = 86_400_000;
const HEIGHT = 280;
const PAD = { top: 16, right: 12, bottom: 30, left: 56 };

function monthEnd(iso: string): number {
  const d = new Date(iso);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0, 23, 59, 59);
}

/** Revenue at a moment, read off the drawn line — interpolated between the
 *  month-ends either side, so a dot sits ON the line rather than beside it.
 *  Null inside a gap: there is no line there to put it on. */
function revenueAt(months: Month[], t: number): number | null {
  const i = months.findIndex((m) => m.t >= t);
  if (i < 0) return null;
  const next = months[i]!;
  const prev = months[i - 1];
  if (next.revenue === null) return null;
  if (!prev || prev.revenue === null) return next.revenue;
  const f = (t - prev.t) / (next.t - prev.t);
  return prev.revenue + f * (next.revenue - prev.revenue);
}

/** The width the svg is drawn at, so its text stays 11px on a phone instead of
 *  scaling down with a viewBox. */
function useMeasuredWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => setW(entries[0]!.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function PerformanceChart({
  points,
  adSpend,
  events: timeline,
  currency,
  detail,
}: {
  /** The revenue/profit pivot. */
  points: ChartPoint[];
  /** `ad_spend` rows, oldest first. */
  adSpend: MetricRow[];
  /** The business's events, oldest first. Those dated to a day or a month
   *  inside the plotted months become dots; a year is too vague to place. */
  events: BusinessEvent[];
  currency: string;
  /** Where a reader goes to dig deeper — the Revenue section, which carries the
   *  period controls and the exact monthly table this chart deliberately does
   *  not. */
  detail?: { href: string; label: string };
}) {
  const [bodyRef, width] = useMeasuredWidth();
  const [hover, setHover] = useState<{ kind: "month" | "event"; i: number } | null>(null);
  /* 🚨 A ref, not state. The svg's pointermove and a dot's pointerenter fight
     over the same pointer, and a move handler closed over the previous
     render's state reads stale and snaps the card straight back to the month —
     the chart then feels like it needs a click. Ported with the chart. */
  const overDot = useRef(false);

  const months = useMemo(() => {
    const byKey = new Map<string, Month>();
    const at = (iso: string) => {
      const key = iso.slice(0, 7);
      let m = byKey.get(key);
      if (!m) {
        m = { key, periodStart: iso, t: monthEnd(iso), revenue: null, profit: null, ads: null };
        byKey.set(key, m);
      }
      return m;
    };
    for (const p of points) {
      const m = at(p.periodStart);
      m.revenue = p.revenue;
      m.profit = p.profit;
    }
    for (const r of adSpend) at(r.periodStart).ads = Number(r.value);
    return [...byKey.values()].sort((a, b) => a.t - b.t);
  }, [points, adSpend]);

  const events = useMemo(() => {
    if (months.length < 2) return [];
    const t0 = months[0]!.t;
    const t1 = months[months.length - 1]!.t;
    return timeline.flatMap((item) => {
      if (item.datePrecision === "year") return [];
      const t = Date.parse(item.date);
      if (Number.isNaN(t) || t < t0 - DAY || t > t1) return [];
      const v = revenueAt(months, t);
      const month = months.find((m) => m.t >= t);
      return v === null || !month ? [] : [{ item, t, v, month }];
    });
  }, [months, timeline]);

  if (months.length < 2) return null;

  const w = width || 720;
  const iw = Math.max(1, w - PAD.left - PAD.right);
  const ih = HEIGHT - PAD.top - PAD.bottom;
  const t0 = months[0]!.t;
  const t1 = months[months.length - 1]!.t;

  const values = months
    .flatMap((m) => [m.revenue, m.profit, m.ads])
    .filter((v): v is number => v !== null);
  const { top, ticks: upper } = scale(Math.max(...values, 1));
  const step = upper.length > 1 ? upper[1]! - upper[0]! : top;
  /* Profit can go negative — a loss month is real — so the floor steps down to
     cover it rather than clipping the line at zero. */
  const lo = Math.min(0, Math.floor(Math.min(...values, 0) / step) * step);
  const ticks: number[] = [];
  for (let v = lo; v <= top + 1e-6; v += step) ticks.push(v);

  const x = (t: number) => PAD.left + ((t - t0) / Math.max(1, t1 - t0)) * iw;
  const y = (v: number) => PAD.top + ih - ((v - lo) / (top - lo)) * ih;

  /* Runs, not one polyline: a gap in the data has to be a gap in the line. */
  const runs = (key: Series) => {
    const out: Array<Array<[number, number]>> = [];
    let run: Array<[number, number]> = [];
    for (const m of months) {
      const v = m[key];
      if (v === null) {
        if (run.length) out.push(run);
        run = [];
        continue;
      }
      run.push([x(m.t), y(v)]);
    }
    if (run.length) out.push(run);
    return out;
  };
  const toPath = (rs: Array<Array<[number, number]>>) =>
    rs
      .map((r) => r.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" "))
      .join(" ");
  const revenueRuns = runs("revenue");
  const base = y(0).toFixed(1);
  const area = revenueRuns
    .filter((r) => r.length > 1)
    .map((r) => `${toPath([r])} L${r[r.length - 1]![0].toFixed(1)},${base} L${r[0]![0].toFixed(1)},${base} Z`)
    .join(" ");

  /* As many month labels as fit, counted back from the latest so the most
     recent month is always named. */
  const last = months.length - 1;
  const every = Math.max(1, Math.ceil(months.length / Math.max(2, Math.floor(iw / 76))));

  const onMove = (ev: PointerEvent<SVGSVGElement>) => {
    if (overDot.current) return;
    const px = ev.clientX - ev.currentTarget.getBoundingClientRect().left;
    let best = 0;
    months.forEach((m, i) => {
      if (Math.abs(x(m.t) - px) < Math.abs(x(months[best]!.t) - px)) best = i;
    });
    setHover((h) => (h?.kind === "month" && h.i === best ? h : { kind: "month", i: best }));
  };
  const release = () => {
    overDot.current = false;
    setHover(null);
  };

  const hoveredMonth = hover?.kind === "month" ? months[hover.i] : undefined;
  const hoveredEvent = hover?.kind === "event" ? events[hover.i] : undefined;
  const anchor = hoveredEvent
    ? { cx: x(hoveredEvent.t), cy: Math.max(4, y(hoveredEvent.v) - 16) }
    : hoveredMonth
      ? { cx: x(hoveredMonth.t), cy: PAD.top }
      : null;
  /* The card opens away from the nearer edge, so it is never clipped by it. */
  const flip = anchor ? anchor.cx > w / 2 : false;

  const hasAmazon = events.some((e) => e.item.tag === "amazon");
  const hasOther = events.some((e) => e.item.tag !== "amazon");

  return (
    <section data-perf="" aria-label="Revenue, profit and ad spend by month">
      <div data-perf-head="">
        <h2>Revenue, profit &amp; ad spend</h2>
        {/* No table and no period controls here: the Revenue section owns both,
            and this links there rather than growing a second copy of them. */}
        {detail && (
          <a data-perf-detail="" href={detail.href}>
            {detail.label}
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path
                d="M3 8h10M9.5 4L13.5 8L9.5 12"
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

      {/* Identity is never colour alone: each key redraws its line's dash. */}
      <div data-perf-legend="">
        {SERIES.map((s) => (
          <span key={s.key} data-perf-legend-item="">
            <span data-perf-key={s.key} aria-hidden="true" /> {s.label}
          </span>
        ))}
        {hasAmazon && (
          <span data-perf-legend-item="">
            <span data-perf-key="event" data-amazon="" aria-hidden="true" /> Amazon event
          </span>
        )}
        {hasOther && (
          <span data-perf-legend-item="">
            <span data-perf-key="event" aria-hidden="true" /> Brand, web &amp; ads event
          </span>
        )}
      </div>

      <div data-perf-body="" ref={bodyRef}>
        <figure data-perf-figure="">
          <div data-perf-plot="" style={{ height: HEIGHT }}>
            {width > 0 && (
              <svg
                width={w}
                height={HEIGHT}
                role="group"
                aria-label={`Revenue, profit and ad spend by month, ${monthLabel(months[0]!.periodStart)} to ${monthLabel(months[last]!.periodStart)}`}
                onPointerMove={onMove}
                onPointerLeave={release}
              >
                {ticks.map((t) => (
                  <g key={t}>
                    <line x1={PAD.left} x2={w - PAD.right} y1={y(t)} y2={y(t)} data-perf-grid="" />
                    <text x={PAD.left - 8} y={y(t)} data-perf-ytick="">
                      {money(t, currency)}
                    </text>
                  </g>
                ))}

                {/* Revenue drawn last so the primary line and its dots sit on
                    top where the lines converge. */}
                <path d={area} data-perf-area="" />
                <path d={toPath(runs("ads"))} data-perf-line="ads" />
                <path d={toPath(runs("profit"))} data-perf-line="profit" />
                <path d={toPath(revenueRuns)} data-perf-line="revenue" />

                {hoveredMonth && (
                  <>
                    <line
                      x1={x(hoveredMonth.t)}
                      x2={x(hoveredMonth.t)}
                      y1={PAD.top}
                      y2={PAD.top + ih}
                      data-perf-crosshair=""
                    />
                    {SERIES.map((s) =>
                      hoveredMonth[s.key] === null ? null : (
                        <circle
                          key={s.key}
                          cx={x(hoveredMonth.t)}
                          cy={y(hoveredMonth[s.key]!)}
                          r={4}
                          data-perf-point={s.key}
                        />
                      ),
                    )}
                  </>
                )}

                {/* One dot per dated event. Amazon events are filled and the
                    rest hollow — a shape difference, since the colour is
                    already the revenue line's. */}
                {events.map((ev, i) => {
                  const on = hover?.kind === "event" && hover.i === i;
                  return (
                    <g
                      key={`${ev.item.date}-${ev.item.title}`}
                      data-perf-event=""
                      data-amazon={ev.item.tag === "amazon" ? "" : undefined}
                      tabIndex={0}
                      role="button"
                      aria-label={`${eventDateLabel(ev.item.date, ev.item.datePrecision)}: ${ev.item.title}`}
                      onPointerEnter={() => {
                        overDot.current = true;
                        setHover({ kind: "event", i });
                      }}
                      onPointerLeave={release}
                      onFocus={() => setHover({ kind: "event", i })}
                      onBlur={() => setHover(null)}
                    >
                      {/* A 24px target around a 9px dot. */}
                      <circle cx={x(ev.t)} cy={y(ev.v)} r={12} data-perf-hit="" />
                      <circle cx={x(ev.t)} cy={y(ev.v)} r={on ? 6 : 4.5} data-perf-dot="" />
                    </g>
                  );
                })}

                {months.map((m, i) =>
                  (last - i) % every === 0 ? (
                    <text
                      key={m.key}
                      x={x(m.t)}
                      y={HEIGHT - 8}
                      data-perf-xtick=""
                      textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}
                    >
                      {monthLabel(m.periodStart)}
                    </text>
                  ) : null,
                )}
              </svg>
            )}
          </div>

          {anchor && (hoveredMonth || hoveredEvent) && (
            <div
              data-perf-card=""
              data-flip={flip ? "" : undefined}
              data-wide={hoveredEvent ? "" : undefined}
              style={{
                left: anchor.cx + (flip ? -14 : 14),
                top: anchor.cy,
                /* Never wider than the room on its side — on a phone the
                   CSS max-width alone runs off the edge of the card. */
                maxWidth: Math.max(140, (flip ? anchor.cx : w - anchor.cx) - 18),
              }}
            >
              {hoveredEvent ? (
                <>
                  <p data-perf-card-when="">
                    {eventDateLabel(hoveredEvent.item.date, hoveredEvent.item.datePrecision)} · {hoveredEvent.item.tagLabel}
                  </p>
                  <p data-perf-card-title="">{hoveredEvent.item.title}</p>
                  {hoveredEvent.item.detail && <p data-perf-card-detail="">{hoveredEvent.item.detail}</p>}
                  <p data-perf-card-detail="">
                    Revenue that month: <span data-perf-num="">{exactMoney(hoveredEvent.month.revenue, currency)}</span>
                  </p>
                </>
              ) : (
                <>
                  <p data-perf-card-when="">{monthLabel(hoveredMonth!.periodStart)}</p>
                  {/* Values lead, names follow: the reader already has the
                      series and wants the number. */}
                  {SERIES.map((s) => (
                    <p key={s.key} data-perf-card-row="">
                      <span data-perf-key={s.key} aria-hidden="true" />
                      <strong data-perf-num="">{exactMoney(hoveredMonth![s.key], currency)}</strong>{" "}
                      {s.label.toLowerCase()}
                    </p>
                  ))}
                </>
              )}
            </div>
          )}

          {events.length > 0 && (
            <figcaption data-perf-note="">
              Dots are dated events from this business's timeline. Hover or tab to one to see what
              happened that month.
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
