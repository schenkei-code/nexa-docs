import type { NextApiRequest, NextApiResponse } from "next";

const BASE = "https://docs.nexa.one";

const ROUTES = [
  "/",
  "/quickstart",
  "/auth",
  "/webhooks",
  "/sdks",
  "/sdks/javascript",
  "/sdks/python",
  "/sdks/go",
  "/examples",
  "/examples/create-campaign",
  "/examples/generate-image",
  "/examples/lookup-creator",
  "/examples/agent-mcp",
  "/changelog",
  "/api-ref/overview",
  "/api-ref/nexaads/overview",
  "/api-ref/nexaads/mcp-server",
  "/api-ref/nexaads/tools-meta",
  "/api-ref/nexaads/tools-google",
  "/api-ref/nexaads/campaigns",
  "/api-ref/nexaads/reports",
  "/api-ref/nexacreate/overview",
  "/api-ref/nexacreate/images",
  "/api-ref/nexacreate/videos",
  "/api-ref/nexacreate/jobs",
  "/api-ref/nexacreate/credits",
  "/api-ref/nexalytics/overview",
  "/api-ref/nexalytics/creators",
  "/api-ref/nexalytics/media-kit",
  "/api-ref/nexalytics/analytics",
  "/api-ref/nexavoize/overview",
  "/api-ref/nexavoize/synthesize",
  "/api-ref/nexavoize/voices",
  "/api-ref/nexavoize/conversations",
  "/api-ref/nexavoize/assistants",
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ROUTES.map(
      (r) =>
        `  <url><loc>${BASE}${r}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`,
    ).join("\n") +
    `\n</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(body);
}
