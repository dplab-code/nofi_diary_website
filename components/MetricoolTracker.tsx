"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global { interface Window { beTracker?: { t: (data: { hash: string }) => void } } }

export function MetricoolTracker() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!ready || lastPath.current === pathname) return;
    try {
      if (!window.beTracker) return;
      lastPath.current = pathname;
      window.beTracker.t({ hash: "4b1f47aa5bdf6604eecdfb061d2c5e42" });
    } catch { /* Optional analytics must never interrupt the website. */ }
  }, [ready, pathname]);
  return <Script id="metricool-tracker" src="https://tracker.metricool.com/resources/be.js" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setReady(false)} />;
}
