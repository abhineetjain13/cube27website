import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "./sections/hero";
import { HomePlatform } from "./sections/platform";
import { HomeSolutions } from "./sections/solutions";
import { HomeProof } from "./sections/proof";
import { Contact } from "@/components/sections/contact";

/**
 * @cube27Component
 * @cube27ComponentId HomePage
 * @cube27ComponentType page
 * @cube27ComponentPattern landing
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription cube27 homepage shell (Cinematic Enterprise direction). Composes the shared Navbar + Footer around the home sections: cinematic hero, platform continuation band, solutions list, proof plate, and the closing built-for-operators CTA. Warm-white canvas, ink-black grotesk type, single electric-blue accent. Entrance motion is pure-CSS so content is always visible regardless of hydration.
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <HomeHero />
        <HomePlatform />
        <HomeSolutions />
        <HomeProof />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
