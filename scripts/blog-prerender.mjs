/**
 * The crawler HTML for /blog/ and /blog/<slug>/.
 *
 * Same structure and the same data attributes as pages/Blog.tsx, built from
 * the same modules (content.mjs, blog.mjs), so the page reads correctly before
 * the bundle runs and every word a crawler sees is a word the app shows: the
 * full article, its table of contents, the author and the share links.
 *
 * 🚨 Plain Node, JSX-free. Anything imported here must be too.
 */
import { postPath } from '../src/data/content.mjs';
import {
  AUTHOR, CATEGORIES, byDate, categoryPath, dateLabel, excerpt, heroArtHtml,
  readingMinutes, shareIcon, shareLinks, withHeadingIds,
} from '../src/data/blog.mjs';
import { BRAND_NAME } from '../src/data/site.mjs';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const art = (p) =>
  p.image
    ? `<img src="${esc(p.image.src)}" alt="${esc(p.image.alt)}" width="${p.image.width}" height="${p.image.height}" style="display:block;width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover" />`
    : heroArtHtml(p.title);

const avatar = (size, alt = '') =>
  `<picture><source srcset="${AUTHOR.image}" type="image/webp" /><img src="${AUTHOR.imageJpg}" alt="${esc(alt)}" width="${size}" height="${size}" /></picture>`;

const time = (p) => (p.published ? `<time datetime="${p.published}">${dateLabel(p.published)}</time>` : '');
const meta = (p) =>
  `<div data-post-meta>${avatar(22)}<span>${esc(AUTHOR.name)}</span>${p.published ? `<span aria-hidden="true">·</span>${time(p)}` : ''}</div>`;

const card = (p) =>
  `<a data-post-card href="${postPath(p.slug)}">${art(p)}<div data-card-body><span data-cat>${esc(p.category)}</span><h3>${esc(p.title)}</h3>${meta(p)}</div></a>`;

export function blogIndexBody(published, footer) {
  const posts = byDate(published);
  const [f, ...rest] = posts;
  const topics = CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  return `<main data-main data-blog>
    <header data-blog-head><span data-blog-eyebrow>Blog</span><h1>The ${BRAND_NAME} blog</h1>
    <p>What the numbers across every researched business add up to: fees, costs, margins and the tools sellers use.</p></header>
    <section data-blog-top aria-label="Latest posts">
      <div data-blog-panel><span data-blog-panel-label>Latest</span>
        <a data-feature-card href="${postPath(f.slug)}">${art(f)}<div data-card-body><span data-cat>${esc(f.category)}</span><h2>${esc(f.title)}</h2>${meta(f)}<p>${esc(excerpt(f.body, 170))}</p></div></a>
      </div>
      <div data-blog-panel><span data-blog-panel-label>Also new</span>
        ${rest.slice(0, 4).map((p) => `<a data-spot-card href="${postPath(p.slug)}">${art(p)}<div data-card-body><span data-cat>${esc(p.category)}</span><h3>${esc(p.title)}</h3></div></a>`).join('\n        ')}
      </div>
    </section>
    <section data-blog-browse aria-label="All posts">
      <div data-blog-filters><span data-blog-panel-label>Topics</span>
        <div data-chips>${topics.map((c) => `<a data-chip href="${categoryPath(c)}">${esc(c)}</a>`).join('')}</div>
        <span data-blog-count>${posts.length} posts</span>
      </div>
      <div data-blog-grid>
        ${posts.map(card).join('\n        ')}
      </div>
    </section>
    ${footer}
  </main>`;
}

export function blogPostBody(post, footer) {
  const { html, toc } = withHeadingIds(post.body ?? '');
  const path = postPath(post.slug);
  const list = `<ul>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.title)}</a></li>`).join('')}</ul>`;
  const share = shareLinks(path, post.title)
    .map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}">${shareIcon(s.id)}</a>`)
    .join('');
  return `<main data-main data-blog-post>
  <header data-post-head>
    <div data-post-head-text>
      <nav data-post-trail aria-label="Breadcrumb"><a data-pill href="/blog/">Blog</a><span aria-hidden="true">/</span><a data-pill href="${categoryPath(post.category)}">${esc(post.category)}</a></nav>
      <h1>${esc(post.title)}</h1>
      <div data-post-meta>${post.published ? `${time(post)}<span aria-hidden="true">·</span>` : ''}<span>${readingMinutes(post.body)} min read</span></div>
      <div data-author>${avatar(48)}<div><strong>${esc(AUTHOR.name)}</strong><span>${esc(AUTHOR.jobTitle)}</span></div></div>
    </div>
    <figure data-post-hero>${art(post)}</figure>
  </header>
  <div data-post-layout>
    <aside data-post-side>
      ${toc.length ? `<nav data-post-toc aria-label="Table of contents"><span data-side-label>Table of contents</span>${list}</nav>
      <details data-toc-mobile><summary>Table of contents</summary>${list}</details>` : ''}
      <div data-share-wrap><span data-side-label>Share article</span><div data-share><button type="button" aria-label="Copy link" title="Copy link">${shareIcon('link')}</button>${share}</div></div>
    </aside>
    <article data-prose data-post-body>
${html}
    </article>
  </div>
  ${footer}
</main>`;
}
