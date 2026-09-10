export type Collection = {
  slug: string;
  title: string;
  blurb: string;
  query: string;
  inNav: boolean;
};

export const COLLECTIONS: Collection[];
export const MORE: { slug: string; title: string; blurb: string; inNav: boolean };
export function collectionBySlug(slug: string): Collection | undefined;
export function collectionPath(slug: string): string;
