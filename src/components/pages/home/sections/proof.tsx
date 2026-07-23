import { Reveal } from "@/components/ui/reveal";
import { StatGrid, StatCell } from "@/components/ui/stat-grid";
import { isNumericStat } from "@/lib/utils";
import { COMPANY_FACTS } from "@/site-config";

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

const DEFAULT_STATS: Stat[] = [
  { value: COMPANY_FACTS.brands.value, label: COMPANY_FACTS.brands.label },
  { value: "Fortune 500", label: "Clients across the US" },
  { value: COMPANY_FACTS.hub.value, label: COMPANY_FACTS.hub.label },
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
          <StatGrid className="mt-12">
            {stats.map((s) => (
              <StatCell
                key={s.label}
                value={s.value}
                label={s.label}
                size="lg"
                mono={isNumericStat(s.value)}
              />
            ))}
          </StatGrid>
        </Reveal>
      </div>
    </section>
  );
}
