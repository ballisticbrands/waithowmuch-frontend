import type { RoasResult } from "./roas.mjs";
import type { RoasBenchmark } from "./roas-benchmarks.mjs";
export const CALCULATOR_PATH: string;
export const FBA_CALCULATOR_PATH: string;
export const TITLE: string;
export const DOC_TITLE: string;
export const META_DESCRIPTION: string;
export const EXAMPLE: { price: number; productCost: number; fees: number; otherCosts: number };
export const EX_GOOD: RoasResult;
export const EX_BAD: RoasResult;
export const EX_CHEAP: RoasResult;
export const EX_LOSS: RoasResult;
export const LEDE: string;
export const PRIVACY_LINE: string;
export const SECTIONS: Array<{ id: string; title: string; html: string }>;
export function benchmarkSummaryHtml(
  rows: RoasBenchmark[],
  nameOf: (slug: string) => string | undefined,
  pathOf: (slug: string) => string,
): string;
export const BENCHMARK_INTRO: string;
export const FAQ: Array<{ q: string; a: string }>;
export function faqPlain(html: string): string;
export const RELATED: Array<{ href: string; label: string }>;
