import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  getBusiness, getMetrics, getCaseStudies, linkFollowers, toChartPoints,
  type BusinessDetail, type CaseStudy, type MetricsResponse,
} from "@/lib/api";
import { profileFor } from "@/businesses/index.mjs";
import { localBusiness } from "@/businesses/local.mjs";
import { ProfileBlocks, profileSections, chartSectionId } from "@/components/ProfileBlocks";
import { Toc, NextSection } from "@/components/Toc";
import { TopMetrics } from "@/components/MetricCards";
import { ProfileLinks } from "@/components/ProfileLinks";
import { ResearchedNotice } from "@/components/ResearchedNotice";
import { Headline } from "@/components/Headline";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { EarningsCard } from "@/components/Earnings";
import { businessBootstrap } from "@/lib/bootstrap";
import { collectionPath, BRAND_NAME_SAFE } from "@/lib/nav-helpers";
import { trackBusinessView } from "@/lib/track";

/**
 * The title of the section this URL names, or null on the overview.
 *
 * Resolved from the profile alone — no state, no `b` — because the crumbs
 * hook runs before the early returns that wait for the business to load, and
 * a hook cannot wait for values computed after it.
 */
function sectionTitleFor(slug: string, section: string | undefined): string | null {
  if (!section) return null;
  if (section === "sources") return "Links & sources";
  const profile = profileFor(slug);
  return profile ? profileSections(profile).find((s) => s.id === section)?.title ?? null : null;
}

export default function Business() {
  const { slug = "", section } = useParams();
  const boot = businessBootstrap(slug);
  // A frontend-only draft, if this slug has one. Checked before the bootstrap
  // and before the API: a local record is the whole source of truth for its
  // page, so nothing is fetched for it and a 404 from the API is not a 404
  // for the reader. Its series is the API's own MetricsResponse shape, so it
  // goes through the same pivot as a fetched one rather than a second path.
  const local = localBusiness(slug);
  const [b, setB] = useState<BusinessDetail | null>(local?.business ?? boot?.business ?? null);
  const [series, setSeries] = useState<MetricsResponse | null>(
    local?.metrics ?? boot?.metrics ?? null,
  );
  const [missing, setMissing] = useState(false);
  /* The published freeze for this business, if it has one. Seeded from the
     bootstrap so the prerendered headline survives hydration instead of
     blinking out while a fetch lands. */
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(boot?.caseStudy ?? null);

  useEffect(() => {
    const draft = localBusiness(slug);
    if (draft) {
      // Set here as well as in the initial state: arriving from another
      // profile is a client-side navigation that leaves this component
      // mounted, and only the effect re-runs — without this the previous
      // business stays on screen under the new URL.
      setB(draft.business);
      setSeries(draft.metrics);
      // A local draft has no row, so it can have no case study.
      setCaseStudy(null);
      setMissing(false);
      return;
    }
    if (businessBootstrap(slug)) return;
    let cancelled = false;
    /* Cleared before the fetch, not after it: arriving from another profile
       leaves this component mounted, and without this the previous business's
       headline sits under the new business's name until the request lands. */
    setCaseStudy(null);
    getCaseStudies(slug)
      .then((r) => !cancelled && setCaseStudy(r.caseStudies[0] ?? null))
      .catch(() => {});
    getBusiness(slug)
      .then((r) => !cancelled && setB(r.business))
      .catch(() => !cancelled && setMissing(true));
    getMetrics(slug)
      .then((r) => !cancelled && setSeries(r))
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (b) document.title = `${b.name} — ${BRAND_NAME_SAFE}`;
  }, [b]);

  // Fires exactly once per slug, and only once the page has resolved one way
  // or the other.
  //
  // The naive version — a `[slug]`-keyed effect — fires at mount, which beats
  // the API response on every page that is not prerendered, so the event
  // ships with `business_name: undefined` and GA4 shows a column of blanks.
  // The other naive version, keying on `b`, double-counts: `b` changes again
  // when the fetch lands on top of the bootstrap value.
  const viewFired = useRef<string | null>(null);
  useEffect(() => {
    if (!slug || viewFired.current === slug) return;
    if (!b && !missing) return; // still resolving — wait for a name or a 404
    viewFired.current = slug;
    if (b) trackBusinessView(slug, b.name);
  }, [slug, b, missing]);

  /* Each section is its own page, so it opens at the top of itself. Without
     this a reader clicking "Timeline" from halfway down Growth lands halfway
     down Timeline, which is the confusion the split was meant to remove. */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, section]);

  /* The final crumb is the business NAME, which is not in the URL — hence a
     context the page pushes into rather than crumbs derived from the path.
     On a section page the name becomes a link back to the overview and the
     section is where the reader actually is, so the title is resolved here
     from the profile rather than from state computed after the early
     returns — a hook cannot wait for those. */
  const crumbSection = sectionTitleFor(slug, section);
  useSetCrumbs(
    () => [
      { label: "Ideas", to: collectionPath("all-ideas") },
      ...(crumbSection
        ? [
            { label: b?.name ?? "…", to: `/business/${encodeURIComponent(slug)}/` },
            { label: crumbSection },
          ]
        : [{ label: b?.name ?? (missing ? "Not found" : "…") }]),
    ],
    [b?.name, missing, crumbSection, slug],
  );

  if (missing) {
    return (
      <main data-main>
        <div data-empty>
          <p>No published idea at <code>{slug}</code>.</p>
          <p style={{ marginTop: "1rem" }}><Link to={collectionPath("all-ideas")}>All ideas →</Link></p>
        </div>
      </main>
    );
  }
  if (!b) return <main data-main><div data-empty>Loading…</div></main>;

  // An authored profile if one exists for this slug; otherwise the page falls
  // back to whatever the DB alone can say.
  const authored = profileFor(slug);

  /* The freeze, resolved ONCE and folded into the profile.
   *
   * 🚨 Everything downstream reads `headline` — the Headline component renders
   * it and valuation/inputs.mjs scores the multiple as of its snapshotMonth —
   * so resolving it here is what keeps the date on the page and the date the
   * valuation was scored at from ever being two different answers.
   *
   * The published CaseStudy row WINS over the authored copy in the .mjs. The
   * .mjs entry is the draft path, exactly as businesses/local.mjs is for a
   * business that has no row yet: write it there, review it, seed it, and the
   * row takes over without the page changing. */
  const profile = authored && caseStudy
    ? {
        ...authored,
        headline: {
          title: caseStudy.title,
          subtitle: caseStudy.subtitle,
          snapshotMonth: caseStudy.snapshotMonth,
        },
      }
    : authored;
  // Only FLOW types are charted; see toChartPoints.
  const points = toChartPoints(series);

  /* Overview and Sources are rendered by this page rather than by the profile,
     so they are added around the profile's own sections rather than being
     declared in the .mjs. Everything between them comes from the blocks. */
  const base = `/business/${encodeURIComponent(slug)}`;
  const declared = profile ? profileSections(profile) : [];

  /* No section markers, no pagination. A profile that declares none is one
     short document, and splitting it would produce a two-page book whose
     first page is the whole thing. */
  const paginated = declared.length > 0;
  const sections = paginated
    ? [
        // Overview and Links & sources are rendered by this page rather than
        // declared in the .mjs, so they are added around the profile's own.
        { id: "overview", title: "Overview", group: "Overview", to: `${base}/` },
        ...declared.map((d) => ({ ...d, to: `${base}/${d.id}/` })),
        ...(b.links.length > 0 || b.sources.length > 0
          ? [{ id: "sources", title: "Links & sources", group: "Provenance", to: `${base}/sources/` }]
          : []),
      ]
    : [];

  const current = paginated ? (section ?? "overview") : "overview";
  const index = sections.findIndex((s) => s.id === current);
  const next = index >= 0 ? sections[index + 1] : undefined;

  /* A URL naming a section this profile does not have is a dead page, not a
     404: the business exists, so send the reader to the top of it. */
  if (paginated && section !== undefined && index === -1) {
    return <Navigate to={`${base}/`} replace />;
  }

  const showOverview = current === "overview";
  /* Two different questions. `onSourcesPage` is "is the sources page the whole
     of this page", which only exists once a profile is split; `showSources` is
     "should links and sources render at all", which on an unsplit profile is
     always, at the foot of its one page. Conflating them rendered an unsplit
     profile as nothing but its sources. */
  const onSourcesPage = paginated && current === "sources";
  const showSources = !paginated || onSourcesPage;
  /* The figures live on whichever section carries the chart. On an unsplit
     profile that is the same page, so it stays an anchor. */
  const chartSection = profile ? chartSectionId(profile) : null;
  const chartHref = paginated && chartSection ? `${base}/${chartSection}/` : "#earnings";

  return (
    <main data-main>
      <div data-with-toc={sections.length > 0 ? "" : undefined}>
        {sections.length > 0 && <Toc items={sections} active={current} />}
        <div data-toc-body="">
        {/* 🚨 Outside the `showOverview` guard, for the same reason as the
            ResearchedNotice below it: a reader who lands on /margin/ from a
            search result gets a page of somebody's unit economics, and the
            mark is the fastest thing on it that says whose.

            A LOCKUP, not an avatar. The listing renders this same field as a
            44px square (IdeaRow), which is right for a row and wrong here —
            most brand assets are wordmarks, and a wordmark in a small square
            is either cropped or too small to read. Here it is sized by HEIGHT
            with the width left to the artwork, so a square mark and a wide
            wordmark both land correctly. */}
        {b.logoUrl && <img data-business-logo="" src={b.logoUrl} alt={`${b.name} logo`} />}
        <h1>{b.name}</h1>
        {b.tagline && (
          <p style={{ color: "var(--muted-foreground)", margin: "0.4rem 0 0", fontSize: "1.0625rem" }}>{b.tagline}</p>
        )}

        {/* 🚨 On every section, not only the overview. A reader who arrives on
            the Growth page from a search result has to be told these figures
            are estimates there, not on a page they may never see. */}
        <div style={{ margin: "1.25rem 0" }}>
          <ResearchedNotice method={b.researchMethod} />
        </div>

        {/* The cards replace the five-figure stat row this page used to open
            with. Everything it carried is still here: revenue, profit and
            margin are averaged over the whole series rather than read off the
            latest month, "to start" is in the additional-metrics grid, and
            "as of" is the basis line under each average. */}
        {showOverview && (
          <section id="overview">
            {/* First thing in the overview and NOWHERE else. Unlike the logo
                and the ResearchedNotice above, this does not repeat onto every
                section: it quotes one frozen month, and a reader landing on
                /margin/ from a search result would get that figure with none
                of the context that dates it. */}
            {profile?.headline && <Headline headline={profile.headline} />}

            {/* Above the figures, not below them: a reader checks that the
                business is real before they weigh what it earns. */}
            <ProfileLinks links={b.links} />
            <TopMetrics business={b} metrics={points} series={series} profile={profile} chartHref={chartHref} />

            {b.categories.length > 0 && (
              <div data-tags style={{ marginTop: "1.25rem" }}>
                {b.categories.map((c) => <span data-tag key={c.slug}>{c.name}</span>)}
              </div>
            )}

            {profile?.intro && (
              <p data-prose style={{ marginTop: "2rem", fontSize: "1.0625rem" }}>{profile.intro}</p>
            )}
          </section>
        )}

        {profile && !onSourcesPage && (
          <div style={{ marginTop: "1.5rem" }}>
            <ProfileBlocks
              profile={profile}
              business={b}
              metrics={points}
              series={series}
              /* undefined renders the whole profile as one document — the shape
                 an unsplit profile keeps. On a paginated one, `null` is the
                 leading blocks, which belong to the overview, and a string is
                 that one section. */
              only={!paginated ? undefined : showOverview ? null : current}
            />
          </div>
        )}

        {!profile && (
          <section style={{ marginTop: "2.5rem" }}>
            {/* `summary` left BusinessDetail with the generic-series change,
                so a DB-only profile is its figures until it has authored
                blocks. Nothing to fall back to is better than a field that
                silently renders empty. */}
            <EarningsCard points={points} currency={b.currency} id="earnings" />
          </section>
        )}

        {/* The "spread evenly across each month" footnote that stood here is
            gone with `derivedFrom`: the generic series does not say whether a
            period was rolled up from a coarser one. If that distinction is
            worth drawing again it belongs on the metric row, not inferred. */}

        {showSources && b.links.length > 0 && (
          <section id="sources" style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.75rem" }}>Links</h2>
            <ul data-prose style={{ listStyle: "none", padding: 0 }}>
              {b.links.map((l) => (
                <li key={l.url} style={{ marginBottom: "0.35rem" }}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
                    {l.label ?? l.handle ?? l.platform.toLowerCase()}
                  </a>
                  {linkFollowers(l) != null && (
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                      {" "}· {linkFollowers(l)!.toLocaleString("en-US")} followers
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {showSources && b.sources.length > 0 && (
          <section id={b.links.length === 0 ? "sources" : undefined} style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.75rem" }}>Sources</h2>
            <ol data-prose style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {b.sources.map((s) => (
                <li key={s.url} style={{ marginBottom: "0.35rem" }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.title}</a>
                  {s.note && ` — ${s.note}`}
                </li>
              ))}
            </ol>
        </section>
      )}

        {next && <NextSection item={next} />}
        </div>
      </div>
    </main>
  );
}
