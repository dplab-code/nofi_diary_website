import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { isComingSoon } from "@/lib/coming-soon";

export const metadata: Metadata = {
  title: { absolute: "NoFi — Coming soon" },
  description: "Keep what mattered. NoFi is coming soon on Android.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "NoFi — Coming soon",
    description: "Keep what mattered.",
    type: "website",
  },
};

export default function ComingSoonPage() {
  if (!isComingSoon) redirect("/");

  return (
    <main className="comingSoon">
      <div className="comingSoonGlow" aria-hidden="true" />
      <section className="comingSoonContent" aria-labelledby="coming-soon-title">
        <div className="comingSoonBrand" aria-hidden="true">
          <BrandMark />
        </div>
        <p className="comingSoonKicker">NoFi</p>
        <h1 id="coming-soon-title">Keep what mattered.</h1>
        <p className="comingSoonStatus">Coming soon.</p>
        <p className="comingSoonPlatform">On Android</p>
      </section>
    </main>
  );
}
