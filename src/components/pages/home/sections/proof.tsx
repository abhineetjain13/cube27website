import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId HomeProof
 * @cube27ComponentType section
 * @cube27ComponentPattern stats
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Quiet typographic proof plate on warm white: tracked eyebrow, a single sentence-case proof line in ink black, and a hairline-ruled row of factual stat tiles (no badges, no card chrome). Numbers are sourced from real company facts — keep them grounded when editing. Drop-in via `stats`.
 */
interface Stat {
  value: string;
  label: string;
}

/* Numeric stat values render in IBM Plex Mono (design-system rule: mono for the
   numeric part of stat tiles); word values ("Fortune 500", "Pune") keep the
   heading face. */
const NUMERIC_STAT = /^[\d<$]/;

const DEFAULT_STATS: Stat[] = [
  { value: "100+", label: "Brands served worldwide" },
  { value: "Fortune 500", label: "Clients across the US" },
  { value: "Pune", label: "Global delivery hub" },
  { value: "End-to-end", label: "Strategy to operations" },
];

interface ProofProps {
  eyebrow?: string;
  statement?: string;
  stats?: Stat[];
}

export function HomeProof({
  eyebrow = "Trusted by operators",
  statement = "For over a decade, 100+ brands — including Fortune 500 enterprises — have partnered with CUBE27 to engineer their intelligent operations.",
  stats = DEFAULT_STATS,
}: ProofProps) {
  return (
    <section className="border-t border-cube27-border-primary bg-cube27-neutral-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <p className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.01em] text-cube27-text-primary">
            {statement}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-cube27-background-primary p-6">
                <dt
                  className={cn(
                    "text-[clamp(1.4rem,2.5vw,1.85rem)] font-medium text-cube27-text-primary",
                    NUMERIC_STAT.test(s.value)
                      ? "font-mono"
                      : "typography-heading tracking-[-0.02em]",
                  )}
                >
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.85rem] text-cube27-text-secondary">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
