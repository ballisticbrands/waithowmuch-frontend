/**
 * Rail icons — 18px, stroked in currentColor so they invert inside the active
 * pill without a second asset.
 *
 * ⚠️ `amazon` and `shopify` are GENERIC marks (a parcel and a shopping bag),
 * drawn here — not the official brand logos. Reproducing a trademarked
 * wordmark from memory gets it subtly wrong and is not mine to ship. If you
 * want the real ones, drop the official SVGs into /public/icons/ and pass
 * `src` instead of `name`; the component already takes either.
 */
const S = {
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true, focusable: false,
};

const PATHS: Record<string, React.ReactNode> = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /></>,
  // A stacked database — the "all records" idea.
  database: <><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /><path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  // Parcel — generic, for the FBA collection.
  parcel: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5" /><path d="M12 12v9" /></>,
  // Shopping bag — generic, for the Shopify collection.
  bag: <><path d="M5 7h14l-1 13H6z" /><path d="M9 7V5.5a3 3 0 0 1 6 0V7" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z" /></>,
};

export type RailIconName = keyof typeof PATHS;

export function RailIcon({ name, src }: { name?: RailIconName; src?: string }) {
  if (src) return <img src={src} alt="" width={18} height={18} aria-hidden style={{ display: "block" }} />;
  if (!name || !PATHS[name]) return <span style={{ width: 18, display: "block" }} aria-hidden />;
  return <svg {...S}>{PATHS[name]}</svg>;
}
