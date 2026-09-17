import { Link } from "react-router-dom";
import type { BusinessCard } from "@/lib/api";
import { businessPath } from "@/data/site";
import { money, monthLabel } from "@/lib/format";
import { profileFor } from "@/businesses/index.mjs";

/**
 * The image a card leads with.
 *
 * First choice is the UGC shot on the Business row — the product in someone's
 * hand, the way a customer would photograph it, which is what makes a grid of
 * these read as objects rather than as listings. Falling back to the profile's
 * own leading product image keeps a card whole for every case study published
 * before the UGC shot was asked for; a card with a hole in it would be worse
 * than a studio photo.
 */
function cardImage(b: BusinessCard): { src: string; alt: string } | null {
  if (b.ugcImageUrl) return { src: b.ugcImageUrl, alt: `${b.name}'s product, photographed by hand` };
  const authored = profileFor(b.slug)?.headline?.image;
  return authored ? { src: authored.src, alt: authored.alt } : null;
}

export function CaseStudyCard({ business: b }: { business: BusinessCard }) {
  const image = cardImage(b);
  /* The month the headline is frozen at, not today's date: every figure on
     the case study is true of that month and the card is the first place a
     reader meets it. `latestPeriod` covers a row published before headlines
     existed. */
  const month = b.snapshotMonth ?? b.latestPeriod;

  return (
    <Link data-case-card to={businessPath(b.slug)}>
      <div data-case-card-frame>
        {image ? (
          <img src={image.src} alt={image.alt} loading="lazy" />
        ) : (
          // No photograph anywhere: the brand's initial, so the grid keeps its
          // shape. aria-hidden because the name is right below it.
          <div data-case-card-fallback aria-hidden="true">{b.name.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div data-case-card-body>
        {/* The live figure from the Business row, not the headline's frozen
            one: the card is a listing, and this is the number a reader scans
            the grid for. */}
        {b.latestMonthlyProfit != null && (
          <div data-case-card-profit>{money(b.latestMonthlyProfit, b.currency)} profit/mo</div>
        )}
        <div data-case-card-title>{b.title || b.name}</div>
        <div data-case-card-meta>
          <span>{b.name}</span>
          {month && <time dateTime={String(month).slice(0, 7)}>{monthLabel(month)}</time>}
        </div>
      </div>
    </Link>
  );
}
