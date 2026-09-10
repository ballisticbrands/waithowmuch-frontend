import type { Block } from "@/businesses/types";
import { percent, price } from "@/lib/format";

type Margin = Extract<Block, { type: "margin" }>;

/** Cents kept, and the sign dropped — the row already carries a minus. Rounding
 *  to whole dollars on an $8.87 order would round the advertising line to the
 *  same figure as the referral fee. */
const perUnit = (v: number, currency: string) => price(Math.abs(v), currency);

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

  return (
    <section data-margin-table="">
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
