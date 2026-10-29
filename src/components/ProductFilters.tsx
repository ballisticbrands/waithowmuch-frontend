/**
 * The product library's filter bar — TrendTrack's Product filters, for Amazon:
 * Price, Revenue, Marketplaces and Launch date up front, Subscription, Best
 * seller rank and Reviews behind "3 more". Each chip opens a popover with an
 * ⓘ, presets, Min/Max and a stepped slider; an active chip fills in and gets
 * an ×, and every active filter is repeated in a row underneath with Clear.
 *
 * Prototype (/business2/). The state lives in the caller; `matches` is the one
 * place a row is tested against it, so the table, the grid and the count
 * cannot disagree.
 */
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// ─── State and matching ──────────────────────────────────────────────

/** null = open at that end. */
export type Bounds = { min: number | null; max: number | null };

export type ProductFilterState = {
  price?: Bounds;
  revenue?: Bounds & { per: "month" | "day" };
  markets?: { inc: string[]; exc: string[] };
  /** Inclusive ISO days. */
  launch?: { from: string; to: string };
  subscription?: "subscription" | "one-time";
  bsr?: Bounds;
  reviews?: { score?: Bounds; count?: Bounds };
};

/** What a product has to say for itself, normalised by the caller. */
export type FilterRow = {
  price?: number;
  /** Per month. */
  revenue: number;
  listed?: string;
  /** Host, "amazon.com". */
  marketplace: string;
  bsr?: number;
  rating?: number;
  reviews?: number;
  subscription?: boolean;
};

const within = (v: number | undefined, b: Bounds | undefined) =>
  !b || (v !== undefined && (b.min === null || v >= b.min) && (b.max === null || v <= b.max));

export function matches(r: FilterRow, f: ProductFilterState): boolean {
  if (!within(r.price, f.price)) return false;
  if (f.revenue && !within(f.revenue.per === "day" ? r.revenue / 30 : r.revenue, f.revenue)) return false;
  if (f.markets) {
    if (f.markets.inc.length && !f.markets.inc.includes(r.marketplace)) return false;
    if (f.markets.exc.includes(r.marketplace)) return false;
  }
  if (f.launch && (!r.listed || r.listed.slice(0, 10) < f.launch.from || r.listed.slice(0, 10) > f.launch.to)) return false;
  if (f.subscription && (r.subscription === undefined || r.subscription !== (f.subscription === "subscription"))) return false;
  if (!within(r.bsr, f.bsr)) return false;
  if (f.reviews && (!within(r.rating, f.reviews.score) || !within(r.reviews, f.reviews.count))) return false;
  return true;
}

// ─── Formatting ──────────────────────────────────────────────────────

const short = (n: number) =>
  n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(1)}K` : `${+n.toFixed(2)}`;

/** "10K" → 10000, "1.5m" → 1500000, "" → null. */
function parseShort(s: string): number | null {
  const m = s.trim().replace(/[$,\s+]/g, "").match(/^(\d*\.?\d+)([kKmM]?)$/);
  if (!m) return null;
  return Number(m[1]) * (m[2]?.toLowerCase() === "k" ? 1e3 : m[2]?.toLowerCase() === "m" ? 1e6 : 1);
}

const DAY = 86400000;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));
const fromIso = (s: string) => new Date(`${s}T00:00:00Z`);
const dayText = (s: string) => fromIso(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const todayIso = () => iso(new Date());

function spanText(from: string, to: string) {
  const days = Math.round((fromIso(to).getTime() - fromIso(from).getTime()) / DAY) + 1;
  if (days >= 360) return `${Math.round(days / 30.4 / 12) * 12 === 12 ? 12 : Math.round(days / 30.4)} months`;
  if (days >= 56) return `${Math.round(days / 30.4)} months`;
  return days === 1 ? "1 day" : `${days} days`;
}

// ─── Marketplaces ────────────────────────────────────────────────────

const MARKETPLACES: Array<{ host: string; country: string; code: string; region: "North America" | "Europe" | "Asia-Pacific" | "LATAM" | "Middle East" }> = [
  { host: "amazon.com", country: "United States", code: "US", region: "North America" },
  { host: "amazon.ca", country: "Canada", code: "CA", region: "North America" },
  { host: "amazon.co.uk", country: "United Kingdom", code: "GB", region: "Europe" },
  { host: "amazon.de", country: "Germany", code: "DE", region: "Europe" },
  { host: "amazon.fr", country: "France", code: "FR", region: "Europe" },
  { host: "amazon.it", country: "Italy", code: "IT", region: "Europe" },
  { host: "amazon.es", country: "Spain", code: "ES", region: "Europe" },
  { host: "amazon.nl", country: "Netherlands", code: "NL", region: "Europe" },
  { host: "amazon.se", country: "Sweden", code: "SE", region: "Europe" },
  { host: "amazon.pl", country: "Poland", code: "PL", region: "Europe" },
  { host: "amazon.com.be", country: "Belgium", code: "BE", region: "Europe" },
  { host: "amazon.co.jp", country: "Japan", code: "JP", region: "Asia-Pacific" },
  { host: "amazon.com.au", country: "Australia", code: "AU", region: "Asia-Pacific" },
  { host: "amazon.in", country: "India", code: "IN", region: "Asia-Pacific" },
  { host: "amazon.sg", country: "Singapore", code: "SG", region: "Asia-Pacific" },
  { host: "amazon.com.mx", country: "Mexico", code: "MX", region: "LATAM" },
  { host: "amazon.com.br", country: "Brazil", code: "BR", region: "LATAM" },
  { host: "amazon.ae", country: "United Arab Emirates", code: "AE", region: "Middle East" },
  { host: "amazon.sa", country: "Saudi Arabia", code: "SA", region: "Middle East" },
];
/** Amazon's four largest marketplaces by sales. */
const BIG_4 = ["amazon.com", "amazon.de", "amazon.co.uk", "amazon.co.jp"];
const flagOf = (code: string) => String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)));
const marketOf = (host: string) => MARKETPLACES.find((m) => m.host === host);

// ─── Icons ───────────────────────────────────────────────────────────

const I = {
  price: <path d="M12 3v18M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 2 2.7 4.5 3.2 4.5 1.5 4.5 3.3-2 3-4.5 3-4.5-1.3-4.5-3" />,
  revenue: <><path d="M9 4h6l-1.5 3h-3z" /><path d="M10.5 7C6 9.5 4 13 4 16a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4c0-3-2-6.5-6.5-9" /><path d="M12 11v6M10.3 12.5h2.6a1.2 1.2 0 0 1 0 2.4h-1.8a1.2 1.2 0 0 0 0 2.4h2.6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  refresh: <><path d="M20 12a8 8 0 1 1-2.6-5.9" /><path d="M20 4v5h-5" /></>,
  podium: <><path d="M3 20v-6h6v6M9 20V9h6v11M15 20v-4h6v4M2 20h20" /><path d="M12 3.5l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" /></>,
  reviews: <><path d="M12 3a8 8 0 0 0-8 8v9h8a8 8 0 0 0 0-16z" /><path d="M12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  trash: <><path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13" /></>,
  info: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M12 11v6M12 7.5v.01" stroke="white" strokeWidth="2.4" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></>,
  left: <path d="M15 18l-6-6 6-6" />,
  right: <path d="M9 6l6 6-6 6" />,
};
const Ico = ({ d, size = 15, className = "" }: { d: React.ReactNode; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}>
    {d}
  </svg>
);

// ─── Building blocks ─────────────────────────────────────────────────

function InfoDot({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex" tabIndex={0} aria-label={text}>
      <Ico d={I.info} size={14} className="text-[color:var(--foreground)]" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100">
        {text}
      </span>
    </span>
  );
}

function Pill({ on, onClick, children, disabled }: { on?: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        on ? "border-[color:var(--accent)] bg-[var(--accent)] text-white" : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--muted-foreground)]"
      }`}
    >
      {children}
    </button>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => <div className="mb-1.5 text-xs text-[color:var(--muted-foreground)]">{children}</div>;
const Divider = () => <div className="-mx-4 my-3.5 border-t border-[color:var(--border)]" />;

function NumberBox({ prefix, value, placeholder, onCommit, disabled }: {
  prefix?: string; value: number | null; placeholder: string; onCommit: (n: number | null) => void; disabled?: boolean;
}) {
  const [text, setText] = useState(value === null ? "" : String(value));
  useEffect(() => setText(value === null ? "" : String(value)), [value]);
  return (
    <label className={`flex items-center gap-1.5 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-sm ${disabled ? "opacity-50" : ""}`}>
      {prefix && <span className="text-[color:var(--muted-foreground)]">{prefix}</span>}
      <input
        inputMode="decimal"
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onCommit(parseShort(text))}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        className="w-full min-w-0 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-[color:var(--muted-foreground)]"
      />
    </label>
  );
}

/** Two handles over fixed stops; the last stop is open-ended ("10K+"). */
function StepSlider({ ticks, value, onChange, format, disabled, openTop = true }: {
  ticks: number[]; value: Bounds; onChange: (b: Bounds) => void; format: (n: number) => string; disabled?: boolean;
  /** The last stop means "and above" — false for a hard ceiling like a 5-star score. */
  openTop?: boolean;
}) {
  const last = ticks.length - 1;
  const idx = (v: number | null, dflt: number) => {
    if (v === null) return dflt;
    let best = 0;
    ticks.forEach((t, i) => Math.abs(t - v) < Math.abs(ticks[best]! - v) && (best = i));
    return best;
  };
  const lo = idx(value.min, 0), hi = idx(value.max, last);
  const pos = (i: number) => `calc(${(i / last) * 100}% )`;
  const set = (a: number, b: number) => onChange({ min: a === 0 ? null : ticks[a]!, max: b === last ? null : ticks[b]! });
  return (
    <div className={disabled ? "pointer-events-none opacity-50" : ""}>
      <div data-step-slider="" className="relative h-10 rounded-[10px] bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)] px-3">
        <div className="relative h-full">
          <div className="absolute inset-y-1 rounded-md bg-white" style={{ left: pos(lo), right: `calc(${100 - (hi / last) * 100}%)` }} />
          {ticks.map((_, i) => (
            <span key={i} className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--muted-foreground)] opacity-60" style={{ left: pos(i) }} />
          ))}
          <input type="range" min={0} max={last} step={1} value={lo} aria-label="Minimum" onChange={(e) => set(Math.min(+e.target.value, hi), hi)} />
          <input type="range" min={0} max={last} step={1} value={hi} aria-label="Maximum" onChange={(e) => set(lo, Math.max(+e.target.value, lo))} />
        </div>
      </div>
      <div className="relative mt-2 h-4 px-3 text-[11px] text-[color:var(--muted-foreground)]">
        <div className="relative h-full">
          {ticks.map((t, i) => (
            <span key={i} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: pos(i) }}>
              {format(t)}{i === last && openTop ? "+" : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Presets, Min/Max and the slider — Price, Revenue, BSR and Reviews all use it. */
function RangeBody({ value, onChange, ticks, presets, prefix, format, presetIcon, disabled, openTop = true }: {
  value: Bounds | undefined;
  onChange: (b: Bounds | undefined) => void;
  ticks: number[];
  /** A preset with a `group` goes in its own labelled row under the first. */
  presets: Array<{ label: React.ReactNode; min: number | null; max: number | null; group?: string }>;
  prefix?: string;
  format: (n: number) => string;
  presetIcon?: React.ReactNode;
  disabled?: boolean;
  openTop?: boolean;
}) {
  const v = value ?? { min: null, max: null };
  const put = (b: Bounds) => onChange(b.min === null && b.max === null ? undefined : b);
  return (
    <>
      {[...new Set(presets.map((p) => p.group ?? "Presets"))].map((group, gi) => (
        <div key={group} className={gi ? "mt-3" : ""}>
          <Label>{group}</Label>
          <div className="flex flex-wrap gap-2">
            {presets.filter((p) => (p.group ?? "Presets") === group).map((p, i) => (
              <Pill key={i} disabled={disabled} on={v.min === p.min && v.max === p.max} onClick={() => put({ min: p.min, max: p.max })}>
                {presetIcon}
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
      ))}
      <Divider />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Min</Label>
          <NumberBox disabled={disabled} prefix={prefix} value={v.min} placeholder={short(ticks[0]!)} onCommit={(n) => put({ ...v, min: n })} />
        </div>
        <div>
          <Label>Max</Label>
          <NumberBox disabled={disabled} prefix={prefix} value={v.max} placeholder={`${short(ticks.at(-1)!)}${openTop ? "+" : ""}`} onCommit={(n) => put({ ...v, max: n })} />
        </div>
      </div>
      <div className="mt-4">
        <StepSlider disabled={disabled} ticks={ticks} value={v} onChange={put} format={format} openTop={openTop} />
      </div>
    </>
  );
}

function NotRead({ what }: { what: string }) {
  return (
    <div className="mb-3 rounded-lg border border-dashed border-[color:var(--border)] bg-white px-3 py-2 text-xs text-[color:var(--muted-foreground)]">
      {what} isn't read per product for this brand yet, so this filter can't narrow the list.
    </div>
  );
}

// ─── Chip + popover ──────────────────────────────────────────────────

function FilterChip({ icon, label, info, active, onClear, width, children }: {
  icon: React.ReactNode; label: string; info: string; active: boolean; onClear: () => void; width: number;
  /** A function gets `close`, for a body that applies on a button (Launch date). */
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
}) {
  const [open, setOpen] = useState(false);
  /** Shift left, in px, so a wide popover stays on screen. */
  const [shift, setShift] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const toggle = () => {
    const r = ref.current?.getBoundingClientRect();
    setShift(r ? Math.min(0, window.innerWidth - 16 - (r.left + width)) : 0);
    setOpen((o) => !o);
  };
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
          active
            ? "border-[color:var(--accent)] bg-[var(--accent)] text-white"
            : `border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--muted-foreground)] ${open ? "bg-[var(--surface)]" : ""}`
        }`}
      >
        <Ico d={icon} />
        {label}
        {active ? (
          <span
            role="button"
            tabIndex={0}
            aria-label={`Clear ${label}`}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                onClear();
              }
            }}
            className="-mr-1 rounded-full p-0.5 hover:bg-white/20"
          >
            <Ico d={I.x} size={13} />
          </span>
        ) : (
          <Ico d={I.chevron} size={13} />
        )}
      </button>
      {open && (
        <div
          className={`absolute top-full z-40 mt-2 rounded-2xl border border-[color:var(--border)] bg-white p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] left-0`}
          style={{ width, transform: shift ? `translateX(${shift}px)` : undefined }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold">
            <Ico d={icon} />
            {label}
            <InfoDot text={info} />
            <button
              type="button"
              onClick={onClear}
              aria-label={`Clear ${label}`}
              className={`ml-auto rounded-md p-1 ${active ? "text-[color:var(--danger)]" : "text-[color:var(--muted-foreground)] opacity-50"}`}
            >
              <Ico d={I.trash} size={16} />
            </button>
          </div>
          <div className="rounded-xl bg-[var(--surface)] p-4">{typeof children === "function" ? children(() => setOpen(false)) : children}</div>
        </div>
      )}
    </div>
  );
}

// ─── Marketplaces body ───────────────────────────────────────────────

function MarketsBody({ value, onChange, usage }: {
  value: ProductFilterState["markets"]; onChange: (v: ProductFilterState["markets"]) => void; usage: Map<string, number>;
}) {
  const [q, setQ] = useState("");
  const [order, setOrder] = useState<"Usage" | "A–Z">("Usage");
  const v = value ?? { inc: [], exc: [] };
  const put = (n: { inc: string[]; exc: string[] }) => onChange(n.inc.length || n.exc.length ? n : undefined);
  const flip = (list: "inc" | "exc", host: string) => {
    const other = list === "inc" ? "exc" : "inc";
    const has = v[list].includes(host);
    put({ [list]: has ? v[list].filter((h) => h !== host) : [...v[list], host], [other]: v[other].filter((h) => h !== host) } as typeof v);
  };
  const region = (hosts: string[]) => put({ inc: hosts, exc: [] });
  const rows = MARKETPLACES.filter((m) => `${m.country} ${m.host}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) =>
    order === "A–Z" ? a.country.localeCompare(b.country) : (usage.get(b.host) ?? 0) - (usage.get(a.host) ?? 0),
  );
  const sameSet = (hosts: string[]) => v.inc.length === hosts.length && hosts.every((h) => v.inc.includes(h));
  return (
    <>
      <label className="flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5">
        <Ico d={I.search} size={14} className="text-[color:var(--muted-foreground)]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full border-0 bg-transparent p-0 text-sm outline-none" />
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill on={sameSet(BIG_4)} onClick={() => region(BIG_4)}>Big 4</Pill>
        {(["Europe", "North America", "Asia-Pacific", "LATAM"] as const).map((r) => {
          const hosts = MARKETPLACES.filter((m) => m.region === r).map((m) => m.host);
          return <Pill key={r} on={sameSet(hosts)} onClick={() => region(hosts)}>{r}</Pill>;
        })}
      </div>
      <Divider />
      <div className="mb-1 flex items-center text-xs">
        {(["Usage", "A–Z"] as const).map((o, i) => (
          <span key={o} className="flex items-center">
            {i > 0 && <span className="mx-1.5 text-[color:var(--muted-foreground)]">·</span>}
            <button type="button" onClick={() => setOrder(o)} className={order === o ? "font-semibold" : "text-[color:var(--muted-foreground)]"}>{o}</button>
          </span>
        ))}
        <span className="ml-auto flex gap-2 text-[color:var(--muted-foreground)] underline decoration-dotted underline-offset-2">
          <span>Inc.</span><span>Exc.</span>
        </span>
      </div>
      <ul className="m-0 max-h-[260px] list-none overflow-y-auto p-0">
        {rows.map((m) => (
          <li key={m.host} className="flex items-center gap-2.5 py-2 text-sm">
            <span className="text-base leading-none">{flagOf(m.code)}</span>
            <span>{m.country}</span>
            <span className="text-xs text-[color:var(--muted-foreground)]">{m.host}{usage.get(m.host) ? ` · ${usage.get(m.host)}` : ""}</span>
            <span className="ml-auto flex gap-3">
              <input type="checkbox" aria-label={`Include ${m.country}`} checked={v.inc.includes(m.host)} onChange={() => flip("inc", m.host)} className="h-4 w-4 accent-[var(--accent)]" />
              <input type="checkbox" aria-label={`Exclude ${m.country}`} checked={v.exc.includes(m.host)} onChange={() => flip("exc", m.host)} className="h-4 w-4 accent-[var(--danger)]" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

// ─── Launch date body ────────────────────────────────────────────────

type Span = { from: string; to: string };

function quarterOf(d: Date) {
  return { y: d.getUTCFullYear(), q: Math.floor(d.getUTCMonth() / 3) };
}
const quarterSpan = (y: number, q: number): Span => ({ from: iso(utc(y, q * 3, 1)), to: iso(utc(y, q * 3 + 3, 0)) });

/** Black Friday (the day after the fourth Thursday of November) to Cyber Monday. */
function bfcm(y: number): Span {
  const nov1 = utc(y, 10, 1).getUTCDay();
  const thanksgiving = 1 + ((4 - nov1 + 7) % 7) + 21;
  return { from: iso(utc(y, 10, thanksgiving + 1)), to: iso(utc(y, 10, thanksgiving + 4)) };
}
/** The two weeks up to Mother's Day in the US (second Sunday of May). */
function mothersDay(y: number): Span {
  const may1 = utc(y, 4, 1).getUTCDay();
  const day = 1 + ((7 - may1) % 7) + 7;
  return { from: iso(utc(y, 4, day - 14)), to: iso(utc(y, 4, day)) };
}

function presetGroups(): Record<"main" | "Calendar" | "Quarter" | "Seasonal events", Array<{ label: string; span: Span }>> {
  const t = fromIso(todayIso());
  const y = t.getUTCFullYear(), m = t.getUTCMonth(), d = t.getUTCDate();
  const back = (n: number): Span => ({ from: iso(new Date(t.getTime() - (n - 1) * DAY)), to: iso(t) });
  const dow = (t.getUTCDay() + 6) % 7; // Monday = 0
  const { q } = quarterOf(t);
  const lastQ = q === 0 ? { y: y - 1, q: 3 } : { y, q: q - 1 };
  const quarters: Array<{ label: string; span: Span }> = [];
  for (let i = 0, yy = y, qq = q; i < 9; i++) {
    quarters.push({ label: `Q${qq + 1} ${yy}`, span: quarterSpan(yy, qq) });
    qq--;
    if (qq < 0) {
      qq = 3;
      yy--;
    }
  }
  const seasons: Array<{ label: string; span: Span }> = [];
  for (let yy = y; yy >= y - 1; yy--) {
    const items = [
      { label: `BFCM ${yy}`, span: bfcm(yy) },
      { label: `Christmas season ${yy}`, span: { from: `${yy}-11-01`, to: `${yy}-12-24` } },
      { label: `Mother's Day ${yy}`, span: mothersDay(yy) },
      { label: `Valentine's Day ${yy}`, span: { from: `${yy}-02-01`, to: `${yy}-02-14` } },
    ];
    seasons.push(...items.filter((s) => s.span.from <= iso(t)));
  }
  return {
    main: [
      { label: "Today", span: back(1) },
      { label: "Yesterday", span: { from: iso(new Date(t.getTime() - DAY)), to: iso(new Date(t.getTime() - DAY)) } },
      { label: "Last 7 days", span: back(7) },
      { label: "Last 14 days", span: back(14) },
      { label: "Last 30 days", span: back(30) },
      { label: "Last 90 days", span: back(90) },
      { label: "Last 12 months", span: { from: iso(utc(y - 1, m, d + 1)), to: iso(t) } },
    ],
    Calendar: [
      { label: "Week to date", span: { from: iso(new Date(t.getTime() - dow * DAY)), to: iso(t) } },
      { label: "Last week", span: { from: iso(new Date(t.getTime() - (dow + 7) * DAY)), to: iso(new Date(t.getTime() - (dow + 1) * DAY)) } },
      { label: "Month to date", span: { from: iso(utc(y, m, 1)), to: iso(t) } },
      { label: "Last month", span: { from: iso(utc(y, m - 1, 1)), to: iso(utc(y, m, 0)) } },
      { label: "Quarter to date", span: { from: quarterSpan(y, q).from, to: iso(t) } },
      { label: "Last quarter", span: quarterSpan(lastQ.y, lastQ.q) },
      { label: "Year to date", span: { from: `${y}-01-01`, to: iso(t) } },
      { label: "Last year", span: { from: `${y - 1}-01-01`, to: `${y - 1}-12-31` } },
    ],
    Quarter: quarters,
    "Seasonal events": seasons,
  };
}

function Month({ y, m, draft, onPick, nav }: { y: number; m: number; draft: { from: string | null; to: string | null }; onPick: (d: string) => void; nav: React.ReactNode }) {
  const first = (utc(y, m, 1).getUTCDay() + 6) % 7;
  const days = utc(y, m + 1, 0).getUTCDate();
  const today = todayIso();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => iso(utc(y, m, i + 1)))];
  return (
    <div className="w-[224px]">
      <div className="mb-2 flex items-center justify-between">{nav}</div>
      <div className="grid grid-cols-7 text-center text-[11px] text-[color:var(--muted-foreground)]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">
        {cells.map((c, i) => {
          if (!c) return <span key={i} />;
          const end = draft.from && draft.to && (c === draft.to || c === draft.from);
          const inside = draft.from && draft.to && c >= draft.from && c <= draft.to;
          const start = c === draft.from;
          const future = c > today;
          return (
            <button
              key={i}
              type="button"
              disabled={future}
              onClick={() => onPick(c)}
              className={`relative h-8 tabular-nums disabled:text-[color:var(--muted-foreground)] disabled:opacity-40 ${
                end || (start && !draft.to) ? "rounded-md bg-[var(--accent)] font-semibold text-white" : inside ? "bg-[var(--accent-tint)]" : "rounded-md hover:bg-white"
              }`}
            >
              {Number(c.slice(8))}
              {c === today && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LaunchBody({ value, onApply }: { value: Span | undefined; onApply: (s: Span) => void }) {
  const groups = useMemo(presetGroups, []);
  const [menu, setMenu] = useState<keyof typeof groups>("main");
  const [draft, setDraft] = useState<{ from: string | null; to: string | null; label?: string }>(value ?? { from: null, to: null });
  const anchor = fromIso(draft.to ?? draft.from ?? todayIso());
  const [view, setView] = useState({ y: anchor.getUTCFullYear(), m: anchor.getUTCMonth() - 1 });
  const left = utc(view.y, view.m, 1), right = utc(view.y, view.m + 1, 1);
  const pickSpan = (label: string, s: Span) => {
    setDraft({ ...s, label });
    const e = fromIso(s.to);
    setView({ y: e.getUTCFullYear(), m: e.getUTCMonth() - 1 });
  };
  const pickDay = (d: string) =>
    setDraft((cur) => (!cur.from || cur.to ? { from: d, to: null } : d < cur.from ? { from: d, to: cur.from } : { from: cur.from, to: d }));
  const shift = (n: number) => setView((v) => ({ y: v.y + Math.floor((v.m + n) / 12), m: (((v.m + n) % 12) + 12) % 12 }));
  const monthNav = (d: Date, side: "left" | "right") => (
    <>
      <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className={`rounded p-1 hover:bg-white ${side === "right" ? "invisible" : ""}`}><Ico d={I.left} /></button>
      <span className="text-[13px] font-semibold">{d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</span>
      <button type="button" aria-label="Next month" onClick={() => shift(1)} className={`rounded p-1 hover:bg-white ${side === "left" ? "invisible" : ""}`}><Ico d={I.right} /></button>
    </>
  );
  const ready = !!(draft.from && draft.to) && (draft.from !== value?.from || draft.to !== value?.to);
  return (
    <div className="-m-4">
      <div className="flex">
        <div className="w-[170px] shrink-0 border-r border-[color:var(--border)] p-2 text-[13px]">
          {menu === "main" ? (
            <>
              {groups.main.map((p) => (
                <button key={p.label} type="button" onClick={() => pickSpan(p.label, p.span)} className={`block w-full rounded-md px-2 py-1.5 text-left hover:bg-white ${draft.label === p.label ? "bg-white font-semibold" : ""}`}>
                  {p.label}
                </button>
              ))}
              <div className="my-1.5 border-t border-[color:var(--border)]" />
              {(["Calendar", "Quarter", "Seasonal events"] as const).map((g) => (
                <button key={g} type="button" onClick={() => setMenu(g)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-white">
                  {g}
                  <Ico d={I.right} size={13} />
                </button>
              ))}
            </>
          ) : (
            <>
              <button type="button" onClick={() => setMenu("main")} className="mb-1 flex w-full items-center gap-1 border-b border-[color:var(--border)] px-1 pb-2 pt-1 text-left font-semibold">
                <Ico d={I.left} size={13} />
                {menu}
              </button>
              <div className="max-h-[260px] overflow-y-auto">
                {groups[menu].map((p) => (
                  <button key={p.label} type="button" onClick={() => pickSpan(p.label, p.span)} className={`block w-full rounded-md px-2 py-1.5 text-left hover:bg-white ${draft.label === p.label ? "bg-white font-semibold" : ""}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-3">
          <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            {(["from", "to"] as const).map((k, i) => (
              <Fragment key={k}>
                {i === 1 && <span className="pb-2 text-[color:var(--muted-foreground)]">→</span>}
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{k === "from" ? "Start" : "End"}</div>
                  <div className="rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-[13px]">{draft[k] ? dayText(draft[k]!) : <span className="text-[color:var(--muted-foreground)]">—</span>}</div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="flex gap-5">
            <Month y={left.getUTCFullYear()} m={left.getUTCMonth()} draft={draft} onPick={pickDay} nav={monthNav(left, "left")} />
            <Month y={right.getUTCFullYear()} m={right.getUTCMonth()} draft={draft} onPick={pickDay} nav={monthNav(right, "right")} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[color:var(--border)] px-4 py-2.5">
        <span className="text-xs text-[color:var(--muted-foreground)]">{draft.from && draft.to ? spanText(draft.from, draft.to) : ""}</span>
        <button
          type="button"
          disabled={!ready}
          onClick={() => draft.from && draft.to && onApply({ from: draft.from, to: draft.to })}
          className="rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ─── The bar ─────────────────────────────────────────────────────────

const PRICE_TICKS = [0, 30, 100, 200, 1000, 10000];
const REV_MONTH = [0, 3e3, 1e4, 3e4, 1e5, 3e5, 1e6, 3e6, 1e7];
const REV_DAY = [0, 100, 300, 1e3, 3e3, 1e4, 3e4, 1e5, 3e5];
const BSR_TICKS = [1, 100, 1000, 1e4, 1e5, 1e6];
/* 4.5 is its own stop: on Amazon "4.5 & up" is a different shelf from "4 & up". */
const SCORE_TICKS = [1, 2, 3, 4, 4.5, 5];
const CRITICAL_MAX = 3.9;
/** The score as words: "4.5★ & up", "5★", "Critical (under 4★)". */
function scoreText(b: Bounds) {
  if (b.min === null && b.max === CRITICAL_MAX) return "Critical (under 4★)";
  if (b.min === 5) return "5★";
  if (b.min !== null && b.max === null) return `${b.min}★ & up`;
  return boundsText(b, (n) => `${n}★`, 5);
}
const COUNT_TICKS = [0, 5, 10, 100, 1000, 1e4, 5e4];


function boundsText(b: Bounds, fmt: (n: number) => string, top: number) {
  if (b.min !== null && b.max !== null) return `${fmt(b.min)} → ${fmt(b.max)}`;
  if (b.min !== null) return `${fmt(b.min)}+`;
  if (b.max !== null) return `Up to ${fmt(b.max)}`;
  return `${fmt(0)} → ${fmt(top)}+`;
}

export function ProductFilterBar({ value, onChange, rows, currency }: {
  value: ProductFilterState; onChange: (f: ProductFilterState) => void; rows: FilterRow[]; currency: string;
}) {
  const [more, setMore] = useState(false);
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const money = (n: number) => `${sym}${short(n)}`;
  const set = <K extends keyof ProductFilterState>(k: K, v: ProductFilterState[K]) => {
    const next = { ...value };
    if (v === undefined) delete next[k];
    else next[k] = v;
    onChange(next);
  };
  const usage = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => m.set(r.marketplace, (m.get(r.marketplace) ?? 0) + 1));
    return m;
  }, [rows]);
  const hasRatings = rows.some((r) => r.rating !== undefined || r.reviews !== undefined);
  const hasSubscription = rows.some((r) => r.subscription !== undefined);
  // Per month / per day is a view of the chip, kept even with no bounds set.
  const [perUi, setPerUi] = useState<"month" | "day">(value.revenue?.per ?? "month");
  const per = value.revenue?.per ?? perUi;

  const price = (
    <FilterChip key="price" icon={I.price} label="Price" info={`Price of the product, in ${currency}.`} active={!!value.price} onClear={() => set("price", undefined)} width={440}>
      <RangeBody
        value={value.price}
        onChange={(b) => set("price", b)}
        ticks={PRICE_TICKS}
        prefix={sym}
        format={(n) => (n >= 1000 ? short(n) : String(n))}
        presets={[
          { label: `${sym}0 → ${sym}30`, min: null, max: 30 },
          { label: `${sym}30 → ${sym}100`, min: 30, max: 100 },
          { label: `${sym}100 → ${sym}200`, min: 100, max: 200 },
          { label: `${sym}200+`, min: 200, max: null },
        ]}
      />
    </FilterChip>
  );
  const revenue = (
    <FilterChip key="revenue" icon={I.revenue} label="Revenue" info="Estimated revenue of the product, per month." active={!!value.revenue} onClear={() => set("revenue", undefined)} width={440}>
      <div className="-mx-1 -mt-1 mb-4 flex rounded-lg bg-[var(--muted)] p-0.5 text-[13px]">
        {(["month", "day"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setPerUi(p);
              // Bounds in one unit mean nothing in the other: switching clears them.
              if (value.revenue && value.revenue.per !== p) set("revenue", undefined);
            }}
            className={`flex-1 rounded-md py-1.5 ${per === p ? "bg-white font-semibold shadow-sm" : "text-[color:var(--muted-foreground)]"}`}
            aria-pressed={per === p}
            data-per={p}
          >
            Per {p}
          </button>
        ))}
      </div>
      <RevenueRange per={per} value={value.revenue} onChange={(b) => set("revenue", b)} money={money} sym={sym} />
    </FilterChip>
  );
  const markets = (
    <FilterChip key="markets" icon={I.globe} label="Marketplaces" info="Amazon marketplaces where the product is sold." active={!!value.markets} onClear={() => set("markets", undefined)} width={460}>
      <MarketsBody value={value.markets} onChange={(v) => set("markets", v)} usage={usage} />
    </FilterChip>
  );
  const launch = (
    <FilterChip key="launch" icon={I.calendar} label="Launch date" info="When the product was listed on Amazon." active={!!value.launch} onClear={() => set("launch", undefined)} width={690}>
      {(close) => (
        <LaunchBody
          key={value.launch ? `${value.launch.from}${value.launch.to}` : "none"}
          value={value.launch}
          onApply={(s) => {
            set("launch", s);
            close();
          }}
        />
      )}
    </FilterChip>
  );
  const subscription = (
    <FilterChip key="sub" icon={I.refresh} label="Subscription" info="Whether the product is sold with Subscribe & Save." active={!!value.subscription} onClear={() => set("subscription", undefined)} width={280}>
      {!hasSubscription && <NotRead what="Subscribe & Save" />}
      <div className="-m-2 space-y-0.5">
        {([["All", undefined], ["Subscription", "subscription"], ["One-time purchase", "one-time"]] as const).map(([label, v]) => (
          <label key={label} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${value.subscription === v ? "bg-white" : ""} ${!hasSubscription && v ? "pointer-events-none opacity-40" : ""}`}>
            <input type="radio" name="subscription" checked={value.subscription === v} onChange={() => set("subscription", v)} className="h-4 w-4 accent-[var(--accent)]" />
            {label}
          </label>
        ))}
      </div>
    </FilterChip>
  );
  const bsr = (
    <FilterChip key="bsr" icon={I.podium} label="Best seller rank" info="Product's Best Seller Rank in its main Amazon category. #1 sells most." active={!!value.bsr} onClear={() => set("bsr", undefined)} width={440}>
      <RangeBody
        value={value.bsr}
        onChange={(b) => set("bsr", b)}
        ticks={BSR_TICKS}
        format={short}
        presetIcon={<Ico d={I.podium} size={13} />}
        presets={[
          { label: "Top 10,000", min: null, max: 10000 },
          { label: "Top 1,000", min: null, max: 1000 },
          { label: "Top 100", min: null, max: 100 },
        ]}
      />
    </FilterChip>
  );
  const reviews = (
    <FilterChip key="reviews" icon={I.reviews} label="Reviews" info="Product's average rating and number of reviews." active={!!value.reviews} onClear={() => set("reviews", undefined)} width={440}>
      {!hasRatings && <NotRead what="Rating" />}
      <div className="mb-2 text-xs font-medium text-[color:var(--muted-foreground)]">Score</div>
      <RangeBody
        disabled={!hasRatings}
        value={value.reviews?.score}
        onChange={(b) => set("reviews", b || value.reviews?.count ? { ...value.reviews, score: b } : undefined)}
        ticks={SCORE_TICKS}
        format={String}
        openTop={false}
        presets={[
          { label: "3★ & up", min: 3, max: null },
          { label: "4★ & up", min: 4, max: null },
          { label: "4.5★ & up", min: 4.5, max: null },
          { label: "5★", min: 5, max: null },
          /* Amazon's own split on a listing: positive is 4–5★, critical 1–3★.
             Ratings are read to one decimal, so "under 4" is up to 3.9. */
          { label: "Positive · 4–5★", min: 4, max: null, group: "Positive or critical" },
          { label: "Critical · under 4★", min: null, max: CRITICAL_MAX, group: "Positive or critical" },
        ]}
      />
      <Divider />
      <div className="mb-2 text-xs font-medium text-[color:var(--muted-foreground)]">Reviews</div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Min</Label>
          <NumberBox disabled={!hasRatings} value={value.reviews?.count?.min ?? null} placeholder="0" onCommit={(n) => set("reviews", { ...value.reviews, count: { min: n, max: value.reviews?.count?.max ?? null } })} />
        </div>
        <div>
          <Label>Max</Label>
          <NumberBox disabled={!hasRatings} value={value.reviews?.count?.max ?? null} placeholder="50K+" onCommit={(n) => set("reviews", { ...value.reviews, count: { min: value.reviews?.count?.min ?? null, max: n } })} />
        </div>
      </div>
      <div className="mt-4">
        <StepSlider
          disabled={!hasRatings}
          ticks={COUNT_TICKS}
          value={value.reviews?.count ?? { min: null, max: null }}
          onChange={(b) => set("reviews", { ...value.reviews, count: b.min === null && b.max === null ? undefined : b })}
          format={short}
        />
      </div>
    </FilterChip>
  );

  /* The active filters, repeated as removable tags. */
  const tags: Array<{ key: keyof ProductFilterState; icon: React.ReactNode; text: React.ReactNode }> = [];
  if (value.price) tags.push({ key: "price", icon: I.price, text: boundsText(value.price, (n) => `${sym}${n >= 1000 ? short(n) : n}`, 10000) });
  if (value.revenue) tags.push({ key: "revenue", icon: I.revenue, text: `${boundsText(value.revenue, money, per === "day" ? 3e5 : 1e7)} /${per === "day" ? "day" : "mo"}` });
  if (value.markets) {
    const names = (hs: string[]) => hs.map((h) => marketOf(h)?.code ?? h).join(", ");
    tags.push({ key: "markets", icon: I.globe, text: [value.markets.inc.length && names(value.markets.inc), value.markets.exc.length && `not ${names(value.markets.exc)}`].filter(Boolean).join(" · ") });
  }
  if (value.launch) tags.push({ key: "launch", icon: I.calendar, text: `${dayText(value.launch.from)} → ${dayText(value.launch.to)}` });
  if (value.subscription) tags.push({ key: "subscription", icon: I.refresh, text: value.subscription === "subscription" ? "Subscription" : "One-time purchase" });
  if (value.bsr) tags.push({ key: "bsr", icon: I.podium, text: value.bsr.min === null && value.bsr.max !== null ? `Top ${value.bsr.max.toLocaleString("en-US")}` : boundsText(value.bsr, (n) => `#${short(n)}`, 1e6) });
  if (value.reviews) tags.push({ key: "reviews", icon: I.reviews, text: [value.reviews.score && scoreText(value.reviews.score), value.reviews.count && `${boundsText(value.reviews.count, short, 5e4)} reviews`].filter(Boolean).join(" · ") || "Reviews" });

  const moreActive = !!(value.subscription || value.bsr || value.reviews);
  const showMore = more || moreActive;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white">
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h8V7z" /></svg>
          Product
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {price}
          {revenue}
          {markets}
          {launch}
          {!moreActive && (
            <button type="button" onClick={() => setMore((m) => !m)} className={`px-2 text-[13px] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] ${showMore ? "underline underline-offset-2" : ""}`}>
              {showMore ? "Less" : "3 more"}
            </button>
          )}
        </div>
        {showMore && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-3">
            {subscription}
            {bsr}
            {reviews}
          </div>
        )}
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] px-4 py-2.5">
          {tags.map((t) => (
            <span key={t.key} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-tint)] px-2.5 py-1 text-[13px] font-semibold text-[color:var(--accent)]">
              <Ico d={t.icon} size={13} />
              {t.text}
              <button type="button" aria-label="Remove filter" onClick={() => set(t.key, undefined)} className="rounded p-0.5 hover:bg-white/60">
                <Ico d={I.x} size={12} />
              </button>
            </span>
          ))}
          <button type="button" onClick={() => onChange({})} className="ml-auto text-[13px] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

function RevenueRange({ per, value, onChange, money, sym }: {
  per: "month" | "day"; value: ProductFilterState["revenue"]; onChange: (v: ProductFilterState["revenue"]) => void; money: (n: number) => string; sym: string;
}) {
  const presets =
    per === "month"
      ? [
          { label: `${money(3e3)} → ${money(3e4)}`, min: 3e3, max: 3e4 },
          { label: `${money(3e4)} → ${money(3e5)}`, min: 3e4, max: 3e5 },
          { label: `${money(3e5)}+`, min: 3e5, max: null },
        ]
      : [
          { label: `${money(100)} → ${money(1e3)}`, min: 100, max: 1e3 },
          { label: `${money(1e3)} → ${money(1e4)}`, min: 1e3, max: 1e4 },
          { label: `${money(1e4)}+`, min: 1e4, max: null },
        ];
  return (
    <RangeBody
      value={value}
      onChange={(b) => onChange(b ? { ...b, per } : undefined)}
      ticks={per === "month" ? REV_MONTH : REV_DAY}
      prefix={sym}
      format={(n) => `${sym}${short(n)}`}
      presets={presets}
    />
  );
}
