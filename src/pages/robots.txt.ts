import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemap = site
    ? `Sitemap: ${new URL("sitemap-index.xml", site).href}`
    : "";
  const body = `User-agent: *
Allow: /

${sitemap}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
