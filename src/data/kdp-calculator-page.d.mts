import type { KdpInputs, KdpResult } from "./kdp-royalties.mjs";
export const CALCULATOR_PATH: string;
export const BOOKS_POST_PATH: string;
export const ROAS_CALCULATOR_PATH: string;
export const TITLE: string;
export const DOC_TITLE: string;
export const META_DESCRIPTION: string;
export const readOnLabel: string;
export const EX: {
  input: Required<Pick<KdpInputs, "print">> & {
    ebook: NonNullable<KdpInputs["ebook"]>;
    paperback: NonNullable<KdpInputs["paperback"]>;
    hardcover: NonNullable<KdpInputs["hardcover"]>;
    adSpend: number;
    oneOff: number;
  };
  result: KdpResult;
};
export const LEDE: string;
export const SOURCE_LINE: string;
export const SECTIONS: Array<{ id: string; title: string; html: string }>;
export const FAQ: Array<{ q: string; a: string }>;
export function faqPlain(html: string): string;
export const RELATED: Array<{ href: string; label: string }>;
export const ASSUMED_FILE_MB: number;
