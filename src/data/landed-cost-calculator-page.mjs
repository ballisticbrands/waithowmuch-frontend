/**
 * The words on /tools/landed-cost-calculator/, as plain data. Same rules as
 * tariff-calculator-page.mjs: one source for the page and the prerender.
 *
 * The worked example's arithmetic is done here by the shared engine
 * (landedCost, entryFees), on the duty rate of a tariff-page example that
 * scripts/check-tariff.mjs recomputes from the HTS, so no total is typed.
 */
import { FEES, landedCost, entryFees, VALID_FROM } from './tariff.mjs';
import {
  EXAMPLES, CALCULATOR_PATH as TARIFF_PATH, LANDED_PATH, FBA_CALCULATOR_PATH, TARIFFS_POST_PATH, CROSS_URL,
  REVISION_LABEL, dateLabel,
} from './tariff-calculator-page.mjs';

export { LANDED_PATH as CALCULATOR_PATH };
export const TITLE = 'Landed Cost Calculator: Duty, Freight and Fees per Unit';
export const DOC_TITLE = 'Landed Cost Calculator for Imports to the US (Free) | WaitHowMuch';
export const META_DESCRIPTION =
  'Free landed cost calculator for US imports: factory price, freight, insurance, 2026 duty by HTS code, MPF, HMF, broker, moulds and the trip to Amazon, per unit.';

const usd = (n) => `$${n.toFixed(2)}`;
const usd0 = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const pct = (n) => `${Math.round(n * 100) / 100}%`;

/* ── The worked example: OTOTO's spatula, a 2,000-unit sea shipment ──── */
const spatula = EXAMPLES.find((e) => e.id === 'spatula');
export const LANDED_EXAMPLE = {
  slug: 'ototo', business: 'OTOTO', product: 'Splatypus silicone spatula', code: spatula.code, country: 'CN',
  units: 2000, price: spatula.price, incoterm: 'FOB', mode: 'ocean',
  freight: 0.17 * 2000, // OTOTO's margin model: $0.17 a unit, Freightos China to US West Coast
  insurance: 14, // ASSUMED: 0.5% of the goods
  broker: 150, // ASSUMED: a typical per-entry fee
  inbound: 0.25, // ASSUMED: port to an Amazon warehouse, per unit
  ratePct: spatula.expect.ratePct,
};
const X = LANDED_EXAMPLE;
const xValue = X.price * X.units;
export const X_FEES = entryFees(xValue, X.mode);
export const X_DUTY = (xValue * X.ratePct) / 100;
export const X_LANDED = landedCost({
  price: X.price, units: X.units, incoterm: X.incoterm, freight: X.freight, insurance: X.insurance,
  duty: X_DUTY, fees: X_FEES.total, broker: X.broker, inbound: X.inbound,
});

export const LEDE = `Landed cost is what one unit costs by the time it is on an Amazon shelf: the factory price, the freight and insurance, the US duty and customs fees, the broker, any moulds, and the trip from the port to the warehouse. Pick the product's HTS code and country, enter the shipment, and get the cost per unit, with the duty worked out on the ${REVISION_LABEL}. A $${X.price.toFixed(2)} silicone spatula from China lands at about <strong>${usd(X_LANDED.perUnit)}</strong>, ${Math.round((X_LANDED.perUnit / X.price - 1) * 100)}% more than the factory price.`;

export const PRIVACY_LINE = 'Everything is worked out in your browser. Nothing you type is sent or stored.';

export function sections(pathOf) {
  const row = (l) => `<tr><td>${l.label}</td><td>${usd(l.perUnit)}</td><td>${usd0(l.perUnit * X.units)}</td></tr>`;
  return [
    {
      id: 'formula',
      title: 'The landed cost formula',
      html: `<p><strong>Landed cost per unit = (goods + freight + insurance + duty + customs fees + broker + moulds + port-to-Amazon) ÷ units</strong></p>
<p>Duty is the only line that is not simply what you pay someone. It is charged on the customs value of the goods, which leaves out international freight and insurance but takes in moulds and tooling you pay for. So the calculator works out the customs value first, from the price and the Incoterm, and the duty from that, using the same engine as our <a href="${TARIFF_PATH}">US import tariff calculator</a>.</p>
<ul>
<li><strong>EXW or FOB price:</strong> the freight and insurance you book are added to the landed cost but not to the customs value.</li>
<li><strong>CFR or CIF price:</strong> the freight (and on CIF the insurance) is already in the price. Nothing is added for it, and it is taken off the customs value before the duty is worked out.</li>
<li><strong>Customs fees:</strong> the MPF (${(FEES.mpfRate * 100).toFixed(4)}% of the entry, ${usd(FEES.mpfMin)} to ${usd(FEES.mpfMax)}) and, by sea, the HMF (${(FEES.hmfRate * 100).toFixed(3)}%). They are per entry, so a small shipment carries the MPF minimum on few units.</li>
</ul>`,
    },
    {
      id: 'worked-example',
      title: 'Worked example: a 2,000-unit shipment of spatulas',
      html: `<p><a href="${pathOf(X.slug)}">${X.business}</a>'s ${X.product.toLowerCase()} costs ${usd(X.price)} from the factory in its margin model, and ships at about ${usd(X.freight / X.units)} a unit by sea from China. It enters under 3924.10.40 at ${pct(X.ratePct)}: 3.4% plus the 12.5% on goods of China (its Section 301 list is suspended). The insurance, the broker's fee and the trip to Amazon are our assumptions, marked below.</p>
<table data-fba-table>
<thead><tr><th>Line</th><th>Per unit</th><th>Shipment of ${X.units.toLocaleString('en-US')}</th></tr></thead>
<tbody>
${X_LANDED.lines.filter((l) => l.perUnit > 0).map(row).join('\n')}
<tr><td><strong>Landed cost</strong></td><td><strong>${usd(X_LANDED.perUnit)}</strong></td><td><strong>${usd0(X_LANDED.total)}</strong></td></tr>
</tbody>
</table>
<p>Assumed: insurance at 0.5% of the goods (${usd0(X.insurance)}), a ${usd0(X.broker)} broker fee, and ${usd(X.inbound)} a unit from the port to Amazon. The MPF is the ${usd(FEES.mpfMin)} minimum: on a ${usd0(xValue)} entry the percentage would come to ${usd(X_FEES.mpfRaw)}. Entered on ${dateLabel(VALID_FROM)}.</p>
<p>Duty and fees together add ${usd((X_DUTY + X_FEES.total) / X.units)} a unit, about as much as the freight. On a product with a higher General rate or on Section 301 List 3 the duty becomes the biggest line after the goods; see the worked examples on the <a href="${TARIFF_PATH}">tariff calculator</a>.</p>`,
    },
    {
      id: 'moulds',
      title: 'Moulds, tooling and other one-off costs',
      html: `<p>A mould is paid once but used for every unit it makes, so the calculator spreads it over the production run you expect: a $9,000 set of moulds over 50,000 units adds 18 cents a unit. It counts twice. It is part of your cost, and CBP treats moulds you supply or pay for as an "assist", part of the dutiable value of the goods they make. The calculator adds the per-unit share to the customs value too. How the assist is apportioned across entries is something to agree with your broker.</p>`,
    },
    {
      id: 'after',
      title: 'From landed cost to profit',
      html: `<p>Landed cost is the cost of goods for every margin calculation that follows. The <a href="${FBA_CALCULATOR_PATH}">Amazon FBA calculator</a> takes it from here, adding Amazon's referral and fulfilment fees and storage; the link under the result carries your figure across. Our <a href="${TARIFFS_POST_PATH}">tariffs post</a> shows how big the duty line is in the margin models of real Amazon businesses.</p>`,
    },
  ];
}

export const FAQ = [
  {
    q: 'How do I calculate landed cost?',
    a: 'Add everything you pay to get one unit to the warehouse you sell from: the factory price, freight, insurance, import duty, customs fees, the broker, your share of moulds and tooling, and inland transport. Divide the shipment total by the number of units. Work the duty out on the customs value, not on the total.',
  },
  {
    q: 'Does landed cost include duty and tariffs?',
    a: 'Yes. Duty, any additional tariffs such as Section 301, and the customs fees (MPF and, by sea, HMF) are all part of landed cost. They are often the line people leave out, and on some products they cost more than the freight.',
  },
  {
    q: 'Is duty charged on freight?',
    a: 'Not for US imports. The customs value excludes international freight and insurance, so an FOB price is the usual duty base. On a CIF or CFR price, the freight and insurance in it are taken off first. Moulds you pay for are added.',
  },
  {
    q: 'What is the difference between FOB and landed cost?',
    a: `FOB is the price with the goods loaded on the ship at the origin port. Landed cost adds the ocean or air freight, insurance, US duty and fees, the broker and the delivery to your warehouse or Amazon. How much that adds depends on the product's size, value and duty rate: the spatula in the worked example lands at ${Math.round((X_LANDED.perUnit / X.price - 1) * 100)}% above its FOB price.`,
  },
  {
    q: 'What landed cost should I use for Amazon FBA?',
    a: `The cost to get a unit into an Amazon fulfilment centre, including the trip from the port and any prep. That is the "product cost" the <a href="${FBA_CALCULATOR_PATH}">FBA calculator</a> asks for; Amazon's own fees come after it.`,
  },
  {
    q: 'Is this landed cost calculator accurate for any country of origin?',
    a: `The duty covers the countries listed on the <a href="${TARIFF_PATH}">tariff calculator</a>, on the 2026 HTS. Freight, insurance and the broker are your figures. Final classification is CBP's; check a ruling on <a href="${CROSS_URL}" rel="noopener">CROSS</a> for anything that moves your margin.`,
  },
];

export const RELATED = [
  { href: TARIFF_PATH, label: 'US import tariff calculator: duty by HTS code and country' },
  { href: FBA_CALCULATOR_PATH, label: 'Amazon FBA calculator: 2026 fees and profit' },
  { href: TARIFFS_POST_PATH, label: 'How much do tariffs add to Amazon products?' },
  { href: '/tools/roas-calculator/', label: 'ROAS calculator: break-even ROAS, ACOS and TACoS' },
];
