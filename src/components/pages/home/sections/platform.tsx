import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Decision-support continuation band for the homepage.
 */
interface PlatformProps {
  eyebrow?: string;
  headlineLines?: string[];
  body?: string;
  linkLabel?: string;
  linkHref?: string;
}

export function HomePlatform({
  eyebrow = "The CUBE27 approach",
  headlineLines = ["From insight", "to action."],
  body = "We combine technical expertise with practical business context, helping teams connect data, marketing, and technology to the decisions that matter.",
  linkLabel = "Explore our solutions",
  linkHref = "#solutions",
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

function DashboardMockup() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Screen */}
      <div className="overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-neutral-light shadow-sm">
        <div className="flex items-center justify-between border-b border-cube27-border-primary px-4 py-2.5">
          <span className="text-[0.78rem] font-medium text-cube27-text-primary">
            Delivery overview
          </span>
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-cube27-neutral-secondary" />
            <span className="size-2 rounded-full bg-cube27-neutral-secondary" />
            <span className="size-2 rounded-full bg-cube27-accent-primary" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-px bg-cube27-border-primary">
          {/* Schematic map */}
          <div className="relative col-span-3 bg-cube27-neutral-secondary">
            <div
              className="h-full min-h-[15rem] w-full opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(var(--cube27-border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--cube27-border-primary) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <MapPin
              className="absolute left-[28%] top-[35%] size-5 text-cube27-accent-primary"
              fill="var(--cube27-accent-primary)"
              stroke="white"
            />
            <MapPin
              className="absolute left-[62%] top-[58%] size-5 text-cube27-accent-primary"
              fill="var(--cube27-accent-primary)"
              stroke="white"
            />
          </div>
          {/* Stat rail */}
          <div className="col-span-2 space-y-4 bg-cube27-neutral-light p-4">
            <Stat label="Brief understood" value="01" delta="clear" />
            <Stat label="Plan assembled" value="02" delta="focused" />
            <Stat label="Outcome measured" value="03" delta="visible" />
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
        <span className="font-mono text-xl font-medium text-cube27-text-primary">
          {value}
        </span>
        <span className="font-[var(--font-mono)] text-[0.65rem] text-cube27-text-secondary">
          {delta}
        </span>
      </div>
    </div>
  );
}
