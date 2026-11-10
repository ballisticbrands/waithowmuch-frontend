import { Link, useParams, useSearchParams } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { publishedPosts, publishedTerms, postPath, termPath, type Post } from "@/data/content.mjs";
import {
  AUTHOR, CATEGORIES, byDate, categoryPath, categorySlug, dateLabel, excerpt, heroArtHtml,
  readingMinutes, shareIcon, shareLinks, withHeadingIds, type TocEntry,
} from "@/data/blog.mjs";
import { BRAND_NAME, SITE } from "@/data/site";
import { gaEvent } from "@/lib/track";
import { useEffect, useMemo, useState } from "react";

/* ─── Shared pieces ───────────────────────────────────────────────────── */

/** A post's picture: its own `image`, or the black title card. Either way the
 *  box is 1200:630, reserved before anything loads. */
function PostArt({ post, eager }: { post: Post; eager?: boolean }) {
  if (post.image) {
    return (
      <img
        src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height}
        loading={eager ? "eager" : "lazy"} decoding="async"
        style={{ display: "block", width: "100%", height: "auto", aspectRatio: "1200 / 630", objectFit: "cover" }}
      />
    );
  }
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: heroArtHtml(post.title) }} />;
}

function Avatar({ size }: { size: number }) {
  return (
    <picture>
      <source srcSet={AUTHOR.image} type="image/webp" />
      <img src={AUTHOR.imageJpg} alt="" width={size} height={size} loading="lazy" decoding="async" />
    </picture>
  );
}

function PostMeta({ post, avatar = true }: { post: Post; avatar?: boolean }) {
  return (
    <div data-post-meta>
      {avatar && <Avatar size={22} />}
      <span>{AUTHOR.name}</span>
      {post.published && <><span aria-hidden>·</span><time dateTime={post.published}>{dateLabel(post.published)}</time></>}
    </div>
  );
}

/* ─── /blog/ ──────────────────────────────────────────────────────────── */

/** Index of published posts. Drafts are invisible here, in the sitemap and to
 *  the prerender — a page appears the moment its body lands, never before.
 *
 *  Laid out after TrendTrack's blog index: the newest post large beside the
 *  next four, then a topic filter beside a card grid of every post. */
export function BlogIndex() {
  const posts = useMemo(() => byDate(publishedPosts()), []);
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  useSetCrumbs(() => [{ label: "Blog" }], []);
  useEffect(() => { document.title = `Blog — ${BRAND_NAME}`; }, []);

  /* Only categories that have something in them get a tab. */
  const topics = CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const active = topics.find((c) => categorySlug(c) === params.get("topic")) ?? null;
  const setTopic = (c: string | null) => setParams(c ? { topic: categorySlug(c) } : {}, { replace: true });

  const q = query.trim().toLowerCase();
  const shown = posts.filter((p) => (!active || p.category === active) && (!q || p.title.toLowerCase().includes(q)));
  const [featured, ...rest] = posts;

  if (!featured) {
    return <main data-main><h1>Blog</h1><div data-empty style={{ marginTop: "1.5rem" }}>Nothing published yet.</div></main>;
  }
  return (
    <main data-main data-blog>
      <header data-blog-head>
        <span data-blog-eyebrow>Blog</span>
        <h1>The {BRAND_NAME} blog</h1>
        <p>What the numbers across every researched business add up to: fees, costs, margins and the tools sellers use.</p>
      </header>

      <section data-blog-top aria-label="Latest posts">
        <div data-blog-panel>
          <span data-blog-panel-label>Latest</span>
          <Link data-feature-card to={postPath(featured.slug)}>
            <PostArt post={featured} eager />
            <div data-card-body>
              <span data-cat>{featured.category}</span>
              <h2>{featured.title}</h2>
              <PostMeta post={featured} />
              <p>{excerpt(featured.body, 170)}</p>
            </div>
          </Link>
        </div>
        <div data-blog-panel>
          <span data-blog-panel-label>Also new</span>
          {rest.slice(0, 4).map((p) => (
            <Link data-spot-card key={p.slug} to={postPath(p.slug)}>
              <PostArt post={p} />
              <div data-card-body>
                <span data-cat>{p.category}</span>
                <h3>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section data-blog-browse aria-label="All posts">
        <div data-blog-filters>
          <input
            data-input type="search" placeholder="Search posts" aria-label="Search posts"
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
          <hr />
          <span data-blog-panel-label>Topics</span>
          <div data-chips role="group" aria-label="Topics">
            <button type="button" data-chip data-on={active === null} aria-pressed={active === null} onClick={() => setTopic(null)}>All</button>
            {topics.map((c) => (
              <button
                type="button" key={c} data-chip data-on={active === c} aria-pressed={active === c}
                onClick={() => setTopic(active === c ? null : c)}
              >
                {c}
              </button>
            ))}
          </div>
          <hr />
          <span data-blog-count aria-live="polite">{shown.length} of {posts.length} posts</span>
        </div>
        {shown.length === 0 ? (
          <div data-empty>No post matches that.</div>
        ) : (
          <div data-blog-grid>
            {shown.map((p) => (
              <Link data-post-card key={p.slug} to={postPath(p.slug)}>
                <PostArt post={p} />
                <div data-card-body>
                  <span data-cat>{p.category}</span>
                  <h3>{p.title}</h3>
                  <PostMeta post={p} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ─── /blog/<slug>/ ───────────────────────────────────────────────────── */

/** Highlights the section being read: the last <h2> whose top has passed
 *  the sticky top bar. */
function useActiveHeading(toc: TocEntry[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!toc.length) return;
    const onScroll = () => {
      let current: string | null = null;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < 120) current = t.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);
  return active;
}

function Share({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const path = postPath(post.slug);
  const track = (method: string) => gaEvent("share", { method, content_type: "article", item_id: post.slug });
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE}${path}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard refused (insecure context, permissions): nothing to show. */
    }
    track("copy_link");
  };
  return (
    <div data-share-wrap>
      <span data-side-label>Share article</span>
      <div data-share>
        <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" data-copied={copied ? "" : undefined}
          dangerouslySetInnerHTML={{ __html: shareIcon("link") }} />
        {shareLinks(path, post.title).map((s) => (
          <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
            onClick={() => track(s.id)} dangerouslySetInnerHTML={{ __html: shareIcon(s.id) }} />
        ))}
      </div>
    </div>
  );
}

export function BlogPost() {
  const { slug = "" } = useParams();
  const post = publishedPosts().find((p) => p.slug === slug);
  const { html, toc } = useMemo(() => withHeadingIds(post?.body ?? ""), [post]);
  const active = useActiveHeading(toc);
  useSetCrumbs(() => [{ label: "Blog", to: "/blog/" }, { label: post?.title ?? "Not found" }], [post?.title]);
  useEffect(() => { if (post) document.title = `${post.title} — ${BRAND_NAME}`; }, [post]);
  if (!post) {
    return <main data-main><div data-empty><p>No post here.</p>
      <p style={{ marginTop: "1rem" }}><Link to="/blog/">All posts →</Link></p></div></main>;
  }
  const tocList = (on?: string | null) => (
    <ul>
      {toc.map((t) => (
        <li key={t.id}><a href={`#${t.id}`} data-on={on === t.id ? "" : undefined}>{t.title}</a></li>
      ))}
    </ul>
  );
  return (
    <main data-main data-blog-post>
      <header data-post-head>
        <div data-post-head-text>
          <nav data-post-trail aria-label="Breadcrumb">
            <Link data-pill to="/blog/">Blog</Link>
            <span aria-hidden>/</span>
            <Link data-pill to={categoryPath(post.category)}>{post.category}</Link>
          </nav>
          <h1>{post.title}</h1>
          <div data-post-meta>
            {post.published && <time dateTime={post.published}>{dateLabel(post.published)}</time>}
            {post.published && <span aria-hidden>·</span>}
            <span>{readingMinutes(post.body)} min read</span>
          </div>
          <div data-author>
            <picture>
              <source srcSet={AUTHOR.image} type="image/webp" />
              <img src={AUTHOR.imageJpg} alt="" width={48} height={48} />
            </picture>
            <div><strong>{AUTHOR.name}</strong><span>{AUTHOR.jobTitle}</span></div>
          </div>
        </div>
        <figure data-post-hero><PostArt post={post} eager /></figure>
      </header>

      <div data-post-layout>
        <aside data-post-side>
          {toc.length > 0 && (
            <>
              <nav data-post-toc aria-label="Table of contents">
                <span data-side-label>Table of contents</span>
                {tocList(active)}
              </nav>
              <details data-toc-mobile>
                <summary>Table of contents</summary>
                {tocList()}
              </details>
            </>
          )}
          <Share post={post} />
        </aside>
        <article data-prose data-post-body dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}

export function GlossaryIndex() {
  const terms = publishedTerms();
  useSetCrumbs(() => [{ label: "Glossary" }], []);
  useEffect(() => { document.title = `Glossary — ${BRAND_NAME}`; }, []);
  return (
    <main data-main>
      <h1>Glossary</h1>
      <p style={{ color: "var(--muted-foreground)", margin: "0.5rem 0 1.5rem", maxWidth: "44rem" }}>
        The terms that appear in our case studies, defined plainly.
      </p>
      {terms.length === 0 ? <div data-empty>Nothing published yet.</div> : (
        <div data-chips>
          {terms.map((t) => <Link data-chip key={t.slug} to={termPath(t.slug)}>{t.term}</Link>)}
        </div>
      )}
    </main>
  );
}

export function GlossaryTerm() {
  const { slug = "" } = useParams();
  const term = publishedTerms().find((t) => t.slug === slug);
  useSetCrumbs(() => [{ label: "Glossary", to: "/glossary/" }, { label: term?.term ?? "Not found" }], [term?.term]);
  useEffect(() => { if (term) document.title = `${term.term} — ${BRAND_NAME}`; }, [term]);
  if (!term) {
    return <main data-main><div data-empty><p>No such term.</p>
      <p style={{ marginTop: "1rem" }}><Link to="/glossary/">All terms →</Link></p></div></main>;
  }
  return (
    <main data-main>
      <article data-prose>
        <h1>{term.term}</h1>
        <div dangerouslySetInnerHTML={{ __html: term.body ?? "" }} />
      </article>
    </main>
  );
}
