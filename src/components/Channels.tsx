import type { Block } from "@/businesses/types";

type ChannelsBlock = Extract<Block, { type: "channels" }>;

/**
 * A list of channels: a name, one figure, and the paragraph that says what
 * the figure is.
 *
 * ── Why this is not a table ──────────────────────────────────────────────
 * Every row here carries a paragraph, and several of those paragraphs are the
 * point of the row rather than a footnote to it — a Meta ad library entry is
 * worth reading precisely because the spend beside it is unknowable. Four
 * columns of prose is a table nobody can read on a phone, so the note gets the
 * full width under its own row instead.
 *
 * ── 🚨 Two figures, deliberately on two lines ────────────────────────────
 * `value` is the headline and is often modelled; `counted` is the part
 * somebody published. A modelled range and a counted fact sharing one cell is
 * how a reader comes away thinking we measured the range. The counted line is
 * labelled as counted, in the muted colour the notes use, under the row it
 * qualifies.
 */
export function Channels({ block }: { block: ChannelsBlock }) {
  return (
    <section data-channels-block="">
      {block.caption && <h3>{block.caption}</h3>}
      <ul data-channels="">
        {block.items.map((c) => (
          <li key={c.label} data-flag={c.flag ? "" : undefined}>
            <span data-channel-label="">
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer nofollow">
                  {c.label}
                </a>
              ) : (
                c.label
              )}
            </span>
            {c.value && (
              <span data-channel-value="" data-figure="">
                {c.value}
              </span>
            )}
            {c.counted && (
              <p data-channel-counted="">
                <span>Counted</span> {c.counted}
              </p>
            )}
            {c.note && <p data-channel-note="">{c.note}</p>}
          </li>
        ))}
      </ul>
      {block.note && <p data-breakdown-note="">{block.note}</p>}
    </section>
  );
}
