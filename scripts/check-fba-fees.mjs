/**
 * Fails the build if the FBA calculator's arithmetic disagrees with Amazon's
 * own worked examples (src/data/fba-fees-2026.mjs → EXAMPLES), or with the
 * referral-fee examples on Amazon's referral page.
 *
 * Cheap and offline. It exists because the calculator is only worth anything
 * if it is right, and a mistyped cell in a 60-row table looks exactly like a
 * correct one.
 */
import {
  EXAMPLES, PERIODS, measure, sizeTier, fulfilmentFee, referralFee,
} from '../src/data/fba-fees-2026.mjs';

let failed = 0;
const fail = (msg) => { failed += 1; console.error(`check-fba-fees: ${msg}`); };

for (const ex of EXAMPLES) {
  const [lengthIn, widthIn, heightIn] = ex.dims;
  const m = measure({ lengthIn, widthIn, heightIn, weightLb: ex.weightLb });
  for (const p of PERIODS) {
    const tier = sizeTier(m, p.id);
    if (p.id !== 'nonpeak-2027' && tier.tier !== ex.tier) fail(`${ex.name}: tier ${tier.tier}, Amazon says ${ex.tier}`);
    const { base } = fulfilmentFee({ m, tier, price: ex.price, periodId: p.id, category: ex.category });
    if (Math.abs(base - ex.base[p.id]) > 0.005) fail(`${ex.name} ${p.id}: $${base.toFixed(2)}, Amazon says $${ex.base[p.id].toFixed(2)}`);
  }
}

/* Amazon's referral examples: an $8 watch, a $1,500 one and a $7,000 one;
   a $33 toy order (its example includes delivery and gift wrap in the price). */
for (const [price, cat, want] of [[8, 'watches', 1.28], [1500, 'watches', 240], [7000, 'watches', 405], [33, 'toys', 4.95]]) {
  const { fee } = referralFee(price, cat);
  if (Math.abs(fee - want) > 0.005) fail(`referral ${cat} at $${price}: $${fee}, Amazon says $${want}`);
}

if (failed) process.exit(1);
console.log(`check-fba-fees: ${EXAMPLES.length} Amazon examples × ${PERIODS.length} periods and 4 referral examples agree`);
