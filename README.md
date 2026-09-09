# waithowmuch-frontend

The whole of **WaitHowMuch** on `waithowmuch.com` — the app *and* the public
business profiles. **One origin**: there is no `app.*` host and no separate
landing page.

Forked from `verifiedmargins-frontend` on 2026-09-10. Styling is still VM's and
is a **known placeholder** — only identity, analytics and the API host were
rebranded. See `../waithowmuch-backend/PLAN.md`.

## Config

| | |
|---|---|
| ✅ Domain | `waithowmuch.com` (apex, GitHub Pages) |
| ✅ API | `https://api.waithowmuch.com` — `src/lib/config.ts` |
| ✅ GA4 | property `553461549`, stream `15749149975`, measurement ID `G-0K360RYPPB` |
| ⛔ Clarity | none yet — no creation API, needs a console step. `clarityId: ""` no-ops safely. |
| ⛔ Turnstile | shared widget; `waithowmuch.com` must be added to its hostname allowlist |
| ⛔ Google sign-in | shared OAuth client; `https://waithowmuch.com` must be added to Authorized JS origins |
| 🚫 Meta pixel | **none by decision** — WHM runs no paid social. `META_PIXEL_ID = ""`. |
| 🚫 Google/Meta Ads | **none by decision** |

## Known placeholders

- **Visual design is VerifiedMargins'.** Colours, type and layout are inherited
  wholesale and are meant to be replaced.
- **The logo** is a bare `?` glyph (`src/components/Logo.tsx`, `public/logo.svg`).
  The raster icons — `favicon-32.png`, `apple-touch-icon.png`, `logo-512.png` —
  are **still VM's "VM" artwork** and need regenerating.
- **`src/demo/`** still contains VerifiedMargins' demo fixtures, text-rebranded
  but conceptually VM's. They should be deleted or replaced.

## Build

`npm run build` runs `check-site-constants` (keeps `src/data/site.ts` and
`site.mjs` in agreement), then Vite, then the prerender chain
(`build-profiles` → `build-businesses` → `build-dossiers` →
`postbuild-spa-routes` → `generate-sitemap`).

🚨 The prerender is not optional — an SPA that ships an empty shell gets
indexed as a duplicate. See `new-product-funnel` Phase 3b.
