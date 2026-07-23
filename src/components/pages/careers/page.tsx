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
import { PageIntro } from "@/components/sections/page-intro";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

/**
 * Careers page composition. Role cards render from the `roles` prop, sourced
 * from the `roles` content collection by `src/pages/careers.astro` — the
 * collection is the single source of truth for both these cards and the
 * JobPosting JSON-LD. Icon names in role metadata map to lucide components
 * here (components are not serializable across the island boundary).
 */
export interface CareerRole {
  title: string;
  slug: string;
  departmentTag: string;
  employmentType: string;
  description: string;
  metaItems: {
    icon: keyof typeof META_ICONS;
    label: string;
    value: string;
  }[];
  about: string;
  responsibilities: string[];
  listGroups: { title: string; items: string[] }[];
}

const META_ICONS = {
  mapPin: MapPin,
  clock: Clock,
  laptop: Laptop,
  briefcase: Briefcase,
} as const;

/* Card entrance delays preserved from the pre-collection layout. */
const ROLE_DELAYS = [0.06, 0.1];

export function CareersPage({ roles }: { roles: CareerRole[] }) {
  return (
    <div className="min-h-screen bg-cube27-background-primary text-cube27-text-primary">
      <Navbar />
      <main>
        <PageIntro
          headlineLines={["Build the future", "of enterprise", "AI with us."]}
          body="Explore open roles at Cube27. We are building next-generation AI-powered commerce infrastructure and intelligent platforms that help businesses become AI-agent ready."
          ctaLabel="View openings"
          ctaHref="#openings"
          overlayEyebrow="CAREERS AT CUBE27"
          overlayTitle="Impact. Ownership. Scale."
          overlayDescription="Join a multidisciplinary team solving real-world enterprise AI problems."
          overlayBadge="Pune"
          overlayLinkHref="#openings"
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

            <div className="mt-12 space-y-16">
              {roles.map((role, i) => (
                <Reveal
                  key={role.slug}
                  delay={ROLE_DELAYS[i] ?? 0.1}
                  className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md sm:p-10"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-cube27-accent-primary/10 px-3 py-1 text-[0.75rem] font-semibold text-cube27-accent-primary">
                        {role.departmentTag}
                      </span>
                      <h3 className="typography-heading mt-2 text-2xl font-medium text-cube27-text-primary sm:text-3xl">
                        {role.title}
                      </h3>
                    </div>
                    <a
                      href={`/contact?role=${role.slug}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-cube27-button-primary-background px-6 py-3 text-sm font-medium text-cube27-button-primary-text transition-colors hover:bg-cube27-accent-secondary"
                    >
                      Apply Now
                      <ArrowRight className="size-4" />
                    </a>
                  </div>

                  {/* Job Metadata */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-3/4">
                    {role.metaItems.map((meta) => {
                      const MetaIcon = META_ICONS[meta.icon];
                      return (
                        <div
                          key={meta.label}
                          className="flex items-center gap-2 rounded-lg border border-cube27-border-primary bg-cube27-background-primary p-3 text-[0.85rem]"
                        >
                          <MetaIcon className="size-4 text-cube27-accent-primary shrink-0" />
                          <span>
                            {meta.label}: <strong>{meta.value}</strong>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Details */}
                  <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        About the Role
                      </h4>
                      <p className="mt-2">{role.about}</p>
                    </div>

                    <div>
                      <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                        Key Responsibilities
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {role.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check className="mt-1 size-4 shrink-0 text-cube27-accent-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {role.listGroups.map((group) => (
                        <div key={group.title}>
                          <h4 className="typography-heading text-lg font-medium text-cube27-text-primary">
                            {group.title}
                          </h4>
                          <ul className="mt-2 space-y-1 text-[0.9rem]">
                            {group.items.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
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
