import type { FacetCategory } from "@/lib/api";
import { money } from "@/lib/format";

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

/** A number input that treats "" as undefined rather than 0 — an empty bound
 *  means "unbounded", and coercing it to 0 would filter out every unknown. */
function NumberBound({
  value, onChange, placeholder, ariaLabel,
}: {
  value?: number;
  onChange: (v?: number) => void;
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <input
      type="number"
      min={0}
      inputMode="numeric"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
    />
  );
}

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
        <div data-filter>
          <span data-filter-label>Revenue / mo</span>
          <div data-range>
            <NumberBound ariaLabel="Minimum monthly revenue" placeholder="Any"
              value={state.revenueMin} onChange={(v) => set({ revenueMin: v })} />
            <span data-range-sep>to</span>
            <NumberBound ariaLabel="Maximum monthly revenue" placeholder="Any"
              value={state.revenueMax} onChange={(v) => set({ revenueMax: v })} />
          </div>
        </div>

        <div data-filter>
          <span data-filter-label>Starting cost</span>
          <div data-range>
            <NumberBound ariaLabel="Minimum starting cost" placeholder="Any"
              value={state.costMin} onChange={(v) => set({ costMin: v })} />
            <span data-range-sep>to</span>
            <NumberBound ariaLabel="Maximum starting cost" placeholder="Any"
              value={state.costMax} onChange={(v) => set({ costMax: v })} />
          </div>
        </div>

        <div data-filter>
          <span data-filter-label>Sort</span>
          <select data-select aria-label="Sort results" value={state.sort}
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
