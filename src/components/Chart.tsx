import type { MetricPoint } from "@/lib/api";
import { money, monthLabel } from "@/lib/format";

/**
 * Revenue/profit bars. Hand-rolled SVG rather than a charting library:
 * this draws two series over ~24 points, and the smallest usable chart
 * library is ~50KB gzipped — which is most of the performance budget the
 * funnel playbook mandates, spent on something a <rect> loop does.
 */
export function Chart({ points, currency }: { points: MetricPoint[]; currency: string }) {
  if (points.length === 0) {
    return <div data-empty>No figures published yet.</div>;
  }

  const W = 720;
  const H = 240;
  const PAD = { top: 16, right: 8, bottom: 28, left: 8 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const revenues = points.map((p) => Number(p.revenue ?? 0));
  // Guard the divide: a business with only zero-revenue months is real
  // (pre-launch, stocked out) and must not produce NaN geometry.
  const max = Math.max(...revenues, 1);

  const slot = innerW / points.length;
  const barW = Math.max(2, slot * 0.62);

  // Label every nth month so the axis stays readable at any series length.
  const step = Math.ceil(points.length / 8);

  return (
    <figure>
      <svg data-chart viewBox={`0 0 ${W} ${H}`} role="img"
           aria-label={`Monthly revenue, ${monthLabel(points[0]!.date)} to ${monthLabel(points[points.length - 1]!.date)}`}>
        <line x1={PAD.left} y1={PAD.top + innerH} x2={W - PAD.right} y2={PAD.top + innerH}
              stroke="var(--border)" strokeWidth="1" />
        {points.map((p, i) => {
          const rev = Number(p.revenue ?? 0);
          const profit = Number(p.profit ?? 0);
          const h = (rev / max) * innerH;
          const ph = (Math.max(profit, 0) / max) * innerH;
          const x = PAD.left + i * slot + (slot - barW) / 2;
          return (
            <g key={p.date}>
              <rect x={x} y={PAD.top + innerH - h} width={barW} height={h}
                    fill="var(--muted)" rx="3" />
              {/* Profit drawn inside revenue, not beside it — the visual
                  question is "how much of the top line survives". */}
              <rect x={x} y={PAD.top + innerH - ph} width={barW} height={ph}
                    fill="var(--accent)" rx="3" />
              <title>{`${monthLabel(p.date)} — revenue ${money(rev, currency)}, profit ${money(profit, currency)}`}</title>
              {i % step === 0 && (
                <text x={x + barW / 2} y={H - 8} textAnchor="middle"
                      fontSize="10" fill="var(--muted-foreground)">
                  {monthLabel(p.date)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="text-sm" style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
        <span style={{ color: "var(--accent)" }}>■</span> profit inside{" "}
        <span>■</span> revenue · peak {money(max, currency)}/mo
      </figcaption>
    </figure>
  );
}
