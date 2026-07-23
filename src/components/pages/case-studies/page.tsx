import { Check, ArrowRight, Building, Award, Shield } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SplitExplorer, type SplitItem } from "@/components/ui/split-explorer";
import { StatGrid, StatCell } from "@/components/ui/stat-grid";
import { COMPANY_FACTS } from "@/site-config";

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  intro?: string;
  challenge: string;
  solutionIntro?: string;
  solution: string[];
  impact?: string;
  impactList?: string[];
  results: { value: string; label: string }[];
  keyOutcomesTitle?: string;
  keyOutcomes: string[];
  tags: string[];
}

/**
 * Interactive case-study explorer. Hydrated on its own by
 * `src/pages/success-stories.astro` — the page hero, the trusted-partnership
 * band, and the contact form are separate islands, so this ships only the
 * explorer's JS. `render` returns JSX, so the items array must be built here
 * (inside React) rather than passed across the Astro boundary.
 */
export function CaseStudiesExplorer({ studies }: { studies: CaseStudy[] }) {
  const items: SplitItem[] = studies.map((cs) => ({
    id: cs.id,
    eyebrow: cs.category,
    title: cs.title,
    render: () => <CaseStudyDetail study={cs} />,
  }));

  return (
    <section className="border-t border-cube27-border-primary py-20 lg:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Success stories
          </p>
          <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            Select an engagement to explore the outcome.
          </h2>
        </Reveal>
      </div>
      <SplitExplorer items={items} ariaLabel="Case studies" />
    </section>
  );
}

export function ClientsAndBrandsSection() {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            Trusted Partnership
          </p>
          <h2 className="typography-heading mt-3 text-balance text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold text-cube27-text-primary">
            Clients & Brands We Have Helped
          </h2>
          <p className="mt-3 max-w-xl text-[0.98rem] text-cube27-text-secondary">
            From Fortune 500 enterprises to fast-growing commerce partners, we
            deliver engineering rigor across North America, Europe, APAC, and
            India.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 text-center motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md">
              <Building className="size-8 text-cube27-accent-primary mb-2" />
              <span className="typography-heading text-lg font-medium text-cube27-text-primary">
                {COMPANY_FACTS.brands.value}
              </span>
              <span className="text-[0.82rem] text-cube27-text-secondary">
                Global Brands
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 text-center motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md">
              <Award className="size-8 text-cube27-accent-primary mb-2" />
              <span className="typography-heading text-lg font-medium text-cube27-text-primary">
                Fortune 500
              </span>
              <span className="text-[0.82rem] text-cube27-text-secondary">
                Enterprise Clients
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 text-center motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md">
              <Shield className="size-8 text-cube27-accent-primary mb-2" />
              <span className="typography-heading text-lg font-medium text-cube27-text-primary">
                {COMPANY_FACTS.sla.value}
              </span>
              <span className="text-[0.82rem] text-cube27-text-secondary">
                SLA Adherence
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-6 text-center motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md">
              <ArrowRight className="size-8 text-cube27-accent-primary mb-2" />
              <span className="typography-heading text-lg font-medium text-cube27-text-primary">
                {COMPANY_FACTS.coverage.value}
              </span>
              <span className="text-[0.82rem] text-cube27-text-secondary">
                Global Delivery Hub
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <div>
      <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
        {study.category}
      </p>
      <h3 className="typography-heading mt-4 text-balance text-[clamp(1.4rem,2.6vw,1.95rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-cube27-text-primary">
        {study.title}
      </h3>
      {study.intro && (
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-cube27-text-secondary">
          {study.intro}
        </p>
      )}

      {/* Results grid */}
      <StatGrid className="mt-10 sm:grid-cols-4">
        {study.results.map((r) => (
          <StatCell key={r.label} value={r.value} label={r.label} size="lg" />
        ))}
      </StatGrid>

      {/* Narrative columns */}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        <NarrativeGroup title="The challenge">
          <p className="text-[0.98rem] leading-relaxed text-cube27-text-secondary">
            {study.challenge}
          </p>
        </NarrativeGroup>

        <NarrativeGroup title="The solution">
          {study.solutionIntro && (
            <p className="mb-4 text-[0.98rem] leading-relaxed text-cube27-text-secondary">
              {study.solutionIntro}
            </p>
          )}
          <ul className="space-y-3">
            {study.solution.map((s) => (
              <li
                key={s}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-cube27-text-secondary"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cube27-accent-primary" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </NarrativeGroup>
      </div>

      {/* Impact / key outcomes */}
      {(study.impact ||
        (study.impactList && study.impactList.length > 0) ||
        study.keyOutcomes.length > 0) && (
        <div className="mt-10 border-t border-cube27-border-primary pt-8">
          <NarrativeGroup title={study.keyOutcomesTitle ?? "Impact"}>
            {study.impact && (
              <p className="max-w-3xl text-[0.98rem] leading-relaxed text-cube27-text-secondary">
                {study.impact}
              </p>
            )}
            {!study.impact &&
              study.impactList &&
              study.impactList.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.impactList.map((o) => (
                    <li
                      key={o}
                      className="flex gap-2.5 text-[0.95rem] leading-relaxed text-cube27-text-primary"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-cube27-accent-primary"
                        strokeWidth={2}
                      />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              )}
            {study.keyOutcomes.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {study.keyOutcomes.map((o) => (
                  <li
                    key={o}
                    className="flex gap-2.5 text-[0.95rem] leading-relaxed text-cube27-text-primary"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-cube27-accent-primary"
                      strokeWidth={2}
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            )}
          </NarrativeGroup>
        </div>
      )}

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {study.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-cube27-border-primary px-3 py-1 text-[0.78rem] text-cube27-text-secondary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function NarrativeGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="typography-eyebrow text-[0.7rem] uppercase text-cube27-text-primary">
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}
