import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FragmentPage } from "@/components/FragmentPage";
import { findPublishedFragment, publishedFragments } from "@/content/fragments";
import { isIndexable } from "@/lib/coming-soon";
import { isLocale, localePath, locales } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(locale=>locale!=="en").flatMap(locale=>publishedFragments.map(fragment=>({locale,slug:fragment.slug}))); }
export async function generateMetadata({ params }: { params: Promise<{ locale:string;slug:string }> }): Promise<Metadata> { const {locale,slug}=await params; if(!isLocale(locale)||locale==="en")return{}; const fragment=findPublishedFragment(slug); if(!fragment)return{}; const copy=fragment.copy[locale]; const path=`/fragments/${fragment.slug}`; const canonical=localePath(locale,path); return {title:{absolute:`${copy.socialTitle} | NoFi Diary`},description:copy.socialDescription,alternates:{canonical,languages:{...Object.fromEntries(locales.map(item=>[item,localePath(item,path)])),"x-default":path}},robots:{index:isIndexable,follow:isIndexable},openGraph:{siteName:"NoFi Diary",type:"article",url:canonical,title:copy.socialTitle,description:copy.socialDescription,images:[{url:fragment.image,alt:copy.imageAlt}]},twitter:{card:"summary_large_image",title:copy.socialTitle,description:copy.socialDescription,images:[fragment.image]}}; }
export default async function Page({ params }: { params: Promise<{ locale:string;slug:string }> }) { const {locale,slug}=await params; if(!isLocale(locale)||locale==="en")notFound(); const fragment=findPublishedFragment(slug); if(!fragment)notFound(); return <FragmentPage fragment={fragment} locale={locale}/>; }
