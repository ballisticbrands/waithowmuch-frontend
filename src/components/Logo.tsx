/**
 * Placeholder WaitHowMuch mark: a bold "?".
 *
 * A question mark is the one glyph that says what this product is — the
 * reaction to a number you did not expect. Deliberately minimal; real
 * branding is a later pass.
 *
 * Drawn as <text> rather than paths so /public/logo.svg can be the same
 * artwork with no font dependency at build time.
 */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} role="img" aria-label="WaitHowMuch" className="shrink-0">
      <text
        x="256" y="272" textAnchor="middle" dominantBaseline="central"
        fontSize="440" fontWeight="800"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        fill="var(--success)"
      >?</text>
    </svg>
  );
}
