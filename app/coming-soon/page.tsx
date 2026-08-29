import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
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
          <Image
            className="brandMark"
            src="/images/nofi-logo.png"
            alt=""
            width={210}
            height={210}
            sizes="(max-width: 700px) 160px, 210px"
            priority
          />
        </div>
        <p className="comingSoonKicker">NoFi</p>
        <h1 id="coming-soon-title">Keep what mattered.</h1>
        <p className="comingSoonStatus">Coming soon.</p>
        <p className="comingSoonPlatform">On Android</p>
      </section>
    </main>
  );
}
