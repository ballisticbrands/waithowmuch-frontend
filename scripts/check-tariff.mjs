/**
 * Fails the build if the tariff and landed-cost calculators disagree with
 * the worked examples their pages print, with the CBP fee table, or with the
 * HTS data they ship.
 *
 * Offline and cheap, like check-fba-fees.mjs and check-roas.mjs: it runs the
 * calculator's own engine (src/data/tariff.mjs) on the same chapter files the
 * browser loads (public/tariff/<rev>/chNN.json). Every expected figure below
 * is worked by hand in the comment beside it, from the HTS and the Chapter 99
 * notes, not taken from the code under test.
 *
 * Two warnings, never failures: the data's date window is about to close, or
 * (when the network answers within a few seconds) USITC has published a newer
 * revision. Both mean: run scripts/tariff/fetch-hts.mjs.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  META, FEES, COUNTRIES, VALID_FROM, VALID_THROUGH, parseRate, applyRate, entryFees, findLeaves, lineInfo,
  overlaysFor, computeDuty, customsValue, landedCost, chapterOf, bandCheck,
} from '../src/data/tariff.mjs';
import { EXAMPLES, MPF_EXAMPLES, RELATED } from '../src/data/tariff-calculator-page.mjs';
import { X_LANDED, X_FEES, X_DUTY, LANDED_EXAMPLE, RELATED as LANDED_RELATED } from '../src/data/landed-cost-calculator-page.mjs';
import { PRESETS } from '../src/data/tariff-presets.mjs';
import { profileFor } from '../src/businesses/index.mjs';
import { publishedPosts, postPath } from '../src/data/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
let checks = 0;
const fail = (msg) => { failed += 1; console.error(`check-tariff: ${msg}`); };
const near = (name, got, want, tol = 1e-6) => {
  checks += 1;
  if (!(typeof got === 'number' && Math.abs(got - want) <= tol)) fail(`${name}: got ${got}, want ${want}`);
};
const is = (name, got, want) => { checks += 1; if (got !== want) fail(`${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`); };

const shards = new Map();
const shard = (code) => {
  const ch = chapterOf(code);
  if (!shards.has(ch)) {
    const p = join(root, 'public', META.dataPath, `ch${ch}.json`);
    if (!existsSync(p)) { fail(`missing ${p}: run scripts/tariff/fetch-hts.mjs`); process.exit(1); }
    shards.set(ch, JSON.parse(readFileSync(p, 'utf8')));
  }
  return shards.get(ch);
};
function duty({ code, country, price, units = 1000, claims, weightKg, date = VALID_FROM }) {
  const sh = shard(code);
  const line = lineInfo(sh, code);
  if (!line) { fail(`${code} is not a leaf line in ${META.revision.name}`); return null; }
  const ov = overlaysFor(sh, line.code);
  return { line, ov, r: computeDuty({ line, ov, countryId: country, date, unitValue: price, units, claims, weightKg }) };
}
const layer = (r, key) => r.layers.find((l) => l.key === key);

/* ── Rates the parser must read ─────────────────────────────────────── */
const pr = (t) => parseRate(t);
is('Free', pr('Free').ok && pr('Free').adval === 0, true);
near('3.7%', pr('3.7%').adval, 3.7);
near('6 1/2%', pr('6 1/2%').adval, 6.5);
/* "3¢ each + 3%" on 100 units worth $242: 100 × $0.03 + 3% × 242 = 3 + 7.26 = 10.26 */
near('3¢ each + 3%', applyRate(pr('3¢ each + 3%'), { value: 242, units: 100 }), 10.26);
/* "2.2¢/kg + 5%" on 10 units of 0.5 kg worth $40: 5 kg × 0.022 + 2 = 2.11 */
near('2.2¢/kg + 5%', applyRate(pr('2.2¢/kg + 5%'), { value: 40, units: 10, weightKg: 0.5 }), 2.11);
is('per kg needs a weight', applyRate(pr('2.2¢/kg + 5%'), { value: 40, units: 10 }), null);
/* "25¢/doz. + 5.8%"-style: 24 units = 2 dozen × $0.25 = 0.50, + 5.8% of $100 = 6.30 */
near('per dozen', applyRate(pr('25¢/doz. + 5.8%'), { value: 100, units: 24 }), 6.3);
near('$1.035/kg', applyRate(pr('$1.035/kg'), { value: 1, units: 2, weightKg: 1 }), 2.07);
is('per litre is not computed', pr('1.9¢/liter').ok, false);
is('watch rates are not computed', pr('$1.53 each + 6.25% on the case + 5.3% on the strap, band or bracelet').ok, false);

/* ── Fees: CBP user fee table ───────────────────────────────────────── */
for (const ex of MPF_EXAMPLES) near(`MPF on $${ex.value}`, entryFees(ex.value, 'air').mpf, ex.mpf, 0.005);
/* $2,000 × 0.3464% = $6.93 → the $34.58 floor; $500,000 × 0.3464% = $1,732 → the $670.86 cap;
   $20,000 → $69.28; HMF 0.125% by sea only: $25 on $20,000, nothing by air. */
is('MPF floor', entryFees(2000, 'air').mpfBound, 'min');
is('MPF cap', entryFees(500000, 'air').mpfBound, 'max');
near('MPF floor value', FEES.mpfMin, 34.58);
near('MPF cap value', FEES.mpfMax, 670.86);
near('HMF by sea', entryFees(20000, 'ocean').hmf, 25);
near('HMF by air', entryFees(20000, 'air').hmf, 0);

/* ── The worked examples on the page ────────────────────────────────── */
for (const ex of EXAMPLES) {
  const got = duty(ex);
  if (!got) continue;
  const { r } = got;
  is(`${ex.id} complete`, r.complete, true);
  near(`${ex.id} rate`, r.rate, ex.expect.ratePct, 0.005);
  near(`${ex.id} per unit`, Math.round((r.duty / 1000) * 100) / 100, ex.expect.perUnit, 1e-9);
}

/* The tariffs post's six, layer by layer (HTS Rev. 23, Chapter 99 notes 20 and 52):
   9504.40.00 playing cards: Free; List 4B suspended; +12.5% (9903.05.31) → 12.5%. */
{
  const { r, ov } = duty({ code: '9504400000', country: 'CN', price: 0.47 });
  is('cards on List 4B', ov.listIds.join(), '4B');
  is('cards note 52 heading', layer(r, 'n52').heading, '9903.05.31');
  near('cards base', layer(r, 'base').amount, 0);
}
/* 8205.51.30 steel kitchen implements: 3.7% + List 3 25% (9903.88.03) + 12.5% = 41.2%,
   and with exclusion 20(vvv)(iii)(42) claimed (9903.88.69): 3.7% + 12.5% = 16.2%. */
{
  const { r, ov } = duty({ code: '8205513030', country: 'CN', price: 5.54 });
  is('8205.51.30 on List 3', ov.listIds.join(), '3');
  is('8205.51.30.30 has the kitchen-implements exclusion', ov.exclusions.map((e) => e.id).join(), '20(vvv)(iii)(42)');
  near('8205.51.30 rate', r.rate, 41.2, 1e-9);
  const ex = duty({ code: '8205513030', country: 'CN', price: 5.54, claims: { exclusion: { '20(vvv)(iii)(42)': true } } }).r;
  near('8205.51.30 excluded', ex.rate, 16.2, 1e-9);
  is('exclusion heading', layer(ex, 'list-3').heading, '9903.88.69');
  /* The other statistical line, 8205.51.30.60, has no exclusion. */
  is('8205.51.30.60 has none', duty({ code: '8205513060', country: 'CN', price: 5.54 }).ov.exclusions.length, 0);
  /* After the exclusions end, the claim is ignored: but that date is outside the window, so no rates at all. */
  is('no rates after the window', duty({ code: '8205513030', country: 'CN', price: 5.54, date: '2027-01-10' }).r.outOfRange, true);
}
/* 7013.37.20 drinking glasses $0.30–$3: 22.5% + List 4A 7.5% (9903.88.15) + 12.5% = 42.5%. */
{
  const { r } = duty({ code: '7013372090', country: 'CN', price: 2 });
  near('glass base 22.5%', layer(r, 'base').pct, 22.5);
  near('glass List 4A', layer(r, 'list-4A').pct, 7.5);
  const { line } = duty({ code: '7013372090', country: 'CN', price: 2 });
  is('glass $2 inside its band', bandCheck(line.bands, 2).ok, true);
  is('glass $4 outside its band', bandCheck(line.bands, 4).ok, false);
}
/* 9503.00.00 toys from India: Free + 10% (9903.05.44), no China lists → 10%. */
{
  const { r } = duty({ code: '9503000073', country: 'IN', price: 3.25 });
  near('toy India', r.rate, 10, 1e-9);
  is('India has no China list layer', r.layers.some((l) => l.key.startsWith('list')), false);
  is('India heading', layer(r, 'n52').heading, '9903.05.44');
}
/* Hong Kong is not China for Section 301: 3.7% + 12.5% (9903.05.43) = 16.2% on 8210.00.00. */
near('Hong Kong skips the China lists', duty({ code: '8210000000', country: 'HK', price: 1.37 }).r.rate, 16.2, 1e-9);
/* Vietnam 12.5%, Indonesia 10% (9903.05.84, 9903.05.45). */
near('Vietnam', duty({ code: '3924104000', country: 'VN', price: 1.4 }).r.rate, 15.9, 1e-9);
near('Indonesia', duty({ code: '3924104000', country: 'ID', price: 1.4 }).r.rate, 13.4, 1e-9);
/* Japan tops up to 12.5%: 3924.10.40 at 3.4% → +9.1%; a 22.5% glass → +0. */
near('Japan floor', duty({ code: '3924104000', country: 'JP', price: 1.4 }).r.rate, 12.5, 1e-9);
near('Japan above the floor', duty({ code: '7013372090', country: 'JP', price: 2 }).r.rate, 22.5, 1e-9);
/* Column 2: playing cards "10¢/pack + 20%": 1,000 packs at $0.47 → $100 + $94 = $194. */
near('Column 2', duty({ code: '9504400000', country: 'C2', price: 0.47 }).r.duty, 194, 1e-9);
/* Note 52(b) exempts coffee outright: 0901.21.00.15 from Indonesia pays nothing. */
near('note 52(b) exemption', duty({ code: '0901210015', country: 'ID', price: 3 }).r.duty, 0);
/* The four-year review replaces the list rate: non-EV lithium-ion batteries 8507.60.00
   from China: 3.4% + 25% (9903.91.06, in place of List 4A's 7.5%) + 12.5% = 40.9%. */
near('four-year review replaces List 4A', duty({ code: '8507600090', country: 'CN', price: 20 }).r.rate, 40.9, 1e-9);
/* A Section 232 code is never a silent total: steel kitchenware 7323.93.00 is named in note 16. */
{
  const { r } = duty({ code: '7323930015', country: 'CN', price: 5 });
  is('232 code is incomplete', r.complete, false);
  is('232 flag', r.flags.some((f) => f.note === '16'), true);
  const claimed = duty({ code: '7323930015', country: 'CN', price: 5, claims: { s232: true } }).r;
  is('232 claimed removes note 52', layer(claimed, 'n52').amount, 0);
}
/* Compound: 8213.00.90 scissors, 3¢ each + 3%: on $2.42, 0.03 + 0.0726 = $0.1026 (4.24%), + 12.5%. */
near('scissors base per unit', layer(duty({ code: '8213009000', country: 'CN', price: 2.42 }).r, 'base').amount / 1000, 0.1026, 1e-9);

/* ── Data the engine relies on ──────────────────────────────────────── */
for (const c of COUNTRIES.filter((x) => x.n52)) {
  if (!META.n52.some((r) => r.country === c.n52)) fail(`${c.label}: no note-52 heading in ${META.revision.name}`);
}
if (META.counts.lists['3'] < 5000) fail(`List 3 has only ${META.counts.lists['3']} codes`);
if (META.counts.exclusions < 150) fail(`only ${META.counts.exclusions} exclusions`);
is('window', VALID_FROM < VALID_THROUGH, true);

/* ── Customs value and landed cost ──────────────────────────────────── */
/* CIF $10 with $1.50 of freight and insurance in it, $9,000 of moulds over 45,000 units:
   10 − 1.50 + 0.20 = $8.70. FOB keeps the price. */
near('CIF value', customsValue({ price: 10, incoterm: 'CIF', includedPerUnit: 1.5, assistTotal: 9000, assistUnits: 45000 }).unitValue, 8.7, 1e-9);
near('FOB value', customsValue({ price: 10, incoterm: 'FOB', includedPerUnit: 1.5 }).unitValue, 10, 1e-9);
/* The landed example: 2,000 spatulas FOB $1.40; value $2,800; duty 15.9% = $445.20;
   MPF floor $34.58 + HMF $3.50 = $38.08; per unit 1.40 + 0.17 + 0.007 + 0.2226 + 0.01904
   + 0.075 + 0.25 = $2.14364. */
near('landed duty', X_DUTY, 445.2, 1e-9);
near('landed fees', X_FEES.total, 38.08, 1e-9);
near('landed per unit', X_LANDED.perUnit, 2.14364, 1e-9);
near('landed example rate is the tariff example', LANDED_EXAMPLE.ratePct, EXAMPLES.find((e) => e.id === 'spatula').expect.ratePct);
/* CIF adds no freight line on top of the price. */
near('CIF adds no freight', landedCost({ price: 10, units: 100, incoterm: 'CIF', freight: 500, insurance: 20 }).perUnit, 10, 1e-9);

/* ── Presets: real lines, real businesses ───────────────────────────── */
for (const p of PRESETS) {
  const got = duty({ code: p.code, country: p.country, price: p.price, claims: p.claims });
  if (got && !got.r.complete) fail(`preset ${p.id}: total is incomplete (${got.r.notes.join(' ')})`);
  if (!profileFor(p.slug)) fail(`preset ${p.id}: no profile for ${p.slug}`);
  if (findLeaves(shard(p.code), p.code).length !== 1) fail(`preset ${p.id}: ${p.code} is not exactly one leaf`);
}

/* Related reading must not link to a draft post. */
const live = new Set(publishedPosts().map((p) => postPath(p.slug)));
for (const r of [...RELATED, ...LANDED_RELATED]) if (r.href.startsWith('/blog/') && !live.has(r.href)) fail(`related link ${r.href} is not a published post`);

/* ── Freshness: warnings only ───────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10);
const daysLeft = Math.round((Date.parse(VALID_THROUGH) - Date.parse(today)) / 864e5);
if (daysLeft < 0) console.warn(`check-tariff: ⚠️ the tariff data stopped answering on ${VALID_THROUGH}; the calculators refuse every date. Run scripts/tariff/fetch-hts.mjs.`);
else if (daysLeft < 21) console.warn(`check-tariff: ⚠️ the tariff data's window closes in ${daysLeft} days (${VALID_THROUGH}).`);
try {
  const ctl = AbortSignal.timeout(4000);
  const list = await (await fetch('https://hts.usitc.gov/reststop/releaseList', { signal: ctl })).json();
  const cur = list.find((r) => r.status === 'current');
  if (cur && cur.name !== META.revision.name) {
    console.warn(`check-tariff: ⚠️ USITC's current revision is ${cur.name} (${cur.description}); the calculators use ${META.revision.name}. Run scripts/tariff/fetch-hts.mjs.`);
  }
} catch {
  /* Offline, or USITC slow: the revision check is a courtesy, never a gate. */
}

if (failed) process.exit(1);
console.log(`check-tariff: ${checks} checks agree on ${META.revision.name} (${EXAMPLES.length} worked examples, ${PRESETS.length} presets)`);
