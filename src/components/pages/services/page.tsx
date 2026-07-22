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
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "@/components/pages/home/sections/hero";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Reveal } from "@/components/ui/reveal";
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
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <HomeHero
          headlineLines={["Engineering the", "intelligent enterprise."]}
          body="Rapid innovation through technology, and sustained operational and process capacity via GCC-as-a-Service."
          ctaLabel="Schedule a consultation"
          ctaHref="#contact"
          overlayEyebrow="CAPABILITY ENGINE"
          overlayTitle="Architect. Build. Scale."
          overlayDescription="High-fidelity engineering & GCC operations for global enterprises."
          overlayBadge="150+"
        />

        {/* Anchor Nav Bar */}
        <section className="sticky top-16 z-40 border-y border-cube27-border-primary bg-cube27-background-primary/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-start overflow-x-auto px-5 py-3.5 sm:px-8">
            <div className="flex items-center gap-6 text-[0.88rem] font-medium text-cube27-text-secondary">
              <span className="typography-eyebrow text-[0.68rem] uppercase text-cube27-accent-primary">
                Jump to:
              </span>
              <a
                href="#ai"
                className="whitespace-nowrap transition-colors hover:text-cube27-text-primary"
              >
                AI & Automation
              </a>
              <a
                href="#engineering"
                className="whitespace-nowrap transition-colors hover:text-cube27-text-primary"
              >
                Product Engineering
              </a>
              <a
                href="#commerce"
                className="whitespace-nowrap transition-colors hover:text-cube27-text-primary"
              >
                Commerce & Platforms
              </a>
              <a
                href="#gcc"
                className="whitespace-nowrap transition-colors hover:text-cube27-text-primary"
              >
                GCC-as-a-Service
              </a>
            </div>
          </div>
        </section>

        {/* Section 1: AI & Automation */}
        <section
          id="ai"
          className="border-b border-cube27-border-primary py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-2 text-cube27-accent-primary">
                <Bot className="size-5" />
                <p className="typography-eyebrow text-[0.7rem] uppercase">
                  Agentic AI & Process Automation
                </p>
              </div>
              <h2 className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                Intelligent, autonomous systems that streamline enterprise
                workflows.
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
                Accelerate product delivery, reduce operational friction, and
                optimize digital commerce operations with autonomous AI models
                and structured workflows.
              </p>
            </Reveal>

            {/* Core Features Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Reveal
                delay={0.05}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <Zap className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  Autonomous Commerce Flows
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Recover abandoned carts, route complex orders, and manage
                  post-purchase exception workflows without human intervention.
                </p>
              </Reveal>

              <Reveal
                delay={0.1}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <Layers className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  End-to-End Process Automation
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Automate repetitive or complex multi-step workflows across
                  back-office operations, finance, and product lifecycles.
                </p>
              </Reveal>

              <Reveal
                delay={0.15}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <Sparkles className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  Data-Driven AI Pods
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Dedicated pods for rapid development of customized AI
                  solutions that surface actionable insights and drive process
                  efficiency.
                </p>
              </Reveal>
            </div>

            {/* Stats & Testimonial Row */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <Reveal delay={0.1} className="lg:col-span-7">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary sm:grid-cols-4">
                  <div className="bg-cube27-background-primary p-5 text-center sm:p-6">
                    <dt className="typography-heading text-2xl font-medium text-cube27-text-primary">
                      40%
                    </dt>
                    <dd className="mt-1 text-[0.78rem] text-cube27-text-secondary">
                      Ops Reduction
                    </dd>
                  </div>
                  <div className="bg-cube27-background-primary p-5 text-center sm:p-6">
                    <dt className="typography-heading text-2xl font-medium text-cube27-text-primary">
                      24/7
                    </dt>
                    <dd className="mt-1 text-[0.78rem] text-cube27-text-secondary">
                      Autonomous Op
                    </dd>
                  </div>
                  <div className="bg-cube27-background-primary p-5 text-center sm:p-6">
                    <dt className="typography-heading text-2xl font-medium text-cube27-text-primary">
                      22%
                    </dt>
                    <dd className="mt-1 text-[0.78rem] text-cube27-text-secondary">
                      Conversion Lift
                    </dd>
                  </div>
                  <div className="bg-cube27-background-primary p-5 text-center sm:p-6">
                    <dt className="typography-heading text-2xl font-medium text-cube27-text-primary">
                      60D
                    </dt>
                    <dd className="mt-1 text-[0.78rem] text-cube27-text-secondary">
                      MVP Deployment
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/40 p-6">
                  <p className="text-[0.95rem] italic text-cube27-text-primary">
                    &ldquo;Cube27&apos;s AI agents reduced our checkout friction
                    by 22% in 60 days.&rdquo;
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15} className="lg:col-span-5">
                <div className="h-full rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8">
                  <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    AI Offerings
                  </h4>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="mt-1 size-4 text-cube27-accent-primary" />
                      <div>
                        <strong className="block text-[0.95rem] text-cube27-text-primary">
                          AI Capability Assessment
                        </strong>
                        <span className="text-[0.88rem] text-cube27-text-secondary">
                          Identify high-impact opportunities for automation and
                          data-driven decision-making.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-1 size-4 text-cube27-accent-primary" />
                      <div>
                        <strong className="block text-[0.95rem] text-cube27-text-primary">
                          AI Ideation & Prototyping
                        </strong>
                        <span className="text-[0.88rem] text-cube27-text-secondary">
                          Validate AI solutions for commerce, operations, and
                          product workflows.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-1 size-4 text-cube27-accent-primary" />
                      <div>
                        <strong className="block text-[0.95rem] text-cube27-text-primary">
                          Embedded AI Teams
                        </strong>
                        <span className="text-[0.88rem] text-cube27-text-secondary">
                          Dedicated teams that deploy, scale, and maintain
                          AI-driven automation.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 2: Digital Product Engineering */}
        <section
          id="engineering"
          className="border-b border-cube27-border-primary bg-cube27-neutral-secondary/20 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-2 text-cube27-accent-primary">
                <Code2 className="size-5" />
                <p className="typography-eyebrow text-[0.7rem] uppercase">
                  Digital Product Engineering
                </p>
              </div>
              <h2 className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                Product engineering built for digital growth.
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
                Digital products that power acquisition, conversion, and
                monetization across commerce, marketing, analytics, and partner
                platforms: product-led, data-driven, AI-accelerated, and built
                for scale.
              </p>
            </Reveal>

            {/* Pillars & Proprietary Tools */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <Reveal delay={0.05} className="space-y-6 lg:col-span-7">
                <div className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6">
                  <h3 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    Product-First Engineering
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
                    Digital initiatives designed as end-to-end products, with
                    clear outcomes, user journeys, and analytics metrics
                    embedded from inception.
                  </p>
                </div>
                <div className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6">
                  <h3 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    Growth-Native Architecture
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
                    Products architected for acquisition, conversion, and global
                    scalability, ensuring every feature drives measurable
                    business impact.
                  </p>
                </div>
                <div className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6">
                  <h3 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    Partner-Integrated Execution
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
                    Seamless integration with platforms like Feedonomics,
                    providing cataloging, product feed optimization, and partner
                    channel enablement.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="lg:col-span-5">
                <div className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8">
                  <h4 className="typography-heading text-base font-medium uppercase text-cube27-accent-primary">
                    Proprietary Frameworks & Tools
                  </h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center gap-3 border-b border-cube27-border-primary pb-3">
                      <span className="font-mono text-[0.88rem] font-semibold text-cube27-text-primary">
                        AQ360 Audit
                      </span>
                      <span className="text-[0.85rem] text-cube27-text-secondary">
                        — Deep architecture quality audit
                      </span>
                    </li>
                    <li className="flex items-center gap-3 border-b border-cube27-border-primary pb-3">
                      <span className="font-mono text-[0.88rem] font-semibold text-cube27-text-primary">
                        DSMM Framework
                      </span>
                      <span className="text-[0.85rem] text-cube27-text-secondary">
                        — Digital System Maturity Model
                      </span>
                    </li>
                    <li className="flex items-center gap-3 pb-1">
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
              </Reveal>
            </div>

            {/* Tech Stack Grid */}
            <Reveal delay={0.15} className="mt-12">
              <h3 className="typography-heading text-lg font-medium text-cube27-text-primary">
                Enterprise Tech Stack
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
                  <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
                    Backend
                  </span>
                  <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
                    Node.js, Go, Python, PHP, .NET
                  </p>
                </div>
                <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
                  <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
                    Frontend
                  </span>
                  <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
                    React.js, Next.js, Vue.js, React Native, Flutter
                  </p>
                </div>
                <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
                  <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
                    Cloud
                  </span>
                  <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
                    AWS, Azure, GCP, Docker, Kubernetes, Serverless
                  </p>
                </div>
                <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
                  <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
                    Data
                  </span>
                  <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
                    PostgreSQL, MongoDB, Snowflake, Redis, BigQuery
                  </p>
                </div>
                <div className="rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-5">
                  <span className="typography-eyebrow text-[0.65rem] uppercase text-cube27-accent-primary">
                    AI / Intelligence
                  </span>
                  <p className="mt-2 text-[0.9rem] font-medium text-cube27-text-primary">
                    GPT-5, Claude, Llama, LangChain, AutoGPT
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3: Enterprise Commerce & Platforms */}
        <section
          id="commerce"
          className="border-b border-cube27-border-primary py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-2 text-cube27-accent-primary">
                <ShoppingCart className="size-5" />
                <p className="typography-eyebrow text-[0.7rem] uppercase">
                  Salesforce & Enterprise Platforms
                </p>
              </div>
              <h2 className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                Enterprise Commerce & Platform Implementations.
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
                Implementations across Salesforce Commerce Cloud (Demandware),
                SAP Hybris, Adobe Commerce, Shopify Plus, BigCommerce, and
                custom headless architectures — fully integrated with CRM, ERP,
                and operations.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Reveal
                delay={0.05}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <h3 className="typography-heading text-[1.15rem] font-medium text-cube27-text-primary">
                  Composable & Headless
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  API-first builds that decouple storefronts from core systems
                  for faster changes, multi-region scale, and omnichannel
                  flexibility.
                </p>
              </Reveal>

              <Reveal
                delay={0.1}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <h3 className="typography-heading text-[1.15rem] font-medium text-cube27-text-primary">
                  Go-to-Market Commerce Labs
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Rapid product and feature launches with iterative A/B testing
                  to optimize conversions and buyer experience.
                </p>
              </Reveal>

              <Reveal
                delay={0.15}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-8"
              >
                <h3 className="typography-heading text-[1.15rem] font-medium text-cube27-text-primary">
                  Autonomous Order & Fulfillment
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  AI-assisted order routing, post-purchase exception workflows,
                  and automated checkout recovery for seamless operations.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6">
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

                <div className="lg:col-span-6 lg:border-l lg:border-cube27-border-primary lg:pl-8">
                  <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    Agentforce for Commerce & RevOps
                  </h4>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                    Autonomous agents that manage lead qualification, order
                    routing, service exceptions, and post-purchase workflows
                    across the enterprise revenue stack.
                  </p>
                  <div className="mt-6">
                    <strong className="block text-[0.88rem] uppercase text-cube27-accent-primary">
                      Commerce-to-ERP Execution
                    </strong>
                    <p className="mt-1 text-[0.9rem] text-cube27-text-secondary">
                      Tightly coupled sales and commerce platforms integrated
                      with SAP, Oracle, or custom ERPs to power quote-to-cash
                      workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: GCC-as-a-Service */}
        <section
          id="gcc"
          className="border-b border-cube27-border-primary bg-cube27-neutral-secondary/20 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-2 text-cube27-accent-primary">
                <Building2 className="size-5" />
                <p className="typography-eyebrow text-[0.7rem] uppercase">
                  Global Capability Centers
                </p>
              </div>
              <h2 className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                GCC-as-a-Service (GCCaaS)
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
                Scale your engineering and operational capabilities without
                losing control. We establish and operate dedicated teams aligned
                to your culture, processes, and architecture — delivered through
                BOT (Build-Operate-Transfer) and BO (Build-Operate) engagement
                models.
              </p>
            </Reveal>

            {/* Stats Row */}
            <Reveal delay={0.05} className="mt-12">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary lg:grid-cols-4">
                <div className="bg-cube27-background-primary p-6">
                  <dt className="typography-heading text-3xl font-medium text-cube27-text-primary">
                    90+ Day
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-cube27-text-secondary">
                    Operational Startup
                  </dd>
                </div>
                <div className="bg-cube27-background-primary p-6">
                  <dt className="typography-heading text-3xl font-medium text-cube27-text-primary">
                    150+
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-cube27-text-secondary">
                    Team Specialists
                  </dd>
                </div>
                <div className="bg-cube27-background-primary p-6">
                  <dt className="typography-heading text-3xl font-medium text-cube27-text-primary">
                    &lt;10%
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-cube27-text-secondary">
                    Annual Attrition
                  </dd>
                </div>
                <div className="bg-cube27-background-primary p-6">
                  <dt className="typography-heading text-3xl font-medium text-cube27-text-primary">
                    10%
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-cube27-text-secondary">
                    YoY Efficiency Gain
                  </dd>
                </div>
              </dl>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Reveal
                delay={0.1}
                className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8"
              >
                <ShieldCheck className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  Market Entry & Risk Management
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Location selection, legal setup, compliance, and strict IP
                  protection in new geographies with zero operational drag.
                </p>
              </Reveal>

              <Reveal
                delay={0.15}
                className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8"
              >
                <Building2 className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  Operating Model Alignment
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Seamless teams that mirror your engineering culture,
                  communication cadence, and architectural standards.
                </p>
              </Reveal>

              <Reveal
                delay={0.2}
                className="rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 sm:p-8"
              >
                <Zap className="size-6 text-cube27-accent-primary" />
                <h3 className="typography-heading mt-4 text-[1.15rem] font-medium text-cube27-text-primary">
                  Innovation-Led CoEs
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
                  Centers of Excellence designed to drive continuous process
                  improvement and architectural evolution — not just basic
                  delivery.
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={0.25}
              className="mt-12 rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/50 p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                    Ideal for CTOs & CIOs Scaling Global Capabilities
                  </h4>
                  <p className="mt-1 max-w-2xl text-[0.92rem] text-cube27-text-secondary">
                    Proven ability to scale teams from 5 to 50+ specialists in
                    under 120 days with full data and IP protection.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-cube27-button-secondary-background px-6 py-3 text-sm font-medium text-cube27-button-secondary-text transition-colors hover:bg-cube27-accent-primary"
                >
                  Start Your Journey
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>
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
