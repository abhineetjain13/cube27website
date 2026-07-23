import {
  Bot,
  Code2,
  ShoppingCart,
  Building2,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PageIntro } from "@/components/sections/page-intro";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Reveal } from "@/components/ui/reveal";
import { SplitExplorer, type SplitItem } from "@/components/ui/split-explorer";
import { SITE_CONFIG } from "@/site-config";
import type { FaqItem } from "@/components/seo-json";

const SERVICES_FAQ: readonly FaqItem[] = [
  {
    question: "What services does Cube27 offer?",
    answer:
      "Cube27 delivers four core service lines: Agentic AI & Process Automation, Digital Product Engineering, Salesforce & Enterprise Platforms (commerce), and GCC-as-a-Service. Engagements span strategy, build, and long-term operation as an embedded extension of your team.",
  },
  {
    question: "What is GCC-as-a-Service (GCCaaS)?",
    answer:
      "GCC-as-a-Service is our model for establishing and operating a dedicated Global Capability Center on your behalf. We handle location selection, legal setup, compliance, hiring, and day-to-day operations through Build-Operate-Transfer (BOT) or Build-Operate (BO) engagements, with dedicated teams aligned to your culture, processes, and architecture.",
  },
  {
    question: "Which engagement models does Cube27 support?",
    answer:
      "We work through Build-Operate-Transfer (BOT), Build-Operate (BO), embedded delivery pods, and managed-services teams. You buy outcomes and an extended team, not billable hours — with the option to transfer the operation fully in-house over time.",
  },
  {
    question: "Which commerce and Salesforce platforms does Cube27 implement?",
    answer:
      "We implement and rescue projects across Salesforce Commerce Cloud (Demandware), SAP Hybris, Adobe Commerce, Shopify Plus, BigCommerce, and custom headless architectures, integrated with CRM, ERP, and Agentforce for commerce and RevOps.",
  },
  {
    question: "How quickly can Cube27 stand up a dedicated team?",
    answer:
      "GCC operations typically reach operational startup in 90+ days, and we have scaled teams from 5 to 50+ specialists in under 120 days, with full data and IP protection and under 10% annual attrition.",
  },
  {
    question: "Where is Cube27 based?",
    answer:
      "Cube27 operates from Pune, India, with 150+ specialists providing 24/7 global coverage across NORAM, EMEA, APAC, and India.",
  },
];

export function ServicesPage() {
  const items: SplitItem[] = [
    {
      id: "ai",
      eyebrow: "AI & Automation",
      title: "Agentic AI & Process Automation",
      render: AiServiceDetail,
    },
    {
      id: "engineering",
      eyebrow: "Product Engineering",
      title: "Digital Product Engineering",
      render: EngineeringServiceDetail,
    },
    {
      id: "commerce",
      eyebrow: "Commerce & Platforms",
      title: "Salesforce & Enterprise Platforms",
      render: CommerceServiceDetail,
    },
    {
      id: "gcc",
      eyebrow: "Global Capability Centers",
      title: "GCC-as-a-Service",
      render: GccServiceDetail,
    },
  ];

  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <PageIntro
          headlineLines={["Engineering the", "intelligent enterprise."]}
          body="Rapid innovation through technology, and sustained operational and process capacity via GCC-as-a-Service."
          ctaLabel="Schedule a consultation"
          ctaHref="#contact"
          overlayEyebrow="CAPABILITY ENGINE"
          overlayTitle="Architect. Build. Scale."
          overlayDescription="High-fidelity engineering & GCC operations for global enterprises."
          overlayBadge="150+"
          overlayLinkHref="#capabilities"
        />

        <section
          id="capabilities"
          className="border-t border-cube27-border-primary py-20 lg:py-28"
        >
          <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
                What we do
              </p>
              <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                Four capabilities, one integrated partner.
              </h2>
            </Reveal>
          </div>
          <SplitExplorer items={items} ariaLabel="Service lines" />
        </section>

        {/* FAQ Section */}
        <Faq
          eyebrow="Questions"
          heading="Services & engagement FAQs"
          items={SERVICES_FAQ}
          schemaUrl={`${SITE_CONFIG.url}/services`}
        />

        {/* Contact Section */}
        <Contact
          eyebrow="Ready to Partner?"
          headlineLines={["Let's find the right", "engagement model."]}
          body="Whether you need a GCC, a Salesforce transformation, or an AI-powered product build — schedule a consultation with our Solutions Architect."
        />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Service detail bodies — rendered inside the SplitExplorer detail panel.
 * ------------------------------------------------------------------------- */

function ServiceHeader({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <>
      <div className="flex items-center gap-2 text-cube27-accent-primary">
        {icon}
        <p className="typography-eyebrow text-[0.7rem] uppercase">{eyebrow}</p>
      </div>
      <h3 className="typography-heading mt-4 text-balance text-[clamp(1.6rem,3vw,2.15rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
        {body}
      </p>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6">
      {icon}
      <h4 className="typography-heading mt-4 text-[1.1rem] font-medium text-cube27-text-primary">
        {title}
      </h4>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
        {children}
      </p>
    </div>
  );
}

function AiServiceDetail() {
  return (
    <div>
      <ServiceHeader
        icon={<Bot className="size-5" />}
        eyebrow="Agentic AI & Process Automation"
        title="Intelligent, autonomous systems that streamline enterprise workflows."
        body="Accelerate product delivery, reduce operational friction, and optimize digital commerce operations with autonomous AI models and structured workflows."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FeatureCard
          icon={<Zap className="size-6 text-cube27-accent-primary" />}
          title="Autonomous Commerce Flows"
        >
          Recover abandoned carts, route complex orders, and manage
          post-purchase exception workflows without human intervention.
        </FeatureCard>
        <FeatureCard
          icon={<Layers className="size-6 text-cube27-accent-primary" />}
          title="End-to-End Process Automation"
        >
          Automate repetitive or complex multi-step workflows across back-office
          operations, finance, and product lifecycles.
        </FeatureCard>
        <FeatureCard
          icon={<Sparkles className="size-6 text-cube27-accent-primary" />}
          title="Data-Driven AI Pods"
        >
          Dedicated pods for rapid development of customized AI solutions that
          surface actionable insights and drive process efficiency.
        </FeatureCard>
        <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/40 p-6">
          <p className="text-[0.95rem] italic leading-relaxed text-cube27-text-primary">
            &ldquo;Cube27&apos;s AI agents reduced our checkout friction by 22%
            in 60 days.&rdquo;
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-4">
        <StatCell value="40%" label="Ops Reduction" />
        <StatCell value="24/7" label="Autonomous Op" />
        <StatCell value="22%" label="Conversion Lift" />
        <StatCell value="60D" label="MVP Deployment" />
      </dl>

      <div className="mt-6 rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8">
        <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
          AI Offerings
        </h4>
        <ul className="mt-4 space-y-4">
          <OfferingItem title="AI Capability Assessment">
            Identify high-impact opportunities for automation and data-driven
            decision-making.
          </OfferingItem>
          <OfferingItem title="AI Ideation & Prototyping">
            Validate AI solutions for commerce, operations, and product
            workflows.
          </OfferingItem>
          <OfferingItem title="Embedded AI Teams">
            Dedicated teams that deploy, scale, and maintain AI-driven
            automation.
          </OfferingItem>
        </ul>
      </div>
    </div>
  );
}

function EngineeringServiceDetail() {
  return (
    <div>
      <ServiceHeader
        icon={<Code2 className="size-5" />}
        eyebrow="Digital Product Engineering"
        title="Product engineering built for digital growth."
        body="Digital products that power acquisition, conversion, and monetization across commerce, marketing, analytics, and partner platforms: product-led, data-driven, AI-accelerated, and built for scale."
      />

      <div className="mt-10 space-y-5">
        <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6">
          <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
            Product-First Engineering
          </h4>
          <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
            Digital initiatives designed as end-to-end products, with clear
            outcomes, user journeys, and analytics metrics embedded from
            inception.
          </p>
        </div>
        <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6">
          <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
            Growth-Native Architecture
          </h4>
          <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
            Products architected for acquisition, conversion, and global
            scalability, ensuring every feature drives measurable business
            impact.
          </p>
        </div>
        <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6">
          <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
            Partner-Integrated Execution
          </h4>
          <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
            Seamless integration with platforms like Feedonomics, providing
            cataloging, product feed optimization, and partner channel
            enablement.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8">
        <h4 className="typography-heading text-base font-medium uppercase text-cube27-accent-primary">
          Proprietary Frameworks & Tools
        </h4>
        <ul className="mt-4 space-y-3">
          <li className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-cube27-border-primary pb-3">
            <span className="font-mono text-[0.88rem] font-semibold text-cube27-text-primary">
              AQ360 Audit
            </span>
            <span className="text-[0.85rem] text-cube27-text-secondary">
              — Deep architecture quality audit
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-cube27-border-primary pb-3">
            <span className="font-mono text-[0.88rem] font-semibold text-cube27-text-primary">
              DSMM Framework
            </span>
            <span className="text-[0.85rem] text-cube27-text-secondary">
              — Digital System Maturity Model
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-1">
            <span className="font-mono text-[0.88rem] font-semibold text-cube27-text-primary">
              Fractional Ownership
            </span>
            <span className="text-[0.85rem] text-cube27-text-secondary">
              — Embedded lead architect engine
            </span>
          </li>
        </ul>

        <h4 className="typography-heading mt-8 text-base font-medium uppercase text-cube27-accent-primary">
          Delivery Squads
        </h4>
        <ul className="mt-3 space-y-2 text-[0.9rem] text-cube27-text-primary">
          <li>• Web & App Development Pods</li>
          <li>• Go-to-Market Product Labs</li>
          <li>• Data & Intelligence Centers</li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
          Enterprise Tech Stack
        </h4>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TechCell label="Backend" value="Node.js, Go, Python, PHP, .NET" />
          <TechCell
            label="Frontend"
            value="React.js, Next.js, Vue.js, React Native, Flutter"
          />
          <TechCell
            label="Cloud"
            value="AWS, Azure, GCP, Docker, Kubernetes, Serverless"
          />
          <TechCell
            label="Data"
            value="PostgreSQL, MongoDB, Snowflake, Redis, BigQuery"
          />
          <TechCell
            label="AI / Intelligence"
            value="GPT-5, Claude, Llama, LangChain, AutoGPT"
          />
        </div>
      </div>
    </div>
  );
}

function CommerceServiceDetail() {
  return (
    <div>
      <ServiceHeader
        icon={<ShoppingCart className="size-5" />}
        eyebrow="Salesforce & Enterprise Platforms"
        title="Enterprise Commerce & Platform Implementations."
        body="Implementations across Salesforce Commerce Cloud (Demandware), SAP Hybris, Adobe Commerce, Shopify Plus, BigCommerce, and custom headless architectures — fully integrated with CRM, ERP, and operations."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FeatureCard title="Composable & Headless">
          API-first builds that decouple storefronts from core systems for
          faster changes, multi-region scale, and omnichannel flexibility.
        </FeatureCard>
        <FeatureCard title="Go-to-Market Commerce Labs">
          Rapid product and feature launches with iterative A/B testing to
          optimize conversions and buyer experience.
        </FeatureCard>
        <FeatureCard title="Autonomous Order & Fulfillment">
          AI-assisted order routing, post-purchase exception workflows, and
          automated checkout recovery for seamless operations.
        </FeatureCard>
      </div>

      <div className="mt-6 rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
              Enterprise Revenue & Commerce Stack
            </h4>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
              Sales, Service, and Commerce Clouds architected as a single
              enterprise operating system — connecting demand generation,
              transactions, and post-purchase execution.
            </p>
            <div className="mt-6">
              <strong className="block text-[0.88rem] uppercase text-cube27-accent-primary">
                Engagement Models
              </strong>
              <ul className="mt-2 space-y-1.5 text-[0.9rem] text-cube27-text-primary">
                <li>• Implementation & Rescue</li>
                <li>• Custom Agentforce Development & Orchestration</li>
                <li>• Managed Services Pods</li>
              </ul>
            </div>
          </div>

          <div className="md:border-l md:border-cube27-border-primary md:pl-8">
            <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
              Agentforce for Commerce & RevOps
            </h4>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
              Autonomous agents that manage lead qualification, order routing,
              service exceptions, and post-purchase workflows across the
              enterprise revenue stack.
            </p>
            <div className="mt-6">
              <strong className="block text-[0.88rem] uppercase text-cube27-accent-primary">
                Commerce-to-ERP Execution
              </strong>
              <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
                Tightly coupled sales and commerce platforms integrated with
                SAP, Oracle, or custom ERPs to power quote-to-cash workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GccServiceDetail() {
  return (
    <div>
      <ServiceHeader
        icon={<Building2 className="size-5" />}
        eyebrow="Global Capability Centers"
        title="GCC-as-a-Service (GCCaaS)"
        body="Scale your engineering and operational capabilities without losing control. We establish and operate dedicated teams aligned to your culture, processes, and architecture — delivered through BOT (Build-Operate-Transfer) and BO (Build-Operate) engagement models."
      />

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary lg:grid-cols-4">
        <StatCell value="90+ Day" label="Operational Startup" large />
        <StatCell value="150+" label="Team Specialists" large />
        <StatCell value="<10%" label="Annual Attrition" large />
        <StatCell value="10%" label="YoY Efficiency Gain" large />
      </dl>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FeatureCard
          icon={<ShieldCheck className="size-6 text-cube27-accent-primary" />}
          title="Market Entry & Risk Management"
        >
          Location selection, legal setup, compliance, and strict IP protection
          in new geographies with zero operational drag.
        </FeatureCard>
        <FeatureCard
          icon={<Building2 className="size-6 text-cube27-accent-primary" />}
          title="Operating Model Alignment"
        >
          Seamless teams that mirror your engineering culture, communication
          cadence, and architectural standards.
        </FeatureCard>
        <FeatureCard
          icon={<Zap className="size-6 text-cube27-accent-primary" />}
          title="Innovation-Led CoEs"
        >
          Centers of Excellence designed to drive continuous process improvement
          and architectural evolution — not just basic delivery.
        </FeatureCard>
      </div>

      <div className="mt-6 rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/50 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
              Ideal for CTOs & CIOs Scaling Global Capabilities
            </h4>
            <p className="mt-1 max-w-2xl text-[0.92rem] text-cube27-text-secondary">
              Proven ability to scale teams from 5 to 50+ specialists in under
              120 days with full data and IP protection.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2 rounded-md bg-cube27-button-secondary-background px-6 py-3 text-sm font-medium text-cube27-button-secondary-text transition-colors hover:bg-cube27-accent-primary"
          >
            Schedule a consultation
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Small shared cells
 * ------------------------------------------------------------------------- */

function StatCell({
  value,
  label,
  large,
}: {
  value: string;
  label: string;
  large?: boolean;
}) {
  return (
    <div className="bg-cube27-background-primary p-5 sm:p-6">
      <dt
        className={
          large
            ? "font-mono text-2xl font-medium text-cube27-text-primary sm:text-3xl"
            : "font-mono text-2xl font-medium text-cube27-text-primary"
        }
      >
        {value}
      </dt>
      <dd className="mt-1 text-[0.78rem] text-cube27-text-secondary">
        {label}
      </dd>
    </div>
  );
}

function OfferingItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
      <div>
        <strong className="block text-[0.95rem] text-cube27-text-primary">
          {title}
        </strong>
        <span className="text-[0.88rem] text-cube27-text-secondary">
          {children}
        </span>
      </div>
    </li>
  );
}

function TechCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
      <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
        {label}
      </span>
      <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
        {value}
      </p>
    </div>
  );
}
