export type PeriodId = "nonpeak-2026" | "peak-2026" | "nonpeak-2027";
export type FeeKind = "core" | "apparel" | "dangerous";

export const READ_ON: string;
export const SURCHARGE: { rate: number; since: string };
export const SOURCES: Record<string, { label: string; url: string }>;
export const PERIODS: Array<{ id: PeriodId; label: string; from: string; to: string }>;
export function periodFor(isoDate: string): PeriodId;

export type ReferralCategory = {
  id: string;
  name: string;
  kind: "flat" | "band" | "portion";
  pct?: number;
  bands?: Array<[number, number]>;
  min: number | null;
  closingFee?: number;
  apparel?: boolean;
};
export const REFERRAL_CATEGORIES: ReferralCategory[];
export function categoryById(id: string): ReferralCategory | undefined;
export function referralRateText(c: ReferralCategory): string;
export const TIER_LABELS: Record<string, string>;
export const LOW_PRICE_EXCLUDED_2027: string[];
export const STORAGE: {
  standard: { offPeak: number; peak: number };
  oversize: { offPeak: number; peak: number };
  dangerous: { standard: { offPeak: number; peak: number }; oversize: { offPeak: number; peak: number } };
  peakMonths: string;
};
export const IN_PER_CM: number;
export const LB_PER_KG: number;

export type Measure = {
  L: number; M: number; S: number;
  unitLb: number; dimLb: number; dimLbMin2: number;
  lengthPlusGirth: number; cubicFeet: number;
};
export type Tier = { tier: string; shippingLb: number; usesDim: boolean; group: "standard" | "oversize" };

export type CalcInput = {
  price: number;
  productCost?: number;
  inboundShipping?: number;
  lengthIn: number;
  widthIn: number;
  heightIn: number;
  weightLb: number;
  category: string;
  periodId: PeriodId;
  dangerous?: boolean;
  adPct?: number;
  monthlyUnits?: number;
  storageMonths?: number;
  storagePeak?: boolean;
};

export type CalcResult = {
  m: Measure;
  tier: Tier;
  kind: FeeKind;
  fba: { base: number; fee: number; band: number; bracket: string };
  referral: { fee: number; closingFee: number; effectivePct: number; atMinimum: boolean };
  storage: number;
  storageMonth: { rate: number; cubicFeet: number; fee: number };
  flags: string[];
  amazonFees: number;
  landed: number;
  ads: number;
  profit: number;
  beforeAds: number;
  marginPct: number | null;
  roiPct: number | null;
  breakEvenAcosPct: number | null;
  monthlyProfit: number | null;
  monthlyRevenue: number | null;
};

export function priceBand(price: number): 0 | 1 | 2;
export function measure(x: { lengthIn: number; widthIn: number; heightIn: number; weightLb: number }): Measure;
export function sizeTier(m: Measure, periodId: PeriodId): Tier;
export function calculate(input: CalcInput): CalcResult;
