import { Bot, BarChart3, Megaphone, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "@/components/pages/home/sections/hero";
import { HomeSolutions } from "@/components/pages/home/sections/solutions";
import { HomeProof } from "@/components/pages/home/sections/proof";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

/**
 * cube27 services page with a clear path from capability to enquiry.
 */
export function SolutionsPage() {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <HomeHero
          headlineLines={["Solutions that", "move the", "business."]}
          body="CUBE27 helps organizations improve digital marketing, ecommerce, analytics, and technology operations with practical solutions built around the outcomes they need."
          ctaLabel="Talk to our team"
          ctaHref="#contact"
          overlayEyebrow="CAPABILITY ENGINE"
          overlayTitle="Architect. Build. Scale."
          overlayDescription="High-fidelity engineering for complex enterprise problems."
          overlayBadge="99.9%"
        />
        <HomeSolutions
          eyebrow="What we do"
          headlineLines={[
            "Practical expertise for",
            "complex business problems.",
          ]}
          solutions={SOLUTION_LINES}
        />
        <Capabilities />
        <HomeProof
          eyebrow="Proven at scale"
          statement="For more than a decade, CUBE27 has helped 100+ brands—including Fortune 500 companies—turn complex technology and data challenges into measurable progress."
          stats={SOLUTION_STATS}
        />
        <Contact
          eyebrow="Let's build it together"
          headlineLines={["Tell us about your", "process or product."]}
          body="Share a brief on your new idea or an existing process or website. Our experts will architect the right solution and get back to you quickly."
        />
      </main>
      <Footer />
    </div>
  );
}

const SOLUTION_LINES = [
  {
    icon: Megaphone,
    name: "Digital marketing solutions",
    description:
      "Tracking, analytics, landing-page platforms, keyword tools, CRO, personalization, and A/B testing — built by AdWords- and Analytics-certified experts to maximize ad outreach.",
    href: "#capabilities",
    active: true,
  },
  {
    icon: BarChart3,
    name: "Business intelligence and analytics",
    description:
      "Large-scale BI and reporting platforms that surface insight at every stage, so leaders can act on opportunities others miss.",
    href: "#capabilities",
  },
  {
    icon: ShoppingCart,
    name: "Ecommerce solutions",
    description:
      "End-to-end enterprise and open-source ecommerce delivery from certified developers, UI designers, and marketing specialists.",
    href: "#capabilities",
  },
  {
    icon: Bot,
    name: "Machine learning",
    description:
      "State-of-the-art ML for ecommerce that analyzes and optimizes ad spend to drive maximum outreach.",
    href: "#capabilities",
  },
  {
    icon: BarChart3,
    name: "Blockchain",
    description:
      "Experience across permissionless and permissioned implementations for teams exploring trusted digital systems.",
    href: "#capabilities",
  },
];

const SOLUTION_STATS = [
  { value: "100+", label: "Brands served" },
  { value: "Fortune 500", label: "Enterprise clients" },
  { value: "40+ years", label: "Combined ecommerce experience" },
  { value: "Pune", label: "India delivery hub" },
];

/* ----------------------------------------------------------------------------
 * Capabilities — proof-tile anatomy: hairline-ruled grid on warm white
 * ------------------------------------------------------------------------- */

interface Capability {
  title: string;
  body: string;
}

const DEFAULT_CAPABILITIES: Capability[] = [
  {
    title: "Feed optimization",
    body: "Product-feed engineering that improves coverage, quality, and performance across every channel.",
  },
  {
    title: "Conversion rate optimization",
    body: "Landing pages, microsites, and experimentation programs tuned to lift conversion and personalization.",
  },
  {
    title: "Tracking & attribution",
    body: "Analytics and tracking systems that connect spend to outcomes across the full funnel.",
  },
  {
    title: "Reporting platforms",
    body: "Enterprise BI dashboards that turn scattered data into decisions leaders actually use.",
  },
  {
    title: "Lean systems engineering",
    body: "Expert architects and developers building top-notch, efficient applications built to scale.",
  },
  {
    title: "Emerging tech R&D",
    body: "Active work in machine learning and blockchain to keep our clients ahead of what's next.",
  },
];

interface CapabilitiesProps {
  eyebrow?: string;
  headlineLines?: string[];
  capabilities?: Capability[];
}

function Capabilities({
  eyebrow = "Capabilities",
  headlineLines = ["The building blocks", "behind the work."],
  capabilities = DEFAULT_CAPABILITIES,
}: CapabilitiesProps) {
  return (
    <section
      id="capabilities"
      className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-cube27-background-primary p-6">
                <dt className="typography-heading text-[1.05rem] font-medium tracking-[-0.01em] text-cube27-text-primary">
                  {c.title}
                </dt>
                <dd className="mt-2 text-[0.9rem] leading-relaxed text-cube27-text-secondary">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
