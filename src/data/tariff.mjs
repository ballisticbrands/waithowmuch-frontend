/**
 * The duty engine behind /tools/tariff-calculator/ and
 * /tools/landed-cost-calculator/.
 *
 * Plain JS on purpose, like roas.mjs: the pages render from it, and
 * scripts/check-tariff.mjs runs the same functions in Node against the same
 * chapter files, so the worked examples in the copy and the build check can
 * never disagree with what the calculator shows.
 *
 * The data comes from the USITC (scripts/tariff/fetch-hts.mjs):
 *   - meta (bundled): the revision, the note-52 country rates, list headings;
 *   - one chapter file per lookup (public/tariff/<rev>/chNN.json): every HTS
 *     row of that chapter and the Chapter 99 overlays that name a code in it.
 *
 * 🚨 What it computes, and what it only flags. It computes the General
 * (column 1) rate, ad valorem and the simple specific and compound forms; the
 * China Section 301 lists and the exclusions still in force; the Section 301
 * four-year-review rates; and the 2026 Section 301 duties of U.S. note 52 for
 * the countries in COUNTRIES. It does NOT compute Section 232 (metals, autos,
 * wood, trucks, semiconductors, pharmaceuticals, drones), safeguards,
 * antidumping or countervailing duties, or free-trade-agreement rates. When a
 * code is named by one of the measures it does not compute, the result says
 * so and marks its total as incomplete. It never guesses a rate.
 */
import META from './tariff-meta.json' with { type: 'json' };

export { META };

/* ── Fees: CBP user fee table (19 CFR 24.23 / 24.24), last updated 9 Oct 2026 ── */
export const FEES = {
  mpfRate: 0.003464,
  mpfMin: 34.58,
  mpfMax: 670.86,
  hmfRate: 0.00125,
  updated: '2026-10-09',
};

/** The merchandise processing fee on a formal entry, and the harbor
 *  maintenance fee on goods arriving by sea. `value` is the entry's customs
 *  value in dollars. */
export function entryFees(value, mode) {
  const raw = value * FEES.mpfRate;
  const mpf = value > 0 ? Math.min(FEES.mpfMax, Math.max(FEES.mpfMin, raw)) : 0;
  const mpfBound = value <= 0 ? null : raw < FEES.mpfMin ? 'min' : raw > FEES.mpfMax ? 'max' : null;
  const hmf = mode === 'ocean' ? value * FEES.hmfRate : 0;
  return { mpf, mpfRaw: raw, mpfBound, hmf, total: mpf + hmf };
}

/* ── Countries ────────────────────────────────────────────────────────
   `n52` is the country's name as heading 9903.05.xx spells it (the rate and
   kind come from META.n52, never typed here). `china301` applies the China
   lists. Hong Kong is its own country of origin: the China Section 301 lists
   do not apply to it, note 52 does. */
export const COUNTRIES = [
  { id: 'CN', label: 'China', n52: 'China', china301: true },
  { id: 'HK', label: 'Hong Kong', n52: 'Hong Kong, China' },
  { id: 'VN', label: 'Vietnam', n52: 'Vietnam' },
  { id: 'IN', label: 'India', n52: 'India' },
  { id: 'ID', label: 'Indonesia', n52: 'Indonesia' },
  { id: 'TW', label: 'Taiwan', n52: 'Taiwan' },
  { id: 'TH', label: 'Thailand', n52: 'Thailand' },
  { id: 'MY', label: 'Malaysia', n52: 'Malaysia' },
  { id: 'KH', label: 'Cambodia', n52: 'Cambodia' },
  { id: 'BD', label: 'Bangladesh', n52: 'Bangladesh' },
  { id: 'PK', label: 'Pakistan', n52: 'Pakistan' },
  { id: 'PH', label: 'Philippines', n52: 'Philippines' },
  { id: 'LK', label: 'Sri Lanka', n52: 'Sri Lanka' },
  { id: 'TR', label: 'Türkiye', n52: 'Türkiye' },
  { id: 'KR', label: 'South Korea', n52: 'South Korea' },
  { id: 'JP', label: 'Japan', n52: 'Japan' },
  { id: 'XX', label: 'A country not named in note 52', none: true },
  { id: 'C2', label: 'Cuba or North Korea (Column 2)', column2: true },
];

/** Note-52 countries we do not offer, and why: each has a further measure or
 *  agreement this calculator does not model. Shown on the page. */
export const NOT_MODELLED = [
  'Canada and Mexico (USMCA treatment and their own notes)',
  'Brazil (a separate Section 301 action, note 50)',
  'the European Union, the United Kingdom and Switzerland (country deals in notes 52 and the Section 232 notes)',
  'the CAFTA-DR countries (textile rules) and Russia (note 30)',
];

export const countryById = (id) => COUNTRIES.find((c) => c.id === id) ?? null;

/* ── The dates this data can answer for ────────────────────────────────
   From the day the revision took effect, to the day before the first change
   already scheduled in it (the Section 301 exclusions run "through January
   9, 2027"). Outside that window the page refuses to compute. */
export const VALID_FROM = META.revision.startDate;
export const VALID_THROUGH = META.validThrough;

export function dateInRange(iso) {
  return typeof iso === 'string' && iso >= VALID_FROM && iso <= VALID_THROUGH;
}

/* ── Rates ────────────────────────────────────────────────────────────── */

const SPECIFIC_UNITS = {
  each: { per: 'each', label: 'each' },
  'kg': { per: 'kg', label: 'per kg' },
  'doz.': { per: 'doz', label: 'per dozen' },
  'doz': { per: 'doz', label: 'per dozen' },
  'dozen': { per: 'doz', label: 'per dozen' },
  'gross': { per: 'gross', label: 'per gross (144)' },
  'pr.': { per: 'pr', label: 'per pair' },
  'pack': { per: 'pack', label: 'per pack' },
};

/**
 * "3.7%", "Free", "3¢ each + 3%", "2.2¢/kg + 5%", "$1.035/kg + 5.1%".
 * Returns { ok, terms, text, adval, specific } where `ok` is false for any
 * rate this calculator cannot compute (per litre, "on the case", "on drained
 * weight", "less … per degree", "the rate applicable to…"). The text is always
 * returned, so the page can show what the schedule says.
 */
export function parseRate(text) {
  const t = String(text ?? '').trim();
  const out = { text: t, ok: false, terms: [], adval: 0, specific: [] };
  if (!t) return out;
  if (/^free$/i.test(t)) return { ...out, ok: true };
  const parts = t.split(/\s*\+\s*/);
  for (const p of parts) {
    let m = p.match(/^(\d+(?:\.\d+)?)(?: (\d+)\/(\d+))?%$/);
    if (m) {
      const pct = Number(m[1]) + (m[2] ? Number(m[2]) / Number(m[3]) : 0);
      out.terms.push({ kind: 'adval', pct });
      out.adval += pct;
      continue;
    }
    m = p.match(/^(\$)?(\d+(?:\.\d+)?)(¢)?(?: each|\/(kg|doz\.?|gross|pr\.|pack))$/);
    if (m && (m[1] || m[3]) && !(m[1] && m[3])) {
      const amount = m[1] ? Number(m[2]) : Number(m[2]) / 100;
      const unit = m[4] ? SPECIFIC_UNITS[m[4]] : SPECIFIC_UNITS.each;
      if (!unit) return out;
      const term = { kind: 'specific', amount, per: unit.per, label: unit.label };
      out.terms.push(term);
      out.specific.push(term);
      continue;
    }
    return out; // a term we do not compute: ok stays false
  }
  return { ...out, ok: true };
}

/** The duty a parsed rate gives on `units` units worth `value` dollars in all.
 *  `weightKg` is per unit; needed only by per-kg rates. Null if it cannot. */
export function applyRate(rate, { value, units, weightKg }) {
  if (!rate.ok) return null;
  let duty = (rate.adval / 100) * value;
  for (const s of rate.specific) {
    const qty =
      s.per === 'each' || s.per === 'pr' || s.per === 'pack' ? units
        : s.per === 'doz' ? units / 12
          : s.per === 'gross' ? units / 144
            : s.per === 'kg' ? (weightKg > 0 ? units * weightKg : NaN)
              : NaN;
    if (!Number.isFinite(qty)) return null;
    duty += s.amount * qty;
  }
  return duty;
}

/* ── The HTS rows of one chapter ─────────────────────────────────────── */

export const digitsOf = (code) => String(code ?? '').replace(/\D/g, '');
/** "8205513030" → "8205.51.30.30"; partial codes format as far as they go. */
export function formatCode(d) {
  const s = digitsOf(d);
  return [s.slice(0, 4), s.slice(4, 6), s.slice(6, 8), s.slice(8, 10)].filter(Boolean).join('.');
}
export const chapterOf = (code) => digitsOf(code).slice(0, 2).padEnd(2, '0');
export const shardUrl = (ch) => `${META.dataPath}ch${ch}.json`;

/**
 * Indexes a chapter file once: for each row, its parent chain and, for rows
 * that carry no rate (statistical lines), the row whose rate they inherit.
 * Rows are [code, indent, description, general, column2, units].
 */
export function indexShard(shard) {
  if (shard._idx) return shard._idx;
  const rows = shard.rows.map(([code, indent, desc, general, other, units], i) => ({
    i, code, d: digitsOf(code), indent, desc, general, other, units,
  }));
  const stack = [];
  for (const r of rows) {
    while (stack.length && stack[stack.length - 1].indent >= r.indent) stack.pop();
    r.parent = stack.length ? stack[stack.length - 1].i : null;
    stack.push(r);
  }
  for (const r of rows) {
    // The rate a row is charged at: its own, or its nearest coded ancestor's.
    let k = r;
    while (k && !k.general && !k.other) k = k.parent == null ? null : rows[k.parent];
    r.rateRow = k ? k.i : null;
  }
  // A leaf is a coded row no other coded row sits under: what an entry is declared at.
  const hasCodedChild = new Set();
  for (const r of rows) {
    if (!r.d) continue;
    let p = r.parent;
    while (p != null) {
      if (rows[p].d) { hasCodedChild.add(p); break; }
      p = rows[p].parent;
    }
  }
  for (const r of rows) r.leaf = !!r.d && r.d.length >= 8 && !hasCodedChild.has(r.i);
  shard._idx = { rows };
  return shard._idx;
}

/** Every leaf whose code starts with the digits typed. */
export function findLeaves(shard, typed) {
  const d = digitsOf(typed);
  const { rows } = indexShard(shard);
  return rows.filter((r) => r.leaf && r.d.startsWith(d));
}

/** The descriptions from the heading down to the row, for display. */
export function chainOf(shard, row) {
  const { rows } = indexShard(shard);
  const out = [];
  for (let r = row; r; r = r.parent == null ? null : rows[r.parent]) out.unshift(r.desc.replace(/:$/, ''));
  return out;
}

/** One leaf, ready for computeDuty. Null if the code is not a leaf. */
export function lineInfo(shard, code) {
  const d = digitsOf(code);
  const { rows } = indexShard(shard);
  const row = rows.find((r) => r.leaf && r.d === d) ?? null;
  if (!row) return null;
  const rateRow = row.rateRow == null ? row : rows[row.rateRow];
  return {
    code: d,
    display: formatCode(d),
    rateCode: rateRow.d,
    desc: row.desc,
    chain: chainOf(shard, row),
    general: parseRate(rateRow.general),
    column2: parseRate(rateRow.other),
    units: row.units || rateRow.units,
    bands: valueBands(chainOf(shard, row)),
  };
}

/**
 * Value bands written into a line's description, such as "Valued over $0.30
 * but not over $3 each". The calculator checks the unit value against them:
 * a value outside the band means a different line, not a different rate.
 */
export function valueBands(chain) {
  const out = [];
  for (const c of chain) {
    const m = c.match(/valued (?:(not over|over|under|not under) \$([\d,.]+)(?: but (not over|under) \$([\d,.]+))?)\s*(each|\/dozen|per dozen|\/kg|per kg|\/pair|per pair)?/i);
    if (!m) continue;
    const n = (s) => Number(String(s).replace(/,/g, ''));
    let lo = null, hi = null;
    if (/^(over|not under)$/i.test(m[1])) lo = { v: n(m[2]), incl: /not under/i.test(m[1]) };
    else hi = { v: n(m[2]), incl: /not over/i.test(m[1]) };
    if (m[3]) hi = { v: n(m[4]), incl: /not over/i.test(m[3]) };
    const per = !m[5] || /each/i.test(m[5]) ? 'each' : /dozen/i.test(m[5]) ? 'doz' : /kg/i.test(m[5]) ? 'kg' : 'pr';
    out.push({ text: m[0], lo, hi, per });
  }
  return out;
}

/** Whether a unit value (and weight) sits inside every band; null if we cannot tell. */
export function bandCheck(bands, unitValue, weightKg) {
  for (const b of bands) {
    const v = b.per === 'each' || b.per === 'pr' ? unitValue : b.per === 'doz' ? unitValue * 12 : weightKg > 0 ? unitValue / weightKg : null;
    if (v == null) return { ok: null, band: b };
    if (b.lo && !(b.lo.incl ? v >= b.lo.v : v > b.lo.v)) return { ok: false, band: b, v };
    if (b.hi && !(b.hi.incl ? v <= b.hi.v : v < b.hi.v)) return { ok: false, band: b, v };
  }
  return { ok: true };
}

/* ── Chapter 99 overlays for one line ────────────────────────────────── */

const listMeta = (id) => META.lists.find((l) => l.id === id);
const prefixHit = (entries, d) => entries.some((e) => d.startsWith(e));

/**
 * What Chapter 99 says about one leaf code, before any choice by the user:
 * China list membership, exclusions that might apply, the four-year-review
 * heading, the note-52 exemptions (outright and conditional) and the
 * measures we only flag.
 */
export function overlaysFor(shard, code) {
  const d = digitsOf(code);
  const d8 = d.slice(0, 8);
  const ov = shard.ov;
  const lists = new Set();
  if (ov.s301[d8]) lists.add(ov.s301[d8]);
  for (const p of ov.s301p) if (p.sub === d8 && !p.except.includes(d)) lists.add(p.list);
  const listIds = [...lists];
  const headings = new Set(listIds.map((id) => listMeta(id)?.heading));
  const exclusions = ov.excl.filter((e) => e.stats.includes(d) && e.overrides.some((h) => headings.has(h)));
  const n31 = ov.n31[d] ?? ov.n31[d8] ?? null;
  const conditional = [
    ...ov.n52c.filter((x) => d.startsWith(x.code)).map((x) => ({ id: `n52c-${x.code}`, source: 'note 52(c)', heading: '9903.05.87', desc: x.desc })),
    ...(prefixHit(ov.air, d) ? [{ id: 'n52d', source: 'note 52(d)', heading: '9903.05.88', desc: 'A civil aircraft article (for use in civil aircraft, meeting general note 6)' }] : []),
    ...(prefixHit(ov.pharma, d) ? [{ id: 'n52e', source: 'note 52(e)', heading: '9903.05.89', desc: 'For use in pharmaceutical applications' }] : []),
  ];
  const conditionalByCountry = {};
  for (const [country, items] of Object.entries(ov.n52jd)) {
    const hit = items.filter((x) => d.startsWith(x.code));
    if (hit.length) conditionalByCountry[country] = hit.map((x) => ({ id: `n52j-${country}-${x.code}`, source: 'note 52(j)', heading: null, desc: x.desc }));
  }
  const exemptByCountry = Object.fromEntries(Object.entries(ov.n52j).map(([c, codes]) => [c, prefixHit(codes, d)]));
  const flags = META.flags.filter((f) => prefixHit(ov.flags[f.note] ?? [], d));
  return {
    listIds, exclusions, n31, n52Exempt: prefixHit(ov.n52b, d), conditional, conditionalByCountry, exemptByCountry, flags,
  };
}

/* ── The duty ─────────────────────────────────────────────────────────── */

export const SECTION_232_NOTES = new Set(['16', '33', '37', '38', '39', '40']);

const n52Of = (name) => META.n52.filter((c) => c.country === name);

/**
 * One product, one country, one entry date.
 *
 * input = {
 *   line,       lineInfo(…)
 *   ov,         overlaysFor(…)
 *   countryId,  a COUNTRIES id
 *   date,       entry date, ISO
 *   unitValue,  customs value of one unit, $
 *   units,      how many
 *   weightKg,   per unit; only per-kg rates need it
 *   claims: { exclusion: id → bool, n52: id → bool, s232: bool }
 * }
 *
 * Returns { layers, duty, value, rate, complete, notes, needs } where each
 * layer is { key, label, heading, rateText, pct, amount } and `amount` is
 * null when it cannot be computed. `complete` is false whenever any layer is
 * null or a measure we do not compute may apply.
 */
export function computeDuty(input) {
  const { line, ov, countryId, date, unitValue, units } = input;
  const weightKg = input.weightKg ?? 0;
  const claims = input.claims ?? {};
  const country = countryById(countryId);
  const value = unitValue * units;
  const layers = [];
  const notes = [];
  const needs = [];
  let complete = true;

  if (!country) throw new Error(`unknown country ${countryId}`);
  if (!dateInRange(date)) {
    return { layers, duty: null, value, rate: null, complete: false, notes: [`No rates for ${date}: this data covers ${VALID_FROM} to ${VALID_THROUGH}.`], needs, outOfRange: true };
  }

  /* 1. The base rate: General, or Column 2 for Cuba and North Korea. */
  const base = country.column2 ? line.column2 : line.general;
  const baseAmount = applyRate(base, { value, units, weightKg });
  if (base.ok && baseAmount == null && base.specific.some((s) => s.per === 'kg')) needs.push('weight');
  layers.push({
    key: 'base', label: country.column2 ? 'Column 2 rate' : 'Base rate (General)', heading: formatCode(line.rateCode),
    rateText: base.text || '—', pct: base.ok && !base.specific.length ? base.adval : null, amount: baseAmount,
  });
  if (baseAmount == null) {
    complete = false;
    notes.push(base.ok
      ? 'Enter the weight of one unit: this line has a per-kilogram duty.'
      : `The rate for this line is "${base.text}". The calculator cannot work that out, so the total leaves it out.`);
  }
  const baseAve = baseAmount != null && value > 0 ? (baseAmount / value) * 100 : null;

  /* 2. China: Section 301 lists, the exclusions, the four-year review. */
  if (country.china301) {
    const active = ov.listIds.map(listMeta).filter(Boolean);
    const live = active.filter((l) => !l.suspended);
    for (const l of active.filter((x) => x.suspended)) {
      layers.push({ key: `list-${l.id}`, label: `Section 301, List ${l.id} (suspended)`, heading: l.heading, rateText: '0% (suspended)', pct: 0, amount: 0 });
    }
    // A code on two lists (only through note 20's partial items) pays the higher.
    const top = live.sort((a, b) => b.rate - a.rate)[0] ?? null;
    let listLayer = null;
    if (top) {
      const excl = ov.exclusions.filter((e) => e.overrides.includes(top.heading));
      const claimed = excl.find((e) => claims.exclusion?.[e.id] && date <= e.until);
      listLayer = {
        key: `list-${top.id}`, label: `Section 301, List ${top.id}`, heading: claimed ? claimed.via : top.heading,
        rateText: claimed ? `0% (exclusion ${claimed.id})` : `${top.rate}%`, pct: claimed ? 0 : top.rate,
        amount: claimed ? 0 : (top.rate / 100) * value,
      };
      for (const e of excl) needs.push({ kind: 'exclusion', id: e.id, desc: e.desc, stats: e.stats, until: e.until, via: e.via });
    }
    const n31 = ov.n31 ? META.note31.find((n) => n.heading === ov.n31 && date >= n.from && (!n.until || date <= n.until)) : null;
    if (n31) {
      // The four-year review set a new Section 301 rate for these codes; it is
      // declared under 9903.91.xx in place of the list heading, not on top.
      if (listLayer) layers.push({ ...listLayer, label: `${listLayer.label} (replaced)`, rateText: `${listLayer.rateText}, replaced by ${n31.heading}`, pct: 0, amount: 0 });
      layers.push({ key: 'n31', label: 'Section 301, four-year review', heading: n31.heading, rateText: `${n31.rate}%`, pct: n31.rate, amount: (n31.rate / 100) * value });
      notes.push(`USTR's four-year review set the Section 301 rate on this code at ${n31.rate}%, which replaces the ${top ? `List ${top.id}` : 'list'} rate rather than adding to it.`);
    } else if (listLayer) {
      layers.push(listLayer);
    } else if (!active.length) {
      layers.push({ key: 'list-none', label: 'Section 301, China lists', heading: '—', rateText: 'Not on Lists 1–4', pct: 0, amount: 0 });
    }
  }

  /* 3. Note 52: the 2026 Section 301 duties by country. */
  if (country.n52) {
    const rows = n52Of(country.n52);
    if (!rows.length) throw new Error(`no note-52 heading for ${country.n52}`);
    const add = rows.find((r) => r.kind === 'add');
    const floor = rows.find((r) => r.kind === 'floor');
    const exemptReason =
      ov.n52Exempt ? 'Listed in note 52(b): exempt from these duties (heading 9903.05.86).'
        : ov.exemptByCountry[country.n52] ? `Listed in note 52(j) for ${country.label}: exempt.`
          : null;
    const cond = [...ov.conditional, ...(ov.conditionalByCountry[country.n52] ?? [])];
    for (const c of cond) needs.push({ kind: 'n52', ...c });
    const claimedCond = cond.find((c) => claims.n52?.[c.id]);
    const s232 = ov.flags.some((f) => SECTION_232_NOTES.has(f.note));
    let label = `Section 301, 2026 (note 52, ${country.label})`;
    let amount = null;
    let pct = null;
    let heading = (add ?? floor)?.heading ?? '—';
    let rateText;
    if (exemptReason) {
      amount = 0; pct = 0; rateText = 'Exempt'; heading = ov.n52Exempt ? '9903.05.86' : heading;
      notes.push(exemptReason);
    } else if (claimedCond) {
      amount = 0; pct = 0; rateText = `Exempt (${claimedCond.source})`; heading = claimedCond.heading ?? heading;
    } else if (s232 && claims.s232) {
      amount = 0; pct = 0; rateText = 'Not applied: Section 232 applies'; heading = '9903.05.90';
    } else if (add) {
      pct = add.rate; amount = (add.rate / 100) * value; rateText = `${add.rate}%`;
    } else if (floor) {
      // Japan, South Korea and Taiwan: the total of the General rate and this
      // duty is topped up to the floor; a General rate at or above it adds nothing.
      const none = rows.find((r) => r.kind === 'floorNone');
      if (baseAve == null) {
        rateText = `Tops the General rate up to ${floor.rate}%`;
        complete = false;
        notes.push(`For ${country.label}, the note-52 duty tops the General rate up to ${floor.rate}%, so it needs the General rate as a percentage, which this line's rate does not give.`);
      } else if (baseAve >= floor.rate) {
        heading = none.heading; pct = 0; amount = 0; rateText = `0% (General rate is already ${trimPct(baseAve)}%)`;
      } else {
        pct = floor.rate - baseAve; amount = (pct / 100) * value; rateText = `${trimPct(pct)}% (tops up to ${floor.rate}%)`;
      }
    }
    if (s232 && !claims.s232 && !exemptReason && !claimedCond) {
      label += ', unless Section 232 applies';
    }
    layers.push({ key: 'n52', label, heading, rateText, pct, amount });
  } else if (country.none) {
    notes.push('No 2026 note-52 duty: the country is not named in headings 9903.05.20–9903.05.84.');
  }

  /* 4. What we flag but do not compute. */
  for (const f of ov.flags) {
    complete = false;
    if (SECTION_232_NOTES.has(f.note) && claims.s232) {
      layers.push({ key: `flag-${f.note}`, label: f.title, heading: `note ${f.note}`, rateText: 'Not computed', pct: null, amount: null });
    }
  }

  const known = layers.filter((l) => l.amount != null);
  if (layers.some((l) => l.amount == null)) complete = false;
  const duty = known.reduce((s, l) => s + l.amount, 0);
  return {
    layers, duty, value, rate: value > 0 ? (duty / value) * 100 : null, complete, notes, needs, flags: ov.flags,
  };
}

const trimPct = (n) => String(Math.round(n * 100) / 100);

/* ── Customs value ────────────────────────────────────────────────────── */

/** Incoterms the page offers. Freight and insurance are not dutiable, so a
 *  price that includes them (CFR, CIF) has them taken off. */
export const INCOTERMS = [
  { id: 'EXW', label: 'EXW (ex works)', includesFreight: false },
  { id: 'FOB', label: 'FOB (free on board)', includesFreight: false },
  { id: 'CFR', label: 'CFR (cost and freight)', includesFreight: true },
  { id: 'CIF', label: 'CIF (cost, insurance and freight)', includesFreight: true },
];

/**
 * Customs value of one unit: the invoice price, less any international
 * freight and insurance it includes, plus assists (moulds and tooling you
 * supplied or paid for), spread over the units they will make.
 */
export function customsValue({ price, incoterm, includedPerUnit = 0, assistTotal = 0, assistUnits = 0 }) {
  const term = INCOTERMS.find((t) => t.id === incoterm) ?? INCOTERMS[1];
  const less = term.includesFreight ? Math.min(includedPerUnit, price) : 0;
  const assist = assistTotal > 0 && assistUnits > 0 ? assistTotal / assistUnits : 0;
  return { unitValue: price - less + assist, less, assist };
}

/**
 * Landed cost of one unit in Amazon's warehouse: what you pay the factory,
 * the freight and insurance you pay on top (none on CFR/CIF, already in the
 * price), the duty and entry fees, the broker, the moulds spread over their
 * production run, and the trip to Amazon.
 */
export function landedCost({ price, units, incoterm, freight = 0, insurance = 0, duty = 0, fees = 0, broker = 0, assistTotal = 0, assistUnits = 0, inbound = 0, other = 0 }) {
  const term = INCOTERMS.find((t) => t.id === incoterm) ?? INCOTERMS[1];
  const perShip = (x) => (units > 0 ? x / units : 0);
  const lines = [
    { key: 'goods', label: `Goods (${term.id} price)`, perUnit: price },
    { key: 'freight', label: 'International freight', perUnit: term.includesFreight ? 0 : perShip(freight), note: term.includesFreight ? `in the ${term.id} price` : null },
    { key: 'insurance', label: 'Cargo insurance', perUnit: term.id === 'CIF' ? 0 : perShip(insurance), note: term.id === 'CIF' ? 'in the CIF price' : null },
    { key: 'duty', label: 'Duty', perUnit: perShip(duty) },
    { key: 'fees', label: 'Customs fees (MPF, HMF)', perUnit: perShip(fees) },
    { key: 'broker', label: 'Customs broker', perUnit: perShip(broker) },
    { key: 'moulds', label: 'Moulds and tooling', perUnit: assistTotal > 0 && assistUnits > 0 ? assistTotal / assistUnits : 0 },
    { key: 'inbound', label: 'Port to Amazon', perUnit: inbound },
    { key: 'other', label: 'Prep and other', perUnit: other },
  ];
  const perUnit = lines.reduce((s, l) => s + l.perUnit, 0);
  return { lines, perUnit, total: perUnit * units };
}
