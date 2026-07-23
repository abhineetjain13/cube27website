import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Approach band for the homepage ("How we work"): the engagement journey as
 * three concrete steps — Understand, Build, Operate & Measure — beside an
 * engagement-overview mockup. Links forward to the services page.
 */
interface PlatformProps {
  eyebrow?: string;
  headlineLines?: string[];
  body?: string;
  linkLabel?: string;
  linkHref?: string;
}

export function HomePlatform({
  eyebrow = "How we work",
  headlineLines = ["A clear path from", "brief to outcome."],
  body = "Every engagement runs on the same disciplined loop: we dig into the brief, assemble a focused plan and team, then deliver and measure against the outcomes we agreed on.",
  linkLabel = "See our services",
  linkHref = "/services",
}: PlatformProps) {
  return (
    <section
      id="platform"
      className="bg-cube27-background-primary py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Monitor mockup */}
        <Reveal className="lg:col-span-7">
          <DashboardMockup />
        </Reveal>

        {/* Text stack */}
        <Reveal delay={0.1} className="lg:col-span-5 lg:pl-6">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-cube27-text-secondary">
            {body}
          </p>
          <a
            href={linkHref}
            className="mt-7 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-cube27-text-primary transition-colors hover:text-cube27-accent-primary"
          >
            {linkLabel}
            <ArrowRight className="size-4 text-cube27-accent-primary" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The three engagement phases as bars on a shared week axis: Understand runs
 * week 1, Build weeks 2–4, Operate & measure continues from week 5 with a
 * fading tail to signal ongoing delivery. Offsets/widths are percentages of
 * the track.
 */
const TIMELINE_PHASES = [
  {
    step: "01",
    label: "Understand",
    caption: "week 1",
    offset: "0%",
    width: "16%",
    barClass: "bg-cube27-accent-primary",
  },
  {
    step: "02",
    label: "Build",
    caption: "weeks 2–4",
    offset: "16%",
    width: "42%",
    barClass: "bg-cube27-accent-primary/70",
  },
  {
    step: "03",
    label: "Operate & measure",
    caption: "ongoing",
    offset: "58%",
    width: "42%",
    barClass:
      "bg-gradient-to-r from-cube27-accent-primary/45 to-cube27-accent-primary/10",
  },
];

function DashboardMockup() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Screen */}
      <div className="overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-neutral-light shadow-sm">
        <div className="flex items-center justify-between border-b border-cube27-border-primary px-4 py-2.5">
          <span className="text-[0.78rem] font-medium text-cube27-text-primary">
            Engagement overview
          </span>
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-cube27-neutral-secondary" />
            <span className="size-2 rounded-full bg-cube27-neutral-secondary" />
            <span className="size-2 rounded-full bg-cube27-accent-primary" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-px bg-cube27-border-primary">
          {/* Phase timeline: the three engagement steps as bars on a week ruler */}
          <div className="col-span-3 flex flex-col justify-center bg-cube27-neutral-light p-5 sm:p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-cube27-text-secondary">
              Typical timeline
            </p>
            <div className="mt-5 space-y-5">
              {TIMELINE_PHASES.map((phase) => (
                <div key={phase.step}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="typography-heading text-[0.8rem] font-semibold text-cube27-text-primary">
                      {phase.step} · {phase.label}
                    </span>
                    <span className="text-[0.68rem] text-cube27-text-secondary">
                      {phase.caption}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full rounded-full bg-cube27-neutral-secondary">
                    <div
                      className={`h-full rounded-full ${phase.barClass}`}
                      style={{ marginLeft: phase.offset, width: phase.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="mt-3 flex justify-between text-[0.6rem] uppercase tracking-[0.12em] text-cube27-text-secondary"
            >
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5+</span>
            </div>
          </div>
          {/* Stat rail */}
          <div className="col-span-2 space-y-4 bg-cube27-neutral-light p-4">
            <Stat label="Understand — discovery & brief" value="01" delta="week 1" />
            <Stat label="Build — plan & team assembled" value="02" delta="weeks 2–4" />
            <Stat label="Operate & measure — delivery" value="03" delta="ongoing" />
            <svg
              viewBox="0 0 120 32"
              fill="none"
              aria-hidden="true"
              className="h-8 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M2 26 L20 22 L38 25 L56 14 L74 18 L92 8 L118 4"
                stroke="var(--cube27-accent-primary)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Shelf */}
      <div className="mx-auto h-3 w-[78%] rounded-b-md bg-cube27-neutral-secondary" />
      <div className="mx-auto h-px w-[88%] bg-cube27-border-primary" />
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-wide text-cube27-text-secondary">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="typography-heading text-xl font-semibold text-cube27-text-primary">
          {value}
        </span>
        <span className="text-[0.65rem] text-cube27-text-secondary">
          {delta}
        </span>
      </div>
    </div>
  );
}
