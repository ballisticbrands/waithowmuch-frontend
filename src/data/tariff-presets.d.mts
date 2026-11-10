import type { Claims } from "./tariff.mjs";
export type TariffPreset = {
  id: string; slug: string; product: string; code: string; country: string; price: number; freightPerUnit: number;
  claims?: Claims; assist?: { total: number; units: number }; basis: string;
};
export const PRESETS: TariffPreset[];
export function presetById(id: string): TariffPreset | null;
