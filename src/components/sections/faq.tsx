import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  SeoJson,
  createFaqPageSchema,
  type FaqItem,
} from "@/components/seo-json";

interface FaqProps {
  eyebrow?: string;
  heading?: string;
  items: readonly FaqItem[];
  /** Absolute URL of the page hosting this FAQ, used for the FAQPage schema. */
  schemaUrl?: string;
}

export function Faq({
  eyebrow = "FAQ",
  heading = "Frequently asked questions",
  items,
  schemaUrl,
}: FaqProps) {
  return (
    <section
      id="faq"
      className="border-b border-cube27-border-primary py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-4 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-cube27-border-primary border-y border-cube27-border-primary">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={0.03 * index}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <h3 className="typography-heading text-[1.05rem] font-medium text-cube27-text-primary">
                    {item.question}
                  </h3>
                  <Plus className="size-5 shrink-0 text-cube27-accent-primary transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <SeoJson
        schema={createFaqPageSchema(items, {
          name: heading,
          url: schemaUrl,
        })}
      />
    </section>
  );
}
