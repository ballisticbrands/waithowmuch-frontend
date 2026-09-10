export type Collection = {
  slug: string;
  title: string;
  navLabel?: string;
  icon?: string;
  query: string;
  inNav: boolean;
};

export const COLLECTIONS: Collection[];
export const MORE: { slug: string; title: string; blurb: string; icon?: string; inNav: boolean };
export const DESCRIPTIONS: Record<string, string>;
export function collectionBySlug(slug: string): Collection | undefined;
export function collectionPath(slug: string): string;
