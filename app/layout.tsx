import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { canIndexPublicPages } from "@/lib/site-release";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nofidiary.com"),
  title: {
    default: "NoFi Diary — Your memories. Yours to keep.",
    template: "%s | NoFi Diary"
  },
  description: "A private, offline-first creative diary for photos, voice, tactile pages and time capsules.",
  applicationName: "NoFi Diary",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icons/nofi-32.png", sizes: "32x32", type: "image/png" }, { url: "/icons/nofi-192.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/icons/nofi-apple-180.png", sizes: "180x180", type: "image/png" }] },
  robots: {
    index: canIndexPublicPages,
    follow: canIndexPublicPages,
    googleBot: {
      index: canIndexPublicPages,
      follow: canIndexPublicPages
    }
  },
  openGraph: {
    title: "NoFi Diary",
    description: "Your memories. Yours to keep.",
    type: "website",
    images: [{ url: "/images/editorial/hero-diary.png", alt: "NoFi Diary — a private creative diary" }]
  }
};

export const viewport: Viewport = { themeColor: "#f8f1e8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Script id="locale-lang" strategy="beforeInteractive">{`(function(){var p=location.pathname.split('/')[1];if(['it','fr','es','de'].includes(p))document.documentElement.lang=p})()`}</Script>{children}<Analytics /><SpeedInsights /></body></html>;
}
