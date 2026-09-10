import { useLayoutEffect, useRef, useState } from "react";
import type { Block } from "@/businesses/types";
import { exactMoney } from "@/lib/format";

type Breakdown = Extract<Block, { type: "breakdown" }>;
type Item = Breakdown["items"][number];

/**
 * Where the revenue actually is — revenue by product, as one part-to-whole
 * bar over a table.
 *
 * ── One bar, not one per row ─────────────────────────────────────────────
 * The question this block exists to answer is "is this one product or a
 * catalogue", and that is a part-to-whole question. A row of independent bars
 * answers it only by inviting the reader to eyeball nine lengths against each
 * other; a single 100%-wide bar answers it in one glance, because the share IS
 * the width. It also stopped the block printing every product twice — the old
 * bar list and the table under it carried the same names and the same revenue
 * column with nothing new in between.
 *
 * ── 🚨 Ordinal colour, one hue ───────────────────────────────────────────
 * The segments touch, so they need a separation channel, and this design
 * system has exactly one chroma on purpose (see --accent in globals.css). So
 * the ramp is that hue at seven lightnesses, darkest = biggest, which is the
 * ordinal reading of a bar already sorted by revenue. Steps validated against
 * the ordinal checks on a white surface: monotone lightness, adjacent ΔL
 * >= 0.06, light end 2.09:1. Do not add a second hue to tell segments apart.
 *
 * ── Nothing is gated behind hover ────────────────────────────────────────
 * The tooltip is a shortcut, not the only way to a number: every figure in it
 * is in the table below, each segment carries the same readout as its
 * accessible name, and a tap pins it for touch, where there is no hover.
 *
 * ── 🚨 The total is computed, not typed ──────────────────────────────────
 * The rows sum to the headline monthly revenue, and saying so is the point of
 * the block — it is what shows the breakdown is complete rather than a
 * selection. So the sum is added up here. Typed as a literal it would survive
 * unchanged the first time a row was corrected, and quietly stop being true.
 */

/* Seven steps of --accent, dark -> light. Step three is the accent itself, so
   the ramp reads as the brand hue rather than as a new palette. */
const RAMP = ["#3f0ac0", "#4e21e0", "#5c3ef6", "#6b5ffb", "#7d7cfc", "#9296fc", "#a8adfd"];

type Segment = {
  key: string;
  label: string;
  color: string;
  revenue: number;
  share: number;
  /** The rows this segment stands for — one, or the folded tail. */
  rows: Item[];
};

const pct = (share: number) => `${share < 0.01 ? "<1" : Math.round(share * 100)}%`;

/** The listing itself. `/dp/<asin>` is the canonical short form and is what
 *  the profile's own sources already cite, so the table and the citations
 *  point at the same page. */
const listingUrl = (asin: string, host: string) =>
  `https://${host}/dp/${encodeURIComponent(asin)}`;

/** Ramp positions spread across whatever number of segments there are, so a
 *  three-segment bar uses the whole range instead of three near-neighbours. */
const stepFor = (i: number, n: number) =>
  RAMP[n <= 1 ? 0 : Math.round((i * (RAMP.length - 1)) / (n - 1))];

/** Segments in revenue order. A product with no sales has no width, so it is
 *  not a segment at all — it stays in the table, which is where a zero row is
 *  actually legible. Past the ramp's length the tail folds into one segment
 *  rather than inventing an eighth step nobody could tell from the seventh. */
function segmentsOf(items: Item[], total: number): Segment[] {
  const earning = items.filter((i) => i.revenue > 0);
  const head = earning.length > RAMP.length ? earning.slice(0, RAMP.length - 1) : earning;
  const tail = earning.slice(head.length);
  const parts: Array<{ label: string; revenue: number; rows: Item[] }> = head.map((i) => ({
    label: i.name,
    revenue: i.revenue,
    rows: [i],
  }));
  if (tail.length > 0) {
    parts.push({
      label: `${tail.length} smaller listings`,
      revenue: tail.reduce((a, i) => a + i.revenue, 0),
      rows: tail,
    });
  }
  return parts.map((p, i) => ({
    ...p,
    key: p.rows.map((r) => r.name).join("|"),
    color: stepFor(i, parts.length),
    share: total > 0 ? p.revenue / total : 0,
  }));
}

export function SalesBreakdown({ block, currency }: { block: Breakdown; currency: string }) {
  const items = [...block.items].sort((a, b) => b.revenue - a.revenue);
  const host = block.marketplace ?? "www.amazon.com";
  /* Floored, not rounded. One row is $649.50, so the true sum is $89,988.50 —
     and rounding it up prints a total a dollar above the headline revenue
     sitting on the overview, which reads as one of the two being wrong.
     Flooring is also what the source did with the same rows. */
  const exact = items.reduce((a, i) => a + i.revenue, 0);
  const total = Math.floor(exact);
  const units = items.reduce((a, i) => a + (i.sold ?? 0), 0);
  const segments = segmentsOf(items, exact);
  const top = items[0];

  /* `pinned` is the touch and keyboard path: there is no hover on a phone, so
     a tap has to be able to open the readout and leave it open. Hover sets the
     same state unpinned, and cannot clear a pinned one out from under a
     reader who deliberately opened it. */
  const [active, setActive] = useState<{ index: number; pinned: boolean } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const show = (index: number, pinned = false) =>
    setActive((cur) => (cur?.pinned && !pinned ? cur : { index, pinned }));
  const hide = () => setActive((cur) => (cur?.pinned ? cur : null));

  /* The tooltip is centred on its segment, then pulled back inside the track —
     the first and last segments are the ones a reader hovers most and they are
     exactly the two whose centred tooltip would hang off the card. Measured
     rather than guessed: the width depends on the product name. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    const tip = tipRef.current;
    if (active === null || !track || !tip) return;
    const seg = track.children[active.index] as HTMLElement | undefined;
    if (!seg) return;
    const half = tip.offsetWidth / 2;
    const centre = seg.offsetLeft + seg.offsetWidth / 2;
    setLeft(Math.max(half, Math.min(centre, track.offsetWidth - half)));
  }, [active]);

  const current = active === null ? null : segments[active.index];

  return (
    <section data-breakdown="">
      <h3>Where the revenue is</h3>
      {block.intro && <p data-breakdown-intro="">{block.intro}</p>}

      <div data-share="" onPointerLeave={hide}>
        <div data-share-track="" ref={trackRef}>
          {segments.map((s, i) => (
            <button
              key={s.key}
              type="button"
              data-share-seg=""
              data-active={active?.index === i ? "" : undefined}
              style={{ flexGrow: Math.max(s.share, 0.0001), background: s.color }}
              onPointerEnter={() => show(i)}
              onFocus={() => show(i)}
              onBlur={hide}
              onClick={() => setActive((cur) => (cur?.pinned && cur.index === i ? null : { index: i, pinned: true }))}
              /* The whole readout, so the tooltip is a convenience rather than
                 the only way a screen reader gets the numbers. */
              aria-label={`${s.label}: ${exactMoney(s.revenue, currency)} a month, ${pct(s.share)} of revenue`}
            >
              {/* One direct label, on the segment the block is about. A number
                  on every segment is unreadable at these widths, and the three
                  narrowest could not fit one anyway. It is white on the darkest
                  step of the ramp, which is why the hover state is a ring
                  rather than a dimming of everything else — fading this segment
                  would take its label under contrast with it. */}
              {i === 0 && s.share >= 0.15 && <span data-share-seg-label="">{pct(s.share)}</span>}
            </button>
          ))}
        </div>

        {current && (
          <div data-share-tip="" ref={tipRef} style={{ left }} aria-hidden="true">
            <span data-share-tip-value="" data-figure="">
              {exactMoney(current.revenue, currency)}/mo
            </span>
            <span data-share-tip-name="">{current.label}</span>
            <span data-share-tip-meta="">
              {pct(current.share)} of revenue
              {current.rows.length === 1 && current.rows[0].asin && ` · ${current.rows[0].asin}`}
            </span>
          </div>
        )}
      </div>

      <p data-breakdown-total="">
        {items.length} priced listings, summing to {exactMoney(total, currency)} a month
        {top && units > 0 && (
          <>
            {" "}— {Math.round((top.revenue / total) * 100)}% of it, and{" "}
            {Math.round(((top.sold ?? 0) / units) * 100)}% of the units, from {top.name}
          </>
        )}
        .
      </p>

      <div data-table-wrap="">
        <table data-earnings-table="">
          {/* Read once on entering the table, so the new-tab behaviour is
              announced a single time rather than eighteen times — one
              "(opens in a new tab)" per link is the version of this that makes
              a screen reader unusable. */}
          <caption data-visually-hidden="">
            Revenue by product. Product names and ASINs link to each listing on{" "}
            {host}, opening in a new tab.
          </caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">ASIN</th>
              <th scope="col">Listed</th>
              <th scope="col">Sold / mo</th>
              <th scope="col">Price</th>
              <th scope="col">Revenue / mo</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => {
              /* The swatch is the legend. Nine product names down the side of
                 the bar would be a second table; keyed to the row instead, the
                 table the reader already has does the job. */
              const index = segments.findIndex((s) => s.rows.includes(i));
              return (
                <tr
                  key={i.name}
                  data-active={active !== null && active.index === index ? "" : undefined}
                  onPointerEnter={() => index !== -1 && show(index)}
                  onPointerLeave={hide}
                >
                  <th scope="row">
                    <span
                      data-share-key=""
                      style={index === -1 ? undefined : { background: segments[index].color }}
                    />
                    {/* Both the name and the ASIN link, because both are what a
                        reader reaches for — the name when they want to see the
                        product, the ASIN when they are checking our figure
                        against the listing. A row with no ASIN has nothing to
                        point at and stays plain text rather than becoming a
                        dead link. */}
                    {i.asin ? (
                      <a href={listingUrl(i.asin, host)} target="_blank" rel="noopener noreferrer nofollow">
                        {i.name}
                      </a>
                    ) : (
                      i.name
                    )}
                  </th>
                  <td data-figure="">
                    {i.asin ? (
                      <a href={listingUrl(i.asin, host)} target="_blank" rel="noopener noreferrer nofollow">
                        {i.asin}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td data-figure="">{i.listed ?? "—"}</td>
                  {/* A band, because the marketplace badge is a band. Printing
                      it as an exact count would invent a precision Amazon
                      itself does not publish. */}
                  <td data-figure="">{i.sold === undefined ? "—" : `${i.sold.toLocaleString("en-US")}+`}</td>
                  <td data-figure="">{i.price === undefined ? "—" : exactMoney(i.price, currency)}</td>
                  <td data-figure="">{exactMoney(i.revenue, currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {block.note && <p data-breakdown-note="">{block.note}</p>}
    </section>
  );
}
