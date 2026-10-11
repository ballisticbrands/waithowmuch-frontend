import type { Block } from "@/businesses/types";

/**
 * "Do the quotes back up what the founders said?" — a claimed cost-of-goods
 * share set against what factories quote for the same products.
 *
 * The point of the exhibit is AGREEMENT, so it is drawn to make agreement (or
 * its absence) the first thing a reader sees: a hero pair of numbers with a
 * computed verdict, then one row per product with the quote as a dot on the
 * founders' figure, drawn as a dashed reference line. The extra a new seller
 * pays on top — tariff and freight — is a recessive grey run from the dot to the
 * landed cost, labelled, so it is visible without competing.
 *
 * Colour carries one identity only: the accent is "the quote". The claim is
 * neutral ink and the add-on a grey from the site's cost ramp, which reads as
 * "cost, not the answer". Every value is written beside its row and the detail
 * table under the exhibit is the table view, so nothing is read from colour
 * alone. Each row's track is HTML positioned in percent, so on a phone the row
 * stacks (label, track, values) instead of a whole SVG shrinking past reading.
 *
 * Owner's call, 2026-10-11 (KALOTOYS): the comparison has to look like the
 * finding it is — it is what tells a reader the figures are credible.
 */
type CostAgreementBlock = Extract<Block, { type: "cost-agreement" }>;

/* One decimal always, so 18.0% sits beside 14.2% as a figure of the same kind;
   the hero's figures drop a trailing .0 (16% is the founders' own round figure). */
const pct = (v: number) => `${v.toFixed(1)}%`;
const hero = (v: number) => `${Number(v.toFixed(1))}%`;
const usd = (v: number) => `$${v.toFixed(2)}`;

/** A round axis end above the largest landed share. */
const axisEnd = (v: number) => Math.ceil(v / 5) * 5;

function verdict(diff: number): string {
  const a = Math.abs(diff);
  if (a < 1) return "Within 1 point";
  if (a < 2) return "Within 2 points";
  return `${Number(a.toFixed(1))} points ${diff > 0 ? "higher" : "lower"}`;
}

export function CostAgreement({ block }: { block: CostAgreementBlock }) {
  const { claim, quote, products } = block;
  const end = axisEnd(Math.max(...products.map((p) => p.landedPct), claim.pct) + 1);
  const at = (v: number) => `${(v / end) * 100}%`;
  const ticks = Array.from({ length: end / 5 + 1 }, (_, i) => i * 5);

  return (
    <figure data-cost-agreement="">
      <div data-ca-hero="">
        <div data-ca-figure="">
          <span data-ca-label="">{claim.label}</span>
          <span data-ca-value="" data-figure="">{hero(claim.pct)}</span>
          <span data-ca-sub="">{claim.source}</span>
        </div>
        <div data-ca-vs="" aria-hidden="true">vs</div>
        <div data-ca-figure="" data-ca-quote="">
          <span data-ca-label="">{quote.label}</span>
          <span data-ca-value="" data-figure="">{hero(quote.pct)}</span>
          <span data-ca-sub="">{quote.source}</span>
        </div>
        <div data-ca-verdict="">
          <strong>{verdict(quote.pct - claim.pct)}</strong>
          <span>{block.verdictNote}</span>
        </div>
      </div>

      <div data-ca-plot="" role="img" aria-label={block.ariaLabel}>
        <div data-ca-rows="">
          {products.map((p, i) => (
            <div data-ca-row="" key={p.label}>
              <div data-ca-name="">
                <strong>{p.label}</strong>
                <span>sells at {usd(p.price)}</span>
              </div>
              <div data-ca-track="">
                {ticks.map((t) => (
                  <span key={t} data-ca-grid="" style={{ left: at(t) }} />
                ))}
                <span data-ca-claim="" style={{ left: at(claim.pct) }}>
                  {i === 0 && <span data-ca-claimlabel="">Founders {hero(claim.pct)}</span>}
                </span>
                <span
                  data-ca-addon=""
                  style={{ left: at(p.makePct), width: `calc(${at(p.landedPct)} - ${at(p.makePct)})` }}
                  title={`${p.label}: landed ${usd(p.landedUsd)}, ${pct(p.landedPct)} of the price, with tariff and freight`}
                />
                <span
                  data-ca-dot=""
                  style={{ left: at(p.makePct) }}
                  title={`${p.label}: Alibaba make cost ${usd(p.makeUsd)}, ${pct(p.makePct)} of the price, against the founders’ ${usd(p.claimUsd)}`}
                />
              </div>
              <div data-ca-values="">
                <strong>
                  {usd(p.makeUsd)} · {pct(p.makePct)}
                </strong>
                <span>
                  founders {usd(p.claimUsd)} · landed {usd(p.landedUsd)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div data-ca-axis="" aria-hidden="true">
          <span data-ca-name="" />
          <div data-ca-ticks="">
            {ticks.map((t) => (
              <span key={t} style={{ left: at(t) }}>{t}%</span>
            ))}
          </div>
          <span data-ca-values="" />
        </div>
      </div>

      <ul data-ca-legend="">
        <li><span data-ca-key="dot" aria-hidden="true" />Alibaba quote — the cost to make</li>
        <li><span data-ca-key="claim" aria-hidden="true" />What the founders said</li>
        <li><span data-ca-key="addon" aria-hidden="true" />+ tariff and freight — what a new seller lands it for</li>
      </ul>
      {block.note && <figcaption data-ca-note="">{block.note}</figcaption>}
    </figure>
  );
}
