import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { COMPANY_FACTS, SITE_CONFIG } from "@/site-config";

export const prerender = true;

/**
 * /llms-full.txt — the fuller self-contained corpus for answer engines:
 * complete company facts, leadership bios, service descriptions, the full
 * services FAQ, case-study narratives with results, and role details. All of
 * it is generated from the content collections + COMPANY_FACTS, so it cannot
 * drift from the site.
 */
export const GET: APIRoute = async () => {
  const { organization, url } = SITE_CONFIG;
  const facts = COMPANY_FACTS;

  const [services, faqs, roles, leaders, studies] = await Promise.all([
    getCollection("services"),
    getCollection("faqs"),
    getCollection("roles"),
    getCollection("leadership"),
    getCollection("caseStudies"),
  ]);
  const byOrder = (
    a: { data: { order: number } },
    b: { data: { order: number } },
  ) => a.data.order - b.data.order;
  services.sort(byOrder);
  faqs.sort(byOrder);
  roles.sort(byOrder);
  leaders.sort(byOrder);
  studies.sort(byOrder);

  const address = organization.address;

  const factsBlock = Object.values(facts)
    .map((fact) => `- ${fact.label}: ${fact.value}`)
    .join("\n");

  const leadersBlock = leaders
    .map((l) => `### ${l.data.name} — ${l.data.role}\n\n${l.data.bio}`)
    .join("\n\n");

  const servicesBlock = services
    .map(
      (s) =>
        `### ${s.data.name} (${s.data.serviceType})\n\n${s.data.description}`,
    )
    .join("\n\n");

  const faqBlock = faqs
    .map((f) => `Q: ${f.data.question}\nA: ${f.data.answer}`)
    .join("\n\n");

  const studiesBlock = studies
    .map((s) => {
      const results = s.data.results
        .map((r) => `${r.value} ${r.label}`)
        .join("; ");
      const solution = s.data.solution.map((item) => `- ${item}`).join("\n");
      const impact =
        s.data.impact ??
        (s.data.impactList ?? []).map((item) => `- ${item}`).join("\n");
      return `### ${s.data.title} (${s.data.category})

Challenge: ${s.data.challenge}

Solution:
${solution}

Impact:
${impact}

Results: ${results}`;
    })
    .join("\n\n");

  const rolesBlock = roles
    .map((role) => {
      const responsibilities = role.data.responsibilities
        .map((item) => `- ${item}`)
        .join("\n");
      const groups = role.data.listGroups
        .map(
          (group) =>
            `${group.title}:\n${group.items.map((item) => `- ${item}`).join("\n")}`,
        )
        .join("\n");
      return `### ${role.data.title} (${role.data.departmentTag})

${role.data.description}

${role.data.about}

Key responsibilities:
${responsibilities}
${groups}`;
    })
    .join("\n\n");

  const body = `# Cube27 — Full Corpus

> Cube27 (${organization.legalName}) is a ${address.addressLocality}, India-based technology and operations partner that engineers the intelligent enterprise for ambitious organizations. Cube27 builds and operates Global Capability Centers (GCCs) and delivers agentic AI, digital product engineering, enterprise commerce, Salesforce, data, and digital-marketing solutions. Trusted by ${facts.brands.value} global brands, including Fortune 500 companies, with ${facts.headcount.value} specialists and ${facts.coverage.value} global coverage across NORAM, EMEA, APAC, and India.

## Company facts

${factsBlock}

## Leadership

${leadersBlock}

## Services

${servicesBlock}

## Services FAQ

${faqBlock}

## Success stories

${studiesBlock}

## Open roles

${rolesBlock}

## Contact

- [Contact](${url}/contact): Start a consultation with a Solutions Architect.
- Email: ${organization.email} — LinkedIn: ${organization.sameAs[0]}
- Address: ${organization.legalName}, ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}, India.

## Policies

- [Privacy Policy](${url}/privacy-policy)
- [Terms of Service](${url}/terms-of-service)
- [CSR Policy](${url}/csr)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
