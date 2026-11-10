export type RoasBenchmark = {
  slug: string;
  priceLabel: string;
  price: number;
  productCost: number;
  fees: number;
  otherCosts: number;
  /** Advertising as a share of revenue (a TACoS), 0–100. */
  adPct: number;
  /** Margin after advertising, 0–100. */
  marginPct: number;
  /** Margin before advertising, 0–100. */
  preAdPct: number;
  beRoas: number | null;
  beAcosPct: number | null;
  basis: "modelled" | "reported" | "other";
  note: string | null;
};
export function roasBenchmarks(): RoasBenchmark[];
export function median(xs: Array<number | null | undefined>): number | null;
