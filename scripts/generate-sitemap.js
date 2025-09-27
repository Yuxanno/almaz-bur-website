import { writeFileSync } from "fs";
import { join } from "path";

// Get current date for lastmod
const currentDate = new Date().toISOString().split("T")[0];

// Define the base URL
const baseUrl = "https://almazbur.netlify.app";

// Define the pages with their priorities and change frequencies
const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/#about", priority: "0.8", changefreq: "monthly" },
  { path: "/#services", priority: "0.9", changefreq: "monthly" },
  { path: "/#order", priority: "0.9", changefreq: "monthly" },
  { path: "/#contacts", priority: "0.8", changefreq: "monthly" },
];

// Generate the sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

// Write sitemap to public directory
const sitemapPath = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(sitemapPath, sitemap);

console.log("✅ Sitemap generated successfully!");
console.log(`📁 Location: ${sitemapPath}`);
console.log(`📅 Last modified: ${currentDate}`);
