export const AUTHOR: {
  name: string; jobTitle: string; image: string; imageJpg: string; imageSize: number;
};
export const CATEGORIES: string[];
export function categorySlug(c: string): string;
export function categoryPath(c: string): string;
export function ogImagePath(slug: string): string;
export type TocEntry = { id: string; title: string };
export function withHeadingIds(html?: string): { html: string; toc: TocEntry[] };
export function excerpt(html?: string, max?: number): string;
export function readingMinutes(html?: string): number;
export function dateLabel(iso: string): string;
export function byDate<T extends { published?: string }>(posts: T[]): T[];
export function shareLinks(path: string, title: string): { id: 'x' | 'linkedin' | 'facebook'; label: string; href: string }[];
export const SHARE_ICONS: Record<'link' | 'x' | 'linkedin' | 'facebook', string>;
export function shareIcon(name: 'link' | 'x' | 'linkedin' | 'facebook'): string;
export function heroArtHtml(title: string): string;
