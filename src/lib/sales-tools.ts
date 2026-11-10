/**
 * The two Keepa-backed tools' side of the API: response shapes, one fetch
 * that turns every failure into something the page can say, and the map from
 * Amazon's category to the fee engine's referral category.
 *
 * 🚨 The backend may not be deployed yet, or its Keepa key may be unset. A
 * missing route (404 not_found), 503 tools_unavailable, 502, and a network
 * failure all become `{ kind: "unavailable" }`, which the pages render as a
 * plain "temporarily unavailable" panel — never a broken form.
 */
import { apiFetch, ApiError, type BusinessCard } from "./api";

export type Comparable = Pick<BusinessCard, "slug" | "name" | "logoUrl" | "tagline" | "latestMonthlyRevenue"> & {
  matchedOn: "asin" | "brand" | "seller" | "revenue";
};

export type ProductSales = {
  asin: string;
  url: string;
  title: string | null;
  brand: string | null;
  imageUrl: string | null;
  categoryPath: string[];
  salesRank: number | null;
  units: {
    source: "amazon_badge" | "none";
    badge: number | null;
    label: string | null;
    low: number;
    /** Inclusive: "1K+" is 1,000–1,999. */
    high: number;
    lastBadge: { units: number; label: string; seenAt: string } | null;
  };
  price: { cents: number; source: "buy_box" | "new" | "amazon" } | null;
  revenue: { lowCents: number; highCents: number } | null;
  package: { lengthMm: number; widthMm: number; heightMm: number; weightG: number } | null;
  amazonFbaFeeCents: number | null;
  referralFeePercent: number | null;
  comparables: Comparable[];
  retrievedAt: string;
  cached: boolean;
};

export type StoreRevenue = {
  seller: { id: string; name: string | null; businessName: string | null; country: string | null; rating: number | null; ratingCount: number | null; url: string };
  catalogueSize: number;
  badgedListings: number;
  pricedListings: number;
  capped: boolean;
  cap: number;
  units: { low: number; high: number };
  revenue: { lowCents: number; highCents: number };
  products: Array<{
    asin: string; title: string | null; imageUrl: string | null; label: string;
    unitsLow: number; unitsHigh: number; priceCents: number; revenueLowCents: number; revenueHighCents: number;
  }>;
  resolvedFrom: { asin: string } | null;
  comparables: Comparable[];
  retrievedAt: string;
  cached: boolean;
  signedIn: boolean;
};

export type ToolResult<T> =
  | { kind: "ok"; data: T }
  | { kind: "invalid"; message: string }
  | { kind: "not_found"; message: string }
  | { kind: "signup_required" }
  | { kind: "limited"; message: string }
  | { kind: "busy"; message: string }
  | { kind: "unavailable" };

const REASONS: Record<string, string> = {
  empty: "Paste something first.",
  not_amazon: "That doesn't look like an ASIN or an amazon.com link.",
  us_only: "Only amazon.com (US) listings are supported for now.",
  short_link: "Short links (a.co, amzn.to) can't be read. Open the link and paste the full amazon.com address.",
  no_asin: "That Amazon link doesn't point at a product. Paste a product page link or its ASIN.",
  brand_store_url:
    "Brand-store links (/stores/…) don't contain the seller ID. Paste one of the brand's product links instead, or the seller ID from the \"Sold by\" link.",
  invalid: "That doesn't look like a seller ID (it starts with A and is 13–14 characters), a storefront link or a product.",
};

const minutes = (sec: number) => Math.max(1, Math.round(sec / 60));

async function run<T>(path: string): Promise<ToolResult<T>> {
  try {
    return { kind: "ok", data: await apiFetch<T>(path) };
  } catch (err) {
    if (!(err instanceof ApiError)) return { kind: "unavailable" };
    const { status, code } = err;
    const body = err.body ?? {};
    if (status === 400) return { kind: "invalid", message: REASONS[String(body.reason)] ?? REASONS.invalid! };
    if (status === 401 && code === "signup_required") return { kind: "signup_required" };
    if (status === 404 && code === "asin_not_found") return { kind: "not_found", message: "Amazon has no product with that ASIN on amazon.com." };
    if (status === 404 && code === "seller_not_found") return { kind: "not_found", message: "No amazon.com seller with that ID." };
    if (status === 404 && code === "no_third_party_seller")
      return { kind: "not_found", message: "Amazon itself holds the buy box on that product (or nobody does), so it has no seller to look up. Try another of the brand's products." };
    if (status === 429 && code === "daily_limit")
      return { kind: "limited", message: "That's today's limit of store lookups on a free account. It resets within 24 hours." };
    if (status === 429) return { kind: "limited", message: `Too many lookups in a row. Try again in ${minutes(Number(body.retryAfterSec) || 600)} min.` };
    if (status === 503 && code === "busy")
      return { kind: "busy", message: `Lots of lookups right now. Try again in about ${minutes(Number(body.retryAfterSec) || 120)} min.` };
    return { kind: "unavailable" };
  }
}

export const lookupProduct = (q: string) =>
  run<ProductSales>(`/v1/tools/product-sales?asin=${encodeURIComponent(q.trim())}`);

export const lookupStore = (q: string) =>
  run<StoreRevenue>(`/v1/tools/store-revenue?seller=${encodeURIComponent(q.trim())}`);

/**
 * Amazon's root category (and a few second-level ones) to the fee engine's
 * referral category id (data/fba-fees-2026.mjs). A starting guess the reader
 * can change: Amazon assigns the referral category per listing and does not
 * publish which one it picked.
 */
const CATEGORY: Array<[RegExp, string]> = [
  [/^toys & games/i, "toys"],
  [/^home & kitchen|kitchen & dining/i, "home-kitchen"],
  [/^health & household|^beauty & personal care/i, "beauty"],
  [/^grocery/i, "grocery"],
  [/^pet supplies/i, "pet"],
  [/^sports & outdoors/i, "sports-outdoors"],
  [/^baby/i, "baby"],
  [/^clothing, shoes & jewelry/i, "clothing"],
  [/^office products/i, "office"],
  [/^tools & home improvement/i, "tools"],
  [/^patio, lawn & garden/i, "lawn-garden"],
  [/^automotive/i, "automotive"],
  [/^cell phones|^electronics.*accessor/i, "electronics-accessories"],
  [/^electronics/i, "consumer-electronics"],
  [/^computers/i, "computers"],
  [/^industrial & scientific/i, "business-industrial"],
  [/^books|^kindle|^movies|^cds|^music/i, "media"],
  [/^musical instruments/i, "musical-instruments"],
  [/^video games/i, "video-games"],
  [/^appliances/i, "full-size-appliances"],
];

export function referralCategoryFor(path: string[]): string {
  for (const name of path) {
    const hit = CATEGORY.find(([re]) => re.test(name));
    if (hit) return hit[1];
  }
  return "everything-else";
}

export const usd0 = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
export const fmtUnits = (n: number) => n.toLocaleString("en-US");
export const readAt = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
