export type Post = {
  slug: string; title: string;
  kw: string | null; vol: number | null; comp: string | null;
  tier: 1 | 2 | 3;
  status: 'draft' | 'published';
  /** One of CATEGORIES in blog.mjs: the label on the card and the filter tab. */
  category: 'Fees & costs' | 'Data & rankings' | 'Tools' | 'Getting started' | 'Sourcing' | 'Policy';
  /** YYYY-MM-DD, set when the post is published. The date on the card and the page, and datePublished. */
  published?: string;
  /** Hero and og:image. Optional: without one the post gets the black title card (blog.mjs heroArtHtml). */
  image?: { src: string; alt: string; width: number; height: number };
  angle: string;
  /** Business slugs to cite; ['*'] means the whole catalogue. */
  cite: string[];
  body?: string;
};
export type Term = { slug: string; term: string; status: 'draft' | 'published'; body?: string };
export const POSTS: Post[];
export const TERMS: Term[];
export function publishedPosts(): Post[];
export function publishedTerms(): Term[];
export function postPath(slug: string): string;
export function termPath(slug: string): string;
