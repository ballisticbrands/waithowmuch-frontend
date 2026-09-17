/* The link preview for a business profile: og-out/<slug>.png, 1200×630.
 *
 *     node scripts/build-og.mjs            # then upload og-out/*.png
 *     node scripts/build-og.mjs <slug>     # just one
 *
 * ── What it shows ────────────────────────────────────────────────────────
 * Top to bottom: the brand's leading product image, large, on white; a
 * violet rule; the headline title; then the logo beside the monthly profit
 * and the profit margin, with the source and date stamp on the right. A link
 * to a profile is shared in a DM or a post, where the preview IS the page for
 * most of the people who see it, so it should make the page's point before
 * anybody clicks.
 *
 * The two figures are the Business row's `snapshotFigures` — the same frozen
 * month the title quotes — not the overview cards' trailing-twelve averages.
 * Next to the title, a second profit figure for a different window reads as
 * a contradiction. They are formatted the way titles write them ($25.2K).
 *
 * 🚨 The title quotes a profit figure, and a number in a preview travels
 * further than the page it came from. So the caveat travels with it, in the
 * image itself: "Researched estimate · Read Sep 2026". A screenshot of this
 * card must not be able to imply that a real business asserted these figures,
 * or that they are live.
 *
 * ── Why this is not part of `npm run build` ──────────────────────────────
 * It needs Chrome, and the GitHub Pages workflow has no browser to drive. So
 * the card is rendered here, uploaded to the bucket (backend: `npm run
 * product-image`) and linked from the profile as `headline.ogImage` — never
 * committed. Run it whenever a profile's headline or leading image changes;
 * the upload's new URL is the cache-bust. A profile with no ogImage falls back
 * to its plain product image, then to the site-wide preview.
 *
 * Title, figures, snapshotMonth, name and logo come from the Business row via
 * the live API, exactly as the page renders them — never from the authored
 * profile, which holds no headline copy. Only the image comes from the profile.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { PROFILES } from '../src/businesses/index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'og-out');
const API = process.env.WHM_API ?? 'https://api.waithowmuch.com';

function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const c = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => existsSync(p));
  if (!c) {
    console.error('build-og: no Chrome found; set CHROME_PATH');
    process.exit(1);
  }
  return c;
}

const MIME = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', woff2: 'font/woff2' };
const mimeOf = (name) => MIME[name.split('?')[0].split('.').pop().toLowerCase()] ?? 'application/octet-stream';

/* Everything is inlined as data: URIs. The card is loaded with setContent, so
 * it has no origin: a /public path would not resolve, and a remote URL would
 * make the render depend on the network at screenshot time. */
const fileUri = (path) => `data:${mimeOf(path)};base64,${readFileSync(path).toString('base64')}`;
async function remoteUri(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return `data:${mimeOf(url)};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`;
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* "Sep 2026" — the stamp's wording, from lib/reading.ts. */
const monthLabel = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/* "$25.2K", "$7.07M" — how the headline titles write a figure. */
function compactMoney(v, currency) {
  const sym = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '';
  const abs = Math.abs(v);
  if (abs >= 1e6) return `${sym}${(v / 1e6).toFixed(2).replace(/\.?0+$/, '')}M`;
  if (abs >= 1e3) return `${sym}${(v / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
  return `${sym}${Math.round(v).toLocaleString('en-US')}`;
}

/* The site's own tokens (globals.css): ink on near-white, the violet accent
 * used once, hairline borders. */
const CSS = (fontUri) => `
  @font-face { font-family: Inter; src: url(${fontUri}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    display: flex; flex-direction: column;
    background: #fbfbfd; color: #14141b;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  /* The product, big, shown whole on white. Listing photos are shot on
     white, so any other ground turns the photo's own background into a
     visible rectangle around the product. */
  .hero { height: 372px; flex: none; background: #fff; }
  .hero img { display: block; height: 100%; max-width: 100%; margin: 0 auto; padding: 18px 0; object-fit: contain; }
  .body { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 22px 56px 26px; border-top: 6px solid #5b3df5; }
  h1 { font-size: 40px; line-height: 1.14; font-weight: 750; letter-spacing: -0.028em; }
  .row { margin-top: auto; padding-top: 14px; display: flex; align-items: center; gap: 36px; }
  .logo {
    height: 64px; min-width: 64px; max-width: 190px; padding: 8px 12px;
    background: #fff; border: 2px solid #e4e4ec; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .logo img { max-height: 100%; max-width: 100%; object-fit: contain; }
  .logo span { font-size: 24px; font-weight: 700; }
  .stat { display: flex; flex-direction: column; gap: 2px; }
  .stat b { font-size: 38px; font-weight: 750; letter-spacing: -0.02em; line-height: 1.05; font-variant-numeric: tabular-nums; }
  .stat small { font-size: 15px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5f6072; }
  .sep { width: 2px; align-self: stretch; background: #e4e4ec; }
  .src { margin-left: auto; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; font-size: 17px; color: #5f6072; text-align: right; }
  .src .site { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 650; color: #14141b; }
  .src .site img { width: 30px; height: 30px; border-radius: 7px; }
`;

const card = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS(c.font)}</style></head><body>
  <div class="hero">${c.image ? `<img src="${c.image}" alt="" />` : ''}</div>
  <div class="body">
    <h1>${esc(c.title)}</h1>
    <div class="row">
      <div class="logo">${c.logo ? `<img src="${c.logo}" alt="" />` : `<span>${esc(c.name)}</span>`}</div>
      <div class="stat"><b>${esc(c.profit)}</b><small>Monthly profit</small></div>
      <div class="sep"></div>
      <div class="stat"><b>${esc(c.margin)}</b><small>Profit margin</small></div>
      <div class="src">
        <span class="site"><img src="${c.mark}" alt="" />waithowmuch.com</span>
        <span>Researched estimate · Read ${esc(c.month)}</span>
      </div>
    </div>
  </div>
</body></html>`;

const only = process.argv[2];
const slugs = Object.entries(PROFILES)
  .filter(([slug, profile]) => profile.headline && (!only || slug === only))
  .map(([slug]) => slug);
if (slugs.length === 0) {
  console.error(`build-og: no profile with a headline${only ? ` at "${only}"` : ''}`);
  process.exit(1);
}

const font = fileUri(join(root, 'public', 'fonts', 'inter-latin.woff2'));
const mark = fileUri(join(root, 'public', 'logo.svg'));

mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true, args: ['--no-sandbox'] });
let failed = false;
for (const slug of slugs) {
  const { headline } = PROFILES[slug];
  const res = await fetch(`${API}/v1/businesses/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    console.warn(`build-og: ${slug}: API ${res.status}, skipped (is it published?)`);
    continue;
  }
  const { business: b } = await res.json();
  if (!b.title || !b.snapshotMonth) {
    console.warn(`build-og: ${slug}: the Business row has no title or snapshotMonth, skipped`);
    continue;
  }
  const f = b.snapshotFigures;
  if (f?.monthlyProfit == null || f?.marginPct == null) {
    console.warn(`build-og: ${slug}: the Business row has no snapshotFigures profit or margin, skipped`);
    continue;
  }

  const c = {
    name: b.name,
    title: b.title,
    profit: compactMoney(Number(f.monthlyProfit), f.currency ?? b.currency),
    margin: `${Math.round(Number(f.marginPct))}%`,
    month: monthLabel(b.snapshotMonth),
    logo: b.logoUrl ? await remoteUri(b.logoUrl) : null,
    image: headline.image ? await remoteUri(headline.image.src) : null,
    font,
    mark,
  };

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(card(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  /* Fit the title: shrink it until it takes two lines, down to a floor that
     still reads at thumbnail size. A title that needs a third line even then
     is a failure — the row below has no room for it, and the fix is shorter
     copy. */
  const lines = await page.evaluate((min) => {
    const el = document.querySelector('h1');
    const count = () => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (count() > 2 && size > min) {
      size -= 1;
      el.style.fontSize = `${size}px`;
    }
    return count();
  }, 32);
  if (lines > 2) {
    console.warn(`build-og: ${slug}: the title needs ${lines} lines on the card`);
    failed = true;
  }

  const out = join(outDir, `${slug}.png`);
  writeFileSync(out, await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } }));
  console.log(`build-og: wrote og-out/${slug}.png — upload it (backend: npm run product-image -- ${slug} <path>) and set headline.ogImage`);
  await page.close();
}
await browser.close();
if (failed) process.exitCode = 1;
