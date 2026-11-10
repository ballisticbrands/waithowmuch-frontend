export const READ_ON: string;
export const SOURCES: Record<string, { label: string; url: string; used: string }>;
export const LATEST_FUND: { month: string; fundMillions: number; totalMillions: number; announced: string };
export function round2(n: number): number;

export type EbookOption = "35" | "70";
export type InkId = "black" | "groundwood" | "standard" | "premium";
export type Trim = "regular" | "large";
export type PrintFormat = "paperback" | "hardcover";

export const EBOOK: {
  rate35: number; rate70: number; band70: { min: number; max: number };
  min35: Array<{ belowMb: number; min: number }>; max35: number;
  deliveryPerMb: number; deliveryMin: number; maxShareOfPrint: number;
};
export function vatIn(price: number, vatRate?: number): number;
export function deliveryCost(fileMb: number, perMb?: number, min?: number): number;
export function ebookRoyalty35(x: { price: number; vatRate?: number }): number;
export function ebookRoyalty70(x: { price: number; fileMb: number; vatRate?: number; perMb?: number; min?: number }): number;
export function ebookMin35(fileMb: number): number;
export function ebook70Eligible(price: number, printPrice?: number): Array<"below-band" | "above-band" | "print-price">;

export type EbookQuote = {
  delivery: number;
  royalty35: number;
  royalty70: number | null;
  royalty: number;
  rate: number;
  eligible70: boolean;
  reasons: Array<"below-band" | "above-band" | "print-price">;
  min35: number;
  fileFlipMb: number;
  match35At: number;
  royaltyAtBandMax: number;
  flags: Array<"below-min" | "above-max" | "fell-to-35">;
};
export function ebookQuote(x: { price: number; fileMb: number; option?: EbookOption; printPrice?: number }): EbookQuote;

export const PRINT: {
  rateLow: number; rateHigh: number; highFrom: number; expanded: number; maxPrice: number;
  largeOver: { widthIn: number; heightIn: number };
};
export const INKS: Array<{ id: InkId; label: string }>;
type Band = {
  pages: [number, number]; fixedOnlyTo: number;
  flat: Record<Trim, number> | null; fixed: Record<Trim, number>; perPage: Record<Trim, number>;
};
export const PRINT_COSTS: { paperback: Record<InkId, Band>; hardcover: Partial<Record<InkId, Band>> };
export function printRate(price: number): number;
export type PrintingCost = {
  cost: number | null;
  error?: "ink" | "pages-low" | "pages-high";
  range?: [number, number];
  fixed?: number;
  perPage?: number;
  flat?: boolean;
};
export function printingCost(x: { format: PrintFormat; ink: InkId; pages: number; trim: Trim }): PrintingCost;
export function minPrintPrice(cost: number): number | null;
export function printRoyalty(price: number, cost: number, rate?: number): number;
export type PrintQuote = PrintingCost & {
  royalty: number | null;
  expanded: number | null;
  rate: number | null;
  minPrice: number | null;
  flags: Array<"below-min" | "above-max" | "expanded-negative">;
};
export function printQuote(x: { format: PrintFormat; ink: InkId; pages: number; trim: Trim; price: number }): PrintQuote;

export type KdpInputs = {
  ebook?: { price: number; fileMb: number; option: EbookOption; units: number; kenp: number; kenpRate: number | null };
  paperback?: { price: number; units: number; expandedUnits: number };
  hardcover?: { price: number; units: number };
  print: { pages: number; ink: InkId; trim: Trim };
  adSpend?: number;
  oneOff?: number;
};
export type KdpResult = {
  ebook: (EbookQuote & { units: number; monthly: number; beAcos: number }) | null;
  paperback: (PrintQuote & { units: number; expandedUnits: number; monthly: number | null; beAcos: number | null }) | null;
  hardcover: (PrintQuote & { units: number; expandedUnits: number; monthly: number | null; beAcos: number | null }) | null;
  ku: { kenp: number; rate: number | null; monthly: number | null } | null;
  royalties: number;
  salesRevenue: number;
  units: number;
  adSpend: number;
  profit: number;
  beAcos: number | null;
  adShare: number | null;
  oneOff: number;
  paybackMonths: number | null;
  kuMissingRate: boolean;
};
export function calculate(x: KdpInputs): KdpResult;
