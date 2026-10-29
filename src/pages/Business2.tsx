import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  getBusiness, getMetrics, listBusinesses, linkFollowers, linkMetaNumber, rowsOfType, toChartPoints,
  type BusinessCard, type BusinessDetail, type BusinessLink, type ListingDetail, type ListingRank, type MetricsResponse,
} from "@/lib/api";
import { profileFor } from "@/businesses/index.mjs";
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
import { startingCostFigure, startingCostRange, FIXED_COSTS_NOTE } from "@/lib/starting-cost";
import { ageLabel, compact, dayLabel, exactMoney, money, monthLabel, percent, price } from "@/lib/format";

/**
 * /business2/:slug — the brand page redrawn as a research dashboard: an
 * identity header with a row of facts, a left sub-menu, metric cards that
 * switch between series, a Q4 overlay, a product library, an ad library.
 *
 * 🚨 A PROTOTYPE beside /business/:slug, not a replacement for it. It reads
 * exactly the same sources — the API's Business row and metric series, the
 * authored profile's breakdown, timeline and facts, the generated
 * <slug>.adspend.mjs — and authors no figure of its own, so the two pages
 * cannot disagree. Nothing prerenders this route and it is marked noindex:
 * a second URL carrying the same profile must not compete with the first.
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

type TabId = "analytics" | "products" | "revenue" | "margin" | "ads" | "keywords" | "similar" | "owner" | "valuation" | "validate";
const TAB_IDS: TabId[] = ["analytics", "products", "revenue", "margin", "ads", "keywords", "similar", "owner", "valuation", "validate"];

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
  timeline: "analytics", growth: "analytics", traffic: "analytics", sources: "analytics", links: "analytics",
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
  const tab = (TAB_IDS.find((t) => t === params.get("tab")) ?? "analytics") as TabId;
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

  const [b, setB] = useState<BusinessDetail | null>(null);
  const [series, setSeries] = useState<MetricsResponse | null>(null);
  const [missing, setMissing] = useState(false);
  const [q4, setQ4] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setB(null);
    setSeries(null);
    setMissing(false);
    getBusiness(slug).then((r) => !cancelled && setB(r.business)).catch(() => !cancelled && setMissing(true));
    getMetrics(slug).then((r) => !cancelled && setSeries(r)).catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (b) document.title = `${b.name} — ${BRAND_NAME_SAFE}`;
  }, [b]);

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
      [!ads?.AD_SPEND, "ads"],
      [!ads?.TOP_KEYWORDS?.length, "keywords"],
      [!ownerSection, "owner"],
      [!valuationSection, "valuation"],
      [!b.startingCostEstimate?.breakdown?.validation, "validate"],
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
              <Analytics b={b} series={series} products={products} similar={similar} shade={shade} onTab={setTab} profile={profile} />
            )}
            {tab === "products" && <ProductLibrary products={products} currency={b.currency} />}
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
                  <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-6">
                    <ProfileBlocks profile={profile} business={b} metrics={toChartPoints(series)} series={series} only={id} />
                  </section>
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
            {tab === "ads" && <Ads b={b} series={series} ads={ads} shade={shade} strategy={profile ? blocksOfType(profile.blocks, "strategy")[0] : undefined} />}
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
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
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
      <div className="ml-auto flex items-center gap-2">
        <IconButton label="Save to favorites">
          <path d="M6 3h12v18l-6-4-6 4z" />
        </IconButton>
        <IconButton label={copied ? "Link copied" : "Copy link"} onClick={copy}>
          {copied ? <path d="M5 12l5 5L20 7" /> : <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />}
        </IconButton>
        <button
          type="button"
          disabled
          title="Brand tracking is coming soon"
          className="flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-3.5 py-2 text-sm font-semibold text-white opacity-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
          Track brand
        </button>
        <IconButton label="Alerts (coming soon)">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
    </button>
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
      { id: "analytics", label: "Overview", icon: <path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z" /> },
      { id: "products", label: "Products", icon: <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /> },
    ],
  },
  {
    group: "Financials",
    items: [
      { id: "revenue", label: "Revenue", icon: <path d="M3 3v18h18M7 15l4-4 3 3 6-6" /> },
      { id: "margin", label: "Margin breakdown", icon: <path d="M12 2a10 10 0 1 0 10 10H12zM15 2.5A10 10 0 0 1 21.5 9H15z" /> },
    ],
  },
  {
    group: "Advertising",
    items: [
      { id: "ads", label: "Amazon Ads", icon: <path d="M3 11l18-8v18L3 13zM7 12v6a2 2 0 0 0 4 0v-4" /> },
      { id: "keywords", label: "Keywords", icon: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5" /> },
    ],
  },
  {
    group: "Market",
    items: [
      { id: "similar", label: "Similar Brands", icon: <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M22 21a5 5 0 0 0-5-5" /> },
    ],
  },
  {
    group: "Brand",
    items: [
      { id: "owner", label: "Brand owner", icon: <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0" /> },
      { id: "valuation", label: "Valuation", icon: <><path d="M3.5 12.5 11.5 4.5H19.5V12.5L11.5 20.5Z" /><circle cx="15.5" cy="8.5" r="1.2" /></> },
    ],
  },
  /* A rule above: everything before it is about this business, everything
     after it is about building your own. */
  {
    group: "Build your own",
    divider: true,
    items: [
      { id: "validate", label: "Validate your idea", icon: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></> },
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
function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
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
        {caseStudy}
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
            <div className="mt-1 border-t border-[color:var(--border)] pt-2">
              <Tip label="Full case study">
                <Link to={caseStudyHref} aria-label="Full case study" className="flex h-10 w-10 items-center justify-center rounded-lg text-[color:var(--accent)] hover:bg-[var(--surface)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Tip>
            </div>
          </div>
        ) : (
          <div className="sticky top-3 space-y-4 p-3">
            {nav.map((g, i) => (
              <div key={i} className={`space-y-0.5 ${g.divider ? "border-t border-[color:var(--border)] pt-4" : ""}`}>
                {g.group && <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{g.group}</div>}
                {g.items.map((it) => item(it))}
              </div>
            ))}
            <div className="border-t border-[color:var(--border)] pt-3">{caseStudy}</div>
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
function AreaChart({ points, color, format, labels = true, shade = null, wide = false }: {
  points: Point[]; color: string; format: (n: number) => string; labels?: boolean; shade?: number | null;
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

function Analytics({ b, series, products, similar, shade, onTab, profile }: {
  b: BusinessDetail; series: MetricsResponse | null; products: Product[];
  similar: BusinessCard[] | null; shade: number | null; onTab: (t: TabId) => void;
  profile?: Profile;
}) {
  const s = useSeries(series);
  const fmt = (n: number) => money(n, b.currency);

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
          {profile.intro && <p className="m-0 max-w-[48rem] text-[17px] leading-relaxed">{profile.intro}</p>}
          <ProfileBlocks profile={profile} business={b} metrics={toChartPoints(series)} series={series} only={null} />
        </section>
      )}

      <ProductStrip products={products} currency={b.currency} onMore={() => onTab("products")} />

      <SimilarCarousel rows={similar} onMore={() => onTab("similar")} />
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

const SORTS = ["Revenue", "Best Seller Rank", "Creation date", "Price: high to low", "Price: low to high"] as const;
type Sort = (typeof SORTS)[number];

/** The sorts this catalogue can answer: Best Seller Rank only once a rank is read. */
const sortsFor = (products: Product[]): Sort[] =>
  SORTS.filter((s) => s !== "Best Seller Rank" || products.some((p) => p.bsr?.root));

function sortProducts(products: Product[], order: Sort): Product[] {
  const xs = [...products];
  if (order === "Revenue") return xs.sort((a, b) => b.revenue - a.revenue || byUnits(a, b));
  /* Lowest root-category rank first. Variations share their family's rank, so
     revenue orders a tie; a listing with no rank goes last. */
  if (order === "Best Seller Rank")
    return xs.sort((a, b) => (a.bsr?.root?.rank ?? Infinity) - (b.bsr?.root?.rank ?? Infinity) || b.revenue - a.revenue);
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
      </div>
      <div className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{p.name}</div>
      <div className="mt-1 text-base font-bold">{p.price !== undefined ? price(p.price, currency) : "—"}</div>
      <div className="text-xs text-[color:var(--muted-foreground)]">
        {p.sold ? `${p.sold.toLocaleString("en-US")}+ sold/mo` : "No sales badge"} · {money(p.revenue, currency)}/mo
      </div>
      {p.listed && <div className="text-xs text-[color:var(--muted-foreground)]">Listed: {dayLabel(p.listed)}</div>}
      {p.bsr?.root && <BsrLine bsr={p.bsr} />}
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
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="text-xs text-[color:var(--muted-foreground)]">
                {["#", "Product", "Price", "Sold / mo", "Revenue / mo", "Share", "Rating", "Best Seller Rank"].map((c, i) => (
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
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right font-semibold tabular-nums">{money(p.revenue, currency)}</td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">
                      <span className="tabular-nums">{Math.round(share)}%</span>
                    </td>
                    <td className="border-b border-[color:var(--border)] px-2 py-2.5 text-right">
                      {p.detail?.rating ? (
                        <span title={`Read ${dayLabel(p.detail.readAt)}${p.detail.subscribeAndSave ? " · Subscribe & Save" : ""}`}>
                          <span className="block whitespace-nowrap font-semibold tabular-nums"><span className="text-[#f59e0b]">★</span> {p.detail.rating.toFixed(1)}</span>
                          <span className="block whitespace-nowrap text-xs text-[color:var(--muted-foreground)]">{(p.detail.reviewCount ?? 0).toLocaleString("en-US")} ratings</span>
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

// ─── Amazon Ads ──────────────────────────────────────────────────────

function Ads({ b, series, ads, shade, strategy }: {
  b: BusinessDetail; series: MetricsResponse | null; ads: AdSpendModule | null; shade: number | null;
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
