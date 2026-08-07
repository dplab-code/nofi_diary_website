import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nofidiary.com"),
  title: {
    default: "NoFi Diary — Your memories. Yours to keep.",
    template: "%s | NoFi Diary"
  },
  description: "A private, offline-first creative diary for photos, voice, tactile pages and time capsules.",
  openGraph: {
    title: "NoFi Diary",
    description: "Your memories. Yours to keep.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Script id="locale-lang" strategy="beforeInteractive">{`(function(){var p=location.pathname.split('/')[1];if(['it','fr','es','de'].includes(p))document.documentElement.lang=p})()`}</Script>{children}</body></html>;
}
