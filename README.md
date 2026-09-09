# waithowmuch-frontend

The whole of **WaitHowMuch** on `waithowmuch.com` — the app *and* the public
business profiles. **One origin**: no `app.*` host, no separate landing page.

Vite · React 18 · TypeScript · React Router · Tailwind. **No shared package** —
this repo has no dependency on `@ballisticbrands/frontend-shared` and installs
entirely from the public npm registry.

## Config

| | |
|---|---|
| Domain | `waithowmuch.com` (apex, GitHub Pages) |
| API | `https://api.waithowmuch.com` — `src/lib/config.ts` |
| GA4 | `G-0K360RYPPB` (property `553461549`) |
| Clarity | `yfrezqqmrh` |
| Google sign-in | shared OAuth Web client; `https://waithowmuch.com` is on its Authorized JS origins |
| Meta pixel / Ads | **none, by decision** |

## What's here

- `src/lib/api.ts` — the one way this app talks to the backend
- `src/lib/session.ts` — token store, `useSession` over `useSyncExternalStore`
- `src/lib/attribution.ts` — first-touch capture, localStorage
- `src/components/Chart.tsx` — hand-rolled SVG bars (a chart library would cost
  more than the whole performance budget)
- `scripts/postbuild-spa-routes.mjs` — the prerender

## 🚨 The prerender is not optional

A client-rendered SPA that ships an identical contentless shell on every URL
gets indexed as duplicates, and on a sibling product held Google Ads Quality
Score at 1–3/10 for four days of paid traffic. **Speed tests do not catch it** —
Lighthouse runs JavaScript and sees a fine page.

`postbuild-spa-routes.mjs` writes real static HTML per route, built from the
**live API**, and **fails the build** if `/`, `/about/` or any business page
falls under 120 crawler-visible words. Raise that threshold; never lower it to
make a build pass.

Because the copy comes from the API, published content only reaches the static
HTML on a build — hence the nightly `schedule:` in the deploy workflow.

## Verify a deploy

```bash
curl -s https://waithowmuch.com/ | wc -c            # differs per route
curl -s https://waithowmuch.com/business/<slug>/ | grep -ci "<slug>"   # > 0
```

## Known placeholders

- Visual design is inherited tokens only; there is no real branding yet.
- The logo is a bare `?`. The raster icons (`favicon-32.png`,
  `apple-touch-icon.png`, `logo-512.png`) are **still VerifiedMargins' "VM"
  artwork** and need regenerating.
- **No Turnstile.** The backend has no `TURNSTILE_SECRET_KEY`, so the widget
  would be theatre. Magic-link abuse is currently held off by a 60s per-user
  cooldown and a constant 202 response.
