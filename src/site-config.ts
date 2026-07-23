import facts from "./content/site/facts.json";

interface OrgAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface SiteConfig {
  /** Long descriptive name used as the homepage <title> and default page title. */
  name: string;
  /** Short brand name appended to sub-page titles, e.g. "About | Cube27". */
  brand: string;
  /** Canonical production origin, no trailing slash. Matches astro.config `site`. */
  url: string;
  description: string;
  /** Canonical organization details, used to enrich Organization JSON-LD. */
  organization: {
    legalName: string;
    email: string;
    address: OrgAddress;
    /** Social / external profile URLs for schema.org `sameAs`. */
    sameAs: string[];
  };
  // URL(s) of an existing sitemap to mirror at /sitemap.xml with hosts
  // rewritten to this site's domain. Empty to disable.
  sourceSitemapUrl: string | string[];
}

export const SITE_CONFIG: SiteConfig = {
  name: "Cube27 — Engineering the Intelligent Enterprise",
  brand: "Cube27",
  url: "https://www.cube27.com",
  description:
    "Cube27 builds digital marketing, ecommerce, machine learning, and business intelligence solutions for ambitious organizations. Trusted by more than 100 brands, including Fortune 500 companies.",
  organization: {
    legalName: "Cube27 IT Pvt. Ltd.",
    email: "contact@cube27.com",
    address: {
      streetAddress: "Plot 12, Mulberry Garden 1, Magarpatta City, Hadapsar",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411013",
      addressCountry: "IN",
    },
    // Add live LinkedIn/X/etc. profile URLs here as they go live.
    sameAs: ["https://www.linkedin.com/company/cube27ltd"],
  },
  sourceSitemapUrl: "",
};

/**
 * Canonical company facts — the single source of truth for stat tiles,
 * proof grids, and generated documents (llms.txt). Sourced from
 * `./content/site/facts.json` via a plain static import so this module
 * stays safe to import from client bundles (React islands) as well as
 * server code; the same JSON backs the `site` content collection.
 * Do NOT source this from `astro:content` (server-only).
 * The JSON module import infers a literal-keyed type — a typo'd key is a
 * compile error, not a runtime `undefined`.
 */
export const COMPANY_FACTS = facts;
