import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isPublicRelease } from "@/lib/site-release";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nofidiary.com"),
  title: {
    default: "NoFi Diary — Your memories. Yours to keep.",
    template: "%s | NoFi Diary"
  },
  description: "A private, offline-first creative diary for photos, voice, tactile pages and time capsules.",
  icons: { icon: "/images/nofi-logo.png", apple: "/images/nofi-logo.png" },
  robots: {
    index: isPublicRelease,
    follow: isPublicRelease,
    googleBot: {
      index: isPublicRelease,
      follow: isPublicRelease
    }
  },
  openGraph: {
    title: "NoFi Diary",
    description: "Your memories. Yours to keep.",
    type: "website",
    images: [{ url: "/images/editorial/hero-diary.png", alt: "NoFi Diary — a private creative diary" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Script id="locale-lang" strategy="beforeInteractive">{`(function(){var p=location.pathname.split('/')[1];if(['it','fr','es','de'].includes(p))document.documentElement.lang=p})()`}</Script>{children}<Analytics /><SpeedInsights /></body></html>;
}
