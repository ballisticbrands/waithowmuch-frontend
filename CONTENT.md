# Writing content for waithowmuch.com

Everything a writing agent needs. The plan lives in
[`src/data/content.mjs`](src/data/content.mjs) — 17 blog posts and 24 glossary
terms, each with its target keyword, real search volume, competition rating,
angle, and which case studies to cite.

---

## 1. How publishing works

Every entry carries `status: 'draft' | 'published'`.

| | draft | published |
|---|---|---|
| Renders at its URL | ✗ | ✓ |
| In `sitemap.xml` | ✗ | ✓ |
| Prerendered to static HTML | ✗ | ✓ |
| Has JSON-LD | — | ✓ automatic |

**To publish:** write `body` (HTML string), flip `status` to `'published'`, run
`npm run build`, push. CI deploys. Then request indexing for that one URL in
Search Console (URL Inspection → Request indexing).

🚨 **There are deliberately no placeholder pages.** A reserved-but-empty URL that
Google crawls is thin content, and thin content at scale on a young domain is
the one SEO mistake that is slow to undo — the page has to be re-crawled and
re-assessed before it recovers, and crawl budget we don't have gets spent on
nothing. A URL appears the moment its body exists. Never before.

---

## 2. The 120-word guard

`scripts/postbuild-spa-routes.mjs` **fails the build** if an SEO-destination
route has fewer than 120 crawler-visible words inside `#root`.

It exists because of a real incident on a sibling product: pages shipped with
~46 crawler-visible words, Google correctly judged them empty, and Google Ads
Quality Score sat at 1–3/10 across 16 of 18 keywords for four days of paid
traffic. Nothing looked broken — **Lighthouse runs JavaScript, so every tool
reported a fine page.** The only way to see it is to look at what the server
returns.

```bash
curl -s https://waithowmuch.com/blog/<slug>/ | python3 -c \
"import sys,re;h=sys.stdin.read();i=h.find('<div id=\"root\"');\
r=re.sub(r'(?s)<script.*?</script>','',h[i:]);print(len(re.sub(r'<[^>]+>',' ',r).split()))"
```

**Raise the threshold; never lower it to make a build pass.**

There is also a **soft** guard (warns, doesn't fail) on listing pages, whose
content *is* the list and therefore grows with the catalogue. Current warnings:

```
/business/mount-cleverest/to-start/   96 words
/business/bizzikins/to-start/         70 words
```

These are **not** a content problem. A `/to-start/` page compares a business's
startup cost against its peers, and only **8 of 13** businesses have a
`startingCost` at all (5 are null). With so few peers to list, the page is
short. It fixes itself as more businesses get a starting-cost figure — do not
pad it with prose the page doesn't show.

---

## 3. Sourcing rules

🚨 **Every figure comes from the API at write time. Never from memory, never
from a chat transcript.**

```bash
curl -s "https://api.waithowmuch.com/v1/businesses?limit=100"
curl -s "https://api.waithowmuch.com/v1/businesses/<slug>"
curl -s "https://api.waithowmuch.com/v1/businesses/<slug>/metrics?type=revenue"
```

The `cite` field names which businesses a post draws on; `['*']` means the whole
catalogue.

**Check what exists before citing it.** Fields are frequently null —
`startingCost` is null on 5 of 13 — and a business may carry only
`revenue`/`profit`/`ad_spend` with no social metrics. The `types` array on the
metrics response is the authoritative list.

This is not hypothetical: a figure picked up mid-conversation ("359 TikToks")
was once written into a skill as though the API returned it. It didn't. If it
isn't in the response in front of you, it doesn't go in the post.

**Phrase estimates as estimates** — "best one I've found", "in our data" — never
"they made exactly". That honesty is the product.

---

## 4. Publishing order, and the triggers

Write **Tier 1 first** — real volume, Low competition, answerable from research
that already exists.

| order | post | vol/mo | comp | gate |
|---|---|---|---|---|
| 1 | `is-amazon-fba-still-profitable` | 1,000 | Low | ready now |
| 2 | `how-much-does-amazon-take-from-sellers` | 480 | Low | ready now |
| 3 | `how-much-does-amazon-fba-cost-to-start` | 110 | Low | ready now |
| 4 | `how-much-do-amazon-sellers-make` | 90 | Low | ready now |
| — | `selling-books-on-amazon-fba` | **6,600** | Low | ⛔ **blocked** |

### Gated posts — do not publish until the research exists

- **`selling-books-on-amazon-fba`** is the single biggest keyword in the set by
  an order of magnitude, and **there is no book case study.** Publishing it
  without one means a generic article with nothing proprietary — the exact thing
  this site exists not to be. **Publish when at least one book/publishing
  business is in the database.**
- **`how-to-start-an-amazon-t-shirt-business`** — same rule, needs a POD or
  apparel case study.
- Any future niche post follows the same gate: **the niche article ships when
  that niche has a case study**, not before.

### Pacing

~10 posts in the first month, 50 pages maximum. More on a low-authority domain
reads as spam and simply won't get crawled. Glossary terms are cheap and count
toward that 50.

---

## 5. Writing rules

- **One page per intent cluster, not per keyword.** The 44 "how much do sellers
  make" variants ("average", "per month", "beginner") are one page with
  sub-headings, not 44 thin posts.
- **Lead with a number.** The opening line should contain a figure no other
  article on that query has.
- **`body` is an HTML string** — `<h2>`, `<p>`, `<ul>`, `<table>`. It renders
  inside `[data-prose]`, which styles all of those.
- **Link to the case studies cited.** Internal linking across businesses is
  deliberately deferred until the catalogue is bigger; linking a post to the
  businesses it cites is not — do that.
- **No link to the homepage from within prose.** Deep-link the specific page.

---

## 6. JSON-LD — already automatic

Do not hand-write schema. The prerender emits it per route type:

| route | schema |
|---|---|
| `/` | `Organization` + `WebSite` |
| `/business/<slug>/` | `Organization` + `Article` (`about` an Organization) + `BreadcrumbList` |
| `/blog/<slug>/` | `Organization` + `Article` + `BreadcrumbList` |
| `/glossary/<slug>/` | `Organization` + `DefinedTerm` in a `DefinedTermSet` + `BreadcrumbList` |

`about`, not `mainEntity`, on business pages — we report **on** these companies;
claiming `mainEntity` would assert this is the company's own page.

Verify after a build:
```bash
python3 -c "import re,json,pathlib;h=pathlib.Path('dist/blog/<slug>/index.html').read_text();\
m=re.search(r'application/ld\+json\">(.*?)</script>',h,re.S);\
print([n['@type'] for n in json.loads(m.group(1).replace('\\\\u003c','<'))['@graph']])"
```

---

## 7. Languages — later, and here is the trigger

TrendTrack runs 7 locale mirrors (de/es/fr/it/nl/pt/zh) at ~327 pages each.
That works for an established domain. For us today it would mean **~330 pages
of machine translation on a domain Google barely crawls** — thin content at
scale, plus hreflang complexity, plus genuine doorway-page risk.

**Add locales when all three are true:**

1. **≥ 20 English posts published** and indexed.
2. **≥ 1,000 organic clicks/month** in Search Console — proof the English pages
   actually rank, so there is something worth duplicating.
3. **At least one English post ranking top-5** for a commercial term.

Then start with **one** locale, measure for 60 days, and only expand if it
earns. Do not launch seven at once.

---

## 8. Never

- Publish an empty page to reserve a URL.
- Request indexing for a page with no body.
- Lower the 120-word guard.
- State a figure the API doesn't return.
- Machine-translate before §7's conditions are met.
