/**
 * The WaitHowMuch mark: "WHM?" stacked two-by-two inside a rounded violet
 * square — WH over M?.
 *
 * Drawn as <text> rather than outlined paths so it needs no font file at
 * build time and stays crisp at any size. The stack is the GENERIC monospace
 * families, not var(--font-mono): the mark must render identically in
 * /public/logo.svg, where no stylesheet is loaded at all, and a mark whose
 * proportions shift with a webfont swap is a mark that jitters on first paint.
 *
 * Monospace also does the layout work for free — WH and M? are both two glyphs
 * wide, so the two rows line up without hand-tuned letter-spacing.
 */
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="WaitHowMuch"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect width="64" height="64" rx="14" fill="var(--accent)" />
      <g
        fill="#ffffff"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontWeight="800"
        fontSize="24"
        letterSpacing="0"
        textAnchor="middle"
      >
        <text x="32" y="30">WH</text>
        <text x="32" y="54">M?</text>
      </g>
    </svg>
  );
}
