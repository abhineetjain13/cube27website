import { ArrowRight, UserCheck } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "@/components/pages/home/sections/hero";
import { HomeProof } from "@/components/pages/home/sections/proof";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

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
          body="Cube27 is a Global Capability Center (GCC) partner bridging operational stability and high-end technical innovation."
          ctaLabel="Work with us"
          ctaHref="#contact"
          overlayEyebrow="GLOBAL DELIVERY"
          overlayTitle="People. Process. Pride."
          overlayDescription="Operating as a seamless extension from our Pune hub."
          overlayBadge="150+"
        />
        <CompanyStory />
        <LeadershipSection />
        <InfrastructureSection />
        <Principles />
        <HomeProof
          eyebrow="Our track record"
          statement="With over two decades of combined leadership experience in eCommerce, digital marketing, and enterprise technology, we deliver on our promises while innovating."
          stats={[
            { value: "150+", label: "Team Members" },
            { value: "95%", label: "Enterprise SLA" },
            { value: "$1B+", label: "Ad Spend Optimized" },
            { value: "20+", label: "Years Experience" },
          ]}
        />
        <PeopleBand />
        <Contact
          eyebrow="Partner with Cube27"
          headlineLines={["Let's engineer your", "intelligent enterprise."]}
          body="Whether you're looking to extend your team or join ours, we'd love to hear from you."
        />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Company story — Vision ("Not a dev shop. A GCC Partner.")
 * ------------------------------------------------------------------------- */

function CompanyStory() {
  return (
    <section
      id="company"
      className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Our Vision
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            Not a dev shop.
            <span className="block">A GCC Partner.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 lg:col-span-7 lg:pl-6 lg:pt-2">
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            Cube27 is not just a development company. We are a Global Capability
            Center (GCC) partner that bridges the gap between operational
            stability and high-end technical innovation.
          </p>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            We don&apos;t sell &ldquo;hours&rdquo; — we sell outcomes and
            extended teams. Our clients don&apos;t see us as vendors; they see
            us as an extension of their own organization, aligned with their
            culture, values, and business objectives.
          </p>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            With over two decades of combined leadership experience in
            eCommerce, digital marketing, and enterprise technology, we&apos;ve
            built a company that delivers on its promises while maintaining the
            flexibility to innovate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * Leadership Section — Meet Our Leaders
 * ------------------------------------------------------------------------- */

function LeadershipSection() {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Leadership
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            Meet Our Leaders
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal
            delay={0.05}
            className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-8"
          >
            <div className="flex items-center gap-3 text-cube27-accent-primary">
              <UserCheck className="size-6" />
              <span className="typography-eyebrow text-[0.75rem] uppercase font-semibold">
                20+ Years Experience
              </span>
            </div>
            <h3 className="typography-heading mt-4 text-2xl font-medium text-cube27-text-primary">
              Arpan Jain
            </h3>
            <p className="text-[0.88rem] font-medium text-cube27-text-secondary">
              Chief Executive Officer
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
              20+ years in eCommerce and Digital Marketing. B. Tech in Computer
              Science. Arpan brings deep technical expertise combined with
              business acumen, ensuring that Cube27 delivers solutions that are
              both technically excellent and commercially viable.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-8"
          >
            <div className="flex items-center gap-3 text-cube27-accent-primary">
              <UserCheck className="size-6" />
              <span className="typography-eyebrow text-[0.75rem] uppercase font-semibold">
                24+ Years Experience
              </span>
            </div>
            <h3 className="typography-heading mt-4 text-2xl font-medium text-cube27-text-primary">
              Amber Jain
            </h3>
            <p className="text-[0.88rem] font-medium text-cube27-text-secondary">
              Chief Technology Officer
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
              24+ years as a Digital Marketing Technologist. MS in Computer
              Science from USC. Amber&apos;s academic and practical rigor drives
              our technical excellence, ensuring every solution meets the
              highest standards of engineering quality.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * Infrastructure Section — Built for Enterprise Scale
 * ------------------------------------------------------------------------- */

function InfrastructureSection() {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Infrastructure
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            Built for Enterprise Scale
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-cube27-neutral-secondary/30 p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                150+ Specialists
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
                Engineers, architects, and consultants across multiple
                technology domains.
              </dd>
            </div>
            <div className="bg-cube27-neutral-secondary/30 p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                95% SLA Achievement
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
                Consistent delivery on enterprise support commitments.
              </dd>
            </div>
            <div className="bg-cube27-neutral-secondary/30 p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                $1B+ Ad Spend Managed
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
                Optimizations via our proprietary MarTech tools.
              </dd>
            </div>
            <div className="bg-cube27-neutral-secondary/30 p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                24/7 Global Coverage
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
                Support across NORAM, EMEA, APAC, and India.
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * Principles — calm hairline-ruled list
 * ------------------------------------------------------------------------- */

const DEFAULT_PRINCIPLES = [
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

function Principles() {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            How we work
          </p>
          <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            The principles behind every engagement.
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-cube27-border-primary">
          {DEFAULT_PRINCIPLES.map((p, i) => (
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
 * People / culture band
 * ------------------------------------------------------------------------- */

function PeopleBand() {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Life at Cube27
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            Join Our Team or Partner With Us
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            Whether you&apos;re looking to extend your team or join ours,
            we&apos;d love to hear from you.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-md bg-cube27-button-primary-background px-5 py-2.5 text-[0.9rem] font-medium text-cube27-button-primary-text transition-colors hover:bg-cube27-accent-secondary"
            >
              Partner with Us
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/careers"
              className="inline-flex items-center gap-1.5 rounded-md border border-cube27-border-primary bg-cube27-background-primary px-5 py-2.5 text-[0.9rem] font-medium text-cube27-text-primary transition-colors hover:border-cube27-accent-primary"
            >
              View Careers
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:pl-6">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-2">
            <div className="bg-cube27-background-primary p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                Pune
              </dt>
              <dd className="mt-1.5 text-[0.85rem] text-cube27-text-secondary">
                Global delivery hub, serving enterprises worldwide
              </dd>
            </div>
            <div className="bg-cube27-background-primary p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                Cross-functional
              </dt>
              <dd className="mt-1.5 text-[0.85rem] text-cube27-text-secondary">
                Marketing, data, AI, and engineering under one roof
              </dd>
            </div>
            <div className="bg-cube27-background-primary p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                Embedded teams
              </dt>
              <dd className="mt-1.5 text-[0.85rem] text-cube27-text-secondary">
                Operating as an extension of client organizations
              </dd>
            </div>
            <div className="bg-cube27-background-primary p-6">
              <dt className="typography-heading text-xl font-medium text-cube27-text-primary">
                Outcome-owned
              </dt>
              <dd className="mt-1.5 text-[0.85rem] text-cube27-text-secondary">
                Accountable from strategy through operations
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
