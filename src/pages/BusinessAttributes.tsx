import { useEffect } from "react";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { BRAND_NAME_SAFE } from "@/lib/nav-helpers";

/**
 * Reference page for the three attributes that describe HOW a business is
 * built, as opposed to what it earns: sourcing, catalogue structure and
 * differentiation.
 *
 * ── Why it exists ────────────────────────────────────────────────────────
 * Each of the three appears on a profile as two or three words — "Private
 * label", "Broad catalogue, low volume each", "Level 3". Those are the ENDS of
 * definitions, and a reader comparing two profiles needs the definitions
 * themselves: whether "wholesale" here means what it means on a broker's site,
 * and what separates a level 3 product from a level 4 one. The ⓘ on each
 * metric carries a sentence; this page carries the rest, with the examples.
 *
 * 🚨 The wording is the spec's own. One definition, applied the same way to
 * every profile — the moment this page paraphrases it, the page and the
 * profiles drift apart and the attribute stops meaning one thing.
 *
 * ── 🚨 No scores ─────────────────────────────────────────────────────────
 * The source spec attaches a value on the multiple to every option here
 * (+0.30 for private label, −0.60 for Merch on Demand, +0.70 for level 4).
 * Those are deliberately absent. They belong to a factor-scored valuation
 * model, and this site has no such model: a profile's multiple is one authored
 * number, and the profiles that carry one say in as many words that nothing
 * supports it. Printing per-option deltas would advertise machinery that is
 * not behind them. If a scored model is ever built here, they come back — as
 * that model's numbers, not as an import.
 *
 * ── 🚨 Assessed, not answered ────────────────────────────────────────────
 * In the source spec all three come from a questionnaire the seller fills in.
 * Nobody from these businesses writes these pages, so here all three are
 * placements WE make from the public record, and the page says so at each
 * heading. A profile we have not placed shows "?" rather than a guess.
 *
 * ── The figures ──────────────────────────────────────────────────────────
 * Three, each carrying an argument the prose was making badly: the same-
 * numbers panels (the reason the page exists), the catalogue shapes (six
 * distributions of revenue, which is a picture and not a paragraph) and the
 * differentiation ladder (its stated principle has two axes, so it gets two).
 *
 * 🚨 Illustrations, not data. Every number drawn here is invented and belongs
 * to no business. Nothing on this page reads a profile, and nothing here
 * should ever be given a real one's figures — a specimen that names a business
 * is a claim about that business.
 */
export default function BusinessAttributes() {
  // Crumbs are a context now, not an element this page renders.
  useSetCrumbs(() => [{ label: "Business attributes" }], []);

  useEffect(() => {
    document.title = `Business attributes — ${BRAND_NAME_SAFE}`;
  }, []);

  return (
    <>
      <main data-main>
        <div data-attrs="">
          <h1>Business attributes</h1>

          <section>
            <p data-lede="">
              Every profile carries three attributes describing how the business
              is <em>built</em>, alongside the figures describing what it earns:{" "}
              <strong>sourcing</strong>, <strong>catalogue structure</strong> and{" "}
              <strong>differentiation</strong>.
            </p>
            <p>
              They matter because two businesses with identical revenue can be
              worth very different amounts. A private-label brand with tooling
              nobody can copy and a retail-arbitrage account with the same
              monthly profit are not the same asset, and the difference is not
              visible in the numbers.
            </p>

            <SameNumbers />

            {/* Plain in-page anchors, not router links: react-router treats a
                hash-only <Link> as a navigation and remounts the page. */}
            <nav data-attrs-toc="" aria-label="On this page">
              <p data-attrs-toc-title="">On this page</p>
              <ol>
                {TOC.map(({ href, label, note }) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                    <span data-attrs-toc-note="">{note}</span>
                  </li>
                ))}
              </ol>
            </nav>
          </section>

          {/* ── Sourcing ──────────────────────────────────────────────── */}
          <section>
            <h2 id="sourcing">Sourcing</h2>
            <p data-attrs-derivation="">Placed by us from the public record</p>
            <p>
              How the business gets its product — the single method most of its
              revenue comes from. It is the strongest signal of what actually
              transfers in a sale: a brand you own conveys to a buyer, a knack
              for finding discounted stock does not.
            </p>
            <p data-attrs-note="">
              The listings, the brand registry record and the storefront show
              what is being sold and who is registered against it. They do not
              show how the stock was bought, so where the public record is
              genuinely ambiguous the attribute stays unplaced.
            </p>

            <dl data-attrs-defs="">
              {SOURCING.map(({ term, def }) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{def}</dd>
                </div>
              ))}
            </dl>

            <SourcingMatrix />
          </section>

          {/* ── Fulfilment ────────────────────────────────────────────── */}
          <section>
            <h2 id="fulfilment">Fulfilment</h2>
            <p data-attrs-derivation="">Read from the listings</p>
            <p>
              How the order reaches the customer. It is the cost side of the
              business rather than the revenue side, and on a cheap product it
              decides the margin: Amazon charges to move a box by its size and
              weight, not by what the box is worth, so the same fee is a third
              of a $7 product and a tenth of a $20 one.
            </p>
            <p data-attrs-note="">
              This is a per-listing fact, not an account-level one. The value
              names the method most of the catalogue uses and the note carries
              the split, because pushing the heavy or slow lines to FBM while
              the rest stays on FBA is a deliberate and common choice.
            </p>

            <dl data-attrs-defs="">
              {FULFILMENT.map(({ term, def }) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{def}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Catalogue ─────────────────────────────────────────────── */}
          <section>
            <h2 id="catalogue">Catalogue structure</h2>
            <p data-attrs-derivation="">Placed by us from the public catalogue</p>
            <p>
              The shape of the catalogue: whether revenue rests on one product,
              a handful, a long tail of variations, or a portfolio with no
              anchor. It tells a buyer what running the business involves day to
              day, and where it breaks if a single listing stalls.
            </p>
            <p data-attrs-note="">
              One of six shapes, describing how revenue is spread across the
              catalogue rather than how many listings there are.
            </p>

            {/* The chart is the first thing scanned and the paragraph is what
                confirms it, so they sit on one row rather than in two lists. */}
            <dl data-attrs-catalogue="">
              {CATALOGUE.map((entry) => (
                <div key={entry.term}>
                  <CatalogueShape entry={entry} />
                  <div>
                    <dt>{entry.term}</dt>
                    <dd>
                      {entry.def}
                      <br />
                      <em>Example: {entry.eg}</em>
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p data-attrs-figure-note="">
              Each chart is one business's revenue split across its catalogue —
              one bar per product, tallest first. Trend / seasonal churn is the
              exception and runs along months rather than products, because
              turnover is the thing that defines it.
            </p>
          </section>

          {/* ── Differentiation ───────────────────────────────────────── */}
          <section>
            <h2 id="differentiation">Differentiation</h2>
            <p data-attrs-derivation="">
              Assessed by us against the product and the generic version of it
            </p>
            <p>
              How hard the product is for a competitor to copy. The principle
              behind the ladder is that{" "}
              <strong>complexity, cost and time spent make a product defensible</strong>{" "}
              — and that the uniqueness has to be visible to the customer and
              worth something to them. A difference nobody can see is not
              differentiation.
            </p>

            <DiffLadder />

            <p data-attrs-note="">
              It is a factual checklist rather than a rating: the questions
              below are answered in order, and the level is the first one that
              gets a yes.
            </p>

            <ol data-attrs-levels="">
              {LEVELS.map(({ term, def, eg }) => (
                <li key={term}>
                  <p data-attrs-term="">{term}</p>
                  <p>
                    {def}
                    <br />
                    <em>Example: {eg}</em>
                  </p>
                </li>
              ))}
            </ol>

            <h3>How the level is decided</h3>
            <DiffFlow />
            <p data-attrs-note="">
              Most successful marketplace products land at level 2 or 3. A level
              1 product is not a bad business — plenty of them earn well — but
              it is one a competitor can stand up quickly, and that is a fact a
              buyer is entitled to before they pay for it.
            </p>
          </section>

          {/* ── Where they appear ─────────────────────────────────────── */}
          <section>
            <h2 id="where">Where these appear</h2>
            <p>
              All three sit under <strong>Additional metrics</strong> on a
              profile. None of the three can be read off a set of figures, and
              none is worth guessing — so a profile we have not placed shows a
              question mark rather than an answer.
            </p>

            <WhereTheyAppear />

            <p data-attrs-note="">
              A question mark means nobody has placed it yet. It does not mean
              the answer is &ldquo;none&rdquo;, and it is not a judgement about
              the business.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

/* ══ The figures ═══════════════════════════════════════════════════════ */

/**
 * The intro's argument, drawn: same revenue, same shape, different asset.
 *
 * 🚨 THE TWO PANELS ARE DELIBERATELY IDENTICAL above the divider — same
 * figure, same path data, same label. The moment one line is drawn healthier
 * than the other, the picture argues that you CAN see the difference in the
 * numbers, which is the opposite of what the paragraph above it says. Both
 * panels therefore read `SPARK`, one constant, rather than two paths somebody
 * will later "improve" apart.
 */
function SameNumbers() {
  return (
    <figure data-same="">
      <div data-same-panels="">
        {SAME_NUMBERS.map((side) => (
          <div key={side.key} data-same-panel="">
            <p data-same-label="">Revenue · last 12 months</p>
            <p data-same-figure="" data-figure="">$1.2M</p>
            {/* No axis line. The divider under the sparkline is the rule that
                carries the argument — everything above it is identical — and a
                second hairline 20px above it read as a mistake rather than as
                two different things. */}
            <svg viewBox="0 0 260 46" aria-hidden="true">
              <path d={SPARK} data-series="" />
            </svg>
            <ul data-same-attrs="">
              {side.attrs.map(([label, value]) => (
                <li key={label}>
                  <span data-attr-label="">{label}</span>
                  <span data-attr-value="">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption>
        Two businesses, one figure. Everything a revenue chart can tell you
        about these two is the same; everything that decides what they are worth
        is underneath it.
      </figcaption>
    </figure>
  );
}

/** One path, both panels. See the note on `SameNumbers`. */
const SPARK =
  "M4 40 L25 36 L46 39 L67 30 L88 33 L109 25 L130 28 L151 19 L172 22 L193 13 L214 17 L235 8";

const SAME_NUMBERS = [
  {
    key: "built",
    attrs: [
      ["Sourcing", "Private label"],
      ["Catalogue", "Concentrated bets, few SKUs"],
      ["Differentiation", "Level 4 — hard to copy"],
    ],
  },
  {
    key: "bought",
    attrs: [
      ["Sourcing", "Arbitrage"],
      ["Catalogue", "Generalist portfolio"],
      ["Differentiation", "Level 1 — standard product"],
    ],
  },
] as const;

/**
 * What transfers with the business, per sourcing method.
 *
 * 🚨 THE TABLE ASSERTS NOTHING THE DEFINITIONS DO NOT. Every cell is read off
 * the paragraph above it — "Nobody else sells the identical listing" is the
 * sole-seller ● for private label, "Other sellers can list the same product"
 * is the ○ for wholesale, "never holds inventory" is the ○ for dropship. Four
 * columns rather than the six that were tempting: the two dropped (who sets
 * the price, who owns the customer) are answered by the definitions for two
 * methods and guessed for the other six, and a summary that has to guess is no
 * longer a summary of anything.
 *
 * ● and ○ carry a word for screen readers and are told apart by SHAPE rather
 * than fill alone, which is also what keeps the table readable in a greyscale
 * screenshot.
 */
function SourcingMatrix() {
  return (
    <figure data-matrix="">
      <figcaption data-attrs-figure-title="">What transfers with the sale</figcaption>
      <div data-table-wrap="">
        <table data-earnings-table="">
          <thead>
            <tr>
              <th scope="col">Sourcing</th>
              {MATRIX_COLUMNS.map((c) => (
                <th key={c} scope="col">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SOURCING_MATRIX.map(({ term, cells }) => (
              <tr key={term}>
                <th scope="row">{term}</th>
                {cells.map((yes, i) => (
                  <td key={MATRIX_COLUMNS[i]} data-yes={yes ? "" : undefined}>
                    <span aria-hidden="true">{yes ? "●" : "○"}</span>
                    <span data-visually-hidden="">{yes ? "Yes" : "No"}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p data-attrs-figure-note="">
        Read off the definitions above — a filled dot is something the
        definition says the seller holds. The more of a row is filled, the more
        of the business is an asset rather than an activity.
      </p>
    </figure>
  );
}

const MATRIX_COLUMNS = [
  "Own brand",
  "Controls the spec",
  "Holds the stock",
  "Only seller of the listing",
] as const;

const SOURCING_MATRIX: Array<{ term: string; cells: [boolean, boolean, boolean, boolean] }> = [
  { term: "Private label", cells: [true, true, true, true] },
  { term: "Wholesale", cells: [false, false, true, false] },
  { term: "Dropship", cells: [false, false, false, false] },
  { term: "Arbitrage", cells: [false, false, true, false] },
  { term: "Handmade / artisan", cells: [true, true, true, true] },
  { term: "Print on demand", cells: [true, true, false, true] },
  { term: "Merch on Demand", cells: [true, true, false, true] },
  { term: "KDP", cells: [true, true, false, true] },
];

/**
 * One catalogue structure, as the shape of its revenue.
 *
 * Bars are a business's products, tallest first — so "broad catalogue" is a
 * flat run of short bars and "flagship" is a cliff, and the difference is one
 * glance rather than two paragraphs. `groups` draws the brackets underneath
 * that separate categories, which is the ONLY thing distinguishing category
 * dominance from a generalist portfolio: both are a spread of mid-sized
 * products, and whether they sit inside one category or three is the whole
 * distinction the definitions are drawing.
 *
 * Churn renders as humps over months instead, because it is the one structure
 * defined by time rather than by spread — a ranked bar chart of it would look
 * exactly like one of the others and teach the reader something false.
 */
function CatalogueShape({ entry }: { entry: CatalogueEntry }) {
  const { bars, groups, humps, axis, alt } = entry;
  const W = 210;
  const BASE = 46;

  return (
    <div data-shape="">
      <svg viewBox={`0 0 ${W} 62`} role="img" aria-label={alt}>
        <line x1="0" y1={BASE} x2={W} y2={BASE} data-axis="" />
        {humps
          ? humps.map(([cx, w, h], i) => <path key={i} d={humpPath(cx, w, h, BASE)} data-hump="" />)
          : layoutBars(bars ?? [], groups, W).map(({ x, w, h }, i) => (
              <rect key={i} x={x} y={BASE - h} width={w} height={h} data-bar="" />
            ))}
        {/* Brackets sit BELOW the axis so they read as a grouping of the bars
            rather than as another series. */}
        {groups
          ? bracketSpans(bars ?? [], groups, W).map(([x0, x1], i) => (
              <path key={i} d={`M${x0} 51 v4 h${x1 - x0} v-4`} data-bracket="" />
            ))
          : null}
      </svg>
      <p data-shape-axis="">{axis}</p>
    </div>
  );
}

/** Bar geometry: even slots across the width, with a wider gap between groups. */
function layoutBars(bars: readonly number[], groups: readonly number[] | undefined, W: number) {
  const sizes = groups ? [...groups] : [bars.length];
  const GROUP_GAP = 9;
  const inner = W - GROUP_GAP * (sizes.length - 1);
  const slot = inner / bars.length;
  const w = Math.max(1.5, slot * 0.62);

  const out: Array<{ x: number; w: number; h: number }> = [];
  let i = 0;
  let x = 0;
  for (const size of sizes) {
    for (let k = 0; k < size; k += 1, i += 1) {
      out.push({ x: x + (slot - w) / 2, w, h: Math.max(1.5, (bars[i] ?? 0) * 40) });
      x += slot;
    }
    x += GROUP_GAP;
  }
  return out;
}

/** The x-extent of each group, for the brackets under the axis. */
function bracketSpans(bars: readonly number[], groups: readonly number[], W: number) {
  const laid = layoutBars(bars, groups, W);
  const spans: Array<[number, number]> = [];
  let i = 0;
  for (const size of groups) {
    const first = laid[i]!;
    const last = laid[i + size - 1]!;
    spans.push([first.x - 1, last.x + last.w + 1]);
    i += size;
  }
  return spans;
}

/** A season: up, over, and gone again. */
function humpPath(cx: number, w: number, h: number, base: number) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  return [
    `M${x0} ${base}`,
    `C ${x0 + w * 0.28} ${base} ${cx - w * 0.2} ${base - h} ${cx} ${base - h}`,
    `C ${cx + w * 0.2} ${base - h} ${x1 - w * 0.28} ${base} ${x1} ${base}`,
    "Z",
  ].join(" ");
}

/**
 * The ladder as the two axes it is actually describing.
 *
 * The paragraph above it states the principle — complexity, cost and time
 * spent make a product defensible — which is an x and a y, so it is drawn as
 * an x and a y. The steps rise faster than they widen on purpose: days
 * separate level 1 from level 2 and a commissioned mould separates 3 from 4,
 * so an evenly-stepped staircase would flatten the one part of the ladder that
 * carries the value.
 */
function DiffLadder() {
  const BASE = 128;
  const X0 = 30;
  const STEP_W = 108;
  /* 🚨 The tallest step tops out at 92 against a 128 baseline, which leaves the
     36px of headroom the two label lines need. Raise a height and the level-4
     label leaves the canvas silently — SVG does not clip loudly. */
  const heights = [16, 36, 62, 92];

  return (
    <figure data-ladder="">
      <svg
        viewBox="0 0 470 168"
        role="img"
        aria-label="A staircase of four steps rising left to right: level 1 standard product, level 2 cosmetic variation, level 3 functional customisation, level 4 hard to copy. The vertical axis is how hard the product is to copy; the horizontal axis is the complexity, cost and time it takes to produce."
      >
        <line x1={X0 - 8} y1={BASE} x2="466" y2={BASE} data-axis="" />
        <line x1={X0 - 8} y1="8" x2={X0 - 8} y2={BASE} data-axis="" />
        {heights.map((h, i) => (
          <g key={i} data-step="" data-level={i + 1}>
            <rect x={X0 + i * STEP_W} y={BASE - h} width={STEP_W - 6} height={h} />
            <text x={X0 + i * STEP_W + (STEP_W - 6) / 2} y={BASE - h - 16} data-step-level="">
              {`Level ${i + 1}`}
            </text>
            <text x={X0 + i * STEP_W + (STEP_W - 6) / 2} y={BASE - h - 5} data-step-name="">
              {LADDER_NAMES[i]}
            </text>
          </g>
        ))}
        <text
          x={X0 - 14}
          y={BASE - 4}
          data-axis-label=""
          transform={`rotate(-90 ${X0 - 14} ${BASE - 4})`}
        >
          Harder to copy →
        </text>
        <text x={X0 - 8} y={BASE + 16} data-axis-label="">
          More complexity, cost and time to produce →
        </text>
      </svg>
    </figure>
  );
}

const LADDER_NAMES = ["standard", "cosmetic", "functional", "custom + IP"] as const;

/**
 * The checklist, as the flow it is.
 *
 * 🚨 THE QUESTIONS ARE VERBATIM. The temptation when a question goes into a
 * box is to trim it to fit — but this is the wording the level is actually set
 * by, and a shorter version on the public page is a second, looser test that a
 * reader can hold us to. The boxes grow instead.
 */
function DiffFlow() {
  return (
    <ol data-flow="">
      {DECISION.map(({ q, level }) => (
        <li key={level}>
          <p data-flow-q="">{q}</p>
          <p data-flow-yes="">
            Yes <span aria-hidden="true">→</span> <b>{level}</b>
          </p>
        </li>
      ))}
      <li data-flow-end="">
        <p data-flow-q="">No to all three.</p>
        <p data-flow-yes="">
          <span aria-hidden="true">→</span> <b>level 1</b>
        </p>
      </li>
    </ol>
  );
}

const DECISION = [
  {
    q: "Does the product need custom tooling, a mould or complex engineering to manufacture — or does it have patent or trademark protection a competitor cannot legally copy?",
    level: "level 4",
  },
  {
    q: "Is it custom-made with several unique changes against the generic version — form, features, functionality, performance or materials, not just colour?",
    level: "level 3",
  },
  {
    q: "Does it have at least one visible difference from the off-the-shelf version — a different colour or pattern, or a small feature change?",
    level: "level 2",
  },
] as const;

/**
 * The three rows as a profile actually renders them, placed and not.
 *
 * A specimen rather than a description: "shows a question mark rather than a
 * guess" reads as a hedge until you have seen the question mark. The
 * right-hand column is deliberately the same size and weight as the left — the
 * absence is the point, and shrinking it would soften it.
 *
 * 🚧 Hand-built markup, not the real `MetricCell`. That component carries the
 * tooltip and a learn-more link back to THIS page; importing it here would be
 * a cycle and a great deal of machinery for a picture.
 */
function WhereTheyAppear() {
  return (
    <figure data-appear="">
      {APPEAR.map((col) => (
        <div key={col.title} data-appear-col="" data-empty-col={col.empty ? "" : undefined}>
          <p data-appear-title="">{col.title}</p>
          <dl>
            {col.rows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {/* No badge. The column title says "Not placed" and three question
              marks say it again; a third label saying it a fourth time was
              filling space rather than adding anything. */}
        </div>
      ))}
    </figure>
  );
}

const APPEAR = [
  {
    title: "Placed",
    empty: false,
    rows: [
      ["Sourcing", "Private label"],
      ["Catalogue", "Broad catalogue, low volume each"],
      ["Differentiation", "Level 3 — functional customisation"],
    ],
  },
  {
    title: "Not placed",
    empty: true,
    rows: [
      ["Sourcing", "?"],
      ["Catalogue", "?"],
      ["Differentiation", "?"],
    ],
  },
] as const;

/* ══ The definitions ═══════════════════════════════════════════════════
   Kept as data so the page reads as one list, and a new option is one entry
   rather than a new paragraph somebody has to match to the others' voice. */

const TOC: Array<{ href: string; label: string; note: string }> = [
  { href: "#sourcing", label: "Sourcing", note: "eight methods" },
  { href: "#fulfilment", label: "Fulfilment", note: "four methods" },
  { href: "#catalogue", label: "Catalogue structure", note: "six shapes" },
  { href: "#differentiation", label: "Differentiation", note: "four levels" },
  { href: "#where", label: "Where these appear", note: "on a profile" },
];

/**
 * How the order actually ships — the other half of "how is this supplied".
 *
 * 🚨 A PER-LISTING fact reported as a business-level one. A seller can run most
 * of a catalogue on FBA and push the oversized or slow-moving lines to FBM
 * precisely to dodge the fee card, so the honest value is the dominant method
 * with the split in the note. "Mixed" exists for the accounts where neither
 * side dominates, and it is a finding rather than a failure to decide.
 */
const FULFILMENT: Array<{ term: string; def: string }> = [
  {
    term: "FBA",
    def: "Fulfilled by Amazon. Stock sits in Amazon's warehouses and Amazon picks, packs, ships and handles returns, charging a published per-unit fee by size and weight. Carries the Prime badge.",
  },
  {
    term: "FBM",
    def: "Fulfilled by Merchant. The seller holds the stock and ships each order themselves. No FBA fee, no automatic Prime badge, and shipping cost and delivery speed become the seller's problem rather than a line on a rate card.",
  },
  {
    term: "Mixed",
    def: "Both, deliberately. Usually the fast-moving catalogue on FBA and the oversized, heavy or slow lines on FBM, where the fee card would cost more than self-shipping.",
  },
  {
    term: "1P / Vendor",
    def: "The seller does not sell to the customer at all — Amazon buys the stock wholesale and resells it. The listing reads “Ships from and sold by Amazon.com”. Margins are set by a purchase order rather than by the seller.",
  },
];

const SOURCING: Array<{ term: string; def: string }> = [
  {
    term: "Private label",
    def: "The seller puts their own brand on the product and controls its spec — packaging, design, sometimes formulation. Nobody else sells the identical listing.",
  },
  {
    term: "Wholesale",
    def: "Buys an existing branded product in bulk from the brand or an authorised distributor and resells it. Other sellers can list the same product.",
  },
  {
    term: "Dropship",
    def: "Lists products it never holds inventory of; a third party ships directly to the customer when an order comes in.",
  },
  {
    term: "Arbitrage (retail or online)",
    def: "Buys already-branded products from shops or other websites at a discount and resells them at a markup. There is no ongoing supplier relationship.",
  },
  {
    term: "Handmade / artisan",
    def: "The seller, or a small team, physically makes the product. It is not mass-manufactured by a factory.",
  },
  {
    term: "Print on demand",
    def: "A third-party print service fulfils a listing the seller owns and controls — price, branding and reviews stay with them.",
  },
  {
    term: "Merch on Demand",
    def: "Amazon's closed royalty programme. The seller uploads designs; Amazon sets the price and fulfils, and pays a fixed royalty.",
  },
  {
    term: "KDP",
    def: "Amazon's publishing royalty programme, for books, journals and similar.",
  },
];

/**
 * The six structures, each with the shape of the revenue that defines it.
 *
 * `bars` are fractions of the chart's height, tallest first — a business's
 * products ranked by revenue. `groups` splits them into categories and draws
 * the brackets. `humps` is the churn exception: [centre, width, height] per
 * season, along months rather than products.
 *
 * 🚨 The heights are ILLUSTRATIVE and belong to no business. They are drawn to
 * be told apart at a glance — flagship is a cliff, concentrated is a plateau,
 * broad is a floor — not to be measured. Nothing reads them.
 */
type CatalogueEntry = {
  term: string;
  def: string;
  eg: string;
  /** The caption under the chart — what the axis is, in the fewest words. */
  axis: string;
  /** The chart's `aria-label`. A shape is only an argument if it reaches
   *  everyone; decorative-only, this section drops for a screen reader down to
   *  six paragraphs that no longer contrast with anything. */
  alt: string;
  bars?: number[];
  groups?: number[];
  humps?: Array<[number, number, number]>;
};

const CATALOGUE: CatalogueEntry[] = [
  {
    term: "Broad catalogue, low volume each",
    def: "Many SKUs, each aimed at a small slice of search demand and differentiated mainly by design or variation.",
    eg: "hundreds of poster designs, each pulling modest individual search volume, together adding up to meaningful revenue.",
    axis: "many products · none of them large",
    alt: "A long run of two dozen short bars of almost equal height.",
    bars: [
      0.3, 0.29, 0.28, 0.27, 0.26, 0.26, 0.25, 0.24, 0.24, 0.23, 0.22, 0.22, 0.21, 0.2, 0.2, 0.19,
      0.19, 0.18, 0.18, 0.17, 0.16, 0.16, 0.15, 0.14, 0.13, 0.12,
    ],
  },
  {
    term: "Flagship + complementary",
    def: "One dominant product drives most revenue, with adjacent products sold alongside it to the same customers.",
    eg: "a bestselling yoga mat, plus blocks, straps and a carry bag sold as add-ons.",
    axis: "one hero · the rest sold alongside it",
    alt: "One bar at full height, followed by five much shorter ones.",
    bars: [1, 0.26, 0.21, 0.17, 0.13, 0.09],
  },
  {
    term: "Concentrated bets, few SKUs",
    def: "A handful of independently significant products with no filler around them. Unlike flagship + complementary there is no hero carrying the rest — each would still be a real business alone.",
    eg: "six to eight SKUs — a garlic press, a knife sharpener, a spiraliser — each a top seller in its own right.",
    axis: "few products · each one significant",
    alt: "Six tall bars of similar height with no small ones beside them.",
    bars: [0.92, 0.86, 0.82, 0.75, 0.7, 0.62],
  },
  {
    term: "Category dominance",
    def: "Owns most or all major variations within one narrow category — every size, colour and pack count of essentially one product type, rather than different products around a hero SKU.",
    eg: "every case style, colour and size for one specific phone model.",
    axis: "one category · every variation of it",
    alt: "Twelve mid-height bars gathered under a single bracket marking one category.",
    bars: [0.72, 0.68, 0.66, 0.62, 0.6, 0.57, 0.55, 0.52, 0.5, 0.47, 0.44, 0.4],
    groups: [12],
  },
  {
    term: "Trend / seasonal churn",
    def: "Deliberately high turnover: launch against a trend or season, ride it, retire it, launch the next one.",
    eg: "a new set of Halloween costume designs each year, discontinuing the previous year's underperformers rather than maintaining a stable catalogue.",
    axis: "months · launched, ridden, retired",
    alt: "Four humps rising and falling one after another along a time axis.",
    humps: [
      [34, 62, 30],
      [86, 58, 38],
      [136, 60, 26],
      [186, 56, 34],
    ],
  },
  {
    term: "Generalist / multi-niche portfolio",
    def: "Products spread across unrelated categories with no single anchor or shared customer base.",
    eg: "phone cases, kitchen gadgets and pet toys under one account with no connection between them.",
    axis: "unrelated categories · no anchor",
    alt: "Three separate clusters of bars, each cluster bracketed as its own category.",
    bars: [0.62, 0.5, 0.42, 0.7, 0.55, 0.36, 0.58, 0.48, 0.4, 0.3],
    groups: [3, 3, 4],
  },
];

/**
 * 🚨 Level 4's example names a real, third-party product — OTOTO's "Gracula".
 * A reader deciding whether a product clears the bar is best served by being
 * able to go and look at one that does, and the ladder is easier to place once
 * the top of it is a thing you can hold.
 *
 * It names a third party rather than a business profiled on this site, which
 * is the only reason it is safe: nothing here is a claim about anyone we
 * publish. Do not put a profiled business's product in this list — a worked
 * example on a reference page reads as an assessment we published about them.
 */
const LEVELS: Array<{ term: string; def: string; eg: React.ReactNode }> = [
  {
    term: "Level 1 — standard product",
    def: "An off-the-shelf generic product with the seller's logo on it, and any improvement invisible to the customer. The lowest complexity, cost and time to produce — and correspondingly the lowest defensibility.",
    eg: "a standard stainless-steel garlic press from a supplier catalogue with a brand logo on the handle. A competitor replicates it in days by ordering the same base unit from the same factory.",
  },
  {
    term: "Level 2 — cosmetic variation",
    def: "An off-the-shelf product with one or more unique changes to its form — colour, pattern — and perhaps some enhancement to features or functionality.",
    eg: "the same garlic press moulded in a novelty shape, or offered in several colours with a slightly better handle grip. A competitor copies it by requesting a variant from the same manufacturer.",
  },
  {
    term: "Level 3 — functional customisation",
    def: "A custom product with multiple unique changes to form, features, functionality, performance or quantity. It may be made from simple customisable materials such as paper, fabric or wood.",
    eg: "the garlic press sold as a bundled kitchen kit — press, spoon holder, sharpener — in a custom wood or fabric case, with genuinely different functionality from the single tool. Copying it means re-sourcing several components and re-engineering the bundle.",
  },
  {
    term: "Level 4 — hard to copy",
    def: "Fully custom, with multiple unique changes across form, features, functionality and performance. Hard to imitate through design and manufacturing complexity, intellectual property protection, or both — typically requiring a mould, tooling or complex engineering.",
    eg: (
      <>
        OTOTO&rsquo;s{" "}
        <a
          href="https://www.amazon.com/Gracula-Garlic-Twist-Crusher-OTOTO/dp/B076CTTZKX"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          &ldquo;Gracula&rdquo; garlic crusher
        </a>{" "}
        — a fully custom Dracula-shaped mould requiring proprietary tooling. A
        competitor cannot legally or economically reproduce the design without
        commissioning their own mould from scratch.
      </>
    ),
  },
];
