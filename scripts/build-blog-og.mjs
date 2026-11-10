/* The link preview for a blog post: public/og/blog/<slug>.png, 1200 × 630.
 *
 *     npm run build:blog-og            # every published post without an `image`
 *     npm run build:blog-og -- <slug>  # just one
 *
 * It is the post's black title card — the same heroArtHtml() markup the page
 * and every card render, styled by the `hero-art:start` … `hero-art:end` block
 * of src/globals.css, which is read from that file rather than copied here, so
 * the preview and the page cannot drift apart.
 *
 * ── Why the PNGs are committed ───────────────────────────────────────────
 * It needs Chrome, which the GitHub Pages workflow does not have (the same
 * reason build-og.mjs is not part of `npm run build`). Unlike a business card,
 * nothing in it comes from the API: the title lives in content.mjs, so the
 * output is a pure function of the repo and belongs in it. ~20KB each.
 * Re-run it when a post is published or retitled; the prerender warns about a
 * published post with no PNG and falls back to the site-wide preview.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { publishedPosts } from '../src/data/content.mjs';
import { heroArtHtml, ogImagePath } from '../src/data/blog.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const chrome = process.env.CHROME_PATH ?? [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => existsSync(p));
if (!chrome) {
  console.error('build-blog-og: no Chrome found; set CHROME_PATH');
  process.exit(1);
}

const globals = readFileSync(join(root, 'src', 'globals.css'), 'utf8');
const block = globals.match(/hero-art:start[\s\S]*?\*\/([\s\S]*?)\/\* hero-art:end/)?.[1];
if (!block) {
  console.error('build-blog-og: no hero-art:start … hero-art:end block in src/globals.css');
  process.exit(1);
}
const font = `data:font/woff2;base64,${readFileSync(join(root, 'public', 'fonts', 'inter-latin.woff2')).toString('base64')}`;
const page = (title) => `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Inter; src: url(${font}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
  ${block}
</style></head><body>${heroArtHtml(title)}</body></html>`;

const only = process.argv[2];
const posts = publishedPosts().filter((p) => !p.image && (!only || p.slug === only));
if (!posts.length) {
  console.error(`build-blog-og: no published post without an image${only ? ` at "${only}"` : ''}`);
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox'] });
const tab = await browser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const post of posts) {
  await tab.setContent(page(post.title), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  const out = join(root, 'public', ogImagePath(post.slug).replace(/^\//, ''));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, await tab.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } }));
  console.log(`build-blog-og: wrote ${ogImagePath(post.slug)}`);
}
await browser.close();
