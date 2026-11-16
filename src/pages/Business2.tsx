import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  getBusiness, getMetrics, listBusinesses, linkFollowers, linkMetaNumber, rowsOfType, toChartPoints,
  type BusinessCard, type BusinessDetail, type BusinessLink, type ListingDetail, type ListingRank, type MetricsResponse,
} from "@/lib/api";
import { profileFor } from "@/businesses/index.mjs";
import { TAB_IDS, TAB_LABEL, shownTabs, showsCaseStudyLink, SOCIALS_TAB_PLATFORMS, type BrandTabId } from "@/businesses/brand-tabs.mjs";
import { localBusiness } from "@/businesses/local.mjs";
import { businessBootstrap } from "@/lib/bootstrap";
import type { Block, Fact, Profile } from "@/businesses/types";
import { PlatformIcon, platformLabel } from "@/components/PlatformIcon";
import { EarningsCard } from "@/components/Earnings";
import { InfoTip } from "@/components/InfoTip";
import { METRIC_INFO } from "@/data/metric-info";
import { ProfileBlocks } from "@/components/ProfileBlocks";
import { SalesBreakdown } from "@/components/SalesBreakdown";
import { ValidationLaunch, ValidationStrategy } from "@/components/ValidationLaunch";
import { derivedFacts } from "@/components/MetricCards";
import { ProductFilterBar, matches, type FilterRow, type ProductFilterState } from "@/components/ProductFilters";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { collectionPath, BRAND_NAME_SAFE } from "@/lib/nav-helpers";
import { trackBusinessView } from "@/lib/track";
import { startingCostFigure, startingCostRange, FIXED_COSTS_NOTE } from "@/lib/starting-cost";
import { ageLabel, compact, dayLabel, exactMoney, money, monthLabel, percent, price } from "@/lib/format";

/**
 * /business/:slug — the brand page, drawn as a research dashboard: an
 * identity header with a row of facts, a left sub-menu, metric cards that
 * switch between series, a Q4 overlay, a product library, an ad library.
 *
 * The previous long-form case study (pages/Business.tsx) stays at
 * /business2/:slug. Both read exactly the same sources — the API's Business
 * row and metric series, the authored profile's breakdown, timeline and facts,
 * the generated <slug>.adspend.mjs — and this page authors no figure of its
 * own, so the two cannot disagree.
 */

type AdSpendModule = {
  AD_SPEND?: {
    month: string;
    strategy: string;
    monthlyUsd: { low: number; central: number; high: number };
    ratePct: { low: number; central: number; high: number };
  };
  /** keyword, searches, organic rank, ad position, bid, modelled spend. */
  TOP_KEYWORDS?: string[][];
  /** keyword, product, searches, share of ads, cpc, modelled spend. */
  AD_KEYWORDS?: string[][];
  AD_KEYWORDS_TOTAL?: number;
};

const AD_MODULES = import.meta.glob("../businesses/*.adspend.mjs", { eager: true }) as Record<string, AdSpendModule>;

/** research niche-trend.mjs output — see src/businesses/<slug>.niche.mjs. */
type Niche = {
  name: string;
  readAt: string;
  months: string[];
  sources: { amazon: string; google: string; sales: string };
  keywords: Array<{ keyword: string; monthly: Array<[string, number]> }>;
  demand: Array<[string, number]>;
  partial: string[];
  google: Array<[string, number]>;
  sales: { category: { id: string; name: string }; products: number; monthly: Array<[string, number]> };
};
const NICHE_MODULES = import.meta.glob("../businesses/*.niche.mjs", { eager: true }) as Record<string, { NICHE?: Niche }>;
/** research store-health.mjs output — see src/businesses/<slug>.health.mjs. */
type Health = {
  readAt: string;
  listings: number;
  fbaPct: number | null;
  fbaRevenuePct: number | null;
  fbaListings: number;
  /** Listings the Buy Box / FBA figures rest on, and those checked abroad (absent on older reads: all). */
  buyBoxListings?: number;
  marketsChecked?: number;
  avgPrice: number | null;
  totalReviews: number | null;
  buyBoxWinPct: number | null;
  amazonInStockPct: number | null;
  avgSellers: number | null;
  sellers: Array<{ id: string; name: string | null; country: string | null; buyBoxSharePct: number | null; listings: number; fbaListings: number }>;
  marketplaces: Array<{ code: string; host: string; listed: number; monthlyUnits: number; bestRank: number | null; status: "selling" | "ranked" | "listed" }>;
};
const HEALTH_MODULES = import.meta.glob("../businesses/*.health.mjs", { eager: true }) as Record<string, { HEALTH?: Health }>;
const healthFor = (slug: string): Health | null => HEALTH_MODULES[`../businesses/${slug}.health.mjs`]?.HEALTH ?? null;
/** research promotions.mjs output — see src/businesses/<slug>.promotions.mjs. */
type Promotions = {
  readAt: string;
  listings: Array<{
    asin: string;
    name: string;
    revenue: number;
    now: {
      coupon: string | null;
      subscribeAndSaveCoupon: string | null;
      primeExclusive: boolean;
      listPriceSaving: { pct: number; basis: string | null; was: number | null } | null;
      lightningDeal: boolean;
    };
    usualPrice: number | null;
    lowestPrice: number | null;
    lowestAt: string | null;
    discountedPct: number | null;
    deepestPct: number | null;
    stretches: Array<[string, string]>;
    lightningDealDays: string[];
    weekly: Array<[string, number | null]>;
  }>;
};
const PROMO_MODULES = import.meta.glob("../businesses/*.promotions.mjs", { eager: true }) as Record<string, { PROMOTIONS?: Promotions }>;
const promotionsFor = (slug: string): Promotions | null => PROMO_MODULES[`../businesses/${slug}.promotions.mjs`]?.PROMOTIONS ?? null;
/** What is running on a listing right now, by ASIN, across every brand. */
const PROMO_NOW = new Map(
  Object.values(PROMO_MODULES).flatMap((m) => (m.PROMOTIONS?.listings ?? []).map((l) => [l.asin, l.now] as const)),
);
const promoLabel = (n: Promotions["listings"][number]["now"] | undefined) =>
  !n ? null : n.coupon ? `Coupon ${n.coupon}` : n.primeExclusive ? "Prime deal" : n.lightningDeal ? "Lightning deal" : n.listPriceSaving ? `−${n.listPriceSaving.pct}%` : null;
/** research subcategory-share.mjs output — see src/businesses/<slug>.subcategories.mjs. */
type Subcategories = {
  readAt: string;
  top: number;
  categories: Array<{
    id: string;
    name: string;
    products: number;
    topRevenue: number;
    brands: number;
    share: { pct: number; thenPct: number | null; rank: number; products: number; monthlyRevenue: number } | null;
    leaders: Array<{ brand: string; own: boolean; products: number; monthlyRevenue: number; sharePct: number; shareThenPct: number | null }>;
  }>;
};
const SUBCAT_MODULES = import.meta.glob("../businesses/*.subcategories.mjs", { eager: true }) as Record<string, { SUBCATEGORIES?: Subcategories }>;
const subcategoriesFor = (slug: string): Subcategories | null => SUBCAT_MODULES[`../businesses/${slug}.subcategories.mjs`]?.SUBCATEGORIES ?? null;
/** research listing-signals.mjs output — see src/businesses/<slug>.signals.mjs. */
type Signals = {
  readAt: string;
  brand: { change30Pct: number | null; soldNow: number; soldMonthAgo: number; inStock90Pct: number | null; inStock30Pct: number | null; listingsWithStockouts90: number };
  listings: Array<{
    asin: string;
    momentum: { soldNow: number | null; soldMonthAgo: number | null; change30Pct: number | null; change90Pct: number | null };
    inStock90Pct: number | null;
    inStock30Pct: number | null;
    listing: { images: number; videos: number; brandVideos: number; aPlusModules: number; bullets: number; titleLength: number; brandStore: boolean };
  }>;
};
const SIGNAL_MODULES = import.meta.glob("../businesses/*.signals.mjs", { eager: true }) as Record<string, { SIGNALS?: Signals }>;
const signalsFor = (slug: string): Signals | null => SIGNAL_MODULES[`../businesses/${slug}.signals.mjs`]?.SIGNALS ?? null;
const SIGNAL_BY_ASIN = new Map(Object.values(SIGNAL_MODULES).flatMap((m) => (m.SIGNALS?.listings ?? []).map((l) => [l.asin, l] as const)));
/** A listing's momentum: the 30-day change when the sold badge moved, else
 *  Keepa's change against the 90-day average — badges move in steps, so a
 *  flat 30 days is common. */
function momentumOf(asin?: string): { pct: number; basis: "30d" | "90d" } | null {
  const m = asin ? SIGNAL_BY_ASIN.get(asin)?.momentum : undefined;
  if (!m) return null;
  if (m.change30Pct !== null && m.change30Pct !== 0) return { pct: m.change30Pct, basis: "30d" };
  if (m.change90Pct !== null) return { pct: m.change90Pct, basis: "90d" };
  return m.change30Pct === 0 ? { pct: 0, basis: "30d" } : null;
}
function MomentumChip({ asin }: { asin?: string }) {
  const m = momentumOf(asin);
  if (!m || m.pct === 0) return null;
  const up = m.pct > 0;
  return (
    <span
      title={m.basis === "30d" ? "Sold badge now against 30 days ago" : "Sold badge now against its 90-day average"}
      className={`inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-semibold ${up ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"}`}
    >
      {up ? "▲" : "▼"} {up ? "+" : ""}{m.pct}% {m.basis === "30d" ? "this month" : "vs 90-day avg"}
    </span>
  );
}
/** research brand-capture.mjs output — see src/businesses/<slug>.capture.mjs. */
type Capture = {
  readAt: string;
  capturePct: number | null;
  poachers: string[];
  keywords: Array<{
    keyword: string;
    searches: number | null;
    listings: number | null;
    own: {
      combinedPct: number | null; organicPct: number | null; sponsoredPct: number | null;
      listings: number; organicListings: number; sponsoredListings: number; listingsPct: number | null;
    };
    others: Array<{ brand: string; combinedPct: number | null; organicPct: number | null; sponsoredPct: number | null; how: "organic" | "ads" | "both" }>;
  }>;
};
const CAPTURE_MODULES = import.meta.glob("../businesses/*.capture.mjs", { eager: true }) as Record<string, { CAPTURE?: Capture }>;
const captureFor = (slug: string): Capture | null => CAPTURE_MODULES[`../businesses/${slug}.capture.mjs`]?.CAPTURE ?? null;
type Milestone = { days: number; on: string };
/** Amazon taking a listing's ratings back to zero — a relisting, or ratings moved elsewhere. */
type Reset = { on: string; countBefore: number; ratingBefore: number | null };
/** research review-history.mjs output — see src/businesses/<slug>.reviews.mjs. */
type Reviews = {
  readAt: string;
  brand: {
    reviewsNow: number; perMonth90: number; gained12: number;
    ratingNow: number | null; ratingYearAgo: number | null; reviewsYearAgo: number;
    months: Array<{ month: string; gained: number | null }>;
    ratingByMonth: Array<{ month: string; rating: number | null }>;
    resets: Array<Reset & { asin: string }>;
    per100Sold: number | null;
  };
  listings: Array<{
    asin: string; reviewsNow: number | null; perMonth90: number | null;
    perMonth: Array<{ month: string; gained: number | null }>;
    ratingNow: number | null; rating90Ago: number | null; ratingYearAgo: number | null;
    count90Ago: number | null; countYearAgo: number | null;
    per100Sold: number | null;
    milestones: { first: string | null; 10: Milestone | null; 50: Milestone | null; 100: Milestone | null; afterReset?: string };
    resets: Reset[];
    shared: Array<[string, string]>;
  }>;
};
/** The short case-study summary (write-case-summary → <slug>.summary.mjs),
 *  shown as "In short" on the Overview. Generated from research/<folder>/summary.md. */
type Summary = { source: string; groups: Array<{ heading: string; points: string[] }> };
const SUMMARY_MODULES = import.meta.glob("../businesses/*.summary.mjs", { eager: true }) as Record<string, { SUMMARY?: Summary }>;
const summaryFor = (slug: string): Summary | null => SUMMARY_MODULES[`../businesses/${slug}.summary.mjs`]?.SUMMARY ?? null;

/** Amazon's "Customers say" summary per listing (Rainforest, 2 credits a
 *  listing) — <slug>.customers-say.mjs. PREVIEW on Spite House. */
type CustomersSay = {
  source: string;
  listings: Array<{ asin: string; readAt: string; rating: number; ratingsTotal: number; summary: string | null; themes: Array<{ name: string; mentions: number | null; sentiment: string }> }>;
};
const SAY_MODULES = import.meta.glob("../businesses/*.customers-say.mjs", { eager: true }) as Record<string, { CUSTOMERS_SAY?: CustomersSay }>;
const customersSayFor = (slug: string): CustomersSay | null => SAY_MODULES[`../businesses/${slug}.customers-say.mjs`]?.CUSTOMERS_SAY ?? null;

const REVIEW_MODULES = import.meta.glob("../businesses/*.reviews.mjs", { eager: true }) as Record<string, { REVIEWS?: Reviews }>;
const reviewsFor = (slug: string): Reviews | null => REVIEW_MODULES[`../businesses/${slug}.reviews.mjs`]?.REVIEWS ?? null;
const REVIEW_BY_ASIN = new Map(Object.values(REVIEW_MODULES).flatMap((m) => (m.REVIEWS?.listings ?? []).map((l) => [l.asin, l] as const)));
const nicheFor = (slug: string): Niche | null => NICHE_MODULES[`../businesses/${slug}.niche.mjs`]?.NICHE ?? null;
const adSpendFor = (slug: string): AdSpendModule | null =>
  AD_MODULES[`../businesses/${slug}.adspend.mjs`] ?? null;

type Product = Extract<Block, { type: "breakdown" }>["items"][number] & { bsr?: Bsr; marketplace?: string; detail?: ListingDetail };

/** A listing's latest ranks, off ListingRank: the root one the sort uses and
 *  the best subcategory one, plus how many listings on the page share them. */
type Bsr = { root: ListingRank | null; sub: ListingRank | null; sharedBy: number };

function withRanks(products: Product[], ranks: ListingRank[] | undefined): Product[] {
  if (!ranks?.length) return products;
  const parentOf = new Map(ranks.map((r) => [r.asin, r.parentAsin]));
  return products.map((p) => {
    if (!p.asin) return p;
    const mine = ranks.filter((r) => r.asin === p.asin);
    if (mine.length === 0) return p;
    const parent = parentOf.get(p.asin);
    const sharedBy = parent ? products.filter((q) => q.asin && parentOf.get(q.asin) === parent).length : 1;
    return {
      ...p,
      bsr: {
        root: mine.find((r) => r.isRoot) ?? null,
        sub: mine.filter((r) => !r.isRoot).sort((a, b) => a.rank - b.rank)[0] ?? null,
        sharedBy,
      },
    };
  });
}

/** Each product's latest reviews / Subscribe & Save reading, by ASIN. */
function withDetails(products: Product[], details: ListingDetail[] | undefined): Product[] {
  if (!details?.length) return products;
  const byAsin = new Map(details.map((d) => [d.asin, d]));
  return products.map((p) => (p.asin && byAsin.has(p.asin) ? { ...p, detail: byAsin.get(p.asin) } : p));
}

/** Every block of one type, including those nested in product tabs. */
function blocksOfType<T extends Block["type"]>(blocks: Block[], type: T): Extract<Block, { type: T }>[] {
  const out: Block[] = [];
  const walk = (bs: Block[]) => {
    for (const b of bs) {
      if (b.type === type) out.push(b);
      if (b.type === "product-margins" || b.type === "product-tabs") b.products.forEach((p) => walk(p.blocks));
    }
  };
  walk(blocks);
  return out as Extract<Block, { type: T }>[];
}

const flag = (country: string | null) =>
  country && country.length === 2
    ? String.fromCodePoint(...[...country.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)))
    : "";

const num = (s: string) => Number(s.replace(/[^0-9.]/g, "")) || 0;

const SOCIAL = ["TIKTOK", "INSTAGRAM", "FACEBOOK", "YOUTUBE", "X", "TWITTER", "PINTEREST"];

/* Every tab, the standard set and which brands are on it live in
   businesses/brand-tabs.mjs, shared with `node scripts/brand-tabs.mjs`. */
type TabId = BrandTabId;

/** The id of the profile section holding a block of one of these types — the
 *  case study's own section, rendered here whole rather than copied. */
function sectionHolding(profile: Profile | undefined, types: Block["type"][]): string | null {
  let current: string | null = null;
  for (const b of profile?.blocks ?? []) {
    if (b.type === "section") current = b.id;
    if (current && types.includes(b.type)) return current;
  }
  return null;
}

/** The profile without its narrative: no lede, prose or callouts, no
 *  footnotes under the tables (the attribution badge already says where the
 *  numbers come from), and the margin lines in their short form. Prototype only —
 *  the case study keeps the full text. */
type MarginLine = Extract<Block, { type: "margin" }>["lines"][number];

/**
 * A margin line in its short form. The profile's own `short` wins; otherwise
 * the three lines every profile words the same way are cut by rule — the
 * referral fee to its category and rate, fulfilment to its size tier, and
 * advertising to its modelled monthly figure with one link to the Ads tab.
 * Anything that does not match is left as written.
 */
function shortLine(l: MarginLine, slug: string): MarginLine {
  if (l.short) return { ...l, detail: l.short.detail, links: l.short.links ?? l.links, bold: l.short.bold };
  const d = l.detail ?? "";
  const referral = d.match(/published (.+?) rate, a flat (\d+(?:\.\d+)?%)/i);
  if (referral) return { ...l, detail: `${referral[1]}: ${referral[2]}` };
  const tier = d.match(/^Size tier: ([^.,;]+)/i);
  if (tier) return { ...l, detail: `Size tier: ${tier[1]}.`, bold: tier[1] };
  const ads = d.match(/^modelled, not observed: about (\$[\d,.]+K?) a month/i);
  if (ads)
    return {
      ...l,
      detail: `Modelled, not observed: about ${ads[1]} a month.`,
      links: [{ label: "See the ad spend in depth", href: `/business/${encodeURIComponent(slug)}/?tab=ads` }],
    };
  // Worded another way, an advertising line still says what it is and its share.
  if (/^advertising/i.test(l.label) && /^modelled/i.test(d))
    return {
      ...l,
      detail: `Modelled, not observed: ${+Math.abs(l.pct).toFixed(2)}% of revenue.`,
      links: [{ label: "See the ad spend in depth", href: `/business/${encodeURIComponent(slug)}/?tab=ads` }],
    };
  return l;
}

function withoutNarrative(profile: Profile, slug: string): Profile {
  const lean = (blocks: Block[]): Block[] =>
    blocks
      .filter((b) => b.type !== "lede" && b.type !== "prose" && b.type !== "callout")
      .map((b) => {
        if (b.type === "table") return { ...b, note: undefined };
        /* Each line's one-liner where the profile has one, and no caveat
           paragraph under the margin row. */
        if (b.type === "margin")
          return {
            ...b,
            note: undefined,
            lines: b.lines.map((l) => shortLine(l, slug)),
          };
        if (b.type === "product-margins") return { ...b, products: b.products.map((p) => ({ ...p, blocks: lean(p.blocks) })) };
        if (b.type === "product-tabs") return { ...b, products: b.products.map((p) => ({ ...p, blocks: lean(p.blocks) })) };
        return b;
      });
  return { ...profile, blocks: lean(profile.blocks) };
}

/** The similar-brands list, fetched once for the overview carousel and the tab. */
function useSimilar(b: BusinessDetail | null): BusinessCard[] | null {
  const [rows, setRows] = useState<BusinessCard[] | null>(null);
  useEffect(() => {
    if (!b) return;
    let cancelled = false;
    setRows(null);
    const niches = b.categories.filter((c) => c.kind === "NICHE").map((c) => c.slug);
    const own = niches.length ? listBusinesses(`niche=${niches.join(",")}`) : Promise.resolve({ businesses: [] as BusinessCard[] });
    own
      .then(async (r) => {
        let list = r.businesses.filter((x) => x.slug !== b.slug);
        // A niche of one: fall back to the rest of the database rather than an empty list.
        if (list.length < 3) list = [...list, ...(await listBusinesses()).businesses.filter((x) => x.slug !== b.slug && !list.some((y) => y.slug === x.slug))];
        if (!cancelled) setRows(list.slice(0, 12));
      })
      .catch(() => !cancelled && setRows([]));
    return () => { cancelled = true; };
  }, [b]);
  return rows;
}

/** The old case study's section pages, as tabs of this one — so every
 *  /business/<slug>/<section>/ link already out there (posts, the sitemap,
 *  search results) lands on the same content here. */
const SECTION_TAB: Record<string, TabId> = {
  timeline: "analytics", growth: "analytics", traffic: "socials", sources: "analytics", links: "analytics",
  revenue: "revenue", "how-it-sells": "revenue",
  margin: "margin",
  advertising: "ads",
  "brand-owner": "owner",
  valuation: "valuation",
  "to-start": "validate",
};

export default function Business2Route() {
  const { slug = "", section } = useParams();
  const [params] = useSearchParams();
  if (section) {
    const next = new URLSearchParams(params);
    if (!next.has("tab")) next.set("tab", SECTION_TAB[section] ?? "analytics");
    return <Navigate to={`/business/${encodeURIComponent(slug)}/?${next}${window.location.hash}`} replace />;
  }
  return <Business2 />;
}

function Business2() {
  const { slug = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const tab = (shownTabs(slug).find((t) => t === params.get("tab")) ?? "analytics") as TabId;
  /* A new tab starts at the top, whether it came from the side menu or from a
     link inside a section ("See the ad spend in depth"). The first render is
     left alone so a reload keeps the browser's own scroll restore. */
  const firstTab = useRef(true);
  useEffect(() => {
    if (firstTab.current) {
      firstTab.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
  }, [tab]);
  const setTab = (id: TabId) => {
    setParams(id === "analytics" ? {} : { tab: id }, { replace: true });
    window.scrollTo({ top: 0 });
  };

  /* A frontend-only draft (businesses/local.mjs) is the whole source of truth
     for its page; a prerendered bootstrap saves the first fetch. Same order as
     the case study. */
  const local = localBusiness(slug);
  const boot = businessBootstrap(slug);
  const [b, setB] = useState<BusinessDetail | null>(local?.business ?? boot?.business ?? null);
  const [series, setSeries] = useState<MetricsResponse | null>(local?.metrics ?? boot?.metrics ?? null);
  const [missing, setMissing] = useState(false);
  const [q4, setQ4] = useState(false);

  useEffect(() => {
    const draft = localBusiness(slug);
    setMissing(false);
    if (draft) {
      setB(draft.business);
      setSeries(draft.metrics);
      return;
    }
    const pre = businessBootstrap(slug);
    if (pre) {
      setB(pre.business);
      setSeries(pre.metrics ?? null);
      return;
    }
    let cancelled = false;
    setB(null);
    setSeries(null);
    getBusiness(slug).then((r) => !cancelled && setB(r.business)).catch(() => !cancelled && setMissing(true));
    getMetrics(slug).then((r) => !cancelled && setSeries(r)).catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (b) document.title = `${b.name} — ${BRAND_NAME_SAFE}`;
  }, [b]);

  // The profile view event — the same one `Business.tsx` fires, which this page
  // never did, so GA4 `view_business`, Meta `ViewContent` and Reddit
  // `ViewContent` were all silently absent on every brand on this page
  // (Spite House, Virora, White Mountain) from the day it shipped.
  //
  // Once per slug, and only after the business has resolved, so the event
  // carries its name. 🚨 `b.slug !== slug` matters here: the fetch effect above
  // resets `b` to null, but only AFTER the render in which a client-side
  // navigation has already changed `slug` — without the check this fires for
  // the new slug with the PREVIOUS brand's name.
  const viewFired = useRef<string | null>(null);
  useEffect(() => {
    if (!slug || viewFired.current === slug) return;
    if (!b && !missing) return;
    if (b && b.slug !== slug) return;
    viewFired.current = slug;
    if (b) trackBusinessView(slug, b.name);
  }, [slug, b, missing]);

  useSetCrumbs(
    () => [
      { label: "Brands", to: collectionPath("all-ideas") },
      { label: b?.name ?? (missing ? "Not found" : "…") },
    ],
    [b?.name, missing],
  );

  const profile = profileFor(slug);
  const products = useMemo<Product[]>(
    () =>
      withDetails(
        withRanks(
          profile ? blocksOfType(profile.blocks, "breakdown").flatMap((x) => x.items.map((i) => ({ ...i, marketplace: x.marketplace ?? "amazon.com" }))) : [],
          b?.listingRanks,
        ),
        b?.listingDetails,
      ),
    [profile, b?.listingRanks, b?.listingDetails],
  );
  const facts: Fact[] = profile?.facts ?? [];
  const ads = adSpendFor(slug);
  const niche = nicheFor(slug);
  const health = healthFor(slug);
  const reviews = reviewsFor(slug);
  const promotions = promotionsFor(slug);
  const similar = useSimilar(b);
  const q4Year = useMemo(() => latestQ4Year(series), [series]);
  const [navCollapsed, toggleNav] = useNavCollapsed();
  const marginSection = sectionHolding(profile, ["margin", "product-margins"]);
  const valuationSection = sectionHolding(profile, ["valuation", "valuation-board"]);
  // Matched on the section id: its blocks (facts, prose) are generic types.
  const ownerSection = profile?.blocks.some((x) => x.type === "section" && x.id === "brand-owner") ? "brand-owner" : null;
  const breakdown = profile ? blocksOfType(profile.blocks, "breakdown")[0] : undefined;

  if (missing) {
    return (
      <main data-main>
        <div data-empty>
          <p>No published brand at <code>{slug}</code>.</p>
          <p style={{ marginTop: "1rem" }}><Link to={collectionPath("all-ideas")}>All brands →</Link></p>
        </div>
      </main>
    );
  }
  if (!b) return <main data-main><div data-empty>Loading…</div></main>;

  const counts: Partial<Record<TabId, number>> = {
    products: products.length,
    ads: ads?.AD_KEYWORDS?.length,
    keywords: ads?.TOP_KEYWORDS?.length,
    similar: similar?.length,
  };
  const shade = q4 && q4Year !== null ? q4Year : null;
  const hiddenTabs = new Set<TabId>(
    ([
      [!marginSection, "margin"],
      [!niche, "niche"],
      [!health, "health"],
      [!reviews, "reviews"],
      [!promotions, "deals"],
      [!b.links.some((l) => SOCIALS_TAB_PLATFORMS.includes(l.platform)) && !sectionBlocks(profile, "traffic").length, "socials"],
      [!ads?.AD_SPEND, "ads"],
      [!ads?.TOP_KEYWORDS?.length, "keywords"],
      [!ownerSection, "owner"],
      [!valuationSection, "valuation"],
      [!b.startingCostEstimate?.breakdown?.validation, "validate"],
      ...TAB_IDS.map((id): [boolean, TabId] => [!shownTabs(slug).includes(id), id]),
    ] as Array<[boolean, TabId]>).flatMap(([gone, id]) => (gone ? [id] : [])),
  );

  return (
    /* Full width, like TrendTrack: a thin edge instead of the site's 2rem
       gutters, and no max width on the frame. */
    <main data-main style={{ padding: "0.75rem 0.75rem 2rem" }}>
      <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--card)] shadow-[var(--shadow)]">
        <Header b={b} />
        <FactRow b={b} facts={facts} more={[...derivedFacts({ business: b, metrics: toChartPoints(series), series, profile }), ...facts]} />

        <div className={`lg:grid ${navCollapsed ? "lg:grid-cols-[64px_minmax(0,1fr)]" : "lg:grid-cols-[240px_minmax(0,1fr)]"}`}>
          <SideNav tab={tab} onTab={setTab} counts={counts} slug={slug} collapsed={navCollapsed} onToggle={toggleNav} hidden={hiddenTabs} />

          <div className="min-w-0 space-y-5 bg-[var(--surface)] p-4 sm:p-6">
            {(tab === "analytics" || tab === "ads") && q4Year !== null && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[color:var(--muted-foreground)]">{flag(b.country)} amazon.com · monthly · estimated</span>
                <Toggle on={q4} onChange={setQ4} label={`Q4 ${q4Year} overlay`} />
              </div>
            )}
            {tab === "analytics" && (
              <Analytics b={b} series={series} products={products} similar={similar} showSimilar={!hiddenTabs.has("similar")} shade={shade} onTab={setTab} profile={profile} />
            )}
            {tab === "products" && (
              <>
                <ProductLibrary products={products} currency={b.currency} />
                <CatalogGrowth products={products} currency={b.currency} />
              </>
            )}
            {tab === "revenue" && (
              <>
                <div className="[&>[data-earnings]]:m-0">
                  <EarningsCard points={toChartPoints(series)} currency={b.currency} id="earnings" />
                </div>
                {/* The case study's own revenue-by-product block, unchanged:
                    the brand's first breakdown, the one the products tab lists. */}
                {breakdown && (
                  <div className="[&>*]:m-0">
                    <SalesBreakdown block={{ ...breakdown, intro: undefined, note: undefined }} currency={b.currency} showShare showSummary={false} maxRows={25} />
                  </div>
                )}
              </>
            )}
            {tab === "margin" &&
              (profile && marginSection ? (
                <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-6">
                  <ProfileBlocks profile={withoutNarrative(profile, slug)} business={b} metrics={toChartPoints(series)} series={series} only={marginSection} />
                </section>
              ) : (
                <div data-empty>No margin breakdown published for this brand yet.</div>
              ))}
            {/* The case study's own sections, rendered whole — same blocks, same text. */}
            {(tab === "owner" || tab === "valuation") &&
              (() => {
                const id = tab === "owner" ? ownerSection : valuationSection;
                return profile && id ? (
                  <>
                    <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-6">
                      <ProfileBlocks profile={profile} business={b} metrics={toChartPoints(series)} series={series} only={id} />
                    </section>
                    {tab === "owner" && health && <SellersCard health={health} />}
                  </>
                ) : (
                  <div data-empty>{tab === "owner" ? "No brand owner section published for this brand yet." : "No valuation published for this brand yet."}</div>
                );
              })()}
            {tab === "validate" &&
              (b.startingCostEstimate?.breakdown?.validation ? (
                <section className="space-y-4 rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-6">
                  <h2 className="m-0 text-xl font-bold">Validate your idea</h2>
                  {/* The case study's test, compact: same figures and tables, far fewer words. */}
                  <div className="[&>*]:mt-0">
                    <ValidationStrategy business={b} compact />
                  </div>
                  <ValidationLaunch business={b} compact landedHref={`/business/${encodeURIComponent(slug)}/?tab=margin`} />
                </section>
              ) : (
                <div data-empty>No validation test published for this brand yet.</div>
              ))}
            {tab === "deals" && promotions && <Deals promo={promotions} currency={b.currency} />}
            {tab === "health" && health && <StoreHealth health={health} currency={b.currency} signals={signalsFor(slug)} reviews={reviews} products={products} />}
            {tab === "reviews" && reviews && <RatingsReviews reviews={reviews} products={products} say={customersSayFor(slug)} />}
            {tab === "niche" && niche && <NicheTrend niche={niche} series={series} currency={b.currency} subcats={subcategoriesFor(slug)} brandName={b.name} />}
            {tab === "socials" && <Socials b={b} profile={profile} series={series} />}
            {tab === "ads" && <Ads b={b} series={series} ads={ads} shade={shade} strategy={profile ? blocksOfType(profile.blocks, "strategy")[0] : undefined} capture={captureFor(slug)} />}
            {tab === "keywords" && <Keywords ads={ads} />}
            {tab === "similar" && <Similar rows={similar} />}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Header and facts ────────────────────────────────────────────────

function Header({ b }: { b: BusinessDetail }) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 pb-3 pt-4 sm:px-6">
      <Link to={collectionPath("all-ideas")} aria-label="Back to all brands" className="text-[color:var(--muted-foreground)] no-underline">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </Link>
      {b.logoUrl ? (
        <img src={b.logoUrl} alt="" className="h-10 w-10 rounded-lg border border-[color:var(--border)] bg-white object-contain p-1" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-tint)] font-bold text-[color:var(--accent)]">{b.name[0]}</div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="m-0 text-xl font-bold tracking-tight">{b.name}</h1>
          <span title="Sells on Amazon" className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ff9900] text-white">
            <PlatformIcon platform="AMAZON" />
          </span>
        </div>
        {b.tagline && <div className="hidden truncate text-sm text-[color:var(--muted-foreground)] md:block">{b.tagline}</div>}
      </div>
      {/* None of these work yet. Shown locked rather than hidden, so the page
          says what is coming: greyed, a lock on each, and a tooltip on hover
          or focus. aria-disabled rather than disabled, so they stay focusable
          and the tooltip is reachable from the keyboard. */}
      <div className="ml-auto flex items-center gap-2">
        <LockedButton label="Save to favorites">
          <path d="M6 3h12v18l-6-4-6 4z" />
        </LockedButton>
        <LockedButton label="Copy link">
          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </LockedButton>
        <LockedButton label="Track brand" text="Track brand">
          <circle cx="12" cy="12" r="3" /><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        </LockedButton>
        <LockedButton label="Notifications" align="end">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </LockedButton>
      </div>
    </div>
  );
}

const LOCKED_TIP = "Not available yet";

/** A header action that does not work yet: greyed, a small lock on its corner,
 *  and "Not available yet" on hover or focus. `text` makes it the labelled
 *  dark button (Track brand) instead of an icon square. */
function LockedButton({ label, text, align, children }: { label: string; text?: string; align?: "center" | "end"; children: React.ReactNode }) {
  const icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
  return (
    <Tip label={LOCKED_TIP} align={align}>
      <button
        type="button"
        aria-disabled="true"
        aria-label={`${label} — ${LOCKED_TIP.toLowerCase()}`}
        onClick={(e) => e.preventDefault()}
        className={`relative flex cursor-not-allowed items-center justify-center rounded-lg ${
          text
            ? "gap-2 bg-[var(--foreground)] px-3.5 py-2 text-sm font-semibold text-white opacity-50"
            : "h-9 w-9 border border-[color:var(--border)] bg-[var(--surface)] text-[color:var(--muted-foreground)] opacity-60"
        }`}
      >
        {icon}
        {text}
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)]" aria-hidden="true">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        </span>
      </button>
    </Tip>
  );
}

const factBy = (facts: Fact[], info: string) => facts.find((f) => f.info === info);

/** The facts a reader scans first, in one row; everything else behind "More info". */
/** `more` is the More info panel: the original's Additional metrics — the
 *  derived cells (TACoS, COGS, Brand Registry, retail prices), then the facts. */
function FactRow({ b, facts, more }: { b: BusinessDetail; facts: Fact[]; more: Fact[] }) {
  const [open, setOpen] = useState(false);
  const niches = b.categories.filter((c) => c.kind === "NICHE");
  const rating = factBy(facts, "rating");
  const reviews = factBy(facts, "reviews");
  const category = factBy(facts, "category");
  // The read ranks when there are any; the case study's typed note otherwise.
  const best = (root: boolean) => (b.listingRanks ?? []).filter((r) => r.isRoot === root).sort((x, y) => x.rank - y.rank)[0];
  const bestRoot = best(true);
  const bestSub = best(false);
  const socials = b.links.filter((l) => SOCIAL.includes(l.platform));
  const site = b.links.find((l) => l.platform === "WEBSITE");
  const amazon = b.links.find((l) => l.platform === "AMAZON");
  const visits = site ? linkMetaNumber(site, "visitsPerMonth") : null;

  return (
    <div className="border-y border-[color:var(--border)]">
      <div className="flex items-stretch divide-x divide-[color:var(--border)] overflow-x-auto">
        {niches.length > 0 && (
          <FactCell label="Niche">
            <div className="flex flex-wrap gap-1">
              {niches.map((n) => (
                <span key={n.slug} className="rounded-md border border-[color:var(--border)] bg-white px-2 py-0.5 text-xs font-medium">{n.name}</span>
              ))}
            </div>
          </FactCell>
        )}
        {(rating || reviews) && (
          <FactCell label="Amazon rating">
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="text-[#f59e0b]">★</span>
              {rating?.value.replace("★", "") ?? "—"}
              {reviews && <span className="font-normal text-[color:var(--muted-foreground)]">· {reviews.value} reviews</span>}
            </span>
          </FactCell>
        )}
        {bestRoot ? (
          <FactCell label="Best seller rank">
            <span
              className="text-sm font-semibold"
              title={`The brand's best-ranked listing, read ${dayLabel(bestRoot.readAt)} from Keepa${bestSub ? ` · #${bestSub.rank.toLocaleString("en-US")} in ${bestSub.categoryName}` : ""}`}
            >
              #{bestRoot.rank.toLocaleString("en-US")} in {bestRoot.categoryName}
            </span>
          </FactCell>
        ) : category?.note ? (
          <FactCell label="Best seller rank">
            <span className="text-sm font-semibold">{category.note}</span>
          </FactCell>
        ) : null}
        {(socials.length > 0 || visits !== null) && (
          <FactCell label="Social">
            <div className="flex flex-wrap gap-x-3.5 gap-y-1">
              {socials.map((l) => <SocialStat key={l.url} link={l} />)}
              {visits !== null && (
                <a
                  href={site?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={site ? `${new URL(site.url).hostname.replace(/^www\./, "")} · visits per month` : "Visits per month"}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[color:var(--foreground)] no-underline hover:text-[color:var(--foreground)]"
                >
                  <PlatformIcon platform="WEBSITE" /> {compact(visits)}<span className="font-normal text-[color:var(--muted-foreground)]">/mo</span>
                </a>
              )}
            </div>
          </FactCell>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="ml-auto flex shrink-0 items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[color:var(--foreground)] hover:bg-[var(--surface)] sm:px-6"
        >
          More info
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={open ? "rotate-180" : ""}><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>

      {open && (
        <div className="grid gap-x-6 gap-y-3 border-t border-[color:var(--border)] bg-[var(--surface)] px-4 py-4 text-sm sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {amazon && (
            <MoreFact label="Amazon store">
              <a href={amazon.url} target="_blank" rel="noopener noreferrer">
                Storefront{linkMetaNumber(amazon, "asins") ? ` · ${linkMetaNumber(amazon, "asins")} ASINs` : ""} ↗
              </a>
            </MoreFact>
          )}
          {site && (
            <MoreFact label="Website">
              <a href={site.url} target="_blank" rel="noopener noreferrer">{new URL(site.url).hostname.replace(/^www\./, "")} ↗</a>
            </MoreFact>
          )}
          {b.establishedAt && <MoreFact label="Launched" info="listedSince">{monthLabel(b.establishedAt)} ({ageLabel(b.establishedAt)})</MoreFact>}
          {b.country && <MoreFact label="Based in">{flag(b.country)} {b.country}</MoreFact>}
          <MoreFact label="Marketplace">amazon.com · {b.currency}</MoreFact>
          {more
            .filter((f) => f.info !== "rating" && f.info !== "reviews")
            .map((f) => (
              <MoreFact key={f.label} label={f.label} wide={f.wide} info={f.info} infoExtra={f.infoExtra} learnMore={f.learnMore}>
                {f.value}
                {f.note && <span className="block text-xs text-[color:var(--muted-foreground)]">{f.note}</span>}
              </MoreFact>
            ))}
        </div>
      )}
    </div>
  );
}

function FactCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col justify-center gap-1 px-4 py-2.5 sm:px-6">
      <span className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--muted-foreground)]">{label}</span>
      {children}
    </div>
  );
}

/** One cell of the More info panel — the ⓘ is the original's: the shared
 *  METRIC_INFO copy plus this business's own paragraphs, only when either exists. */
function MoreFact({
  label,
  wide,
  info,
  infoExtra,
  learnMore,
  children,
}: {
  label: string;
  wide?: boolean;
  info?: string;
  infoExtra?: string[];
  learnMore?: string;
  children: React.ReactNode;
}) {
  const shared = info ? METRIC_INFO[info] : undefined;
  const paragraphs = shared || infoExtra?.length ? [...(shared ?? []), ...(infoExtra ?? [])] : undefined;
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <div className="flex items-center gap-1 text-xs text-[color:var(--muted-foreground)]">
        {label}
        {paragraphs && <InfoTip label={label} paragraphs={paragraphs} learnMore={learnMore} />}
      </div>
      <div className="font-medium">{children}</div>
    </div>
  );
}

// ─── Left sub-menu ───────────────────────────────────────────────────

const NAV: Array<{ group?: string; divider?: boolean; items: Array<{ id: TabId; label: string; icon: React.ReactNode }> }> = [
  {
    items: [
      { id: "analytics", label: TAB_LABEL.analytics, icon: <path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z" /> },
      { id: "products", label: TAB_LABEL.products, icon: <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /> },
    ],
  },
  {
    group: "Financials",
    items: [
      { id: "revenue", label: TAB_LABEL.revenue, icon: <path d="M3 3v18h18M7 15l4-4 3 3 6-6" /> },
      { id: "margin", label: TAB_LABEL.margin, icon: <path d="M12 2a10 10 0 1 0 10 10H12zM15 2.5A10 10 0 0 1 21.5 9H15z" /> },
    ],
  },
  {
    group: "Advertising",
    items: [
      { id: "ads", label: TAB_LABEL.ads, icon: <path d="M3 11l18-8v18L3 13zM7 12v6a2 2 0 0 0 4 0v-4" /> },
      { id: "deals", label: TAB_LABEL.deals, icon: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></> },
      { id: "keywords", label: TAB_LABEL.keywords, icon: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5" /> },
    ],
  },
  {
    group: "Audience",
    items: [
      { id: "socials", label: TAB_LABEL.socials, icon: <><circle cx="12" cy="12" r="3" /><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" /></> },
    ],
  },
  {
    group: "Market",
    items: [
      { id: "niche", label: TAB_LABEL.niche, icon: <><path d="M3 17l5-5 4 4 8-8" /><path d="M14 8h6v6" /></> },
      { id: "similar", label: TAB_LABEL.similar, icon: <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M22 21a5 5 0 0 0-5-5" /> },
    ],
  },
  {
    group: "Brand",
    items: [
      { id: "owner", label: TAB_LABEL.owner, icon: <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0" /> },
      { id: "health", label: TAB_LABEL.health, icon: <><path d="M3 12h4l2-5 4 10 2-5h6" /></> },
      { id: "reviews", label: TAB_LABEL.reviews, icon: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /> },
      { id: "valuation", label: TAB_LABEL.valuation, icon: <><path d="M3.5 12.5 11.5 4.5H19.5V12.5L11.5 20.5Z" /><circle cx="15.5" cy="8.5" r="1.2" /></> },
    ],
  },
  /* A rule above: everything before it is about this business, everything
     after it is about building your own. */
  {
    group: "Build your own",
    divider: true,
    items: [
      { id: "validate", label: TAB_LABEL.validate, icon: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></> },
    ],
  },
];

const NAV_KEY = "business2.navCollapsed";

/** The sub-menu's collapsed state, remembered per viewer. Storage can be
 *  missing or blocked (private windows, previews) — then it just starts open. */
function useNavCollapsed(): [boolean, () => void] {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(NAV_KEY) === "1";
    } catch {
      return false;
    }
  });
  const toggle = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem(NAV_KEY, c ? "0" : "1");
      } catch {
        /* not remembered — fine */
      }
      return !c;
    });
  return [collapsed, toggle];
}

/** A dark tooltip under its trigger, shown on hover or keyboard focus. */
function Tip({ label, children, align = "center" }: {
  label: string; children: React.ReactNode;
  /** "end": pinned to the trigger's right edge, for a trigger at the edge of
   *  the card, whose overflow would otherwise clip it. */
  align?: "center" | "end";
}) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className={`pointer-events-none absolute top-full z-30 mt-2 ${align === "end" ? "right-0" : "left-1/2 -translate-x-1/2"} whitespace-nowrap rounded-md bg-[var(--foreground)] px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100`}>
        {label}
      </span>
    </span>
  );
}

function SideNav({ tab, onTab, counts, slug, collapsed, onToggle, hidden }: {
  tab: TabId; onTab: (t: TabId) => void; counts: Partial<Record<TabId, number>>; slug: string; collapsed: boolean; onToggle: () => void;
  /** Tabs this brand has nothing for, left out of the menu. */
  hidden: Set<TabId>;
}) {
  const nav = NAV.map((g) => ({ ...g, items: g.items.filter((it) => !hidden.has(it.id)) })).filter((g) => g.items.length > 0);
  const item = (it: (typeof NAV)[number]["items"][number], compactNav = false, iconOnly = false) => {
    const active = it.id === tab;
    const button = (
      <button
        key={it.id}
        type="button"
        onClick={() => onTab(it.id)}
        aria-current={active ? "page" : undefined}
        aria-label={iconOnly ? it.label : undefined}
        className={`flex shrink-0 items-center rounded-lg py-2 text-sm font-medium transition-colors ${
          iconOnly ? "h-10 w-10 justify-center" : `gap-2.5 px-3 ${compactNav ? "" : "w-full"}`
        } ${
          active
            ? "bg-[var(--accent-tint)] text-[color:var(--accent)]"
            : "text-[color:var(--muted-foreground)] hover:bg-[var(--surface)] hover:text-[color:var(--foreground)]"
        }`}
      >
        <svg width={iconOnly ? 18 : 16} height={iconOnly ? 18 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{it.icon}</svg>
        {!iconOnly && it.label}
        {!iconOnly && counts[it.id] ? <span className="ml-auto pl-2 text-xs tabular-nums opacity-70">{counts[it.id]}</span> : null}
      </button>
    );
    return iconOnly ? <Tip key={it.id} label={it.label}>{button}</Tip> : button;
  };
  // The previous long-form case study, kept at /business2/.
  const caseStudyHref = `/business2/${encodeURIComponent(slug)}/`;
  const caseStudy = (
    <Link to={caseStudyHref} className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--accent)] no-underline">
      Full case study →
    </Link>
  );
  const action = collapsed ? "Expand" : "Collapse";
  const toggle = (
    <Tip label={action}>
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${action} menu`}
        aria-expanded={!collapsed}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[color:var(--muted-foreground)] hover:bg-[var(--surface)] hover:text-[color:var(--foreground)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d={collapsed ? "M15 4v16" : "M9 4v16"} />
        </svg>
      </button>
    </Tip>
  );
  return (
    <>
      {/* Phones and tablets: the same menu as one scrolling row. */}
      <nav aria-label="Brand sections" className="flex gap-1 overflow-x-auto border-b border-[color:var(--border)] px-3 py-2 lg:hidden">
        {nav.flatMap((g) => g.items).map((it) => item(it, true))}
        {showsCaseStudyLink(slug) && caseStudy}
      </nav>
      <nav aria-label="Brand sections" className="hidden border-r border-[color:var(--border)] lg:block">
        <div className={`flex border-b border-[color:var(--border)] px-3 py-2 ${collapsed ? "justify-center" : "justify-end"}`}>{toggle}</div>
        {collapsed ? (
          <div className="sticky top-3 flex flex-col items-center gap-1 px-2 py-3">
            {nav.map((g, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 ${i > 0 ? "mt-1 border-t border-[color:var(--border)] pt-2" : ""}`}>
                {g.items.map((it) => item(it, false, true))}
              </div>
            ))}
            {showsCaseStudyLink(slug) && <div className="mt-1 border-t border-[color:var(--border)] pt-2">
              <Tip label="Full case study">
                <Link to={caseStudyHref} aria-label="Full case study" className="flex h-10 w-10 items-center justify-center rounded-lg text-[color:var(--accent)] hover:bg-[var(--surface)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Tip>
            </div>}
          </div>
        ) : (
          <div className="sticky top-3 space-y-4 p-3">
            {nav.map((g, i) => (
              <div key={i} className={`space-y-0.5 ${g.divider ? "border-t border-[color:var(--border)] pt-4" : ""}`}>
                {g.group && <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{g.group}</div>}
                {g.items.map((it) => item(it))}
              </div>
            ))}
            {showsCaseStudyLink(slug) && <div className="border-t border-[color:var(--border)] pt-3">{caseStudy}</div>}
          </div>
        )}
      </nav>
    </>
  );
}

// ─── Building blocks ─────────────────────────────────────────────────

function Card({ title, right, children, className = "" }: { title?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-5 ${className}`}>
      {(title || right) && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {title && <h2 className="m-0 text-[15px] font-semibold">{title}</h2>}
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-lg bg-[var(--muted)] p-0.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold ${o === value ? "bg-white text-[color:var(--foreground)] shadow-sm" : "text-[color:var(--muted-foreground)]"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Chips<T extends string>({ value, options, onChange }: { value: T; options: T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            o === value
              ? "border-[color:var(--foreground)] bg-[var(--foreground)] text-white"
              : "border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-3 py-1.5 text-xs font-semibold"
    >
      <span className={`relative h-4 w-7 rounded-full transition-colors ${on ? "bg-[var(--accent)]" : "bg-[var(--muted)]"}`}>
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-all ${on ? "left-3.5" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}

function Delta({ pct }: { pct: number | null }) {
  if (pct === null || !Number.isFinite(pct)) return null;
  const up = pct >= 0;
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${up ? "bg-[#e7f6ee] text-[color:var(--success)]" : "bg-[#fdecea] text-[color:var(--danger)]"}`}>
      {up ? "+" : ""}{Math.round(pct)}%
    </span>
  );
}

type Point = { date: string; label: string; value: number };
type Range = "3M" | "6M" | "12M" | "ALL";
const RANGES: Range[] = ["3M", "6M", "12M", "ALL"];

const isQ4Of = (iso: string, year: number) => {
  const d = new Date(iso);
  return d.getUTCFullYear() === year && d.getUTCMonth() >= 9;
};

/** The latest year whose October to December the revenue series covers. */
function latestQ4Year(series: MetricsResponse | null): number | null {
  const years = toChartPoints(series)
    .filter((p) => new Date(p.periodStart).getUTCMonth() >= 9)
    .map((p) => new Date(p.periodStart).getUTCFullYear());
  return years.length ? Math.max(...years) : null;
}

/** An area chart in the dashboard's register. Hand-rolled SVG, like Chart.tsx.
 *  `shade` bands the months of one year's Q4 behind the line. */
/** The rendered width of an element, kept current as it resizes. */
function useWidth<T extends HTMLElement>(): [React.RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e!.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

/**
 * Drawn at its real pixel width rather than stretched from a viewBox, so the
 * type is the same size however wide the column is (TrendTrack's chart does
 * the same). The points sit inset from the axis, so the first value label
 * cannot land on the y-axis figures, and the end labels are anchored inwards.
 */
function AreaChart({ points, color, format, labels = true, shade = null, wide = false, markers = [] }: {
  points: Point[]; color: string; format: (n: number) => string; labels?: boolean; shade?: number | null;
  /** Dated moments drawn on the month they fall in: a dashed rule and a dot,
   *  with the label as a hover title. Months outside the points are dropped. */
  markers?: Array<{ date: string; label: string; color: string }>;
  /** Drawn across the whole column: a little taller. */
  wide?: boolean;
}) {
  const [ref, measured] = useWidth<HTMLDivElement>();
  if (points.length === 0) return <div data-empty>No figures published yet.</div>;
  const W = measured || 640, H = wide ? 300 : 280, P = { t: 28, r: 16, b: 28, l: 56 };
  const INSET = 28;
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const lo = Math.min(0, ...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value), 1) * 1.12;
  const span = max - lo;
  const x = (i: number) => P.l + INSET + (points.length === 1 ? (iw - 2 * INSET) / 2 : (i / (points.length - 1)) * (iw - 2 * INSET));
  const y = (v: number) => P.t + ih - ((v - lo) / span) * ih;
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join("");
  const area = `${line}L${x(points.length - 1)},${y(lo)}L${x(0)},${y(lo)}Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => lo + t * span);
  const gid = `g${color.replace(/[^a-z0-9]/gi, "")}`;
  const gap = points.length > 1 ? (iw - 2 * INSET) / (points.length - 1) : iw;
  // Month names need ~44px each; past that, every nth.
  const step = Math.max(1, Math.ceil(44 / gap));
  const half = gap / 2;
  const shaded = shade !== null ? points.map((p, i) => (isQ4Of(p.date, shade) ? i : -1)).filter((i) => i >= 0) : [];
  const band = shaded.length
    ? { x0: Math.max(P.l, x(shaded[0]!) - half), x1: Math.min(W - P.r, x(shaded.at(-1)!) + half) }
    : null;
  const last = points.length - 1;
  /* Value labels are placed greedily — the latest month, the peak and the low
     first, then the rest left to right — and one is skipped only when its box
     would touch a label already placed. */
  const anchorOf = (i: number) => (points.length > 1 && i === 0 ? "start" : points.length > 1 && i === last ? "end" : "middle");
  const placed = new Set<number>();
  if (labels) {
    const boxes: Array<{ x0: number; x1: number; y: number }> = [];
    const byValue = points.map((_, i) => i).sort((a, c) => points[c]!.value - points[a]!.value);
    const order = [...new Set([last, byValue[0]!, byValue.at(-1)!, ...points.map((_, i) => i)])];
    for (const i of order) {
      const w = format(points[i]!.value).length * 7 + 6;
      const cx = x(i), a = anchorOf(i);
      const x0 = a === "start" ? cx - 8 : a === "end" ? cx + 8 - w : cx - w / 2;
      const box = { x0, x1: x0 + w, y: y(points[i]!.value) - 11 };
      if (boxes.some((o) => box.x0 < o.x1 && o.x0 < box.x1 && Math.abs(box.y - o.y) < 15)) continue;
      boxes.push(box);
      placed.add(i);
    }
  }
  const showValue = (i: number) => placed.has(i);
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} className="block" role="img" aria-label={points.map((p) => `${p.label}: ${format(p.value)}`).join(", ")}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {band && (
          <g>
            <rect x={band.x0} y={P.t - 16} width={band.x1 - band.x0} height={ih + 16} fill="var(--accent)" opacity="0.08" rx="4" />
            <text x={(band.x0 + band.x1) / 2} y={P.t - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Q4 {shade}</text>
          </g>
        )}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeDasharray={i ? "3 4" : undefined} />
            <text x={P.l - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--muted-foreground)">{format(t)}</text>
          </g>
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.25" strokeLinejoin="round" />
        {markers.map((m, k) => {
          const i = points.findIndex((p) => p.date.slice(0, 7) === m.date.slice(0, 7));
          if (i < 0) return null;
          return (
            <g key={k}>
              <title>{m.label}</title>
              <line x1={x(i)} x2={x(i)} y1={P.t - 6} y2={y(lo)} stroke={m.color} strokeDasharray="3 3" strokeWidth="1.5" opacity="0.7" />
              <circle cx={x(i)} cy={P.t - 8} r="6" fill={m.color} stroke="white" strokeWidth="2" />
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={i}>
            {labels && <circle cx={x(i)} cy={y(p.value)} r="4" fill="white" stroke={color} strokeWidth="2" />}
            {showValue(i) && (
              <text
                x={x(i)}
                y={y(p.value) - 11}
                textAnchor={anchorOf(i)}
                dx={i === 0 && points.length > 1 ? -8 : i === last && points.length > 1 ? 8 : 0}
                fontSize="12"
                fontWeight="600"
                fill="var(--muted-foreground)"
                paintOrder="stroke"
                stroke="var(--card)"
                strokeWidth="4"
                strokeLinejoin="round"
              >
                {format(p.value)}
              </text>
            )}
            {i % step === 0 && (
              <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">{p.label}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

const shortMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) +
  (new Date(iso).getUTCMonth() === 0 ? ` ${String(new Date(iso).getUTCFullYear()).slice(2)}` : "");

const sliceRange = <T,>(xs: T[], r: Range) =>
  r === "3M" ? xs.slice(-3) : r === "6M" ? xs.slice(-6) : r === "12M" ? xs.slice(-12) : xs;

const deltaOf = (pts: Point[]) => {
  const last = pts.at(-1)?.value, prev = pts.at(-2)?.value;
  return last !== undefined && prev ? ((last - prev) / Math.abs(prev)) * 100 : null;
};

type Metric = {
  id: string;
  label: string;
  /** The headline in the tab: the latest month, formatted. */
  value: string;
  delta: number | null;
  points: Point[];
  color: string;
  format: (n: number) => string;
  labels?: boolean;
  foot: [string, string];
};

/** One card, several series: a tab per metric carrying its own latest value,
 *  and one chart that redraws for the tab chosen. */
function MetricCard({ metrics, shade, action, wide }: { metrics: Metric[]; shade: number | null; action?: React.ReactNode; wide?: boolean }) {
  const [active, setActive] = useState(metrics[0]!.id);
  const [range, setRange] = useState<Range>("12M");
  const m = metrics.find((x) => x.id === active) ?? metrics[0]!;
  return (
    <section className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[var(--card)]">
      <div className="flex border-b border-[color:var(--border)]">
        {metrics.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            aria-pressed={x.id === active}
            className={`-mb-px min-w-0 flex-1 border-b-2 px-4 py-3 ${wide ? "sm:max-w-[240px]" : ""} text-left transition-colors ${
              x.id === active ? "border-[color:var(--accent)] bg-white" : "border-transparent bg-[var(--surface)] hover:bg-white"
            }`}
          >
            <div className={`text-xs font-medium ${x.id === active ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)]"}`}>{x.label}</div>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-xl font-bold tracking-tight">{x.value}</span>
              <Delta pct={x.delta} />
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-[color:var(--muted-foreground)]">Monthly · vs the month before</span>
          <div className="flex items-center gap-2">
            <Segmented value={range} options={RANGES} onChange={setRange} />
            {action}
          </div>
        </div>
        <AreaChart points={sliceRange(m.points, range)} color={m.color} format={m.format} labels={m.labels ?? range !== "ALL"} shade={shade} wide={wide} />
        <ChartFoot left={m.foot[0]} right={m.foot[1]} />
      </div>
    </section>
  );
}

function ChartFoot({ left, right }: { left: string; right: string }) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3 border-t border-[color:var(--border)] pt-2.5 text-xs text-[color:var(--muted-foreground)]">
      <span>{left}</span>
      <span className="text-right font-medium text-[color:var(--foreground)]">{right}</span>
    </div>
  );
}

/** Revenue, profit, margin, ad spend and ad spend against revenue, from the metric series. */
function useSeries(series: MetricsResponse | null) {
  return useMemo(() => {
    const points = toChartPoints(series);
    const revenue: Point[] = points.map((p) => ({ date: p.periodStart, label: shortMonth(p.periodStart), value: p.revenue ?? 0 }));
    const profit: Point[] = points.filter((p) => p.profit !== null).map((p) => ({ date: p.periodStart, label: shortMonth(p.periodStart), value: p.profit! }));
    const margin: Point[] = points
      .filter((p) => p.profit !== null && p.revenue)
      .map((p) => ({ date: p.periodStart, label: shortMonth(p.periodStart), value: (p.profit! / p.revenue!) * 100 }));
    const adSpend: Point[] = rowsOfType(series, "ad_spend").map((r) => ({ date: r.periodStart, label: shortMonth(r.periodStart), value: Number(r.value) }));
    const revBy = new Map(points.map((p) => [p.periodStart, p.revenue]));
    const tacos: Point[] = adSpend
      .filter((a) => revBy.get(a.date))
      .map((a) => ({ ...a, value: (a.value / revBy.get(a.date)!) * 100 }));
    return { revenue, profit, margin, adSpend, tacos };
  }, [series]);
}

const pct = (n: number) => `${n.toFixed(n < 10 ? 1 : 0)}%`;

// ─── Overview ────────────────────────────────────────────────────────

function Analytics({ b, series, products, similar, showSimilar = true, shade, onTab, profile }: {
  b: BusinessDetail; series: MetricsResponse | null; products: Product[];
  similar: BusinessCard[] | null; shade: number | null; onTab: (t: TabId) => void;
  /** Off when the Similar Brands tab is shelved for this brand. */
  showSimilar?: boolean;
  profile?: Profile;
}) {
  const s = useSeries(series);
  const fmt = (n: number) => money(n, b.currency);
  const summary = summaryFor(b.slug);

  const sales: Metric[] = [
    { id: "revenue", label: "Revenue", value: money(b.latestMonthlyRevenue, b.currency), delta: deltaOf(s.revenue), points: s.revenue, color: "var(--series-revenue)", format: fmt, foot: ["Marketplace", `${flag(b.country)} amazon.com · 100% of measured revenue`] },
    { id: "profit", label: "Profit", value: money(b.latestMonthlyProfit, b.currency), delta: deltaOf(s.profit), points: s.profit, color: "var(--success)", format: fmt, foot: ["Profit", "Revenue less COGS, Amazon fees and modelled ads"] },
  ];
  /* The same three figures the case study's headline row carries, off the
     same Business row and helpers, so the two pages cannot disagree. */
  const revenueNow = Number(b.latestMonthlyRevenue) || null;
  const profitNow = b.latestMonthlyProfit === null ? null : Number(b.latestMonthlyProfit);
  const margin = b.latestMarginPct !== null && b.latestMarginPct !== undefined
    ? Number(b.latestMarginPct)
    : revenueNow && profitNow !== null ? (profitNow / revenueNow) * 100 : null;
  const toTest = startingCostFigure(b);
  const range = toTest === null ? null : startingCostRange(b);

  return (
    <>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
        <MetricCard metrics={sales} shade={shade} />
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1 xl:grid-rows-3">
          <MiniStat
            label="Margin"
            value={percent(margin)}
            sub={b.latestPeriod ? `${monthLabel(b.latestPeriod)} · profit ÷ revenue` : "Profit ÷ revenue"}
            onClick={() => onTab("margin")}
            action="Margin breakdown"
          />
          <MiniStat
            label="To launch your own"
            value={toTest === null ? "—" : `${exactMoney(toTest, b.currency)}*`}
            sub={range ? `Estimated, ${exactMoney(range.low, b.currency)}–${exactMoney(range.high, b.currency)}` : toTest === null ? "Not researched yet" : `* ${FIXED_COSTS_NOTE}`}
          />
          <MiniStat
            label="Age"
            value={b.establishedAt ? ageLabel(b.establishedAt) : "—"}
            sub={b.establishedAt ? `Listed ${monthLabel(b.establishedAt)}` : "Listing date unknown"}
          />
        </div>
      </div>

      {shade !== null && <Q4Summary revenue={s.revenue} year={shade} currency={b.currency} />}

      {/* The case study's opening, unchanged: its intro sentence, then the
          blocks before the first section (heading, a line, the pictures). */}
      {profile && (profile.intro || profile.blocks[0]?.type !== "section") && (
        <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-6">
          <h2 className="m-0 mb-3 text-[15px] font-semibold">What is the product?</h2>
          {profile.intro && <p className="m-0 max-w-[48rem] text-[17px] leading-relaxed">{profile.intro}</p>}
          <ProfileBlocks profile={profile} business={b} metrics={toChartPoints(series)} series={series} only={null} />
        </section>
      )}

      {summary && <InShort summary={summary} />}

      <ProductStrip products={products} currency={b.currency} onMore={() => onTab("products")} />

      {showSimilar && <SimilarCarousel rows={similar} onMore={() => onTab("similar")} />}
    </>
  );
}

/** The case-study summary on the Overview, as two cards under "What is the
 *  product?": "Business overview" (its own bullets full width, then Margin,
 *  Competition and Heads up side by side) and "What makes it successful?"
 *  (summary.md's "Why the margin is high" group). */
function InShort({ summary }: { summary: Summary }) {
  const groups = summary.groups.filter((g) => g.points.length);
  const isWhy = (g: Summary["groups"][number]) => /^why\b/i.test(g.heading);
  const why = groups.find(isWhy);
  const [first, ...rest] = groups.filter((g) => !isWhy(g));
  const group = (g: Summary["groups"][number], titled = true) => (
    <div key={g.heading}>
      {titled && g.heading && <h3 className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{g.heading}</h3>}
      <ul className="m-0 list-none space-y-2 p-0">
        {g.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed">
            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      {first && (
        <Card title="Business overview">
          <div className="space-y-5">
            {/* The card's title already says it; the first group's own heading would repeat it. */}
            {group(first, !/^business overview$/i.test(first.heading))}
            {rest.length > 0 && (
              <div className="grid gap-5 border-t border-[color:var(--border)] pt-5 lg:grid-cols-3">{rest.map((g) => group(g))}</div>
            )}
          </div>
        </Card>
      )}
      {why && <Card title="What makes it successful?">{group(why, false)}</Card>}
    </>
  );
}

function MiniStat({ label, value, sub, onClick, action }: { label: string; value: string; sub: string; onClick?: () => void; action?: string }) {
  return (
    <section className="flex flex-col justify-center rounded-xl border border-[color:var(--border)] bg-[var(--card)] px-4 py-3.5">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{sub}</div>
      {onClick && action && (
        <button type="button" onClick={onClick} className="mt-1.5 self-start text-xs font-medium text-[color:var(--accent)]">
          {action} →
        </button>
      )}
    </section>
  );
}

/** What the overlaid quarter brought in, against the calendar year it closes. */
function Q4Summary({ revenue, year, currency }: { revenue: Point[]; year: number; currency: string }) {
  const q4 = revenue.filter((p) => isQ4Of(p.date, year));
  const inYear = revenue.filter((p) => new Date(p.date).getUTCFullYear() === year);
  const q4Total = q4.reduce((t, p) => t + p.value, 0);
  const yearTotal = inYear.reduce((t, p) => t + p.value, 0);
  const peak = [...q4].sort((a, c) => c.value - a.value)[0];
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-xl border border-[color:var(--accent)] bg-[var(--accent-tint)] px-4 py-3 text-sm">
      <span className="font-semibold text-[color:var(--accent)]">Q4 {year}</span>
      <span><b>{money(q4Total, currency)}</b> revenue over {q4.length} month{q4.length === 1 ? "" : "s"}</span>
      {inYear.length === 12 && yearTotal > 0 && <span><b>{Math.round((q4Total / yearTotal) * 100)}%</b> of {year}’s revenue</span>}
      {peak && <span>Peak {new Date(peak.date).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })}: <b>{money(peak.value, currency)}</b></span>}
    </div>
  );
}

function SocialStat({ link }: { link: BusinessLink }) {
  const followers = linkFollowers(link);
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-[color:var(--foreground)] no-underline" title={platformLabel(link.platform)}>
      {/* No follower count read: the icon alone, still a link. */}
      <PlatformIcon platform={link.platform} />
      {followers !== null && compact(followers)}
    </a>
  );
}

// ─── Products ────────────────────────────────────────────────────────

const SORTS = ["Revenue", "Best Seller Rank", "Fastest growing", "Creation date", "Price: high to low", "Price: low to high"] as const;
type Sort = (typeof SORTS)[number];

/** The sorts this catalogue can answer: Best Seller Rank only once a rank is read. */
const sortsFor = (products: Product[]): Sort[] =>
  SORTS.filter(
    (s) => (s !== "Best Seller Rank" || products.some((p) => p.bsr?.root)) && (s !== "Fastest growing" || products.some((p) => momentumOf(p.asin))),
  );

function sortProducts(products: Product[], order: Sort): Product[] {
  const xs = [...products];
  if (order === "Revenue") return xs.sort((a, b) => b.revenue - a.revenue || byUnits(a, b));
  /* Lowest root-category rank first. Variations share their family's rank, so
     revenue orders a tie; a listing with no rank goes last. */
  if (order === "Best Seller Rank")
    return xs.sort((a, b) => (a.bsr?.root?.rank ?? Infinity) - (b.bsr?.root?.rank ?? Infinity) || b.revenue - a.revenue);
  // Biggest momentum first; a listing with none read goes last.
  if (order === "Fastest growing")
    return xs.sort((a, b) => (momentumOf(b.asin)?.pct ?? -Infinity) - (momentumOf(a.asin)?.pct ?? -Infinity) || b.revenue - a.revenue);
  // Newest listing first: the date the ASIN was created on Amazon.
  if (order === "Creation date") return xs.sort((a, b) => (b.listed ?? "").localeCompare(a.listed ?? ""));
  const p = (x: Product) => x.price ?? (order === "Price: high to low" ? -Infinity : Infinity);
  return xs.sort((a, b) => (order === "Price: high to low" ? p(b) - p(a) : p(a) - p(b)));
}

/** Units a month, Amazon's own sales badge; revenue breaks a tie between badges. */
const byUnits = (a: Product, b: Product) => (b.sold ?? 0) - (a.sold ?? 0);

/** A product's place in the order chosen — #1 is the top of whichever sort is
 *  on, as TrendTrack numbers it, not a fixed best-seller rank. A search keeps
 *  each product's place in the full order rather than renumbering the matches. */
const useRanks = (sorted: Product[]) => useMemo(() => new Map(sorted.map((p, i) => [p, i + 1])), [sorted]);

/** Gold, silver and bronze for the top three; black for the rest. */
const MEDAL: Record<number, string> = {
  1: "bg-gradient-to-b from-[#f7d774] to-[#d4a017] text-[#4a3500]",
  2: "bg-gradient-to-b from-[#eef0f3] to-[#a9b0b9] text-[#2b3038]",
  3: "bg-gradient-to-b from-[#e6a873] to-[#a8642e] text-white",
};

function RankBadge({ rank, className = "" }: { rank: number; className?: string }) {
  return (
    <span className={`inline-flex min-w-[1.75rem] items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums shadow-sm ${MEDAL[rank] ?? "bg-[var(--foreground)] text-white"} ${className}`}>
      #{rank}
    </span>
  );
}

function ProductStrip({ products, currency, onMore }: { products: Product[]; currency: string; onMore: () => void }) {
  const [order, setOrder] = useState<Sort>("Revenue");
  const sorted = useMemo(() => sortProducts(products, order), [products, order]);
  const rank = useRanks(sorted);
  const ref = useRef<HTMLDivElement>(null);
  // A new sort starts back at #1.
  useEffect(() => {
    ref.current?.scrollTo({ left: 0 });
  }, [order]);
  if (products.length === 0) return null;
  return (
    <Card
      title={
        <span className="flex items-center gap-3">
          <span>Products <span className="ml-1 text-[color:var(--muted-foreground)]">{products.length}</span></span>
          <ViewAll onClick={onMore} />
        </span>
      }
      right={<ScrollArrows target={ref} />}
    >
      <div className="mb-3"><Chips value={order} options={sortsFor(products)} onChange={setOrder} /></div>
      <div ref={ref} className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {sorted.map((p) => (
          <div key={p.asin ?? p.name} className="w-[180px] shrink-0 snap-start">
            <ProductCard p={p} rank={rank.get(p)!} currency={currency} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ViewAll({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white shadow-sm hover:opacity-90">
      View all
    </button>
  );
}

/** Previous / Next for a horizontal scroller, each with a tooltip. */
function ScrollArrows({ target }: { target: React.RefObject<HTMLDivElement> }) {
  const scroll = (dir: 1 | -1) => {
    const el = target.current;
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 200), behavior: "smooth" });
  };
  const arrow = (dir: 1 | -1) => {
    const label = dir === 1 ? "Next" : "Previous";
    return (
      <span className="group relative">
        <button
          type="button"
          onClick={() => scroll(dir)}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)] shadow-sm hover:text-[color:var(--foreground)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={dir === 1 ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"} />
          </svg>
        </button>
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
          {label}
        </span>
      </span>
    );
  };
  return <div className="flex items-center gap-1.5">{arrow(-1)}{arrow(1)}</div>;
}

function ProductCard({ p, rank, currency }: { p: Product; rank: number; currency: string }) {
  const href = p.asin ? `https://www.amazon.com/dp/${p.asin}` : undefined;
  const body = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-[color:var(--border)] bg-white">
        {p.image ? <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain p-2" /> : null}
        <RankBadge rank={rank} className="absolute right-2 top-2" />
        {p.asin && promoLabel(PROMO_NOW.get(p.asin)) && (
          <span className="absolute left-2 top-2 rounded-md bg-[#dc2626] px-1.5 py-0.5 text-[11px] font-bold text-white shadow-sm" title="Running on Amazon now">
            {promoLabel(PROMO_NOW.get(p.asin))}
          </span>
        )}
      </div>
      <div className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{p.name}</div>
      <div className="mt-1 text-base font-bold">{p.price !== undefined ? price(p.price, currency) : "—"}</div>
      <div className="text-xs text-[color:var(--muted-foreground)]">
        {p.sold ? `${p.sold.toLocaleString("en-US")}+ sold/mo` : "No sales badge"} · {money(p.revenue, currency)}/mo
      </div>
      {p.listed && <div className="text-xs text-[color:var(--muted-foreground)]">Listed: {dayLabel(p.listed)}</div>}
      {p.bsr?.root && <BsrLine bsr={p.bsr} />}
      {momentumOf(p.asin) && <div className="mt-1"><MomentumChip asin={p.asin} /></div>}
    </>
  );
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className="block text-[color:var(--foreground)] no-underline">{body}</a>
    : <div>{body}</div>;
}

const rankText = (r: ListingRank) => `#${r.rank.toLocaleString("en-US")} in ${r.categoryName}`;

function BsrLine({ bsr }: { bsr: Bsr }) {
  return (
    <div
      className="mt-1 text-xs"
      title={`Best Seller Rank, read ${dayLabel(bsr.root!.readAt)}${bsr.sharedBy > 1 ? ` · Amazon ranks the variation family, so ${bsr.sharedBy} listings here share it` : ""}`}
    >
      <span className="font-semibold">BSR {rankText(bsr.root!)}</span>
      {bsr.sharedBy > 1 && <span className="text-[color:var(--muted-foreground)]"> · {bsr.sharedBy} variations</span>}
    </div>
  );
}

/** A product as the filter bar reads it. */
const filterRow = (p: Product): FilterRow => ({
  price: p.price,
  revenue: p.revenue,
  listed: p.listed,
  marketplace: p.marketplace ?? "amazon.com",
  bsr: p.bsr?.root?.rank,
  rating: p.detail?.rating ?? undefined,
  reviews: p.detail?.reviewCount ?? undefined,
  subscription: p.detail?.subscribeAndSave ?? undefined,
});

function ProductLibrary({ products, currency }: { products: Product[]; currency: string }) {
  const [order, setOrder] = useState<Sort>("Revenue");
  const [view, setView] = useState<"Table" | "Grid">("Table");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ProductFilterState>({});
  // 25 rows, then "View all": a 199-product catalogue is otherwise one very long table.
  const [showAll, setShowAll] = useState(false);
  const PAGE = 25;
  const rows = useMemo(() => products.map(filterRow), [products]);
  const filtered = useMemo(() => products.filter((_, i) => matches(rows[i]!, filters)), [products, rows, filters]);
  const sorted = useMemo(() => sortProducts(filtered, order), [filtered, order]);
  const rank = useRanks(sorted);
  const total = products.reduce((t, p) => t + p.revenue, 0);
  const shown = sorted.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.asin?.toLowerCase().includes(query.toLowerCase()));
  const visible = showAll ? shown : shown.slice(0, PAGE);

  if (products.length === 0) return <div data-empty>No product breakdown published for this brand.</div>;
  return (
    <div className="space-y-4">
      <h2 className="m-0 text-2xl font-bold tracking-tight">Product Library ({products.length})</h2>
      <ProductFilterBar value={filters} onChange={setFilters} rows={rows} currency={currency} />
      <div className="flex flex-wrap items-center gap-3">
        {shown.length !== products.length && <span className="text-sm font-semibold">{shown.length} {shown.length === 1 ? "product" : "products"}</span>}
        <span className="text-sm text-[color:var(--muted-foreground)]">Sort by:</span>
        <Chips value={order} options={sortsFor(products)} onChange={setOrder} />
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="text-[color:var(--muted-foreground)]"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-[180px] border-0 bg-transparent p-0 text-sm outline-none"
            />
          </label>
          <Segmented value={view} options={["Table", "Grid"]} onChange={setView} />
        </div>
      </div>
    <Card>
      {shown.length === 0 ? (
        <div data-empty>No products match.</div>
      ) : view === "Grid" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((p) => <ProductCard key={p.asin ?? p.name} p={p} rank={rank.get(p)!} currency={currency} />)}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1020px] border-collapse text-sm">
            <thead>
              <tr className="text-xs text-[color:var(--muted-foreground)]">
                {["#", "Product", "Price", "Sold / mo", "Trend", "Revenue / mo", "Share", "Rating", "Best Seller Rank"].map((c, i) => (
                  <th key={c} className={`whitespace-nowrap border-b border-[color:var(--border)] px-2 py-2 font-semibold ${i < 2 ? "text-left" : "text-right"}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => {
                const share = total ? (p.revenue / total) * 100 : 0;
                return (
                  <tr key={p.asin ?? p.name} className="hover:bg-[var(--surface)]">
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5"><RankBadge rank={rank.get(p)!} /></td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <span className="h-11 w-11 shrink-0 overflow-hidden rounded-md border border-[color:var(--border)] bg-white">
                          {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-1 font-medium">{p.name}</span>
                          {p.asin && (
                            <a href={`https://www.amazon.com/dp/${p.asin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[color:var(--muted-foreground)]">
                              {p.asin} ↗
                            </a>
                          )}
                          {p.listed && <span className="text-xs text-[color:var(--muted-foreground)]"> · Listed {dayLabel(p.listed)}</span>}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right font-semibold tabular-nums">{p.price !== undefined ? price(p.price, currency) : "—"}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right tabular-nums">{p.sold ? `${p.sold.toLocaleString("en-US")}+` : "—"}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">{momentumOf(p.asin) ? <MomentumChip asin={p.asin} /> : <span className="text-[color:var(--muted-foreground)]">—</span>}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right font-semibold tabular-nums">{money(p.revenue, currency)}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">
                      <span className="tabular-nums">{Math.round(share)}%</span>
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">
                      {p.detail?.rating ? (
                        <span title={`Read ${dayLabel(p.detail.readAt)}${p.detail.subscribeAndSave ? " · Subscribe & Save" : ""}`}>
                          <span className="block whitespace-nowrap font-semibold tabular-nums"><span className="text-[#f59e0b]">★</span> {p.detail.rating.toFixed(1)}</span>
                          <span className="block whitespace-nowrap text-xs text-[color:var(--muted-foreground)]">{(p.detail.reviewCount ?? 0).toLocaleString("en-US")} ratings</span>
                          {p.asin && (REVIEW_BY_ASIN.get(p.asin)?.perMonth90 ?? 0) >= 1 && (
                            <span className="block whitespace-nowrap text-xs font-semibold text-[#166534]" title="New ratings a month, last 90 days">
                              +{Math.round(REVIEW_BY_ASIN.get(p.asin)!.perMonth90!).toLocaleString("en-US")}/mo
                            </span>
                          )}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">
                      {p.bsr?.root ? (
                        <span title={p.bsr.sharedBy > 1 ? `Shared by the ${p.bsr.sharedBy} variations of one listing` : undefined}>
                          <span className="block whitespace-nowrap font-semibold tabular-nums">{rankText(p.bsr.root)}</span>
                          <span className="ml-auto block max-w-[200px] text-xs leading-snug text-[color:var(--muted-foreground)]">
                            {[p.bsr.sub && rankText(p.bsr.sub), p.bsr.sharedBy > 1 && `${p.bsr.sharedBy} variations`].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {shown.length > PAGE && (
        <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-3 w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium">
          {showAll ? "Show less" : `View all ${shown.length} products`}
        </button>
      )}
    </Card>
    </div>
  );
}

/** When each listing went live, in waves, and what each wave earns today —
 *  how the catalogue was built, not just what is in it. */
function CatalogGrowth({ products, currency }: { products: Product[]; currency: string }) {
  const dated = products.filter((p) => p.listed);
  if (dated.length < 2) return null;
  const months = new Set(dated.map((p) => p.listed!.slice(0, 7)));
  // Month waves while they fit on a screen; quarters, then years, for long histories.
  const unit: "month" | "quarter" | "year" = months.size <= 12 ? "month" : new Set(dated.map((p) => quarterOf(p.listed!))).size <= 16 ? "quarter" : "year";
  const keyOf = (d: string) => (unit === "month" ? d.slice(0, 7) : unit === "quarter" ? quarterOf(d) : d.slice(0, 4));
  const labelOf = (k: string) => (unit === "month" ? monthLabel(`${k}-01`) : k);
  const waves = [...new Set(dated.map((p) => keyOf(p.listed!)))].sort().map((k) => {
    const items = dated.filter((p) => keyOf(p.listed!) === k).sort((a, b) => b.revenue - a.revenue);
    return { k, items, revenue: items.reduce((t, p) => t + p.revenue, 0) };
  });
  const total = products.reduce((t, p) => t + p.revenue, 0);
  const first = waves[0]!;
  const years = [...new Set(dated.map((p) => p.listed!.slice(0, 4)))].sort();
  const max = Math.max(...waves.map((w) => w.revenue), 1);
  return (
    <Card title="Catalog growth" right={<span className="text-xs text-[color:var(--muted-foreground)]">when each listing went live on Amazon · what it earns a month today</span>}>
      <p className="m-0 mb-4 text-sm">
        {dated.length} listings launched {years.length > 1 ? `between ${years[0]} and ${years[years.length - 1]}` : `in ${years[0]}`}
        {" — "}
        {years.map((y) => `${dated.filter((p) => p.listed!.startsWith(y)).length} in ${y}`).join(", ")}.
        {total > 0 && <> The first {first.items.length === 1 ? "listing" : "wave"} ({labelOf(first.k)}) still makes <strong>{Math.round((first.revenue / total) * 100)}%</strong> of revenue.</>}
        {dated.length < products.length && <span className="text-[color:var(--muted-foreground)]"> {products.length - dated.length} without a launch date.</span>}
      </p>
      <div className="space-y-2.5">
        {waves.map((w) => (
          <div key={w.k} className="grid grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,32%)_6.5rem] items-center gap-3 text-sm">
            <span className="font-semibold">{labelOf(w.k)}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span className="flex shrink-0 -space-x-2">
                {w.items.slice(0, 5).map((p) => (
                  <span key={p.asin ?? p.name} title={p.name} className="h-8 w-8 overflow-hidden rounded-md border border-[color:var(--border)] bg-white">
                    {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />}
                  </span>
                ))}
              </span>
              <span className="truncate text-[color:var(--muted-foreground)]">
                {w.items.length === 1 ? w.items[0]!.name : `${w.items.length} listings`}
              </span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
              <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${(w.revenue / max) * 100}%` }} />
            </span>
            <span className="text-right tabular-nums">
              <span className="font-semibold">{money(w.revenue, currency)}</span>
              {total > 0 && <span className="text-[color:var(--muted-foreground)]"> · {Math.round((w.revenue / total) * 100)}%</span>}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const quarterOf = (d: string) => `Q${Math.floor((Number(d.slice(5, 7)) - 1) / 3) + 1} ${d.slice(0, 4)}`;

// ─── Ratings & reviews ───────────────────────────────────────────────

/** A rating change worth naming: 0.2 stars or more, on 20+ ratings at both ends. */
const ratingMove = (now: number | null, then: number | null, countThen: number | null, countNow: number | null) =>
  now !== null && then !== null && (countThen ?? 0) >= 20 && (countNow ?? 0) >= 20 ? Math.round((now - then) * 10) / 10 : null;

/** Amazon's AI review themes for one listing, as small labels: green mostly
 *  positive, grey mixed, red mostly negative, each with how many reviews
 *  mention it. */
const THEME_TONE: Record<string, string> = {
  POSITIVE: "bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[color:var(--success)]",
  NEGATIVE: "bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[color:var(--danger)]",
  MIXED: "bg-[var(--muted)] text-[color:var(--muted-foreground)]",
};
function ThemeLabels({ themes }: { themes: CustomersSay["listings"][number]["themes"] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {themes.map((t) => (
        <span
          key={t.name}
          title={`${t.mentions ?? "Some"} reviews mention ${t.name.toLowerCase()} — ${t.sentiment.toLowerCase()}`}
          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${THEME_TONE[t.sentiment] ?? THEME_TONE.MIXED}`}
        >
          {t.name}{t.mentions !== null && <span className="opacity-70"> · {t.mentions}</span>}
        </span>
      ))}
    </span>
  );
}

function RatingsReviews({ reviews: r, products, say }: { reviews: Reviews; products: Product[]; say?: CustomersSay | null }) {
  const byAsin = new Map(r.listings.map((l) => [l.asin, l]));
  // Amazon's review summary per listing, opened under its row on click.
  const sayByAsin = new Map((say?.listings ?? []).filter((x) => x.summary || x.themes.length).map((x) => [x.asin, x]));
  // Every summary starts open; the header button shows or hides them all.
  const [open, setOpen] = useState<Set<string>>(() => new Set(sayByAsin.keys()));
  const toggle = (asin: string) => setOpen((o) => { const n = new Set(o); if (n.has(asin)) n.delete(asin); else n.add(asin); return n; });
  const allOpen = sayByAsin.size > 0 && [...sayByAsin.keys()].every((a) => open.has(a));
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(sayByAsin.keys()));  const rows = [...products].sort((a, b) => b.revenue - a.revenue).flatMap((p) => {
    const l = p.asin ? byAsin.get(p.asin) : undefined;
    return l ? [{ p, l }] : [];
  });
  const fastest = rows
    .filter(({ l }) => l.milestones[100])
    .sort((a, b) => a.l.milestones[100]!.days - b.l.milestones[100]!.days)[0];
  const solidYearAgo = r.brand.ratingYearAgo !== null && r.brand.reviewsYearAgo >= 25;
  // The biggest reset, for the rating tile: what the count stood at before it.
  const reset = [...r.brand.resets].sort((a, b) => b.countBefore - a.countBefore)[0];

  const tiles = [
    {
      label: "Rating now",
      value: r.brand.ratingNow === null ? "—" : `★ ${r.brand.ratingNow.toFixed(1)}`,
      sub: reset?.ratingBefore
        ? `${reset.ratingBefore.toFixed(1)} on ${reset.countBefore} ratings before Amazon reset the count, ${monthLabel(reset.on)}`
        : solidYearAgo
          ? `${r.brand.ratingYearAgo!.toFixed(1)} a year ago, on ${r.brand.reviewsYearAgo} ratings`
          : "Across the listings, weighted by their ratings",
    },
    { label: "Ratings", value: compact(r.brand.reviewsNow), sub: `+${compact(r.brand.perMonth90)} a month, last 90 days` },
    {
      label: "Ratings per 100 sold",
      value: r.brand.per100Sold === null ? "—" : r.brand.per100Sold.toFixed(1),
      sub: "New ratings a month for every 100 units sold — 1–2 is the common rule of thumb",
    },
    fastest
      ? {
          label: "Fastest to 100 ratings",
          value: `${fastest.l.milestones[100]!.days} days`,
          sub: `${fastest.p.name}, ${fastest.l.milestones.afterReset ? `restarting after the ${monthLabel(fastest.l.milestones.afterReset)} reset` : "from its first rating"}`,
        }
      : { label: "Rated listings", value: String(rows.filter(({ l }) => l.reviewsNow).length), sub: `of ${rows.length} listings` },
  ];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{t.label}</div>
            <div className="mt-1 text-2xl font-bold tracking-tight">{t.value}</div>
            <div className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{t.sub}</div>
          </div>
        ))}
      </div>

      <RatingChart reviews={r} products={products} />

      <Card
        title="By product"
        right={
          <span className="flex flex-wrap items-center gap-3">
            {sayByAsin.size > 0 && (
              <button
                type="button"
                onClick={toggleAll}
                aria-pressed={allOpen}
                className={`inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--accent)] px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors ${
                  allOpen
                    ? "bg-[var(--accent-tint)] text-[color:var(--accent)] hover:bg-[var(--card)]"
                    : "bg-[var(--accent)] text-white hover:opacity-90"
                }`}
              >
                <span aria-hidden="true" className="text-[10px]">{allOpen ? "▾" : "▸"}</span>
                {allOpen ? "Hide AI summaries" : "Show AI summaries"}
              </button>
            )}
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-sm">
            <thead>
              <tr className="text-xs text-[color:var(--muted-foreground)]">
                <th colSpan={7} />
                <th colSpan={3} className="whitespace-nowrap px-2 pt-1 text-center font-semibold">
                  <span className="block border-b border-[color:var(--border)] pb-1">Days from first rating to</span>
                </th>
                {sayByAsin.size > 0 && <th />}
              </tr>
              <tr className="text-xs text-[color:var(--muted-foreground)]">
                {["Product", "Rating", "90 days", "12 months", "Ratings", "A month", "Per 100 sold", "10", "50", "100"].map((c, i) => (
                  <th key={c} className={`whitespace-nowrap border-b border-[color:var(--border)] px-2 py-2 font-semibold ${i === 0 ? "text-left" : "text-right"} ${i >= 7 ? "w-16" : ""}`}>{c}</th>
                ))}
                {sayByAsin.size > 0 && <th className="whitespace-nowrap border-b border-[color:var(--border)] px-2 py-2 pl-4 text-left font-semibold">What buyers say</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ p, l }) => {
                // A change across a reset compares against the restarted count: not shown.
                const since = (days: number) => l.resets.some((x) => Date.parse(x.on) >= Date.parse(r.readAt) - days * 86400000);
                const m90 = since(90) ? "reset" as const : ratingMove(l.ratingNow, l.rating90Ago, l.count90Ago, l.reviewsNow);
                const m12 = since(365) ? "reset" as const : ratingMove(l.ratingNow, l.ratingYearAgo, l.countYearAgo, l.reviewsNow);
                const slipping = (typeof m90 === "number" && m90 <= -0.2) || (typeof m12 === "number" && m12 <= -0.2);
                const ms = l.milestones;
                const said = sayByAsin.get(l.asin);
                const isOpen = !!said && open.has(l.asin);
                const cols = 10 + (sayByAsin.size > 0 ? 1 : 0);
                return (
                  <Fragment key={l.asin}>
                  <tr
                    className={`hover:bg-[var(--surface)] ${said ? "cursor-pointer" : ""} ${isOpen ? "bg-[var(--surface)]" : ""}`}
                    onClick={said ? () => toggle(l.asin) : undefined}
                    aria-expanded={said ? isOpen : undefined}
                  >
                    <td className={`border-b border-[color:var(--border)] px-2 py-2.5`}>
                      <div className="flex min-w-[220px] items-center gap-3">
                        <span aria-hidden="true" className="w-3 shrink-0 text-xs text-[color:var(--muted-foreground)]">{said ? (isOpen ? "▾" : "▸") : ""}</span>
                        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-[color:var(--border)] bg-white">
                          {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-1 font-medium">{p.name}</span>
                          <span className="flex items-center gap-1.5">
                            <a href={`https://www.amazon.com/dp/${l.asin}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs text-[color:var(--muted-foreground)]">{l.asin} ↗</a>
                            {slipping && <span className="rounded bg-[#fee2e2] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#991b1b]">Slipping</span>}
                            {ms.afterReset && (
                              <span className="text-[11px] text-[#dc2626]" title={`Amazon reset its ratings on ${dayLabel(ms.afterReset)}; days are counted from the restart`}>
                                · counted from the {monthLabel(ms.afterReset)} reset
                              </span>
                            )}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right font-semibold tabular-nums">
                      {l.ratingNow === null ? "—" : <><span className="text-[#f59e0b]">★</span> {l.ratingNow.toFixed(1)}</>}
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right"><Move v={m90} /></td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right"><Move v={m12} /></td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right tabular-nums">{l.reviewsNow === null ? "—" : l.reviewsNow.toLocaleString("en-US")}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right tabular-nums">
                      {l.perMonth90 === null ? "—" : l.perMonth90 >= 1 ? `+${Math.round(l.perMonth90)}` : "<1"}
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right tabular-nums">{l.per100Sold === null ? "—" : l.per100Sold.toFixed(1)}</td>
                    {([10, 50, 100] as const).map((n) => (
                      <td key={n} className="border-b border-[color:var(--border)] px-2 py-2.5 text-right tabular-nums">
                        {ms.first === null ? (
                          <span className="text-[color:var(--muted-foreground)]" title="Its first ratings were not seen: Keepa began tracking late, or Amazon showed the family's ratings on it at first">—</span>
                        ) : ms[n] ? (
                          <span title={`${n} ratings on ${dayLabel(ms[n]!.on)} · first rating ${dayLabel(ms.first)}`}>{ms[n]!.days}d</span>
                        ) : (
                          <span className="text-[color:var(--muted-foreground)]" title="Not there yet">…</span>
                        )}
                      </td>
                    ))}
                    {sayByAsin.size > 0 && (
                      <td className={`border-b border-[color:var(--border)] px-2 py-2.5 pl-4`}>
                        {said ? <ThemeLabels themes={said.themes} /> : <span className="text-xs text-[color:var(--muted-foreground)]">—</span>}
                      </td>
                    )}
                  </tr>
                  {isOpen && said?.summary && (
                    <tr className="bg-[var(--surface)]">
                      <td colSpan={cols} className="border-b border-[color:var(--border)] px-2 pb-3.5 pl-[4.25rem] pt-0">
                        <p className="m-0 max-w-[56rem] text-[14px] leading-relaxed">“{said.summary}”</p>
                        <p className="m-0 mt-1 text-[11px] text-[color:var(--muted-foreground)]">Amazon’s AI summary of this listing’s reviews.</p>
                      </td>
                    </tr>
                  )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function Move({ v }: { v: number | "reset" | null }) {
  if (v === "reset") return <span className="text-xs text-[#dc2626]" title="Amazon reset this listing's ratings within the period">reset</span>;
  if (v === null) return <span className="text-[color:var(--muted-foreground)]">—</span>;
  if (v === 0) return <span className="tabular-nums text-[color:var(--muted-foreground)]">0.0</span>;
  return <span className={`font-semibold tabular-nums ${v > 0 ? "text-[#166534]" : "text-[#991b1b]"}`}>{v > 0 ? "+" : ""}{v.toFixed(1)}</span>;
}

/** The brand's rating at each month-end as a line, new ratings as bars under
 *  it, and a tick where listings launched. */
function RatingChart({ reviews: r, products }: { reviews: Reviews; products: Product[] }) {
  const resets = r.brand.resets;
  const ms = r.brand.months;
  const ratings = r.brand.ratingByMonth.slice(1); // month-ends matching the bars
  const W = 1160, H = 250, top = 16, barTop = 130, bottom = 222, left = 40, right = 10;
  const step = (W - left - right) / ms.length;
  const x = (i: number) => left + step * i + step / 2;
  const maxBar = Math.max(...ms.map((m) => m.gained ?? 0), 1);
  const rs = ratings.flatMap((m) => (m.rating === null ? [] : [m.rating]));
  const lo = Math.max(1, Math.floor((Math.min(...rs, 4.5) - 0.3) * 2) / 2), hi = 5;
  const y = (v: number) => top + ((hi - v) / (hi - lo)) * (barTop - 24 - top);
  // The line breaks where a month has no rating (before tracking, or a reset).
  const segments: string[] = [];
  let seg: string[] = [];
  ratings.forEach((m, i) => {
    if (m.rating === null) { if (seg.length) segments.push(seg.join(" ")); seg = []; }
    else seg.push(`${x(i)},${y(m.rating)}`);
  });
  if (seg.length) segments.push(seg.join(" "));
  const resetMarks = resets.flatMap((rs) => {
    const i = ms.findIndex((m) => rs.on.startsWith(m.month));
    return i >= 0 ? [{ i, rs }] : [];
  });
  const launches = ms.flatMap((m, i) => {
    const n = products.filter((p) => p.listed?.startsWith(m.month)).length;
    return n ? [{ i, n }] : [];
  });
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Card
      title="Rating and new ratings, month by month"
      right={
        <span className="flex items-center gap-3 text-xs text-[color:var(--muted-foreground)]">
          <span className="flex items-center gap-1"><span className="inline-block h-0 w-4 border-t-2 border-[#f59e0b]" /> rating</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-[var(--accent)] opacity-70" /> new ratings</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-0 border-l-2 border-dashed border-[#94a3b8]" /> launch</span>
          {resets.length > 0 && <span className="flex items-center gap-1"><span className="inline-block h-3 w-0 border-l-2 border-dashed border-[#dc2626]" /> reset</span>}
        </span>
      }
    >
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseLeave={() => setHover(null)}>
          {Array.from({ length: Math.round((hi - lo) / 0.5) + 1 }, (_, k) => hi - k * 0.5).map((v) => (
            <g key={v}>
              <line x1={left} x2={W - right} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeDasharray="3 3" />
              <text x={left - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="var(--muted-foreground)">★{v.toFixed(1)}</text>
            </g>
          ))}
          {launches.map(({ i, n }) => (
            <g key={i}>
              <line x1={x(i)} x2={x(i)} y1={top} y2={bottom} stroke="#94a3b8" strokeDasharray="4 3" />
              <text x={x(i) + 3} y={top + 8} fontSize="10" fill="var(--muted-foreground)">{n} new</text>
            </g>
          ))}
          {resetMarks.map(({ i }) => (
            <g key={`reset${i}`}>
              <line x1={x(i)} x2={x(i)} y1={top} y2={bottom} stroke="#dc2626" strokeDasharray="4 3" />
              <text x={x(i) + 3} y={top + 8} fontSize="10" fill="#dc2626">ratings reset</text>
            </g>
          ))}
          {ms.map((m, i) => {
            const h = (Math.max(m.gained ?? 0, 0) / maxBar) * (bottom - barTop);
            return (
              <g key={m.month} onMouseEnter={() => setHover(i)}>
                <rect x={left + step * i} y={top} width={step} height={bottom - top} fill="transparent" />
                <rect x={x(i) - step * 0.32} y={bottom - h} width={step * 0.64} height={h} rx="2" fill="var(--accent)" opacity={hover === i ? 1 : 0.7} />
                <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
                  {i % 2 === (ms.length - 1) % 2 ? monthLabel(`${m.month}-01`).slice(0, 3) : ""}
                </text>
              </g>
            );
          })}
          {segments.map((pts) => <polyline key={pts} points={pts} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />)}
          {ratings.map((m, i) => (m.rating === null ? null : <circle key={m.month} cx={x(i)} cy={y(m.rating)} r={hover === i ? 4.5 : 3} fill="#f59e0b" />))}
        </svg>
        {hover !== null && (
          <div className="pointer-events-none absolute top-0 rounded-md bg-[var(--foreground)] px-2 py-1 text-xs text-white shadow" style={{ left: `${(x(hover) / W) * 100}%`, transform: "translateX(-50%)" }}>
            {monthLabel(`${ms[hover]!.month}-01`)}: {ratings[hover]?.rating !== null && ratings[hover]?.rating !== undefined ? `★ ${ratings[hover]!.rating!.toFixed(1)} · ` : ""}
            {ms[hover]!.gained === null
              ? resetMarks.some((m) => m.i === hover) ? "ratings reset this month" : "not tracked yet"
              : `${ms[hover]!.gained! >= 0 ? "+" : ""}${ms[hover]!.gained!.toLocaleString("en-US")} ratings`}
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Amazon Ads ──────────────────────────────────────────────────────

function Ads({ b, series, ads, shade, strategy, capture }: {
  b: BusinessDetail; series: MetricsResponse | null; ads: AdSpendModule | null; shade: number | null;
  /** Who shows up when people search for the brand by name. */
  capture?: Capture | null;
  /** The case study's own "Advertising strategy" block — its text, unchanged. */
  strategy?: Extract<Block, { type: "strategy" }>;
}) {
  const s = useSeries(series);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"Spend" | "Searches" | "CPC">("Spend");
  const [showAllAds, setShowAllAds] = useState(false);

  if (!ads?.AD_SPEND) {
    return <div data-empty>No Amazon ad reading for this brand yet.</div>;
  }
  const spend = ads.AD_SPEND;
  const adKeywords = ads.AD_KEYWORDS ?? [];
  const total = ads.AD_KEYWORDS_TOTAL ?? adKeywords.reduce((t, r) => t + num(r[5]!), 0);
  const topBySpend = [...adKeywords].sort((a, c) => num(c[5]!) - num(a[5]!)).slice(0, 5);
  const sortIdx = sort === "Spend" ? 5 : sort === "Searches" ? 2 : 4;
  const filtered = adKeywords
    .filter((r) => r[0]!.toLowerCase().includes(query.toLowerCase()))
    .sort((a, c) => num(c[sortIdx]!) - num(a[sortIdx]!));
  const fmt = (n: number) => money(n, b.currency);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="Strategy">
          {strategy ? (
            <button
              type="button"
              onClick={() => document.getElementById("ad-strategy")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="group block text-left"
            >
              <span className="block text-2xl font-bold group-hover:text-[color:var(--accent)]">{spend.strategy}</span>
              <span className="mt-1 block text-xs font-medium text-[color:var(--accent)]">What this means ↓</span>
            </button>
          ) : (
            <div className="text-2xl font-bold">{spend.strategy}</div>
          )}
          <p className="m-0 mt-1 text-xs text-[color:var(--muted-foreground)]">Read {monthLabel(`${spend.month}-01`)}</p>
        </Card>
        <Card title="Est. ad spend / mo">
          <div className="text-2xl font-bold">{money(spend.monthlyUsd.central, b.currency)}</div>
          <p className="m-0 mt-1 text-xs text-[color:var(--muted-foreground)]">Band {money(spend.monthlyUsd.low)} – {money(spend.monthlyUsd.high)} · modelled</p>
        </Card>
        <Card title="Share of revenue">
          <div className="text-2xl font-bold">{spend.ratePct.central.toFixed(1)}%</div>
          <p className="m-0 mt-1 text-xs text-[color:var(--muted-foreground)]">{spend.ratePct.low.toFixed(1)}% – {spend.ratePct.high.toFixed(1)}% of monthly revenue</p>
        </Card>
        <Card title="Keywords with ads">
          <div className="text-2xl font-bold">{adKeywords.length}</div>
          <p className="m-0 mt-1 text-xs text-[color:var(--muted-foreground)]">{ads.TOP_KEYWORDS?.length ?? 0} ranked organically</p>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <MetricCard
          shade={shade}
          metrics={[
            { id: "spend", label: "Historic ad spend", value: fmt(spend.monthlyUsd.central), delta: deltaOf(s.adSpend), points: s.adSpend, color: "var(--series-ads)", format: fmt, labels: false, foot: ["Placements counted", "Sponsored Products · Sponsored Brands, page one"] },
            { id: "tacos", label: "Share of revenue", value: s.tacos.length ? pct(s.tacos.at(-1)!.value) : "—", delta: null, points: s.tacos, color: "var(--series-ads)", format: pct, labels: false, foot: ["TACoS", "Ad spend ÷ total revenue, each month"] },
          ]}
        />
        <Card title="Top keywords by spend" right={<span className="text-xs text-[color:var(--muted-foreground)]">{money(total)}/mo</span>}>
          <ul className="m-0 list-none space-y-2 p-0">
            {topBySpend.map((r) => {
              const share = total ? (num(r[5]!) / total) * 100 : 0;
              return (
                <li key={r[0]} className="relative overflow-hidden rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm">
                  <span className="absolute inset-y-0 left-0 bg-[var(--accent-tint)]" style={{ width: `${share}%` }} />
                  <span className="relative flex items-center gap-2">
                    <span className="truncate">{r[0]}</span>
                    <span className="ml-auto shrink-0 tabular-nums">{r[5]}</span>
                    <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-[color:var(--accent)]">{Math.round(share)}%</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card title={<span className="flex items-center gap-2">Ad library <span className="rounded-md bg-[var(--foreground)] px-2 py-0.5 text-xs font-bold text-white">{adKeywords.length}</span></span>}>
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg bg-[var(--surface)] p-2.5">
          <span className="text-xs font-medium text-[color:var(--muted-foreground)]">Filter by:</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Keyword search…"
            className="min-w-[200px] flex-1 rounded-lg border border-[color:var(--border)] bg-white px-3 py-1.5 text-sm"
          />
          <span className="text-xs text-[color:var(--muted-foreground)]">Sort</span>
          <Segmented value={sort} options={["Spend", "Searches", "CPC"]} onChange={setSort} />
        </div>
        <KeywordTable
          columns={["Keyword", "Product", "Searches/mo", "Their share of ads", "CPC", "Spend/mo"]}
          rows={showAllAds || query ? filtered : filtered.slice(0, 15)}
          shareCol={3}
        />
        {!query && filtered.length > 15 && (
          <button type="button" onClick={() => setShowAllAds(!showAllAds)} className="mt-3 w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium">
            {showAllAds ? "Show less" : `View all ${filtered.length} keywords`}
          </button>
        )}
        <p className="m-0 mt-3 text-xs text-[color:var(--muted-foreground)]">
          Spend is modelled from search volume × their share of the ads seen × cost per click. Amazon publishes no ad library, so every figure here is an estimate.
        </p>
      </Card>

      {capture && capture.keywords.length > 0 && (
        <Card
          title={`When people search for ${b.name} by name`}
          right={<span className="text-xs text-[color:var(--muted-foreground)]">Amazon pages 1–3, organic and sponsored</span>}
        >
          {(() => {
            const top = [...capture.keywords].sort((x, y) => (y.searches ?? 0) - (x.searches ?? 0))[0]!;
            return (
              <div className="mb-4">
                <p className="m-0 text-[15px] leading-relaxed">
                  On “{top.keyword}”, {b.name} has <strong>{top.own.listings} of the {top.listings ?? "—"} listings</strong> on Amazon’s first three pages
                  ({top.own.listingsPct}%) — but they sit at the top, so they take <strong>{top.own.combinedPct}% of the visibility</strong>.
                </p>
                <p className="m-0 mt-1 text-xs text-[color:var(--muted-foreground)]">
                  Visibility weights every listing by its position, organic and sponsored alike: the first result counts many times more than one on page three,
                  because that is where shoppers look.
                  {capture.poachers.length > 0 ? ` ${capture.poachers.length} other brands buy ads on these searches.` : ""}
                </p>
              </div>
            );
          })()}
          <div className="space-y-4">
            {capture.keywords.map((k) => {
              const own = k.own.combinedPct ?? 0;
              const shown = k.others.reduce((t, o) => t + (o.combinedPct ?? 0), 0);
              return (
                <div key={k.keyword}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                    <span className="truncate font-medium">“{k.keyword}”</span>
                    <span className="shrink-0 text-xs text-[color:var(--muted-foreground)]">
                      {k.searches !== null ? `${compact(k.searches)} searches a month · ` : ""}
                      {k.own.listings} of {k.listings ?? "—"} listings are theirs ({k.own.organicListings} organic, {k.own.sponsoredListings} ads)
                    </span>
                  </div>
                  <div className="flex h-3 overflow-hidden rounded-full bg-[var(--muted)]">
                    <span className="bg-[var(--accent)]" style={{ width: `${own}%` }} title={`${b.name}: ${own}% (organic ${k.own.organicPct}%, sponsored ${k.own.sponsoredPct}%)`} />
                    <span className="bg-[#f59e0b]" style={{ width: `${shown}%` }} title="The other brands listed" />
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span><strong className="text-[color:var(--accent)]">{b.name} {own}% of visibility</strong></span>
                    {k.others.map((o) => (
                      <span key={o.brand} className="text-[color:var(--muted-foreground)]">
                        {o.brand} <strong className="text-[color:var(--foreground)]">{o.combinedPct}%</strong>{" "}
                        <span className={`rounded px-1 py-px text-[10px] font-semibold ${o.how === "organic" ? "bg-[var(--surface)]" : "bg-[#fef3c7] text-[#92400e]"}`}>
                          {o.how === "organic" ? "ranks" : o.how === "ads" ? "buys ads" : "ranks + ads"}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </Card>
      )}

      {strategy && (
        <section id="ad-strategy" className="scroll-mt-4 rounded-xl border border-[color:color-mix(in_srgb,var(--accent)_18%,white)] bg-[color-mix(in_srgb,var(--accent)_4%,white)] p-4 sm:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--accent)]">Advertising strategy</div>
          <h2 className="m-0 mt-1 text-lg font-bold">{strategy.label}</h2>
          <ul className="m-0 mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-[color:var(--accent)]">
            {strategy.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}
    </>
  );
}

function Keywords({ ads }: { ads: AdSpendModule | null }) {
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const organic = (ads?.TOP_KEYWORDS ?? []).filter((r) => r[0]!.toLowerCase().includes(query.toLowerCase()));
  if (!ads?.TOP_KEYWORDS?.length) return <div data-empty>No keyword reading for this brand yet.</div>;
  return (
    <Card title="Keywords they rank for" right={<span className="text-xs text-[color:var(--muted-foreground)]">Organic top 60 or an ad</span>}>
      <div className="mb-3 rounded-lg bg-[var(--surface)] p-2.5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keyword search…"
          className="w-full rounded-lg border border-[color:var(--border)] bg-white px-3 py-1.5 text-sm"
        />
      </div>
      <KeywordTable
        columns={["Keyword", "Searches/mo", "Best organic", "Best ad", "Suggested bid", "Spend/mo"]}
        rows={showAll || query ? organic : organic.slice(0, 20)}
      />
      {!query && organic.length > 20 && (
        <button type="button" onClick={() => setShowAll(!showAll)} className="mt-3 w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium">
          {showAll ? "Show less" : `View all ${organic.length} keywords`}
        </button>
      )}
    </Card>
  );
}

function KeywordTable({ columns, rows, shareCol }: { columns: string[]; rows: string[][]; shareCol?: number }) {
  if (rows.length === 0) return <div data-empty>No keywords match.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c} className={`border-b border-[color:var(--border)] px-2 py-2 text-xs font-semibold text-[color:var(--muted-foreground)] ${i === 0 || i === 1 ? "text-left" : "text-right"}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("|")} className="hover:bg-[var(--surface)]">
              {r.map((cell, i) => (
                <td key={i} className={`border-b border-[color:var(--border)] px-2 py-2 ${i === 0 ? "font-medium" : ""} ${i === 0 || i === 1 ? "text-left" : "text-right tabular-nums"}`}>
                  {i === shareCol ? <ShareBar text={cell} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShareBar({ text }: { text: string }) {
  const pctv = text.startsWith("under") ? 0.5 : num(text);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--muted)]">
        <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${Math.min(pctv, 100)}%` }} />
      </span>
      <span className="w-28 whitespace-nowrap text-right">{text}</span>
    </span>
  );
}

// ─── Deals & coupons ─────────────────────────────────────────────────

/** One listing's price over the year as a step line, with its discount
 *  stretches shaded and lightning deals marked. */
function PriceTrack({ l, currency }: { l: Promotions["listings"][number]; currency: string }) {
  const [ref, measured] = useWidth<HTMLDivElement>();
  const W = measured || 640, H = 150, P = { t: 12, r: 12, b: 24, l: 52 };
  const pts = l.weekly.filter(([, v]) => v !== null) as Array<[string, number]>;
  if (pts.length < 2) return <div ref={ref} className="text-xs text-[color:var(--muted-foreground)]">No price history.</div>;
  const t0 = Date.parse(l.weekly[0]![0]), t1 = Date.parse(l.weekly.at(-1)![0]);
  const max = Math.max(...pts.map(([, v]) => v), l.usualPrice ?? 0) * 1.12, min = 0;
  const x = (d: string) => P.l + ((Date.parse(d) - t0) / (t1 - t0 || 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (H - P.t - P.b) * (1 - (v - min) / (max - min));
  const step = pts.map(([d, v], i) => (i ? `H${x(d).toFixed(1)}V${y(v).toFixed(1)}` : `M${x(d).toFixed(1)},${y(v).toFixed(1)}`)).join("");
  const months = l.weekly.filter(([d], i) => i === 0 || d.slice(0, 7) !== l.weekly[i - 1]![0].slice(0, 7));
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} className="block">
        {l.stretches.map(([a, b]) => (
          <rect key={a} x={x(a)} y={P.t} width={Math.max(2, x(b) - x(a))} height={H - P.t - P.b} fill="#dc2626" opacity="0.1" />
        ))}
        {l.usualPrice !== null && (
          <g>
            <line x1={P.l} x2={W - P.r} y1={y(l.usualPrice)} y2={y(l.usualPrice)} stroke="#94a3b8" strokeDasharray="4 4" />
            <text x={P.l - 8} y={y(l.usualPrice) + 4} textAnchor="end" fontSize="11" fill="var(--muted-foreground)">{price(l.usualPrice, currency)}</text>
          </g>
        )}
        {l.lowestPrice !== null && l.lowestPrice < (l.usualPrice ?? Infinity) && (
          <text x={P.l - 8} y={y(l.lowestPrice) + 4} textAnchor="end" fontSize="11" fill="#dc2626">{price(l.lowestPrice, currency)}</text>
        )}
        <path d={step} fill="none" stroke="var(--accent)" strokeWidth="2" />
        {l.lightningDealDays.map((d) => (
          <circle key={d} cx={x(d)} cy={P.t + 4} r="4" fill="#f59e0b"><title>{`Lightning deal ${d}`}</title></circle>
        ))}
        {months.filter((_, i) => i % 2 === 0).map(([d]) => (
          <text key={d} x={x(d)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">{monthShort(d.slice(0, 7))}</text>
        ))}
      </svg>
    </div>
  );
}

function Deals({ promo, currency }: { promo: Promotions; currency: string }) {
  const L = promo.listings;
  const now = {
    coupons: L.filter((l) => l.now.coupon || l.now.subscribeAndSaveCoupon).length,
    prime: L.filter((l) => l.now.primeExclusive).length,
    lightning: L.reduce((t, l) => t + l.lightningDealDays.length, 0),
    markdown: L.filter((l) => l.now.listPriceSaving),
  };
  const discounters = L.filter((l) => (l.discountedPct ?? 0) > 0);
  const byRevenue = [...L].sort((a, b) => b.revenue - a.revenue);
  const hero = byRevenue[0];
  const tactic =
    now.coupons === 0 && now.prime === 0 && now.lightning === 0 && discounters.length > 0
      ? "Price cuts, not coupons"
      : now.coupons > 0
        ? "Coupons"
        : discounters.length === 0
          ? "Full price, all year"
          : "A mix of deals";
  return (
    <>
      <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">How it discounts</div>
        <h2 className="m-0 mt-1 text-xl font-bold">{tactic}</h2>
        <p className="m-0 mt-1 text-sm text-[color:var(--muted-foreground)]">
          {discounters.length} of {L.length} listings were cut 10% or more below their usual price at some point in the last year
          {hero && (hero.discountedPct ?? 0) > 0 ? ` — the best seller on ${hero.discountedPct}% of days, as deep as −${hero.deepestPct}%` : ""}.
          {now.coupons === 0 ? " No coupons" : ` ${now.coupons} coupon${now.coupons === 1 ? "" : "s"} running`}
          {now.prime === 0 ? ", no Prime-exclusive prices" : `, ${now.prime} Prime-exclusive`}
          {now.lightning === 0 ? " and no lightning deals." : ` and ${now.lightning} lightning-deal day${now.lightning === 1 ? "" : "s"}.`}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[
            { label: "Marked down now", value: `${now.markdown.length} of ${L.length}`, sub: now.markdown[0]?.now.listPriceSaving ? `shown as −${now.markdown[0].now.listPriceSaving.pct}% vs list price` : "listings" },
            { label: "Coupons now", value: String(now.coupons), sub: "clip-to-save on the listing" },
            { label: "Prime-exclusive", value: String(now.prime), sub: "member-only prices now" },
            { label: "Lightning deals", value: String(now.lightning), sub: "days in the last year" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[color:var(--border)] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{k.label}</div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{k.value}</div>
              <div className="text-xs text-[color:var(--muted-foreground)]">{k.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <Card title="Price over the last year" right={<span className="flex items-center gap-3 text-xs text-[color:var(--muted-foreground)]"><span className="inline-block h-3 w-3 rounded-sm bg-[#dc2626]/15" /> 10%+ below usual <span className="inline-block h-0 w-4 border-t-2 border-dashed border-[#94a3b8]" /> usual price</span>}>
        <div className="divide-y divide-[color:var(--border)]">
          {byRevenue.map((l) => (
            <div key={l.asin} className="grid gap-4 py-4 first:pt-0 last:pb-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div className="min-w-0">
                <div className="truncate font-semibold">{l.name}</div>
                <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
                  {promoLabel(l.now) && <span className="rounded-md bg-[#dc2626] px-1.5 py-0.5 font-bold text-white">{promoLabel(l.now)} now</span>}
                  <span className="rounded-md bg-[var(--surface)] px-2 py-0.5">Usual {l.usualPrice !== null ? price(l.usualPrice, currency) : "—"}</span>
                  {(l.deepestPct ?? 0) > 0 && (
                    <span className="rounded-md bg-[#fee2e2] px-2 py-0.5 text-[#991b1b]">
                      Low {price(l.lowestPrice!, currency)} · −{l.deepestPct}%{l.lowestAt ? ` · ${dayLabel(l.lowestAt)}` : ""}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-xs text-[color:var(--muted-foreground)]">
                  {(l.discountedPct ?? 0) > 0 ? `Discounted on ${l.discountedPct}% of days, in ${l.stretches.length} stretch${l.stretches.length === 1 ? "" : "es"}` : "Full price all year"}
                </div>
              </div>
              <PriceTrack l={l} currency={currency} />
            </div>
          ))}
        </div>
      </Card>

    </>
  );
}

// ─── Store health ────────────────────────────────────────────────────

const MARKET_FLAG: Record<string, string> = { us: "US", uk: "GB", de: "DE", fr: "FR", jp: "JP", ca: "CA", it: "IT", es: "ES", in: "IN", mx: "MX" };
const flagEmoji = (cc: string) => String.fromCodePoint(...[...cc].map((c) => 0x1f1a5 + c.charCodeAt(0)));

function StoreHealth({ health: h, currency, signals, reviews, products }: { health: Health; currency: string; signals: Signals | null; reviews: Reviews | null; products: Product[] }) {
  const units = h.marketplaces.reduce((t, m) => t + m.monthlyUnits, 0);
  const tiles: Array<{ label: string; value: string; sub: string }> = [
    { label: "Listings tracked", value: String(h.listings), sub: "The products on this page" },
    {
      label: "Fulfilled by Amazon",
      value: h.fbaRevenuePct === null ? "—" : `${Math.round(h.fbaRevenuePct)}%`,
      sub: `of revenue · ${h.fbaListings} of ${h.buyBoxListings ?? h.listings} ${h.buyBoxListings !== undefined && h.buyBoxListings < h.listings ? "top listings" : "listings"}; the rest the seller ships itself`,
    },
    { label: "Average price", value: h.avgPrice === null ? "—" : price(h.avgPrice, currency), sub: "Buy Box price, across the listings" },
    {
      label: "Reviews",
      value: h.totalReviews === null ? "—" : compact(h.totalReviews),
      sub: !reviews
        ? "Ratings across the listings"
        : `+${compact(reviews.brand.perMonth90)} a month, last 90 days` +
          (reviews.brand.resets.length
            ? ` · Amazon reset the count in ${monthLabel(reviews.brand.resets[0]!.on)}`
            : reviews.brand.ratingNow !== null && reviews.brand.ratingYearAgo !== null && reviews.brand.reviewsYearAgo >= 25
              ? ` · ★ ${reviews.brand.ratingYearAgo.toFixed(1)} a year ago, ${reviews.brand.ratingNow.toFixed(1)} now`
              : ""),
    },
    { label: "Buy Box win rate", value: h.buyBoxWinPct === null ? "—" : `${Math.round(h.buyBoxWinPct)}%`, sub: "How often the leading seller holds it, last 90 days" },
    {
      label: "Amazon in stock",
      value: h.amazonInStockPct === null ? "—" : `${Math.round(h.amazonInStockPct)}%`,
      sub: h.amazonInStockPct === 0 ? "Amazon itself does not sell these listings" : "How often Amazon itself has stock, last 90 days",
    },
    { label: "Sellers per listing", value: h.avgSellers === null ? "—" : h.avgSellers.toFixed(1), sub: "Sellers that won the Buy Box, last 90 days" },
    ...(signals
      ? [
          {
            label: "In stock",
            value: signals.brand.inStock90Pct === null ? "—" : `${signals.brand.inStock90Pct}%`,
            sub:
              signals.brand.listingsWithStockouts90 > 0
                ? `last 90 days, by revenue · ${signals.brand.listingsWithStockouts90} listing${signals.brand.listingsWithStockouts90 === 1 ? "" : "s"} ran short`
                : "last 90 days, by revenue · no stock-outs",
          },
        ]
      : []),
  ];
  const statusChip = {
    selling: "bg-[#dcfce7] text-[#166534]",
    ranked: "bg-[#fef3c7] text-[#92400e]",
    listed: "bg-[var(--surface)] text-[color:var(--muted-foreground)]",
  } as const;
  const statusLabel = { selling: "Selling", ranked: "Listed, ranked", listed: "Listed, no sales" } as const;
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{t.label}</div>
            <div className="mt-1 text-2xl font-bold tracking-tight">{t.value}</div>
            <div className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{t.sub}</div>
          </div>
        ))}
      </div>

      {signals && <ListingQuality signals={signals} products={products} />}

      <Card
        title="Amazon marketplaces"
        right={
          <span className="text-xs text-[color:var(--muted-foreground)]">
            units a month from Amazon’s sold badges{h.marketsChecked !== undefined && h.marketsChecked < h.listings ? ` · the top ${h.marketsChecked} listings checked abroad` : ""}
          </span>
        }
      >
        <div className="space-y-2">
          {h.marketplaces
            .slice()
            .sort((a, c) => c.monthlyUnits - a.monthlyUnits || (a.bestRank ?? Infinity) - (c.bestRank ?? Infinity))
            .map((m) => (
              <div key={m.code} className="grid grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,30%)_6rem] items-center gap-3 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="text-base leading-none">{flagEmoji(MARKET_FLAG[m.code] ?? "US")}</span>
                  <span className="truncate font-medium">{m.host}</span>
                  <span className="text-xs text-[color:var(--muted-foreground)]">{m.listed} listed</span>
                </span>
                <span className={`w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold ${statusChip[m.status]}`}>{statusLabel[m.status]}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
                  <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${units ? (m.monthlyUnits / units) * 100 : 0}%` }} />
                </span>
                <span className="text-right tabular-nums text-[color:var(--muted-foreground)]">
                  {m.monthlyUnits > 0 ? `${compact(m.monthlyUnits)}+/mo` : m.bestRank ? `BSR #${compact(m.bestRank)}` : "—"}
                </span>
              </div>
            ))}
        </div>
        <p className="m-0 mt-3 text-xs text-[color:var(--muted-foreground)]">
          Amazon copies a listing into other countries’ stores on its own, so “listed” alone does not mean anyone sells there — the sold badge
          and the best-seller rank say whether it does.
        </p>
      </Card>

    </>
  );
}

/** A checklist rather than a score: what each listing carries, against the
 *  bar a well-built Amazon listing usually clears. */
function ListingQuality({ signals, products }: { signals: Signals; products: Product[] }) {
  const rows = [...products].sort((a, b) => b.revenue - a.revenue).flatMap((p) => {
    const s = p.asin ? signals.listings.find((l) => l.asin === p.asin) : undefined;
    return s ? [{ p, s }] : [];
  });
  const cols: Array<{ label: string; ok: (l: Signals["listings"][number]["listing"]) => boolean; show: (l: Signals["listings"][number]["listing"]) => string; tip: string }> = [
    { label: "Images", ok: (l) => l.images >= 7, show: (l) => String(l.images), tip: "7 or more" },
    { label: "Video", ok: (l) => l.brandVideos > 0, show: (l) => (l.brandVideos > 0 ? `${l.videos}` : l.videos ? `${l.videos}, none own` : "None"), tip: "One of the brand’s own" },
    { label: "A+ content", ok: (l) => l.aPlusModules > 0, show: (l) => (l.aPlusModules ? `${l.aPlusModules} modules` : "None"), tip: "Any" },
    { label: "Bullets", ok: (l) => l.bullets >= 5, show: (l) => String(l.bullets), tip: "5" },
    { label: "Title", ok: (l) => l.titleLength >= 60 && l.titleLength <= 200, show: (l) => `${l.titleLength} chars`, tip: "60–200 characters" },
    { label: "Brand store", ok: (l) => l.brandStore, show: (l) => (l.brandStore ? "Yes" : "No"), tip: "Linked" },
  ];
  const passed = rows.reduce((t, r) => t + cols.filter((c) => c.ok(r.s.listing)).length, 0);
  return (
    <Card title="Listing quality" right={<span className="text-xs text-[color:var(--muted-foreground)]">{passed} of {rows.length * cols.length} checks met</span>}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="text-xs text-[color:var(--muted-foreground)]">
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-left font-semibold">Listing</th>
              {cols.map((c) => (
                <th key={c.label} title={`Meets the bar at: ${c.tip}`} className="border-b border-[color:var(--border)] px-2 py-2 text-left font-semibold">{c.label}</th>
              ))}
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold">In stock, 90 days</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, s }) => (
              <tr key={p.asin}>
                <td className="max-w-[240px] truncate border-b border-[color:var(--border)] px-2 py-2 font-medium">{p.name}</td>
                {cols.map((c) => (
                  <td key={c.label} className="border-b border-[color:var(--border)] px-2 py-2">
                    <span className={`inline-flex items-center gap-1 ${c.ok(s.listing) ? "" : "text-[color:var(--danger)]"}`}>
                      <span aria-hidden="true">{c.ok(s.listing) ? "✓" : "✕"}</span> {c.show(s.listing)}
                    </span>
                  </td>
                ))}
                <td className={`border-b border-[color:var(--border)] px-2 py-2 text-right tabular-nums ${s.inStock90Pct !== null && s.inStock90Pct < 95 ? "font-semibold text-[color:var(--danger)]" : ""}`}>
                  {s.inStock90Pct === null ? "—" : `${s.inStock90Pct}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/** Who sells the brand's listings and how much of the Buy Box each holds —
 *  on the Brand owner tab, since it answers "who controls the shelf". */
function SellersCard({ health: h }: { health: Health }) {
  return (
    <Card title="Sellers" right={<span className="text-xs text-[color:var(--muted-foreground)]">share of the Buy Box, last 90 days, weighted by each listing’s revenue</span>}>
      <div className="divide-y divide-[color:var(--border)]">
        {h.sellers.map((sl) => (
          <div key={sl.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,32%)_4rem_6.5rem] items-center gap-3 py-3 text-sm first:pt-0 last:pb-0">
            <span className="min-w-0">
              {/* Amazon's own public seller profile: the record anyone can check. */}
              <a
                href={`https://www.amazon.com/sp?seller=${encodeURIComponent(sl.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate font-semibold text-[color:var(--accent)] underline decoration-[color:var(--accent)]/30 underline-offset-2 hover:decoration-[color:var(--accent)]"
              >
                {sl.name ?? sl.id} ↗
              </a>
              <span className="mt-0.5 block text-xs text-[color:var(--muted-foreground)]">
                Seller ID {sl.id} · {sl.listings} listing{sl.listings === 1 ? "" : "s"}
                {sl.country ? ` · ${sl.country}` : ""} ·{" "}
                <a href={`https://www.amazon.com/s?me=${encodeURIComponent(sl.id)}`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--muted-foreground)] underline underline-offset-2">
                  storefront
                </a>
              </span>
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-[var(--muted)]">
              <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${sl.buyBoxSharePct ?? 0}%` }} />
            </span>
            <span className="text-right font-semibold tabular-nums">{sl.buyBoxSharePct === null ? "—" : `${Math.round(sl.buyBoxSharePct)}%`}</span>
            <span className={`w-fit justify-self-end whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${sl.fbaListings > 0 ? "bg-[var(--accent-tint)] text-[color:var(--accent)]" : "bg-[var(--surface)]"}`}>
              {sl.fbaListings === sl.listings ? "FBA" : sl.fbaListings === 0 ? "Ships itself" : `FBA on ${sl.fbaListings} of ${sl.listings}`}
            </span>
          </div>
        ))}
      </div>
      <p className="m-0 mt-3 text-xs text-[color:var(--muted-foreground)]">
        {h.sellers.length === 1
          ? "One seller on every listing: no resellers and no Amazon, so the brand controls its own shelf."
          : `${h.sellers.length} sellers have won the Buy Box on these listings in the last 90 days.`}
      </p>
    </Card>
  );
}

// ─── Niche trend ─────────────────────────────────────────────────────

const monthShort = (m: string) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
/** The latest three COMPLETE months against the same three a year earlier,
 *  percent. A month scaled up from a part-month reading is left out of the
 *  verdict: one estimate should not decide it. */
const yoy3 = (s: Array<[string, number]>, partial: string[] = []) => {
  let end = s.length;
  while (end > 0 && partial.includes(s[end - 1]![0])) end--;
  const a = s.slice(end - 3, end).reduce((t, [, v]) => t + v, 0);
  const b = s.slice(end - 15, end - 12).reduce((t, [, v]) => t + v, 0);
  return end >= 15 && b > 0 ? ((a - b) / b) * 100 : null;
};
/** The latest 12 months against the 12 before, percent. */
const yoy12 = (s: Array<[string, number]>) => {
  const a = s.slice(-12).reduce((t, [, v]) => t + v, 0);
  const b = s.slice(-24, -12).reduce((t, [, v]) => t + v, 0);
  return s.length >= 24 && b > 0 ? ((a - b) / b) * 100 : null;
};
const signed = (n: number | null) => (n === null ? "—" : `${n > 0 ? "+" : ""}${Math.round(n)}%`);
const toneFor = (n: number | null) => (n === null ? "" : n >= 10 ? "text-[color:var(--success)]" : n <= -10 ? "text-[color:var(--danger)]" : "");

/** Several monthly lines on one pixel-width chart; a dashed series is drawn
 *  thinner, a partial month as a hollow point. */
function MultiLine({ months, series, format, partial = [], height = 260 }: {
  months: string[];
  series: Array<{ label: string; color: string; values: number[]; dashed?: boolean }>;
  format: (n: number) => string;
  partial?: string[];
  height?: number;
}) {
  const [ref, measured] = useWidth<HTMLDivElement>();
  const W = measured || 640, H = height, P = { t: 16, r: 16, b: 28, l: 56 }, INSET = 20;
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const max = Math.max(1, ...series.flatMap((x) => x.values)) * 1.1;
  const x = (i: number) => P.l + INSET + (months.length === 1 ? 0 : (i / (months.length - 1)) * (iw - 2 * INSET));
  const y = (v: number) => P.t + ih - (v / max) * ih;
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} className="block">
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={y(t * max)} y2={y(t * max)} stroke="var(--border)" strokeDasharray={i ? "3 4" : undefined} />
            <text x={P.l - 10} y={y(t * max) + 4} textAnchor="end" fontSize="12" fill="var(--muted-foreground)">{format(t * max)}</text>
          </g>
        ))}
        {series.map((sr) => (
          <g key={sr.label}>
            <path
              d={sr.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("")}
              fill="none"
              stroke={sr.color}
              strokeWidth={sr.dashed ? 1.75 : 2.5}
              strokeDasharray={sr.dashed ? "5 4" : undefined}
              strokeLinejoin="round"
            />
            {!sr.dashed &&
              sr.values.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={partial.includes(months[i]!) ? "white" : sr.color} stroke={sr.color} strokeWidth="2">
                  <title>{`${monthShort(months[i]!)}: ${format(v)}${partial.includes(months[i]!) ? " (estimate, part month)" : ""}`}</title>
                </circle>
              ))}
          </g>
        ))}
        {months.map((m, i) => (
          <text key={m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">{monthShort(m)}</text>
        ))}
      </svg>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {series.map((sr) => (
          <span key={sr.label} className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5" style={{ background: sr.color, borderTop: sr.dashed ? `2px dashed ${sr.color}` : undefined, height: sr.dashed ? 0 : 3 }} />
            {sr.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Spark({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1), min = Math.min(...values, 0);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-7 w-24">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function NicheTrend({ niche, series, currency, subcats, brandName }: {
  niche: Niche; series: MetricsResponse | null; currency: string; subcats: Subcategories | null; brandName: string;
}) {
  const last12 = niche.months.slice(-12);
  const tail = (s: Array<[string, number]>) => s.slice(-12).map(([, v]) => v);
  const prior = (s: Array<[string, number]>) => s.slice(-24, -12).map(([, v]) => v);
  const amazon = yoy3(niche.demand, niche.partial), google = yoy3(niche.google, niche.partial), sales = yoy3(niche.sales.monthly, niche.partial);
  const amazonYear = yoy12(niche.demand);
  // Which three months the verdict compares, for the sentence under it.
  let vEnd = niche.demand.length;
  while (vEnd > 0 && niche.partial.includes(niche.demand[vEnd - 1]![0])) vEnd--;
  const span = `${monthShort(niche.demand[vEnd - 3]![0])}–${monthShort(niche.demand[vEnd - 1]![0])}`;
  const verdict = amazon === null ? null : amazon >= 10 ? "Growing" : amazon <= -10 ? "Shrinking" : "Flat";
  const verdictStyle = verdict === "Growing" ? "bg-[#dcfce7] text-[#166534]" : verdict === "Shrinking" ? "bg-[#fee2e2] text-[#991b1b]" : "bg-[var(--surface)] text-[color:var(--foreground)]";
  const agree = [amazon, google, sales].filter((n): n is number => n !== null);
  const mixed = agree.some((n) => n > 5) && agree.some((n) => n < -5);

  // Seasonality over the latest 12 months.
  const d12 = tail(niche.demand);
  const avg = d12.reduce((a, b) => a + b, 0) / d12.length;
  const peakI = d12.indexOf(Math.max(...d12));

  /* The brand's revenue per 1,000 searches in its niche, month by month — one
     line in money. Rising: the brand earns more from the same market, so it is
     gaining share; falling: losing it. Only months with both figures, and not
     a month the search reading only partly covers. */
  const brandRevenue = new Map(
    (series ? toChartPoints(series) : []).filter((p) => p.revenue != null).map((p) => [p.periodStart.slice(0, 7), Number(p.revenue)]),
  );
  const perK = last12
    .filter((m) => brandRevenue.has(m) && !niche.partial.includes(m))
    .map((m) => {
      const searches = niche.demand.find(([k]) => k === m)?.[1] ?? 0;
      return { m, v: searches > 0 ? (brandRevenue.get(m)! / searches) * 1000 : 0 };
    });
  const perKChange = perK.length >= 2 && perK[0]!.v > 0 ? ((perK.at(-1)!.v - perK[0]!.v) / perK[0]!.v) * 100 : null;
  const index = (vals: Array<number | null>) => {
    const base = vals.find((v) => v != null && v > 0);
    return base ? vals.map((v) => (v == null ? 0 : (v / base) * 100)) : null;
  };

  const movers = niche.keywords
    .map((k) => ({ ...k, total: tail(k.monthly).reduce((a, b) => a + b, 0), change: yoy3(k.monthly, niche.partial) }))
    .sort((a, b) => (b.change ?? -Infinity) - (a.change ?? -Infinity));

  return (
    <>
      {/* ── Verdict ── */}
      <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">Niche</div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h2 className="m-0 text-xl font-bold">{niche.name}</h2>
          {verdict && (
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${verdictStyle}`}>
              {verdict === "Growing" ? "↗" : verdict === "Shrinking" ? "↘" : "→"} {verdict} · {signed(amazon)} in {span}
            </span>
          )}
          {amazonYear !== null && (
            <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-sm font-semibold">Whole year: {signed(amazonYear)}</span>
          )}
        </div>
        <p className="m-0 mt-2 text-sm text-[color:var(--muted-foreground)]">
          Searches on Amazon in {span} against the same months a year earlier — the latest complete months, so a December peak is
          compared with last December. The whole-year figure sets the last 12 months against the 12 before.
          {mixed ? " The three signals below disagree, so read them together rather than any one alone." : ""}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Searches on Amazon", value: amazon, sub: `${niche.keywords.length} keywords, ${compact(d12.reduce((a, b) => a + b, 0))} searches in 12 months` },
            { label: "Interest on Google", value: google, sub: "The same keywords, Google Trends" },
            { label: "Niche best sellers’ sales", value: sales, sub: `Amazon’s top ${niche.sales.products} in ${niche.sales.category.name}, all brands — today’s winners traced back, so it leans upward` },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[color:var(--border)] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{k.label}</div>
              <div className={`mt-1 text-2xl font-bold tracking-tight ${toneFor(k.value)}`}>{signed(k.value)}</div>
              <div className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{k.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── This year against last ── */}
      <Card title="Searches on Amazon, this year against last" right={<span className="text-xs text-[color:var(--muted-foreground)]">a month, {niche.keywords.length} keywords</span>}>
        <MultiLine
          months={last12}
          partial={niche.partial}
          format={(n) => compact(n)}
          series={[
            { label: "Last 12 months", color: "var(--accent)", values: tail(niche.demand) },
            { label: "The 12 before", color: "#94a3b8", values: prior(niche.demand), dashed: true },
          ]}
        />
        {/* The gaps in percent: on a chart scaled to December, a quiet month's
            difference is a couple of pixels however large it is in share. */}
        <div className="mt-3 grid grid-cols-12 gap-1">
          {last12.map((m, i) => {
            const v = tail(niche.demand)[i]!, p = prior(niche.demand)[i]!;
            const ch = p > 0 ? ((v - p) / p) * 100 : null;
            const est = niche.partial.includes(m);
            return (
              <div key={m} className="text-center" title={`${monthShort(m)}: ${compact(v)} vs ${compact(p)} a year earlier${est ? " (estimate)" : ""}`}>
                <div className={`rounded-md py-1 text-xs font-semibold tabular-nums ${ch === null ? "" : ch >= 5 ? "bg-[#dcfce7] text-[#166534]" : ch <= -5 ? "bg-[#fee2e2] text-[#991b1b]" : "bg-[var(--surface)]"} ${est ? "opacity-60" : ""}`}>
                  {signed(ch)}{est ? "*" : ""}
                </div>
              </div>
            );
          })}
        </div>
        <p className="m-0 mt-2 text-xs text-[color:var(--muted-foreground)]">
          Each month against the same month a year earlier.
          {niche.partial.some((m) => last12.includes(m)) ? " * and hollow point: a month the latest reading only partly covers, scaled to the whole month." : ""}
        </p>
      </Card>

      {/* ── Seasonality ── */}
      <Card title="When people search">
        <div className="grid grid-cols-12 gap-1">
          {last12.map((m, i) => {
            const r = d12[i]! / avg;
            return (
              <div key={m} className="text-center">
                <div
                  className="h-10 rounded-md"
                  title={`${monthShort(m)}: ${compact(d12[i]!)} searches, ${r.toFixed(1)}× the average month`}
                  style={{ background: `color-mix(in srgb, var(--accent) ${Math.round(Math.min(1, r / 3) * 90) + 6}%, white)` }}
                />
                <div className="mt-1 text-[11px] text-[color:var(--muted-foreground)]">{monthShort(m)}</div>
              </div>
            );
          })}
        </div>
        <p className="m-0 mt-3 text-sm">
          Peaks in <strong>{monthShort(last12[peakI]!)}</strong> at <strong>{(d12[peakI]! / avg).toFixed(1)}×</strong> the average month.
          {(d12[peakI]! / avg) >= 2 ? ` Stock and listings need to be live by ${monthShort(last12[(peakI + 9) % 12]!)}.` : ""}
        </p>
      </Card>

      {/* ── Keyword movers ── */}
      <Card title="Keyword movers" right={<span className="text-xs text-[color:var(--muted-foreground)]">{span} vs the same months a year earlier</span>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-xs text-[color:var(--muted-foreground)]">
                {["Keyword", "Last 12 months", "Searches, 12 months", "Change"].map((c, i) => (
                  <th key={c} className={`border-b border-[color:var(--border)] px-2 py-2 font-semibold ${i === 0 ? "text-left" : "text-right"}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movers.map((k) => (
                <tr key={k.keyword}>
                  <td className="border-b border-[color:var(--border)] px-2 py-2 font-medium">
                    {k.keyword}
                    {k.change !== null && k.change >= 50 && <span className="ml-2 rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#166534]">Rising</span>}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-2 py-2 text-right">
                    <span className="inline-block"><Spark values={tail(k.monthly)} color={k.change !== null && k.change < 0 ? "#dc2626" : "#16a34a"} /></span>
                  </td>
                  <td className="border-b border-[color:var(--border)] px-2 py-2 text-right tabular-nums">{compact(k.total)}</td>
                  <td className={`border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold tabular-nums ${toneFor(k.change)}`}>{signed(k.change)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Three signals ── */}
      <Card title="Three signals, on one scale" right={<span className="text-xs text-[color:var(--muted-foreground)]">each line starts at 100</span>}>
        <MultiLine
          months={last12}
          partial={niche.partial}
          format={(n) => String(Math.round(n))}
          series={[
            { label: "Searches on Amazon", color: "var(--accent)", values: index(tail(niche.demand)) ?? [] },
            { label: "Interest on Google", color: "#0ea5e9", values: index(tail(niche.google)) ?? [] },
            { label: `Sales of the niche’s top ${niche.sales.products} (all brands)`, color: "#f59e0b", values: index(tail(niche.sales.monthly)) ?? [] },
          ]}
        />
      </Card>

      {/* ── Share of its subcategories ── */}
      {subcats?.categories.map((c) => {
        const delta = c.share && c.share.thenPct !== null ? c.share.pct - c.share.thenPct : null;
        const inLeaders = c.leaders.some((l) => l.own);
        const rows = inLeaders || !c.share ? c.leaders : [...c.leaders.slice(0, 5), { brand: brandName, own: true, products: c.share.products, monthlyRevenue: c.share.monthlyRevenue, sharePct: c.share.pct, shareThenPct: c.share.thenPct }];
        const max = Math.max(...rows.map((r) => r.sharePct), 1);
        return (
          <Card key={c.id} title={`Share of ${c.name}`} right={<span className="text-xs text-[color:var(--muted-foreground)]">top {c.products} best sellers · {money(c.topRevenue, currency)} a month · {c.brands} brands</span>}>
            {c.share ? (
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-bold tracking-tight">{c.share.pct}%</span>
                {delta !== null && (
                  <span className={`text-sm font-semibold ${delta > 0 ? "text-[color:var(--success)]" : delta < 0 ? "text-[color:var(--danger)]" : ""}`}>
                    {delta > 0 ? "+" : ""}{delta.toFixed(1)} pts vs 3 months ago
                  </span>
                )}
                <span className="text-sm text-[color:var(--muted-foreground)]">
                  #{c.share.rank} of {c.brands} brands · {c.share.products} product{c.share.products === 1 ? "" : "s"} in the top {c.products}
                </span>
              </div>
            ) : (
              <p className="m-0 mb-3 text-sm">None of {brandName}’s products is in the top {c.products} of this subcategory right now.</p>
            )}
            <div className="space-y-1.5">
              {rows.map((r, i) => (
                <div key={r.brand + i} className={`grid grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,38%)_9rem] items-center gap-3 rounded-md px-1.5 py-1 text-sm ${r.own ? "bg-[var(--accent-tint)]" : ""}`}>
                  <span className="text-right text-xs tabular-nums text-[color:var(--muted-foreground)]">{r.own && !inLeaders ? `#${c.share?.rank}` : i + 1}</span>
                  <span className={`truncate ${r.own ? "font-bold text-[color:var(--accent)]" : "font-medium"}`}>{r.own ? brandName : r.brand}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
                    <span className={`block h-full rounded-full ${r.own ? "bg-[var(--accent)]" : "bg-[#94a3b8]"}`} style={{ width: `${(r.sharePct / max) * 100}%` }} />
                  </span>
                  <span className="text-right tabular-nums">
                    <strong>{r.sharePct}%</strong>
                    {r.shareThenPct !== null && <span className="ml-1 text-xs text-[color:var(--muted-foreground)]">was {r.shareThenPct}%</span>}
                  </span>
                </div>
              ))}
            </div>
            <p className="m-0 mt-3 text-xs text-[color:var(--muted-foreground)]">
              Share of the revenue of the subcategory’s top {c.products} best sellers on Amazon — an estimate of the top, not of the whole subcategory. “Was”: the
              same products’ sold badges three months earlier.
            </p>
          </Card>
        );
      })}

      {/* ── Share of the niche, as money ── */}
      {perK.length >= 2 && (
        <Card
          title="Revenue per 1,000 searches in the niche"
          right={
            perKChange !== null && (
              <span className={`text-sm font-semibold ${toneFor(perKChange)}`}>
                {signed(perKChange)} since {monthShort(perK[0]!.m)}
              </span>
            )
          }
        >
          <MultiLine
            months={perK.map((x) => x.m)}
            format={(n) => money(n, currency)}
            series={[{ label: "The brand’s revenue for every 1,000 searches in its niche", color: "var(--series-revenue)", values: perK.map((x) => x.v) }]}
          />
          <p className="m-0 mt-2 text-xs text-[color:var(--muted-foreground)]">
            How much the brand earns from each 1,000 searches its niche gets on Amazon. Rising means it earns more from the same
            market — it is gaining share; falling means losing it.
          </p>
        </Card>
      )}

    </>
  );
}

// ─── Socials & traffic ───────────────────────────────────────────────

/** Each platform's own colour, for its card, its slice of the audience bar
 *  and its moments on the chart. Platforms not listed get no card. */
const SOCIAL_STYLE: Partial<Record<string, { color: string; tint: string; name: string }>> = {
  TIKTOK: { color: "#fe2c55", tint: "#fff0f3", name: "TikTok" },
  INSTAGRAM: { color: "#d62976", tint: "#fdf0f6", name: "Instagram" },
  YOUTUBE: { color: "#ff0000", tint: "#fff1f1", name: "YouTube" },
  FACEBOOK: { color: "#1877f2", tint: "#eef5ff", name: "Facebook" },
  X: { color: "#111111", tint: "#f3f3f3", name: "X" },
  PINTEREST: { color: "#e60023", tint: "#fff0f2", name: "Pinterest" },
  LINKEDIN: { color: "#0a66c2", tint: "#eef5fc", name: "LinkedIn" },
  REDDIT: { color: "#ff4500", tint: "#fff3ee", name: "Reddit" },
  WEBSITE: { color: "var(--accent)", tint: "var(--accent-tint)", name: "Website" },
};
/** Timeline tags that are about the audience rather than Amazon. */
const MOMENT_COLOR: Record<string, string> = { Brand: "#fe2c55", Web: "#0ea5e9", Advertising: "#f59e0b" };

/** Monthly site visits and where they come from — the shape Similarweb's
 *  total-traffic and traffic-sources endpoints return. */
type Traffic = {
  visits: Point[];
  /** Share of visits by channel, percent, summing to ~100. */
  sources?: Array<{ channel: string; pct: number }>;
  source?: string;
};

const SOURCE_COLORS: Record<string, string> = {
  Direct: "#6d5efc", Search: "#0ea5e9", Social: "#fe2c55", Referral: "#22c55e", "Paid search": "#f59e0b", Mail: "#94a3b8", Display: "#a855f7",
};

/** 🚨 NOT DATA. A made-up series to preview the card while the Similarweb key
 *  is renewed. Shown only on a dev build, under a "Sample data" banner. */
const SAMPLE_TRAFFIC: Traffic = {
  visits: [9.1, 10.4, 18.7, 24.9, 11.2, 9.8, 10.9, 12.6, 11.8, 13.4, 21.3, 12.9].map((k, i) => {
    const d = new Date(Date.UTC(2025, 9 + i, 1));
    return { date: d.toISOString().slice(0, 10), label: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }), value: Math.round(k * 1000) };
  }),
  sources: [
    { channel: "Direct", pct: 37 }, { channel: "Social", pct: 28 }, { channel: "Search", pct: 22 },
    { channel: "Referral", pct: 8 }, { channel: "Paid search", pct: 3 }, { channel: "Mail", pct: 2 },
  ],
  source: "Similarweb",
};

function WebsiteTrafficCard({ visits, sources, source, sample = false }: Traffic & { sample?: boolean }) {
  const last = visits.at(-1)?.value ?? 0;
  const prev = visits.at(-2)?.value ?? 0;
  const delta = prev ? ((last - prev) / prev) * 100 : null;
  const total = visits.reduce((t, p) => t + p.value, 0);
  const peak = visits.reduce((a, p) => (p.value > a.value ? p : a), visits[0]!);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          Website visits, last 12 months
          {sample && <span className="rounded-full bg-[#fef3c7] px-2 py-0.5 text-[11px] font-semibold text-[#92400e]">Sample data — not real figures</span>}
        </span>
      }
      right={source ? <span className="text-xs text-[color:var(--muted-foreground)]">{source}{sample ? " (pending key)" : ""}</span> : undefined}
    >
      <div className={sample ? "opacity-80" : ""}>
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Last month", value: compact(last), sub: visits.at(-1)?.label },
            { label: "Month on month", value: delta === null ? "—" : `${delta > 0 ? "+" : ""}${Math.round(delta)}%`, tone: delta === null ? "" : delta < 0 ? "text-[color:var(--danger)]" : "text-[color:var(--success)]" },
            { label: "12-month total", value: compact(total), sub: `${compact(Math.round(total / visits.length))} a month on average` },
            { label: "Peak month", value: compact(peak.value), sub: peak.label },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[color:var(--border)] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{k.label}</div>
              <div className={`mt-1 text-2xl font-bold tracking-tight ${k.tone ?? ""}`}>{k.value}</div>
              {k.sub && <div className="text-xs text-[color:var(--muted-foreground)]">{k.sub}</div>}
            </div>
          ))}
        </div>
        <AreaChart points={visits} color="#0ea5e9" format={(n) => compact(n)} />
        {sources && sources.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">Where the visits come from</div>
            <div className="flex h-3 overflow-hidden rounded-full">
              {sources.map((x) => (
                <span key={x.channel} title={`${x.channel}: ${x.pct}%`} style={{ width: `${x.pct}%`, background: SOURCE_COLORS[x.channel] ?? "#cbd5e1" }} />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {sources.map((x) => (
                <span key={x.channel} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: SOURCE_COLORS[x.channel] ?? "#cbd5e1" }} />
                  {x.channel} <strong>{x.pct}%</strong>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/** The blocks of one profile section, by its id. */
function sectionBlocks(profile: Profile | undefined, id: string): Block[] {
  const out: Block[] = [];
  let on = false;
  for (const b of profile?.blocks ?? []) {
    if (b.type === "section") {
      on = b.id === id;
      continue;
    }
    if (on) out.push(b);
  }
  return out;
}

function Socials({ b, profile, series }: { b: BusinessDetail; profile?: Profile; series: MetricsResponse | null }) {
  const s = useSeries(series);
  const traffic = sectionBlocks(profile, "traffic");
  const channels = traffic.flatMap((x) => (x.type === "channels" ? x.items : []));
  const facts = traffic.flatMap((x) => (x.type === "facts" ? x.items : []));
  const search = traffic.find(
    (x): x is Extract<Block, { type: "table" }> => x.type === "table" && x.columns.some((c) => /volume/i.test(c)) && x.columns.some((c) => /rank/i.test(c)),
  );
  const lede = traffic.find((x): x is Extract<Block, { type: "lede" }> => x.type === "lede")?.text;
  const timeline = profile ? blocksOfType(profile.blocks, "timeline").flatMap((t) => t.items) : [];
  const moments = timeline
    .flatMap((i) => (i.tag && MOMENT_COLOR[i.tag] ? [{ ...i, tag: i.tag }] : []))
    .map((i) => ({ ...i, iso: new Date(`${i.when} UTC`).toISOString().slice(0, 10) }))
    .filter((i) => !Number.isNaN(Date.parse(i.iso)));

  const audience = (l: BusinessLink) => (l.platform === "WEBSITE" ? linkMetaNumber(l, "visitsPerMonth") : linkFollowers(l));
  // Biggest audience first; the website, counted in visits, last.
  const socials = b.links
    .filter((l) => SOCIAL_STYLE[l.platform])
    .sort((a, c) => Number(a.platform === "WEBSITE") - Number(c.platform === "WEBSITE") || (audience(c) ?? 0) - (audience(a) ?? 0));
  const followers = socials.filter((l) => l.platform !== "WEBSITE").map((l) => ({ l, n: linkFollowers(l) ?? 0 })).filter((x) => x.n > 0);
  const totalFollowers = followers.reduce((t, x) => t + x.n, 0);
  const lead = followers.sort((a, c) => c.n - a.n)[0]?.l;
  const noteFor = (l: BusinessLink) => channels.find((c) => c.href && l.url && c.href.replace(/\/$/, "") === l.url.replace(/\/$/, ""))?.note;
  const firstListing = b.establishedAt ? Date.parse(b.establishedAt) : null;

  const toneOf = (v: string) => (/^[−-]/.test(v.trim()) ? "text-[color:var(--danger)]" : /^\+/.test(v.trim()) ? "text-[color:var(--success)]" : "");

  return (
    <>
      {lede && <p className="m-0 max-w-[52rem] text-[17px] leading-relaxed">{lede}</p>}

      {/* ── One card per channel ── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {socials.map((l) => {
          const st = SOCIAL_STYLE[l.platform]!;
          const n = audience(l);
          const likes = linkMetaNumber(l, "likes");
          const videos = linkMetaNumber(l, "videos");
          const created = typeof l.meta?.createdAt === "string" ? l.meta.createdAt : null;
          const lead_ = lead === l;
          const weeksBefore = created && firstListing ? Math.round((firstListing - Date.parse(created)) / (7 * 86400000)) : null;
          const note = noteFor(l);
          return (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 text-[color:var(--foreground)] no-underline transition-shadow hover:shadow-[var(--shadow)]"
            >
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: st.color }} />
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: st.tint, color: st.color }}>
                  <PlatformIcon platform={l.platform} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{st.name}</span>
                  <span className="block truncate text-xs text-[color:var(--muted-foreground)]">{l.handle ?? new URL(l.url).hostname.replace(/^www\./, "")}</span>
                </span>
                {lead_ && <span className="ml-auto shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: st.color }}>Lead channel</span>}
              </div>
              <div className="mt-3 text-3xl font-bold tracking-tight">{n !== null ? compact(n) : "—"}</div>
              <div className="text-xs text-[color:var(--muted-foreground)]">{l.platform === "WEBSITE" ? "visits a month" : "followers"}</div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                {likes !== null && <span className="rounded-md bg-[var(--surface)] px-2 py-0.5"><strong>{compact(likes)}</strong> likes</span>}
                {videos !== null && <span className="rounded-md bg-[var(--surface)] px-2 py-0.5"><strong>{videos}</strong> videos</span>}
                {created && (
                  <span className="rounded-md bg-[var(--surface)] px-2 py-0.5">
                    Since {monthLabel(created)}
                    {weeksBefore !== null && weeksBefore > 0 && ` · ${weeksBefore} wk before Amazon`}
                  </span>
                )}
              </div>
              {note && <p className="m-0 mt-2 line-clamp-3 text-xs leading-relaxed text-[color:var(--muted-foreground)]">{note}</p>}
              <span className="mt-auto pt-2 text-xs font-medium" style={{ color: st.color }}>Open ↗</span>
            </a>
          );
        })}
      </div>

      {/* ── Where the audience is ── */}
      {followers.length > 1 && (
        <Card title="Where the audience is" right={<span className="text-xs text-[color:var(--muted-foreground)]">{compact(totalFollowers)} followers</span>}>
          <div className="flex h-4 overflow-hidden rounded-full">
            {followers.map(({ l, n }) => (
              <span key={l.url} title={`${SOCIAL_STYLE[l.platform]!.name}: ${compact(n)}`} style={{ width: `${(n / totalFollowers) * 100}%`, background: SOCIAL_STYLE[l.platform]!.color }} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {followers.map(({ l, n }) => (
              <span key={l.url} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: SOCIAL_STYLE[l.platform]!.color }} />
                {SOCIAL_STYLE[l.platform]!.name} <strong>{Math.round((n / totalFollowers) * 100)}%</strong>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* ── Social moments against revenue ── */}
      {s.revenue.length > 1 && moments.length > 0 && (
        <Card
          title="Social moments and revenue"
          right={
            <span className="flex flex-wrap gap-3 text-xs">
              {Object.entries(MOMENT_COLOR).map(([tag, c]) => (
                <span key={tag} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{tag}</span>
              ))}
            </span>
          }
        >
          <AreaChart
            points={s.revenue}
            color="var(--series-revenue)"
            format={(n) => money(n, b.currency)}
            labels={false}
            /* A moment dated by year alone ("2026") has no month to sit on —
               it stays in the list below, off the chart. */
            markers={moments
              .filter((m) => /[A-Za-z]{3}/.test(m.when))
              .map((m) => ({ date: m.iso, label: `${m.when} · ${m.what}`, color: MOMENT_COLOR[m.tag]! }))}
          />
          <ol className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
            {moments.map((m) => (
              <li key={m.when + m.what} className="flex gap-2.5 rounded-lg bg-[var(--surface)] p-2.5 text-sm">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: MOMENT_COLOR[m.tag] }} />
                <span className="min-w-0">
                  <span className="block text-xs text-[color:var(--muted-foreground)]">
                    {m.when} · {m.tag}
                    {s.revenue[0] && m.iso.slice(0, 7) < s.revenue[0].date.slice(0, 7) ? " · before the chart" : ""}
                  </span>
                  <span className="block font-medium">{m.what}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* ── 12 months of site visits (Similarweb). Until the key is renewed, a
          clearly marked sample — and only on a dev build, never in production. */}
      {import.meta.env.DEV && <WebsiteTrafficCard {...SAMPLE_TRAFFIC} sample />}

      {/* ── Website traffic ── */}
      {facts.length > 0 && (
        <Card title="Website traffic">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-[color:var(--border)] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{f.label}</div>
                <div className={`mt-1 text-2xl font-bold tracking-tight ${toneOf(f.value)}`}>{f.value}</div>
                {f.note && <div className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{f.note}</div>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Search presence off Amazon ── */}
      {search && (
        <Card title={search.caption ?? "Search presence"}>
          {/* What the list is, not which tool measured it. */}
          <p className="m-0 mb-3 text-sm text-[color:var(--muted-foreground)]">
            What people search for on Google to find this brand — where its site shows up in Google’s results for each search,
            and roughly how many times a month that search is made.
          </p>
          {(() => {
            const rankCol = search.columns.findIndex((c) => /rank/i.test(c));
            const volCol = search.columns.findIndex((c) => /volume/i.test(c));
            const vol = (r: string[]) => Number(String(r[volCol] ?? "").replace(/[^\d.]/g, "")) || 0;
            const rows = (search.rows as string[][]).slice().sort((a, c) => vol(c) - vol(a));
            const max = Math.max(...rows.map(vol), 1);
            const grid = "grid grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,35%)_5rem] items-center gap-3";
            return (
              <div className="space-y-1.5">
                <div className={`${grid} text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]`}>
                  <span>Google result</span>
                  <span>Search</span>
                  <span>Searches a month</span>
                  <span />
                </div>
                {rows.map((r) => {
                  const rank = Number(String(r[rankCol] ?? "").replace(/[^\d]/g, "")) || 0;
                  return (
                    <div key={r[0]} className={`${grid} text-sm`}>
                      {/* Neutral on purpose: a medal here would read as this list's order. */}
                      <span
                        title={rank ? `Their site is result #${rank} on Google for this search` : undefined}
                        className={`w-fit rounded-md px-2 py-0.5 text-xs font-semibold ${rank === 1 ? "bg-[var(--accent-tint)] text-[color:var(--accent)]" : "bg-[var(--surface)] text-[color:var(--foreground)]"}`}
                      >
                        {rank ? `Google #${rank}` : "—"}
                      </span>
                      <span className="truncate font-medium">{r[0]}</span>
                      <span className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
                        <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${(vol(r) / max) * 100}%` }} />
                      </span>
                      <span className="text-right tabular-nums text-[color:var(--muted-foreground)]">{compact(vol(r))}/mo</span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </Card>
      )}
    </>
  );
}

// ─── Similar brands ──────────────────────────────────────────────────

function SimilarCarousel({ rows, onMore }: { rows: BusinessCard[] | null; onMore: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!rows || rows.length === 0) return null;
  return (
    <Card
      title={
        <span className="flex items-center gap-3">
          <span>Similar brands</span>
          <ViewAll onClick={onMore} />
        </span>
      }
      right={<ScrollArrows target={ref} />}
    >
      <div ref={ref} className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {rows.map((r) => (
          <Link
            key={r.slug}
            to={`/business/${r.slug}/`}
            className="w-[220px] shrink-0 snap-start rounded-xl border border-[color:var(--border)] bg-white p-3.5 text-[color:var(--foreground)] no-underline transition-shadow hover:shadow-[var(--shadow)]"
          >
            <div className="flex items-center gap-2.5">
              {r.logoUrl ? <img src={r.logoUrl} alt="" className="h-9 w-9 rounded-lg border border-[color:var(--border)] bg-white object-contain p-1" /> : <span className="h-9 w-9 rounded-lg bg-[var(--muted)]" />}
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{r.name}</span>
                <span className="block truncate text-xs text-[color:var(--muted-foreground)]">
                  {flag(r.country)} {r.categories.find((c) => c.kind === "NICHE")?.name ?? ""}
                </span>
              </span>
            </div>
            <div className="mt-3 text-xs text-[color:var(--muted-foreground)]">Monthly revenue</div>
            <div className="text-lg font-bold tracking-tight">{money(r.latestMonthlyRevenue, r.currency)}</div>
            <div className="mt-1 flex justify-between text-xs text-[color:var(--muted-foreground)]">
              <span>{r.latestMarginPct ? `${Math.round(Number(r.latestMarginPct))}% margin` : "Margin —"}</span>
              <span>Start {money(startingCostFigure(r), r.currency)}</span>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function Similar({ rows }: { rows: BusinessCard[] | null }) {
  if (!rows) return <div data-empty>Loading…</div>;
  if (rows.length === 0) return <div data-empty>No similar brands yet.</div>;
  return (
    <Card title="Similar brands" right={<span className="text-xs text-[color:var(--muted-foreground)]">Same niche first</span>}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="text-xs text-[color:var(--muted-foreground)]">
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-left font-semibold">Brand</th>
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-left font-semibold">Category</th>
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold">Monthly revenue</th>
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold">Monthly profit</th>
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold">Margin</th>
              <th className="border-b border-[color:var(--border)] px-2 py-2 text-right font-semibold">To start</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="hover:bg-[var(--surface)]">
                <td className="border-b border-[color:var(--border)] px-2 py-3">
                  <Link to={`/business/${r.slug}/`} className="flex items-center gap-3 text-[color:var(--foreground)] no-underline">
                    {r.logoUrl ? <img src={r.logoUrl} alt="" className="h-9 w-9 rounded-lg border border-[color:var(--border)] bg-white object-contain p-1" /> : <span className="h-9 w-9 rounded-lg bg-[var(--muted)]" />}
                    <span>
                      <span className="block font-semibold">{r.name}</span>
                      <span className="block text-xs text-[color:var(--muted-foreground)]">{flag(r.country)} {r.establishedAt ? `since ${monthLabel(r.establishedAt)}` : ""}</span>
                    </span>
                  </Link>
                </td>
                <td className="border-b border-[color:var(--border)] px-2 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.categories.filter((c) => c.kind === "NICHE").slice(0, 2).map((c) => (
                      <span key={c.slug} className="rounded-md border border-[color:var(--border)] px-2 py-0.5 text-xs">{c.name}</span>
                    ))}
                  </div>
                </td>
                <td className="border-b border-[color:var(--border)] px-2 py-3 text-right font-semibold tabular-nums">{money(r.latestMonthlyRevenue, r.currency)}</td>
                <td className="border-b border-[color:var(--border)] px-2 py-3 text-right tabular-nums">{money(r.latestMonthlyProfit, r.currency)}</td>
                <td className="border-b border-[color:var(--border)] px-2 py-3 text-right tabular-nums">{r.latestMarginPct ? `${Math.round(Number(r.latestMarginPct))}%` : "—"}</td>
                <td className="border-b border-[color:var(--border)] px-2 py-3 text-right tabular-nums">{money(startingCostFigure(r), r.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
