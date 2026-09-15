import { useState } from "react";
import type { Block } from "@/businesses/types";
import type { BusinessDetail } from "@/lib/api";
import { money, percent } from "@/lib/format";

type Marketplaces = Extract<Block, { type: "marketplaces" }>;

/* ── Amazon revenue by marketplace, as one ring ────────────────────────
   Angle is the hardest encoding to compare, so the ring earns its place only
   because the question is "how concentrated is this?" — a shape, legible at a
   glance from one dominant arc. Everything a reader might compare is a number
   in the legend beside it.

   ── Colour: WHM has one chroma (BRAND.md) ─────────────────────────────
   The largest marketplace takes --series-revenue, the colour revenue already
   has on the chart above. The rest step down the margin donut's gray ramp,
   darkest to the next largest — lightness carries size there too. Past four
   coloured slices the tail folds into one "others" slice on the lightest step
   rather than a gray nobody can tell from its neighbour. Colour follows size;
   the legend keeps the authored order. */
const RING = { size: 140, r: 52, stroke: 20, gap: 2 };
const C = 2 * Math.PI * RING.r;
const STEPS = [
  "var(--series-revenue)",
  "var(--slice-cost-4)",
  "var(--slice-cost-3)",
  "var(--slice-cost-2)",
];
const OTHERS = "var(--slice-cost-1)";

/** "0%" for a marketplace that sells a little would read as one that sells nothing. */
const shareLabel = (s: number) => (s > 0 && s < 1 ? "<1%" : percent(s));

type Row = { key: string; label: string; short: string; share: number; note?: string; fill: string | null };

export function MarketplaceSplit({ block, business }: { block: Marketplaces; business: BusinessDetail }) {
  const [active, setActive] = useState<number | null>(null);
  const month = business.latestMonthlyRevenue == null ? null : Number(business.latestMonthlyRevenue);

  const selling = block.items.filter((i) => i.share > 0).sort((a, b) => b.share - a.share);
  const folded = selling.length > STEPS.length ? selling.slice(STEPS.length - 1) : [];
  const fills = new Map(selling.filter((i) => !folded.includes(i)).map((i, n) => [i, STEPS[n]!]));

  const rows: Row[] = block.items
    .filter((i) => !folded.includes(i))
    .map((i) => ({ key: i.label, label: i.label, short: i.short, share: i.share, note: i.note, fill: fills.get(i) ?? null }));
  if (folded.length) {
    rows.push({
      key: "others",
      label: `${folded.length} others`,
      short: "Others",
      share: folded.reduce((a, i) => a + i.share, 0),
      note: folded.map((i) => i.short).join(", "),
      fill: OTHERS,
    });
  }

  const arcs = rows.filter((r) => r.fill && r.share > 0);
  const biggest = arcs.reduce<Row | undefined>((a, r) => (!a || r.share > a.share ? r : a), undefined);
  // Nothing sells anywhere: no ring to draw. check-profile.mjs fails this.
  if (!biggest) return null;

  /* A gap between neighbours, cut from the arc — except on a lone slice, where
     a gap would read as a missing sliver of revenue. */
  const lone = arcs.length === 1;
  let offset = 0;
  const c = RING.size / 2;

  return (
    <section data-marketplaces="">
      <h3>{block.title}</h3>
      {block.intro && <p data-breakdown-intro="">{block.intro}</p>}

      <div data-market-body="" onMouseLeave={() => setActive(null)}>
        <svg
          viewBox={`0 0 ${RING.size} ${RING.size}`}
          role="img"
          aria-label={`${block.title}: ${rows.map((r) => `${r.label} ${shareLabel(r.share)}`).join(", ")}.`}
        >
          {arcs.map((r) => {
            const i = rows.indexOf(r);
            const len = (r.share / 100) * C;
            const dash = lone ? C : Math.max(0.6, len - (len > RING.gap * 3 ? RING.gap : 0));
            const arc = (
              <circle
                key={r.key}
                cx={c}
                cy={c}
                r={RING.r}
                fill="none"
                stroke={r.fill!}
                strokeWidth={RING.stroke}
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-offset}
                /* Twelve o'clock, clockwise — the order an eye takes a ring in. */
                transform={`rotate(-90 ${c} ${c})`}
                data-dim={active != null && active !== i ? "" : undefined}
                tabIndex={0}
                role="img"
                aria-label={`${r.label}, ${shareLabel(r.share)}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              />
            );
            offset += len;
            return arc;
          })}
          {/* The largest share, which is the concentration the ring is about. */}
          <text data-market-figure="" x={c} y={c - 2} textAnchor="middle">
            {shareLabel(biggest.share)}
          </text>
          <text data-market-caption="" x={c} y={c + 18} textAnchor="middle">
            {biggest.short}
          </text>
        </svg>

        {/* 🚨 The legend carries the figures, not just the swatches: the smaller
            grays are hard to match by eye, and a marketplace at 0% has no slice
            at all. Identity and value never rest on colour. */}
        <ul data-market-key="">
          {rows.map((r, i) => (
            <li
              key={r.key}
              data-on={active === i ? "" : undefined}
              data-none={r.share === 0 ? "" : undefined}
              onMouseEnter={() => r.share > 0 && setActive(i)}
            >
              <span data-market-swatch="" style={r.fill ? { background: r.fill } : undefined} aria-hidden="true" />
              <span data-market-name="">
                {r.label}
                {r.note && <small data-market-note="">{r.note}</small>}
              </span>
              {/* 🚨 Not [data-figure]: that attribute is also the block-level
                  image figure in globals.css, and its margins pulled every
                  legend row apart. The numerals are set in [data-market-pct]. */}
              <span data-market-pct="">{shareLabel(r.share)}</span>
              {month != null && r.share > 0 && (
                <span data-market-money="">
                  {money((r.share / 100) * month, business.currency)} / mo
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {block.note && <p data-breakdown-note="">{block.note}</p>}
    </section>
  );
}
