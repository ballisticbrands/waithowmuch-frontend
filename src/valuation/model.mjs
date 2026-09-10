/**
 * What a business is worth, and WHY.
 *
 * ── 🚨 THIS IS A PORT, AND IT IS TEMPORARY ───────────────────────────────
 * The original lives in sellerconnect at src/services/valuation/valuation.ts,
 * whose own header says "ONE IMPLEMENTATION, AND IT LIVES HERE" — because a
 * client-side copy would drift, and the day a preview disagrees with a stored
 * value is the day the central number stops being believable. That reasoning
 * has not stopped being true; this copy exists so profiles can be scored while
 * the model has no home of its own, and it is meant to move to a backend.
 *
 * While both exist, they must not diverge. Keep the rules, the deltas and the
 * `why` text byte-identical to the original so a diff between the two files is
 * readable, and put anything WaitHowMuch-specific outside this file rather
 * than editing a rule in place.
 *
 * ── What is different HERE, and it matters ───────────────────────────────
 * The original scores a business whose owner has answered a questionnaire.
 * Nobody here has answered anything: these are researched profiles, so the
 * `answers` half arrives empty and roughly half the model never fires. That is
 * not a defect — it is the same "estimated" path the source product runs for
 * an unconnected business, and `missingSignals` is the honest list of what a
 * conversation with the owner would add. A profile should leave an answer out
 * rather than guess it: a plausible guess scored as fact is worse than a gap,
 * because the gap is visible and the guess is not.
 *
 * Valued on NET PROFIT, not SDE. Brokers quote SDE, which adds back owner
 * salary and one-offs — figures we do not have. So this reads LOW against a
 * broker listing by roughly whatever the owner pays themselves, and any page
 * showing it has to say so. A number quietly on a different basis is worse
 * than one that is openly conservative.
 *
 * Plain .mjs with a sibling .d.mts for the same reason as businesses/index.mjs:
 * the build scripts are plain Node and the prerender has to compute the same
 * figure the app does.
 */

/** 2: every adjustment carries a `why`, the ceiling moved from 5.0 to 8.0,
 *  and the concentration / seasonality / returns / niche-trend factors were
 *  added. Stored valuations at version 1 are not wrong, they are OLD — the
 *  version is what lets a reader tell those apart. */
export const VALUATION_VERSION = 2;

/** Annual net-profit multiple before adjustments. Deliberately conservative:
 *  the honest failure here is telling someone their business is worth less
 *  than it is, not more. */
export const BASE_MULTIPLE = 2.6;
export const MIN_MULTIPLE = 1.2;

/**
 * The ceiling.
 *
 * 🚨 WAS 5.0, AND THAT WAS DOING REAL DAMAGE. A strong business scored 2.6
 * base + 2.53 of adjustments = 5.13 and was clamped to 5.0 — so the last 0.13
 * of everything it had earned was discarded, and, worse, every further
 * positive factor was inert for exactly the businesses the model most needs
 * to tell apart. Two businesses at 5.13 and 6.4 both printed "5.0×".
 *
 * 8.0 is where the FBA market actually tops out for a clean, aged, defensible
 * brand. A ceiling still exists because this is an ADDITIVE model: a bug that
 * double-counts a factor should produce a suspicious number, not a limitless
 * one. If real businesses start pressing against 8.0 the answer is to
 * re-weight the factors, not to raise this again.
 */
export const MAX_MULTIPLE = 8.0;

function yearsSince(iso, today) {
  if (!iso) return null;
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return null;
  return (today.getTime() - then.getTime()) / (365.25 * 24 * 3600 * 1000);
}

/** Differentiation level 1–4, from the three-question diagnostic.
 *
 *  Ordered, and it stops at the first "yes": tooling or protected IP is
 *  level 4 whatever the later answers say. Null until the seller has answered
 *  far enough down to place them — an unanswered diagnostic is not a level 1.
 *
 *  🚨 Level 1 is a real outcome ("no" three times), and it carries the
 *  largest negative here. Whether a buyer-facing page should print "Level 1"
 *  or something softer is a display decision, NOT a scoring one.
 */
export function differentiationLevel(answers) {
  if (answers.diffTooling === "yes") return 4;
  /* "Some of my products are, but not this one" does NOT place the product
     being described — it says something about the rest of the catalogue. So
     the cascade carries on. */
  if (answers.diffTooling !== "no" && answers.diffTooling !== "some") return null;
  if (answers.diffCustom === "yes") return 3;
  if (answers.diffCustom !== "no") return null;
  if (answers.diffVisible === "yes") return 2;
  if (answers.diffVisible === "no") return 1;
  return null;
}

/** How much of the business survives the sale, by how it is sourced.
 *
 *  This is about TRANSFERABILITY, not about effort. A royalty programme
 *  cannot be handed to a buyer at all; an arbitrage business is a person's
 *  sourcing habit rather than an asset; a private label is a thing you can
 *  actually convey. */
const METHOD_ADJUSTMENTS = {
  private_label: {
    label: "Private label sourcing",
    delta: 0.3,
    why: "The seller owns the brand and the listings, so the business is a thing that can actually be handed over rather than a way of working that has to be relearned.",
  },
  wholesale: {
    label: "Wholesale sourcing",
    delta: -0.1,
    why: "Buying an established brand's products wholesale and reselling them transfers cleanly — the supplier relationships are the asset. But nothing is owned: other sellers can list the same product, and the brand owner can stop supplying at any time.",
  },
  handmade: {
    label: "Handmade — production is the owner",
    delta: -0.3,
    why: "If the owner's hands make the product, the buyer is not acquiring production capacity — they are acquiring a job they may not be able to do.",
  },
  pod: {
    label: "Print on demand",
    delta: -0.2,
    why: "No inventory and no tooling means almost nothing stops a competitor from listing the same design tomorrow.",
  },
  dropship: {
    label: "Dropship — no owned supply",
    delta: -0.4,
    why: "The supplier can sell to anyone, including the buyer's competitors, and can end the arrangement without notice. There is no supply to convey.",
  },
  arbitrage: {
    label: "Arbitrage — no repeatable sourcing",
    delta: -0.5,
    why: "Profit depends on finding deals, which is a skill the seller takes with them. The buyer inherits the account, not the ability to refill it.",
  },
  merch: {
    label: "Merch on Demand — a royalty, not a transferable asset",
    delta: -0.6,
    why: "The income stream is tied to an Amazon account and programme seat that generally cannot be transferred at all.",
  },
  kdp: {
    label: "KDP — a royalty, not a transferable asset",
    delta: -0.5,
    why: "Publishing royalties sit with the account holder. What changes hands in a sale is far less than the earnings suggest.",
  },
};

/** Catalogue shape. Owning a category is worth paying for; a catalogue that
 *  has to be relaunched every season, or that spans unrelated niches with no
 *  anchor, is worth less than the same profit elsewhere. */
const CATALOG_ADJUSTMENTS = {
  dominance: {
    label: "Category dominance",
    delta: 0.3,
    why: "Owning most of the variations in one narrow category is the closest thing Amazon offers to a moat: it compounds through ranking and reviews, and unseating it is expensive rather than merely difficult.",
  },
  broad: {
    label: "Broad catalogue, long tail",
    delta: 0.1,
    why: "Many SKUs each taking a small slice of demand. No single listing going quiet does real damage, which is genuine resilience — set against that, running hundreds of variations is the work a buyer inherits, and each one is thin on its own.",
  },
  concentrated: {
    label: "Few SKUs, each standing alone",
    delta: 0.1,
    why: "A short catalogue of independently significant products is quick to learn and cheap to run. The exposure is the other side of it: there is nothing behind any one of them if it stalls.",
  },
  flagship: {
    label: "One product carries the revenue",
    delta: -0.1,
    why: "One dominant product drives most of the revenue, with the rest sold alongside it. That is the classic brand shape, but for a buyer it is concentration: the price of the business substantially rests on one listing continuing to perform.",
  },
  generalist: {
    label: "Unrelated niches, no anchor",
    delta: -0.2,
    why: "Products spread across categories with no shared customer base means no accumulated authority in any of them. A buyer inherits several small businesses rather than one.",
  },
  churn: {
    label: "Trend-dependent catalogue",
    delta: -0.3,
    why: "Revenue that has to be replaced every season is closer to a series of launches than to an asset — and the launching is the seller's skill, not something that transfers.",
  },
};

const RATING_LADDER = [
  { min: 5, label: "5.0", delta: 0.35, note: "a spotless record across the catalogue" },
  { min: 4.7, label: "4.7+", delta: 0.3, note: "comfortably above the level at which buyers hesitate" },
  { min: 4.5, label: "4.5+", delta: 0.2, note: "solid, with room to slip before it costs conversion" },
  { min: 4.2, label: "4.2+", delta: 0.05, note: "acceptable, but close enough to the danger zone to watch" },
  { min: 4.0, label: "4.0+", delta: -0.1, note: "the point where shoppers start filtering listings out" },
  { min: 3.5, label: "3.5+", delta: -0.3, note: "below the bar most buyers set when comparing options" },
  { min: 3, label: "3.0+", delta: -0.5, note: "conversion is materially impaired and advertising has to pay for it" },
  { min: 0, label: "Under 3.0", delta: -0.75, note: "a rating this low suppresses everything else the business does well" },
];

const REVIEW_BANDS = [
  { min: 25000, label: "25,000+", delta: 0.4, note: "a catalogue at this depth is effectively unassailable on reviews alone" },
  { min: 10000, label: "10,000+", delta: 0.35, note: "far beyond what a funded competitor can close in a season" },
  { min: 5000, label: "5,000+", delta: 0.3, note: "deep enough that a rival would need years, not a quarter, to match it" },
  { min: 2500, label: "2,500+", delta: 0.2, note: "a real barrier, though a well-funded competitor could close it" },
  { min: 1000, label: "1,000+", delta: 0.1, note: "past the point where reviews start defending a ranking" },
  { min: 250, label: "250+", delta: -0.15, note: "thin: a competitor with budget can match this within a season" },
  { min: 0, label: "Under 250", delta: -0.3, note: "almost no review moat — the listings are defended by nothing that took time to build" },
];

const CONCENTRATION_LADDER = [
  { min: 95, label: "95%+", delta: -0.45, note: "a single-market business in all but name; the other marketplaces are open rather than trading" },
  { min: 85, label: "85–94%", delta: -0.25, note: "the secondary marketplaces are real but small, so one suspension still reaches almost all of the revenue" },
  { min: 75, label: "75–84%", delta: -0.15, note: "meaningfully concentrated, though a second market is carrying enough to matter" },
  { min: 60, label: "60–74%", delta: 0.05, note: "a clear lead market with genuine support behind it" },
  { min: 40, label: "40–59%", delta: 0.2, note: "no single market can take the business down on its own" },
  { min: 0, label: "under 40%", delta: 0.35, note: "genuinely spread; a problem anywhere costs a slice rather than the company" },
];

const AHR_LADDER = [
  { min: 800, label: "800+", delta: 0.25, note: "far above Amazon's healthy line, with room to absorb a bad month" },
  { min: 500, label: "500+", delta: 0.15, note: "comfortably healthy" },
  { min: 200, label: "200+", delta: 0, note: "healthy, but close enough to the line that one bad spell would show" },
  { min: 100, label: "100–199", delta: -0.5, note: "below Amazon's healthy line and shown as at risk" },
  { min: 0, label: "Under 100", delta: -1, note: "in the band where Amazon deactivates accounts" },
];

const FEEDBACK_LADDER = [
  { min: 98, label: "98%+", delta: 0.2, note: "near-spotless service record" },
  { min: 95, label: "95%+", delta: 0.1, note: "above the level Amazon treats as the warning line" },
  { min: 90, label: "90%+", delta: -0.1, note: "below Amazon's comfort threshold of 95%" },
  { min: 85, label: "85%+", delta: -0.3, note: "a visible service problem that buyers can see on the storefront" },
  { min: 0, label: "Under 85%", delta: -0.6, note: "poor enough to deter buyers and to attract Amazon's attention" },
];

const DIFF_LEVELS = {
  4: {
    label: "Differentiation level 4 — hard to copy",
    delta: 0.7,
    why: "Fully custom, and hard to imitate through manufacturing complexity, IP protection or both — typically a mould, tooling or a patent. A competitor would have to commission their own from scratch before they could sell the same thing, and that cost is what holds the margin up.",
  },
  3: {
    label: "Differentiation level 3 — functional customisation",
    delta: 0.45,
    why: "Custom-made with several real changes to form, features, functionality or materials. Copying it means re-sourcing components and re-engineering, not asking the same factory for a colourway — so a rival cannot simply order the identical item and undercut the listing.",
  },
  2: {
    label: "Differentiation level 2 — cosmetic variation",
    delta: -0.1,
    why: "A visible difference from the off-the-shelf version — a colour, a pattern, a small feature — but one a competitor copies by requesting a variant from the same manufacturer. More effort than a plain logo, and not much more.",
  },
  1: {
    label: "Differentiation level 1 — standard product",
    delta: -0.4,
    why: "An off-the-shelf product carrying the seller's logo, with any change invisible to the customer. Nothing stops a competitor ordering the same base unit from the same factory within days, which is why margin on generic goods erodes.",
  },
};

/**
 * Score one business.
 *
 * @param {import('./model').ValuationInputs} input
 * @returns {import('./model').Valuation}
 */
export function valueBusiness(input) {
  const today = input.today ?? new Date();
  const a = input.answers ?? {};
  const d = input.derived ?? {};
  const adj = [];
  const missing = [];

  // ── Age. The strongest single predictor of survival, and free: the first
  //    sighting of a listing is a floor even when the seller tells us nothing.
  const age = yearsSince(d.sellingSince, today);
  const AGE_WHY =
    "Most businesses that fail do so early. Years of continuous trading is the cheapest evidence there is that demand, supply and the Amazon account all hold up.";
  if (age === null) missing.push("sellingSince");
  else if (age >= 5) adj.push({ label: "Trading 5+ years", delta: 0.5, why: AGE_WHY });
  else if (age >= 3) adj.push({ label: "Trading 3+ years", delta: 0.3, why: AGE_WHY });
  else if (age < 1.5)
    adj.push({
      label: "Under 18 months of history",
      delta: -0.4,
      why: "Too short a record to tell a durable business from a lucky launch, and it has not yet been through a full year of seasons.",
    });

  // ── Owner time. A buyer is buying their time back, so this moves it more
  //    than almost anything else a seller can tell us.
  const hours = a.hoursPerWeek;
  const HOURS_WHY =
    "A buyer is purchasing income, not employment. The fewer hours the business needs, the more of what it earns is genuinely profit rather than unpaid wages.";
  if (hours === "under5") adj.push({ label: "Under 5 hours a week", delta: 0.4, why: HOURS_WHY });
  else if (hours === "5to10") adj.push({ label: "5–10 hours a week", delta: 0.2, why: HOURS_WHY });
  else if (hours === "over20")
    adj.push({
      label: "Over 20 hours a week",
      delta: -0.4,
      why: "At this level the owner is effectively staff. A buyer must either do that work or pay someone to, and the stated profit does not account for it.",
    });
  else if (hours === undefined) missing.push("hoursPerWeek");

  // ── Supplier concentration. The most common reason a sale falls through.
  if (a.supplierCount === "1")
    adj.push({
      label: "Single supplier",
      delta: -0.5,
      why: "One factory is one point of failure for the whole business. If they raise prices, miss a season or decline to serve the new owner, there is no second source.",
    });
  else if (a.supplierCount === "4plus")
    adj.push({
      label: "Four or more suppliers",
      delta: 0.2,
      why: "Several suppliers means no single one can hold the business to ransom, and a lost relationship costs a product line rather than the company.",
    });
  else if (a.supplierCount === undefined) missing.push("supplierCount");

  /* Redundancy and range are different goods, and the count alone cannot
     tell them apart. Four factories that can each make the same product is
     insurance; four that each make a different one is four single points of
     failure wearing a reassuring number. */
  if (a.supplierRole === "redundant")
    adj.push({
      label: "Suppliers can cover each other",
      delta: 0.25,
      why: "More than one supplier can make the same product, so losing one costs a negotiation rather than a product line.",
    });
  else if (a.supplierRole === "per_product")
    adj.push({
      label: "One supplier per product",
      delta: -0.15,
      why: "The supplier count looks like diversification but is not: each product still depends on exactly one factory, so any single loss takes a whole line with it.",
    });
  else if (a.supplierCount !== "1" && a.supplierRole === undefined) missing.push("supplierRole");

  if (a.supplierTerms === "exclusive")
    adj.push({
      label: "Exclusive supply agreement",
      delta: 0.4,
      why: "A contract that stops the supplier selling the same product to anyone else is one of the few genuine moats an Amazon business can hold, and it transfers with the company.",
    });
  else if (a.supplierTerms === "contract")
    adj.push({
      label: "Contracted supply",
      delta: 0.2,
      why: "Written terms mean pricing and availability survive the handover instead of depending on the outgoing owner's relationship.",
    });
  else if (a.supplierTerms === "reseller")
    adj.push({
      label: "Resold stock, not exclusive",
      delta: -0.5,
      why: "Anyone else can buy the same stock and list against it, so margin depends on competitors choosing not to.",
    });

  // ── How it is sourced, and what the catalogue looks like.
  const method = METHOD_ADJUSTMENTS[String(a.primaryMethod ?? "")];
  if (method) {
    if (method.delta !== 0) adj.push(method);
  } else if (a.primaryMethod === undefined) missing.push("primaryMethod");

  const catalog = CATALOG_ADJUSTMENTS[String(a.catalogStructure ?? "")];
  if (catalog) adj.push(catalog);
  /* 🚨 "not_sure" is a real choice and it means the seller could not place
     their own catalogue. It is MISSING, not neutral — scoring it zero
     silently treated "I don't know" as an answer. */
  else missing.push("catalogStructure");

  // ── Differentiation, scored on how expensive the product is to COPY.
  /* The rungs are DELIBERATELY uneven. The big step is 2 → 3 (0.55), not
     3 → 4 (0.25), because that is where "a competitor can order the identical
     item from the same factory" stops being true — which is the whole of what
     differentiation protects. */
  const level = differentiationLevel(a);
  const diff = level === null ? undefined : DIFF_LEVELS[level];
  if (diff) adj.push(diff);
  else missing.push("diffTooling");

  // ── The moat.
  if (a.brandRegistry === "yes")
    adj.push({
      label: "Brand Registry",
      delta: 0.3,
      why: "Enrolment gives the owner control of their own listing copy and a fast route to removing counterfeits — protection a buyer would otherwise have to build from scratch.",
    });
  else if (a.brandRegistry === "no")
    adj.push({
      label: "No Brand Registry",
      delta: -0.3,
      why: "Without it, anyone can attach to the listings and edit the content, and hijackers take far longer to remove.",
    });
  else missing.push("brandRegistry");

  if (a.trademark === "registered")
    adj.push({
      label: "Registered trademark",
      delta: 0.2,
      why: "A registered mark is a legal asset that conveys in the sale, and it is what keeps Brand Registry in place after the account changes hands.",
    });
  else if (a.trademark === "licensed")
    adj.push({
      label: "Licensed brand, not owned",
      delta: -0.4,
      why: "The brand belongs to somebody else, who can decline to license it to the buyer. What is for sale may not include the reason customers buy.",
    });

  // ── Product rating, weighted by revenue upstream.
  const rating = d.ratingWeighted;
  if (typeof rating === "number") {
    const band = RATING_LADDER.find((b) => rating >= b.min);
    adj.push({
      label: `${band.label}★ average product rating`,
      delta: band.delta,
      why:
        `Averaged across the business's products and weighted by revenue — ${band.note}. ` +
        "Scored in bands: 5.0, 4.7+, 4.5+, 4.2+, 4.0+, 3.5+, 3.0+ and under 3.0, running from +0.35 to −0.75 on the multiple. " +
        "A rating protects conversion and advertising cost at once, and it is the hardest thing on this list to repair quickly once it slips.",
    });
  } else missing.push("ratingWeighted");

  // ── Reviews on a ladder whose steps widen with the count, matching the
  //    display bands so the band a reader sees is the band that was scored.
  if (typeof d.reviewTotal === "number") {
    const band = REVIEW_BANDS.find((b) => d.reviewTotal >= b.min);
    if (band) {
      adj.push({
        label: `${band.label} reviews across the catalogue`,
        delta: band.delta,
        why:
          `Counted across every product in the account, not on any single listing — ${band.note}. ` +
          "Scored in bands that widen as the count grows: under 250, then 250+, 1,000+, 2,500+, 5,000+, 10,000+ and 25,000+, running from −0.3 to +0.4 on the multiple. " +
          "Accumulated reviews are the one asset a competitor cannot buy or copy: they take years to build and they carry the listings' ranking with them.",
      });
    }
  }

  // ── Diversification we did not have to ask for.
  if ((d.marketplaces?.length ?? 0) >= 3) {
    adj.push({
      label: "3+ marketplaces",
      delta: 0.2,
      why: "Selling in several countries spreads exposure across separate Amazon accounts, currencies and demand cycles.",
    });
  }
  if (d.channels === "both")
    adj.push({
      label: "FBA and FBM",
      delta: 0.1,
      why: "Being able to ship without Amazon's warehouses is a working fallback when inventory is stranded or a category is restricted.",
    });

  /* Concentration, which is a different question from the count above and
     can pull the other way for the same business. */
  const topShare = d.topMarketplaceSharePct;
  if (typeof topShare === "number") {
    const band = CONCENTRATION_LADDER.find((b) => topShare >= b.min);
    adj.push({
      label: `${Math.round(topShare)}% of revenue in one marketplace`,
      delta: band.delta,
      why:
        `The largest single marketplace takes ${band.label} of revenue — ${band.note}. ` +
        "Scored in bands: under 40%, 40–59%, 60–74%, 75–84%, 85–94% and 95%+, running from +0.35 to −0.45 on the multiple. " +
        "This is a different question from how many marketplaces are open: three countries on paper and one in practice is not diversification.",
    });
  } else missing.push("topMarketplaceSharePct");

  const offAmazon = d.offAmazonSharePct;
  if (typeof offAmazon === "number" && offAmazon > 0) {
    if (offAmazon >= 20)
      adj.push({
        label: `${Math.round(offAmazon)}% of revenue off Amazon`,
        delta: 0.35,
        why: "A meaningful share of sales does not depend on Amazon at all. That is the part of the business that survives a suspension, and it usually comes with a customer list Amazon never lets a seller keep.",
      });
    else
      adj.push({
        label: "Some revenue off Amazon",
        delta: 0.15,
        why: "An established channel outside Amazon, even a small one, is a proven route to customers the buyer can grow.",
      });
  }

  // ── Seasonality. Not only Q4: any revenue that arrives in a narrow window.
  const peak = d.peakMonthSharePct;
  if (typeof peak === "number") {
    if (peak >= 25)
      adj.push({
        label: `${Math.round(peak)}% of revenue in one month`,
        delta: -0.3,
        why: "Highly seasonal revenue means the buyer must fund a year of inventory to capture a few weeks of sales, and one mistimed shipment can cost most of the year.",
      });
    else if (peak <= 12)
      adj.push({
        label: "Revenue spread evenly across the year",
        delta: 0.2,
        why: "Steady month-to-month demand makes cash flow predictable and forgives a late shipment, which is worth real money to a buyer financing stock.",
      });
  } else missing.push("peakMonthSharePct");

  // ── Returns. A quality signal and a margin leak in one number.
  const returns = d.returnRatePct;
  if (typeof returns === "number") {
    if (returns <= 3)
      adj.push({
        label: `${returns.toFixed(1)}% return rate`,
        delta: 0.2,
        why: "Low returns mean the product matches its listing. It protects margin directly and keeps the account clear of the complaints that trigger Amazon reviews.",
      });
    else if (returns >= 10)
      adj.push({
        label: `${returns.toFixed(1)}% return rate`,
        delta: -0.35,
        why: "High returns cost the margin twice — the refund and the handling — and they are an early warning of the quality complaints that put an account at risk.",
      });
  }

  // ── Where the niche itself is going, independent of how well it is run.
  const trend = d.nicheTrendPct;
  if (typeof trend === "number") {
    if (trend >= 10)
      adj.push({
        label: "Niche demand growing",
        delta: 0.25,
        why: "Search volume for these products is rising, so a buyer inherits a tailwind rather than having to take share from rivals to stand still.",
      });
    else if (trend <= -10)
      adj.push({
        label: "Niche demand shrinking",
        delta: -0.35,
        why: "Search volume is falling, which means today's revenue is the optimistic case. A shrinking category takes good operators down with it.",
      });
  }

  // ── Risk. An open issue is the one thing that can dominate everything
  //    above it, so it is weighted to.
  if (a.issues === "open")
    adj.push({
      label: "Unresolved account or IP issue",
      delta: -0.8,
      why: "An open complaint or claim can suspend listings or the whole account at any time. Until it is closed, everything else on this page is contingent on it.",
    });
  else if (a.issues === "resolved")
    adj.push({
      label: "Past issue, resolved",
      delta: -0.1,
      why: "Settled, but it happened. Amazon weighs history, so a second incident is judged against the first.",
    });
  else if (a.issues === undefined) missing.push("issues");

  /* Two seller-level signals, both on ladders. Feedback is what CUSTOMERS say
     about the seller and it is public; the Account Health Rating is what
     AMAZON thinks, and it decides whether the listings stay switched on. A
     business can hold 99% positive feedback and still be at risk on AHR. */
  const ahr = d.accountHealthScore;
  if (typeof ahr === "number") {
    const band = AHR_LADDER.find((b) => ahr >= b.min);
    if (band.delta !== 0)
      adj.push({
        label: `Account Health Rating ${band.label}`,
        delta: band.delta,
        why:
          `Amazon's own score for the account, out of 1000 — ${band.note}. ` +
          "Amazon treats 200 as the healthy line. Scored in bands: 800+, 500+, 200+, 100–199 and under 100, running from +0.25 to −1 on the multiple. " +
          "It is not a rating of the products: it is the number that decides whether the listings stay switched on at all.",
      });
  } else missing.push("accountHealthScore");

  const feedback = d.sellerFeedbackPct;
  if (typeof feedback === "number") {
    const band = FEEDBACK_LADDER.find((b) => feedback >= b.min);
    adj.push({
      label: `${band.label} positive seller feedback`,
      delta: band.delta,
      why:
        `What customers say about the SELLER over the last 12 months — dispatch, packaging, service — rather than about the products; ${band.note}. ` +
        "Scored in bands: 98%+, 95%+, 90%+, 85%+ and under 85%, running from +0.2 to −0.6 on the multiple. " +
        "It is public on the storefront, so a weak score costs conversion as well as standing with Amazon.",
    });
  } else missing.push("sellerFeedbackPct");

  /* Account health is a separate axis from IP: a business can hold clean IP
     and still be one late shipment from suspension. */
  if (a.accountHealth === "healthy")
    adj.push({
      label: "Account health clear",
      delta: 0.2,
      why: "No performance defects or policy warnings outstanding. The buyer takes over an account with nothing already counting against it.",
    });
  else if (a.accountHealth === "warnings")
    adj.push({
      label: "Open account warnings",
      delta: -0.4,
      why: "Amazon has already flagged this account. Further defects escalate faster from here, and a buyer inherits the record along with the listings.",
    });
  else if (a.accountHealth === "at_risk")
    adj.push({
      label: "Account at risk of deactivation",
      delta: -1,
      why: "The account is one incident from being switched off. Nothing else in this valuation matters if that happens, which is why this outweighs every positive here.",
    });
  /* Only asked for when the numeric AHR is absent — the score says everything
     the three-way answer does and more. */
  else if (typeof ahr !== "number") missing.push("accountHealth");

  if (a.violations === "recent")
    adj.push({
      label: "Recent policy violations",
      delta: -0.5,
      why: "Fresh violations sit on the record Amazon consults when deciding the next case, so the account starts any future dispute from behind.",
    });
  else if (a.violations === "past")
    adj.push({
      label: "Older policy violations",
      delta: -0.15,
      why: "On the record but not recent. It counts for less each year, and less again if nothing followed it.",
    });

  // ── Team. Capability the buyer inherits — but also payroll and dependency.
  const STAFFED = new Set(["vas", "contractors", "agency", "employees", "mixed"]);
  if (a.team === "none")
    adj.push({
      label: "Owner-operated",
      delta: 0.1,
      why: "Nothing to transfer beyond the accounts themselves: no payroll, no notice periods, and nobody who can leave in the first month. Set against that, every hour the business needs is the new owner's.",
    });
  else if (typeof a.team === "string" && STAFFED.has(a.team))
    adj.push({
      label: "Contractors or team in place",
      delta: 0.2,
      why: "The day-to-day work is already being done by someone other than the owner — VAs, an agency or staff — so the business is turnkey rather than a job. Against that, the buyer inherits the cost, and whoever holds the knowledge can leave.",
    });
  else if (a.team === undefined) missing.push("team");

  /* Still `skuStrategy`, though it now sits under "What you sell". The name is
     the storage key for every answer already saved. */
  if (a.skuStrategy === "expanding")
    adj.push({
      label: "Still launching new products",
      delta: 0.2,
      why: "The catalogue is still growing rather than being harvested, so a buyer inherits a business with momentum instead of a fixed set of listings to defend.",
    });
  else if (a.skuStrategy === "consolidating")
    adj.push({
      label: "Cutting back to best sellers",
      delta: -0.1,
      why: "Lines are being retired faster than they are added. Often sensible housekeeping, but it caps how much of today's revenue is still growing.",
    });

  const raw = BASE_MULTIPLE + adj.reduce((n, x) => n + x.delta, 0);
  const multiple = Math.min(MAX_MULTIPLE, Math.max(MIN_MULTIPLE, Number(raw.toFixed(2))));

  /* No profit, no valuation — and NOT a zero. A business whose costs we
     cannot see is unvalued, which is a different statement from worthless. */
  const profit = input.netProfitTtm;
  const value = typeof profit === "number" && profit > 0 ? Math.round(profit * multiple) : null;

  return {
    value,
    multiple: typeof profit === "number" && profit > 0 ? multiple : null,
    netProfitTtm: profit ?? null,
    adjustments: adj,
    missingSignals: missing,
    version: VALUATION_VERSION,
  };
}
