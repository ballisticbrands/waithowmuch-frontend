#!/usr/bin/env node
/**
 * Which tabs a brand page shows, and why the rest don't.
 *
 *   npm run tabs -- <slug>                    the same, via npm
 *   node scripts/brand-tabs.mjs <slug>        one brand
 *   node scripts/brand-tabs.mjs --all         every brand with a profile
 *   node scripts/brand-tabs.mjs --list        every tab that exists, no brand
 *
 * Each tab is one of:
 *   shown              on the brand's list and its data is there
 *   hidden by choice   not on the brand's list (PAGE_TABS in brand-tabs.mjs)
 *   hidden, no data    on the list, but what it reads is missing (named)
 *
 * Mirrors the `hiddenTabs` checks in src/pages/Business2.tsx. Reads the local
 * files, plus the brand's row from the API (VITE_API_URL in .env.local, else
 * localhost:8080) for the links and the published validation test; with the
 * backend down those two tabs say "unknown".
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PAGE_TABS, TABS, shownTabs, showsCaseStudyLink, SOCIALS_TAB_PLATFORMS } from "../src/businesses/brand-tabs.mjs";
import { PROFILES, profileFor } from "../src/businesses/index.mjs";
import { localBusiness } from "../src/businesses/local.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BIZ = join(ROOT, "src", "businesses");

const apiUrl = (() => {
  try {
    const m = readFileSync(join(ROOT, ".env.local"), "utf8").match(/^VITE_API_URL=["']?([^"'\n]+)/m);
    if (m) return m[1].replace(/\/$/, "");
  } catch {}
  return "http://localhost:8080";
})();

async function rowFor(slug) {
  const draft = localBusiness(slug);
  if (draft) return { row: draft.business, from: "local draft" };
  try {
    const r = await fetch(`${apiUrl}/v1/businesses/${encodeURIComponent(slug)}`, { signal: AbortSignal.timeout(4000) });
    if (r.status === 404) return { row: null, from: "not in the database" };
    if (!r.ok) return { row: undefined, from: `API ${r.status}` };
    return { row: (await r.json()).business, from: "API" };
  } catch {
    return { row: undefined, from: `backend unreachable at ${apiUrl}` };
  }
}

/** A generated `<slug>.<kind>.mjs`, or null when the brand has none. */
async function dataFile(slug, kind) {
  const p = join(BIZ, `${slug}.${kind}.mjs`);
  return existsSync(p) ? import(pathToFileURL(p).href) : null;
}

function sectionHolding(profile, types) {
  let current = null;
  for (const b of profile?.blocks ?? []) {
    if (b.type === "section") current = b.id;
    if (current && types.includes(b.type)) return current;
  }
  return null;
}
function sectionHasBlocks(profile, id) {
  let on = false;
  for (const b of profile?.blocks ?? []) {
    if (b.type === "section") { on = b.id === id; continue; }
    if (on) return true;
  }
  return false;
}

/** Per tab: null when its data is there, else what is missing. */
async function missingData(slug) {
  const profile = profileFor(slug);
  const [ads, niche, health, reviews, promo] = await Promise.all(
    ["adspend", "niche", "health", "reviews", "promotions"].map((k) => dataFile(slug, k)),
  );
  const { row, from } = await rowFor(slug);
  const unknown = row === undefined ? `unknown — ${from}` : null;
  const prof = (what) => (profile ? what : "no profile in src/businesses/index.mjs");
  return {
    from,
    profile: !!profile,
    missing: {
      analytics: null,
      products: null,
      revenue: null,
      similar: null,
      margin: sectionHolding(profile, ["margin", "product-margins"]) ? null : prof("no margin / product-margins block in the profile"),
      ads: ads?.AD_SPEND ? null : `no AD_SPEND in ${slug}.adspend.mjs`,
      keywords: ads?.TOP_KEYWORDS?.length ? null : `no TOP_KEYWORDS in ${slug}.adspend.mjs`,
      deals: promo?.PROMOTIONS ? null : `no ${slug}.promotions.mjs`,
      niche: niche?.NICHE ? null : `no ${slug}.niche.mjs`,
      health: health?.HEALTH ? null : `no ${slug}.health.mjs`,
      reviews: reviews?.REVIEWS ? null : `no ${slug}.reviews.mjs`,
      owner: profile?.blocks.some((b) => b.type === "section" && b.id === "brand-owner") ? null : prof('no section with id "brand-owner"'),
      valuation: sectionHolding(profile, ["valuation", "valuation-board"]) ? null : prof("no valuation block in the profile"),
      socials: sectionHasBlocks(profile, "traffic") || row?.links?.some((l) => SOCIALS_TAB_PLATFORMS.includes(l.platform))
        ? null
        : unknown ?? "no social link on the row and no traffic section",
      validate: row?.startingCostEstimate?.breakdown?.validation ? null : unknown ?? "validation test not published on the row",
    },
  };
}

function printList() {
  console.log("Every tab on the brand page, in menu order:\n");
  for (const t of TABS) console.log(`  ${t.label.padEnd(20)} ?tab=${t.id.padEnd(10)} ${t.group ?? ""}`);
}

async function printBrand(slug) {
  const { from, profile, missing } = await missingData(slug);
  const list = shownTabs(slug);
  const rows = TABS.map((t) => {
    if (!list.includes(t.id)) return [t, "hidden by choice", ""];
    const why = missing[t.id];
    return why ? [t, "hidden, no data", why] : [t, "shown", ""];
  });
  const shown = rows.filter((r) => r[1] === "shown").length;
  console.log(`\n${slug} — ${shown} of ${TABS.length} tabs shown`);
  console.log(`  tab list: ${slug in PAGE_TABS ? "standard set (PAGE_TABS)" : "all tabs (not in PAGE_TABS)"} · case-study link: ${showsCaseStudyLink(slug) ? "yes" : "no"} · row: ${from}${profile ? "" : " · NO PROFILE"}\n`);
  for (const [t, state, why] of rows) {
    const mark = state === "shown" ? "✓" : state === "hidden by choice" ? "–" : "✗";
    console.log(`  ${mark} ${t.label.padEnd(20)} ${state.padEnd(17)} ${why}`);
  }
}

const arg = process.argv[2];
if (!arg || arg === "-h" || arg === "--help") {
  console.log("usage: node scripts/brand-tabs.mjs <slug> | --all | --list");
  console.log(`brands: ${Object.keys(PROFILES).join(", ")}`);
  process.exit(arg ? 0 : 2);
}
if (arg === "--list") printList();
else if (arg === "--all") for (const slug of Object.keys(PROFILES)) await printBrand(slug);
else await printBrand(arg);
