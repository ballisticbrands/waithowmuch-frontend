/**
 * The brand page's tabs (/business/<slug>/) — the one list of every section
 * that exists, and which brands show which. Plain .mjs so both the page
 * (pages/Business2.tsx) and `node scripts/brand-tabs.mjs <slug>` read it.
 *
 * Whether a tab actually shows for a brand is decided at render: it must be
 * on the brand's list below AND have its data (see `scripts/brand-tabs.mjs`,
 * which prints both for any brand).
 */

/** Every tab, in menu order. `group` is the menu heading it sits under. */
export const TABS = [
  { id: "analytics", label: "Overview", group: null },
  { id: "products", label: "Products", group: null },
  { id: "revenue", label: "Revenue", group: "Financials" },
  { id: "margin", label: "Margin breakdown", group: "Financials" },
  { id: "ads", label: "Amazon Ads", group: "Advertising" },
  { id: "deals", label: "Deals & coupons", group: "Advertising" },
  { id: "keywords", label: "Keywords", group: "Advertising" },
  { id: "socials", label: "Socials & traffic", group: "Audience" },
  { id: "niche", label: "Niche trend", group: "Market" },
  { id: "similar", label: "Similar Brands", group: "Market" },
  { id: "owner", label: "Brand owner", group: "Brand" },
  { id: "health", label: "Store health", group: "Brand" },
  { id: "reviews", label: "Ratings & reviews", group: "Brand" },
  { id: "valuation", label: "Valuation", group: "Brand" },
  { id: "validate", label: "Validate your idea", group: "Build your own" },
];

export const TAB_IDS = TABS.map((t) => t.id);
export const TAB_LABEL = Object.fromEntries(TABS.map((t) => [t.id, t.label]));

/** The page's standard set of tabs (owner, 2026-11-15). Every other tab —
 *  Deals & coupons, Similar Brands, Valuation — is SHELVED, not deleted: its
 *  data files, profile sections and components all stay, and adding its id
 *  back here brings it back. A shelved tab is left out of the menu, a link to
 *  it (?tab=valuation) opens the Overview, and the Overview's similar-brands
 *  strip goes with the Similar Brands tab. */
export const STANDARD_TABS = [
  "analytics", "products", "revenue", "margin", "ads", "keywords",
  "socials", "niche", "owner", "health", "reviews", "validate",
];

/** Brands on the standard set. A brand listed here shows only these tabs (a
 *  tab still drops out when its data is missing) and no "Full case study"
 *  link; a brand not listed keeps every tab and the link. Spite House first
 *  (the pilot), then each brand as it is rebuilt. */
export const PAGE_TABS = {
  "spite-house-games": STANDARD_TABS,
};

export const shownTabs = (slug) => PAGE_TABS[slug] ?? TAB_IDS;
export const showsCaseStudyLink = (slug) => !(slug in PAGE_TABS);

/** Link platforms that give a brand the Socials & traffic tab. */
export const SOCIALS_TAB_PLATFORMS = ["TIKTOK", "INSTAGRAM", "YOUTUBE", "FACEBOOK", "X", "PINTEREST", "LINKEDIN", "REDDIT", "WEBSITE"];
