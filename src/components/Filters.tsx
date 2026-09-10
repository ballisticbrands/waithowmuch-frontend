import type { FacetCategory } from "@/lib/api";
import { money } from "@/lib/format";
import { RangeSlider } from "./RangeSlider";

/** Track ceilings. A thumb at the top means "and everything above", so these
 *  bound the CONTROL, never the results — see the note in RangeSlider. */
const REVENUE_MAX = 500_000;
const REVENUE_STEP = 5_000;
const COST_MAX = 10_000;
const COST_STEP = 250;

export type FilterState = {
  revenueMin?: number;
  revenueMax?: number;
  costMin?: number;
  costMax?: number;
  growth: string[];
  audience: string[];
  niche: string[];
  sort: string;
};

export const EMPTY_FILTERS: FilterState = { growth: [], audience: [], niche: [], sort: "revenue" };

const SORTS = [
  { value: "revenue", label: "Revenue — high to low" },
  { value: "revenueAsc", label: "Revenue — low to high" },
  { value: "profit", label: "Profit — high to low" },
  { value: "margin", label: "Best margin" },
  { value: "costAsc", label: "Starting cost — low to high" },
  { value: "cost", label: "Starting cost — high to low" },
  { value: "newest", label: "Recently added" },
];

function ChipGroup({
  label, options, selected, onToggle,
}: {
  label: string;
  options: FacetCategory[];
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div data-filter style={{ flex: "1 1 100%" }}>
      <span data-filter-label>{label}</span>
      <div data-chips>
        {options.map((o) => (
          <button
            key={o.slug}
            data-chip
            data-on={selected.includes(o.slug)}
            aria-pressed={selected.includes(o.slug)}
            onClick={() => onToggle(o.slug)}
          >
            {o.name}
            <span style={{ opacity: 0.55, marginLeft: "0.3rem" }}>{o.businessCount}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Filters({
  state, onChange, facets, total,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
  facets: FacetCategory[];
  total: number | null;
}) {
  const set = (patch: Partial<FilterState>) => onChange({ ...state, ...patch });
  const toggle = (key: "growth" | "audience" | "niche", slug: string) =>
    set({
      [key]: state[key].includes(slug) ? state[key].filter((s) => s !== slug) : [...state[key], slug],
    } as Partial<FilterState>);

  const byKind = (kind: string) => facets.filter((f) => f.kind === kind);
  const dirty =
    state.revenueMin !== undefined || state.revenueMax !== undefined ||
    state.costMin !== undefined || state.costMax !== undefined ||
    state.growth.length > 0 || state.audience.length > 0 || state.niche.length > 0;

  return (
    <>
      <div data-filters>
        <RangeSlider
          label="Revenue / mo"
          min={0} max={REVENUE_MAX} step={REVENUE_STEP}
          valueMin={state.revenueMin} valueMax={state.revenueMax}
          onChange={(r) => set({ revenueMin: r.min, revenueMax: r.max })}
          format={(n) => money(n, "USD")}
        />

        <RangeSlider
          label="Starting cost"
          min={0} max={COST_MAX} step={COST_STEP}
          valueMin={state.costMin} valueMax={state.costMax}
          onChange={(r) => set({ costMin: r.min, costMax: r.max })}
          format={(n) => money(n, "USD")}
        />

        <div data-filter>
          <label data-filter-label htmlFor="sort">Sort</label>
          <select data-select id="sort" value={state.sort}
                  onChange={(e) => set({ sort: e.target.value })} style={{ width: "auto" }}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {dirty && (
          <button data-btn data-variant="ghost" onClick={() => onChange({ ...EMPTY_FILTERS, sort: state.sort })}>
            Clear filters
          </button>
        )}

        <ChipGroup label="Growth channel" options={byKind("GROWTH")}
                   selected={state.growth} onToggle={(s) => toggle("growth", s)} />
        <ChipGroup label="Who it sells to" options={byKind("AUDIENCE")}
                   selected={state.audience} onToggle={(s) => toggle("audience", s)} />
        <ChipGroup label="Niche" options={byKind("NICHE")}
                   selected={state.niche} onToggle={(s) => toggle("niche", s)} />
      </div>

      {total !== null && (
        <p data-result-count>
          {total === 0 ? "No ideas match these filters" : `${total} idea${total === 1 ? "" : "s"}`}
          {(state.costMin !== undefined || state.costMax !== undefined) && (
            // Worth saying out loud: the cost filter drops rows with an unknown
            // starting cost, so the count falls further than people expect.
            <span> · ideas with no starting-cost figure are hidden</span>
          )}
        </p>
      )}
    </>
  );
}

/** Serialise to the API's query shape. Undefined bounds are omitted entirely
 *  rather than sent as empty, which the backend would reject. */
export function toQuery(f: FilterState): string {
  const p = new URLSearchParams();
  if (f.revenueMin !== undefined) p.set("revenueMin", String(f.revenueMin));
  if (f.revenueMax !== undefined) p.set("revenueMax", String(f.revenueMax));
  if (f.costMin !== undefined) p.set("costMin", String(f.costMin));
  if (f.costMax !== undefined) p.set("costMax", String(f.costMax));
  if (f.growth.length) p.set("growth", f.growth.join(","));
  if (f.audience.length) p.set("audience", f.audience.join(","));
  if (f.niche.length) p.set("niche", f.niche.join(","));
  if (f.sort) p.set("sort", f.sort);
  return p.toString();
}

export { money };
