export type TariffMeta = {
  revision: { name: string; label: string; startDate: string; slug: string };
  fetchedAt: string;
  validThrough: string;
  dataPath: string;
  lists: Array<{ id: string; heading: string; rate: number; suspended: boolean }>;
  note31: Array<{ heading: string; rate: number; from: string; until: string | null }>;
  n52: Array<{ heading: string; country: string; kind: "add" | "floor" | "floorNone"; rate: number }>;
  flags: Array<{ note: string; title: string; how: string }>;
  counts: { rows: number; lists: Record<string, number>; exclusions: number; generalRates: number; notPercent: number; notPercentComputed: number };
};
export const META: TariffMeta;

export const FEES: { mpfRate: number; mpfMin: number; mpfMax: number; hmfRate: number; updated: string };
export type ShipMode = "ocean" | "air" | "other";
export type EntryFees = { mpf: number; mpfRaw: number; mpfBound: "min" | "max" | null; hmf: number; total: number };
export function entryFees(value: number, mode: ShipMode | string): EntryFees;

export type Country = { id: string; label: string; n52?: string; china301?: boolean; none?: boolean; column2?: boolean };
export const COUNTRIES: Country[];
export const NOT_MODELLED: string[];
export function countryById(id: string): Country | null;

export const VALID_FROM: string;
export const VALID_THROUGH: string;
export function dateInRange(iso: string): boolean;

export type RateTerm =
  | { kind: "adval"; pct: number }
  | { kind: "specific"; amount: number; per: string; label: string };
export type Rate = { text: string; ok: boolean; terms: RateTerm[]; adval: number; specific: Array<{ kind: "specific"; amount: number; per: string; label: string }> };
export function parseRate(text: string): Rate;
export function applyRate(rate: Rate, q: { value: number; units: number; weightKg?: number }): number | null;

export type Shard = {
  rev: string;
  ch: string;
  rows: Array<[string, number, string, string, string, string]>;
  ov: {
    s301: Record<string, string>;
    s301p: Array<{ sub: string; list: string; except: string[]; desc: string }>;
    excl: Array<{ id: string; stats: string[]; desc: string; overrides: string[]; via: string; until: string }>;
    n31: Record<string, string>;
    n52b: string[];
    n52c: Array<{ code: string; desc: string }>;
    air: string[];
    pharma: string[];
    n52j: Record<string, string[]>;
    n52jd: Record<string, Array<{ code: string; desc: string }>>;
    flags: Record<string, string[]>;
  };
};
export type Row = {
  i: number; code: string; d: string; indent: number; desc: string; general: string; other: string; units: string;
  parent: number | null; rateRow: number | null; leaf: boolean;
};
export const digitsOf: (code: string) => string;
export function formatCode(d: string): string;
export const chapterOf: (code: string) => string;
export const shardUrl: (ch: string) => string;
export function indexShard(shard: { rows: Array<[string, number, string, string, string, string]> }): { rows: Row[] };
export function findLeaves(shard: Shard, typed: string): Row[];
export function chainOf(shard: { rows: Array<[string, number, string, string, string, string]> }, row: Row): string[];

export type Band = { text: string; lo: { v: number; incl: boolean } | null; hi: { v: number; incl: boolean } | null; per: string };
export type Line = {
  code: string; display: string; rateCode: string; desc: string; chain: string[];
  general: Rate; column2: Rate; units: string; bands: Band[];
};
export function lineInfo(shard: Shard, code: string): Line | null;
export function valueBands(chain: string[]): Band[];
export function bandCheck(bands: Band[], unitValue: number, weightKg?: number): { ok: boolean | null; band?: Band; v?: number };

export type Exclusion = { id: string; stats: string[]; desc: string; overrides: string[]; via: string; until: string };
export type Conditional = { id: string; source: string; heading: string | null; desc: string };
export type Flag = { note: string; title: string; how: string };
export type Overlays = {
  listIds: string[];
  exclusions: Exclusion[];
  n31: string | null;
  n52Exempt: boolean;
  conditional: Conditional[];
  conditionalByCountry: Record<string, Conditional[]>;
  exemptByCountry: Record<string, boolean>;
  flags: Flag[];
};
export function overlaysFor(shard: Shard, code: string): Overlays;
export const SECTION_232_NOTES: Set<string>;

export type Claims = { exclusion?: Record<string, boolean>; n52?: Record<string, boolean>; s232?: boolean };
export type Layer = { key: string; label: string; heading: string; rateText: string; pct: number | null; amount: number | null };
export type Need =
  | "weight"
  | { kind: "exclusion"; id: string; desc: string; stats: string[]; until: string; via: string }
  | ({ kind: "n52" } & Conditional);
export type DutyResult = {
  layers: Layer[]; duty: number | null; value: number; rate: number | null; complete: boolean;
  notes: string[]; needs: Need[]; flags?: Flag[]; outOfRange?: boolean;
};
export function computeDuty(input: {
  line: Line; ov: Overlays; countryId: string; date: string; unitValue: number; units: number; weightKg?: number; claims?: Claims;
}): DutyResult;

export const INCOTERMS: Array<{ id: string; label: string; includesFreight: boolean }>;
export function customsValue(q: { price: number; incoterm: string; includedPerUnit?: number; assistTotal?: number; assistUnits?: number }): { unitValue: number; less: number; assist: number };
export type LandedLine = { key: string; label: string; perUnit: number; note?: string | null };
export function landedCost(q: {
  price: number; units: number; incoterm: string; freight?: number; insurance?: number; duty?: number; fees?: number;
  broker?: number; assistTotal?: number; assistUnits?: number; inbound?: number; other?: number;
}): { lines: LandedLine[]; perUnit: number; total: number };
