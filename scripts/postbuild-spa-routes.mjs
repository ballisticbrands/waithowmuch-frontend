/**
 * Writes a real static HTML file per route, so the server returns 200 with
 * SUBSTANTIVE content instead of an empty shell.
 *
 * 🚨 Not optional. A client-rendered SPA that ships an identical contentless
 * shell on every URL gets every page indexed as a duplicate, and on a sibling
 * product held Google Ads Quality Score at 1-3/10 through four days of paid
 * traffic. Speed tests do NOT catch it — Lighthouse runs JavaScript and sees a
 * fine page. The only way to see it is to look at what the server returns.
 *
 * This is prerendering, not cloaking: every word emitted here comes from the
 * same modules the React app renders from — src/data/collections.mjs and
 * src/businesses/index.mjs — which is precisely why those are plain .mjs.
 * Copy that lives only inside JSX is invisible to this script.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, API_BASE, BRAND_NAME, businessPath } from '../src/data/site.mjs';
import { COLLECTIONS, MORE, DESCRIPTIONS, collectionPath } from '../src/data/collections.mjs';
import { profileFor } from '../src/businesses/index.mjs';
import { resolveSelling } from '../src/businesses/selling-methods.mjs';
import { scoreProfile } from '../src/valuation/inputs.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
let shell = readFileSync(join(dist, 'index.html'), 'utf8');

// ── Inline the stylesheet ────────────────────────────────────────────
// Vite emits <link rel="stylesheet">, which is RENDER-BLOCKING: on throttled
// mobile the browser parses the HTML, discovers the link, then spends another
// round trip before it can paint anything. That measured FCP 2.9s -> LCP 5.0s
// (PSI mobile 75) while desktop sat at 0.3s. Inlining took mobile to 100.
//
// 🚨 Past ~15KB reverse this and inline only critical CSS: the per-page
// duplication starts costing more than the round trip saves.
const cssHref = shell.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (cssHref) {
  const css = readFileSync(join(dist, cssHref[1].replace(/^\//, '')), 'utf8');
  if (css.length > 15_000) console.warn(`postbuild: stylesheet is ${css.length}B — past the point where inlining pays.`);
  shell = shell.replace(cssHref[0], `<style>${css}</style>`);
  console.log(`postbuild: inlined ${css.length}B of CSS`);
}

/**
 * The bundle must be reachable — i.e. its <script> must not be sitting inside
 * an HTML comment.
 *
 * This is the build-time half of the `insertIntoHead` fix below. A swallowed
 * script tag produces a page that serves 200, looks correct in `view-source`,
 * passes every word-count and SEO check here, and is COMPLETELY DEAD in a
 * browser: no React, no analytics, no interactivity. Nothing else in this
 * pipeline notices. One assertion is cheap insurance against shipping that.
 */
function assertBundleReachable(html, label) {
  const masked = html.replace(/<!--[\s\S]*?-->/g, '');
  if (!/<script[^>]*\ssrc=/.test(masked)) {
    console.error(`postbuild: ${label} has no executable <script src> outside a comment — the bundle would never run.`);
    process.exit(1);
  }
}
assertBundleReachable(shell, 'the built shell');

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const money = (v, c = 'USD') => {
  if (v === null || v === undefined || v === '') return null;
  const sym = c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '';
  return `${sym}${Math.round(Number(v)).toLocaleString('en-US')}`;
};

/* "Sep 2026". Mirrors monthLabel in lib/format.ts — this script is plain Node
   and cannot import the TypeScript module, and a headline's frozen month has
   to read identically in the crawler HTML and in the app. */
const monthLabel = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function render({ path, title, description, body, bootstrap }) {
  let html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`);

  const canonical = `${SITE}${path}`;
  const head = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].join('\n    ');
  html = insertIntoHead(html, `  ${head}\n  `);

  // Inline the data the first render needs. Without it React mounts, clears
  // the prerendered markup, and shows a spinner until the API answers — so LCP
  // waits on a round trip that has not started until the bundle has parsed.
  //
  // `<` is escaped: a business name or source note containing "</script>"
  // would otherwise close the tag early and inject the rest as markup.
  if (bootstrap) {
    const json = JSON.stringify(bootstrap).replace(/</g, '\\u003c');
    html = insertIntoHead(html, `  <script>window.__WHM_BOOTSTRAP__=${json}</script>\n  `);
  }

  return html.replace('<div id="root"></div>', `<div id="root" data-prerender>${body}</div>`);
}

function write(path, html) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

const MIN_WORDS = 120;

/** Rendered in the footer of every page by Layout.tsx. Emitted here because a
 *  crawler fetching the raw HTML sees no footer otherwise — and it is genuine
 *  on-page copy, not text written for crawlers. Keep it in sync with Layout. */
const FOOTER = `<p>${BRAND_NAME} publishes revenue and profit for real businesses. Unless a profile
   says otherwise, the figures are estimates built from public information — not the company's
   accounts. Every profile shows how its numbers were reached.</p>`;
const words = (html) =>
  html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

/**
 * Insert markup immediately before the real closing </head>.
 *
 * 🪤 Why this is not a plain `.replace('</head>', ...)`: that replaces the
 * FIRST occurrence of the literal string anywhere in the file — including
 * inside an HTML COMMENT. A perfectly reasonable comment in index.html that
 * mentioned the closing head tag caused every injected tag, and the module
 * script tag with them, to be spliced INTO that comment. The browser then
 * never executed the bundle: no React, no analytics, a blank page. The build
 * printed no error and the HTML looked fine at a glance. It cost a real
 * debugging detour on 2026-09-10.
 *
 * So: find the first closing head tag that is not inside a comment.
 */
function insertIntoHead(html, snippet) {
  // Blank out comment bodies so their offsets still line up, then search.
  const masked = html.replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length));
  const i = masked.indexOf('</head>');
  if (i === -1) throw new Error('postbuild: no closing </head> outside a comment');
  return `${html.slice(0, i)}${snippet}${html.slice(i)}`;
}

/** Fail the build on a thin SEO destination. Raise this threshold, never lower
 *  it to make a build pass — a thin page looks completely fine in every tool
 *  that executes JavaScript. Home, auth and legal routes are exempt: nobody
 *  lands on /terms from a search, and / is a deliberate placeholder for now. */
function guard(path, html) {
  const n = words(html.slice(html.indexOf('<div id="root"')));
  if (n < MIN_WORDS) {
    console.error(`postbuild: ${path} is only ${n} crawler-visible words (min ${MIN_WORDS}).`);
    process.exit(1);
  }
}

function softGuard(path, html, itemCount) {
  const n = words(html.slice(html.indexOf('<div id="root"')));
  if (n < MIN_WORDS) {
    console.warn(
      `postbuild: ⚠️ ${path} is ${n} crawler-visible words (target ${MIN_WORDS}) — ` +
      `only ${itemCount} idea(s) to list. This resolves as the catalogue grows; ` +
      `do NOT pad it with copy the page does not show.`,
    );
  }
}

const get = async (path) => {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
};

let categories = [];
try {
  categories = (await get('/v1/categories')).categories ?? [];
} catch { /* filters degrade to empty; not worth failing a deploy */ }

// ── Collection pages ──────────────────────────────────────────────────
for (const c of [...COLLECTIONS]) {
  let businesses = [];
  let total = 0;
  try {
    const data = await get(`/v1/businesses?limit=100${c.query ? `&${c.query}` : ''}`);
    businesses = data.businesses ?? [];
    total = data.total ?? businesses.length;
  } catch (err) {
    console.warn(`postbuild: ${c.slug} — API unreachable (${err.message})`);
  }

  const list = businesses.slice(0, 40).map((b) => {
    const rev = money(b.latestMonthlyRevenue, b.currency);
    const margin = b.latestMarginPct != null ? `${Math.round(Number(b.latestMarginPct))}% margin` : null;
    const cost = money(b.startingCost, b.currency);
    return `<li><a href="${businessPath(b.slug)}">${esc(b.name)}</a>${b.tagline ? ` — ${esc(b.tagline)}` : ''}${
      rev ? ` · ${rev}/mo` : ''}${margin ? ` · ${margin}` : ''}${cost ? ` · ${cost} to start` : ''}</li>`;
  }).join('\n      ');

  const body = `
    <h1>${esc(c.title)}</h1>
    <ul>
      ${list || '<li>No ideas published yet.</li>'}
    </ul>
    ${FOOTER}
    <p><a href="/how-we-research/">How we research these figures</a></p>`.trim();

  const html = render({
    path: collectionPath(c.slug),
    title: `${c.title} — ${BRAND_NAME}`,
    description: DESCRIPTIONS[c.slug] ?? '',
    body,
    bootstrap: { route: 'ideas', collection: c.slug, businesses, total, categories },
  });
  // ⚠️ WARN, not fail, for collection pages.
  //
  // Everywhere else a thin page means someone forgot to write copy. Here the
  // content IS the listing, and it grows with the catalogue — so with three
  // businesses the page is legitimately short, and failing the build would
  // only tempt someone to pad it with prose written for crawlers. It is
  // logged loudly so it cannot pass unnoticed.
  softGuard(collectionPath(c.slug), html, businesses.length);
  write(collectionPath(c.slug), html);
}

// ── Legacy alias: /data/all-ideas/ → /data/ ───────────────────────────
//
// The default collection moved to /data/. Without a real file here GitHub
// Pages returns 404.html — the SPA fallback redirects a browser correctly, but
// the STATUS is 404, so a crawler that already has the old URL records a dead
// page instead of following the move. A canonical plus a meta refresh gets
// both a 200 and an unambiguous signal about where the page went.
write('/data/all-ideas/', insertIntoHead(
  shell.replace(/<title>[^<]*<\/title>/, `<title>The Idea Database — ${BRAND_NAME}</title>`),
    `  <link rel="canonical" href="${SITE}/data/" />\n` +
    `  <meta http-equiv="refresh" content="0; url=/data/" />\n  `)
  .replace('<div id="root"></div>',
    `<div id="root" data-prerender><p>This page moved to <a href="/data/">The Idea Database</a>.</p></div>`));

// ── More ideas ────────────────────────────────────────────────────────
const facetList = categories.map((f) => `<li>${esc(f.name)} (${f.businessCount})</li>`).join('\n      ');
const moreHtml = render({
  path: collectionPath(MORE.slug),
  title: `${MORE.title} — ${BRAND_NAME}`,
  description: DESCRIPTIONS['more-ideas'] ?? MORE.blurb,
  body: `
    <h1>${esc(MORE.title)}</h1>
    <p>${esc(MORE.blurb)}</p>
    <p>Browse by collection, or narrow by any of the tags below. Each tag is a different way
       of asking the same question, so it helps to know what they mean.</p>
    <p><strong>Niche</strong> describes what a business actually sells — supplements, card
       games, pet supplies. <strong>Model</strong> describes how it is built: private label,
       dropshipping, print on demand, agency. <strong>Platform</strong> and
       <strong>channel</strong> describe where the selling happens, which is often more than
       one place at once. <strong>Growth channel</strong> is usually the most interesting of
       the four, because it describes how a business actually found its customers rather than
       what it sells them — short-form video, search, paid social, wholesale, community.
       <strong>Who it sells to</strong> narrows by customer rather than by product.</p>
    <p>Every slice shows the same three figures: monthly revenue, margin, and what it cost to
       get started. Most are estimates built from public information rather than the company's
       accounts, and each profile says how its numbers were reached.</p>
    <ul>
      ${COLLECTIONS.map((c) => `<li><a href="${collectionPath(c.slug)}">${esc(c.title)}</a></li>`).join('\n      ')}
      ${facetList}
    </ul>`.trim(),
});
guard(collectionPath(MORE.slug), moreHtml);
write(collectionPath(MORE.slug), moreHtml);

// ── Business pages ────────────────────────────────────────────────────
let all = [];
try {
  all = (await get('/v1/businesses?limit=100')).businesses ?? [];
} catch { /* handled below */ }

const METHOD_PHRASE = {
  RESEARCHED: 'modelled by us from public information',
  SELF_REPORTED: 'reported by the owner and not independently checked',
  INTERVIEW: 'given by the owner on the record',
  VERIFIED: 'read from a connected account rather than estimated',
};

for (const b of all) {
  let detail = null;
  let metrics = null;
  let caseStudy = null;
  try {
    detail = (await get(`/v1/businesses/${encodeURIComponent(b.slug)}`)).business;
    // The whole MetricsResponse, not just the rows: the client needs `types`
    // to know which series are FLOW and safe to chart.
    metrics = await get(`/v1/businesses/${encodeURIComponent(b.slug)}/metrics`);
    /* The published freeze, newest first. Fetched HERE rather than left to the
       client because the headline it carries is the first thing on the page —
       a crawler that has to run JavaScript to see it does not see it. */
    caseStudy =
      (await get(`/v1/businesses/${encodeURIComponent(b.slug)}/case-studies`)).caseStudies[0] ?? null;
  } catch { /* the page still works, it just fetches on mount */ }

  const rev = money(b.latestMonthlyRevenue, b.currency);
  const profit = money(b.latestMonthlyProfit, b.currency);
  const margin = b.latestMarginPct != null ? `${Math.round(Number(b.latestMarginPct))}%` : null;
  const cost = money(b.startingCost, b.currency);
  const cats = (b.categories ?? []).map((c) => c.name).join(', ');
  const method = METHOD_PHRASE[b.researchMethod] ?? METHOD_PHRASE.RESEARCHED;

  // The authored profile, flattened to text. This is the reason
  // src/businesses/*.mjs is JSX-free: prose that lives only in a component is
  // invisible here, and the page would ship thin while looking perfect.
  const profile = profileFor(b.slug);
  /* Same precedence as pages/Business.tsx: the PUBLISHED row wins over the
     authored draft in the .mjs. Two renderers reading the same order is the
     only way the crawler HTML and the app can agree about which month the
     headline is frozen at. */
  const headline = caseStudy
    ? { title: caseStudy.title, subtitle: caseStudy.subtitle, snapshotMonth: caseStudy.snapshotMonth }
    : profile?.headline ?? null;
  const flatten = (blocks) =>
    blocks.map((blk) => {
          switch (blk.type) {
            case 'section': return `<h2>${esc(blk.title)}</h2>`;
            case 'facts': return `<ul>${blk.items.map((f) =>
              `<li>${esc(f.label)}: ${esc(f.value)}${f.note ? ` — ${esc(f.note)}` : ''}</li>`).join('')}</ul>`;
            case 'heading': return `<h2>${esc(blk.text)}</h2>`;
            case 'prose': return `<p>${esc(blk.text)}</p>`;
            case 'lede': return `<p><strong>${esc(blk.text)}</strong></p>`;
            /* The margin row is computed here too, off the same lines, so the
               static page cannot state a total the app does not. */
            case 'margin': {
              const total = 100 + blk.lines.reduce((a, l) => a + l.pct, 0);
              return `<ul>${blk.lines.map((l) =>
                `<li>${esc(l.label)}: ${l.pct}% of revenue${l.detail ? ` — ${esc(l.detail)}` : ''}</li>`).join('')}` +
                `<li><strong>Margin: ${total}%</strong>${blk.note ? ` — ${esc(blk.note)}` : ''}</li></ul>`;
            }
            case 'table': return [
              blk.caption ? `<h3>${esc(blk.caption)}</h3>` : '',
              `<table><thead><tr>${blk.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>`,
              `<tbody>${blk.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`,
              blk.note ? `<p>${esc(blk.note)}</p>` : '',
            ].filter(Boolean).join('');
            /* 🚨 The three figures ARE the valuation section — without this the
               page's whole point is invisible to a crawler, and the section
               reads as one thin paragraph. Computed the same way the component
               computes it, off the same series, so the two cannot disagree. */
            case 'valuation': {
              const v = profile?.valuation;
              /* 🚨 scoreProfile, NOT valueBusiness. This branch used to pick
                 between the model and a stated multiple itself, which made it
                 the second place that decision was written down — and the two
                 had already drifted: the app pinned the model's clock to the
                 series while this one still read `new Date()`, so the static
                 page and the app printed different multiples for the same
                 business on either side of an age boundary. One function now
                 answers for both. */
              /* The resolved headline, not the authored one: scoreProfile dates
                 the multiple from `headline.snapshotMonth`, so handing it the
                 .mjs draft while the page prints the published row's month
                 would put two different freeze dates on one page. */
              const scored = scoreProfile(profile ? { ...profile, headline } : profile, metrics);
              if (!v || !scored || scored.multiple === null) return '';
              return `<p>Indicative valuation: <strong>${money(scored.value, b.currency)}</strong> —
                ${scored.multiple}× a trailing-twelve net profit of ${money(scored.netProfitTtm, b.currency)}.
                ${esc(v.basis)}</p>`;
            }
            /* 🚨 Renders from `profile.selling`, not from the block — the
               block carries no data, exactly like `valuation`. The negatives
               are emitted too: a crawler seeing only the confirmed methods
               gets a shorter and more flattering business than the one the
               page describes. */
            case 'selling': {
              const groups = resolveSelling(profile?.selling);
              const say = (ms) => ms.map((m) => esc(m.label)).join(', ');
              return groups.map((g) => {
                const yes = g.methods.filter((m) => m.status === 'yes');
                const no = g.methods.filter((m) => m.status === 'no');
                const unchecked = g.methods.filter((m) => m.status === 'unchecked');
                if (!yes.length && !no.length) return '';
                return [
                  `<h3>${esc(g.title)}</h3>`,
                  yes.length
                    ? `<ul>${yes.map((m) =>
                        `<li>${esc(m.label)}${m.note ? ` — ${esc(m.note)}` : ''}</li>`).join('')}</ul>`
                    : '',
                  no.length ? `<p>Not present: ${say(no)}.</p>` : '',
                  unchecked.length ? `<p>Not checked: ${say(unchecked)}.</p>` : '',
                ].filter(Boolean).join('');
              }).filter(Boolean).join('');
            }
            case 'breakdown': return [
              blk.intro ? `<p>${esc(blk.intro)}</p>` : '',
              `<ul>${blk.items.map((i) =>
                `<li>${i.image ? `<img src="${esc(i.image)}" alt="" width="36" height="36" /> ` : ''}${
                  esc(i.name)}${i.asin ? ` (${esc(i.asin)})` : ''}: ${money(i.revenue, b.currency) ?? ''} a month${
                  i.price ? ` at ${money(i.price, b.currency)}` : ''}</li>`).join('')}</ul>`,
              blk.note ? `<p>${esc(blk.note)}</p>` : '',
            ].filter(Boolean).join('');
            /* 🚨 The alt text is the whole of this block in the static copy —
               a crawler gets no picture, so an image with a thin alt ships it
               nothing at all. Which is why `alt` is required on the type. */
            case 'image': return [
              `<img src="${esc(blk.src)}" alt="${esc(blk.alt)}"${
                blk.width ? ` width="${blk.width}"` : ''} />`,
              blk.caption ? `<p>${esc(blk.caption)}</p>` : '',
            ].filter(Boolean).join('');
            /* Both figures AND the note. On the advertising and traffic
               sections the note is the row's whole point — without it a
               crawler gets a list of channel names and one modelled range. */
            case 'channels': return [
              blk.caption ? `<h3>${esc(blk.caption)}</h3>` : '',
              `<ul>${blk.items.map((c) => {
                const head = c.href ? `<a href="${esc(c.href)}">${esc(c.label)}</a>` : esc(c.label);
                return `<li>${head}${c.value ? `: ${esc(c.value)}` : ''}${
                  c.counted ? ` — counted: ${esc(c.counted)}` : ''}${
                  c.note ? ` ${esc(c.note)}` : ''}</li>`;
              }).join('')}</ul>`,
              blk.note ? `<p>${esc(blk.note)}</p>` : '',
            ].filter(Boolean).join('');
            case 'callout': return `<p>${esc(blk.text)}</p>`;
            /* The links row is the one block whose content comes from the DB
               record rather than from the authored profile. 🚨 Off `detail`,
               NOT off `b`: `b` is the LISTING projection and carries no
               links, so reading it here emitted an empty <ul> and the section
               shipped a crawler a page discussing an audience with no account
               on it. `detail` is null only when that fetch failed, in which
               case there is nothing to list anyway. */
            case 'links': return `<ul>${(detail?.links ?? []).map((l) =>
              `<li><a href="${esc(l.url)}" rel="nofollow noopener">${
                esc(l.label ?? l.handle ?? l.platform)}</a>${
                typeof l.followerCount === 'number'
                  ? ` — ${l.followerCount.toLocaleString('en-US')} followers` : ''}</li>`).join('')}</ul>`;
            case 'quote': return `<blockquote>${esc(blk.text)}</blockquote>`;
            case 'list': return `<ul>${blk.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
            case 'timeline': return `<ul>${blk.items.map((i) =>
              `<li>${esc(i.when)}${i.tag ? ` — ${esc(i.tag)}` : ''}: ${esc(i.what)}${
                i.detail ? ` ${esc(i.detail)}` : ''}</li>`).join('')}</ul>`;
            default: return ''; // stat/chart are figures, emitted below
          }
        }).filter(Boolean).join('\n    ');

  /* 🚨 A PAGINATED profile is one page per section in the app, so it has to be
     one FILE per section here. Emitting every section at the business root
     while the app shows only the overview there would serve a crawler content
     no visitor sees at that URL — which is the one thing the note at the top
     of this file promises this script does not do. Sections are split at the
     `section` markers, exactly as components/ProfileBlocks.tsx splits them. */
  const parts = [{ id: null, title: null, blocks: [] }];
  for (const blk of profile?.blocks ?? []) {
    if (blk.type === 'section') parts.push({ id: blk.id, title: blk.title, blocks: [blk] });
    else parts[parts.length - 1].blocks.push(blk);
  }
  const paginated = parts.length > 1;

  const authored = profile
    ? [profile.intro ? `<p>${esc(profile.intro)}</p>` : '', flatten(parts[0].blocks)]
        .filter(Boolean).join('\n    ')
    : '';

  const body = `
    <h1>${esc(b.name)}</h1>
    ${b.tagline ? `<p>${esc(b.tagline)}</p>` : ''}
    <p><strong>Researched profile.</strong> Nobody from this business wrote this page —
       the figures are ${method}, published with the sources they were drawn from.
       <a href="/how-we-research/">How we research</a>.</p>
    ${headline ? `<h2>${esc(headline.title)}</h2>
    <p>${esc(headline.subtitle)}</p>
    <p>Headline frozen at ${esc(monthLabel(headline.snapshotMonth))}. The figures below are current.</p>` : ''}
    <p>${esc(b.name)} is estimated to make ${rev ?? 'an undisclosed amount'} per month in
       revenue${profit ? `, on roughly ${profit} of monthly profit` : ''}${margin ? ` — a margin of about ${margin}` : ''}.${
       cost ? ` It is estimated to have cost around ${cost} to start.` : ''}
       ${cats ? `It operates in ${esc(cats)}.` : ''}</p>
    ${authored}
    <p><a href="${collectionPath('all-ideas')}">All ideas</a></p>`.trim();

  const html = render({
    path: businessPath(b.slug),
    title: `${b.name}${rev ? ` — ${rev}/mo` : ''} | ${BRAND_NAME}`,
    description: `${b.name}: ${rev ?? 'revenue'} per month${margin ? `, ${margin} margin` : ''}. ${method}, with sources.`,
    body,
    bootstrap: detail
      ? { route: 'business', slug: b.slug, business: detail, metrics, caseStudy }
      : undefined,
  });
  guard(businessPath(b.slug), html);
  write(businessPath(b.slug), html);

  // One file per section, matching the app's routes.
  for (const part of paginated ? parts.slice(1) : []) {
    const sectionBody = `
    <h1>${esc(b.name)} — ${esc(part.title)}</h1>
    <p><strong>Researched profile.</strong> The figures here are ${method}, published with the
       sources they were drawn from. <a href="/how-we-research/">How we research</a>.</p>
    ${flatten(part.blocks)}
    <p><a href="${businessPath(b.slug)}">${esc(b.name)} overview</a> ·
       <a href="${collectionPath('all-ideas')}">All ideas</a></p>`.trim();

    const sectionHtml = render({
      path: `${businessPath(b.slug)}${part.id}/`,
      title: `${b.name}: ${part.title} | ${BRAND_NAME}`,
      description: `${part.title} for ${b.name}. ${method}, with sources.`,
      body: sectionBody,
      bootstrap: detail ? { route: 'business', slug: b.slug, business: detail, metrics } : undefined,
    });
    /* ⚠️ WARN, not fail. A section is deliberately short — that is the whole
       point of splitting the profile — so the 120-word floor written for a
       whole page would fail a build over a Timeline that is doing its job.
       It is logged loudly so a genuinely empty section cannot pass unnoticed. */
    softGuard(`${businessPath(b.slug)}${part.id}/`, sectionHtml, part.blocks.length);
    write(`${businessPath(b.slug)}${part.id}/`, sectionHtml);
  }
}

// ── Static routes ─────────────────────────────────────────────────────
const STATIC = [
  { path: '/how-we-research/', guard: true, title: `How we research — ${BRAND_NAME}`,
    description: `How ${BRAND_NAME} builds its figures, what each profile label means, and where the estimates are most likely to be wrong.`,
    body: `<h1>How we research</h1>
    <p>Almost every profile here is a researched profile. Nobody from the business wrote it.
       We gather what is publicly visible, work the economics out ourselves, and publish the
       result with the sources attached.</p>
    <h2>Where the numbers come from</h2>
    <ul><li>Marketplace listings, pricing, review velocity and catalogue size</li>
        <li>Public advertising libraries</li>
        <li>Social footprints — follower counts, posting history, engagement</li>
        <li>Company filings and registrations where they exist</li></ul>
    <h2>What the labels mean</h2>
    <ul><li>Researched — modelled by us from public information. Treat as an estimate.</li>
        <li>Owner-reported — the owner gave us the figures. We have not checked them.</li>
        <li>Interview — the owner gave the figures on the record.</li>
        <li>Verified — read from a connected account rather than estimated.</li></ul>
    <h2>Where we are likely to be wrong</h2>
    <p>Estimates go wrong in predictable ways: a business selling through channels we cannot
       see looks smaller than it is, and one running heavy discounts looks more profitable.
       Margins are the softest figure on any page, because costs are the hardest thing to
       observe from outside.</p>` },
  /* The reference behind the Sourcing / Catalogue / Differentiation ⓘ on every
     profile. Guarded like the other content routes: it is linked from every
     profile and is a page a crawler will follow, so it has to be worth landing
     on without JavaScript. The static copy carries the DEFINITIONS — the
     figures on the real page are illustrations and lose nothing by being
     absent here. */
  { path: '/business-attributes/', guard: true, title: `Business attributes — ${BRAND_NAME}`,
    description: 'The three attributes describing how a business is built rather than what it earns: sourcing, catalogue structure and differentiation — with every option defined.',
    body: `<h1>Business attributes</h1>
    <p>Every profile carries three attributes describing how the business is <em>built</em>,
       alongside the figures describing what it earns: sourcing, catalogue structure and
       differentiation. They matter because two businesses with identical revenue can be worth
       very different amounts. A private-label brand with tooling nobody can copy and a
       retail-arbitrage account with the same monthly profit are not the same asset, and the
       difference is not visible in the numbers.</p>
    <h2>Sourcing</h2>
    <p>How the business gets its product — the single method most of its revenue comes from.
       It is the strongest signal of what actually transfers in a sale: a brand you own conveys
       to a buyer, a knack for finding discounted stock does not. Placed by us from the public
       record, not stated by the seller.</p>
    <ul><li><b>Private label</b> — the seller puts their own brand on the product and controls its
            spec. Nobody else sells the identical listing.</li>
        <li><b>Wholesale</b> — buys an existing branded product in bulk and resells it. Other
            sellers can list the same product.</li>
        <li><b>Dropship</b> — lists products it never holds; a third party ships to the customer.</li>
        <li><b>Arbitrage</b> — buys already-branded products at a discount and resells at a markup,
            with no ongoing supplier relationship.</li>
        <li><b>Handmade / artisan</b> — the seller physically makes the product.</li>
        <li><b>Print on demand</b> — a third-party print service fulfils a listing the seller owns.</li>
        <li><b>Merch on Demand</b> — Amazon's closed royalty programme; Amazon sets the price.</li>
        <li><b>KDP</b> — Amazon's publishing royalty programme, for books and similar.</li></ul>
    <h2>Catalogue structure</h2>
    <p>The shape of the catalogue: whether revenue rests on one product, a handful, a long tail
       of variations, or a portfolio with no anchor. It tells a buyer what running the business
       involves day to day, and where it breaks if a single listing stalls.</p>
    <ul><li><b>Broad catalogue, low volume each</b> — many SKUs, each aimed at a small slice of
            search demand.</li>
        <li><b>Flagship + complementary</b> — one dominant product, with adjacent products sold
            alongside it.</li>
        <li><b>Concentrated bets, few SKUs</b> — a handful of independently significant products
            with no filler.</li>
        <li><b>Category dominance</b> — most or all major variations within one narrow category.</li>
        <li><b>Trend / seasonal churn</b> — launch against a trend, ride it, retire it, launch the
            next one.</li>
        <li><b>Generalist portfolio</b> — products spread across unrelated categories with no
            anchor.</li></ul>
    <h2>Differentiation</h2>
    <p>How hard the product is for a competitor to copy. The principle is that complexity, cost
       and time spent make a product defensible — and that the uniqueness has to be visible to
       the customer. A factual checklist rather than a rating: the questions are answered in
       order and the level is the first one that gets a yes.</p>
    <ul><li><b>Level 1 — standard product</b> — off-the-shelf with a logo on it; a competitor
            orders the same base unit from the same factory within days.</li>
        <li><b>Level 2 — cosmetic variation</b> — visible changes to form, copyable by requesting
            a variant from the same manufacturer.</li>
        <li><b>Level 3 — functional customisation</b> — several real changes to form, features or
            materials. Copying it means re-sourcing components and re-engineering.</li>
        <li><b>Level 4 — hard to copy</b> — fully custom, protected by manufacturing complexity or
            IP; typically a mould, tooling or a patent.</li></ul>
    <h2>Where these appear</h2>
    <p>All three sit under Additional metrics on a profile. None can be read off a set of figures
       and none is worth guessing, so a profile we have not placed shows a question mark rather
       than an answer. A question mark means nobody has placed it yet — not that the answer is
       none, and not a judgement about the business.</p>` },
  { path: '/about/', title: `About ${BRAND_NAME}`, guard: true,
    description: `What ${BRAND_NAME} is and how seriously to take its figures.`,
    body: `<h1>About ${BRAND_NAME}</h1>
    <p>${BRAND_NAME} publishes what businesses actually make — revenue, profit and margin for
       companies most people have never heard of.</p>
    <p>Most of these figures are estimates, built from public information rather than the
       company's accounts, and we do not pretend otherwise. Every profile says how its numbers
       were reached and links to the sources behind them, so you can judge them rather than
       taking our word for it.</p>
    <p>Where an owner has confirmed a figure, or it was read from a connected account, the
       profile says that too. The distinction is the point: an estimate presented as a fact is
       worse than no number at all.</p>
    <p>The reason to publish estimates at all is that the alternative is silence. Almost no
       small business discloses what it makes, so the only numbers most people ever see come
       from the handful of founders willing to talk publicly — which is a badly skewed sample,
       weighted towards the ones with something to sell you. A careful estimate with its
       working shown is more useful than that, provided it is labelled honestly.</p>
    <p>So every figure here carries its method, its date and its sources. If a profile is
       wrong and it is yours, email hello@waithowmuch.com and we will correct or remove it.</p>` },
  { path: '/privacy/', title: `Privacy — ${BRAND_NAME}`,
    description: `What ${BRAND_NAME} stores about you, and how to have it deleted.`,
    body: `<h1>Privacy</h1>
    <p>If you create an account we store your email address, and where you came from. That is
       it. No password, no name, no payment method.</p>
    <p>To have your account and its data deleted, email hello@waithowmuch.com.</p>` },
  { path: '/terms/', title: `Terms — ${BRAND_NAME}`,
    description: `Terms of use. Figures are estimates unless a profile states otherwise.`,
    body: `<h1>Terms</h1>
    <p>${BRAND_NAME} is provided as-is, for information only. Figures are estimates unless a
       profile explicitly states otherwise, and must not be relied on for any investment,
       acquisition or lending decision.</p>` },
  { path: '/login/', title: `Sign in — ${BRAND_NAME}`,
    description: `Sign in to ${BRAND_NAME} with a one-time email link or with Google.`,
    body: `<h1>Sign in</h1>
    <p>Everything here is free to read — an account just remembers you. No password: enter your
       email and we send a one-time link.</p>` },
];

for (const r of STATIC) {
  const html = render(r);
  if (r.guard) guard(r.path, html);
  write(r.path, html);
}

// ── Home (deliberately a placeholder) ─────────────────────────────────
write('', render({
  path: '/',
  title: `${BRAND_NAME} — what businesses actually make`,
  description: 'Revenue, profit and margin for businesses you have never heard of. Researched from public data, with sources on every profile.',
  body: `<h1>${BRAND_NAME}</h1>
    <p>Revenue, profit and margin for businesses most people have never heard of.</p>
    <p><a href="${collectionPath('all-ideas')}">Browse all ideas</a> · <a href="/how-we-research/">How we research</a></p>`,
}));

// SPA fallback.
writeFileSync(join(dist, '404.html'), render({
  path: '/', title: BRAND_NAME,
  description: 'Revenue and profit for businesses you have never heard of.',
  body: `<h1>${BRAND_NAME}</h1><p><a href="${collectionPath('all-ideas')}">Browse all ideas</a></p>`,
}));

console.log(`postbuild: ${COLLECTIONS.length} collections, ${all.length} businesses, ${STATIC.length} static routes`);
