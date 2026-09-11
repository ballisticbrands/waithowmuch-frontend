import type { Profile } from "@/businesses/types";
import { monthLabel } from "@/lib/format";

/**
 * The case-study hook — the two sentences a reader decides on.
 *
 * Authored in waithowmuch-research (skills/write-profile-headline) and copied
 * into the profile after a human has read it. Nothing here is generated at
 * render time and nothing here is resolved from the DB, which makes this the
 * one component on the page that renders a hardcoded revenue figure.
 *
 * 🚨 Hence the snapshot line, which is NOT a caption. The title says $90K and
 * the cards directly beneath it say whatever the series says today; the two
 * agree right now and will stop agreeing the first time the metrics refresh.
 * That is survivable only while the page states which month the headline is
 * true of — an undated frozen figure beside a live one is just a page
 * contradicting itself. Delete the line and the whole block has to go with it.
 *
 * The same reasoning is why `headline`/`subhead` were reverted off the
 * Business row on 2026-09-11: this copy's real home is a CaseStudy row that
 * freezes its figures alongside it. Until that ships, the freeze is a sentence.
 */
export function Headline({ headline }: { headline: NonNullable<Profile["headline"]> }) {
  return (
    <header data-headline="">
      <h2 data-headline-title="">{headline.title}</h2>
      <p data-headline-sub="">{headline.subtitle}</p>
      <p data-headline-asof="">
        Headline frozen at {monthLabel(headline.snapshotMonth)}. The figures below are current.
      </p>
    </header>
  );
}
