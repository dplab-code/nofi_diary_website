import type { Metadata } from "next";
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
  return <html lang="en"><body>{children}</body></html>;
}
