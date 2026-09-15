/* The link preview for a business profile: og-out/<slug>.png, 1200×630.
 *
 *     node scripts/build-og.mjs            # then upload og-out/*.png
 *     node scripts/build-og.mjs <slug>     # just one
 *
 * ── What it shows ────────────────────────────────────────────────────────
 * The profile's headline title and subtitle, the brand's leading image, and
 * the same date stamp the page carries. A link to a profile is shared in a DM
 * or a post, where the preview IS the page for most of the people who see it,
 * so it should make the page's point before anybody clicks.
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
 * the upload's new URL is the cache-bust. A profile with no ogImage keeps the
 * site-wide preview rather than a broken image.
 *
 * Title, subtitle and image come from the authored profile
 * (src/businesses/index.mjs), exactly as the page renders them. Name, logo and
 * snapshotMonth come from the live API, exactly as the page renders those.
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

/* The site's own tokens (globals.css): ink on near-white, the violet accent
 * used once, hairline borders. */
const CSS = (fontUri) => `
  @font-face { font-family: Inter; src: url(${fontUri}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 48px;
    padding: 56px 64px 48px;
    background: #fbfbfd; color: #14141b;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    border-top: 10px solid #5b3df5;
  }
  .text { display: flex; flex-direction: column; min-width: 0; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { height: 52px; max-width: 150px; object-fit: contain; }
  .brand span { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; }
  h1 {
    margin-top: 28px; font-size: 48px; line-height: 1.12; font-weight: 750;
    letter-spacing: -0.028em;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  p.sub {
    margin-top: 18px; font-size: 23px; line-height: 1.45; color: #5f6072;
    display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
  }
  .foot {
    margin-top: auto; padding-top: 22px; border-top: 2px solid #e4e4ec;
    display: flex; align-items: center; gap: 14px; font-size: 21px; color: #5f6072;
  }
  .foot img { width: 34px; height: 34px; border-radius: 8px; }
  .foot strong { color: #14141b; font-weight: 650; }
  .image {
    align-self: center; height: 460px;
    border: 2px solid #e4e4ec; border-radius: 22px; background: #fff;
    display: flex; align-items: center; justify-content: center; padding: 22px;
  }
  .image img { max-width: 100%; max-height: 100%; object-fit: contain; }
`;

const card = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS(c.font)}</style></head><body>
  <div class="text">
    <div class="brand">
      ${c.logo ? `<img src="${c.logo}" alt="" />` : ''}
      <span>${esc(c.name)}</span>
    </div>
    <h1>${esc(c.title)}</h1>
    <p class="sub">${esc(c.subtitle)}</p>
    <div class="foot">
      <img src="${c.mark}" alt="" />
      <span><strong>waithowmuch.com</strong> · Researched estimate · Read ${esc(c.month)}</span>
    </div>
  </div>
  ${c.image ? `<div class="image"><img src="${c.image}" alt="" /></div>` : '<div></div>'}
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

  const c = {
    name: b.name,
    title: headline.title,
    subtitle: headline.subtitle,
    month: monthLabel(b.snapshotMonth ?? headline.snapshotMonth),
    logo: b.logoUrl ? await remoteUri(b.logoUrl) : null,
    image: headline.image ? await remoteUri(headline.image.src) : null,
    font,
    mark,
  };

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(card(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  /* A clamped line is a silently truncated sentence. Warn loudly: the copy is
     too long for the card, and the fix is shorter copy, not a smaller font. */
  const clipped = await page.evaluate(() =>
    ['h1', 'p.sub'].filter((s) => {
      const el = document.querySelector(s);
      /* More than half a line hidden, not any overflow at all: at a tight
         line-height a descender alone makes scrollHeight a few pixels taller
         than the box, with nothing cut off. */
      return el.scrollHeight - el.clientHeight > parseFloat(getComputedStyle(el).lineHeight) / 2;
    }),
  );
  if (clipped.length) {
    console.warn(`build-og: ${slug}: ${clipped.join(' and ')} truncated on the card`);
    failed = true;
  }

  const out = join(outDir, `${slug}.png`);
  writeFileSync(out, await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } }));
  console.log(`build-og: wrote og-out/${slug}.png — upload it (backend: npm run product-image -- ${slug} <path>) and set headline.ogImage`);
  await page.close();
}
await browser.close();
if (failed) process.exitCode = 1;
