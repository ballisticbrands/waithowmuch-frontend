/** A metric key on the Business record that a `stat` block may reference. */
export type MetricKey =
  | "latestMonthlyRevenue"
  | "latestMonthlyProfit"
  | "latestMarginPct"
  | "startingCost";

/** A label/value pair in a `facts` block or the additional-metrics grid.
 *  `info` is a key into src/data/metric-info.ts — the ⓘ copy. */
export type Fact = {
  label: string;
  value: string;
  note?: string;
  info?: string;
  /** Path to a page explaining this attribute in full, linked from the ⓘ.
   *  For the attributes whose value is one phrase from a fixed list — the
   *  list itself is the definition, and it does not fit in a tooltip. */
  learnMore?: string;
  /** Span two columns of the grid — for a value that is a path or a phrase
   *  rather than a figure, and wraps to four lines in one column. */
  wide?: boolean;
  /** The value is words rather than a quantity. See MetricCell. */
  text?: boolean;
};

export type Block =
  /**
   * Starts a named section, and IS its heading — so a section that exists in
   * the table of contents always exists on the page under the same words.
   * Two sources of truth for that pairing is how a nav comes to list a
   * section the page does not have.
   */
  | {
      type: "section";
      id: string;
      title: string;
      /**
       * Which run of sections this belongs to — "What it earns", "Who and
       * when". The table of contents renders it as SPACE, not as a heading:
       * three of the five groups hold a single section, so headings would add
       * a line per group to say what a gap says for nothing, and half of them
       * would be text that does not navigate. The grouping earns its keep by
       * fixing the ORDER; it does not need a label on screen.
       */
      group?: string;
    }
  /** A label/value grid — the operator block, and anything else shaped like it. */
  | { type: "facts"; items: Fact[] }
  | { type: "heading"; text: string }
  /** A single line at the top of a section: what happened, for a reader who
   *  will not read the four paragraphs under it. */
  | { type: "lede"; text: string }
  /** The valuation cards. The figures come from the metric series and
   *  `profile.valuation`, never from the block. */
  | { type: "valuation" }
  /** The selling-method matrix. Like `valuation`, the block carries NO data:
   *  it renders `profile.selling` against the shared taxonomy, so the answers
   *  stay in one aggregable field rather than in page content. A chart across
   *  every business has to read a field; it cannot read a block. */
  | { type: "selling" }
  /** Every factor that moved the multiple, in two columns, with the model's
   *  own explanation behind each ⓘ. Renders nothing unless the profile wires
   *  up `valuation.inputs` — there is no breakdown for a typed multiple. */
  | { type: "valuation-board"; note?: string }
  /**
   * The unit economics, as a waterfall from revenue down to margin.
   *
   * 🚨 The margin is NOT stored. It is 100% less the lines, computed at render
   * — so a corrected cost line moves the answer instead of leaving a total
   * that no longer adds up.
   */
  | {
      type: "margin";
      /** What one order is worth, so each line can also be shown in money. */
      basis: { label: string; value: number };
      lines: Array<{
        label: string;
        /** A stable handle for a line another part of the page needs to read
         *  — the additional-metrics grid derives COGS from `cogs` rather than
         *  carrying its own copy of the percentage. Matching on `label` would
         *  work until somebody rewords a row. */
        key?: string;
        /** Negative: a share of revenue this line takes. */
        pct: number;
        detail?: string;
        /** Marks the line that decides the answer. */
        emphasis?: boolean;
      }>;
      /** The margin row's own note. */
      note?: string;
    }
  /** A plain table — supplier quotes, and anything else with columns. */
  | { type: "table"; caption?: string; columns: string[]; rows: string[][]; note?: string }
  /**
   * A list of channels: a name, the one figure that describes it, and the
   * paragraph saying what that figure is. Advertising spend by channel, the
   * off-marketplace presences, the best-seller positions.
   *
   * 🚨 `value` and `counted` are two fields rather than one because they are
   * two different kinds of number. `value` is the headline — often modelled,
   * because nobody publishes a competitor's ad bill. `counted` is the part
   * somebody actually measured and published. Sharing a line would let a
   * computed figure borrow the authority of a counted one.
   */
  | {
      type: "channels";
      caption?: string;
      items: Array<{
        label: string;
        /** Links the label out to the thing the row describes. */
        href?: string;
        /** The headline figure. Omit and the row is a name and a paragraph. */
        value?: string;
        /** What is genuinely published about this channel, beside what is not. */
        counted?: string;
        note?: string;
        /** The row carrying the finding, tinted like the emphasised margin line. */
        flag?: boolean;
      }>;
      note?: string;
    }
  /** Revenue by product — the bars and the table under them. */
  | {
      type: "breakdown";
      /** Sentence above the bars. */
      intro?: string;
      /** Marketplace host the ASINs belong to, for the links out of the table.
       *  Defaults to amazon.com — set it on a profile selling somewhere else,
       *  because /dp/<asin> resolves on the WRONG marketplace rather than
       *  failing, and a link that silently lands on the US listing for a UK
       *  business is worse than no link. */
      marketplace?: string;
      items: Array<{
        name: string;
        asin?: string;
        listed?: string;
        /** Units a month. Rendered as a band ("8,000+") because that is what
         *  the marketplace badge actually says. */
        sold?: number;
        price?: number;
        revenue: number;
        /** The listing's own photo, as a site-absolute path under /public.
         *
         *  🚨 Carries an argument, not decoration. This block's whole claim is
         *  that the catalogue is ONE object re-cut for a different target each
         *  time, and nine near-identical boxes show that at a glance where nine
         *  product names read as a range. A row without one still renders — the
         *  cell is then empty rather than a broken frame. */
        image?: string;
      }>;
      note?: string;
    }
  /**
   * A photograph, at the reading measure.
   *
   * 🚨 `alt` is REQUIRED, and not for compliance. scripts/postbuild-spa-routes
   * flattens the profile to static HTML for crawlers, where the alt text is
   * the only part of this block that survives — an empty one ships them a
   * blank. Describe what the picture shows, not that it is a picture.
   */
  | {
      type: "image";
      /** Site-absolute path under /public — not a remote URL. A third-party
       *  host can re-crop or drop an asset without warning, and the page has
       *  no way to notice. */
      src: string;
      alt: string;
      /** Printed under the image, in the muted ink the table notes use. */
      caption?: string;
      /** Render width in px. Defaults to the full reading measure; set it
       *  smaller for an object that does not earn the width. */
      width?: number;
    }
  | { type: "prose"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; text: string }
  /** Renders a figure pulled from the DB — never a hardcoded number. */
  | { type: "stat"; metric: MetricKey; label: string }
  /** Renders the monthly series from the DB. */
  | { type: "chart" }
  /**
   * The business's own links — store, site, socials — as the same chips the
   * overview leads with, pulled from the DB record rather than authored.
   *
   * 🚨 Deliberately repeatable. The overview renders this row too, and that
   * is not a duplication to clean up: a section page is a page in its own
   * right, and on a split profile the reader on Socials and traffic may
   * never have seen the overview. The alternative is a page that discusses
   * a TikTok audience at length and makes the reader navigate away to find
   * the account.
   */
  | { type: "links" }
  | {
      type: "timeline";
      items: Array<{
        when: string;
        what: string;
        /** Which strand of the story this belongs to — AMAZON, BRAND, WEB. */
        tag?: string;
        /** The paragraph under the headline. */
        detail?: string;
      }>;
    };

export type Profile = {
  /** Rendered under the name, above the figures. */
  intro?: string;
  /**
   * CASE-STUDY copy: the title and subtitle a reader is sold the page on.
   * Authored by waithowmuch-research (skills/write-profile-headline →
   * research/<slug>/headline.json) and copied here by hand after review.
   *
   * 🚨 The title HARDCODES a revenue figure, because a headline cannot be
   * interpolated and stay readable — which is the one place this file's
   * figures-never-in-prose rule cannot apply. That makes `snapshotMonth`
   * load-bearing rather than decorative: it is the only thing standing
   * between a frozen sentence and the live figure rendered directly beneath
   * it. `headline`/`subhead` columns on the Business row were built and
   * reverted on 2026-09-11 for exactly this reason; when the CaseStudy model
   * ships, this moves there and stops being authored here.
   */
  headline?: {
    /** 6–12 words, title case, no colon. */
    title: string;
    /** 25–45 words, and the point lands in the first 25 — the card clamps. */
    subtitle: string;
    /** The month every figure in `title` and `subtitle` is true of, "2026-09".
     *  NEVER "the latest month": that means something different every time the
     *  page is read, which is the whole failure this field prevents. */
    snapshotMonth: string;
  };
  /**
   * Turns on the valuation card. The VALUE is not stored: it is the multiple
   * applied to trailing-twelve net profit from the metric series, so it
   * cannot disagree with the chart. Omit and the whole row is not rendered —
   * which is the right state for a business nobody has priced.
   */
  valuation?: {
    /**
     * Run the ported model instead of stating a multiple.
     *
     * When present the multiple is COMPUTED — base 2.6 plus whatever the
     * facts support — and `multiple` below is ignored. Leave an answer out
     * rather than guessing it: the model reports what it did not know in
     * `missingSignals`, and a gap that says so is worth more than a guess
     * that does not. See src/valuation/model.mjs.
     */
    inputs?: {
      answers: import("../valuation/model").ValuationAnswers;
      derived?: import("../valuation/model").ValuationDerived;
    };
    /** A stated multiple, for a business nobody has run the model over yet.
     *  Ignored when `inputs` is present. Say where it came from in `note`. */
    multiple?: number;
    /**
     * Score the model as of this date instead of the end of the series.
     *
     * Rarely needed: the default is the last period the figures cover, which
     * is the instant the valuation was ever true at. Set it only where the
     * research was done at a materially different time from the last month of
     * data. It is NEVER "today" — see RULE 4 in valuation/inputs.mjs for the
     * 2.5 → 2.9 drift that rule exists to stop.
     */
    asOf?: string;
    /** Shown under the valuation. What the figure is and is not. */
    basis: string;
    /** Shown under the multiple. Where the multiple itself came from. */
    note?: string;
  };
  /**
   * The "Additional metrics" grid. Qualitative facts only — anything the
   * metric series already holds is derived in MetricCards.tsx instead, so it
   * cannot drift.
   */
  facts?: Fact[];
  /**
   * Which selling methods this business uses, keyed by an id from
   * businesses/selling-methods.mjs.
   *
   * 🚨 MULTI-SELECT, and that is the point. `Sourcing` in the facts grid names
   * the one method most revenue comes from, because the valuation board needs
   * a single answer to score. This names every method PRESENT, which is the
   * only shape a cross-business chart can count — see the header of
   * selling-methods.mjs for why "Mixed" as a single value destroys it.
   *
   * Anything omitted is `unchecked`, never `no`.
   */
  selling?: import("./selling-methods.mjs").SellingAnswers;
  blocks: Block[];
};

export function profileFor(slug: string): Profile | undefined;

/** A business rendered from local.mjs instead of from the API. Exactly the
 *  shapes the API returns, so a record can move into the database unchanged. */
export type LocalBusiness = {
  business: import("../lib/api").BusinessDetail;
  /** The API's own response shape, so a draft and a fetched profile take the
   *  same code path — toChartPoints for the chart, rowsOfType for the rest. */
  metrics: import("../lib/api").MetricsResponse;
};
