/**
 * Writes a real static HTML file per route, so GitHub Pages returns 200 with
 * SUBSTANTIVE content instead of a soft-404 or an empty shell.
 *
 * 🚨 This is not optional and it is not just about status codes. A client-
 * rendered SPA that ships an identical contentless shell on every URL gets
 * every page indexed as a duplicate, and (on a sibling product) held Google
 * Ads Quality Score at 1-3/10 for four days of paid traffic because the
 * "landing page experience" was correctly judged as an empty page. Speed tests
 * do NOT catch it — Lighthouse runs JavaScript and sees a fine page. The only
 * way to see it is to look at what the server actually returns.
 *
 * Business pages are built from the live API, so the copy a crawler sees is
 * the copy the React app renders from. That is prerendering, not cloaking —
 * never inject text the page does not actually show.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, API_BASE, BRAND_NAME, businessPath } from '../src/data/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shell = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const money = (v, c = 'USD') => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  const sym = c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '';
  return `${sym}${Math.round(n).toLocaleString('en-US')}`;
};

/** Replace the head tags and inject a real content block inside #root. */
function render({ path, title, description, body }) {
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
  html = html.replace('</head>', `  ${head}\n  </head>`);

  // `data-prerender` marks the block for main.tsx. See the note there about
  // why this is replaced rather than hydrated.
  return html.replace('<div id="root"></div>', `<div id="root" data-prerender>${body}</div>`);
}

function write(path, html) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

const MIN_WORDS = 120;
/** Fail the build on a thin SEO destination. Raise this threshold, never
 *  lower it to make a build pass — the whole point is that a thin page looks
 *  completely fine in every tool that executes JavaScript. Support/legal/auth
 *  routes are exempt: nobody lands on /terms from a search. */
function guard(path, html) {
  const n = words(html.slice(html.indexOf('<div id="root"')));
  if (n < MIN_WORDS) {
    console.error(`postbuild: ${path} is only ${n} crawler-visible words (min ${MIN_WORDS}).`);
    process.exit(1);
  }
}

const words = (html) =>
  html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

let businesses = [];
try {
  const res = await fetch(`${API_BASE}/v1/businesses?limit=100`);
  businesses = (await res.json()).businesses ?? [];
  console.log(`postbuild: ${businesses.length} businesses from the API`);
} catch (err) {
  // Warn, never fail: a transient API blip should cost the business pages
  // their static copy, not the whole deploy.
  console.warn(`postbuild: could not reach ${API_BASE} — business routes get the shell only (${err.message})`);
}

// ── Home ──────────────────────────────────────────────────────────────
const list = businesses.slice(0, 24).map((b) => {
  const rev = money(b.latestMonthlyRevenue, b.currency);
  const margin = b.latestMarginPct != null ? `${Math.round(Number(b.latestMarginPct))}% margin` : null;
  return `<li><a href="${businessPath(b.slug)}">${esc(b.name)}</a>${
    b.tagline ? ` — ${esc(b.tagline)}` : ''
  }${rev ? ` · ${rev}/mo` : ''}${margin ? ` · ${margin}` : ''}</li>`;
}).join('\n      ');

const homeBody = `
    <h1>Wait, how much?</h1>
    <p>${BRAND_NAME} publishes what businesses actually make — revenue, profit and margin for
       companies most people have never heard of. A card game. A supplement brand. A one-person
       shop doing numbers that would embarrass a funded startup.</p>
    <p>Most figures here are estimates, modelled from public information: marketplace data,
       advertising libraries, social footprints, pricing and public filings. They are not the
       company's books, and we do not pretend otherwise. Every profile states plainly how its
       numbers were arrived at and links to the sources behind them, so you can judge them
       yourself rather than taking our word for it.</p>
    <p>Where an owner has confirmed a figure, or it was read from a connected account, the
       profile says that too. That distinction is the entire point of the site: an estimate
       presented as a fact is worse than no number at all.</p>
    <ul>
      ${list}
    </ul>
    <p><a href="/about">How these figures are researched</a></p>`.trim();

const homeHtml = render({
  path: '/',
  title: `${BRAND_NAME} — what businesses actually make`,
  description: 'Revenue, profit and margin for businesses you have never heard of. Researched from public data, with sources on every profile.',
  body: homeBody,
});
guard('/', homeHtml);
write('', homeHtml);

// ── Static routes ─────────────────────────────────────────────────────
const STATIC = [
  { path: '/about/', title: `About ${BRAND_NAME}`,
    description: `How ${BRAND_NAME} researches the figures it publishes, and what the labels on each profile mean.`,
    body: `<h1>About ${BRAND_NAME}</h1>
    <p>${BRAND_NAME} publishes what businesses actually make. Revenue, profit, margin — for
       companies most people have never heard of.</p>
    <p>Most of these figures are estimates. They are modelled from public information:
       marketplace data, ad libraries, social footprints, pricing and public filings. They are
       not the company's books, and we do not pretend otherwise. Every profile carries a label
       saying how its numbers were arrived at, and links to the sources behind them.</p>
    <p>Where a figure is confirmed by an owner, or read from a connected account, the profile
       says that too. The distinction is the point: an estimate that is presented as a fact is
       worse than no number at all, and a research site that blurs the two has nothing left to
       offer.</p>` },
  { path: '/privacy/', title: `Privacy — ${BRAND_NAME}`,
    description: `What ${BRAND_NAME} stores about you, and how to have it deleted.`,
    body: `<h1>Privacy</h1>
    <p>If you create an account we store your email address, and — if you arrived from a link
       carrying campaign parameters — where you came from. That is it. We do not ask for a
       password, a name, or a payment method.</p>
    <p>We use Google Analytics and Microsoft Clarity to understand how the site is used.
       Neither is given your email address.</p>
    <p>To have your account and its data deleted, email hello@waithowmuch.com and we will
       remove it.</p>` },
  { path: '/terms/', title: `Terms — ${BRAND_NAME}`,
    description: `Terms of use for ${BRAND_NAME}. Figures are estimates unless stated otherwise.`,
    body: `<h1>Terms</h1>
    <p>${BRAND_NAME} is provided as-is, for information only.</p>
    <p>Figures on this site are estimates unless a profile explicitly states otherwise. They
       are not audited, they are not endorsed by the businesses described, and they must not
       be relied on for any investment, acquisition or lending decision. Treat them as a
       well-sourced guess, because that is what they are.</p>
    <p>If you are an owner and believe a profile is wrong, email hello@waithowmuch.com and we
       will correct or remove it.</p>` },
  { path: '/login/', title: `Sign in — ${BRAND_NAME}`,
    description: `Sign in to ${BRAND_NAME} with a one-time email link or with Google.`,
    body: `<h1>Sign in</h1>
    <p>Everything on ${BRAND_NAME} is free to read — an account just remembers you. There is
       no password: enter your email address and we send a one-time link that expires in
       twenty minutes and works once. You can also continue with Google.</p>
    <p><a href="/">Browse businesses</a> · <a href="/about">How the research works</a></p>` },
];

for (const r of STATIC) {
  const html = render(r);
  if (r.path === '/about/') guard(r.path, html);
  write(r.path, html);
}

// ── Business pages ────────────────────────────────────────────────────
for (const b of businesses) {
  const rev = money(b.latestMonthlyRevenue, b.currency);
  const profit = money(b.latestMonthlyProfit, b.currency);
  const margin = b.latestMarginPct != null ? `${Math.round(Number(b.latestMarginPct))}%` : null;
  const cats = (b.categories ?? []).map((c) => c.name).join(', ');
  const method = { RESEARCHED: 'modelled from public data', SELF_REPORTED: 'self-reported by the owner',
                   INTERVIEW: 'given by the owner on the record', VERIFIED: 'read from a connected account' }[b.researchMethod]
                 ?? 'modelled from public data';

  const body = `
    <h1>${esc(b.name)}</h1>
    ${b.tagline ? `<p>${esc(b.tagline)}</p>` : ''}
    <p>${esc(b.name)} is estimated to make ${rev ?? 'an undisclosed amount'} per month in
       revenue${profit ? `, on roughly ${profit} of monthly profit` : ''}${margin ? ` — a margin of about ${margin}` : ''}.
       ${cats ? `It operates in ${esc(cats)}. ` : ''}These figures are ${method}, and are published
       alongside the sources they were drawn from.</p>
    <p>${BRAND_NAME} publishes revenue and profit for businesses most people have never heard of.
       Unless a profile states otherwise, the figures are estimates rather than audited accounts —
       modelled from marketplace data, advertising libraries, social footprints and public pricing.
       They are good enough to understand the shape of a business and wrong enough that you should
       not make a purchase decision on them.</p>
    <p><a href="/">All businesses</a> · <a href="/about">How these figures are researched</a></p>`.trim();

  const html = render({
    path: businessPath(b.slug),
    title: `${b.name}${rev ? ` — ${rev}/mo` : ''} | ${BRAND_NAME}`,
    description: `${b.name}: ${rev ?? 'revenue'} per month${margin ? `, ${margin} margin` : ''}. ${method}, with sources.`,
    body,
  });

  guard(businessPath(b.slug), html);
  write(businessPath(b.slug), html);
}

// SPA fallback for anything not prerendered.
writeFileSync(join(dist, '404.html'), render({
  path: '/',
  title: BRAND_NAME,
  description: 'Revenue and profit for businesses you have never heard of.',
  body: `<h1>${BRAND_NAME}</h1><p><a href="/">Browse businesses</a></p>`,
}));

console.log(`postbuild: wrote ${STATIC.length + businesses.length + 1} static routes`);
