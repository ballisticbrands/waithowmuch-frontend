/**
 * ROAS, ACOS, TACoS and break-even arithmetic for /tools/roas-calculator/.
 *
 * JSX-free so the page, the prerender, the copy and scripts/check-roas.mjs all
 * run the same functions. Every ratio is a plain fraction here (0.25, not 25);
 * the page turns them into percentages.
 *
 *   pre-ad margin     m          = (price − product cost − fees − other costs) / price
 *   ROAS                         = ad-attributed sales / ad spend
 *   ACOS                         = ad spend / ad-attributed sales     = 1 / ROAS
 *   break-even ROAS              = 1 / m
 *   break-even ACOS              = m                                  = 1 / break-even ROAS
 *   TACoS                        = ad spend / total sales
 *   profit on ad-driven sales    = ad sales × m − ad spend
 *   profit after ads, all sales  = total sales × m − ad spend
 *
 * With m ≤ 0 there is no break-even: every sale loses money before a cent is
 * spent on ads, so no ROAS can recover it. The functions return null there
 * and the page says so in words rather than printing infinity.
 */

const finite = (n) => typeof n === 'number' && Number.isFinite(n);
const pos = (n) => finite(n) && n > 0;

/** Margin before advertising, as a fraction of price. Null without a price. */
export function preAdMargin({ price, productCost = 0, fees = 0, otherCosts = 0 }) {
  if (!pos(price)) return null;
  return (price - productCost - fees - otherCosts) / price;
}

/** 1 / margin, or null when no ROAS can break even (margin ≤ 0). */
export const breakEvenRoas = (m) => (finite(m) && m > 0 ? 1 / m : null);

/** The margin itself, or null when no ACOS can break even. */
export const breakEvenAcos = (m) => (finite(m) && m > 0 ? m : null);

export const roasOf = (adSales, adSpend) => (pos(adSpend) && finite(adSales) && adSales >= 0 ? adSales / adSpend : null);
export const acosOf = (adSpend, adSales) => (pos(adSales) && finite(adSpend) && adSpend >= 0 ? adSpend / adSales : null);
export const tacosOf = (adSpend, totalSales) => (pos(totalSales) && finite(adSpend) && adSpend >= 0 ? adSpend / totalSales : null);

/** ACOS ⇄ ROAS. Null for zero or less, which has no reciprocal. */
export const acosToRoas = (acos) => (pos(acos) ? 1 / acos : null);
export const roasToAcos = (roas) => (pos(roas) ? 1 / roas : null);

/**
 * Everything the calculator shows, from one set of inputs. Money inputs are
 * per unit (price and costs) or per period (ad spend and sales); `totalSales`
 * is optional and, when given, must cover the same period.
 *
 * @returns {{
 *   m: number|null, preAdProfit: number|null, costs: number,
 *   roas: number|null, acos: number|null, beRoas: number|null, beAcos: number|null,
 *   tacos: number|null, adUnits: number|null, totalUnits: number|null,
 *   profitPerAdUnit: number|null, profitAdSales: number|null,
 *   profitPerUnitAll: number|null, profitAll: number|null, marginAll: number|null,
 *   maxSpend: number|null, verdict: 'no-margin'|'no-spend'|'no-sales'|'above'|'at'|'below'|null,
 *   flags: string[],
 * }}
 */
export function calculate({ price, productCost = 0, fees = 0, otherCosts = 0, adSpend, adSales, totalSales }) {
  const flags = [];
  const costs = (productCost || 0) + (fees || 0) + (otherCosts || 0);
  const m = preAdMargin({ price, productCost, fees, otherCosts });
  const preAdProfit = m == null ? null : price * m;
  const beRoas = breakEvenRoas(m);
  const beAcos = breakEvenAcos(m);
  const roas = roasOf(adSales, adSpend);
  const acos = acosOf(adSpend, adSales);
  const total = pos(totalSales) ? totalSales : null;
  if (total != null && finite(adSales) && adSales > total + 1e-9) flags.push('total-below-ad-sales');
  const tacos = tacosOf(adSpend, total);

  const spend = finite(adSpend) && adSpend >= 0 ? adSpend : null;
  const sales = finite(adSales) && adSales >= 0 ? adSales : null;
  const adUnits = pos(price) && sales != null ? sales / price : null;
  const totalUnits = pos(price) && total != null ? total / price : null;

  /* Profit on the ad-driven sales: what those sales earn before ads, less the
     ads. Per unit it is price × (m − ACOS). */
  const profitAdSales = m != null && sales != null && spend != null ? sales * m - spend : null;
  const profitPerAdUnit = m != null && acos != null ? price * (m - acos) : null;
  /* Across all sales (ad-driven and organic), when the total is known. */
  const profitAll = m != null && total != null && spend != null ? total * m - spend : null;
  const profitPerUnitAll = m != null && tacos != null ? price * (m - tacos) : null;
  const marginAll = m != null && tacos != null ? m - tacos : null;
  /* The most these ad-driven sales could have cost in ads and still broken even. */
  const maxSpend = m != null && m > 0 && sales != null ? sales * m : null;

  let verdict = null;
  if (m != null && m <= 0) verdict = 'no-margin';
  else if (m != null && !pos(adSpend)) verdict = 'no-spend';
  else if (m != null && roas === 0) verdict = 'no-sales';
  else if (m != null && roas != null && beRoas != null) {
    const gap = roas - beRoas;
    verdict = Math.abs(gap) < 0.005 ? 'at' : gap > 0 ? 'above' : 'below';
  }

  return {
    m, preAdProfit, costs, roas, acos, beRoas, beAcos, tacos, adUnits, totalUnits,
    profitPerAdUnit, profitAdSales, profitPerUnitAll, profitAll, marginAll, maxSpend, verdict, flags,
  };
}
