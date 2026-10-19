export type Post = {
  slug: string; title: string;
  kw: string | null; vol: number | null; comp: string | null;
  tier: 1 | 2 | 3;
  status: 'draft' | 'published';
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
