"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import type { Locale } from "@/lib/i18n";

export function FragmentVisit({ fragment, locale }: { fragment: string; locale: Locale }) {
  useEffect(() => { track("shared_fragment_view", { fragment, locale }); }, [fragment, locale]);
  return null;
}
