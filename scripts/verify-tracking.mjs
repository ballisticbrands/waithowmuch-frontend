/**
 * Proves the analytics layer actually fires, in a real browser, against the
 * BUILT site. Run it before believing any tracking change.
 *
 *   npm run build && npx serve -s dist -l 4178
 *   npm run verify:tracking            # or: node scripts/verify-tracking.mjs <origin>
 *
 * Exit code is the number of failures.
 *
 * ─── Why it is built this way ────────────────────────────────────────
 *
 * 🚨 **Never assert a GA4 event from the network.** gtag.js BATCHES
 * non-`page_view` events and flushes them on a timer or at unload, so a
 * correctly-fired event produces no request for several seconds and possibly
 * none at all if the page never unloads. A sibling repo's test watched
 * `/collect` for 2.5s and reported "the event never fired" about code that
 * fires it perfectly. Assert the CALL; check transport separately.
 *
 * So: GA4 is read from `window.dataLayer` — where every gtag call lands
 * regardless of which reference made it — and the Meta vendor script is
 * BLOCKED so `fbq.queue` never drains and keeps the full call history.
 *
 * The API is served from recorded fixtures. A hand-written stub crashed the
 * profile page on fields it did not model, and a crashed React tree fires no
 * events — indistinguishable, from the outside, from a broken event.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const ORIGIN = process.argv[2] || "http://localhost:4178";
const PIXEL = "1079875758342522";
const GA4 = "G-0K360RYPPB";
const CLARITY = "yfrezqqmrh";

// puppeteer-core is not a dependency of this repo (it would be the heaviest
// thing in it, for one script). Resolve it from anywhere in the workspace.
const require_ = createRequire(import.meta.url);
let puppeteer;
for (const from of [import.meta.url, "/Users/gershonballas/work/DragonBot/VerifiedMargins-LP/"]) {
  try { puppeteer = createRequire(from)("puppeteer-core"); break; } catch { /* try next */ }
}
if (!puppeteer) {
  console.error("puppeteer-core not found. `npm i -D puppeteer-core` in this repo, or run from a workspace that has it.");
  process.exit(1);
}
void require_;

const CHROME = process.env.CHROME_PATH
  || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const FIXTURE_BIZ = readFileSync(new URL("./fixtures/business-dummy-widgets.json", import.meta.url), "utf8");
const FIXTURE_METRICS = readFileSync(new URL("./fixtures/business-dummy-widgets-metrics.json", import.meta.url), "utf8");
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" };

const fails = [];
const ok = (m) => console.log("  ✅", m);
const bad = (m) => { console.log("  ❌", m); fails.push(m); };

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });

async function session(path) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  const net = [];
  page.on("request", (r) => {
    const u = r.url();
    if (/facebook|googletagmanager|clarity\.ms/.test(u)) net.push(u);
    if (/fbevents\.js|gtag\/js|clarity\.ms\/tag/.test(u)) return r.abort();
    if (/\/metrics/.test(u)) return r.respond({ status: 200, contentType: "application/json", headers: CORS, body: FIXTURE_METRICS });
    if (/\/v1\/businesses\/[^/]+$/.test(u)) return r.respond({ status: 200, contentType: "application/json", headers: CORS, body: FIXTURE_BIZ });
    if (/\/v1\//.test(u)) return r.respond({ status: 200, contentType: "application/json", headers: CORS, body: "{}" });
    return r.continue();
  });
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "domcontentloaded" });
  // Analytics is deliberately deferred to idle / first interaction (see
  // main.tsx). Without this click the loaders may not have run yet.
  await page.mouse.move(10, 10); await page.mouse.down(); await page.mouse.up();
  await new Promise((r) => setTimeout(r, 2500));
  return { page, net };
}

const calls = (page) => page.evaluate(() => ({
  gtag: (window.dataLayer || []).map((a) => Array.from(a)),
  fbq: ((window.fbq && window.fbq.queue) || []).map((a) => Array.from(a)),
}));

console.log(`\n── ${ORIGIN}/ — cold load`);
let { page, net } = await session("/");
let c = await calls(page);
const init = c.fbq.find((a) => a[0] === "init");
init ? ok(`fbq('init','${init[1]}')`) : bad("fbq('init') never called — the pixel is not installed");
if (init && init[1] !== PIXEL) bad(`WRONG pixel id ${init[1]} (expected ${PIXEL})`);
c.fbq.some((a) => a[0] === "track" && a[1] === "PageView") ? ok("Meta base PageView") : bad("no Meta base PageView");
const cfg = c.gtag.find((a) => a[0] === "config");
cfg && cfg[1] === GA4 ? ok(`gtag('config','${cfg[1]}')`) : bad(`GA4 config missing or wrong: ${JSON.stringify(cfg)}`);
net.some((u) => u.includes("fbevents.js")) ? ok("fbevents.js requested") : bad("fbevents.js never requested");
net.some((u) => u.includes(CLARITY)) ? ok("Clarity requested") : bad("Clarity never requested");

const shell = await (await fetch(`${ORIGIN}/`)).text();
/fbevents|connect\.facebook|googletagmanager/.test(shell)
  ? bad("a vendor script is in the static head — that undoes the deferred-analytics budget (mobile 75 → 100)")
  : ok("no vendor script in the static head (deferred, as designed)");

console.log("\n── client-side nav  /  →  /data/");
await page.evaluate(() => {
  const a = [...document.querySelectorAll("a[href]")].find((x) => x.getAttribute("href").startsWith("/data"));
  a.click();
});
await new Promise((r) => setTimeout(r, 1000));
c = await calls(page);
const pvs = c.gtag.filter((a) => a[0] === "event" && a[1] === "page_view");
pvs.length === 1
  ? ok(`SPA page_view fired once → ${pvs[0][2].page_path}`)
  : bad(`SPA page_view fired ${pvs.length}× (0 = every in-app nav uncounted; 2 = the first load is double-counted)`);
const mpv = c.fbq.filter((a) => a[0] === "track" && a[1] === "PageView");
mpv.length === 2 ? ok("Meta PageView: 1 base + 1 route change") : bad(`Meta PageView fired ${mpv.length}× (expected 2)`);
await page.close();

console.log("\n── /business/dummy-widgets/ — the content event");
({ page } = await session("/business/dummy-widgets/"));
c = await calls(page);
const vb = c.gtag.filter((a) => a[1] === "view_business");
const vc = c.fbq.filter((a) => a[0] === "track" && a[1] === "ViewContent");
vb.length === 1 ? ok(`view_business once → ${JSON.stringify(vb[0][2])}`) : bad(`view_business fired ${vb.length}× (expected 1)`);
if (vb.length === 1 && !vb[0][2].business_name) bad("view_business has no business_name — it fired before the API resolved");
vc.length === 1 ? ok(`ViewContent once, STANDARD → ${JSON.stringify(vc[0][2])}`) : bad(`ViewContent fired ${vc.length}× (expected 1)`);
c.fbq.some((a) => a[0] === "trackCustom" && ["ViewContent", "CompleteRegistration", "PageView", "Lead"].includes(a[1]))
  ? bad("a STANDARD Meta event was sent via trackCustom — it forfeits Meta's priors and its AEM slot")
  : ok("no standard event sent via trackCustom");
await page.close();

console.log("\n── domain verification (Meta's crawler does not run JS)");
const home = await (await fetch(`${ORIGIN}/`)).text();
const route = await (await fetch(`${ORIGIN}/about/`)).text();
const tag = /facebook-domain-verification"\s+content="([^"]+)"/.exec(home);
if (!tag) bad("no facebook-domain-verification meta tag in the STATIC head — the domain cannot be verified");
else {
  ok(`tag present: ${tag[1]}`);
  route.includes(tag[1]) ? ok("survives postbuild-spa-routes.mjs into route stubs") : bad("tag is lost by the prerender");
}

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILING\n` : "\n✅ all checks passed\n");
process.exit(fails.length);
