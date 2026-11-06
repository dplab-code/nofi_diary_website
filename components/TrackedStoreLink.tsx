"use client";

import { track } from "@vercel/analytics";
import { recordWebsiteEvent } from "@/lib/cloudflare-events";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  placement: "header" | "hero" | "final_cta";
  variant: "button" | "google_play_badge";
  children: ReactNode;
};

export function TrackedStoreLink({ href, placement, variant, children, onClick, ...props }: Props) {
  const pathname = usePathname();

  return <a
    {...props}
    href={href}
    onClick={event => {
      recordWebsiteEvent('download_click', {placement,variant,destination:'google_play'});
      track("download_click", {
        placement,
        page: pathname,
        variant,
        destination: "google_play",
      });
      onClick?.(event);
    }}
  >{children}</a>;
}
