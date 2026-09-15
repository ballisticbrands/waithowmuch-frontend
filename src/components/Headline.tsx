import { readingStamp } from "@/lib/reading";

/**
 * The case-study hook — the two sentences a reader decides on.
 *
 * Written in waithowmuch-research (skills/write-profile-headline), reviewed,
 * and seeded onto the Business row. 🚨 Rendered from that row and nothing else:
 * the frontend holds no copy of it to fall back to, so a row without a title
 * has no headline rather than a stale one. This is the one component on the
 * page that renders a hardcoded figure.
 *
 * 🚨 Hence the stamp under it, which is the SAME sentence, with the same date,
 * that every dated section carries (lib/reading.ts): "Read Sep 2026. Figures
 * here are a reading taken then, not a live feed." A profile is a story told at
 * one point in time, and nothing promises it will be updated afterwards — not
 * the headline and not the figures under it. Delete the stamp and every figure
 * on the page silently claims to describe "now", forever. So the page renders
 * no headline at all for a row with no snapshotMonth.
 */
export function Headline({
  title,
  subtitle,
  snapshotMonth,
}: {
  /** Business.title. */
  title: string;
  /** Business.subtitle. */
  subtitle: string;
  /** Business.snapshotMonth — the date every stamp on the page uses. */
  snapshotMonth: string;
}) {
  return (
    <header data-headline="">
      <h2 data-headline-title="">{title}</h2>
      <p data-headline-sub="">{subtitle}</p>
      <p data-headline-asof="">{readingStamp(snapshotMonth)}</p>
    </header>
  );
}
