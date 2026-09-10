/**
 * The WaitHowMuch mark: "WHM?" stacked two-by-two inside a rounded violet
 * square — WH over M?.
 *
 * Drawn as <text> rather than outlined paths so it needs no font file at
 * build time and stays crisp at any size. The font stack is pinned to the
 * generic sans families rather than var(--font-sans): the mark must render
 * identically in /public/logo.svg, where Inter is not loaded, and a mark whose
 * proportions shift with a webfont swap is a mark that jitters on first paint.
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
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="27"
        letterSpacing="-1.5"
        textAnchor="middle"
      >
        <text x="32" y="30">WH</text>
        <text x="32" y="54">M?</text>
      </g>
    </svg>
  );
}
