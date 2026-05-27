import sitemap from "../sitemap.js";

/**
 * Convert sitemap entries to XML format.
 */
function buildSitemapXml(entries) {
  const header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
  const urlsetOpen = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
  const urlsetClose = "</urlset>";
  const urlEntries = entries
    .map((e) => {
      const lastMod = e.lastModified instanceof Date ? e.lastModified.toISOString() : e.lastModified;
      const changeFreq = e.changeFrequency || "daily";
      const priority = e.priority !== undefined ? e.priority : 0.5;
      return `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>${changeFreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `${header}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
}

export async function GET() {
  const entries = await sitemap();
  const xml = buildSitemapXml(entries);
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
