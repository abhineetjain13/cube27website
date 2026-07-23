import { ArrowRight, UserCheck } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PageIntro } from "@/components/sections/page-intro";
import { HomeProof } from "@/components/pages/home/sections/proof";
import { Contact } from "@/components/sections/contact";
import { LifeAtCube27 } from "@/components/sections/life-at-cube27";
import { Reveal } from "@/components/ui/reveal";
import { StatGrid, StatCell } from "@/components/ui/stat-grid";
import { COMPANY_FACTS } from "@/site-config";

/** Leadership profile, sourced from the `leadership` content collection. */
export interface Leader {
  name: string;
  role: string;
  experience: string;
  bio: string;
}

export function AboutPage({ leaders }: { leaders: Leader[] }) {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <PageIntro
          headlineLines={[
            "Built to engineer",
            "the intelligent",
            "enterprise.",
          ]}
          body="Cube27 is a Global Capability Center (GCC) partner bridging operational stability and high-end technical innovation."
          ctaLabel="Schedule a consultation"
          ctaHref="#contact"
          overlayEyebrow="GLOBAL DELIVERY"
          overlayTitle="People. Process. Pride."
          overlayDescription="Operating as a seamless extension from our Pune hub."
          overlayBadge="150+"
          overlayLinkHref="#company"
        />
        <CompanyStory />
        <LeadershipSection leaders={leaders} />
        <InfrastructureSection />
        <Principles />
        <HomeProof
          eyebrow="Our track record"
          statement="With over two decades of combined leadership experience in eCommerce, digital marketing, and enterprise technology, we deliver on our promises while innovating."
          stats={[
            {
              value: COMPANY_FACTS.headcount.value,
              label: COMPANY_FACTS.headcount.label,
            },
            { value: COMPANY_FACTS.sla.value, label: COMPANY_FACTS.sla.label },
            {
              value: COMPANY_FACTS.adSpend.value,
              label: COMPANY_FACTS.adSpend.label,
            },
            {
              value: COMPANY_FACTS.experience.value,
              label: COMPANY_FACTS.experience.label,
            },
          ]}
        />
        <PeopleBand />
        <LifeAtCube27 />
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
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
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

/* Card entrance delays preserved from the pre-collection layout. */
const LEADER_DELAYS = [0.06, 0.1];

function LeadershipSection({ leaders }: { leaders: Leader[] }) {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Leadership
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            Meet Our Leaders
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {leaders.map((leader, i) => (
            <Reveal
              key={leader.name}
              delay={LEADER_DELAYS[i] ?? 0.1}
              className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-8 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-cube27-accent-primary">
                <UserCheck className="size-6" />
                <span className="typography-eyebrow text-[0.7rem] uppercase">
                  {leader.experience}
                </span>
              </div>
              <h3 className="typography-heading mt-4 text-2xl font-medium text-cube27-text-primary">
                {leader.name}
              </h3>
              <p className="text-[0.88rem] font-medium text-cube27-text-secondary">
                {leader.role}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                {leader.bio}
              </p>
            </Reveal>
          ))}
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
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            Built for Enterprise Scale
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <StatGrid className="grid-cols-1 sm:grid-cols-2">
            <StatCell
              value={COMPANY_FACTS.headcount.value}
              label={COMPANY_FACTS.headcount.label}
              description="Engineers, architects, and consultants across multiple technology domains."
              className="bg-cube27-neutral-secondary/30"
            />
            <StatCell
              value={COMPANY_FACTS.sla.value}
              label={COMPANY_FACTS.sla.label}
              description="Consistent delivery on enterprise support commitments."
              className="bg-cube27-neutral-secondary/30"
            />
            <StatCell
              value={COMPANY_FACTS.adSpend.value}
              label={COMPANY_FACTS.adSpend.label}
              description="Optimizations via our proprietary MarTech tools."
              className="bg-cube27-neutral-secondary/30"
            />
            <StatCell
              value={COMPANY_FACTS.coverage.value}
              label={COMPANY_FACTS.coverage.label}
              description="Support across NORAM, EMEA, APAC, and India."
              className="bg-cube27-neutral-secondary/30"
            />
          </StatGrid>
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
          <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
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
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
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
              Schedule a consultation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/careers"
              className="inline-flex items-center gap-1.5 rounded-md border border-cube27-border-primary bg-cube27-background-primary px-5 py-2.5 text-[0.9rem] font-medium text-cube27-text-primary transition-colors hover:border-cube27-accent-primary"
            >
              View openings
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:pl-6">
          <StatGrid columns={2}>
            <StatCell
              value="Pune"
              label="Global delivery hub, serving enterprises worldwide"
              mono={false}
            />
            <StatCell
              value="Cross-functional"
              label="Marketing, data, AI, and engineering under one roof"
              mono={false}
            />
            <StatCell
              value="Embedded teams"
              label="Operating as an extension of client organizations"
              mono={false}
            />
            <StatCell
              value="Outcome-owned"
              label="Accountable from strategy through operations"
              mono={false}
            />
          </StatGrid>
        </Reveal>
      </div>
    </section>
  );
}
