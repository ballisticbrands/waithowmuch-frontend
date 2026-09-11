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
  sources: Array<{ title: string; url: string; note?: string }>;
  links: BusinessLink[];
};

/**
 * A business FROZEN at one month — the counterpart to BusinessDetail above.
 *
 * 🚨 Every figure here is stamped, not live. `title` hardcodes a revenue
 * figure ("$90K/Month") because a headline cannot be interpolated and stay
 * readable, and `snapshotMonth` is the only thing that makes that safe: it
 * says which month the sentence is true of, while the BusinessDetail beside it
 * goes on being rewritten by every metric refresh. `valuation` is stamped for
 * the same reason and carries the model `version` that produced it.
 *
 * The API serves PUBLISHED case studies only, so anything arriving here has
 * been read by a human.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date, first of the snapshot month. THE frozen date. */
  snapshotMonth: string;
  /** The figures as they stood at snapshotMonth — a copy, never a join. */
  snapshotFigures: Record<string, unknown>;
  /** The valuation as scored AT snapshotMonth, with its model version. */
  valuation: Record<string, unknown> | null;
  /** Every figure quoted in the copy, with its tier and source. */
  figures: unknown[];
  /** Figures considered and rejected — the assumed plugs. */
  excluded: unknown[];
  researchMethod: ResearchMethod;
  confidence: "LOW" | "MEDIUM" | "HIGH" | null;
  sources: Array<{ title: string; url: string; retrievedAt?: string; note?: string }>;
  writtenAt: string;
  publishedAt: string | null;
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

/**
 * The case studies for one business, newest freeze first.
 *
 * A list because a business accumulates them — the 2026 snapshot and the 2028
 * one both stay. Callers wanting "the current one" take the first.
 */
export const getCaseStudies = (slug: string) =>
  apiFetch<{ caseStudies: CaseStudy[] }>(
    `/v1/businesses/${encodeURIComponent(slug)}/case-studies`,
  );

export const listCategories = () => apiFetch<{ categories: FacetCategory[] }>("/v1/categories");
