import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, API_BASE, businessPath } from '../src/data/site.mjs';
import { COLLECTIONS, MORE, collectionPath } from '../src/data/collections.mjs';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

let businesses = [];
try {
  businesses = (await (await fetch(`${API_BASE}/v1/businesses?limit=100`)).json()).businesses ?? [];
} catch {
  console.warn('sitemap: API unreachable — static routes only');
}

const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  ...COLLECTIONS.map((c) => ({ loc: `${SITE}${collectionPath(c.slug)}`, priority: '0.9' })),
  { loc: `${SITE}${collectionPath(MORE.slug)}`, priority: '0.6' },
  { loc: `${SITE}/how-we-research/`, priority: '0.6' },
  { loc: `${SITE}/about/`, priority: '0.5' },
  { loc: `${SITE}/privacy/`, priority: '0.2' },
  { loc: `${SITE}/terms/`, priority: '0.2' },
  ...businesses.map((b) => ({
    loc: `${SITE}${businessPath(b.slug)}`,
    priority: '0.8',
    lastmod: b.publishedAt ? String(b.publishedAt).slice(0, 10) : undefined,
  })),
];

writeFileSync(join(dist, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`sitemap: ${urls.length} urls`);
