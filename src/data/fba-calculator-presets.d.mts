export type FbaPreset = {
  id: string;
  slug: string;
  /** The product tab's label, or null for a single-product margin block. */
  product: string | null;
  category: string;
  priceLabel: string;
  price: number;
  productCost: number;
  inboundShipping: number;
  referral: number;
  fba: number;
  ads: number;
  adPct: number;
  profit: number;
  marginPct: number;
  pkg: { dims: [number, number, number]; unit: "in" | "cm"; weight: number; weightUnit: "oz" | "lb" | "kg" };
  lengthIn: number;
  widthIn: number;
  heightIn: number;
  weightLb: number;
};
export function fbaPresets(): FbaPreset[];
