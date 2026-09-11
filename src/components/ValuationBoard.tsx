import type { MetricsResponse } from "@/lib/api";
import type { Profile } from "@/businesses/types";
import type { Adjustment, Valuation } from "@/valuation/model.mjs";
import { scoreProfile } from "@/valuation/inputs.mjs";
import { money } from "@/lib/format";
import { InfoTip } from "./InfoTip";

/** The model reports what it could not score by input key. These are the
 *  reader-facing names for them. An unmapped key falls through as itself,
 *  which is ugly and visible — the right failure for a missing translation. */
const SIGNAL_NAMES: Record<string, string> = {
  sellingSince: "catalogue age",
  hoursPerWeek: "hours worked",
  supplierCount: "supplier count",
  supplierRole: "supplier redundancy",
  supplierTerms: "supply terms",
  primaryMethod: "sourcing method",
  catalogStructure: "catalogue shape",
  diffTooling: "differentiation",
  brandRegistry: "Brand Registry",
  ratingWeighted: "product rating",
  topMarketplaceSharePct: "marketplace concentration",
  peakMonthSharePct: "seasonality",
  issues: "open IP or account issues",
  accountHealthScore: "Account Health Rating",
  accountHealth: "account health",
  team: "team",
};

/**
 * Every factor that moved the multiple, in two columns.
 *
 * ── Why show the working at all ──────────────────────────────────────────
 * 🚨 A valuation that arrives as one number is a slot machine. The whole
 * argument for publishing an estimate rather than staying silent is that the
 * reader can check it, so every factor is named, priced and explained — and
 * the ones that COST the business are as prominent as the ones that pay it,
 * in the same type at the same size in the adjacent column.
 *
 * ── Nothing scored, nothing shown ────────────────────────────────────────
 * A profile carrying a stated multiple rather than model inputs produces no
 * adjustments, and this renders nothing at all. Inventing a breakdown for a
 * number somebody typed would be the exact failure the board exists to
 * prevent.
 *
 * ── The bars are relative to the biggest factor ──────────────────────────
 * Not to the base multiple, and not to the total. The question a reader has
 * is which factor did the most work, and against a 2.6 base every bar would
 * be a sliver.
 */
export function ValuationBoard({
  series,
  profile,
  currency,
  note,
}: {
  series: MetricsResponse | null;
  /* The whole profile, not profile.valuation: the scoring date lives on
     `headline.snapshotMonth` and scoreProfile resolves it itself. */
  profile: Profile;
  currency: string;
  /** What the figure excludes. Rendered under the columns. */
  note?: string;
}) {
  const scored: Valuation | null = scoreProfile(profile, series);
  if (!scored || scored.value === null || scored.adjustments.length === 0) return null;

  const ups = scored.adjustments.filter((a: Adjustment) => a.delta > 0);
  const downs = scored.adjustments.filter((a: Adjustment) => a.delta < 0);
  const widest = Math.max(...scored.adjustments.map((a: Adjustment) => Math.abs(a.delta)));

  return (
    <section data-val="">
      <div data-val-head="">
        <div>
          <h3>Indicative valuation</h3>
          <p>
            {scored.multiple}× on {money(scored.netProfitTtm, currency)} trailing-twelve net profit
          </p>
        </div>
        <strong data-val-figure="" data-figure="">
          {money(scored.value, currency)}
        </strong>
      </div>

      <div data-val-adj="">
        <Column title={`What lifts it (${ups.length})`} items={ups} widest={widest} />
        <Column title={`What holds it back (${downs.length})`} items={downs} widest={widest} />
      </div>

      {/* 🚨 The unscored list is not an apology, it is the finding. On a
          researched profile nobody has answered a questionnaire, so much of
          the model never fires — and a reader comparing two businesses needs
          to know which one was scored on more.

          NAMED FROM THE MODEL'S OWN OUTPUT, not from a sentence written
          alongside it. A hardcoded list goes stale the moment a signal is
          closed, and then the page claims not to know something it has just
          published two lines above. */}
      {scored.missingSignals.length > 0 && (
        <p data-val-missing="">
          <strong>{scored.missingSignals.length} signals unscored:</strong>{" "}
          {[...new Set(scored.missingSignals.map((k) => SIGNAL_NAMES[k] ?? k))].join(", ")}. Each is
          a factor this valuation leaves out in both directions — most of them answers only the
          owner can give.
        </p>
      )}

      {note && <p data-val-missing="">{note}</p>}
    </section>
  );
}

function Column({
  title,
  items,
  widest,
}: {
  title: string;
  items: Adjustment[];
  widest: number;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p data-col-title="">{title}</p>
      <ul>
        {items.map((a) => (
          <li key={a.label} data-dir={a.delta > 0 ? "up" : "down"}>
            <span data-adj-bar="" style={{ width: `${(Math.abs(a.delta) / widest) * 100}%` }} />
            <span data-adj-label="">
              {a.label}
              {/* The model writes its own explanation beside each rule, so the
                  tooltip is the rule's own words rather than a lookup keyed by
                  label — which breaks silently the moment a label is reworded. */}
              {a.why && <InfoTip label={a.label} paragraphs={[a.why]} />}
            </span>
            <b>
              {a.delta > 0 ? "+" : "−"}
              {Math.abs(a.delta).toFixed(2)}×
            </b>
          </li>
        ))}
      </ul>
    </div>
  );
}
