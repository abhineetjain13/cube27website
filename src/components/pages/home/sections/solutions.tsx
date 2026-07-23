import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Megaphone,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Services as a calm, conversion-oriented list on a warm white canvas.
 */
interface Solution {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
}

const DEFAULT_SOLUTIONS: Solution[] = [
  {
    icon: Megaphone,
    name: "Digital marketing solutions",
    description:
      "Tracking, analytics, landing pages, feed optimization, CRO, personalization, and experimentation that improve outreach.",
    href: "#contact",
  },
  {
    icon: ShoppingCart,
    name: "Ecommerce solutions",
    description:
      "End-to-end enterprise and open-source ecommerce delivery from experienced developers, designers, and marketing specialists.",
    href: "#contact",
  },
  {
    icon: BarChart3,
    name: "Business intelligence and analytics",
    description:
      "Large-scale BI and reporting platforms that surface insight at every stage and support better decisions.",
    href: "#contact",
  },
  {
    icon: Sparkles,
    name: "AI & agentic commerce",
    description:
      "Autonomous AI agents and intelligent workflows engineered to automate operations, personalize journeys, and power modern commerce.",
    href: "#contact",
  },
];

interface SolutionsProps {
  eyebrow?: string;
  headlineLines?: string[];
  solutions?: Solution[];
}

export function HomeSolutions({
  eyebrow = "Solutions",
  headlineLines = ["One partner for the", "intelligent enterprise."],
  solutions = DEFAULT_SOLUTIONS,
}: SolutionsProps) {
  return (
    <section
      id="solutions"
      className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 max-w-2xl text-balance text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-cube27-border-primary">
          {solutions.map((s, i) => (
            <Reveal key={s.name} delay={Math.min(i * 0.06, 0.24)}>
              <a
                href={s.href}
                className="group flex flex-col gap-4 border-b border-cube27-border-primary py-7 transition-colors hover:bg-cube27-neutral-secondary/50 sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="flex items-center gap-4 sm:w-[20rem] sm:shrink-0">
                  <s.icon
                    className="size-5 shrink-0 text-cube27-text-primary"
                    strokeWidth={1.5}
                  />
                  <span className="typography-heading text-[1.15rem] font-medium text-cube27-text-primary">
                    {s.name}
                  </span>
                </div>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-cube27-text-primary sm:shrink-0">
                  See how it works
                  <ArrowRight className="size-4 text-cube27-accent-primary transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
