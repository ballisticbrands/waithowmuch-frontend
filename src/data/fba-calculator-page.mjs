/**
 * The words on /tools/amazon-fba-calculator/, as plain data.
 *
 * 🚨 JSX-free on purpose: the prerender (scripts/postbuild-spa-routes.mjs)
 * emits exactly these strings as the crawler HTML, and pages/FbaCalculator.tsx
 * renders the same strings under the calculator. Copy written only inside the
 * component would be invisible to a crawler; copy written only here would be
 * text a visitor never sees. One source, two renderers.
 *
 * Every figure in the copy is computed from fba-fees-2026.mjs at build time,
 * never typed in, so a rate change cannot leave a stale number in the prose.
 */
import {
  READ_ON, SURCHARGE, SOURCES, PERIODS, STANDARD, SIZE_TIERS_2026, TIER_LABELS, REFERRAL_CATEGORIES,
  STORAGE, LOW_PRICE_EXCLUDED_2027, calculate, categoryById, referralRateText,
} from './fba-fees-2026.mjs';

export const CALCULATOR_PATH = '/tools/amazon-fba-calculator/';
export const TITLE = 'Amazon FBA Calculator: 2026 Fees and Profit';
/** The visible H1: short, keyword first. TITLE stays the JSON-LD name. */
export const H1 = 'Amazon FBA calculator';
/** The one line above the calculator. Everything else sits below it. */
export const TAGLINE = "Amazon's fees and your profit per unit on the 2026 US rate card, from your price, cost and box size.";
export const DOC_TITLE = 'Amazon FBA Calculator 2026: Fees & Profit (Free) | WaitHowMuch';
export const META_DESCRIPTION =
  "Free Amazon FBA fee and profit calculator on Amazon's 2026 US rate card, with peak fees and the 3.5% surcharge. See fees, profit, margin, ROI and break-even ACOS per unit.";

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const usd = (n) => `$${n.toFixed(2)}`;
const pct = (n) => `${(Math.round(n * 10) / 10).toString()}%`;

/** "10 November 2026" */
export const readOnLabel = new Date(`${READ_ON}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});
const periodLabel = (id) => PERIODS.find((p) => p.id === id);
const fmtDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

/* The worked example in the lede: Spite House Games' best-selling deck, whose
   box is stated on its profile (3.7 × 2.8 × 0.87 in, 3.5 oz). */
const deck = (price, periodId) => calculate({
  price, lengthIn: 3.7, widthIn: 2.8, heightIn: 0.87, weightLb: 3.5 / 16, category: 'toys', periodId,
});
const deckOff = deck(12.99, 'nonpeak-2026');
const deckPeak = deck(12.99, 'peak-2026');
const deckLow = deck(9.99, 'nonpeak-2026');

const peak = periodLabel('peak-2026');
const next = periodLabel('nonpeak-2027');
const surchargePct = `${Math.round(SURCHARGE.rate * 1000) / 10}%`;

export const LEDE = `A $12.99 deck of cards in a 3.7 × 2.8 × 0.87 inch box pays Amazon ${usd(deckOff.fba.fee)} to pick, pack and ship and ${usd(deckOff.referral.fee)} in referral fee: <strong>${pct(((deckOff.fba.fee + deckOff.referral.fee) / 12.99) * 100)} of the price</strong> before the cards are printed, and ${usd(deckPeak.fba.fee)} for fulfilment between ${fmtDate(peak.from).replace(/, \d{4}$/, '')} and ${fmtDate(peak.to).replace(/, \d{4}$/, '')}. Enter your own price, cost and box in the calculator above. It applies Amazon's published US rate card and shows what is left per unit.`;

/** One small line directly under the calculator. */
export const SOURCE_LINE = `Fees as of ${readOnLabel}, from Amazon's <a href="${SOURCES.fbaRates.url}" rel="nofollow noopener">FBA rate card</a>, <a href="${SOURCES.referral.url}" rel="nofollow noopener">referral fees</a> and <a href="${SOURCES.storage.url}" rel="nofollow noopener">storage</a> pages, with the ${surchargePct} surcharge in force since ${fmtDate(SURCHARGE.since)}.`;

/* ── Tables, as HTML, from the same data the calculator uses ─────────── */

const sizeTierTable = `<table data-fba-table>
<thead><tr><th>Size tier</th><th>Max shipping weight</th><th>Longest side</th><th>Median side</th><th>Shortest side</th><th>Length + girth</th></tr></thead>
<tbody>${SIZE_TIERS_2026.map((t) => `<tr><td>${esc(TIER_LABELS[t.tier].replace(' 0 to 50 lb', ' (oversize)'))}</td><td>${esc(t.weight)}</td><td>${esc(t.longest)}</td><td>${esc(t.median)}</td><td>${esc(t.shortest)}</td><td>${esc(t.girth)}</td></tr>`).join('')}</tbody>
</table>`;

/* A few rows of the core standard-size card, all three price bands, for the
   current peak period and the non-peak one — enough to see how the price
   bands work without republishing the whole table. */
const SAMPLE_ROWS = [1, 3, 8, 9, 11, 12, 15, 19];
const feeSampleTable = (periodIndex) => `<table data-fba-table>
<thead><tr><th>Shipping weight</th><th>Under $10</th><th>$10 to $50</th><th>Over $50</th></tr></thead>
<tbody>${SAMPLE_ROWS.map((i) => {
  const row = STANDARD.core.rows[i];
  const tier = i < 8 ? 'Small standard' : 'Large standard';
  return `<tr><td>${tier}, ${esc(row[0])}</td>${row[periodIndex + 1].map((v) => `<td>${usd(v)}</td>`).join('')}</tr>`;
}).join('')}</tbody>
</table>`;

const referralTable = `<table data-fba-table>
<thead><tr><th>Fee category</th><th>Referral fee</th><th>Minimum per unit</th></tr></thead>
<tbody>${REFERRAL_CATEGORIES.map((c) => `<tr><td>${esc(c.name)}</td><td>${esc(referralRateText(c))}${c.closingFee ? `, plus a ${usd(c.closingFee)} closing fee` : ''}</td><td>${c.min == null ? 'none' : usd(c.min)}</td></tr>`).join('')}</tbody>
</table>`;

const excluded2027 = LOW_PRICE_EXCLUDED_2027.map((id) => categoryById(id)?.name).filter(Boolean).join(', ');

/* ── The explanatory sections ─────────────────────────────────────────
   { id, title, html } — rendered in this order under the calculator and in
   the crawler HTML. */
export const SECTIONS = [
  {
    id: 'what-it-covers',
    title: 'What this Amazon FBA calculator covers',
    html: `<p>It works out the five lines Amazon charges on a typical FBA unit and what that leaves you: the <strong>size tier</strong> your box falls in, the <strong>FBA fulfilment fee</strong> for that tier and price, the <strong>referral fee</strong> for your category, an estimate of <strong>monthly storage</strong>, and the total. Against your product cost, inbound shipping and advertising it then shows profit per unit, margin, return on the money tied up in stock, the break-even ACOS and, if you give it a monthly volume, profit per month.</p>
<p>The fee tables are Amazon's own US rate cards for three periods: ${esc(periodLabel('nonpeak-2026').label)} (${fmtDate(periodLabel('nonpeak-2026').from)} to ${fmtDate(periodLabel('nonpeak-2026').to)}), the ${esc(peak.label)} (${fmtDate(peak.from)} to ${fmtDate(peak.to)}) and ${esc(next.label)} (from ${fmtDate(next.from)}). The calculator opens on whichever is in force today.</p>
<p>It leaves out what depends on your account rather than your product: the inbound placement fee, the low-inventory-level fee, the storage utilisation surcharge, aged-inventory charges, returns processing, removals and the lithium-battery fee. When your box is big enough to attract an oversize handling fee, the calculator says so but does not add it. Treat the profit it shows as a ceiling, as we do on every case study.</p>`,
  },
  {
    id: 'size-tiers',
    title: 'How FBA size tiers work',
    html: `<p>Amazon sorts every packaged unit into a size tier using its three sides and its shipping weight, and the tier sets which fee table applies. A product fits the first tier whose limits it does not exceed. The thin edge matters most: a box 0.87 inches deep misses small standard's 0.75 inch limit and pays large-standard rates, however light it is.</p>
${sizeTierTable}
<p>Shipping weight is the unit weight for small standard. For every other tier it is the greater of the unit weight and the <strong>dimensional weight</strong>, which is length × width × height in inches divided by 139; for bulky and oversize items Amazon assumes a width and height of at least 2 inches. A light product in a big box is charged as if it were heavy. From ${fmtDate(next.from)} the bulky tiers split into four and the extra-large tiers become six oversize tiers; the calculator uses the new tiers when you pick ${esc(next.label)}.</p>`,
  },
  {
    id: 'fulfilment-fee',
    title: 'The FBA fulfilment fee: price bands, low-price FBA and peak',
    html: `<p>Within a tier the fee steps up with shipping weight, and it also depends on the price. A unit under $10 gets the low-price rate, one between $10 and $50 (both inclusive) the standard rate, and one over $50 a higher rate. These are Amazon's ${esc(periodLabel('nonpeak-2026').label)} rates for some common weights, before the surcharge:</p>
${feeSampleTable(0)}
<p>Between ${fmtDate(peak.from)} and ${fmtDate(peak.to)} the holiday peak card applies instead, which is higher on every row. The same deck that pays ${usd(deckOff.fba.fee)} the rest of the year pays ${usd(deckPeak.fba.fee)} in peak. Since ${fmtDate(SURCHARGE.since)} Amazon has also added a ${surchargePct} fuel and logistics surcharge to every fulfilment fee. It is not printed in the rate tables, so the calculator applies it on top.</p>
<p>Dropping the deck to $9.99 moves it into the low-price band, where fulfilment falls to ${usd(deckLow.fba.fee)}. Through ${fmtDate(peak.to)} every category qualifies. From ${fmtDate(next.from)} these fee categories lose the low-price rate and pay the $10 to $50 rate instead: ${esc(excluded2027)}.</p>`,
  },
  {
    id: 'referral-fees',
    title: 'How Amazon referral fees work',
    html: `<p>The referral fee is Amazon's commission on the sale: a percentage of the total price the customer pays, or a per-unit minimum, whichever is greater. Most categories charge 15%. A few charge less on cheap items (Beauty, Health and Personal Care and Baby Products take 8% at $10 or less), and some charge a lower rate only on the part of the price above a threshold. Your fee category can differ from the category the product shows in on Amazon.</p>
${referralTable}`,
  },
  {
    id: 'storage',
    title: 'Monthly storage',
    html: `<p>Storage is charged per cubic foot of packaged volume, per month. The calculator uses Amazon's base rate for stock under 181 days old: ${usd(STORAGE.standard.offPeak)} per cubic foot for standard-size items from January to September and ${usd(STORAGE.standard.peak)} from October to December, and ${usd(STORAGE.oversize.offPeak)} and ${usd(STORAGE.oversize.peak)} for bulky and oversize items. Dangerous goods pay more. Sellers who have been shipping for over a year and hold a lot of slow stock also pay a utilisation surcharge, which the calculator leaves out because it depends on your whole inventory rather than one product.</p>`,
  },
];

/* ── FAQ: written around what people actually search ───────────────── */
export const FAQ = [
  {
    q: 'How do I estimate Amazon FBA fees for a product?',
    a: `Measure the packaged unit and weigh it, find its size tier, then read the fulfilment fee for that tier, shipping weight and price band off Amazon's rate card and add the ${surchargePct} surcharge. Add the referral fee for your category and a month or two of storage. The calculator above does all of it from five numbers: price, length, width, height and weight.`,
  },
  {
    q: 'How do I calculate Amazon seller fees in total?',
    a: `Total Amazon fees per unit are the FBA fulfilment fee plus the referral fee plus storage, plus a $1.80 closing fee on media. A Professional selling plan adds $39.99 a month, which is not per unit and is not in the calculator. Inbound placement, returns and advertising are separate costs you set or incur yourself.`,
  },
  {
    q: 'What does Amazon charge to fulfil a product under $10?',
    a: `Products priced under $10 get the low-price FBA rates, which are lower than the $10 to $50 rates for the same box. For example, a large-standard unit of 4 oz or less costs ${usd(STANDARD.core.rows[8][1][0])} under $10 and ${usd(STANDARD.core.rows[8][1][1])} at $10 to $50 on the ${esc(periodLabel('nonpeak-2026').label)} card, before the surcharge. From ${fmtDate(next.from)} five fee categories no longer qualify.`,
  },
  {
    q: 'Is this an Amazon profit calculator or just a fee calculator?',
    a: 'Both. It totals Amazon\'s fees, then subtracts your product cost, inbound shipping and advertising to give profit per unit, margin, ROI, the break-even ACOS and monthly profit.',
  },
  {
    q: 'What is break-even ACOS?',
    a: 'Break-even ACOS is the share of the sale price you could spend on advertising and still make nothing: profit before advertising divided by price. If your ACOS on a campaign is below it, each ad-driven sale makes money; above it, each one loses money.',
  },
  {
    q: 'Why are FBA fees higher between October and January?',
    a: `Amazon charges holiday peak fulfilment fees from ${fmtDate(peak.from)} to ${fmtDate(peak.to)}, and monthly storage roughly triples from October to December. The fee is set when the unit ships, so an order placed before ${fmtDate(peak.from)} that ships after it pays the peak rate.`,
  },
  {
    q: 'Does the calculator include inbound placement, returns and other fees?',
    a: 'No. Inbound placement, the low-inventory-level fee, returns processing, removals, the storage utilisation surcharge and aged-inventory charges depend on how you ship and how your stock moves, not on the product, so they are left out. The profit shown is the most a unit can make, not a guarantee.',
  },
];

/** FAQ answer as plain text, for JSON-LD. */
export const faqPlain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const RELATED = [
  { href: '/blog/how-much-does-amazon-take-from-sellers/', label: 'How much does Amazon take from sellers?' },
  { href: '/blog/how-much-does-amazon-fba-cost-to-start/', label: 'How much does Amazon FBA cost to start?' },
];

/** Plain-language explanation of each result line, shown under it. Short:
 *  the computed detail (rate, share of price) follows it. */
export const RESULT_NOTES = {
  tier: 'Picks the fee table.',
  fba: `Pick, pack and ship, incl. the ${surchargePct} surcharge.`,
  referral: "Amazon's commission for your category.",
  storage: 'Base monthly storage.',
  amazonFees: 'Everything Amazon takes per sale.',
  landed: 'Product plus inbound shipping.',
  ads: 'Ad spend per unit.',
  profit: 'After Amazon, the product, shipping and ads.',
  margin: 'Profit as a share of price.',
  roi: 'Profit as a share of landed cost.',
  acos: 'The most ads can cost, as a share of price, before a sale loses money.',
  monthly: 'Profit per unit × units a month.',
};
