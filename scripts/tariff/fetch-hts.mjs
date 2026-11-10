/**
 * Regenerates the tariff calculator's data from the USITC, the publisher of
 * the Harmonized Tariff Schedule. Run by hand when USITC publishes a new
 * revision (scripts/check-tariff.mjs warns when one is out):
 *
 *   TARIFF_PYTHON=/path/to/python-with-pypdf node scripts/tariff/fetch-hts.mjs
 *
 * It writes, and the calculator reads only these:
 *   public/tariff/<rev>/chNN.json  one per chapter: every HTS row of that
 *                                  chapter (code, indent, description, General
 *                                  and Column 2 rates, units) plus the Chapter
 *                                  99 overlays that name a code in it. The page
 *                                  loads one chapter, the one the code is in.
 *   public/tariff/<rev>/search.json  code + description + indent for every row
 *                                  of chapters 1–97, loaded only when someone
 *                                  types words into the search box.
 *   src/data/tariff-meta.json      the revision, the fetch date, the country
 *                                  rates of note 52, the list headings and the
 *                                  titles of the measures we flag. Bundled.
 *
 * Sources (both USITC):
 *   https://hts.usitc.gov/reststop/releaseList            which revision is current
 *   https://hts.usitc.gov/reststop/exportList?…&format=JSON  every HTS row
 *   https://hts.usitc.gov/reststop/file?release=currentRelease&filename=Chapter%2099
 *                                                          the Chapter 99 notes (PDF),
 *                                                          read by extract-ch99.py
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = 'https://hts.usitc.gov/reststop';
const tmp = join(tmpdir(), `whm-hts-${Date.now()}`);
mkdirSync(tmp, { recursive: true });

const die = (m) => { console.error(`fetch-hts: ${m}`); process.exit(1); };

async function get(url, as = 'json') {
  const r = await fetch(url);
  if (!r.ok) die(`${url} → HTTP ${r.status}`);
  return as === 'json' ? r.json() : Buffer.from(await r.arrayBuffer());
}

/* ── 1. Which revision, and its rows ─────────────────────────────────── */
const releases = await get(`${BASE}/releaseList`);
const current = releases.find((r) => r.status === 'current');
if (!current) die('no current release in releaseList');
const revName = current.name; // "2026HTSRev23"
const m = revName.match(/^(\d{4})HTSRev(\d+)$/) ?? revName.match(/^(\d{4})HTSBasic$/);
if (!m) die(`unexpected release name ${revName}`);
const revSlug = m[2] ? `${m[1]}-rev${m[2]}` : `${m[1]}-basic`;
const toIso = (us) => { const [mm, dd, yy] = us.split('/'); return `${yy}-${mm}-${dd}`; };

const hts = await get(`${BASE}/exportList?from=0100&to=9999&format=JSON&styles=false`);
if (!Array.isArray(hts) || hts.length < 30000) die(`HTS export has ${hts?.length} rows; expected 30,000+`);
writeFileSync(join(tmp, 'hts.json'), JSON.stringify(hts));

/* ── 2. Chapter 99 notes → overlays (Python, pypdf) ──────────────────── */
const pdf = await get(`${BASE}/file?release=currentRelease&filename=Chapter%2099`, 'buffer');
writeFileSync(join(tmp, 'ch99.pdf'), pdf);
const py = process.env.TARIFF_PYTHON ?? 'python3';
execFileSync(py, ['-I', join(root, 'scripts/tariff/extract-ch99.py'), join(tmp, 'ch99.pdf'), join(tmp, 'hts.json'), join(tmp, 'overlays.json')], { stdio: 'inherit' });
const ov = JSON.parse(readFileSync(join(tmp, 'overlays.json'), 'utf8'));
if (ov.revision && !ov.revision.includes(`Revision ${m[2]}`)) die(`Chapter 99 PDF is ${ov.revision}, the export is ${revName}`);

/* ── 3. Shards ───────────────────────────────────────────────────────── */
const clean = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const digits = (c) => c.replace(/\./g, '');
const chOf = (c) => digits(c).slice(0, 2);

const rows = {};
const search = [];
let ch = '01';
for (const r of hts) {
  const code = clean(r.htsno);
  if (code) ch = code.slice(0, 2);
  if (ch === '98' || ch === '99') continue;
  const row = [code, Number(r.indent) || 0, clean(r.description), clean(r.general), clean(r.other), (r.units ?? []).join(', ')];
  (rows[ch] ??= []).push(row);
  search.push([digits(code), row[1], row[2]]);
}

const shard = () => ({
  s301: {}, s301p: [], excl: [], n31: {}, n52b: [], n52c: [], air: [], pharma: [], n52j: {}, n52jd: {}, flags: {},
});
const ovBy = {};
const at = (code) => (ovBy[chOf(code)] ??= shard());

for (const L of ov.s301.lists) {
  for (const c of L.codes) at(c).s301[digits(c)] = L.id;
  for (const p of L.partial) at(p.subheading).s301p.push({ sub: digits(p.subheading), list: L.id, except: p.exceptStats.map(digits), desc: p.desc });
}
for (const e of ov.s301.exclusions) {
  for (const c of new Set(e.stats.map(chOf))) {
    (ovBy[c] ??= shard()).excl.push({ id: e.id, stats: e.stats.map(digits), desc: e.desc, overrides: e.overrides, via: e.via, until: e.until });
  }
}
for (const n of ov.s301.note31) for (const c of n.codes) at(c).n31[digits(c)] = n.heading;
for (const c of ov.n52.exemptAll) at(c).n52b.push(digits(c));
for (const x of ov.n52.describedAll) at(x.code).n52c.push({ code: digits(x.code), desc: x.desc });
for (const c of ov.n52.aircraft) at(c).air.push(digits(c));
for (const c of ov.n52.pharma) at(c).pharma.push(digits(c));
for (const [country, codes] of Object.entries(ov.n52.exemptByCountry)) for (const c of codes) (at(c).n52j[country] ??= []).push(digits(c));
for (const [country, items] of Object.entries(ov.n52.describedByCountry)) for (const x of items) if (x.code) (at(x.code).n52jd[country] ??= []).push({ code: digits(x.code), desc: x.desc });
for (const f of ov.flags) for (const c of f.codes) (at(c).flags[f.note] ??= []).push(digits(c));

const outDir = join(root, 'public', 'tariff', revSlug);
if (existsSync(join(root, 'public', 'tariff'))) rmSync(join(root, 'public', 'tariff'), { recursive: true });
mkdirSync(outDir, { recursive: true });
let total = 0;
for (const [c, rs] of Object.entries(rows)) {
  const body = JSON.stringify({ rev: revSlug, ch: c, rows: rs, ov: ovBy[c] ?? shard() });
  total += body.length;
  writeFileSync(join(outDir, `ch${c}.json`), body);
}
writeFileSync(join(outDir, 'search.json'), JSON.stringify(search));

/* ── 4. Meta, bundled with the page ──────────────────────────────────── */
const meta = {
  revision: { name: revName, label: current.description, startDate: toIso(current.releaseStartDate), slug: revSlug },
  fetchedAt: new Date().toISOString().slice(0, 10),
  /* The last entry date this data answers for: the day before the first
     change the revision already schedules (the exclusions' end date). */
  validThrough: ov.s301.exclusions.map((e) => e.until).sort()[0],
  dataPath: `/tariff/${revSlug}/`,
  lists: ov.s301.lists.map((L) => ({ id: L.id, heading: L.heading, rate: L.rate, suspended: !!L.suspended })),
  note31: ov.s301.note31.map((n) => ({ heading: n.heading, rate: n.rate, from: n.from, until: n.until })),
  n52: ov.n52.countries,
  flags: ov.flags.map((f) => ({ note: f.note, title: f.title, how: f.how })),
  counts: {
    rows: hts.length,
    lists: Object.fromEntries(ov.s301.lists.map((L) => [L.id, L.codes.length + L.partial.length])),
    exclusions: ov.s301.exclusions.length,
  },
};
const metaPath = join(root, 'src', 'data', 'tariff-meta.json');
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
/* How many General rates the engine can compute, for the copy: counted with
   the engine's own parser, after the meta it imports exists. */
const { parseRate } = await import(`${join(root, 'src', 'data', 'tariff.mjs')}?t=${Date.now()}`);
const rates = Object.values(rows).flat().map((r) => r[3]).filter(Boolean);
const parsed = rates.map(parseRate);
meta.counts.generalRates = rates.length;
meta.counts.notPercent = parsed.filter((p) => !/^free$/i.test(p.text) && !(p.ok && !p.specific.length)).length;
meta.counts.notPercentComputed = parsed.filter((p) => p.ok && p.specific.length).length;
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
rmSync(tmp, { recursive: true });
console.log(`fetch-hts: ${revName} (${current.description}, from ${meta.revision.startDate}); ${Object.keys(rows).length} chapters, ${(total / 1e6).toFixed(1)} MB of shards`);
