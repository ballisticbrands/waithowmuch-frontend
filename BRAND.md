# WaitHowMuch brand

The visual identity of WaitHowMuch (WHM). This is a summary — the source of
truth is the code, and every value below is copied from it:

| What | Where |
|---|---|
| Colour, type, radius, shadow tokens | `src/globals.css` (`:root`, top of file) |
| The mark | `src/components/Logo.tsx`, `public/logo.svg` |
| Raster icons | `public/logo-512.png`, `public/apple-touch-icon.png`, `public/favicon-32.png` |
| Social card | `scripts/build-og.mjs` |

If you change a value there, change it here in the same commit.

## Name

**WaitHowMuch** — one word, three capitals. Short form **WHM**.

Description line (`index.html`): *Revenue and profit for businesses you have
never heard of. Researched from public data.*

## Logo

"WHM?" stacked two-by-two — **WH** over **M?** — in white, inside a rounded
violet square.

| | |
|---|---|
| Canvas | 64 × 64, corner radius 14 |
| Square | `#5b3df5` (`--accent`) |
| Letters | `#ffffff`, weight 800, size 24, centred; baselines at y 30 and y 54 |
| Typeface | the generic monospace stack: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| In the top bar | 26px, followed by the wordmark "WaitHowMuch" in the sans, weight 700, −0.02em |

Monospace is deliberate: WH and M? are both two glyphs wide, so the rows line
up with no letter-spacing work. It is set as `<text>`, not outlined paths, and
uses the system monospace rather than a webfont so it renders identically in
the app, in the standalone SVG and in the rasters.

## Colour

A violet accent on near-white. **The accent is the only chroma in the UI**, and
that is what lets it mean something: it marks the brand mark, the primary
action and an active filter — nothing else. Don't use it for decoration.

### Brand

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#5b3df5` | mark, primary button, active chip, slider, focus ring, current breadcrumb; also `theme-color` |
| `--accent-hover` | `#4a2ee0` | hover on the above |
| `--accent-tint` | `#efecfe` | background of an active chip |
| `--accent-foreground` | `#ffffff` | text on accent |

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--background` | `#ffffff` | page, inputs |
| `--card` | `#ffffff` | cards, top bar, rail |
| `--surface` | `#fbfbfd` | content area behind cards, footer, row hover |
| `--muted` | `#f3f3f7` | hover fills |
| `--border` | `#e4e4ec` | hairlines |
| `--border-strong` | `#d2d2de` | input and chip borders |
| `--foreground` | `#14141b` | text (17.9:1 on white); also the active rail pill |
| `--muted-foreground` | `#5f6072` | secondary text (6.2:1, passes AA) |

### Status

Reserved for status — never for data series or decoration.

| Token | Hex |
|---|---|
| `--success` | `#10683f` |
| `--warning` | `#8a5a00` |
| `--danger` | `#b42318` |

### Data

Chart series (validated together for contrast and colour-vision separation —
re-run the palette validator noted in `globals.css` before changing any):

| Token | Hex | Series |
|---|---|---|
| `--series-revenue` | `#5b3df5` | revenue (the accent) |
| `--series-profit` | `#a08ff0` | profit |
| `--series-ads` | `#c2378f` | ad spend — the one second hue in the system |

Each line also differs by dash, because colour is never the only way to tell
series apart.

Margin donut — one hue at four lightnesses, darkest = largest cost; the accent
is kept for what's left over:

| Token | Hex |
|---|---|
| `--slice-cost-1` | `#b0b0c2` (smallest) |
| `--slice-cost-2` | `#9596a9` |
| `--slice-cost-3` | `#78798d` |
| `--slice-cost-4` | `#5f6072` (largest) |

Light mode only (`color-scheme: light`); there is no dark theme.

## Type

**Inter**, self-hosted (`public/fonts/inter-latin.woff2`, weights 400–700,
`font-display: swap`). Fallback: `ui-sans-serif, system-ui, -apple-system,
"Segoe UI", Roboto, sans-serif`. Monospace: `ui-monospace, SFMono-Regular,
"SF Mono", Menlo, monospace`.

| Role | Setting |
|---|---|
| Body | 15px, line-height 1.55 |
| Headings | letter-spacing −0.028em, line-height 1.15 |
| Page title (h1) | 2.5rem, weight 800, −0.033em |
| Controls | 0.9375rem, buttons weight 550 |
| Small labels (filter, rail group) | 0.6875rem, uppercase, weight 600–700, +0.05–0.07em |
| Figures | `font-variant-numeric: tabular-nums`, −0.015em (`[data-figure]`) |

Figures are the product, so every number gets tabular numerals — a column of
revenues has to line up digit for digit.

## Shape and depth

| | |
|---|---|
| `--radius` | 0.625rem — buttons, inputs |
| `--radius-lg` | 0.875rem — cards, row lists, filter bar |
| Pills | 999px — chips, slider track |
| `--shadow` | `0 1px 2px rgb(20 20 27 / .04), 0 4px 12px rgb(20 20 27 / .05)` — the only shadow, used sparingly |

Depth comes from hairline borders and the white-on-`--surface` step, not blur.
Lists of businesses are **rows, not cards**, so figures line up down a column.

## Buttons

| Variant | Look |
|---|---|
| default | accent fill, white text |
| `ghost` | transparent, `--border-strong` outline, foreground text |
| `quiet` | no border, muted text, `--muted` on hover |

## Social card

1200 × 630, generated by `scripts/build-og.mjs`: `--surface` ground, a 10px
accent bar across the top, Inter, headline 48px weight 750, supporting copy
23px in `--muted-foreground`, a hairline-divided footer. The site-wide
`og:image` is `logo-512.png`.

## Known inconsistencies

- `tailwind.config.js` sets `fontFamily.sans` to the system stack, not Inter,
  so a Tailwind `font-sans` class disagrees with `--font-sans`.
- `public/logo.svg` draws the letters at weight 700, baselines y 29 / y 53;
  `Logo.tsx` uses weight 800, y 30 / y 54.
