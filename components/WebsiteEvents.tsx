"use client";
import {useEffect} from 'react';
import {usePathname,useSearchParams} from 'next/navigation';
import {recordWebsiteVisit} from '@/lib/cloudflare-events';
export function WebsiteEvents(){
  const pathname=usePathname(),query=useSearchParams().toString();
  useEffect(()=>{recordWebsiteVisit();},[pathname,query]);
  return null;
}
