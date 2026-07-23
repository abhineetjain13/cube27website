import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

/**
 * Cube27 content collections — the single source of truth for page copy and
 * structured data (audit follow-up: content model). All entries are data
 * entries (frontmatter-only .md / .json); queries run in `.astro` page shells
 * or static endpoints ONLY — `astro:content` is server-only and must never be
 * imported from a `.tsx` island. Data reaches React pages as serializable
 * props. `site-config.ts` reads the same facts.json via a plain static import
 * so it stays client-safe.
 */

const site = defineCollection({
  loader: file("src/content/site/facts.json"),
  schema: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: z.object({
    name: z.string(),
    serviceType: z.string(),
    description: z.string(),
    /** Anchor id of the matching long-form section on /services. */
    anchorId: z.string(),
    order: z.number(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/roles" }),
  schema: z.object({
    title: z.string(),
    /** URL-safe slug used by the apply link and JobPosting url. */
    slug: z.string(),
    departmentTag: z.string(),
    employmentType: z.string(),
    /** JobPosting description prose. */
    description: z.string(),
    /** Metadata tiles; `icon` maps to a lucide component in careers/page.tsx. */
    metaItems: z.array(
      z.object({
        icon: z.enum(["mapPin", "clock", "laptop", "briefcase"]),
        label: z.string(),
        value: z.string(),
      }),
    ),
    about: z.string(),
    responsibilities: z.array(z.string()),
    listGroups: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      }),
    ),
    order: z.number(),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/leadership" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    /** Card eyebrow, e.g. "20+ Years Experience". */
    experience: z.string(),
    bio: z.string(),
    order: z.number(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    intro: z.string().optional(),
    challenge: z.string(),
    solutionIntro: z.string().optional(),
    solution: z.array(z.string()),
    impact: z.string().optional(),
    impactList: z.array(z.string()).optional(),
    results: z.array(z.object({ value: z.string(), label: z.string() })),
    keyOutcomesTitle: z.string().optional(),
    keyOutcomes: z.array(z.string()).default([]),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  site,
  services,
  faqs,
  roles,
  leadership,
  caseStudies,
};
