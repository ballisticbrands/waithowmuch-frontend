export const CALCULATOR_PATH: string;
export const TITLE: string;
export const DOC_TITLE: string;
export const META_DESCRIPTION: string;
export const readOnLabel: string;
export const LEDE: string;
export const SOURCE_LINE: string;
export const SECTIONS: Array<{ id: string; title: string; html: string }>;
export const FAQ: Array<{ q: string; a: string }>;
export function faqPlain(html: string): string;
export const RELATED: Array<{ href: string; label: string }>;
export const RESULT_NOTES: Record<
  "tier" | "fba" | "referral" | "storage" | "amazonFees" | "landed" | "ads" | "profit" | "margin" | "roi" | "acos" | "monthly",
  string
>;
