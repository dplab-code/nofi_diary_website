"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

export function TrackedComingSoonLink({ children, className, href, hrefLang, current, event, value }: { children: ReactNode; className?: string; href: string; hrefLang?: string; current?: boolean; event: "language_change" | "privacy_open"; value: string }) {
  return <Link className={className} href={href} hrefLang={hrefLang} aria-current={current ? "page" : undefined} onClick={() => track(event, event === "language_change" ? { to_locale: value } : { placement: value })}>{children}</Link>;
}
