/** Whether a business uses a selling method. `unchecked` is a real answer:
 *  nobody looked, which is not the same as "no" and must never be counted as
 *  one. See the header of selling-methods.mjs. */
export type MethodStatus = "yes" | "no" | "unchecked";

export type SellingGroup = { id: string; title: string; blurb: string };

export type SellingMethod = { id: string; group: string; label: string };

/** A profile's answers, keyed by method id. Anything absent is `unchecked`. */
export type SellingAnswers = Record<
  string,
  { status: MethodStatus; note?: string; flag?: boolean }
>;

export type ResolvedMethod = SellingMethod & {
  status: MethodStatus;
  note?: string;
  flag: boolean;
};

export type ResolvedGroup = SellingGroup & { methods: ResolvedMethod[] };

export const SELLING_GROUPS: SellingGroup[];
export const SELLING_METHODS: SellingMethod[];
export const SELLING_METHOD_IDS: Set<string>;
export function resolveSelling(selling: SellingAnswers | undefined): ResolvedGroup[];
