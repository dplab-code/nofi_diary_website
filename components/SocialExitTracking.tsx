"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { socialChannelIds, type SocialChannelId } from "@/lib/social-channels";

// Progressive enhancement: the links and section remain server rendered.
export function SocialExitTracking({ sectionId, placement, locale }: {
  sectionId: string; placement: "coming_soon" | "home"; locale: Locale;
}) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    const onClick = (event: MouseEvent) => {
      if (event.type === "auxclick" && event.button !== 1) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[data-social-channel]");
      const channel = anchor?.dataset.socialChannel as SocialChannelId | undefined;
      if (!anchor || !section?.contains(anchor) || !channel || !socialChannelIds.includes(channel)) return;
      // Never cancel native navigation, even when analytics is blocked or throws.
      try { track("social_exit_click", { channel, placement, locale }); } catch { /* Native navigation continues. */ }
    };
    section?.addEventListener("click", onClick);
    section?.addEventListener("auxclick", onClick);
    return () => {
      section?.removeEventListener("click", onClick);
      section?.removeEventListener("auxclick", onClick);
    };
  }, [sectionId, placement, locale]);
  return null;
}
