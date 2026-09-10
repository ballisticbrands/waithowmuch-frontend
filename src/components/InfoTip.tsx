import { useEffect, useRef, useState } from "react";

/**
 * The ⓘ beside a metric label.
 *
 * ── A button, not a hover target ─────────────────────────────────────────
 * 🚨 Hover alone is unreachable by keyboard and unusable on touch, which on a
 * page whose figures are all bands and models would put the definition of
 * every one of them out of reach on a phone. This opens on hover for a mouse
 * AND on focus and click for everyone else, and it is a real <button>, so it
 * lands in the tab order and announces itself.
 *
 * ── Fixed positioning, measured on open ──────────────────────────────────
 * The panel is wider than the grid column it belongs to and the metrics wrap,
 * so an absolutely-positioned panel would be clipped by the card's own edge.
 * Measuring the button and clamping to the viewport costs a dozen lines and
 * works at every width.
 */
export function InfoTip({
  label,
  paragraphs,
  learnMore,
}: {
  label: string;
  paragraphs: string[];
  /** Path to the page that explains this attribute in full. A tooltip holds
   *  two or three sentences before it stops being a tooltip; an attribute
   *  whose value is a phrase from a fixed list needs the list, the examples
   *  and the boundaries between the options, and that is a page. */
  learnMore?: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  /* Pinned by a click: survives everything until Escape or a click elsewhere.
     Hovering is the lighter mode. */
  const [pinned, setPinned] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);

  const cancelClose = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  /* 🚨 A grace period, not an immediate close. The panel is `position: fixed`
     and sits above the icon with a gap, so a pointer travelling from one to
     the other passes over neither — closing on the first mouseleave makes the
     panel impossible to reach at all. 140ms crosses the gap and is short
     enough that a panel never lingers over something a reader has left. */
  const scheduleClose = () => {
    if (pinned) return;
    cancelClose();
    timer.current = window.setTimeout(() => setPos(null), 140);
  };

  const open = () => {
    cancelClose();
    const r = btn.current?.getBoundingClientRect();
    if (!r) return;
    const w = Math.min(340, window.innerWidth - 24);
    setPos({
      left: Math.min(Math.max(12, r.left - 14), window.innerWidth - w - 12),
      top: r.top - 10,
    });
  };

  const close = () => {
    cancelClose();
    setPinned(false);
    setPos(null);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      // Focus returns to the control the reader opened, or Escape silently
      // drops them at the top of the document.
      btn.current?.focus();
    };
    // Capture, so a click on something that stops propagation still dismisses
    // this: a tooltip outliving its subject is one the reader cannot get rid of.
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!wrap.current?.contains(t) && !panel.current?.contains(t)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown, true);
    };
  }, [pinned]);

  return (
    <span ref={wrap} data-infowrap="" onMouseLeave={scheduleClose}>
      <button
        ref={btn}
        type="button"
        data-info=""
        data-pinned={pinned ? "" : undefined}
        aria-label={`What is ${label}?`}
        aria-expanded={pos !== null}
        onMouseEnter={open}
        onFocus={open}
        onBlur={(e) => {
          if (pinned) return;
          const to = e.relatedTarget as Node | null;
          if (!to || (!wrap.current?.contains(to) && !panel.current?.contains(to))) setPos(null);
        }}
        onClick={() => {
          if (pinned) close();
          else {
            open();
            setPinned(true);
          }
        }}
      >
        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
          <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8" cy="5.1" r="0.85" fill="currentColor" />
          <path d="M8 7.4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {pos && (
        <span
          ref={panel}
          role="tooltip"
          data-infotip=""
          /* Entering the panel cancels the pending close, so a reader can move
             onto it and read at their own pace. */
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{ left: pos.left, top: pos.top }}
        >
          {paragraphs.map((t) => (
            <span key={t}>{t}</span>
          ))}
          {learnMore && (
            /* 🚨 New tab, and therefore `rel="noopener noreferrer"`. Without
               noopener the opened page gets a handle on this one through
               window.opener and can navigate it somewhere else. A new tab
               rather than a navigation because the reader is mid-profile:
               sending them away to read a definition costs them their place. */
            <a
              data-learnmore=""
              href={learnMore}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={cancelClose}
              onBlur={() => {
                if (!pinned) setPos(null);
              }}
            >
              Learn more
              <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
                <path
                  d="M6.5 3.5h6v6M12.5 3.5L7 9M11 10.5v2h-7.5V5h2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span data-visually-hidden=""> (opens in a new tab)</span>
            </a>
          )}
          {pinned && <span data-tip-hint="">Esc to close</span>}
        </span>
      )}
    </span>
  );
}
