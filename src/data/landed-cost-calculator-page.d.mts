import type { EntryFees, LandedLine } from "./tariff.mjs";
export const CALCULATOR_PATH: string;
export const TITLE: string;
export const H1: string;
export const TAGLINE: string;
export const DOC_TITLE: string;
export const META_DESCRIPTION: string;
export const LANDED_EXAMPLE: {
  slug: string; business: string; product: string; code: string; country: string; units: number; price: number;
  incoterm: string; mode: string; freight: number; insurance: number; broker: number; inbound: number; ratePct: number;
};
export const X_FEES: EntryFees;
export const X_DUTY: number;
export const X_LANDED: { lines: LandedLine[]; perUnit: number; total: number };
export const LEDE: string;
export const PRIVACY_LINE: string;
export function sections(pathOf: (slug: string) => string): Array<{ id: string; title: string; html: string }>;
export const FAQ: Array<{ q: string; a: string }>;
export const RELATED: Array<{ href: string; label: string }>;
