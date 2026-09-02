import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FragmentPage } from "@/components/FragmentPage";
import { findPublishedFragment, publishedFragments } from "@/content/fragments";
import { isIndexable } from "@/lib/coming-soon";
import { localePath, locales } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() { return publishedFragments.map(fragment => ({ slug: fragment.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const fragment=findPublishedFragment((await params).slug); if(!fragment)return{}; const copy=fragment.copy.en; const path=`/fragments/${fragment.slug}`; return { title:{absolute:`${copy.socialTitle} | NoFi Diary`},description:copy.socialDescription,alternates:{canonical:path,languages:{...Object.fromEntries(locales.map(locale=>[locale,localePath(locale,path)])),"x-default":path}},robots:{index:isIndexable,follow:isIndexable},openGraph:{siteName:"NoFi Diary",type:"article",url:path,title:copy.socialTitle,description:copy.socialDescription,images:[{url:fragment.image,alt:copy.imageAlt}]},twitter:{card:"summary_large_image",title:copy.socialTitle,description:copy.socialDescription,images:[fragment.image]}}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const fragment=findPublishedFragment((await params).slug); if(!fragment)notFound(); return <FragmentPage fragment={fragment} locale="en"/>; }
