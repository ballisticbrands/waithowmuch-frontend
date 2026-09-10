/**
 * Platform marks for the profile link row.
 *
 * Drawn here rather than pulled from an icon package: four glyphs is not worth
 * a dependency, and every other icon on this site is already an inline path
 * (see Nav.tsx, Earnings.tsx). They inherit `currentColor` so the chip owns
 * the colour — the marks are NOT rendered in brand colours, which would put
 * four foreign hues on a page whose whole design rests on having one.
 *
 * Anything without a mark here falls back to the globe, which is the honest
 * answer for "a site on the internet" and is why WEBSITE has no special case.
 */

const PLATFORM_LABEL: Record<string, string> = {
  AMAZON: "Amazon",
  WEBSITE: "Website",
  TIKTOK: "TikTok",
  INSTAGRAM: "Instagram",
  YOUTUBE: "YouTube",
  FACEBOOK: "Facebook",
  X: "X",
  TWITTER: "X",
  ETSY: "Etsy",
  SHOPIFY: "Shopify",
  KICKSTARTER: "Kickstarter",
  PINTEREST: "Pinterest",
  REDDIT: "Reddit",
  DISCORD: "Discord",
  LINKEDIN: "LinkedIn",
};

export const platformLabel = (platform: string) =>
  PLATFORM_LABEL[platform.toUpperCase()] ?? platform.toLowerCase();

export function PlatformIcon({ platform }: { platform: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (platform.toUpperCase()) {
    case "AMAZON":
      /* The smile: the arc that runs under the wordmark, curling up into the
         solid arrowhead at its right. The head is a filled triangle rather
         than two strokes — at 18px a stroked head closes up into a blob. */
      return (
        <svg {...common}>
          <path
            d="M1.8 9.6A12.5 10.5 0 0 0 19.6 11.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />
          <path d="M23 10.2 16.2 8.6l2.2 7.7Z" fill="currentColor" />
        </svg>
      );

    case "TIKTOK":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.6 2h-3.3v13.4a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.4a6 6 0 1 0 5.2 6V8.6a6.6 6.6 0 0 0 4 1.3V6.6a3.3 3.3 0 0 1-3.3-3.3V2Z" />
        </svg>
      );

    case "INSTAGRAM":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );

    case "YOUTUBE":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12c0 1.6.1 3.2.3 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.2-1.6.3-3.2.3-4.8s-.1-3.2-.3-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
        </svg>
      );

    case "FACEBOOK":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
        </svg>
      );

    case "X":
    case "TWITTER":
      return (
        <svg {...common} fill="currentColor">
          <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.5 3h6.4l4.4 5.8L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z" />
        </svg>
      );

    default:
      // Globe. Two meridians and an equator is the fewest strokes that still
      // reads as "a website" rather than as an empty circle.
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
        </svg>
      );
  }
}
