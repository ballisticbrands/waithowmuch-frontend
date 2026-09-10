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
| Meta pixel | `1079875758342522` — dataset "WaitHowMuch website" in the Dragon Suite portfolio. **Organic only: there is no ad spend and no CAPI.** It is installed so the audience and the event history exist if that changes, which is not something you can backfill |
| Meta Ads | **none, by decision** |

## What's here

- `src/lib/api.ts` — the one way this app talks to the backend
- `src/lib/session.ts` — token store, `useSession` over `useSyncExternalStore`
- `src/lib/attribution.ts` — first-touch capture, localStorage
- `src/components/Chart.tsx` — hand-rolled SVG bars (a chart library would cost
  more than the whole performance budget)
- `scripts/postbuild-spa-routes.mjs` — the prerender

## Analytics: three loaders, one facade, and a deliberate delay

`src/lib/track.ts` is the only place that talks to GA4 or the Meta pixel.
Nothing else calls `gtag` or `fbq` directly, because **the loaders are
deferred** — `main.tsx` holds all three (GA4, Clarity, Meta) until the page is
idle or the visitor interacts, which is worth about 22 points of PSI mobile.

That delay has one consequence worth knowing before you add an event: for the
first moment of a session `window.gtag` and `window.fbq` do not exist. Events
fired from a mount effect — `view_business` on a profile, `sign_up` on the auth
callback — reliably lose that race. `track.ts` therefore **buffers** events and
replays them when the loaders arrive. Call it and forget it; do not "optimise"
the buffer away, and do not move the loaders into `index.html`.

Events currently fired:

| event (GA4) | Meta | when |
|---|---|---|
| `page_view` | `PageView` | hard load, and every client-side route change |
| `view_business` | `ViewContent` | a business profile resolves, once per slug |
| `sign_up` | `CompleteRegistration` | a NEW account only — `isNew` from the API |
| `login` | — | a returning sign-in |

🚨 `sign_up` is gated on the API's `isNew` flag, not on "we received a
session". Every returning sign-in produces a session too, and counting those is
the standard way this number ends up inflated. The server is the only party
that knows.

Verify it for real, in a browser, against the built site:

```bash
npm run build
npx serve dist -l 4178          # NOT `serve -s` — see below
npm run verify:tracking
```

⚠️ **`serve -s` will lie to you.** The `-s` flag rewrites every route to
`index.html`, so the prerendered files this repo works so hard to produce are
never served and every route looks like an identical contentless shell. Serve
`dist` plainly; the prerender writes real directories.

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
