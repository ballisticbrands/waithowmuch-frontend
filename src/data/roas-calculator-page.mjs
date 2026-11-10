/**
 * The words on /tools/roas-calculator/, as plain data.
 *
 * 🚨 JSX-free on purpose, like fba-calculator-page.mjs: the prerender
 * (scripts/postbuild-spa-routes.mjs) emits exactly these strings as the
 * crawler HTML, and pages/RoasCalculator.tsx renders the same strings under
 * the calculator. One source, two renderers.
 *
 * Every figure in the worked examples is computed by roas.mjs at build time,
 * never typed in, and scripts/check-roas.mjs asserts the same examples, so the
 * prose and the arithmetic cannot drift apart.
 */
import { calculate } from './roas.mjs';

export const CALCULATOR_PATH = '/tools/roas-calculator/';
export const FBA_CALCULATOR_PATH = '/tools/amazon-fba-calculator/';
export const TITLE = 'ROAS Calculator: Break-Even ROAS, ACOS and TACoS';
/** The visible H1: short, keyword first. TITLE stays the JSON-LD name. */
export const H1 = 'ROAS calculator';
/** The one line above the calculator. Everything else sits below it. */
export const TAGLINE = 'Your break-even ROAS and ACOS from your margin, plus ROAS, ACOS, TACoS and profit after ads.';
export const DOC_TITLE = 'ROAS Calculator: Break-Even ROAS & ACOS (Free) | WaitHowMuch';
export const META_DESCRIPTION =
  'Free ROAS calculator: get your break-even ROAS from your margin, plus ACOS, TACoS and profit after ads, worked out in your browser.';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const usd = (n) => `${n < 0 ? '−' : ''}$${Math.abs(n).toFixed(2)}`;
const usd0 = (n) => `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;
const pct = (f, dp = 1) => `${(Math.round(f * 100 * 10 ** dp) / 10 ** dp).toString()}%`;
const x2 = (n) => n.toFixed(2);

/* ── The worked examples (asserted by scripts/check-roas.mjs) ─────────── */

/** A $30 product: $7.50 to make and land, $10.50 of Amazon fees. */
export const EXAMPLE = { price: 30, productCost: 7.5, fees: 10.5, otherCosts: 0 };
/** A month of ads on it that worked, one that did not, and the whole month. */
export const EX_GOOD = calculate({ ...EXAMPLE, adSpend: 1000, adSales: 4000, totalSales: 10000 });
export const EX_BAD = calculate({ ...EXAMPLE, adSpend: 1000, adSales: 2000 });
/** The same product at a $22 price: the margin shrinks, the bar rises. */
export const EX_CHEAP = calculate({ ...EXAMPLE, price: 22, adSpend: 1000, adSales: 4000 });
/** A product whose costs already exceed its price. */
export const EX_LOSS = calculate({ price: 15, productCost: 6, fees: 9.5, otherCosts: 0, adSpend: 100, adSales: 800 });

const ex = EXAMPLE;
const exCosts = ex.productCost + ex.fees;

export const LEDE = `A product that sells for $${ex.price} and costs $${x2(exCosts)} to make and sell keeps <strong>${pct(EX_GOOD.m, 0)} of its price before advertising</strong>, so every $1 of ads has to bring back at least <strong>$${x2(EX_GOOD.beRoas)} in sales</strong> just to break even. That is its break-even ROAS. Enter your price, costs and a period's ad spend and sales in the calculator above to get your ROAS, ACOS, break-even ROAS and ACOS, TACoS and what is left after ads.`;

export const PRIVACY_LINE = 'Everything is worked out in your browser. Nothing you type is sent or stored.';

/* ── The explanatory sections ─────────────────────────────────────────
   { id, title, html } — rendered in this order under the calculator and in
   the crawler HTML. */
export const SECTIONS = [
  {
    id: 'formulas',
    title: 'The formulas',
    html: `<p>ROAS (return on ad spend) is the sales your ads brought in divided by what the ads cost. Break-even ROAS is the ROAS at which the profit on those sales exactly pays for the ads. Five lines cover everything this calculator does:</p>
<table data-fba-table>
<thead><tr><th>Metric</th><th>Formula</th><th>In the $${ex.price} example</th></tr></thead>
<tbody>
<tr><td>Margin before ads</td><td>(price − product cost − fees − other costs) ÷ price</td><td>($${ex.price} − $${x2(exCosts)}) ÷ $${ex.price} = ${pct(EX_GOOD.m)}</td></tr>
<tr><td>ROAS</td><td>ad-attributed sales ÷ ad spend</td><td>$4,000 ÷ $1,000 = ${x2(EX_GOOD.roas)}</td></tr>
<tr><td>ACOS</td><td>ad spend ÷ ad-attributed sales = 1 ÷ ROAS</td><td>$1,000 ÷ $4,000 = ${pct(EX_GOOD.acos)}</td></tr>
<tr><td>Break-even ROAS</td><td>1 ÷ margin before ads</td><td>1 ÷ ${x2(EX_GOOD.m)} = ${x2(EX_GOOD.beRoas)}</td></tr>
<tr><td>Break-even ACOS</td><td>margin before ads = 1 ÷ break-even ROAS</td><td>${pct(EX_GOOD.beAcos)}</td></tr>
<tr><td>TACoS</td><td>ad spend ÷ total sales (ad-driven and organic)</td><td>$1,000 ÷ $10,000 = ${pct(EX_GOOD.tacos)}</td></tr>
</tbody>
</table>
<p>Profit on the ad-driven sales is those sales times the margin before ads, less the ad spend. Across the whole period it is total sales times the margin before ads, less the ad spend. Both are in the results.</p>`,
  },
  {
    id: 'break-even-roas',
    title: 'How to calculate break-even ROAS',
    html: `<p>Break-even ROAS depends on one number: the share of the price you keep after every cost except advertising. Work it out per unit:</p>
<ol>
<li>Take the selling price: $${ex.price}.</li>
<li>Subtract what the unit costs you to make and get to the warehouse (product, packaging, freight, duty): $${x2(ex.productCost)}.</li>
<li>Subtract the marketplace's fees on the sale. On Amazon that is the referral fee and the FBA fulfilment fee; the <a href="${FBA_CALCULATOR_PATH}">Amazon FBA calculator</a> works them out from your box size and category: $${x2(ex.fees)}.</li>
<li>Subtract anything else each sale costs (returns, payment fees, storage): $0 here.</li>
<li>Divide what is left by the price: $${x2(EX_GOOD.preAdProfit)} ÷ $${ex.price} = ${pct(EX_GOOD.m)}. That is your margin before ads.</li>
<li>Break-even ROAS is 1 divided by it: 1 ÷ ${x2(EX_GOOD.m)} = <strong>${x2(EX_GOOD.beRoas)}</strong>.</li>
</ol>
<p>Below a ROAS of ${x2(EX_GOOD.beRoas)} the ads cost more than the sales they bring in can pay for. Above it, each ad-driven sale makes money. The break-even ROAS formula works for any ad platform, Amazon, Google, Meta or TikTok, as long as the sales and the costs are for the same units.</p>
<p>Price changes move the bar quickly. Drop the same product to $22 and the margin before ads falls to ${pct(EX_CHEAP.m)}, so break-even ROAS rises to ${x2(EX_CHEAP.beRoas)}. The campaign that cleared the bar at $30 now ${EX_CHEAP.profitAdSales >= 0 ? 'barely clears it' : `loses ${usd0(-EX_CHEAP.profitAdSales)} on the same $1,000`}, before any change in conversion.</p>`,
  },
  {
    id: 'roas-acos-tacos',
    title: 'How ROAS, ACOS and TACoS relate',
    html: `<p><strong>ROAS and ACOS are the same measurement upside down.</strong> ROAS divides ad-driven sales by ad spend; ACOS (advertising cost of sales, Amazon's own term) divides ad spend by ad-driven sales. A ROAS of 4 is an ACOS of 25%, a ROAS of 2 is an ACOS of 50%, a ROAS of 5 is an ACOS of 20%. Amazon's ad console reports ACOS, while Google and Meta report ROAS, so you need both to compare channels.</p>
<p>The break-even points are related the same way: break-even ACOS is your margin before ads, and break-even ROAS is 1 divided by it. A ${pct(EX_GOOD.m, 0)} margin means you break even at a ${pct(EX_GOOD.beAcos, 0)} ACOS or a ${x2(EX_GOOD.beRoas)} ROAS.</p>
<p><strong>TACoS</strong> (total advertising cost of sales) divides the same ad spend by <em>all</em> your sales, including the organic ones that no ad can claim. It is always lower than ACOS, and it answers a different question. ACOS asks whether the ads pay for themselves; TACoS asks how much of the business's revenue goes to advertising, which is what decides the margin you actually take home. A seller whose ACOS is high but whose TACoS is falling is usually buying ranking that later sells without ads.</p>`,
  },
  {
    id: 'worked-examples',
    title: 'Worked examples',
    html: `<h3>A campaign that pays</h3>
<p>The $${ex.price} product spends $1,000 on ads in a month and the ads are credited with $4,000 of sales. ROAS is ${x2(EX_GOOD.roas)}, ACOS ${pct(EX_GOOD.acos)}. Break-even ROAS is ${x2(EX_GOOD.beRoas)}, so the campaign is above it: the $4,000 of sales earns ${usd0(4000 * EX_GOOD.m)} before ads, which leaves <strong>${usd0(EX_GOOD.profitAdSales)}</strong> after the $1,000, or ${usd(EX_GOOD.profitPerAdUnit)} on each of the ${Math.round(EX_GOOD.adUnits)} ad-driven units. The whole month sold $10,000, so TACoS is ${pct(EX_GOOD.tacos)} and the month's profit after ads is ${usd0(EX_GOOD.profitAll)}, a ${pct(EX_GOOD.marginAll)} margin.</p>
<h3>A campaign that loses</h3>
<p>Same product, same $1,000, but the ads are credited with only $2,000. ROAS is ${x2(EX_BAD.roas)} and ACOS ${pct(EX_BAD.acos)}, both on the wrong side of break-even. The $2,000 earns ${usd0(2000 * EX_BAD.m)} before ads, so the campaign <strong>loses ${usd0(-EX_BAD.profitAdSales)}</strong>. To break even on those sales it could have spent at most ${usd0(EX_BAD.maxSpend)}.</p>
<h3>A product with no break-even</h3>
<p>A $15 item that costs $6 to land and pays $9.50 in fees loses ${usd(-EX_LOSS.preAdProfit)} on every sale before advertising. Its margin before ads is ${pct(EX_LOSS.m)}, and no ROAS can make that back: even a ROAS of ${x2(EX_LOSS.roas)} only multiplies the loss. The fix is the price or the costs, not the bids.</p>`,
  },
  {
    id: 'good-roas',
    title: 'What is a good ROAS?',
    html: `<p>Any ROAS above your break-even is profitable, and nothing else about it is universal. A product that keeps 60% of its price before ads breaks even at a ROAS of 1.67; one that keeps 25% needs 4. So a ROAS of 3 is excellent for the first and a loss for the second. That is why a "good ROAS" quoted without a margin means very little.</p>
<p>Most sellers set a <strong>target</strong> above break-even, to leave a profit after ads. If you want 10% of each ad-driven sale left over, subtract 10 points from your margin before ads and take 1 divided by the rest: a ${pct(EX_GOOD.m, 0)} margin aiming to keep 10% needs a ROAS of ${x2(1 / (EX_GOOD.m - 0.1))} (an ACOS of ${pct(EX_GOOD.m - 0.1, 0)}). Many brands run new products below break-even for a while on purpose, to buy reviews and ranking, and judge them on TACoS over the following months instead.</p>`,
  },
];

/* ── FAQ: written around what people actually search ───────────────── */
export const FAQ = [
  {
    q: 'What is the break-even ROAS formula?',
    a: 'Break-even ROAS = 1 ÷ margin before advertising, where the margin is (price − product cost − fees − other per-unit costs) ÷ price. A product that keeps 40% of its price before ads has a break-even ROAS of 1 ÷ 0.40 = 2.5.',
  },
  {
    q: 'How do I calculate break-even ROAS?',
    a: `Work out what one unit leaves you before ads: price less product cost, marketplace fees and any other per-unit cost. Divide that by the price to get the margin, then divide 1 by the margin. The calculator above does it as you type, and the <a href="${FBA_CALCULATOR_PATH}">FBA calculator</a> gives you Amazon's fees for the second step.`,
  },
  {
    q: 'What is a BE ROAS?',
    a: 'BE ROAS is short for break-even ROAS: the return on ad spend at which the profit from ad-driven sales exactly covers the ads. Above it the ads make money, below it they lose money.',
  },
  {
    q: 'How do I convert ACOS to ROAS?',
    a: 'Divide 1 by the ACOS as a decimal. An ACOS of 25% is 1 ÷ 0.25 = a ROAS of 4; an ACOS of 40% is a ROAS of 2.5. Going the other way, ACOS = 1 ÷ ROAS.',
  },
  {
    q: 'What is break-even ACOS on Amazon?',
    a: 'Your margin before advertising, as a percentage of price. If a unit keeps 30% of its price after product cost, referral fee and FBA fee, you break even at a 30% ACOS. Above that, every ad-driven sale loses money.',
  },
  {
    q: 'What is the difference between ACOS and TACoS?',
    a: 'ACOS divides ad spend by the sales Amazon attributes to the ads. TACoS divides the same spend by all your sales, organic included. ACOS tells you whether a campaign pays for itself; TACoS tells you how much of the whole business goes to advertising.',
  },
  {
    q: 'What if my margin is zero or negative?',
    a: 'Then there is no break-even ROAS. Every sale loses money before advertising, and ads only add more sales that lose money. The calculator says so instead of showing a number; the fix is a higher price or lower costs.',
  },
  {
    q: 'Does this ROAS calculator work for Google, Meta or Shopify ads?',
    a: 'Yes. The arithmetic is the same on every platform: enter your price, product cost, the fees each sale pays (Shopify and payment fees instead of Amazon\'s), and the spend and sales the platform reports. Only the link to the Amazon FBA fee calculator is Amazon-specific.',
  },
];

/** FAQ answer as plain text, for JSON-LD. */
export const faqPlain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const RELATED = [
  { href: FBA_CALCULATOR_PATH, label: 'Amazon FBA calculator: 2026 fees and profit' },
  { href: '/blog/is-amazon-fba-still-profitable/', label: 'Is Amazon FBA still profitable?' },
  { href: '/blog/how-much-do-amazon-sellers-make/', label: 'How much do Amazon sellers make?' },
  { href: '/blog/how-much-does-amazon-take-from-sellers/', label: 'How much does Amazon take from sellers?' },
  { href: '/blog/how-much-does-amazon-fba-cost-to-start/', label: 'How much does Amazon FBA cost to start?' },
];
