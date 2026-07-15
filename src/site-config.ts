interface SiteConfig {
  name: string;
  description: string;
  // URL(s) of an existing sitemap to mirror at /sitemap.xml with hosts
  // rewritten to this site's domain. Empty to disable.
  sourceSitemapUrl: string | string[];
}

export const SITE_CONFIG: SiteConfig = {
  name: "CUBE27 — Engineering the Intelligent Enterprise",
  description:
    "CUBE27 builds digital marketing, ecommerce, machine learning, and business intelligence solutions for ambitious organizations. Trusted by more than 100 brands, including Fortune 500 companies.",
  sourceSitemapUrl: "",
};
