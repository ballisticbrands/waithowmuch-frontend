/**
 * Everything the blog's layout needs beyond the post itself: the author, the
 * categories, the heading ids and table of contents, the share links, and the
 * fallback hero.
 *
 * Plain .mjs with a sibling .d.mts for the same reason as content.mjs: the
 * prerender (scripts/postbuild-spa-routes.mjs) and the OG renderer
 * (scripts/build-blog-og.mjs) are plain Node and must produce the same markup
 * the React app renders. Keep this file JSX-free.
 */
import { SITE, BRAND_NAME } from './site.mjs';

/**
 * The one author. Swapping the headshot is a one-file change: replace
 * public/authors/gershon-ballas.{webp,jpg} (256 × 256, cropped square on the
 * face) or point `image` somewhere else here.
 */
export const AUTHOR = {
  name: 'Gershon Ballas',
  jobTitle: 'Co-founder of WaitHowMuch.com',
  /** WebP for the page; the JPEG is the <picture> fallback and the JSON-LD image. */
  image: '/authors/gershon-ballas.webp',
  imageJpg: '/authors/gershon-ballas.jpg',
  imageSize: 256,
};

/** In display order. A category with no published post gets no filter tab. */
export const CATEGORIES = ['Fees & costs', 'Data & rankings', 'Tools', 'Getting started', 'Sourcing', 'Policy'];

/** "Fees & costs" → "fees-costs": the ?topic= value that opens /blog/ on that tab. */
export const categorySlug = (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const categoryPath = (c) => `/blog/?topic=${categorySlug(c)}`;

/** The rendered link-preview card for a post, committed by scripts/build-blog-og.mjs. */
export const ogImagePath = (slug) => `/og/blog/${slug}.png`;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, e) => ENTITIES[e]);
const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const slugify = (s) =>
  s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64).replace(/-+$/, '') ||
  'section';

/**
 * Give every <h2> and <h3> in a post body a stable id, and list the <h2>s as
 * the table of contents.
 *
 * Done here, at render time, rather than by hand in src/data/posts/*.mjs: the
 * ids are derived from the heading text, so they cannot drift from it, and a
 * new post gets anchors without anyone remembering to add them. A heading that
 * already carries an id keeps it. Duplicate texts get -2, -3.
 *
 * The TOC is <h2>s only, like the reference layout: the posts run to 15 <h3>s
 * under 6 <h2>s, and a nav that long stops being a summary.
 */
export function withHeadingIds(html = '') {
  const seen = new Map();
  const toc = [];
  const out = html.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (m, tag, attrs = '', inner) => {
    const title = text(inner);
    const existing = attrs.match(/\sid="([^"]+)"/)?.[1];
    let id = existing;
    if (!id) {
      const base = slugify(title);
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      id = n === 1 ? base : `${base}-${n}`;
    }
    if (tag === 'h2') toc.push({ id, title });
    return existing ? m : `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });
  return { html: out, toc };
}

/** The opening paragraph as plain text, cut at a word boundary: the meta
 *  description and the featured card's excerpt. */
export function excerpt(html = '', max = 155) {
  const first = text(html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '');
  if (first.length <= max) return first;
  const cut = first.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}

/** Minutes at 230 words a minute, never less than 1. */
export const readingMinutes = (html = '') => Math.max(1, Math.round(text(html).split(' ').length / 230));

/** "10 Nov 2026". */
export const dateLabel = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Newest first; ties keep their order in content.mjs. */
export const byDate = (posts) =>
  posts.map((p, i) => [p, i]).sort((a, b) => (b[0].published ?? '').localeCompare(a[0].published ?? '') || a[1] - b[1]).map(([p]) => p);

/**
 * Plain share-intent URLs. No SDKs, no third-party script: each is an ordinary
 * link that opens the network's own composer.
 */
export function shareLinks(path, title) {
  const url = encodeURIComponent(`${SITE}${path}`);
  const t = encodeURIComponent(title);
  return [
    { id: 'x', label: 'Share on X', href: `https://x.com/intent/tweet?url=${url}&text=${t}` },
    { id: 'linkedin', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { id: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  ];
}

/** Share-button glyphs, 16px, as SVG strings so the prerender can print them. */
export const SHARE_ICONS = {
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4L12 18.4"/>',
  x: '<path d="M4 4l16 16M20 4 4 20" />',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v7M7.5 7v.01M11 17v-7M11 13.5c0-2 1.2-3.5 3-3.5s2.5 1.2 2.5 3V17"/>',
  facebook: '<path d="M15.5 3.5H13.5A3.5 3.5 0 0 0 10 7v14M6.5 10.5h7.5"/>',
};
export const shareIcon = (name) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${SHARE_ICONS[name]}</svg>`;

/**
 * The hero for a post with no `image`: black, the title large in white, the
 * WaitHowMuch mark and wordmark small in the corner.
 *
 * One markup string for every place it appears — the post page, every card,
 * the prerendered HTML, and the 1200 × 630 PNG that build-blog-og.mjs renders
 * for og:image — styled by the [data-hero-art] block in globals.css, which that
 * script reads directly. The type is sized in container units, so a 300px card
 * and a 1200px card are the same picture at different sizes.
 *
 * aria-hidden: wherever it appears, the same title is the heading right beside
 * it, and a screen reader does not need it twice.
 */
export function heroArtHtml(title) {
  const len = title.length > 64 ? 'long' : title.length > 40 ? 'mid' : 'short';
  return (
    `<div data-hero-art data-len="${len}" aria-hidden="true">` +
    `<span data-hero-art-title>${esc(title)}</span>` +
    `<span data-hero-art-brand><svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#5b3df5"/>` +
    `<g fill="#fff" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" font-size="24" text-anchor="middle">` +
    `<text x="32" y="30">WH</text><text x="32" y="54">M?</text></g></svg>${BRAND_NAME}</span>` +
    `</div>`
  );
}
