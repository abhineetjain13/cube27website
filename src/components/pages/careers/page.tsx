import {
  MapPin,
  Briefcase,
  Clock,
  Laptop,
  ArrowRight,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { HomeHero } from "@/components/pages/home/sections/hero";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

export function CareersPage() {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <HomeHero
          headlineLines={["Build the future", "of enterprise", "AI with us."]}
          body="Explore open roles at Cube27. We are building next-generation AI-powered commerce infrastructure and intelligent platforms that help businesses become AI-agent ready."
          ctaLabel="View Openings"
          ctaHref="#openings"
          overlayEyebrow="CAREERS AT CUBE27"
          overlayTitle="Impact. Ownership. Scale."
          overlayDescription="Join a multidisciplinary team solving real-world enterprise AI problems."
          overlayBadge="Pune"
        />

        {/* Current Openings */}
        <section
          id="openings"
          className="border-t border-cube27-border-primary py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
                Join our team
              </p>
              <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
                Current Openings
              </h2>
            </Reveal>

            {/* Role 1: AI Engineer */}
            <div className="mt-12 space-y-16">
              <Reveal
                delay={0.05}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-10"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-cube27-accent-primary/10 px-3 py-1 text-[0.75rem] font-semibold text-cube27-accent-primary">
                      Engineering
                    </span>
                    <h3 className="typography-heading mt-2 text-2xl font-medium text-cube27-text-primary sm:text-3xl">
                      AI Engineer
                    </h3>
                  </div>
                  <a
                    href="/contact?role=AI+Engineer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-cube27-button-primary-background px-6 py-3 text-sm font-medium text-cube27-button-primary-text transition-colors hover:bg-cube27-accent-secondary"
                  >
                    Apply Now
                    <ArrowRight className="size-4" />
                  </a>
                </div>

                {/* Job Metadata */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-3/4">
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <MapPin className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Location: <strong>Pune</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Clock className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Experience: <strong>4–7 yrs</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Laptop className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Work Mode: <strong>Remote/Hybrid</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Briefcase className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Type: <strong>Full-time</strong>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                  <div>
                    <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                      About the Role
                    </h4>
                    <p className="mt-2">
                      We are building next-generation AI-powered commerce
                      infrastructure and intelligent platforms that help
                      businesses become AI-agent ready. Our products combine
                      LLMs, data pipelines, automation systems, agentic
                      workflows, and scalable cloud infrastructure to solve
                      real-world commerce and enterprise problems.
                    </p>
                  </div>

                  <div>
                    <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                      Key Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Design, develop, and deploy scalable AI/ML systems,
                          intelligent automation pipelines, and production-grade
                          AI services.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Architect and optimize LLM-powered applications,
                          including Retrieval-Augmented Generation (RAG)
                          systems, AI agents, multi-agent workflows, and
                          orchestration frameworks.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Develop robust backend services and APIs using Python,
                          Node.js, and TypeScript to support AI-driven
                          applications.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Integrate and manage enterprise AI models and
                          platforms such as OpenAI, Claude, Grok, Llama, and
                          vector database technologies.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Build and maintain data pipelines, embedding
                          workflows, semantic search capabilities,
                          recommendation engines, and knowledge retrieval
                          systems.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Collaborate cross-functionally with product,
                          engineering, and design teams to deliver scalable
                          AI-first products and features.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        Required Skills & Tech
                      </h4>
                      <ul className="mt-2 space-y-1 text-[0.9rem]">
                        <li>• 4–7 years software engineering experience</li>
                        <li>
                          • Strong proficiency in Python, Node.js, TypeScript
                        </li>
                        <li>
                          • REST APIs, GraphQL, PostgreSQL, MongoDB, Redis
                        </li>
                        <li>• Hands-on with OpenAI, Claude, Llama</li>
                        <li>
                          • RAG pipelines, vector databases (Pinecone, Weaviate,
                          etc.)
                        </li>
                        <li>
                          • Agent frameworks (LangChain, LangGraph, CrewAI)
                        </li>
                        <li>
                          • Cloud platforms (AWS/GCP/Azure) & Docker CI/CD
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        What We Offer
                      </h4>
                      <ul className="mt-2 space-y-1 text-[0.9rem]">
                        <li>• Work on cutting-edge AI products at scale</li>
                        <li>• High ownership & fast-paced environment</li>
                        <li>• Flexible work culture & remote/hybrid options</li>
                        <li>• Competitive salary and growth opportunities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 2: AI Research Intern */}
              <Reveal
                delay={0.1}
                className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 sm:p-10"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-cube27-accent-primary/10 px-3 py-1 text-[0.75rem] font-semibold text-cube27-accent-primary">
                      Research & Development
                    </span>
                    <h3 className="typography-heading mt-2 text-2xl font-medium text-cube27-text-primary sm:text-3xl">
                      AI Research Intern
                    </h3>
                  </div>
                  <a
                    href="/contact?role=AI+Research+Intern"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-cube27-button-primary-background px-6 py-3 text-sm font-medium text-cube27-button-primary-text transition-colors hover:bg-cube27-accent-secondary"
                  >
                    Apply Now
                    <ArrowRight className="size-4" />
                  </a>
                </div>

                {/* Job Metadata */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-3/4">
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <MapPin className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Location: <strong>Pune</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Clock className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Duration: <strong>3–6 months</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Laptop className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Work Mode: <strong>Remote/Hybrid</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]">
                    <Briefcase className="size-4 text-cube27-accent-primary shrink-0" />
                    <span>
                      Type: <strong>Internship</strong>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                  <div>
                    <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                      About the Role
                    </h4>
                    <p className="mt-2">
                      We are looking for curious and highly motivated AI
                      Research Interns to work on applied AI problems involving
                      LLMs, AI agents, semantic search, automation, and
                      intelligent commerce systems. You will work closely with
                      engineering and product teams to prototype, evaluate, and
                      improve AI-driven features.
                    </p>
                  </div>

                  <div>
                    <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                      Key Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Research and experiment with latest AI/LLM models and
                          frameworks.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Assist in building prototypes for AI agents, RAG
                          systems, and automation workflows.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Work on prompt engineering, model evaluation, and AI
                          experimentation.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Analyze AI outputs and improve quality, accuracy, and
                          reliability.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                        <span>
                          Support dataset preparation, embeddings generation,
                          and vector search workflows.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        Required & Preferred Skills
                      </h4>
                      <ul className="mt-2 space-y-1 text-[0.9rem]">
                        <li>
                          • Degree or pursuing degree in CS, AI, Data Science
                        </li>
                        <li>
                          • Basic understanding of machine learning and LLMs
                        </li>
                        <li>• Familiarity with Python & API fundamentals</li>
                        <li>
                          • Exposure to OpenAI, LangChain, Hugging Face, vector
                          DBs
                        </li>
                        <li>• Curiosity about AI research and emerging tech</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        What You&apos;ll Gain
                      </h4>
                      <ul className="mt-2 space-y-1 text-[0.9rem]">
                        <li>
                          • Hands-on experience building real-world AI systems
                        </li>
                        <li>• Mentorship from experienced AI engineers</li>
                        <li>• Exposure to modern AI tooling & architectures</li>
                        <li>
                          • Potential full-time opportunity based on performance
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Contact
          eyebrow="Apply Today"
          headlineLines={["Interested in joining", "our engineering team?"]}
          body="Send us your details and resume link below. We typically respond within 24 business hours."
        />
      </main>
      <Footer />
    </div>
  );
}
