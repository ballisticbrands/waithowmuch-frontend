import { Link } from "react-router-dom";

export type TocItem = { id: string; title: string; to: string; group?: string };

/**
 * The section list down the left of a profile.
 *
 * ── Pages, not anchors ───────────────────────────────────────────────────
 * Each entry is a real route that renders that section ALONE. A profile runs
 * to several thousand words across seven sections, and as one scrolling
 * document the nav could only ever drop a reader somewhere in the middle of
 * it — arriving mid-page with the previous section still above you and the
 * next one already below reads as "I have landed in the wrong place" rather
 * than as an answer. One section per page is a page a reader can finish.
 *
 * ── Derived, never hand-written ──────────────────────────────────────────
 * 🚨 The items come from the `section` markers in the profile itself, so the
 * nav cannot list a section the page does not have, or miss one it does. A
 * hand-kept copy is a promise to update two files on every edit, and the
 * failure is silent: a link to a section that renders nothing.
 */
export function Toc({ items, active }: { items: TocItem[]; active: string }) {
  return (
    <nav data-toc="" aria-label="Sections">
      <span data-toc-label="">Sections</span>
      <ul>
        {items.map((s, i) => (
          /* A group boundary is a GAP, not a heading. See the note on the
             `group` field in businesses/types.d.ts for why. The first item
             never starts one — there is nothing above it to separate from. */
          <li
            key={s.id}
            data-group-start={i > 0 && s.group !== items[i - 1]!.group ? "" : undefined}
          >
            <Link
              to={s.to}
              data-on={active === s.id ? "" : undefined}
              aria-current={active === s.id ? "page" : undefined}
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** "Next: Growth →" at the foot of a section, so the profile can still be
 *  read straight through without going back to the nav every time. */
export function NextSection({ item }: { item: TocItem }) {
  return (
    <Link data-next-section="" to={item.to}>
      <span>Next</span>
      {item.title}
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path
          d="M3 8h10M9.5 4L13.5 8L9.5 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
