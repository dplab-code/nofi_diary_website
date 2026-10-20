import { pageMetadata } from "@/content/seo";
import type { Metadata } from "next";
import { ManifestoPage } from "@/components/ManifestoPage";
export const metadata: Metadata = pageMetadata("en", "/manifesto", "The NoFi Manifesto — NoFi Diary", "Your memories don’t need an audience.");
export default function Page() { return <ManifestoPage locale="en" />; }
