import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { ComingSoonExperience, comingSoonMetadata } from "@/app/coming-soon/page";
import { isComingSoon, isIndexable } from "@/lib/coming-soon";

export function generateMetadata(): Metadata {
  if (isComingSoon) return comingSoonMetadata("en", isIndexable);
  return { title: { absolute: "NoFi Diary — Your memories. Yours to keep." }, alternates: { canonical: "/", languages: { en: "/", it: "/it", fr: "/fr", es: "/es", de: "/de", "x-default": "/" } } };
}

export default function Page() { return isComingSoon ? <ComingSoonExperience locale="en" /> : <HomePage locale="en" />; }
