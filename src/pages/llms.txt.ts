import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { COMPANY_FACTS, SITE_CONFIG } from "@/site-config";

export const prerender = true;

/** "A" / "A and B" / "A, B, and C" — stays correct as collections grow past two entries. */
function joinAnd(items: string[]): string {
  if (items.length <= 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * /llms.txt — concise answer-engine manifest, generated from the content
 * collections + COMPANY_FACTS so wording and stats stay in sync with the
 * site. Section structure: About / Services / Work / Careers / Contact /
 * Policies. (/llms-full.txt carries the expanded corpus.)
 */
export const GET: APIRoute = async () => {
  const { organization, url } = SITE_CONFIG;
  const facts = COMPANY_FACTS;

  const [services, roles, leaders, studies, insights] = await Promise.all([
    getCollection("services"),
    getCollection("roles"),
    getCollection("leadership"),
    getCollection("caseStudies"),
    getCollection("insights"),
  ]);
  insights.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
  const byOrder = (
    a: { data: { order: number } },
    b: { data: { order: number } },
  ) => a.data.order - b.data.order;
  services.sort(byOrder);
  roles.sort(byOrder);
  leaders.sort(byOrder);
  studies.sort(byOrder);

  const address = organization.address;
  const roleList = joinAnd(
    roles.map((role) => {
      const duration = role.data.metaItems.find((m) => m.icon === "clock");
      return duration
        ? `${role.data.title} (${duration.value})`
        : role.data.title;
    }),
  );
  const leaderList = joinAnd(
    leaders.map((l) => `${l.data.name} (${l.data.role}, ${l.data.experience})`),
  );

  const body = `# Cube27

> Cube27 (${organization.legalName}) is a ${address.addressLocality}, India-based technology and operations partner that engineers the intelligent enterprise for ambitious organizations. Cube27 works across four capabilities: agentic AI and process automation, digital product engineering, Salesforce and enterprise platforms, and GCC-as-a-Service — building and operating dedicated Global Capability Centers through Build-Operate-Transfer (BOT) and Build-Operate (BO) engagements. Trusted by ${facts.brands.value} global brands, including Fortune 500 companies, with ${facts.headcount.value} specialists and ${facts.coverage.value} global coverage across NORAM, EMEA, APAC, and India.

## About

- [About Cube27](${url}/about): Company vision ("Not a dev shop. A GCC Partner."), leadership, infrastructure, and operating principles.
- Leadership: ${leaderList}.
- Model: Cube27 sells outcomes and embedded extended teams, not billable hours — operating as an extension of client organizations.

## Services

- [Services overview](${url}/services): Four core service lines.
${services.map((s) => `- ${s.data.name}: ${s.data.description}`).join("\n")}

## Work & proof

- [Success stories & case studies](${url}/success-stories): Real outcomes and measurable impact across client engagements.
${studies.map((s) => `- ${s.data.category}: ${s.data.title}.`).join("\n")}

## Insights

- [Insights](${url}/insights): Practical guidance on GCC setup, agentic AI, Salesforce, and enterprise delivery.
${insights.map((post) => `- [${post.data.title}](${url}/insights/${post.id}): ${post.data.description}`).join("\n")}

## Careers

- [Careers](${url}/careers): Open roles in ${facts.hub.value} — ${roleList}.

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
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
