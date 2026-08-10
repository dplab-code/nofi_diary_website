import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "NoFi Diary — Your memories. Yours to keep." },
  alternates: { canonical: "/", languages: { en: "/", it: "/it", fr: "/fr", es: "/es", de: "/de" } },
};

export default function Page() { return <HomePage locale="en" />; }
