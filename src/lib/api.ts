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
  publishedAt: string | null;
  categories: CategoryRef[];
};

export type BusinessLink = {
  platform: string;
  url: string;
  label: string | null;
  handle: string | null;
  followerCount: number | null;
  meta: Record<string, unknown>;
};

export type BusinessDetail = BusinessCard & {
  summary: string | null;
  sources: Array<{ title: string; url: string; note?: string }>;
  links: BusinessLink[];
};

export type MetricPoint = {
  date: string;
  currency: string;
  revenue: number | string | null;
  profit: number | string | null;
  marginPct: number | null;
  adSpend: number | string | null;
  units: number | null;
  orders: number | null;
  isEstimated: boolean;
  derivedFrom: "MONTH" | null;
  days?: number;
};

export const listBusinesses = (q = "") =>
  apiFetch<{ businesses: BusinessCard[]; nextCursor: string | null }>(`/v1/businesses${q}`);

export const getBusiness = (slug: string) =>
  apiFetch<{ business: BusinessDetail }>(`/v1/businesses/${encodeURIComponent(slug)}`);

export const getMetrics = (slug: string, granularity: "day" | "month" = "month") =>
  apiFetch<{ granularity: string; currency: string; metrics: MetricPoint[] }>(
    `/v1/businesses/${encodeURIComponent(slug)}/metrics?granularity=${granularity}`,
  );

export const listCategories = () =>
  apiFetch<{ categories: Array<CategoryRef & { businessCount: number }> }>("/v1/categories");
