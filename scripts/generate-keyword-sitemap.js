import { writeFileSync } from "fs";
import { join } from "path";

// Get current date for lastmod
const currentDate = new Date().toISOString().split("T")[0];

// Define the base URL
const baseUrl = "https://almazbur.netlify.app";

// Define keyword-focused pages for better SEO
const keywordPages = [
  // Main keyword pages
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/#home", priority: "1.0", changefreq: "daily" },
  { path: "/#about", priority: "0.9", changefreq: "weekly" },
  { path: "/#services", priority: "0.9", changefreq: "weekly" },
  { path: "/#order", priority: "0.9", changefreq: "weekly" },
  { path: "/#contacts", priority: "0.8", changefreq: "monthly" },

  // Keyword-specific pages for "almaz bur"
  { path: "/#almaz-bur", priority: "0.9", changefreq: "weekly" },
  { path: "/#almazbur", priority: "0.9", changefreq: "weekly" },
  { path: "/#bur", priority: "0.8", changefreq: "weekly" },
  { path: "/#almaz", priority: "0.8", changefreq: "weekly" },

  // Keyword-specific pages for services
  { path: "/#diamond-drilling", priority: "0.8", changefreq: "weekly" },
  { path: "/#concrete-cutting", priority: "0.8", changefreq: "weekly" },
  { path: "/#utilities-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#demolition", priority: "0.7", changefreq: "weekly" },

  // Location-based keywords
  { path: "/#tashkent", priority: "0.8", changefreq: "weekly" },
  { path: "/#toshkent", priority: "0.8", changefreq: "weekly" },

  // Service-specific keywords
  { path: "/#concrete-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#brick-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#water-pipe-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#electrical-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#sewer-drilling", priority: "0.7", changefreq: "weekly" },
];

// Generate the sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${keywordPages
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

console.log("✅ Keyword-focused sitemap generated successfully!");
console.log(`📁 Location: ${sitemapPath}`);
console.log(`📅 Last modified: ${currentDate}`);
