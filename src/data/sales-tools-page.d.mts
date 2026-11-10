export const ESTIMATOR_PATH: string;
export const STORE_PATH: string;
export const FBA_PATH: string;
export const ATTRIBUTION: string;

export type ToolPage = {
  path: string;
  crumb: string;
  title: string;
  docTitle: string;
  description: string;
  lede: string;
  sections: Array<{ id: string; title: string; html: string }>;
  faq: Array<{ q: string; a: string }>;
  related: Array<{ href: string; label: string }>;
};
export const ESTIMATOR: ToolPage;
export const STORE: ToolPage;
export function faqPlain(html: string): string;
