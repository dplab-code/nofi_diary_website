import { resolveRelease } from "@/lib/release-config";

export const { isComingSoon, isIndexable } = resolveRelease(process.env);
