import type { Profile } from "@/businesses/types";
import { readingStamp } from "@/lib/reading";

/**
 * The case-study hook — the two sentences a reader decides on.
 *
 * Authored in waithowmuch-research (skills/write-profile-headline) and copied
 * into the profile after a human has read it. Nothing here is generated at
 * render time, which makes this the one component on the page that renders a
 * hardcoded revenue figure.
 *
 * 🚨 Hence the stamp under it, which is the SAME sentence, with the same date,
 * that every dated section carries (lib/reading.ts): "Read Sep 2026. Figures
 * here are a reading taken then, not a live feed." A profile is a story told at
 * one point in time, and nothing promises it will be updated afterwards — not
 * the headline and not the figures under it. Delete the stamp and every figure
 * on the page silently claims to describe "now", forever.
 */
export function Headline({
  headline,
  snapshotMonth,
}: {
  headline: NonNullable<Profile["headline"]>;
  /** The business's snapshotMonth from the database — the date every stamp on
   *  the page uses. */
  snapshotMonth: string | null;
}) {
  /* The authored month is only a fallback for an API that does not serve the
     column yet; the database is the source of the date. */
  const stamp = readingStamp(snapshotMonth ?? headline.snapshotMonth);
  return (
    <header data-headline="">
      <h2 data-headline-title="">{headline.title}</h2>
      <p data-headline-sub="">{headline.subtitle}</p>
      <p data-headline-asof="">{stamp}</p>
    </header>
  );
}
