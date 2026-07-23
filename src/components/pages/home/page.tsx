import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PageIntro } from "@/components/sections/page-intro";
import { HomePlatform } from "./sections/platform";
import { HomeSolutions } from "./sections/solutions";
import { HomeProof } from "./sections/proof";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { Contact } from "@/components/sections/contact";

/**
 * @cube27Component
 * @cube27ComponentId HomePage
 * @cube27ComponentType page
 * @cube27ComponentPattern landing
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription cube27 homepage shell (Cinematic Enterprise direction). Composes the shared Navbar + Footer around the home sections in journey order: cinematic hero (PageIntro), trusted-partner marquee, solutions list, approach band (how we work), proof plate, and the closing contact CTA. Warm-white canvas, ink-black grotesk type, single electric-blue accent. Entrance motion is pure-CSS so content is always visible regardless of hydration.
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <PageIntro overlayLinkHref="#platform" />
        <PartnerMarquee />
        <HomeSolutions />
        <HomePlatform />
        <HomeProof />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
