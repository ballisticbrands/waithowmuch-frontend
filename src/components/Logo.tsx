/**
 * Placeholder WaitHowMuch mark: a bold "?".
 *
 * The repo this was forked from used a "VM" lockup where the V was a green
 * checkmark — a "verified" signal that means nothing here, so it is gone. A
 * question mark is the one glyph that actually says what this product is:
 * the reaction to a number you did not expect.
 *
 * Deliberately minimal — real branding is a later pass (see BRANDING.md).
 * Drawn as <text> rather than paths so /public/logo.svg can be the same
 * artwork byte-for-byte without a font dependency at build time.
 */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      role="img"
      aria-label="WaitHowMuch"
      className="whm-logo shrink-0"
    >
      <text
        x="256"
        y="272"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="440"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        fill="var(--success)"
      >
        ?
      </text>
    </svg>
  );
}
