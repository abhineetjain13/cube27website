import type { APIRoute } from "astro";

export const prerender = true;

// Answer-engine / AI crawlers we explicitly welcome for AEO visibility.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = site
    ? `Sitemap: ${new URL("sitemap-index.xml", site).href}`
    : "";

  const aiRules = AI_CRAWLERS.map(
    (bot) => `User-agent: ${bot}\nAllow: /\n`,
  ).join("\n");

  const body = `User-agent: *
Allow: /

${aiRules}
${sitemap}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
