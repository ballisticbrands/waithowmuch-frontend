import type { BusinessLink } from "@/lib/api";
import { linkMetaNumber } from "@/lib/api";
import { compact } from "@/lib/format";
import { PlatformIcon, platformLabel } from "./PlatformIcon";

/**
 * The business's own presence — where it sells, and where it is loud — as a
 * row of chips above the figures.
 *
 * ── Why it sits above the cards ──────────────────────────────────────────
 * "Is this a real business?" is the question a reader has before "what does it
 * earn", and four working links to the store and the accounts answer it faster
 * than any figure on the page. They were previously only on the sources page,
 * which is the last page of the profile and the one a reader arriving from
 * search never reaches.
 *
 * ── 🚨 Not brand colours ─────────────────────────────────────────────────
 * The marks inherit the chip's ink. Four brand hues here would be the only
 * place on the site with more than one chroma, and would out-shout the figures
 * they sit above — which are the actual product.
 *
 * ── The second line is the evidence, not decoration ──────────────────────
 * A follower count next to a TikTok link is the difference between "they have
 * an account" and "they have an audience", and this profile's whole growth
 * story is that the audience came first. Where a link has no such figure it
 * gets no second line rather than a padded one.
 */

/** The handle, but only when it reads as one. Amazon's `handle` is a seller
 *  id (A1JV6NB17MZ485) — true, useful on the sources page, and pure noise in
 *  a chip whose job is to be recognised at a glance. */
const shownHandle = (link: BusinessLink) =>
  link.handle && link.handle.startsWith("@") ? link.handle : null;

/**
 * The single strongest fact this platform can offer, in its own units.
 *
 * 🚨 One fact, not a list. "@spitehouse_games · 45.4K followers" is two, and
 * at chip width it either wraps mid-phrase or has its tail eaten by an
 * ellipsis — and the tail is the half that matters. The size of the audience
 * beats the name of the account, so the count wins and the handle falls back
 * to being the line only when there is no count. Handles stay in full on the
 * sources page, which is where the reader who wants to cite one goes.
 */
function detail(link: BusinessLink): string | null {
  const meta = link.meta ?? {};
  // Follower counts live in the untyped meta blob now, one accessor per read.
  const followers = linkMetaNumber(link, "followerCount");
  if (followers != null) return `${compact(followers)} followers`;
  if (typeof meta.visitsPerMonth === "number") return `${compact(meta.visitsPerMonth)} visits / mo`;
  if (typeof meta.asins === "number") return `${meta.asins} ASINs`;
  return shownHandle(link);
}

export function ProfileLinks({ links }: { links: BusinessLink[] }) {
  if (links.length === 0) return null;

  return (
    <nav data-links="" aria-label="Where this business sells and posts">
      <ul data-link-row="">
        {links.map((l) => {
          const name = l.label ?? shownHandle(l) ?? platformLabel(l.platform);
          const sub = detail(l);
          return (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer nofollow" data-link-chip="">
                <span data-link-icon="">
                  <PlatformIcon platform={l.platform} />
                </span>
                <span data-link-text="">
                  <span data-link-name="">{name}</span>
                  {sub && <span data-link-sub="">{sub}</span>}
                </span>
                {/* The outbound arrow, so a chip is visibly a way off the site
                    rather than another tab of it. */}
                <svg data-link-out="" width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path
                    d="M6 3h7v7M13 3 4 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
