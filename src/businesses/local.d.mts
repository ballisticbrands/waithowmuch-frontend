import type { LocalBusiness } from "./types";
export type { LocalBusiness };
export const LOCAL_BUSINESSES: Record<string, LocalBusiness>;
export function localBusiness(slug: string): LocalBusiness | undefined;
