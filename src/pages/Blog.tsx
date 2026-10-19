import { Link, useParams } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { publishedPosts, publishedTerms, postPath, termPath } from "@/data/content.mjs";
import { BRAND_NAME } from "@/data/site";
import { useEffect } from "react";

/** Index of published posts. Drafts are invisible here, in the sitemap and to
 *  the prerender — a page appears the moment its body lands, never before. */
export function BlogIndex() {
  const posts = publishedPosts();
  useSetCrumbs(() => [{ label: "Blog" }], []);
  useEffect(() => { document.title = `Blog — ${BRAND_NAME}`; }, []);
  return (
    <main data-main>
      <h1>Blog</h1>
      <p style={{ color: "var(--muted-foreground)", margin: "0.5rem 0 1.5rem", maxWidth: "44rem" }}>
        What the numbers across every researched business add up to.
      </p>
      {posts.length === 0 ? (
        <div data-empty>Nothing published yet.</div>
      ) : (
        <div data-rows>
          {posts.map((p) => (
            <Link data-row key={p.slug} to={postPath(p.slug)} style={{ gridTemplateColumns: "1fr" }}>
              <div><div data-row-name>{p.title}</div></div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export function BlogPost() {
  const { slug = "" } = useParams();
  const post = publishedPosts().find((p) => p.slug === slug);
  useSetCrumbs(() => [{ label: "Blog", to: "/blog/" }, { label: post?.title ?? "Not found" }], [post?.title]);
  useEffect(() => { if (post) document.title = `${post.title} — ${BRAND_NAME}`; }, [post]);
  if (!post) {
    return <main data-main><div data-empty><p>No post here.</p>
      <p style={{ marginTop: "1rem" }}><Link to="/blog/">All posts →</Link></p></div></main>;
  }
  return (
    <main data-main>
      <article data-prose>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
      </article>
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
