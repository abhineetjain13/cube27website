import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "@/components/pages/home/sections/hero";
import { HomeProof } from "@/components/pages/home/sections/proof";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

/**
 * @cube27Component
 * @cube27ComponentId AboutPage
 * @cube27ComponentType page
 * @cube27ComponentPattern landing
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription cube27 About / Company page shell (Cinematic Enterprise direction). Reuses the shared Navbar + Footer and the home HomeHero/HomeProof/HomeOperatorsCta sections with About-specific copy, plus three page-local native sections that match the home anatomy: a company-story band (eyebrow + grotesk headline + two-column narrative on warm white), a "how we work" principles list (hairline-ruled rows, plain monoline accent dots — no card grid), and a people/culture band on the secondary surface. Warm-white canvas, ink-black grotesk type, single electric-blue accent reserved for eyebrows/dots/links. Drop-in copy lives in the DEFAULT_* constants below.
 */
export function AboutPage() {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <HomeHero
          headlineLines={[
            "Built to engineer",
            "the intelligent",
            "enterprise.",
          ]}
          body="CUBE27 is a Pune-based partner pairing capability centers, agentic AI, and data engineering to help global brands operate with measurable impact."
          ctaLabel="Work with us"
          ctaHref="#contact"
          overlayEyebrow="GLOBAL DELIVERY"
          overlayTitle="People. Process. Pride."
          overlayDescription="Operating as a seamless extension from our Pune hub."
          overlayBadge="100+"
        />
        <CompanyStory />
        <Principles />
        <HomeProof
          eyebrow="Our track record"
          statement="For over a decade, 100+ brands — including Fortune 500 enterprises across the US — have trusted CUBE27 to build and run the operations behind their growth."
        />
        <PeopleBand />
        <Contact
          eyebrow="Partner with CUBE27"
          headlineLines={["Let's engineer your", "intelligent enterprise."]}
          body="Tell us where you want to see earlier, decide faster, or automate the work. Share a brief and our experts will be in touch shortly."
        />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Company story — eyebrow + grotesk headline + two-column narrative on warm white
 * ------------------------------------------------------------------------- */

interface StoryParagraphProps {
  eyebrow?: string;
  headlineLines?: string[];
  paragraphs?: string[];
}

const DEFAULT_STORY: Required<StoryParagraphProps> = {
  eyebrow: "Who we are",
  headlineLines: ["A delivery partner,", "not just a vendor."],
  paragraphs: [
    "CUBE27 was built on a simple conviction: global enterprises don't need another point tool — they need a partner who can stand up real capability and run it. From our hub in Pune, we operate as an extension of our clients' teams, owning outcomes across marketing, data, automation, and engineering.",
    "Over the last decade we've grown into a trusted GCC-as-a-Service partner for 100+ brands, including Fortune 500 enterprises across the US. We bring the people, the platforms, and the operating discipline to engineer measurable impact — then we stay accountable for it.",
  ],
};

function CompanyStory() {
  const { eyebrow, headlineLines, paragraphs } = DEFAULT_STORY;
  return (
    <section
      id="company"
      className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 lg:col-span-7 lg:pl-6 lg:pt-2">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="max-w-xl text-[1.05rem] leading-relaxed text-cube27-text-secondary"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * Principles — calm hairline-ruled list (matches HomeSolutions anatomy)
 * ------------------------------------------------------------------------- */

interface Principle {
  name: string;
  description: string;
  active?: boolean;
}

const DEFAULT_PRINCIPLES: Principle[] = [
  {
    name: "Own the outcome",
    description:
      "We measure ourselves on the business result, not hours billed. Accountability is the product.",
    active: true,
  },
  {
    name: "Engineer for scale",
    description:
      "Every capability we stand up is designed to compound — built to grow with the enterprise, not patched together.",
  },
  {
    name: "Earn trust with rigor",
    description:
      "Governance, security, and operating discipline come first. Fortune 500 partners stay because the work holds up.",
  },
  {
    name: "Stay close to the work",
    description:
      "We operate as an extension of our clients' teams — embedded, responsive, and transparent end to end.",
  },
];

interface PrinciplesProps {
  eyebrow?: string;
  headlineLines?: string[];
  principles?: Principle[];
}

function Principles({
  eyebrow = "How we work",
  headlineLines = ["The principles behind", "every engagement."],
  principles = DEFAULT_PRINCIPLES,
}: PrinciplesProps) {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28">
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

        <div className="mt-12 border-t border-cube27-border-primary">
          {principles.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i * 0.06, 0.24)}>
              <div className="flex flex-col gap-4 border-b border-cube27-border-primary py-7 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-center gap-3 sm:w-[20rem] sm:shrink-0">
                  <span className="typography-heading text-[1.15rem] font-medium text-cube27-text-primary">
                    {p.name}
                  </span>
                  {p.active && (
                    <span className="size-1.5 rounded-full bg-cube27-accent-primary" />
                  )}
                </div>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * People / culture band — secondary surface, quiet typographic capability tiles
 * ------------------------------------------------------------------------- */

interface Capability {
  value: string;
  label: string;
}

const DEFAULT_CAPABILITIES: Capability[] = [
  {
    value: "Pune",
    label: "Global delivery hub, serving enterprises worldwide",
  },
  {
    value: "Cross-functional",
    label: "Marketing, data, AI, and engineering under one roof",
  },
  {
    value: "Embedded teams",
    label: "Operating as an extension of client organizations",
  },
  {
    value: "Outcome-owned",
    label: "Accountable from strategy through operations",
  },
];

interface PeopleBandProps {
  eyebrow?: string;
  headlineLines?: string[];
  body?: string;
  capabilities?: Capability[];
}

function PeopleBand({
  eyebrow = "Our people",
  headlineLines = ["The team that runs", "the operation."],
  body = "CUBE27 brings together specialists across marketing, analytics, AI, and engineering — a multidisciplinary team that plugs into your organization and operates as one.",
  capabilities = DEFAULT_CAPABILITIES,
}: PeopleBandProps) {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            {body}
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-cube27-text-primary transition-colors hover:text-cube27-accent-primary"
          >
            Join the team
            <ArrowRight className="size-4 text-cube27-accent-primary" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:pl-6">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.label} className="bg-cube27-background-primary p-6">
                <dt className="typography-heading text-[clamp(1.2rem,2.2vw,1.5rem)] font-medium tracking-[-0.015em] text-cube27-text-primary">
                  {c.value}
                </dt>
                <dd className="mt-1.5 text-[0.85rem] leading-snug text-cube27-text-secondary">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
