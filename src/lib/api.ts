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
  startingCost: string | null;
  logoUrl: string | null;
  publishedAt: string | null;
  categories: CategoryRef[];
};

export type BusinessLink = {
  platform: string;
  url: string;
  label: string | null;
  handle: string | null;
  /** Every platform-specific fact — followerCount, posts, likes — lives here. */
  meta: Record<string, unknown>;
};

/** Read a numeric fact out of a link's untyped meta blob. */
export function linkMetaNumber(link: BusinessLink, key: string): number | null {
  const v = link.meta?.[key];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export type BusinessDetail = BusinessCard & {
  startingCostNote: string | null;
  sources: Array<{ title: string; url: string; note?: string }>;
  links: BusinessLink[];
};

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
