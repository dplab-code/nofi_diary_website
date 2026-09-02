"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import type { Locale } from "@/lib/i18n";

export function ComingSoonAnalytics({ locale }: { locale: Locale }) {
  useEffect(() => {
    track("coming_soon_view", { locale });
    const fragments = document.getElementById("fragments");
    if (!fragments) return;
    let tracked = false;
    const observer = new IntersectionObserver(entries => {
      if (!tracked && entries.some(entry => entry.isIntersecting)) {
        tracked = true;
        track("coming_soon_fragments_reached", { locale });
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(fragments);
    return () => observer.disconnect();
  }, [locale]);
  return null;
}
