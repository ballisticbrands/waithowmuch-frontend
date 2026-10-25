/**
 * Authored business profiles.
 *
 * The prose here is HARDCODED and written by hand. The FIGURES are not: a
 * `stat` block names a metric key and a `chart` block names the series, and
 * both are resolved from the DB at render time.
 *
 * 🚨 That split is the entire design. The moment a revenue number is typed
 * into a paragraph it starts drifting from the chart directly above it, and
 * nothing will ever tell you — the page just quietly contradicts itself. If
 * you want to say a number in prose, use a stat block.
 *
 * Plain .mjs with a sibling .d.ts because scripts/postbuild-spa-routes.mjs is
 * plain Node and imports this same module to emit the crawler-visible copy.
 * Prose that lives only in JSX is invisible to the prerender, and a profile
 * page that renders beautifully while serving an empty shell to Google is the
 * single most expensive defect in this stack.
 *
 * A slug with no entry here falls back to the generic DB-driven page.
 */

/**
 * A Spite House listing photo, by ASIN, from our bucket.
 *
 * Keyed by ASIN with the URL derived from it, so no row types a 64-character
 * hash — a hand-copied one is a transcription error waiting to point one row at
 * another row's picture, which is the kind of mistake that looks fine and is
 * wrong. The values are the content hashes `npm run product-image` printed.
 *
 * 🚨 Bucket copies, not Amazon's CDN and not /public. Hotlinking would let a
 * listing edit silently blank a column here, and the repo carries no images
 * (research: build-ecom-biz-page §4). When a listing changes, re-upload
 * and paste the new hash.
 */
const SPITE_HOUSE_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/';
const DECK_PHOTOS = {
  B0FMGJSSXT: '934f61cfb5ff4af0de9c174b5dff48e38312a8e79a05f415c9abd95da9d21b0a',
  B0FLCJSFJP: '0f96abf0ad4842007f9bd22bcfdc3f7b050c226131ce2f14658921d462a744b2',
  B0GVKVZDR7: '8889ab6dd0a3407283056bf9eca0ff865da8e9d1525914bfeb91702a9a854727',
  B0H1XPC49K: '45f88d5b2a561db9391a389b5ecc99d6fb1b6c8e45e0fb18abcb08cc36a00089',
  B0FLCSBZ2V: 'a6234dccbd300ba8fc3c665d751139e684b3fba5161fd75aa671b2b613611a85',
  B0GT64XJVT: 'c2a4299498a14930df2f612f48a5d1096ccedba3973699b01282bfce6d85fe1b',
  B0H1XWG51R: 'd6fca2bfea588c674f6348436045ba541e7356cc5cb104bdc756f4dae09cfb7a',
  B0H1XM57YZ: '9471449101f945b7d9d6d911a089d309d089af64ded14e518d908c0179c7f893',
  B0GT69P836: 'a3ac534f9fd1675aa46aea00eba3d052eb2d39266c51768df829e35023d6bcbb',
};
const deckPhoto = (asin) => DECK_PHOTOS[asin] && `${SPITE_HOUSE_BUCKET}${DECK_PHOTOS[asin]}.jpg`;

/* 199 generated rows — too many to author inline. See the module's header. */
import { WHITE_MOUNTAIN_BREAKDOWN } from './white-mountain-puzzles.breakdown.mjs';
import { TOP_KEYWORDS as WMP_TOP_KEYWORDS, AD_SPEND as WMP_AD, AD_KEYWORDS as WMP_AD_KEYWORDS, AD_KEYWORDS_TOTAL as WMP_AD_KEYWORDS_TOTAL } from './white-mountain-puzzles.adspend.mjs';
import { KALOTOYS_BREAKDOWN, kalotoysPhoto } from './kalotoys.breakdown.mjs';
import { TOP_KEYWORDS as KALO_TOP_KEYWORDS, AD_SPEND as KALO_AD, AD_KEYWORDS as KALO_AD_KEYWORDS, AD_KEYWORDS_TOTAL as KALO_AD_KEYWORDS_TOTAL } from './kalotoys.adspend.mjs';
/* KALOTOYS' Ad spend table: the modelled Amazon keyword ads, then the margin's
   advertising line, which is the founders' self-reported 16.5% (owner's call,
   2026-10-11). Per sale is a share of the $25.07 average sale. */
const KALO_REVENUE = 156692;
const KALO_ORDER = 25.07;
const KALO_FOUNDERS_AD_PCT = 16.5;
import { MARYRUTH_PHOTOS, MARYRUTH_TOP_LISTINGS } from './maryruth.breakdown.mjs';
import { VIRORA_BREAKDOWN, viroraPhoto } from './virora-mahjong.breakdown.mjs';
import { TOP_KEYWORDS as VIRORA_TOP_KEYWORDS, AD_SPEND as VIRORA_AD, AD_KEYWORDS as VIRORA_AD_KEYWORDS, AD_KEYWORDS_TOTAL as VIRORA_AD_KEYWORDS_TOTAL } from './virora-mahjong.adspend.mjs';
import { TOP_KEYWORDS as MC_TOP_KEYWORDS, AD_SPEND as MC_AD, AD_KEYWORDS as MC_AD_KEYWORDS, AD_KEYWORDS_TOTAL as MC_AD_KEYWORDS_TOTAL } from './mount-cleverest.adspend.mjs';
import { TOP_KEYWORDS as HM_TOP_KEYWORDS, AD_SPEND as HM_AD, AD_KEYWORDS as HM_AD_KEYWORDS, AD_KEYWORDS_TOTAL as HM_AD_KEYWORDS_TOTAL } from './highmark-collective.adspend.mjs';
import { TOP_KEYWORDS as MR_TOP_KEYWORDS, AD_SPEND as MR_AD, AD_KEYWORDS as MR_AD_KEYWORDS, AD_KEYWORDS_TOTAL as MR_AD_KEYWORDS_TOTAL } from './maryruth.adspend.mjs';
import { TOP_KEYWORDS as KJ_TOP_KEYWORDS, AD_SPEND as KJ_AD, AD_KEYWORDS as KJ_AD_KEYWORDS, AD_KEYWORDS_TOTAL as KJ_AD_KEYWORDS_TOTAL } from './kajun-loaded-tea.adspend.mjs';
import { TOP_KEYWORDS as LL_TOP_KEYWORDS, AD_SPEND as LL_AD, AD_KEYWORDS as LL_AD_KEYWORDS, AD_KEYWORDS_TOTAL as LL_AD_KEYWORDS_TOTAL } from './lighten-life.adspend.mjs';
import { TOP_KEYWORDS as RG_TOP_KEYWORDS, AD_SPEND as RG_AD, AD_KEYWORDS as RG_AD_KEYWORDS, AD_KEYWORDS_TOTAL as RG_AD_KEYWORDS_TOTAL } from './restoration-games.adspend.mjs';
import { TOP_KEYWORDS as WN_TOP_KEYWORDS, AD_SPEND as WN_AD, AD_KEYWORDS as WN_AD_KEYWORDS, AD_KEYWORDS_TOTAL as WN_AD_KEYWORDS_TOTAL } from './wet-noses.adspend.mjs';
import { TOP_KEYWORDS as OT_TOP_KEYWORDS, AD_SPEND as OT_AD, AD_KEYWORDS as OT_AD_KEYWORDS, AD_KEYWORDS_TOTAL as OT_AD_KEYWORDS_TOTAL } from './ototo.adspend.mjs';
import { TOP_KEYWORDS as BZ_TOP_KEYWORDS, AD_KEYWORDS as BZ_AD_KEYWORDS, AD_KEYWORDS_TOTAL as BZ_AD_KEYWORDS_TOTAL, AD_SPEND as BZ_AD } from './bizzikins.adspend.mjs';
import { TOP_KEYWORDS as GG_TOP_KEYWORDS, AD_KEYWORDS as GG_AD_KEYWORDS, AD_KEYWORDS_TOTAL as GG_AD_KEYWORDS_TOTAL, AD_SPEND as GG_AD } from './gamblin-golf.adspend.mjs';
import { TOP_KEYWORDS as DT_TOP_KEYWORDS, AD_KEYWORDS as DT_AD_KEYWORDS, AD_KEYWORDS_TOTAL as DT_AD_KEYWORDS_TOTAL, AD_SPEND as DT_AD } from './draft-top.adspend.mjs';
import { TOP_KEYWORDS as DJ_TOP_KEYWORDS, AD_KEYWORDS as DJ_AD_KEYWORDS, AD_KEYWORDS_TOTAL as DJ_AD_KEYWORDS_TOTAL, AD_SPEND as DJ_AD } from './doctor-jupiter.adspend.mjs';
import { TOP_KEYWORDS as WL_TOP_KEYWORDS, AD_KEYWORDS as WL_AD_KEYWORDS, AD_KEYWORDS_TOTAL as WL_AD_KEYWORDS_TOTAL, AD_SPEND as WL_AD } from './woodlands-usa.adspend.mjs';
import { TOP_KEYWORDS as SB_TOP_KEYWORDS, AD_KEYWORDS as SB_AD_KEYWORDS, AD_KEYWORDS_TOTAL as SB_AD_KEYWORDS_TOTAL, AD_SPEND as SB_AD } from './songbird-specialties.adspend.mjs';
import { linePct, lineUsd, monthUsd } from '../lib/pct.mjs';

/* Spite House's September 2026 unit economics — the one place the margin, the
   landed-cost table and the backend seed's COST_LINES (seed-spite-house-games.ts)
   are computed from. One product: every listing is the same 52-card deck in a
   different design, so the plain margin block, no tabs (build-ecom-biz-page §2).
   🚨 Change a figure here and in the seed together; check-profile compares the
   margin block with every month of the profit series. */
import { TOP_KEYWORDS as SHG_TOP_KEYWORDS, AD_SPEND as SHG_AD, AD_KEYWORDS as SHG_AD_KEYWORDS, AD_KEYWORDS_TOTAL as SHG_AD_KEYWORDS_TOTAL } from './spite-house-games.adspend.mjs';
const SHG = {
  revenue: 89988.5, // Sep 2026, the breakdown's nine rows
  units: 10150,
  avgOrder: 8.87, // revenue ÷ units
  make: 0.47, // the supplier table's average lowest price: (0.59 + 0.43 + 0.39) / 3
  tariffPct: 20, // ASSUMED: Section 301 plus the reciprocal rate on China, as on every profile
  freight: 0.07, // 95 × 70 × 22 mm = 0.000146 cbm × $496.67/cbm (freight-rates.json, read 2026-09-28)
  /* Keepa fbaFees.pickAndPackFee and the 2026 rate card, read 2026-10-11. The hero
     B0FMGJSSXT is Large Standard (95 × 70 × 22 mm, 100 g): $3.86 at its usual
     $12.99, and $3.01 under $10 — the low-price rate ($2.91 + the 3.5% surcharge) —
     which is what September's 8,000 units at $6.97 paid. Boomers $3.99, the rest
     $3.86. */
  fbaUsd: 8000 * 3.01 + 900 * 3.99 + 1250 * 3.86,
};
SHG.tariff = +((SHG.make * SHG.tariffPct) / 100).toFixed(2);
SHG.landed = +(SHG.make + SHG.tariff + SHG.freight).toFixed(2);
SHG.cogsPct = +((SHG.units * SHG.landed * 100) / SHG.revenue).toFixed(3);
SHG.fbaPct = +((SHG.fbaUsd * 100) / SHG.revenue).toFixed(3);
SHG.fbaPerUnit = +(SHG.fbaUsd / SHG.units).toFixed(2);
const shgBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;

/* Highmark Collective's advertising, from amazon-adspend-spy (highmark-collective.adspend.mjs).
   🚨 The margin's three advertising lines, the channels row and the Ad spend table are all
   built from HM_AD, never typed. */
const hmAd = (id) => HM_AD.products.find((p) => p.id === id);
const HM_AD_ORDER = 28.6; // the Whole brand tab's average sale across the catalogue
const hmBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;

/* Bizzikins' four doll photos, by ASIN, from our bucket (products/bizzikins/).
   Values are the content hashes the upload printed; keyed by ASIN so no row
   types a 64-character hash. Bucket copies, never Amazon's CDN, never /public. */
const BIZZIKINS_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/bizzikins/';
const BIZZIKINS_PHOTOS = {
  B0GSC67673: '3351dfacd7d13e4b1aee514df018b4ae67e0f088f6a3847ae4d2a82dadce2aef', // Poppy
  B0GT6RNPNZ: '42439ee55b150bd4cd7def3f28ed07e9c468f9b63f2fab2956a6678b49241ae6', // Annie
  B0GT793W2T: '7f0ce69fc6c73537424b8609b94dd70b1001ba667a607faaeb98cff0fb6744b0', // Rosie, the hero
  B0GT7XBBDN: '56d615d2bda47544a04bb5a6402482f27219a85d50b8c73ba030863374438e3c', // Max
};
const bizzikinsPhoto = (asin) => `${BIZZIKINS_BUCKET}${BIZZIKINS_PHOTOS[asin]}.jpg`;

/* Bizzikins' per-doll cost lines at the $37.50 price, in dollars (research/
   bizzikins/pnl.json): factory from one relayed quote, tariff 12.5% of it,
   freight from the carton, FBA pick and pack from Keepa, referral 15%.
   🚨 Their shares of the price are the backend seed's COST_LINES (cogs 14.4,
   tariff 1.8, freight 12.613, fba 20.347, referral 15); check-profile asserts
   the margin block and the profit series agree. Advertising is BZ_AD, never typed. */
const BZ_COST = { price: 37.5, factory: 5.4, tariff: 0.675, freight: 4.73, fba: 7.63, referral: 5.625 };
const bzPct = (amount) => -+((amount / BZ_COST.price) * 100).toFixed(3);
const bzBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
/* What the fifty Top keywords carry of the ad line, summed from their own rows
   (the cells read "$18", "under $1" or "$0"; "under $1" counts as nothing here,
   so this is a floor), never typed. */
const BZ_TOP_SPEND = BZ_TOP_KEYWORDS.reduce((sum, row) => sum + (/^\$(\d+)$/.test(row[5]) ? Number(row[5].slice(1)) : 0), 0);

/* Gamblin' Golf's listing photos, by ASIN, from our bucket (products/gamblin-golf/).
   Values are the content hashes the upload prints; keyed by ASIN so no row types
   a 64-character hash. Bucket copies, never Amazon's CDN, never /public. */
const GAMBLIN_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/gamblin-golf/';
const GAMBLIN_PHOTOS = {
  B0GNWNXFY1: '5af1cd2d458438f936d8de1b4aa3b356a6ca9cda8dcb67d902f18caa9e5683c2', // Scratch & Swing, the hero
  B0CFJXGS67: 'de1079574b24bf9144ef94f02045f38be24527a7008f7a3e15732633cf13786f', // Roll and Play ball game
  B0GP9SM3HF: 'e6044dc3df8c96f9da61b337cd214fbcb8ecde5e0b6bb89ec1dd4829b6ce3f85', // dollar balls, 12
  B0GP9XYPHS: '2113e404a6f25bcb706437db1be1981de3474b2d2786fed95e7fde77c78d390c', // dollar balls, 3
  B0GP9B5L3Q: '26279c471f114d64d40d0cb5cba83c74700f372cc5f3929890e65a1f728a8391', // women's balls, 12
  B0GP9F7ZB5: '901463cea4d0881504509aa4f0d8a8d8e66556f8c6c4b6fe165fc18b7c202bcf', // women's balls, 3
  B0GP98MJRW: 'daffe37f5c97dfc8b0f8494f45d22153a7531d619080e128809048703781bcea', // tee pack, 20
  B0GP91M8ZV: '76a81a40cfaadfbbe36f3f04c09de91193e47155d8173c22757029ed3d889335', // tee carton, 100
};
const gamblinPhoto = (asin) => `${GAMBLIN_BUCKET}${GAMBLIN_PHOTOS[asin]}.jpg`;

/* Scratch & Swing's per-box cost lines at the $24 price, in dollars (research/
   gamblin-golf/pnl.json). Make is the Accio production price (suppliers.json
   scratch-swing-deck cogsAverage, verified against the screenshot, filed
   2026-10-22): Dongguan KK at the 5,000 tier, nearest ~6,000 a year. 🚨 It
   rests on ONE supplier (owner's call). Tariff is 20% of make on an assumed
   China origin; freight is the quoted 15 × 9 × 4 cm tuck box × Freightos
   CN-USWC $496.67/cbm. Postage is theirs because the listing is
   merchant-fulfilled with free delivery. Their shares of the price are the
   backend seed's COST_LINES (cogs 3.667, tariff 0.75, freight 1.125, postage
   27.083, referral 15); check-profile asserts the margin block and the profit
   series agree. Advertising is GG_AD, never typed. Until 2026-10-25: make
   $2.50 (placeholder), tariff $0.50. */
const GG_COST = { price: 24, factory: 0.88, tariff: 0.18, freight: 0.27, landed: 1.33, postage: 6.5, referral: 3.6 };
const ggPct = (amount) => -+((amount / GG_COST.price) * 100).toFixed(3);
const ggBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
const GG_TOP_SPEND = GG_TOP_KEYWORDS.reduce((sum, row) => sum + (/^\$(\d+)$/.test(row[5]) ? Number(row[5].slice(1)) : 0), 0);

/* Draft Top's listing photos, by ASIN, from our bucket (products/draft-top/).
   Values are the content hashes the upload printed; keyed by ASIN (the hero's
   gallery shots as 'hero-PT0n') so no row types a 64-character hash. Bucket
   copies, never Amazon's CDN, never /public. */
const DRAFT_TOP_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/draft-top/';
const DRAFT_TOP_PHOTOS = {
  B0FS8PXTX3: '66f64d5b62fe761a3485fb647c407944bd7c08de0769e59c229b2dba0ac59364', // black, the hero
  B0D8B3NBY5: '9b7654a72b1a3cce626d8e7da36c121962653a56c7156de7ee4fade725340116', // red, white & blue
  B0DS268SBC: '84329bb4fc4827175278e51812e1279bc047d1e0fb0479afddbb91febcc67e54', // forest green
  B0D89Y4YVM: 'c855dc5973dc6169bb7ebef13331b6559c83e5b512cf89016e800e09b3497f6e', // blue
  B0DS23PTB2: '3b371e4d56f06eb1a685770a4d365dd63ec30066eb9bca7c37b7e623154af979', // ghost white
  B0DZ74PTVW: '7e6188b0a042fc49711afa58544293521fab09672af23b9bcbafe8b8f546bd3a', // red
  B0DFR7WTF7: '73cd58ee59c1a613104b80fbafbdbacbeec2daa54a18f963948e4b1bb2f552bb', // Clara Peirce edition
  'hero-PT01': '11f5e1033519878313325cea27ff60aedf25a6f02f4b01180a5ef1e35f7d392d', // the back, mechanism showing
  'hero-PT02': '6b59f091cf8a6a2e04e140be72f6388b368d0c30bdb4ee48952a2f5c093f7d80', // cans from mini to tall boy
  'hero-PT03': '9d981524b89aa82d83a0307784106588e6535800d83edc99ccd5cb7922d4cc30', // topless cans as drinks
  'hero-PT04': 'be629022e3c9a991385e94464b6b9c9ec1b3b3896df0d5c970c44abdc183d3e8',
  'hero-PT05': 'd79aedc95e2918dc4dd504542b8db7d9238f1161c8a89162125120c3961b4a23',
};
const draftTopPhoto = (asin) => `${DRAFT_TOP_BUCKET}${DRAFT_TOP_PHOTOS[asin]}.jpg`;

/* The Lift's September 2026 unit economics at the blended $26.76 (3,900 units,
   seven listings), in dollars — research/draft-top/pnl.json. 🚨 make is the
   Accio production price (suppliers.json lift-can-opener cogsAverage, verified
   against the screenshots and confirmed by the owner, 2026-10-25): two
   suppliers' prices for an EXISTING opener, not a custom Lift, averaged; the
   owner accepted them as the COGS. Until 2026-10-25 it was the founders'
   self-reported $4.13 (Shark Tank, 2021). 🚨 The tariff ASSUMES China origin (owner's call, 2026-10-15):
   20% of the cost to make, though they say it is made in the USA and one
   listing's title says "Made In china". Freight on the China lane. The percentages are pnl.json's and are the
   backend seed's COST_LINES (seed-draft-top.ts, generated from the same file);
   check-profile asserts the margin block and the profit series agree.
   Advertising is DT_AD, never typed. */
const DT_COST = {
  price: 26.76, // blended September sale: $104,361 / 3,900
  /* make = the factory price + the moulds spread over a year (owner's call
     2026-10-25: moulds are unavoidable, so they are in the margin AND in
     "To test"). Moulds: $9,000, the low end of Yongli's 3–4 sets at
     $3,000–5,000 each (Keyhome has not priced tooling), ÷ 47,000 a year
     (suppliers.json cogsAverage.yearlyUnits) = $0.19. Until 2026-10-25 make
     was the factory price alone, $1.37, 5.12%. */
  factory: 1.37, moulds: 0.19, mouldsOnce: 9000, mouldUnits: 47000,
  make: 1.56, makePct: 5.835,
  tariff: 0.27, tariffPct: 1.024, // 20% of the $1.37 factory price only — a mould is not imported per unit; ASSUMED China origin
  freight: 0.19, freightPct: 0.723, // 0.00039 cbm × $496.67 (freight-rates.json, read 2026-09-28)
  fba: 3.9, fbaPct: 14.569,
  referral: 4.01,
  landed: 2.03, // make (moulds in) + tariff + freight; also what "Test it first" prices on (starting-cost.lift.inputs.json)
};
const dtBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
const DT_AD_PER_SALE = +((DT_COST.price * DT_AD.ratePct.central) / 100).toFixed(2);

/* Doctor Jupiter's listing photos, by ASIN, from our bucket (products/doctor-jupiter/).
   Values are the content hashes the upload printed; keyed by ASIN so no row types
   a 64-character hash. Bucket copies, never Amazon's CDN, never /public. */
const DOCTOR_JUPITER_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/doctor-jupiter/';
const DOCTOR_JUPITER_PHOTOS = {
  B09XGMHGJ3: 'b3eee32f8727456372ab8b3d080dfe9a3035d8131c7b1e2faf467a8a09395b0d',
  B0C23WZ3BV: '3080006b9d15c28fcba7cf3cbe89579f96a43a9b026c6a18d01256a229a1238b',
  B0C248WX35: 'd07d21ef46a6a1548dd7b1fc496e7f691b0c788d31db3d42d9867472e65d6a24',
  B0C4YDZQMS: 'd95427add81c78a181a1d9344de537432b93afb84491bd158e1259d76a2569be',
  B0CG9QG2SF: 'e075693bddbe35d1cb5410b47bec582371969bc269ebb8d30fdb101bcfe0b2b9',
  B0D17X5QNF: '19d5193e6a1a427bddcb290146a9c08ff90e0e2e8af448447f4e56e73a048595',
  B0D17YL839: '7d46633e0fe6c05b917d2e4505bd4d211ec987eaea59bf43b0d02b1ea5d20578',
  B0D1MPNSS6: '7f0b87a9f6c6a916e6576c660bf0281291821ff46fde35c064a4c31b771669df',
  B0D1MR35P2: '5eb9a5a692b8a566a87e113adefb652fe5e33ae66ea6fd3f4905b27a52c3457b',
  B0D8BK7D7M: '9e7c56d4fb6cdc374b893fc17216ef34b4f78023fbdf16ed1b0a2ec29130f243',
  B0DTYWCFND: 'd7aaca75063a4bdeb3181bdf85409480c29d21f7cb3387451fcc555a2dde2741',
  B0DWFJ6YWV: 'fed317268b99e7e352d73358d27f62fbc28144e9f7a2575597c2d96b45194d9c',
  B0DZCWRLBR: '64e8911fd0e0d520cdbdebfecdb3f5d57547362d01b7d3c98c5d908e3d427590',
  B0FBMFTTB6: '9cecb45756207b46cbb236dd44a3e2ae91d1f4cfd6da2a6bf8fb7ddf362b4aa0',
  B0FBMG6PJ3: '77bd06e563de5193fe668aa34dcd12a44e9c94bdf6528967324e020e89122d78',
  B0FN3KPZVH: '6e216622dda68aaae5505e4d278b11eb49efe1949d0ff8f9ba299a8a8a197ca9',
  B0FN3MC4CY: '775d47ffe2a2520633c964f97d2dc7a0d0b85ee2f9bb6d3cd2afb8cb45ee074a',
  B0FW4JPS2J: '677dca2dc525b3677c27e459f2e7ff82d63ab1d20d4633cfdffc7484d280e33f',
};
const doctorJupiterPhoto = (asin) => `${DOCTOR_JUPITER_BUCKET}${DOCTOR_JUPITER_PHOTOS[asin]}.jpg`;

/* Each main product's September 2026 unit economics, in dollars — research/
   doctor-jupiter/pnl.json products.*.perUnit. Make is the Accio listing price
   (suppliers.json cogsAverage, search mode); 🚨 three of the four rest on ONE
   listing each (owner's call, 2026-10-18). Tariff 20% of make, ASSUMED China;
   freight is the units-weighted carton × Freightos CN-USWC $496.67/cbm; FBA is
   Keepa's pick-and-pack, units-weighted. Advertising is DJ_AD, never typed. */
const DJ_COST = {
  'my-first-science': { price: 27.18, make: 3.86, tariff: 0.77, freight: 2.08, fba: 6.14, referral: 4.08, landed: 6.71 },
  'ultimate-science': { price: 26.86, make: 6.9, tariff: 1.38, freight: 2.07, fba: 5.97, referral: 4.03, landed: 10.35 },
  'preschool-science': { price: 26.99, make: 3.25, tariff: 0.65, freight: 1.93, fba: 5.76, referral: 4.05, landed: 5.83 },
  'paper-airplane-launcher': { price: 24.99, make: 2.59, tariff: 0.52, freight: 1.47, fba: 5.62, referral: 3.75, landed: 4.58 },
};
const djPct = (id, amount) => -+((amount / DJ_COST[id].price) * 100).toFixed(3);
const djAd = (id) => DJ_AD.products.find((p) => p.id === id);
const djBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
/* The Whole brand tab: pnl.json blendedCostSharesPct, the four products'
   September lines revenue-weighted and applied to the whole catalogue — the
   SAME numbers as the backend seed's COST_LINES (seed-doctor-jupiter.ts,
   generated from pnl.json). Advertising is DJ_AD's rate on the four products,
   applied to the whole brand, as OTOTO's is. */
const DJ_BLEND = { cogs: 15.064, tariff: 3.008, freight: 7.498, fba: 22.445 };
const DJ_REVENUE = 461097; // September 2026, the snapshot month — the Business row
const DJ_AVG_SALE = 26.65; // $461,097 / 17,300 units
const DJ_AD_MONTH = (DJ_REVENUE * DJ_AD.ratePct.central) / 100;
/* The other 40-odd listings (17% of September: $79,488.50 over 3,150 units,
   $25.23 a sale) carry the same rate, so the Ad spend table adds up to the line. */
const DJ_REST = { month: DJ_AD_MONTH - DJ_AD.monthlyUsd.central, avgSale: 25.23 };

/* WOODLANDS USA's listing photos, by ASIN, from our bucket (products/woodlands-usa/).
   Values are the content hashes the upload printed; keyed by ASIN so no row types
   a 64-character hash. Bucket copies, never Amazon's CDN, never /public. The walnut
   and teak tongs (B0FRFCDK74, B0FD7RGYWG) share one listing image, so one hash.
   🚨 NEVER add the three franchise-titled sets (B0D5NFN2YG, B0D5NHG5K6,
   B0D5NQJ3VZ): their listing images carry franchise art, and the owner's call
   (2026-10-15) is that no franchise art is shown on this page. Their breakdown
   rows stay without a photo, on purpose, and the helper refuses them. */
const WOODLANDS_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/woodlands-usa/';
const WOODLANDS_PHOTOS = {
  B0D5NLZSZS: 'bb28dff9ba045d2de94aced27df8529cbfcf43bf97a035c8052ee5a5bbab7bf9',
  B0FD7F9MSK: 'c29f7cfdd3bd40111ec79efe67cbb73de58441296a646777be0cff95a1059065',
  B0FD7G48D4: 'e69021a428b1ea66fa067473183793cc87615eb5ddb2a8b46cdbdc3ddded5d3e',
  B0FD7HK25C: '981a9450e78be1161968da12426b5562fc87a9c233005a14f7b03261d34095a9',
  B0FD7KZYLV: 'f6006bd97a7b2dcc8b91c01ade84496db048b3b98a57310aa7951a81a2dce0c9',
  B0FD7LZW9B: 'a389a01f025f31b614564aa8b48163d05214f7c7d7ee7d7f2828e334fddc0db7',
  B0FD7NT7GH: 'f4a35e6b5d2421fd22271d8eabda20f9daecdb315b9f8b52f765aa95d78782a8',
  B0FD7PVQTG: '3b15e1b098df99b8557b95369fcd4d32647cf7399b455b4e4c1161a36ce0a316',
  B0FD7QXJS6: 'd03ff8732b3c9100873aad228e4341586c717c4f82c490c773a6faab17b49f5d',
  B0FD7RGYWG: 'fdb1fddd7373a30bc5ff768b19b0df4faac4654a5eccfbd49198fa9e1589de10',
  B0FD7RVW83: '537f145615883c88c7a91eed34f289d0d088cb636b944588a00450016345d1b3',
  B0FD7S11QM: '9c2eb12b08d9e2afd9aaa2f279c9d2647b8484e64952bf9786d7f27557341507',
  B0FD7T6VVF: '9bd6498eafff6ab5e32fbf803d20e9fd18a43ae914a84864e35c8e9ddfd462c9',
  B0FD86K3FY: '10a95af177a95682903d81260100a32901711e4787017c01ea99a2395cf3ed5a',
  B0FRFCDK74: 'fdb1fddd7373a30bc5ff768b19b0df4faac4654a5eccfbd49198fa9e1589de10',
  B0FSKQ3WB9: '5ec695e6327c71c0c0a92550ffe941d405359bf3005570ae7cf9832584c08560',
};
const WOODLANDS_FRANCHISE = new Set(['B0D5NFN2YG', 'B0D5NHG5K6', 'B0D5NQJ3VZ']);
const woodlandsPhoto = (asin) => {
  if (WOODLANDS_FRANCHISE.has(asin)) throw new Error(`woodlands-usa: no franchise-set photo on this page (${asin})`);
  return `${WOODLANDS_BUCKET}${WOODLANDS_PHOTOS[asin]}.jpg`;
};

/* Each main product's September 2026 unit economics, in dollars — research/
   woodlands-usa/pnl.json products[].lines.*.perUnit. Make is the Accio listing
   price (suppliers.json cogsAverage, search mode), one price for every
   variation of the product; 🚨 the teak set's two listings are a 9- and a
   10-piece set scaled to 8 pieces by piece count (owner's call, 2026-10-18).
   Tariff 20% of make, ASSUMED China; freight the units-weighted carton ×
   Freightos CN-USWC $496.67/cbm; FBA Keepa's pick-and-pack, units-weighted.
   Advertising is WL_AD, never typed. */
const WL_COST = {
  'bamboo-set': { price: 11.43, make: 1.67, tariff: 0.33, freight: 0.72, fba: 3.59, referral: 1.71, landed: 2.72 },
  'teak-utensil-set': { price: 30.39, make: 8.84, tariff: 1.77, freight: 2.15, fba: 6.04, referral: 4.56, landed: 12.76 },
  'teak-spatula': { price: 7.87, make: 1.37, tariff: 0.27, freight: 0.32, fba: 2.98, referral: 1.18, landed: 1.96 },
};
const wlPct = (id, amount) => -+((amount / WL_COST[id].price) * 100).toFixed(3);
const wlAd = (id) => WL_AD.products.find((p) => p.id === id);
const wlBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
/* The Whole brand tab: pnl.json blendedCostSharesPct = the backend seed's
   COST_LINES (seed-woodlands-usa.ts, generated from pnl.json). Advertising is
   WL_AD's rate on the three products, applied to the whole brand. */
const WL_BLEND = { cogs: 16.563, tariff: 3.281, freight: 6.174, fba: 30.689 };
const WL_REVENUE = 77682.5; // September 2026, the snapshot month — the Business row
const WL_AVG_SALE = 11.86; // $77,682.50 / 6,550 units
const WL_AD_MONTH = (WL_REVENUE * WL_AD.ratePct.central) / 100;
/* The rest of the catalogue (15.9% of September: $12,338 over 1,000 units,
   $12.34 a sale — dough whisks, ladles, tongs, spoons with rests) at the same rate. */
const WL_REST = { month: WL_AD_MONTH - WL_AD.monthlyUsd.central, avgSale: 12.34 };

/* Songbird Specialties' listing photos, by ASIN, from our bucket
   (products/songbird-specialties/). Values are the content hashes the upload
   printed; keyed by ASIN. Bucket copies, never Amazon's CDN, never /public. */
const SONGBIRD_BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/songbird-specialties/';
const SONGBIRD_PHOTOS = {
  B0F1GWKYHG: '8dbc1ead1159fdb6d6ade134a4c01dc5c1d806430c8718ec80ec170ca2c6dba1',
  B0F1H6B5VJ: 'bf5e19759741f72a15f9877314fbd6a3e21b851c0dd206ed6ec2e91bbe56ed8c',
  B0F1H8J8RW: '814f9aa326a686ba738f90aca7f5ff0c93ef48a553c44fb410c338f0ed279043',
  B0F1HFM4WP: '7c358016ab57b4139607082b2ab249e065c599962d41997a79c014f7fae0aa55',
};
const songbirdPhoto = (asin) => `${SONGBIRD_BUCKET}${SONGBIRD_PHOTOS[asin]}.jpg`;

/* The pourer's per-unit lines at $29.99 — research/songbird-specialties/
   pnl.json lines. make is the Accio production price, suppliers.json
   cogsAverage (run accio/singing-bird-pourer/2026-10-25T1146): Kingtop $2.28
   and Sinowin $3.45 at 10,000, averaged = $2.87. Until 2026-10-25 it was OUR
   $4.00 placeholder (13.338%). From 2026-10-25 (owner: the mould is
   unavoidable) make also carries Kingtop's $1,200 mould over a year's sales,
   $1,200 / 13,200 (cogsAverage.yearlyUnits) = $0.091: $2.961, 9.873%.
   Tariff 20% of the $2.87 factory price only ($0.574), ASSUMED China — the
   mould is paid once, not imported per unit.
   The percentages are pnl.json's and the backend seed's COST_LINES
   (seed-songbird-specialties.ts); check-profile asserts the margin block and
   the profit series agree. Advertising is SB_AD. */
const SB_COST = {
  price: 29.99,
  factory: 2.87, // the two quotes, averaged
  mouldPerUnit: 0.09, // $1,200 ÷ 13,200 = $0.091
  make: 2.96, makePct: 9.873, // $2.87 + $0.091 = $2.961
  tariff: 0.57, tariffPct: 1.914, // 20% × $2.87 = $0.574, the factory price only
  freight: 0.65, freightPct: 2.153, // 0.0013003 cbm × $496.67 = $0.646
  fba: 4.35, fbaPct: 14.505,
  referral: 4.5,
  landed: 4.18, // $2.961 + $0.574 + $0.646
  tooling: 1200, // Kingtop's mould, one time: spread over a year in make, and paid up front in "Test it first"
};
const sbBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;

/* Mount Cleverest's advertising, from amazon-adspend-spy (mount-cleverest.adspend.mjs).
   🚨 The margin's advertising lines, the channels row and the Ad spend table are all
   built from MC_AD, never typed. Only Amazon Sponsored Products is modelled in it;
   TikTok creator commission is in the fees line, and TikTok's own ad spend is not
   published. */
const mcAd = (id) => MC_AD.products.find((p) => p.id === id);
const MC_AD_ORDER = 14.58; // the Whole brand tab's average sale across both channels
const mcBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;

/* Virora's advertising, from amazon-adspend-spy (virora-mahjong.adspend.mjs).
   🚨 The margin's three advertising lines, the Advertising section's channels
   row and its "Ad spend" table are all built from this — never typed — so the
   two sections cannot disagree (build-ecom-biz-page §2). */
const viroraAd = (id) => VIRORA_AD.products.find((p) => p.id === id);
const VIRORA_AD_ORDER = 110.1; // the Whole brand tab's average selling price
const viroraBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
/* What a Top keywords table's "Ad spend a month" column adds up to — summed
   from the generated rows, so the note under the table cannot drift. "under
   $1" rows count as nothing. */
const topSpend = (rows) => rows.reduce((t, r) => t + (/^under/.test(r[5]) ? 0 : Number(String(r[5]).replace(/[^0-9.]/g, '')) || 0), 0);
/* "Keywords they pay for": every keyword an ad of theirs was seen on, biggest
   modelled spend first, generated by profile-tables.mjs (AD_KEYWORDS) and
   adding up to the Amazon ad line (AD_KEYWORDS_TOTAL). It sits right under Top
   keywords, which shows the biggest searches — usually not where the money is.
   🚨 Owner's call, 2026-10-11, on every profile with an ad model
   (build-ecom-biz-page §2). One product → no Product column. */
const adKeywordsTable = (rows, total, line) => {
  const single = new Set(rows.map((r) => r[1])).size <= 1;
  /* Rows starting "+ " are the keywords a sample stands for (adspend-spy.mjs
     HEAD + SAMPLE, 2026-10-18), one per product; the note says so. */
  const sampled = rows.filter((r) => r[0].startsWith('+ '));
  const readCount = rows.length - sampled.length;
  const standFor = sampled.reduce((n, r) => n + Number(r[0].match(/^\+ ([\d,]+)/)?.[1].replace(/,/g, '') ?? 0), 0);
  const which = sampled.length
    ? `The ${readCount} keywords read one by one where an ad of theirs was seen, biggest modelled spend first, and ${standFor.toLocaleString('en-US')} smaller ones estimated from a sample of them`
    : `Every keyword where an ad of theirs was seen, ${rows.length} of them, biggest modelled spend first`;
  return {
    type: 'table',
    caption: 'Keywords they pay for',
    columns: ['Keyword', ...(single ? [] : ['Product']), 'Searches a month', 'Their ads', 'Cost per click', 'Ad spend a month'],
    rows: single ? rows.map(([k, , ...rest]) => [k, ...rest]) : rows,
    visibleRows: 10,
    note: `${which}. They add up to $${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} a month — the ${monthUsd(line)} of Amazon ads in the Ad spend table below, before rounding. “Their ads” is their share of Jungle Scout’s sponsored results, weighted by position, or their best sponsored position in the New York read. Where neither Amazon nor Jungle Scout gives a bid, the keyword is listed but not priced.`,
  };
};

/* White Mountain's advertising line, in two halves, each a channel's rate
   times its share of TOTAL revenue (research/white-mountain-puzzles/pnl.json
   channels, 2026-09). Amazon is amazon-adspend-spy's rate (WMP_AD, measured on
   Amazon US, applied to Europe too); the store's 20% is a judgement on the
   ad libraries. 🚨 The margin line, the channels rows and the Ad spend table
   are all built from WMP_ADS — and the backend seed's COST_LINES.advertising
   must equal WMP_ADS.total (check-profile compares them). */
const WMP_REVENUE = { amazon: 382391.5 + 254927.67, store: 88553.5 };
const WMP_TOTAL = WMP_REVENUE.amazon + WMP_REVENUE.store;
const WMP_AVG_SALE = 19.52; // the margin block's basis: the three channels blended
const WMP_STORE_AD_RATE = 20;
const WMP_ADS = (() => {
  const amazon = +((WMP_AD.ratePct.central * WMP_REVENUE.amazon) / WMP_TOTAL).toFixed(3);
  const store = +((WMP_STORE_AD_RATE * WMP_REVENUE.store) / WMP_TOTAL).toFixed(3);
  return { amazon, store, total: +(amazon + store).toFixed(3) };
})();
const wmpRow = (label, pct, basis) => [label, monthUsd((pct * WMP_TOTAL) / 100), linePct(pct), lineUsd((pct * WMP_AVG_SALE) / 100), basis];
import { KAJUN_BREAKDOWN } from './kajun-loaded-tea.breakdown.mjs';
import { WET_NOSES_BREAKDOWN, wetNosesPhoto } from './wet-noses.breakdown.mjs';
import { RESTORATION_BREAKDOWN, restorationPhoto } from './restoration-games.breakdown.mjs';
import { LIGHTEN_LIFE_BREAKDOWN, lightenLifePhoto } from './lighten-life.breakdown.mjs';
import { OTOTO_BREAKDOWN, ototoPhoto } from './ototo.breakdown.mjs';
/* OTOTO's three heroes (a catalogue brand, SKILL §2: its best sellers, not
   80%), August 2026 unit economics in dollars — waithowmuch-research research/
   ototo/pnl.json products.*.perUnit. Make is the Accio production price
   (suppliers.json cogsAverage, verified against the screenshots, 2026-10-18);
   🚨 the scissors rest on ONE supplier (owner's call). Tariff keeps OTOTO's
   duty-class model (owner's call): plastic 3.4% + 10% China; metal 3.7% + 25%
   Section 301 + 10% China — scissors and corkscrew are metal. Freight is the
   Keepa package × Freightos CN-USWC $496.67/cbm; FBA is Keepa's pick-and-pack.
   Advertising is OT_AD, never typed. */
const OT_COST = {
  scissors: { price: 9.99, make: 1.79, tariff: 0.69, freight: 0.29, landed: 2.77, fba: 4.09, referral: 1.5 },
  spatula: { price: 9.95, make: 1.4, tariff: 0.19, freight: 0.17, landed: 1.76, fba: 3.86, referral: 1.49 },
  opener: { price: 19.95, make: 5.54, tariff: 2.14, freight: 0.63, landed: 8.31, fba: 4.35, referral: 2.99 },
};
const otPct = (id, amount) => -+((amount / OT_COST[id].price) * 100).toFixed(3);
const otAd = (id) => OT_AD.products.find((p) => p.id === id);
const otBand = (m) => `${monthUsd(m.low)}–${monthUsd(m.high)} a month`;
/* The Whole brand tab: pnl.json blendedCostSharesPct — August's amounts over
   its revenue, the heroes at the costs above and every other listing at its
   type cost — the SAME numbers as the backend seed's COST_LINES
   (seed-ototo.ts). */
const OT_BLEND = { cogs: 13.536, tariff: 2.895, freight: 3.294, fba: 28.093 };
import { HIGHMARK_BREAKDOWN, highmarkPhoto } from './highmark-collective.breakdown.mjs';
import { MOUNT_CLEVEREST_BREAKDOWN, mountCleverestPhoto } from './mount-cleverest.breakdown.mjs';

/** @type {Record<string, import('./types').Profile>} */
export const PROFILES = {
  'dummy-widgets': {
    intro:
      'A placeholder profile, kept so the renderer has something to exercise. Every word and figure here is invented.',
    blocks: [
      { type: 'heading', text: 'What it is' },
      {
        type: 'prose',
        text:
          'Dummy Widgets Co exists to prove that this page renders: the authored prose, the pulled figures, the chart and the timeline. Replace it with a real profile and delete this entry.',
      },
      { type: 'stat', metric: 'latestMonthlyRevenue', label: 'Revenue / mo' },
      { type: 'stat', metric: 'latestMarginPct', label: 'Margin' },
      { type: 'heading', text: 'The numbers' },
      { type: 'chart' },
      { type: 'heading', text: 'How it grew' },
      {
        type: 'list',
        items: [
          'Short-form video before the first listing went live',
          'One post carried a disproportionate share of the first big month',
          'Paid acquisition arrived late, after organic had already worked',
        ],
      },
      { type: 'heading', text: 'Timeline' },
      {
        type: 'timeline',
        items: [
          { when: 'Early', what: 'Audience built before there was anything to sell' },
          { when: 'Launch', what: 'First product listed' },
          { when: 'Peak', what: 'Seasonal spike, then the long rebuild' },
        ],
      },
      {
        type: 'callout',
        text: 'Figures on this page are modelled from public information, not read from the company’s accounts.',
      },
    ],
  },

  'spite-house-games': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-spite-house-headline.ts, from
       waithowmuch-research research/spitehouse/headline.json, where every
       figure in them is tiered and traced — and the page reads them from the
       row alone. This entry carries only the image beside them. */
    headline: {
      /* The best seller: the original deck is 62% of the revenue, so it is
         the object this whole page is about. The overview's image further
         down shows the second-best seller instead of repeating it. */
      image: {
        src: `${SPITE_HOUSE_BUCKET}ee184f37f7cb5332977b8e15bdbc157d0d0d87a194bbaddb3fcecf4dcf579293.jpg`,
        alt: 'The “Go F*** Yourself!” card-game box — the best-selling deck, a blue box with a grinning cartoon goldfish',
      },
    },
    /* 🚨 The multiple is the ONE authored number on this page, and it is a
       placeholder rather than a finding. Nothing public prices this business;
       2.5× is the low end of the small-FBA range, picked for a catalogue that
       is one product, one channel and violently seasonal. The valuation card
       multiplies it by trailing-twelve net profit off the series, so the
       figure moves when the data does — but the multiple itself is a knob
       waiting for a real model. Change it here, not in prose. */
    /* 🚨 The multiple is COMPUTED, not chosen. These are the inputs the
       ported model scores — see src/valuation/model.mjs for the rules and
       src/valuation/inputs.mjs for the three house rules that decide what
       goes in here.

       Everything absent is absent ON PURPOSE. Hours worked, suppliers,
       differentiation, Brand Registry, account health and team are answers
       only the owner can give; the model reports them as unscored rather than
       guessing, and the board says so under the columns. */
    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record rather than reads. All four are
             questionnaire answers in the original model, so they are the
             first things to put to the owner. */
          primaryMethod: 'private_label', // own designs, own brand, own listings

          /* Flagship, not category dominance. The shape argues for dominance —
             one product type in every variation — but that definition requires
             owning most of the variations IN THE CATEGORY, and this is #9 in
             Dedicated Deck Card Games with direct competitors on the same
             search page. One SKU takes 62% of revenue and 79% of units, with
             two priced ASINs that have never sold: a hero with filler. */
          catalogStructure: 'flagship',

          /* Differentiation level 3. No tooling — four printers quote this
             deck at $0.50–1.00 — but the game and every card in it are the
             owner's own design, and the spec's level 3 explicitly covers
             products "made from simple customisable materials such as paper".
             The counter-argument is that the object is a standard 52-card
             deck and the mechanic is public-domain Go Fish, which would make
             it level 2; the levels are 0.55 apart, the widest step in the
             model, so this one answer is worth more than any other here. */
          diffTooling: 'no',
          diffCustom: 'yes',

          /* Brand Registry, and this one IS a read rather than an inference:
             the brand runs an Amazon Brand Store at /stores/SpiteHouseGames
             and the hero listing carries A+ content. Amazon gates both behind
             Brand Registry enrolment. The trademark question is left unscored
             — enrolment usually implies a registered mark but not always, and
             it is a separate legal asset that transfers on its own terms. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the catalogue's first listing, not the 2021 account. At
             1.6 years this scores nothing either way — too old for the
             under-18-months penalty, too young for the three-year bonus. */
          sellingSince: '2025-01-20',
          /* The hero listing alone, read from the listing on 2026-09-10; the
             catalogue total is higher but is not published, so this is a
             floor and lands in the 2,500+ band. */
          reviewTotal: 2964,

          /* 🚨 The hero listing's rating standing in for the revenue-weighted
             average the model wants — defensible because that listing is 62%
             of revenue, but it sits EXACTLY on a band boundary. 4.5 scores
             +0.20; anything under it drops to +0.05. If the tail of the
             catalogue rates lower than the hero, this factor is worth a
             quarter of what it is being paid here. */
          ratingWeighted: 4.5,
          sellerFeedbackPct: 86,
          /* RULE 2: Amazon marketplaces measured against each other. Every
             priced listing is Amazon US, so this is 100 — the intended
             answer, not an edge case. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US'],
          /* December against the trailing twelve. Computed from the same
             series the chart draws, via peakMonthSharePct(). */
          peakMonthSharePct: 26.84,
          /* RULE 3: offAmazonSharePct deliberately UNSET. The Shopify store
             and the TikTok Shop are real but cannot be sized from outside
             without three stacked guesses, and the honest range straddled the
             20% band boundary. The figure below is the Amazon business. */
        },
      },
      basis: 'Trailing-twelve net profit at a modelled multiple. The Amazon business only.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    /* Qualitative facts only. Ad spend, TACoS and anything else the metric
       series can answer is derived in MetricCards.tsx. */
    facts: [
      { label: 'SKUs', value: '16', info: 'skus' },
      /* The listing's own breadcrumb, in full. Read from the hero ASIN
         (B0FMGJSSXT) on 2026-09-10, where the best-seller rank is #190 in
         Toys & Games and #9 in Dedicated Deck Card Games. */
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Card Games › Dedicated Deck Card Games',
        note: '#9 in Dedicated Deck Card Games',
        info: 'category',
        wide: true,
      },
      /* 🚨 BOTH CELLS DESCRIBE THE HERO LISTING, deliberately, and that is why
         neither carries a "+" or a weighting rule. A catalogue-wide review
         total and a rating-count-weighted average are the better questions,
         but Amazon publishes rating, review count and star split per LISTING,
         so answering them means reading every ASIN. One listing carrying 62%
         of revenue is one page read, which is what makes this pair automatable
         for every business rather than only for the researched ones. What it
         costs is in the tooltips: a long tail can rate differently, and the
         catalogue total is always higher than the figure shown. */
      { label: 'Product reviews', value: '2,964', note: 'On the hero listing', info: 'reviews' },
      { label: 'Product rating', value: '4.5★', note: 'Hero listing · 77% five-star', info: 'rating' },
      { label: 'Seller feedback', value: '86%', note: 'Over 66 ratings', info: 'sellerFeedback' },
      /* ── How the business is BUILT ─────────────────────────────────
         Three attributes describing the MODEL rather than the numbers,
         carried with the rest because a reader takes them in the same pass.
         Each is one phrase from a fixed list, so the ⓘ carries the
         definition and links to /business-attributes for the list itself.

         🚨 Catalogue and differentiation have NO VALUE yet. A "?" is the
         honest state: both are placements we have not made for this business,
         and a plausible guess on a page like this is worse than a gap —
         the gap is visibly a gap, a guess is not. */
      { label: 'Sourcing', value: 'Private label', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* Both now placed, and both SCORED — the valuation board credits
         differentiation at +0.45 and catalogue shape at −0.10. A "?" here
         while the model prices them would have the page say it had not
         assessed something it had just published a number for. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One SKU is 62% of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      /* Three, not two. The store's own FAQ answers "Why are your prices
         different on Amazon and TikTok?", so TikTok Shop is a selling channel
         they run — it was missing here until the store was read directly. */
      { label: 'Channels', value: 'Amazon US, own store, TikTok Shop', info: 'channels' },
    ],

    /* Multi-select answers against businesses/selling-methods.mjs. Anything
       not listed here is `unchecked` and renders as such — omitting a method
       is never the same as answering "no". */
    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only stream with a public number behind it, because Amazon prints a sales badge on a listing and nobody publishes anything comparable for the others. Every figure elsewhere on this profile — the chart, the margin, the valuation — is this channel and no other.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'spitehousestudios.com, live since 4 April 2025: 37 products from $5.99 to $39.99, and the core deck at $12.99 — what Amazon usually charges for it too, though Amazon had it at $6.97 when this was read. Shopify publishes no revenue and a visit count is not an order count, so the second-largest thing about this business is invisible from outside.',
      },
      'tiktok-shop': {
        status: 'yes',
        note:
          'Found by reading the store rather than by finding a marketplace listing: their own FAQ answers “Why are your prices different on Amazon and TikTok?”. A reminder that a channel can be absent from every tool and still be running.',
      },
      licensing: {
        status: 'yes',
        note:
          'A USAopoly edition of the game on a Walmart shelf, linked from their own Linktree. Royalty terms are private and never published, so it cannot be valued from outside — but it is the one stream that scales without inventory or ad spend, and the first thing to ask them about.',
      },
      'amazon-international': {
        status: 'no',
        note:
          'Every priced listing is Amazon US. A tenth priced ASIN exists on Amazon Global Store UK, but that is Amazon reselling into the US rather than this operator’s own offer.',
      },
      'other-marketplace': {
        status: 'no',
        note:
          'The Walmart listing belongs to the licensee, not to this seller — which is the distinction between a channel they run and a shelf their brand reached.',
      },
      // 'wholesale-out' left unchecked: no stockists page has been looked for
      // and no wholesale marketplace has been searched.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'From the seller record, and the margin model charges an FBA fee on every unit. It is the largest line in the whole cost stack: the deck’s box is 0.87 in deep, too thick for Small Standard, so it ships as Large Standard at $3.01 under $10 and $3.86 at its usual $12.99 — either way several times what the printer charges to make it.',
      },
      fbm: {
        status: 'unchecked',
        note:
          'Nothing read splits the 16 listings between FBA and FBM. A per-ASIN read turns this and the row above into a ratio, which is the honest shape for a per-listing choice.',
      },
      'vendor-1p': { status: 'no' },
      'platform-fulfilled': { status: 'no' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own game, their own card designs, their own brand, and nobody else sells the identical listing.',
      },
      pod: {
        status: 'no',
        note:
          'The printing quotes are 300–500 unit minimums — a production run held as inventory, which is the opposite of printing on demand.',
      },
      'merch-on-demand': { status: 'no' },
      kdp: { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      handmade: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note:
          'A Brand Store at /stores/SpiteHouseGames and A+ content on the hero listing. Amazon gates both behind enrolment, so this is read from the public record rather than asked. Whether a trademark is registered is a separate question and is not answered here.',
      },
      // 'subscribe-save' left unchecked: Amazon prints the box on any listing
      // that offers it, so it is one page read away.
    },

    intro:
      'Spite House Studios LLC sells one joke, well. “Go F Yourself!” is Go Fish for adults — a deck of cards with a gag on it — and the catalogue is that deck, re-cut for a different target each time.',
    /* Section markers drive BOTH the page headings and the table of contents
       down the left — see components/Toc.tsx. The order follows the reference
       information architecture rather than the order the source wrote in:
       how it got here, then what it earns, then why the economics work, then
       where the demand came from. The timeline leads because every figure
       after it is seasonal, and a reader who meets December's $349,150
       before learning this catalogue is one year old reads a spike as a
       run rate. */
    blocks: [
      { type: 'heading', text: 'One joke, sixteen ways' },
      {
        type: 'prose',
        text:
          'Boomers, Mom, Dad, Mom & Dad, Jesus Christ, America in red and blue. Sixteen ASINs, ten of them priced, seven carrying a sold badge, at an $8.87 average order.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION, and that is the same rule as the prose
         above it: a number typed here would be a second copy of one the
         breakdown block computes, and the two would part company the first
         time a row was corrected.

         The brand's own listing images, not the box. The box is already the
         headline image at the top of the page; these show how the brand sells
         it. Copied into our bucket (products/spite-house-games/) rather than
         hotlinked, so Amazon re-cropping or dropping them cannot change this
         page. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/3a4ef3ca9afdc031b3256f9a8410734af057bf3387b59d23582908f903117ff9.jpg',
            alt: 'Listing image: “So easy a baby could play!” above a cartoon goldfish with a dummy, captioned “(do not play with babies)”',
          },
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/spite-house-games/77cc37b8b258535cf663f00436db50bb8de311c2b8248fbdf91fada448edce6c.jpg',
            alt: 'Listing image: “Fish for shameful secrets. ‘Do you have?’” over a fan of illustrated cards with censored prompts',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images. The pitch is the joke: a game anyone can pick up, played for the secrets you would rather not say out loud.',
      },

      /* 🚨 Grouped with Overview, not with Brand owner, and the group is the
         reason it can lead. A TOC group is a GAP (see Toc.tsx), so leaving
         this on 'Who and when' would have split that group into two clusters
         either end of the page with the same name. Sharing the synthetic
         Overview group instead makes the two read as one opening cluster —
         what it is, then how it got here — and puts the gap before Revenue,
         which is where the page turns to money. */
      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Two listings in January 2025 that nobody bought, a badge in September, a Christmas that did $349,150 — and then a year spent building a business that does not need December.',
      },
      {
        /* Oldest first, and strictly so: the source lists a few of these out
           of order. Each entry names the strand it belongs to, because the
           whole point of this business's story is that the audience strand
           starts before the selling one. */
        type: 'timeline',
        items: [
          {
            when: '20 Feb 2021',
            tag: 'Web',
            what: 'wouldyoukillhitler.com registered',
            detail:
              'An earlier venture, five years before this catalogue — and still the support address on every legal page of the current store. Its game sits on the shelf here as “I Would Kill Hitler” at $29.',
          },
          {
            when: '20 Oct 2024',
            tag: 'Web',
            what: 'spitehousestudios.com registered',
            detail: 'Six months before the store opens, and three months before the first Amazon listing.',
          },
          {
            when: '30 Nov 2024',
            tag: 'Brand',
            what: 'The TikTok account is created',
            detail:
              '18:15 UTC, from TikTok’s own createTime field, corroborated by the timestamp encoded in the user id 102 seconds apart. Six weeks after the domain and seven weeks before the first listing: the audience was started first.',
          },
          {
            when: '20 Jan 2025',
            tag: 'Amazon',
            what: 'First two listings go up',
            detail: 'The original deck and a second listing, on the same day. Neither carries a sold badge for another eight months.',
          },
          {
            when: '4 Apr 2025',
            tag: 'Web',
            what: 'The Shopify store opens',
            detail:
              'First product published, with the Wayback Machine’s first capture three days later. The deck lists at $12.99 there — the price it usually carries on Amazon as well.',
          },
          {
            when: '25 Jun 2025',
            tag: 'Brand',
            what: 'A YouTube channel appears, and is left to idle',
            detail:
              '83 videos and 46 subscribers, describing itself as “reposting all of my viral TikTok content, literally phoning it in”. A one-person operation choosing where not to spend effort.',
          },
          {
            when: '6 Aug 2025',
            tag: 'Amazon',
            what: 'Boomers and Jesus Christ',
            detail: 'The first re-cuts of the same joke for a different target, at the same $12.99 the original usually sells for.',
          },
          {
            when: '30 Sep 2025',
            tag: 'Amazon',
            what: 'The badge appears — $13,940',
            detail:
              'Amazon starts printing “bought in past month” on the original deck, which means it crossed roughly 50 sales a month. Keepa’s history starts here.',
          },
          {
            when: '20 Oct 2025',
            tag: 'Brand',
            what: 'A post does 549,228 likes',
            detail:
              'Their pinned Instagram post, and the closest thing to a cause on this profile: October revenue was $69,700 and November was $278,800. The same content runs on TikTok, where the account holds 5.2M likes across 359 videos.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$349,150 — the Christmas month',
            detail: '50,050 units, and four times any month since. A gag gift’s whole year happens in eight weeks.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '82% of it disappears',
            detail: '$62,717. Not a listing problem and not a ranking problem — Christmas ended. The next six months are spent rebuilding.',
          },
          {
            when: '14 Apr 2026',
            tag: 'Amazon',
            what: 'Mom, Dad, and Mom & Dad',
            detail: 'Three more targets in a day, and the first at $19.99 — $7 above the original’s usual $12.99 for the same object.',
          },
          {
            when: '30 Apr 2026',
            tag: 'Web',
            what: 'Organic search peaks at 8,257 visits',
            detail:
              'Ubersuggest’s estimate for the month, almost all of it landing on one how-to-play page. By August it is 2,859 — down 65% from the peak.',
          },
          {
            when: '3 Jun 2026',
            tag: 'Amazon',
            what: 'America, in red and blue',
            detail: 'Three listings for an election-season gift. The blue one sells; the red one has yet to carry a badge.',
          },
          {
            when: '6 Jul 2026',
            tag: 'Advertising',
            what: 'Meta ads start',
            detail:
              '~32 ads go live under a page called “Spite House Games”, pointing at the $12.99 store price. Amazon revenue that month is $80,420, up from $61,494 in June.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$96,958 — a new non-holiday high',
            detail:
              'Above every month except last December, and on a wider catalogue than last December had. Whatever is driving demand is not the holiday.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Keepa’s badge history shows the shape of a gag gift’s year. December is four Christmases’ worth of a normal month in a single month. January loses 82% of that in four weeks, and the six months after it are the rebuild — which reached a new non-holiday high in August.',
      },
      { type: 'chart' },
      {
        /* Revenue by product, from the source's own monthlySold × buy-box
           price. The rows sum to the headline monthly revenue — the component
           adds them up and says so rather than taking a typed total on
           trust. */
        type: 'breakdown',
        intro:
          'One SKU is the business, and its $6.97 here is a discount — it sells for $12.99 most of the time. The re-cuts at $19.99 are the attempt to sell the same object for more, and two of the $12.99 ones have yet to sell at all.',
        items: [
          { name: 'Go F Yourself! — the original Grown Up Go Fish', asin: 'B0FMGJSSXT', image: deckPhoto('B0FMGJSSXT'), listed: '2025-01-20', sold: 8000, price: 6.97, revenue: 55760 },
          { name: 'Go F Yourself Boomers!', asin: 'B0FLCJSFJP', image: deckPhoto('B0FLCJSFJP'), listed: '2025-08-06', sold: 900, price: 12.99, revenue: 11691 },
          { name: 'Go F Yourself Mom & Dad!', asin: 'B0GVKVZDR7', image: deckPhoto('B0GVKVZDR7'), listed: '2026-04-14', sold: 500, price: 19.99, revenue: 9995 },
          { name: 'Go F Yourself America!', asin: 'B0H1XPC49K', image: deckPhoto('B0H1XPC49K'), listed: '2026-06-03', sold: 400, price: 19.99, revenue: 7996 },
          { name: 'Go F Yourself Jesus Christ!', asin: 'B0FLCSBZ2V', image: deckPhoto('B0FLCSBZ2V'), listed: '2025-08-06', sold: 200, price: 12.99, revenue: 2598 },
          { name: 'Go F Yourself Mom!', asin: 'B0GT64XJVT', image: deckPhoto('B0GT64XJVT'), listed: '2026-04-14', sold: 100, price: 12.99, revenue: 1299 },
          { name: 'Go F Yourself America Blue!', asin: 'B0H1XWG51R', image: deckPhoto('B0H1XWG51R'), listed: '2026-06-03', sold: 50, price: 12.99, revenue: 649.5 },
          { name: 'Go F Yourself America Red!', asin: 'B0H1XM57YZ', image: deckPhoto('B0H1XM57YZ'), listed: '2026-06-03', sold: 0, price: 12.99, revenue: 0 },
          { name: 'Go F Yourself Dad!', asin: 'B0GT69P836', image: deckPhoto('B0GT69P836'), listed: '2026-04-14', sold: 0, price: 12.99, revenue: 0 },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, which is why every row reads n+. Revenue is that band times the buy-box price on the day it was read, so each row is a floor rather than a measurement — and the original deck was on a $6.97 discount from its usual $12.99 that day.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. Profit is revenue less cost of goods, Amazon’s fees and a modelled Amazon ad spend, with storage, returns and overhead all set to zero — so nothing here has been taken out for the things a real month takes out.',
      },

      /* 🚨 THIS SECTION ANSWERS "WHERE DOES THE MONEY COME FROM", not "what
         does a unit cost". It used to argue the fee card — a dollar to print,
         $2.56 to move — which is the same argument Margin breakdown makes
         immediately below it with the supplier quotes and the waterfall behind
         it. Two sections running one argument, and the one holding the
         evidence was second. The cost story now lives once, under Margin
         breakdown; this one is the channel story, which nothing else told. */
      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Four ways into this business are visible and exactly one of them can be sized. Amazon is the whole of the measured revenue on this profile; everything else here is real but unpriced, or has not been looked for.',
      },
      {
        type: 'prose',
        text:
          'Most of the time the two channels agree on what the core deck is worth: $12.99 on their own store and $12.99 on Amazon. When this profile was read, Amazon had it at $6.97 — 46% less — and every revenue figure here is priced at that $6.97, so the numbers describe a month at the discount rather than at the usual price.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Amazon publishes a sales badge; nobody publishes what a Shopify store, a TikTok Shop or a licensing deal takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than quietly counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of an $8.87 order, from the printer to what is left — and the largest single line is not the product, it is moving it. What survives Amazon’s two cuts is about two fifths of the order, because almost none of it goes on ads.',
      },
      {
        type: 'prose',
        text:
          'A deck of cards costs cents to print and cents to ship. Amazon’s fulfilment fee does not care: it prices a box by its size and weight, and this one is 0.87 inches deep, an eighth of an inch over the Small Standard limit, so it pays the Large Standard rate on every order. The table below starts with the printers.',
      },
      {
        /* 🚨 Ordered by track record, not by price: the table's job is to show
           that a deck like this is routinely printed to order by established
           factories. Read from a screenshot of an Alibaba search on 2026-10-11 —
           waithowmuch-research research/spitehouse/suppliers.json keeps every
           listing. The two thin records stay in: they are part of what was
           found. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what the deck costs to make',
        attribution: 'alibaba',
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
        rows: [
          ['Guangzhou Xinyi Printing Co., Ltd', 'Verified PRO · 23 yrs', 'Five stars, no score shown', '8,384', '200–500 pieces', '$0.59–1.60'],
          ['Guangdong Wangjing Card Game Tech Co., Ltd', 'Verified · 7 yrs', '4.5★ from 8', '20', '200–500 sets', '$0.43–1.65'],
          ['Guangdong Sihan Printing And Packaging Co., Ltd', 'Verified · 6 yrs', '5.0★ from 15', '24', '100 sets', '$0.39'],
          /* The make half of the margin's cost of goods: suppliers.json →
             cogsAverage, lowest prices $0.59, $0.43, $0.39. */
          ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(SHG.make)],
        ],
        note:
          'All three are Alibaba Verified and in China, from a search filtered to a 4.5+ supplier rating; none of the listings was marked as an ad. Their decks are other people’s games — affirmation cards, drinking games, a family game — which is the point: printing a custom deck in a box is routine work. Sold counts are Alibaba’s own per-listing counters added up per supplier. The cost to make takes each supplier’s lowest listed price — $0.59, $0.43 and $0.39 — and averages them: the low end, because it is what a production order moves toward. Spite House’s own printer is not public, so this prices the deck as a new seller would buy it.',
      },
      {
        /* The move half of cost of goods, priced from the hero's own box. It
           replaces a flat $0.50 nobody quoted (the dossier's INVENTED row). */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one deck from China',
        attribution: 'freightos',
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '9.5 × 7.0 × 2.2 cm, 0.100 kg', 'The best seller’s own package size (B0FMGJSSXT)'],
          ['Volume', '0.000146 cbm', 'The carton, in cubic metres'],
          ['Rate', '$496.67 / cbm', 'Less-than-container-load, Shanghai → Los Angeles, door to door'],
          ['Shipping, per deck', lineUsd(SHG.freight), '0.000146 cbm × $496.67'],
        ],
        note:
          'The rate is the low end of the quoted band, door to door — customs clearance and delivery included, duty and tariffs excluded — and it prices the retail box rather than a master carton. A box this small is where that matters least: even the top of the band, which prices express services, comes to about 60 cents a deck. The other designs ship in the same size of box.',
      },
      {
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — what one deck costs in Amazon’s warehouse',
        noteColumns: [2],
        columns: ['Line', 'Per deck', 'From'],
        rows: [
          ['Production', lineUsd(SHG.make), 'The printers’ lowest prices, averaged — COGS table above'],
          ['Tariff', lineUsd(SHG.tariff), `ASSUMED: ${SHG.tariffPct}% of production, Section 301 plus the reciprocal rate on China, applied flat`],
          ['Shipping', lineUsd(SHG.freight), 'This deck’s carton at $496.67/cbm — shipping table above'],
          ['Landed cost', lineUsd(SHG.landed), 'What one deck costs before it sells'],
        ],
        note:
          'Where Spite House prints is not public, so the tariff assumes China, like the quotes. No prep or inbound-placement fee is added, so the figure is a floor on that count.',
      },
      {
        /* 🚨 These four lines ARE the model. The margin row is 100% less them,
           and the backend seed builds the profit and ad-spend series from the
           same four (seed-spite-house-games.ts COST_LINES), all computed from
           SHG above. */
        type: 'margin',
        basis: { label: 'Average order', value: SHG.avgOrder },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -SHG.cogsPct,
            amount: SHG.landed,
            detail: `${lineUsd(SHG.make)} to print, ${lineUsd(SHG.tariff)} of tariff and ${lineUsd(SHG.freight)} to ship: ${lineUsd(SHG.landed)} a deck in Amazon’s warehouse, whichever design it is.`,
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            amount: 1.33,
            detail:
              'Amazon’s published Toys & Games rate, a flat 15% with a $0.30 minimum and no price threshold, so a cheap product gets no relief. Keepa reads 15% on the listings.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -SHG.fbaPct,
            amount: SHG.fbaPerUnit,
            emphasis: true,
            /* Keepa product record for B0FMGJSSXT, read 2026-10-11: 95 × 70 ×
               22 mm, 100 g, pickAndPackFee 386 cents at $12.99. Under $10 the
               2026 low-price rate applies: $2.91 + 3.5% surcharge = $3.01. */
            detail: `Size tier: Large Standard. The best seller, B0FMGJSSXT, packs to 3.7 × 2.8 × 0.87 in at 3.5 oz: light enough for Small Standard, but 0.87 in deep against that tier’s 0.75 in limit. In September 8,000 of them sold at $6.97, under $10, where Amazon’s low-price rate is $3.01; at the usual $12.99 it is $3.86, and the other designs pay $3.86–3.99. About ${lineUsd(SHG.fbaPerUnit)} a deck on average — more than the printer, the boat and the tariff put together.`,
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -SHG_AD.ratePct.central,
            amount: SHG_AD.products[0].perUnit,
            detail: `MODELLED, not observed: about ${monthUsd(SHG_AD.monthlyUsd.central)} a month (${shgBand(SHG_AD.monthlyUsd)}) of Amazon Sponsored Products, nearly all of it on their own name. Automatic campaigns, product targeting, Sponsored Brands and Display are invisible to the method. Their Meta ads point at their own store, not at Amazon, and are not in this line.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/spite-house-games/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/spite-house-games/advertising/' },
            ],
          },
        ],
        note:
          'Before storage, returns, removals, inbound placement, the October 15 to January 14 peak fulfilment surcharge, software and owner pay, none of which is modelled. That surcharge lands on the weeks that carry this business’s year. A ceiling on profit, not profit.',
      },
      {
        type: 'prose',
        text:
          'The shape of it is unusual: on most products the factory is the largest cost and the marketplace takes a slice. Here it is the other way round. Fulfilment alone is several times the cost of goods, because Amazon prices moving a box by its size and weight rather than by what is in it — and a deck of cards costs about the same to pick, pack and ship whether it sells for $6.97 or $19.99.',
      },
      {
        type: 'callout',
        text:
          'Which is the argument for the usual $12.99 and the $19.99 re-cuts. The same object, a fulfilment fee 85 cents higher than at the discount, at up to nearly three times the discounted price — almost every dollar of that increase lands in margin.',
      },
      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'One TikTok account, started seven weeks before the first listing, is carrying this business — because at an $8.87 order, a sale bought on a generic search costs more than the sale is worth.',
      },
      {
        type: 'prose',
        text:
          /* Bids: Amazon's suggested exact bids on the 15 biggest generic
             searches, 2026-10-11 (adspend/amazon-ads-bids.json), about $0.85 on
             average. Conversion: the median of competing listings on the deck's
             searches, 5.96% over 44 Jungle Scout rows (validation.json). */
          'The brand is built on content rather than ads, and it is arithmetic rather than taste. On the generic searches that would find new buyers, Amazon suggests about $0.85 a click — $0.97 on “card games”, $0.44 on “gag gifts” — and competing listings convert about 6% of their clicks, so a sale won through those ads costs around $14 against an $8.87 order. They do not buy those searches. The one place they pay is their own name, where the shopper already wants the deck.',
      },
      {
        type: 'prose',
        text:
          'The audience is real, and it is one channel. The TikTok account was created on 30 November 2024 — seven weeks before the first Amazon listing — and now carries 45.4K followers and 5.2M likes across 359 videos. Instagram mirrors it at 20K, and the YouTube channel, which its own description calls “literally phoning it in”, has 46 subscribers.',
      },
      {
        type: 'prose',
        text:
          'The most suggestive date on the record is 20 October 2025, when a post did 549,228 likes — the month it landed in and the month after it are the two steepest climbs on the chart above.',
      },
      {
        type: 'prose',
        text:
          'They started running Meta ads on 6 July 2026 — about 32 of them, pointing at the store — and Amazon revenue rose in each of the three months that followed. That is a correlation with a date on it rather than a proven cause, and it is the first thing to ask them about.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot tell us is whether the audience converts. The follower counts and the visit estimates are real numbers about attention, and nothing public ties either of them to an order.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-11, read at
           New York 10001. The off-Amazon point is the ad libraries' (2026-09-09). */
        type: 'strategy',
        label: SHG_AD.strategy,
        points: [
          'Nearly all of the modelled Amazon ad spend, $384 of about $399 a month, is their own name — mostly as shoppers misspell it: “go fucl yourself card game” draws 7,907 searches a month, and they hold 71% of its sponsored results.',
          'None of the fifteen biggest generic searches is bought: no ad of theirs on “card games”, “gag gifts” or “party games” from New York. They rank without paying instead, #1 on “games for adults” and “adult card games”.',
          'Off Amazon they buy attention, not search: about 32 Meta ads to their own store from 6 July 2026, and no paid Google keyword in seventeen months.',
          'Ads on 32 of the 848 keywords their listings rank for. Modelled from outside the account, so a floor.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: SHG_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the best-selling deck’s listing: exact-match monthly searches and its best organic position. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among their listings. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, and on these fifty it is ${topSpend(SHG_TOP_KEYWORDS) ? `${monthUsd(topSpend(SHG_TOP_KEYWORDS))} of the ${monthUsd(SHG_AD.monthlyUsd.central)}` : `none of the ${monthUsd(SHG_AD.monthlyUsd.central)}`}: the money sits on their own name, a smaller search than any of these — the next table lists every keyword they pay for. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(SHG_AD_KEYWORDS, SHG_AD_KEYWORDS_TOTAL, SHG_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'The big searches are free to them. The deck ranks first on “games for adults” and “adult card games”, second on “adult games” and fifth on “card games for adults” — between them more than 120,000 searches a month — and not one of those pages carried an ad of theirs when it was read from New York. Amazon would charge them about a dollar a click to buy their way higher, on an $8.87 order.',
      },
      {
        type: 'prose',
        text:
          /* serp.json, 2026-10-11 at 10001: sponsored #1–2 on four brand searches
             and #1 on the fifth, every one a re-cut (Mom & Dad, Mom, Dad, America,
             America Red, Boomers); the original deck organic #2–3 on all five;
             IEYMLRN's "Adult Go Fish" organic #4–5 on three. */
          'What they do buy is their name, and what they put on it is not the best seller. On “go f yourself card game” and four variations of it read from New York, the first sponsored slot was always theirs, and on four the second too — and every one of those ads was a re-cut: Mom & Dad, Mom, Dad, America, Boomers, and America Red, which has yet to carry a sold badge. The original deck sat just below them, second or third, without paying. The shopper typing the name already wants a deck, so the ad is spent introducing the new ones. Directly under them sits a rival’s “Adult Go Fish” deck, which is the search a copy of this business would try to buy first.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(SHG_AD.monthlyUsd.central)} a month, ${linePct(SHG_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 32 of the 848 keywords their listings rank for — Jungle Scout share of voice; the first sponsored slot on all five brand searches read from New York, always a re-cut, and none on the fifteen biggest generic ones',
            flag: true,
            note:
              `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid; band ${shgBand(SHG_AD.monthlyUsd)}. The click rate, 3% (1.8–4.5%), is BORROWED from another brand: no advertiser here could be measured mainly through its ads. On their own name the model is capped at the clicks Jungle Scout saw them take. A floor — product-page ads, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. Amazon publishes no bill.`,
          },
          {
            label: 'Meta (Facebook and Instagram)',
            href: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=spitehousestudios&search_type=keyword_unordered&media_type=all',
            value: 'Not estimable',
            counted: '~32 active US ads, first seen 6 July 2026',
            flag: true,
            note:
              'The ads went live under a page named exactly like the Amazon store and point at the $12.99 store price, not at Amazon — so they are not in the margin, which is the Amazon business. Amazon revenue went $61,494 in June, $80,420 in July and $96,958 in August, the best non-holiday month on record. Meta publishes the creative and the dates and never the money. A correlation with a date on it, not a cause.',
          },
          {
            label: 'Google Ads',
            value: '$0',
            counted: '0 paid keywords across 17 months of history',
            note:
              'Not “we could not find any”. The paid series reads zero for every month on record, April 2025 to August 2026 — they have never bought a search click on Google. Set beside the Meta ads, the strategy reads as buying attention rather than intent.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, row for row — built from
           SHG_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ['Amazon Sponsored Products — the margin line', monthUsd(SHG_AD.monthlyUsd.central), linePct(SHG_AD.ratePct.central), lineUsd(SHG_AD.products[0].perUnit), `Modelled: ${shgBand(SHG_AD.monthlyUsd)}`],
        ],
        note:
          'What the Margin breakdown takes off for advertising. Per sale is that share of the $8.87 average order. The Meta ads point at their own store, whose sales are not in this profile’s revenue, so neither is their cost.',
      },
      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'The half Amazon cannot see — and on this business the half that makes the demand, because at an $8.87 order there is no budget to buy it.',
      },
      /* The same chips the overview opens with, repeated on purpose. Every
         section here is its own page, so a reader who arrived on this one
         from search has not seen them — and this is the page that spends
         several hundred words on an audience whose accounts would otherwise
         be two navigations away. Pulled from the DB record, not authored, so
         the two rows cannot disagree. */
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The site figures are smaller than they first look. Similarweb reports 38.7K visits, but the label on that number is a three-month total rather than a monthly one — so the store runs about 12.9K visits a month, and is down 39% on the month before. 2,859 of those arrive from Google, almost all of them landing on a single how-to-play page.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Own-site visits', value: '~12.9K / mo', note: '38.7K reported over three months, not one' },
          { label: 'Month on month', value: '−39%', note: 'Similarweb, read 9 Sep 2026' },
          { label: 'Of which organic search', value: '2,859 / mo', note: 'August 2026, across 220 ranking keywords' },
          { label: 'Organic peak', value: '8,257 / mo', note: 'April 2026 — down 65% by August' },
          { label: 'Google Ads spend, ever', value: '$0', note: 'Zero paid keywords in 17 months' },
          { label: 'Domain authority', value: '6', note: '53 backlinks from 42 domains' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'TikTok — @spitehouse_games',
            href: 'https://www.tiktok.com/@spitehouse_games',
            value: '45.4K followers · 5.2M likes',
            flag: true,
            note:
              'The engine. 359 videos, and the account was created on 30 November 2024 — six weeks after the domain and seven weeks before the first Amazon listing. The content came first and everything else was built behind it.',
          },
          {
            label: 'Instagram — @spitehouse_games',
            href: 'https://www.instagram.com/spitehouse_games/',
            value: '20K followers · 245 posts',
            note:
              'The mirror, at less than half TikTok’s following. Its pinned post — 20 October 2025 — carries 549,228 likes, and Amazon revenue went from $69,700 in October to $278,800 in November. Note the handle: @spitehousegames without the underscore is an unrelated Seattle studio.',
          },
          {
            label: 'YouTube — @SpiteHouseStudios',
            href: 'https://www.youtube.com/@SpiteHouseStudios/about',
            value: '46 subscribers · 83 videos',
            note:
              'Joined 25 June 2025, and the channel’s own description says it is “reposting all of my viral TikTok content, literally phoning it in”. 83 videos against 46 subscribers is what a channel looks like when nobody is pretending otherwise.',
          },
          {
            label: 'Own store — spitehousestudios.com',
            href: 'https://spitehousestudios.com/',
            value: '~12.9K visits / mo',
            note:
              'Shopify, 37 products from $5.99 to $39.99, live since 4 April 2025. The core deck sells here for $12.99, the price it usually carries on Amazon too — though Amazon had it at $6.97 when this was read.',
          },
          {
            label: 'Organic search — 220 keywords, one page',
            href: 'https://spitehousestudios.com/pages/go-fuck-yourself-rules',
            value: '2,859 visits / mo',
            note:
              'Six of their top ten keywords land on one page: the how-to-play rules. It ranks #2 for “go f yourself card game” against 27,100 searches a month — but rules-page intent is people who already own the game, and a single URL carrying the whole organic position is a single point of failure.',
          },
          {
            label: 'Linktree — SpiteHouseGames',
            href: 'https://linktr.ee/SpiteHouseGames',
            note:
              'The TikTok bio’s destination, joined April 2025. It routes to a bundle builder, an expansion-notification signup, a Walmart listing for a USAopoly edition of the game, and a contact address. No Facebook link — the store’s own story page says they will not use it.',
          },
          {
            label: 'wouldyoukillhitler.com',
            href: 'https://wouldyoukillhitler.com/',
            note:
              'Registered 20 February 2021, and still the support address on every legal page of the newer store. An earlier venture folded into this brand — its game is on the shelf here as “I Would Kill Hitler” at $29. The operator has five years of history, not eighteen months.',
          },
        ],
      },
      {
        /* 🚨 Best-seller rank, not Amazon keyword positions, and the note says
           why: Amazon publishes no search volumes and localises its results to
           whoever is looking, so a scraped keyword rank measures the scraper
           as much as the listing. BSR is printed on the listing and is the
           same number for every viewer.

           The hero row is the 10 Sep 2026 reading, which is the same one the
           additional-metrics grid quotes. The day before it read #484 and #26.
           Both are real; the note carries the spread rather than letting the
           page state two ranks for one listing. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Toys & Games', 'Dedicated Deck Card Games', 'Rating'],
        rows: [
          ['Go F Yourself! and its four re-cuts', '#190', '#9', '4.5★ over 2,958 ratings'],
          ['Go F Yourself Mom!', '#14,665', '#315', '4.6★'],
        ],
        note:
          'Rank rather than keyword position, because Amazon publishes no search volumes and localises its results to whoever is looking — a scraped keyword rank is worth less than it appears, while best-seller rank is printed on the listing and is the same number for everyone. It moves daily: the hero listing read #190 and #9 on 10 September 2026 and #484 and #26 the day before. Five SKUs share one parent listing, which is why they share a rank.',
      },
      {
        type: 'table',
        caption: 'Search presence off Amazon',
        columns: ['Term', 'Where', 'Rank', 'Volume / mo'],
        rows: [
          ['go f yourself card game', 'Google', '#2', '27,100'],
          ['go f yourself', 'Google', '#3', '18,100'],
          ['go f yourself game', 'Google', '#5', '14,800'],
          ['gfys', 'Google', '#12', '5,400'],
          ['go f yourself cards', 'Google', '#5', '2,400'],
          ['go f yourself card game near me', 'Google', '#3', '1,600'],
          ['how to play go f yourself', 'Google', '#2', '1,300'],
          ['where to buy go f yourself card game', 'Google', '#6', '1,000'],
          ['spite house games', 'Google', '#1', '880'],
        ],
        note:
          'Read 9 September 2026, across 220 ranking keywords. Every term they hold is a branded one — the phrase, the abbreviation, the store name — and nothing generic ranks at all. Volumes are a keyword tool’s model built from rank data and clickstream, not a count Google published.',
      },
      {
        type: 'callout',
        text:
          'Two of these numbers are attention and none of them is a sale. The follower counts, the visit estimates and the search volumes are all real measurements of interest, and nothing public connects any of them to an order on Amazon.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Spite House Studios LLC' },
          { label: 'Seller', value: 'Spite House Games', note: 'Merchant A1JV6NB17MZ485' },
          { label: 'Trading since', value: '2021', note: 'The account, not this catalogue' },
          { label: 'Registered address', value: 'Harrisonville, MO, US', note: '117 Lexington At. Ste 100, 64701-2444' },
          { label: 'Seller feedback', value: '86%', note: 'Over 66 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '20 Jan 2025' },
        ],
      },
      {
        type: 'prose',
        text:
          'The account predates this catalogue as wouldyoukillhitler.com, an earlier venture whose address still answers this store’s support mail. It is a young seller account by rating count: 66 seller ratings against 2,958 product reviews on a single listing, 14 of those in the last 30 days.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the buy-box seller on the brand’s best-selling products.',
      },
      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve net profit, and it prices the Amazon business alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'The Shopify store and the TikTok Shop are excluded. Both are real — the store’s own FAQ names them — but neither can be sized from outside without stacking a traffic estimate on an assumed conversion rate on an assumed order value, and the honest range straddled the band boundary that decides whether it scores at all. This figure is the Amazon business.',
      },
      {
        type: 'prose',
        text:
          'The positives are what the business owns: its own game, its own designs, an enrolled brand and the reviews the hero listing has piled up since January 2025. The negatives are all one shape — concentration. Every priced listing sits on Amazon US, a quarter of the year’s revenue arrives in December, and the seller feedback record is thin enough to notice.',
      },
      {
        type: 'prose',
        text:
          'Four of these are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers in the model, taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple — the widest step it has. Brand Registry is firmer: Amazon gates the brand store and the A+ content on the listing behind enrolment. All four are the first things to put to the owner.',
      },

      /* The least it costs to find out whether the deck sells: the validation
         test, read off the published "to start" estimate (build-ecom-biz-page
         §3a), like White Mountain's. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether it sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },

  'white-mountain-puzzles': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — the backend's White Mountain headline seed, from
       waithowmuch-research research/white-mountain-puzzles/headline.json —
       and the page reads them from the row alone. This entry carries only the
       image beside them. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/white-mountain-puzzles/09c010332c37bfeaaa1bc751577f2d296a90954494532d675d3c5147657e5565.png',
      /* The best seller, but only by a hair: it is 2.6% of the month, which is
         the whole point of this profile. */
      image: {
        src: 'https://storage.googleapis.com/verifiedmargins/products/white-mountain-puzzles/9a9f54e3fe2b3a497d2aa1b81f09e912f094a3c44f4cbf3132dfc67ca52cfc6c.jpg',
        alt: 'The “Did You Know” 1,000-piece jigsaw puzzle box by Steve Cameron — a collage of retro trivia signs, marked Made in USA. White Mountain’s best-selling Amazon listing',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record, like Spite House's. Their own
             brand, their own commissioned artwork, their own listings — and,
             by their own account, made in America. The model has no "own
             manufacturing" answer; private label is the nearest one that
             describes what transfers in a sale. */
          primaryMethod: 'private_label',
          /* Broad, and not close. 480 priced listings, the top ten 18% of
             revenue and the top fifty 49%; the best seller is 2.6%. */
          catalogStructure: 'broad',
          /* Level 3. Commissioned art and an oversized 24 × 30 inch
             1,000-piece format are real, visible changes; there is no tooling
             nobody else has — a random-cut die on blue chipboard. The case for
             level 2 is that a jigsaw is a commodity object with a picture on
             it, and the step is worth 0.55 of the multiple. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ, not an inference: the Brand Store at /stores/WhiteMountain
             is gated behind enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the oldest listing still in the catalogue, not 1978. */
          sellingSince: '2011-08-18',
          /* 🚨 The top 20 listings by revenue, not one hero. On Spite House one
             listing was 62% of revenue and could stand for the catalogue; here
             the best seller is 2.6%, and its 308 reviews would score this
             business as having almost no review moat. 3,492 is still a floor —
             481 listings are not in it. */
          reviewTotal: 3492,
          ratingWeighted: 4.64,
          sellerFeedbackPct: 99,
          /* RULE 2, and 🚨 deliberately NOT moved to 60 when Amazon Europe went
             onto the chart on 2026-09-30. This factor prices the risk of one
             Amazon storefront carrying everything, and it is worth -0.45 of
             the multiple. What was MEASURED is that Amazon US carries all of
             the Amazon revenue: no seller account on the UK, Germany, France,
             Italy or Spain, and no badged listing on any of them. Relaxing the
             penalty for an ESTIMATED European line would pay this business a
             multiple for a channel the research could not find — the same
             trade RULE 3 refuses for off-Amazon revenue. The Valuation prose
             and the board note both say so out loud. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* December against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 22.31,
          /* RULE 3: offAmazonSharePct unset. Wholesale, the store in Jackson and
             the Shopify site are real and unsized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple, across the three channels on the chart — Amazon US measured, Amazon Europe and their own store estimated. Wholesale and the Jackson shop are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '501', note: '480 priced, 199 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Toys & Games › Puzzles › Jigsaw Puzzles',
        note: 'Best seller #12,601 in Toys & Games',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-20 figures, not the hero listing's, and so NO `info` key: the
         shared ⓘ copy for reviews and rating describes one best-selling
         listing, and on a catalogue where that listing is 2.6% of revenue it
         would describe a number this page deliberately does not show. */
      { label: 'Product reviews', value: '3,492', note: 'Across the top 20 listings — a floor' },
      { label: 'Product rating', value: '4.6★', note: 'Review-weighted, top 20 listings' },
      { label: 'Seller feedback', value: '99%', note: 'Over 10,668 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Made in America, by their own account', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, low volume each', note: 'Top ten listings are 18% of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon, own store, wholesale', note: 'Amazon US measured; Amazon Europe and the store estimated', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The one channel with a public number behind it: 501 listings, 199 of them carrying Amazon’s sold badge. It is the measured base the other two channels on this page are modelled from.',
      },
      'amazon-international': {
        status: 'yes',
        note:
          'Measured, and the measurement is an absence: a seller account on Amazon Canada with 86 ratings and no badged listing, no account on the UK, Germany, France, Italy or Spain, and zero badged listings on any of those five. Amazon Europe still sits on the chart as an estimate, labelled as one — see Revenue.',
      },
      'own-store': {
        status: 'yes',
        note:
          'whitemountainpuzzles.com, on Shopify: 601 products at a median of $19.99 — the same price the best sellers carry on Amazon. Shopify publishes no sales, so the store’s line on the chart is estimated from a visit count and an assumed conversion rate.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'Probably the oldest channel and possibly the largest. A retailer programme with a one-case minimum of twelve puzzles, a spinner-rack scheme, a wholesale portal and trade shows, and “thousands of accounts” by their own account. Nothing public sizes it.',
      },
      'vendor-1p': {
        status: 'no',
        note:
          'Amazon itself offers none of the 255 listings carrying their manufacturer name outside the storefront, and three of 482 inside it.',
      },
      // tiktok-shop, other-marketplace and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record. At about $6.02 a unit it is the largest line in the cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 501 listings between FBA and FBM.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and commissioned artwork, on listings no other seller carries a badge on.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Every puzzle is “manufactured in America”, by their own pages — which does not say whose factory. Left open rather than read as yes.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/WhiteMountain, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'White Mountain Puzzles has made jigsaw puzzles in Jackson, New Hampshire, since 1978, and the founders’ families still own it. Three channels are modelled here — Amazon in the United States, Amazon in Europe and their own store — and only the first of them is measured.',

    blocks: [
      { type: 'heading', text: 'A long tail, not a hit' },
      /* Four paragraphs, one job each: the range, what it is organised by,
         what buyers think of it, and how fast it moves. Every count here is a
         reading dated by the page's snapshot — the catalogue mix from the Keepa
         pull, the collections from the store's public collections.json on
         2026-09-15. No live headline figure is typed in. */
      {
        type: 'prose',
        text:
          'About five hundred puzzles are listed on Amazon. Most are 1,000 pieces at $19.99, but the range runs down through 500- and 300-piece puzzles to a set of six 100-piece minis — and by revenue the 1,000-piece puzzles are about 83% of the Amazon month and the 500-piece ones 14%. None of them is the business on its own, and that shape is the most unusual thing about it.',
      },
      {
        type: 'prose',
        text:
          'Themes organise the catalogue: nostalgia and vintage signs, trivia collages, state and regional puzzles, food, animals, beach scenes and famous places, much of it painted by a stable of named artists such as Charlie Girard, Lois Sutton and Steve Cameron. A calendar sits on top of the themes — Christmas, Halloween, autumn, winter, Easter, Valentine’s Day, Mother’s Day and the Fourth of July each have their own collection on the company’s site — and puzzles are graded from beginner to advanced.',
      },
      {
        type: 'prose',
        text:
          'Buyers rate them highly. Eighteen of the twenty best-selling Amazon listings sit at 4.7 stars or above, the twenty together carry 3,492 reviews at a review-weighted 4.6, and the seller account holds 99% positive feedback over more than ten thousand ratings.',
      },
      {
        type: 'prose',
        text:
          'And the catalogue keeps moving. Their own site runs a New Puzzles section — 87 titles, 62 of them added in 2026 so far, the latest on 24 August — and a Coming Soon shelf already stocked with this year’s Christmas puzzles. Amazon shows the same cadence: 68 new listings in 2026.',
      },
      /* The brand's own banner, closing the overview on the shape the first
         paragraph describes. A 1600px JPEG of the screenshot, in the bucket. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/white-mountain-puzzles/644a2d58dfe78a138339c8a1d7b63a50cbcbf645f5f475566569243575795d04.jpg',
            alt: 'White Mountain’s “Shop by Piece Count” banner: tiles for 1,000-, 500- and 300-piece puzzles, each showing box art such as Family Retreat, Harvest Market and Card Games',
          },
        ],
        caption: 'White Mountain’s own banner. The range is shopped by piece count first, then by the theme on the box.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Forty-eight years as a company and fifteen on Amazon — where every year is shaped by one December.',
      },
      {
        /* Oldest first. Year-only entries are the company’s own claims with no
           day attached; they stay on this list and off the overview chart. */
        type: 'timeline',
        items: [
          {
            when: '1978',
            tag: 'Brand',
            what: 'A poster company starts in New Hampshire',
            detail:
              'Founded by Cronan Minton and Ted Wroblewski, by the company’s own account, and later handed to their sons Sean and Colin. It became White Mountain Puzzles, and the families still own it.',
          },
          {
            when: '12 Aug 1999',
            tag: 'Web',
            what: 'whitemountainpuzzles.com registered',
            detail: 'From the domain record. The first archived capture of the site follows eight months later.',
          },
          {
            when: '7 Apr 2000',
            tag: 'Web',
            what: 'The Wayback Machine’s first capture of the site',
          },
          {
            when: '18 Aug 2011',
            tag: 'Amazon',
            what: 'The oldest listing still live: Nostalgic Labels',
            detail:
              'A 1,000-piece candy-wrapper collage. Fifteen years later it still sells enough to carry a badge.',
          },
          {
            when: '16 Feb 2018',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
            detail:
              'The store now carries 601 products at a median of $19.99 — the same price the best sellers carry on Amazon.',
          },
          {
            /* The showcase was held on 23 Jul 2018 (CNBC carried it live that day). */
            when: '23 Jul 2018',
            tag: 'Brand',
            what: 'Invited to the White House Made in America Showcase',
            detail: 'One company from each state; this one represented New Hampshire, by its own About page.',
          },
          {
            when: '29 Aug 2018',
            tag: 'Amazon',
            what: 'Mini Cereal Boxes goes up',
            detail: 'Six 100-piece puzzles at $17.99, and eight years later the second-best seller in the catalogue.',
          },
          {
            when: '2021',
            tag: 'Brand',
            what: 'Among the five fastest-growing private companies in New Hampshire',
            detail: 'By the company’s own About page.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '$893,712 on Amazon US — December',
            detail: 'The first Christmas in Amazon’s badge history, and already the biggest month of its year.',
          },
          {
            when: '11 Oct 2024',
            tag: 'Amazon',
            what: 'Did You Know and Crazy State Laws, on the same day',
            detail:
              'Now the first and third best sellers. Ten of the fifteen best-selling listings today went up on or after this date.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '$1,309,574 on Amazon US — December',
            detail: 'Nearly six times the September before it, which at $226,000 is the lowest month in the three years.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: 'Amazon US in November: $948,912',
            detail: 'Twice October, on the way to December.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$1,526,950 on Amazon US — December',
            detail: '76,800 puzzles, three times June, and 22% of the whole year in one month.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: 'January falls 65%',
            detail: '$526,215 on Amazon US — and still above six of the eight months that follow it.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: 'Amazon US’s low for the year: $246,072',
            detail:
              'Only 150 listings carried a badge that month, against 224 in June. A listing that dips under Amazon’s threshold of roughly 50 a month counts as zero, so part of this trough is the floor rather than the business.',
          },
          {
            when: '2026',
            tag: 'Brand',
            what: 'On USA Today’s reader-voted lists for customer service and online stores',
            detail: 'By the company’s own About page.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The chart is three channels added together, and only one of them was counted. Amazon US is measured — each month end’s sold badge on every listing, priced at the buy box, back to September 2023 where Amazon’s badge record begins. Amazon Europe is an estimate, set at 40% of Amazon revenue against the United States’ 60%. Their own store is an estimate too: a monthly visit count, a 3% conversion rate and the $19.99 shelf price. Both estimated lines are held at a fixed share of the measured one, so all three move with the same season.',
      },
      {
        type: 'prose',
        text:
          'And the season is the shape of the whole year. On Amazon US the three Decembers in the record ran $893,712, $1.31M and $1.53M, each January gave back between 43% and 67% of it, and outside November to January that catalogue moves between roughly $226,000 and $571,000 a month. The older months are the softer floor — a puzzle discontinued since is not in today’s catalogue and counts as zero — so some of the climb between those Decembers is the method rather than the business. Of each month about two-fifths is kept, before returns and overhead.',
      },
      { type: 'chart' },
      {
        /* 🚨 The per-marketplace RING was removed on 2026-09-30, and it had to
           go. Its legend prices each share off latestMonthlyRevenue, and that
           row is now three channels rather than Amazon revenue alone
           (types.d.ts says so on the block), so every slice would have printed
           inflated. What replaces it is a channel split that matches the model
           and puts each line's tier on the line — no ring, and nothing here
           claims a measured share. The Amazon-marketplace concentration the
           valuation scores is a separate, still-measured fact; see
           valuation.inputs.derived. */
        type: 'channels',
        caption: 'Where the revenue comes from',
        items: [
          {
            label: 'Amazon United States — about 53% of the month',
            value: 'Measured',
            counted:
              '199 listings carrying Amazon’s “bought in past month” badge, priced at the buy box',
            flag: true,
            note: 'The one counted channel, and the base the other two are computed from.',
          },
          {
            label: 'Amazon Europe — about 35% of the month',
            value: 'Estimated',
            note:
              'Modelled at 40% of Amazon revenue against the United States’ 60%. Nothing here was counted, and what was counted points the other way: no White Mountain seller account on the UK, Germany, France, Italy or Spain, no badged listing on any of them, and their own international page sending European buyers to a distributor in Staffordshire.',
          },
          {
            label: 'Their own store — about 12% of the month',
            value: 'Estimated',
            counted: '147,663 visits a month — Similarweb',
            note:
              'Those visits at a 3% conversion rate and the $19.99 shelf price. The visit count is a reading; the conversion rate is an assumption, and Shopify publishes no sales.',
          },
        ],
        note:
          'Shares of every month on the chart, not just the latest — the two estimated lines are held at a fixed share of the measured one. Wholesale and the shop in Jackson are real channels and are in none of this.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The
           rows sum to the AMAZON US part of the month, which is all they ever
           were; since 2026-09-30 that is about half of the revenue row, so the
           block is marked `partial` (SKILL §2) and check-profile holds the
           rows to no MORE than the month rather than equal to it. The table's
           own total line says what the rows add up to, so nothing on the page
           claims they are the whole of it. */
        type: 'breakdown',
        partial: { of: 'Amazon US — the one measured channel of the three on the chart' },
        intro:
          'These rows are the Amazon US month, the measured channel, and not the whole of the chart above. Inside it no listing is more than 3%: the ten best sellers are 18% of Amazon US revenue and the top fifty 49%, and the rest is a tail of puzzles each selling a few hundred a month or fewer.',
        items: WHITE_MOUNTAIN_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, which is a band — hence n+. Revenue is that band times today’s buy box, so every row is a floor. All 199 badged Amazon US listings are here and they sum to the Amazon US part of the month; the estimated Amazon Europe and own-store lines are not itemised and are in none of these rows. 281 more priced US listings carry no badge, each under roughly 50 a month, and count as zero.',
      },
      {
        type: 'callout',
        text:
          'One channel counted and two modelled: the counted part is a floor, and the profit over all three is a ceiling. Margin breakdown has the rest.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Four channels are visible — Amazon in the United States, Amazon in Europe, their own store and wholesale — and only the first publishes anything that can be counted.',
      },
      {
        type: 'prose',
        text:
          'Unusually, the channels agree on price. The best sellers are $19.99 on Amazon and $19.99 on whitemountainpuzzles.com, and their retailer page carries an internet sales policy adopted “to preserve the recognized value of our products”. No reseller undercuts them on Amazon either: 255 listings outside their storefront carry the manufacturer’s name, and not one sells enough to show a badge.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store or a wholesale book takes — the store’s line on the chart is modelled from a visit count, and wholesale is not on the chart at all — so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of an average sale across the three channels, down to the three-eighths of it that is left — after Amazon’s two cuts, which on an Amazon order take more than two and a half times what the puzzle costs to make and move.',
      },
      {
        type: 'prose',
        text:
          'A 1,000-piece puzzle is a big box for a $20 product, and Amazon prices fulfilment by size and weight rather than by price: about $6.02 to pick, pack and ship each one. Add the 15% referral fee and Amazon takes 46% of every Amazon sale before the puzzle itself is paid for. The lines below dilute those two, because the eighth of revenue that comes through their own store pays Amazon nothing — it pays a card processor about 4.4% instead.',
      },
      {
        type: 'prose',
        text:
          'Making the puzzle is the cheap part. Three verified factories in China list a custom-printed 1,000-piece puzzle on Alibaba at $0.50–3.69 a unit, from minimums of 200 or 500 — a first order a new seller can actually place — and the longest-standing has been on Alibaba for 18 years and sold more than 70,000. Their lowest prices average $1.26 a puzzle, and that is the cost to make one below.',
      },
      {
        /* 🚨 Ordered by track record, not by price: the table's job is to show
           that this product is routinely made to order by established
           factories, so the supplier a buyer would trust first leads. Dongguan
           Senfutong stays in with its one sale, because a thin record is part
           of what was found. Read from a screenshot of an Alibaba search on
           2026-09-15 — waithowmuch-research
           research/white-mountain-puzzles/suppliers.json keeps every listing. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what a 1,000-piece puzzle costs to make',
        attribution: 'alibaba',
        /* No Lead time column: the screenshot does not show one, and Alibaba
           serves a captcha to anything but a person's browser. It joins the
           end of the columns if a listing's lead time is ever read. */
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
        rows: [
          ['Shenzhen Senfutong Paper Co., Ltd', 'Verified · 18 yrs', 'No rating · 200+ store reviews', '70,837', '500 sets', '$1.59–3.69'],
          ['Dongguan Tongheng Printing Co., Ltd', 'Verified · 12 yrs', '5.0★ from 8 · 300+ store reviews', '11,889', '200 pieces', '$0.50–1.79'],
          ['Dongguan Senfutong Paper Co., Ltd', 'Verified · 10 yrs', '4.8★ from 12 · 50+ store reviews', '1', '500 sets', '$1.69–2.30'],
          /* The make half of the margin's cost of goods. Worked in
             suppliers.json → cogsAverage: lowest prices $1.59, $0.50, $1.69. */
          ['Average lowest price — the cost to make used below', '', '', '', '', '$1.26'],
        ],
        note:
          'All three are Alibaba Verified, FSC-certified and in China, and every listing was a sponsored result on a search filtered to minimums of 1,000 or fewer. Sold counts are Alibaba’s own per-listing counters added up per supplier. The cost to make takes each supplier’s lowest listed price — $1.59, $0.50 and $1.69 — and averages them: the low end, because it is what a production order moves toward. The two Senfutongs share a name and may be related.',
      },
      {
        /* The other half of cost of goods. It used to be a flat $1.00 nobody
           quoted; this prices the actual carton against a dated sea-freight
           rate, and the "to start" section reads these same numbers rather
           than restating them. */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one puzzle from China',
        attribution: 'freightos',
        /* "Where it comes from" is a sentence, so it reads left; the rest of
           the table is figures and stays right. */
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '31.0 × 25.7 × 5.4 cm, 0.81 kg', 'The listing’s own package size (B0DJWLQR6W)'],
          ['Volume', '0.00430 cbm', 'The carton, in cubic metres'],
          ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
          ['Shipping, per puzzle', '$2.14', '0.00430 cbm × $497'],
        ],
        note:
          'The rate is the low end of a $993–$8,482 estimate for a 2 cbm shipment; the top of that band prices express services a first order would not buy. It is door to door — customs clearance and delivery included, which is why it runs several times the port-to-port rates freight guides quote — and excludes duty and tariffs. A different product in this catalogue ships in a different box, so it would carry a different figure.',
      },
      {
        /* Neither a supplier quote nor a freight quote: the sum of both, and the
           figure the cost-of-goods line below actually uses. Its own small table
           because burying it in the shipping one implied it was a shipping
           number. Three rows, no source logo — it is derived from the two tables
           above, not read from anywhere. */
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — production plus shipping, per puzzle',
        noteColumns: [2],
        columns: ['Line', 'Per puzzle', 'From'],
        rows: [
          ['Production', '$1.26', 'The three Alibaba suppliers’ lowest prices, averaged — COGS table above'],
          ['Shipping', '$2.14', 'This puzzle’s carton at $497/cbm — shipping table above'],
          ['Landed cost', '$3.40', 'What one puzzle costs in Amazon’s warehouse, before it sells'],
        ],
        note:
          'This is the figure the cost-of-goods line below uses: $3.40 is 17.418% of the $19.52 average sale across the three channels. It covers making the puzzle and getting it to the warehouse — not the Amazon fees on the sale itself, which are their own lines.',
      },
      {
        /* 🚨 These five lines ARE the model. The margin row is 100% less them
           — 38.978% — and the backend seed builds the profit and ad-spend
           series from the same five numbers (COST_LINES). Change one, change
           both, and keep three decimals: check-profile compares the block
           against every month of the series.

           Each is a per-channel rate times that channel's share of TOTAL
           revenue (Amazon 87.800%, their own store 12.200%), except cost
           of goods, which is $3.40 a puzzle on every channel ÷ $19.52:
             referral    15% of Amazon revenue        → 13.170
             FBA         31% of Amazon revenue        → 27.218
             card fees   4.4% of store revenue        →  0.537
             advertising 0.272% of Amazon + 20% of store  →  2.679
               (Amazon: amazon-adspend-spy, research/white-mountain-puzzles/
               adspend.json 2026-10-07, $1,040 a month central → 0.239. It was
               an assumed 2% → 1.756, and the line 4.196, until then.)
           Advertising stays ONE line; its Amazon/off-Amazon split belongs to
           the Advertising section's channels, not here. */
        type: 'margin',
        /* The three channels blended: $19.46 on Amazon (Sep 2026 revenue ÷
           units) at 87.800% of revenue and $19.99 on their own store at
           12.200%. Not a reading — a weighted average of one reading and one
           shelf price. */
        basis: { label: 'Average sale, all three channels', value: WMP_AVG_SALE },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            /* $3.40 landed ÷ the $19.52 blended sale = 17.418%. $1.26 to make
               (each Alibaba supplier's lowest price, averaged) + $2.14 to ship,
               priced from the puzzle's own carton at a dated LCL rate.
               🚨 Was 14.000% on a $1.00 freight PLACEHOLDER and range-midpoint
               make cost until 2026-10-04. Three decimals, like every line here:
               check-profile compares them against the series. */
            pct: -17.418,
            /* Rendered directly so the row cannot drift from the landed-cost
               table by a rounding step; `pct` must equal 3.40 / 19.52. */
            amount: 3.4,
            detail:
              '$1.26 to make — the three Alibaba suppliers’ lowest prices above, averaged — and $2.14 to ship, priced from this puzzle’s own carton at a read LCL rate. Together $3.40 a puzzle, whichever channel sells it.',
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -13.17,
            detail:
              'Amazon’s published Toys & Games rate, a flat 15% with a $0.30 minimum. It reads as 13.17% here because it is charged on the Amazon revenue only, and their own store pays no referral at all.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -27.218,
            emphasis: true,
            /* Size tier from the best seller's package on Keepa (B0DJWLQR6W,
               310 × 257 × 54 mm, 812 g) against Amazon's tier table — too tall
               and heavy for small standard. sources.json has the reading. */
            detail:
              'Size tier: Large Standard. The best seller ships in a 12.2 × 10.1 × 2.1 inch box weighing 1.8 lb — too tall and too heavy for Small Standard. About $6.02 a unit, which is 31% of an Amazon sale and 27.2% of revenue across the three channels: still the largest line here, and the one a bulky, low-priced product cannot negotiate.',
            links: [
              {
                label: 'All of Amazon’s size tiers, explained',
                href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US',
              },
            ],
          },
          {
            /* The one cost that exists only off Amazon. Links to the card
               rate it is taken from — there is no COGS row and no fee schedule
               of Amazon's to point at. */
            label: 'Card processing',
            pct: -0.537,
            detail:
              'Only their own store pays it: the standard online card rate of 2.9% plus $0.30 an order, which on a $19.99 puzzle is about 4.4% — and 0.54% of revenue once the Amazon side, which pays none of it, is counted in. Shipping on that channel is charged to the customer, so it nets to zero and has no line.',
            links: [{ label: 'The published online card rate', href: 'https://www.shopify.com/pricing' }],
          },
          {
            label: 'Advertising',
            pct: -WMP_ADS.total,
            detail:
              `Modelled, not observed — and two very different things inside one line. ${linePct(WMP_AD.ratePct.central)} of Amazon revenue, where three-quarters of the spend is their own brand name; and ${WMP_STORE_AD_RATE}% of store revenue, where they run a full paid programme on Meta and Google. Neither publishes a bill.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/white-mountain-puzzles/advertising/#ad-spend' },
              {
                label: 'If you want to go in depth, go to the Advertising section',
                href: '/business/white-mountain-puzzles/advertising/',
              },
            ],
          },
        ],
        note:
          'Before returns and overhead, both set to zero, so this is a ceiling on profit rather than profit. Wholesale is in none of it.',
      },
      {
        type: 'callout',
        text:
          'One part of the cost-of-goods line is softer than the rest: the $1.26 prices a puzzle made in China, while White Mountain says every one of its puzzles is made in America — so the line is what the business would cost a new seller to run, not a read of White Mountain’s own books. Softer still: two of the three revenue lines these percentages are percentages OF are estimates rather than readings.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'They buy almost nothing on Amazon — and run a full paid-acquisition programme to their own store. The two halves of this business grow in opposite ways.',
      },
      {
        type: 'prose',
        text:
          'On Amazon, start with what is missing. Read from New York, “jigsaw puzzles 1000 pieces”, “halloween puzzle” and “adult puzzles” carried 36 sponsored results and none was theirs; on “puzzles”, 300,000 searches a month, two of theirs sat at #28 and #35. On their own brand name they held the first four. That is brand defence with a little acquisition at the edges: the demand arrives at the listing already looking for White Mountain.',
      },
      {
        /* 🚨 This paragraph exists because the section used to say they
           “advertise nothing else”, which the 2026-09-30 ad-library reads
           disproved. Do not put that claim back. */
        type: 'prose',
        text:
          'Off Amazon it is the reverse. About 52 Meta ads were running to their store across Facebook, Instagram, Messenger and Threads, the newest started the day before, and Google’s transparency centre showed 78 United States ads under a verified White Mountain Puzzles, Inc. advertiser account — 47 of them in the previous thirty days, on Search, YouTube, Maps and Shopping. Their own pages carry the machinery to match: a Meta pixel with server-side conversions, Google Ads conversion and remarketing tags, and Microsoft, Pinterest and TikTok tags behind them. What none of it says is the price. Advertising has the counts.',
      },
      {
        type: 'prose',
        text:
          'What they do instead is list. 184 of the 501 listings went up in 2025 or 2026, and ten of today’s fifteen best sellers were listed in October 2024 or later. A catalogue on Amazon since 2011 is being carried by its newest titles.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon the engine is older than the internet: a wholesale book with a one-case minimum of twelve puzzles mixed across more than 350 titles, a spinner-rack programme for shops, and trade shows from Atlanta to Dallas. None of it is public as a number.',
      },
      {
        type: 'callout',
        text:
          'What the public record still cannot say is how big any of it is. Their own store and Amazon Europe are on the chart as estimates, and wholesale — thousands of retail accounts, by their own account — is not on the chart at all.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-07 —
           Amazon only. The off-Amazon point is the ad libraries'. */
        type: 'strategy',
        label: 'Brand defence plus a few generic searches',
        points: [
          'Three-quarters of the modelled Amazon ad spend, about $786 of $1,040 a month, is their own name, where they hold the first four sponsored results from New York.',
          'Of the 13 biggest generic searches they buy one, thinly: two ads at #28 and #35 on “puzzles”, 300,000 searches a month — which Jungle Scout’s window does not show at all.',
          'Off Amazon it is the reverse: about 52 Meta ads and 78 Google ads running to their own store, modelled at about 20% of what the store sells.',
          'Ads on 112 of the 202 Amazon keywords modelled. Modelled from outside the account, so a floor.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: WMP_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the ten best-selling listings: exact-match monthly searches and the best organic position any of the ten held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among the ten. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword: these fifty carry ${monthUsd(topSpend(WMP_TOP_KEYWORDS))} of the ${monthUsd(WMP_AD.monthlyUsd.central)} modelled on Amazon US, and the rest sits on smaller searches — every one of them is in the next table. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(WMP_AD_KEYWORDS, WMP_AD_KEYWORDS_TOTAL, WMP_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Three ad libraries answer the same way: here are the ads, and no, we will not tell you what they cost. Every value below is arithmetic; every counted line under one is what somebody actually saw.',
      },
      {
        type: 'prose',
        text:
          'Amazon and everywhere else pull in opposite directions here. On Amazon the footprint is brand defence and very little more: of about $1,040 a month modelled across 112 keywords, $786 is their own name. Off Amazon there is a standing campaign on two networks, and the only spend figure either of them has ever published for this advertiser exists by accident: Meta mis-categorised six old ads as needing a political disclaimer, and one of those — running July to October 2024 — reports $6K–$7K for 500,000–600,000 impressions, about a $12 CPM. That is the anchor under the modelled line, and it is one ad from two years ago.',
      },
      {
        /* 🚨 The row here until 2026-09-30 said “Meta and Google — Not
           checked”. Both were then read and both are running. Never restore
           that row; if these counts go stale, re-read the libraries. */
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(WMP_AD.monthlyUsd.central)} a month, ${linePct(WMP_AD.ratePct.central)} of Amazon US revenue — modelled`,
            counted: 'Ads on 112 of the 202 keywords modelled, about 7% of their searches; #1–#4 on their own name from New York',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid; band $624–$1,336. The click rate is BORROWED, 3% (1.8–4.5%): these searches had only one brand seen mainly through ads to measure it on. On their own name the model is capped at the clicks Jungle Scout actually saw them take. A floor — product-page ads, Sponsored Brands and Display are invisible to it. Amazon publishes no bill.',
          },
          {
            label: 'Meta — Facebook, Instagram, Messenger, Threads',
            href: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&view_all_page_id=164202616556&search_type=page&media_type=all',
            value: 'Estimated',
            counted:
              'About 52 active United States ads on page 164202616556, newest started 29 Sep 2026, history back to September 2022',
            note:
              'Meta publishes no spend for ordinary consumer ads. The one exception on this page is a mis-categorisation: six inactive ads flagged as running without a political disclaimer carry figures, the largest $6K–$7K for 500K–600K impressions between July and October 2024. Filtered to the United Kingdom, Germany, France, Ireland or Canada the page returns no live ads at all.',
          },
          {
            label: 'Google — Search, YouTube, Maps, Shopping',
            href: 'https://adstransparency.google.com/advertiser/AR05228554132289224705?region=US&hl=en',
            value: 'Estimated',
            counted:
              '78 United States ads, 47 of them in the last 30 days — Search 67, YouTube 39, Maps 31, Shopping 12 — advertiser AR05228554132289224705, verified as “White Mountain Puzzles, Inc.”',
            note:
              'One creative can run on several surfaces, so those four do not add to 78. Google publishes no spend for non-political ads either. Searching the transparency centre by domain returns 96 ads pointing at whitemountainpuzzles.com from more than one account, so 78 is a floor.',
          },
          {
            label: 'Off-Amazon spend, modelled',
            value: `≈ ${WMP_STORE_AD_RATE}% of store revenue`,
            flag: true,
            note:
              'Estimated. Nothing in either library is a bill, so this is a judgement resting on the one CPM Meta did publish and on a live footprint of about 52 Meta ads and 78 Google ads. In the margin block it sits inside a single advertising line with the Amazon figure — the Ad spend table below shows the two halves and the total.',
          },
          {
            label: 'The tags on their own store',
            value: 'Measured',
            counted:
              'Meta Pixel with the server-side Conversions API, Google Ads conversion and remarketing through Google Tag Manager, GA4, Microsoft Advertising, Pinterest and TikTok — read off the live store',
            note:
              'Evidence that a paid stack exists, and nothing more. A tag fires the same whether the account behind it spends a hundred dollars a month or a hundred thousand.',
          },
        ],
        note:
          'Neither Meta nor Google publishes spend for United States consumer advertising; both publish the ads. So every counted line here is a footprint and every value beside one is modelled.',
      },
      {
        /* The Margin breakdown's advertising line, row for row — both built
           from WMP_ADS. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          wmpRow('Amazon ads', WMP_ADS.amazon, `Modelled: ${monthUsd(WMP_AD.monthlyUsd.central)} on Amazon US (${monthUsd(WMP_AD.monthlyUsd.low)}–${monthUsd(WMP_AD.monthlyUsd.high)}), Europe at the same ${linePct(WMP_AD.ratePct.central)}`),
          wmpRow('Store ads, Meta and Google', WMP_ADS.store, `Estimated: ${WMP_STORE_AD_RATE}% of store sales`),
          wmpRow('Total — the margin line', WMP_ADS.total, ''),
        ],
        note:
          'What the Margin breakdown takes off for advertising, line for line. Share is of all three channels’ revenue; per sale is that share of the $19.52 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'One social account with a real audience — Instagram, at 23K — and a store that draws about 148,000 visits a month. The rest of their social presence is small.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Their site links two accounts. Instagram carries 23K followers over 568 posts; Facebook is the page their Meta ads run from, and shows no count to a logged-out reader, so its size is unread rather than small. Two more carry their name and their tagline but are not linked from the site: a TikTok with 1,145 followers and no public videos, and a YouTube channel with 267 subscribers and twelve videos. On Amazon, where most of the money is, their best seller sits at #12,601 in all of Toys & Games and #304 among jigsaw puzzles — no single puzzle ranks high, which is the catalogue’s shape: many titles, each modest.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Store visits', value: '147,663 a month', note: 'Similarweb, supplied by the owner' },
          { label: 'Shopify products', value: '601' },
          { label: 'Instagram', value: '23K followers', note: '568 posts' },
          { label: 'TikTok', value: '1,145 followers', note: 'No public videos' },
          { label: 'YouTube', value: '267 subscribers', note: '12 videos' },
          { label: 'Facebook', value: 'Unread', note: 'No count shown logged out' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — whitemountainpuzzles.com',
            href: 'https://www.whitemountainpuzzles.com/',
            value: '601 products',
            flag: true,
            note: 'Shopify, with a $19.99 shelf price for a 1,000-piece puzzle and a paid programme behind it — the Advertising section has the ad counts. Its header links Instagram and Facebook.',
          },
          {
            label: 'Instagram — @whitemountainpuzzles',
            href: 'https://www.instagram.com/whitemountainpuzzles/',
            value: '23K followers',
            note: 'Instagram’s own rounded figure, over 568 posts. The bio leads on “Proudly MADE IN AMERICA.”',
          },
          {
            label: 'Facebook — White Mountain Puzzles',
            href: 'https://www.facebook.com/WhiteMountainPuzzles',
            value: 'Unread',
            note: 'The page their Meta ads run from. Facebook shows no follower count to a logged-out reader.',
          },
          {
            label: 'TikTok — @whitemountainpuzzles',
            href: 'https://www.tiktok.com/@whitemountainpuzzles',
            value: '1,145 followers',
            note: 'Opened in April 2022, no public videos. Not linked from their site; the name and the bio — their tagline, word for word — are what tie it to them.',
          },
          {
            label: 'YouTube — @whitemountainpuzzles',
            href: 'https://www.youtube.com/@whitemountainpuzzles',
            value: '267 subscribers',
            note: 'Twelve videos. Not linked from their site; matched on the channel name and its description.',
          },
        ],
      },
      {
        /* Keepa, research/white-mountain-puzzles/keepa/listings.json — the
           top 20 storefront listings, ordered by overall rank. Names as the
           Revenue breakdown has them. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Toys & Games', 'Subcategory', 'Rating'],
        rows: [
          ['Did You Know · 1,000 pieces', '#12,601', '#304 · Jigsaw Puzzles', '4.8★ over 308 reviews'],
          ['Horror Stories · 1,000 pieces', '#15,171', '#377 · Jigsaw Puzzles', '4.8★ over 91 reviews'],
          ['Welcome Fall · 1,000 pieces', '#18,448', '#473 · Jigsaw Puzzles', '4.9★ over 54 reviews'],
          ['Halloween Crochet · 1,000 pieces', '#19,408', '#505 · Jigsaw Puzzles', '4.7★ over 77 reviews'],
          ['State Trivia · 1,000 pieces', '#20,718', '#546 · Jigsaw Puzzles', '4.8★ over 33 reviews'],
          ['Card Games · 1,000 pieces', '#22,205', '#591 · Jigsaw Puzzles', '4.9★ over 134 reviews'],
          ['Mini Cereal Boxes · 100 pieces', '#22,483', '#597 · Jigsaw Puzzles', '4.3★ over 862 reviews'],
          ['Family Retreat · 1,000 pieces', '#25,397', '#685 · Jigsaw Puzzles', '4.7★ over 228 reviews'],
          ['Crazy State Laws · 1,000 pieces', '#25,646', '#697 · Jigsaw Puzzles', '4.6★ over 244 reviews'],
          ['Halloween Horror · 1,000 pieces', '#25,997', '#713 · Jigsaw Puzzles', '4.7★ over 85 reviews'],
          ['I Love Fishing · 1,000 pieces', '#28,045', '#789 · Jigsaw Puzzles', '5★ over 49 reviews'],
          ['Lobster Landing · 1,000 pieces', '#28,957', '#826 · Jigsaw Puzzles', '4.7★ over 95 reviews'],
          ['Halloween Dog House · 1,000 pieces', '#29,835', '#855 · Jigsaw Puzzles', '5★ over 40 reviews'],
          ['Slang We Used · 1,000 pieces', '#31,675', '#914 · Jigsaw Puzzles', '4.8★ over 326 reviews'],
          ['Book Collage · 1,000 pieces', '#33,221', '#968 · Jigsaw Puzzles', '4.8★ over 61 reviews'],
          ['Sports Heroes · 1,000 pieces', '#37,018', '#1,086 · Jigsaw Puzzles', '4.7★ over 133 reviews'],
          ['Things Parents Say · 1,000 pieces', '#39,304', '#1,163 · Jigsaw Puzzles', '4.7★ over 431 reviews'],
          ['Dock Dogs · 1,000 pieces', '#44,817', '#1,324 · Jigsaw Puzzles', '4.7★ over 124 reviews'],
          ['Potting Shed · 1,000 pieces', '#48,097', '#1,437 · Jigsaw Puzzles', '4.8★ over 93 reviews'],
          ['Patriotic Porch · 1,000 pieces', '#51,248', '#1,537 · Jigsaw Puzzles', '5★ over 24 reviews'],
        ],
        visibleRows: 10,
        note: 'Read through Keepa. Rank moves daily, and a lower number is a better seller.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'White Mountain Puzzles Inc' },
          { label: 'Seller', value: 'White Mountain Puzzles', note: 'Merchant A3SL1S5CJP6OII' },
          { label: 'Founded', value: '1978', note: 'By the company’s own account' },
          { label: 'Registered address', value: 'Jackson, NH, US', note: '18 Black Mt Rd, 03846' },
          { label: 'Seller feedback', value: '99%', note: 'Over 10,668 ratings', info: 'sellerFeedback' },
          { label: 'Oldest live listing', value: '18 Aug 2011' },
        ],
      },
      {
        type: 'prose',
        text:
          'Family-owned and, by its own account, run by the founders’ sons, with named staff answering phones for retail, wholesale and a shop in Jackson. The seller account is the brand’s own: it holds the buy box on each of its twenty best sellers between 59% and 100% of the time, and no other seller carries a sold badge on a White Mountain listing.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve net profit across the three channels on the chart, two of which are estimates.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Wholesale and the Jackson shop are excluded: real channels that cannot be sized from outside. Two of the three that ARE in the profit being multiplied — Amazon Europe and their own store — are estimates, so this figure inherits both. The single-marketplace penalty is scored the other way, on what was measured: one Amazon marketplace, not the modelled European line. And the profit prices each puzzle at Alibaba factory quotes plus shipping from China, not at White Mountain’s own American-made cost.',
      },
      {
        type: 'prose',
        text:
          'The positives are durability: fifteen years of listings, a 99% seller record over more than ten thousand ratings, and a catalogue no single listing can take down. The negative is concentration of another kind — every measured dollar still comes from Amazon US, and the multiple is scored that way even though two estimated channels now sit in the profit it multiplies.',
      },
      {
        type: 'prose',
        text:
          'Four answers are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers in the model, taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple. Brand Registry is firmer: Amazon gates the brand store behind enrolment. All four are the first things to put to the owner.',
      },

      /* The least it costs to find out whether the puzzle sells: the validation
         test, read off the published "to start" estimate, like Virora's. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text:
          'The least you would spend to find out whether it sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },

  kalotoys: {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-kalotoys-headline.ts, from
       waithowmuch-research research/kalotoys/headline.json (reviewed
       2026-09-15) — and the page reads them from the row alone. */
    headline: {
      /* The best seller, and the object the headline is about: one of the four
         $34.96 name puzzles that are half of September 2026. */
      image: {
        src: kalotoysPhoto('B0GSZSCM69'),
        alt: 'A toddler holding up a personalised wooden name puzzle spelling ADELYNN in pink letters, framed by a unicorn, butterfly, rainbow and other animal pieces — the best-selling KALOTOYS listing on Amazon',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand and designs,
             made — by their own account — in their own Hanoi workshops, and the
             customs trail runs from their street address. The model has no
             "own manufacturing" answer; private label is the nearest one that
             describes what transfers. */
          primaryMethod: 'private_label',
          /* Flagship. One product — the personalised name puzzle, in four
             listings on one account — is 51% of the month, and the top ten
             listings 78%, with 370 listings behind them. Not "broad": the tail
             is wide but it does not carry the revenue. The case for "churn" is
             that the hit changed accounts within a year; one hit replacing
             another is not yet a pattern the series can show. */
          catalogStructure: 'flagship',
          /* Level 3. Every best seller is personalised to order — a child's
             name cut from plywood — on their own designs. No tooling nobody
             else has: laser-cut plywood is a commodity process, and rivals
             sell name puzzles on the same search page. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/KALOTOYS is gated behind
             enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: B0DNVSDMM4, 2024-11-23 — the first plausible listing.
             B0H3KVJ54K's 2022-08-15 is an artefact (impossible for a B0H ASIN);
             2020 is the company. */
          sellingSince: '2024-11-23',
          /* Top listings of both storefronts, a floor; variations share
             counts. */
          reviewTotal: 3766,
          ratingWeighted: 4.4,
          /* 🚨 An INFERENCE of a different kind: three accounts, weighted by
             rating count — 30% over 40, 60% over 152, 26% over 43 → 49%. Any
             blend lands in the model's "under 85%" band, so the choice of
             blend does not move the multiple; including the two accounts
             attributed by inference does not either, since KALO KIDS alone is
             30%. */
          sellerFeedbackPct: 49,
          /* A read from Keepa's fees: busy boards and Halloween kits carry an
             FBA fee; the made-to-order name puzzles and nursery signs carry no
             FBA fee and no package dimensions, and KALOTOYS GROUP has no FBA. */
          channels: 'both',
          /* RULE 2. Giftora's account exists on Amazon Canada with 0 ratings;
             Amazon US is all of the measured Amazon revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* August 2026 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 19.47,
          /* RULE 3: offAmazonSharePct unset. Etsy and the websites are, by the
             founders' account, most of the company, and none is sized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. The KALOTOYS brand on Amazon US only — Etsy, their own sites, the Vietnamese store and the company’s other unnamed brands are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '370', note: '234 priced, 29 carrying a sold badge', info: 'skus' },
      /* The best seller's own breadcrumb. No rank beside it: Keepa files these
         listings' main rank under a root node the pull did not name, and a rank
         in an unnamed category says nothing. */
      {
        label: 'Category',
        value: 'Toys & Games › Puzzles › Pegged Puzzles',
        note: 'The best-selling name puzzle',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-listing figures across both storefronts, so NO `info` key — the
         shared ⓘ copy describes one hero listing. */
      { label: 'Product reviews', value: '3,766', note: 'Across the top listings — variations share counts' },
      { label: 'Product rating', value: '4.4★', note: 'Review-weighted, top listings' },
      /* 🚨 Shown, not hidden, and dated: measured and unflattering. A default
         pending the owner-of-the-page's decision (research README). */
      { label: 'Seller feedback', value: '26–60%', note: 'Three US accounts · read 15 Sep 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Made in their own Hanoi workshops, by their own account', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'Four name puzzles are half of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own stores, Etsy', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, through three US seller accounts. Every figure on this profile — the chart, the margin, the valuation — is the KALOTOYS brand on Amazon US and nothing else.',
      },
      /* Unchecked rather than no: an account exists in Canada, but nobody
         looked for a badge there. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'Giftora’s account exists on Amazon Canada with 0 ratings, and no Canadian listing was checked for a badge. None of the three accounts exists on Amazon UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        note:
          'kalotoys.com (Shopify, 175 products at a median $12.99) and kalokid.com (15 products at a median $39.99), plus kalotoys.vn for Vietnam. The founders put their website at 40% of 2023. Shopify publishes no sales.',
      },
      'other-marketplace': {
        status: 'yes',
        flag: true,
        note:
          'Etsy, as KalotoysOfficial — by the founders’ account their primary channel and a top-10 Etsy seller by orders in November 2023. The shop refused a direct fetch, so no sales count was read and the claim is unchecked.',
      },
      // tiktok-shop and wholesale-out left unchecked: nobody looked. The TikTok
      // account is Vietnamese-language and was not opened.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Two of the three accounts carry FBA, and the busy boards and Halloween kits carry Amazon pick-and-pack fees of $4.09–6.13.',
      },
      fbm: {
        status: 'yes',
        flag: true,
        note:
          'The name puzzles and nursery signs — made to order with a child’s name — carry no FBA fee and no package dimensions, so they ship from the seller. All four name puzzles, the half of the month they make up, are merchant-fulfilled on the Giftora account with no Prime badge, read 1 October 2026 — which is what a US finishing workshop would look like from outside. KALOTOYS GROUP has no FBA at all.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the listings on any of the three seller records.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and designs, on listings no outside seller carries a badge on.',
      },
      manufacturer: {
        status: 'yes',
        note:
          'Two workshops in Hanoi, 2,300 m², by the founders’ own account — self-reported. They put about 95% of a product in that factory and the last 5%, the personalised name, in a US workshop. The customs trail agrees with the shape: the shipper to the US sits at Kalo JSC’s own Hanoi street address.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/KALOTOYS, which Amazon gates behind enrolment.',
      },
      'amazon-handmade': {
        status: 'yes',
        note: 'Some KALOTOYS variations are listed under Handmade Products. The referral rate is 15% either way.',
      },
      // amazon-custom left unchecked: the personalised listings may use it, and
      // nobody looked.
    },

    intro:
      'KaloToys is a Hanoi company that makes wooden Montessori toys and personalised baby gifts in its own workshops. On Amazon US it sells under the KALOTOYS brand through three American seller accounts, none of which carries the company’s name.',

    blocks: [
      { type: 'heading', text: 'Name puzzles, busy boards and school signs' },
      {
        type: 'prose',
        text:
          'Three product families carry the Amazon catalogue: personalised wooden name puzzles, made to order with a child’s name cut from plywood; Montessori busy boards of latches, zips and gears; and, since June 2026, personalised first-day-of-school signs. Around them sit nursery name signs, Halloween sign kits, ornaments and baby baskets — 370 listings in all, 176 of them added between June and August 2026. They make the toys themselves in their own Hanoi factory and, by their own account, finish the personalised pieces in a US workshop.',
      },
      {
        type: 'prose',
        text:
          'The brand is not the company. The founders told Shark Tank Vietnam in 2024 that in the US they run “a school of small fish”: many small brands they would not name. Everything on this page is the KALOTOYS brand on Amazon US, found across all three seller accounts and counted once — not the company’s Amazon business, and not the company.',
      },
      /* No figures in the caption. The busy board is what the storefront leads
         with; the sign is what summer 2026 was built on. Bucket copies. */
      {
        type: 'images',
        items: [
          {
            src: kalotoysPhoto('B0DQZKTNCB'),
            alt: 'A pink wooden Montessori busy board with number tiles, bells, an abacus, a zip, a shoelace, shape pegs, a bus and a clock, shown beside a baby holding it and its KALO TOYS gift box',
          },
          {
            src: kalotoysPhoto('B0H3KTSB4M'),
            alt: 'A wooden first-day-of-school sign with the name MADISON in raised red letters over dry-erase panels for age, height, favourites and teacher, with a washable marker',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the busy board the storefront leads with, and the personalised school sign that arrived in summer 2026.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A workshop business founded in 2020, on national television in 2024, and on Amazon US through three seller accounts that appeared one after another.',
      },
      {
        /* Oldest first. "2020", "2021" and "April 2024" are the founders' own
           claims with no day on them; they stay on this list and off the
           overview chart, which only plots "D Mon YYYY". */
        type: 'timeline',
        items: [
          {
            when: '2020',
            tag: 'Brand',
            what: 'Founded in Hanoi by Đồng Đức Thành and Lê Trung Anh',
            detail:
              'By their own account, when both were expecting their first children. Two workshops of 2,300 m² today, self-reported, and 100–199 staff on an employer listing.',
          },
          /* Year only: the founders name 2021 but no month, so it renders on
             this list and is not a dot. Do not invent a day to make one. */
          {
            when: '2021',
            tag: 'Brand',
            what: 'First sales, by the founders’ own account',
            detail:
              'They put the first year at 25 billion VND and say it was profitable from it. Self-reported on video in September 2024, unaudited, and with no month behind it.',
          },
          {
            when: '7 Nov 2023',
            tag: 'Web',
            what: 'kalotoys.com registered',
            detail:
              'The Shopify store now lists 175 products at a median $12.99, and prints a Vernon Hills, Illinois address and a Garland, Texas fulfilment address.',
          },
          {
            when: '18 Nov 2023',
            tag: 'Brand',
            what: 'A top-10 Etsy seller by orders, by their own account',
            detail:
              'Not checked: the Etsy shop refused a direct fetch. The founders call Etsy their primary channel and put 2023 at 40% website, 60% marketplaces, and repeat the end-2023 top-ten claim on video a year later. Amazon, which they say is about seventy times the size of Etsy for them, only started the year after.',
          },
          /* Month only, as given on video: rendered here, not a chart dot. */
          {
            when: 'April 2024',
            tag: 'Brand',
            what: 'The Vietnamese domestic line launches',
            detail:
              'kalotoys.vn, by the founders’ own account on video. Self-reported, with no day behind it, and nothing about it is measured on this page.',
          },
          {
            when: '6 Aug 2024',
            tag: 'Brand',
            what: 'Shark Tank Vietnam airs: $1M asked for 10%',
            detail:
              'The first $1M deal of season 7, on VTV. On air the founders gave 2023 revenue of 95 billion VND and profit of 9.6 billion VND — company-wide, self-reported and unaudited — and the cost shares the margin on this page is built from.',
          },
          {
            when: '13 Aug 2024',
            tag: 'Brand',
            what: 'The deal is signed, and the “school of small fish” explained',
            detail:
              'Shark Bình and Shark Minh Beta sign $1M for 10%, disbursement conditional; whether it was paid is not public. The CEO says the US business runs many small unnamed brands, after competitors interfered with them.',
          },
          {
            when: '4 Oct 2024',
            tag: 'Web',
            what: 'kalokid.com registered',
            detail: 'A second storefront carrying the same Illinois and Texas addresses. Its 15 products were all created on 22 July 2026.',
          },
          {
            when: '23 Nov 2024',
            tag: 'Amazon',
            what: 'The first KALOTOYS listing with a believable date',
            detail: 'A busy board, B0DNVSDMM4. One listing reads 2022 in Keepa, which is impossible for its ASIN, and is ignored.',
          },
          {
            when: '2 Dec 2024',
            tag: 'Amazon',
            what: 'The Giftora account, trading as “Kalotoys”, is first tracked',
            detail:
              'A Worcester, Massachusetts entity, by Keepa’s first-tracked date, which trails an account’s real opening. Tied to KaloToys by its seller name and listings — an inference, not a document.',
          },
          {
            when: '19 Jan 2025',
            tag: 'Brand',
            what: 'The 2025 plan, on video: manufacture in the US, widen the range, push Amazon',
            detail:
              'Lê Trung Anh names the three priorities for the year, and says nearly 1,000 orders came in the day after the Shark Tank broadcast with the flow elevated about two weeks. Self-reported and unaudited.',
          },
          {
            when: '4 Mar 2025',
            tag: 'Amazon',
            what: 'The first sold badge anywhere in the catalogue',
            detail: 'Amazon prints “bought in past month” from roughly 50 sales a month. The series on this page starts the month after.',
          },
          {
            when: '29 Jul 2025',
            tag: 'Brand',
            what: 'The first public customs record',
            detail:
              'SNAP ECOM JSC — at the same Hanoi street address as Kalo Joint Stock Company — ships busy boards, signs and décor from Hai Phong to KALO KIDS CORPORATION in Illinois. Five bills of lading to June 2026 are visible.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$140,330 — the Christmas month',
            detail: '4.4 times the January that followed. Ordinary for toys, and not the year’s high.',
          },
          {
            when: '16 Feb 2026',
            tag: 'Amazon',
            what: 'KALO KIDS CORPORATION is first tracked',
            detail: 'The account behind the brand store’s landing listing, at the Vernon Hills address kalotoys.com prints.',
          },
          {
            when: '18 Mar 2026',
            tag: 'Amazon',
            what: 'Four personalised name puzzles go up on Giftora',
            detail: 'All four at $34.96. Six months later they are 51% of September’s brand revenue.',
          },
          {
            when: '10 Jun 2026',
            tag: 'Amazon',
            what: 'KALOTOYS GROUP is first tracked',
            detail:
              'Sachse, Texas, a few miles from the Garland fulfilment address, with no FBA. It holds the buy box on every badged listing probed outside the other two storefronts. Tied to KaloToys by name, listings and geography — an inference, not a document.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$181,557 — back to school beats Christmas',
            detail:
              'Personalised first-day-of-school signs and 176 new listings in three months, most of them outside the original storefront. The best month on record.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The brand’s Amazon year has two peaks, not one. December 2025 did $140,330, ordinary for toys; August 2026 then did $181,557 on back-to-school signs, and September 2026 was 4.1 times September 2025. Of each month a little under a third is left after Amazon’s fee, the goods, fulfilment and advertising — before overhead, and on cost shares the founders gave for the whole company in 2023.',
      },
      {
        type: 'prose',
        text:
          'The series counts all 370 listings carrying the KALOTOYS brand, manufacturer or name, each once, whichever of the three accounts lists it. That matters here more than usual: the storefront’s own seller accounts for under a fifth of the month, and measured off that account alone this page would describe a business about a fifth of the size.',
      },
      { type: 'chart' },
      {
        /* From each account's Keepa seller record on UK, DE and CA
           (2026-09-15). 🚨 The largest share is valuation
           derived.topMarketplaceSharePct — check-profile.mjs holds the two
           together. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. One of the three accounts exists in Canada, with no ratings.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Giftora’s account exists with 0 ratings; no Canadian listing was checked for a badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No account for any of the three sellers' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Each account’s seller id was looked up on every marketplace.',
      },
      {
        /* Generated from the three Keepa catalogues — see the module's header.
           The rows sum to the 2026-09 revenue row, which check-profile.mjs
           asserts. */
        type: 'breakdown',
        intro:
          'Four name puzzles at $34.96 are half of the month, and all four sit on the Giftora account. The school signs behind them arrived in June; the busy boards the storefront leads with are a small part of what sells.',
        items: KALOTOYS_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the buy box on 15 September 2026, so every row is a floor. 205 more priced listings carry no badge, each under roughly 50 a month, and count as zero; at up to 50 each they could add as much again. The account after each name is the storefront that lists it, not who held the buy box.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. Three of the four cost lines under the profit are the founders’ own company-wide shares for 2023, not measurements of this brand — Margin breakdown says which, and why the same founders’ reported margin was far lower.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is one of at least three ways KaloToys sells, and by the founders’ own account not the main one. It is the only one with a public number behind it.',
      },
      {
        type: 'prose',
        text:
          'The founders put 2023 at 40% through their own website and 60% through marketplaces, with Etsy the one they called primary. On Amazon, fulfilment is split by product rather than by account: the busy boards and Halloween kits carry Amazon FBA fees, while the name puzzles and nursery signs — made to order with a child’s name — carry no FBA fee and no package dimensions, so they ship from the seller. That split is also where a US workshop would show, and it does: all four name puzzles are merchant-fulfilled on the Giftora account and carry no Prime badge, read 1 October 2026. Brand owner sets out what the founders say is made where.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store or an Etsy shop takes, so this says which methods are in use and not what each is worth. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $25.07 average sale, down to a little under a third of it — a contribution ceiling built on the founders’ own cost shares, not a net margin.',
      },
      {
        type: 'prose',
        text:
          'Only one line here is measured for this brand: Amazon’s 15% referral fee. The other three are the founders’ own shares for the whole company in 2023, stated on Shark Tank Vietnam and applied here to one brand on one marketplace three years later. The one cross-check available agrees with the fulfilment line: Amazon charges $5.52–6.13 to pick and pack a $29–33 busy board, 17–19% of its price.',
      },
      {
        type: 'table',
        /* The id the margin lines link back to (SKILL §2). There is no
           supplier-quote COGS table here — nobody quotes a price for a toy
           this company makes itself — so this is what the lines explain
           themselves against. */
        id: 'cogs-breakdown',
        caption: 'The cost shares — what the founders said, and what is used here',
        columns: ['Line', 'Stated by the founders (2023, company-wide)', 'Used here', 'Basis'],
        rows: [
          ['Amazon referral fee', '—', '15%', 'Measured: Amazon’s published Toys & Games and Handmade rate; 15.01% per listing in Keepa'],
          ['Cost of goods', '~16%', '16%', 'Self-reported, VTV, 6 Aug 2024'],
          ['Shipping and fulfilment', '20–22%', '21%', 'Self-reported midpoint. FBA pick-and-pack on the busy boards is 17–19%; the made-to-order listings carry their own freight'],
          ['Advertising', '30–33% “marketing, including platform commissions”', '16.5%', 'Self-reported midpoint less the 15% referral fee it included. The weakest line'],
          ['Operating costs', '3–4% of revenue a month', 'Not deducted', 'Self-reported; left out, which is one reason the remainder is a ceiling'],
        ],
        note:
          'Unaudited figures given on television for the whole company — Etsy, their websites and every brand they run. Nothing here is a supplier quote or a figure from this brand’s books.',
      },
      /* 🚨 Owner's call, 2026-10-11: the founders' shares LEAD this section and
         build the profit series; the Alibaba quotes below are a COMPARISON —
         what a new seller would pay a Chinese factory for the same three
         products — and they are the landed costs "Test it first" uses. They
         never feed the margin block above. research/kalotoys/suppliers.json. */
      { type: 'heading', text: 'What a new seller would pay on Alibaba' },
      {
        type: 'prose',
        text:
          'KALOTOYS makes its own toys in Hanoi, so nobody quotes it a price. What can be read is what a factory in China asks a new seller for the same three products — the name puzzles, the first-day-of-school signs and the busy boards, which together are 86% of September. Set beside the founders’ 16%, the quotes back it up: making the product costs a new seller about what the founders say it costs them, a little more for the puzzle and a little less for the sign and the board. What a new seller pays on top is the freight and the tariff, which the founders count in their shipping line instead.',
      },
      {
        /* The finding first, drawn: the founders' 16% against the quotes'
           make cost, product by product (components/CostAgreement.tsx). The
           table under it carries the exact figures. Weighted quote: by
           September's revenue across the three products. */
        type: 'cost-agreement',
        claim: { label: 'The founders said', pct: 16, source: 'Cost of goods, Shark Tank Vietnam, 2024' },
        quote: { label: 'Alibaba quotes', pct: 16.7, source: 'Cost to make, the three products weighted by sales' },
        verdictNote: 'Two sources that never spoke to each other land on the same share of the price.',
        ariaLabel: 'The founders’ 16% cost of goods against Alibaba quotes: name puzzle 18.0%, first-day-of-school sign 14.2%, busy board 15.2% of the price to make; 26.1%, 23.0% and 24.8% landed with tariff and freight.',
        products: [
          { label: 'Personalised name puzzle', price: 34.77, claimUsd: 5.56, makeUsd: 6.27, makePct: 18.0, landedUsd: 9.06, landedPct: 26.1 },
          { label: 'First-day-of-school sign', price: 25.44, claimUsd: 4.07, makeUsd: 3.6, makePct: 14.2, landedUsd: 5.86, landedPct: 23.0 },
          { label: 'Montessori busy board', price: 31.51, claimUsd: 5.04, makeUsd: 4.8, makePct: 15.2, landedUsd: 7.83, landedPct: 24.8 },
        ],
      },
      {
        /* Like for like first: the founders' 16% is cost of goods only — they
           count shipping in its own 20–22% line — so it compares with the
           quotes' make cost, then tariff and freight are added to show what a
           new seller lands it for. Weighted row: September's revenue across
           the three products (puzzles $85,193, signs $33,072, boards $17,331.50). */
        type: 'table',
        id: 'alibaba-comparison',
        caption: 'Cost of goods — the founders’ 16% against Alibaba quotes',
        columns: ['Product', 'Founders: 16% of price', 'Alibaba: make only', 'Make + 20% tariff', 'Landed, with freight'],
        rows: [
          ['Personalised name puzzle ($34.77)', '$5.56 · 16%', '$6.27 · 18.0%', '$7.52 · 21.6%', '$9.06 · 26.1%'],
          ['First-day-of-school sign ($25.44)', '$4.07 · 16%', '$3.60 · 14.2%', '$4.32 · 17.0%', '$5.86 · 23.0%'],
          ['Montessori busy board ($31.51)', '$5.04 · 16%', '$4.80 · 15.2%', '$5.76 · 18.3%', '$7.83 · 24.8%'],
          ['The three, weighted by September’s sales', '16%', '16.7%', '20.1%', '25.2%'],
        ],
        note:
          'Price is September’s average sale for each product. The founders’ figure is their company-wide 2023 cost of goods applied to that price; they put shipping in a separate 20–22% line, so it compares with the make column. Make is each Alibaba supplier’s lowest listed price, averaged (the tables below). The tariff is ASSUMED at 20% (Section 301 plus the reciprocal rate on China), and freight is $496.67 per cubic metre, the low end of Freightos’ door-to-door LCL band from Shanghai: $1.54 for the puzzle’s 356 × 229 × 38 mm box, the same box standing in for the sign, which Amazon lists without a size, and $2.07 for the board’s 383 × 272 × 40 mm. This comparison does not change the margin below; “Test it first” uses the landed column.',
      },
      {
        /* The three supplier tables behind one tab bar (owner's call,
           2026-10-11: two or more supplier tables are always tabbed). Shares
           are of the whole brand's September revenue ($156,692), as the tab
           reads "of sales". */
        type: 'product-tabs',
        products: [
          {
            id: 'name-puzzles',
            label: 'Name puzzles',
            sharePct: 54.4,
            blocks: [
            {
              /* Ordered by track record. The 4.5+ rating filter was on. */
              type: 'table',
              id: 'alibaba-name-puzzles',
              caption: 'COGS on Alibaba — a personalised wooden name puzzle',
              attribution: 'alibaba',
              columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
              rows: [
                ['Yiwu City Novelty Party Crafts Co., Ltd', 'Verified · 9 yrs', '4.8★ from 27', '—', '50 pieces', '$5.69–6.55'],
                ['Guangzhou Sunlight Ornament Co., Ltd', '4 yrs', '5.0★ from 7', '—', '1 piece', '$11–13'],
                ['Yiwu Wowei Jewelry Co., Ltd', '3 yrs', '4.5★ from 206', '—', '20 pieces', '$3.14–3.99'],
                ['Shantou Chaofu Electronic Commerce Co., Ltd', '3 yrs', '4.5★ from 15', '—', '2 pieces', '$6–6.80'],
                ['Beijing Milejia Craft Co., Ltd', '2 yrs', '4.9★ from 34', '—', '50 pieces', '$5.50'],
                ['Average lowest price', '', '', '', '', '$6.27'],
              ],
              note:
                'A search for “custom wooden name puzzle”, filtered to a 4.5+ supplier rating; none was marked as an ad, and only one supplier is Verified. Two are near cousins of the product — a family-name animal puzzle, and a name jigsaw set into a busy board at a one-piece minimum — and are kept in. Lowest prices $5.69, $11.00, $3.14, $6.00 and $5.50.',
            },
            ],
          },
          {
            id: 'school-signs',
            label: 'School signs',
            sharePct: 21.1,
            blocks: [
            {
              type: 'table',
              id: 'alibaba-school-signs',
              caption: 'COGS on Alibaba — a first-day-of-school sign',
              attribution: 'alibaba',
              columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
              rows: [
                ['Taizhou Dingchuan Manufacture & Trade Co., Ltd', 'Verified · 12 yrs', '4.5★ from 11', '—', '100 pieces', '$2–4'],
                ['Yantai Puse Home Furnishing Co., Ltd', 'Verified · 8 yrs', 'No score shown', '—', '300 pieces', '$2.01–2.15'],
                ['Uionen International Trade Co., Limited (HK)', '2 yrs', '4.7★ from 44', '—', '1 piece', '$5.55–6.25'],
                ['Dongguan Doly International Trade Co., Ltd', '1 yr', '4.7★ from 15', '—', '3 pieces', '$4.78'],
                ['Yiwu Lianxiang Trading Firm', '1 yr', '5.0★ from 12', '—', '3 pieces', '$4.75'],
                ['Yiwu Jiangxuan Crafts Co., Ltd', '1 yr', '5.0★ from 2', '—', '50 pieces', '$2.51–2.95'],
                ['Average lowest price', '', '', '', '', '$3.60'],
              ],
              note:
                'A search for “custom wooden first day of school sign”, filtered to a 4.5+ supplier rating; none was marked as an ad. The two Verified factories quote $2 at minimums of 100 and 300; the small sellers quote twice that at three pieces. Lowest prices $2.00, $2.01, $5.55, $4.78, $4.75 and $2.51.',
            },
            ],
          },
          {
            id: 'busy-boards',
            label: 'Busy boards',
            sharePct: 11.1,
            blocks: [
            {
              /* 🚨 Three listing pages the owner chose (2026-10-11), replacing a
                 search whose two dearest results were a large wall panel and a
                 one-piece retail price ($11.22 then). research/kalotoys/suppliers.json. */
              type: 'table',
              id: 'alibaba-busy-boards',
              caption: 'COGS on Alibaba — a Montessori busy board',
              attribution: 'alibaba',
              columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
              rows: [
                ['Ningbo Eduland Toys Co., Ltd', 'Verified · 6 yrs · 31% reorder rate', '4.9★ from 70 (store)', '53', '200–300 sets', '$4.90–5.90'],
                ['Shenzhen Lucky Star Toys Trading Co., Ltd', '1 yr', '4.9★ from 6 (store)', '207', '5 pieces', '$4.70–5.30'],
                ['Average lowest price', '', '', '', '', '$4.80'],
              ],
              note:
                'Read from three listing pages rather than a search: two Eduland boards, one with a steering wheel and one with gears, and a Lucky Star sensory board, all Montessori busy boards made to order. Prices fall with volume — Eduland’s to $4.90 at 1,000 sets, Lucky Star’s to $4.70 at 500 — and the cost to make averages those lowest tiers. Neither listing has product reviews yet; the ratings are the stores’. KALOTOYS sells a 17-inch board, so a copy of the same size may cost a little more.',
            },
            ],
          },
        ],
      },
      { type: 'heading', text: 'The margin, on the founders’ own figures' },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 31.5% — and
           the backend seed builds the profit and ad-spend series from the SAME
           four numbers (COST_LINES in seed-kalotoys.ts). Change one, change
           both. Three of the four are DERIVED from self-reported shares; the
           labels below must keep saying so. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 25.07 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -16,
            detail:
              'About $4.01 of a $25.07 sale. Derived from the founders’ self-reported ~16% for the whole company in 2023, not quoted for any product. It has to cover imported inputs: wood they say cannot be bought in Vietnam and comes from cold-climate sources, Russia named; screws from China cut to a US standard; child-safe paint from a Japanese supplier; and testing to ASTM F963. Cut in their own Hanoi workshops, all by their own account.',
            links: [{ label: 'See the cost shares above', href: '#cogs-breakdown' }],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published rate for Toys & Games and for Handmade — 15% either way, and 15.01% per listing in Keepa. The one measured line.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'Shipping and fulfilment',
            pct: -21,
            /* The largest line — the component labels the emphasised line
               "Biggest line", so it belongs here, not on advertising. */
            emphasis: true,
            /* Keepa product record for B0GSZSCM69, read 2026-09-17:
               356 × 229 × 38 mm, weight not published, no fbaFees entry —
               it is made to order and merchant-fulfilled. The tier is read
               off the dimensions alone. sources.json carries the same. */
            detail:
              'Size tier: Large Standard. The best seller, the personalised name puzzle B0GSZSCM69, packs to 14.0 × 9.0 × 1.5 in — the 1.5 in is over Small Standard’s 0.75 in limit — and Amazon charges it nothing, because it is made to order and ships from the seller. Freight from Vietnam and delivery to the customer, at the founders’ self-reported 20–22% midpoint. Derived. A second founder statement, on video in September 2024, puts freight alone at about 20% of revenue on the all-Vietnam route — the route the planned US finishing workshop is meant to end, since a finished personalised board has to fly and a blank base can go by sea. Consistent too with the $5.52–6.13 FBA fee on the busy boards; the made-to-order listings ship themselves.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -16.5,
            detail:
              'Derived, on a self-reported basis: the founders’ 30–33% marketing share, which they said included platform commissions, less the 15% referral fee. The weakest line. The ads that can be seen on Amazon model at under 2% of revenue — a floor that misses several ad types, and Amazon alone — so the founders’ figure is kept, and the Advertising section shows both.',
            links: [
              { label: 'See the ad spend behind this line', href: '/business/kalotoys/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/kalotoys/advertising/' },
            ],
          },
        ],
        note:
          'Derived, self-reported basis: three of the four lines are the founders’ own 2023 company-wide shares. They also predate the product this page now runs on — the four name puzzles only listed in March 2026, and are about half of the month. Returns, payroll, overhead and the US entities’ own costs are all at zero here, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The same founders reported 2023 profit of 9.6 billion VND on 95 billion of revenue: a 10.1% net margin. Their cost shares leave 31.5%, or about 28% after the operating costs they named, so roughly 18 points of cost go unnamed — payroll, R&D, depreciation, interest, or the costs of Etsy and the websites that sit outside “marketing”. The profit on this page is what one Amazon brand contributes before those, and the company-level margin may be nearer 10%.',
      },
      {
        type: 'callout',
        text:
          'The margin block and the profit series on the chart are one model, so they cannot disagree. What neither can say is which side of that 18-point gap this brand sits on — the first thing to put to the owner.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Growth here is listing, not buying: new personalised products, put up on new seller accounts, fast enough that the account holding the hit changed within a year.',
      },
      {
        type: 'prose',
        text:
          'Almost none of the year’s growth came from the listings that were selling a year earlier. Four name puzzles went up on the Giftora account on 18 March 2026 and reached about 2,300 units a month by September. A run of personalised first-day-of-school signs followed in June, largely on the KALOTOYS GROUP account Keepa first saw that month, and 176 listings went up between June and August.',
      },
      {
        type: 'prose',
        text:
          'On a made-to-order catalogue that is the model rather than an accident. A personalised product is cheap to design and list, and whichever account lists the one that catches becomes, for a season, most of the business. The other side of it is a wide tail that sells little: of 234 priced listings, 29 carry a sold badge.',
      },
      {
        /* The cause the series cannot show. Every figure in this paragraph is
           the founders' own, from the two 2024–25 video interviews — none of
           it is measured here, and the labelling must stay. */
        type: 'prose',
        text:
          'By the founders’ own account the shift onto Amazon was deliberate, and self-reported throughout. Etsy was the main channel in 2023 — a top-ten store there by orders at the end of that year — Amazon started in 2024, and they describe it as roughly seventy times the size of Etsy for them. In January 2025 they named three priorities for the year: begin manufacturing in the United States, widen the range, and, with US production behind it, push Amazon hard. They also said they were raising about $2M to expand Vietnam capacity and about $8M of working capital, because the Amazon push eats cash faster than the other channels do.',
      },
      {
        type: 'prose',
        text:
          'Television moved orders, but not ones this page can see. They say nearly a thousand came in the day after the Shark Tank broadcast, with the flow elevated about two weeks — self-reported, and on channels nobody publishes. On Amazon there is no trace: the episode aired in August 2024, months before the first KALOTOYS listing with a believable date, and nothing in the catalogue carried a sold badge until March 2025.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot yet show is whether summer 2026 is a new level or a season. The series holds one back-to-school with the school signs in it.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-11, read at New York 10001. */
        type: 'strategy',
        label: KALO_AD.strategy,
        points: [
          'They buy 7 of the 15 biggest generic searches their listings rank on: a quarter of the ads on “1 year old toys” (106,321 searches a month), a third on “gift for 1 year old girl” and “wooden baby toys”, and sponsored #1–3 on five of them from New York.',
          'Almost all of the modelled money, $2,375 of about $2,730 a month, sells the personalised name puzzles; the school signs carry none.',
          'None of it is on their own name: “kalotoys” is too small a search for Jungle Scout to size, though a September read found 5 of 12 sponsored slots there were theirs, and 7 were rivals’.',
          'Ads on 336 of the 1,817 keywords their listings rank on. Modelled from outside the account, so a floor — and about a tenth of the founders’ own marketing share, which is what the margin uses.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: KALO_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the best-selling listings of the name puzzles, school signs, busy boards and the rest: exact-match monthly searches and the best organic position any of them held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword: these fifty carry ${monthUsd(topSpend(KALO_TOP_KEYWORDS))} of the ${monthUsd(KALO_AD.monthlyUsd.central)}, and the rest sits on smaller searches — every one of them is in the next table. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(KALO_AD_KEYWORDS, KALO_AD_KEYWORDS_TOTAL, KALO_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'This is not a brand that waits to be found. The name puzzles are bought onto the searches parents use for a first birthday — “gift for 1 year old girl”, “first birthday gifts”, “wooden baby toys” — and from New York a KALOTOYS listing held the first to third sponsored slot on five of the biggest. The busy boards, which the storefront leads with, buy almost nothing, and the school signs nothing at all: the summer’s second hit sold without paid search.',
      },
      {
        type: 'prose',
        text:
          'The two figures for what it costs are an order of magnitude apart. Modelled from the ads that can be seen, Amazon keyword advertising runs about $2,730 a month, under 2% of September. The founders said marketing took 30–33% of revenue including platform commissions, which leaves about 16.5% once Amazon’s referral fee is taken out — some $25,800 at this month’s sales. Their figure is the whole company in 2023, Etsy and their own websites included, and the model cannot see automatic campaigns, product-page ads, Sponsored Brands or Display. Neither settles it; the margin uses the founders’ figure because it is theirs.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(KALO_AD.monthlyUsd.central)} a month, ${linePct(KALO_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 336 of 1,817 keywords — Jungle Scout share of voice; sponsored #1–3 on five of the biggest generic searches read from New York, 11 Oct 2026',
            flag: true,
            note:
              `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid; band ${monthUsd(KALO_AD.monthlyUsd.low)}–${monthUsd(KALO_AD.monthlyUsd.high)} a month. The click rate, 3.1% (2.4–9.6%), is measured on two brands seen mainly through their ads. A floor: automatic targeting, product-page ads, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed.`,
          },
          {
            label: 'The founders’ marketing share',
            value: `${KALO_FOUNDERS_AD_PCT}% of revenue — self-reported`,
            counted: '30–33% “marketing, including platform commissions”, Shark Tank Vietnam (VTV, 6 Aug 2024), for the whole company in 2023',
            flag: true,
            note:
              'Less the 15% referral fee it included. This is the figure the Margin breakdown deducts (owner’s call): it is the company’s own, though for every channel and three years earlier.',
          },
          {
            label: 'Competitors on their name',
            value: '7 of 12',
            counted: 'Sponsored slots on the search “kalotoys” held by other brands, among them Joyreal and Potatomato — New York, 15 Sep 2026',
            note: 'Rivals pay to appear when a shopper types this brand. The name has search demand worth taking, and they do not hold all of it.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note:
              'The Meta Ad Library and paid-search history were not read. Absent here means unexamined, not zero — and the founders’ marketing share covers every channel, not Amazon alone.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line is the LAST row (check-profile
           compares them); the modelled Amazon keyword ads sit above it. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ['Amazon keyword ads — what the model sees', monthUsd(KALO_AD.monthlyUsd.central), linePct(KALO_AD.ratePct.central), lineUsd((KALO_ORDER * KALO_AD.ratePct.central) / 100), `Modelled: ${monthUsd(KALO_AD.monthlyUsd.low)}–${monthUsd(KALO_AD.monthlyUsd.high)} a month, a floor`],
          ['The founders’ marketing share — the margin line', monthUsd((KALO_REVENUE * KALO_FOUNDERS_AD_PCT) / 100), linePct(KALO_FOUNDERS_AD_PCT), lineUsd((KALO_ORDER * KALO_FOUNDERS_AD_PCT) / 100), 'Self-reported, 2023, every channel'],
        ],
        note:
          'What the Margin breakdown takes off for advertising is the last row, the founders’ own share. The row above is what the ads that can be seen on Amazon add up to; the gap between them is what neither source can explain alone.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Off Amazon there are three stores, an Etsy shop and three social accounts — and no reading of how many people visit any of them.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Traffic was not measured and no follower count was read. The Instagram and Facebook accounts are the ones kalotoys.com links to; the TikTok account is a Vietnamese-language one, whose follower figure came from a search summary and was not checked. The addresses are the stranger part: an Illinois registered address, a Texas fulfilment address, an Instagram tagged Houston, and a Hanoi company behind all of them.',
      },
      {
        /* 🚨 No rank table and no keyword table. Keepa files these listings'
           main rank under a root node the pull did not name, and no off-Amazon
           keyword read was taken — the Amazon search read is on Advertising. */
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Etsy — KalotoysOfficial',
            href: 'https://www.etsy.com/shop/KalotoysOfficial',
            value: 'Not read',
            flag: true,
            note:
              'By the founders’ account their primary channel, and a top-10 Etsy seller by orders in November 2023. The shop page returned 403 to a direct fetch, so no sales count was read and the claim is unchecked.',
          },
          {
            label: 'Own store — kalotoys.com',
            href: 'https://kalotoys.com/',
            value: '175 products',
            note:
              'Shopify, median $12.99 (range $2–59.99), products created November 2024 to September 2025. Prints a Vernon Hills, Illinois address and a fulfilment address at 1121 S Jupiter Road, Garland, Texas.',
          },
          {
            label: 'Own store — kalokid.com',
            href: 'https://kalokid.com/pages/about-us',
            value: '15 products',
            note: 'All created on 22 July 2026, at a median $39.99. The same Illinois and Texas addresses, with a US and an Australian phone number.',
          },
          {
            label: 'Vietnamese store — kalotoys.vn',
            href: 'https://kalotoys.vn/',
            note: 'The domestic line the founders described launching in 2024. Found through search, not opened.',
          },
          {
            label: 'Instagram — @kalotoys_official',
            href: 'https://www.instagram.com/kalotoys_official/',
            value: 'Count not read',
            note: 'Linked from kalotoys.com, and tagged Houston, Texas.',
          },
          {
            label: 'Facebook — kalotoys.official',
            href: 'https://www.facebook.com/kalotoys.official',
            value: 'Count not read',
            note: 'Linked from kalotoys.com.',
          },
          {
            label: 'TikTok — @kalotoys',
            href: 'https://www.tiktok.com/@kalotoys',
            value: '~18.7K, unchecked',
            note: '“KaloToys – Đồ Chơi Montessori”, in Vietnamese. The count is a search summary’s; the page was not opened.',
          },
        ],
      },
      {
        type: 'callout',
        text:
          'None of these can be sized from outside, and by the founders’ account together they are most of the company. The figures on this page describe the part that can be.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Công ty Cổ phần Kalo', note: 'Kalo Joint Stock Company · tax code 0110509128' },
          { label: 'Registered address', value: 'Hanoi, Vietnam', note: 'No. 35 Nguyen Xien, Khuong Dinh Ward' },
          { label: 'Founded', value: '2020', note: 'By Đồng Đức Thành (CEO) and Lê Trung Anh, by their own account' },
          { label: 'Staff', value: '100–199', note: 'Employer listing' },
          { label: 'Seller feedback', value: '26–60%', note: 'Three US accounts · read 15 Sep 2026', info: 'sellerFeedback' },
          { label: 'First listing', value: '23 Nov 2024' },
        ],
      },
      {
        /* 🚨 All three accounts named, and the two tied to KaloToys by
           inference SAY so in their row. A default pending the page owner's
           decision on how to name them (research README). */
        type: 'table',
        caption: 'The three US seller accounts',
        columns: ['Account', 'Legal name and address', 'Seller feedback', 'First tracked', 'Link to KaloToys'],
        rows: [
          [
            'KALOTOYS OFFICIAL · A343UID6F5X37S',
            'KALO KIDS CORPORATION, Vernon Hills, IL',
            '30% over 40 ratings',
            '16 Feb 2026',
            'Printed address and customs trail: kalotoys.com prints the same address, and US customs records ship to it from SNAP ECOM JSC at Kalo JSC’s Hanoi street address',
          ],
          [
            'Kalotoys · A2PA1HBQL5NIQH',
            'Giftora, Worcester, MA',
            '60% over 152 ratings',
            '2 Dec 2024',
            'Inference: its seller name, 31 KALOTOYS listings and a share of the buy box on two KALO KIDS listings — no document',
          ],
          [
            'KALOTOYS GROUP · A3783D15T8P9ZQ',
            'KALOTOYS GROUP, Sachse, TX',
            '26% over 43 ratings',
            '10 Jun 2026',
            'Inference: its name, its listings and a Texas address a few miles from the brand’s Garland fulfilment address — no document',
          ],
        ],
        note:
          'Feedback and addresses from Keepa’s seller records, read 15 September 2026; first-tracked dates are Keepa’s and trail an account’s real opening. Of September 2026’s brand revenue, 58.6% came through listings in Giftora’s storefront, 13.1% in KALO KIDS CORPORATION’s, 5.1% in both, and 23.2% outside both, where KALOTOYS GROUP holds the buy box.',
      },
      {
        type: 'prose',
        text:
          'How the goods are made is the one thing the founders have described in detail, and all of it is self-reported and unaudited. About 95% of a product is made in their own Hanoi factory, they said in September 2024, and the last 5% — cutting the child’s name into it — is to be finished in a US workshop; in January 2025 starting US manufacturing was named as one of three priorities for the year. The reason they give is freight. A finished personalised board has to fly, a blank base can go by sea, shipping was running at about 20% of revenue on the all-Vietnam route, and delivery took about 14 days from order against the three to five days Amazon shoppers expect.',
      },
      {
        /* 🚨 An INFERENCE, and labelled as one. The plan is dated and the
           fulfilment agrees with it; nothing documents where the engraving
           actually happens. Keepa, 2026-10-01: all four name puzzles ship
           from seller A2PA1HBQL5NIQH (Giftora), merchant-fulfilled, no Prime. */
        type: 'prose',
        text:
          'What the catalogue shows is consistent with that plan rather than proof of it. The busy boards carry Amazon’s own pick-and-pack fees, while all four name puzzles — half of September’s revenue — are merchant-fulfilled from the Giftora account with no Prime badge, read on 1 October 2026. The plan, the date they set for it and the way those listings ship all point the same way; no document says the engraving happens in the United States, so US finishing is an inference here and not a reading.',
      },
      {
        type: 'prose',
        text:
          'None of the three carries the company’s name, and all three run seller feedback far under Amazon’s comfort line — 26%, 30% and 60% positive when read. That rates dispatch and service rather than the products, which hold 4.4 stars across the top listings. The founders explained the unnamed accounts on air: many small brands, kept anonymous because competitors had interfered with them before.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from Keepa’s seller records for the three accounts, the brand store, US customs records and the founders’ interviews. Nobody at KaloToys has confirmed the link between the company and the Giftora or KALOTOYS GROUP accounts.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve profit, and it prices the KALOTOYS brand on Amazon US alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Etsy, kalotoys.com, kalokid.com, the Vietnamese store and the company’s other unnamed US brands are excluded: by the founders’ account most of the company, and none of it sizeable from outside. The profit being multiplied is a contribution ceiling on self-reported cost shares — the same founders reported a 10.1% net margin for 2023 — so on that basis this figure is an upper bound.',
      },
      {
        type: 'prose',
        text:
          'The positives are what the brand owns: its own designs made in its own workshops, personalisation a copier has to rebuild, an enrolled brand store and the reviews its top listings have gathered. The negatives are service and concentration: seller feedback of 26–60% across all three accounts, every measured dollar on Amazon US, and four listings carrying half the month.',
      },
      {
        type: 'prose',
        text:
          'Five inputs are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken from the public record; seller feedback is a blend of three accounts, two of them tied to the brand by inference; and the FBA-and-FBM answer is read from which listings carry Amazon’s fee. Brand Registry is firmer: Amazon gates the brand store behind enrolment. All of them are the first things to put to the owner.',
      },

      /* The validation test (build-ecom-biz-page §3a), read off the published
         estimate. 🚨 Priced on the ALIBABA landed costs (owner's call,
         2026-10-11), not the founders' 16%: it is what a new seller would pay.
         The name puzzles ONLY (54% of September), as Mount Cleverest tests its
         deck alone: the school signs have no search that qualifies and the
         busy boards' one priced search delivers 123 of the 300 clicks. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether the name puzzle sells, before you commit to a full launch — priced on what a factory in China asks a new seller, not on the founders’ own costs. The school signs and busy boards are not tested: too few of their searches carry a bid to buy the clicks a test needs.',
      },
      { type: 'validation-strategy' },
      /* Its landed cost is in the Alibaba comparison, not a landed-cost table:
         the margin rests on the founders' figures. */
      { type: 'validation-launch', landedHref: '/business/kalotoys/margin/#alibaba-comparison' },
    ],
  },

  maryruth: {
    /* 🚨 No headline copy here. Title, subtitle and snapshot month live on the
       Business row — backend prisma/seed-maryruth-headline.ts, from
       waithowmuch-research research/maryruth/headline.json (reviewed
       2026-09-15). This entry carries only the image beside them. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/maryruth/decb70154773dd495269c7b1ebaa03c0f8bde9ffc8570675365919681036a18f.png',
      image: {
        src: MARYRUTH_PHOTOS.hero,
        alt: 'MaryRuth’s Liquid Morning Multivitamin + Hair Growth in Peach Mango — an amber 15.22 fl oz bottle standing beside its orange-and-white box. The best-selling listing in the catalogue',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand, their own
             formulations, their own listings; whose factory makes them is not
             public. Private label is what transfers in a sale. */
          primaryMethod: 'private_label',
          /* Broad. 617 listings carry the name, the top 20 are half of revenue
             and the top 50 are 73%; the single largest listing is about 7% of
             the month. */
          catalogStructure: 'broad',
          /* Level 3, and the most arguable answer here. A liquid, USDA-organic
             formulation is a real change of form and materials from a capsule
             multivitamin; no tooling protects it. The case for level 2 is that
             a contract manufacturer can approximate a supplement formula for
             anyone. The step is worth 0.55 of the multiple. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/MaryRuthOrganics is gated behind
             enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the first listing, 2014-09-07 — also establishedAt. */
          sellingSince: '2014-09-07',
          /* 🚨 The research's reading of "39,143 Amazon ratings" at 4.5 stars.
             Which listings that count covers is not stated. It lands in the
             25,000+ band with room to spare; the 4.5 sits EXACTLY on a band
             boundary, and anything lower drops the factor from +0.20 to +0.05. */
          reviewTotal: 39143,
          ratingWeighted: 4.5,
          sellerFeedbackPct: 99,
          /* 🚨 topMarketplaceSharePct and marketplaces deliberately UNSET. The
             pull was Amazon US and no other marketplace was read, so how
             concentrated the Amazon business is cannot be answered — and 100
             would be a guess. The model lists it as missing; the board note
             says so. */
          /* Largest month against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 11.19,
          /* RULE 3: offAmazonSharePct unset. 22,780 retail doors and their own
             store are real, and most of the company, and unsized. */
        },
      },
      basis:
        'Trailing-twelve modelled net profit at a modelled multiple. The Amazon listings only — other sellers’ sales on them included — and not the company.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '617', note: '268 in their own storefront · 253 priced', info: 'skus' },
      /* Top level only: the research read ranks in Health & Household and not
         the deeper branch, so no `info` (its copy promises the full breadcrumb). */
      { label: 'Category', value: 'Health & Household', note: 'Hair-growth parent listing #143', wide: true },
      /* No `info` on these two: the shared ⓘ describes the hero listing, and
         the research does not say which listings the 39,143 covers. */
      { label: 'Product reviews', value: '39,143', note: 'Amazon ratings, as read 9 Sep 2026' },
      { label: 'Product rating', value: '4.5★', note: 'Against 2.6 on Trustpilot, over 25 reviews' },
      { label: 'Seller feedback', value: '99%', note: 'Over 36,747 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Own formulations; the factory is not public', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, long tail', note: 'Top 20 listings are half of revenue', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Functional customisation — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, 22,780 retail doors', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, and every figure on this profile is it. It is also a LISTING figure: Amazon’s badge counts what a listing sold, and the brand shares its listings with other sellers.',
      },
      'own-store': {
        status: 'yes',
        note:
          'maryruthorganics.com, on Shopify: 267 products at a $24.95 median, with Subscribe & Save at 10% off. The hero Liquid Morning Multivitamin is $42.95 there against $26.77 for the comparable Amazon listing. Shopify publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'The channel that reframes the rest. Their own store locator returns 22,780 US doors across 323 retailer banners — CVS, Walmart, Target, Ulta, Kroger, Whole Foods — and live product pages at Walmart, Target and Whole Foods were confirmed independently. Nobody publishes what a door sells.',
      },
      // amazon-international, tiktok-shop, other-marketplace and licensing
      // left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'FBA enabled on the seller record, and the margin model charges an FBA fee on every unit.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits their 268 storefront listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'unchecked',
        note:
          'Amazon itself appears as one of the offers on their top listings, which can mean Amazon buys the stock wholesale. The offer lists do not say on what terms.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and formulations, sold under their own name. The buy box on the top listings resolves to MaryRuth Organics, LLC.',
      },
      manufacturer: {
        status: 'unchecked',
        note: 'The products are described as largely US-made, which does not say whose factory. Left open rather than read as yes.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/MaryRuthOrganics, which Amazon gates behind enrolment.',
      },
      'subscribe-save': {
        status: 'yes',
        note: 'Advertised in the best-selling listing’s own images, and offered at 10% off on their own store. Subscription billing is also what the two open law-firm investigations are about.',
      },
    },

    intro:
      'MaryRuth’s makes liquid vitamins — a morning multivitamin you drink rather than swallow — along with gummies, liposomals and probiotic drops. Amazon is one of the ways it sells them, and the only one with a public number behind it.',

    blocks: [
      { type: 'heading', text: 'A multivitamin you drink' },
      {
        type: 'prose',
        text:
          'It started as a fix for one complaint. By the founder’s own account, clients of her Manhattan nutrition practice said capsule vitamins made them nauseous, so she made a liquid one and sold the first bottles off a bookshelf in the office — and, in her words, “I just happened to start putting them on Amazon.” The listing dates agree with her: the first ASIN went up on 7 September 2014, and maryruthorganics.com was registered on 31 December 2014.',
      },
      /* 🚨 The README's first rule for this business: say it is one channel
         before saying anything else about money. Kept in the overview so no
         reader reaches the chart without it. */
      {
        type: 'prose',
        text:
          'Read every figure on this page as one channel. The brand’s own store locator returns 22,780 US retail doors across 323 banners, and Forbes estimated the whole company at about $600M of trailing revenue in August 2026. Next to that estimate, the Amazon listings measured here are less than a third of the company.',
      },
      {
        type: 'prose',
        text:
          'And the Amazon figure is softer than a channel figure usually is. 617 listings carry the MaryRuth’s name; their own storefront holds 268 of them, and one kids’ multivitamin listing carries 298 competing offers. Amazon’s sales badge counts what a listing sold, not what each seller on it sold, and nothing public splits the two.',
      },
      /* No figures in the caption. The best seller's own secondary images —
         the hero already shows the bottle. Before/after claim images on the
         same listing were left out on purpose. */
      {
        type: 'images',
        items: [
          {
            src: MARYRUTH_PHOTOS.drink,
            alt: 'Listing image: a woman drinking an orange shot of the liquid multivitamin under the words “Upgrade your hair routine”, with Clean Label Project and B Corp marks',
          },
          {
            src: MARYRUTH_PHOTOS.serving,
            alt: 'Listing image: a MaryRuth’s measuring glass filled with orange liquid, labelled “Multiple essential nutrients in each serving” — vitamins A, B, C, E and zinc',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images for its best seller. The pitch is the format: a daily multivitamin taken as a measured shot rather than a capsule.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'Amazon came first, the website second and the retail doors later — the first listing went up four months before the domain was registered, the reverse of the usual order.',
      },
      {
        /* Oldest first — the dossier had 2024-12-31 before 2024-08-15. Events
           with no published day stay month- or year-only: on this list, off the
           chart, rather than given a day nobody recorded. */
        type: 'timeline',
        items: [
          {
            when: '2013',
            tag: 'Brand',
            what: 'A nutrition practice in Manhattan, before there is a product',
            detail:
              'The founder’s own account: a private practice whose clients said capsule vitamins made them nauseous. The liquid multivitamin is the answer to that complaint, and she says she sold the first bottles off a bookshelf in the office.',
          },
          {
            when: '7 Sep 2014',
            tag: 'Amazon',
            what: 'First Amazon listing — before the website',
            detail:
              'The Liquid Morning Multivitamin that went up a week later is still among the five largest earners twelve years on.',
          },
          {
            when: '31 Dec 2014',
            tag: 'Web',
            what: 'maryruthorganics.com registered',
            detail: 'Four months after the first ASIN. The first archived capture of the site is 22 June 2015.',
          },
          {
            when: 'Oct 2018',
            tag: 'Brand',
            what: 'A YouTube channel, and $11M in sales',
            detail:
              'The channel joined in October 2018. Forbes reports that year’s revenue at $11M, attributed to the company, on the way to $23M in 2019.',
          },
          {
            when: '15 Aug 2019',
            tag: 'Amazon',
            what: 'Kids Multivitamin Gummies',
            detail:
              'The move from liquids into gummies and into children’s vitamins. Today it sells 30,000+ a month — on a listing that carries 298 offers.',
          },
          {
            when: '21 Jan 2021',
            tag: 'Brand',
            what: 'The TikTok account is created',
            detail:
              'From TikTok’s own createTime, corroborated by the timestamp inside the user id. It now carries 624,900 followers and 1,691 videos — the brand’s largest owned channel.',
          },
          {
            /* Butterfly's press release, Business Wire, 5 Aug 2021. */
            when: '5 Aug 2021',
            tag: 'Brand',
            what: 'Butterfly Equity buys in',
            detail: 'A private-equity stake, announced 5 August 2021, in a year Forbes reports the company’s revenue at $135M.',
          },
          {
            when: '27 Sep 2022',
            tag: 'Amazon',
            what: 'USDA Organic gummies, for kids',
            detail:
              'Two of today’s fifteen largest listings went up this day, in a 2022 cohort of 113 new listings — the year the catalogue stops being a product line and becomes a shelf.',
          },
          {
            when: 'Jul 2023',
            tag: 'Brand',
            what: 'B Corp certified, at a score of 81.6',
            detail:
              'Against a passing mark of 80 and a median of 50.9 — a third-party audit of how the company operates, which is a different thing from an audit of its numbers.',
          },
          {
            when: '25 Aug 2023',
            tag: 'Amazon',
            what: 'Liquid Multivitamin + Hair Growth',
            detail:
              'The listing that changes the catalogue. It is the single biggest earner today, and “mary ruth hair growth” is now the second-largest Google search they rank for, at 74,000 a month.',
          },
          {
            when: '15 Aug 2024',
            tag: 'Brand',
            what: 'Butterfly sells the majority of its stake',
            detail:
              'Per the law firm that ran the deal, Butterfly kept a board seat and King Street financed the buyer. No price was disclosed. The claim that Butterfly “nearly tripled” the company is the seller describing its own track record.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '153 listings in a year, the catalogue’s biggest cohort',
            detail: 'More new ASINs in 2024 than in 2014 through 2021 combined.',
          },
          {
            when: '31 Mar 2025',
            tag: 'Advertising',
            what: 'Paid search peaks, then stops',
            detail:
              'Ubersuggest’s paid series runs from September 2024 and peaks in March 2025 at 19 keywords. From October 2025 it reads zero — while Similarweb calls paid search their largest channel in August 2026. The two do not agree.',
          },
          {
            when: 'Oct 2025',
            tag: 'Brand',
            what: '$420M of debt, and ~97% ownership',
            detail:
              'A Capital One facility due 2030, which Forbes reports left the founder owning about 97% of the company — in the year EBITDA first topped $100M.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: '$18.0M — the biggest month in the series',
            detail:
              '693,100 units. Unlike a gift business, December dips below November in every year of this series, and January recovers.',
          },
          {
            when: '27 Aug 2026',
            tag: 'Brand',
            what: 'Forbes puts the company at ~$600M and ~$125M EBITDA',
            detail:
              'An estimate, not a filing: this is a private company and none of it is audited. Set against it, the Amazon listings on this page are less than a third of the company — one estimate divided by another.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The line is Amazon’s own sales badge across the hundred best-selling listings, month by month from August 2023, which is as far back as Keepa recorded it for them. It climbs from about $5.7M that August to a high of $18.0M in November 2025; calendar 2025 came in 32% above 2024, and the last twelve months only about 3% above the twelve before. Of each month, a little under half is kept after cost of goods, Amazon’s fees and modelled advertising.',
      },
      {
        type: 'prose',
        text:
          'Some of the month-to-month wobble is Amazon’s rounding rather than the business. The badge moves in brackets, and at this volume a single listing stepping from 20,000 to 40,000 a month moves the total by half a million dollars.',
      },
      { type: 'chart' },
      {
        /* A table, not a breakdown — see maryruth.breakdown.mjs for why. */
        type: 'table',
        caption: 'The fifteen largest listings',
        columns: ['Listing', 'ASIN', 'Listed', 'Sold / mo', 'Buy box', 'Revenue / mo'],
        rows: MARYRUTH_TOP_LISTINGS,
        note:
          'The fifteen largest of 253 priced listings, read 9 September 2026 — together a little under half of the month on the chart, which is the top hundred. The other 85 are not itemised in this research, so no full breakdown is drawn. “Sold / mo” is Amazon’s badge, a bracket floor, and it counts the listing’s sales whoever made them. Five hair-growth listings share one parent.',
      },
      {
        type: 'callout',
        text:
          'Revenue cuts both ways here. Listings outside the top hundred count as zero, which makes it a floor on the catalogue; other sellers’ sales on the same listings count in full, which makes it a ceiling on the brand. Profit is a ceiling twice over — it takes the same margin off every unit and sets returns, overhead and inbound freight to zero.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Three channels are visible — Amazon, their own store and thousands of retail doors — and Amazon is the only one that publishes anything countable, which is not the same as being the biggest.',
      },
      {
        type: 'prose',
        text:
          'The channels do not agree on price. The hero Liquid Morning Multivitamin is $42.95 on maryruthorganics.com against $26.77 for the comparable Amazon listing, where the brand holds the buy box but shares the page: 177 offers on the original morning multivitamin, 38 on the hair-growth listing, 298 on the kids’ gummies.',
      },
      {
        type: 'prose',
        text:
          'The retail footprint comes from their own store locator, which returns every door: 6,750 CVS, 4,581 Walmart, 2,019 Target, 1,511 Ulta and 427 Whole Foods among 323 banners. Nobody publishes what a door sells, so what follows says which methods are in use and not what each is worth. A method nobody looked for is listed as unchecked.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $25.15 average sale, down to the little under half that is left — on a model that treats every unit sold on these listings as theirs.',
      },
      {
        type: 'prose',
        text:
          'Three of the four lines are published rates or quotes. The referral fee is Amazon’s own schedule, fulfilment the 2026 FBA rate card, and cost of goods is priced from supplier quotes for comparable bottles and gummies. Advertising is the one computed line.',
      },
      {
        type: 'table',
        caption: 'COGS — what it costs to make',
        columns: ['Quote', 'Region', 'MOQ', 'Lead time', 'Unit cost'],
        rows: [
          ['Guangzhou Green Health Pharmaceutical Technology Co., Ltd', 'Guangdong, CN', '3,000 bottles', 'not quoted', '$2.80–3.10 / bottle'],
          ['Guangzhou Marian Health Food Co., Ltd — gummies', 'Guangdong, CN', '500 pieces', 'not quoted', '$1.00–3.00 / unit'],
          /* 🚨 INVENTED in the dossier: nobody quoted it and it has no number.
             Kept, labelled, never quoted — and deducted nowhere. */
          ['Freight, duty and inbound — invented, nobody measured this', 'CN → US', '—', '—', 'not quoted'],
        ],
        note:
          'These price the category, not this brand: small minimums, from factories making product that is neither USDA-organic nor US-made, which much of MaryRuth’s is. So the cost-of-goods line could be high for a buyer of this volume or low for what it actually buys. The freight row has no figure, and nothing is deducted for it anywhere — which leaves the profit higher than a real month.',
      },
      {
        /* 🚨 100% less these lines is the profit rate the backend seed builds the
           series from (COST_LINES in seed-maryruth.ts). Change one, change both —
           check-profile.mjs fails if they drift. */
        type: 'margin',
        basis: { label: 'Average selling price, Sep 2026', value: 25.15 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -12,
            detail:
              'About $3.00 a unit, from the published quotes above. Not this brand’s cost: the quotes are small-order, non-organic and made in China.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published rate for Beauty, Health and Personal Care items above $10.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -18,
            emphasis: true,
            /* Keepa product record for B0CWS5QP8F, read 2026-10-13: 169 × 66 ×
               64 mm, 520 g, pick-and-pack $5.22. */
            detail:
              'Size tier: Large Standard. The best seller, Liquid Multivitamin + Hair Growth (B0CWS5QP8F), packs to 6.7 × 2.6 × 2.5 in at 18.3 oz: over Small Standard’s 0.75 in depth and its 16 oz weight, and Amazon charges it $5.22. About $4.50 a unit blended, because the gummies are lighter: small-standard at $3.45–3.78.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -0.76,
            amount: 0.19,
            detail: `MODELLED, not observed: amazon-adspend-spy's Sponsored Products spend, about ${monthUsd(MR_AD.monthlyUsd.central)} a month on the three best sellers, ${linePct(MR_AD.ratePct.central)} of their revenue, applied here to the whole brand. Automatic and product-targeting campaigns, Sponsored Brands and Display are invisible to it, so it is a floor.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/maryruth/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/maryruth/advertising/' },
            ],
          },
        ],
        note:
          'Before returns, overhead and inbound freight, all set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The model has a blind spot that matters more here than on most profiles: it applies the margin to every unit a listing sold, and on these listings some of those units are other sellers’. Forbes puts the whole company at roughly 20% EBITDA margins, after the overheads, retail costs and marketing this waterfall leaves out — so what is left below is what the listings could clear, not what the brand does.',
      },
      {
        type: 'callout',
        text:
          'The cost-of-goods line is the least certain figure on this profile, and the freight line has no figure at all. A real quote for either moves the margin more than anything else here.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Demand here is people looking for MaryRuth’s by name — and the founder is a bigger audience than the brand.',
      },
      {
        type: 'prose',
        text:
          'The five largest Google searches they rank for all contain the brand name: “mary ruths” at 90,500 a month, then “mary ruth hair growth” at 74,000. Organic search brings about 230,000 visits a month across 18,032 ranking keywords, and the first generic term, “kids vitamins”, sits at #3.',
      },
      {
        type: 'prose',
        text:
          'The product that moved the catalogue was hair growth. The Liquid Multivitamin + Hair Growth listing went up in August 2023, is now the largest earner, shares a parent ranked #143 in Health & Household with four other listings, and has turned its own name into their second-largest search term.',
      },
      {
        type: 'prose',
        text:
          'The audience is split between a person and a brand. The founder’s Instagram carries 733K followers against 28K on the brand’s own account, she runs her own Meta advertiser page, and creator handles run branded content paired with her name. TikTok is the brand’s real owned channel, at 624,900 followers since January 2021.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon, the growth is on shelves: 22,780 doors across 323 banners by their own locator, and an Inc. 5000 record of 1,336% three-year growth in 2022 and 642% in 2023.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot say is how the channels split. Forbes’ company estimate and the Amazon series are two estimates by different methods, and no public source divides the company’s revenue between Amazon, its own store and retail.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-13, read at
           New York 10001, for the three best sellers (catalogue brand: heroes). */
        type: 'strategy',
        label: MR_AD.strategy,
        points: [
          `About ${monthUsd(MR_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(MR_AD.monthlyUsd.low)}–${monthUsd(MR_AD.monthlyUsd.high)}) on the three best sellers, ${linePct(MR_AD.ratePct.central)} of their September revenue. Jungle Scout saw their ads on 103 of the 1,627 searches those listings show up on.`,
          'About 92% of it, roughly $28,500 a month, is on their own name: shoppers searching for MaryRuth’s, and the brand paying to keep competitors off those results.',
          'Of the thirteen biggest generic searches they rank on, they buy one, “hair growth supplements” (about 232,000 searches a month). “Multivitamin for women”, “womens multivitamin” and “vitamins” go unbought.',
          'Modelled from outside the account, and for three of 288 storefront listings, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: MR_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the three best sellers (Liquid Multivitamin + Hair Growth in four sizes, Hair Growth Max, Liquid Morning Multivitamin): exact-match monthly searches and the best organic position any of them held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(MR_AD.monthlyUsd.central)} in all. Read 13 October 2026.`,
      },
      adKeywordsTable(MR_AD_KEYWORDS, MR_AD_KEYWORDS_TOTAL, MR_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Amazon is not where this brand’s advertising money shows. Meta’s library counts about 390 live US ads on the brand page alone. On Google, Similarweb says paid search is their largest source of site traffic while Ubersuggest says they buy no paid keywords at all; the page shows both rather than choosing.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            href: 'https://www.amazon.com/s?k=maryruths',
            value: `≈ ${monthUsd(MR_AD.monthlyUsd.central)} a month on the three best sellers, ${linePct(MR_AD.ratePct.central)} of their revenue — modelled`,
            counted: 'Ads on 103 of 1,627 keywords the three listings rank on — Jungle Scout share of voice; searches read from New York, 13 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. It covers the three best sellers only. The Margin breakdown’s advertising line is still the earlier benchmark estimate until the per-product margins are rebuilt.',
          },
          {
            label: 'Meta (Facebook and Instagram)',
            href: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&view_all_page_id=582115538507595&search_type=page&media_type=all',
            value: 'Not estimable',
            counted: '~390 active US ads on the brand page',
            note:
              'The page-scoped count, three times what a keyword search shows. The founder has her own advertiser page and creator handles run branded content paired with her name — a whitelisting operation rather than a few boosted posts. Meta publishes the ads and never the money, and the library shows only active ads.',
          },
          {
            label: 'Google Ads',
            value: 'The two sources disagree',
            counted: '25.95% of site traffic from paid search (Similarweb) vs 0 paid keywords (Ubersuggest), August 2026',
            flag: true,
            note:
              'Ubersuggest’s paid series ran from September 2024, peaked at 19 keywords in March 2025 and reads zero from October 2025. The likely reconciliation is Shopping and Performance Max, which Ubersuggest does not index — but neither source settles it, so both are shown.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, built from MR_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...(MR_AD.products.length > 1 ? MR_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]) : []),
          ['Total — the margin line', monthUsd(Math.round((15033070 * MR_AD.ratePct.central) / 100)), linePct(MR_AD.ratePct.central), lineUsd((25.15 * MR_AD.ratePct.central) / 100), `Modelled: ${monthUsd(MR_AD.monthlyUsd.low)}–${monthUsd(MR_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising. The total applies the modelled rate to the whole brand’s snapshot revenue, $15,033,070, since the model reads the three best sellers; per sale is that share of the $25.15 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'For this business the half Amazon cannot see is most of the business: thousands of retail doors, a founder with a larger following than the brand, and a site found almost entirely by its own name.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The site figure needs one correction. Similarweb’s 750.8K visits is labelled a three-month total, so the store runs about 250,000 visits a month — 83.5% of them from the US, from an audience Similarweb reads as 76.9% female and concentrated in the 25–34 bracket.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Own-site visits', value: '~250K / mo', note: '750.8K reported over three months, not one' },
          { label: 'Month on month', value: '+6.6%', note: 'Similarweb, read 9 Sep 2026' },
          { label: 'Of which organic search', value: '230,773 / mo', note: 'August 2026, across 18,032 keywords' },
          { label: 'Domain authority', value: '40', note: '594,768 backlinks from 4,248 domains' },
          { label: 'Live Meta ads', value: '~390', note: 'Page-scoped count on their own page' },
          { label: 'Retail doors', value: '22,780', note: '323 banners, from their own store locator' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: '22,780 retail doors — their own store locator',
            href: 'https://www.maryruthorganics.com/pages/find-a-store',
            value: '323 retailer banners',
            flag: true,
            note:
              'The finding that reframes everything else here. The locator’s API returns every door: 6,750 CVS, 4,581 Walmart, 2,019 Target, 1,511 Ulta, 1,193 Kroger, 826 Publix, 640 Vitamin Shoppe, 598 Sam’s Club, 576 GNC, 497 Sprouts, 427 Whole Foods. Live product pages at Walmart, Target and Whole Foods were confirmed independently.',
          },
          {
            label: 'Founder’s Instagram — @maryruthghiyam',
            href: 'https://www.instagram.com/maryruthghiyam/',
            value: '733K followers · 750 posts',
            flag: true,
            note:
              '26 times the brand’s own Instagram, which has 28K followers and 156 posts. On this business the founder is the channel: she has her own Meta advertiser page, and creator handles pair their branded content with her name rather than the brand’s.',
          },
          {
            label: 'TikTok — @maryruthorganics',
            href: 'https://www.tiktok.com/@maryruthorganics',
            value: '624.9K followers · 2.4M likes',
            note:
              '1,691 videos, and the account was created on 21 January 2021 — measured twice, from TikTok’s own createTime and from the timestamp in the user id, which agree to within 106 seconds. The brand’s largest owned channel.',
          },
          {
            label: 'Facebook — MaryRuth Organics',
            href: 'https://www.facebook.com/maryruthorganics/',
            value: '264,031 likes',
            note:
              '6,874 “talking about this”, and the page that runs their ~390 live ads. Its transparency panel claims a creation date of 2004, before Facebook Pages existed — a merged-page artifact rather than a date.',
          },
          {
            label: 'YouTube and the dormant channels',
            href: 'https://www.youtube.com/@maryruthorganics',
            value: '8.98K subscribers · 945 videos',
            note:
              'Joined October 2018. X (@MaryRuths, 9,874 followers) is their oldest account, from July 2013, and last posted in 2025; Pinterest’s newest board is from 2021. Two channels left to idle is a choice, and at this size a visible one.',
          },
          {
            label: 'Own store — maryruthorganics.com',
            href: 'https://www.maryruthorganics.com/',
            value: '~250K visits / mo',
            note:
              'Shopify, 267 products, median price $24.95, Subscribe & Save at 10% off. The hero Liquid Morning Multivitamin is $42.95 here against $26.77 for the comparable Amazon listing.',
          },
          {
            label: 'Organic search — 18,032 keywords',
            href: 'https://neilpatel.com/ubersuggest/',
            value: '230,773 visits / mo',
            note:
              'Domain authority 40 on 594,768 backlinks from 4,248 domains. The five largest keywords by volume are all the brand’s own name — “mary ruths” at #1 against 90,500 searches, “mary ruth hair growth” at #2 against 74,000. They rank #3 for “kids vitamins” too, where a click costs $9.14.',
          },
        ],
      },
      {
        /* Best-seller rank, not Amazon keyword positions: Amazon publishes no
           volumes and localises results, while BSR is the same for everyone. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Health & Household', 'Note'],
        rows: [
          ['Liquid Multivitamin + Hair Growth, and its variations', '#143', 'Five ASINs share this parent listing; between them, the largest earner in the catalogue.'],
          ['Kids Multivitamin Gummies', '#535', '30,000+ a month at $14.46 — on a listing with 298 competing offers.'],
          ['Liquid Morning Multivitamin (2014)', '#1,063', 'The original product, still among the five largest earners twelve years after it was listed. 177 offers on it.'],
          ['Organic Lymphatic Support Liquid Drops', '#3,015', '30,000+ a month at $15.15 — high volume at a modest rank, which is what a cheap repeat purchase looks like.'],
        ],
        note:
          'Read from Keepa on 9 September 2026. Rank rather than keyword position, because Amazon publishes no search volumes and localises results to whoever is looking; best-seller rank is the same number for everyone. It moves daily.',
      },
      {
        type: 'table',
        caption: 'Search presence off Amazon',
        columns: ['Term', 'Where', 'Rank', 'Volume / mo'],
        rows: [
          ['mary ruths', 'Google', '#1', '90,500'],
          ['mary ruth hair growth', 'Google', '#2', '74,000'],
          ['mary ruth vitamins', 'Google', '#1', '40,500'],
          ['mary ruth organics', 'Google', '#1', '18,100'],
          ['mary ruth hair growth max', 'Google', '#4', '14,800'],
          ['liquid morning multivitamin hair growth', 'Google', '#3', '12,100'],
          ['kids vitamins', 'Google', '#3', '9,900'],
          ['vegan iron vitamins', 'Google', '#5', '9,900'],
          ['hair skin & nails gummy', 'Google', '#6', '8,100'],
          ['vegan liquid vitamins', 'Google', '#2', '6,600'],
        ],
        note:
          'Read 9 September 2026 from Ubersuggest, across 18,032 ranking keywords. The five largest all contain the brand name. Volumes are a keyword tool’s model of Google, not a count Google published, and say nothing about Amazon.',
      },
      {
        type: 'callout',
        text:
          'None of these numbers is a sale. Follower counts, visit estimates and search volumes measure attention, and nothing public connects any of them to an order on Amazon or in a store.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'MRO MaryRuth, LLC' },
          { label: 'Seller', value: 'MaryRuth Organics, LLC', note: 'Merchant A3V1QNHQ2M2TBN' },
          { label: 'First listing', value: '7 Sep 2014', note: 'Four months before the domain' },
          { label: 'Registered address', value: 'Los Angeles, CA, US', note: '1171 S Robertson #148, 90035' },
          { label: 'Seller feedback', value: '99%', note: 'Over 36,747 ratings · 345 in 30 days', info: 'sellerFeedback' },
          { label: 'Ownership', value: 'Founder, ~97%', note: 'Per Forbes, after a $420M facility in Oct 2025' },
        ],
      },
      {
        type: 'prose',
        text:
          'A private, founder-led company. Butterfly Equity took a stake in 2021 and sold the majority of it in August 2024, and Forbes reports the founder owning about 97% after a $420M Capital One facility closed in October 2025. The seller record is the sharpest thing about it: 99% positive over 36,747 ratings, 345 of them in the last thirty days. Where it operates from is less clear — the seller record gives Los Angeles, and the site’s terms give only a Delaware registered agent and New York governing law.',
      },
      {
        /* 🚨 The dossier's `record`, under its own rules: the regulator's
           classification leads, the company's framing sits beside it, the checks
           that came back clean are here too, and a law firm advertising for
           claimants is labelled as that and not as a case. */
        type: 'table',
        caption: 'The public record',
        columns: ['Record', 'Finding', 'What it is'],
        rows: [
          ['FDA recall, Class I', 'F-0214-2022', 'Organic Infants Liquid Probiotic, 25,673 units, for Pseudomonas aeruginosa. Initiated October 2021, terminated February 2022. Class I is the FDA’s most serious tier and the classification is the FDA’s; the company’s own notice is headed “Out of an Abundance of Caution”.'],
          ['FDA warning letters', 'None', 'Checked across the FDA’s published set for 2017 to 8 September 2026. No second recall either.'],
          ['California Prop 65 notices', 'None', 'No 60-day notice names the company; the search was validated against terms that do return results.'],
          ['Lead disclosed, highest lot', '33 ppb', 'Consumer Reports found MaryRuth’s among the few brands publishing lot-level heavy-metal results at all, and its highest disclosed lead figure the highest of those reviewed. A disclosure finding, not a contamination ranking.'],
          ['Subscription-billing investigations', '2 open', 'A plaintiffs’ firm inviting customers to get in touch, April and May 2026 — not a filed case, not a regulator and not a finding against anyone.'],
          ['Lawsuits', 'None open', 'A 2022 trademark suit with the company as defendant and a 2025 website-accessibility suit, both terminated; a 2024 state false-advertising class action over a kids’ focus product, voluntarily dismissed without prejudice. None concerned product safety.'],
          ['Better Business Bureau', 'F', 'Not accredited, driven by failure to respond to 10 of 12 complaints rather than by the complaints’ merit.'],
          ['Trustpilot', '2.6 / 5', 'On only 25 reviews — too thin to set against 39,143 Amazon ratings at 4.5, and shown beside them rather than instead.'],
        ],
        note: 'Read 9 September 2026 from the regulators’ and courts’ own records and the sources named for each.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the buy-box seller on the brand’s best-selling products and from the public records above.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business, and this is not a price for the company. It is a model — a 2.6 base multiple moved by what the public record supports — applied to trailing-twelve modelled profit on the Amazon listings alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Retail and their own store are excluded, and on Forbes’ estimate they are most of the company. Marketplace concentration is unscored too: no Amazon marketplace outside the US was read, so it is left out rather than guessed. And the profit being multiplied is a ceiling twice over — other sellers’ sales on the same listings, and a cost model with returns, overhead and freight at zero. Confidence on this profile is low.',
      },
      {
        type: 'prose',
        text:
          'The positives are durability and depth: twelve years of listings, a seller record at 99% over tens of thousands of ratings, reviews in the top band and revenue spread across the year rather than piled into one season. The model has no factor for what most weakens the figure — the reseller share of the listings — so the multiple is only as good as the profit under it.',
      },
      {
        type: 'prose',
        text:
          'Four answers are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken here from the public record, and the differentiation call alone is worth 0.55 of the multiple: a liquid, organic formulation is a real change of form, but a supplement is also something a contract manufacturer can approximate. The rating of 4.5 sits exactly on a band boundary. Brand Registry is firmer — Amazon gates the brand store behind enrolment. All of these are the first things to put to the owner.',
      },
    ],
  },

  'virora-mahjong': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-virora-mahjong-headline.ts, from
       waithowmuch-research research/virora-mahjong/headline.json — and the
       page reads them from the row alone. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/virora-mahjong/48f4c855256ada80aced793779fc8b6d2f71e51136c4957b7e2201ef15141527.png',
      /* The best seller, and more than half of the snapshot month by itself. */
      image: {
        src: viroraPhoto('B0H793VVWP'),
        alt: 'The Rose Pink 160-tile American mahjong set laid out in rows — dots, bams, craks, flowers, winds and butterfly jokers in pink and green on white tiles. Virora’s best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation`, deliberately. The series is ten months (December 2025
       to September 2026), so there is no trailing twelve to multiply, and the
       page would render an empty section. Add it — with inputs, and
       peakMonthSharePct from score-valuation.mjs — once twelve profit months
       exist, which will include the brand's first Christmas. */

    facts: [
      { label: 'SKUs', value: '53', note: '21 in the storefront seller’s own list; 8 badged in September', info: 'skus' },
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Tile Games',
        note: 'Best seller #21,842 in Toys & Games',
        info: 'category',
        wide: true,
      },
      /* The best seller's own listing — it is 54% of the snapshot month, so it
         can stand for the catalogue the way Spite House's hero did. */
      { label: 'Product reviews', value: '80', note: 'On the best-selling listing', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Best-selling listing', info: 'rating' },
      { label: 'Seller feedback', value: '95%', note: 'Storefront seller, over 22 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Own brand and trademark; the factory is unnamed', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* Sets carry the money and mats are the add-on sold to the same buyer.
         Not "Trend / seasonal churn": the relisting churn is the same set under
         new ASINs, not a catalogue retired and replaced. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'Sets are 74% of September; mats sold alongside', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* Not placed. A 4-layer acrylic set that Alibaba lists in volume argues
         for a low level; their own "hand-painted" claim argues higher and is
         unchecked. A "?" is the honest state until someone looks. */
      { label: 'Differentiation', value: '?', note: 'Not placed yet', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it. Every figure on this profile is Amazon US — counted across all three seller accounts that sell the brand’s listings, not the storefront seller alone.',
      },
      'amazon-international': {
        status: 'unchecked',
        note:
          'The storefront seller has an Amazon Canada account with no ratings, and no Canadian listing was read. It has no account on Amazon UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'viroramahjong.com, on Shopify: 30 products, the oldest record from 12 February 2026. Sets at $229, as on Amazon, and Christmas sets on pre-order at $299 — which Amazon does not carry. Shopify publishes no sales.',
      },
      'tiktok-shop': {
        status: 'unchecked',
        note: 'Their site links a TikTok account. Whether it runs a shop was not checked.',
      },
      // other-marketplace, wholesale-out and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'From the seller record, and Amazon charges an FBA fee on each listing read: $8.97 on a set and $11.29 on a mat, which is rolled and ships oversize.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 53 listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the brand’s listings.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand name, on listings under a trademark the storefront seller’s LLC owns — the trademark read second-hand, from a search index.',
      },
      /* 🚨 Unchecked, not yes. "Handcrafted by experienced artisans" is their
         own marketing, and a 4-layer acrylic set is listed in volume by
         Alibaba factories. A self-report does not answer this. */
      handmade: {
        status: 'unchecked',
        note:
          'Their marketing says the sets are shaped and painted by hand. Nobody has checked it, and near-identical 4-layer acrylic sets are listed in volume by factories.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Two of the three seller accounts are e-commerce companies in Xuzhou, China. Whether any of them owns the factory is not known.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/ViroraMahjong, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Virora Mahjong sells 160-tile acrylic American mahjong sets and rubber table mats, almost entirely on Amazon. The brand is ten months old there, and three different seller accounts sell its listings.',

    blocks: [
      { type: 'heading', text: 'One set, listed many times' },
      {
        type: 'prose',
        text:
          'Fifty-three Amazon listings carry the brand. Most are 160-tile, 4-layer acrylic American sets in Rose Pink, Purple, Green and Pink, with racks, dice and a tile bag in a gift box. Beside them sit mini sets for children, 3mm rubber table mats in a run of floral colourways, and — in the same storefront — three Pumiboo Christian sound books for toddlers.',
      },
      {
        type: 'prose',
        text:
          'The same set is often listed several times over. The Rose Pink set exists as at least five ASINs, and Amazon’s sold badge moves from one to the next within weeks. Two of the three accounts that sell the listings are e-commerce companies in Xuzhou, China, and one of them trades under the brand’s own name.',
      },
      /* 🚨 No figures in the caption. The brand's own secondary listing images
         from the best seller, in our bucket — the hero already shows the set. */
      {
        type: 'images',
        items: [
          {
            src: viroraPhoto('rack-and-mat'),
            alt: 'Listing image: layered pink, white and green mahjong tiles standing on clear acrylic racks over one of the brand’s pink-and-green floral mats',
          },
          {
            src: viroraPhoto('hand-painting'),
            alt: 'Listing image: a hand painting a tile with a fine brush beside rows of finished tiles, captioned “A Rare Traditional Craft, Mastered by Few and Made to Last”',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the set on its racks over one of their mats, and the hand-painting their marketing leans on — their own claim, and not one anybody has checked.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A Washington LLC, a trademark, a toddler’s sound book — and then, in eight months, a mahjong line that went from a first badge to its biggest month, sold through three accounts.',
      },
      {
        /* Oldest first. The LLC formation and trademark dates were read
           through a search index because both pages blocked the fetch, and
           each says so. Month-end revenue events sit on the last day of the
           month so the dot lands on the chart's point. */
        type: 'timeline',
        items: [
          {
            when: '4 Jun 2024',
            tag: 'Brand',
            what: 'Pacific Edge Innovations LLC is formed in Washington',
            detail:
              'The LLC behind the Amazon storefront. Read second-hand: the state-filing page was blocked, and the date comes from a search index’s copy of it.',
          },
          {
            when: '10 Sep 2025',
            tag: 'Brand',
            what: 'The VIRORA MAHJONG trademark is filed',
            detail: 'In the LLC’s name, by a search index’s copy of the record — also second-hand.',
          },
          {
            when: '20 Oct 2025',
            tag: 'Amazon',
            what: 'The catalogue’s first listing is a sound book',
            detail: 'A Pumiboo Christian sound book for toddlers. Three of them still sit in the storefront beside the mahjong line.',
          },
          {
            when: '11 Nov 2025',
            tag: 'Amazon',
            what: 'The first mahjong listing: a pink 160-tile set',
            detail:
              'First seen at $199. Over the last 90 days the account leading its buy box is Xuzhou Yuesu, not the storefront seller.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$27,135 — the first month with a sold badge',
            detail: 'One set listing at 100+ and the Pumiboo books. The chart starts here.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '$19,900 — the lowest month on the chart',
            detail: 'Two set listings at 50+ each, and nothing else badged.',
          },
          {
            when: '11 Feb 2026',
            tag: 'Brand',
            what: 'A YouTube channel opens',
            detail: 'Four videos reviewing their own sets, and nine subscribers when it was read.',
          },
          {
            when: '12 Feb 2026',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
            detail: 'viroramahjong.com now carries 30 products, with sets at the same $229 as on Amazon.',
          },
          {
            when: '8 Apr 2026',
            tag: 'Amazon',
            what: 'A second account called “Virora Mahjong” appears',
            detail:
              'Xuzhou Yuesu E-commerce Co., Ltd., first tracked by Keepa on this day. It now leads the buy box on 19 of the 32 brand listings outside the storefront.',
          },
          {
            when: '21 Apr 2026',
            tag: 'Brand',
            what: 'The trademark is registered',
            detail: 'Owner Pacific Edge Innovations LLC — read second-hand, and worth checking on the USPTO’s own system.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: '$158,142 — June more than doubles May',
            detail: 'Mats show up in the badge history for the first time. Most of the month sits on listings the Xuzhou account leads.',
          },
          {
            when: '30 Jul 2026',
            tag: 'Amazon',
            what: 'Today’s best seller goes up',
            detail: 'The Rose Pink set at $229, with the storefront seller holding its buy box outright.',
          },
          {
            when: '31 Jul 2026',
            tag: 'Amazon',
            what: '$213,050 — July',
            detail: 'An older Rose Pink listing carries 500+ at month end. It loses its badge on 18 August.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$302,245 — the biggest month so far',
            detail:
              'Eleven times December, and split almost evenly: $152,950 on the storefront seller’s listings and $149,295 on listings mostly held by Xuzhou Yuesu.',
          },
          {
            when: '8 Sep 2026',
            tag: 'Amazon',
            what: 'Six new listings in a day',
            detail: 'Among them four mats in new colourways. The relisting has not slowed.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Web',
            what: 'Christmas sets on pre-order at $299',
            detail:
              'Read on their own store this day; when pre-orders opened is not recorded. The refund policy already stretches returns for deliveries from 15 November to 25 December.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Amazon’s badge history for this brand starts in December 2025, its first month with a sold badge, so the chart holds ten months and no Christmas. Spring sat between $65,000 and $81,000 a month; June doubled it, and August came to $302,245, eleven times December. The last point is the live badge on 15 September — a trailing thirty days, not a calendar month — and it is lower mostly because listings the Xuzhou account holds lost their badges while the storefront seller’s held theirs. Of each month a little under half is kept, at September’s cost rates, and on a set cost nobody has quoted.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup only: the account exists
           with no ratings, and no Canadian listing was read (Keepa tokens ran
           out). The note says so rather than letting 0% read as measured. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US. The storefront seller has a Canadian account, but nothing there was read.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings; listings not examined' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further, so a small Canadian trade would not show here.',
      },
      {
        /* See virora-mahjong.breakdown.mjs. The rows sum to the 2026-09
           revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'Four set listings at $229 and four mats at $45 or less. The best seller, a Rose Pink set listed at the end of July, is more than half of the month on its own, and mats outsell sets nearly two to one by units.',
        items: VIRORA_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the price in effect, so every row is a floor. The purple set has no buy box today and is counted at the $229 set price. Two rows are listings another seller account leads; they are in because the series counts the brand, not one seller. The other 45 listings carry no badge and count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The series counts every listing carrying the brand, whichever of three seller accounts holds it — the storefront seller’s listings alone read nothing at all for May and June. Ten months is not a trailing twelve, so this profile carries no valuation yet.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Two channels are visible — Amazon and their own store — and on Amazon the brand is sold by three seller accounts rather than one.',
      },
      {
        type: 'prose',
        text:
          'The channels agree on price. A set is $229 on Amazon and $229 on viroramahjong.com, and a mat is $45 on both. The store also sells what Amazon does not: bags, a rack-and-pusher set and, when it was read, Christmas sets on pre-order at $299. It has no About page, and Shopify publishes no sales.',
      },
      {
        type: 'prose',
        text:
          'On Amazon the storefront seller holds the buy box on its own best sellers, 100% of the time on the top set. The listings outside its storefront are a different picture: an account in Xuzhou leads the buy box on most of them. What follows is presence rather than share, and a method nobody looked for is listed as unchecked.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'About half of a $110 average sale is left — and the line that decides it, what a set costs to make, is the one nobody has quoted.',
      },
      {
        type: 'prose',
        text:
          'Two products carry the brand. In September 550 sets at $229 made 74% of revenue and 1,000 mats at $45 the other 26%, and they cost very differently to make and to ship — so each has its own breakdown below, with the whole brand at September’s mix last. Every $10 on the set cost moves September’s profit by about $6,600.',
      },
      {
        /* 🚨 One breakdown per main product. Sets and mats are 74% and 26% of
           September's revenue — the two together are the first to reach 80%
           (SKILL §2, "Products"). Per-unit figures are pnl.json's lines; the
           `all` tab is the whole brand at September's mix, the margin the
           backend's profit series is built from (seed-virora-mahjong.ts
           COST_LINES). Only the chosen tab renders, so each can carry its own
           #cogs-breakdown. */
        type: 'product-margins',
        period: '2026-09',
        products: [
          {
            id: 'set',
            label: '160-tile set',
            sharePct: 73.8,
            blocks: [
              {
                /* Same columns as every profile's COGS table (white-mountain-
                   puzzles is the reference). Read from a screenshot of an
                   Alibaba search on 2026-10-02 — waithowmuch-research
                   research/virora-mahjong/suppliers.json keeps every listing. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a 160-tile set costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Ningbo Leti Trading Co., Ltd.', 'Not verified · 1 yr', '4.6★ from 3,066', '169', '1 set', '$18–130'],
                  ['Shenzhen Lvimi Technology Co., Ltd.', 'Not verified · 1 yr', '4.5★ from 154', '34', '1 piece', '$49–99'],
                  ['Shenzhen Finomai Technology Co., Ltd.', 'Not verified · 1 yr', '4.5★ from 119', '22', '1 set', '$49–99'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', '$38.67'],
                ],
                note:
                  'Six acrylic American-mahjong listings from three companies in China, all rated 4.5 or better, none Verified, each selling single sets — the price a buyer of one set pays, which a production order would likely beat. Four of the six are US local stock, which carries domestic shipping in the price. The cost to make takes each supplier’s lowest listed price — $18, $49 and $49 — and averages them: the low end, because it is what an order bigger than one set moves toward. Sold counts are Alibaba’s own per-listing counters added up per supplier. Searched “american mahjong set” with the 4.5+ supplier-rating filter.',
              },
              {
                /* The freight half of the landed cost, priced from the best
                   seller's own carton (Keepa, read 2026-10-02) at the same dated
                   LCL rate White Mountain uses — calibration/freight-rates.json in
                   waithowmuch-research. "What it costs to start" reads these same
                   numbers from its estimate rather than restating them. */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one set from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '43.6 × 25.0 × 7.4 cm, 3.25 kg', 'The best-selling set’s own package size (B0H793VVWP)'],
                  ['Volume', '0.00807 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per set', '$4.01', '0.00807 cbm × $497'],
                ],
                note:
                  'The rate is the low end of a $993–$8,482 estimate for a 2 cbm shipment; the top of that band prices express services a first order would not buy. It is door to door — customs clearance and delivery included — and excludes the duty, which is its own line. A set is heavy for its size, but sea freight on a part-container is charged by volume until a cubic metre weighs more than a tonne, so the box, not the 3.25 kg, sets the price.',
              },
              {
                /* Derived from the two tables above and the tariff line below —
                   no source logo, because nothing here was read on its own. */
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per set',
                noteColumns: [2],
                columns: ['Line', 'Per set', 'From'],
                rows: [
                  ['Production', '$38.67', 'The three Alibaba sellers’ lowest prices, averaged — COGS table above'],
                  ['Tariff', '$7.73', '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', '$4.01', 'This set’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', '$50.41', 'What one set costs in Amazon’s warehouse, before it sells'],
                ],
                note:
                  'The first three lines of the breakdown below, added up: $50.41 is 22.0% of the $229 price. It covers making the set and getting it to the warehouse — not the Amazon fees on the sale, which are their own lines.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: 229 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -16.89,
                    amount: 38.67,
                    emphasis: true,
                    detail: 'The average of the three Alibaba sellers’ lowest prices above — the low end, which is what an order bigger than one set moves toward.',
                    links: [{ label: 'See COGS breakdown above', href: '#cogs-breakdown' }],
                  },
                  {
                    label: 'Tariff',
                    pct: -3.38,
                    amount: 7.73,
                    detail: '20% of the cost to make: Section 301 List 4A 7.5% plus a 12.5% China tier, from a secondary summary, assuming China origin.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    /* $4.01 ÷ $229 = 1.751%. Was an ASSUMED $1.50 (0.66%) until
                       2026-10-05, when the set's carton was priced. */
                    label: 'Shipping',
                    pct: -1.75,
                    amount: 4.01,
                    detail: '$4.01 a set, priced from the best seller’s own carton at a read sea-freight rate, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 34.35,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -3.92,
                    amount: 8.97,
                    detail: 'Size tier: Large Standard. Measured on the best-selling set (B0H793VVWP), a 43.6 × 25 × 7.4 cm, 3.25 kg box.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -viroraAd('set').ratePct.central,
                    amount: viroraAd('set').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(viroraAd('set').monthlyUsd.central)} a month on set keywords, ${linePct(viroraAd('set').ratePct.central)} of September’s set revenue. Their ads show almost only on their own name; nothing of theirs is sponsored on “mahjong set” or “mahjong tiles”. A floor — it cannot see ads on product pages.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/virora-mahjong/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/virora-mahjong/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'mat',
            label: 'Mahjong mat',
            sharePct: 26.2,
            blocks: [
              {
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a 3mm rubber mat costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Guangdong Yousheng Sports Goods Co.', 'Verified · 9 yrs', '4.8★ from 39', '1,427', '500 pieces', '$5.20–6.20'],
                  ['Shenzhen Sammyhung Electronic Co., Ltd.', 'Not verified · 17 yrs', '4.8★ from 10', '1', '50–300 units', '$3.60–7'],
                  ['Yiwu Ruijie E-Commerce Co., Ltd.', 'Not verified · 1 yr', '4.1★ from 2', '1', '1 bag', '$25–28'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', '$4.40'],
                ],
                note:
                  'The cost to make averages the lowest listed price of the two suppliers quoting production orders, $5.20 and $3.60 — the low end, because it is what a production order moves toward. Yiwu Ruijie sells single mats at a retail price, not a factory one, and is left out; with it the average would be $11.27. Guangdong Yousheng’s mat is described as neoprene; Virora’s is sold as rubber. Read 17 September 2026.',
              },
              {
                /* Same rate and method as the set's table; the carton is the
                   best-selling mat's (Keepa, read 2026-10-05). */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one mat from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '87.6 × 8.9 × 8.9 cm, 2.56 kg', 'The best-selling mat’s own package size, rolled (B0H798Q5HK)'],
                  ['Volume', '0.00694 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per mat', '$3.45', '0.00694 cbm × $497'],
                ],
                note:
                  'The same Freightos reading as the set: the low end of a $993–$8,482 estimate for a 2 cbm shipment, door to door and excluding duty. A rolled mat ships in a long, thin tube, so it costs nearly as much to move as a set does — 78% of what it costs to make.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per mat',
                noteColumns: [2],
                columns: ['Line', 'Per mat', 'From'],
                rows: [
                  ['Production', '$4.40', 'The two production suppliers’ lowest prices, averaged — COGS table above'],
                  ['Tariff', '$0.88', '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', '$3.45', 'This mat’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', '$8.73', 'What one mat costs in Amazon’s warehouse, before it sells'],
                ],
                note:
                  'The first three lines of the breakdown below, added up: $8.73 is 19.5% of the $44.70 average mat sale. It covers making the mat and getting it to the warehouse — not the Amazon fees on the sale, which are their own lines.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: 44.7 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -9.84,
                    amount: 4.4,
                    detail: 'The average of the two production suppliers’ lowest prices above.',
                    links: [{ label: 'See COGS breakdown above', href: '#cogs-breakdown' }],
                  },
                  {
                    label: 'Tariff',
                    pct: -1.97,
                    amount: 0.88,
                    detail: '20% of the cost to make, on the same basis as the set.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    /* $3.45 ÷ $44.70 = 7.718%. Was an ASSUMED $1.50 (3.36%) until
                       2026-10-05, when the mat's carton was priced. */
                    label: 'Shipping',
                    pct: -7.72,
                    amount: 3.45,
                    detail: '$3.45 a mat, priced from the best-selling mat’s own rolled carton at the same sea-freight rate as the set.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 6.71,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -25.26,
                    amount: 11.29,
                    emphasis: true,
                    detail: 'Size tier: Large Bulky. Measured on the best-selling mat (B0H798Q5HK), which is rolled to 87.6 cm — past the standard-size limit, so a $45 mat pays more to ship than it costs to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -viroraAd('mat').ratePct.central,
                    amount: viroraAd('mat').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(viroraAd('mat').monthlyUsd.central)} a month on mat keywords, ${linePct(viroraAd('mat').ratePct.central)} of September’s mat revenue. No ad of theirs on “mahjong mat” or “mahjong mats”; what they buy is colour searches like “orange mahjong mat”. A floor, like the set’s.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/virora-mahjong/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/virora-mahjong/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* 🚨 The backend seed builds the profit and ad-spend series from
                   the SAME six numbers (seed-virora-mahjong.ts COST_LINES).
                   Change one, change both. Whole percents on purpose: they are
                   September's rates rounded (15.04, 3.01, 3.31, 9.51, 15) —
                   except advertising, which is amazon-adspend-spy's exact
                   central rate (VIRORA_AD, 0.186), the same figure the
                   Advertising section's Ad spend table prints. 46.186% off
                   leaves 53.814%. Until 2026-10-07 ads were an assumed 5%.
                   Shipping was an assumed $1.50 a unit (1%) until 2026-10-05. */
                type: 'margin',
                basis: { label: 'Average selling price', value: VIRORA_AD_ORDER },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -15,
                    emphasis: true,
                    detail: '$38.67 a set and $4.40 a mat, on September’s 550 sets and 1,000 mats: 15.0% of revenue. See each product’s tab for its suppliers.',
                  },
                  { label: 'Tariff', pct: -3, detail: '20% of the cost to make. 3.0% of revenue.' },
                  {
                    label: 'Shipping',
                    pct: -3,
                    detail: '$4.01 a set and $3.45 a mat, each priced from its own carton at a read sea-freight rate: 3.3% of revenue. See each product’s tab for the box.',
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -10,
                    detail: 'Size tier: Large Standard, on the best seller. $8.97 a set and $11.29 a mat, which ships Large Bulky. 9.5% of revenue.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -VIRORA_AD.ratePct.central,
                    detail: `Modelled, not observed: about ${monthUsd(VIRORA_AD.monthlyUsd.central)} a month across both products, ${linePct(VIRORA_AD.ratePct.central)} of September’s revenue. A floor: it counts sponsored ads in search and cannot see ads on product pages.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/virora-mahjong/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/virora-mahjong/advertising/' },
                    ],
                  },
                ],
                note:
                  'September’s mix, rounded to whole percents, and every month on the chart carries it — months heavier on sets, mini sets or books would come out differently. Mini sets and sound books carry assumed costs of $30 and $4 with no supplier read; neither sold in September. Before storage, returns, removals and overhead: a ceiling on profit, not profit.',
              },
            ],
          },
        ],
      },
      {
        type: 'prose',
        text:
          'The shape is the reverse of a cheap product’s. On a $229 set Amazon’s fulfilment fee is under 4% of the price and the factory is the cost; on a $45 mat the fee is a quarter of the price. So the mix matters: a month heavy on mats keeps less of each dollar than a month heavy on sets.',
      },
      {
        type: 'callout',
        text:
          'The set cost is the weakest figure on this profile and the one that moves it most. It stands in for a quote nobody has read — the first number to replace. Shipping and advertising are no longer placeholders: each product’s carton is priced at a read rate, and the ads are modelled from their actual sponsored footprint.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'Eleven times in eight months, with almost no audience off Amazon — whatever grew this brand, the public record did not catch it.',
      },
      {
        type: 'prose',
        text:
          'The climb came in two steps. December to May was a small business finding its level; June doubled it and August added half again. Both steps sit on a handful of badged listings, and in June and July most of the volume was on listings the Xuzhou account holds — so the growth belongs to the brand, and whose account booked it moved from one month to the next.',
      },
      {
        type: 'prose',
        text:
          'Relisting is how the catalogue grows, and it blurs the record. The Rose Pink set exists as at least five ASINs. One carried a 400–500 badge in late July and lost it on 18 August; another picked up 400–500 in September; six new ASINs went up on 8 September. A month-end read misses whatever moved mid-month, so each month here is more of a floor than a badge series usually is.',
      },
      {
        type: 'prose',
        text:
          'Sets are $229 now. Set listings were read at $169–209 before July, but those were different ASINs and several of the older prices are fallbacks, so the record shows newer listings at $229 more clearly than it shows the same set being repriced.',
      },
      {
        type: 'prose',
        text:
          'The first Christmas is ahead of the series, and they are preparing for it: Christmas sets on pre-order on their own store, and a refund policy that already extends returns across the holiday.',
      },
      {
        type: 'callout',
        text:
          'What the record cannot say is where the buyers come from. No bought placement was seen on Amazon, and the social accounts are close to empty — which leaves organic search, off-Amazon spend nobody read, or something else entirely.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-07. */
        type: 'strategy',
        label: 'Brand defence',
        points: [
          'Two-thirds of the modelled ad spend, about $213 of $317 a month, is their own name — chiefly around 90% of the sponsored results on “virora mahjong tiles”.',
          'None of the 15 biggest generic searches carries an ad of theirs: not “mahjong set”, “mahjong mat” or “mahjong tiles”, in Jungle Scout’s window or from New York. They rank there organically instead.',
          'The other $104 or so goes on narrow colour and style phrases, like “fall mahjong mat” and “orange mahjong mat”.',
          'Ads on 33 of the 740 searches their listings show up on. Modelled from outside the account, so a floor.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: VIRORA_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the eight listings that sold in September: exact-match monthly searches and the best organic position any of the eight held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among the eight. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword: these fifty carry ${monthUsd(topSpend(VIRORA_TOP_KEYWORDS))} of the ${monthUsd(VIRORA_AD.monthlyUsd.central)}, and the rest sits on smaller searches — every one of them is in the next table. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(VIRORA_AD_KEYWORDS, VIRORA_AD_KEYWORDS_TOTAL, VIRORA_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'On the big searches they rank without paying: #9 on “mahjong tiles”, #10 on “mahjong mat” and #31 on “mahjong set”, with no ad of theirs on any of them in Jungle Scout’s window or in a New York read the same day — though Amazon would charge $0.38–$0.87 a click to try. What they buy is their own name: about 90% of the sponsored results on “virora mahjong tiles”, which is $187 of the $317, and colour phrases like “orange mahjong mat”. On 15 September every sponsored result on “virora mahjong” was a competitor’s, so even the name is recent.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(VIRORA_AD.monthlyUsd.central)} a month, ${linePct(VIRORA_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 33 of 740 keywords, about 2% of their searches — Jungle Scout share of voice',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid. The click rate, 4.6% (2.3–6.5%), is measured off three brands on these same searches that are seen mainly through ads. It is a floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off. Nobody publishes the bill.',
          },
          {
            label: 'Meta, TikTok and Google',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising lines, row for row — both built
           from VIRORA_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...VIRORA_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${viroraBand(p.monthlyUsd)}`]),
          ['Total — the Whole brand line', monthUsd(VIRORA_AD.monthlyUsd.central), linePct(VIRORA_AD.ratePct.central), lineUsd((VIRORA_AD_ORDER * VIRORA_AD.ratePct.central) / 100), `Modelled: ${viroraBand(VIRORA_AD.monthlyUsd)}`],
        ],
        note:
          'What the Margin breakdown takes off for advertising, line for line: each product’s tab uses its own row, and the Whole brand tab the last. Per sale is the share of that product’s price, or of the $110.10 average order. Off-Amazon advertising was not read, so it is not in the line.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'A Shopify store and three social accounts their site links to — one with nine subscribers, two whose counts could not be read.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Off Amazon there is little to measure. The YouTube channel opened in February 2026 and holds four videos of their own sets. Instagram and TikTok showed no follower count to a logged-out reader, so their size is unknown rather than small. Visits to the store were not measured, and there is no keyword data for it.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Shopify products', value: '30', note: 'Oldest record 12 Feb 2026' },
          { label: 'YouTube', value: '9 subscribers', note: '4 videos, joined 11 Feb 2026' },
          { label: 'Instagram and TikTok', value: 'Unread', note: 'No count shown logged out' },
          { label: 'Store visits', value: 'Not measured' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — viroramahjong.com',
            href: 'https://www.viroramahjong.com/',
            value: '30 products',
            flag: true,
            note:
              'Shopify, with sets at $229 as on Amazon, mats at $45, bags at $59 and Christmas sets on pre-order at $299. No About page. Its footer links the three accounts below and a Facebook profile.',
          },
          {
            label: 'Instagram — @viroramahjongofficial',
            href: 'https://www.instagram.com/viroramahjongofficial/',
            value: 'Count unread',
            note: 'A post seen in search results calls it “the official home of Virora Mahjong”. The follower count did not show logged out.',
          },
          {
            label: 'TikTok — @viroramahjong',
            href: 'https://www.tiktok.com/@viroramahjong',
            value: 'Count unread',
            note: 'Linked from their store. The follower count did not show logged out, and whether it runs a TikTok Shop was not checked.',
          },
          {
            label: 'YouTube — @ViroraMahjong',
            href: 'https://www.youtube.com/@ViroraMahjong/about',
            value: '9 subscribers · 4 videos',
            note: 'Joined 11 February 2026. Reviews of their own tile sets.',
          },
        ],
      },
      {
        /* Best-seller rank off the listing via Keepa, not keyword positions —
           those are under Advertising, where the read is dated to one search. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Toys & Games', 'Subcategory', 'Rating'],
        rows: [
          ['Rose Pink 160-tile set', '#21,842', '#178 · Tile Games', '4.6★ over 80 reviews'],
          ['Pink and green rubber mat', '#15,463', '#24 · Game Mats & Boards', '4.9★ over 56 reviews'],
          ['Orange rubber mat', '#16,721', '#29 · Game Mats & Boards', '4.7★ over 71 reviews'],
          ['Green 160-tile set', '#31,653', '#256 · Tile Games', '4.8★ over 41 reviews'],
        ],
        note:
          'Read through Keepa. Rank moves daily. Variations share a parent listing, so a colour can carry its siblings’ rank and reviews.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Pacific Edge Innovations LLC', note: 'A Washington LLC' },
          { label: 'Seller', value: 'Virora Mahjong Official', note: 'Merchant A3UF1IAE6RV84W' },
          { label: 'Registered address', value: 'Spokane, WA, US', note: '100 N Howard St #7045, 99201 — a suite number' },
          { label: 'LLC formed', value: '4 Jun 2024', note: 'Read second-hand, from a search index' },
          { label: 'Trademark', value: 'VIRORA MAHJONG', note: 'Registered 21 Apr 2026 — read second-hand' },
          { label: 'Seller feedback', value: '95%', note: 'Over 22 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '20 Oct 2025', note: 'First mahjong listing 11 Nov 2025' },
          { label: 'Also selling the brand', value: 'Two accounts in Xuzhou, China', note: 'Xuzhou Yuesu E-commerce · Pacikwest USA' },
        ],
      },
      {
        type: 'prose',
        text:
          'The storefront seller is a Washington LLC with a Spokane suite address and a young account: 22 seller ratings. Its state filing and its trademark could not be opened — both pages blocked the fetch — so the formation date, a principal address in Lynnwood, Washington, and the trademark’s registration were read from a search engine’s copy of those pages. They are second-hand until someone reads the originals.',
      },
      {
        /* 🚨 The relationship between the three accounts is an INFERENCE and
           must stay worded as one. Shared brand name, shared listings and a
           shared county are circumstantial; nothing read ties them by
           ownership. Do not tighten this into a finding. */
        type: 'prose',
        text:
          'Two more Amazon accounts sell the brand’s listings, and both are e-commerce companies in Feng County, Xuzhou, Jiangsu, at the same postcode. Xuzhou Yuesu E-commerce Co., Ltd. trades as “Virora Mahjong” itself and leads the buy box on 19 of the 32 brand listings outside the storefront. Pacikwest USA, whose registered business name is run-together pinyin for Xuzhou Maixi E-commerce, turns up in earlier buy-box history. The shared name, shared listings and shared county read like one group selling through a US company — but that is an inference, not an established fact, and this profile’s decision to count all three accounts’ revenue as one brand’s rests on the same inference.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the seller record behind the brand’s Amazon storefront and from the buy-box history of the brand’s other listings.',
      },

      /* The least it costs to find out whether each product sells: the
         validation test, read off the business's published "to start" estimate
         (waithowmuch-research make-validation-launch.mjs --publish), so the
         section and the headline figure are one record. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text:
          'The least you would spend to find out whether each product sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },

  'kajun-loaded-tea': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-kajun-loaded-tea-headline.ts, from
       waithowmuch-research research/kajun-loaded-tea/headline.json (reviewed
       2026-09-15) — and the page reads them from the row alone. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/55b0be03bd6a9df75dc69338867ef1f58fb5cca320d85504d3bd7f5d3bc2b6e7.png',
      /* The best seller, the Louisiana Legends 10-pack — though at 6.8% of the
         month it leads by very little, which is the point of the subtitle. */
      image: {
        src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/358a9367e37488e32c0f96083281b194a9d0fdcb2b1be5b6e7884b6c355856b5.jpg',
        alt: 'The Kajun Loaded Tea variety 10-pack: ten cartoon-gator flavour packets — Crawdaddy Candy, Jazz Berry Jam, Fat Tuesday, Rougarou Rush and others — lined up in front of a gator-print mailer, between a purple and a red iced drink. The best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation` and no Valuation section, on purpose. The badge series
       is nine months (Jan–Sep 2026); the model multiplies trailing-twelve net
       profit and valuation/inputs.mjs refuses to annualise fewer months. Add
       `valuation.inputs` once twelve profit months exist — not before. */

    facts: [
      { label: 'SKUs', value: '44', note: '43 priced, 43 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Grocery & Gourmet Food › Beverages › Bottled Beverages, Water & Drink Mixes › Powdered Drink Mixes & Flavorings › Soft Drink Mixes',
        note: '40 of the 44 listings; best rank #7,268 in Grocery & Gourmet Food',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-20 figures, not one hero's, so NO `info` key: the shared ⓘ copy
         describes a single best-selling listing, and here that listing is 6.8%
         of revenue with 30 reviews. */
      { label: 'Product reviews', value: '3,439', note: 'Across the top 20 listings — a floor' },
      { label: 'Product rating', value: '4.45★', note: 'Review-weighted, top 20 listings' },
      { label: 'Seller feedback', value: '94%', note: 'Over 141 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Who makes the packets is not known', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* An INFERENCE, placed by us: one product type — a box of five packets —
         in every flavour, holding 34 of 48 organic results on its own category
         search. The case against is that "loaded tea" is a narrow term and a
         rival outspends them on it. Differentiation is left out rather than
         guessed: nothing scores it on this profile, and the formula is unknown. */
      { label: 'Catalogue', value: 'Category dominance', note: 'One box in 40 flavours — inferred', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store; TikTok Shop and Etsy unsized', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it. Every figure on this profile — the chart, the breakdown, the margin — is Amazon US and nothing else.',
      },
      'amazon-international': {
        status: 'no',
        note:
          'The seller id does not exist on Amazon UK, Germany or Canada. Other Amazon marketplaces were not looked up.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'kajunloadedtea.com, on Shopify, read directly: 69 products, singles at $3.19 and five-packs at $15.95 — the Amazon price. It came before Amazon, and Shopify publishes no sales, so the channel that may be the older and larger one is unsized.',
      },
      /* 🚨 unchecked, NOT yes and NOT no. A TikTok Shop and an Etsy shop under
         the brand name exist in search results, but both pages refused a
         direct read (404 / 403), so neither was opened, let alone sized. */
      'tiktok-shop': {
        status: 'unchecked',
        note:
          'A store page appears in a search engine’s index with 38.3K followers and 272.4K items sold over its life; a direct fetch returned 404. Probably live and possibly large — but not read, and not sized.',
      },
      'other-marketplace': {
        status: 'unchecked',
        note: 'An Etsy shop under the brand name appears in search results; the page returned 403 and nothing on it was read.',
      },
      'wholesale-out': {
        status: 'no',
        note:
          'Not yet: their wholesale page reads “Coming Soon”, with an email sign-up and a login at wholesale.kajunloadedtea.com but no terms. One to re-check.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the 44 storefront listings, nor any of the 65 other listings under the brand name.',
      },
      // licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record, with a per-listing FBA fee on every box — the largest line in the cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the listings between FBA and FBM. Their own store ships from a “facility” of its own, by its About page.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand, flavour names and packet art, on listings where they hold 100% of the buy box.',
      },
      manufacturer: {
        status: 'unchecked',
        note:
          'Where the packets are filled is not known. The cost model prices them from Chinese OEM sachet quotes, which says nothing about who actually makes them.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/KajunLoadedTea, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Kajun Loaded Tea sells sugar-free energy-tea powder from Denham Springs, Louisiana, in packets named for the state — Crawdaddy Candy, Fat Tuesday, Rougarou Rush. It sold through its own store before it came to Amazon, where the catalogue is one box of five packets in 40 flavours.',

    blocks: [
      { type: 'heading', text: 'One box, forty flavours' },
      /* Dated readings only — prices and counts as read on 2026-09-15. No live
         headline figure is typed in. */
      {
        type: 'prose',
        text:
          'Almost every listing is the same object: a box of five single-serve powder packets, each made up into a large iced drink with caffeine from green tea and guarana and no sugar. Forty single-flavour boxes sell at $15.95, beside a Crew Favorites variety 5-pack at the same price, a Louisiana Legends 10-pack at $31.90 and a caffeine-free 6-pack at $19.14.',
      },
      {
        type: 'prose',
        text:
          'The names do the selling. Voodoo Queen, Gumbo Yaya, Atchafalaya Apple, Fais do-do — each flavour is a blend of two to five candy and fruit notes with a Louisiana name and its own cartoon gator on the packet, and the range is organised by flavour rather than by what the drink does. Every Amazon box carries the same caffeine; the one exception is the caffeine-free UNLoaded variety pack listed in August 2026.',
      },
      {
        type: 'prose',
        text:
          'Buyers rate them well rather than exceptionally. The twenty best-selling listings run from 4.2 to 4.8 stars, with 3,439 reviews between them at a review-weighted 4.45, and the seller account holds 94% positive feedback over 141 ratings — a young account by count.',
      },
      /* The brand's own images from its Shopify store, not listing thumbnails —
         the breakdown already shows every box. In our bucket, not hotlinked. */
      {
        type: 'images',
        items: [
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/b2ae883b58c90f99aef717bf121452f2b51c40b51c9307dc4666220b194d040a.jpg',
            alt: 'Kajun’s own product image for Crawdaddy Candy: a red iced drink in a clear cup beside its packet, which shows a cartoon crawfish-gator in a top hat, over copy about zero calories, zero sugar and caffeine from green tea and guarana',
          },
          {
            src: 'https://storage.googleapis.com/verifiedmargins/products/kajun-loaded-tea/7c6809d904136ee4f6b7f326bd6c7555dcfb6cfaaf9adaa240e08908512a665a.jpg',
            alt: 'Kajun’s own “What’s in a Kajun Loaded Tea?” image: a blue drink in a glass jar beside a tie-dyed packet with the Mardi Gras heart logo, listing a green tea base, caffeine and vitamins',
          },
        ],
        caption: 'Two of the brand’s own product images, from its Shopify store: a packet beside the drink it makes, and what goes into one.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A brand with its own domain since 2023 and its own store before Amazon — then nine months of badge history in which Amazon revenue rose every month.',
      },
      {
        /* Oldest first. 🚨 The trademark dates (first use 2023-02-28, filed
           2025-08-07, registered 2026-02-24) are NOT dots: they were read from a
           search engine's index of a page that returned 403, and the dossier
           says to check TSDR before quoting any of them. */
        type: 'timeline',
        items: [
          {
            when: '23 Mar 2023',
            tag: 'Web',
            what: 'kajunloadedtea.com registered',
            detail:
              'From the domain record. The trademark claims use in commerce from a month earlier, but that date is a reading of a search index and has not been checked against the USPTO’s own record.',
          },
          {
            when: '22 Apr 2025',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store: Crawdaddy Candy',
            detail:
              'Most of the core flavours follow on 29 April, at $3.19 a packet and $15.95 a five-pack — the price Amazon carries now. Shopify publishes no sales, so what the store sold before Amazon is not known.',
          },
          {
            when: '2 Oct 2025',
            tag: 'Amazon',
            what: 'The first Amazon listings go up',
            detail:
              '38 of today’s 44 storefront listings were listed in October 2025 and four more in November: one catalogue launched at once, not a stream of launches.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: '$6,380 — the first month with a badge',
            detail:
              'Only three listings had crossed Amazon’s threshold of roughly 50 sales a month; the rest count as zero. October to December are unmeasured, not empty, so this is a starting point for the data rather than for the business.',
          },
          {
            when: '28 Feb 2026',
            tag: 'Amazon',
            what: 'February: $94,105, with 22 listings badged',
            detail:
              'The steepest step on the chart. Much of it is listings crossing the badge threshold — partly the business, partly the method.',
          },
          {
            when: '8 Apr 2026',
            tag: 'Amazon',
            what: 'Sour Swamp Pop reaches 1,000 a month',
            detail:
              'Since July its badge has flipped between 1,000 and 2,000 more than a dozen times. This page counts it, and twelve other listings, at 1,000.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: 'June: $376,420, up 55% on May',
            detail:
              '40 listings badged, the same as May — so this rise is the same listings selling more, not more listings being counted.',
          },
          {
            when: '24 Jul 2026',
            tag: 'Amazon',
            what: 'The Louisiana Legends variety 10-pack is listed',
            detail: 'At $31.90, twice the single box. By September it is the best-selling listing in the catalogue.',
          },
          {
            when: '4 Aug 2026',
            tag: 'Amazon',
            what: 'A caffeine-free UNLoaded variety 6-pack',
            detail:
              'The first Amazon listing outside the caffeinated format. The UNLoaded flavours were already on their own store, where the product records date from February 2026.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: 'August: $464,145',
            detail: '41 listings badged. The climb flattens here: the live September reading is only just above it.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        /* 🚨 "About half the month is capped" is load-bearing: 13 listings,
           47.5% of September, show the 1,000 badge, which is the bottom of a
           bracket. Keep it wherever revenue is explained. */
        type: 'prose',
        text:
          'The series is Amazon’s own “bought in past month” badge on every listing, read at each month end since January 2026 and priced at the September buy box — nine months, because no listing sold enough to carry a badge before then. It is a floor twice over. A listing under about 50 sales a month counts as zero, and about half of the latest month sits on thirteen listings showing 1,000, which is the bottom of a bracket rather than a count; six of them have shown 2,000 at points since July. Of what it sells, a little over a third is kept once Amazon’s fees, the packets and modelled advertising come off — before returns, storage and overhead, and on two costs nobody has quoted.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record looked up on each marketplace
           (2026-09-15). UK, DE and CA stay in at 0% because "looked and found no
           account" is the finding. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. The same seller id does not exist on Amazon UK, Germany or Canada.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon UK, Germany and Canada', short: 'UK, DE, CA', share: 0, note: 'No seller account on any of the three' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Other Amazon marketplaces were not looked up.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The 43
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing is 7% of the month. The ten best sellers are 37% of revenue and the top twenty about two thirds — and 40 of the 43 rows are the same $15.95 box in a different flavour.',
        items: KAJUN_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, which is a band — hence n+ — and 13 rows sit on 1,000, the bottom of a bracket that runs to 2,000. Revenue is that band times the 15 September 2026 buy box, so every row is a floor. The 44th storefront listing, a 25-packet variety bundle, has no price and no badge and is not a row.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The floor is the badge: about half the month is capped at 1,000 a listing. The ceiling is the cost model: returns, storage and overhead are zero, and two of its five lines are placeholders. Margin breakdown says which.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is the only channel with a number behind it, and it may not be the biggest. The brand sold through its own store first, and its TikTok Shop and Etsy shop are real but unsized.',
      },
      {
        type: 'prose',
        text:
          'The two channels that could be read agree on price: $15.95 for a box of five on Amazon and on kajunloadedtea.com, where a single packet is $3.19 — exactly what the Amazon box works out to per packet. Nobody else sells on their listings either: this seller holds 100% of the buy box on each of its twenty best sellers, and Amazon itself offers none of the 44.',
      },
      {
        type: 'prose',
        text:
          'What follows is presence rather than share. Nobody publishes what a Shopify store, a TikTok Shop or an Etsy shop takes, so this says which methods are in use and not what each is worth. A channel only glimpsed in a search index, or never looked for, is listed as unchecked rather than counted.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $16.56 average sale, down to the little over a third that is left — after Amazon takes more than twice what the box and its packets cost.',
      },
      {
        type: 'prose',
        text:
          'Amazon’s two cuts are the largest part of the stack. Grocery’s referral fee is 15% on a sale above $15.00 and 8% at or below it, and the box sells at $15.95 — 95 cents over the line. FBA charges $3.54 to pick, pack and ship a box of five whatever it sells for. Together they take 37% of the sale.',
      },
      {
        type: 'table',
        caption: 'COGS — what the box costs to make',
        columns: ['Quote', 'Region', 'MOQ', 'Unit cost', 'Per box of five'],
        rows: [
          ['Guangdong Jbyk Pharmaceutical Technology — electrolyte drink-mix sachets', 'Guangdong, CN', '30,000 pieces', '$0.22–0.35 / packet', '$1.10–1.75'],
          ['Shenzhen Lifeworth Biotechnology — energy drink-mix sachets', 'Guangdong, CN', '500 bags', '$0.45–0.50 / packet', '$2.25–2.50'],
          ['Used below — the midpoint of the two ranges', '—', '—', '$0.36 / packet', '$1.80'],
          ['Outer box + inbound freight to FBA — a placeholder, not a quote', '—', '—', '—', '$0.75'],
        ],
        note:
          'These price the category, not Kajun: Chinese OEM quotes for similar sachets, published on Alibaba. Where Kajun’s packets are actually filled is not known, and a US co-packer would cost more. The box-and-freight line is our placeholder; nobody quoted it.',
      },
      {
        /* 🚨 The margin row is 100% less these lines — 36.7% — and the backend
           seed builds the profit and ad-spend series from the SAME five numbers
           (COST_LINES). Change one, change both. Two lines are placeholders and
           must keep saying so. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 16.56 },
        lines: [
          {
            label: 'Packets — powder, sachet, fill',
            key: 'cogs',
            pct: -11.3,
            detail:
              '147,400 packets at $0.36 each — a little over five packets per sale on average, because of the 10-pack. Derived from the published sachet prices above, not a quote to Kajun.',
          },
          {
            label: 'Outer box + inbound freight',
            pct: -4.5,
            detail: '$0.75 a box. A placeholder, not a quote — nobody published a carton or a freight lane for this business.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Grocery & Gourmet rate for a sale above $15.00.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -21.6,
            emphasis: true,
            /* Keepa product record B0FVBCBNYH: 189 × 149 × 17 mm, 60 g, pick-and-pack $3.54, read 2026-10-13. */
            detail:
              'Size tier: Small Standard. The best seller, a Crawdaddy Candy box of five (B0FVBCBNYH), packs to 7.4 × 5.9 × 0.67 in at 2.1 oz, inside Small Standard’s 0.75 in and 16 oz limits. $3.54 per box of five and $4.35 per 10-pack, from Keepa’s per-listing fees. The largest line, and one the price does not move. The 6-pack’s fee was not read and is charged at $3.54.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -0.403,
            amount: 0.07,
            detail: `MODELLED, not observed: amazon-adspend-spy's Sponsored Products spend, about ${monthUsd(KJ_AD.monthlyUsd.central)} a month on the ten biggest listings, ${linePct(KJ_AD.ratePct.central)} of their revenue, applied here to the whole brand. Automatic and product-targeting campaigns, Sponsored Brands and Display are invisible to it, so it is a floor.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/kajun-loaded-tea/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/kajun-loaded-tea/advertising/' },
            ],
          },
        ],
        note:
          'Before returns, storage, overhead and owner pay, all set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'The shape is the reverse of most physical products. What is inside the box is the smallest real cost, and the largest is getting it to the customer through Amazon — which charges by the box, not by the price, and takes its referral cut at the higher of Grocery’s two rates.',
      },
      {
        type: 'callout',
        text:
          'Two lines here are ours, not theirs: $0.75 a box for the carton and freight, and the 30% of units taken as ad-attributed. Across the ranges the dossier tested, they are the difference between keeping under a third of a sale and over two fifths — and both are the first things to replace with real numbers.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'A brand new to Amazon, not a new brand: the names, the store and the following existed first, and the Amazon catalogue went up in one go and filled in month by month.',
      },
      {
        type: 'prose',
        text:
          'Almost the whole catalogue went up in October and November 2025, and nothing sold enough to carry a badge until January. Then the badges spread — 3 listings in January, 22 in February, 32 in April, 40 by May — and from May the count barely moved while revenue kept climbing. The first half of the chart is listings arriving in the data; the second half is the same listings selling more.',
      },
      {
        type: 'prose',
        text:
          'That is demand that arrived already formed. The brand’s own press pitch calls it women-founded and “well-known on TikTok” with “a strong, community-driven following”, and a search engine’s index of its TikTok Shop shows 38.3K followers and 272.4K items sold over its life. Neither figure was read on the page itself, so they describe a following rather than measure one.',
      },
      {
        type: 'prose',
        text:
          'The newer growth is format, not flavour. The two listings added since launch are bundles — the Louisiana Legends 10-pack in July 2026, now the best seller, and a caffeine-free 6-pack in August — a bigger order on the same packets rather than another name.',
      },
      {
        type: 'callout',
        text:
          'What the public record cannot say is how much of this demand Amazon created and how much it only collected. Their own store and their TikTok Shop sell the same boxes, and neither publishes a number.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-13, read at
           New York 10001. */
        type: 'strategy',
        label: KJ_AD.strategy,
        points: [
          `About ${monthUsd(KJ_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(KJ_AD.monthlyUsd.low)}–${monthUsd(KJ_AD.monthlyUsd.high)}), ${linePct(KJ_AD.ratePct.central)} of September revenue. Jungle Scout saw their ads on 182 of the 689 searches those listings show up on.`,
          'About 25% of it, roughly $471 a month, is on their own name; the rest is long, specific phrases.',
          'Of the 14 biggest generic searches they rank on, they buy 3: “dunkin refresher packets”, “the loaded tea shop packets”, “loaded tea packets with caffeine”.',
          'Modelled from outside the account, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: KJ_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for Loaded tea packets: exact-match monthly searches and the best organic position any of the listings held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(KJ_AD.monthlyUsd.central)} in all. Read 13 October 2026.`,
      },
      adKeywordsTable(KJ_AD_KEYWORDS, KJ_AD_KEYWORDS_TOTAL, KJ_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'On “loaded tea packets” and “loaded tea” Kajun holds 34 and 31 of the 48 organic results on the first page, yet The Loaded Tea Shop takes sponsored positions 1 to 4 and the Sponsored Brands banner on both, and Kajun’s own sponsored cards begin at 12 and 14. They buy all twelve sponsored slots on their own name — and on the wider “energy drink packets sugar free” they appear nowhere, sponsored or organic.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(KJ_AD.monthlyUsd.central)} a month, ${linePct(KJ_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 182 of 689 keywords their listings rank on — Jungle Scout share of voice; searches read from New York, 13 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. The Margin breakdown’s advertising line is still the earlier estimate until the margin is rebuilt with supplier quotes.',
          },
          {
            label: 'Amazon Sponsored Brands',
            value: 'None seen',
            counted: 'The banner on both category searches was The Loaded Tea Shop’s — read 15 Sep 2026',
            note: 'One logged-out read of one results page per search. Not seen on the day, which is not proof of none.',
          },
          {
            label: 'Meta, TikTok and Google ads',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, built from KJ_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...(KJ_AD.products.length > 1 ? KJ_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]) : []),
          ['Total — the margin line', monthUsd(Math.round((470206 * KJ_AD.ratePct.central) / 100)), linePct(KJ_AD.ratePct.central), lineUsd((16.56 * KJ_AD.ratePct.central) / 100), `Modelled: ${monthUsd(KJ_AD.monthlyUsd.low)}–${monthUsd(KJ_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising. The total applies the modelled rate to the whole brand’s snapshot revenue, $470,206, since the model reads the ten biggest listings; per sale is that share of the $16.56 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Traffic was not measured. What can be shown is where they appear: on Amazon’s search page, where most of their category’s organic results are theirs, and off it, where most figures are readings from a search index.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Their own site links Facebook, Instagram, TikTok, Pinterest, Snapchat and Discord, but only the store itself was read directly. The TikTok and Instagram counts below come from a search engine’s index of pages that refused a direct read, and are labelled so; the chips above carry no follower count for the same reason.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — kajunloadedtea.com',
            href: 'https://kajunloadedtea.com/',
            value: '69 products',
            flag: true,
            note:
              'Shopify, read from the store’s public products.json: 41 base flavours, 13 bundles, 6 caffeine-free, 6 free gifts and 2 “Kajun Kicker” packets. The Shop app rates the store 4.8 over 4.3K reviews. Its wholesale page reads “Coming Soon”. No sales and no visit count were read.',
          },
          {
            label: 'TikTok Shop — KaJun Loaded Tea',
            href: 'https://shop.tiktok.com/us/store/kajun-loaded-tea/7495049602692581527',
            value: '38.3K followers · 272.4K items sold (search-index reading)',
            note:
              'From a search engine’s index of the store page, not the page itself, which returned 404 to a direct fetch. “Items sold” is TikTok’s lifetime counter, not a monthly figure. Possibly a large channel; nothing public sizes it.',
          },
          {
            label: 'Instagram — @kajunloadedtea',
            href: 'https://www.instagram.com/kajunloadedtea/',
            value: '12K followers · 148 posts (search-index reading)',
            note: 'From a search engine’s index of the profile; not opened.',
          },
          {
            label: 'Facebook — Kajun Loaded Tea',
            href: 'https://www.facebook.com/kajunloadedtea/',
            note: 'Located in Denham Springs, matching the seller’s registered address.',
          },
          {
            label: 'Etsy — KaJunLoadedTea',
            href: 'https://www.etsy.com/shop/KaJunLoadedTea',
            note: 'A shop under the brand name appears in search results. The page returned 403 and its sales were not read, and their own site does not link it.',
          },
          {
            /* 🚨 No href, deliberately: ownership unconfirmed. */
            label: 'kajunloaded.shop',
            note:
              'A second store selling caffeine-free “UNLoaded” blends under the same flavour names, with no address, no owner and no link to kajunloadedtea.com. Whether it belongs to KajunTea LLC is not known, so it is not linked here and not counted anywhere.',
          },
        ],
      },
      {
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Grocery & Gourmet Food', 'Subcategory', 'Rating'],
        rows: [
          ['Variety 5-pack — Crew Favorites', '#7,268', '#70 Soft Drink Mixes', '4.3★ over 39 reviews'],
          ['Kajun Cotton Candy', '#8,942', '#93 Soft Drink Mixes', '4.2★ over 286 reviews'],
          ['Crawdaddy Candy', '#9,169', '#94 Soft Drink Mixes', '4.5★ over 396 reviews'],
          ['Variety 10-pack — Louisiana Legends', '#10,129', '#1 Tea Gifts', '4.5★ over 30 reviews'],
          ['Sour Swamp Pop', '#10,479', '#109 Soft Drink Mixes', '4.4★ over 303 reviews'],
        ],
        note:
          'Best-seller rank, read through Keepa on 15 September 2026; it moves daily. The twenty best-selling listings run from #7,268 to #23,366 in the whole Grocery & Gourmet Food department.',
      },
      {
        type: 'table',
        caption: 'Search presence on Amazon',
        columns: ['Search', 'Organic results theirs', 'Sponsored slots theirs', 'Sponsored positions 1–4'],
        rows: [
          ['loaded tea packets', '34 of 48', '6 of 12', 'The Loaded Tea Shop'],
          ['loaded tea', '31 of 48', '5 of 12', 'The Loaded Tea Shop'],
          ['kajun loaded tea', '45 of 48', '12 of 12', 'Kajun'],
          ['energy drink packets sugar free', '0 of 48', '0 of 12', 'Other brands'],
        ],
        note:
          'One logged-out read per search: the first results page of 60 cards, delivery set to 70726, 15 September 2026. Amazon localises results and publishes no search volumes, so this is a snapshot of placement, not a rank history.',
      },
      {
        type: 'callout',
        text:
          'None of this is a visit or a sale. Traffic to their store was not measured and the off-Amazon follower counts were read from an index rather than the platforms, so the size of the business off Amazon is the largest unknown on this profile.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'KajunTea LLC' },
          { label: 'Seller', value: 'Kajun Loaded Tea', note: 'Merchant A3QX48VACMQW7I' },
          { label: 'Registered address', value: 'Denham Springs, LA, US', note: '9072 Lockhart Rd, 70726' },
          { label: 'Seller feedback', value: '94%', note: 'Over 141 ratings', info: 'sellerFeedback' },
          { label: 'First Amazon listing', value: '2 Oct 2025' },
          { label: 'Domain registered', value: '23 Mar 2023', note: 'kajunloadedtea.com' },
          { label: 'Trademark', value: 'KAJUN LOADED TEA', note: 'Reg. 8154318 — read from a search index, not checked on TSDR' },
        ],
      },
      {
        /* 🚨 No founder name. A search summary offers one; no page that was
           opened carries it, so it is not used (dossier README). */
        type: 'prose',
        text:
          'Women-founded, by the brand’s own press pitch, and based in Denham Springs, where both the seller record and the Facebook page place it. No founder is named here: a search summary offers a name, but no page that was opened does. The seller account is the brand’s own — it holds the buy box on every one of its twenty best sellers, and Keepa first tracked it in November 2025, a few weeks after the first listing.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront.',
      },
      /* Valuation omitted: nine profit months, and the model needs twelve. */
    ],
  },

  'wet-noses': {
    /* 🚨 No headline copy here. Title, subtitle and snapshot month live on the
       Business row — backend prisma/seed-wet-noses-headline.ts, from
       waithowmuch-research research/wet-noses/headline.json (reviewed
       2026-09-15). This entry carries only the image beside them. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/wet-noses/1217ff080fbe8c443ca09d25bb483d0c0b77f39ae10a0a1c38d6e6affd6ed19c.png',
      /* The best seller by revenue, and only just: the 5 lb box and its
         two-bag sibling are within a dollar of each other. */
      image: {
        src: wetNosesPhoto('B006M3Y5WS'),
        alt: 'A 5 lb box of Wet Noses Organic Crunchy Peanut Butter & Banana dog treats, with a beagle behind it — the best-selling Amazon listing',
      },
    },

    /* 🚨 NO `valuation`, and no valuation section. The series is eleven months
       — it starts at November 2025, when Wet Noses' own account took the buy
       box (see the Revenue section and the backend seed) — and the model will
       not price a trailing twelve it does not have. The reseller months before
       it are not this business's revenue, so borrowing them to reach twelve
       would value the wrong thing. Add it back after 2026-10 is in the series. */

    /* 🚨 This profile is the AMAZON CHANNEL of a manufacturer. Every figure is
       Amazon US; the distributor, Petco, co-manufacturing and wet-noses.com are
       real and unsized. Prose that reads the Amazon number as the company's is
       wrong, however natural it sounds. */
    facts: [
      { label: 'SKUs', value: '31', note: '31 priced, 12 carrying a sold badge', info: 'skus' },
      {
        label: 'Category',
        value: 'Pet Supplies › Dogs › Treats › Cookies, Biscuits & Snacks',
        note: 'Best seller #6,294 in Pet Supplies, #501 in Cookies, Biscuits & Snacks',
        info: 'category',
        wide: true,
      },
      /* The best seller's own listing, like Spite House's pair — Amazon counts
         reviews per flavour across this parent, so a summed top-20 total would
         count the same reviews two or three times. */
      { label: 'Product reviews', value: '2,161', note: 'On the best-selling listing', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Best-selling listing', info: 'rating' },
      /* 29 ratings is a young ACCOUNT, not a young business — Keepa first saw
         it on 8 November 2025. */
      { label: 'Seller feedback', value: '93%', note: 'Over 29 ratings', info: 'sellerFeedback' },
      /* 🚨 No Sourcing cell. The attribute is one phrase from a fixed list
         (/business-attributes/) and the list has no "own manufacturing" —
         and they are not private label: they bake their own, by their own
         account and the deal press, and their private-label work is for other
         brands. White Mountain took "Private label" as the nearest answer
         because its valuation needed one; with no valuation here, a gap beats
         a wrong phrase. The selling matrix records `manufacturer: yes`. */
      /* Concentrated, not flagship: twelve badged listings, the top one 20% of
         the month — but every one is the same Organic Crunchy treat in three
         pack sizes. A plateau, not a cliff. Placed by us; not scored, since
         there is no valuation. */
      { label: 'Catalogue', value: 'Concentrated bets, few SKUs', note: 'One treat line in three pack sizes', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      // Differentiation left out: not placed, and nothing here scores it.
      { label: 'Channels', value: 'Amazon US, own store, a national pet distributor, Petco, co-manufacturing', info: 'channels', wide: true },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a public number behind it, and every figure on this profile. Their own account has held the buy box since November 2025; before that, resellers did.',
      },
      'amazon-international': {
        status: 'no',
        note: 'The seller id was looked up on Amazon UK, Germany and Canada and does not exist on any of them.',
      },
      'own-store': {
        status: 'yes',
        note:
          'wet-noses.com, on Shopify: 36 products at a median of $12.99, including 20 lb bulk buckets at $119.99. The 14oz bag is $12.99 there and on Amazon. Shopify publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'Probably the larger business. Pet Food Experts has been their exclusive US distributor to independent pet retail since 1 April 2024, Purrks cat treats sell in Petco by the company’s account, and their wholesale page sells 5 lb boxes and 20 lb buckets to retailers at prices given on request. The distributor’s “12,000+ locations” are the stores it serves, not stores stocking Wet Noses. Nothing public sizes any of it.',
      },
      // tiktok-shop, other-marketplace and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record. $4.76 to $8.04 a unit by pack size, and the largest line in the Amazon cost stack.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the 31 listings between FBA and FBM.',
      },
      /* Unchecked rather than no: Amazon itself won 11% of the buy box on one
         Soft & Chewy listing over 90 days, which is an Amazon offer but does
         not say whether it is a vendor relationship. */
      'vendor-1p': {
        status: 'unchecked',
        note: 'Amazon holds an offer on one storefront listing and on none of the 150 outside it. Whether that is a Vendor Central relationship is not visible from outside.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      manufacturer: {
        status: 'yes',
        flag: true,
        note:
          '“We run our own kitchens and work our own ovens”, in their words, and the 2020 and 2023 deal press describes an 80,000 sq ft SQF Level III certified plant in Monroe, Washington. Not checked independently. The same plant makes private-label and co-manufactured treats for other brands.',
      },
      'private-label': {
        status: 'no',
        note: 'They make their own brand rather than buying it in. Their private-label work runs the other way, for other brands.',
      },
      'wholesale-in': { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/WetNoses, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Wet Noses bakes organic, human-grade dog treats in Monroe, Washington, and has since 1998 by its own account; private equity has controlled it since 2023. This profile is the part of it that sells on Amazon — one channel among several, and the only one with a public number.',

    blocks: [
      { type: 'heading', text: 'A treat maker, seen through one channel' },
      {
        type: 'prose',
        text:
          'On Amazon the brand lists 31 products, and every one that sells enough to carry a badge is the same product: the Organic Crunchy treat, in peanut butter, pumpkin, berry, apple and carrot flavours, sold as a 14oz bag, two bags or a 5 lb box. Newer lines — Soft Baked dog treats and Purrks cat treats — are listed and have yet to show a badge.',
      },
      {
        type: 'prose',
        text:
          'This page describes that channel, not the company. Wet Noses also sells through a national pet distributor, puts its cat treats into Petco, runs its own store and makes treats for other brands from its own plant. None of those publishes a figure, so none of them is in the numbers here — and nothing public says whether Amazon is a large part of the business or a small one.',
      },
      /* 🚨 No figures in the caption. The brand's own site photographs, not
         the listing images — the best seller's box is already the headline
         image, and these show the object inside it. */
      {
        type: 'images',
        items: [
          {
            src: wetNosesPhoto('dogWithBags'),
            alt: 'A black-and-tan puppy eating paw-stamped treats from the floor of a kitchen, beside three 14oz Wet Noses bags: Berry Blast, Pumpkin & Quinoa and Peanut Butter & Molasses',
          },
          {
            src: wetNosesPhoto('stackedTreats'),
            alt: 'A stack of round orange Wet Noses biscuits on a granite counter, the front one stamped with a paw print and “Organic dog treats”, with carrots and berries behind',
          },
        ],
        caption: 'Two of the brand’s own photographs, from wet-noses.com: the crunchy treat in its 14oz bags, and the biscuit itself.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A 1998 brand whose Amazon listings were sold by other people for at least two years, until its own seller account took them over in November 2025.',
      },
      {
        /* Oldest first. Year-only entries are the company’s own claims with no
           day attached; they stay on this list and off the chart. Only the
           events from November 2025 fall inside the chart's series. */
        type: 'timeline',
        items: [
          {
            when: '1998',
            tag: 'Brand',
            what: 'Wet Noses is founded',
            detail: 'By Jasmine Galligan, by the company’s own account. Not checked.',
          },
          {
            when: '24 Aug 2001',
            tag: 'Web',
            what: 'wet-noses.com registered',
            detail: 'From the domain record. The first archived capture of the site follows eleven months later.',
          },
          {
            when: '20 Jul 2002',
            tag: 'Web',
            what: 'The Wayback Machine’s first capture of the site',
          },
          {
            when: '14 Dec 2011',
            tag: 'Amazon',
            what: 'The oldest listing still live: the 5 lb Peanut Butter & Banana box',
            detail: 'Fifteen years on it is the best-selling listing in the catalogue.',
          },
          {
            when: '6 Feb 2020',
            tag: 'Brand',
            what: 'Recapitalised by VisioCap and Beach Point Capital',
            detail:
              'Cascadia Capital advised, and described a maker of branded and private-label treats under Wet Noses, Doggy Delirious and Best Homies, in an 80,000 sq ft SQF Level III facility. No deal value was published.',
          },
          {
            when: '18 Nov 2021',
            tag: 'Web',
            what: 'The oldest product record in their Shopify store',
          },
          {
            when: '16 Feb 2023',
            tag: 'Brand',
            what: 'Beach Point Capital takes a controlling stake',
            detail:
              'Its Tactical Fund, on terms nobody published. The founder returns as chief executive, and the money is for manufacturing capacity, including private-label contract manufacturing. From deal press.',
          },
          {
            when: '30 Sep 2023',
            tag: 'Amazon',
            what: 'Amazon’s badge history begins — with resellers in the buy box',
            detail:
              'NaturVet’s seller account holds it on most of the listings that sell, and Petco’s on three. Sales on these listings from here to October 2025 are the brand’s, not Wet Noses’ own revenue, which is why the chart does not start here.',
          },
          {
            when: '1 Apr 2024',
            tag: 'Brand',
            what: 'Pet Food Experts becomes the exclusive US distributor',
            detail: 'To independent pet retailers, announced by the distributor.',
          },
          {
            when: '13 May 2025',
            tag: 'Amazon',
            what: 'MODA Works takes over the buy box',
            detail:
              'A Florida multi-brand pet reseller, first on the 5 lb box and within eight days on most of the listings that sell. It holds them through October.',
          },
          {
            when: '8 Nov 2025',
            tag: 'Amazon',
            what: 'Wet Noses’ own seller account appears, and starts winning its listings',
            detail:
              'Keepa first tracks the account that day, and it wins its first buy box the same day. Nothing public announced the change or says why it happened: it is read from the buy-box record, listing by listing, through to February 2026.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: '$11,995 — the handover month, and the weakest of the series',
            detail: 'Less than half of October’s total on the same listings, while the buy box changed hands.',
          },
          {
            when: '6 Apr 2026',
            tag: 'Amazon',
            what: 'Purrks cat treats and Soft Baked dog treats listed',
            detail: 'Six listings in a day. None of them carries a sold badge by September.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: '$30,640 — the best month',
            detail: 'Not a holiday month. Across the whole badge history these listings show no December peak; dog treats are bought all year.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Amazon',
            what: 'Their own account wins 82% of the buy box',
            detail: 'Weighted by revenue, over the 90 days to this read. MODA Works still wins 6.5%.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The chart starts in November 2025 on purpose. Amazon’s badge history on these listings reaches back to September 2023, but until October 2025 resellers held the buy box — NaturVet’s seller account and Petco, then MODA Works — so the retail revenue in those months was theirs, and Wet Noses was paid a wholesale price nobody publishes. November 2025 is the first month its own account held the buy box, and it was the weakest month since: the listings changed hands through it. From then on the months run between about $12,600 and $30,600 with no December spike. Of each month roughly three dollars in ten is left after Amazon’s fees, cost of goods and advertising, before returns and overhead — and two of those cost lines are our placeholders.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record looked up on each marketplace
           (2026-09-15). No valuation, so no RULE 2 figure to agree with — but
           100 is still what it would be. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Amazon US is all of it. The seller account does not exist on the UK, German or Canadian marketplaces.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon UK, Germany and Canada', short: 'UK, DE, CA', share: 0, note: 'Seller id looked up on each; no account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. This is the Amazon channel alone — the distributor, Petco, co-manufacturing and wet-noses.com are not in it.',
      },
      {
        /* Generated from the Keepa catalogue — see the module's header. The
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'Every listing that sells enough to carry a badge is the same Organic Crunchy treat in three pack sizes. The 5 lb Peanut Butter & Banana box and its two-bag sibling are 40% of the month between them.',
        items: WET_NOSES_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s badge, and every one here sits in its lowest brackets — 50+, 100+ or 200+ — so each row is a coarse floor: a listing showing 50+ could be selling 99. Revenue is that band times the buy box on 15 September 2026. 19 more priced listings carry no badge and count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badge brackets are coarse, the cost of goods and the advertising under the profit are placeholders rather than quotes, and returns and overhead are set to zero.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'On Amazon the story is who does the selling. Off Amazon there are at least four more channels, and none of them can be counted.',
      },
      {
        type: 'prose',
        text:
          'Keepa records who held the buy box on the twelve listings that carry a badge. NaturVet’s seller account held most of them, and Petco three, through April 2025; MODA Works, a Florida multi-brand pet reseller, held them from May to October 2025; and Wet Noses’ own account has held them since November 2025. Over the 90 days to 15 September 2026 their own account won 82% of the buy box, weighted by revenue. That the company began selling its own listings is an inference from that record — nothing public announces it, or says why.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon, the company sells through Pet Food Experts, its exclusive US distributor to independent pet retail since April 2024; puts Purrks cat treats into Petco; runs a 36-product Shopify store; and offers private-label and co-manufacturing to other brands. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $23.46 average sale, down to the roughly three dollars in ten that are left — and the largest thing Amazon takes is not its commission but the cost of moving a heavy box.',
      },
      {
        type: 'prose',
        text:
          'Baked treats are heavy for their price, and Amazon charges fulfilment by size and weight: $4.76 to pick, pack and ship a 14oz bag and $8.04 for a 5 lb box, $6.83 a unit across September — more than the 15% referral fee takes. Cost of goods is the line nobody could source. No bakery, co-packer or Wet Noses’ own wholesale page publishes a per-pound price, so the figure below is ours.',
      },
      {
        type: 'table',
        caption: 'COGS — what it costs to make',
        columns: ['Line', 'Per lb', '14oz bag', 'Two 14oz bags', '5 lb box'],
        rows: [
          ['Made in their own plant — a placeholder, not a quote', '$2.00', '$1.75', '$3.50', '$10.00'],
          ['Inbound freight to an FBA warehouse — a placeholder, not a quote', '$0.25', '$0.22', '$0.44', '$1.25'],
          ['For comparison: their own 20 lb bulk bucket, retail on wet-noses.com', '$6.00', '—', '—', '—'],
          ['Buy box on Amazon', '—', '$12.99', '$19.99', '$39.99'],
        ],
        note:
          'Net weights from the listing titles. The bucket is $119.99 for 20 lb — a retail price, so a ceiling on cost rather than a cost. Both placeholder rows are the first thing to replace with a real figure: on the 5 lb box they come to more than a quarter of the price.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 31.23% — and
           the backend seed builds the profit and ad-spend series from the SAME
           four numbers (COST_LINES). Change one, change both. Two decimals
           because September's P&L gives them; the page rounds for display. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 23.46 },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -22.64,
            detail:
              '$2.00 a pound to make and $0.25 to land, over the weight of every badged unit sold in September. Our placeholder, not a quote — nobody publishes the figure.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Amazon’s published Pet Products rate: 15%, with a $0.30 minimum.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -29.13,
            emphasis: true,
            /* Keepa product record B006M3Y5WS: 244 × 180 × 174 mm, 2,472 g, pick-and-pack $8.04, read 2026-10-13. */
            detail:
              'Size tier: Large Standard. The best seller, a 5 lb box (B006M3Y5WS), packs to 9.6 × 7.1 × 6.9 in at 5.45 lb. Measured: each listing’s own pick-and-pack fee, $4.76 on a 14oz bag to $8.04 on a 5 lb box, times September’s badged units. The largest line here.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -5.25,
            amount: 1.23,
            detail: `MODELLED, not observed: amazon-adspend-spy's Sponsored Products spend, about ${monthUsd(WN_AD.monthlyUsd.central)} a month on the ten biggest listings, ${linePct(WN_AD.ratePct.central)} of their revenue, applied here to the whole brand. Automatic and product-targeting campaigns, Sponsored Brands and Display are invisible to it, so it is a floor.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/wet-noses/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/wet-noses/advertising/' },
            ],
          },
        ],
        note: 'Before returns and overhead, both set to zero, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'callout',
        text:
          'Two of these four lines are ours. Referral and fulfilment are Amazon’s own fees and measured; cost of goods and advertising are placeholders, and cost of goods moves the margin more than any other line. It is also where a manufacturer selling its own treats should be strongest — which nobody outside the company can see.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-13, read at
           New York 10001. */
        type: 'strategy',
        label: WN_AD.strategy,
        points: [
          `About ${monthUsd(WN_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(WN_AD.monthlyUsd.low)}–${monthUsd(WN_AD.monthlyUsd.high)}), ${linePct(WN_AD.ratePct.central)} of September revenue. Jungle Scout saw their ads on 33 of the 207 searches their listings show up on.`,
          'About 13% of it, roughly $132 a month, is on their own name; the rest is long, specific phrases.',
          'Of the 15 biggest generic searches they rank on, they buy 1: “training treats”.',
          'Modelled from outside the account, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: WN_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for Baked dog treats: exact-match monthly searches and the best organic position any of the listings held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(WN_AD.monthlyUsd.central)} in all. Read 13 October 2026.`,
      },
      adKeywordsTable(WN_AD_KEYWORDS, WN_AD_KEYWORDS_TOTAL, WN_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'A hand read on 15 September, with a Monroe, Washington delivery address, saw the same shape: none of the 36 sponsored slots on “organic dog treats”, “grain free dog treats” and “human grade dog treats” was theirs, while on their own name they held positions 1, 2, 3, 4, 11 and 19.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(WN_AD.monthlyUsd.central)} a month, ${linePct(WN_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 33 of 207 keywords their listings rank on — Jungle Scout share of voice; searches read from New York, 13 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. The Margin breakdown’s advertising line is still the earlier estimate until the margin is rebuilt with supplier quotes.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note: 'The Meta Ad Library and a paid-search history were not read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, built from WN_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...(WN_AD.products.length > 1 ? WN_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]) : []),
          ['Total — the margin line', monthUsd(Math.round((19942 * WN_AD.ratePct.central) / 100)), linePct(WN_AD.ratePct.central), lineUsd((23.46 * WN_AD.ratePct.central) / 100), `Modelled: ${monthUsd(WN_AD.monthlyUsd.low)}–${monthUsd(WN_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising. The total applies the modelled rate to the whole brand’s snapshot revenue, $19,942, since the model reads the ten biggest listings; per sale is that share of the $23.46 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Their site links four social accounts, and on Amazon the demand arrives already typing the brand’s name.',
      },
      /* The same chips the overview opens with. 🚨 None carries a follower
         count: nobody read them, and the seed says so rather than guessing. */
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Follower counts and site traffic were not read for this profile, so the chips above carry no audience figure. What was read is Amazon search. On “wet noses dog treats”, 24 of the first page’s organic results carry the brand’s name; across three generic searches, one Wet Noses listing appears once, at position 48 on “organic dog treats”.',
      },
      {
        type: 'table',
        caption: 'Where they show up in Amazon search',
        columns: ['Search', 'Sponsored slots theirs', 'Organic results with the name', 'Best organic position'],
        rows: [
          ['wet noses dog treats', '6 of 12', '24', '#5'],
          ['organic dog treats', '0 of 12', '1', '#48'],
          ['grain free dog treats', '0 of 12', '0', '—'],
          ['human grade dog treats', '0 of 12', '0', '—'],
        ],
        note:
          'Read 15 September 2026 in Chrome with delivery set to Monroe, Washington, 60 results a page. Amazon localises search to whoever is looking, so these positions describe that reader on that day. A few organic results on the brand term are listings outside the brand’s own storefront.',
      },
      {
        type: 'callout',
        text:
          'Nothing public says where that branded demand comes from — the distributor’s shelves, the brand’s own site or its socials — because none of them publishes a number.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Wet Noses Natural Dog Treat Company, LLC' },
          { label: 'Seller', value: 'Wet Noses Natural Dog Treats', note: 'Merchant A3IMT2GVAXXI9L' },
          { label: 'Founded', value: '1998', note: 'By the company’s own account' },
          { label: 'Seller account first seen', value: '8 Nov 2025', note: 'By Keepa — the account, not the brand' },
          { label: 'Registered address', value: 'Monroe, WA, US', note: '14439 167th Ave, 98272' },
          { label: 'Seller feedback', value: '93%', note: 'Over 29 ratings', info: 'sellerFeedback' },
          { label: 'Controlling owner', value: 'Beach Point Capital', note: 'Tactical Fund, since Feb 2023 — deal press, terms undisclosed' },
          { label: 'Oldest live listing', value: '14 Dec 2011' },
        ],
      },
      {
        type: 'prose',
        text:
          'An old company on a new seller account. Private equity has been in the business since at least February 2020, when VisioCap and Beach Point Capital recapitalised it with Cascadia Capital advising; in February 2023 Beach Point’s Tactical Fund took a controlling stake and the founder, Jasmine Galligan, returned as chief executive. Neither deal’s terms were published. The 80,000 sq ft plant and its SQF and human-grade certifications are the company’s, its advisers’ and its distributor’s descriptions, not checked here.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront, and from the deal announcements.',
      },
    ],
  },

  'restoration-games': {
    /* 🚨 No headline copy here. Title, subtitle and snapshot month live on the
       Business row — backend prisma/seed-restoration-games-headline.ts, from
       waithowmuch-research research/restoration-games/headline.json (reviewed
       2026-09-16). This entry carries only the image beside them. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/restoration-games/1ae6d995b429949df1ebfc27f03662b66a327d86229d9c9e064473a7a33b1c4b.png',
      /* The best seller by revenue: 46% of the own account's September on 100
         units. */
      image: {
        src: restorationPhoto('B0C6NR9ZC4'),
        alt: 'The Thunder Road: Vendetta Maximum Chrome box — a deluxe edition of the car-combat board game, with armoured cars racing through a burning city on the lid',
      },
    },

    /* 🚨 NO `valuation`, and no valuation section. The series is eleven months
       — it starts at November 2025, the first month Restoration's own account
       held a buy box (see Revenue and the backend seed) — and the model will
       not price a trailing twelve it does not have. The months before it are
       resellers' sales, so borrowing them to reach twelve would value the
       wrong thing. Add it back after 2026-10 is in the series. */

    /* 🚨 This profile is the AMAZON CHANNEL of a crowdfunding-led publisher.
       Every figure is Amazon US; Kickstarter, the own shop, hobby distribution
       and Target are real and unsized. And every profit figure is BEFORE
       LICENCE ROYALTIES — say so wherever profit is discussed.

       🚨 No brand listing count in copy. The dossier README and payload say 110
       brand ASINs; keepa/brand-series.json, the file the series comes from,
       lists 108. Where a count is needed, it is the storefront's 22. */
    facts: [
      { label: 'SKUs', value: '22', note: 'In the storefront, 12 carrying a sold badge. More listings sit under the brand outside it', info: 'skus' },
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Board Games',
        note: 'Best seller #14,308 in Toys & Games, #591 in Board Games',
        info: 'category',
        wide: true,
      },
      /* The best seller's own listing, as on Wet Noses. Amazon shares reviews
         across a parent — the Thunder Road boxes are one parent, the Unmatched
         sets another — so a summed total would count reviews twice. */
      { label: 'Product reviews', value: '12', note: 'On the best-selling listing, a deluxe box. The base game has 176', info: 'reviews' },
      { label: 'Product rating', value: '4.5★', note: 'Best-selling listing', info: 'rating' },
      /* 46 ratings is a young ACCOUNT, not a young business — Keepa first saw
         it on 28 September 2025. */
      { label: 'Seller feedback', value: '100%', note: 'Over 46 ratings', info: 'sellerFeedback' },
      /* A publisher of its own designs and licensed sets, made by a contract
         manufacturer in China (its own tariff post). Spite House, also a game
         publisher, took the same answer. */
      { label: 'Sourcing', value: 'Private label', note: 'Own designs, made in China', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* The $160 box is 46% of September's own-account revenue, with the base
         game and two expansions for it beside it. Placed by us; not scored,
         since there is no valuation. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One deluxe box is 46% of September; its base game and expansions sell alongside', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      // Differentiation left out: not placed, and nothing here scores it.
      { label: 'Channels', value: 'Amazon US, own shop, Kickstarter, hobby distribution, Target', info: 'channels', wide: true },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'Every figure on this profile. Their own account has sold their listings since November 2025; before that, multi-brand resellers did, and still hold about a fifth of the brand’s September sales.',
      },
      /* Unchecked rather than no: an account exists in Canada. */
      'amazon-international': {
        status: 'unchecked',
        note: 'The seller id exists on Amazon Canada with no ratings, and does not exist on the UK or German marketplaces. Canadian sales were not read.',
      },
      'own-store': {
        status: 'yes',
        note: 'A shop at restorationgames.com/shop. It publishes no sales.',
      },
      'other-marketplace': {
        status: 'yes',
        flag: true,
        note:
          'Kickstarter: eleven campaigns from 2017 to 2025 by Tabletop Analytics’ count, and a Lord of the Rings game in 2026. Crowdfunding is how the biggest titles were launched.',
      },
      'wholesale-out': {
        status: 'yes',
        note:
          'Hobby distribution (ACD Distribution lists the line), a registration form for retailers on their own site, and Restoration titles on Target’s site. The distributor and Target pages were found by search and not opened. None of it is sized.',
      },
      /* Unchecked: three IELLO-branded Unmatched editions are on Amazon, which
         looks like a co-publishing deal, but no terms were read. Their
         licences run INTO the company (Marvel, TMNT and others), which is not
         what this row asks. */
      licensing: {
        status: 'unchecked',
        note: 'Three Unmatched editions on Amazon carry IELLO’s brand, which suggests a co-publishing or licensing arrangement. Its terms were not read.',
      },
      // tiktok-shop left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'From the seller record and each listing’s fee: $6.31 to fulfil an Unmatched set, $7.98 for Thunder Road: Vendetta, $9.88 for the Maximum Chrome box.',
      },
      fbm: {
        status: 'unchecked',
        note: 'They run their own warehouse, but nothing read splits the listings between FBA and FBM.',
      },
      /* Unchecked rather than no: Amazon held a month-end buy box on a brand
         listing in six months, which is an Amazon offer but does not say how
         Amazon bought the stock. */
      'vendor-1p': {
        status: 'unchecked',
        note: 'Amazon itself held a month-end buy box on a brand listing in six months since 2023, never more than 16% of a month. Whether it buys from Restoration or through distribution is not visible from outside.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own designs and revivals, and licensed sets, under their own brand, made for them in China by their own account of the costs.',
      },
      manufacturer: {
        status: 'no',
        note: 'They publish and warehouse the games; the manufacturing unit cost they quote is a factory’s, landed with tariff from China.',
      },
      'wholesale-in': { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },
      pod: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/RestorationGames, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'Restoration Games is a Florida board-game publisher, founded in 2016, that revives out-of-print games and publishes the Unmatched line and Thunder Road: Vendetta. This profile is the part of it that sells on Amazon — a channel it only began selling in itself in late 2025.',

    blocks: [
      { type: 'heading', text: 'A publisher that came to Amazon late' },
      {
        type: 'prose',
        text:
          'The company was founded by Justin D. Jacobson, an attorney who runs it, and the designer Rob Daviau, and it made its name bringing back games like Fireball Island, Stop Thief! and Dark Tower. Its catalogue on Amazon is two families: Unmatched, head-to-head games sold in sets of characters, several of them licensed; and Thunder Road: Vendetta, a car-combat racing game, with a deluxe edition and expansions.',
      },
      {
        type: 'prose',
        text:
          'For years its games were on Amazon without it: multi-brand resellers held the buy box on every listing that sold. The seller account that now sells them appeared in September 2025. This page describes that account. The company also runs Kickstarter campaigns, its own shop, hobby distribution and a Target listing, and none of those publishes a figure.',
      },
      /* 🚨 No figures in the caption. The two families, one box each; the
         deluxe box is already the headline image. */
      {
        type: 'images',
        items: [
          {
            src: restorationPhoto('B0BZ62KRGF'),
            alt: 'The Thunder Road: Vendetta box lid: an orange muscle car with a mounted gun racing towards the viewer through a desert road battle',
          },
          {
            src: restorationPhoto('B0F79P73F1'),
            alt: 'The Unmatched Battle of Legends Volume Three box: Blackbeard, the Chupacabra, Pandora and Loki in four illustrated panels',
          },
        ],
        caption: 'The two families the Amazon account sells, from their listing images: Thunder Road: Vendetta and an Unmatched set.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A 2016 publisher whose games were sold on Amazon by resellers for at least two years, until its own seller account began taking the listings in November 2025.',
      },
      {
        /* Oldest first. Year-only entries have no day attached in the sources;
           they stay on this list and off the chart. Only events from November
           2025 fall inside the chart's series. */
        type: 'timeline',
        items: [
          {
            when: '2016',
            tag: 'Brand',
            what: 'Restoration Games is founded',
            detail: 'By Justin D. Jacobson and Rob Daviau, announced at Gen Con that year, by the company’s account and Wikipedia’s summary.',
          },
          {
            when: '2017',
            tag: 'Brand',
            what: 'The first Kickstarter campaign, Stop Thief!',
            detail: 'The first of eleven campaigns to 2025 in Tabletop Analytics’ count.',
          },
          {
            when: '10 Jul 2017',
            tag: 'Amazon',
            what: 'The oldest listing under the brand: Downforce',
            detail: 'Under the Restoration Games brand and manufacturer fields. It carries no sold badge today.',
          },
          {
            when: '2018',
            tag: 'Brand',
            what: 'Fireball Island on Kickstarter: $2.81M pledged',
            detail: 'From Tabletop Analytics’ campaign list.',
          },
          {
            when: '19 Aug 2018',
            tag: 'Amazon',
            what: 'Fireball Island: The Curse of Vul-Kar listed',
            detail: 'It carries no sold badge today.',
          },
          {
            when: '9 Mar 2020',
            tag: 'Amazon',
            what: 'Unmatched: Cobble & Fog listed',
            detail: 'The oldest Unmatched listing still carrying a sold badge, and with 706 reviews the most reviewed of the listings that do.',
          },
          {
            when: '2020',
            tag: 'Brand',
            what: 'Return to Dark Tower on Kickstarter: $4.05M pledged by 23,661 backers',
            detail: 'Their largest campaign. The game carries no sold badge on Amazon today.',
          },
          {
            when: '26 Oct 2020',
            tag: 'Amazon',
            what: 'Unmatched: Battle of Legends Vol 1 listed',
            detail: 'The set whose buy box, $39.99, the cost model divides the publisher’s own $5 unit cost by.',
          },
          {
            when: '21 Mar 2023',
            tag: 'Amazon',
            what: 'Thunder Road: Vendetta listed',
            detail: 'The deluxe Maximum Chrome edition follows on 30 May 2023.',
          },
          {
            when: '30 Sep 2023',
            tag: 'Amazon',
            what: 'Amazon’s badge history begins — with resellers in the buy box',
            detail:
              'Board Game Retail, Kings Games, Blazing Dealz!, Angel Seller, Redwood Entertainment and others hold it on the listings that sell. Sales from here to October 2025 are the brand’s, not Restoration’s own revenue, which is why the chart does not start here.',
          },
          {
            when: '21 Apr 2025',
            tag: 'Brand',
            what: '“Tackling Tariffs”: the publisher prices an Unmatched set',
            detail:
              'Jacobson writes that a standard Unmatched 4-pack costs about $5 to make, and that the 145% tariff then in force on board games from China would add about $7.50. The only unit cost this business has published.',
          },
          {
            when: '19 Jun 2025',
            tag: 'Brand',
            what: 'A 16-person team, and more money for marketing and sales',
            detail: 'Reported by BoardGameWire, with new marketing, warehouse and design hires and price rises on some products because of tariffs.',
          },
          {
            when: '28 Sep 2025',
            tag: 'Amazon',
            what: 'Restoration’s own seller account appears',
            detail: 'Keepa first tracks it that day. Nothing public announced it or says why.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: 'The first month its own account holds a buy box at month end',
            detail: 'On listings worth 9% of the brand’s Amazon sales that month. Resellers still hold the rest through the holidays.',
          },
          {
            when: '20 Feb 2026',
            tag: 'Brand',
            what: 'The Supreme Court ends the IEEPA tariff surcharges',
            detail: 'The surcharges behind the 145% rate of April 2025. The cost model uses the rate in force at the September 2026 read, 20%. From a Congressional Research Service summary, found by search.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: 'Every listing that sells is in its own buy box',
            detail: 'The only month so far with no reseller holding a badged listing at month end. From March to August its share runs between 57% and 100% of the brand’s sales.',
          },
          {
            when: '4 Jun 2026',
            tag: 'Brand',
            what: 'The King’s Gambit, a Lord of the Rings game, on Kickstarter',
            detail: 'Featured by Kickstarter, which quotes Jacobson saying the platform matters less for funding than it did. Its total is not in the count above.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: '$56,240 — the own account’s best month',
            detail: 'Counting resellers, the brand sold $97,960 that month, mostly Thunder Road: Vendetta by the dossier’s reading.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Amazon',
            what: 'Its own account holds 79% of the brand’s Amazon sales',
            detail: 'On the live badge. The rest sits with resellers or with no one in the buy box.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The chart starts in November 2025 on purpose. Amazon’s badge history on the brand’s listings reaches back to September 2023, but until October 2025 resellers held every buy box that sold, so the retail revenue in those months was theirs; Restoration was paid a wholesale price that nobody publishes. November 2025 is the first month its own account held one. The series counts only listings with its own account in the buy box at month end, so it is smaller than the brand’s Amazon sales, and it grew as the account took more listings over. Of each month a little over half is left after Amazon’s fees, making the games, tariff, freight and advertising — but that is before licence royalties, and two of those cost lines are our placeholders.',
      },
      { type: 'chart' },
      {
        /* From the Keepa seller record looked up on each marketplace
           (2026-09-15). No valuation, so no RULE 2 figure to agree with. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Amazon US is all of the measured revenue. A Canadian account exists with no ratings; there is none in the UK or Germany.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Account found with no ratings; sales not read' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'Seller id looked up on each; no account' },
        ],
        note: 'Shares of the latest month’s own-account Amazon revenue. Kickstarter, the own shop, distribution and Target are not in it.',
      },
      {
        /* Generated from the Keepa brand pull — see the module's header. The
           rows sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'Four Thunder Road listings are 73% of the own account’s September, and the $160 Maximum Chrome box alone is 46%. Three Unmatched sets make most of the rest.',
        items: RESTORATION_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s badge, a bracket (50+, 100+), so each row is a floor. Revenue is that band times the price. Only listings with Restoration’s own account in the buy box at month end are here; four more badged brand listings — Unmatched Adventures: TMNT, Robin Hood vs Bigfoot, Slings and Arrows and Battle of Legends Vol 2 — were with resellers or had no one in the buy box, and are left out.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badges are brackets, one month-end buy-box holder stands in for a whole month, and the profit leaves out licence royalties, the team, the warehouse, design and art.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'On Amazon the question is who does the selling, and for most of the badge history it was not the publisher. Off Amazon, Kickstarter comes first.',
      },
      {
        type: 'prose',
        text:
          'Keepa records who held the buy box on every brand listing. Until October 2025 it was multi-brand hobby and arbitrage sellers — Board Game Retail, Kings Games, Blazing Dealz! and a dozen more — presumably stocked through hobby distribution, with Amazon itself on a few listings in a handful of months. Restoration’s own account first held a month-end buy box in November 2025, on 9% of that month’s brand sales; it held 79% on the September 2026 badge. That the company chose to take its listings over is an inference from that record; nothing public announces it.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon, the games are launched on Kickstarter, sold in the company’s own shop, stocked by hobby distributors and listed at Target. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Every cent of a $57.72 average sale, down to the little over half that is left before licence royalties — and the line that decides it is the one priced from a single Unmatched set.',
      },
      {
        type: 'prose',
        text:
          'The publisher gave the one cost that matters. In April 2025 Jacobson wrote that a standard Unmatched 4-pack costs about $5 to make, and that is 12.5% of that set’s $39.99 buy box. The model carries that ratio to every listing. That holds for Unmatched sets. It is weak for Thunder Road: Vendetta, about 73% of September’s own-account revenue, including a $160 deluxe box nobody priced. Tariff is today’s rate on board games from China, 20% of the manufacturing cost; units landed during 2025 paid far more, and that is not modelled. Amazon’s two fees are measured per listing.',
      },
      {
        type: 'table',
        caption: 'COGS — what it costs to make',
        columns: ['Line', 'Unmatched 4-pack', 'Thunder Road: Vendetta', 'Maximum Chrome'],
        rows: [
          ['Manufacturing — the publisher’s $5 for the 4-pack, carried pro rata to the others', '$5.00', '$7.49', '$20.00'],
          ['Tariff, 20% of manufacturing', '$1.00', '$1.50', '$4.00'],
          ['Freight and inbound — a placeholder, not a quote', '$1.50', '$1.50', '$1.50'],
          ['For comparison: tariff on the 4-pack at April 2025’s 145%, the publisher’s own figure', '$7.50', '—', '—'],
          ['Buy box on Amazon', '$39.99', '$59.95', '$160.00'],
        ],
        note:
          'Only the first column’s manufacturing figure comes from the publisher; the other two are the same 12.5% of price. The tariff rate is a secondary summary (tariffstool.com), not a customs ruling.',
      },
      {
        /* 🚨 The margin row is computed as 100% less these lines — 42.80% since
           2026-10-14, when advertising became amazon-adspend-spy's 12.416% — and
           the backend seed builds the profit and ad-spend series from the SAME
           six numbers (COST_LINES). Change one, change both. Two decimals, at
           September's rates, so the title's $14.8K and the series agree. */
        type: 'margin',
        basis: { label: 'Average selling price', value: 57.72 },
        lines: [
          {
            label: 'Manufacturing',
            key: 'cogs',
            pct: -12.5,
            /* 🚨 No `emphasis`: the page labels that line "Biggest line", and
               the referral fee (15%) is bigger. This one is the most
               uncertain, which the detail and the callout say instead. */
            detail:
              'Derived from the publisher’s own figure: about $5 to make an Unmatched 4-pack, over its $39.99 buy box, applied to every listing. Weak for Thunder Road, which is most of the month. The most uncertain line here, and the one where a better figure would move the profit most.',
          },
          {
            label: 'Tariff',
            pct: -2.5,
            detail: 'Derived: 20% of manufacturing, the 2026 rate on board games from China (7.5% Section 301 and a 12.5% tier), applied flat.',
          },
          {
            label: 'Freight and inbound',
            pct: -2.6,
            detail: '$1.50 a unit from China to their warehouse and on to Amazon’s. A placeholder, not a quote — the publisher names freight as a cost but gives no figure.',
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            detail: 'Measured per listing: 15%, the Toys & Games rate.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            label: 'FBA fulfilment',
            pct: -12.18,
            /* Keepa product record B0C6NR9ZC4: 381 × 292 × 160 mm, 4,559 g, pick-and-pack $9.88, read 2026-10-13. */
            detail: 'Size tier: Large Standard. The best seller, Thunder Road: Vendetta Maximum Chrome (B0C6NR9ZC4), packs to 15 × 11.5 × 6.3 in at 10.05 lb. Measured: each listing’s own pick-and-pack fee, $6.31 on an Unmatched set to $9.88 on the Maximum Chrome box, times September’s badged units.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -12.416,
            amount: 7.17,
            detail: `MODELLED, not observed: amazon-adspend-spy's Sponsored Products spend, about ${monthUsd(RG_AD.monthlyUsd.central)} a month on the five games in the margin, ${linePct(RG_AD.ratePct.central)} of their revenue, applied here to the whole brand. Automatic and product-targeting campaigns, Sponsored Brands and Display are invisible to it, so it is a floor.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/restoration-games/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/restoration-games/advertising/' },
            ],
          },
        ],
        note:
          'Before licence royalties, which this model does not include: Marvel, The Witcher, TMNT, Buffy and Jurassic Park Unmatched sets are licensed, no rate is published, and whether Thunder Road: Vendetta or the designers carry a royalty is not known. Also before the team, warehouse, design, art, storage and returns, so this is a ceiling on profit rather than profit.',
      },
      {
        type: 'prose',
        text:
          'Royalties are the cost this profile cannot price, and it is not a small one for a publisher. Several Unmatched sets are licensed from Marvel, The Witcher, TMNT, Buffy and Jurassic Park, and nobody publishes the rate. In September the only named licensed listing with a badge, the TMNT set, was in a reseller’s buy box, so none of the own account’s month sits on a named licence. But whether Thunder Road: Vendetta, about 73% of that revenue, pays a royalty to its designers or anyone else is unknown either way. The profit here is before that.',
      },
      {
        type: 'callout',
        text:
          'Three of these six lines are Amazon’s or the publisher’s; two are placeholders and one is stretched past what its source covers. Manufacturing on Thunder Road is the first number to replace — and royalties are the first number to add.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'The brand’s Amazon sales grew, and on the day search was read it held no generic sponsored slots. The demand appears to come from somewhere else, and Kickstarter is where the company built its audience.',
      },
      {
        type: 'prose',
        text:
          'Counting every seller, the brand’s Amazon sales were $577,577 over October 2025 to September 2026, against $412,504 the year before — 40% more. That is the brand, not this account: until November 2025 almost all of it went through resellers, and the own account has no year-ago figure to compare. On the one day Amazon search was read, Restoration held none of the sponsored slots on four generic board-game searches.',
      },
      {
        type: 'prose',
        text:
          'What it did have was a crowd. Tabletop Analytics counts eleven Kickstarter campaigns from 2017 to 2025 and about $14.4M pledged. That total needs two warnings: it includes a cancelled 2021 Thunder Road: Vendetta campaign whose $278,732 was never collected, and its backer count adds up backings, so a person who backed several campaigns is counted several times. The largest were Return to Dark Tower in 2020 and Fireball Island in 2018. That this audience drives Amazon demand is the dossier’s reading; nothing measures it.',
      },
      {
        type: 'callout',
        text:
          'Neither of the two biggest Kickstarter titles, Return to Dark Tower and Fireball Island, carries a sold badge on Amazon now. The Amazon money comes from Thunder Road and Unmatched.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-13, read at
           New York 10001. */
        type: 'strategy',
        label: RG_AD.strategy,
        points: [
          `About ${monthUsd(RG_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(RG_AD.monthlyUsd.low)}–${monthUsd(RG_AD.monthlyUsd.high)}), ${linePct(RG_AD.ratePct.central)} of September revenue on the 5 products in the margin. Jungle Scout saw their ads on 804 of the 1,646 searches those listings show up on.`,
          'The model puts none of it on their own name, because Jungle Scout holds no share-of-voice reading for “restoration games”; the hand read below found them in positions 1 to 4 there, so that spend is real and missing from this figure.',
          'Of the 15 biggest generic searches they rank on, they buy 6, led by the licensed names their Unmatched sets carry: “the witcher”, “unmatched board game”, “witcher”.',
          'Modelled from outside the account, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: RG_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for Thunder Road: Vendetta — Maximum Chrome, Thunder Road: Vendetta, Unmatched: Battle of Legends Vol. 3, Unmatched: Cobble & Fog, Dinosaur Tea Party: exact-match monthly searches and the best organic position any of the listings held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(RG_AD.monthlyUsd.central)} in all. Read 13 October 2026.`,
      },
      adKeywordsTable(RG_AD_KEYWORDS, RG_AD_KEYWORDS_TOTAL, RG_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'A hand read on 15 September, from New York, saw the same shape: none of the 48 sponsored slots on four generic searches (“board games for adults”, “strategy board games”, “family board games”, “2 player board games”) was theirs, while on their own name they held positions 1 to 4, and on “unmatched board game” positions 1, 52 and 55.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(RG_AD.monthlyUsd.central)} a month, ${linePct(RG_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 804 of 1,646 keywords their listings rank on — Jungle Scout share of voice; searches read from New York, 13 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. The Margin breakdown’s advertising line is still the earlier estimate until the margin is rebuilt with supplier quotes.',
          },
          {
            label: 'Meta and Google',
            value: 'Not checked',
            note: 'The Meta Ad Library and a paid-search history were not read for this profile. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, built from RG_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...(RG_AD.products.length > 1 ? RG_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]) : []),
          ['Total — the margin line', monthUsd(Math.round((34633 * RG_AD.ratePct.central) / 100)), linePct(RG_AD.ratePct.central), lineUsd((57.72 * RG_AD.ratePct.central) / 100), `Modelled: ${monthUsd(RG_AD.monthlyUsd.low)}–${monthUsd(RG_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising. The total applies the modelled rate to the whole brand’s snapshot revenue, $34,633, since the model reads the five games in the margin; per sale is that share of the $57.72 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'Their site links four community channels, and on Amazon the demand arrives already typing the brand’s or the game’s name.',
      },
      /* The same chips the overview opens with. 🚨 None carries a follower
         count: nobody read them. */
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Follower counts and site traffic were not read for this profile, so the chips above carry no audience figure. What was read is Amazon search. On “restoration games”, 24 of the first page’s organic results are the brand’s; on “unmatched board game”, eight, the best at position 3. On four generic board-game searches, none of the 60 results a page is theirs.',
      },
      {
        type: 'table',
        caption: 'Where they show up in Amazon search',
        columns: ['Search', 'Sponsored slots theirs', 'Organic results theirs', 'Best organic position'],
        rows: [
          ['restoration games', '4 of 12', '24', '#5'],
          ['unmatched board game', '3 of 11', '8', '#3'],
          ['board games for adults', '0 of 12', '0', '—'],
          ['strategy board games', '0 of 12', '0', '—'],
          ['family board games', '0 of 12', '0', '—'],
          ['2 player board games', '0 of 12', '0', '—'],
        ],
        note:
          'Read 15 September 2026 in Chrome with delivery set to New York 10001, 60 results a page. Amazon localises search to whoever is looking, so these positions describe that reader on that day. A first “strategy board games” read showed no ads at all and was read again.',
      },
      {
        type: 'callout',
        text:
          'Nothing public says how much of that branded demand comes from Kickstarter backers, game stores or their socials, because none of them publishes a number.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'RESTORATION GAMES, LLC' },
          { label: 'Seller', value: 'Restoration Games', note: 'Merchant A31FN2NBWF0WX7' },
          { label: 'Founded', value: '2016', note: 'By the company’s account' },
          { label: 'Founders', value: 'Justin D. Jacobson and Rob Daviau', note: 'Jacobson runs it; Daviau is Chief Restoration Officer' },
          { label: 'Seller account first seen', value: '28 Sep 2025', note: 'By Keepa — the account, not the brand' },
          { label: 'Registered address', value: 'Sunrise, FL, US', note: '12717 W Sunrise Blvd, Ste 244, 33323' },
          { label: 'Seller feedback', value: '100%', note: 'Over 46 ratings', info: 'sellerFeedback' },
          { label: 'Team', value: '16', note: 'June 2025, trade press' },
          { label: 'Oldest listing under the brand', value: '10 Jul 2017' },
        ],
      },
      {
        type: 'prose',
        text:
          'An established publisher on a new seller account. Jacobson, an attorney, owns and runs the Florida company; Daviau designs. By their own announcements they hired a lead marketer and a warehouse manager in September 2024, when a move to a new warehouse of their own was under way, and by June 2025 the team was sixteen, with more hires in marketing, warehouse and design. None of that is checked here.',
      },
      {
        type: 'prose',
        text: 'These details are resolved from the seller record behind the brand’s Amazon storefront, and from the company’s own and trade-press announcements.',
      },
      /* Valuation omitted: eleven profit months, and the model needs twelve. */
    ],
  },

  'lighten-life': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-lighten-life-headline.ts, from
       waithowmuch-research research/lighten-life/headline.json (reviewed
       2026-09-16) — and the page reads them from the row alone. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/lighten-life/81c1e9e89af0f81f22239cdcd88d68fcd57cd4a7c020d20f527e19a3214e35a0.png',
      /* Not the revenue leader, deliberately. That is the mixing-glass bar kit,
         whose buy box Mili World happened to hold at the moment of the read.
         This one sold the most units in the month, and it is the object the
         title names: a drinking glass. */
      image: {
        src: lightenLifePhoto('B09XHSVV7T'),
        alt: 'A whiskey glass printed “Daddy’s Sippy Cup” in white script, filled with whiskey, beside an open pale wooden gift box lined in black with the lighten life wreath logo inside the lid — a best-selling LIGHTEN LIFE listing',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand on the glass,
             the box and the listings, and no other brand's goods in the
             catalogue. 🚨 The trademark is registered to a third company,
             Shenzhen Tangson Houseware, not to either seller account, so
             whether the seller owns the brand is unestablished — the first
             question for the owner. */
          primaryMethod: 'private_label',
          /* Broad. No listing is over a fifth of September 2026 and 21 of 122
             listings carry a badge, spread over whiskey glasses, beer glasses,
             decanters and a bar kit. Not "dominance": the year-dated gift
             glass is a crowded search, where they rank mid-page (46–57) on
             generic gift terms. */
          catalogStructure: 'broad',
          /* Level 2. A printed design — a year, a joke — on a stock glass in a
             stock wooden or barrel box. Visible, and a rival orders the same
             print from the same kind of factory. No tooling, and nothing
             custom-made to form or function. */
          diffTooling: 'no',
          diffCustom: 'no',
          diffVisible: 'yes',
          /* A READ: the Brand Store at /stores/LIGHTENLIFE is gated behind
             enrolment. */
          brandRegistry: 'yes',
          /* 🚨 `trademark` left out on purpose. The mark is registered and
             live, but its owner is neither seller, so whether it would convey
             in a sale is unknown. Scoring "registered" would pay +0.2 for an
             asset nobody has shown the business holds. */
        },
        derived: {
          /* RULE 1: B07YJLZTNB, a decanter and glass set, 2019-12-05 — the
             catalogue's first listing. Not EVERHOME's account (Keepa first saw
             it 2025-12-26). */
          sellingSince: '2019-12-05',
          /* Top 20 listings, each variation family counted ONCE (the
             birthday-glass family shares 3,688 across its ages; the beer glasses
             2,171). A floor. */
          reviewTotal: 11568,
          /* Revenue-weighted over September's badged listings: 4.79. */
          ratingWeighted: 4.8,
          /* 🚨 A blend of the two accounts by rating count — EVERHOME 100% over
             32, Mili World 99% over 881 → 99%. Both sit in the model's 98%+
             band, so the blend does not move the multiple. */
          sellerFeedbackPct: 99,
          /* channels left unset: EVERHOME's record shows FBA, and nobody
             checked for FBM. The model scores only "both". */
          /* RULE 2. EVERHOME has an Amazon Canada account with 0 ratings; Amazon
             US is all of the measured revenue. Mili World's footprint outside
             the US was not checked. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* December 2025 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 26.14,
          /* RULE 3: offAmazonSharePct unset. Walmart and Bed Bath & Beyond
             listings exist and their sellers were never read. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. The LIGHTEN LIFE brand on Amazon US only, counted across both seller accounts that have held its buy box — Walmart, Bed Bath & Beyond and any other retail are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '122', note: '72 in the current storefront; 21 carrying a sold badge', info: 'skus' },
      /* The whiskey glasses' own breadcrumb — most of the badged listings sit
         under it. */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Dining & Entertaining › Glassware & Drinkware › Cocktail Drinkware › Old Fashioned Glasses',
        note: 'The whiskey-glass listings',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-listing figures, so NO `info` key — the shared ⓘ copy describes
         one hero listing. */
      { label: 'Product reviews', value: '11,568', note: 'Top 20 listings, each variation family counted once' },
      { label: 'Product rating', value: '4.8★', note: 'Revenue-weighted, September’s badged listings' },
      { label: 'Seller feedback', value: '99–100%', note: 'Mili World and EVERHOME · read 15 Sep 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their brand on the box; the maker is unnamed', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, long tail', note: 'No listing is a fifth of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 2', note: 'Printed designs on stock glass', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US', note: 'Listings seen on other retailers, sellers unread', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a number behind it. Every figure on this profile is the LIGHTEN LIFE brand on Amazon US, across both seller accounts that have held its buy box.',
      },
      /* Unchecked rather than no: an account exists in Canada, and Mili
         World's non-US accounts were never looked up. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'EVERHOME has an Amazon Canada account with 0 ratings and none on Amazon UK or Germany. Mili World was not looked up outside the US.',
      },
      'own-store': {
        status: 'no',
        note:
          'No brand site was found. lifelightenup.com uses the name, but it is a template store that also sells Vitra, Alessi and Hay, and nothing ties it to the brand.',
      },
      /* Unchecked, not yes: the listings exist, but whether this business is
         the one selling them is exactly what was not read. */
      'other-marketplace': {
        status: 'unchecked',
        flag: true,
        note:
          'LIGHTEN LIFE items show up on walmart.com, bedbathandbeyond.com and advancedmixology.com in search results. The sellers were not read — Walmart returned a CAPTCHA.',
      },
      // tiktok-shop, wholesale-out and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'Both seller records show FBA, and every badged listing carries an Amazon pick-and-pack fee: $5.61 on a boxed whiskey glass, $6.90 on the bar kit.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the listings between FBA and FBM.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the brand’s listings, on either seller record.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand on the glass, the box and the listings. The trademark is registered to a third company in Shenzhen, so who owns the brand is a separate question.',
      },
      /* Unchecked: Wenxi County is a glassware county, and that is context,
         not evidence that either Shanxi account makes the glass. */
      manufacturer: {
        status: 'unchecked',
        note:
          'Mili World is registered in Wenxi County, Shanxi, which is known for glassware. Nothing read shows who makes these glasses.',
      },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/LIGHTENLIFE, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'LIGHTEN LIFE sells gift glassware on Amazon: birthday and retirement whiskey glasses in wooden boxes, beer glasses in barrel boxes, and whiskey decanter sets. The brand has been listed since December 2019, and in 2026 its buy box moved from a company in Shanxi, China, to one in California.',

    blocks: [
      { type: 'heading', text: 'A year on a glass, in a wooden box' },
      {
        type: 'prose',
        text:
          'Most of what sells is one idea, reprinted for each age. A 12oz rocks glass reads “1946 Vintage — Aged to Perfection” for an 80th birthday, or “1976” for a 50th, and ships in a pale wooden box with the brand’s wreath inside the lid. A 16oz pint glass does the same in a barrel-shaped box. Around them sit joke glasses — “Daddy’s Sippy Cup”, “Grandpa Juice”, a coworker leaving gift — decanter sets, a 29oz decanter and a cocktail mixing glass kit.',
      },
      {
        type: 'prose',
        text:
          'Three companies appear in the public record, and none is shown to be connected to the others. The trademark belongs to Shenzhen Tangson Houseware. Until 2026 the buy box was held by Mili World, a home-products company in Wenxi County, Shanxi. Since June it has been held by EVERHOME CRAFT INC, at an address in Ontario, California. Everything on this page counts the brand across both seller accounts, and that choice rests on an inference.',
      },
      /* No figures in the caption. The two year-dated glasses are the
         catalogue's idea; bucket copies of the brand's own listing images. */
      {
        type: 'images',
        items: [
          {
            src: lightenLifePhoto('B0CPWGZK21'),
            alt: 'A whiskey glass printed “Limited Edition 1946 Vintage — Aged to Perfection” under a crown and laurel, with ice and whiskey, beside an open wooden gift box holding the same glass',
          },
          {
            src: lightenLifePhoto('B0CPPXBZQG'),
            alt: 'A pint of beer in a glass printed “1966 Vintage — Aged to Perfection”, beside a dark wooden barrel-shaped gift box with iron hoops and a brass clasp',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the year-dated whiskey glass in its wooden box, and the beer glass in its barrel box.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A trademark filed from Shenzhen in 2019, six years of listings, and in 2026 a buy box that moved from Shanxi to California in five months.',
      },
      {
        /* Oldest first. Month-end revenue events sit on the last day of the
           month so the dot lands on the chart's point. The 2018 first-use date
           is the registrant's own claim on the trademark record. */
        type: 'timeline',
        items: [
          {
            when: '27 Sep 2018',
            tag: 'Brand',
            what: 'First use of the LIGHTEN LIFE mark, by the registrant’s claim',
            detail: 'The date Shenzhen Tangson Houseware gave the USPTO for first use in commerce. A claim on the filing, not something checked.',
          },
          {
            when: '14 Jan 2019',
            tag: 'Brand',
            what: 'Shenzhen Tangson Houseware files the trademark',
            detail: 'Class 21: beer glasses, drinking glasses, glass carafes, wine pourers and more. Registered on 23 July 2019.',
          },
          {
            when: '5 Dec 2019',
            tag: 'Amazon',
            what: 'The first LIGHTEN LIFE listing: a whiskey decanter and glass set',
            detail: 'A second decanter set, the one still selling with four glasses, went up the next day.',
          },
          {
            when: '14 Jul 2020',
            tag: 'Amazon',
            what: 'The cocktail mixing glass set is listed',
            detail: 'A 20oz glass with a spoon, jigger, strainer and muddler. Six years on it is still one of the brand’s top listings.',
          },
          {
            when: '23 Nov 2021',
            tag: 'Amazon',
            what: 'Keepa first tracks Mili World',
            detail: 'The Shanxi account that held the brand’s buy box through January 2026. A first-tracked date trails an account’s real opening.',
          },
          {
            when: '8 Apr 2022',
            tag: 'Amazon',
            what: '“Daddy’s Sippy Cup” goes up',
            detail: 'A joke whiskey glass, listed the same day as a coworker leaving gift. In September 2026 it sold more units than any other listing.',
          },
          {
            when: '7 Dec 2023',
            tag: 'Amazon',
            what: 'The year-dated birthday glasses arrive',
            detail:
              'Beer glasses in barrel boxes on 7 December, one listing per age, and most of the whiskey-glass ages on 10 December (a 50th had gone up in June). The whiskey-glass family now carries about 3,680 reviews, shared across its ages.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '$249,792 — the biggest month on the chart',
            detail: 'The first December in the badge history. Each December since has been smaller.',
          },
          {
            when: '30 Apr 2024',
            tag: 'Amazon',
            what: 'A second Wenxi account stops appearing',
            detail:
              'Perfect Drinkware, in the same Shanxi town as Mili World, held the buy box on one LIGHTEN LIFE listing at every month end from September 2023 to April 2024.',
          },
          {
            when: '30 Sep 2024',
            tag: 'Amazon',
            what: 'The retired listings have made their last sales',
            detail:
              'A 34oz decanter, a cold brew coffee maker, 51st, 61st and 81st birthday glasses, and boss and husband gift sets: 21 listings that brought in $351K from September 2023, none of it after this month.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '$197,630 — December',
            detail: 'Down a fifth on December 2023.',
          },
          {
            when: '23 Sep 2025',
            tag: 'Brand',
            what: 'The trademark owner files its six-year declaration of use',
            detail: 'Shenzhen Tangson Houseware had filed a change of address eleven days earlier. The USPTO accepted the declaration on 10 February 2026.',
          },
          {
            when: '26 Dec 2025',
            tag: 'Amazon',
            what: 'Keepa first tracks EVERHOME CRAFT INC',
            detail: 'Trading as Home Gift Ever, at 2131 South Grove Avenue, Ontario, California.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$188,139 — the last December under Mili World',
            detail: 'The smallest of the three Decembers on the chart.',
          },
          {
            when: '28 Feb 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds its first buy box at a month end',
            detail: 'On $849.50 of the month’s $42,079. Mili World held the rest.',
          },
          {
            when: '30 Apr 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds most of the month',
            detail: '$27,537 of $37,242, listing by listing, with Mili World stepping back rather than competing.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: '$23,339 — the lowest month in the series',
            detail: 'Both accounts still held buy boxes. This read cannot say whether the handoff, tariffs or demand made it low.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: 'Every buy box at the month end is EVERHOME’s',
            detail: 'And again at the end of July and August.',
          },
          {
            when: '15 Sep 2026',
            tag: 'Amazon',
            what: 'EVERHOME holds the buy box on 70 of 72 priced listings',
            detail:
              'Mili World held the other two when read, one of them the cocktail mixing glass kit, although EVERHOME had held that listing 97.2% of the previous 90 days.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'This is a December business. The three Decembers on the chart did $249,792, $197,630 and $188,139, three to five times an ordinary month, and each was smaller than the one before. A little over a quarter of each month is kept after the glass, duty, freight, Amazon’s two fees and advertising. That share uses September 2026’s cost rates for every month, and a glass cost nobody has quoted.',
      },
      {
        type: 'prose',
        text:
          'The series counts all 122 listings carrying the brand, each once, whichever account held the buy box. The count matters here: 21 listings no longer in the current storefront sold in 2023 and 2024. Measured off today’s storefront alone, September 2023 reads $35K. Brand-wide it was $80K.',
      },
      { type: 'chart' },
      {
        /* From EVERHOME's Keepa seller record on UK, DE and CA (2026-09-15).
           Mili World's was not looked up outside the US, and the note says so.
           🚨 The largest share is valuation derived.topMarketplaceSharePct —
           check-profile.mjs holds the two together. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. The current seller has a Canadian account with no ratings.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'EVERHOME’s account exists with 0 ratings; no Canadian listing was checked for a badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No EVERHOME account. Mili World was not looked up outside the US' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Only the current seller’s id was looked up on each marketplace.',
      },
      {
        /* Generated from the brand series — see the module's header. The rows
           sum to the 2026-09 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing carries the month. The mixing glass kit and the joke whiskey glasses lead, and behind them are the year-dated glasses, one listing per age, each selling 50 or 100 a month.',
        items: LIGHTEN_LIFE_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the buy box on 15 September 2026, so every row is a floor. The other 101 brand listings carry no badge and count as zero. One row’s buy box was Mili World’s at the moment of the read, and the row says so.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. This chart also joins two seller accounts into one business: Mili World in Shanxi through January 2026, and EVERHOME CRAFT INC in California from June. That is an inference. Nothing read ties the two companies together, or ties either one to the trademark’s owner.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'One marketplace, one fulfilment method, one account at a time. The account changed in 2026, and the way a sale reaches the customer did not.',
      },
      {
        type: 'prose',
        text:
          'Every badged listing is fulfilled by Amazon, and both seller records show FBA. When the buy box moved in spring 2026, the listings, prices and reviews stayed. The best-selling whiskey glasses have been $16.99 since December 2024, with a few short discounts. Off Amazon, the brand’s items appear on Walmart, Bed Bath & Beyond and a bar-supply site. Nobody read who sells them there, so those channels are unchecked, not counted.',
      },
      {
        type: 'prose',
        text:
          'What follows shows which methods are present, not what share each one has. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon’s fulfilment fee is the biggest cost on a $20 gift. After it come the glass and box, now priced from Alibaba suppliers, then duty, freight, the referral fee and advertising: about a quarter of each sale is left, a ceiling.',
      },
      {
        type: 'prose',
        text:
          'Two lines are measured: Amazon’s 15% referral fee and its pick-and-pack fee, read per listing. On a $16.99 boxed whiskey glass that fee is $5.61, a third of the price, because Amazon charges for the box’s size and weight, not its value. The goods are the weak part. No supplier quoted. Glass and wooden-box prices come from Made-in-China list prices, and no barrel box was priced at all. Every dollar of unit cost moves a 2,500-unit month by about $3,000 once duty is added.',
      },
      {
        "type": "product-margins",
        "period": "2026-09",
        "products": [
          {
            "id": "whiskey-glass",
            "label": "Whiskey glass",
            "sharePct": 44.1,
            "blocks": [
              {
                "type": "table",
                "id": "cogs-breakdown",
                "caption": "COGS — what a engraved whiskey glass in a wooden box costs to make",
                "attribution": "alibaba",
                "columns": [
                  "Supplier",
                  "Track record",
                  "Buyer rating",
                  "Sold on Alibaba",
                  "MOQ",
                  "Unit price"
                ],
                "rows": [
                  [
                    "Wuhan Jingyueda Household Products Co., Ltd.",
                    "Verified · 6 yrs",
                    "—",
                    "26",
                    "24 pieces",
                    "$2.80"
                  ],
                  [
                    "Yiwu Showbox Technology Co., Ltd.",
                    "Verified · 11 yrs",
                    "—",
                    "—",
                    "100 sets",
                    "$3–3.50"
                  ],
                  [
                    "Wuhan Xinhuahang Household Goods Co., Ltd.",
                    "Verified · 7 yrs",
                    "4.8★ from 82",
                    "—",
                    "300 pieces",
                    "$2.40–3.50"
                  ],
                  [
                    "Yantai Landy Wood Arts and Crafts Co., Ltd.",
                    "Verified · 11 yrs",
                    "4.9★ from 11",
                    "—",
                    "300 pieces",
                    "$5.30"
                  ],
                  [
                    "Average lowest price — the cost to make used below",
                    "",
                    "",
                    "",
                    "",
                    "$3.38"
                  ]
                ],
                "note": "Four Alibaba listings for an engraved crystal glass in a wooden box, all from China, rated 4.5 or better where rated. Two picture the glass in a box rather than pricing it as a set, so the box may be extra. The cost to make is each supplier’s lowest listed price, averaged ($2.80, $3.00, $2.40, $5.30). Left out: a $12 retail seller in India. Searched “custom engraved whiskey glass wooden box” with the 4.5+ supplier-rating filter, 13 Oct 2026."
              },
              {
                "type": "table",
                "id": "landed-cost",
                "caption": "Landed cost — production, duty and freight, per whiskey glass",
                "noteColumns": [
                  2
                ],
                "columns": [
                  "Line",
                  "Per unit",
                  "From"
                ],
                "rows": [
                  [
                    "Production",
                    "$3.38",
                    "The Alibaba suppliers’ lowest prices, averaged — COGS table above"
                  ],
                  [
                    "Tariff",
                    "$0.85",
                    "25% of production"
                  ],
                  [
                    "Freight and inbound",
                    "$0.80",
                    "The best seller’s carton at the container rate, plus $0.35"
                  ],
                  [
                    "Landed",
                    "$5.03",
                    "What one costs at Amazon’s door"
                  ]
                ]
              },
              {
                "type": "margin",
                "basis": {
                  "label": "Selling price, Sep 2026",
                  "value": 17.3
                },
                "lines": [
                  {
                    "label": "Cost of goods",
                    "key": "cogs",
                    "pct": -19.54,
                    "amount": 3.38,
                    "emphasis": true,
                    "detail": "The average of the Alibaba suppliers’ lowest prices above, $3.38 — one production price for this product, the low end an order bigger than one moves toward.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      }
                    ]
                  },
                  {
                    "label": "Tariff",
                    "pct": -4.91,
                    "amount": 0.85,
                    "detail": "25% of the cost to make on September’s goods (imported in July): the US rate on glassware in this value band, 7.5%, plus Section 301’s 7.5% and the 10% China duty then in force. China origin and the two-month lag are assumed.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Freight and inbound",
                    "pct": -4.62,
                    "amount": 0.8,
                    "detail": "$0.80 a unit: the best seller’s carton (159 × 144 × 129 mm, 621 g) at the FBX01 container rate, plus $0.35 for drayage and inbound placement (a placeholder, not a quote).",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Amazon referral fee",
                    "pct": -15,
                    "amount": 2.6,
                    "detail": "Amazon’s Kitchen rate, 15%, on every LIGHTEN LIFE listing in Keepa. Measured.",
                    "links": [
                      {
                        "label": "Amazon’s referral fees by category",
                        "href": "https://sell.amazon.com/pricing"
                      }
                    ]
                  },
                  {
                    "label": "FBA fulfilment",
                    "pct": -32.43,
                    "amount": 5.61,
                    "detail": "Size tier: Large Standard. Measured on B09XHSVV7T, a 159 × 144 × 129 mm, 621 g box: Amazon’s pick-and-pack fee, $5.61.",
                    "links": [
                      {
                        "label": "All of Amazon’s size tiers, explained",
                        "href": "https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US"
                      }
                    ]
                  },
                  {
                    "label": "Advertising",
                    "pct": -1.565,
                    "amount": 0.27,
                    "detail": "MODELLED, not observed: this product’s share of the Sponsored Products spend amazon-adspend-spy models, $0.27 a sale.",
                    "links": [
                      {
                        "label": "See the ad spend behind this line",
                        "href": "/business/lighten-life/advertising/#ad-spend"
                      }
                    ]
                  }
                ],
                "note": "Before storage, returns and breakage, coupons and overhead, none of which is modelled: a ceiling on profit, not profit."
              }
            ]
          },
          {
            "id": "beer-glass",
            "label": "Beer glass",
            "sharePct": 23.5,
            "blocks": [
              {
                "type": "table",
                "id": "cogs-breakdown",
                "caption": "COGS — what a birthday beer glass in a barrel box costs to make",
                "attribution": "alibaba",
                "columns": [
                  "Supplier",
                  "Track record",
                  "Buyer rating",
                  "Sold on Alibaba",
                  "MOQ",
                  "Unit price"
                ],
                "rows": [
                  [
                    "Xuzhou Taibo Glass Products Co., Ltd.",
                    "Not verified · 8 yrs",
                    "5★ from 3",
                    "—",
                    "300 pieces",
                    "$7.25–7.42"
                  ],
                  [
                    "Wuhan Jingyueda Household Products Co., Ltd.",
                    "Verified · 6 yrs",
                    "4.7★ from 86",
                    "—",
                    "100 pieces",
                    "$5.50–7.50"
                  ],
                  [
                    "Wuhan Xinhuahang Household Goods Co., Ltd.",
                    "Verified · 7 yrs",
                    "4.8★ from 82",
                    "—",
                    "500 pieces",
                    "$3.20–5"
                  ],
                  [
                    "Average lowest price — the cost to make used below",
                    "",
                    "",
                    "",
                    "",
                    "$5.32"
                  ]
                ],
                "note": "Three listings for a glass sold in a wooden barrel or gift box. Wuhan Jingyueda’s is a whiskey glass in the same barrel box; the box is the costly part, so it counts. Xuzhou Taibo is not Verified. Left out: glasses with no box, two shot glasses, and a $0.85 “glass in wooden box” too cheap to include the barrel. Searched “beer glass custom” and the barrel-box listings it led to, 13 Oct 2026."
              },
              {
                "type": "table",
                "id": "landed-cost",
                "caption": "Landed cost — production, duty and freight, per beer glass",
                "noteColumns": [
                  2
                ],
                "columns": [
                  "Line",
                  "Per unit",
                  "From"
                ],
                "rows": [
                  [
                    "Production",
                    "$5.32",
                    "The Alibaba suppliers’ lowest prices, averaged — COGS table above"
                  ],
                  [
                    "Tariff",
                    "$1.20",
                    "22.5% of production"
                  ],
                  [
                    "Freight and inbound",
                    "$0.96",
                    "The best seller’s carton at the container rate, plus $0.35"
                  ],
                  [
                    "Landed",
                    "$7.48",
                    "What one costs at Amazon’s door"
                  ]
                ]
              },
              {
                "type": "margin",
                "basis": {
                  "label": "Selling price, Sep 2026",
                  "value": 19.99
                },
                "lines": [
                  {
                    "label": "Cost of goods",
                    "key": "cogs",
                    "pct": -26.61,
                    "amount": 5.32,
                    "emphasis": true,
                    "detail": "The average of the Alibaba suppliers’ lowest prices above, $5.32 — one production price for this product, the low end an order bigger than one moves toward.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      }
                    ]
                  },
                  {
                    "label": "Tariff",
                    "pct": -6.0,
                    "amount": 1.2,
                    "detail": "22.5% of the cost to make on September’s goods (imported in July): the US rate on glassware in this value band, 5%, plus Section 301’s 7.5% and the 10% China duty then in force. China origin and the two-month lag are assumed.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Freight and inbound",
                    "pct": -4.8,
                    "amount": 0.96,
                    "detail": "$0.96 a unit: the best seller’s carton (193 × 145 × 141 mm, 750 g) at the FBX01 container rate, plus $0.35 for drayage and inbound placement (a placeholder, not a quote).",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Amazon referral fee",
                    "pct": -15,
                    "amount": 3.0,
                    "detail": "Amazon’s Kitchen rate, 15%, on every LIGHTEN LIFE listing in Keepa. Measured.",
                    "links": [
                      {
                        "label": "Amazon’s referral fees by category",
                        "href": "https://sell.amazon.com/pricing"
                      }
                    ]
                  },
                  {
                    "label": "FBA fulfilment",
                    "pct": -28.81,
                    "amount": 5.76,
                    "detail": "Size tier: Large Standard. Measured on B0CPPWVPGS, a 193 × 145 × 141 mm, 750 g box: Amazon’s pick-and-pack fee, $5.76.",
                    "links": [
                      {
                        "label": "All of Amazon’s size tiers, explained",
                        "href": "https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US"
                      }
                    ]
                  },
                  {
                    "label": "Advertising",
                    "pct": -0.042,
                    "amount": 0.01,
                    "detail": "MODELLED, not observed: this product’s share of the Sponsored Products spend amazon-adspend-spy models, $0.01 a sale.",
                    "links": [
                      {
                        "label": "See the ad spend behind this line",
                        "href": "/business/lighten-life/advertising/#ad-spend"
                      }
                    ]
                  }
                ],
                "note": "Before storage, returns and breakage, coupons and overhead, none of which is modelled: a ceiling on profit, not profit."
              }
            ]
          },
          {
            "id": "cocktail-set",
            "label": "Cocktail set",
            "sharePct": 17.1,
            "blocks": [
              {
                "type": "table",
                "id": "cogs-breakdown",
                "caption": "COGS — what a cocktail mixing glass set costs to make",
                "attribution": "alibaba",
                "columns": [
                  "Supplier",
                  "Track record",
                  "Buyer rating",
                  "Sold on Alibaba",
                  "MOQ",
                  "Unit price"
                ],
                "rows": [
                  [
                    "Wingshung Industrial (Shanghai) Co., Ltd.",
                    "Not verified · 18 yrs",
                    "5★ from 1",
                    "—",
                    "500 sets",
                    "$3.50–4.60"
                  ],
                  [
                    "Average lowest price — the cost to make used below",
                    "",
                    "",
                    "",
                    "",
                    "$3.50"
                  ]
                ],
                "note": "One exact match: a 5-piece set (mixing glass, spoon, muddler, jigger, strainer) in a gift box, from a supplier that is not Verified and has one review; the owner chose it as the set price. Left out: two listings for the glass alone, a 7-piece premium kit at $10.66, and a $0.36 “set” too cheap to be one. Searched “cocktail mixing glass set” and “bar tool set mixing glass jigger strainer muddler”, 13 Oct 2026."
              },
              {
                "type": "table",
                "id": "landed-cost",
                "caption": "Landed cost — production, duty and freight, per cocktail set",
                "noteColumns": [
                  2
                ],
                "columns": [
                  "Line",
                  "Per unit",
                  "From"
                ],
                "rows": [
                  [
                    "Production",
                    "$3.50",
                    "The Alibaba suppliers’ lowest prices, averaged — COGS table above"
                  ],
                  [
                    "Tariff",
                    "$0.88",
                    "25% of production"
                  ],
                  [
                    "Freight and inbound",
                    "$1.12",
                    "The best seller’s carton at the container rate, plus $0.35"
                  ],
                  [
                    "Landed",
                    "$5.50",
                    "What one costs at Amazon’s door"
                  ]
                ]
              },
              {
                "type": "margin",
                "basis": {
                  "label": "Selling price, Sep 2026",
                  "value": 28.99
                },
                "lines": [
                  {
                    "label": "Cost of goods",
                    "key": "cogs",
                    "pct": -12.07,
                    "amount": 3.5,
                    "emphasis": true,
                    "detail": "The average of the Alibaba suppliers’ lowest prices above, $3.50 — one production price for this product, the low end an order bigger than one moves toward.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      }
                    ]
                  },
                  {
                    "label": "Tariff",
                    "pct": -3.04,
                    "amount": 0.88,
                    "detail": "25% of the cost to make on September’s goods (imported in July): the US rate on glassware in this value band, 7.5%, plus Section 301’s 7.5% and the 10% China duty then in force. China origin and the two-month lag are assumed.",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Freight and inbound",
                    "pct": -3.86,
                    "amount": 1.12,
                    "detail": "$1.12 a unit: the best seller’s carton (276 × 137 × 133 mm, 1,338 g) at the FBX01 container rate, plus $0.35 for drayage and inbound placement (a placeholder, not a quote).",
                    "links": [
                      {
                        "label": "See COGS breakdown above",
                        "href": "#cogs-breakdown"
                      },
                      {
                        "label": "See landed cost above",
                        "href": "#landed-cost"
                      }
                    ]
                  },
                  {
                    "label": "Amazon referral fee",
                    "pct": -15,
                    "amount": 4.35,
                    "detail": "Amazon’s Kitchen rate, 15%, on every LIGHTEN LIFE listing in Keepa. Measured.",
                    "links": [
                      {
                        "label": "Amazon’s referral fees by category",
                        "href": "https://sell.amazon.com/pricing"
                      }
                    ]
                  },
                  {
                    "label": "FBA fulfilment",
                    "pct": -23.8,
                    "amount": 6.9,
                    "detail": "Size tier: Large Standard. Measured on B08CXWGFQM, a 276 × 137 × 133 mm, 1,338 g box: Amazon’s pick-and-pack fee, $6.90.",
                    "links": [
                      {
                        "label": "All of Amazon’s size tiers, explained",
                        "href": "https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US"
                      }
                    ]
                  },
                  {
                    "label": "Advertising",
                    "pct": -0.287,
                    "amount": 0.08,
                    "detail": "MODELLED, not observed: this product’s share of the Sponsored Products spend amazon-adspend-spy models, $0.08 a sale.",
                    "links": [
                      {
                        "label": "See the ad spend behind this line",
                        "href": "/business/lighten-life/advertising/#ad-spend"
                      }
                    ]
                  }
                ],
                "note": "Before storage, returns and breakage, coupons and overhead, none of which is modelled: a ceiling on profit, not profit."
              }
            ]
          },
          {
            "id": "all",
            "label": "Whole brand",
            "blended": true,
            "blocks": [
              {
                "type": "margin",
                "basis": {
                  "label": "Average selling price, Sep 2026",
                  "value": 20.39
                },
                "lines": [
                  {
                    "label": "Cost of goods",
                    "key": "cogs",
                    "pct": -20,
                    "emphasis": true,
                    "detail": "The three products’ Alibaba prices on September’s mix: 20.0% of revenue. See each product’s tab for its suppliers."
                  },
                  {
                    "label": "Tariff",
                    "pct": -5,
                    "detail": "22.5–25% of the cost to make on September’s goods: 4.8% of revenue."
                  },
                  {
                    "label": "Freight and inbound",
                    "pct": -5,
                    "detail": "Each product’s own carton at the container rate, plus $0.35: 4.5% of revenue."
                  },
                  {
                    "label": "Amazon referral fee",
                    "pct": -15,
                    "detail": "Amazon’s Kitchen rate, 15%.",
                    "links": [
                      {
                        "label": "Amazon’s referral fees by category",
                        "href": "https://sell.amazon.com/pricing"
                      }
                    ]
                  },
                  {
                    "label": "FBA fulfilment",
                    "pct": -30,
                    "detail": "Size tier: Large Standard. Measured per listing, $5.61–6.90 on the three products: 29.7% of revenue.",
                    "links": [
                      {
                        "label": "All of Amazon’s size tiers, explained",
                        "href": "https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US"
                      }
                    ]
                  },
                  {
                    "label": "Advertising",
                    "pct": -0.885,
                    "detail": "MODELLED, not observed: amazon-adspend-spy’s Sponsored Products spend, about $382 a month. Their own-name spend is real and missing (no Jungle Scout reading for it).",
                    "links": [
                      {
                        "label": "See the ad spend behind this line",
                        "href": "/business/lighten-life/advertising/#ad-spend"
                      }
                    ]
                  }
                ],
                "note": "The three products are 85% of September’s revenue; the rest of the catalogue is assumed to cost the same mix. Before storage, returns, coupons and overhead: a ceiling on profit, not profit."
              }
            ]
          }
        ]
      },
      {
        type: 'prose',
        text:
          'Tariffs move the rate more than the business does. The additional China duty was nothing before 2025, reached 30% during 2025, and is 10% on September 2026’s goods. The same glass kept a different share in each month. The dossier’s month-by-month model uses each month’s own duty and freight. In that model September 2026 keeps more than September 2025, although it sold less, and September 2025 to August 2026 keeps about $181,500 — less than this chart’s single set of rates gives.',
      },
      {
        type: 'callout',
        text:
          'The glass and box costs move this profile most, and they now rest on Alibaba quotes: four suppliers for the whiskey glass, three for the beer glass, and one exact match for the cocktail set. Freight’s $0.35 handling is still a placeholder.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'There is no growth to report. The brand is shrinking, and this read cannot say why.',
      },
      {
        type: 'prose',
        text:
          'Every month of 2026 so far sold less than the same month of 2025. January to August came to $331,800, against $485,914 a year earlier, down 32%. The twelve months to August 2026 were down 20% on the twelve before. The decline is not only this year: each December was smaller than the last.',
      },
      {
        type: 'prose',
        text:
          'Part of the older decline is a pruned catalogue. By October 2024, 21 listings had stopped selling for good: a 34oz decanter, a cold brew coffee maker, 51st, 61st and 81st birthday glasses, and boss and husband gift sets. What is left is the year-dated glasses, the joke glasses, the decanters and the bar kit. New listings are the same idea at new ages: a 21st-birthday pint glass in September 2025, and 21st-birthday shot glasses in April 2026.',
      },
      {
        type: 'prose',
        text:
          'The 2026 drop lines up with the seller handoff. May 2026, the lowest month in the series, came when both accounts held buy boxes. It also lines up with changing China tariffs, and with whatever gift demand did. A handoff can cost sales through lost buy boxes, stock stranded in one account, or a new account’s limits. None of that is visible from outside.',
      },
      {
        type: 'callout',
        text:
          'Whether 2026 is a transition or a trend is the open question. June 2026, the first month fully under the new account, was the best month of 2026. July and August fell back.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-13, read at
           New York 10001. */
        type: 'strategy',
        label: LL_AD.strategy,
        points: [
          `About ${monthUsd(LL_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(LL_AD.monthlyUsd.low)}–${monthUsd(LL_AD.monthlyUsd.high)}), ${linePct(LL_AD.ratePct.central)} of September revenue on the 3 products in the margin. Jungle Scout saw their ads on 96 of the 1,681 searches those listings show up on.`,
          'The model puts none of it on their own name, because Jungle Scout holds no share-of-voice reading for “lighten life”. The New York read below did find them there: 8 of the 12 sponsored slots. So the brand spend is real and missing from this figure, which is all long, specific phrases.',
          'Of the 15 biggest generic searches they rank on, they buy 1: “glass sippy cup”.',
          'Modelled from outside the account, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: LL_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for Engraved whiskey glass in a wooden box, Birthday beer glass in a barrel box, Cocktail mixing glass set: exact-match monthly searches and the best organic position any of the listings held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(LL_AD.monthlyUsd.central)} in all. Read 13 October 2026.`,
      },
      adKeywordsTable(LL_AD_KEYWORDS, LL_AD_KEYWORDS_TOTAL, LL_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'On “lighten life”, 8 of 12 sponsored slots were theirs, including the top four. The other four were red-light therapy products bidding on the word “light”. On four generic searches — decanter sets, whiskey-glass gifts, 50th-birthday gifts and mixing glasses — they held none of 48 sponsored slots. Their organic positions there ranged from #9 to #57. The #9 was “cocktail mixing glass”, the one generic search where a listing of theirs sits on the first rows.',
      },
      {
        type: 'prose',
        text:
          'A first read defaulted to Israel delivery. Amazon serves sponsored results by delivery address, so it was discarded and repeated for New York. A logged-out read cannot see Sponsored Brands or Display elsewhere on the page, and it cannot see spend off Amazon.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(LL_AD.monthlyUsd.central)} a month, ${linePct(LL_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 96 of 1,681 keywords their listings rank on — Jungle Scout share of voice; searches read from New York, 13 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. The Margin breakdown’s advertising line is still the earlier estimate until the margin is rebuilt with supplier quotes.',
          },
          {
            label: 'Others on their name',
            value: '4 of 12',
            counted: 'Sponsored slots on “lighten life” held by red-light therapy products',
            note: 'Bidding on the word “light”, not on the brand. No glassware competitor was buying the name.',
          },
          {
            label: 'Meta, TikTok and Google',
            value: 'Not checked',
            note: 'No ad library or paid-search history was read. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising lines, row for row, from LL_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...LL_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]),
          ['Total — the Whole brand line', monthUsd(Math.round((50975 * LL_AD.ratePct.central) / 100)), linePct(LL_AD.ratePct.central), lineUsd((20.39 * LL_AD.ratePct.central) / 100), `Modelled: ${monthUsd(LL_AD.monthlyUsd.low)}–${monthUsd(LL_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising, line for line: each product’s tab uses its own row, and the Whole brand tab the last. Per sale is the share of that product’s price, or of the $20.39 average sale. The total applies the modelled rate to the whole brand’s September revenue, $50,975, since the model reads only the three products.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'There is no brand site, no social account tied to the brand, and no traffic reading. Demand here is Amazon search.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The one chip is the Amazon brand store. A search for the brand turned up a template web store using the name, a Facebook page called “Lighten Life” and listings on other retailers. None of them was tied to the brand, and none was measured. The Amazon ranks below are the demand the record shows: the year-dated glasses sit near the top of their narrow categories.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Walmart',
            href: 'https://www.walmart.com/c/brand/lighten-life',
            value: 'Seller not read',
            flag: true,
            note: 'Search results show a LIGHTEN LIFE item on walmart.com. The page returned a CAPTCHA, so who sells it is unknown.',
          },
          {
            label: 'Bed Bath & Beyond and advancedmixology.com',
            value: 'Seller not read',
            note: 'Both appear in search results carrying LIGHTEN LIFE items. Neither was opened.',
          },
          {
            label: 'lifelightenup.com',
            href: 'https://lifelightenup.com/',
            value: 'Not the brand’s, as far as read',
            note: 'A WooCommerce template store using the name, which also sells Vitra, Alessi and Hay. Nothing ties it to this brand.',
          },
          {
            label: 'Facebook — “Lighten Life” (@ltuplife)',
            value: 'Unread',
            note: 'Found in search. Its content was not read, and it is not confirmed as the brand’s page.',
          },
        ],
      },
      {
        /* Keepa's rank on the listing, read 15 Sep 2026: the root category and
           the listing's narrowest category. Keyword positions are under
           Advertising, dated to one search. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Home & Kitchen', 'Narrowest category', 'Rating'],
        rows: [
          ['60th birthday beer glass', '#11,176', '#9 · Beer Glasses', '4.8★ over 2,168 reviews'],
          ['80th birthday whiskey glass', '#12,155', '#18 · Old Fashioned Glasses', '4.8★ over 3,679 reviews'],
          ['Cocktail mixing glass kit', '#22,607', '#35 · Bar Sets', '4.7★ over 234 reviews'],
          ['“Daddy’s Sippy Cup” whiskey glass', '#23,760', '#53 · Old Fashioned Glasses', '4.9★ over 799 reviews'],
          ['29oz whiskey decanter', '#38,573', '#20 · Liquor Decanters', '4.7★ over 511 reviews'],
          ['Decanter with four glasses', '#70,476', '#63 · Liquor Decanters', '4.7★ over 1,255 reviews'],
        ],
        note:
          'Read through Keepa on 15 September 2026. Rank moves daily. Variations share a parent listing, so each age of a birthday glass carries its family’s reviews and a near-identical rank.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        /* 🚨 Three companies, and NO row says or implies they are one. The
           trademark owner was read directly on TSDR at publish (2026-09-16);
           the seller rows are Keepa's records (2026-09-15). */
        type: 'facts',
        items: [
          { label: 'Trademark owner', value: 'Shenzhen Tangson Houseware Co., Ltd', note: 'Shenzhen, China · USPTO reg. 5813494, read 16 Sep 2026' },
          { label: 'Trademark', value: 'LIGHTEN LIFE', note: 'Registered 23 Jul 2019 · class 21 · live' },
          { label: 'Storefront seller', value: 'EVERHOME CRAFT INC', note: 'Home Gift Ever · Ontario, CA · merchant AGUGC2ZZUQ1D0' },
          { label: 'Seller before 2026', value: 'Mili World', note: 'Shanxi Mili Home Products Co., Ltd · Wenxi County, Shanxi' },
          { label: 'Seller feedback', value: '99–100%', note: 'Mili World 99% over 881 · EVERHOME 100% over 32', info: 'sellerFeedback' },
          { label: 'First listing', value: '5 Dec 2019' },
        ],
      },
      {
        type: 'table',
        caption: 'The seller accounts that have held the buy box',
        columns: ['Account', 'Legal name and address', 'Seller feedback', 'First tracked', 'Buy box'],
        rows: [
          [
            'Mili World · AO5CCMZMFKMI4',
            'ShanXi MiLi JiaJuYongPin YouXianZeRenGongSi, Tongcheng Town, Wenxi County, Shanxi, China',
            '99% over 881 ratings',
            '23 Nov 2021',
            'Every attributed month end from September 2023 to January 2026, handing over February to May 2026. Two listings when read',
          ],
          [
            'Home Gift Ever · AGUGC2ZZUQ1D0',
            'EVERHOME CRAFT INC, 2131 South Grove Avenue, Unit E, Ontario, California',
            '100% over 32 ratings',
            '26 Dec 2025',
            'From February 2026; every month end of June to August 2026; 70 of 72 priced listings when read',
          ],
          [
            'Perfect Drinkware · A1RI9VLL1PE5MB',
            'Shanxi Jingming Home Products Co., Ltd, Tongcheng Town, Wenxi County, Shanxi, China',
            '98% over 130 ratings',
            '—',
            'One listing, at month ends September 2023 to April 2024. Its own brand is “comome”',
          ],
        ],
        note:
          'Keepa’s seller records, read 15 September 2026. First-tracked dates are Keepa’s and trail an account’s real opening. The Chinese legal names are run-together pinyin on the records.',
      },
      {
        type: 'prose',
        text:
          'The brand has three companies around it, and nothing read connects them. The trademark, filed in January 2019 and still live, belongs to Shenzhen Tangson Houseware. The six years of listings sold through Mili World, a home-products company in a Shanxi county known for glassware. From February to June 2026, the buy box moved listing by listing to EVERHOME CRAFT INC in California, and Mili stepped back rather than competing. A job posting describes EVERHOME as a growing brand in Ontario, California, expanding into retail and wholesale. It does not name the brand.',
      },
      {
        /* 🚨 The relationship is an INFERENCE and must stay worded as one.
           Never tighten this into a sale, a licence or common ownership. The
           California filing was seen only through a search index and is kept
           out of the copy until read directly. */
        type: 'prose',
        text:
          'A clean handoff like this reads as one operation changing its US selling entity, but that is an inference, not a finding. Nothing read says whether the three companies share owners, or whether the change was a transfer, a licence, a new distributor or something else. Counting both seller accounts’ revenue as one brand’s rests on that inference, and so does everything priced on this page.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the seller records behind the brand’s Amazon listings, their buy-box history, and the USPTO trademark record.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model, a 2.6 base multiple moved by what the public record supports, applied to trailing-twelve profit. It prices the LIGHTEN LIFE brand on Amazon US as if one operation ran it throughout.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Walmart, Bed Bath & Beyond and any other retail are excluded because nobody read who sells there. The profit being multiplied carries September 2026’s cost rates into every month, on glass costs nobody has quoted, before storage, returns and breakage. On that basis it is an upper bound, and the decline since 2025 is in the trailing twelve but not in the multiple.',
      },
      {
        type: 'prose',
        text:
          'The positives are age and reputation: six years of listings, reviews in the thousands on the year-dated glasses, near-perfect seller feedback on both accounts, and an enrolled brand store. The negatives are the shape of the year and the reach of the business. December is over a quarter of the trailing twelve, every measured dollar is on Amazon US, and the product is a printed design on a stock glass that a rival can order.',
      },
      {
        type: 'prose',
        text:
          'The whole figure rests on one inference: that Mili World and EVERHOME CRAFT INC are one operation, so the months before the handoff are this business’s record. Nothing read establishes it. The trademark belongs to a third company, so the model does not score it. Sourcing, catalogue shape and differentiation level are questionnaire answers taken from the public record, and the feedback figure blends the two accounts. Brand Registry is firmer, because Amazon gates the brand store behind enrolment. All of these are the first things to put to the owner.',
      },
      /* The validation test, read off the published "to start" estimate
         (waithowmuch-research make-validation-launch.mjs --variants
         "whiskey-glass=dad;beer-glass=birthday;cocktail-set=mixing"), so the
         section and the headline figure are one record. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether each product sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },

  'ototo': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-ototo-headline.ts, from
       waithowmuch-research research/ototo/headline.json (reviewed 2026-09-17)
       — and the page reads them from the row alone.
       🚨 The snapshot is AUGUST 2026, the last whole month, not the live
       September read. Every "Read" stamp below is August's. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/ototo/1bb5d370da64f9afa76409f0484f62eb6b9e1e78932bcc543c0e21be76c68193.png',
      /* August's revenue leader, and it is 5.5% of the month. Not the Nessie
         ladle: that is the brand's best-known shape and its biggest review
         count, but Nessie listings were under 5% of August. */
      image: {
        src: ototoPhoto('B07VLBVQBP'),
        alt: 'A red silicone crab clipped to the rim of a steaming white stockpot, holding a steel ladle up in its claws — OTOTO’s Red the Crab spoon rest and steam releaser, its best-selling Amazon listing in August 2026',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand, their own
             designs, and the one origin statement read (a Gracula listing on
             Pinkoi) says designed in Israel and made in China. Nothing says
             they own a factory. */
          primaryMethod: 'private_label',
          /* Broad, and not close: 83 listings carried a badge in August 2026
             and the best seller was 5.5% of the month. */
          catalogStructure: 'broad',
          /* Level 3, conservatively. Each product is a character shape of
             their own — a Loch Ness ladle, a vampire garlic crusher — which is
             a real change of form, not a colourway. 🚨 The case for level 4
             (+0.25) is custom moulds and the "150 in-house design patents" the
             site claims, and the 2017–19 counterfeit suit shows the shapes get
             copied. Neither the moulds nor the patents were read, so tooling
             stays "no" until the owner shows them. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/OTOTO is gated behind
             enrolment. */
          brandRegistry: 'yes',
          /* `trademark` left out: no USPTO record was read. */
        },
        derived: {
          /* RULE 1: the catalogue's first listing. Keepa dates two OTOTO
             listings 2011-01-01, its earliest date, so this is "on or before".
             Every reading is past the model's top age band either way. */
          sellingSince: '2011-01-01',
          /* Top 20 listings (keepa/listings.json), with the Nessie family's
             shared 16,107 counted ONCE, not three times. A floor. */
          reviewTotal: 75252,
          /* Weighted by August 2026 revenue over the top 20: 4.64. */
          ratingWeighted: 4.64,
          sellerFeedbackPct: 100,
          /* channels left unset: the seller record shows FBA and nobody
             checked for FBM. The model scores only "both". */
          /* RULE 2. The Ototo account exists on Amazon Canada (366 ratings)
             but its Canadian listings were not read, so Amazon US is all of
             the MEASURED Amazon revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* December 2025 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 39.97,
          /* RULE 3: offAmazonSharePct unset. The own site, Target, Walmart,
             CVS, The Container Store, Faire and distributors abroad are real
             and unsized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. OTOTO on Amazon US only — its own site, Target, Walmart, CVS, The Container Store, wholesale and distributors abroad are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      { label: 'SKUs', value: '1,214', note: '175 in the storefront; 83 carried a sold badge in Aug 2026', info: 'skus' },
      /* August's best seller's breadcrumb. The catalogue spreads across
         Kitchen & Dining — garlic presses, shears, tea strainers, cutting
         boards. */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Dining & Entertaining › Flatware › Chopstick & Cutlery Rests › Spoon Rests',
        note: 'The best seller in Aug 2026, the crab spoon rest',
        info: 'category',
        wide: true,
      },
      /* 🚨 Top-listing figures, so NO `info` key — the shared ⓘ copy describes
         one hero listing. */
      { label: 'Product reviews', value: '75,252', note: 'Top 20 listings, the Nessie family’s shared count taken once' },
      { label: 'Product rating', value: '4.6★', note: 'Revenue-weighted, top 20 listings, Aug 2026' },
      { label: 'Seller feedback', value: '100%', note: 'Over 7,476 ratings · read 16 Sep 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own designs; made in China, by one listing', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Broad catalogue, long tail', note: 'The best seller was 5.5% of Aug 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      { label: 'Differentiation', value: 'Level 3', note: 'Character shapes of their own design', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, retail and wholesale', note: 'Only Amazon US is sized', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a number behind it. Every figure on this profile is the OTOTO brand on Amazon US, across all 1,214 listings and every account that held a buy box.',
      },
      /* Yes on the ratings, but unsized: the Canadian listings were never
         read for a badge. */
      'amazon-international': {
        status: 'yes',
        note:
          'The Ototo account is on Amazon Canada with 366 ratings, so it sells there. How much was not read. It has no account on Amazon UK or Germany. Someone else lists Gracula on amazon.co.uk, and that seller was not read.',
      },
      'own-store': {
        status: 'yes',
        note: 'ototodesign.com, on Shopify. It publishes no sales.',
      },
      'wholesale-out': {
        status: 'yes',
        flag: true,
        note:
          'Target has carried 16 OTOTO products in 1,600+ stores since December 2024, by the company’s release, which also names Walmart and CVS. The site adds The Container Store, wholesale through Faire and distributors in 30+ countries. None of it is sized, and together it may be larger than Amazon.',
      },
      // tiktok-shop, other-marketplace and licensing left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note:
          'The seller record shows FBA, and every badged listing carries an Amazon pick-and-pack fee: $4.35 on the crab spoon rest, $4.09 on Gracula, $5.22 on the Nessie ladle.',
      },
      fbm: {
        status: 'unchecked',
        note: 'Nothing read splits the listings between FBA and FBM.',
      },
      /* Unchecked, not yes: Amazon does sell a few OTOTO items, but whether it
         buys them from OTOTO or from a distributor was not read. */
      'vendor-1p': {
        status: 'unchecked',
        note:
          'Amazon itself offers 3 of the 227 OTOTO products on the seller record, and held $14,713 of the last twelve months’ buy boxes. Who supplies Amazon was not read.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand and their own designs, on listings the Ototo account holds almost alone. The one origin statement read, for Gracula, says designed in Israel and made in China.',
      },
      manufacturer: {
        status: 'unchecked',
        note: 'A design studio by its own account. Nothing read says who makes the products or whether OTOTO owns a factory.',
      },
      'wholesale-in': { status: 'no' },
      dropship: { status: 'no' },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/OTOTO, which Amazon gates behind enrolment.',
      },
    },

    intro:
      'OTOTO makes kitchen gadgets shaped like characters: a Loch Ness monster ladle, a vampire garlic crusher, bat-winged scissors. A Tel Aviv design studio started it in 2004. It now sits in the portfolio of Essor, and Amazon US is one of several places it sells.',

    blocks: [
      { type: 'heading', text: 'A monster in the soup pot' },
      /* Three paragraphs: the product, where it sells, and who is behind the
         account. No live headline figure is typed in. */
      {
        type: 'prose',
        text:
          'Every product is a joke you can cook with. Nessie the ladle stands up in the pot. Gracula crushes garlic when you twist his head. Red the Crab clips to the rim and holds the spoon. Around them are bat scissors and a bat wine opener, gnome dish brushes, cat tea infusers, a knight vegetable peeler and a vampire umbrella. Most sell for $10–35, and the range leans hard on Halloween and gifts. Ori Saidi and Daniel Gassner started OTOTO as a design studio in Tel Aviv in 2004. The name is Hebrew for “any minute now”.',
      },
      {
        type: 'prose',
        text:
          'Amazon US is one channel among several, and it is the only one measured here. OTOTO also sells on its own site, in Target stores, at Walmart, CVS and The Container Store, through Faire, and through distributors in more than 30 countries. None of those is sized. The figures on this page count all 1,214 Amazon listings carrying the brand, each once, and the brand’s own account held 96.6% of that revenue over the last twelve months.',
      },
      {
        type: 'prose',
        text:
          'That account is registered to Branded Acquico No 4, LLC, in New York, and OTOTO sits in the portfolio of Essor, the company formed when the Amazon aggregator BRANDED bought Heyday. When OTOTO joined the group, and on what terms, is not in anything read.',
      },
      /* No figures in the caption. The two best-known shapes, from the brand's
         own Amazon listings; bucket copies. */
      {
        type: 'images',
        items: [
          {
            src: ototoPhoto('B00SRGPELO'),
            alt: 'A turquoise ladle shaped like the Loch Ness monster, its long neck the handle and four little feet under the bowl, hanging from a yellow OTOTO “Nessie Ladle” card with a red gift bow',
          },
          {
            src: ototoPhoto('B076CTTZKX'),
            alt: 'A black and white vampire-shaped garlic crusher with fang-like teeth over a bowl of minced garlic, in front of its purple OTOTO “Gracula Garlic Crusher” box',
          },
        ],
        caption: 'Two of the brand’s own Amazon listing images: the Nessie ladle and the Gracula garlic crusher.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A Tel Aviv studio from 2004, a Loch Ness ladle on Amazon from 2015, a place in an aggregator’s portfolio by 2024, and a 2026 that sold far less than 2025.',
      },
      {
        /* Oldest first. The founding year is the company's own claim with no
           day attached; it stays on this list and off the chart. Month-end
           revenue events sit on the last day of the month so the dot lands on
           the chart's point. 🚨 No entry dates the move into BRANDED/Essor:
           that date was never found. */
        type: 'timeline',
        items: [
          {
            when: '2004',
            tag: 'Brand',
            what: 'Ori Saidi and Daniel Gassner start OTOTO in Tel Aviv',
            detail: 'A design studio, by the company’s own account. The two met in 1999 at the Ascola School of Art and Design.',
          },
          {
            when: '1 Jan 2011',
            tag: 'Amazon',
            what: 'The oldest OTOTO listings Keepa knows of',
            detail: 'A spice infuser shaped like a drumstick and a daisy steam releaser. The date is the earliest Keepa records, so the listings may be older.',
          },
          {
            when: '28 Apr 2015',
            tag: 'Amazon',
            what: 'The Original Nessie Ladle is listed',
            detail: 'The Nessie family now carries 16,107 reviews, shared across its listings, the most among the brand’s top listings.',
          },
          {
            when: '19 Feb 2016',
            tag: 'Amazon',
            what: 'The Nessie Family pack follows',
            detail: 'A tea infuser, a ladle and a colander in one box. It still sold in August 2026.',
          },
          {
            when: '14 Sep 2017',
            tag: 'Amazon',
            what: 'Keepa first tracks the Ototo seller account',
            detail: 'The account that holds almost all of the brand’s buy boxes today. A first-tracked date trails an account’s real opening.',
          },
          {
            when: '11 Oct 2017',
            tag: 'Amazon',
            what: 'Gracula, the vampire garlic crusher, is listed',
            detail: 'Now at 10,018 reviews.',
          },
          {
            when: '10 Sep 2018',
            tag: 'Amazon',
            what: 'Splatypus, the platypus jar spatula, is listed',
            detail: 'In September 2026 it was the one OTOTO listing with a sponsored slot on a generic search.',
          },
          {
            when: '14 Apr 2019',
            tag: 'Brand',
            what: 'An Israeli appeal court keeps OTOTO’s counterfeit suit against Amazon in Israel',
            detail: 'OTOTO Design Ltd and affiliated companies alleged that Amazon sold, and let third parties sell, fake OTOTO products.',
          },
          {
            when: '24 Jul 2019',
            tag: 'Amazon',
            what: 'Red the Crab, the spoon rest and steam releaser, is listed',
            detail: 'The best seller in August 2026. Its badge read 20,000 in December 2025.',
          },
          {
            when: '9 Feb 2021',
            tag: 'Brand',
            what: 'Target Global leads a $150M round for BRANDED',
            detail: 'TechCrunch called BRANDED an Amazon marketplace consolidator. It was founded in September 2020. Nothing read says when OTOTO joined it.',
          },
          {
            when: '31 Oct 2023',
            tag: 'Amazon',
            what: 'Three Chinese storefronts start taking the Splatypus buy box at month end',
            detail:
              'At $7.99–13.99, at the ends of October, November and December 2023. Month-end attribution gives them $192K, which almost certainly overstates what they sold. Nothing like it since 2024.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '$1,953,886 — the first December in the badge history',
            detail: 'Nearly twice November, and three and a half times October.',
          },
          {
            when: '5 Sep 2024',
            tag: 'Brand',
            what: 'BRANDED buys Heyday, and the combined company becomes Essor',
            detail: 'The announcement names OTOTO Design in Essor’s portfolio. CNBC had reported the planned merger on 26 August.',
          },
          {
            when: '19 Nov 2024',
            tag: 'Brand',
            what: 'OTOTO announces a nationwide Target launch',
            detail: '16 products at $10–15 in 1,600+ stores and on target.com from 1 December. The release names OTOTO as part of Essor’s portfolio.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '$2,222,990 — December',
            detail: 'Up 14% on December 2023.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '$2,377,294 — the best month in the series',
            detail: 'Two-fifths of the twelve months to August 2026 came in this one month.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: '$118,685 — the lowest month in the series',
            detail: 'January to August 2026 ran 45% below the same months of 2025.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: 'August ends with Gracula, Splatypus and Elizabat under $10',
            detail: 'All three were back at $14.95 when read on 16 September.',
          },
          {
            when: '16 Sep 2026',
            tag: 'Amazon',
            what: '175 listings in the storefront, 87 with a sold badge',
            detail: 'And the top four sponsored slots on a search for “ototo”.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The fourth quarter carries the year. October to December was 62% of the twelve months to August 2026, and December alone was 40%. The three Decembers on the chart were each bigger than the last, while the months between have shrunk. Roughly three dollars in ten of each month are kept after the goods, duty, freight, Amazon’s two fees and advertising. That share uses August 2026’s cost rates for every month, and unit costs nobody has quoted.',
      },
      {
        type: 'prose',
        text:
          'The series counts every Amazon listing carrying the brand, each once, at the price in effect at each month end, whichever account held the buy box. That makes August read low. Gracula, Splatypus and Elizabat all ended the month on sale at under $10. At the buy boxes of 16 September, August’s units come to $241,298.',
      },
      { type: 'chart' },
      {
        /* From the Ototo seller record on UK, DE and CA (2026-09-16). 🚨 The
           largest share is valuation derived.topMarketplaceSharePct —
           check-profile.mjs holds the two together. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of the measured revenue is Amazon US. The same account sells in Canada, where nothing was measured.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'The Ototo account has 366 ratings there. Its Canadian listings were not read, so this is unsized, not zero' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No Ototo account. Someone else lists Gracula on amazon.co.uk, not read' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Only the Ototo seller id was looked up on each marketplace.',
      },
      {
        /* Generated from the brand series — see the module's header. The rows
           sum to the 2026-08 revenue row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'No listing carries the month. The crab spoon rest, the bat scissors, Gracula and Splatypus lead, each around a twentieth, and 79 more listings sell 50 to 600 a month each. The Nessie listings, the brand’s best-known shape, were under 5%.',
        items: OTOTO_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge at the end of August 2026, a band — hence n+. Revenue is that band times the buy box then, so every row is a floor, and several rows were on sale. The other 1,131 brand listings carried no badge and count as zero. One row’s buy box was a reseller’s at the month end, and the row says so.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badge is a bucket (“1K+” counts as 1,000), and 37 listings sat at 1,000 or more in December 2025. And this is Amazon US alone. Target, Walmart, the brand’s own site and its distributors are not on the chart.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is one channel of several, and the only one with a number. On Amazon, one account sells almost everything.',
      },
      {
        type: 'prose',
        text:
          'On Amazon, the Ototo account held the buy box on 96.6% of the last twelve months’ revenue. Most of the rest was listings with a suppressed buy box. Amazon itself held $14,713 and two New Hampshire resellers under $8,000. Every badged listing is fulfilled by Amazon. Off Amazon, the company’s November 2024 release put 16 products in 1,600+ Target stores and named Walmart and CVS, and its site adds The Container Store, Faire and distributors in 30+ countries. The page knows those channels exist, but not what they sell.',
      },
      {
        type: 'prose',
        text:
          'What follows shows which methods are present, not what share each one has. A method nobody has looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'On a $15 gadget, Amazon’s fulfilment fee costs twice as much as making it. After that fee, the goods, duty, freight, the referral fee and advertising, a little over a third is left, and that is a ceiling.',
      },
      {
        type: 'prose',
        text:
          'Two lines are measured: Amazon’s 15% referral fee and its pick-and-pack fee, read per listing. The goods are the weak part, and for three products they are now quoted. Alibaba factories priced the Elizabat scissors, the Splatypus spatula and the Vino bat corkscrew to OTOTO’s own designs, so each has a tab below with its suppliers, freight, landed cost and margin. Together they were about an eighth of August. The other 84 listings still carry commodity list prices plus an assumed premium for moulds and boxes, and the Whole brand tab, last, is the brand at August’s mix. Each dollar of unit cost moves the twelve months’ profit by about $454,000 once duty is added.',
      },
      {
        /* 🚨 A catalogue brand (SKILL §2, "A catalogue brand: its best sellers,
           not 80%", owner's call 2026-10-12, built 2026-10-18): 87 storefront
           listings, so `heroes: 3` — Elizabat 4.73%, Splatypus 4.71%, Vino
           2.83% of August, largest share first (check-profile). The owner's
           three; the crab spoon rest ($11,655) and Gracula ($9,980) also sold
           more than the Splatypus in August. Tab ids are AD_SPEND's product
           ids, so the Ad spend rows and any "Test it first" links match.
           Per-unit figures are OT_COST (pnl.json products); the `all` tab is
           OT_BLEND = the seed's COST_LINES. */
        type: 'product-margins',
        period: '2026-08',
        heroes: 3,
        products: [
          {
            id: 'scissors',
            label: 'Elizabat kitchen scissors',
            sharePct: 4.73,
            blocks: [
              {
                /* waithowmuch-research research/ototo/suppliers.json, Accio run
                   accio/scissors/2026-10-17T2337, verified against its
                   screenshots. 🚨 ONE supplier priced (owner's call,
                   2026-10-18): Luban quoted its stock item 0487, flagged
                   different-unit and excluded from the price. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a pair of Elizabat scissors costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Yangjiang Yangdong Zhuopeng Industrial & Trade Co., Ltd.', 'Verified · 18 yrs', '4.7★ from 522 (store)', '—', '3,000 pieces', '$1.79–1.82'],
                  ['Average — the cost to make used below', '', '', '', '', lineUsd(OT_COST.scissors.make)],
                ],
                note:
                  'One supplier, and the cost to make rests on it alone, by the owner’s decision. Zhuopeng quoted the custom bat handle itself, black and grey, boxed without a logo, EXW: $1.82 from 3,000 and $1.79 from 5,000, the tier nearest the brand’s yearly sales of about 12,000. It refused 1,000 as too small, so its minimum is 3,000. Tooling, not in the unit price: a mould of about $2,800, not refundable as stated, though the supplier offered to find a way round it on an order. A second factory, Luban, quoted only its own stock scissors, a different design, and is not in the price; two more did not quote. Requested through Alibaba’s sourcing agent (Accio) and checked against its screenshots of the replies. Verified suppliers rated 4.5 or better.',
              },
              {
                /* Freightos CN-USWC low end, waithowmuch-research calibration/
                   freight-rates.json, read 2026-09-28; Keepa package for
                   B0C6MMDCT2 (keepa/brand-catalogue.json). */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one pair from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '24.4 × 12.1 × 2.0 cm, 0.15 kg', 'Keepa’s package for B0C6MMDCT2, the Elizabat listing'],
                  ['Volume', '0.00059 cbm', 'The package in cubic metres'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per pair', lineUsd(OT_COST.scissors.freight), '0.00059 cbm × $497'],
                ],
                note:
                  'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. Another of the brand’s products ships at its own figure.',
              },
              {
                /* Derived from the two tables above and the tariff line, so no
                   source logo. */
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per pair',
                noteColumns: [2],
                columns: ['Line', 'Per pair', 'From'],
                rows: [
                  ['Production', lineUsd(OT_COST.scissors.make), 'One Alibaba supplier’s quote — COGS table above'],
                  ['Tariff', lineUsd(OT_COST.scissors.tariff), 'Metal-implement duty, Section 301 and the China duty — the tariff line below'],
                  ['Shipping', lineUsd(OT_COST.scissors.freight), 'The package at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(OT_COST.scissors.landed), 'What one pair costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 27.7% of the $9.99 August price. Amazon’s fees on the sale are their own lines. The mould is not in it.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: OT_COST.scissors.price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: otPct('scissors', OT_COST.scissors.make),
                    amount: OT_COST.scissors.make,
                    detail: 'One Alibaba factory’s quote for the custom bat-handle scissors at 5,000 pieces, EXW. The roughly $2,800 mould is on top.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: otPct('scissors', OT_COST.scissors.tariff),
                    amount: OT_COST.scissors.tariff,
                    detail: 'Metal class, 38.7% of the cost to make: metal kitchen implements, 8205.51.30, at 3.7% plus 25% Section 301 (CBP N309532), plus the 10% China duty for a June import. The steel blades put the scissors in the metal class, as the type model already assumed; China origin is assumed.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: otPct('scissors', OT_COST.scissors.freight),
                    amount: OT_COST.scissors.freight,
                    detail: 'The listing’s own package at a read sea-freight rate from China, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: OT_COST.scissors.referral,
                    detail: 'Amazon’s Kitchen rate, 15%, read on the listing. Measured.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa product record for B0C6MMDCT2 (keepa/brand-catalogue.json,
                       read 2026-09-16): 244 × 121 × 20 mm, 150 g, pick-and-pack $4.09. */
                    label: 'FBA fulfilment',
                    pct: otPct('scissors', OT_COST.scissors.fba),
                    amount: OT_COST.scissors.fba,
                    emphasis: true,
                    detail: 'Size tier: Large Standard. The Elizabat box (B0C6MMDCT2) is 9.6 × 4.8 × 0.79 in at 5.3 oz: light enough for Small Standard, but 0.79 in deep against that tier’s 0.75 in limit. Amazon charges $4.09 to pick and pack it, more than twice the cost to make. Measured.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -otAd('scissors').ratePct.central,
                    amount: otAd('scissors').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(otAd('scissors').monthlyUsd.central)} a month on this listing’s keywords, ${linePct(otAd('scissors').ratePct.central)} of its August revenue (band ${otBand(otAd('scissors').monthlyUsd)}). A floor: it cannot see ads on product pages, automatic campaigns, Sponsored Brands or Display.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/ototo/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/ototo/advertising/' },
                    ],
                  },
                ],
                note: 'At August’s $9.99 sale price; the listing was $14.95 on 16 September. Before the mould, storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'spatula',
            label: 'Splatypus jar spatula',
            sharePct: 4.71,
            blocks: [
              {
                /* suppliers.json, Accio run accio/spatula/2026-10-17T2337,
                   verified against its screenshots. Both quotes carry the
                   printed retail box (a correction to Accio's spatula-only
                   figures), so they are like for like. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a Splatypus spatula costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Kangde Silicone Co., Ltd.', 'Verified · 17 yrs', '4.8★ from 11 (store)', '—', '500 pieces', '$2.07–2.37'],
                  ['Sheng Jie (Dongguan) Silicone Rubber Product Factory', 'Verified · 16 yrs', '4.9★ from 84 (store)', '—', '1,000 pieces', '$0.72–0.88'],
                  ['Average — the cost to make used below', '', '', '', '', lineUsd(OT_COST.spatula.make)],
                ],
                note:
                  'Two silicone factories quoted the two-colour platypus spatula, each with its printed retail box added so the two compare like for like. Kangde: about $1.89, $1.79, $1.69 and $1.59 at 500, 1,000, 3,000 and 5,000, plus a $0.48 box, and it says a precise price needs the 3D design file. Sheng Jie: $0.58, $0.53 and $0.50 at 1,000, 3,000 and 5,000, plus a $0.30, $0.26 and $0.22 box. Each at the tier nearest the brand’s yearly sales of about 12,000 — $2.07 and $0.72 — and averaged; the two are nearly three times apart. Tooling, not in the unit price: Sheng Jie’s mould is $2,424, refunded once orders reach $40,000 (about 80,000 pieces); Kangde’s is about $1,680, refunded only past 100,000 pieces and only if Kangde may sell the design to others. Production takes 20–26 working days at Kangde and 10–25 days at Sheng Jie, by quantity. Kangde’s store has 11 reviews, a thin record. Three more factories did not quote and two declined. EXW. Requested through Alibaba’s sourcing agent (Accio) and checked against its screenshots of the replies. Verified suppliers rated 4.5 or better.',
              },
              {
                /* Freightos CN-USWC low end, read 2026-09-28; Keepa package
                   for B07H7ZDBV4. */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one spatula from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '23.4 × 6.0 × 2.4 cm, 0.06 kg', 'Keepa’s package for B07H7ZDBV4, the Splatypus listing'],
                  ['Volume', '0.00034 cbm', 'The package in cubic metres'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per spatula', lineUsd(OT_COST.spatula.freight), '0.00034 cbm × $497'],
                ],
                note:
                  'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. Another of the brand’s products ships at its own figure.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per spatula',
                noteColumns: [2],
                columns: ['Line', 'Per spatula', 'From'],
                rows: [
                  ['Production', lineUsd(OT_COST.spatula.make), 'Two Alibaba suppliers’ quotes, averaged — COGS table above'],
                  ['Tariff', lineUsd(OT_COST.spatula.tariff), 'Plastic-kitchenware duty and the China duty — the tariff line below'],
                  ['Shipping', lineUsd(OT_COST.spatula.freight), 'The package at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(OT_COST.spatula.landed), 'What one spatula costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 17.7% of the $9.95 August price. Amazon’s fees on the sale are their own lines. The mould is not in it.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: OT_COST.spatula.price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: otPct('spatula', OT_COST.spatula.make),
                    amount: OT_COST.spatula.make,
                    detail: 'Two Alibaba factories’ quotes for the custom two-colour spatula with its retail box, at 5,000 pieces, averaged. A mould of $1,680–2,424 is on top.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: otPct('spatula', OT_COST.spatula.tariff),
                    amount: OT_COST.spatula.tariff,
                    detail: 'Plastic class, 13.4% of the cost to make: plastic and silicone kitchenware, 3924.10.40, at 3.4% with no Section 301 duty (CBP N331924), plus the 10% China duty for a June import. China origin is assumed.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: otPct('spatula', OT_COST.spatula.freight),
                    amount: OT_COST.spatula.freight,
                    detail: 'The listing’s own package at a read sea-freight rate from China, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: OT_COST.spatula.referral,
                    detail: 'Amazon’s Kitchen rate, 15%, read on the listing. Measured.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa product record for B07H7ZDBV4 (keepa/brand-catalogue.json,
                       read 2026-09-16): 234 × 60 × 24 mm, 59 g, pick-and-pack $3.86. */
                    label: 'FBA fulfilment',
                    pct: otPct('spatula', OT_COST.spatula.fba),
                    amount: OT_COST.spatula.fba,
                    emphasis: true,
                    detail: 'Size tier: Large Standard. The Splatypus box (B07H7ZDBV4) is 9.2 × 2.4 × 0.94 in at 2.1 oz: light enough for Small Standard, but 0.94 in deep against that tier’s 0.75 in limit. Amazon charges $3.86 to pick and pack it, nearly three times the cost to make. Measured.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -otAd('spatula').ratePct.central,
                    amount: otAd('spatula').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(otAd('spatula').monthlyUsd.central)} a month on this listing’s keywords, ${linePct(otAd('spatula').ratePct.central)} of its August revenue (band ${otBand(otAd('spatula').monthlyUsd)}), including the one generic slot the brand was seen buying, “jar spatula”. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/ototo/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/ototo/advertising/' },
                    ],
                  },
                ],
                note: 'At August’s $9.95 sale price; the listing was $14.95 on 16 September. Before the mould, storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'opener',
            label: 'Vino bat corkscrew',
            sharePct: 2.83,
            blocks: [
              {
                /* suppliers.json, Accio run accio/opener/2026-10-17T2337,
                   verified against its screenshots (BYF's prices on
                   reply-4c/4d.png). Both EXW with a box. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a Vino bat corkscrew costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Dongguan City Kingtop Metal Product Co., Ltd.', 'Verified · 14 yrs', '4.6★ from 38 (store)', '—', '1,000 pieces', '$5.26'],
                  ['Shenzhen BYF Precision Mould Co., Ltd.', 'Verified · 9 yrs', '4.8★ from 66 (store)', '—', '500 pieces', '$5.82–6.20'],
                  ['Average — the cost to make used below', '', '', '', '', lineUsd(OT_COST.opener.make)],
                ],
                note:
                  'Two die-casting factories quoted the bat-wing corkscrew, both from a mould they already have, so neither charges tooling. Kingtop: $5.26 with its packaging box ($5.12 without), the same price up to 5,000. BYF: $6.20, $6.00 and $5.82 at 1,000, 3,000 and 5,000 in a custom colour box, zinc alloy and silicone. Both EXW, and each at the tier nearest the brand’s yearly sales of about 5,000, averaged. It is more than twice the $2.20 the type model assumed for a metal gadget. Samples cost $50 and $10; production takes about 25 days at Kingtop and 18–25 working days at BYF. A third factory has not quoted and two declined. Requested through Alibaba’s sourcing agent (Accio) and checked against its screenshots of the replies. Verified suppliers rated 4.5 or better.',
              },
              {
                /* Freightos CN-USWC low end, read 2026-09-28; Keepa package
                   for B08J4GMWBR. */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one corkscrew from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '19.7 × 15.4 × 4.2 cm, 0.26 kg', 'Keepa’s package for B08J4GMWBR, the Vino listing'],
                  ['Volume', '0.00127 cbm', 'The package in cubic metres'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per corkscrew', lineUsd(OT_COST.opener.freight), '0.00127 cbm × $497'],
                ],
                note:
                  'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. It is the bulkiest of the three to ship.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per corkscrew',
                noteColumns: [2],
                columns: ['Line', 'Per corkscrew', 'From'],
                rows: [
                  ['Production', lineUsd(OT_COST.opener.make), 'Two Alibaba suppliers’ quotes, averaged — COGS table above'],
                  ['Tariff', lineUsd(OT_COST.opener.tariff), 'Metal-implement duty, Section 301 and the China duty — the tariff line below'],
                  ['Shipping', lineUsd(OT_COST.opener.freight), 'The package at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(OT_COST.opener.landed), 'What one corkscrew costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 41.7% of the $19.95 August price. Amazon’s fees on the sale are their own lines.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: OT_COST.opener.price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: otPct('opener', OT_COST.opener.make),
                    amount: OT_COST.opener.make,
                    detail: 'Two Alibaba factories’ quotes for the bat-wing corkscrew with a box, at 5,000 pieces, averaged. No tooling: both have the mould.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: otPct('opener', OT_COST.opener.tariff),
                    amount: OT_COST.opener.tariff,
                    detail: 'Metal class, 38.7% of the cost to make: metal kitchen implements, 8205.51.30, at 3.7% plus 25% Section 301 (CBP N309532), plus the 10% China duty for a June import. A zinc-alloy corkscrew sits in the metal class, as the type model assumed; China origin is assumed. On this product the tariff costs more than the freight and the advertising together.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: otPct('opener', OT_COST.opener.freight),
                    amount: OT_COST.opener.freight,
                    detail: 'The listing’s own package at a read sea-freight rate from China, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: OT_COST.opener.referral,
                    detail: 'Amazon’s Kitchen rate, 15%, read on the listing. Measured.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa product record for B08J4GMWBR (keepa/brand-catalogue.json,
                       read 2026-09-16): 197 × 154 × 42 mm, 260 g, pick-and-pack $4.35. */
                    label: 'FBA fulfilment',
                    pct: otPct('opener', OT_COST.opener.fba),
                    amount: OT_COST.opener.fba,
                    detail: 'Size tier: Large Standard. The Vino box (B08J4GMWBR) is 7.8 × 6.1 × 1.65 in at 9.2 oz, over twice Small Standard’s 0.75 in depth. Amazon charges $4.35 to pick and pack it. Measured.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -otAd('opener').ratePct.central,
                    amount: otAd('opener').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(otAd('opener').monthlyUsd.central)} a month on this listing’s keywords, ${linePct(otAd('opener').ratePct.central)} of its August revenue (band ${otBand(otAd('opener').monthlyUsd)}). A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/ototo/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/ototo/advertising/' },
                    ],
                  },
                ],
                note: 'At August’s $19.95 price. Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* The other 84 listings keep the dossier's type costs (pnl.json
                   lines.unitCost.types). Not a COGS table — no suppliers — so
                   it is not held to the supplier columns, and the heroes' own
                   tables are in their tabs. */
                type: 'table',
                id: 'type-costs',
                caption: 'Assumed cost to make, by product type — every listing but the three heroes',
                columns: ['Product type — what was read', 'Tier', 'Unit cost'],
                rows: [
                  ['Small silicone or plastic gadget — spoon rests, tea infusers, ladles and the rest. Made-in-China list prices: jar spatulas $0.30–1.10, nylon ladles $0.48–1.69, character tea infusers $1.35–2.00, spoon rests $0.19–2.94. Taken at $1.20 for a custom-moulded piece, plus a ~$0.40 printed box — the box a placeholder, not a quote', 'Derived, weak', '$1.60'],
                  ['Garlic press. Plastic $0.55, aluminium $1.33–1.75. Gracula is glass-fibre polypropylene, made in China by one listing; the ~$0.40 box is assumed', 'Derived, weak', '$1.80'],
                  ['Metal gadget — other scissors, openers, peelers. Kitchen scissors $0.22–0.95, corkscrews $0.16–1.03, steel gadgets $0.40–2.00, plus ~$1 for the character handle, tooling and box — a placeholder, not a quote. Quoted, the Vino corkscrew came to $5.54', 'Derived, weak', '$2.20'],
                  ['Three-piece bundle. Three small gadgets and a ~$0.20 shared box (assumed)', 'Derived, weak', '$5.00'],
                  ['Cutting board / oven mitts. Bamboo boards $1.80–4.85; custom-print cotton mitts $1.67–2.00 a piece, double mitts $7.22–8.66', 'Derived, weak', '$3.50 each'],
                  ['Tongs / larger moulded items / umbrella / bookmarks / unclassified — a placeholder, not a quote. No price read for any of them', 'ASSUMED', '$1.50 / $2.50 / $4.00 / $0.60 / $2.00'],
                ],
                note:
                  'List prices describe the category, not OTOTO’s supplier, and these are the company’s own shapes. The quotes for the three heroes landed below the type cost for the spatula and scissors and well above it for the corkscrew, so the error runs both ways. Freight for these listings is their package volume at the FBX01 container rate with assumed container fill, 15% carton overhead and $0.35 a unit for drayage and placement.',
              },
              {
                /* 🚨 The backend seed builds the profit and ad-spend series from
                   the SAME numbers (seed-ototo.ts COST_LINES): OT_BLEND + 15%
                   referral + OT_AD's rate = pnl.json blendedCostSharesPct.
                   63.478% off leaves 36.522% → August's $77,197, the title's
                   $77.2K. THREE decimals on purpose. Until 2026-10-18 the
                   heroes carried type costs: cogs 13.351, tariff 2.8, freight
                   3.462 → 36.634%. */
                type: 'margin',
                basis: { label: 'Average selling price', value: 14.94 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -OT_BLEND.cogs,
                    detail: 'About $2.02 of a $14.94 sale on August’s mix. The three heroes at their quoted cost to make — $1.79 for the Elizabat, $1.40 for the Splatypus, $5.54 for the Vino — and every other listing at its product type’s assumed cost, derived from commodity list prices and weak.',
                    links: [{ label: 'See the assumed costs above', href: '#type-costs' }],
                  },
                  {
                    label: 'Tariff',
                    pct: -OT_BLEND.tariff,
                    detail: 'About $0.43. By duty class: plastic and silicone kitchenware at 3.4% (the Splatypus among them); metal implements at 3.7% plus 25% Section 301 (the Elizabat and the Vino among them); textile, wood and umbrella rates assumed. Plus the 10% China duty in force two months before sale. China origin is read for Gracula only and assumed for the rest. Any IEEPA refund is left out.',
                  },
                  {
                    label: 'Freight and inbound',
                    pct: -OT_BLEND.freight,
                    detail: 'About $0.49. The three heroes at their own package and a Freightos sea-freight rate; the rest at the FBX01 container rate with fill, carton overhead and $0.35 a unit for drayage and placement assumed — a placeholder, not a quote.',
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    detail: 'Amazon’s Kitchen rate, and 15% on every OTOTO listing that sold. Measured.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -OT_BLEND.fba,
                    /* The largest line — the component labels the emphasised
                       line "Biggest line". Keepa product records
                       (keepa/brand-catalogue.json, read 2026-09-16). */
                    emphasis: true,
                    detail:
                      'Size tier: Large Standard. All three heroes pack light enough for Small Standard but too deep for its 0.75 in limit — the Splatypus at 9.2 × 2.4 × 0.94 in and 2.1 oz, the Elizabat at 0.79 in, the Vino at 1.65 in. About $4.20 on average. Amazon’s pick-and-pack fee, read per listing on 16 September 2026 and applied to every month: $3.01–6.31 across the listings that sold. August’s sale prices make it a bigger share than usual. Measured.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -OT_AD.ratePct.central,
                    amount: 0.1,
                    detail: `MODELLED, not observed: amazon-adspend-spy's Sponsored Products spend, about ${monthUsd(OT_AD.monthlyUsd.central)} a month on the three heroes, ${linePct(OT_AD.ratePct.central)} of their revenue, applied here to the whole brand. Automatic and product-targeting campaigns, Sponsored Brands and Display are invisible to it, so it is a floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/ototo/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/ototo/advertising/' },
                    ],
                  },
                ],
                note:
                  'August 2026’s rates, and every month on the chart carries them, although prices, tariffs, freight and the product mix all differed in earlier months. Storage, returns, coupons, social and influencer spend, the moulds, any founder earn-out and Essor’s overhead are not modelled, so this is a ceiling on profit rather than profit.',
              },
            ],
          },
        ],
      },
      {
        type: 'prose',
        text:
          'The quotes cut both ways. The spatula and the scissors cost less to make than the type model assumed, and the scissors’ margin nearly doubles, but on a $10 sale Amazon’s pick-and-pack fee is still the biggest cost. The corkscrew is the opposite: at more than twice the assumed cost, with a 38.7% duty on top, its landed cost is over two-fifths of its price and it keeps about a fifth. One set of rates also understates the rest of the year. August ended on sale prices, so Amazon’s fixed fee took a bigger share of each dollar than usual. The dossier’s month-by-month model uses each month’s own prices, duty and freight, and keeps 42% over the twelve months to August 2026, about $2.51M, where this chart’s August rates give about $2.17M.',
      },
      {
        type: 'callout',
        text:
          'The three quotes are for OTOTO’s own bat and platypus designs, from factories that would need, or already have, the moulds; the scissors rest on one factory, by the owner’s decision. The other 84 listings, nearly nine-tenths of August, are still commodity list prices standing in for a quote, and freight and several duty classes are placeholders beside them. Those are the numbers to replace next.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'There is no growth to report. After its best December, the brand sold 45% less on Amazon in January to August 2026 than a year earlier, and this read cannot say why.',
      },
      {
        type: 'prose',
        text:
          'The twelve months to August 2026 came to $5.95M, down 30.5% on the twelve before. January to August 2026 came to $1.89M, against $3.45M in 2025. August alone was down 55% on August 2025, and May 2026 was the lowest month in the series. The drop came straight after December 2025, the best month in three years of data.',
      },
      {
        type: 'prose',
        text:
          'It is spread across the line, not one product failing. From January to August, Gracula sold 59% less than a year earlier, Elizabat 57% less and the original Nessie ladle 63% less. The catalogue did not shrink: 69 to 95 listings carried a badge in each month of 2026, against 68 to 107 in 2025. New shapes keep arriving, such as a gnome whisk, chip clips and a skull oil cruet, but none has filled the gap.',
      },
      {
        type: 'prose',
        text:
          'Several explanations fit, and none is measured. Target has stocked the range since December 2024. Advertising may have been cut. Stock may have run short. China tariffs changed repeatedly through 2025 and 2026. Demand may simply have fallen. Part of July and August is price, since the biggest listings ended both months on sale.',
      },
      {
        type: 'callout',
        text:
          'The same seller account holds the listings from the first month of the series to the last, and nothing read dates OTOTO’s move into Essor’s portfolio. The decline cannot be set against the ownership, and this page does not.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-12, read at
           New York 10001, for the three best sellers (owner's call: a catalogue
           brand is shown through its heroes, not the 80% set). */
        type: 'strategy',
        label: OT_AD.strategy,
        points: [
          `About ${monthUsd(OT_AD.monthlyUsd.central)} a month of modelled Sponsored Products spend (${monthUsd(OT_AD.monthlyUsd.low)}–${monthUsd(OT_AD.monthlyUsd.high)}) on the three best sellers, ${linePct(OT_AD.ratePct.central)} of their August revenue. Jungle Scout saw their ads on 68 of the 1,849 searches those three listings show up on.`,
          'About 27% of it, $46 a month, is on their own name (“ototo halloween”, “ototo gracula garlic crusher”). The rest is long, specific phrases: “cute halloween stuff”, “goth kitchen accessories”, “spooky basket stuffers for men”.',
          'They buy none of the fifteen biggest generic searches they rank on (“kitchen gadgets”, “gothic decor”, “halloween kitchen”…). A New York read of all fifteen on 12 October found no OTOTO sponsored card; their cards turned up only on searches with their name in them.',
          'Modelled from outside the account, and for three of 87 listings, so a floor: automatic and product-targeting campaigns, Sponsored Brands, Display and Amazon’s DSP are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: OT_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the three best sellers (Splatypus, Elizabat, Vino): exact-match monthly searches and the best organic position any of them held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword, out of ${monthUsd(OT_AD.monthlyUsd.central)} in all. Read 12 October 2026.`,
      },
      adKeywordsTable(OT_AD_KEYWORDS, OT_AD_KEYWORDS_TOTAL, OT_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Organic rank does the work on gift searches, not ads. An earlier read on 16 September found them #5 on “halloween kitchen accessories” and #8 on both “cute kitchen gadgets” and “funny kitchen gifts” without paying, while on their own name they held 5 of 12 sponsored slots, the top four among them. Other kitchen and Halloween brands bought the other seven.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            href: 'https://www.amazon.com/s?k=ototo',
            value: `≈ ${monthUsd(OT_AD.monthlyUsd.central)} a month on the three best sellers, ${linePct(OT_AD.ratePct.central)} of their revenue — modelled`,
            counted: 'Ads on 68 of 1,849 keywords the three listings rank on — Jungle Scout share of voice; no OTOTO card on fifteen generic searches read from New York, 12 Oct 2026',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s suggested bid. It covers the three best sellers only; the other 84 listings are not modelled.',
          },
          {
            label: 'Others on their name',
            value: '7 of 12',
            counted: 'Sponsored slots on “ototo” held by other kitchen and Halloween brands, 16 Sep 2026',
            note: 'Competitors buy the brand’s name, which is why defending it is worth paying for.',
          },
          {
            label: 'TikTok, Instagram and influencers',
            value: 'Not measured',
            note: 'The company claims 500M+ social views. No ad library or creator spend was read. Absent here means unexamined, not zero.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising line, built from OT_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...(OT_AD.products.length > 1 ? OT_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${monthUsd(p.monthlyUsd.low)}–${monthUsd(p.monthlyUsd.high)}`]) : []),
          ['Total — the margin line', monthUsd(Math.round((211372 * OT_AD.ratePct.central) / 100)), linePct(OT_AD.ratePct.central), lineUsd((14.94 * OT_AD.ratePct.central) / 100), `Modelled: ${monthUsd(OT_AD.monthlyUsd.low)}–${monthUsd(OT_AD.monthlyUsd.high)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising. The total applies the modelled rate to the whole brand’s snapshot revenue, $211,372, since the model reads the three best sellers; per sale is that share of the $14.94 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'A brand site, four social accounts and a national retailer, and no reading on how much traffic any of them brings.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The chips are the Amazon brand store, ototodesign.com and the four social accounts the site links to. No follower count or visit figure was read, so the chips carry none. Off Amazon, the brand shows up in retail more than online: Target shelves since December 2024, and wholesale through Faire. On Amazon, several listings rank in the top few thousand of Kitchen & Dining.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Target',
            href: 'https://www.prnewswire.com/news-releases/ototo-announces-nationwide-launch-in-target-stores-302310010.html',
            value: '1,600+ stores',
            counted: '16 products at $10–15, in stores and on target.com from 1 Dec 2024 — the company’s release',
            flag: true,
            note: 'The largest channel that is not Amazon, as far as anything read shows. No sales figure was published.',
          },
          {
            label: 'ototodesign.com',
            href: 'https://ototodesign.com/',
            value: 'Shopify',
            note: 'The brand’s own store. Its contact address is the same New York suite as the Amazon seller’s. It claims 150 in-house design patents, which were not checked.',
          },
          {
            label: 'Walmart, CVS, The Container Store',
            value: 'Named, not sized',
            note: 'Named in the Target release and on the site. Nothing read shows how much sells there.',
          },
          {
            label: 'Faire and distributors abroad',
            value: '30+ countries',
            note: 'Wholesale through Faire, and distribution in more than 30 countries, by the company’s own account.',
          },
          {
            label: 'Instagram, TikTok, Facebook, Pinterest',
            value: 'Counts not read',
            note: 'Linked from ototodesign.com. The accounts were not opened.',
          },
        ],
      },
      {
        /* Keepa's main rank on the listing, read 16 Sep 2026 — Kitchen &
           Dining for most, Home & Kitchen for the tea infuser. Keyword
           positions are under Advertising, dated to one search. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        columns: ['Listing', 'Main sales rank', 'Rating'],
        rows: [
          ['Splatypus jar spatula', '#3,379 · Kitchen & Dining', '4.7★ over 5,142 reviews'],
          ['Elizabat bat scissors', '#4,805 · Kitchen & Dining', '4.9★ over 3,789 reviews'],
          ['Red the Crab spoon rest', '#6,356 · Kitchen & Dining', '4.5★ over 13,785 reviews'],
          ['The Original Nessie Ladle', '#8,528 · Kitchen & Dining', '4.6★ over 16,107 reviews'],
          ['Gracula garlic crusher', '#9,410 · Kitchen & Dining', '4.4★ over 10,018 reviews'],
          ['Gnome dish brush', '#14,637 · Kitchen & Dining', '4.8★ over 1,757 reviews'],
          ['Vino bat wine opener', '#16,289 · Kitchen & Dining', '4.6★ over 7,564 reviews'],
          ['Louie cat tea infuser', '#30,046 · Home & Kitchen', '4.6★ over 11,113 reviews'],
        ],
        note:
          'Read through Keepa on 16 September 2026. Rank moves daily. Variations share a parent listing, so some carry their family’s reviews.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        /* 🚨 "Sits in the portfolio of", never "was bought in <year>" or "was
           sold to": the acquisition date and terms were NOT found. The seller
           rows are Keepa's record (2026-09-16); the portfolio is Essor's
           2024 announcement. */
        type: 'facts',
        items: [
          { label: 'Brand', value: 'OTOTO', note: 'OTOTO Design, Tel Aviv · founded 2004, by its own account' },
          { label: 'Founders', value: 'Ori Saidi and Daniel Gassner', note: 'Gassner is quoted as co-founder in the Nov 2024 Target release' },
          { label: 'Storefront seller', value: 'Ototo', note: 'Merchant A1FWIW6RVM5XDB' },
          { label: 'Legal name', value: 'Branded Acquico No 4, LLC', note: '228 Park Ave S, STE 78816, New York, NY 10003' },
          { label: 'Portfolio', value: 'Essor', note: 'Formed when BRANDED bought Heyday · announced 5 Sep 2024' },
          { label: 'Joined the group', value: 'Not found', note: 'After BRANDED was founded in Sep 2020, and by Sep 2024' },
          { label: 'Seller feedback', value: '100%', note: 'Over 7,476 ratings', info: 'sellerFeedback' },
          { label: 'Seller account first seen', value: '14 Sep 2017', note: 'By Keepa — the account, not the brand' },
          { label: 'Oldest listing under the brand', value: '1 Jan 2011', note: 'Keepa’s earliest date, so possibly older' },
        ],
      },
      {
        /* The twelve months to the snapshot, by month-end buy-box holder,
           from brand-series.json byHolder. Sums to the TTM exactly. */
        type: 'table',
        caption: 'Who held the buy box, Sep 2025 – Aug 2026',
        columns: ['Holder at month end', 'Revenue', 'Share'],
        rows: [
          ['Ototo (Branded Acquico No 4, LLC)', '$5,746,830', '96.6%'],
          ['No buy box — suppressed or out of stock', '$177,870', '3.0%'],
          ['Amazon', '$14,713', '0.2%'],
          ['Penguin Gallery, a North Conway, NH gift shop', '$4,838', '0.1%'],
          ['Merchandise Squared, Hampton, NH', '$2,998', '0.1%'],
        ],
        note:
          'Attributed at each month end, so a reseller holding the buy box on that day takes the whole month’s badge for that listing. Keepa’s seller records, read 16 September 2026.',
      },
      {
        type: 'prose',
        text:
          'OTOTO began as a studio. Ori Saidi and Daniel Gassner met at the Ascola School of Art and Design in Tel Aviv in 1999, and founded the company in 2004. In 2017–19 the company took Amazon to court in Israel over counterfeit OTOTO products. Gassner was still quoted as co-founder in the November 2024 Target announcement. Whether either founder runs the business now was not read.',
      },
      {
        /* 🚨 Keep this as worded. "Registered to a BRANDED company" rests on
           the LLC's name and the shared address; no filing was read. Never
           add a date, a price, or a link between the ownership and the
           decline. */
        type: 'prose',
        text:
          'The Amazon account is registered to Branded Acquico No 4, LLC, at a New York suite that ototodesign.com now gives as its own address. By its name and address it is a BRANDED company, though no company filing was read. BRANDED, which TechCrunch called an Amazon marketplace consolidator, bought Heyday in 2024, and the combined company became Essor. Its announcement names OTOTO Design in the portfolio, beside brands such as Boka, ZitSticka and Puracy. When OTOTO joined, and on what terms, was not found. Keepa keeps no history of the account’s name, so the series cannot show a before and after.',
      },
      {
        type: 'prose',
        text:
          'These details are resolved from the seller record behind the brand’s Amazon storefront, its buy-box history, the company’s own site and releases, and press coverage of BRANDED and Essor.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model: a 2.6 base multiple moved by what the public record supports, applied to trailing-twelve profit. It prices OTOTO’s Amazon US business alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'The own site, Target, Walmart, CVS, wholesale and distributors abroad are excluded, because none of them is sized. The profit being multiplied carries August 2026’s cost rates into every month, on unit costs nobody has quoted, before storage, returns and overhead. The 30.5% fall in the trailing twelve is in the profit, but not in the multiple.',
      },
      {
        type: 'prose',
        text:
          'The positives are age and reputation: listings going back to at least 2011, tens of thousands of reviews, perfect seller feedback and an enrolled brand store. The negatives are the shape of the year and the reach of what is measured. December 2025 was two-fifths of the trailing twelve, and every measured dollar is on Amazon US. Neither multiple adjustment captures the 2026 decline, and a buyer would price that first.',
      },
      {
        type: 'prose',
        text:
          'Sourcing, catalogue shape and differentiation level are questionnaire answers taken from the public record, and they are inferences. Differentiation is scored at level 3, character shapes of their own design. The moulds and the 150 design patents the site claims would make it level 4, and nobody has seen them. Brand Registry is firmer, because Amazon gates the brand store behind enrolment. The trademark was not read, so the model does not score it. All of these are the first things to put to the owner, along with what the Amazon business is worth inside Essor.',
      },
    ],
  },
  'highmark-collective': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-highmark-collective-headline.ts,
       from waithowmuch-research research/highmark-collective/headline.json —
       and the page reads them from the row alone.
       🚨 The snapshot is SEPTEMBER 2026, the last whole month. October's badge
       read is a live mid-month reading and is deliberately not in the series;
       it is quoted as a dated reading in Revenue. Every "Read" stamp below is
       September's. */
    headline: {
      /* September's revenue leader and the object the title is about: the
         $36.99 praying-lamb baptism set, 400 units of a 1,800-unit month. */
      image: {
        src: highmarkPhoto('B0GHZSS4VV'),
        alt: 'A white praying lamb plush sitting on a folded muslin blanket beside a hardback board book, a wish card and a white gift box — the best-selling Highmark Collective baptism keepsake set on Amazon',
      },
    },

    /* 🚨 NO `valuation` KEY, and no Valuation section. The model prices
       trailing-twelve net profit and there are six full profit months. Keepa's
       badge history for these ASINs begins 2026-04-21, so the series cannot be
       lengthened and this is not a pull to redo. Do not add a stated multiple
       instead: a multiple on half a year of a Christian gifting brand that has
       never traded a Christmas or an Easter would be a guess dressed as a
       figure. seed-highmark-collective-headline.ts stamps `valuation: null`. */

    facts: [
      { label: 'SKUs', value: '8', note: 'Four products; seven of the eight carried a sold badge at the read', info: 'skus' },
      /* The best seller's own breadcrumb. 🚨 The four products sit in FOUR
         different category trees — Christening, Decorative Jars, Spiral
         Notebooks and Glassware & Drinkware — which is why the referral rate
         was checked on each rather than assumed from one. */
      {
        label: 'Category',
        value: 'Baby Products › Gifts › Keepsakes › Christening',
        note: 'The best-selling baptism set. The four products sit in four different category trees',
        info: 'category',
        wide: true,
      },
      /* 🚨 Catalogue-wide figures, so NO `info` key — the shared ⓘ copy
         describes one hero listing. The three journal ASINs report 77 reviews
         each because Amazon pools a variation family's count; they are counted
         ONCE here. Their badges differ, so units are summed and reviews are not. */
      { label: 'Product reviews', value: '376', note: 'All eight listings — the three journals share one pooled count of 77' },
      { label: 'Product rating', value: '4.7★', note: 'Review-weighted across the catalogue' },
      { label: 'Seller feedback', value: '100%', note: 'Over 24 lifetime ratings · read 4 Oct 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Commodity components assembled into their own kit — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'The baptism line is 65% of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 2, not 3: the kit is assembled from commodity OEM parts any
         factory lists, and what is theirs is the selection, the packaging and
         a named prayer book — visible, but not functional. An inference. */
      { label: 'Differentiation', value: 'Level 2', note: 'Cosmetic variation — their own kit and packaging on commodity parts, an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own Shopify store, Etsy', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'Every figure on this profile is the eight Highmark Collective listings on Amazon US. The seller is the only offer on all eight and holds 100% of the buy box, so nothing had to be split with anybody.',
      },
      /* 'no' rather than 'unchecked': the SELLER ID was looked up on each
         domain, which is the only check that answers this. */
      'amazon-international': {
        status: 'no',
        note: 'The seller account A2EDGVBEHEN117 was looked up by id on Amazon UK, Germany and Canada. It does not exist on any of them.',
      },
      'own-store': {
        status: 'yes',
        flag: true,
        note:
          'A Shopify store at highmarkcollective.com, live since 1 May 2026, with six products on it. It prices every one of the four comparable products ABOVE its own Amazon listing — by 2.7% on the baptism set and 25% on the gift bundle — and its free-shipping floor is higher than any single item costs.',
      },
      'other-marketplace': {
        status: 'yes',
        note:
          'An Etsy shop, HighmarkCollective, opened in 2026 with about 70 lifetime sales and 12 reviews. Etsy served 403 to every direct fetch, so those counts come from a search index’s rendering of the shop page rather than a page anybody loaded.',
      },
      'tiktok-shop': {
        status: 'no',
        note: 'No TikTok Shop listing found and no TikTok account at the obvious handle — though a TikTok pixel is installed on the Shopify store.',
      },
      'wholesale-out': {
        status: 'no',
        note:
          'There is a wholesale application page with a $300 opening minimum, and no wholesale presence behind it: no Faire brand page, no Abound, no Tundra, no retailer found carrying the brand. The page is an intention.',
      },

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'All eight listings are FBA, with Amazon pick-and-pack fees of $5.61 to $7.46 each.',
      },
      fbm: {
        status: 'no',
        note: 'There is no merchant-fulfilled offer anywhere in the catalogue: every one of the eight is FBA, and the seller is the only offer on each.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the eight listings.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand on listings nobody else sells, assembled from components any Chinese factory lists at minimums of 50 to 500.',
      },
      /* 🚨 Unchecked, not no. The decisive test — whether their product
         photographs appear on another seller's listing — needs a reverse image
         search the research had no route to run. Temu, Shein, Walmart, eBay
         and TikTok Shop were searched for the same kit and it was not found. */
      'white-label': {
        status: 'unchecked',
        note:
          'The components are commodity OEM items, and the assembled kit — with a named prayer book in it — was not found under any other brand. The decisive test, a reverse image search on their listing photographs, was not run.',
      },
      manufacturer: {
        status: 'no',
        note:
          'Three of the eight listings name Yiwu Jiacheng Arts & Crafts Co.,Ltd as the manufacturer of record and a fourth names “Christian Gifts Collection”. They buy what they sell; they do not make it.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/HighmarkCollective, which Amazon gates behind Brand Registry enrolment.',
      },
      'subscribe-save': {
        status: 'yes',
        note: 'A 5% Subscribe & Save discount appeared on two of the three journal listings on 28 August 2026 and was live at the read.',
      },
      // amazon-handmade, amazon-custom and b2b left unchecked: nobody looked.
    },

    intro:
      'Highmark Collective is a Florida company selling Christian and baptism gift sets on Amazon US — a keepsake box built around a praying lamb, a jar of scripture cards, a three-pack of Bible-study journals and a faith gift bundle. It is six months old, and it is the only seller on every listing it has.',

    blocks: [
      { type: 'heading', text: 'Four products, eight listings, one seller' },
      {
        type: 'prose',
        text:
          'The catalogue is eight ASINs and four products. A baptism keepsake set — a 10-inch praying lamb, a muslin blanket, a board book, a wish card and a gift box — runs on three listings, one for boys, one for girls and one for either. A glass jar of 200 scripture cards runs on one. A set of three hardcover Bible-study journals runs on three listings that share a parent. A faith gift bundle of a mug, journal, pen, bracelet, knitted doll and cards runs on the last one.',
      },
      {
        type: 'prose',
        text:
          'What is unusual is how little there is to disentangle. One seller account, one brand, no resellers, no hijackers and no second entity: every listing shows a single offer and the seller holds the buy box outright, so every gap in the history is a suppression or a stockout rather than somebody else selling. The catalogue is closed at eight, which four separate Keepa queries agree on — the brand string, two different manufacturer strings and the storefront’s own list all return the same set.',
      },
      {
        type: 'prose',
        text:
          'The counting trap is in the variations. Two of the four products are three listings each, and reading either one off its lead listing alone shows roughly a third of what it sells. The baptism line is the business, and two thirds of it sits on listings an owner reading his own best seller would not be looking at.',
      },
      /* No figures in the caption. The baptism set is what the business runs
         on; the jar is the cheapest line and the one the UGC shot is of.
         Bucket copies of the brand's own listing images. */
      {
        type: 'images',
        items: [
          {
            src: highmarkPhoto('B0GHZRX7RP'),
            alt: 'A pink-themed baptism keepsake set laid out: a white praying lamb plush, a folded pink muslin blanket, a board book titled The Little Lamb’s First Prayer Book, a wish card and a gift box',
          },
          {
            src: highmarkPhoto('B0GHZMGNTQ'),
            alt: 'A frosted glass jar with a bamboo lid filled with folded scripture cards, beside a small wooden cross, a wooden card stand and a printed gift box',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the baptism keepsake set the catalogue runs on, and the scripture-card jar that followed it in May.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A Delaware company registered in August 2025, eight Amazon listings published in the spring of 2026, and a first sold badge in April. Everything measurable about this business happened inside thirteen months.',
      },
      {
        /* Oldest first, strictly. Every date is a reading: Delaware ICIS, RDAP,
           USPTO TSDR, Keepa listedSince and monthlySoldHistory, Shopify's own
           server-written product dates, and the Google Ads Transparency
           Center's SearchCreatives payload. */
        type: 'timeline',
        items: [
          {
            when: '1 Aug 2025',
            tag: 'Brand',
            what: 'HIGHMARK COLLECTIVE CORP. is incorporated in Delaware',
            detail:
              'File number 10281379, a domestic general corporation, with a registered agent in Dover. Nothing about the brand — no entity, no domain, no filing, no account — exists anywhere before this date.',
          },
          {
            when: '21 Oct 2025',
            tag: 'Web',
            what: 'highmarkcollective.com is registered',
            detail: 'A one-year registration on Google Domains nameservers, registrant redacted. The store itself does not go live for another six months.',
          },
          {
            when: '29 Dec 2025',
            tag: 'Brand',
            what: 'A trademark application is filed on an intent-to-use basis',
            detail:
              'Serial 99569246, for paper notebooks and blank journals only — nothing covering baptism keepsakes, prayer cards or gift sets. Filed through a low-cost self-serve service with no attorney of record, and claiming no first-use date.',
          },
          {
            when: '24 Mar 2026',
            tag: 'Amazon',
            what: 'The first listings Amazon publishes a date for',
            detail:
              'The three baptism ASINs carry listedSince 24 March 2026. Amazon publishes no first-listed date for the other five; Keepa first saw them on 13 and 23 March. The seller account itself was first tracked on 26 March.',
          },
          {
            when: '21 Apr 2026',
            tag: 'Amazon',
            what: 'The first sold badge anywhere in the catalogue',
            detail:
              'Amazon prints “bought in past month” from roughly 50 sales a month. This is the oldest reading that exists for any of these listings, which is why the chart starts in April and why April is a partial month.',
          },
          {
            when: '24 Apr 2026',
            tag: 'Web',
            what: 'All six Shopify products are created',
            detail: 'Shopify writes these timestamps server-side and a merchant cannot backdate them.',
          },
          {
            when: '29 Apr 2026',
            tag: 'Brand',
            what: 'The USPTO issues a non-final office action on the trademark',
            detail: 'Nobody answers it.',
          },
          {
            when: '1 May 2026',
            tag: 'Web',
            what: 'The brand’s own store goes live',
            detail: 'Five of the six products are published. The sixth, the scripture-card jar, follows at the end of the month.',
          },
          {
            when: '18 May 2026',
            tag: 'Amazon',
            what: 'The Bible Verse Jar lists — the last of the eight',
            detail:
              'It opens at $29.99 and settles at $19.99 within three days, where it has stayed. Its badge appears on 11 June.',
          },
          {
            when: '5 Jun 2026',
            tag: 'Amazon',
            what: 'The faith gift bundle is cut from $34.99 to $27.99',
            detail: 'The deepest price cut in the catalogue, and the only one that did not work.',
          },
          {
            when: '29 Jun 2026',
            tag: 'Advertising',
            what: 'The first Google Search text ads run',
            detail:
              'Three text creatives, for seventeen days to 15 July. Dates from the Transparency Center’s own payload, not the rendered page, which prints only “last shown”.',
          },
          {
            when: '14 Jul 2026',
            tag: 'Web',
            what: 'A blog programme starts on the brand’s site',
            detail: 'Twelve keyword-shaped gift-guide and Bible-verse posts in six weeks.',
          },
          {
            when: '30 Jul 2026',
            tag: 'Brand',
            what: 'The trademark application is abandoned',
            detail:
              'For failure to respond to the office action. The brand holds no registered trademark, and the one class it applied in was notebooks.',
          },
          {
            when: '7 Aug 2026',
            tag: 'Amazon',
            what: 'The baptism set is raised from $34.99 to $36.99',
            detail:
              'On both of the listings that sell at that price. It is the highest either has ever carried, so today’s price is a rise and not a discount — whatever the $56.99 strikethrough beside it suggests.',
          },
          {
            when: '28 Aug 2026',
            tag: 'Amazon',
            what: 'A 5% Subscribe & Save discount appears on two journal listings',
            detail: 'Still live at the read.',
          },
          {
            when: '28 Aug 2026',
            tag: 'Web',
            what: 'The last blog post. Content stops',
            detail: 'Twelve posts in six weeks, then nothing for five.',
          },
          {
            when: '31 Aug 2026',
            tag: 'Amazon',
            what: '$64,879 — the best month on record',
            detail: '2,150 units, and the first month the baptism line ran twelve hundred.',
          },
          {
            when: '28 Sep 2026',
            tag: 'Amazon',
            what: 'The faith gift bundle loses its badge',
            detail:
              'Amazon stops printing a count, which means under roughly fifty a month — not none. Its sponsored placements stay where they are.',
          },
          {
            when: '3 Oct 2026',
            tag: 'Advertising',
            what: 'One Google text ad is still running',
            detail: 'Eighty-three days on one creative. Four text ads in total is the whole of their Google account.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Six months of history and no more. Revenue here is Amazon’s own “bought in past month” badge on each of the eight listings at each month end, priced at the buy box in effect at that moment — not today’s price, because three of the four products have moved since April. The seller is the sole offer on every listing and holds the buy box outright, so there is no attribution to split and no reseller to subtract. Just over a quarter of each month is left after the goods, Amazon’s two fees and modelled advertising.',
      },
      {
        type: 'prose',
        text:
          '🚨 Two months on the chart need their caveats said out loud. April is partial coverage: the oldest badge reading anywhere in this catalogue is 21 April 2026, so three weeks of that month have no reading behind them at all and the figure is the month-end badge stretched over a month the badge did not cover. And the series stops at September because October was not finished when this was read — a live badge read on 4 October put the catalogue at 1,650 units and about $46,700 a month, a tenth below September, with the faith gift bundle at zero. That is a reading taken mid-month, not a closed month, so it is not a point on the chart.',
      },
      {
        type: 'prose',
        text:
          'The badge is also a bracket rather than a count. Amazon prints 50+, 100+, 200+ and so on, so every month here is a floor, and on a catalogue of eight one listing crossing a bracket at midnight on the 31st moves the whole month. Reading the same history as a time-weighted daily mean instead of a month-end point disagrees by as much as 46% in a single month and agrees on the shape; the month-end read is the one used throughout, and September comes out lower on it than on the other.',
      },
      { type: 'chart' },
      {
        /* The seller id was looked up on each domain (SKILL §6), never the
           brand string. 🚨 No valuation on this profile, so no
           topMarketplaceSharePct to hold this against — the ring is the whole
           statement. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'All of it is Amazon US. The seller account does not exist anywhere else.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon UK, Germany and Canada', short: 'UK, DE, CA', share: 0, note: 'The seller id was looked up on each domain and returns no account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue, from Amazon’s sold badges. Asked by seller id on every marketplace, not by brand name.',
      },
      {
        /* Generated from the Keepa pull — see the module's header. All EIGHT
           listings, no tail, and they sum to the 2026-09 revenue row, which
           check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'The baptism keepsake set, across its three listings, is about two thirds of the month. The listing at the bottom is the one to look at twice: it sold nothing Amazon would count, and on 4 October it still held sponsored slots on its own category searches.',
        items: HIGHMARK_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band — hence n+. Revenue is that band times the buy-box price in effect at the September month end, so every row is a floor. The three journal listings share one pooled review count but their badges are genuinely separate, so units are summed. The faith gift bundle shows zero because Amazon stopped printing a count for it around 28 September; under the badge floor it could still be selling up to about fifty a month.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badge under-reports by rounding down to a bracket, and the profit above it deducts no storage, returns, removals, inbound placement or low-inventory fees, no software, no photography and no owner’s pay. Margin breakdown says which cost lines are measured and which are not.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'There are three channels and only one of them takes money at any scale. The other two are not priced to compete with it.',
      },
      {
        type: 'prose',
        text:
          'Their own Shopify store sells the same four products for more than Amazon does — 2.7% more on the baptism set, 10% on the jar, 20% on the journals and 25% on the gift bundle — before Prime shipping, and with a free-shipping floor no single item reaches. A shopper comparing the two has no reason to buy direct. The Etsy shop has about seventy lifetime sales. The wholesale page is an application form with a $300 minimum and nothing found behind it.',
      },
      {
        type: 'prose',
        text:
          'On Amazon the arrangement is as plain as it gets: eight listings, all FBA, one offer each, one seller holding the buy box on all of them. There is no second account, no merchant-fulfilled line and no 1P relationship. What follows is presence rather than share — nobody publishes what a Shopify store or an Etsy shop takes — and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'A little over a quarter of each dollar survives the kit, the box, the boat and Amazon — and on the cheapest product in the catalogue it is closer to a sixth.',
      },
      {
        type: 'prose',
        text:
          'Two of these lines are measured and the rest are built. Amazon’s referral rate is 15% on all four products — checked on each, because they sit in four different category trees and one of them contains a bracelet, so a 20% jewellery rate was a live possibility — and the fulfilment fee is Amazon’s own pick-and-pack figure per listing. Everything under cost of goods is assembled: component prices the owner supplied from his own Alibaba quotes, a flat 20% tariff standing in for an HTS classification nobody has made, a dated ocean-freight reading, and two lines — kitting and prep — that nobody has quoted at all.',
      },
      {
        type: 'prose',
        text:
          'Two products get their own breakdown below because they do not share a cost structure worth averaging. In September the baptism keepsake set was 65% of revenue and the scripture-card jar 19%; the set alone falls short of the four-fifths of the month a blended figure needs to describe, so both are here, with the whole brand at September’s mix last. The journals and the gift bundle are not broken out — together they were under a sixth of the month — but their costs are in the blended tab.',
      },
      {
        /* 🚨 One breakdown per main product. Baptism and the jar are 65.1% and
           19.4% of September's revenue — the two together are the first to
           reach 80% (SKILL §2, "Products"). Per-unit figures are pnl.json's
           lines to three decimals; the `all` tab is the whole brand at
           September's mix and is the margin the backend's profit series is
           built from (seed-highmark-collective.ts COST_LINES). Only the chosen
           tab renders, so each can carry its own #cogs-breakdown,
           #shipping-breakdown and #landed-cost. */
        type: 'product-margins',
        period: '2026-09',
        products: [
          {
            id: 'baptism',
            label: 'Baptism keepsake set',
            sharePct: 65.1,
            blocks: [
              {
                /* 🚨 NOT the standard Alibaba supplier table, and deliberately
                   so: Alibaba served a captcha to everything but one search,
                   and these component prices are the OWNER'S OWN quotes rather
                   than listings anybody can go and read. A supplier table with
                   track records and sold counts would be inventing a provenance
                   this does not have. Published Made-in-China.com list prices
                   were the fallback for the two lines the owner did not quote,
                   and the Basis column says which is which. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'Bill of materials — what a baptism keepsake set costs to make',
                noteColumns: [2],
                columns: ['Component', 'Per set', 'Basis'],
                rows: [
                  ['10in praying lamb plush', '$1.59', 'The owner’s own quote — £1.20, converted at 1.32248 on 4 Oct 2026'],
                  ['Printed cotton muslin blanket', '$2.54', 'The owner’s own quote — £1.92. He also corrected the spec: the blanket is blank, not printed'],
                  ['Full-colour board book', '$1.31', 'The owner’s own tiered quote. The 2,000–9,999 tier, because the line runs about 900 sets a month'],
                  ['Printed wish card', '$0.28', 'One published supplier list price (Tianjin Caile Printing) — not a quote to this seller'],
                  ['Printed rigid gift box', '$0.05', 'The owner’s own figure. He calls the packaging negligible'],
                  ['Kitting and assembly', '$0.60', 'ASSUMED. A five-piece kit has to be packed by somebody and nobody quoted it'],
                  ['Components and kitting — the cost to make used below', '$6.36', ''],
                ],
                note:
                  'Component prices are the owner’s own Alibaba quotes, supplied 4 October 2026 — his reading of his own supplier prices, not a quote given to us and not an invoice. They replaced published Made-in-China.com list prices the research opened with, which survive on the wish card alone. Tariff and freight are not components; they are the two rows under this table.',
              },
              {
                /* The move half of cost of goods, priced from this product's
                   own carton against a dated rate rather than a placeholder. */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one baptism set from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '28.0 × 21.1 × 14.0 cm, 0.889 kg', 'The lead listing’s own package size (B0GJ133W12)'],
                  ['Volume', '0.00827 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$496.67 / cbm', 'Less-than-container-load, Shanghai → Los Angeles, door to door'],
                  ['Shipping, per set', '$4.11', '0.00827 cbm × $496.67'],
                ],
                note:
                  'The rate is the low end of the quoted band, read 28 September 2026; the top of that band prices express services. It is door to door — customs clearance and inland delivery included, duty and tariffs excluded — which is why it overlaps the inbound half of the prep line below, and why the landed cost under it is a ceiling. The other three products ship in different boxes and carry different figures.',
              },
              {
                /* Neither a component quote nor a freight quote: the sum, and
                   the figure the cost-of-goods line actually uses. Its own
                   table because burying it in the shipping one would read as a
                   shipping number. Five rows rather than three — this product
                   carries a tariff and a prep line that White Mountain's
                   three-row version did not. */
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — what one baptism set costs in Amazon’s warehouse',
                noteColumns: [2],
                columns: ['Line', 'Per set', 'From'],
                rows: [
                  ['Components and kitting', '$6.36', 'The bill of materials above'],
                  ['Tariff', '$1.27', '20% of the cost to make — Section 301 List 4A plus the reciprocal rate on China, applied flat'],
                  ['Ocean freight', '$4.11', 'This set’s carton at $496.67/cbm — the shipping table above'],
                  ['Prep and inbound', '$0.70', 'ASSUMED: drayage, 3PL prep, labelling and Amazon inbound placement. Nobody quoted it'],
                  ['Landed cost', '$12.44', 'What one set costs before it sells'],
                ],
                note:
                  'This is the figure the cost-of-goods line below uses: $12.44 is 33.4% of the $37.21 average sale across the three baptism listings. 🚨 It is a CEILING, by about the inbound half of the prep line — the freight above is quoted door to door and already includes customs clearance and inland delivery, and the prep line is left standing anyway rather than netted off a figure nobody has priced.',
              },
              {
                type: 'margin',
                /* The three baptism listings blended: 300 and 400 units at
                   $36.99 and 200 at $37.99 = $33,491 over 900 units. Not a
                   price anybody pays — a weighted average of three that are. */
                basis: { label: 'Average sale across the three listings', value: 37.21 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    /* $12.443 landed ÷ $37.212 = 33.438%. Three decimals,
                       because check-profile compares the blended tab against
                       every month of the profit series. */
                    pct: -33.438,
                    amount: 12.44,
                    emphasis: true,
                    detail:
                      '$6.36 of parts and kitting, $1.27 of tariff, $4.11 of ocean freight and $0.70 of prep. The biggest line, and the softest: only the freight has a date on it.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See the bill of materials above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 5.58,
                    detail: 'Amazon’s published rate, a flat 15%. Measured on the listing: Keepa reports 15% on all four products.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -20.047,
                    amount: 7.46,
                    /* Keepa product record for B0GHZSS4VV, read 2026-10-04:
                       276 × 219 × 141 mm, 835 g, pickAndPackFee 746 cents. The
                       lead listing B0GJ133W12 is 280 × 211 × 140 mm, 889 g and
                       carries the same fee. */
                    detail:
                      'Size tier: Large Standard. The best seller, B0GHZSS4VV, packs to 10.9 × 8.6 × 5.6 in at 29 oz — the 5.6 in depth is far past Small Standard’s 0.75 in limit, and the weight is past its 16 oz limit too. $7.46 a set, and the same on all three baptism listings.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -hmAd('baptism').ratePct.central,
                    amount: hmAd('baptism').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(hmAd('baptism').monthlyUsd.central)} a month on the baptism searches, ${linePct(hmAd('baptism').ratePct.central)} of September’s set revenue, in a band of ${linePct(hmAd('baptism').ratePct.low)} to ${linePct(hmAd('baptism').ratePct.high)}. This is where nearly all of the brand’s ad money goes. A floor: it counts sponsored ads in search and cannot see ads on product pages.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/highmark-collective/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/highmark-collective/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, long-term storage, returns, removals, inbound placement surcharges, low-inventory fees, software, photography, samples and all owner pay — none of which is modelled. A ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'jar',
            label: 'Bible Verse Jar',
            sharePct: 19.4,
            blocks: [
              {
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'Bill of materials — what a Bible Verse Jar costs to make',
                noteColumns: [2],
                columns: ['Component', 'Per jar', 'Basis'],
                rows: [
                  ['200 printed scripture cards', '$1.20', 'The owner’s own figure. A maker quoted him $1.00; he asked for $1.20 to be used'],
                  ['Glass jar with bamboo lid', '$0.96', 'Three published Made-in-China.com supplier list prices, each listing’s midpoint averaged per supplier then across suppliers'],
                  ['Small wooden cross', '$0.43', 'The owner’s own quote — £0.3217'],
                  ['Small wooden card stand', '$1.00', 'The owner’s own figure. He says theirs is better than anything the search found'],
                  ['Printed gift box', '$0.05', 'The owner’s own figure. Plain packaging, which he calls negligible'],
                  ['Kitting and assembly', '$0.50', 'ASSUMED. Nobody quoted it'],
                  ['Components and kitting — the cost to make used below', '$4.13', ''],
                ],
                note:
                  'The card print used to be the widest uncertainty on this profile — five printers listed the same 200-card deck between $0.61 and $4.92 — and the owner’s own $1.20 replaced it on 4 October 2026. The jar itself is the one line still priced off published supplier listings rather than his quotes.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one jar from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '15.6 × 15.3 × 13.4 cm, 0.730 kg', 'The listing’s own package size (B0GHZMGNTQ)'],
                  ['Volume', '0.00320 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$496.67 / cbm', 'Less-than-container-load, Shanghai → Los Angeles, door to door'],
                  ['Shipping, per jar', '$1.59', '0.00320 cbm × $496.67'],
                ],
                note:
                  'The same dated rate as the baptism set — the low end of the quoted band, read 28 September 2026, door to door with customs clearance and inland delivery in and duty and tariffs out. A jar is a third of the volume of a keepsake box, which is the whole of the difference between $1.59 and $4.11.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — what one jar costs in Amazon’s warehouse',
                noteColumns: [2],
                columns: ['Line', 'Per jar', 'From'],
                rows: [
                  ['Components and kitting', '$4.13', 'The bill of materials above'],
                  ['Tariff', '$0.83', '20% of the cost to make, on the same flat basis as every product here'],
                  ['Ocean freight', '$1.59', 'This jar’s carton at $496.67/cbm — the shipping table above'],
                  ['Prep and inbound', '$0.50', 'ASSUMED: drayage, 3PL prep, labelling and inbound placement. Nobody quoted it'],
                  ['Landed cost', '$7.05', 'What one jar costs before it sells'],
                ],
                note:
                  '$7.05 is 35.3% of the $19.99 price — the highest cost-of-goods share in the catalogue, on the cheapest product in it. A ceiling on the same count as the baptism set: the door-to-door freight overlaps the inbound half of the prep line and the prep line is left standing.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: 19.99 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -35.253,
                    amount: 7.05,
                    detail: '$4.13 of parts and kitting, $0.83 of tariff, $1.59 of freight and $0.50 of prep — $7.05 landed on a $19.99 product.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See the bill of materials above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 3.0,
                    detail: 'Amazon’s published rate, a flat 15%, measured on the listing.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -28.814,
                    amount: 5.76,
                    emphasis: true,
                    /* Keepa product record for B0GHZMGNTQ, read 2026-10-04:
                       156 × 153 × 134 mm, 730 g, pickAndPackFee 576 cents. */
                    detail:
                      'Size tier: Large Standard. The jar packs to 6.1 × 6.0 × 5.3 in at 26 oz — a small box, but 5.3 in deep and over a pound, so nowhere near Small Standard. $5.76 to pick and pack a $19.99 product: the largest line here, and the one a heavy glass jar at this price cannot negotiate away.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -hmAd('jar').ratePct.central,
                    amount: hmAd('jar').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(hmAd('jar').monthlyUsd.central)} a month on the jar searches, ${linePct(hmAd('jar').ratePct.central)} of September’s jar revenue. The jar is the thin one: at a 20% ad rate its margin would be under 1%, so it could not carry much advertising and the read finds it carrying little. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/highmark-collective/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/highmark-collective/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, returns, removals, inbound placement, low-inventory fees and overhead, none of which is modelled. The gap between this and the baptism set is not the kit — it is that Amazon charges almost the same to move both, and one of them sells for half as much.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* 🚨 The backend seed builds the profit and ad-spend series
                   from these SAME four numbers (seed-highmark-collective.ts
                   COST_LINES). Change one, change both.
                   🚨 ONE DECIMAL, and it matters: these are September's own
                   rates rounded to a tenth (32.27 / 22.99 / 15.00), with advertising
                   at amazon-adspend-spy's exact 2.447%, and 27.25% is what gives
                   the headline's $14.0k. Rounded to whole
                   percents the same month comes out $14.4k and the title on the
                   Business row goes wrong. */
                type: 'margin',
                basis: { label: 'Average sale across the catalogue', value: 28.6 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -32.3,
                    emphasis: true,
                    detail:
                      '$12.44 a baptism set, $7.05 a jar, $4.73 a set of journals and $9.73 a gift bundle, at September’s unit mix. See each product’s tab for the parts, the carton and the rate behind it.',
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    detail: 'Amazon’s published rate, a flat 15%, measured on all four products — which sit in four different category trees, so this was checked rather than assumed.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -23,
                    detail:
                      'Size tier: Large Standard, on the best seller and on all eight listings. $5.61 to $7.46 a unit, which at September’s mix is 23.0% of revenue — within a tenth of a point of what Amazon’s referral fee takes.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -HM_AD.ratePct.central,
                    detail: `Modelled, not observed: about ${monthUsd(HM_AD.monthlyUsd.central)} a month across the three products that sold in September, ${linePct(HM_AD.ratePct.central)} of the month’s revenue, in a band of ${linePct(HM_AD.ratePct.low)} to ${linePct(HM_AD.ratePct.high)}. A floor: it counts sponsored ads in search and cannot see ads on product pages.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/highmark-collective/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/highmark-collective/advertising/' },
                    ],
                  },
                ],
                note:
                  'September’s mix, and every month on the chart carries it — a month heavier on the jar keeps less of each dollar, and a month heavier on the baptism set keeps more. Before storage, long-term storage, returns, removals, inbound placement, low-inventory fees, software, photography, samples and all owner pay: a ceiling on profit, not profit.',
              },
            ],
          },
        ],
      },
      {
        type: 'prose',
        text:
          'The three softest figures in the model, in order: the overlap between the door-to-door freight rate and the prep line, which makes every landed cost a ceiling; the flat 20% tariff, which stands in for a customs broker classifying each kit; and kitting, which is a real cost on a five-piece box that nobody has put a price on. Closing all three would move the margin by a point or two, in a direction the overlap says is up.',
      },
      {
        type: 'callout',
        text:
          'The margin block and the profit series on the chart are one model, so they cannot disagree with each other. What neither can do is replace an invoice: nobody at Highmark Collective has shown us a supplier bill, a freight bill or an advertising bill, and only Amazon’s two fees here are read from Amazon.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'From nothing to a peak in five months, then a fall — and the lever behind both was price, not audience.',
      },
      {
        type: 'prose',
        text:
          'All eight listings opened with a $5.00 coupon, carried it for two to four weeks and then dropped it: March and April for the seven that listed first, late May for the jar. That is the standard way to buy a first page of velocity, and it worked — the first badge appeared on 21 April, three weeks after the first listings went up. Through June the catalogue was running about 1,250 units a month.',
      },
      {
        type: 'prose',
        text:
          'July and August are where the business arrived. Units went from 1,250 to 1,900 to 2,150, and the baptism line alone went from 400 a month to 1,200. On 7 August they raised the two main baptism listings from $34.99 to $36.99 — the highest price either had ever carried — and August was still the best month on record. Then September fell back to 1,800 units. One summer is not a season, and a Christian gifting brand that has not yet traded a Christmas or an Easter has not shown its two biggest months in either direction.',
      },
      {
        type: 'prose',
        text:
          'Off Amazon the growth work is thin and dated. Twelve keyword-shaped blog posts went up between 14 July and 28 August and then stopped. Four Google Search text ads have run since 29 June, one of them for eighty-three days. The Shopify store, live since May, prices above Amazon. Nothing here looks like an audience being built; it looks like a marketplace listing being fed.',
      },
      {
        type: 'callout',
        text:
          'The one piece of the catalogue that stopped growing is the faith gift bundle. It was cut 20% in June, kept its sponsored placements on 4 October, and lost its badge at the end of September — the Advertising section says what is, and is not, in the ad figure.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-07, read at New York 10001. */
        type: 'strategy',
        label: HM_AD.strategy,
        points: [
          'None of the modelled ad spend, about $1,260 a month, is on the Highmark Collective name. Jungle Scout saw their ads on 132 of the 1,172 searches their listings show up on, and about 88% of the money, $1,105 a month, is on the baptism searches.',
          'A New York read of fifteen of their biggest searches the same day found a sponsored Highmark card on twelve of them: #2 on “baptism gifts for girl”, #4 on “baptism gifts for boys” and #2 on “christening gifts for girls”, and a card between #11 and #22 on each of the journal and jar searches. The only ones with none were “journal for women”, “diary for women” and “sermon notes notebook”.',
          'They are buying strangers’ searches, not their own: the opposite of the usual small-seller pattern of paying to defend a brand name.',
          'Modelled from outside the account, so a floor: Amazon automatic and product-targeting campaigns, Sponsored Brands and video are invisible to it. The Google and Meta ad libraries show a handful of text ads and no Meta ad at all.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: HM_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the eight Highmark Collective listings: exact-match monthly searches and the best organic position any of them held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword: these fifty carry ${monthUsd(topSpend(HM_TOP_KEYWORDS))} of the ${monthUsd(HM_AD.monthlyUsd.central)}, and the rest sits on smaller searches — every one of them is in the next table. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(HM_AD_KEYWORDS, HM_AD_KEYWORDS_TOTAL, HM_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Where they rank without paying is thin: the keepsake set sits in the first twenty on a handful of baptism searches and the jar is 12th on “bible verse jar”, but on the big journal searches they are mostly beyond the first page unless they pay. That is the reverse of a brand with an audience, and it is why the ads sit where they do. “Journal for women” alone draws about 220,000 searches a month and they are on it for under a cent in the dollar of the sponsored results, so the journals are bought in small slices rather than head on.',
      },
      {
        type: 'prose',
        text:
          'Two things changed since the first read on 4 October. A hand count of seven generic searches found a sponsored slot on five; the same search read at New York 10001 across fifteen finds twelve, and the model now measures its click rate off two other brands whose clicks come mostly from ads rather than pooling one from five of their own keywords, which moves the modelled bill from 2.3% to 2.4% of revenue with a band of 2.4% to 6.4%. The faith gift bundle, which sold nothing in September after a June price cut, was still holding sponsored #1, #2 and #4 on its own category terms on 4 October; it is not one of the three products modelled here, so nothing it spends is in the figure.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(HM_AD.monthlyUsd.central)} a month, ${linePct(HM_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 132 of 1,172 keywords they rank on — Jungle Scout share of voice; a sponsored card on 12 of 15 searches read from New York',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid. The click rate, 4.0% (3.9–10.9%), is measured off two other brands whose clicks come mostly from ads, and a keyword’s paid clicks never exceed the brand’s own observed clicks on it. It is a floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off. Nobody publishes the bill.',
          },
          {
            label: 'Google Search',
            href: 'https://adstransparency.google.com/',
            value: '4 text ads',
            counted:
              'Three creatives ran 29 Jun – 15 Jul 2026, seventeen days; a fourth has run 83 days to 3 Oct 2026. All four are text ads, no image or video. Advertiser HIGHMARK COLLECTIVE CORP, identity verified, based in the United States',
            note:
              'Google publishes no spend, impressions or budget for US consumer advertising, so there is no dollar figure here and any would be invented. A Merchant Center tag is installed beside the Google tag, so a Shopping feed is wired up. Four creatives is a very small account.',
          },
          {
            label: 'Meta and TikTok',
            value: 'No ad found',
            counted: 'Meta Ad Library, United States, all ad categories, active and inactive, searched twice: no ad from this brand. TikTok has no US ad transparency library at all',
            note:
              'Both pixels are installed on the Shopify store. A Meta keyword search matches ad text and advertiser name, so an ad running from a differently-named Page would not surface — and the Meta pixel normally requires a connected Page that could not be found or named. A strong negative, not an airtight one. TikTok ads in the US are unobservable by design.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising lines, row for row, built from HM_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...HM_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${hmBand(p.monthlyUsd)}`]),
          ['Total — the Whole brand line', monthUsd(HM_AD.monthlyUsd.central), linePct(HM_AD.ratePct.central), lineUsd((HM_AD_ORDER * HM_AD.ratePct.central) / 100), `Modelled: ${hmBand(HM_AD.monthlyUsd)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising, line for line: each product’s tab uses its own row, and the Whole brand tab the last. Per sale is the share of that product’s price, or of the $28.60 average sale. The faith gift bundle sold nothing in September and is not in it. Google’s text ads publish no spend, so none is here.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'There is no audience off Amazon to measure. Not a small one — none that could be found on any platform.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Instagram, TikTok, Facebook, Pinterest and YouTube were each checked at the brand’s own handle, and six further handle variants after that. The Instagram handle exists and belongs to a backcountry snowmobile account with no posts; TikTok and YouTube return not-found; Pinterest redirects to an error; the Facebook vanity URL is unavailable. The brand’s own homepage carries zero outbound links — no social icons, no Amazon link, no press, no newsletter.',
      },
      {
        type: 'prose',
        text:
          'The honest limit on that: a Meta pixel is installed through Shopify’s Facebook and Instagram app, which normally needs a connected Page, so a Page probably exists somewhere under a name nobody could find. What is being said here is that no social account was found, not that no Page exists. Site traffic was not measured at all — no free source gives a defensible visit count for a site this small, and a number put here would be a guess.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Site visits', value: 'Not measured', note: 'No defensible free source for a site this size; nothing is estimated here' },
          { label: 'Outbound links from the homepage', value: '0', note: 'Every <a href> on the rendered page was enumerated' },
          { label: 'Social accounts found', value: 'None', note: 'Five platforms at the brand handle, plus six variants' },
          { label: 'Blog posts', value: '12', note: '14 Jul – 28 Aug 2026, then nothing' },
          { label: 'Etsy sales', value: '~70', note: 'Lifetime · via a search index, not a page we loaded' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — highmarkcollective.com',
            href: 'https://highmarkcollective.com/',
            value: '6 products',
            note:
              'Shopify, live since 1 May 2026. Prices every comparable product above its own Amazon listing, by 2.7% to 25%. Three paid-acquisition pixels are installed — Google, Meta and TikTok — and no email platform and no reviews app. The stack is set up to buy traffic rather than to keep it.',
          },
          {
            label: 'Etsy — HighmarkCollective',
            href: 'https://www.etsy.com/shop/HighmarkCollective',
            value: '~70 sales',
            flag: true,
            note:
              'About seventy lifetime sales, 4.1★ over 12 reviews, earliest visible review 4 July 2026. Etsy returned 403 to curl, to headless Chrome and to headful Chrome, so these come from a search index’s rendering of the shop page and the counts are approximate.',
          },
          {
            label: 'Shop app storefront',
            href: 'https://shop.app/m/4d1tj5c6eq',
            value: '2 products',
            note: 'Auto-generated by Shopify. No followers, no reviews. A by-product of being on Shopify rather than a channel anybody built.',
          },
          {
            label: 'Wholesale',
            href: 'https://highmarkcollective.com/pages/wholesale',
            value: 'A form, no presence',
            note:
              'An application page with a $300 opening minimum and display signage over $1,500. No Faire brand page, no Abound, no Tundra, no retailer found carrying the brand.',
          },
          {
            label: 'Walmart, eBay, Temu, Shein, TikTok Shop, Faire, Target',
            value: 'Not found',
            note:
              'Searched on each. Walmart and Faire served bot walls, so those two negatives rest on domain-restricted index searches rather than pages anybody loaded; eBay served its own error page to every request and one candidate item could not be opened, so eBay is unknown rather than absent.',
          },
          {
            label: 'Trustpilot, BBB, Reddit, press',
            value: 'Nothing',
            note: 'No review profile, no BBB file, no thread and no coverage. Every search for the name returns Highmark the Pittsburgh health insurer, which is unrelated.',
          },
        ],
      },
      {
        /* 🚨 No off-Amazon keyword table: no search-volume read was taken for
           their own domain, and the blog's keyword shape is an observation
           rather than a measurement. The Amazon keyword work is on
           Advertising, where the SERP read belongs. */
        type: 'table',
        caption: 'Where they rank on Amazon',
        noteColumns: [3],
        columns: ['Listing', 'Sales rank', 'Rating', 'In'],
        rows: [
          ['Baptism keepsake set — boy or girl', '8,661', '4.5★ / 45', 'Baby Products'],
          ['Baptism keepsake set — boys', '10,643', '4.5★ / 59', 'Baby Products'],
          ['Christian notebooks — Scripture Botanical', '18,653', '4.8★ / 77 pooled', 'Office Products'],
          ['Christian notebooks — Joyful Bloom', '18,724', '4.8★ / 77 pooled', 'Office Products'],
          ['Christian notebooks — Blessed Botanical Cross', '18,725', '4.8★ / 77 pooled', 'Office Products'],
          ['Baptism keepsake set — girl', '42,000', '4.8★ / 78', 'Toys & Games'],
          ['Bible Verse Jar', '52,770', '4.7★ / 59', 'Home & Kitchen'],
          ['Faith gift bundle', '93,410', '5.0★ / 58', 'Home & Kitchen'],
        ],
        note:
          'Keepa’s sales rank in each listing’s root category, read 4 October 2026, best first. The three notebook listings report one pooled review count of 77 between them because Amazon shares a variation family’s reviews; their sold badges are genuinely separate. The faith gift bundle holds the catalogue’s best rating and its worst rank.',
      },
      {
        type: 'callout',
        text:
          'Essentially all of this business is on Amazon, and the rest is paperwork and pixels. That is a concentration risk a buyer would price, and it is also why the figures on this page can be as complete as they are.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'HIGHMARK COLLECTIVE CORP.', note: 'Delaware general corporation · file 10281379' },
          { label: 'Incorporated', value: '1 Aug 2025', note: 'Delaware Division of Corporations' },
          { label: 'Operating address', value: 'Palmetto Bay, Florida', note: '7840 SW 161 Street, a residential street south of Miami' },
          { label: 'Registered agent', value: 'Dover, Delaware', note: 'A Registered Agent, Inc. — an agent service, not an office' },
          { label: 'Amazon seller', value: 'A2EDGVBEHEN117', note: 'Highmark Collective · first tracked 26 Mar 2026' },
          { label: 'Seller feedback', value: '100%', note: 'Over 24 lifetime ratings · read 4 Oct 2026', info: 'sellerFeedback' },
          { label: 'First listing', value: '24 Mar 2026' },
          { label: 'Trademark', value: 'None', note: 'The one application, for notebooks, was abandoned 30 Jul 2026' },
        ],
      },
      {
        type: 'prose',
        text:
          'The measured dates are close together and they are all recent. The company was incorporated in Delaware on 1 August 2025 and nothing about the brand exists anywhere before that — no entity, no domain, no filing, no account, no post. The domain followed in October 2025, the trademark application in December, the Amazon listings in March 2026, the first badged sales in April, and the brand’s own store on 1 May. Nobody at Highmark Collective has spoken to us, and every date here is read from a registry, a registrar or a marketplace rather than told to us.',
      },
      {
        type: 'prose',
        text:
          'No individual is named anywhere public. Delaware’s free record lists no officers, the trademark filing names no attorney and no signatory, and the About page is signed by the team. The operating address is the same on two independent sources — the trademark filing and the store’s own contact page — and it is a residential street in Palmetto Bay rather than one of the agent-mill addresses that usually turn up here, which is a small point in their favour and not proof of anything. The registered agent in Dover is exactly the kind of service that tells you nothing about where a business actually is.',
      },
      {
        /* 🚨 MEASURED, and the reading matters as much as the fact. Three ASINs
           carry a Zhejiang exporter in the manufacturer attribute; the dossier
           reads this as contract sourcing left in listing data, NOT as Chinese
           ownership, and the page must keep saying which. It is also the trap
           that nearly lost half the catalogue: brand:[] returns 8, but
           manufacturer:[Highmark Collective] returns only 4. */
        type: 'prose',
        text:
          'Three of the eight listings name Yiwu Jiacheng Arts & Crafts Co.,Ltd as the manufacturer of record — the three baptism ASINs, which are the business — and a fourth names “Christian Gifts Collection”. A Zhejiang crafts exporter in a listing attribute is evidence of contract sourcing left in the data, not evidence of who owns the company: the seller entity, the Florida address and the business name all read as a US operator, and the same query run against that manufacturer name on Amazon US returns these three listings and nothing else. It is also the reason the catalogue has to be assembled from several queries at once — searching by brand returns eight listings and searching by manufacturer returns four, and picking the wrong field loses the product line that carries the business.',
      },
      {
        type: 'prose',
        text:
          'The trademark is the one piece of IP paperwork there is, and it is gone. The application was filed on 29 December 2025 on an intent-to-use basis covering paper notebooks and blank journals only, through a low-cost self-serve filing service with no attorney of record; the examiner issued an office action on 29 April 2026, nobody answered, and it was abandoned on 30 July. The brand has no registered mark today, and nothing was ever filed covering the baptism keepsakes that are two thirds of its revenue.',
      },
      {
        type: 'prose',
        text:
          'One name collision is worth recording rather than dismissing: a HIGHMARK COLLECTIVE LLC was formed in Tampa on 3 September 2026 by a different person, in a different structure, thirteen months after the Delaware corporation. Nothing links it to this brand and nothing rules it out. Highmark the Pittsburgh health insurer, which dominates every search for the name, is unrelated.',
      },

      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text:
          'The least you would spend to find out whether each product sells, before you commit to a full launch.',
      },
      /* The validation test, read off the published "to start" estimate
         (waithowmuch-research make-validation-launch.mjs --variants
         "baptism=boy,boys:for boys;jar=jar" --products baptism,jar --publish),
         so the section and the headline figure are one record. */
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },
  'mount-cleverest': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-mount-cleverest-headline.ts, from
       waithowmuch-research research/mount-cleverest/headline.json (approved
       2026-10-07) — and the page reads them from the row alone.
       🚨 The snapshot is SEPTEMBER 2026, the last whole month. October's badge
       read is a live mid-month reading and is deliberately not in the series;
       it is quoted as a dated reading in Revenue. Every "Read" stamp below is
       September's. September is a quiet, rising month, not the peak, which is
       exactly what the subtitle is about. */
    headline: {
      /* The Original Edition: 1,000 of September's 2,700 units and the object
         the title is about. */
      image: {
        src: mountCleverestPhoto('B0B6B25BKW'),
        alt: 'A dark grey triangular box shaped like a snow-capped mountain, printed MOUNT CLEVEREST — Face the Facts! — The true or false trivia game — the best-selling Mount Cleverest card game on Amazon',
      },
    },

    /* 🚨 Two channels, two margins. Months with no TikTok sales (everything before
       October 2025, and January to August 2026) earn Amazon's own September rate,
       49.65%; months with both sit near the Whole-brand tab's 50.2%.
       check-profile.mjs accepts either, within half a point. */
    profitSeriesAltPct: [49.65],

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand, their own
             questions and their own box, sold by the company that owns the
             listings. */
          primaryMethod: 'private_label',
          /* The Mount Cleverest line is 57% of September 2026 and the Original
             deck alone 43%, with two older ranges (100 PICS flash cards and
             SMART CARDS) sold alongside. A flagship shape, not a long tail. */
          catalogStructure: 'flagship',
          /* Level 2, an inference and probably the low side. The box is a
             custom triangle and the 54 questions are their own, but a rival can
             order a card game of any shape from the same kind of factory, and
             nothing read says the question set is protected. Whether it is
             owner-written content with a following of its own is the first
             question for the owner. */
          diffTooling: 'no',
          diffCustom: 'no',
          diffVisible: 'yes',
          /* A READ: the Brand Store at /stores/MountCleverest-FaceTheFacts is
             gated behind Brand Registry enrolment. */
          brandRegistry: 'yes',
          /* 🚨 `trademark` left out on purpose. A Justia page lists trademarks
             under the owner name, but it returned 403 and nobody read which
             marks are registered or for what, so none is scored. */
        },
        derived: {
          /* RULE 1: B07L6MJ1X5, 100 PICS Animals, listed 2019-07-16, the
             catalogue's first listing. Not the company (2013) and not Mount
             Cleverest itself (2022-07-15). */
          sellingSince: '2019-07-16',
          /* All 18 listings, each its own count (the three Mount Cleverest
             editions report 1,829, 188 and 102, so none is pooled). A floor. */
          reviewTotal: 10618,
          /* Revenue-weighted over September's badged listings: 4.59. */
          ratingWeighted: 4.6,
          sellerFeedbackPct: 97,
          /* RULE 2, widened on 2026-10-07 by the person running this research:
             the site covers every channel a brand sells through, so the share
             is the largest channel's share of ALL measured revenue in the
             snapshot month, Amazon US $39,048 of $39,989.14 = 97.65%. */
          topMarketplaceSharePct: 97.65,
          marketplaces: ['US', 'CA'],
          /* November 2025 against the trailing twelve, from score-valuation.mjs. */
          peakMonthSharePct: 47.84,
          /* RULE 3, same decision: TikTok Shop UK is sized, from Kalodata's
             shop estimate, so it is scored. $53,167 of the $932,914 trailing
             twelve = 5.7%, a third-party estimate (see the Revenue section).
             The own store, Walmart and eBay are still unsized and excluded. */
          offAmazonSharePct: 5.7,
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. Amazon US and the TikTok Shop UK brand shop, the second from a third-party estimate: the own store, Walmart and eBay are excluded because nobody read their sales.',
      note: 'Base 2.6, adjusted by what the public record supports.',
      offAmazonBasis:
        'TikTok Shop UK, the “100 PICS” brand shop: Kalodata’s monthly estimate, $53,167 of the $932,914 trailing twelve (5.7%). A third-party figure, and the shop’s own dashboard would replace it.',
    },

    facts: [
      { label: 'SKUs', value: '18', note: 'The whole Amazon storefront; 11 carried a sold badge in September. The TikTok shop sells three of them', info: 'skus' },
      /* The hero's own breadcrumb. */
      {
        label: 'Category',
        value: 'Toys & Games › Games & Accessories › Card Games › Dedicated Deck Card Games',
        note: 'The Mount Cleverest listings. The 100 PICS flash cards sit under Flash Cards',
        info: 'category',
        wide: true,
      },
      /* 🚨 Catalogue-wide figures, so NO `info` key — the shared ⓘ copy
         describes one hero listing. */
      { label: 'Product reviews', value: '10,618', note: 'All 18 listings, each its own count' },
      { label: 'Product rating', value: '4.6★', note: 'Revenue-weighted, September’s badged listings' },
      { label: 'Seller feedback', value: '97%', note: 'Over 484 lifetime ratings · read 6 Oct 2026', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own brand and their own questions on listings nobody else sells — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'The Mount Cleverest line is 57% of Sep 2026', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 2 and an inference, probably the low side: the questions are
         their own content. See the valuation answers. */
      { label: 'Differentiation', value: 'Level 2', note: 'A custom box and their own question set, but nothing read shows it is hard to copy — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, TikTok Shop UK, own store, an app audience', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The eighteen listings in the Poptacular Ltd storefront on Amazon US are about 98% of the measured revenue. The seller holds 100% of the buy box on every top listing and Amazon itself sells none.',
      },
      /* 'unchecked', not 'no': the seller id exists on Canada with 7 ratings
         and not on the UK or Germany, but the brand's own store says it sells
         on Amazon UK and Keepa cannot tie that page to this seller account. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'The seller account exists on Amazon Canada with 7 ratings and was not found on the UK or Germany. The brand’s own store says it sells on Amazon UK, a page nobody could tie to this seller id, so the answer is not a clean no.',
      },
      'own-store': {
        status: 'yes',
        note:
          'mount-cleverest.com, branded the Poptacular Store, sells the Mount Cleverest, 100 PICS and SMART CARDS ranges directly. Its sales are not published, so only its existence is counted.',
      },
      'other-marketplace': {
        status: 'yes',
        note:
          'Mount Cleverest listings appear on Walmart.com and on eBay. The eBay sellers look like resellers, and Walmart served a bot check, so nobody read who sells there.',
      },
      /* Read on 2026-10-07 from Kalodata and the brand's own TikTok profile. */
      'tiktok-shop': {
        status: 'yes',
        flag: true,
        note:
          'A UK TikTok Shop, “100 PICS”, a brand seller, with revenue first showing in October 2025. Kalodata estimates $53K over the twelve months to September 2026, $35.7K of it in November, and half of it through 44 affiliate creators. A third-party estimate, and the US shops selling Mount Cleverest belong to other sellers.',
      },
      'wholesale-out': { status: 'unchecked' },

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Every listing is FBA, with Amazon pick-and-pack fees of $2.58 to $4.09 each.',
      },
      'vendor-1p': {
        status: 'no',
        note: 'Amazon itself offers none of the listings that were checked.',
      },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand names and their own content on listings nobody else sells. Nothing read shows who makes the printed goods.',
      },
      manufacturer: {
        status: 'unchecked',
        note: 'The Amazon manufacturer string reads “Poptacular”. Whether they print the decks themselves or buy them from a printer was not established.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/MountCleverest-FaceTheFacts, which Amazon gates behind Brand Registry enrolment.',
      },
      // fbm, white-label, subscribe-save, amazon-handmade, amazon-custom and
      // b2b left unchecked: nobody looked.
    },

    intro:
      'Mount Cleverest is a true-or-false trivia card game sold on Amazon US by Poptacular Ltd, a London games company that made its name with the 100 PICS quiz app. The card game began as one of its own phone apps, and it is now the product the business runs on, mostly on Amazon US and since late 2025 also on a UK TikTok Shop, with two older card ranges sold beside it.',

    blocks: [
      { type: 'heading', text: 'One mountain-shaped deck, two older ranges' },
      {
        type: 'prose',
        text:
          'The storefront is eighteen listings and three product lines. Mount Cleverest is a boxed deck of true-or-false questions in three editions: the Original, a Geography edition and a Movie edition, all at the same price and all in a triangular box printed to look like a snow-capped peak. The other fifteen are older. Ten are 100 PICS flash-card travel games, which turn the company’s picture-quiz app into a pocket deck, and five are SMART CARDS, a 50-card deck that plays seven games.',
      },
      {
        type: 'prose',
        text:
          'The shape of the catalogue is the story. The three Mount Cleverest editions rank in the top 250 of all Toys & Games; the older ranges rank between about 8,000 and 258,000. Seven of the eighteen listings carried no sold badge at all in September, which means each is selling under roughly fifty a month, and the flash cards that were the whole business before 2022 now sell a fraction of what the one newer deck does.',
      },
      {
        type: 'images',
        items: [
          {
            src: mountCleverestPhoto('B0CBSHKWSD'),
            alt: 'The Mount Cleverest Geography Edition: the same snow-capped mountain box in blue-green, printed with a globe',
          },
          {
            src: mountCleverestPhoto('B087MWB61Y'),
            alt: 'A 100 PICS US States and Capitals flash-card deck in its slide-reveal plastic case, showing a map of the United States',
          },
        ],
        caption:
          'Two of the brand’s own Amazon listing images: the Geography edition of the Mount Cleverest deck, and the 100 PICS flash cards that came before it.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A company incorporated in 2013 to make quiz apps, cards on Amazon from 2019, and one deck in 2022 that took over. Most of what is known about this business is when it did things, and the dates cluster at Christmas.',
      },
      {
        /* Oldest first, strictly. Every date is a reading: Companies House,
           the Apple App Store, Keepa listedSince, trackedSince and
           monthlySoldHistory, and a dated blog post. */
        type: 'timeline',
        items: [
          {
            when: '15 May 2013',
            tag: 'Brand',
            what: 'The company is incorporated as 100 PICS LIMITED',
            detail:
              'Company 08530431, a private limited company in England, with two directors appointed on the day and neither since resigned. Registered for games retail and for interactive entertainment software.',
          },
          {
            when: '13 Mar 2014',
            tag: 'Brand',
            what: 'It becomes Poptacular Ltd',
            detail: 'The 100 PICS name stays on the quiz app and, later, on the flash cards.',
          },
          {
            when: '15 Oct 2014',
            tag: 'Web',
            what: 'The Mount Cleverest app is released on iOS',
            detail:
              'Eight years before the card deck. Free with in-app purchases from $0.99 to $28.99, last updated 29 September 2025, and rated 4.9 over 383 ratings.',
          },
          {
            when: '16 Jul 2019',
            tag: 'Amazon',
            what: 'The first card listing goes up',
            detail: '100 PICS Animals, a flash-card travel game. Keepa first tracked the seller account five months later, on 15 December 2019.',
          },
          {
            when: '19 Aug 2021',
            tag: 'Amazon',
            what: 'SMART CARDS arrive',
            detail: 'A second card range, a 50-card deck that plays seven games, starting with a Cars and a US Road Signs listing.',
          },
          {
            when: '15 Jul 2022',
            tag: 'Amazon',
            what: 'The Mount Cleverest Original Edition lists',
            detail: 'The deck the business now runs on. Keepa’s sold-badge history only begins in 2023, so its first year carries no sales reading.',
          },
          {
            when: '13 Jul 2023',
            tag: 'Amazon',
            what: 'The Geography and Movie editions list',
            detail: 'Same price, same box, new question sets, so one deck becomes a line.',
          },
          {
            when: '26 Sep 2023',
            tag: 'Web',
            what: 'A TikTok post on @100pics gets 106.7K plays',
            detail:
              '“True or false: woolly mammoths were around when the Pyramids were built.” 200 likes, 55 shares, and no product link in the post. The account has about 5,000 followers, and the hero deck’s sold badge went from 100 to 200 the next day.',
          },
          {
            when: '30 Nov 2023',
            tag: 'Amazon',
            what: 'The first Christmas the catalogue shows up in the data',
            detail: 'November 2023 sells three times October, and the series’ first month of six-figure sales. The first of three Christmases on the chart.',
          },
          {
            when: '31 Oct 2024',
            tag: 'Amazon',
            what: 'The season arrives a month early: $212,582',
            detail: 'More than November or December of that year ($130,409 and $100,104). A deck that sells as a gift sold most of its Christmas before Black Friday.',
          },
          {
            when: '29 Sep 2025',
            tag: 'Web',
            what: 'The Mount Cleverest app gets its latest update',
            detail: 'Version 2.05.',
          },
          {
            when: '1 Oct 2025',
            tag: 'Brand',
            what: 'The UK TikTok Shop starts to sell',
            detail:
              'Kalodata first records sales on the “100 PICS” brand shop in October 2025 and none before it, although its Original Edition listing carries a launch date of 12 April 2024. It sells the three Mount Cleverest decks and four other products, to UK shoppers.',
          },
          {
            when: '13 Oct 2025',
            tag: 'Web',
            what: 'A parenting-and-games blog publishes a review of the Original and Movie editions',
            detail: 'An affiliate-link review, the kind of third-party content that sends shoppers to the listing.',
          },
          {
            when: '7 Nov 2025',
            tag: 'Web',
            what: 'The Instagram account posts a video clip, and has not posted since',
            detail: 'The last visible post on a verified account of 25.6K followers.',
          },
          {
            when: '30 Nov 2025',
            tag: 'Amazon',
            what: '$446,338 across both channels — the best month on record',
            detail: 'Amazon US $410,597, about 25,000 units, and a UK TikTok Shop estimated at $35,741. Together 48% of the trailing year in one month.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: '$4,351 — the quietest month in the three years of data',
            detail: 'Six months after the peak, the same catalogue sells about one percent of what it did in November.',
          },
          {
            when: '24 Sep 2026',
            tag: 'Advertising',
            what: 'The first TikTok ads under the company’s name',
            detail:
              'TikTok’s ad library, which covers the UK and EU, lists 151 ads from POPTACULAR LTD between 24 September and 6 October 2026, none earlier. Most ran for a day. It does not say what they promote or what they cost.',
          },
          {
            when: '6 Oct 2026',
            tag: 'Amazon',
            what: 'The season starts to build',
            detail: 'A live mid-month read of about 4,700 units, already past all of September.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Thirty-seven months of history, from September 2023, which is as far back as Amazon’s “bought in past month” badge goes in Keepa. Revenue is two channels. Amazon US is that badge on each of the eighteen listings at each month end, priced at the buy box; the seller holds the buy box on every top listing, so nothing is split with a reseller. TikTok Shop UK is a third-party estimate of the brand’s shop, from Kalodata, which reads zero before October 2025. Roughly half of September was left after the goods, shipping, tariff and each channel’s fees.',
      },
      {
        type: 'prose',
        text:
          'The chart is three Christmases and a long flat floor. On Amazon, November 2023 sold $105,480, October 2024 $212,582 and November 2025 $410,597, each roughly double the last, and between them the catalogue sold between $4,000 and $40,000 a month. The year to September 2026 totals $879,746 on Amazon, against $619,244 the year before; the whole of that gain is in the last three months of the calendar year, and the nine months outside it were lower. TikTok Shop UK adds an estimated $53,167 over the same year, 5.7% of the combined total, with $35,741 of it in November 2025 and nothing from January to August 2026. Nobody reading a single month would know which one they had.',
      },
      {
        type: 'prose',
        text:
          '🚨 The series stops at September because October was not finished when this was read. A live badge read on 6 October 2026 put Amazon at about 4,700 units and $73,990, already past all of September and early in what has been the biggest quarter each year. It is a mid-month reading, not a closed month, so it is not a point on the chart, and it has no TikTok figure.',
      },
      {
        type: 'prose',
        text:
          'The badge is a bracket rather than a count. Amazon prints 50+, 100+, 200+ and so on up to 3,000+, so every month here is a floor, and the hero deck is the bracket that matters: a move between 3,000+ and 4,000+ is worth about $17,000 on its own. Seven of the eighteen listings carry no badge at all in September and are counted at zero.',
      },
      { type: 'chart' },
      {
        /* The seller id was looked up on each domain (SKILL §6), never the
           brand string. */
        type: 'marketplaces',
        title: 'Where the revenue comes from',
        intro: 'Nearly all of it is Amazon US, with a small, seasonal UK TikTok Shop beside it.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 97.65 },
          { label: 'TikTok Shop UK', short: 'TikTok UK', share: 2.35, note: 'A third-party estimate, and September is a quiet month for it: November 2025 was 8% of the month' },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'The seller account exists, with 7 ratings and no sold badge on any listing' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'The seller id returns no account on either, although the brand’s own store says it sells on Amazon UK' },
        ],
        note: 'Shares of the latest month’s revenue across the channels that could be measured: Amazon’s sold badges, read by seller id on every marketplace, and Kalodata’s estimate of the TikTok shop. The own store, Walmart and eBay are not sized.',
      },
      {
        /* All EIGHTEEN storefront listings, and they sum to the 2026-09 revenue
           row, which check-profile.mjs asserts. */
        type: 'breakdown',
        intro:
          'The Original edition alone is two fifths of September on Amazon and the three Mount Cleverest editions together more than half. The listing in second place is the 100 PICS US States flash cards, a 2020 listing that has outlived most of its siblings. The last row is the whole UK TikTok Shop, a third-party estimate, not a listing.',
        items: MOUNT_CLEVEREST_BREAKDOWN,
        note:
          '“Sold / mo” is Amazon’s own badge, a band, so every Amazon row is a floor. Revenue is that band times the buy-box price. The seven rows at zero carry no badge, which means under roughly fifty a month, not none. Each band is priced at today’s buy box, so a month before a price change carries the new price.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The badge under-reports by rounding down to a bracket, and the profit above it deducts no storage, returns, removals, inbound placement or peak-season fulfilment surcharge, no software and no owner pay. Margin breakdown says which cost lines are measured and which are not.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon US takes almost all of the money, a UK TikTok Shop a small, seasonal slice. An audience the company built for its phone apps is the likeliest reason either comes at all.',
      },
      {
        type: 'prose',
        text:
          'On Amazon the arrangement is plain: eighteen listings, all FBA, one offer on each, one seller holding the buy box. There is no second account and no 1P relationship. The UK TikTok Shop is the only other channel with a revenue figure, and it is an estimate: about 6% of the trailing year, nearly all of it in the weeks before Christmas, and half of it through creators paid a commission. An own store, a Walmart listing nobody could read and eBay resellers publish no sales. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      {
        type: 'prose',
        text:
          'The notable absence is an ad budget. In a live search read the brand held no sponsored slot on any Amazon page where ads rendered, and its organic positions are first to sixth on the narrow terms “true or false game” and “mount cleverest game”. That points to demand arriving through gifting, search and a name people already carry in their head, which is what a long-running app with a following would produce. On TikTok the money is creator commission, not advertising, until a burst of ads began in late September 2026. It is a reading of the footprint and not a proof, and the Advertising section says how much of it was seen.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'About half of each September dollar survives the box, the boat and the marketplaces, and a little less on the older Amazon flash cards: the printing is cheap, and the biggest cut is a fulfilment fee that does not shrink with the price. The UK TikTok Shop keeps about the same in its best month.',
      },
      {
        type: 'prose',
        text:
          'Two lines are measured, two are assumed, and the last two are built from other readings. Amazon’s referral rate is 15% on all eighteen listings, and the fulfilment fee is Amazon’s own pick-and-pack figure per listing. Production is the average of the lowest prices verified Chinese printers list on Alibaba for a deck like each one: $0.66 for a trivia deck in a box and $0.75 for flash cards, a few cents against Amazon’s four-dollar fulfilment fee. The tariff is a flat 20% of that cost, on the assumption of Chinese origin that nothing read supports or rules out. Freight is priced from a dated public rate and the box’s own dimensions, and the advertising line is modelled.',
      },
      {
        type: 'prose',
        text:
          'Two products get their own breakdown, for Amazon, because they do not share a cost structure worth averaging. In September the Mount Cleverest decks were 55% of all revenue and the 100 PICS flash cards 37%; neither reaches four fifths alone, so both are here, with the whole brand last. The SMART CARDS, the UK TikTok Shop and the rest sit in the blended tab, and the TikTok Shop has its own table below.',
      },
      {
        /* 🚨 One breakdown per main product. Mount Cleverest and 100 PICS are
           56.6% and 38.3% of September's revenue, together the first to reach
           80% (SKILL §2, "Products"). The `all` tab is the whole brand at
           September's mix and is the margin the backend's profit series is
           built from (seed-mount-cleverest.ts COST_LINES). */
        type: 'product-margins',
        period: '2026-09',
        products: [
          {
            id: 'mount-cleverest',
            label: 'Mount Cleverest decks',
            sharePct: 55.2,
            blocks: [
              {
                /* Ordered by track record. Read from a screenshot of an Alibaba
                   search on 2026-10-11 (research/mount-cleverest/suppliers.json).
                   Until then production was an ASSUMED $3.75 the researcher gave. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a Mount Cleverest deck costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Shenzhen Yahong Color Printing Co., Ltd', 'Verified · 12 yrs', 'No score shown', '—', '100 pieces', '$0.40–0.60'],
                  ['Xiamen Hongju Printing Industry & Trade Co., Ltd', 'Verified · 10 yrs', '4.9★ from 51', '—', '250 pieces', '$0.20–1.88'],
                  ['Wenzhou Tiange Arts & Crafts Co., Ltd', 'Verified · 9 yrs', '4.9★ from 9', '110', '500 boxes', '$2.00'],
                  ['Hunan Igor Crafts Co., Ltd', 'Verified · 4 yrs', '4.9★ from 34', '703', '500 sets', '$0.21–0.52'],
                  ['Dongguan Jolly Play Card Game Co., Ltd', 'Verified · 1 yr', '5.0★ from 8', '—', '500 sets', '$0.50–1.99'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', '$0.66'],
                ],
                note:
                  'Five verified Chinese printers from a search for “custom trivia card game printing”, filtered to a 4.5+ supplier rating; none was marked as an ad. They print question-card decks in a box to order. The cost to make takes each one’s lowest listed price — $0.40, $0.20, $2.00, $0.21 and $0.50 — and averages them. They quote rectangular boxes: Mount Cleverest’s triangular, die-cut box would cost more, and where Poptacular prints is not public.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one deck from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '16.7 × 14.6 × 4.2 cm, 0.230 kg', 'The lead listing’s own package size (B0B6B25BKW)'],
                  ['Volume', '0.001024 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$496.67 / cbm', 'Less-than-container-load, Shanghai → Los Angeles, door to door'],
                  ['Shipping, per deck', '$0.51', '0.001024 cbm × $496.67'],
                ],
                note:
                  'The rate is the low end of the quoted band, read 28 September 2026; the top of that band prices express services and would be $4.34 a deck. It is door to door, customs clearance and inland delivery included, duty and tariffs excluded, and it prices the retail box rather than a master carton. The other ranges ship in different boxes and carry different figures. If the decks are made in the UK or EU this lane is the wrong one.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — what one Mount Cleverest deck costs in Amazon’s warehouse',
                noteColumns: [2],
                columns: ['Line', 'Per deck', 'From'],
                rows: [
                  ['Production', '$0.66', 'The Alibaba printers’ lowest prices, averaged — COGS table above'],
                  ['Tariff', '$0.13', 'ASSUMED: 20% of production, Section 301 plus the reciprocal rate on China, applied flat'],
                  ['Ocean freight', '$0.51', 'This deck’s carton at $496.67/cbm, the shipping table above'],
                  ['Landed cost', '$1.30', 'What one deck costs before it sells'],
                ],
                note:
                  '$1.30 is 7.7% of the $16.99 price, and the freight to move the box is most of the difference from the printing alone. No prep or inbound-placement line is added, so the figure is a floor on that count; against that, the door-to-door freight already includes delivery to a warehouse.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: 16.99 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -7.652,
                    amount: 1.3,
                    detail:
                      '$0.66 of production, $0.13 of tariff and $0.51 of ocean freight. The printing is the average of five Alibaba quotes; the tariff is assumed.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 2.55,
                    detail: 'Amazon’s published rate, a flat 15%. Measured on the listing: Keepa reports 15% on every one of the eighteen.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -24.073,
                    amount: 4.09,
                    emphasis: true,
                    /* Keepa product record for B0B6B25BKW, read 2026-10-07:
                       167 × 146 × 42 mm, 230 g, pickAndPackFee 409 cents. */
                    detail:
                      'Size tier: Large Standard. The best seller, B0B6B25BKW, packs to 6.6 × 5.7 × 1.7 in at 8.1 oz. It is light enough for Small Standard, but 1.7 in deep against that tier’s 0.75 in limit. $4.09 a deck, and the same on all three editions: a quarter of the price.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -mcAd('mount-cleverest').ratePct.central,
                    amount: mcAd('mount-cleverest').perUnit,
                    detail:
                      `MODELLED, not observed: about ${monthUsd(mcAd('mount-cleverest').monthlyUsd.central)} a month (${mcBand(mcAd('mount-cleverest').monthlyUsd)}), which is ${linePct(mcAd('mount-cleverest').ratePct.central)} of this line’s September revenue. Automatic campaigns, product targeting, Sponsored Brands and video are invisible to the method.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/mount-cleverest/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/mount-cleverest/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, returns, removals, inbound placement, the October 15 to January 14 peak fulfilment surcharge, software and owner pay, none of which is modelled. That surcharge falls on the three months that carry the year. A ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'flash-cards',
            label: '100 PICS flash cards',
            sharePct: 37.4,
            blocks: [
              {
                /* Read from a screenshot of an Alibaba search on 2026-10-11. A
                   fifth card, $5 for two decks of playing cards at a one-set
                   minimum, is left out: a one-unit price for a different
                   product (suppliers.json says so). */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a 100 PICS deck costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Guangzhou Shunhong Printing Co., Ltd', 'Verified · 10 yrs', '4.9★ from 18', '—', '500 pieces', '$0.35–0.88'],
                  ['Guangzhou Bonroy Cultural Creativity Co., Ltd', 'Verified · 9 yrs', 'No score shown', '450', '500 pieces', '$1.09'],
                  ['Yiwu Forever Print Paper Products Co., Ltd', 'Verified · 7 yrs', '4.8★ from 62', '—', '500 units', '$1.39–2.99'],
                  ['Dongguan Caijia Printing Co., Ltd', 'Verified · 1 yr', '5.0★ from 5', '—', '300 pieces', '$0.15–0.35'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', '$0.75'],
                ],
                note:
                  'Four verified Chinese printers from a search for “custom flash cards printing with case”, filtered to a 4.5+ supplier rating; none was marked as an ad. Their lowest prices — $0.35, $1.09, $1.39 and $0.15 — average $0.75. They quote paper boxes, so the 100 PICS plastic slide case is not priced in it, and a fifth result, two decks of playing cards at $5 for a single set, is left out as a different product.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one 100 PICS deck from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '11.0 × 7.7 × 3.2 cm, 0.150 kg', 'The listing’s own package size (B087MWB61Y, the US States deck)'],
                  ['Volume', '0.000271 cbm', 'The carton, in cubic metres'],
                  ['Rate', '$496.67 / cbm', 'Less-than-container-load, Shanghai → Los Angeles, door to door'],
                  ['Shipping, per deck', '$0.13', '0.000271 cbm × $496.67'],
                ],
                note:
                  'The same dated rate as the Mount Cleverest deck, read 28 September 2026. The deck is a quarter of the volume, which is the whole of the difference between $0.51 and $0.13; the blended figure uses each listing’s own box.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — what one 100 PICS deck costs in Amazon’s warehouse',
                noteColumns: [2],
                columns: ['Line', 'Per deck', 'From'],
                rows: [
                  ['Production', '$0.75', 'The Alibaba printers’ lowest prices, averaged — COGS table above'],
                  ['Tariff', '$0.15', 'ASSUMED: 20% of production, applied flat'],
                  ['Ocean freight', '$0.14', 'The September mix of boxes at $496.67/cbm; the US States deck alone is $0.13'],
                  ['Landed cost', '$1.04', 'What one deck costs before it sells'],
                ],
                note:
                  '$1.04 is 8.3% of the $12.47 average sale across September’s 100 PICS listings, the highest cost-of-goods share on the page, on a product with the same fulfilment fee as one that sells for $4.50 more.',
              },
              {
                type: 'margin',
                basis: { label: 'Average sale across the badged listings', value: 12.47 },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -8.34,
                    amount: 1.04,
                    detail: '$0.75 of production, $0.15 of tariff and $0.14 of ocean freight. The printing is the average of four Alibaba quotes; the plastic case and the tariff are not quoted.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: 1.87,
                    detail: 'Amazon’s published rate, a flat 15%, measured on every listing.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -31.95,
                    amount: 3.98,
                    emphasis: true,
                    /* Keepa product records read 2026-10-07: B087MWB61Y 110 × 77
                       × 32 mm, 150 g, pickAndPackFee 409 cents; the logos and
                       riddles decks 324 cents. September's badge-weighted
                       average is $3.98. */
                    detail:
                      'Size tier: Large Standard, on the best seller and on most of the range. The best seller, B087MWB61Y, packs to 4.3 × 3.0 × 1.3 in at 5.3 oz: tiny, but 1.3 in deep against Small Standard’s 0.75 in limit. $4.09 on it, $3.24 on two of the others. The biggest line here, and the one a $12.99 card deck cannot negotiate away.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -mcAd('100-pics').ratePct.central,
                    amount: mcAd('100-pics').perUnit,
                    detail:
                      `MODELLED: about ${monthUsd(mcAd('100-pics').monthlyUsd.central)} a month, the smallest line on the page. No sponsored placement of theirs was seen on any 100 PICS search read from New York.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/mount-cleverest/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/mount-cleverest/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, returns, removals, inbound placement and the peak fulfilment surcharge, none of which is modelled. The gap between this tab and the Mount Cleverest one is not the production cost, which is cents on both: it is that Amazon charges almost the same to pick a $12 deck as a $17 one.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* 🚨 The backend seed builds the profit and ad-spend series
                   from these SAME numbers (seed-mount-cleverest.ts COST_LINES:
                   cogs 7.82: production, tariff and freight on Amazon units
                   plus TikTok production, at September's mix).
                   Change one, change both. */
                type: 'margin',
                basis: { label: 'Average sale across both channels', value: MC_AD_ORDER },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -7.82,
                    detail:
                      'Production, tariff and ocean freight on Amazon units ($1.30 a Mount Cleverest deck, $1.04 a 100 PICS deck, and the deck’s $0.66 printing carried over to the SMART CARDS, which have no quote of their own), and $0.66 of production on each TikTok order. See each product’s tab for the parts, the carton and the rate behind it.',
                  },
                  {
                    label: 'Marketplace and creator fees',
                    pct: -14.83,
                    detail:
                      'Amazon’s flat 15% referral fee, and on TikTok Shop UK a 5% referral fee, 50p an order and a 9% commission on the sales creators made. The Amazon rate is measured; the TikTok rates come from one published summary, and another reports 9% for the referral fee.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment and TikTok shipping',
                    pct: -27.02,
                    detail:
                      'Size tier: Large Standard on the Amazon best seller and on most of the range; Small Standard on the SMART CARDS. $2.58 to $4.09 a unit, which at September’s mix is 26.7% of revenue, nearly twice what Amazon’s referral fee is worth. The rest is $3.50 a TikTok unit of outbound shipping, which nobody quoted.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -MC_AD.ratePct.central,
                    detail:
                      `MODELLED, and the whole of it is in the Advertising section: the visible Amazon keyword spend, about ${monthUsd(MC_AD.monthlyUsd.central)} a month (${mcBand(MC_AD.monthlyUsd)}). TikTok creator commissions are in the fees line, and the TikTok ads that began in September 2026 have no published spend.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/mount-cleverest/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/mount-cleverest/advertising/' },
                    ],
                  },
                ],
                note:
                  'September’s two-channel mix. Every month on the chart is built from its own channel mix, Amazon at its September rate and the TikTok shop from its own units, and the two stay within half a point of this figure. Before storage, returns, removals, inbound placement, UK duty and freight, the peak fulfilment surcharge, VAT, software and owner pay: a ceiling on profit, not profit.',
              },
            ],
          },
        ],
      },
      {
        type: 'table',
        id: 'tiktok-shop-economics',
        caption: 'TikTok Shop UK, November 2025 — what the channel keeps',
        noteColumns: [2],
        columns: ['Line', 'Month', 'Basis'],
        rows: [
          ['Sales', '$35,741', 'Kalodata’s estimate for the “100 PICS” brand shop, 2,603 units'],
          ['Production', '−$1,718', '$0.66 a unit, the Mount Cleverest deck’s Alibaba average'],
          ['Referral fee, 5%', '−$1,787', 'Published UK rate; one source reports 9%'],
          ['Order fee, 50p', '−$1,721', 'Published UK merchant-fulfilled fee, one order per unit assumed'],
          ['Creator commission, 9%', '−$1,530', 'Kalodata’s rate on its $17,002 of affiliate sales'],
          ['Outbound shipping', '−$9,111', 'ASSUMED $3.50 a unit; nobody quoted it'],
          ['Kept', '$19,874', '55.6% of sales, before duty, inbound freight, VAT and returns'],
        ],
        note:
          'A modelled month, built from that month’s own units and affiliate sales. No UK import duty or freight to the UK is priced, and Kalodata does not say whether its sales figure includes VAT, so every line is a ceiling. The shop sold nothing in January to August 2026 and $941 in September, so the channel is a Christmas quarter and little else.',
      },
      {
        type: 'prose',
        text:
          'The softest figures in the model, in order: the TikTok shipping and fee lines, which are one published summary and a placeholder; the tariff, which depends on a country of origin nobody has established; the freight lane, which is priced for China and is wrong for a UK or EU printer; and the production cost, which is what public quotes say a deck like this costs and not Poptacular’s own bill — the triangular box and the plastic case would add to it. None of them moves the picture much: the printing is cents, and Amazon’s fees are most of what a deck costs.',
      },
      {
        type: 'callout',
        text:
          'The margin block and the profit series on the chart are one model, so they cannot disagree with each other. What neither can do is replace an invoice: nobody at Poptacular has shown us a printing bill, a freight bill or an advertising bill, and only Amazon’s two fees here are read from Amazon.',
      },

      { type: 'section', id: 'growth', title: 'Growth', group: 'Where demand comes from' },
      {
        type: 'lede',
        text:
          'One new deck, three Christmases, each about double the last, and nothing else added since. The growth is a product finding its season, not a catalogue being built.',
      },
      {
        type: 'prose',
        text:
          'In September 2023, the first month the data shows, the whole storefront sold $25,969. Three years later September sold half as much again and the November peak had gone from $105,480 to $410,597. The older ranges, 100 PICS flash cards and SMART CARDS listed between 2019 and 2024, are most of the listing count and a minority of the growth. The Mount Cleverest editions, which list from July 2022 and July 2023, are more than half of a quiet month and a larger share of a loud one.',
      },
      {
        type: 'prose',
        text:
          'The Original edition has done it on reviews and rank rather than a bought push. It has 1,829 reviews at 4.6 stars, a rank near the top 250 of Toys & Games, and organic positions between first and sixth on the two narrow terms that describe it. A trivia deck that families give each other is a product that gets reviewed in December and bought again the next December, which is consistent with each Christmas being about twice the last, and is also an inference: nothing read shows who the buyers are.',
      },
      {
        type: 'prose',
        text:
          'A second channel arrived late and small. The UK TikTok Shop first shows sales in October 2025 and made an estimated $35,741 that November, four times its next-best month and less than a tenth of Amazon’s. It sold nothing in the eight months after. The Original’s listing there carries a launch date of April 2024, so either it sat dormant for eighteen months or Kalodata did not see it. Either way, the shop did not cause the 2023 Amazon ramp: it did not exist in the data then.',
      },
      {
        type: 'prose',
        text:
          'What has not grown is the range. The newest storefront listing is dated 30 May 2024, the last new edition of the deck listed in July 2023, the Instagram account posted last in November 2025, and the app was last updated in September 2025. Whether that is a business choosing to harvest one product or one that has not had the time to build a second is not something the public record can say.',
      },
      {
        type: 'callout',
        text:
          'A deck that sells 48% of its year in one month is one stock decision a year. The business has to fund and hold the inventory for November in the quietest months, and the data gives no sign of when, how or from whom.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-07, read at New York 10001. */
        type: 'strategy',
        label: MC_AD.strategy,
        points: [
          'None of the modelled ad spend, about $49 a month, is on the Mount Cleverest name, and none of it is on the fourteen biggest generic searches: not “card games”, “travel games”, “card games for adults” or “adult games”. They rank there without paying, and on “mount cleverest game” they are #1.',
          'The ads Jungle Scout saw sit on sixty-eight long-tail phrases, about a twentieth of the 1,485 searches their listings show up on. A New York read of sixteen searches the same day found no sponsored Mount Cleverest card on any of them, and two sponsored SMART CARDS cards on the search for that name.',
          'TikTok is a separate story: the UK shop’s sales run about 46% through creators on a 9% commission, and TikTok’s ad library shows 151 ads under the company’s name, all from 24 September 2026.',
          'Modelled from outside the account, so a floor: Amazon automatic and product-targeting campaigns, Sponsored Brands and video are invisible to it.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: MC_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the listings of the Mount Cleverest and 100 PICS ranges that sold in September: exact-match monthly searches and the best organic position any of them held. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position; elsewhere, the best sponsored rank among them. Cost per click is Amazon’s own suggested exact bid. Ad spend a month is the modelled cost on that keyword: these fifty carry ${monthUsd(topSpend(MC_TOP_KEYWORDS))} of the ${monthUsd(MC_AD.monthlyUsd.central)}, and the rest sits on smaller searches — every one of them is in the next table. Positions move by the hour; this is one reading.`,
      },
      adKeywordsTable(MC_AD_KEYWORDS, MC_AD_KEYWORDS_TOTAL, MC_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'What carries the business is organic. The Original sits first on “mount cleverest game” and within the first fifty on most of the big card-game searches, with no ad of theirs on any of them in Jungle Scout’s window or in a New York read; Amazon would charge about $0.46 to $1.71 a click to try. The brand name itself draws about 2,800 searches a month and a conversion rate near 14% in Jungle Scout’s panel, which is the footprint of an audience that arrives already knowing the name. The modelled spend is tiny next to the sales it sits beside, and on a business that sells almost half its year in November, an October read says little about what November does.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(MC_AD.monthlyUsd.central)} a month, ${linePct(MC_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 68 of 1,485 keywords, about 5% of their searches — Jungle Scout share of voice; none for Mount Cleverest on 15 of 16 searches read from New York, and two SMART CARDS ads on the sixteenth, “smart cards”',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand: there was no sponsored-dominant row here to measure one. It is a floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off. Nobody publishes the bill.',
          },
          {
            label: 'TikTok ads — the UK and EU library',
            href: 'https://library.tiktok.com/ads?region=all&adv_name=Poptacular',
            value: '151 ads, from 24 Sep 2026',
            counted:
              '24 first shown in September and 127 in October · median run one day · 131 still showing 1–6 Oct · 146 reached under 1K people, 2 reached 1K–10K and 3 reached 10K–100K',
            flag: true,
            note:
              'Matched on the legal advertiser name, so a creator or agency running ads under another name would not show, and US ads are not in this library at all. No spend is published, so none is in the margin. Nothing under this name before the 24th, so the 2023 relaunch was not TikTok ads from the company’s own account.',
          },
          {
            label: 'TikTok Shop creators — commission, not ads',
            href: 'https://www.kalodata.com/open-center/home',
            value: '≈ 46% of the UK shop’s year',
            counted:
              'Kalodata: $25,038 of the shop’s $54,122 over twelve months came through affiliate creators, 44 of them, at a 9% commission rate; 20 videos and 19 livestreams',
            note:
              'A third-party estimate. It is paid only when a creator sells, so it behaves like advertising without being booked as it, and it sits in the Margin breakdown’s fees line, about $2.2K over the year, not in the Ad spend table.',
          },
        ],
      },
      {
        /* The Margin breakdown's advertising lines, row for row, built from MC_AD.
           check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...MC_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${mcBand(p.monthlyUsd)}`]),
          ['Total — the Whole brand line', monthUsd(MC_AD.monthlyUsd.central), linePct(MC_AD.ratePct.central), lineUsd((MC_AD_ORDER * MC_AD.ratePct.central) / 100), `Modelled: ${mcBand(MC_AD.monthlyUsd)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising, line for line: each product’s tab uses its own row, and the Whole brand tab the last. Per sale is the share of that product’s price, or of the $14.58 average sale. TikTok’s creator commission is in the fees line and TikTok’s ad spend is not published, so neither is here.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text:
          'There is an audience off Amazon, and it was built for phone apps. One small slice of it reaches a UK TikTok Shop, and the rest is not measured.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'Poptacular’s best-known product is the 100 PICS Quiz app, a picture-guessing game. A tracker page puts it past 15 million Google Play downloads and the company’s ten apps at about 20 million in total, a figure read from a search summary because the page itself refused the fetch, so it is third-party and a range rather than a count. The Mount Cleverest app is smaller and shows what the audience looks like: 383 ratings at 4.9 stars, free with ads and in-app purchases, and updated as recently as September 2025.',
      },
      {
        type: 'prose',
        text:
          'The brand’s Instagram, @100picsquiz, is verified and has 25.6K followers, bills itself as the home of 100 PICS and Mount Cleverest, and last posted on 7 November 2025. Its TikTok and Facebook pages are linked from the brand’s own store and returned a login page, so their size is not known. Site traffic was not measured at all: no free source gives a defensible visit count for a store this small, and a number put here would be a guess.',
      },
      {
        type: 'facts',
        items: [
          { label: 'App downloads', value: '15M+', note: 'The 100 PICS Quiz app on Google Play · a tracker page, third-party, read via a search summary' },
          { label: 'Instagram', value: '25.6K', note: '@100picsquiz · verified · read 7 Oct 2026 · last post 7 Nov 2025' },
          { label: 'Mount Cleverest app', value: '4.9★ / 383', note: 'Apple App Store · released 15 Oct 2014 · updated 29 Sep 2025' },
          { label: 'TikTok Shop UK', value: '$53K', note: 'Kalodata estimate, twelve months to Sep 2026 · $35.7K of it in Nov 2025 · opened Oct 2025' },
          { label: 'TikTok', value: '5,065', note: '@100pics followers · 172 videos · read 7 Oct 2026' },
          { label: 'Site visits', value: 'Not measured', note: 'No defensible free source for a store this size; nothing is estimated here' },
        ],
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — mount-cleverest.com',
            href: 'https://mount-cleverest.com/',
            value: 'Three ranges',
            note:
              'Branded the Poptacular Store. Sells Mount Cleverest, 100 PICS and SMART CARDS, links its Instagram, TikTok and Facebook, and says its products are also on Amazon UK. Its prices and sales were not compared or measured.',
          },
          {
            label: 'Mobile apps',
            href: 'https://apps.apple.com/app/id924417686',
            value: '~20M downloads',
            flag: true,
            note:
              'The audience that predates the cards by years. App revenue is not published and nothing read shows whether the apps point to the Amazon listings. The downloads figure is a third-party summary and was not checked at the source.',
          },
          {
            label: 'TikTok Shop UK — “100 PICS”',
            href: 'https://www.tiktok.com/@100pics',
            value: '≈ $53K a year, estimated',
            flag: true,
            note:
              'A brand shop that first sells in October 2025: $9,003, then $35,741 in November, $7,482 in December, nothing from January to August 2026 and $941 in September. 20 videos, 19 livestreams and 44 creators sell for it, and about 46% of its sales run through creators. The profile bio says the games are on TikTok Shop. Kalodata is an estimate and the shop’s own dashboard would settle it. The US listings it also found belong to other sellers.',
          },
          {
            label: 'Instagram — @100picsquiz',
            href: 'https://www.instagram.com/100picsquiz/',
            value: '25.6K followers',
            note: 'Verified, 24 accounts followed. Last post 7 November 2025, a video clip, at the start of the year’s biggest month.',
          },
          {
            label: 'TikTok and Facebook',
            href: 'https://www.tiktok.com/@100pics',
            value: 'Exist, unsized',
            note: 'TikTok @100pics and Facebook /100Pics, both linked from the store. Neither page gave a follower count to an unauthenticated read.',
          },
          {
            label: 'Walmart.com',
            href: 'https://www.walmart.com/ip/18914022012',
            value: 'Listed, seller unknown',
            note: 'Mount Cleverest editions appear on Walmart. The page served a bot check, so nobody could read whether Poptacular or a reseller sells them.',
          },
          {
            label: 'eBay',
            href: 'https://www.ebay.com/str/melissan33',
            value: 'Resellers',
            note: 'Third-party sellers list the Original at $4.96 to $15.34 with bulk discounts, which is below the Amazon price. They look like resellers rather than the brand.',
          },
          {
            label: 'Amazon UK',
            value: 'Claimed, not found',
            note: 'The brand’s site says it sells on Amazon UK and amazon.co.uk/100pics is linked from poptacular.com. The seller id returns no account on Amazon UK, so the listing, if it exists, is not under this seller.',
          },
          {
            label: 'Reviews and press',
            href: 'https://www.game-2-play.com/blog/mount-cleverest-game-review/',
            value: 'One blog',
            note: 'A games blog published an affiliate-link review of the Original and Movie editions on 13 October 2025. No traditional press was found.',
          },
        ],
      },
      {
        type: 'callout',
        text:
          'The brand is not an Amazon start-up and cannot be copied as one: the cards sit on top of an audience that took a decade and a games studio to build. That is the difference between this profile and most of the others on the site, and it is the part of the economics that does not appear in any cost line.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'POPTACULAR LTD', note: 'English private limited company · 08530431 · formerly 100 PICS LIMITED' },
          { label: 'Incorporated', value: '15 May 2013', note: 'Companies House' },
          { label: 'Registered office', value: 'London WC2R', note: '7 Savoy Court, Strand' },
          { label: 'Directors', value: '2', note: 'James Emile Dubern and Julian Stocker, both appointed on incorporation' },
          { label: 'Amazon seller', value: 'A26BYIJHPZYRKQ', note: 'Poptacular Ltd · first tracked 15 Dec 2019' },
          { label: 'Seller feedback', value: '97%', note: 'Over 484 lifetime ratings · read 6 Oct 2026', info: 'sellerFeedback' },
          { label: 'First listing', value: '16 Jul 2019' },
          { label: 'Accounts', value: 'Full, to March 2025', note: 'Total exemption full accounts, filed 28 Oct 2025' },
        ],
      },
      {
        type: 'prose',
        text:
          'The company is a registry record with two directors, who have held the office since the day it was incorporated, and no person with significant control: it has filed the statement that it knows of no registrable person. It was incorporated under the name of its first app, renamed Poptacular within ten months and has filed accounts every year since 2018. The registered office is a Strand address and the business moved between London and Hampshire between 2018 and 2021. Nobody at the company has spoken to us, and every date here is read from a registry, an app store or a marketplace rather than told to us.',
      },
      {
        type: 'prose',
        text:
          'The filed accounts are six-page total-exemption full accounts and were not opened for a turnover figure. The Amazon seller account is registered to the London address, which makes this a British company selling into the US through FBA. The same seller exists on Canada with 7 ratings and does not appear on the UK or Germany, despite the brand’s own store saying it sells on Amazon UK.',
      },
      {
        type: 'prose',
        text:
          'Two further loose ends. The Amazon manufacturer string reads “Poptacular”, and a search on it returns 24 listings that are not in the storefront; they were not opened, so the catalogue here may be short by some. And a company page for the brand’s trademarks exists under the owner’s name, but it refused the fetch, so what is registered and for what is unknown. Poptacular also advertises “Prunella”, a service that automates Amazon ad bids, which suggests a team that knows the ad tools well and still buys little.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model, a 2.6 base multiple moved by what the public record supports, applied to trailing-twelve profit. It prices Amazon US and the UK TikTok Shop as one operation.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'The own store, Walmart, eBay and every other channel are excluded because nobody read their sales, and the apps are not a card business and are not counted. The TikTok Shop is in, from a third-party estimate, and is what earns the off-Amazon line. The profit being multiplied is built channel by channel and month by month, Amazon at September 2026’s rate, on a production cost nobody has quoted and a tariff nobody has established, before storage, returns and the peak fulfilment surcharge. On that basis it is an upper bound on a business that has to fund a year of inventory to catch a few weeks of sales.',
      },
      {
        type: 'prose',
        text:
          'The positives are age and reputation: a catalogue first listed in 2019, ten thousand reviews across it, an average of 4.6 stars, and an enrolled brand store. The negatives are the shape of the year and the reach of the business. November alone is nearly half of the trailing twelve, about 94% of the measured trailing twelve is on Amazon US, and the company has not launched a new listing in two years.',
      },
      {
        type: 'prose',
        text:
          'The whole figure rests on assumptions that are not the data’s. The production cost is public quotes for a similar deck rather than their bill, and the tariff is put in, not read. Sourcing, catalogue shape and differentiation are questionnaire answers taken from the public record, and the differentiation level is probably the low side, because the question set is the company’s own content and nothing read says how hard it would be to copy. Brand Registry is firmer, because Amazon gates the brand store behind enrolment. All of these are the first things to put to the owner.',
      },

      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text:
          'The least you would spend to find out whether the trivia deck sells, before you commit to a full launch. The 100 PICS flash cards are not tested: too little is known about how their competitors sell to set a pass line.',
      },
      /* The validation test (build-ecom-biz-page §3a), read off the published
         estimate. 🚨 The Mount Cleverest deck ONLY, theme "trivia" (owner's call,
         2026-10-11): on the 100 PICS searches Jungle Scout has one competing
         listing with 50+ clicks, and it recorded no sales, so there is no
         market conversion to pass against. Highmark leaves its journals out
         the same way. */
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },

  'bizzikins': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-bizzikins-headline.ts, from
       waithowmuch-research research/bizzikins/headline.json — and the page
       reads them from the row alone. This entry carries only the image beside
       them.
       🚨 The snapshot is SEPTEMBER 2026, the last whole month of a THREE-month
       series (July to September). October's badge read is a partial month and
       is not a point. Every "Read" stamp below is September's. */
    headline: {
      /* Rosie the Gardener: the best seller, 200 of September's 550 units,
         tied with Annie. */
      image: {
        src: bizzikinsPhoto('B0GT793W2T'),
        alt: 'Rosie the Gardener, the best-selling Bizzikins doll: a soft fabric doll with orange hair and a teal headband, her body opened like a book to show a garden scene with felt vegetables, a watering can and a snail',
      },
    },

    /* 🚨 NO `valuation` entry, on purpose. Three months of series is under the
       twelve the model needs (SKILL §0), so the page carries no valuation
       section and no valuation.inputs. */

    facts: [
      /* Four dolls plus seven bundles and gift sets, the eleven ASINs of
         adspend.inputs.json brandAsins. The parent listing is not a SKU. */
      { label: 'SKUs', value: '11', note: 'Four dolls and seven bundles or gift sets; only the dolls carry a sold badge', info: 'skus' },
      /* The hero's own breadcrumb (Keepa categoryTree, B0GT793W2T). */
      {
        label: 'Category',
        value: 'Toys & Games › Stuffed Animals & Plush Toys › Plush Interactive Toy Figures',
        note: 'The four dolls. The bundles sit under Dolls & Accessories › Playsets',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '87', note: 'On the hero listing', info: 'reviews' },
      { label: 'Product rating', value: '4.5★', note: 'Hero listing', info: 'rating' },
      { label: 'Seller feedback', value: '98%', note: 'Over 40 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own brand and characters on listings nobody else sells; who makes the dolls is not known — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* 🚨 An inference, and the nearest of the six shapes rather than a clean
         fit. All measured sales are four characters of one doll at one price,
         with no single hero (the two best sellers take 36% each), which is what
         "concentrated bets" describes; but they are four versions of one
         product, not four products. */
      { label: 'Catalogue', value: 'Concentrated bets, few SKUs', note: 'Four characters of one doll share all measured sales — an inference, and the nearest fit', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 2 and an inference. The doll that opens into a book is a
         real design, but the only supplier quote read was for "this sort of
         doll" from a general factory, which is what level 2 describes: a rival
         asks the same kind of factory for a variant. Nothing read says the
         design is protected. */
      { label: 'Differentiation', value: 'Level 2', note: 'A distinctive doll, but quoted by a general factory and nothing read shows it is protected — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note:
          'The only channel with a number behind it, and the whole of the revenue on this profile. The seller holds the whole buy box on all four dolls and Amazon sells none of them.',
      },
      /* 'unchecked', not 'no': the seller account exists on Canada with no
         ratings, and nobody read a Canadian listing. */
      'amazon-international': {
        status: 'unchecked',
        note:
          'A seller account exists on Amazon Canada with no ratings, and none was found on the UK or Germany. Nobody read a Canadian listing, so a small Canadian trade would not show.',
      },
      'own-store': {
        status: 'no',
        note:
          'alenibrands.com is the company’s own site and a brochure: it has no checkout, and Similarweb shows no measurable traffic. The Meta ads that began in October send people to Instagram, not to a shop.',
      },
      // 'tiktok-shop', 'other-marketplace' and 'wholesale-out' left unchecked:
      // nobody looked. The doll ships in a retail-style box, which says nothing
      // about a shelf.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'The seller record shows FBA, and the margin charges Amazon’s pick-and-pack fee on every doll.',
      },
      // 'fbm' left unchecked: nothing read splits the listings between FBA and
      // FBM, though the dolls sit with a single seller on the buy box.
      'vendor-1p': { status: 'no', note: 'Amazon does not sell the dolls itself.' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note:
          'Their own brand and characters on listings nobody else sells. That a factory makes them to their design is an inference: the one quote read was for a similar doll, not theirs.',
      },
      // 'manufacturer' left unchecked: the Amazon manufacturer string reads
      // "Aleni Brands", which is a company name, not a factory.
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/Bizzikins, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'Aleni Brands, a Fort Lauderdale toy company, sells four soft dolls that open into busy books for toddlers, almost entirely on Amazon US. The brand launched in March 2026, so the record it leaves is short.',

    blocks: [
      { type: 'heading', text: 'A doll that opens into a busy book' },
      {
        type: 'prose',
        text:
          'Each Bizzikins is a 15-inch fabric doll whose body unzips into a soft activity book for ages one to four: Rosie the Gardener, Annie the Pet Sitter, Poppy the Forest Ranger and Max the Astronaut, each with its own scene of felt pieces, ribbons, snaps and buttons. The four sell at one price and, so far as anyone outside can tell, cost the same to make, which is why this profile has one margin rather than four.',
      },
      {
        type: 'prose',
        text:
          'The catalogue also carries a line of bundles and gift sets that combine the dolls. None of them has a sold badge, which means each sells under roughly fifty a month, so they add nothing measurable and are left out of the revenue below.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The four dolls' own listing photos, in
         our bucket (products/bizzikins/). */
      {
        type: 'images',
        items: [
          {
            src: bizzikinsPhoto('B0GT793W2T'),
            alt: 'Rosie the Gardener: an orange-haired doll in a teal headband, opened to a garden scene with felt vegetables, a watering can, a wheelbarrow and a snail',
          },
          {
            src: bizzikinsPhoto('B0GT6RNPNZ'),
            alt: 'Annie the Pet Sitter: a brown-haired doll with a blue bow, opened to a scene of a window, a cat with yarn, a dog in a bath and a pet bed',
          },
          {
            src: bizzikinsPhoto('B0GSC67673'),
            alt: 'Poppy the Forest Ranger: a red-haired doll in pigtails, opened to a woodland scene with a red jeep, a hedgehog, a log and felt fish in a pond',
          },
          {
            src: bizzikinsPhoto('B0GT7XBBDN'),
            alt: 'Max the Astronaut: a brown-haired boy doll, opened to a navy space scene with a rocket, the Earth, a shooting star and a flying saucer',
          },
        ],
        caption: 'The four characters as the brand’s own Amazon listings show them: Rosie, Annie, Poppy and Max.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text:
          'A March launch, three prices in six months, a July peak and an October award that arrived after the volume had already fallen.',
      },
      {
        type: 'timeline',
        items: [
          {
            when: '12 Mar 2026',
            tag: 'Amazon',
            what: 'The first doll is listed',
            detail: 'Poppy the Forest Ranger, by the listing date Keepa holds.',
          },
          {
            when: '19 Mar 2026',
            tag: 'Amazon',
            what: 'Rosie, Annie and Max follow',
            detail: 'The other three dolls carry one date, and so does the first bundle listing.',
          },
          {
            when: '24 May 2026',
            tag: 'Amazon',
            what: 'The first price on record: $29.99',
            detail: 'The first price Keepa has for the dolls, identical on all four, and the launch price the press release names as the MSRP.',
          },
          {
            when: '11 Jun 2026',
            tag: 'Brand',
            what: 'The launch press release',
            detail: 'Announces the dolls “on Amazon” at a $29.99 MSRP in four designs, quotes the CEO and promises more characters later in 2026. The copy read is a rewrite of the wire release.',
          },
          {
            when: '4 Jul 2026',
            tag: 'Amazon',
            what: 'The price rises to about $35',
            detail: '$34.99 to $35.00, on all four dolls at once.',
          },
          {
            when: '31 Jul 2026',
            tag: 'Amazon',
            what: 'The first whole month of sold badges',
            detail: 'Amazon prints “bought in past month” on all four dolls, which means each sells at least about fifty a month. Together they read 1,000 units, the highest month on record, and the series starts here.',
          },
          {
            when: '9 Sep 2026',
            tag: 'Amazon',
            what: 'The price rises to $37.50',
            detail: 'The third price the dolls have carried, again the same on all four.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '550 units, down from 1,000 in July',
            detail: 'A fall of 45% in two months while the price rose 7%. Nothing read says what drove it.',
          },
          {
            when: '1 Oct 2026',
            tag: 'Brand',
            what: 'A Good Housekeeping 2026 Toy Awards win',
            detail: 'From a company-issued release, naming ages 18 months to 4 years. It lands after the decline above, so it cannot have caused it, and any lift it brings is not in the data yet.',
          },
          {
            when: '2 Oct 2026',
            tag: 'Advertising',
            what: 'Meta ads begin',
            detail: 'Three video ads, started on 2, 5 and 7 October and all pointing at the Instagram profile. Meta publishes the dates and never the spend.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Three months is all the badge history there is, and it tells one story: 1,000 units in July, 900 in August and 550 in September, down 45% while the price crept up from about $35 to $37.50. The award came after the fall and the ads after the award, so neither explains it. It could be a launch spike fading, a stock-out or a quiet summer, and a sold badge alone cannot tell them apart. The reads of their advertising do not show a spend that was cut either, but they are single readings taken in October.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup only: the account exists
           with no ratings, and no Canadian listing was read. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings; no listing was read' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further, so a small Canadian trade would not show here.',
      },
      {
        /* September's badge floor × the $37.50 buy box, so the rows sum to the
           2026-09 revenue row exactly (check-profile asserts it). Photos are
           the bucket copies. The unbadged bundles are NOT itemised: they carry
           no sales to show. */
        type: 'breakdown',
        intro:
          'Four characters at one price. Rosie and Annie each take over a third of the month, Poppy half of that and Max under a tenth.',
        items: [
          { name: 'Rosie the Gardener', asin: 'B0GT793W2T', image: bizzikinsPhoto('B0GT793W2T'), listed: '2026-03-19', sold: 200, price: 37.5, revenue: 7500 },
          { name: 'Annie the Pet Sitter', asin: 'B0GT6RNPNZ', image: bizzikinsPhoto('B0GT6RNPNZ'), listed: '2026-03-19', sold: 200, price: 37.5, revenue: 7500 },
          { name: 'Poppy the Forest Ranger', asin: 'B0GSC67673', image: bizzikinsPhoto('B0GSC67673'), listed: '2026-03-12', sold: 100, price: 37.5, revenue: 3750 },
          { name: 'Max the Astronaut', asin: 'B0GT7XBBDN', image: bizzikinsPhoto('B0GT7XBBDN'), listed: '2026-03-19', sold: 50, price: 37.5, revenue: 1875 },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times the price in effect, so every row is a floor. The bundles and gift sets carry no badge and are counted as zero, not itemised.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor, built from Amazon’s sold badge priced at each month’s end price: $35.00 in July and August and $37.50 in September. Pricing every month at the latest price would have overstated the first two by 7%.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Amazon is the business. The company’s own site is a brochure, and the paid social that began in October points at Instagram rather than at a shop.',
      },
      {
        type: 'prose',
        text:
          'Everything measurable here happens on one marketplace, through one seller account, on four listings that Amazon groups under a single parent. That is a thin base to read a business from: one account with 40 ratings, one price, one factory quote. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of a $37.50 doll, roughly a third is left once the factory, the tariff, the freight and Amazon’s two fees are paid, and the factory price behind that rests on a single quote.',
      },
      {
        type: 'prose',
        text:
          'All four characters share a price and are assumed to share a cost, so there is one margin, built bottom up. The factory figure is one quote, relayed by the researcher for “this sort of doll”: $8.50 a piece at 100 and $5.40 at 500. The supplier is Dongguan Youmee Toys, a year-old Alibaba account rated 5.0 over 26 reviews, but the quote was for a generic plush doll, not Bizzikins’ own felt-and-snap design. It is the weakest figure on the page, and everything under it moves with it.',
      },
      {
        /* Standard supplier columns. The supplier's profile came from a screenshot
           (2026-10-11): no per-listing sold count was supplied, so that cell says so. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what a doll costs to make',
        attribution: 'alibaba',
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
        rows: [
          ['Dongguan Youmee Toys Co., Ltd.', '1 year on Alibaba · manufacturer and trading company · reorder rate 23% · Guangdong', '5.0 (26 reviews)', 'Not supplied', '100 pcs', '$8.50, or $5.40 at 500 pcs'],
          ['Average lowest price — the cost to make used below', '', '', '', '', '$5.40'],
        ],
        note:
          'One supplier and one quote, relayed by the researcher for a similar doll and not seen by us. The profile is read from a screenshot: a year on Alibaba, 5.0 over 26 reviews, a 23% reorder rate and a reply within two hours. Its size (1,000+ staff, over $100M a year) is its own claim, and the sold count and lead time were not supplied. No Verified badge was visible. The lowest price, at 500 pieces, is the cost to make used below; at the 100-piece price the doll would cost $3.10 more to make. The tariff and the freight are their own lines.',
      },
      {
        /* The freight half of the landed cost, priced from the best seller's
           own carton (Keepa packageLength/Width/Height, B0GT793W2T) at the same
           dated LCL rate every profile uses — waithowmuch-research
           calibration/freight-rates.json, CN-USWC low end, read 2026-09-28. */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one doll from China',
        attribution: 'freightos',
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '40.9 × 23.3 × 10.0 cm, 0.49 kg', 'The best-selling doll’s own package size (B0GT793W2T, Rosie)'],
          ['Volume', '0.00953 cbm', 'The carton, in cubic metres'],
          ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
          ['Shipping, per doll', '$4.73', '0.00953 cbm × $497'],
        ],
        note:
          'The rate is the low end of Freightos’ band, $497 to $4,241 a cbm; the top prices express services a first order would not buy. It is door to door, customs clearance and delivery included, and excludes the duty, which is its own line. The other three characters ship in slightly different cartons, and a different product would ship at a different figure.',
      },
      {
        /* Derived from the two tables above and the tariff line below, so no
           source logo. Id is the target of the "Test it first" first-order link. */
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — production, duty and shipping, per doll',
        noteColumns: [2],
        columns: ['Line', 'Per doll', 'From'],
        rows: [
          ['Production', '$5.40', 'The one Alibaba quote, at 500 pieces — COGS table above'],
          ['Tariff', '$0.68', '12.5% of the cost to make, assuming China origin — the tariff line below'],
          ['Shipping', '$4.73', 'This doll’s carton at $497/cbm — shipping table above'],
          ['Landed cost', '$10.81', 'What one doll costs in Amazon’s warehouse, before it sells'],
        ],
        note:
          'The first three lines of the breakdown below, added up: $10.81 is 28.8% of the $37.50 price. It covers making the doll and getting it to the warehouse, not the Amazon fees on the sale, which are their own lines.',
      },
      {
        type: 'margin',
        basis: { label: 'Selling price', value: BZ_COST.price },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: bzPct(BZ_COST.factory),
            amount: BZ_COST.factory,
            emphasis: true,
            detail: 'The factory price from the one relayed quote, at 500 pieces. A generic doll’s price, so a floor on what their own design costs.',
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Tariff',
            pct: bzPct(BZ_COST.tariff),
            amount: BZ_COST.tariff,
            detail: '12.5% of the cost to make: toys under HTS 9503.00 from China carry no base duty and a 12.5% Section 301 tariff, from a secondary summary. A second source says 20%, which would cost about a point more. Assumes China origin and the factory price as the customs value.',
            links: [
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Shipping',
            pct: bzPct(BZ_COST.freight),
            amount: BZ_COST.freight,
            detail: 'Priced from the best seller’s own carton at a read sea-freight rate, door to door.',
            links: [
              { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            amount: BZ_COST.referral,
            detail: 'Amazon’s published Toys & Games rate, a flat 15%, as Keepa records it on the listing.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            /* Keepa on B0GT793W2T: 409 × 233 × 100 mm, 490 g (read 2026-10-06),
               fbaFees.pickAndPackFee 763 cents. 16.1 × 9.2 × 3.9 in, 17.3 oz. */
            label: 'FBA fulfilment',
            pct: bzPct(BZ_COST.fba),
            amount: BZ_COST.fba,
            emphasis: true,
            detail: 'Size tier: Large Standard. Measured on the best-selling doll (B0GT793W2T), a 16.1 × 9.2 × 3.9 in box at 17.3 oz: over 16 oz and over 15 in on the long side rules out Small Standard. Amazon’s pick-and-pack fee is $7.63, more than the factory charges for the doll.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -BZ_AD.ratePct.central,
            amount: BZ_AD.products[0].perUnit,
            detail: `Modelled, not observed: about ${monthUsd(BZ_AD.monthlyUsd.central)} a month, ${linePct(BZ_AD.ratePct.central)} of September’s revenue, on small specific phrases and their own name. A floor: it cannot see ads on product pages or automatic campaigns.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/bizzikins/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/bizzikins/advertising/' },
            ],
          },
        ],
        note:
          'Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit. The profit series uses this September breakdown for every month. July and August sold at $35.00, where the same costs leave about 32.1%, so those two months’ profit is about 3.5 points too generous.',
      },
      {
        type: 'prose',
        text:
          'The shape is the reverse of most products: moving the doll costs more than making it. Amazon’s fee and the sea freight together are more than twice the factory price, because both charge by the size of the box rather than by what is in it. The same logic makes a higher price valuable: the fees move with the box, not the price, so most of the step to $37.50 went to margin.',
      },
      {
        type: 'callout',
        text:
          'Profit here is a modelled ceiling on one unconfirmed factory quote, and the tariff is read from a secondary summary. The two together can move the margin by several points in either direction, and returns are not in it at all.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-11, read at New York 10001. */
        type: 'strategy',
        label: BZ_AD.strategy,
        points: [
          'About 36% of the modelled ad spend sits on their own name, “bizzikins” and “bizzikins doll”, and the other 64% on small specific phrases such as “airplane toddler travel essentials” and “montessori busy book 1 year old”.',
          'Of the fifteen biggest generic searches they pay on two. They do not buy “busy book for 1+ year old”, “travel toys for 1+ year old” or “soft dolls for toddlers 1-3”, where they rank between #30 and #59 without paying.',
          'Ads of theirs were seen on 10 of the 129 keywords their listings show up on, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside.',
          'Off Amazon, three Meta video ads began on 2, 5 and 7 October, after the snapshot month, and Google’s transparency centre shows none for alenibrands.com. Neither library publishes spend, so off-Amazon spend is unknown.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: BZ_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the four dolls: exact-match monthly searches and the best organic position any of them held, among the fifty biggest keywords where a listing ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(BZ_TOP_SPEND)} of the ${monthUsd(BZ_AD.monthlyUsd.central)} a month; the rest is under a dollar a keyword or on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(BZ_AD_KEYWORDS, BZ_AD_KEYWORDS_TOTAL, BZ_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, they own the search on their own name and place within the first fifty on a scatter of doll and travel phrases, mostly between #30 and #59. The biggest searches in their field, such as “busy book for 1+ year old”, sit at the bottom of that range, and competitors such as Exorany, EooCoo and CloudLawn hold the sponsored share on them.',
      },
      {
        type: 'prose',
        text:
          'A keyword read cannot say where the sales come from, only that it is not visibly this. Organic ranking, campaigns that target products or run automatically, the award and the reviews are all candidates, and the brand’s own Sponsored Products search-term report would settle it. The Meta ads are too new to have fed September.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(BZ_AD.monthlyUsd.central)} a month, ${linePct(BZ_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 10 of 129 keywords — Jungle Scout share of voice; a New York read of 17 searches',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because no row here was sponsored-dominant enough to measure one. It is a floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off.',
          },
          {
            label: 'Meta (Facebook and Instagram)',
            href: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=bizzikins&search_type=keyword_unordered&media_type=all',
            value: 'Spend unknown',
            counted: '3 active US video ads, started 2, 5 and 7 Oct 2026 · the page has 1,070 likes',
            note:
              'All three began after the September snapshot and after the 1 October award, so the margin carries none of it. They send people to the Instagram profile, not to a shop or to the Amazon listing. Meta publishes creative and dates, never the money.',
          },
          {
            label: 'Google Ads',
            href: 'https://adstransparency.google.com/?region=US&domain=alenibrands.com',
            value: 'None seen',
            counted: '0 ads for alenibrands.com in Google’s transparency centre',
            note:
              'The site is a brochure with no checkout and no measurable traffic, so a search ad would have nowhere to send anyone. TikTok’s ad library, YouTube and Amazon DSP were not read.',
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: only the existence and dates of the Meta ads could be read.',
      },
      {
        /* The Margin breakdown's advertising line, row for row, built from
           BZ_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...BZ_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${bzBand(p.monthlyUsd)}`]),
          ['Total — the margin line', monthUsd(BZ_AD.monthlyUsd.central), linePct(BZ_AD.ratePct.central), lineUsd((BZ_COST.price * BZ_AD.ratePct.central) / 100), `Modelled: ${bzBand(BZ_AD.monthlyUsd)}`],
        ],
        note:
          'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of the $37.50 price. Meta’s spend is unpublished and none of it is here.',
      },

      /* Owner's call, 2026-10-13: include the Instagram account and say no more
         than was read. Its follower count was not read, so it is not here. */
      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text: 'One Instagram account, and a company site that is a brochure.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'The brand’s own release for its Good Housekeeping award points to Instagram, @bizzikins, and to alenibrands.com. The site has no checkout and no measurable traffic on Similarweb; the dolls sell on Amazon. The three Meta video ads that began in October send people to the Instagram profile, not to a shop.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Aleni Brands, LLC', note: 'Fort Lauderdale, Florida' },
          { label: 'Amazon seller', value: 'A3EKQYT9R67Q1S', note: 'Aleni Brands' },
          { label: 'Address', value: '809 SE 5 Ct, Fort Lauderdale, FL', note: '33301, as Amazon’s seller record gives it' },
          { label: 'Founder and CEO', value: 'Ricardo Venegas', note: 'Quoted in the launch release; named on LinkedIn' },
          { label: 'Seller feedback', value: '98%', note: 'Over 40 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '12 Mar 2026' },
        ],
      },
      {
        type: 'prose',
        text:
          'Aleni Brands is a Florida company whose Bizzikins catalogue dates only from March 2026, and its own site says it is named after the founder’s children, Alexandra and Nicolas. It runs two other brands on its own site, Wobblies and Stackies, which were not looked for on Amazon. The launch release quotes Ricardo Venegas as CEO, and a LinkedIn result places him in Miami and Fort Lauderdale; that page was not opened, so nothing about his history is read here.',
      },
      {
        type: 'prose',
        text:
          'The seller account is 98% positive, but over only 40 ratings, against 87 reviews on a single doll. The same account exists on Canada with no ratings and does not appear on the UK or Germany. Nobody at the company has spoken to us, and every fact here comes from Keepa, a press release or the company’s own site.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. The published estimate is created by the
         owner's session (make-validation-launch.mjs); these blocks carry no
         data. landedHref points at the Margin breakdown's landed-cost table. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text:
          'The least you would spend to find out whether it sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch', landedHref: '/business/bizzikins/margin/#landed-cost' },
    ],
  },

  'gamblin-golf': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-gamblin-golf-headline.ts, from
       waithowmuch-research research/gamblin-golf/headline.json — and the page
       reads them from the row alone. This entry carries only the image beside
       them.
       🚨 The snapshot is SEPTEMBER 2026. The series runs from December 2023, but
       the product the margin describes, Scratch & Swing, has badges only from
       June 2026; the months before are the Roll and Play ball game. October's
       badge read is a partial month and is not a point. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/gamblin-golf/01430eb94ce4e58ba99655358d8d0c0c1f28eac620efd9f11989e29f58acaa79.png',
      /* Scratch & Swing: the best seller, and all of September's sales. */
      image: {
        src: gamblinPhoto('B0GNWNXFY1'),
        alt: 'The Scratch & Swing golf game: a dark green box printed with a gold "Scratch & Swing" wordmark and a cartoon gopher, beside three silver foil packs of scratch-off cards',
      },
    },

    /* 🚨 NO `valuation` entry, on purpose. The series has more than twelve
       months, but the trailing year is mostly months below Amazon's badge
       threshold for a product they have stopped pushing, plus four months of
       Scratch & Swing. A multiple on that would describe neither product. */

    facts: [
      /* The eight storefront ASINs (Keepa seller A3C12G0C3DENHY, storefront=1).
         Two more carry the brand string with no offer and are left out. */
      { label: 'SKUs', value: '8', note: 'One scratch-off game, one ball game, four ball packs and two tee packs; only the scratch-off game carries a sold badge now', info: 'skus' },
      /* The hero's own breadcrumb (Keepa categoryTree, B0GNWNXFY1). */
      {
        label: 'Category',
        value: 'Sports & Outdoors › Sports › Golf › Gift Sets',
        note: 'Both games. The ball packs sit under Golf Balls › Trick & Novelty Balls and the tees under On-Course Accessories',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '15', note: 'On the hero listing; the older ball game has 82', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Hero listing; the ball game reads 4.7', info: 'rating' },
      { label: 'Seller feedback', value: '83%', note: 'Over 6 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own brand and games on listings nobody else holds the buy box on; who prints them is not known — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      /* 🚨 An inference. All measured sales are one listing, with balls and tees
         beside it that sell under the badge threshold: a flagship with
         complements, not a set of concentrated bets. */
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One game carries every measured sale; balls and tees sit beside it — an inference', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 2 and an inference. The game is their own idea and its name is
         marked ™, but it is printed cards in foil packs and a box, which any
         card printer makes to order; nothing read says the format is protected. */
      { label: 'Differentiation', value: 'Level 2', note: 'Their own game and name, but printed cards any card printer can make — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, retail', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note: 'The only channel with a number behind it, and the whole of the revenue on this profile. The seller holds the buy box on Scratch & Swing alone and Amazon sells none of the catalogue.',
      },
      /* 'unchecked', not 'no': the seller account exists on Canada with no
         ratings, and nobody read a Canadian listing. */
      'amazon-international': {
        status: 'unchecked',
        note: 'A seller account exists on Amazon Canada with no ratings, and none was found on the UK or Germany. Nobody read a Canadian listing, so a small Canadian trade would not show.',
      },
      'own-store': {
        status: 'yes',
        note: 'gamblingolf.com is a Shopify store with a checkout: the game in 3, 6 and 9 rounds, single packs, balls, tees, caps and bundles. Its sales are not counted here.',
      },
      'wholesale-out': {
        status: 'yes',
        note: 'Golf Galaxy lists Scratch & Swing, and the ball packs are offered to shops on Faire. Neither publishes what it sells, so none of it is in the revenue.',
      },
      // 'tiktok-shop' and 'other-marketplace' left unchecked: a TikTok account
      // exists, and nobody looked for a shop on it. The Loop & Tie gifting
      // catalogue carries the game; it is a corporate-gift service, not a
      // marketplace, and goes in the prose only.

      // ── Fulfilment ────────────────────────────────────────────────────
      fbm: {
        status: 'yes',
        note: 'Scratch & Swing “ships from and is sold by Gamblin Golf”, with free delivery, so they post every order themselves. The margin charges their postage, not an FBA fee.',
      },
      fba: {
        status: 'yes',
        note: 'The older ball game sold through FBA in 2023 and 2024, and an FBA offer of theirs still sits on it. The product the margin describes does not use it.',
      },
      'vendor-1p': { status: 'no', note: 'Amazon sells none of the catalogue itself.' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and games, on listings no other seller holds the buy box on. Who prints them is not known.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/GamblinGolf, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'Gamblin Golf, a South Carolina company, makes betting games to play during a round of golf: a scratch-off card deck, and golf balls printed with dollar values to bet on. It sells on Amazon, from its own store and through golf retail.',

    blocks: [
      { type: 'heading', text: 'A scratch card for every hole' },
      {
        type: 'prose',
        text:
          'Scratch & Swing is a box of three foil packs, one per round, each holding nineteen scratch-off cards: one challenge for every hole and a bonus card for the nineteenth. A player scratches before teeing off and has to play the shot the card names, and the winner of the hole takes whatever was bet on it. It is the brand’s second game. The first, Roll and Play, is a dozen golf balls printed with $1 and $2, sold as a game: the winner of each hole takes the pot.',
      },
      {
        type: 'prose',
        text:
          'Around the two games sit packs of the dollar-printed balls, for men and women, and wooden tees in a box styled like a cigarette carton. None of those listings carries a sold badge, which means each sells under roughly fifty a month on Amazon, so they add nothing measurable to the revenue below.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The brand's own listing photos, in our
         bucket (products/gamblin-golf/). */
      {
        type: 'images',
        items: [
          {
            src: gamblinPhoto('B0GNWNXFY1'),
            alt: 'Scratch & Swing: a dark green box with a gold wordmark and a cartoon gopher, and three silver foil packs of scratch-off cards',
          },
          {
            src: gamblinPhoto('B0CFJXGS67'),
            alt: 'The Roll and Play game: a green box reading “Gamblin’ Golf — Stroke ’Til You’re Broke” with a gopher, and two golf balls printed with $1 and $2',
          },
          {
            src: gamblinPhoto('B0GP98MJRW'),
            alt: 'The Gentleman’s Tee Pack: a green and cream box styled like a cigarette carton, reading “Bet on your game” and “20 bamboo golf tees”',
          },
        ],
        caption: 'The scratch-off game, the ball game and the tee pack, as the brand’s own Amazon listings show them.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text: 'A ball game that sold at Christmas, nine quiet months, and a second game launched in February 2026 that sells in summer.',
      },
      {
        type: 'timeline',
        items: [
          {
            when: '13 Aug 2023',
            tag: 'Amazon',
            what: 'The first listing: the Roll and Play ball game',
            detail: 'A dozen balls printed with $1 and $2 and the rules for betting on them, sold through FBA at $37 to $43.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '700 sold in the first December',
            detail: 'The badge climbed from 50 in late November to 700 by 20 December, at about $37 a box.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '1,000 sold in the second December',
            detail: 'The highest month on record. Between the two Decembers the game sold under the badge threshold, or about fifty a month.',
          },
          {
            when: '5 Feb 2025',
            tag: 'Amazon',
            what: 'The badge disappears for nine months',
            detail: 'From February to October 2025 no listing reached Amazon’s badge, so each sold under roughly fifty a month. The ball game’s price fell to $26.99 that May.',
          },
          {
            when: '17 Feb 2026',
            tag: 'Amazon',
            what: 'Scratch & Swing is listed',
            detail: 'A scratch-off card game at $24, posted by the seller rather than through FBA.',
          },
          {
            when: '19 Feb 2026',
            tag: 'Amazon',
            what: 'Six more listings: balls and tees',
            detail: 'Dollar-printed balls in packs of 3 and 12, for men and for women, and wooden tees in cigarette-style boxes of 20 and 100.',
          },
          {
            when: '9 Jun 2026',
            tag: 'Web',
            what: 'Caps arrive on their own store',
            detail: 'Three pinstripe caps on gamblingolf.com, which Amazon does not carry.',
          },
          {
            when: '30 Jun 2026',
            tag: 'Amazon',
            what: 'Scratch & Swing’s first sold badge',
            detail: '200 bought in June: the first month the new game crossed Amazon’s threshold.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '500 sold in September',
            detail: 'Up from 100 in July and 300 in August, outside the holiday season the first game depended on.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The chart is two businesses in a row. Until early 2025 it is the ball game, selling hundreds in December and close to nothing in between; the zero months are months below Amazon’s badge, not months without a sale. From June 2026 it is Scratch & Swing, rising from 100 boxes in July to 500 in September. Of each of those months a modelled half is kept, after postage, Amazon’s fee and a cost to make that rests on one printer’s quote.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup only: the account exists
           with no ratings, and no Canadian listing was read. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings; no listing was read' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further, so a small Canadian trade would not show here.',
      },
      {
        /* September's badge floor × the $24 buy box, so the row sums to the
           2026-09 revenue row exactly (check-profile asserts it). The unbadged
           listings are NOT itemised: they carry no sales to show. */
        type: 'breakdown',
        intro: 'One listing carries the month. The ball game and the six ball and tee packs sell under the badge threshold.',
        items: [
          { name: 'Scratch & Swing scratch-off golf game', asin: 'B0GNWNXFY1', image: gamblinPhoto('B0GNWNXFY1'), listed: '2026-02-17', sold: 500, price: 24, revenue: 12000 },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times the price in effect, so the row is a floor. The other seven listings carry no badge and are counted as zero, not itemised.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor, built from Amazon’s sold badge priced at each month’s end price: about $37 for the ball game in 2023 and 2024, $26.99 in late 2025 and $24 for Scratch & Swing. Pricing every month at today’s $24 would have understated the first Christmas by a third. Their own store, Golf Galaxy and Faire are not in it.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text: 'Amazon is the measured part. A Shopify store, a golf retailer and a wholesale marketplace sell the same games, and none of them publishes a number.',
      },
      {
        type: 'prose',
        text:
          'They post Amazon orders themselves rather than sending stock to Amazon’s warehouses, so every sale carries their postage instead of an FBA fee, and the listing carries no Prime badge. Off Amazon, gamblingolf.com sells the game in three sizes alongside caps and bundles Amazon does not carry, Golf Galaxy sells it online, the ball packs are offered to shops on Faire, and the Loop & Tie corporate-gift catalogue includes the game. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of a $24 box, about half is left once postage, Amazon’s fee and the cost of making it are paid. Postage is the biggest cost by far; making the game, on one factory’s quote, is under a dollar.',
      },
      {
        type: 'prose',
        text:
          'There is one product to cost, because Scratch & Swing is every measured sale in September. A box is fifty-seven printed scratch-off cards, three foil packs and a printed tuck box, which card printers make to order. One Alibaba factory quoted that kit, from 500 boxes, and the cost to make rests on its price alone, by the owner’s decision; two more answered, but not in a form that could be priced like for like. The tariff leans on that price and the freight on the box it quoted.',
      },
      {
        /* waithowmuch-research research/gamblin-golf/suppliers.json
           (scratch-swing-deck, source accio), Accio run
           accio/scratch-swing-deck/2026-10-22T1413, verified against its
           screenshot. 🚨 ONE supplier priced (owner's call, 2026-10-22):
           Hongju (no screenshot; a rigid lid-and-base box) and Bonroy
           (ballpark ranges only) are excluded from the price. Store details
           (years, Verified, rating, reviews) were not captured for any
           supplier, so those cells are '—'. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what a box costs to make',
        attribution: 'alibaba',
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
        rows: [
          ['Dongguan KK Technology Co., LTD', '—', '—', '—', '500 sets', '$0.67–2.43'],
          ['Average — the cost to make used below', '', '', '', '', lineUsd(GG_COST.factory)],
        ],
        note:
          'One supplier, and the cost to make rests on it alone, by the owner’s decision. Dongguan KK quoted the whole kit — 57 scratch-off cards, three foil booster packs and a 15 × 9 × 4 cm tuck box, shrink-wrapped — EXW, with plates and setup in the price: $2.43 a set at 500, $1.62 at 1,000, $1.05 at 3,000, $0.88 at 5,000 and $0.67 at 10,000. The figure used is the 5,000 tier, nearest the brand’s yearly sales of about 6,000 at September’s pace. A sample set is $320. A second factory, Hongju, quoted a rigid lid-and-base box rather than a tuck box, and its price could not be checked against a screenshot; a third, Bonroy, gave only ballpark ranges. Neither is in the price. Requested through Alibaba’s sourcing agent (Accio) in October 2026 and checked against its screenshot of the reply; the suppliers’ store ratings were not read.',
      },
      {
        /* The freight half of the landed cost at the same dated LCL rate every
           profile uses — waithowmuch-research calibration/freight-rates.json,
           CN-USWC low end, read 2026-09-28. Keepa has no package dimensions
           for B0GNWNXFY1 and the listing gives only 8 oz, so the box is the
           15 × 9 × 4 cm tuck box Dongguan KK quoted (suppliers.json) — the
           size this table had assumed before the quote. */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one box from China',
        attribution: 'freightos',
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '15 × 9 × 4 cm, 0.23 kg', 'The tuck box the factory quoted; no package size is published for B0GNWNXFY1, and the listing gives 8 oz'],
          ['Volume', '0.00054 cbm', 'The carton, in cubic metres'],
          ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
          ['Shipping, per box', lineUsd(GG_COST.freight), '0.00054 cbm × $497'],
        ],
        note:
          'The rate is the low end of Freightos’ band, $497 to $4,241 a cbm; the top prices express services a first order would not buy. It is door to door, customs clearance and delivery included, and excludes the duty, which is its own line. The box is the size the factory quoted, not a measured Scratch & Swing box; a box twice the size would add 27 cents.',
      },
      {
        /* Derived from the two tables above and the tariff line below, so no
           source logo. Id is the target of the "Test it first" first-order link. */
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — production, duty and shipping, per box',
        noteColumns: [2],
        columns: ['Line', 'Per box', 'From'],
        rows: [
          ['Production', lineUsd(GG_COST.factory), 'One Alibaba supplier’s quote, at 5,000 boxes — COGS table above'],
          ['Tariff', lineUsd(GG_COST.tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
          ['Shipping', lineUsd(GG_COST.freight), 'The quoted box at $497/cbm — shipping table above'],
          ['Landed cost', lineUsd(GG_COST.landed), 'What one box costs to get to their door, before it sells'],
        ],
        note:
          'The first three lines of the breakdown below, added up: $1.33 is 5.5% of the $24 price. It covers making the box and bringing it in, not posting it to the buyer or Amazon’s fee, which are their own lines.',
      },
      {
        type: 'margin',
        basis: { label: 'Selling price', value: GG_COST.price },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: ggPct(GG_COST.factory),
            amount: GG_COST.factory,
            detail: 'One Alibaba factory’s quote for the whole kit — 57 scratch-off cards, three foil packs and a tuck box — at 5,000 boxes, EXW, plates and setup included. It rests on that one supplier.',
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Tariff',
            pct: ggPct(GG_COST.tariff),
            amount: GG_COST.tariff,
            detail: '20% of the cost to make, the rate this site uses for games made in China: Section 301 plus the reciprocal tariff, over a base near zero. The quoting factory is in China; where the brand prints the game today is not known, and printed in the US this line is zero.',
            links: [
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Shipping',
            pct: ggPct(GG_COST.freight),
            amount: GG_COST.freight,
            detail: 'The quoted tuck box at a read sea-freight rate, door to door.',
            links: [
              { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            amount: GG_COST.referral,
            detail: 'Amazon’s published Sports & Outdoors rate, a flat 15%.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            /* 🚨 Not an FBA line, and not labelled as one: the listing reads
               "Ships from and sold by Gamblin Golf" with free delivery (read
               2026-10-15; Keepa isFBA false, shipping 0). 8 oz item weight. */
            label: 'Postage — they ship it themselves',
            pct: ggPct(GG_COST.postage),
            amount: GG_COST.postage,
            emphasis: true,
            detail: 'The listing is merchant-fulfilled with free delivery, so the seller pays to post each box: USPS Ground Advantage at commercial prices runs $5.50 to $8.40 for a parcel under a pound, and an 8 oz box to a middle zone is about $6.25, plus a mailer. More than seven times the quoted cost to make the game.',
            links: [{ label: 'USPS Ground Advantage commercial prices, 2026', href: 'https://onlineshippingcalculator.com/guides/ground-advantage-retail-vs-commercial-guide' }],
          },
          {
            label: 'Advertising',
            pct: -GG_AD.ratePct.central,
            amount: GG_AD.products[0].perUnit,
            detail: `Modelled, not observed: about ${monthUsd(GG_AD.monthlyUsd.central)} a month, ${linePct(GG_AD.ratePct.central)} of September’s revenue, most of it on scratch-off searches and their own name. A floor: it cannot see ads on product pages or automatic campaigns.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/gamblin-golf/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/gamblin-golf/advertising/' },
            ],
          },
        ],
        note:
          'Before returns, packing labour and overhead, none of which is modelled: a ceiling on profit, not profit. The profit series uses this September breakdown for every month, including the 2023–2025 months of the ball game, which sold at $27 to $40 through FBA with costs of its own; those months show the shape of the series, not that product’s profit.',
      },
      {
        type: 'prose',
        text:
          'Posting it themselves is the decision that shapes the margin: postage is the largest line, bigger than Amazon’s fee and more than seven times the quoted cost to make. In exchange the stock stays with them, sold from the same shelf as their own store’s orders. What it gives up is the Prime badge, on a listing that competes with Prime games on every golf search.',
      },
      {
        type: 'callout',
        text:
          'Profit here is a modelled ceiling on one factory’s quote for the cost to make, at 5,000 boxes, and an assumed origin for the tariff. At 500 boxes, that factory’s smallest order, the same kit is $2.43, which with its tariff would take nearly eight points off the margin.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-15, read at New York 10001. */
        type: 'strategy',
        label: GG_AD.strategy,
        points: [
          'About 42% of the modelled ad spend sits on their own names, “gambling golf scratch off cards”, “gamblin golf scratch off game” and “scratch and swing”, and most of the rest on scratch-off phrases where theirs are most of the ads, such as “scratch off golf cards” and “golf scratch off cards”.',
          'Of the eleven biggest generic searches they show ads on five: “golf games”, “golf card game”, “golf games for adults” and “golf cards”, low on the page in the New York read, and “golf scratch off cards” at the top. They do not buy “golf game”, the biggest at 8,659 a month, “play nine golf card game” or “uno golf”.',
          'Ads of theirs were seen on 18 of the 293 keywords their listings show up on, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside.',
          'Off Amazon, the Meta, Google and TikTok ad libraries were not read, so their spend there is unknown.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: GG_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for Scratch & Swing: exact-match monthly searches and the best organic position the listing held, among the fifty biggest keywords where it ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(GG_TOP_SPEND)} of the ${monthUsd(GG_AD.monthlyUsd.central)} a month; the rest is on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(GG_AD_KEYWORDS, GG_AD_KEYWORDS_TOTAL, GG_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, Scratch & Swing is the first result on its own name and on the scratch-off searches, and it ranks #4 on “golf card game” and #19 on “golf games” without paying. The searches they buy low on the page are the ones where it already ranks, so the ads add a second place on the page rather than a first.',
      },
      {
        type: 'prose',
        text:
          'A keyword read cannot say where the sales come from. The ranks above, the scratch-off searches nobody else contests and campaigns invisible from outside are all candidates, and the brand’s own Sponsored Products search-term report would settle it.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(GG_AD.monthlyUsd.central)} a month, ${linePct(GG_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 18 of 293 keywords — Jungle Scout share of voice; a New York read of 20 searches',
            flag: true,
            note:
              'amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because no row here was sponsored-dominant enough to measure one. It is a floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. One keyword with an ad of theirs, “crokinole golf”, has no bid and is not priced. The Ad spend table below is exactly what the margin takes off.',
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: no ad library was read.',
      },
      {
        /* The Margin breakdown's advertising line, row for row, built from
           GG_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...GG_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${ggBand(p.monthlyUsd)}`]),
          ['Total — the margin line', monthUsd(GG_AD.monthlyUsd.central), linePct(GG_AD.ratePct.central), lineUsd((GG_COST.price * GG_AD.ratePct.central) / 100), `Modelled: ${ggBand(GG_AD.monthlyUsd)}`],
        ],
        note: 'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of the $24 price.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text: 'A Shopify store and three social accounts, none of which was measured.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'gamblingolf.com links to Instagram, TikTok and YouTube, all as @gamblingolf or @GamblinGolf, and the Instagram reels sell the game the way the listing does: “18 holes. 18 scratch-offs. Zero boring rounds.” Follower counts and site traffic were not read, so this section says where they are, not how many people they reach.',
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Gamblin Golf LLC.', note: 'Six Mile, South Carolina' },
          { label: 'Amazon seller', value: 'A3C12G0C3DENHY', note: 'Gamblin Golf' },
          { label: 'Address', value: '1066 Cliffs Vista Pkwy, Six Mile, SC', note: '29682, as Amazon’s seller record gives it' },
          { label: 'Seller feedback', value: '83%', note: 'Over 6 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '13 Aug 2023' },
        ],
      },
      {
        type: 'prose',
        text:
          'Gamblin Golf is a South Carolina company whose own site tells its story without names: golfers who printed $1 and $2 on tour-grade balls because nobody had built a betting game that was simple to play on the course. No founder is named on the site, the listings or anything a search for their costs turned up. The seller account is 83% positive over only 6 ratings, against 97 reviews across its two games. Nobody at the company has spoken to us, and every fact here comes from Keepa, Amazon or the company’s own site.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. The published estimate is created by
         make-validation-launch.mjs; these blocks carry no data. landedHref points
         at the Margin breakdown's landed-cost table. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether it sells, before you commit to a full launch.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch', landedHref: '/business/gamblin-golf/margin/#landed-cost' },
    ],
  },
  'draft-top': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-draft-top-headline.ts, generated
       from waithowmuch-research research/draft-top/headline.json (approved by
       the owner 2026-10-15) — and the page reads them from the row alone.
       The image is the black Lift, B0FS8PXTX3, the hero listing. */
    headline: {
      /* The link preview card — scripts/build-og.mjs, uploaded to the bucket. */
      ogImage: 'https://storage.googleapis.com/verifiedmargins/products/draft-top/a11d0900bf86fbc9f98ffe10bdc5d7b2c1ac7ba73d8170a4e72cead94a83fbc9.png',
      image: {
        src: draftTopPhoto('B0FS8PXTX3'),
        alt: 'The Draft Top Lift topless can opener in black: an oval plastic body with a ringed opening in the middle and a curved handle on one side',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand, their own
             design and listings nobody else holds the buy box on; who makes it,
             and where, is not settled, so private label is the nearest
             answer that describes what transfers. */
          primaryMethod: 'private_label',
          /* Flagship. One tool, the Lift, is every dollar of September across
             seven colours; the can clips beside it sell under the badge. Not
             dominance: it is #10 in Manual Can Openers, with rival topless
             openers on its own searches. */
          catalogStructure: 'flagship',
          /* Level 3, an inference. The cutting mechanism is their own design,
             re-engineered once already, which is a real change of function.
             🚨 The case for level 4 is custom moulds and the founders' on-air
             "the only patent bar tool on the market" (2021, for the 3.0).
             Neither the moulds nor a patent record were read — as on OTOTO,
             tooling stays "no" until the owner shows them. */
          diffTooling: 'no',
          diffCustom: 'yes',
          /* A READ: the Brand Store at /stores/DraftTop is gated behind
             Brand Registry enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the Draft Top 3.0, B08DJ9475L, listed 2020-07-23 — the
             catalogue's first listing, and in the series to May 2024. */
          sellingSince: '2020-07-23',
          /* The hero listing B0FS8PXTX3; the colours share one review pool. */
          reviewTotal: 3458,
          ratingWeighted: 4.4,
          sellerFeedbackPct: 84,
          /* Every badged listing ships from Amazon. */
          channels: 'fba',
          /* RULE 2. The seller exists on Amazon Canada with 44 ratings, not
             measured; Amazon US is all of the measured revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* From score-valuation.mjs, never typed. */
          peakMonthSharePct: 15.32,
          /* RULE 3: offAmazonSharePct unset. The Shopify store, Cork Pops,
             True Brands and Cook's Warehouse are real and none is sized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. Draft Top on Amazon US only — their own store, wholesale through distributors and retail are excluded.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      /* Keepa seller A2E9SUNZRZAWXH, storefront=1. The brand string finds 80
         more, of which 12 carried badges in the past (all in the series) and
         68 are merch, apparel and listings with no offer. */
      { label: 'SKUs', value: '14', note: 'Twelve Lift colours and prints and two can-clip packs on the storefront; eight carry a sold badge now', info: 'skus' },
      /* The hero's own breadcrumb (Keepa categoryTree, B0FS8PXTX3). */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Kitchen Utensils & Gadgets › Can Openers › Manual',
        note: '#10 in Manual Can Openers for the hero listing',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '3,458', note: 'On the hero listing; the colours share one pool', info: 'reviews' },
      { label: 'Product rating', value: '4.4★', note: 'Hero listing', info: 'rating' },
      { label: 'Seller feedback', value: '84%', note: 'Over 399 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own design, made in the USA by their own account; the maker is not named — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One tool in many colours carries every measured sale; can clips sit beside it — an inference', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 3 and an inference — see valuation.answers for the case for 4. */
      { label: 'Differentiation', value: 'Level 3', note: 'A cutting mechanism of their own design; a claimed patent was not checked — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, wholesale', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note: 'The only channel with a number behind it, and the whole of the revenue on this profile. The seller holds the buy box on its listings and Amazon sells none of them.',
      },
      /* 'unchecked', not 'yes': the account exists on Canada with 44 ratings,
         and no Canadian listing was read for a badge. */
      'amazon-international': {
        status: 'unchecked',
        note: 'A seller account exists on Amazon Canada with 44 ratings, so something sells there, but no Canadian listing was measured. None was found on the UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        note: 'drafttop.com is a Shopify store: about 35 Lift colours and prints at $24.99, licensed beer-brand editions at $29.99, can clips, a wall-mounted DT PRO, rim salts and merch. Its sales are not counted here.',
      },
      'wholesale-out': {
        status: 'yes',
        note: 'Through True Brands from March 2022 and Cork Pops from October 2022, which says it reaches 12,000+ retail accounts; Cook’s Warehouse is one shop that stocks it. None of it is in the revenue.',
      },
      // 'tiktok-shop' and 'other-marketplace' left unchecked: a TikTok account
      // exists and nobody looked for a shop on it. 'licensing' left unchecked:
      // they SELL licensed Miller Lite, Blue Moon and Coors editions, which is
      // licensing in, not out.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Every badged listing ships from Amazon, sold by Draft Top LLC: the margin charges Amazon’s pick-and-pack fee.',
      },
      'vendor-1p': { status: 'no', note: 'Amazon sells none of the listings itself.' },
      // fbm left unchecked: nobody looked for a merchant-fulfilled offer.

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand and design, on listings nobody else holds the buy box on. They say it is made in the USA; who makes it is not named.',
      },
      arbitrage: { status: 'no' },
      // manufacturer left unchecked: "Built in USA" does not say whose factory.

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/DraftTop, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'Draft Top, a New Jersey company, makes a hand tool that takes the whole lid off a drink can and leaves a smooth rim, so the can drinks like a cup. It sells on Amazon, from its own store and through retail distributors.',

    blocks: [
      { type: 'heading', text: 'The lid comes off, the can becomes a cup' },
      {
        type: 'prose',
        text:
          'The Lift is a plastic body with a stainless blade inside. Set on a can and squeezed round, it cuts away the whole top, leaving a rim smooth enough to drink from, and fits cans from 7.5 to 25 ounces. They sell it for beer, cocktails and garnishes, and it comes in a dozen colours and prints on Amazon, from black and red, white and blue to camouflage and a Viva México edition.',
      },
      {
        type: 'prose',
        text:
          'It is the second design. The first, the Draft Top 3.0, went on Shark Tank in February 2021, where most of the Sharks could not get it to work. The Lift followed in October 2022, described by the company as completely re-engineered, and every dollar measured since mid-2024 is the Lift. Beside it the storefront carries two packs of can clips, which hold a miniature bottle upside down in an open can; neither carries a sold badge now.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The brand's own listing photos, in our
         bucket (products/draft-top/). */
      {
        type: 'images',
        items: [
          { src: draftTopPhoto('B0FS8PXTX3'), alt: 'The Draft Top Lift in black: an oval plastic body with a ringed opening in the middle, “Draft Top Lift” moulded at the top and a curved handle on one side' },
          { src: draftTopPhoto('hero-PT02'), alt: 'Eight opened cans in a row on a kitchen counter, from a small espresso can to a tall iced-tea can, each with its whole top removed and a smooth rim' },
          { src: draftTopPhoto('hero-PT03'), alt: 'Three topless cans served as drinks: a beer with an orange slice, an orange soda over ice with a straw, and a cola with a miniature whiskey bottle upended in it' },
        ],
        caption: 'The Lift, the cans it opens and what they are opened for, as the brand’s own Amazon listing shows them.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text: 'Three Kickstarters, a can opener the Sharks could not work, a redesign, and an Amazon business that peaks twice a year.',
      },
      {
        /* Oldest first. 🚨 The About page gives only the MONTH of the 2015 and
           2019 Kickstarters; they are dated the 1st (owner's call, 2026-10-15)
           so they are chart dots. */
        type: 'timeline',
        items: [
          {
            when: '1 Aug 2015',
            tag: 'Brand',
            what: 'The first Kickstarter raises $214,083',
            detail: 'By the co-founder’s account on a podcast, with nothing spent on marketing.',
          },
          {
            when: '1 Jan 2019',
            tag: 'Brand',
            what: 'A second Kickstarter',
            detail: 'With a third in December 2020, the two raised $834,828 between them, by the company’s own count.',
          },
          {
            when: '23 Jul 2020',
            tag: 'Amazon',
            what: 'The Draft Top 3.0 is listed on Amazon',
            detail: 'The squeeze-style opener that went on television. The first listing in the catalogue, and in the series until May 2024.',
          },
          {
            when: '12 Feb 2021',
            tag: 'Brand',
            what: 'Shark Tank: $300K for 10% asked, $300K for 20% accepted on air',
            detail: 'Daymond John’s offer, Season 12. Most of the Sharks could not open a can with it, and one went out saying so. Whether the deal closed is not confirmed. On air the founders said it cost $4.13 to make, all in the USA.',
          },
          {
            when: '26 Mar 2022',
            tag: 'Brand',
            what: 'Into retail through True Brands',
            detail: 'A Seattle distributor selling to 30,000+ retailers, by the company’s release.',
          },
          {
            when: '21 Oct 2022',
            tag: 'Amazon',
            what: 'The Lift is listed',
            detail: 'B0BCHBB39B, the first Lift listing. Its badge reached 9,000+ in 2024, and it carried the brand until the end of that year.',
          },
          {
            when: '25 Oct 2022',
            tag: 'Brand',
            what: 'Cork Pops takes the Lift to retail',
            detail: 'Distribution in the US and 14 other countries for “their completely reengineered product, the DT Lift”, made in the USA, by the release.',
          },
          {
            when: '31 May 2024',
            tag: 'Amazon',
            what: 'The Draft Top 3.0’s last badged month',
            detail: 'It was never more than 13% of a month in the series; from June 2024 every measured sale is a Lift.',
          },
          {
            when: '30 Jun 2024',
            tag: 'Amazon',
            what: '$202,704 — the best month on record',
            detail: '9,600 sold in June, the summer peak. Each year since has had two: summer and Christmas.',
          },
          {
            when: '23 Sep 2025',
            tag: 'Amazon',
            what: 'The black Lift that is now the hero listing',
            detail: 'B0FS8PXTX3, listed alongside colours that went up from July 2024.',
          },
          {
            when: '4 Aug 2026',
            tag: 'Amazon',
            what: 'Four new prints',
            detail: 'Wood and three camouflage Lifts, followed by a Viva México edition on 8 September.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '3,900 sold in September',
            detail: 'Revenue twice September 2025’s, across seven Lift listings.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The year has two peaks: summer, when June 2024 and June 2026 each sold over 7,000, and November to December, with January to March falling to a fraction of either. Close to three fifths of each month is kept, after Amazon’s two fees, the cost to make two Alibaba factories quoted with the moulds spread over a year, an assumed tariff and modelled advertising. September 2026 was twice September 2025, and the badges read in October were running higher again.',
      },
      {
        type: 'prose',
        text:
          'The series counts every listing this seller has sold under the brand, not only today’s storefront: the 2022 Lift listing, the Draft Top 3.0 and a Clara Peirce edition no longer have an offer, but carried the badge with the buy box held by Draft Top. Measured off the storefront alone the series would start in August 2024 and miss its best month.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup: the account has 44 ratings,
           so it sells there, but no Canadian listing was measured. The largest
           share is valuation derived.topMarketplaceSharePct. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with 44 ratings; no Canadian listing was measured' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further, so its sales are not counted here.',
      },
      {
        /* September's badges × each listing's own month-end buy box
           (revenue-corrected.json), so the rows sum to the 2026-09 revenue row
           exactly (check-profile asserts it). */
        type: 'breakdown',
        intro: 'Seven colours of one tool are the whole month. Red, white and blue sells at $3 more than the rest.',
        items: [
          { name: 'Draft Top Lift — Red, White & Blue', asin: 'B0D8B3NBY5', listed: '2024-07-04', sold: 1000, price: 28.99, revenue: 28990, image: draftTopPhoto('B0D8B3NBY5') },
          { name: 'Draft Top Lift — Black', asin: 'B0FS8PXTX3', listed: '2025-09-23', sold: 1000, price: 25.99, revenue: 25990, image: draftTopPhoto('B0FS8PXTX3') },
          { name: 'Draft Top Lift — Forest Green', asin: 'B0DS268SBC', listed: '2025-01-02', sold: 700, price: 25.99, revenue: 18193, image: draftTopPhoto('B0DS268SBC') },
          { name: 'Draft Top Lift — Blue', asin: 'B0D89Y4YVM', listed: '2024-07-06', sold: 600, price: 25.99, revenue: 15594, image: draftTopPhoto('B0D89Y4YVM') },
          { name: 'Draft Top Lift — Ghost White', asin: 'B0DS23PTB2', listed: '2025-01-02', sold: 400, price: 25.99, revenue: 10396, image: draftTopPhoto('B0DS23PTB2') },
          { name: 'Draft Top Lift — Red', asin: 'B0DZ74PTVW', listed: '2025-03-04', sold: 100, price: 25.99, revenue: 2599, image: draftTopPhoto('B0DZ74PTVW') },
          /* Out of stock at month end: priced at its last in-stock buy box that month. */
          { name: 'Draft Top Lift — Clara Peirce edition', asin: 'B0DFR7WTF7', listed: '2024-08-30', sold: 100, price: 25.99, revenue: 2599, image: draftTopPhoto('B0DFR7WTF7') },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times each listing’s buy box at the month’s end, so every row is a floor. The other storefront listings — newer prints and the can clips — carry no badge and count as zero; the Clara Peirce edition sits off the storefront.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The cost to make under the profit is two Alibaba factories’ prices for openers they already make, not a quote for the Lift’s own design, plus one factory’s estimate for the moulds — Margin breakdown says what that means. Their own store, the distributors and retail are not in either.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text: 'Amazon is the measured part. Their own store, two distributors and the shops behind them sell the same tool, and none of them publishes a number.',
      },
      {
        type: 'prose',
        text:
          'On Amazon every badged listing ships from Amazon’s warehouses, sold by Draft Top LLC, with Prime. Off it, drafttop.com sells three times as many Lift colours as Amazon carries, licensed Miller Lite, Blue Moon and Coors editions, a wall-mounted DT PRO, rim salts and merch. In 2022 they turned to retail: True Brands, then Cork Pops, which says it reaches 12,000+ retail accounts in 15 countries. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of a $26.76 average sale, close to three fifths is left once Amazon’s two fees, the cost to make it, a tariff and advertising are paid — on a cost to make two Alibaba factories quoted for openers they already make, and a tariff that assumes it is made in China.',
      },
      {
        type: 'prose',
        text:
          'There is one product to cost, because the Lift is every measured sale in September: seven colours of one tool from one factory. Amazon’s fees and the advertising are read or modelled for the Lift itself. The cost to make is not. It is what two factories in China quoted through Alibaba in October 2026 — but for an opener each already makes, not for the Lift’s own design, so it prices a copy of the tool rather than the Lift itself. A copy cannot be made without its own moulds, so one factory’s estimate for them is in it too, spread over a year’s sales. The founders gave a figure too, on Shark Tank in February 2021: “$4.13 to make it. It’s 100% American made” — for the Draft Top 3.0, the design the Lift replaced, and three times the quotes. The tariff is an assumption: they say it is made in America, but this page assumes China, as one of their own listing titles does.',
      },
      {
        /* waithowmuch-research research/draft-top/suppliers.json
           (lift-can-opener, source accio), Accio run
           accio/lift-can-opener/2026-10-25T1146, verified against its
           screenshots; both replies confirmed by the owner in the Alibaba chat,
           2026-10-25. 🚨 Both suppliers quoted an EXISTING model, not the
           custom Lift — the owner accepted that as the COGS (2026-10-25,
           suppliers.json corrections). Yongli's $0.90 1,000 tier and its
           $5,000 mould figure were removed in verification (not in the
           confirmed reply); its custom-tooling estimate ("3-4 sets of moulds
           at $3,000-$5,000 USD per set", quoteText) is in the note as an
           estimate, and since 2026-10-25 (owner: moulds are unavoidable) its
           low end, $9,000, is in the cost to make, ÷ cogsAverage.yearlyUnits
           47,000. Track record, ratings and sales were not read (null in
           suppliers.json). Until 2026-10-25 this margin used the founders'
           self-reported $4.13; their words are in the table below. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what a topless can opener costs to make',
        attribution: 'alibaba',
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price', 'Lead time'],
        rows: [
          ['Yangjiang Keyhome Hardware Factory', '—', '—', '—', '1,000 pieces (lowest tier)', '$1.66–1.96', '—'],
          ['Huizhou Yongli Industrial Co., Ltd', '—', '—', '—', '5,000 pieces (lowest tier)', '$0.86–0.99', '15 working days'],
          ['Average — the factory price', '', '', '', '', lineUsd(DT_COST.factory), ''],
          [`Moulds, spread over a year — $${DT_COST.mouldsOnce.toLocaleString('en-US')} once ÷ ~${DT_COST.mouldUnits.toLocaleString('en-US')} openers`, '', '', '', '', lineUsd(DT_COST.moulds), ''],
          ['The cost to make used below', '', '', '', '', lineUsd(DT_COST.make), ''],
        ],
        note:
          'Two factories in China quoted, and neither priced the Lift’s own design: each quoted a can opener it already makes. Keyhome, boxed, EXW: $1.96 at 1,000, $1.84 at 10,000 and $1.66 at 50,000. Yongli, a 45 g two-in-1 rotary opener in a plain white box — lighter than the 80–90 g a custom design was specified at — FOB Shenzhen: $0.99 at 5,000, $0.95 at 10,000, $0.90 at 30,000 and $0.86 at 50,000. Each at its largest tier below the brand’s yearly sales of about 47,000 — $1.84 and $0.90 — and averaged; the two are twice apart. Moulds, in the cost to make: for a custom design Yongli estimated three to four mould sets at $3,000–5,000 each — $9,000 to $20,000 — refundable on terms still to be agreed, and said the reference design appears to be patented; Keyhome has not priced tooling. A copy cannot be made without them, so this page takes the low end, $9,000, and spreads it over a year’s sales at the tiers above, about 47,000 openers: $0.19 each. Yongli’s samples are $5 and take 3 days. Three more factories did not reply. Track record, buyer ratings and sales on Alibaba were not read. Requested through Alibaba’s sourcing agent (Accio) and checked against its screenshots of the replies.',
      },
      {
        /* payload.json founderStatements[0]: the founders' own cost of goods,
           which this margin used until 2026-10-25. Kept as what they said; it
           is NOT a supplier table (caption does not start "COGS", no alibaba
           attribution), so it is held to no supplier columns. */
        type: 'table',
        id: 'founders-cost',
        caption: 'What the founders said it costs to make',
        noteColumns: [3],
        columns: ['Line', 'Said on Shark Tank (Feb 2021)', 'Used here', 'Basis'],
        rows: [
          ['Cost to make, per unit', '“$4.13 to make it”', 'Not used: the factory quotes above are', 'Self-reported, for the Draft Top 3.0 — the design before the Lift — and five years old. Make cost only; freight not stated. Three times the quotes'],
          ['Where it is made', '“100% American made”', 'Not used: a 20% China tariff is assumed', 'What they say, and drafttop.com says “Built in USA” today; but the Ghost White listing’s title reads “Made In china”, and nothing read settles it. This page assumes China'],
          ['Price then', '$24.99', '$26.76, September’s average sale', 'At the price they gave, $4.13 was 16.5% of a sale'],
          ['Net margin', '“50% net margin”', 'Not used', 'A margin for the whole company, Kickstarter and their own store included, not a cost'],
        ],
        note:
          'The founders’ words, from the Season 12 episode as a reaction video replays it; the original ABC clip was not found. Their $4.13 was this page’s cost to make until the factory quotes above came back.',
      },
      {
        /* The freight half at the same dated LCL rate every profile uses —
           waithowmuch-research calibration/freight-rates.json, CN-USWC low end,
           read 2026-09-28. Keepa B0FS8PXTX3: 164 × 88 × 27 mm, 91 g. */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one opener',
        attribution: 'freightos',
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '16.4 × 8.8 × 2.7 cm, 0.09 kg', 'Keepa’s package for B0FS8PXTX3, the black Lift; the other colours pack within a few millimetres of it'],
          ['Volume', '0.00039 cbm', 'The carton, in cubic metres'],
          ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
          ['Shipping, per unit', '$0.19', '0.00039 cbm × $497'],
        ],
        note:
          'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. The lane follows the China origin this page assumes. If the Lift is made in the USA, as Draft Top says, its inbound is a truck, not a ship, and at 19 cents the difference cannot move the margin.',
      },
      {
        /* Derived from the two tables above, so no source logo. The brand's own
           landed cost — "Test it first" links to the new seller's one below. */
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — production, duty and shipping, per opener',
        noteColumns: [2],
        columns: ['Line', 'Per unit', 'From'],
        rows: [
          ['Production', lineUsd(DT_COST.factory), 'Two Alibaba suppliers’ quotes, averaged — COGS table above'],
          ['Moulds, spread over a year', lineUsd(DT_COST.moulds), `$${DT_COST.mouldsOnce.toLocaleString('en-US')} once ÷ ~${DT_COST.mouldUnits.toLocaleString('en-US')} openers — the low end of one factory’s estimate; COGS table above`],
          ['Tariff', lineUsd(DT_COST.tariff), '20% of the factory price, assuming China origin — a mould is paid once at the factory, not imported with each opener, so it carries none; the tariff line below'],
          ['Shipping', lineUsd(DT_COST.freight), 'The hero’s carton at $497/cbm — shipping table above'],
          ['Landed cost', `$${DT_COST.landed.toFixed(2)}`, 'What one opener costs to reach Amazon’s door, before it sells'],
        ],
        note:
          'The first three cost lines of the breakdown below, added up — cost of goods (moulds in), tariff and shipping: $2.03 is 7.6% of the $26.76 average sale; the lines above are rounded to the cent and come to $2.029 unrounded. It covers making the tool, its moulds and bringing it in, not Amazon’s fees, which are their own lines. “Test it first” prices its first order on this same figure, and adds the $9,000 for the moulds once, up front.',
      },
      {
        /* 🚨 The profit series is 100% less these lines — 57.981% — and the
           backend seed (seed-draft-top.ts, generated from pnl.json) builds it
           from the SAME percentages. Change one, regenerate the other.
           Until 2026-10-25 (moulds added): cogs 5.12, 58.696%. Before that:
           cogs 15.434, tariff 3.087 (the founders' $4.13), 46.3%. */
        type: 'margin',
        basis: { label: 'Average selling price', value: DT_COST.price },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -DT_COST.makePct,
            amount: DT_COST.make,
            detail:
              'Two Alibaba factories’ quotes, averaged — $1.84 at 10,000 and $0.90 at 30,000 — for can openers they already make, not for the Lift’s own design: $1.37. Plus the moulds a copy cannot be made without, spread over a year’s sales: $9,000 — the low end of one factory’s estimate of three to four sets at $3,000–5,000 each; the other has not priced them — ÷ about 47,000 openers = $0.19. The founders’ own 2021 figure, for the design before the Lift, was $4.13.',
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Tariff',
            pct: -DT_COST.tariffPct,
            amount: DT_COST.tariff,
            /* 🚨 ASSUMED China origin, owner's call 2026-10-15 ("assume it's all
               made in China"). Keepa's title for B0DS23PTB2 (Ghost White) reads
               "Made In china"; B0DFDWRVPN's reads "Made In The USA". */
            detail:
              'Assumed: 20% of the cost to make, the rate this site uses for goods made in China — Section 301 plus the reciprocal tariff. What they say is different: “100% American made” on air, “Built in USA” on their site. But the Ghost White listing’s own title reads “Made In china”, so this page assumes China, where both quoting factories are. Made in the USA, this line would be zero.',
            links: [
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
              { label: 'See what the founders said above', href: '#founders-cost' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Shipping',
            pct: -DT_COST.freightPct,
            amount: DT_COST.freight,
            detail: 'The hero’s own carton at a read sea-freight rate from China, door to door, on the same assumed origin as the tariff.',
            links: [
              { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            amount: DT_COST.referral,
            detail: 'Amazon’s published Home & Kitchen rate, a flat 15%; 15% in Keepa for the hero listing.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            /* Keepa product record for B0FS8PXTX3, read 2026-10-15: package
               164 × 88 × 27 mm, 91 g; fbaFees.pickAndPackFee 386 cents. $4.11
               on B0D89Y4YVM (Blue) and B0DFDWRVPN; weighted by September's
               units, $3.90. sources.json carries the same. */
            label: 'FBA fulfilment',
            pct: -DT_COST.fbaPct,
            amount: DT_COST.fba,
            emphasis: true,
            detail:
              'Size tier: Large Standard. The best seller’s box, the black Lift B0FS8PXTX3, is 6.46 × 3.46 × 1.06 in and 3.2 oz — the 1.06 in is over Small Standard’s 0.75 in limit — and Amazon charges $3.86 to pick and pack it. The blue Lift pays $4.11; weighted by September’s units the fee is $3.90.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -DT_AD.ratePct.central,
            amount: DT_AD_PER_SALE,
            detail: `Modelled, not observed: about ${monthUsd(DT_AD.monthlyUsd.central)} a month, ${linePct(DT_AD.ratePct.central)} of September’s revenue (band ${dtBand(DT_AD.monthlyUsd)}), almost all of it on their own name. A floor: it cannot see ads on product pages, automatic campaigns, Sponsored Brands or Display.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/draft-top/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/draft-top/advertising/' },
            ],
          },
        ],
        note:
          'Quoted cost basis: the cost to make is two Alibaba factories’ prices for openers they already make, averaged — not a quote for the Lift’s own design — and the tariff assumes China origin. The moulds a copy needs are in it: $9,000 once, the low end of one factory’s estimate, spread over a year’s sales; the other factory has not priced them. Returns, payroll, warehousing and overhead are not modelled, so this is a ceiling on profit, not profit. The profit series uses this September breakdown for every month, including the 2023–24 months of the 3.0 and of older Lift listings at $19.99 to $24.99; those months show the shape of the series, not their own margins.',
      },
      {
        type: 'prose',
        text:
          'Amazon takes far more of a sale than making it does: the referral fee and the pick-and-pack fee together are about five times the cost to make, moulds included. That is the shape of a $27 tool in a Large Standard box. The founders also told the Sharks they ran a 50% net margin — a figure for the whole company in 2021, mostly direct and Kickstarter sales, which this page does not use; the lines above leave more than that, on a cost to make under two fifths of the $4.13 they gave.',
      },
      {
        type: 'callout',
        text:
          'The one line that could move this margin is the cost to make. It rests on two factories’ prices for openers they already make, twice apart, not on a quote for the Lift itself, and on one factory’s estimate for the moulds; at the founders’ own $4.13, moulds on top, the margin would be 45.6%. Every dollar it is off moves the margin by almost four points.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-15, read at New York 10001. */
        type: 'strategy',
        label: DT_AD.strategy,
        points: [
          'About 96% of the modelled ad spend sits on their own name — “draft top beer can opener”, “draft top”, “draft top lift” and the like — where an ad of theirs held the first sponsored slot in most of the New York reads.',
          'Of the thirteen biggest generic searches their listings rank on, they buy one, “beer can opener smooth edge” (4,052 a month), first sponsored in the New York read. They do not buy “soda can opener”, the biggest at 27,646, “beer can opener” or “can opener smooth edge”.',
          'Ads of theirs were seen on 20 of the 442 keywords their listings rank on, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside.',
          'Off Amazon, the Meta, Google and TikTok ad libraries were not read, so their spend there is unknown.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: DT_TOP_KEYWORDS,
        visibleRows: 10,
        note:
          `Jungle Scout, for the Lift’s listings: exact-match monthly searches and the best organic position any of them held, among the fifty biggest keywords where one ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(topSpend(DT_TOP_KEYWORDS))} of the ${monthUsd(DT_AD.monthlyUsd.central)} a month; the rest is on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(DT_AD_KEYWORDS, DT_AD_KEYWORDS_TOTAL, DT_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, a Lift is the first organic result on “beer can opener”, “topless can opener”, “can top remover” and “aluminum can opener” in Jungle Scout’s reading, and fifth on “beer can opener” from New York. The generic searches they do not buy are ones they already rank on, or ones like “soda can opener”, where the first results in the New York read were tab lifters rather than lid removers.',
      },
      {
        type: 'prose',
        text:
          'The money goes on their own name, and the name is contested: on “draft top” their ad held the first of twelve sponsored slots in the New York read, and the other eleven were other listings. Amazon’s suggested bid there is $11 to $12, about five times the bid on the generic searches: what keeping a contested name costs.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(DT_AD.monthlyUsd.central)} a month, ${linePct(DT_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 20 of 442 keywords — Jungle Scout share of voice; a New York read of 43 searches',
            flag: true,
            note:
              `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid; band ${dtBand(DT_AD.monthlyUsd)}. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because only one row here was sponsored-dominant enough to measure one. One keyword with their ads is over Jungle Scout’s 50-character limit and is not modelled. A floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off.`,
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: no ad library was read.',
      },
      {
        /* The Margin breakdown's advertising line, row for row, built from
           DT_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...DT_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd((DT_COST.price * p.ratePct.central) / 100), `Modelled: ${dtBand(p.monthlyUsd)}`]),
          ['Total — the margin line', monthUsd(DT_AD.monthlyUsd.central), linePct(DT_AD.ratePct.central), lineUsd(DT_AD_PER_SALE), `Modelled: ${dtBand(DT_AD.monthlyUsd)}`],
        ],
        note: 'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of the $26.76 average sale.',
      },

      { type: 'section', id: 'traffic', title: 'Socials and traffic', group: 'Where demand comes from', asOf: true },
      {
        type: 'lede',
        text: 'A Shopify store and four social accounts, none of them measured, and a crowd that funded the product three times before it reached Amazon.',
      },
      { type: 'links' },
      {
        type: 'prose',
        text:
          'drafttop.com links to Instagram and TikTok as @drafttop, Facebook as TheDraftTop and YouTube as @TheDraftTop. Follower counts and site traffic were not read, so this section says where they are, not how many people they reach. The site itself claims over a million sold, which counts every channel and is not checked here.',
      },
      {
        type: 'channels',
        caption: 'Off-Amazon presence',
        items: [
          {
            label: 'Own store — drafttop.com',
            href: 'https://www.drafttop.com/',
            value: 'Not measured',
            note: 'Shopify: the Lift in about 35 colours and prints at $24.99 with free shipping, licensed beer-brand editions at $29.99, can clips, the DT PRO and merch.',
          },
          {
            label: 'Kickstarter',
            value: '$1.05M over three campaigns',
            note: '$214,083 in August 2015, and $834,828 across January 2019 and December 2020, by the company’s own count.',
          },
          {
            label: 'Distributors — True Brands and Cork Pops',
            href: 'https://drafttop.com/blogs/news/latest-news-october-25th-2022',
            value: 'Not measured',
            note: 'True Brands from March 2022, Cork Pops from October 2022 in the US and 14 other countries. Cook’s Warehouse is one shop that stocks the Lift, at $24.95.',
          },
        ],
      },

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'Draft Top, Inc.', note: 'Trading on Amazon as Draft Top LLC' },
          { label: 'Amazon seller', value: 'A2E9SUNZRZAWXH', note: 'Draft Top LLC' },
          { label: 'Address', value: 'PO Box 134, Stewartsville, NJ', note: '08886, as Amazon’s seller record gives it; press releases are dated Ewing, NJ' },
          { label: 'Founders', value: 'Armand Ferranti, Sean Kelly', note: 'President and Founder, and Co-Founder, on their About page' },
          { label: 'Seller feedback', value: '84%', note: 'Over 399 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '23 Jul 2020' },
        ],
      },
      {
        type: 'prose',
        text:
          'Draft Top is a New Jersey company. Its About page names Armand Ferranti as President and Founder and Sean Kelly as Co-Founder; on Shark Tank Ferranti pitched with Patrick Parizo, and a 2022 release quotes Paul Tuhy as CEO. Daymond John’s offer was accepted on air, and the company’s site presents it, but whether the deal closed has never been confirmed. Nobody at the company has spoken to us: every fact here comes from Keepa, Amazon, the company’s own site and releases, and the episode.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a base multiple moved by what the public record supports — applied to trailing-twelve profit, and it prices Draft Top on Amazon US alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Their own store, the distributors and retail are excluded: all real, none sized from outside. The profit being multiplied rests on two Alibaba factories’ prices for openers they already make, rather than a quote for the Lift itself, and an assumed China tariff, and deducts no overhead, so on that basis this figure is an upper bound.',
      },
      {
        type: 'prose',
        text:
          'The positives are what has lasted: a catalogue on Amazon since 2020, a tool redesigned once and on sale as the Lift since 2022, a review pool in the thousands at 4.4 stars and an enrolled brand store. The negatives are concentration and service: one tool carries every dollar, all of it on Amazon US, and seller feedback of 84% sits just under the line the model rewards.',
      },
      {
        type: 'prose',
        text:
          'Four inputs are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken from the public record — a patent claimed on air and the moulds behind the Lift could put it a level higher, and neither was read — and fulfilment is read from the listings’ fees. Brand Registry is firmer: Amazon gates the brand store behind enrolment. All of them are the first things to put to the owner.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. The published estimate is created by
         make-validation-launch.mjs (--variants "lift=opener"); these blocks
         carry no data. Its landed cost, $2.03, is the Margin breakdown's —
         the Accio production price $1.37 + moulds spread over a year $0.19 +
         the assumed 20% China tariff on $1.37 + freight — so landedHref is
         the margin's landed-cost table. The moulds themselves, $9,000 once
         ("tooling" in starting-cost.lift.inputs.json), are in "To test" too
         (owner, 2026-10-25). Re-published locally 2026-10-25 (validation.json). */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether a copy of the Lift sells, before you commit to a full launch — priced on two Alibaba factories’ quotes plus the assumed China tariff, and on the moulds a copy cannot be made without: $9,000 once, the low end of one factory’s estimate of three to four sets at $3,000–5,000 each. The other factory has not priced them.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch', landedHref: '/business/draft-top/margin/#landed-cost' },
    ],
  },
  'doctor-jupiter': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-doctor-jupiter-headline.ts,
       generated from waithowmuch-research research/doctor-jupiter/headline.json
       (wording approved by the owner; the figure and one subtitle clause were
       revised 2026-10-18 and await re-approval) — and the page reads them from
       the row alone. The image is the hero kit, B09XGMHGJ3. */
    headline: {
      image: {
        src: doctorJupiterPhoto('B09XGMHGJ3'),
        alt: 'The Doctor Jupiter My First Science Kit box: red and navy, with flasks, a measuring cylinder and a funnel of coloured, fizzing liquids, a “4+ yr olds” badge and “100+ experiments” across the bottom',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand on every listing,
             the buy box theirs on every top kit, Amazon selling none. The
             manufacturer string is Metis Learning Solutions Pvt. Ltd., an Indian
             company form sharing the seller's name, which may be their own
             factory; private label is the nearest answer that describes what
             transfers. */
          primaryMethod: 'private_label',
          /* Flagship: one kit, in boys' and girls' boxes and three editions, is
             61% of September; the 80-odd other listings sit beside it. */
          catalogStructure: 'flagship',
          /* Level 2, an inference. Their own kit contents, manuals and box art,
             but an Alibaba supplier lists an unbranded kit whose contents match
             the girls' Ultimate kit reagent for reagent, and another listing
             carries Doctor Jupiter's own box art: a factory can already make it. */
          diffTooling: 'no',
          diffCustom: 'no',
          diffVisible: 'yes',
          /* A READ: the Brand Store at /stores/DoctorJupiter is gated behind
             Brand Registry enrolment. */
          brandRegistry: 'yes',
        },
        derived: {
          /* RULE 1: the Doctor Jupiter brand's first listing, My First Science
             B09XGMHGJ3, 2022-04-26 — the lead kit, in the whole series. 🚨 The
             storefront's two Learnabee board books list from July 2021, but
             Learnabee is a second brand whose tie to this seller before Keepa
             tracked it (November 2023) is not established; dating the catalogue
             from them would add 0.2 to the multiple (owner's call). */
          sellingSince: '2022-04-26',
          /* Summed over the 20 largest listings (Keepa, each its own pool); the
             other 72 are left out, so it is a floor. */
          reviewTotal: 10280,
          /* Weighted by September revenue over those listings (93% of it). */
          ratingWeighted: 4.6,
          sellerFeedbackPct: 100,
          /* Every top listing ships from Amazon. */
          channels: 'fba',
          /* RULE 2. A seller account exists on Amazon Canada with no ratings;
             Amazon US is all of the measured revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* From score-valuation.mjs, never typed. */
          peakMonthSharePct: 38.17,
          /* RULE 3: offAmazonSharePct unset. doctorjupiter.com sits behind a
             bot check and nothing was sized. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple. Doctor Jupiter on Amazon US only — their own site is excluded, unread.',
      note: 'Base 2.6, adjusted by what the public record supports.',
    },

    facts: [
      /* Keepa seller A3ACVJQV2VBG6P, storefront=1: 92 ASINs, 86 priced, 43
         badged on 15 Oct; two brand strings, Doctor Jupiter (87) and Learnabee. */
      { label: 'SKUs', value: '92', note: 'Science, engineering and craft kits, gift sets and Learnabee toddler board books; about half carry a sold badge', info: 'skus' },
      /* The hero's own breadcrumb (Keepa categoryTree, B09XGMHGJ3). */
      {
        label: 'Category',
        value: 'Toys & Games › Learning & Education › Science Kits & Toys',
        note: '#929 in Toys & Games for the hero kit',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '10,280', note: 'Across the 20 largest listings; the hero kit alone has 3,791', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Weighted by the latest month’s sales', info: 'rating' },
      { label: 'Seller feedback', value: '100%', note: 'Over 533 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own brand; the listings name an Indian company as manufacturer — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + range', note: 'One kit for four-year-olds carries most of the revenue, with a wide range of kits beside it — an inference', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 2 and an inference — see valuation.answers. */
      { label: 'Differentiation', value: 'Level 2', note: 'Their own contents and boxes, but factories already list near-identical kits — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note: 'The only channel with a number behind it, and the whole of the revenue on this profile. The seller holds the buy box on every top listing and Amazon sells none of them.',
      },
      /* 'unchecked', not 'no': the account exists on Canada with no ratings,
         and UK listings of the kits exist under some other seller. */
      'amazon-international': {
        status: 'unchecked',
        note: 'A seller account exists on Amazon Canada with no ratings. Listings of the kits exist on Amazon UK, but not under this seller, and who sells them was not read.',
      },
      /* own-store left unchecked: doctorjupiter.com answers with a bot check,
         so whether it sells anything was not read. tiktok-shop, wholesale-out
         and other-marketplace left unchecked: nobody looked. */

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Every top listing ships from Amazon, sold by Doctor Jupiter_USA: the margin charges Amazon’s pick-and-pack fee.',
      },
      'vendor-1p': { status: 'no', note: 'Amazon sells none of the listings itself.' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand on listings nobody else holds the buy box on. The manufacturer named on every listing is Metis Learning Solutions Pvt. Ltd.',
      },
      arbitrage: { status: 'no' },
      // manufacturer left unchecked: the shared "Metis" name suggests their own
      // factory, but nothing read says whose it is.

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/DoctorJupiter, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'Doctor Jupiter sells boxed science-experiment kits for children from three up on Amazon, from a Dubai-registered company whose listings name an Indian manufacturer. One kit for four-year-olds, in boys’ and girls’ boxes, carries most of it.',

    blocks: [
      { type: 'heading', text: 'A hundred experiments in a box, for a fourth birthday' },
      {
        type: 'prose',
        text:
          'My First Science Kit is a box of plastic labware — test tubes, beakers, a funnel, a measuring cylinder — with reagent sachets and a printed manual of experiments for children from four, sold in a boys’ and a girls’ box and in editions of 50 and 100-plus experiments. Its siblings follow the same pattern for other ages: an Ultimate kit with 135 experiments for eight and up, and a Preschool kit for three to five. Nearly every kit’s title names an age, and many end in “Birthday Gift”.',
      },
      {
        type: 'prose',
        text:
          'Around the science kits sit engineering kits, a robotic hand, a paper-airplane launcher, craft and make-up kits, gift sets bundling several kits, and ten toddler board books under a second brand, Learnabee. About half of the 92 listings carry a sold badge; the rest each sell under roughly fifty a month on Amazon.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The brand's own listing photos, in our
         bucket. */
      {
        type: 'images',
        items: [
          { src: doctorJupiterPhoto('B09XGMHGJ3'), alt: 'The My First Science Kit box, red and navy, with flasks of coloured liquid, a “4+ yr olds” badge and “100+ experiments”' },
          { src: doctorJupiterPhoto('B0C248WX35'), alt: 'The Ultimate Science Kit box, with test tubes and a mushroom-cloud illustration, an “8+ yr olds” badge and “135+ experiments”' },
          { src: doctorJupiterPhoto('B0DWFJ6YWV'), alt: 'The Paper Airplane Launcher Kit box: an orange launcher on a runway firing a yellow paper plane, and “with 50+ paper planes”' },
        ],
        caption: 'The first science kit, the Ultimate kit and the paper-airplane launcher, as the brand’s own Amazon listings show them.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text: 'A first science kit in 2022, an edition for every age and both boxes since, and a business that does most of its year in December.',
      },
      {
        /* Oldest first. Month-end revenue events date to the last day of the
           month so the dot sits on that month's point. */
        type: 'timeline',
        items: [
          {
            when: '12 Jul 2021',
            tag: 'Amazon',
            what: 'The storefront’s oldest listing: a Learnabee board book',
            detail: 'Learnabee is the storefront’s second brand, toddler board books and games. Whether this seller sold it then is not established; the seller is first tracked in November 2023.',
          },
          {
            when: '26 Apr 2022',
            tag: 'Amazon',
            what: 'My First Science Experiments Kit is listed',
            detail: 'B09XGMHGJ3, for ages four and up: the kit that still carries most of the brand.',
          },
          {
            when: '30 Sep 2022',
            tag: 'Amazon',
            what: 'The Ultimate Science Kit, for eight and up',
            detail: '135-plus experiments, the older child’s edition.',
          },
          {
            when: '14 Jul 2023',
            tag: 'Amazon',
            what: 'Girls’ boxes',
            detail: 'Girls’ First Science Kit, with Girls’ Ultimate following on 22 August: the same kits in a second box.',
          },
          {
            when: '31 Dec 2023',
            tag: 'Amazon',
            what: '43,100 sold in the first December measured',
            detail: 'About $1.5M, against 5,800 kits in the January after it.',
          },
          {
            when: '31 May 2024',
            tag: 'Amazon',
            what: 'Starter editions at $24.99',
            detail: 'My First and Girls’ First with 50-plus experiments, five dollars under the full kit. Both are now among the three best sellers.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '56,700 sold in December 2024',
            detail: 'About $1.7M.',
          },
          {
            when: '7 Feb 2025',
            tag: 'Amazon',
            what: 'The paper-airplane launcher',
            detail: 'One of 51 listings added in 2025, the year the catalogue more than doubled: engineering kits, a robotic hand, craft kits and gift sets.',
          },
          {
            when: '20 Aug 2025',
            tag: 'Amazon',
            what: 'A Preschool Science Kit, for three to five',
            detail: 'In a boys’ and a girls’ box from the start.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '98,000 sold — the biggest month on record',
            detail: 'About $2.9M, nine times the January after it.',
          },
          {
            when: '31 May 2026',
            tag: 'Amazon',
            what: '5,100 sold, the low point',
            detail: 'The spring trough, about $145K.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '17,300 sold in September',
            detail: 'Climbing into the fourth Christmas: October’s badges were running higher again.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'Christmas is most of the year. Each December sells more than the one before, and the January after it falls to between a sixth and a ninth of it, then build slowly through a birthday-present year to October. About a third of every month is kept, after Amazon’s two fees, the cost to make the kits, an assumed tariff, freight and modelled advertising — and Amazon’s pick-and-pack fee takes more of a sale than making the kit does.',
      },
      {
        type: 'prose',
        text:
          'The series counts every listing on the storefront and three bundles off it that carried a badge in past months, each at its own month-end price. A badge is a floor: the half of the catalogue without one counts as zero.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada is in at 0% on a seller lookup: the account has no ratings.
           The largest share is valuation derived.topMarketplaceSharePct. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No account under this seller; UK listings of the kits exist under another' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further.',
      },
      {
        /* September's badges × each listing's own month-end price
           (revenue-corrected.json). 🚨 PARTIAL: the 18 largest of the 40 badged
           listings; the page draws the rest as "Not itemised". */
        type: 'breakdown',
        partial: { of: 'the 40 listings with a sold badge' },
        intro: 'The first science kit, in four boxes, is the top four rows. The launcher and the Preschool kit come next.',
        items: [
          { name: 'My First Science Experiments Kit, 100+ experiments', asin: 'B09XGMHGJ3', listed: '2022-04-26', sold: 4000, price: 29.99, revenue: 119960, image: doctorJupiterPhoto('B09XGMHGJ3') },
          { name: 'Girls’ First Science Experiments Kit, Starter', asin: 'B0D17YL839', listed: '2024-05-31', sold: 3000, price: 24.99, revenue: 74970, image: doctorJupiterPhoto('B0D17YL839') },
          { name: 'My First Science Experiments Kit, Starter 50+', asin: 'B0D17X5QNF', listed: '2024-05-22', sold: 2000, price: 24.99, revenue: 49980, image: doctorJupiterPhoto('B0D17X5QNF') },
          { name: 'Girls’ First Science Experiments Kit', asin: 'B0C4YDZQMS', listed: '2023-07-14', sold: 1000, price: 26.99, revenue: 26990, image: doctorJupiterPhoto('B0C4YDZQMS') },
          { name: 'Paper Airplane Launcher Kit', asin: 'B0DWFJ6YWV', listed: '2025-02-07', sold: 1000, price: 24.99, revenue: 24990, image: doctorJupiterPhoto('B0DWFJ6YWV') },
          { name: 'Preschool Science Kit, ages 3–5', asin: 'B0FN3MC4CY', listed: '2025-08-20', sold: 900, price: 26.99, revenue: 24291, image: doctorJupiterPhoto('B0FN3MC4CY') },
          { name: 'Ultimate Science Experiments Kit, 135+', asin: 'B0C248WX35', listed: '2022-09-30', sold: 600, price: 29.99, revenue: 17994, image: doctorJupiterPhoto('B0C248WX35') },
          { name: 'Girls’ Ultimate Science Experiments Kit', asin: 'B0CG9QG2SF', listed: '2023-08-22', sold: 500, price: 29.99, revenue: 14995, image: doctorJupiterPhoto('B0CG9QG2SF') },
          { name: 'Girls’ Engineering Kit', asin: 'B0FBMFTTB6', listed: '2025-06-02', sold: 600, price: 23.69, revenue: 14214, image: doctorJupiterPhoto('B0FBMFTTB6') },
          { name: 'Ultimate Engineering Kit', asin: 'B0FBMG6PJ3', listed: '2025-06-02', sold: 400, price: 22.49, revenue: 8996, image: doctorJupiterPhoto('B0FBMG6PJ3') },
          { name: 'Robotic Hand STEM Toy', asin: 'B0DZCWRLBR', listed: '2025-03-05', sold: 300, price: 26.99, revenue: 8097, image: doctorJupiterPhoto('B0DZCWRLBR') },
          { name: 'Ultimate Science Experiments Kit, 50+', asin: 'B0D8BK7D7M', listed: '2024-06-28', sold: 400, price: 19.99, revenue: 7996, image: doctorJupiterPhoto('B0D8BK7D7M') },
          { name: 'My First Amazing Science Experiments Kit', asin: 'B0D1MPNSS6', listed: '2024-04-13', sold: 200, price: 26.99, revenue: 5398, image: doctorJupiterPhoto('B0D1MPNSS6') },
          { name: 'Girls’ First Amazing Science Experiments Kit', asin: 'B0D1MR35P2', listed: '2024-04-13', sold: 200, price: 26.99, revenue: 5398, image: doctorJupiterPhoto('B0D1MR35P2') },
          { name: 'Preschool Science Kit for Girls', asin: 'B0FN3KPZVH', listed: '2025-08-20', sold: 200, price: 26.99, revenue: 5398, image: doctorJupiterPhoto('B0FN3KPZVH') },
          { name: 'Paper Airplane Book Kit', asin: 'B0FW4JPS2J', listed: '2025-10-14', sold: 300, price: 16.99, revenue: 5097, image: doctorJupiterPhoto('B0FW4JPS2J') },
          { name: 'Ultimate Gift Set of Learning, ages 4–6', asin: 'B0C23WZ3BV', listed: '2023-07-14', sold: 100, price: 49.99, revenue: 4999, image: doctorJupiterPhoto('B0C23WZ3BV') },
          { name: 'Glam Science make-up craft kit', asin: 'B0DTYWCFND', listed: '2025-01-24', sold: 200, price: 19.99, revenue: 3998, image: doctorJupiterPhoto('B0DTYWCFND') },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times each listing’s price at the month’s end, so every row is a floor. Of the 92 listings, 40 carried a badge; the 18 largest are itemised and the other 22, mostly gift sets and small kits, are one remainder. The rest count as zero.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The cost to make under the profit is Alibaba listing prices, three of the four resting on a single listing, and the tariff assumes the kits are made in China, which their listings do not say.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text: 'Amazon US, through Amazon’s warehouses, is the whole of what can be measured. Their own site exists and could not be read.',
      },
      {
        type: 'prose',
        text:
          'Every top listing ships from Amazon, sold by Doctor Jupiter_USA with the buy box all of the time, and Amazon sells none of them itself. The seller has an account on Amazon Canada with no ratings; the kits are listed on Amazon UK, but not by this seller. doctorjupiter.com answers with a bot check, so whether it sells anything is not known. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of a $26.65 average sale, about a third is left once Amazon’s two fees, the cost to make, a tariff, freight and advertising are paid — and Amazon’s fulfilment fee is a bigger cost than making the kit.',
      },
      {
        type: 'prose',
        text:
          'Four products carry the brand. In September the first science kit was 61% of revenue, the Ultimate kit 9%, the Preschool kit and the paper-airplane launcher 6% each: together the first set to reach 80%, so each has its own breakdown below and the whole brand, at September’s mix, comes last. Every cost to make is a price listed on Alibaba, read by Alibaba’s own sourcing agent rather than quoted back to a request, and for the Ultimate kit, the Preschool kit and the launcher it rests on a single listing — the one that matched the product.',
      },
      {
        /* 🚨 One breakdown per main product (SKILL §2, "Products"): 61.3%,
           9.3%, 6.4% and 5.7% of September, the first set to reach 80%. Tab
           ids are the "Test it first" product ids, so its first-order links
           land on each tab's #landed-cost. Per-unit figures are DJ_COST
           (pnl.json); the `all` tab is DJ_BLEND = the seed's COST_LINES. */
        type: 'product-margins',
        period: '2026-09',
        products: [
          {
            id: 'my-first-science',
            label: 'My First Science Kit',
            sharePct: 61.3,
            blocks: [
              {
                /* Standard supplier columns. waithowmuch-research research/
                   doctor-jupiter/suppliers.json (Accio run accio/my-first-science/
                   2026-10-17T2225, verified against its screenshots): the two
                   suppliers priced, ordered by track record. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a first science kit costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Sam Toys Industrial Co., Ltd.', 'Verified · 19 yrs', '4.9★ from 1,798 (store)', '—', '216 sets', '$2.38–2.55'],
                  ['Shantou Capable Toys Co., Ltd.', 'Verified · 12 yrs', '4.7★ from 363 (store)', '—', '48 sets', '$5.34–5.52'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(DJ_COST['my-first-science'].make)],
                ],
                note:
                  'Two boxed kits from suppliers in China: Sam Toys’ has 78 experiments, between the brand’s 50-plus Starter and its 100-plus edition, and Shantou Capable’s 125, the closest to the full kit. Each is priced at the tier nearest the brand’s own yearly sales of this kit, about 125,000 — $2.38 from 7,200 sets and $5.34 from 240, Shantou Capable’s top tier — and the two averaged. They are listed prices, read by Alibaba’s sourcing agent (Accio) in a search, not quotes negotiated for an order. Two more listings were read and not priced: one shows Doctor Jupiter’s own Ultimate Girls box art and prices that kit instead (see its tab), the other is a 13-activity kit. A third supplier, using the brand’s product names word for word, was left out as a copy. Searched “kids science experiment kit OEM” and “custom STEM science kit for kids manufacturer”, Verified suppliers rated 4.5 or better.',
              },
              {
                /* Freightos CN-USWC low end, waithowmuch-research calibration/
                   freight-rates.json, read 2026-09-28. The volume is the six
                   listings' units-weighted Keepa package (pnl.json cbmPerUnit). */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one kit from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '34.1 × 25.4 × 5.2 cm, 0.75 kg', 'Keepa’s package for B09XGMHGJ3, the 100-plus kit; the Starter boxes are a few centimetres shorter'],
                  ['Volume', '0.00419 cbm', 'The six listings’ boxes, weighted by September’s units; the hero’s alone is 0.0045'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per kit', '$2.08', '0.00419 cbm × $497'],
                ],
                note:
                  'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. A flat box of air and plastic ships by volume, which is why moving a kit costs over half of what making it does.',
              },
              {
                /* Derived from the two tables above and the tariff line, so no
                   source logo. "Test it first" links its first order here. */
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per kit',
                noteColumns: [2],
                columns: ['Line', 'Per kit', 'From'],
                rows: [
                  ['Production', lineUsd(DJ_COST['my-first-science'].make), 'Two Alibaba suppliers’ listed prices, averaged — COGS table above'],
                  ['Tariff', lineUsd(DJ_COST['my-first-science'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(DJ_COST['my-first-science'].freight), 'The kit’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(DJ_COST['my-first-science'].landed), 'What one kit costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 24.7% of the $27.18 average sale. Amazon’s fees on the sale are their own lines. “Test it first” prices its first order on this same figure.',
              },
              {
                type: 'margin',
                basis: { label: 'Average selling price', value: DJ_COST['my-first-science'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: djPct('my-first-science', DJ_COST['my-first-science'].make),
                    amount: DJ_COST['my-first-science'].make,
                    detail: 'Two Alibaba suppliers’ listed prices for a comparable kit, averaged: listing prices, not a negotiated quote.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: djPct('my-first-science', DJ_COST['my-first-science'].tariff),
                    amount: DJ_COST['my-first-science'].tariff,
                    detail: 'Assumed: 20% of the cost to make, the rate this site uses for toys made in China — Section 301 plus the reciprocal tariff, over a toys base of zero. Their own listings name an Indian manufacturer; made in India, the rate would differ.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: djPct('my-first-science', DJ_COST['my-first-science'].freight),
                    amount: DJ_COST['my-first-science'].freight,
                    detail: 'The kit’s own carton at a read sea-freight rate from China, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: DJ_COST['my-first-science'].referral,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15% on items over $10.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa product record for B09XGMHGJ3, read 2026-10-15:
                       package 341 × 254 × 52 mm, 750 g; pickAndPackFee 637
                       cents. Units-weighted over the six listings, $6.14.
                       sources.json carries the same. */
                    label: 'FBA fulfilment',
                    pct: djPct('my-first-science', DJ_COST['my-first-science'].fba),
                    amount: DJ_COST['my-first-science'].fba,
                    emphasis: true,
                    detail:
                      'Size tier: Large Standard. The best seller’s box, B09XGMHGJ3, is 13.4 × 10.0 × 2.0 in and 1.65 lb — over Small Standard’s 0.75 in and 16 oz — and Amazon charges $6.37 to pick and pack it. The Starter boxes pay $5.76 to $6.10; weighted by September’s units the fee is $6.14, more than the kit costs to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -djAd('my-first-science').ratePct.central,
                    amount: djAd('my-first-science').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(djAd('my-first-science').monthlyUsd.central)} a month on this kit’s keywords, ${linePct(djAd('my-first-science').ratePct.central)} of its September revenue (band ${djBand(djAd('my-first-science').monthlyUsd)}), most of it on science-kit searches by age. A floor: it cannot see ads on product pages, automatic campaigns, Sponsored Brands or Display.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/doctor-jupiter/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/doctor-jupiter/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'ultimate-science',
            label: 'Ultimate Science Kit',
            sharePct: 9.3,
            blocks: [
              {
                /* suppliers.json, Accio run accio/ultimate-science/2026-10-17T2228.
                   🚨 ONE supplier priced (owner's call, 2026-10-18). */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what an Ultimate kit costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Anhui Xingxue Material Technology Co., Ltd.', 'Verified · 6 yrs', '4.7★ from 471 (store)', '—', '50 pieces', '$6.90–7.60'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(DJ_COST['ultimate-science'].make)],
                ],
                note:
                  'One listing, and the cost to make rests on it alone. Its photo is Doctor Jupiter’s own Ultimate Girls box art, and the contents it lists match the girls’ 135-plus kit reagent for reagent — food colours, essences, glow powder, citric acid, crystal powder, glycerin flakes — so it is an unbranded version of this kit. Priced at $6.90, its top tier from 500 pieces, the nearest to the brand’s yearly sales of the kit (about 19,000). A listed price read by Alibaba’s sourcing agent (Accio) in a search, not a quote negotiated for an order. Two more listings were read and not priced: a range of about 25 kits with no tiers, and a crystal-growing kit. Searched “science kit for kids 8-12 OEM” and “kids chemistry experiment set crystal growing”, Verified suppliers rated 4.5 or better.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one kit from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '33.8 × 25.2 × 4.8 cm, 0.86 kg', 'Keepa’s package for B0C248WX35, the 135-plus kit'],
                  ['Volume', '0.00416 cbm', 'The four listings’ boxes, weighted by September’s units'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per kit', '$2.07', '0.00416 cbm × $497'],
                ],
                note: 'The same Freightos reading as the first kit: the low end of the door-to-door band, duty excluded.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per kit',
                noteColumns: [2],
                columns: ['Line', 'Per kit', 'From'],
                rows: [
                  ['Production', lineUsd(DJ_COST['ultimate-science'].make), 'One Alibaba listing’s price — COGS table above'],
                  ['Tariff', lineUsd(DJ_COST['ultimate-science'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(DJ_COST['ultimate-science'].freight), 'The kit’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(DJ_COST['ultimate-science'].landed), 'What one kit costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 38.5% of the $26.86 average sale, the dearest of the four products to make.',
              },
              {
                type: 'margin',
                basis: { label: 'Average selling price', value: DJ_COST['ultimate-science'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: djPct('ultimate-science', DJ_COST['ultimate-science'].make),
                    amount: DJ_COST['ultimate-science'].make,
                    emphasis: true,
                    detail: 'One Alibaba listing’s price for an unbranded version of this kit: a single listed price, not a negotiated quote, so it moves when more suppliers are read.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: djPct('ultimate-science', DJ_COST['ultimate-science'].tariff),
                    amount: DJ_COST['ultimate-science'].tariff,
                    detail: 'Assumed: 20% of the cost to make, on the same China basis as the first kit.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: djPct('ultimate-science', DJ_COST['ultimate-science'].freight),
                    amount: DJ_COST['ultimate-science'].freight,
                    detail: 'The kit’s own carton at the same sea-freight rate.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: DJ_COST['ultimate-science'].referral,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa B0C248WX35: 338 × 252 × 48 mm, 862 g, pickAndPackFee
                       602 cents; units-weighted over four listings $5.97. */
                    label: 'FBA fulfilment',
                    pct: djPct('ultimate-science', DJ_COST['ultimate-science'].fba),
                    amount: DJ_COST['ultimate-science'].fba,
                    detail: 'Size tier: Large Standard. The best seller’s box, B0C248WX35, is 13.3 × 9.9 × 1.9 in and 1.90 lb — over Small Standard’s 0.75 in and 16 oz — and Amazon charges $6.02 to pick and pack it; weighted across the four listings, $5.97.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -djAd('ultimate-science').ratePct.central,
                    amount: djAd('ultimate-science').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(djAd('ultimate-science').monthlyUsd.central)} a month on this kit’s keywords, ${linePct(djAd('ultimate-science').ratePct.central)} of its September revenue. The shared age searches, such as “science kits for kids age 8-12”, are counted under the first kit. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/doctor-jupiter/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/doctor-jupiter/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'preschool-science',
            label: 'Preschool Science Kit',
            sharePct: 6.4,
            blocks: [
              {
                /* suppliers.json, Accio run accio/preschool-science/2026-10-17T2228.
                   🚨 ONE supplier priced (owner's call, 2026-10-18). */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a preschool kit costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Shantou Liansheng Toys Co., Ltd.', 'Verified · 18 yrs', '4.7★ from 12 (store)', '—', '36 pieces', '$3.25–3.85'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(DJ_COST['preschool-science'].make)],
                ],
                note:
                  'One listing, and the cost to make rests on it alone: a 60-experiment boxed kit of test tubes, a rack, reagent sachets and colour bottles, from a supplier with only 12 store reviews. Priced at $3.25, its top tier from 2,000 pieces, the nearest to the brand’s yearly sales of the kit (about 13,000). A listed price read by Alibaba’s sourcing agent (Accio) in a search, not a negotiated quote. Two more listings were read and not priced: a seven-experiment box and a chemistry kit marked for six and up. Searched “preschool science kit OEM” and “toddler STEM science experiment kit”, Verified suppliers rated 4.5 or better.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one kit from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '29.3 × 25.2 × 5.3 cm, 0.69 kg', 'Keepa’s package for B0FN3MC4CY, the boys’ box; the girls’ is within a few millimetres'],
                  ['Volume', '0.00389 cbm', 'The two listings’ boxes, weighted by September’s units'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per kit', '$1.93', '0.00389 cbm × $497'],
                ],
                note: 'The same Freightos reading as the first kit: the low end of the door-to-door band, duty excluded.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per kit',
                noteColumns: [2],
                columns: ['Line', 'Per kit', 'From'],
                rows: [
                  ['Production', lineUsd(DJ_COST['preschool-science'].make), 'One Alibaba listing’s price — COGS table above'],
                  ['Tariff', lineUsd(DJ_COST['preschool-science'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(DJ_COST['preschool-science'].freight), 'The kit’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(DJ_COST['preschool-science'].landed), 'What one kit costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 21.6% of the $26.99 price.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: DJ_COST['preschool-science'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: djPct('preschool-science', DJ_COST['preschool-science'].make),
                    amount: DJ_COST['preschool-science'].make,
                    detail: 'One Alibaba listing’s price for a comparable boxed kit: a single listed price, not a negotiated quote.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: djPct('preschool-science', DJ_COST['preschool-science'].tariff),
                    amount: DJ_COST['preschool-science'].tariff,
                    detail: 'Assumed: 20% of the cost to make, on the same China basis as the first kit.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: djPct('preschool-science', DJ_COST['preschool-science'].freight),
                    amount: DJ_COST['preschool-science'].freight,
                    detail: 'The kit’s own carton at the same sea-freight rate.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: DJ_COST['preschool-science'].referral,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa B0FN3MC4CY: 293 × 252 × 53 mm, 689 g, pickAndPackFee
                       576 cents; the girls' box the same fee. */
                    label: 'FBA fulfilment',
                    pct: djPct('preschool-science', DJ_COST['preschool-science'].fba),
                    amount: DJ_COST['preschool-science'].fba,
                    emphasis: true,
                    detail: 'Size tier: Large Standard. The best seller’s box, B0FN3MC4CY, is 11.5 × 9.9 × 2.1 in and 1.52 lb — over Small Standard’s 0.75 in and 16 oz — and Amazon charges $5.76 to pick and pack it, as it does the girls’ box: almost twice what the kit costs to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -djAd('preschool-science').ratePct.central,
                    amount: djAd('preschool-science').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(djAd('preschool-science').monthlyUsd.central)} a month on this kit’s keywords, ${linePct(djAd('preschool-science').ratePct.central)} of its September revenue: almost nothing seen. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/doctor-jupiter/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/doctor-jupiter/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'paper-airplane-launcher',
            label: 'Paper-airplane launcher',
            sharePct: 5.7,
            blocks: [
              {
                /* suppliers.json, Accio run accio/paper-airplane-launcher/
                   2026-10-17T2228. 🚨 ONE supplier priced (owner's call, 2026-10-18). */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a launcher kit costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Xinxiang Alpha Manufacturing Ltd.', 'Verified · 9 yrs', '5.0★ from 310 (store)', '—', '1,000 sets', '$2.59–3.25'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(DJ_COST['paper-airplane-launcher'].make)],
                ],
                note:
                  'One listing, and the cost to make rests on it alone: a wooden launcher kit with paper planes, pulled by an elastic band like Doctor Jupiter’s, from a manufacturer that lists ASTM F963 and CPC certificates. Priced at $2.59, its top tier from 10,000 sets, the nearest to the brand’s yearly sales of the launcher (about 12,600). Its minimum is 1,000 sets, so a first order is 1,000 — “Test it first” explains. A listed price read by Alibaba’s sourcing agent (Accio) in a search, not a negotiated quote. Two more listings were read and not priced: both are radio-controlled motor modules that fly a paper plane, a different product. Searched “paper airplane launcher kit” and “electric paper airplane launcher STEM kit”, Verified suppliers rated 4.5 or better.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one launcher from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '34.3 × 25.5 × 3.4 cm, 0.62 kg', 'Keepa’s package for B0DWFJ6YWV, the launcher'],
                  ['Volume', '0.00296 cbm', 'The two listings’ boxes, weighted by September’s units'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per kit', '$1.47', '0.00296 cbm × $497'],
                ],
                note: 'The same Freightos reading as the science kits: the low end of the door-to-door band, duty excluded. The launcher’s box is the flattest of the four.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per launcher',
                noteColumns: [2],
                columns: ['Line', 'Per kit', 'From'],
                rows: [
                  ['Production', lineUsd(DJ_COST['paper-airplane-launcher'].make), 'One Alibaba listing’s price — COGS table above'],
                  ['Tariff', lineUsd(DJ_COST['paper-airplane-launcher'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(DJ_COST['paper-airplane-launcher'].freight), 'The launcher’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(DJ_COST['paper-airplane-launcher'].landed), 'What one launcher costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 18.3% of the $24.99 price, the cheapest of the four to make.',
              },
              {
                type: 'margin',
                basis: { label: 'Selling price', value: DJ_COST['paper-airplane-launcher'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: djPct('paper-airplane-launcher', DJ_COST['paper-airplane-launcher'].make),
                    amount: DJ_COST['paper-airplane-launcher'].make,
                    detail: 'One Alibaba listing’s price for a launcher kit with the same mechanism: a single listed price, not a negotiated quote.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: djPct('paper-airplane-launcher', DJ_COST['paper-airplane-launcher'].tariff),
                    amount: DJ_COST['paper-airplane-launcher'].tariff,
                    detail: 'Assumed: 20% of the cost to make, on the same China basis as the science kits.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: djPct('paper-airplane-launcher', DJ_COST['paper-airplane-launcher'].freight),
                    amount: DJ_COST['paper-airplane-launcher'].freight,
                    detail: 'The launcher’s own carton at the same sea-freight rate.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: DJ_COST['paper-airplane-launcher'].referral,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa B0DWFJ6YWV: 343 × 255 × 34 mm, 621 g, pickAndPackFee
                       561 cents; B0GCSL7KRX $5.76; weighted $5.62. */
                    label: 'FBA fulfilment',
                    pct: djPct('paper-airplane-launcher', DJ_COST['paper-airplane-launcher'].fba),
                    amount: DJ_COST['paper-airplane-launcher'].fba,
                    detail: 'Size tier: Large Standard. The best seller’s box, B0DWFJ6YWV, is 13.5 × 10.0 × 1.3 in and 1.37 lb — over Small Standard’s 0.75 in and 16 oz — and Amazon charges $5.61 to pick and pack it; with the second listing, $5.62.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -djAd('paper-airplane-launcher').ratePct.central,
                    amount: djAd('paper-airplane-launcher').perUnit,
                    emphasis: true,
                    detail: `Modelled, not observed: about ${monthUsd(djAd('paper-airplane-launcher').monthlyUsd.central)} a month on the launcher’s keywords, ${linePct(djAd('paper-airplane-launcher').ratePct.central)} of its September revenue (band ${djBand(djAd('paper-airplane-launcher').monthlyUsd)}) — the heaviest of the four, nearly all of it on “gifts for 8 year old boys”. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/doctor-jupiter/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/doctor-jupiter/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* 🚨 The backend seed builds the profit and ad-spend series from
                   the SAME numbers (seed-doctor-jupiter.ts COST_LINES, generated
                   from pnl.json): DJ_BLEND + 15% referral + DJ_AD's rate.
                   66.124% off leaves 33.876%. Until 2026-10-18 the cost to make
                   was a $3.00–4.00 placeholder and ads an assumed 5%. */
                type: 'margin',
                basis: { label: 'Average selling price', value: DJ_AVG_SALE },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -DJ_BLEND.cogs,
                    emphasis: true,
                    detail: 'Each product’s Alibaba cost to make, on September’s mix — $3.86 for the first kit, $6.90 for the Ultimate, $3.25 for the Preschool kit, $2.59 for the launcher — with the rest of the catalogue at the same share. See each product’s tab for its suppliers.',
                  },
                  { label: 'Tariff', pct: -DJ_BLEND.tariff, detail: 'Assumed: 20% of the cost to make, on a China origin.' },
                  { label: 'Shipping', pct: -DJ_BLEND.freight, detail: 'Each product’s carton at the same Freightos sea-freight rate, on September’s mix.' },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    detail: 'Amazon’s published Toys & Games rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -DJ_BLEND.fba,
                    detail: 'Size tier: Large Standard. Every product’s best seller is a flat box of 1.3 to 2.1 in and well over a pound — the hero, B09XGMHGJ3, is 13.4 × 10.0 × 2.0 in and 1.65 lb — and the pick-and-pack fees run $5.61 to $6.37. On September’s mix, the largest cost line.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -DJ_AD.ratePct.central,
                    detail: `Modelled, not observed: ${linePct(DJ_AD.ratePct.central)} of revenue — amazon-adspend-spy’s rate on the four products (about ${monthUsd(DJ_AD.monthlyUsd.central)} a month on them, band ${djBand(DJ_AD.monthlyUsd)}), applied here to the whole brand. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/doctor-jupiter/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/doctor-jupiter/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit. The profit series uses this September breakdown for every month; earlier months had a different mix of kits, so they show the shape of the series, not their own margins.',
              },
            ],
          },
        ],
      },
      {
        type: 'prose',
        text:
          'Amazon is paid more than the factory. The referral fee and the pick-and-pack fee together take well over a third of every sale, against about a sixth for making the kit, because a box of labware is light, flat and wide — the shape that sits just inside Large Standard. The Ultimate kit is the exception that shows how much the cost to make matters: on its single listing it costs twice what the first kit does and keeps about a quarter of its price, not a third.',
      },
      {
        type: 'callout',
        text:
          'The line that could move this margin most is the cost to make, and for three of the four products it rests on one Alibaba listing each. Every dollar it moves on the first kit moves the whole brand’s margin by more than two points. The tariff assumes China; their own manufacturer is Indian.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-17, read at New York 10001. */
        type: 'strategy',
        label: DJ_AD.strategy,
        points: [
          'Almost none of the modelled spend is on their own name. It sits on searches that name an age: science-kit ones such as “science kits for kids age 5-7”, where theirs are nearly all the ads, and “age 8-12”, and gift ones such as “gifts for 8 year old boys” for the launcher and “gifts for 4 year old boys”.',
          'Of the fifteen biggest generic searches their listings rank on, they buy two: “science kits for kids age 8-12”, and “4 year old girl birthday gifts”, where an ad of theirs was second in the New York read. They do not buy “5 year old girl birthday gift”, “toys for 4 year old boys”, “stem toys” or “national geographic kit”.',
          'Ads of theirs were seen on 48 keywords read one by one and on about 130 smaller ones estimated from a sample, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside.',
          'Off Amazon, the Meta, Google and TikTok ad libraries were not read, so their spend there is unknown.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: DJ_TOP_KEYWORDS,
        visibleRows: 10,
        note: `Jungle Scout, for the four products’ listings: exact-match monthly searches and the best organic position any of them held, among the fifty biggest keywords where one ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(topSpend(DJ_TOP_KEYWORDS))} of the ${monthUsd(DJ_AD.monthlyUsd.central)} a month on the four products; the rest is on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(DJ_AD_KEYWORDS, DJ_AD_KEYWORDS_TOTAL, DJ_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, the first kit ranks in the top five on “science kit”, “kids science kit” and “science kits for kids age 5-7”, and between the late teens and the forties on the big birthday-gift searches by age. Their largest science-kit ad keyword, “science kits for kids age 5-7”, is one it already ranks fifth on, and nearly every sponsored result there is theirs: the ads add a second place on a page they already hold, while the biggest gift pages go unbought.',
      },
      {
        type: 'prose',
        text:
          'The launcher is bought differently. Nearly all of its modelled spend is on one gift search, “gifts for 8 year old boys”, where it ranks only 81st on its own — the one place on this page where the ads buy a position the listing has not earned.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(DJ_AD.monthlyUsd.central)} a month on the four products, ${linePct(DJ_AD.ratePct.central)} of their revenue — modelled`,
            counted: 'Ads on 48 keywords read and about 130 estimated — Jungle Scout share of voice; a New York read of 16 searches',
            flag: true,
            note: `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid; band ${djBand(DJ_AD.monthlyUsd)}. The 100 largest keywords with an ad of theirs were read one by one and the smaller ones estimated from a stratified sample. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because no row here was sponsored-dominant enough to measure one. A floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The margin applies the same rate to the rest of the catalogue; the Ad spend table below is exactly what it takes off.`,
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: no ad library was read.',
      },
      {
        /* The Margin breakdown's advertising lines, row for row, built from
           DJ_AD: one row per product tab, the rest of the catalogue at the same
           rate, and the Whole brand line. check-profile fails if they drift. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...DJ_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${djBand(p.monthlyUsd)}`]),
          ['The rest of the catalogue', monthUsd(DJ_REST.month), linePct(DJ_AD.ratePct.central), lineUsd((DJ_REST.avgSale * DJ_AD.ratePct.central) / 100), 'The four products’ rate, applied: not modelled keyword by keyword'],
          ['Total — the margin line', monthUsd(DJ_AD_MONTH), linePct(DJ_AD.ratePct.central), lineUsd((DJ_AVG_SALE * DJ_AD.ratePct.central) / 100), `Modelled: ${djBand(DJ_AD.monthlyUsd)} on the four products`],
        ],
        note: 'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of each product’s average sale, and of the $26.65 brand average on the last row.',
      },

      /* Socials and traffic OMITTED: doctorjupiter.com answers with a bot check,
         and no social account, press or retail listing was found. An empty
         section would read as "looked and found nothing". */

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'METIS INTERNATIONAL DMCC', note: 'Trading on Amazon as Doctor Jupiter_USA' },
          { label: 'Amazon seller', value: 'A3ACVJQV2VBG6P', note: 'Doctor Jupiter_USA' },
          { label: 'Address', value: 'Unit 309, Gold Crest Executive, JLT, Dubai', note: 'Jumeirah Lakes Towers, as Amazon’s seller record gives it' },
          { label: 'Manufacturer on the listings', value: 'Metis Learning Solutions Pvt. Ltd.', note: 'An Indian company form' },
          { label: 'Seller feedback', value: '100%', note: 'Over 533 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '26 Apr 2022', note: 'The first Doctor Jupiter kit' },
        ],
      },
      {
        type: 'prose',
        text:
          'The seller is a company in Dubai’s free zone, and the manufacturer on every listing is Metis Learning Solutions Pvt. Ltd., a name that shares the seller’s and takes an Indian company form; one third-party listing elsewhere says the kits are made in India. No founder, press coverage, social account or retailer was found. The storefront’s second brand, Learnabee, shares its name with a Malaysian company, Learnabee International Sdn Bhd, and how the two connect is not established. Nobody at the company has spoken to us: every fact here comes from Keepa, Amazon and the public web.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a base multiple moved by what the public record supports — applied to trailing-twelve profit, and it prices Doctor Jupiter on Amazon US alone.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Their own site is excluded: it exists and could not be read. The profit being multiplied rests on Alibaba listing prices for the cost to make and an assumed China tariff, and deducts no overhead, so on that basis this figure is an upper bound.',
      },
      {
        type: 'prose',
        text:
          'The positives are what has been built: over 10,000 reviews at 4.6 stars across the largest listings, a spotless seller record, an enrolled brand store and three measured Christmases, each bigger than the last. The negatives are the shape of the year and of the catalogue: December carries well over a third of the trailing year, all of it on Amazon US, and one kit carries most of the revenue — a kit that factories already list near-identical versions of.',
      },
      {
        type: 'prose',
        text:
          'Four inputs are inferences rather than reads. Sourcing, catalogue shape and the differentiation level are questionnaire answers taken from the public record, and fulfilment is read from the listings’ fees; Brand Registry is firmer, since Amazon gates the brand store behind it. The age is dated from the first Doctor Jupiter kit in April 2022, not the two Learnabee board books listed in 2021. All of them are the first things to put to the owner.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. The published estimate is created by
         make-validation-launch.mjs (--variants: the girls' edition of the first
         kit, the Ultimate on ages-8-to-12 searches, the launcher on airplane
         searches; --products leaves out the Preschool kit, whose searches have
         no competing listing with enough modelled clicks to set a pass line).
         These blocks carry no data; each first order links to its product tab's
         #landed-cost by default. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether a copy sells, before you commit to a full launch — tested on the first kit, the Ultimate kit and the launcher. The Preschool kit is left out: its searches had too few competing listings measured to set a pass line.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },
  'woodlands-usa': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-woodlands-usa-headline.ts,
       generated from waithowmuch-research research/woodlands-usa/headline.json
       (RE-DRAFTED 2026-10-18, awaiting the owner's approval) — and the page
       reads them from the row alone. The image is the plain 6-piece bamboo set,
       B0D5NLZSZS, the best seller. 🚨 Never a franchise set. */
    headline: {
      image: {
        src: woodlandsPhoto('B0D5NLZSZS'),
        alt: 'Six bamboo cooking utensils — spatulas, a slotted spoon, a fork and spoons — held in a green card sleeve printed “Woodlands Bamboo Utensil Set, 6 piece set”',
      },
    },

    valuation: {
      inputs: {
        answers: {
          /* INFERENCES from the public record. Their own brand on the plain and
             teak listings and the buy box theirs on almost all of it; who makes
             the goods is not named. */
          primaryMethod: 'private_label',
          /* Flagship: one bamboo set, in seven variations, is two thirds of
             September; a teak line sits beside it. */
          catalogStructure: 'flagship',
          /* Level 1, an inference. The best seller is a plain six-piece bamboo
             set that Alibaba suppliers list as a stock item from $0.95; the
             visible differences in the range are the franchise engravings,
             which are not theirs to differentiate with. */
          diffTooling: 'no',
          diffCustom: 'no',
          diffVisible: 'no',
          /* A READ: the Brand Store at /stores/WOODLANDSUSA is gated behind
             Brand Registry enrolment. */
          brandRegistry: 'yes',
          /* 🚨 The IP risk, through the model's own input (owner's call,
             2026-10-15: show it in the valuation, through the model). The model
             has no "unlicensed third-party IP" answer; `issues: 'open'`
             ("Unresolved account or IP issue", −0.8) is the existing input for
             an open IP exposure, so it is used here. It is an INFERENCE from
             what the listings show — three sets titled for film franchises with
             no licence shown — not a known complaint: none is on the public
             record. The Valuation prose says so. */
          issues: 'open',
        },
        derived: {
          /* RULE 1: the plain 6-piece set B0D5NLZSZS, listed 2024-11-09 — the
             catalogue's first listing, in the whole series. */
          sellingSince: '2024-11-09',
          /* Distinct review pools across the storefront (Keepa): the bamboo
             set family 1,771, teak spoons and sets 438, dough whisk 280,
             spatulas 161 + 90 + 83, ladles 108, tongs 105 + 32. */
          reviewTotal: 3068,
          ratingWeighted: 4.6,
          sellerFeedbackPct: 93,
          /* Every listing ships from Amazon. */
          channels: 'fba',
          /* RULE 2. A seller account exists on Amazon Canada with no ratings;
             Amazon US is all of the measured revenue. */
          topMarketplaceSharePct: 100,
          marketplaces: ['US', 'CA'],
          /* From score-valuation.mjs, never typed. */
          peakMonthSharePct: 28.02,
          /* RULE 3: offAmazonSharePct unset — no channel off Amazon was found. */
        },
      },
      basis:
        'Trailing-twelve net profit at a modelled multiple, with the franchise-titled sets scored as an open IP issue. WOODLANDS USA on Amazon US only.',
      note: 'Base 2.6, adjusted by what the public record supports — including an open IP issue for the franchise-titled sets.',
    },

    facts: [
      /* Keepa seller AJ7EHD6HZ4QZ2, storefront=1: 27 ASINs, 26 priced, 20 badged. */
      { label: 'SKUs', value: '27', note: 'Bamboo utensil sets, a teak line of sets, spatulas, ladles, spoons with rests, tongs, a dough whisk and a bread lame', info: 'skus' },
      /* The best seller's own breadcrumb (Keepa categoryTree, B0D5NLZSZS). */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Kitchen Utensils & Gadgets › Cooking Utensils › Utensil Sets',
        note: '#531 in Home & Kitchen for the best seller',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '3,068', note: 'Across the storefront’s review pools; the bamboo sets share 1,771', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'The bamboo sets; the teak line reads 4.2 to 4.7', info: 'rating' },
      { label: 'Seller feedback', value: '93%', note: 'Over 247 ratings', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own brand on stock bamboo and teak utensils; the maker is not named — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Flagship + complementary', note: 'One bamboo set carries most of the revenue, a teak line beside it — an inference', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 1 and an inference — see valuation.answers. */
      { label: 'Differentiation', value: 'Level 1', note: 'A standard bamboo set factories list as stock; the engraved designs that set some apart are franchise ones — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note: 'The only channel found, and the whole of the revenue on this profile. The seller holds the buy box on nearly all of it; a second account holds a little of it on the themed sets.',
      },
      /* 'unchecked', not 'no': the account exists on Canada with no ratings. */
      'amazon-international': {
        status: 'unchecked',
        note: 'A seller account exists on Amazon Canada with no ratings, and none was found on the UK or Germany.',
      },
      'own-store': {
        status: 'no',
        note: 'No website was found for the brand. A closed Shopify store at woodlandsamerica.com is not confirmed as theirs.',
      },
      /* tiktok-shop, wholesale-out, other-marketplace left unchecked: one eBay
         listing of the bamboo set comes from a Miami seller, which may be a
         reseller; nobody looked further. */

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Every listing ships from Amazon: the margin charges Amazon’s pick-and-pack fee.',
      },
      'vendor-1p': { status: 'no', note: 'Amazon sells none of the listings itself.' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own brand on bamboo and teak utensils. Who makes them is not named; the brand string also carries dead listings for “Indonesian Handcrafted” shelves.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/WOODLANDSUSA, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'WOODLANDS USA sells bamboo and teak cooking utensils on Amazon, from a Wyoming company registered at an agent’s address. A plain bamboo set carries most of it — and three of its sets are titled for film franchises with no licence shown.',

    blocks: [
      { type: 'heading', text: 'Six bamboo spoons in a card sleeve' },
      {
        type: 'prose',
        text:
          'The best seller is a six-piece bamboo set — spatulas, spoons and a slotted spoon in a printed sleeve — sold beside three- and seven-piece versions of the same set. In September 2025 a teak line followed: utensil sets from seven to thirty pieces in holders, spatulas and spurtles, ladles, spoons with rests, tongs, a Danish dough whisk and a bread lame.',
      },
      {
        /* 🚨 Owner's call, 2026-10-15: say it clearly, as an observed fact —
           what the listings show and what they do not — never as an accusation. */
        type: 'callout',
        text:
          'Three of the bamboo sets are titled for film franchises: “Harry Gifts for All Potter Fans”, “Star Warz gifts … for Space Wars Fans” and “Nightmare … Before Christmas”. One carries the Harry Potter name and franchise imagery on its listing images. No licence is shown on any of the three listings, and nothing on them names a licence holder. Those three sets made more than half of December 2025 and a fifth of September 2026. This page shows none of their images.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The brand's own listing photos, in our
         bucket. Plain bamboo and teak only. */
      {
        type: 'images',
        items: [
          { src: woodlandsPhoto('B0D5NLZSZS'), alt: 'Six bamboo utensils standing in a green card sleeve printed “Woodlands Bamboo Utensil Set, 6 piece set”' },
          { src: woodlandsPhoto('B0FD7KZYLV'), alt: 'A teak utensil set laid out: a whisk, spoons, a ladle, slotted and solid spatulas and a spoon rest' },
          { src: woodlandsPhoto('B0FD7RVW83'), alt: 'Two flat teak spatulas with a dark green two-piece box' },
        ],
        caption: 'The plain bamboo set, the teak utensil set and the teak spatulas, as the brand’s own Amazon listings show them.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text: 'A bamboo set and its franchise-titled siblings in late 2024, a quiet 2025, a teak line, and a December more than half made by the franchise sets.',
      },
      {
        /* Oldest first. Month-end revenue events date to the last day of the month. */
        type: 'timeline',
        items: [
          {
            when: '26 Apr 2024',
            tag: 'Amazon',
            what: 'The seller account is first seen',
            detail: 'WOODLANDS AMERICA LLC, registered at an agent’s address in Casper, Wyoming.',
          },
          {
            when: '9 Nov 2024',
            tag: 'Amazon',
            what: 'The plain six-piece bamboo set is listed',
            detail: 'B0D5NLZSZS: the first listing in the catalogue, and the best seller today.',
          },
          {
            when: '12 Nov 2024',
            tag: 'Amazon',
            what: 'Themed versions of the set: three titled for film franchises',
            detail: 'Listed with a Christmas set and a seven-piece set. No licence is shown on the three franchise-titled listings.',
          },
          {
            when: '31 Dec 2024',
            tag: 'Amazon',
            what: '6,100 sold in the first December',
            detail: 'About $109K, 57% of it from the franchise-titled sets.',
          },
          {
            when: '28 Feb 2025',
            tag: 'Amazon',
            what: 'Nine months on one listing',
            detail: 'From February to October 2025 the themed sets carried no sold badge, and the plain six-piece sold 500 to 2,000 a month on its own.',
          },
          {
            when: '21 Sep 2025',
            tag: 'Amazon',
            what: 'The teak line',
            detail: 'A dough whisk on 2 September, teak utensil sets and spoons on the 3rd, spatulas and ladles on the 21st.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '14,050 sold — the biggest month on record',
            detail: 'About $307K, 56% of it from the three franchise-titled sets.',
          },
          {
            when: '1 May 2026',
            tag: 'Amazon',
            what: 'Twenty- and thirty-piece teak sets',
            detail: 'The largest sets in the range, at $69.99 for twenty pieces.',
          },
          {
            when: '14 Jun 2026',
            tag: 'Amazon',
            what: 'A three-piece bamboo set at $10.99',
            detail: 'By September the second-best seller.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '6,550 sold in September',
            detail: 'The plain six-piece set, down to $8.99, was the best seller; the franchise-titled sets were a fifth of the month.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'The year turns on December. The first December sold more than the ten months after it put together; the second, with the teak line on sale, was nearly three times the first, and the months since have held well above anything before it. Something under a quarter of each month is kept, after Amazon’s two fees, the cost to make, an assumed tariff, freight and modelled advertising: on a set that now sells for $8.99, Amazon’s pick-and-pack fee is the largest cost.',
      },
      {
        type: 'prose',
        text:
          'Prices have fallen hard. The plain six-piece went from $14.99 in December 2024 to $13.99 a year later and $8.99 in September 2026, and the themed sets from $24.99 to $14.99. The series prices every month at its own month-end buy box, so the Christmas months are not marked down to today’s prices.',
      },
      { type: 'chart' },
      {
        /* 🚨 Owner's call: the franchise point where the franchise sets appear. */
        type: 'callout',
        text:
          'The franchise-titled sets, with no licence shown, made 56% of December 2025 and 21% of September 2026 — about a third of the trailing year. Amazon removes a listing that uses another company’s marks when that company complains, and their share of the business is what would go with them.',
      },
      {
        /* 🚨 Canada is in at 0% on a seller lookup: the account has no ratings.
           The largest share is valuation derived.topMarketplaceSharePct. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Seller account with no ratings' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada was checked for a seller account and no further.',
      },
      {
        /* September's badges × each listing's own month-end buy box
           (revenue-corrected.json): every badged listing, so the rows sum to
           the 2026-09 revenue row exactly (check-profile asserts it).
           🚨 The three franchise-titled rows carry NO image, on purpose (owner's
           call, 2026-10-15: no franchise art on the page); check-profile warns. */
        type: 'breakdown',
        intro: 'The plain sets lead. The three franchise-titled sets are rows three, eight and nine.',
        items: [
          { name: 'Bamboo utensil set, 6 pieces', asin: 'B0D5NLZSZS', listed: '2024-11-09', sold: 2000, price: 8.99, revenue: 17980, image: woodlandsPhoto('B0D5NLZSZS') },
          { name: 'Bamboo utensil set, 3 pieces', asin: 'B0FD7F9MSK', listed: '2026-06-14', sold: 1000, price: 10.99, revenue: 10990, image: woodlandsPhoto('B0FD7F9MSK') },
          { name: 'Bamboo set titled “Harry Gifts for All Potter Fans” — no licence shown', asin: 'B0D5NFN2YG', listed: '2024-11-12', sold: 700, price: 14.99, revenue: 10493 },
          { name: 'Bamboo utensil set, 7 pieces', asin: 'B0FD7G48D4', listed: '2024-11-12', sold: 400, price: 14.99, revenue: 5996, image: woodlandsPhoto('B0FD7G48D4') },
          { name: 'Teak utensil set, 8 pieces', asin: 'B0FD7KZYLV', listed: '2025-09-03', sold: 200, price: 27.99, revenue: 5598, image: woodlandsPhoto('B0FD7KZYLV') },
          { name: 'Danish dough whisk', asin: 'B0FD7S11QM', listed: '2025-09-02', sold: 400, price: 8.99, revenue: 3596, image: woodlandsPhoto('B0FD7S11QM') },
          { name: 'Teak spatulas, 2 pieces', asin: 'B0FD7RVW83', listed: '2025-09-21', sold: 400, price: 7.99, revenue: 3196, image: woodlandsPhoto('B0FD7RVW83') },
          { name: 'Bamboo set titled “Nightmare … Before Christmas” — no licence shown', asin: 'B0D5NHG5K6', listed: '2024-11-12', sold: 200, price: 14.99, revenue: 2998 },
          { name: 'Bamboo set titled “Star Warz gifts … for Space Wars Fans” — no licence shown', asin: 'B0D5NQJ3VZ', listed: '2024-11-12', sold: 200, price: 14.99, revenue: 2998 },
          { name: 'Teak ladle set with spoon rest, large', asin: 'B0FD7PVQTG', listed: '2025-09-21', sold: 100, price: 24.99, revenue: 2499, image: woodlandsPhoto('B0FD7PVQTG') },
          { name: 'Teak spatula, long handle', asin: 'B0FD7QXJS6', listed: '2025-09-21', sold: 300, price: 7.99, revenue: 2397, image: woodlandsPhoto('B0FD7QXJS6') },
          { name: 'Teak utensil set, 12 pieces', asin: 'B0FD7LZW9B', listed: '2025-09-03', sold: 50, price: 39.99, revenue: 1999.5, image: woodlandsPhoto('B0FD7LZW9B') },
          { name: 'Teak ladle with spoon rest', asin: 'B0FD7NT7GH', listed: '2025-09-21', sold: 100, price: 14.99, revenue: 1499, image: woodlandsPhoto('B0FD7NT7GH') },
          { name: 'Walnut tongs', asin: 'B0FRFCDK74', listed: '2025-11-05', sold: 50, price: 19.99, revenue: 999.5, image: woodlandsPhoto('B0FRFCDK74') },
          { name: 'Danish dough whisk with bread lame', asin: 'B0FSKQ3WB9', listed: '2025-09-02', sold: 100, price: 9.99, revenue: 999, image: woodlandsPhoto('B0FSKQ3WB9') },
          { name: 'Teak tongs', asin: 'B0FD7RGYWG', listed: '2025-11-05', sold: 50, price: 18.99, revenue: 949.5, image: woodlandsPhoto('B0FD7RGYWG') },
          { name: 'Teak corner spoon with spoon rest', asin: 'B0FD7HK25C', listed: '2025-09-03', sold: 100, price: 8.98, revenue: 898, image: woodlandsPhoto('B0FD7HK25C') },
          { name: 'Teak spoon with spoon rest', asin: 'B0FD86K3FY', listed: '2025-09-03', sold: 100, price: 8.98, revenue: 898, image: woodlandsPhoto('B0FD86K3FY') },
          { name: 'Teak spurtle, 12 in', asin: 'B0FD7T6VVF', listed: '2025-09-21', sold: 100, price: 6.99, revenue: 699, image: woodlandsPhoto('B0FD7T6VVF') },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times each listing’s buy box at the month’s end, so every row is a floor. The other storefront listings carry no badge and count as zero. The revenue is everyone selling on these listings: a second account held some of the buy box on the themed sets, and this seller’s own share of the month is 97%. The franchise-titled rows are shown without their images.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The cost to make under the profit is Alibaba listing prices, and the tariff assumes the goods are made in China, which the listings do not say.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text: 'Amazon US, through Amazon’s warehouses, is the only channel found — and on the themed sets a second seller account shares the listing.',
      },
      {
        type: 'prose',
        text:
          'Every listing ships from Amazon, and Amazon sells none of them itself. No brand website or social account was found. On the three franchise-titled sets and two of the plain ones a second account, TroVolt (SOUNDLY LLC), held between 2% and 12% of the buy box over the last 90 days; its own storefront lists only two of the themed sets, and it gives the same Casper registered-agent address — one thousands of companies share, so it proves nothing about who runs it. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of an $11.86 average sale, a little under a quarter is left once Amazon’s two fees, the cost to make, a tariff, freight and advertising are paid — and Amazon’s pick-and-pack fee costs about twice what making the set does.',
      },
      {
        type: 'prose',
        text:
          'Three products carry the brand. In September the bamboo set, in all its versions, was 66% of revenue, the teak utensil set 10% and the teak spatulas 8%: together the first set to reach 80%, so each has its own breakdown below and the whole brand, at September’s mix, comes last. Every cost to make is a price listed on Alibaba, read by Alibaba’s own sourcing agent rather than quoted back to a request, and one price covers every version of a product.',
      },
      {
        /* 🚨 One breakdown per main product (SKILL §2, "Products"): 66.2%, 9.8%
           and 8.1% of September, the first set to reach 80%. Tab ids are the
           "Test it first" product ids. Per-unit figures are WL_COST (pnl.json);
           the `all` tab is WL_BLEND = the seed's COST_LINES. */
        type: 'product-margins',
        period: '2026-09',
        products: [
          {
            id: 'bamboo-set',
            label: 'Bamboo utensil set',
            sharePct: 66.2,
            blocks: [
              {
                /* 🚨 Owner's call: the franchise point where the franchise sets appear. */
                type: 'callout',
                text:
                  'This product includes the three franchise-titled sets — no licence shown — at $14.99 in September, a third of the bamboo set’s revenue. The cost to make below prices a plain set; the margin is the same for the themed ones only if their engraving costs nothing extra.',
              },
              {
                /* Standard supplier columns. suppliers.json (Accio run
                   accio/bamboo-set/2026-10-17T2225, verified against its
                   screenshots): the three suppliers priced, by track record. The
                   request was for plain and generic-engraved sets only, never
                   franchise art. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a six-piece bamboo set costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Yiwu Zuqa Craft Co., Ltd.', 'Verified · 10 yrs', '4.7★ from 855 (store)', '—', '10 sets', '$2.50'],
                  ['Nanping Jianyang District Hejiale Bamboo Wood Household Supplies Co., Ltd.', 'Verified · 8 yrs', '4.6★ from 41 (store)', '—', '50 sets', '$1.55–2.29'],
                  ['Yiwu Nice Daily Necessities Co., Limited', 'Not verified · 8 yrs', '4.5★ from 322 (store)', '—', '50 sets', '$0.95–1.29'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(WL_COST['bamboo-set'].make)],
                ],
                note:
                  'Three six-piece bamboo sets from suppliers in China, each priced at the tier nearest the brand’s own yearly sales of the set, about 54,000 — $2.50 (Yiwu Zuqa lists one price), $1.55 from 10,000 sets and $0.95 from 2,000 — and averaged. They are listed prices, read by Alibaba’s sourcing agent (Accio) in a search, not quotes negotiated for an order, and none includes a logo or a box: Nanping Jianyang lists a logo from $0.20 a set and packaging from $0.50. A fourth listing was read and not priced, a five-piece set kept as the engraving reference (a graphic from $0.20 a set, from 1,000). Searched “bamboo cooking utensil set 6 pieces” and “custom laser engraved bamboo spoon set”, suppliers rated 4.5 or better with five years or more on Alibaba.',
              },
              {
                /* Freightos CN-USWC low end, calibration/freight-rates.json, read
                   2026-09-28. Volume: the six listings' units-weighted Keepa
                   package (starting-cost.bamboo-set.inputs.json cbmPerUnit). */
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one set from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '30.6 × 25.5 × 2.4 cm, 0.28 kg', 'Keepa’s package for B0D5NLZSZS, the plain six-piece'],
                  ['Volume', '0.00145 cbm', 'The six listings’ boxes, weighted by September’s units; the six-piece alone is 0.00187'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per set', '$0.72', '0.00145 cbm × $497'],
                ],
                note: 'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per set',
                noteColumns: [2],
                columns: ['Line', 'Per set', 'From'],
                rows: [
                  ['Production', lineUsd(WL_COST['bamboo-set'].make), 'Three Alibaba suppliers’ listed prices, averaged — COGS table above'],
                  ['Tariff', lineUsd(WL_COST['bamboo-set'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(WL_COST['bamboo-set'].freight), 'The set’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(WL_COST['bamboo-set'].landed), 'What one set costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 23.8% of the $11.43 average sale. “Test it first” prices its first order on this same figure.',
              },
              {
                type: 'margin',
                basis: { label: 'Average selling price', value: WL_COST['bamboo-set'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: wlPct('bamboo-set', WL_COST['bamboo-set'].make),
                    amount: WL_COST['bamboo-set'].make,
                    detail: 'Three Alibaba suppliers’ listed prices for a plain six-piece set, averaged: listing prices, not a negotiated quote, and no logo or box in them.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: wlPct('bamboo-set', WL_COST['bamboo-set'].tariff),
                    amount: WL_COST['bamboo-set'].tariff,
                    detail: 'Assumed: 20% of the cost to make, the rate this site uses for goods made in China. The listings do not say where the sets are made.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: wlPct('bamboo-set', WL_COST['bamboo-set'].freight),
                    amount: WL_COST['bamboo-set'].freight,
                    detail: 'The set’s own carton at a read sea-freight rate from China, door to door.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: WL_COST['bamboo-set'].referral,
                    detail: 'Amazon’s published Home & Kitchen rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa product record for B0D5NLZSZS, read 2026-10-15: package
                       306 × 255 × 24 mm, 281 g; pickAndPackFee 383 cents. The
                       themed and 7-piece boxes are 14–16 mm thick (Small
                       Standard by thickness) at $2.86–4.76; units-weighted $3.59. */
                    label: 'FBA fulfilment',
                    pct: wlPct('bamboo-set', WL_COST['bamboo-set'].fba),
                    amount: WL_COST['bamboo-set'].fba,
                    emphasis: true,
                    detail:
                      'Size tier: Large Standard. The best seller’s box, B0D5NLZSZS, is 12.0 × 10.0 × 0.94 in and 9.9 oz — the 0.94 in is over Small Standard’s 0.75 in — and Amazon charges $3.83 to pick and pack it. The thinner themed boxes sit inside Small Standard at $2.86; weighted by September’s units the fee is $3.59, more than twice what the set costs to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -wlAd('bamboo-set').ratePct.central,
                    amount: wlAd('bamboo-set').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(wlAd('bamboo-set').monthlyUsd.central)} a month on the set’s keywords, ${linePct(wlAd('bamboo-set').ratePct.central)} of its September revenue (band ${wlBand(wlAd('bamboo-set').monthlyUsd)}), half of it on “wooden utensil set”. A floor: it cannot see ads on product pages, automatic campaigns, Sponsored Brands or Display.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/woodlands-usa/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/woodlands-usa/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'teak-utensil-set',
            label: 'Teak utensil set',
            sharePct: 9.8,
            blocks: [
              {
                /* suppliers.json, Accio run accio/teak-utensil-set/2026-10-17T2227.
                   🚨 Both listings scaled to 8 pieces by piece count (owner's call,
                   2026-10-18): $11.79 × 8/9 and $8.99 × 8/10. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what an eight-piece teak set costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Guangzhou Raybin Homewares Co., Ltd.', 'Verified · 9 yrs', '4.9★ from 901 (store)', '—', '50 sets', '$6.40–8.04'],
                  ['Caoxian Huashen Arts And Crafts Co., Ltd.', 'Not verified · 8 yrs', '4.8★ from 4,564 (store)', '—', '100 sets', '$10.48–10.66'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(WL_COST['teak-utensil-set'].make)],
                ],
                note:
                  'Two teak utensil sets with a holder and a spoon rest, from suppliers in China. Neither is eight pieces: Caoxian Huashen’s is nine and Guangzhou Raybin’s ten, so each listed price is scaled to the brand’s eight-piece set by piece count — $11.79 × 8/9 and $8.99 × 8/10 — and the prices above are the scaled ones. Each is taken at the tier nearest the brand’s yearly sales of the set, about 3,000: $10.48 from 300 sets and $7.19 from 2,000, then averaged. Listed prices read by Alibaba’s sourcing agent (Accio) in a search, not quotes negotiated for an order, with no logo or box in them. Two more listings were read and not priced: an “acacia teak” set whose wood is not confirmed as teak, and one with no quantity tiers. Searched “teak wood kitchen utensil set 8 pieces” and “teak cooking utensils set with spoon rest”, suppliers rated 4.5 or better with five years or more on Alibaba.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one teak set from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '35.1 × 11.6 × 10.2 cm, 0.72 kg', 'Keepa’s package for B0FD7KZYLV, the eight-piece set'],
                  ['Volume', '0.00433 cbm', 'The two listings’ boxes, weighted by September’s units'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per set', '$2.15', '0.00433 cbm × $497'],
                ],
                note: 'The same Freightos reading as the bamboo set: the low end of the door-to-door band, duty excluded. A set standing in its holder ships a box three times the bamboo set’s volume.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per set',
                noteColumns: [2],
                columns: ['Line', 'Per set', 'From'],
                rows: [
                  ['Production', lineUsd(WL_COST['teak-utensil-set'].make), 'Two Alibaba suppliers’ listed prices, scaled to eight pieces and averaged — COGS table above'],
                  ['Tariff', lineUsd(WL_COST['teak-utensil-set'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(WL_COST['teak-utensil-set'].freight), 'The set’s carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(WL_COST['teak-utensil-set'].landed), 'What one set costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 42.0% of the $30.39 average sale, the dearest of the three to make.',
              },
              {
                type: 'margin',
                basis: { label: 'Average selling price', value: WL_COST['teak-utensil-set'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: wlPct('teak-utensil-set', WL_COST['teak-utensil-set'].make),
                    amount: WL_COST['teak-utensil-set'].make,
                    emphasis: true,
                    detail: 'Two Alibaba suppliers’ listed prices for nine- and ten-piece teak sets, each scaled to eight pieces by piece count and averaged: a listing price, not a negotiated quote.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: wlPct('teak-utensil-set', WL_COST['teak-utensil-set'].tariff),
                    amount: WL_COST['teak-utensil-set'].tariff,
                    detail: 'Assumed: 20% of the cost to make, on a China origin. The teak may be Indonesian — dead listings under the brand are “Indonesian Handcrafted” shelves — where the reciprocal rate is about 19%, so the line would barely move.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: wlPct('teak-utensil-set', WL_COST['teak-utensil-set'].freight),
                    amount: WL_COST['teak-utensil-set'].freight,
                    detail: 'The set’s own carton at the same sea-freight rate.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: WL_COST['teak-utensil-set'].referral,
                    detail: 'Amazon’s published Home & Kitchen rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa B0FD7KZYLV: 351 × 116 × 102 mm, 721 g, pickAndPackFee
                       602 cents; B0FD7LZW9B $6.13; weighted $6.04. */
                    label: 'FBA fulfilment',
                    pct: wlPct('teak-utensil-set', WL_COST['teak-utensil-set'].fba),
                    amount: WL_COST['teak-utensil-set'].fba,
                    detail: 'Size tier: Large Standard. The best seller’s box, B0FD7KZYLV, is 13.8 × 4.6 × 4.0 in and 1.59 lb — over Small Standard’s 0.75 in and 16 oz — and Amazon charges $6.02 to pick and pack it; with the twelve-piece set, $6.04.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -wlAd('teak-utensil-set').ratePct.central,
                    amount: wlAd('teak-utensil-set').perUnit,
                    detail: `Modelled, not observed: about ${monthUsd(wlAd('teak-utensil-set').monthlyUsd.central)} a month on the teak set’s keywords, ${linePct(wlAd('teak-utensil-set').ratePct.central)} of its September revenue: almost nothing seen. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/woodlands-usa/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/woodlands-usa/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit.',
              },
            ],
          },
          {
            id: 'teak-spatula',
            label: 'Teak spatulas',
            sharePct: 8.1,
            blocks: [
              {
                /* suppliers.json, Accio run accio/teak-spatula/2026-10-17T2225. */
                type: 'table',
                id: 'cogs-breakdown',
                caption: 'COGS — what a teak spatula costs to make',
                attribution: 'alibaba',
                columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
                rows: [
                  ['Jiangmen Expands Handicraft Co.,Ltd', 'Verified · 8 yrs', '4.9★ from 267 (store)', '—', '500 sets', '$0.75–0.95'],
                  ['Hunan Yoshine Houseware Co., Ltd.', 'Not verified · 7 yrs', '4.9★ from 234 (store)', '—', '50 pieces', '$1.98–2.39'],
                  ['Average lowest price — the cost to make used below', '', '', '', '', lineUsd(WL_COST['teak-spatula'].make)],
                ],
                note:
                  'Two 12-inch teak spatulas from suppliers in China, each priced at the tier nearest the brand’s yearly sales of its spatulas, about 9,600 — $0.75 from 3,000 and $1.98 from 500, Hunan Yoshine’s top tier — and averaged. Listed prices read by Alibaba’s sourcing agent (Accio) in a search, not negotiated quotes; a printed box adds from $0.50. Two more listings were read and not priced: one titled teak whose material reads pine, and a range with no price per model. Searched “teak wood spatula 12 inch” and “teak wooden spatula custom logo”, suppliers rated 4.5 or better with five years or more on Alibaba.',
              },
              {
                type: 'table',
                id: 'shipping-breakdown',
                caption: 'Shipping — what it costs to move one spatula from China',
                attribution: 'freightos',
                noteColumns: [2],
                columns: ['Input', 'Figure', 'Where it comes from'],
                rows: [
                  ['Carton', '30.6 × 6.0 × 1.5 cm, 0.11 kg', 'Keepa’s package for B0FD7RVW83, the two-piece set'],
                  ['Volume', '0.00065 cbm', 'The three listings’ boxes, weighted by September’s units'],
                  ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
                  ['Shipping, per unit', '$0.32', '0.00065 cbm × $497'],
                ],
                note: 'The same Freightos reading as the sets: the low end of the door-to-door band, duty excluded.',
              },
              {
                type: 'table',
                id: 'landed-cost',
                caption: 'Landed cost — production, duty and shipping, per spatula listing',
                noteColumns: [2],
                columns: ['Line', 'Per unit', 'From'],
                rows: [
                  ['Production', lineUsd(WL_COST['teak-spatula'].make), 'Two Alibaba suppliers’ listed prices, averaged — COGS table above'],
                  ['Tariff', lineUsd(WL_COST['teak-spatula'].tariff), '20% of the cost to make, assuming China origin — the tariff line below'],
                  ['Shipping', lineUsd(WL_COST['teak-spatula'].freight), 'The carton at $497/cbm — shipping table above'],
                  ['Landed cost', lineUsd(WL_COST['teak-spatula'].landed), 'What one costs to reach Amazon’s door, before it sells'],
                ],
                note: 'The first three cost lines of the breakdown below, added up: 24.9% of the $7.87 average sale.',
              },
              {
                type: 'margin',
                basis: { label: 'Average selling price', value: WL_COST['teak-spatula'].price },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: wlPct('teak-spatula', WL_COST['teak-spatula'].make),
                    amount: WL_COST['teak-spatula'].make,
                    detail: 'Two Alibaba suppliers’ listed prices for a 12-inch teak spatula, averaged: listing prices, not a negotiated quote.',
                    links: [
                      { label: 'See landed cost above', href: '#landed-cost' },
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                    ],
                  },
                  {
                    label: 'Tariff',
                    pct: wlPct('teak-spatula', WL_COST['teak-spatula'].tariff),
                    amount: WL_COST['teak-spatula'].tariff,
                    detail: 'Assumed: 20% of the cost to make, on the same China basis as the sets.',
                    links: [
                      { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Shipping',
                    pct: wlPct('teak-spatula', WL_COST['teak-spatula'].freight),
                    amount: WL_COST['teak-spatula'].freight,
                    detail: 'The carton at the same sea-freight rate.',
                    links: [
                      { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
                      { label: 'See landed cost above', href: '#landed-cost' },
                    ],
                  },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    amount: WL_COST['teak-spatula'].referral,
                    detail: 'Amazon’s published Home & Kitchen rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    /* Keepa B0FD7RVW83: 306 × 60 × 15 mm, 109 g, pickAndPackFee
                       258 cents. B0FD7QXJS6 is 45 mm thick (Large Standard), $3.50. */
                    label: 'FBA fulfilment',
                    pct: wlPct('teak-spatula', WL_COST['teak-spatula'].fba),
                    amount: WL_COST['teak-spatula'].fba,
                    emphasis: true,
                    detail: 'Size tier: Small Standard. The best seller’s box, the two-piece B0FD7RVW83, is 12.0 × 2.4 × 0.59 in and 3.8 oz — inside Small Standard’s 15 × 12 × 0.75 in and 16 oz — and Amazon charges $2.58. The single long-handled spatula ships thicker, at 1.77 in, so it is Large Standard at $3.50; weighted by September’s units the fee is $2.98, twice the cost to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    /* 0 is the model's central rate, not a rounding: no ad of theirs
                       was seen on the spatulas' keywords (adspend.json). */
                    label: 'Advertising',
                    pct: -wlAd('teak-spatula').ratePct.central,
                    amount: wlAd('teak-spatula').perUnit,
                    detail: 'Modelled at nothing: no ad of theirs was seen on the spatulas’ keywords. A floor — ads on product pages, automatic campaigns, Sponsored Brands and Display are invisible to the model.',
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/woodlands-usa/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/woodlands-usa/advertising/' },
                    ],
                  },
                ],
                note: 'Before storage, returns and overhead, none of which is modelled: a ceiling on profit, not profit. At this price Amazon’s two fees are over half of a sale, so 20% on ads would leave under 5%.',
              },
            ],
          },
          {
            id: 'all',
            label: 'Whole brand',
            blended: true,
            blocks: [
              {
                /* 🚨 The backend seed builds the profit and ad-spend series from
                   the SAME numbers (seed-woodlands-usa.ts COST_LINES, generated
                   from pnl.json): WL_BLEND + 15% referral + WL_AD's rate.
                   76.246% off leaves 23.754%. Until 2026-10-18 the cost to make
                   was a placeholder and there was no ad line. */
                type: 'margin',
                basis: { label: 'Average selling price', value: WL_AVG_SALE },
                lines: [
                  {
                    label: 'Cost of goods',
                    key: 'cogs',
                    pct: -WL_BLEND.cogs,
                    detail: 'Each product’s Alibaba cost to make, on September’s mix — $1.67 a bamboo set, $8.84 a teak set, $1.37 a spatula — with the rest of the catalogue at the same share. See each product’s tab for its suppliers.',
                  },
                  { label: 'Tariff', pct: -WL_BLEND.tariff, detail: 'Assumed: 20% of the cost to make, on a China origin.' },
                  { label: 'Shipping', pct: -WL_BLEND.freight, detail: 'Each product’s carton at the same Freightos sea-freight rate, on September’s mix.' },
                  {
                    label: 'Amazon referral fee',
                    pct: -15,
                    detail: 'Amazon’s published Home & Kitchen rate, a flat 15%.',
                    links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
                  },
                  {
                    label: 'FBA fulfilment',
                    pct: -WL_BLEND.fba,
                    emphasis: true,
                    detail: 'Size tier: Large Standard. The best seller, the plain six-piece B0D5NLZSZS, is 12.0 × 10.0 × 0.94 in and 9.9 oz — just over Small Standard’s 0.75 in — at $3.83 to pick and pack, on a set now sold at $8.99. On September’s mix the largest cost line, nearly twice the cost to make.',
                    links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
                  },
                  {
                    label: 'Advertising',
                    pct: -WL_AD.ratePct.central,
                    detail: `Modelled, not observed: ${linePct(WL_AD.ratePct.central)} of revenue — amazon-adspend-spy’s rate on the three products (about ${monthUsd(WL_AD.monthlyUsd.central)} a month on them, band ${wlBand(WL_AD.monthlyUsd)}), applied here to the whole brand. A floor.`,
                    links: [
                      { label: 'See the ad spend behind this line', href: '/business/woodlands-usa/advertising/#ad-spend' },
                      { label: 'If you want to go in depth, go to the Advertising section', href: '/business/woodlands-usa/advertising/' },
                    ],
                  },
                ],
                note:
                  'Before storage, returns, removals and overhead, none of which is modelled: a ceiling on profit, not profit. The profit series uses this September breakdown for every month; the 2024–25 months were the bamboo sets alone at higher prices, so they show the shape of the series, not their own margins.',
              },
            ],
          },
        ],
      },
      {
        type: 'prose',
        text:
          'Amazon is paid more than the factory, by a wide margin. On a set that sells for $8.99 to $14.99, the pick-and-pack fee alone is about twice the cost to make, and the referral fee is about the same again as making it. That is what the price cuts have done: the fees are fixed in dollars, so each dollar off the price comes out of what is left.',
      },
      {
        type: 'callout',
        text:
          'The margin is the same whatever the set is engraved with, but the revenue it applies to is not: a third of the trailing year came from the franchise-titled sets, with no licence shown. The cost lines here would not change if those listings went; the business they are a share of would.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-17, read at New York 10001. */
        type: 'strategy',
        label: WL_AD.strategy,
        points: [
          'Half of the modelled spend is on one search, “wooden utensil set”, the biggest generic one their listings rank on, where theirs are about a quarter of the sponsored results. None is on their own name.',
          'Of the fifteen biggest generic searches they rank on, they buy three: “wooden utensil set”, “wooden spoons” and “nightmare before christmas gifts”. They do not buy “wooden spoons for cooking”, “cooking utensils”, “wooden spatula” or “harry potter gifts”.',
          'About a tenth of the modelled spend sits on franchise searches — “nightmare before christmas gifts” and Harry Potter ones — for the sets titled for them.',
          'Ads of theirs were seen on 39 keywords read one by one and on about 670 smaller ones estimated from a sample, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside. No ad library off Amazon was read.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: WL_TOP_KEYWORDS,
        visibleRows: 10,
        note: `Jungle Scout, for the three products’ listings: exact-match monthly searches and the best organic position any of them held, among the fifty biggest keywords where one ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(topSpend(WL_TOP_KEYWORDS))} of the ${monthUsd(WL_AD.monthlyUsd.central)} a month on the three products; the rest is on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(WL_AD_KEYWORDS, WL_AD_KEYWORDS_TOTAL, WL_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, the bamboo sets rank fifth on “wooden spoons” and “wooden spoons for cooking” and ninth on “wooden utensil set”. On the biggest of them they also buy ads; on “wooden spoons for cooking”, nearly as big, they rely on the organic rank alone.',
      },
      {
        type: 'prose',
        text:
          'The teak line is barely advertised: under $20 a month was modelled on the teak set and nothing on the spatulas, though the teak set ranks tenth unpaid on “teak wooden utensil set”.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(WL_AD.monthlyUsd.central)} a month on the three products, ${linePct(WL_AD.ratePct.central)} of their revenue — modelled`,
            counted: 'Ads on 39 keywords read and about 670 estimated — Jungle Scout share of voice; a New York read of 15 searches',
            flag: true,
            note: `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid; band ${wlBand(WL_AD.monthlyUsd)}. The largest keywords with an ad of theirs were read one by one and the smaller ones estimated from a stratified sample. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because no row here was sponsored-dominant enough to measure one. Six keywords over Jungle Scout’s 50-character limit and one with no bid are not modelled. A floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The margin applies the same rate to the rest of the catalogue; the Ad spend table below is exactly what it takes off.`,
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: no ad library was read, and no site or social account was found.',
      },
      {
        /* The Margin breakdown's advertising lines, row for row, built from
           WL_AD: one row per product tab, the rest of the catalogue at the same
           rate, and the Whole brand line. check-profile fails if they drift. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...WL_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${wlBand(p.monthlyUsd)}`]),
          ['The rest of the catalogue', monthUsd(WL_REST.month), linePct(WL_AD.ratePct.central), lineUsd((WL_REST.avgSale * WL_AD.ratePct.central) / 100), 'The three products’ rate, applied: not modelled keyword by keyword'],
          ['Total — the margin line', monthUsd(WL_AD_MONTH), linePct(WL_AD.ratePct.central), lineUsd((WL_AVG_SALE * WL_AD.ratePct.central) / 100), `Modelled: ${wlBand(WL_AD.monthlyUsd)} on the three products`],
        ],
        note: 'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of each product’s average sale, and of the $11.86 brand average on the last row.',
      },

      /* Socials and traffic OMITTED: no website, social account or press was
         found for the brand (woodlandsamerica.com is a closed Shopify store not
         confirmed as theirs). An empty section would read as "looked and found
         nothing" — which is what the How it sells prose already says. */

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Legal name', value: 'WOODLANDS AMERICA LLC', note: 'Trading on Amazon as WOODLANDS AMERICA' },
          { label: 'Amazon seller', value: 'AJ7EHD6HZ4QZ2', note: 'WOODLANDS AMERICA' },
          { label: 'Address', value: '5830 E 2nd St Ste 7000, Casper, WY', note: '82609 — a registered agent’s address, not where they operate' },
          { label: 'Seller feedback', value: '93%', note: 'Over 247 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '9 Nov 2024' },
        ],
      },
      {
        type: 'prose',
        text:
          'WOODLANDS AMERICA LLC is a Wyoming company whose only address on record belongs to a registered agent, so where it actually operates is not known. No founder, website, press or social account was found, and a search for the brand’s own figures turned up nothing. The brand name also sits on twenty dead listings, among them “Indonesian Handcrafted” floating shelves, which may point to where the teak comes from. Nobody at the company has spoken to us: every fact here comes from Keepa, Amazon and the public web.',
      },

      { type: 'section', id: 'valuation', title: 'Valuation', group: "What it's worth" },
      {
        type: 'lede',
        text:
          'Nobody has priced this business. What follows is a model — a base multiple moved by what the public record supports — applied to trailing-twelve profit, and the franchise-titled sets take the largest single deduction on it.',
      },
      { type: 'valuation' },
      {
        type: 'valuation-board',
        note:
          'Amazon US is the whole of what is valued; no other channel was found. The profit being multiplied rests on Alibaba listing prices and an assumed China tariff, and deducts no overhead. The open IP issue is an inference from the listings, not a known complaint.',
      },
      {
        type: 'prose',
        text:
          'The IP risk enters through the model’s own input for it: an unresolved account or IP issue, which takes 0.8 off the multiple — more than any other single factor on the board. Three of the bamboo sets are titled for film franchises and one carries franchise imagery, with no licence shown on any of them; no complaint against them is on the public record, so this is a reading of the listings, not of a dispute. It matters because of how much rests on them: 56% of December 2025, 21% of September 2026 and about a third of the trailing year’s revenue — the year this multiple is applied to. Without that input the same profit would be valued at well over half as much again.',
      },
      {
        type: 'prose',
        text:
          'Past the IP question the record is thin and young: under two years of trading, a standard bamboo set factories list as stock, all of it on Amazon US, more than a quarter of the trailing year in one December, and seller feedback just under the line the model rewards. Against that, the review pools and the 4.6-star rating are real, and the brand store is enrolled in Brand Registry. Sourcing, catalogue shape, the differentiation level and the IP issue itself are inferences from the public record, and they are the first things to put to the owner — the licence question above all.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. The published estimate is created by
         make-validation-launch.mjs (--variants "bamboo-set=bamboo;teak-utensil-
         set=teak", --exclude the franchise terms — 🚨 never a franchise
         version, owner's call — and competitor brands; --products leaves out
         the spatulas, whose searches have no competing listing with enough
         modelled clicks to set a pass line). These blocks carry no data. */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether a copy sells, before you commit to a full launch — tested on a plain bamboo set and the teak set, never a franchise design. The spatulas are left out: their searches had too few competing listings measured to set a pass line.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },
  'songbird-specialties': {
    /* 🚨 No headline copy here. The title, subtitle and snapshot month live on
       the Business row — backend prisma/seed-songbird-specialties-headline.ts,
       generated from waithowmuch-research research/songbird-specialties/
       headline.json (a DRAFT awaiting the owner's approval) — and the page
       reads them from the row alone. The image is the red pourer, B0F1H6B5VJ,
       the best seller. */
    headline: {
      image: {
        src: songbirdPhoto('B0F1H6B5VJ'),
        alt: 'The Songbird Specialties wine pourer in red: a small bird carved from acacia wood with a red silicone wing and a brass beak, on a black stopper with a steel pour tube',
      },
    },

    /* 🚨 NO `valuation` entry, on purpose: the series has 11 whole months
       (November 2025 to September 2026), one short of the twelve a
       trailing-twelve profit needs, and the model would multiply a year that
       has not happened. Revisit when October 2026 closes the twelfth. */

    facts: [
      /* Keepa product finder, brand "SONGBIRD SPECIALTIES": 7 ASINs, one product. */
      { label: 'SKUs', value: '7', note: 'One pourer in seven colours; four carry a sold badge, three were listed in October 2026', info: 'skus' },
      /* The hero's own breadcrumb (Keepa categoryTree, B0F1H6B5VJ). */
      {
        label: 'Category',
        value: 'Home & Kitchen › Kitchen & Dining › Kitchen Utensils & Gadgets › Bar & Wine Tools › Wine Stoppers & Pourers › Wine Pourers',
        note: '#6 in Wine Pourers for the red pourer',
        info: 'category',
        wide: true,
      },
      { label: 'Product reviews', value: '172', note: 'On the red pourer', info: 'reviews' },
      { label: 'Product rating', value: '4.6★', note: 'Red pourer', info: 'rating' },
      { label: 'Seller feedback', value: '99%', note: 'Over 12,180 ratings — the parent company’s whole account', info: 'sellerFeedback' },
      { label: 'Sourcing', value: 'Private label', note: 'Their own design, “patent pending”; where it is made is not stated — an inference', info: 'sourcing', text: true, learnMore: '/business-attributes/' },
      { label: 'Catalogue', value: 'Single product', note: 'One pourer in several colours is the whole brand — an inference', info: 'catalogue', text: true, learnMore: '/business-attributes/' },
      /* 🚨 Level 3 and an inference: a carved wood body, silicone wings and a
         whistle in the pour tube is a change of function, not a colourway. The
         case for level 4 is the moulds and the "patent pending" — neither was
         read, and a rival (GurglePot's ChirpyTop) sells the same idea. */
      { label: 'Differentiation', value: 'Level 3', note: 'A pourer that whistles as it pours, their own design; a claimed patent was not checked and a rival sells the same idea — an inference', info: 'differentiation', text: true, learnMore: '/business-attributes/' },
      { label: 'Channels', value: 'Amazon US, own store, wholesale', info: 'channels' },
    ],

    selling: {
      // ── Channels ──────────────────────────────────────────────────────
      'amazon-domestic': {
        status: 'yes',
        note: 'The only channel with a number behind it, and the whole of the revenue on this profile. The seller holds the buy box all of the time.',
      },
      /* 'unchecked': listed on Canada, no badge, so nothing measurable. */
      'amazon-international': {
        status: 'unchecked',
        note: 'The pourer is listed on Amazon Canada at C$62.99 under the same seller, with no sold badge; none was found on the UK or Germany.',
      },
      'own-store': {
        status: 'yes',
        note: 'totallybamboo.com, the parent company’s Shopify store, sells all four colours at $29.99. Its sales are not counted here.',
      },
      'wholesale-out': {
        status: 'yes',
        note: 'The parent company sells wholesale on Faire, and museum and gift shops stock the pourer — the Denver Art Museum shop at $40. None of it is in the revenue.',
      },
      // 'tiktok-shop' and 'other-marketplace' left unchecked: nobody looked.

      // ── Fulfilment ────────────────────────────────────────────────────
      fba: {
        status: 'yes',
        note: 'Every badged colour ships from Amazon, sold by Totally Bamboo: the margin charges Amazon’s pick-and-pack fee.',
      },
      fbm: {
        status: 'yes',
        note: 'A merchant-fulfilled offer from the same seller also appears on the listing, last seen early in 2026.',
      },
      'vendor-1p': { status: 'no', note: 'Amazon sells none of the colours itself.' },

      // ── Supply ────────────────────────────────────────────────────────
      'private-label': {
        status: 'yes',
        note: 'Their own design and a registered brand name, on listings nobody else holds the buy box on. Where it is made is not stated.',
      },
      arbitrage: { status: 'no' },

      // ── Programmes ────────────────────────────────────────────────────
      'brand-registry': {
        status: 'yes',
        note: 'A Brand Store at /stores/SongbirdSpecialties, which Amazon gates behind Brand Registry enrolment.',
      },
    },

    intro:
      'Songbird Specialties is one product: a wine-bottle pourer shaped like a small wooden bird that whistles as the wine pours. It is a brand line of Totally Bamboo, a California bamboo cutting-board company, and sells from that company’s long-established Amazon account.',

    blocks: [
      { type: 'heading', text: 'A bird that sings when the wine pours' },
      {
        type: 'prose',
        text:
          'The pourer is a small bird carved from acacia wood, with silicone wings in red, turquoise, blue or black, a stainless pour tube and a beak the wine runs out of; air drawn through the tube whistles as it pours. It sits in a bottle like any pourer, at $29.99, the only price it has sold at on Amazon. Three more colours — rainbow, pink and all black — were listed in October 2026.',
      },
      {
        type: 'prose',
        text:
          'It is the one product of a brand, not a business of its own: the seller is Totally Bamboo, whose Amazon account carries over five hundred bamboo kitchen products and 12,180 ratings. A new seller copying the pourer would start without that account’s history behind it, and this page cannot say how much of the pourer’s sales it brings.',
      },
      /* 🚨 NO FIGURES IN THE CAPTION. The brand's own listing photos, in our
         bucket. */
      {
        type: 'images',
        items: [
          { src: songbirdPhoto('B0F1H6B5VJ'), alt: 'The red pourer: an acacia-wood bird with a red silicone wing and a brass beak on a black stopper' },
          { src: songbirdPhoto('B0F1HFM4WP'), alt: 'The turquoise pourer, the same wooden bird with a turquoise wing' },
          { src: songbirdPhoto('B0F1GWKYHG'), alt: 'The blue pourer, the same wooden bird with a blue wing' },
        ],
        caption: 'The pourer in three of its colours, as the brand’s own Amazon listings show it.',
      },

      { type: 'section', id: 'timeline', title: 'Timeline', group: 'Overview' },
      {
        type: 'lede',
        text: 'Eight months under Amazon’s sold badge, then a first Christmas, an empty January, and a spring and a September that both beat it.',
      },
      {
        /* Oldest first. Month-end revenue events date to the last day of the month. */
        type: 'timeline',
        items: [
          {
            when: '21 Feb 2025',
            tag: 'Amazon',
            what: 'The pourer is listed in four colours',
            detail: 'Red, turquoise, blue and black, under the new brand name.',
          },
          {
            when: '26 Mar 2025',
            tag: 'Web',
            what: 'On Totally Bamboo’s own store',
            detail: 'At $29.99, the same price as Amazon.',
          },
          {
            when: '26 Oct 2025',
            tag: 'Amazon',
            what: 'The first sold badge',
            detail: 'Eight months after listing, the black pourer crosses Amazon’s threshold of about fifty a month.',
          },
          {
            when: '31 Dec 2025',
            tag: 'Amazon',
            what: '600 sold in the first December',
            detail: 'About $18,000.',
          },
          {
            when: '31 Jan 2026',
            tag: 'Amazon',
            what: 'Under the badge in January',
            detail: 'No colour reached the threshold, so January counts as zero: each sold under about fifty.',
          },
          {
            when: '30 Apr 2026',
            tag: 'Amazon',
            what: '1,000 sold in April',
            detail: 'Over half again December’s count, outside the holiday season.',
          },
          {
            when: '30 Sep 2026',
            tag: 'Amazon',
            what: '1,100 sold in September',
            detail: 'The best month so far: red 500, turquoise 300, blue 200, black 100.',
          },
          {
            when: '2 Oct 2026',
            tag: 'Amazon',
            what: 'Three more colours',
            detail: 'Rainbow, pink and all black, with no badge yet.',
          },
        ],
      },

      { type: 'section', id: 'revenue', title: 'Revenue', group: 'What it earns' },
      {
        type: 'prose',
        text:
          'This is not a Christmas-only gift. December sold 600, January fell under the badge, and then April and September both sold more than December did. More than half of each month is kept, after Amazon’s two fees, the quoted cost to make it, an assumed tariff, freight and a modest modelled ad line — a margin a $29.99 price with a light box allows.',
      },
      {
        type: 'prose',
        text:
          'The series counts the brand’s own seven listings, not the parent seller’s other five hundred, at $29.99 every month. It starts in November 2025 because the pourer sold under the badge for the eight months before; the zero January is the same floor, not a month without a sale.',
      },
      { type: 'chart' },
      {
        /* 🚨 Canada at 0%: listed with no badge, so not measured. The largest
           share is the US; no valuation reads it on this profile. */
        type: 'marketplaces',
        title: 'Which Amazon marketplaces it sells in',
        intro: 'Everything measured is Amazon US.',
        items: [
          { label: 'Amazon United States', short: 'US', share: 100 },
          { label: 'Amazon Canada', short: 'CA', share: 0, note: 'Listed at C$62.99 with no sold badge' },
          { label: 'Amazon UK and Germany', short: 'UK, DE', share: 0, note: 'No seller account' },
        ],
        note: 'Shares of the latest month’s Amazon revenue. Canada sells below the badge threshold, so nothing there is counted.',
      },
      {
        /* September's badges × $29.99 (revenue-corrected.json): every badged
           colour, so the rows sum to the 2026-09 revenue row exactly. */
        type: 'breakdown',
        intro: 'Four colours of one pourer. Red is close to half the month.',
        items: [
          { name: 'Singing bird wine pourer — Red', asin: 'B0F1H6B5VJ', listed: '2025-02-21', sold: 500, price: 29.99, revenue: 14995, image: songbirdPhoto('B0F1H6B5VJ') },
          { name: 'Singing bird wine pourer — Turquoise', asin: 'B0F1HFM4WP', listed: '2025-02-21', sold: 300, price: 29.99, revenue: 8997, image: songbirdPhoto('B0F1HFM4WP') },
          { name: 'Singing bird wine pourer — Blue', asin: 'B0F1GWKYHG', listed: '2025-02-21', sold: 200, price: 29.99, revenue: 5998, image: songbirdPhoto('B0F1GWKYHG') },
          { name: 'Singing bird wine pourer — Black', asin: 'B0F1H8J8RW', listed: '2025-02-21', sold: 100, price: 29.99, revenue: 2999, image: songbirdPhoto('B0F1H8J8RW') },
        ],
        note:
          '“Sold / mo” is Amazon’s own badge, a band, hence n+. Revenue is that band times the $29.99 price, so every row is a floor. The three colours listed in October carry no badge yet.',
      },
      {
        type: 'callout',
        text:
          'Revenue is a floor and profit is a ceiling. The cost to make under the profit is two Alibaba factories’ quotes for a copy, not the brand’s own cost — Margin breakdown shows them — and the parent company’s own store, its wholesale and the gift shops are in neither.',
      },

      { type: 'section', id: 'how-it-sells', title: 'How it sells', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text: 'Amazon is the measured part. The parent company’s own store, its wholesale account and the gift shops that stock the pourer publish no numbers.',
      },
      {
        type: 'prose',
        text:
          'On Amazon every badged colour ships from Amazon’s warehouses, sold by Totally Bamboo with the buy box all of the time, and the listing carries an Amazon’s Choice badge. Off it, totallybamboo.com sells the four colours at the same $29.99 beside about six hundred bamboo products, the company sells wholesale on Faire, and museum and gift shops carry the pourer, the Denver Art Museum’s at $40. What follows is presence rather than share, and a method nobody looked for is listed as unchecked rather than counted as absent.',
      },
      { type: 'selling' },

      { type: 'section', id: 'margin', title: 'Margin breakdown', group: 'What it earns', asOf: true },
      {
        type: 'lede',
        text:
          'Of a $29.99 pourer, more than half is left once Amazon’s two fees, the cost to make, a tariff, freight and advertising are paid — on a cost to make two Alibaba factories quoted.',
      },
      {
        type: 'prose',
        text:
          'There is one product to cost: four colours of one pourer, one price. Amazon’s fees and the advertising are read or modelled for the pourer itself, and the cost to make is now quoted: two Alibaba factories priced a carved wood bird with silicone wings and a whistling pour tube, and the figure below is their average. Where the brand’s own pourer is made is still not stated, so the tariff assumes China.',
      },
      {
        /* waithowmuch-research research/songbird-specialties/suppliers.json
           (source accio), run accio/singing-bird-pourer/2026-10-25T1146,
           verified against its screenshots and confirmed by the owner in the
           Alibaba chat, 2026-10-25. Track record, rating and sales were not
           read for either store (null in suppliers.json), hence the dashes;
           suppliers.json order. Until 2026-10-25 this table held OUR $4.00
           placeholder. */
        type: 'table',
        id: 'cogs-breakdown',
        caption: 'COGS — what a pourer costs to make',
        attribution: 'alibaba',
        columns: ['Supplier', 'Track record', 'Buyer rating', 'Sold on Alibaba', 'MOQ', 'Unit price'],
        rows: [
          ['Dongguan City Kingtop Metal Product Co., Ltd.', '—', '—', '—', 'Not stated', '$2.28'],
          ['Shenzhen Sinowin Wine Accessories Co., Ltd.', '—', '—', '—', '500 pieces', '$3.35–3.85'],
          ['Average of the two quotes', '', '', '', '', lineUsd(SB_COST.factory)],
          ['Mould, spread over a year — $1,200 once ÷ ~13,200 pourers', '', '', '', '', lineUsd(SB_COST.mouldPerUnit)],
          ['Cost to make used below', '', '', '', '', lineUsd(SB_COST.make)],
        ],
        note:
          'Two factories quoted the pourer as briefed: an acacia-wood bird body, silicone wings, a plastic beak over a stainless whistling pour tube, silicone stopper rings and a printed box. Kingtop: $2.28 a piece, a figure with no quantity attached, so it is taken at every quantity, plus a $1,200 mould, paid once; it gave no minimum or lead time. Sinowin already has the tooling, so no mould: $3.85, $3.75, $3.65, $3.55, $3.45 and $3.35 at 500, 1,000, 3,000, 5,000, 10,000 and 20,000, EXW (FOB Shenzhen for a flat $500 more), its own simple packaging, 35 days to make, no samples, and food-contact testing (FDA/LFGB) at about $900 if wanted. Sinowin also warned of a third-party patent risk on the design. Each at the tier nearest the brand’s yearly sales of about 13,200 — $2.28 and $3.45 — and averaged. Two more factories did not reply and one declined. Requested through Alibaba’s sourcing agent (Accio), read 18 October 2026, and checked against its screenshots of the replies. Sinowin’s mould is its own, so a copy needs one too: Kingtop’s $1,200 is spread over a year’s sales of about 13,200 — $0.09 a pourer — and added to the cost to make.',
      },
      {
        /* The freight half at the dated LCL rate every profile uses —
           waithowmuch-research calibration/freight-rates.json, CN-USWC low end,
           read 2026-09-28. Keepa B0F1H6B5VJ: 190 × 116 × 59 mm, 141 g. */
        type: 'table',
        id: 'shipping-breakdown',
        caption: 'Shipping — what it costs to move one pourer from China',
        attribution: 'freightos',
        noteColumns: [2],
        columns: ['Input', 'Figure', 'Where it comes from'],
        rows: [
          ['Carton', '19.0 × 11.6 × 5.9 cm, 0.14 kg', 'Keepa’s package for B0F1H6B5VJ, the red pourer; the colours share one box'],
          ['Volume', '0.0013 cbm', 'The carton, in cubic metres'],
          ['Rate', '$497 / cbm', 'Less-than-container-load, China → US West Coast, door to door'],
          ['Shipping, per pourer', '$0.65', '0.0013 cbm × $497'],
        ],
        note:
          'The rate is the low end of Freightos’ door-to-door band, customs clearance and delivery included and duty excluded. The lane assumes a Chinese factory: both that quoted are in China, though where the brand’s own pourer is made is not stated.',
      },
      {
        /* Derived from the two tables above and the tariff line, so no source logo. */
        type: 'table',
        id: 'landed-cost',
        caption: 'Landed cost — production, duty and shipping, per pourer',
        noteColumns: [2],
        columns: ['Line', 'Per pourer', 'From'],
        rows: [
          ['Production', lineUsd(SB_COST.factory), 'Two Alibaba suppliers’ quotes, averaged — COGS table above'],
          ['Mould, spread over a year', lineUsd(SB_COST.mouldPerUnit), '$1,200 once ÷ ~13,200 pourers, a year’s sales — COGS table above'],
          ['Tariff', lineUsd(SB_COST.tariff), '20% of the factory price, assuming China origin; the mould is paid once, not shipped — the tariff line below'],
          ['Shipping', lineUsd(SB_COST.freight), 'The pourer’s carton at $497/cbm — shipping table above'],
          ['Landed cost', lineUsd(SB_COST.landed), 'What one pourer costs to reach Amazon’s door, before it sells'],
        ],
        note: 'The first three cost lines of the breakdown below, added up: 13.9% of the $29.99 price. Amazon’s fees are their own lines. The $1,200 mould is in it, spread over a year’s sales.',
      },
      {
        /* 🚨 The profit series is 100% less these lines — 55.797% — and the
           backend seed builds it from the SAME percentages. */
        type: 'margin',
        basis: { label: 'Selling price', value: SB_COST.price },
        lines: [
          {
            label: 'Cost of goods',
            key: 'cogs',
            pct: -SB_COST.makePct,
            amount: SB_COST.make,
            emphasis: true,
            detail: 'Two Alibaba factories’ quotes for the pourer, each at the tier nearest about 13,200 a year, averaged: $2.28 and $3.45, $2.87. Plus Kingtop’s $1,200 mould, paid once and spread over a year’s sales: $0.09 a pourer.',
            links: [
              { label: 'See landed cost above', href: '#landed-cost' },
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
            ],
          },
          {
            label: 'Tariff',
            pct: -SB_COST.tariffPct,
            amount: SB_COST.tariff,
            detail: 'Assumed: 20% of the $2.87 factory price, the rate this site uses for goods made in China; the mould is paid once, not shipped with each pourer, so it carries no duty here. Neither the listing nor their own store says where the pourer is made.',
            links: [
              { label: 'See COGS breakdown above', href: '#cogs-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Shipping',
            pct: -SB_COST.freightPct,
            amount: SB_COST.freight,
            detail: 'The pourer’s own carton at a read sea-freight rate from China, door to door.',
            links: [
              { label: 'See shipping breakdown above', href: '#shipping-breakdown' },
              { label: 'See landed cost above', href: '#landed-cost' },
            ],
          },
          {
            label: 'Amazon referral fee',
            pct: -15,
            amount: SB_COST.referral,
            detail: 'Amazon’s published Home & Kitchen rate, a flat 15%.',
            links: [{ label: 'Amazon’s referral fees by category', href: 'https://sell.amazon.com/pricing' }],
          },
          {
            /* Keepa product record for B0F1H6B5VJ, read 2026-10-15: package
               190 × 116 × 59 mm, 141 g; pickAndPackFee 435 cents.
               sources.json carries the same. */
            label: 'FBA fulfilment',
            pct: -SB_COST.fbaPct,
            amount: SB_COST.fba,
            detail: 'Size tier: Large Standard. The best seller’s box, B0F1H6B5VJ, is 7.5 × 4.6 × 2.3 in and 5.0 oz — the 2.3 in is over Small Standard’s 0.75 in — and Amazon charges $4.35 to pick and pack it. Every colour ships in the same box.',
            links: [{ label: 'All of Amazon’s size tiers, explained', href: 'https://sellercentral.amazon.com/help/hub/reference/external/GG5KW835AHDJCH8W?locale=en-US' }],
          },
          {
            label: 'Advertising',
            pct: -SB_AD.ratePct.central,
            amount: SB_AD.products[0].perUnit,
            detail: `Modelled, not observed: about ${monthUsd(SB_AD.monthlyUsd.central)} a month, ${linePct(SB_AD.ratePct.central)} of September’s revenue (band ${sbBand(SB_AD.monthlyUsd)}), most of it on “wine pourer” and on searches naming the pourer itself. A floor: it cannot see ads on product pages, automatic campaigns, Sponsored Brands or Display.`,
            links: [
              { label: 'See the ad spend behind this line', href: '/business/songbird-specialties/advertising/#ad-spend' },
              { label: 'If you want to go in depth, go to the Advertising section', href: '/business/songbird-specialties/advertising/' },
            ],
          },
        ],
        note:
          'Before returns, storage and overhead, none of which is modelled: a ceiling on profit, not profit. The one-time $1,200 mould is in the cost of goods, spread over a year’s sales. The two quotes are $1.17 apart, and every dollar of cost to make moves the margin by over three points.',
      },
      {
        type: 'prose',
        text:
          'The price does the work. At $29.99 for a 5-ounce box, Amazon’s two fees take under a third of a sale, and even at the dearer of the two factory quotes more than half is left — a margin few kitchen gadgets this size reach. What it costs is the account behind it: the pourer sells from a seller with twenty years and twelve thousand ratings, and a new listing would pay for its first reviews in ads.',
      },
      {
        type: 'callout',
        text:
          'Profit here is a modelled ceiling on two factories’ quotes for the cost to make, one of them a figure with no quantity attached, and an assumed origin for the tariff. The $1,200 mould one of them charges is paid once: the margin spreads it over a year’s sales, and Test it first pays it up front.',
      },

      { type: 'section', id: 'advertising', title: 'Advertising', group: 'Where demand comes from', asOf: true },
      {
        /* amazon-adspend-spy's strategy.label, adspend.json 2026-10-17, read at New York 10001. */
        type: 'strategy',
        label: SB_AD.strategy,
        points: [
          'The modelled spend is small and spread thin: the most on “wine pourer”, where theirs are about a quarter of the sponsored results and an ad of theirs was second in the New York read, then on phrases that describe the pourer itself, such as “whistling bird wine pourer”.',
          'About a ninth is on their own name, and one search where theirs are all the sponsored results is a rival’s: “chirpy top wine pourer”, the name of the competing bird pourer.',
          'Of the fifteen biggest generic searches the pourer ranks on, they buy one, “wine pourer”. They do not buy “wine stopper”, the biggest at 59,197 a month, “wine gifts” or “bird gifts”.',
          'Ads of theirs were seen on 23 keywords read one by one and about 20 more estimated from a sample, and the spend is a floor: automatic campaigns, product-page ads, Sponsored Brands and Display are invisible from outside. No ad library off Amazon was read.',
        ],
      },
      {
        type: 'table',
        caption: 'Top keywords',
        columns: ['Keyword', 'Searches a month', 'Organic rank', 'Their ads', 'Cost per click', 'Ad spend a month'],
        rows: SB_TOP_KEYWORDS,
        visibleRows: 10,
        note: `Jungle Scout, for the pourer’s listings: exact-match monthly searches and the best organic position any of them held, among the fifty biggest keywords where one ranks in the top 60 or carries an ad. “Their ads” is the brand’s share of the sponsored results where Jungle Scout’s share of voice was read, weighted by position. Cost per click is Amazon’s own suggested exact bid. Ad spend is modelled. These fifty carry ${monthUsd(topSpend(SB_TOP_KEYWORDS))} of the ${monthUsd(SB_AD.monthlyUsd.central)} a month; the rest is on keywords outside the fifty, listed in the next table.`,
      },
      adKeywordsTable(SB_AD_KEYWORDS, SB_AD_KEYWORDS_TOTAL, SB_AD.monthlyUsd.central),
      {
        type: 'prose',
        text:
          'Unpaid, the pourer ranks only in the thirties and below on the big wine-gift searches — 33rd on “wine gifts”, 43rd on “wine pourer” — and higher on small phrases that describe it. The searches it is found on are mostly ones a shopper types already knowing the product exists, which is where its few ads sit too.',
      },
      {
        type: 'prose',
        text:
          'So the sales do not come from buying the category. A keyword read cannot say where they do come from: the Amazon’s Choice badge, a parent account with twenty years of reviews, gift-shop shoppers searching for the pourer they saw, and campaigns invisible from outside are all candidates, and the brand’s own search-term report would settle it.',
      },
      {
        type: 'channels',
        items: [
          {
            label: 'Amazon Sponsored Products',
            value: `≈ ${monthUsd(SB_AD.monthlyUsd.central)} a month, ${linePct(SB_AD.ratePct.central)} of revenue — modelled`,
            counted: 'Ads on 23 keywords read and about 20 estimated — Jungle Scout share of voice; a New York read',
            flag: true,
            note: `amazon-adspend-spy: per keyword, searches × their share of the sponsored results × a click rate × Amazon’s bid; band ${sbBand(SB_AD.monthlyUsd)}. The smaller keywords are estimated from a sample. The click rate, 3.0% (1.8–4.5%), is borrowed from another brand because no row here was sponsored-dominant enough to measure one. Two keywords with ads of theirs have no bid and are not priced. A floor: ads on product pages, automatic targeting, Sponsored Brands and Display are invisible to it, and a bid is not what a click is billed. The Ad spend table below is exactly what the margin takes off.`,
          },
        ],
        note: 'Off-Amazon advertising is unknown, not zero: no ad library was read.',
      },
      {
        /* The Margin breakdown's advertising line, row for row, built from
           SB_AD. check-profile fails if they drift apart. */
        type: 'table',
        id: 'ad-spend',
        caption: 'Ad spend',
        columns: ['Line', 'A month', 'Share of revenue', 'Per sale', 'Basis'],
        noteColumns: [4],
        rows: [
          ...SB_AD.products.map((p) => [p.label, monthUsd(p.monthlyUsd.central), linePct(p.ratePct.central), lineUsd(p.perUnit), `Modelled: ${sbBand(p.monthlyUsd)}`]),
          ['Total — the margin line', monthUsd(SB_AD.monthlyUsd.central), linePct(SB_AD.ratePct.central), lineUsd((SB_COST.price * SB_AD.ratePct.central) / 100), `Modelled: ${sbBand(SB_AD.monthlyUsd)}`],
        ],
        note: 'What the Margin breakdown takes off for Amazon advertising, line for line. Per sale is the share of the $29.99 price.',
      },

      /* Socials and traffic OMITTED: the only off-Amazon presence read is the
         parent company's store, its Faire account and the gift shops, all
         covered in How it sells; no social account or traffic was read for
         the brand. */

      { type: 'section', id: 'brand-owner', title: 'Brand owner', group: 'Who and when', asOf: true },
      {
        type: 'facts',
        items: [
          { label: 'Company', value: 'Totally Bamboo', note: 'Its Amazon business name is Hollywood Chairs, the founders’ earlier director’s-chair company' },
          { label: 'Amazon seller', value: 'A3UD9FK955DKQN', note: 'Totally Bamboo — over 500 listings, the whole bamboo line' },
          { label: 'Address', value: '120 W Grand Ave., Escondido, CA', note: '92025, as Amazon’s seller record gives it' },
          { label: 'Founders', value: 'Tom and Joanne Sullivan', note: 'By Amazon’s own 2023 seller story' },
          { label: 'Seller feedback', value: '99%', note: 'Over 12,180 ratings', info: 'sellerFeedback' },
          { label: 'First listing', value: '21 Feb 2025', note: 'The brand’s; the account is much older' },
        ],
      },
      {
        type: 'prose',
        text:
          'Totally Bamboo is a California company founded by Tom and Joanne Sullivan, who made director’s chairs as Hollywood Chairs before bamboo cutting boards; Amazon featured them in a 2023 seller story as more than twenty years in business with about five hundred products. Songbird Specialties is a registered brand of theirs with one product, made under a model number in the same catalogue. Nobody at the company has spoken to us: every fact here comes from Keepa, Amazon, the company’s own store and the public web.',
      },

      /* LAST in the blocks: the nav lists it below Links & sources under a
         "Build your own" rule. Published 2026-10-25 (local) with
         make-validation-launch.mjs songbird-specialties --variant pourer,pourers
         --variant-kind theme --category — category mode by the owner's call,
         since the plain run fails the top-25 organic-rank rule (no search that
         names the pourer and ranks it top 25 delivers the 300 clicks). Market
         conversion from 4 share-of-voice rows (cached, no new Jungle Scout
         calls). First order 500 (Sinowin's minimum, suppliers.json lowestMoq)
         × $4.18 landed, plus the $1,200 Kingtop mould as tooling (owner,
         2026-10-25: unavoidable; re-published with it the same day). */
      { type: 'section', id: 'to-start', title: 'Test it first', group: 'Build your own', labelled: true, asOf: true },
      {
        type: 'lede',
        text: 'The least you would spend to find out whether it sells, before you commit to a full launch. It includes the $1,200 mould one of the two factories charges, paid once: the other factory’s mould is its own, so a copy needs one.',
      },
      { type: 'validation-strategy' },
      { type: 'validation-launch' },
    ],
  },
};

export function profileFor(slug) {
  return PROFILES[slug];
}
