/**
 * What each metric on a profile actually means — the copy behind the ⓘ.
 *
 * Shared rather than authored per business: the definition of TACoS does not
 * change between profiles, and three profiles each carrying their own wording
 * for it is three chances to define it differently. A business with something
 * genuinely specific to say about one of its figures overrides the entry with
 * its own `info` array.
 *
 * 🚨 Say what the figure IS, then how it was arrived at, then what it does not
 * cover — in that order. On a page where almost everything is modelled, the
 * last part is the one a reader most needs and the one they will not guess.
 */
export const METRIC_INFO: Record<string, string[]> = {
  adSpend: [
    "What the business spends on advertising in a month.",
    "Modelled, not measured: nobody publishes an ad bill. It is the rate implied by the source's own figures, applied to each month's revenue, which is why it moves exactly in step with the bars on the chart.",
  ],
  tacos: [
    "Total Advertising Cost of Sales: advertising spend divided by total revenue.",
    "Unlike ACoS, the denominator is ALL revenue — organic sales as well as ad-driven ones — so it measures what advertising costs the business overall rather than how efficiently one campaign converts. A low TACoS means most sales arrive without being paid for.",
    "Calculated across every month of available history.",
  ],
  toStart: [
    "What it cost to get the business to its first sale — tooling, inventory, branding and the rest of the money spent before any came back.",
    "It is the figure that decides whether an idea is repeatable by a reader rather than merely interesting, which is why an unknown is shown as unknown rather than estimated.",
  ],
  listedSince: [
    "The year the business's earliest products first appeared, read from the public catalogue.",
    "Older listings tend to carry accumulated reviews and established search ranking, which is part of what a buyer is paying for. Note it describes the LISTINGS rather than the company — a business can be older than its oldest listing, and a listing can outlive the seller who created it.",
  ],
  skus: [
    "The total number of SKUs (stock keeping units) the business sells. Where a product comes in several colours, sizes or other variations, each variation counts as its own SKU.",
    /* The reference wording ends "Shown as a band, in steps of 50, rather than
       an exact count." That is true of the page it came from and false of this
       one, which counts the catalogue exactly — so the sentence is replaced
       rather than copied. A tooltip that describes a banding the figure beside
       it does not use is worse than no tooltip. */
    "Counted exactly from the public catalogue rather than banded. It counts what is LISTED rather than what is selling: a listing can sit at zero sales for a year and still be in the number.",
  ],
  category: [
    "Where the business actually sits in the marketplace's catalogue, read from the listing's own breadcrumb and shown in full — down to the last branch Amazon files it under, not the department at the top of it.",
    "Where a business sells across several categories, the one shown is the category most of its revenue comes from rather than the broadest one it appears in.",
    "It is the quickest read on what kind of business this is: the category sets the referral fee a seller pays, how seasonal demand is likely to be, and who the business is competing against. The deeper the branch, the more precisely it says all three.",
  ],
  topSellerPrice: [
    "The retail price a customer pays for the business's best-selling SKU — the one most of the revenue passes through.",
    "Taken from the current buy-box price rather than averaged across the year, so a listing that has been discounted or raised lately reads as it stands today rather than as it traded.",
    "Worth comparing against the same product's price on the business's other channels. Where they differ, the channel doing the volume is often the one taking the smaller cut of it.",
  ],
  avgRetailPrice: [
    "The average retail price a customer pays across all of the business's priced SKUs, weighted by how much each one actually sells.",
    "Where a business sells both cheap and expensive products this blended average can be deceiving. It sits near whichever end carries the UNITS rather than in the middle of the price list — so a catalogue of $20 products can show an average near $9 because one $7 product is most of what leaves the warehouse.",
    "It is not an average ORDER value. Nothing public says how many items a customer buys at once, so the denominator is units sold rather than orders placed, and a business whose customers buy two at a time takes more per order than this figure suggests.",
  ],
  avgOrder: [
    "The average value of a single order — revenue divided by orders.",
    "On a cheap product it is the figure that decides what the business can afford to do. Fulfilment and advertising are charged per unit and per click, not as a percentage, so a low average order makes both a far larger share of the price than the same costs would be on a dear one.",
  ],
  rating: [
    "The customer star rating on the business's best-selling product, with the share of those reviews that gave five stars. It rates the PRODUCT, not the seller — dispatch and service carry their own score — and it is not an account health measure.",
    "The leading listing rather than an average across the catalogue. Amazon publishes a rating per listing, so a catalogue average means reading every one, and the best-seller usually carries most of the revenue and most of the reviews — which makes it the closest single figure available for every business. Where the tail sells at a different quality it will rate differently, and this will not show it.",
    "The five-star share matters as much as the average: two products can both sit at 4.5 with very different distributions, and a rating held up by a wall of fives is a healthier listing than one averaging out threes and fours. A rating protects conversion and advertising cost at once, and it is the hardest thing on a profile to repair quickly once it slips.",
  ],
  reviews: [
    "The number of customer reviews on the business's best-selling product.",
    "One listing's count, not the catalogue's. Amazon publishes reviews per listing rather than per seller, so the business's true total is always higher than this — and on a business with a deep tail, considerably higher.",
    "Reviews are the closest public proxy for units sold, and they are the one asset a competitor cannot buy or copy: they take years to accumulate and they carry a listing's ranking with them. Against that, they build over a listing's whole life, so a large number describes history rather than current trade.",
  ],
  cogs: [
    "Cost of goods as a share of revenue — what the product itself costs to make and land, before the marketplace, advertising or anything else comes off.",
    "It is the one cost line a seller genuinely controls: fees are published rates and advertising is an auction, but the factory price is a negotiation and it compounds over every unit.",
    "This is a single line lifted from the full cost stack. The Margin breakdown section sets out every line from the average order down to what is left, names the supplier quotes behind this one, and says which half of it nobody published.",
  ],
  brandRegistry: [
    "Whether the seller is enrolled in Amazon Brand Registry — yes or no.",
    "Enrolment gives the owner control of their own listing copy and a fast route to removing counterfeits, protection a buyer would otherwise have to build from scratch. It also unlocks A+ content, a Brand Store and Sponsored Brands advertising.",
    "Read from the public record rather than asked: a Brand Store or A+ content on a listing means enrolment, because Amazon gates both behind it. It is a separate question from whether a trademark is registered, which is its own legal asset and transfers on its own terms.",
  ],
  sellerFeedback: [
    "The seller's own rating, and the number of ratings behind it. It rates the SELLER — dispatch, packing, service — not the products, which carry their own star ratings.",
    "Read the count as carefully as the percentage: a high score over a few dozen ratings is a young account, and a handful of bad months would move it a long way.",
  ],
  /* ── The three "how it is built" attributes ───────────────────────────
     Definitions lifted verbatim from the Attributes-per-business spec, so a
     reader comparing this page with any other page using the same spec is
     comparing the same thing. Only the PROVENANCE sentence is rewritten: the
     spec's version says the seller answered a questionnaire, and on this site
     nobody from the business wrote the page. Copying that sentence would have
     credited an answer nobody gave.

     🚨 The spec also attaches a value on the multiple to every option
     (+0.30 for private label, −0.60 for Merch on Demand, and so on). Those
     are NOT here and not on the reference page, because this site has no
     factor-scored valuation to attach them to — its multiple is one authored
     number that the profile itself calls unsupported. Importing the deltas
     would advertise a model that does not exist. */
  fulfilment: [
    "How the order reaches the customer — who holds the stock and who ships it.",
    "It is a cost attribute rather than a revenue one, and on a cheap product it is the cost that decides the margin: Amazon prices moving a box by its size and weight rather than by what the box sells for, so an identical fee is a third of a $7 product and a tenth of a $20 one.",
    "Reported as the method most of the catalogue uses, with the split in the note. It is a per-listing choice, and pushing the heavy or slow-moving lines to FBM while the rest stays on FBA is deliberate rather than untidy.",
  ],
  sourcing: [
    "How the business gets its product — the single method most of its revenue comes from. It is the strongest signal of what actually transfers in a sale: a brand you own conveys to a buyer, a knack for finding discounted stock does not.",
    "Inferred from the public record here, not stated by the seller.",
  ],
  catalogue: [
    "The shape of the catalogue: whether revenue rests on one product, a handful, a long tail of variations, or a portfolio with no anchor. It tells a buyer what running the business involves day to day, and where it breaks if one listing stalls.",
    "One of six shapes, describing how revenue is spread across the catalogue rather than how many listings there are.",
    "Placed by us from the public catalogue, not stated by the seller. A question mark means we have not placed it yet, not that the business has no shape.",
  ],
  /* 🚨 The four-question diagnostic is NOT described here. A reader who opens
     this wants to know what the word means and roughly where the business
     sits, and how we arrive at a level is our procedure rather than their
     question — it was three sentences of method standing between them and the
     answer. The ladder itself is the definition, so the two ends of it are the
     definition too. The procedure is on /business-attributes, one click away,
     for the reader who does want it. */
  differentiation: [
    "How hard the product is for a competitor to copy — and the difference has to be one a customer can see and would pay for. Something nobody notices is not differentiation.",
    "Four levels. Level 1 is an off-the-shelf product with the seller's logo on it, which a rival can order from the same factory within days. Level 4 needs a mould, tooling or IP nobody else can legally reproduce. Levels 2 and 3 are the ground in between.",
    "Assessed by us against the product and the generic version of it, not stated by the seller. A question mark means we have not placed it yet.",
  ],
  channels: [
    "Where the selling actually happens. Most businesses of this size sell in more than one place, and the mix matters more than the list: a business whose volume sits on one marketplace is exposed to that marketplace's decisions in a way a diversified one is not.",
    "Only channels visible from outside are listed. Wholesale and off-platform sales generally are not, so a business can be larger than its visible channels suggest.",
  ],
  heroPrice: [
    "The price of the best-selling product — the one most of the revenue passes through.",
    "Worth comparing against the same product's price on the business's other channels. Where they differ, the channel doing the volume is often the one taking the smaller cut of it.",
  ],
};
