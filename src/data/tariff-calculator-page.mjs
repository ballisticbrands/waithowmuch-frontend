/**
 * The words on /tools/tariff-calculator/, as plain data.
 *
 * 🚨 JSX-free on purpose, like roas-calculator-page.mjs: the prerender
 * (scripts/postbuild-spa-routes.mjs) emits exactly these strings as the
 * crawler HTML, and pages/TariffCalculator.tsx renders the same strings under
 * the calculator. One source, two renderers.
 *
 * The rates in the tables come from tariff-meta.json (USITC data), never
 * typed. The worked examples state their result, because working them out
 * needs the chapter files the browser loads on demand; scripts/check-tariff.mjs
 * recomputes every one of them with the calculator's own engine and fails the
 * build if any differs.
 */
import { META, FEES, COUNTRIES, NOT_MODELLED, VALID_FROM, VALID_THROUGH } from './tariff.mjs';

export const CALCULATOR_PATH = '/tools/tariff-calculator/';
export const LANDED_PATH = '/tools/landed-cost-calculator/';
export const FBA_CALCULATOR_PATH = '/tools/amazon-fba-calculator/';
export const TARIFFS_POST_PATH = '/blog/how-much-do-tariffs-add-to-amazon-products/';
export const CROSS_URL = 'https://rulings.cbp.gov/';
export const HTS_URL = 'https://hts.usitc.gov/';

export const TITLE = 'US Import Tariff Calculator: Duty by HTS Code and Country';
export const DOC_TITLE = 'US Import Tariff Calculator 2026: Duty by HTS Code (Free) | WaitHowMuch';
export const META_DESCRIPTION =
  'Free US import tariff calculator on the official 2026 HTS: base duty, China Section 301 lists and exclusions, the 2026 Section 301 rate by country, MPF and HMF.';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const usd = (n) => `$${n.toFixed(2)}`;
const usd0 = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

/** "10 November 2026" */
export const dateLabel = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const REVISION_LABEL = `HTS ${META.revision.label.replace(/^\d{4} HTS /, `${META.revision.label.slice(0, 4)} `)}`; // "HTS 2026 Revision 23"
export const SOURCE_LINE = `Rates from the ${REVISION_LABEL} (in force from ${dateLabel(VALID_FROM)}), read from the US International Trade Commission on ${dateLabel(META.fetchedAt)}, with the Chapter 99 notes of the same revision. It answers for entry dates from ${dateLabel(VALID_FROM)} to ${dateLabel(VALID_THROUGH)}. An estimate, not a ruling: the classification that counts is the one CBP accepts.`;
export const PRIVACY_LINE = 'Everything is worked out in your browser. Nothing you type is sent or stored.';

/* ── Worked examples (recomputed by scripts/check-tariff.mjs) ────────── */
export const EXAMPLES = [
  { id: 'deck', slug: 'spite-house-games', business: 'Spite House Games', product: 'Deck of cards', code: '9504400000', country: 'CN', price: 0.47, expect: { ratePct: 12.5, perUnit: 0.06 }, layers: 'Free + List 4B (suspended) + 12.5%' },
  { id: 'spatula', slug: 'ototo', business: 'OTOTO', product: 'Silicone spatula', code: '3924104000', country: 'CN', price: 1.4, expect: { ratePct: 15.9, perUnit: 0.22 }, layers: '3.4% + List 4B (suspended) + 12.5%' },
  { id: 'kit-cn', slug: 'doctor-jupiter', business: 'Doctor Jupiter', product: 'Science kit, made in China', code: '9503000073', country: 'CN', price: 3.25, expect: { ratePct: 12.5, perUnit: 0.41 }, layers: 'Free + List 4B (suspended) + 12.5%' },
  { id: 'kit-in', slug: 'doctor-jupiter', business: 'Doctor Jupiter', product: 'Science kit, made in India', code: '9503000073', country: 'IN', price: 3.25, expect: { ratePct: 10, perUnit: 0.33 }, layers: 'Free + 10%' },
  { id: 'corkscrew', slug: 'ototo', business: 'OTOTO', product: 'Steel corkscrew, no exclusion claimed', code: '8205513030', country: 'CN', price: 5.54, expect: { ratePct: 41.2, perUnit: 2.28 }, layers: '3.7% + List 3 25% + 12.5%' },
  { id: 'corkscrew-excl', slug: 'ototo', business: 'OTOTO', product: 'Steel corkscrew, with the List 3 exclusion', code: '8205513030', country: 'CN', price: 5.54, claims: { exclusion: { '20(vvv)(iii)(42)': true } }, expect: { ratePct: 16.2, perUnit: 0.9 }, layers: '3.7% + List 3 excluded + 12.5%' },
  { id: 'opener-steel', slug: 'draft-top', business: 'Draft Top', product: 'Can opener, as a steel tool', code: '8210000000', country: 'CN', price: 1.37, expect: { ratePct: 41.2, perUnit: 0.56 }, layers: '3.7% + List 3 25% + 12.5%' },
  { id: 'glass', slug: null, business: null, product: 'Drinking glass valued $0.30–$3', code: '7013372090', country: 'CN', price: 2.0, expect: { ratePct: 42.5, perUnit: 0.85 }, layers: '22.5% + List 4A 7.5% + 12.5%' },
  { id: 'scissors', slug: 'ototo', business: 'OTOTO', product: 'Scissors', code: '8213009000', country: 'CN', price: 2.42, expect: { ratePct: 16.74, perUnit: 0.41 }, layers: '3¢ each + 3% + List 4B (suspended) + 12.5%' },
];

/** The MPF examples asserted by the check: the floor, a mid value, the cap. */
export const MPF_EXAMPLES = [
  { value: 2000, mpf: FEES.mpfMin },
  { value: 20000, mpf: 69.28 },
  { value: 500000, mpf: FEES.mpfMax },
];

const fmtCode = (d) => [d.slice(0, 4), d.slice(4, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean).join('.');
const pctText = (n) => `${Math.round(n * 100) / 100}%`;

function examplesTable(pathOf) {
  const rows = EXAMPLES.map((e) => {
    const who = e.slug ? `<a href="${pathOf(e.slug)}">${esc(e.business)}</a>: ` : '';
    const country = COUNTRIES.find((c) => c.id === e.country)?.label;
    return `<tr><td>${who}${esc(e.product)}</td><td>${fmtCode(e.code)}</td><td>${esc(country)}</td><td>${usd(e.price)}</td><td>${esc(e.layers)}</td><td>${pctText(e.expect.ratePct)}</td><td>${usd(e.expect.perUnit)}</td></tr>`;
  }).join('\n');
  return `<table data-fba-table>
<thead><tr><th>Product</th><th>HTS code</th><th>Made in</th><th>Customs value</th><th>The stack</th><th>Duty rate</th><th>Duty a unit</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>`;
}

const offered = COUNTRIES.filter((c) => c.n52);
function countryTable() {
  const rows = offered.map((c) => {
    const h = META.n52.filter((r) => r.country === c.n52);
    const add = h.find((r) => r.kind === 'add');
    const floor = h.find((r) => r.kind === 'floor');
    const what = add
      ? `+${add.rate}% on top of the General rate`
      : `Tops the General rate up to ${floor.rate}%; nothing if it is already ${floor.rate}% or more`;
    return `<tr><td>${esc(c.label)}</td><td>${what}</td><td>${(add ?? floor).heading}${floor ? `, ${h.find((r) => r.kind === 'floorNone').heading}` : ''}</td><td>${c.china301 ? 'Yes: Lists 1 to 4A, exclusions, four-year review' : 'No'}</td></tr>`;
  }).join('\n');
  return `<table data-fba-table>
<thead><tr><th>Country of origin</th><th>2026 Section 301 duty (note 52)</th><th>Heading</th><th>China Section 301 lists</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>`;
}

const listCount = (id) => META.counts.lists[id].toLocaleString('en-US');

/* ── Sections: { id, title, html } — order matters ───────────────────── */
export function sections(pathOf) {
  return [
    {
      id: 'how',
      title: 'How US import duty is calculated',
      html: `<p>US import duty is a percentage of the goods' customs value, and the percentage is a stack of separate duties. This tariff calculator adds them up the way a customs entry does:</p>
<ol>
<li><strong>The base rate.</strong> The "General" column of the Harmonized Tariff Schedule of the United States (HTSUS) for your 10-digit code. Most are a plain percentage; some are a fixed amount per item or per kilogram, or both (see below).</li>
<li><strong>The China Section 301 lists</strong>, for goods made in China only: 25% on Lists 1, 2 and 3, 7.5% on List 4A, nothing on List 4B (suspended). USTR still excludes ${META.counts.exclusions} particular products, and its four-year review set higher rates on some codes, such as lithium-ion batteries and medical gloves.</li>
<li><strong>The 2026 Section 301 duty for the country of origin</strong>, in force since 24 July 2026 under headings 9903.05.20 to 9903.05.84 and U.S. note 52: 12.5% on goods of China, Hong Kong and Vietnam, 10% on goods of India, Indonesia and others, with exemptions listed in the note. It replaced the 10% Section 122 surcharge, which itself replaced the IEEPA tariffs the Supreme Court struck down.</li>
<li><strong>The entry fees</strong>: the merchandise processing fee (MPF) on every formal entry, and the harbor maintenance fee (HMF) on goods that arrive by sea.</li>
</ol>
<p><strong>Duty = customs value × (base rate + each additional duty that applies)</strong>, plus any per-unit amounts. The calculator shows each layer with its heading, so you can check every line against the schedule and against your broker's entry.</p>`,
    },
    {
      id: 'countries',
      title: 'Tariff rates by country of origin, 2026',
      html: `<p>The countries this calculator covers, and the 2026 duty on each, read from the headings of the ${REVISION_LABEL}:</p>
${countryTable()}
<p>Japan, South Korea and Taiwan work differently: their duty brings the total up to a floor rather than adding to it, so a product whose General rate is already at the floor pays nothing more. For a country not named in note 52, choose "a country not named in note 52" and only the General rate applies. Cuba and North Korea pay the Column 2 rates. Not covered yet: ${NOT_MODELLED.join('; ')}.</p>`,
    },
    {
      id: 'china',
      title: 'The China Section 301 lists',
      html: `<p>Goods made in China pay the 12.5% above and, if their 8-digit code is on one of the 2018–2019 Section 301 lists in U.S. note 20 to Chapter 99, that list's duty too. We read the lists from the notes of the same revision:</p>
<table data-fba-table>
<thead><tr><th>List</th><th>Heading</th><th>Rate</th><th>Codes</th></tr></thead>
<tbody>
${META.lists.map((l) => `<tr><td>List ${l.id}</td><td>${l.heading}</td><td>${l.suspended ? 'Suspended (0%)' : `${l.rate}%`}</td><td>${listCount(l.id)}</td></tr>`).join('\n')}
</tbody>
</table>
<p>Some codes are on a list only in part: the notes name a subheading "except" certain 10-digit numbers, so the calculator checks the full 10-digit code. Exclusions are narrower still. Each covers a product described in words under one 10-digit number, such as "kitchen and table implements of iron or steel, non-electric". USTR has extended the ${META.counts.exclusions} still in force through ${dateLabel(VALID_THROUGH)}. When your code has one, the calculator shows its wording and asks whether your product matches, because a code alone cannot answer that.</p>
<p>The four-year review (U.S. note 31) raised the Section 301 rate on some codes: 25% on non-EV lithium-ion batteries, natural graphite, permanent magnets and some steel, aluminium and minerals; 50% on semiconductors, solar cells, polysilicon and face masks; 100% on electric vehicles, syringes and needles, and rubber medical gloves. That rate replaces the list rate on those codes; it does not stack on it.</p>`,
    },
    {
      id: 'worked-examples',
      title: 'Worked examples from real Amazon products',
      html: `<p>Products from businesses in our database, at the factory prices in their margin models, entered on ${dateLabel(VALID_FROM)}. The classification is ours, argued in <a href="${TARIFFS_POST_PATH}">how much tariffs add to Amazon products</a>; each preset above carries the CBP ruling it leans on.</p>
${examplesTable(pathOf)}
<p>The corkscrew shows why the exclusions matter: one sentence in note 20 takes the duty from 41.2% to 16.2%, about ${usd(2.28 - 0.9)} a unit. The scissors show a compound rate: 3 cents a pair plus 3%, which on a $2.42 pair works out to 4.24% before the 12.5%.</p>`,
    },
    {
      id: 'customs-value',
      title: 'What the duty is charged on',
      html: `<p>CBP charges duty on the transaction value: what you pay the seller for the goods, <strong>not including international freight and insurance</strong>. On an FOB or EXW price the duty is charged on that price. On a CFR or CIF price, take out the freight and insurance it includes; the calculator does this when you choose the Incoterm.</p>
<p>Two things are added. <strong>Assists</strong>: moulds, tools and dies you supply or pay for are part of the value of the goods they make. The calculator spreads a mould's cost over the units it will make, which is one of the methods CBP accepts; agree the method with your broker. And <strong>packing, commissions and royalties</strong> you pay that are not already in the price.</p>
<p>To carry freight, the broker and the trip to Amazon into a cost per unit, use the <a href="${LANDED_PATH}">landed cost calculator</a>.</p>`,
    },
    {
      id: 'fees',
      title: 'MPF, HMF and the end of de minimis',
      html: `<ul>
<li><strong>Merchandise processing fee:</strong> ${(FEES.mpfRate * 100).toFixed(4)}% of the entry's value on a formal entry, at least ${usd(FEES.mpfMin)} and at most ${usd(FEES.mpfMax)}. On a $20,000 shipment that is ${usd(20000 * FEES.mpfRate)}.</li>
<li><strong>Harbor maintenance fee:</strong> ${(FEES.hmfRate * 100).toFixed(3)}% of the value, on goods that arrive by sea: ${usd(20000 * FEES.hmfRate)} on the same shipment. Air freight does not pay it.</li>
</ul>
<p>From CBP's user fee table, updated ${dateLabel(FEES.updated)}. Entries under $2,500 can usually go in as informal entries, which pay a small flat MPF instead; the calculator shows the formal-entry fee. Both fees are on the whole entry, so a shipment of several products shares one MPF.</p>
<p>The $800 de minimis exemption is suspended: for courier and freight shipments since 24 June 2026, and for international mail since 24 July 2026. Samples and small restocks pay duty like a container does, which is why this calculator has no lower limit.</p>`,
    },
    {
      id: 'specific-rates',
      title: 'Specific and compound rates',
      html: `<p>Of the ${META.counts.generalRates.toLocaleString('en-US')} General rates in the schedule, ${META.counts.notPercent.toLocaleString('en-US')} are something other than a percentage or "Free". A <strong>specific</strong> rate is an amount per unit ("3¢ each", "2.2¢/kg"); a <strong>compound</strong> rate is both ("3¢ each + 3%"). The calculator works out the ${META.counts.notPercentComputed.toLocaleString('en-US')} priced per item, per dozen, per gross, per pair or per kilogram (it asks for the weight of one unit). The rest, such as per-litre rates, rates "on the case" or "on the battery" of a watch, and rates on a metal's content, are shown as the schedule writes them, and the total says it leaves them out.</p>
<p>Some lines also carry a value band in their description, such as drinking glasses "valued over $0.30 but not over $3 each". A value outside the band means a different line, not a different rate, so the calculator warns you when your unit value does not fit the line you picked.</p>`,
    },
    {
      id: 'limits',
      title: 'What this calculator does not do',
      html: `<ul>
<li><strong>Section 232.</strong> Steel, aluminium and copper (and products made of them), cars and car parts, lumber, upholstered furniture and kitchen cabinets, trucks, semiconductors, pharmaceuticals, and drones have sector tariffs of 10% to 100% that depend on metal content, origin of the metal and country deals. When your code is named in one of those notes, the calculator says so and marks the total as incomplete. Where Section 232 applies, the 2026 note-52 duty does not; tick the box and it is taken out.</li>
<li><strong>Antidumping and countervailing duties</strong>, which apply by product and by manufacturer. Search the cases on the ITA's AD/CVD pages if your product is metal, chemical, solar, tyres, furniture or similar.</li>
<li><strong>Free-trade-agreement and GSP rates</strong>. The calculator uses the General column for everyone.</li>
<li><strong>Several products in one entry.</strong> It prices one HTS line. The MPF floor and cap apply per entry, so a mixed shipment pays one fee.</li>
</ul>
<p>When the answer changes whether a product is worth selling, pay a customs broker to confirm it, or ask CBP for a binding ruling before you order. Search CBP's rulings (CROSS) at <a href="${CROSS_URL}" rel="noopener">rulings.cbp.gov</a> for a product like yours first.</p>`,
    },
    {
      id: 'hts-code',
      title: 'How to find your HTS code',
      html: `<ol>
<li><strong>Start from your supplier's export code.</strong> The first six digits are the same everywhere, so the code on your Chinese supplier's export declaration is a good start; the last four digits are American and yours to get right.</li>
<li><strong>Search by what the product is made of and what it does.</strong> Type words into the search above, or browse the schedule at <a href="${HTS_URL}" rel="noopener">hts.usitc.gov</a>. The calculator shows the path from the heading down to the line, so you can see which "Other" you are in.</li>
<li><strong>Check a CBP ruling.</strong> Search <a href="${CROSS_URL}" rel="noopener">CROSS</a> for a product like yours. Rulings give the code CBP chose and usually the Chapter 99 headings that apply.</li>
<li><strong>Pick the 10-digit line.</strong> Section 301 partial listings and exclusions are written at 10 digits, so the calculator always asks for the full code.</li>
</ol>`,
    },
  ];
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */
export const FAQ = [
  {
    q: 'How do I calculate US import duty?',
    a: 'Find the 10-digit HTS code, read its General rate, add any Chapter 99 duties for the country of origin (the China Section 301 lists, the 2026 Section 301 rate of note 52, Section 232 where it applies), and multiply the total by the customs value: normally the factory price, without international freight and insurance. Then add the MPF and, by sea, the HMF. The calculator above does each step and shows its working.',
  },
  {
    q: 'What is the tariff on goods from China in 2026?',
    a: 'From 24 July 2026: the General rate, plus 12.5% under heading 9903.05.31, plus 25% if the code is on Section 301 List 1, 2 or 3, or 7.5% on List 4A. List 4B is suspended. Playing cards and toys come to 12.5%; plastic kitchenware 15.9%; steel kitchen tools on List 3 41.2%, unless a USTR exclusion covers them.',
  },
  {
    q: 'Can I calculate the tariff by HTS code?',
    a: 'Yes. Type the code into the search box, with or without dots. If you type 6 or 8 digits, the calculator lists the 10-digit lines under them, because Section 301 partial listings and exclusions are written at 10 digits. You can also search by description.',
  },
  {
    q: 'Do I pay duty on shipping costs?',
    a: 'Not on international freight and insurance. US customs value excludes them, so a CIF or CFR price has them taken off. You do pay duty on moulds and tooling you supply (assists), and on packing, commissions and royalties not already in the price.',
  },
  {
    q: 'What are the MPF and HMF?',
    a: `The merchandise processing fee is ${(FEES.mpfRate * 100).toFixed(4)}% of a formal entry's value, between ${usd(FEES.mpfMin)} and ${usd(FEES.mpfMax)}. The harbor maintenance fee is ${(FEES.hmfRate * 100).toFixed(3)}% of the value of goods that arrive by sea. Both are CBP charges on top of duty; your broker's own fee is separate.`,
  },
  {
    q: 'Does the $800 de minimis exemption still apply?',
    a: 'No. CBP suspended it for courier and freight shipments from 24 June 2026 and for international mail from 24 July 2026. Small parcels, samples and AliExpress or Temu orders now pay duty like any other import.',
  },
  {
    q: 'What is the difference between Section 301, note 52 and Section 232?',
    a: 'Section 301 lets USTR answer unfair trade practices: the 2018–2019 China lists, and since July 2026 the forced-labour duties of note 52 on most countries. Section 232 is the Commerce Department\'s national-security tariffs on sectors such as steel, aluminium, copper, cars and lumber. Section 301 duties stack on each other; where a Section 232 duty applies, the note-52 duty does not.',
  },
  {
    q: 'Is the result a ruling I can rely on?',
    a: `No. It is an estimate from the published schedule. Only CBP decides the classification, and a different code can change the duty several times over. For a binding answer, ask CBP for a ruling or hire a licensed customs broker; search existing rulings at <a href="${CROSS_URL}" rel="noopener">CBP CROSS</a>.`,
  },
  {
    q: 'Which countries does this tariff calculator cover?',
    a: `${COUNTRIES.filter((c) => c.n52).map((c) => c.label).join(', ')}, any country not named in note 52, and the Column 2 countries. Not yet: ${NOT_MODELLED.join('; ')}.`,
  },
  {
    q: 'How current are the rates?',
    a: `They are the ${REVISION_LABEL}, read from the USITC on ${dateLabel(META.fetchedAt)}. The calculator only answers for entry dates from ${dateLabel(VALID_FROM)} to ${dateLabel(VALID_THROUGH)}, the day the current Section 301 exclusions end. We re-read the schedule when USITC publishes a new revision.`,
  },
];

export const faqPlain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const RELATED = [
  { href: LANDED_PATH, label: 'Landed cost calculator: duty, freight and fees per unit' },
  { href: TARIFFS_POST_PATH, label: 'How much do tariffs add to Amazon products?' },
  { href: FBA_CALCULATOR_PATH, label: 'Amazon FBA calculator: 2026 fees and profit' },
  { href: '/blog/alibaba-vs-aliexpress/', label: 'Alibaba vs AliExpress' },
];

export const LEDE = `Enter an HTS code or a product description, the country it is made in and its factory price, and get the US import duty layer by layer: the base rate, the China Section 301 lists and their exclusions, the 2026 Section 301 rate for the country of origin, the MPF and the HMF. A deck of cards from China pays <strong>12.5%</strong>; a steel kitchen tool on List 3 pays <strong>41.2%</strong> unless an exclusion covers it. Presets load real products from businesses we track.`;

export const usd0Label = usd0;
