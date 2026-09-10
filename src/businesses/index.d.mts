import type { Profile } from "./types";
export const PROFILES: Record<string, Profile>;
export function profileFor(slug: string): Profile | undefined;
