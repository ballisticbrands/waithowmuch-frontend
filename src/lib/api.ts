import { config } from "./config.js";
import { getToken, clearSession } from "./session.js";

export class ApiError extends Error {
  constructor(readonly status: number, readonly code: string) {
    super(`${status} ${code}`);
  }
}

/**
 * The one way this app talks to the backend.
 *
 * Attaches the session bearer when there is one, and clears a session the
 * server has stopped accepting — otherwise an expired JWT leaves the UI
 * showing a signed-in shell whose every request 401s, which reads as the site
 * being broken rather than as being logged out.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${config.apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (res.status === 401 && token) clearSession();

  if (!res.ok) {
    let code = "request_failed";
    try {
      code = ((await res.json()) as { error?: string }).error ?? code;
    } catch {
      /* a non-JSON error body (a proxy 502 page) is not worth failing over */
    }
    throw new ApiError(res.status, code);
  }
  // 204 has no body to parse.
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

// ─── Shapes returned by the API ──────────────────────────────────────

export type ResearchMethod = "RESEARCHED" | "SELF_REPORTED" | "INTERVIEW" | "VERIFIED";

export type CategoryRef = { slug: string; name: string; kind: string };
export type FacetCategory = CategoryRef & { businessCount: number };

export type BusinessCard = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  country: string | null;
  currency: string;
  establishedAt: string | null;
  researchMethod: ResearchMethod;
  confidence: "LOW" | "MEDIUM" | "HIGH" | null;
  latestPeriod: string | null;
  latestMonthlyRevenue: string | null;
  latestMonthlyProfit: string | null;
  latestMarginPct: string | null;
  /** The midpoint of the range below, kept for sorting. Read the figure
   *  through `startingCostFigure` (lib/starting-cost.ts), not directly. */
  startingCost: string | null;
  /** "To start" as an estimated range. Optional until every API the
   *  frontend can meet serves it. */
  startingCostLow?: string | null;
  startingCostHigh?: string | null;
  logoUrl: string | null;
  /** The UGC shot — the product in someone's hand, uploaded to our bucket by
   *  whoever published the profile. Null for profiles published before it was
   *  asked for; the home page falls back to the profile's own product image. */
  ugcImageUrl: string | null;
  publishedAt: string | null;
  /** The case-study headline, seeded from research/<slug>/headline.json after
   *  review. 🚨 The ONLY copy of it: the page, the prerender, the share
   *  preview and the /data/ rows read this and nothing else, and null renders
   *  no headline (a row falls back to `name`). The figure in it is frozen at
   *  the detail's `snapshotMonth`. Optional until every API the frontend can
   *  meet serves it on the list. */
  title?: string | null;
  /** The headline's second half, shown under the title on a /data/ row. */
  subtitle?: string | null;
  /** The month the headline's figures are true of. Dates a home-page card. */
  snapshotMonth?: string | null;
  categories: CategoryRef[];
};

type Range = { low: number; high: number };

/** Prisma Decimal columns arrive as strings. */
type Dec = string | number;

/** The published "to start" estimate — backend StartingCostEstimate, with the
 *  keyword reading that sized it. */
export type StartingCostEstimate = {
  /** Which product this prices — a product-margins tab id ("set", "mat") — or
   *  absent for the business as a whole. */
  product?: string | null;
  low: Dec;
  high: Dec;
  midpoint: Dec;
  competition: "LOW" | "MEDIUM" | "HIGH";
  cpcLow: Dec;
  cpcHigh: Dec;
  cpcSource: string;
  inputs: {
    channel: "amazon" | "shopify";
    sellingPrice: number;
    launchSkus: number;
    moq: number;
    landedUnitCost: Range;
    tooling?: Range;
    niche: { keyword: string; monthlySearches: number; source: string; readAt: string; cpc: Range };
    /** Where the launch keywords' volumes and bids were read (model 2026-10-07 on). */
    launch?: { source: string; readAt: string };
    note?: string;
    /** Per input, where the figure came from — keyed by input name. */
    workings?: Record<string, string>;
    /** The case study's frozen date: the one moment the profile describes.
     *  Absent on estimates priced before it was recorded. */
    asOf?: string;
    /** How the freight half of landedUnitCost was arrived at. `asin` names WHICH
     *  product was measured — a brand may carry several, shipping at different
     *  sizes. `placeholder` means no dimensions were available and a flat figure
     *  stood in. */
    freight?: {
      perUnit: number;
      cbmPerUnit: number;
      usdPerCbm: number;
      lane?: string;
      asin?: string;
      packageMm?: { length: number; width: number; height: number };
      weightG?: number;
      placeholder?: boolean;
    };
    /** The duty half of landedUnitCost, when the margin breakdown carries a
     *  tariff line. Already inside landedUnitCost. */
    duty?: { perUnit: number; basis?: string };
    /** When each input was observed. They do not all equal `asOf` — a source
     *  publishes when it publishes — but each is within 90 days of it. */
    readings?: {
      volumeReadAt?: string;
      volumeObserved?: string;
      bidsReadAt?: string;
      freightReadAt?: string;
      dimensionsReadAt?: string;
    };
  };
  breakdown: {
    parts: { inventory: Range; ads: Range; setup: Range; tooling: Range | null };
    working: {
      monthlySearches: number;
      /** Clicks the launch has to buy, and the share of the keyword they are. */
      clicks?: Range;
      clickShare?: Range;
      launchDays?: Range;
      launchUnits?: Range;
      /** Units the launch is expected to sell per SKU. Before model
       *  2026-10-05 it was floored at the MOQ. */
      unitsPerSku?: Range;
      /** The first order per SKU (Vine units included). Model 2026-10-05 on. */
      firstOrderUnits?: number;
      vineUnits?: number;
    };
    /** The fixed costs before a first sale, each with what prices it. */
    setupItems?: Array<{ label: string; cost: Range; basis: string }>;
    /** Model 2026-10-07 on, when the launch is priced product by product: each
     *  product's first order and its ads, keyword by keyword. */
    products?: Array<{
      id: string;
      label: string;
      sellingPrice: number;
      landedUnitCost: Range;
      units: number;
      inventory: Range;
      ads: Range;
      launchUnits: Range;
      keywords: Array<{
        keyword: string;
        monthlySearches: number;
        organicRank: number | null;
        cpc: Range;
        competition: "LOW" | "MEDIUM" | "HIGH";
        clickShare: Range;
        launchDays: Range;
        clicks: Range;
        /** Searches × click share × cost per click: a month on page one. */
        monthlyCost: Range;
        launchCost: Range;
        launchUnits: Range;
      }>;
    }>;
  };
  modelVersion: string;
  note: string | null;
  publishedAt: string | null;
  keywordReading: {
    keyword: string;
    source: string;
    marketplace: string;
    periodStart: string;
    periodEnd: string;
    rawVolume: number;
    calibrationFactor: Dec | null;
    monthlySearches: number;
    url: string | null;
    readAt: string;
  };
};

export type BusinessLink = {
  platform: string;
  url: string;
  label: string | null;
  handle: string | null;
  /**
   * 🚨 CANONICAL, and that includes followerCount. The backend dropped the
   * `followerCount` column in "Generic metric series; drop summary and
   * followerCount" — every platform-specific fact now lives in this blob.
   */
  meta: Record<string, unknown>;
  /**
   * The dropped column, still sent by a backend that predates that change.
   * Optional because the current API does not send it at all; read it through
   * `linkFollowers` rather than directly, and delete it once no deployment
   * this frontend talks to is older than that migration.
   */
  followerCount?: number | null;
};

/** Read a numeric fact out of a link's untyped meta blob. */
export function linkMetaNumber(link: BusinessLink, key: string): number | null {
  const v = link.meta?.[key];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * The audience on this link.
 *
 * Meta first, because that is where the current API puts it; the legacy
 * top-level column is the fallback so the page still renders a count against
 * a backend that has not taken the migration yet. Reading only one of the two
 * is what left TikTok and Instagram showing a handle where they should have
 * shown an audience — the one fact those chips exist to carry.
 */
export function linkFollowers(link: BusinessLink): number | null {
  const fromMeta = linkMetaNumber(link, "followerCount");
  if (fromMeta != null) return fromMeta;
  const legacy = link.followerCount;
  return typeof legacy === "number" && Number.isFinite(legacy) ? legacy : null;
}

export type BusinessDetail = BusinessCard & {
  startingCostNote: string | null;
  /** The published estimate behind the range, and its keyword reading.
   *  Optional until every API the frontend can meet serves it. */
  startingCostEstimate?: StartingCostEstimate | null;
  /** One live estimate per product, for a brand whose margin breakdown is split
   *  by product. Optional until every API the frontend can meet serves it. */
  productStartingCosts?: StartingCostEstimate[];
  /** The month this profile's story is told as of — the date every stamp on
   *  the page carries (lib/reading.ts). Null for a business with no researched
   *  headline. Optional only until every API the frontend can meet serves it. */
  snapshotMonth?: string | null;
  /** 🚨 `retrievedAt` is first-class, not a footnote. Half of what a researched
   *  profile rests on is a READING taken at a moment — a visit count, a
   *  follower number, a best-seller rank — and one published without the day
   *  it was taken quietly claims to be current forever. */
  sources: Array<{ title: string; url: string; retrievedAt?: string; note?: string }>;
  links: BusinessLink[];
};

/**
 * The span of days a business's sources were read over.
 *
 * Returns both ends rather than one date: sources gathered across a week are
 * honestly described as a window, and collapsing that to the most recent read
 * would claim the oldest figure was still current on the newest day. When
 * every source shares a date — the normal case for one research pass — both
 * ends are equal and the caller prints a single day.
 */
export function sourceWindow(
  sources: BusinessDetail["sources"],
): { from: string; to: string } | null {
  const days = sources.map((s) => s.retrievedAt).filter((d): d is string => !!d).sort();
  return days.length ? { from: days[0]!, to: days[days.length - 1]! } : null;
}

/** One measurement of one thing over one period. */
export type MetricRow = {
  type: string;
  value: string | number;
  meta: Record<string, unknown>;
  periodStart: string;
  periodEnd: string;
  isEstimated: boolean;
};

export type MetricTypeInfo = {
  type: string;
  label: string;
  /** FLOW sums across periods; LEVEL must not be summed. */
  kind: "FLOW" | "LEVEL";
  aggregate: "sum" | "last";
};

export type MetricsResponse = {
  currency: string;
  types: MetricTypeInfo[];
  metrics: MetricRow[];
};

/** A period with the series the chart draws. */
export type ChartPoint = {
  periodStart: string;
  periodEnd: string;
  revenue: number | null;
  profit: number | null;
  isEstimated: boolean;
};

/**
 * Pivot the generic rows into revenue/profit per period.
 *
 * 🚨 Only FLOW types are pivoted here. A LEVEL series (followers, headcount)
 * shares the table but must never be charted on a revenue axis or summed with
 * one — the API declares each type's kind precisely so the client does not
 * have to guess.
 */
export function toChartPoints(res: MetricsResponse | null): ChartPoint[] {
  if (!res) return [];
  const byPeriod = new Map<string, ChartPoint>();
  for (const m of res.metrics) {
    if (m.type !== "revenue" && m.type !== "profit") continue;
    const key = `${m.periodStart}|${m.periodEnd}`;
    const point = byPeriod.get(key) ?? {
      periodStart: m.periodStart, periodEnd: m.periodEnd,
      revenue: null, profit: null, isEstimated: m.isEstimated,
    };
    if (m.type === "revenue") point.revenue = Number(m.value);
    else point.profit = Number(m.value);
    point.isEstimated = point.isEstimated || m.isEstimated;
    byPeriod.set(key, point);
  }
  return [...byPeriod.values()].sort((a, b) => a.periodStart.localeCompare(b.periodStart));
}

/**
 * Read one metric type out of the generic series.
 *
 * 🚨 `toChartPoints` pivots revenue and profit ONLY, so anything else — ad
 * spend, units, followers — has to be read from the rows. Summing is correct
 * for a FLOW type and wrong for a LEVEL one; the caller picks, because only
 * the caller knows which question it is asking.
 */
export function rowsOfType(res: MetricsResponse | null, type: string): MetricRow[] {
  return (res?.metrics ?? [])
    .filter((m) => m.type === type)
    .sort((a, b) => a.periodStart.localeCompare(b.periodStart));
}

/** The most recent value of a type, or null where the series does not carry it. */
export function latestOfType(res: MetricsResponse | null, type: string): number | null {
  const rows = rowsOfType(res, type);
  return rows.length ? Number(rows[rows.length - 1]!.value) : null;
}

export const listBusinesses = (q = "") =>
  apiFetch<{ businesses: BusinessCard[]; total: number; nextCursor: string | null }>(
    `/v1/businesses${q.startsWith("?") || q === "" ? q : `?${q}`}`,
  );

export const getBusiness = (slug: string) =>
  apiFetch<{ business: BusinessDetail }>(`/v1/businesses/${encodeURIComponent(slug)}`);

export const getMetrics = (slug: string, type?: string) =>
  apiFetch<MetricsResponse>(
    `/v1/businesses/${encodeURIComponent(slug)}/metrics${type ? `?type=${encodeURIComponent(type)}` : ""}`,
  );

export const listCategories = () => apiFetch<{ categories: FacetCategory[] }>("/v1/categories");
