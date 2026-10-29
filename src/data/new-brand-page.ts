/**
 * The brands already on the new brand page (pages/Business2.tsx) at
 * /business/<slug>/. Their previous case study moves to /business2/<slug>/.
 * Every other brand keeps the case study at /business/ until it is added here.
 *
 * Rolled out one brand at a time so each can be checked (owner, 2026-10-29).
 */
export const NEW_BRAND_PAGE = new Set(["spite-house-games", "virora-mahjong", "white-mountain-puzzles"]);

export const onNewBrandPage = (slug: string) => NEW_BRAND_PAGE.has(slug);
