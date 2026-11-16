export type BrandTabId =
  | "analytics" | "products" | "revenue" | "margin" | "ads" | "deals" | "keywords"
  | "socials" | "niche" | "similar" | "owner" | "health" | "reviews" | "valuation" | "validate";

export const TABS: Array<{ id: BrandTabId; label: string; group: string | null }>;
export const TAB_IDS: BrandTabId[];
export const TAB_LABEL: Record<BrandTabId, string>;
export const STANDARD_TABS: BrandTabId[];
export const PAGE_TABS: Record<string, BrandTabId[]>;
export function shownTabs(slug: string): BrandTabId[];
export function showsCaseStudyLink(slug: string): boolean;
export const SOCIALS_TAB_PLATFORMS: string[];
