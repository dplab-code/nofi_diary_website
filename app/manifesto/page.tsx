import type { Metadata } from "next";
import { ManifestoPage } from "@/components/ManifestoPage";
export const metadata: Metadata = { title: "The NoFi Manifesto", description: "Your memories don't need an audience.", alternates: { canonical: "/manifesto", languages: { en: "/manifesto", it: "/it/manifesto", fr: "/fr/manifesto", es: "/es/manifesto", de: "/de/manifesto" } } };
export default function Page() { return <ManifestoPage locale="en" />; }
