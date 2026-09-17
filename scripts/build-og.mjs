/* The link preview for a business profile: og-out/<slug>.png, 1200×630.
 *
 *     node scripts/build-og.mjs            # then upload og-out/*.png
 *     node scripts/build-og.mjs <slug>     # just one
 *
 * ── What it shows ────────────────────────────────────────────────────────
 * Two things only: the brand's leading product image at full height, and the
 * headline title laid over its lower part. A link to a profile is shared in a
 * DM or a post, where the preview IS the page for most of the people who see
 * it, so it should make the page's point before anybody clicks.
 *
 * ── Why this is not part of `npm run build` ──────────────────────────────
 * It needs Chrome, and the GitHub Pages workflow has no browser to drive. So
 * the card is rendered here, uploaded to the bucket (backend: `npm run
 * product-image`) and linked from the profile as `headline.ogImage` — never
 * committed. Run it whenever a profile's headline or leading image changes;
 * the upload's new URL is the cache-bust. A profile with no ogImage falls back
 * to its plain product image, then to the site-wide preview.
 *
 * The title comes from the Business row via the live API, exactly as the page
 * renders it — never from the authored profile, which holds no headline copy.
 * Only the image comes from the profile.
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

const CSS = (fontUri) => `
  @font-face { font-family: Inter; src: url(${fontUri}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  /* White ground: listing photos are shot on white, so any other colour turns
     the photo's own background into a visible rectangle around the product. */
  body {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background: #fff; color: #000;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .hero { position: absolute; inset: 0; display: block; height: 100%; max-width: 100%; margin: 0 auto; object-fit: contain; }
  /* Over the photo, so it has to read on anything: black fill with a thick
     white outline. paint-order puts the stroke BEHIND the fill, so the
     outline thickens the letters instead of eating into them. */
  h1 {
    position: absolute; left: 48px; right: 48px; bottom: 40px;
    font-size: 62px; line-height: 1.12; font-weight: 800; letter-spacing: 0.01em; word-spacing: 0.08em; text-align: center;
    -webkit-text-stroke: 12px #fff; paint-order: stroke fill;
    padding-top: 8px;
  }
`;

const card = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS(c.font)}</style></head><body>
  ${c.image ? `<img class="hero" src="${c.image}" alt="" />` : ''}
  <h1>${esc(c.title)}</h1>
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
  if (!b.title) {
    console.warn(`build-og: ${slug}: the Business row has no title, skipped`);
    continue;
  }

  const c = {
    title: b.title,
    image: headline.image ? await remoteUri(headline.image.src) : null,
    font,
  };

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(card(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  /* Fit the title: shrink it until it takes two lines, down to a floor that
     still reads at thumbnail size. A title that needs a third line even then
     gets it, with a warning — the fix for that is shorter copy. */
  const lines = await page.evaluate((min) => {
    const el = document.querySelector('h1');
    const count = () => Math.round((el.getBoundingClientRect().height - 8) / parseFloat(getComputedStyle(el).lineHeight));
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (count() > 2 && size > min) {
      size -= 2;
      el.style.fontSize = `${size}px`;
    }
    return count();
  }, 46);
  if (lines > 2) {
    console.warn(`build-og: ${slug}: the title needs ${lines} lines on the card`);
    failed = lines > 3 || failed;
  }

  const out = join(outDir, `${slug}.png`);
  writeFileSync(out, await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } }));
  console.log(`build-og: wrote og-out/${slug}.png — upload it (backend: npm run product-image -- ${slug} <path>) and set headline.ogImage`);
  await page.close();
}
await browser.close();
if (failed) process.exitCode = 1;
