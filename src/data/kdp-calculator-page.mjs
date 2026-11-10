/**
 * The words on /tools/kdp-royalty-calculator/, as plain data.
 *
 * 🚨 JSX-free on purpose, like fba-calculator-page.mjs and
 * roas-calculator-page.mjs: the prerender (scripts/postbuild-spa-routes.mjs)
 * emits exactly these strings as the crawler HTML, and pages/KdpCalculator.tsx
 * renders the same strings under the calculator. One source, two renderers.
 *
 * Every figure in the copy is computed from kdp-royalties.mjs at build time or
 * read from its tables, never typed in, and scripts/check-kdp.mjs asserts the
 * example book, so the prose and the arithmetic cannot drift apart.
 */
import {
  READ_ON, SOURCES, LATEST_FUND, EBOOK, PRINT, PRINT_COSTS, calculate, ebookQuote, printQuote, minPrintPrice, printingCost,
} from './kdp-royalties.mjs';

export const CALCULATOR_PATH = '/tools/kdp-royalty-calculator/';
export const BOOKS_POST_PATH = '/blog/selling-books-on-amazon-fba/';
export const ROAS_CALCULATOR_PATH = '/tools/roas-calculator/';
export const TITLE = 'KDP Royalty Calculator: eBook, Paperback, Hardcover and Kindle Unlimited';
export const DOC_TITLE = 'KDP Royalty Calculator 2026: Royalties, Printing Cost & Profit (Free) | WaitHowMuch';
export const META_DESCRIPTION =
  'Free KDP calculator for authors: royalties per sale for eBook, paperback and hardcover, KDP printing cost, Kindle Unlimited page reads, profit after Amazon Ads and months to earn back your costs. Rates from KDP\'s help pages.';

const usd = (n) => `${n < 0 ? '−' : ''}$${Math.abs(n).toFixed(2)}`;
const usd0 = (n) => `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;
const pct = (f, dp = 1) => `${(Math.round(f * 100 * 10 ** dp) / 10 ** dp).toString()}%`;
const readOn = new Date(`${READ_ON}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const readOnLabel = readOn;

/* ── The example book (asserted by scripts/check-kdp.mjs) ──────────────
   A 300-page novel: a $4.99 eBook (2 MB, 70%), a $14.99 6 × 9 paperback and a
   $24.99 hardcover, both black ink. These are also the calculator's defaults. */
export const EX = (() => {
  const input = {
    ebook: { price: 4.99, fileMb: 2, option: '70', units: 100, kenp: 0, kenpRate: null },
    paperback: { price: 14.99, units: 40, expandedUnits: 0 },
    hardcover: { price: 24.99, units: 10 },
    print: { pages: 300, ink: 'black', trim: 'regular' },
    adSpend: 150,
    oneOff: 900,
  };
  return { input, result: calculate(input) };
})();
const ex = EX.input;
const exR = EX.result;

/** The eBook file size the calculator assumes until you open "Advanced": the
 *  example's file, typical for a text-only novel. Asserted by check-kdp. */
export const ASSUMED_FILE_MB = EX.input.ebook.fileMb;

/* Side examples for the prose. */
const EB_MID = ebookQuote({ price: 9.99, fileMb: 2, option: '70' });
const EB_HIGH = ebookQuote({ price: 14.99, fileMb: 2, option: '70' });
const EB_LOW = ebookQuote({ price: 0.99, fileMb: 2, option: '35' });
const PB_998 = printQuote({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular', price: 9.98 });
const PB_999 = printQuote({ format: 'paperback', ink: 'black', pages: 300, trim: 'regular', price: 9.99 });
const PB_COLOR = printQuote({ format: 'paperback', ink: 'premium', pages: 100, trim: 'large', price: 14.99 });
const PB_LARGE = printingCost({ format: 'paperback', ink: 'black', pages: 300, trim: 'large' }).cost;

export const LEDE = `A 300-page novel at $${ex.paperback.price} in paperback costs <strong>${usd(exR.paperback.cost)} to print</strong> on Amazon.com and pays its author <strong>${usd(exR.paperback.royalty)} a copy</strong>; the same book as a $${ex.ebook.price} eBook pays <strong>${usd(exR.ebook.royalty)}</strong>. Pick eBook, paperback or hardcover, then drag the price (or type it) to see your royalty per sale, Amazon's share, KDP's printing cost and minimum list price. Add monthly sales to get your Kindle Unlimited page-read income, profit after Amazon Ads, the break-even ACOS and how many months it takes to earn back the cover, editing and ISBNs.`;

export const SOURCE_LINE = `Every rate is from Amazon KDP's own help pages for the US marketplace (Amazon.com, USD), read on ${readOn}. Everything is worked out in your browser; nothing you type is sent or stored.`;

/* ── Tables built from the data, so the prose cannot disagree with the maths ── */

const perPage = (n) => `$${n}`;
function bandRows(format) {
  const names = { black: 'Black ink, white or cream paper', groundwood: 'Black ink, groundwood paper', standard: 'Standard color', premium: 'Premium color' };
  const rows = [];
  for (const [ink, b] of Object.entries(PRINT_COSTS[format])) {
    if (b.flat) {
      rows.push(`<tr><td>${names[ink]}</td><td>${b.pages[0]}–${b.fixedOnlyTo}</td><td>${usd(b.flat.regular)} flat</td><td>${usd(b.flat.large)} flat</td></tr>`);
    }
    const from = b.flat ? b.fixedOnlyTo + (b.fixedOnlyTo % 2 === 0 ? 2 : 1) : b.pages[0];
    rows.push(`<tr><td>${names[ink]}</td><td>${from}–${b.pages[1]}</td><td>${usd(b.fixed.regular)} + ${perPage(b.perPage.regular)}/page</td><td>${usd(b.fixed.large)} + ${perPage(b.perPage.large)}/page</td></tr>`);
  }
  return rows.join('\n');
}

const MIN_ROWS = [100, 200, 300, 400, 500, 600].map((p) => {
  const c = printingCost({ format: 'paperback', ink: 'black', pages: p, trim: 'regular' }).cost;
  const h = printingCost({ format: 'hardcover', ink: 'black', pages: p, trim: 'regular' }).cost;
  return `<tr><td>${p}</td><td>${usd(c)}</td><td>${usd(minPrintPrice(c))}</td><td>${h == null ? 'not offered' : usd(h)}</td><td>${h == null ? '—' : usd(minPrintPrice(h))}</td></tr>`;
}).join('\n');

/* ── The explanatory sections ─────────────────────────────────────────
   { id, title, html } — rendered in this order under the calculator and in
   the crawler HTML. */
export const SECTIONS = [
  {
    id: 'authors-not-resellers',
    title: 'For authors, not book resellers',
    html: `<p>This KDP calculator is for people who write and publish their own books through Kindle Direct Publishing. Amazon prints each paperback or hardcover when it is ordered, takes the printing cost out of your royalty, and pays you the rest; you never buy stock or pay FBA fees. If you buy used or new books and resell them on Amazon through FBA, the economics are completely different (sourcing cost, referral fee, the media closing fee, FBA fees), and our post on <a href="${BOOKS_POST_PATH}">selling books on Amazon FBA</a> covers that.</p>`,
  },
  {
    id: 'ebook-royalties',
    title: 'How KDP eBook royalties are calculated',
    html: `<p>KDP offers two royalty options for every Kindle eBook, and you choose one per book:</p>
<ul>
<li><strong>35% royalty</strong>: 35% of the list price (less VAT where it applies). No delivery cost. Allowed at any price from ${usd(EBOOK.min35[0].min)} (files under 3 MB; ${usd(EBOOK.min35[1].min)} from 3 MB, ${usd(EBOOK.min35[2].min)} from 10 MB) up to ${usd0(EBOOK.max35)}.</li>
<li><strong>70% royalty</strong>: 70% of the list price less a <strong>delivery cost of ${usd(EBOOK.deliveryPerMb)} per MB</strong> on Amazon.com (at least $0.01). Only for list prices from <strong>${usd(EBOOK.band70.min)} to ${usd(EBOOK.band70.max)}</strong>. KDP raised the top of that band from $9.99 to $12.99 on July 7, 2026. The 70% rate also needs the eBook priced at least 20% below the print edition, and it is paid only on sales to customers in KDP's 70% territories (the US is one); sales elsewhere pay 35%. Books that are mostly public domain get 35% only.</li>
</ul>
<p>So the ${usd(ex.ebook.price)} eBook in the example, a 2 MB file, pays 0.70 × (${usd(ex.ebook.price)} − ${usd(exR.ebook.delivery)}) = <strong>${usd(exR.ebook.royalty)}</strong> a sale at 70%, against ${usd(exR.ebook.royalty35)} at 35%. At $9.99 it would pay ${usd(EB_MID.royalty)}. At $0.99 only the 35% option is possible, and it pays ${usd(EB_LOW.royalty)}.</p>`,
  },
  {
    id: '35-vs-70',
    title: 'Where the 35% vs 70% choice flips',
    html: `<p>Inside the ${usd(EBOOK.band70.min)}–${usd(EBOOK.band70.max)} band, 70% almost always wins. It loses only when the delivery cost eats more than half the price, which happens when the file is larger than the list price divided by $0.30 in megabytes: above ${(ex.ebook.price / 0.3).toFixed(1)} MB at $4.99, or ${(9.99 / 0.3).toFixed(1)} MB at $9.99. Text-only novels are usually far smaller; picture books, cookbooks and comics with many images are the ones to check. That is why the calculator does not ask for your file size: it assumes ${ASSUMED_FILE_MB} MB, a typical text-only novel, which costs ${usd(exR.ebook.delivery)} to deliver per sale at 70%. Open <em>Advanced</em> under the eBook price to enter a bigger file.</p>
<p>Above ${usd(EBOOK.band70.max)} you can only take 35%. A 2 MB eBook at $14.99 pays ${usd(EB_HIGH.royalty)}, less than the ${usd(EB_HIGH.royaltyAtBandMax)} it would make at $12.99 on the 70% option. To earn more at 35% than at $12.99 on 70%, the list price has to be above <strong>${usd(EB_HIGH.match35At)}</strong>, twice ($12.99 less the delivery cost). The calculator's price slider shows both: the royalty drops where the 70% band ends.</p>`,
  },
  {
    id: 'paperback-royalties',
    title: 'How KDP paperback and hardcover royalties work',
    html: `<p>For print books, KDP pays a percentage of the list price and subtracts the printing cost:</p>
<p><strong>(royalty rate × list price) − printing cost = royalty</strong></p>
<ul>
<li>On Amazon.com the rate is <strong>60% at list prices of $9.99 and up</strong>, and <strong>50% at $9.98 and below</strong>. The same split applies to paperbacks and hardcovers.</li>
<li><strong>Expanded Distribution</strong> (sales through channels outside Amazon; paperbacks only) pays 40% of list price less the same printing cost.</li>
<li>The maximum list price is ${usd0(PRINT.maxPrice)}.</li>
</ul>
<p>The penny at $9.99 matters. The 300-page paperback pays ${usd(PB_999.royalty)} at $9.99 but only ${usd(PB_998.royalty)} at $9.98, because the rate drops from 60% to 50%. At the example's ${usd(ex.paperback.price)} it pays 0.60 × ${usd(ex.paperback.price)} − ${usd(exR.paperback.cost)} = <strong>${usd(exR.paperback.royalty)}</strong>. If any of those copies were sold through Expanded Distribution, each would pay ${usd(exR.paperback.expanded)}.</p>`,
  },
  {
    id: 'printing-cost',
    title: 'KDP printing cost on Amazon.com',
    html: `<p>Printing cost is a fixed charge per book plus a charge per page, set by format, ink, paper and trim size. Bleed and cover finish make no difference. Short black-ink books pay one flat charge. Large trim means wider than ${PRINT.largeOver.widthIn} in or taller than ${PRINT.largeOver.heightIn} in, so 5 × 8, 5.5 × 8.5 and 6 × 9 are regular, and 7 × 10 and 8.5 × 11 are large.</p>
<h3>Paperback</h3>
<table data-fba-table>
<thead><tr><th>Ink and paper</th><th>Pages</th><th>Regular trim</th><th>Large trim</th></tr></thead>
<tbody>
${bandRows('paperback')}
</tbody>
</table>
<h3>Hardcover</h3>
<table data-fba-table>
<thead><tr><th>Ink</th><th>Pages</th><th>Regular trim</th><th>Large trim</th></tr></thead>
<tbody>
${bandRows('hardcover')}
</tbody>
</table>
<p>A 300-page black-ink paperback costs ${usd(exR.paperback.cost)} to print in a regular trim and ${usd(PB_LARGE)} in a large one, and a 300-page hardcover costs ${usd(exR.hardcover.cost)}. Color is where printing cost climbs: a 100-page premium color book in a large trim costs ${usd(PB_COLOR.cost)} to print, so KDP will not let you list it below ${usd(PB_COLOR.minPrice)}. Hardcovers come in black or premium color only, with 75 to 550 pages.</p>`,
  },
  {
    id: 'minimum-price',
    title: 'The minimum list price for your page count',
    html: `<p>KDP will not accept a print list price below printing cost divided by the royalty rate, so the royalty can never go below zero on Amazon. Under $9.99 the rate is 50%, so a book's minimum is usually twice its printing cost. If that comes out above $9.98, the minimum becomes $9.99 or printing cost ÷ 0.6, whichever is higher. For black ink in a regular trim:</p>
<table data-fba-table>
<thead><tr><th>Pages</th><th>Paperback printing</th><th>Paperback minimum</th><th>Hardcover printing</th><th>Hardcover minimum</th></tr></thead>
<tbody>
${MIN_ROWS}
</tbody>
</table>
<p>The minimum is a floor, not a price to aim for: at the minimum you earn close to nothing per copy. The calculator marks the minimum for your page count, ink and trim on the price slider.</p>`,
  },
  {
    id: 'kindle-unlimited',
    title: 'Kindle Unlimited (Kindle+) page reads',
    html: `<p>Enroll an eBook in KDP Select and it joins Amazon's subscription library, which KDP's help pages now call Kindle+ (Kindle Unlimited). You are paid for the <strong>Kindle Edition Normalized Pages (KENP)</strong> subscribers read for the first time, up to 3,000 per reader per title. The income is <strong>KENP read × the per-page rate</strong>. The rate is the month's KDP Select Global Fund for a marketplace divided by all the pages read there, so it changes every month. KDP announces each month's fund around the 15th of the next month. The latest is ${LATEST_FUND.month}: a $${LATEST_FUND.fundMillions} million fund ($${LATEST_FUND.totalMillions} million with All Stars bonuses).</p>
<p>KDP publishes the fund in dollars but not the per-page rate, so this calculator does not guess one. Take the rate from your own KDP reports (Kindle+ royalties ÷ KENP read for a recent month) and enter it with your monthly pages read. KDP Select enrollment runs in 90-day terms.</p>`,
  },
  {
    id: 'ads-and-break-even',
    title: 'Amazon Ads, break-even ACOS and earning back your costs',
    html: `<p>For a book, the most an ad can cost before the sale it drives loses money is your royalty. Break-even ACOS (advertising cost of sales) is <strong>royalty ÷ list price</strong>. The example eBook breaks even at ${pct(exR.ebook.beAcos)} ACOS, the paperback at ${pct(exR.paperback.beAcos)} and the hardcover at ${pct(exR.hardcover.beAcos)}. Across all three at the example's sales mix it is <strong>${pct(exR.beAcos)}</strong>. Read-through matters too: an ad that sells book one of a series can be worth more than its own royalty. The <a href="${ROAS_CALCULATOR_PATH}">ROAS calculator</a> works the same idea for any product.</p>
<p>Profit for the month is all royalties less ad spend. The example sells 100 eBooks, 40 paperbacks and 10 hardcovers, for ${usd0(exR.royalties)} in royalties. After ${usd0(exR.adSpend)} of ads that leaves <strong>${usd0(exR.profit)}</strong>, so ${usd0(exR.oneOff)} of up-front costs (cover design, editing, ISBNs) is earned back in <strong>${exR.paybackMonths.toFixed(1)} months</strong>. KDP pays royalties about 60 days after the end of the month of the sale (90 days for Expanded Distribution), so the cash arrives about two months after that.</p>`,
  },
  {
    id: 'not-modelled',
    title: 'What this calculator leaves out',
    html: `<p>It models the Amazon.com marketplace in US dollars. It does not include sales on other Amazon marketplaces, eBook sales to customers outside the 70% territories (paid at 35%), VAT, Kindle Countdown Deals, free promotions, price matching, KDP Select All Stars bonuses, audiobooks, tax withholding, or the cost of author copies. KDP's own Printing Cost & Royalty Calculator is the final word for a specific book.</p>`,
  },
  {
    id: 'sources',
    title: 'Sources',
    html: `<p>All read on ${readOn}:</p>
<ul>
${Object.values(SOURCES).map((s) => `<li><a href="${s.url}" rel="nofollow noopener" target="_blank">KDP: ${s.label}</a>. ${s.used}</li>`).join('\n')}
</ul>`,
  },
];

/* ── FAQ: written around what people search ──────────────────────────
   kdp calculator (1.3k), kdp royalty calculator (1k), amazon kdp calculator
   (720), amazon kdp royalty calculator (390), kdp printing cost calculator
   (390), amazon kdp printing cost calculator (170), amazon kdp royalties (110),
   kdp calculator cover (90). Ubersuggest, US, 2026-11-10. */
export const FAQ = [
  {
    q: 'How are Amazon KDP royalties calculated?',
    a: `eBooks: 35% of the list price, or 70% of the list price less a delivery cost of $0.15 per MB if the book is priced between $2.99 and $12.99. Paperbacks and hardcovers: 60% of the list price (50% under $9.99) minus the printing cost, or 40% minus printing cost for Expanded Distribution. Kindle Unlimited reads pay KENP read × that month's per-page rate.`,
  },
  {
    q: 'How much does KDP pay per book?',
    a: `It depends on the format and price. In the example on this page, a 300-page novel pays ${usd(exR.ebook.royalty)} per $4.99 eBook, ${usd(exR.paperback.royalty)} per $14.99 paperback and ${usd(exR.hardcover.royalty)} per $24.99 hardcover on Amazon.com. Enter your own prices and page count in the KDP royalty calculator above to see yours.`,
  },
  {
    q: 'What is the KDP printing cost for a paperback?',
    a: `On Amazon.com a black-ink paperback in a regular trim costs a flat $2.30 up to 110 pages, then $1.00 plus $0.012 a page: ${usd(exR.paperback.cost)} for 300 pages. Large trims, groundwood paper and color ink have their own rates, listed in the table above. The KDP printing cost calculator above works it out for your page count.`,
  },
  {
    q: 'Does trim size change the KDP printing cost?',
    a: `Only whether it is regular or large. A trim wider than 6.12 inches or taller than 9 inches is large and costs more per page (black ink: $0.017 instead of $0.012). Within each group, every trim size costs the same. Bleed and matte or glossy covers do not change the cost.`,
  },
  {
    q: 'Should I choose the 35% or 70% royalty for my Kindle eBook?',
    a: `Choose 70% if your list price is between $2.99 and $12.99 and your file is not huge: 70% pays more unless the file in MB is bigger than the price divided by $0.30. Outside that price band only 35% is available, and above $12.99 you would need to charge about twice $12.99 at 35% to match what $12.99 earns at 70%.`,
  },
  {
    q: 'What is the minimum price for a KDP paperback?',
    a: `Printing cost divided by the royalty rate. A 300-page black-ink paperback costs ${usd(exR.paperback.cost)} to print, so its minimum is ${usd(minPrintPrice(exR.paperback.cost))} at the 50% rate. The calculator shows the minimum for your page count, ink and trim.`,
  },
  {
    q: 'How much does Kindle Unlimited pay per page?',
    a: `The per-page (KENP) rate is the month's KDP Select Global Fund divided by every page read that month, so it changes monthly. KDP announces the fund (${LATEST_FUND.month}: $${LATEST_FUND.fundMillions} million) but not the rate. Your KDP reports show what you earned and how many pages were read, and dividing one by the other gives your rate.`,
  },
  {
    q: 'Is this the same as KDP\'s cover calculator?',
    a: 'No. A KDP cover calculator is about the size of the cover file. This KDP calculator works out money: printing cost, royalties, Kindle Unlimited income, ad spend and profit. Trim size and page count matter to both.',
  },
  {
    q: 'When does Amazon KDP pay royalties?',
    a: 'Monthly, about 60 days after the end of the month in which the sale was made, and about 90 days for Expanded Distribution sales, once you meet the payment threshold.',
  },
  {
    q: 'Is this calculator for selling used books on Amazon?',
    a: `No. It is for authors publishing their own books through KDP. Reselling books through FBA has different costs (what you pay for the book, referral and closing fees, FBA fees), covered in <a href="${BOOKS_POST_PATH}">Selling Books on Amazon FBA</a>.`,
  },
];

/** FAQ answer as plain text, for JSON-LD. */
export const faqPlain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const RELATED = [
  { href: BOOKS_POST_PATH, label: 'Selling books on Amazon FBA: what it actually pays' },
  { href: ROAS_CALCULATOR_PATH, label: 'ROAS calculator: break-even ROAS, ACOS and TACoS' },
  { href: '/tools/amazon-fba-calculator/', label: 'Amazon FBA calculator: 2026 fees and profit' },
  { href: '/blog/how-much-does-amazon-take-from-sellers/', label: 'How much does Amazon take from sellers?' },
];
