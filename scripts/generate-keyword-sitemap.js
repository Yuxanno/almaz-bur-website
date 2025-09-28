import { writeFileSync } from "fs";
import { join } from "path";

// Get current date for lastmod
const currentDate = new Date().toISOString().split("T")[0];

// Define the base URL
const baseUrl = "https://almazbur.netlify.app";

// Define keyword-focused pages for better SEO
const keywordPages = [
  // Main keyword pages - HIGHEST PRIORITY
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/#home", priority: "1.0", changefreq: "daily" },
  { path: "/#about", priority: "0.9", changefreq: "weekly" },
  { path: "/#services", priority: "0.9", changefreq: "weekly" },
  { path: "/#order", priority: "0.9", changefreq: "weekly" },
  { path: "/#contacts", priority: "0.8", changefreq: "monthly" },

  // Primary brand keywords - HIGH PRIORITY
  { path: "/#almaz-bur", priority: "0.9", changefreq: "daily" },
  { path: "/#almazbur", priority: "0.9", changefreq: "daily" },
  { path: "/#bur", priority: "0.8", changefreq: "daily" },
  { path: "/#almaz", priority: "0.8", changefreq: "daily" },

  // Service keywords - HIGH PRIORITY
  { path: "/#diamond-drilling", priority: "0.8", changefreq: "daily" },
  { path: "/#concrete-cutting", priority: "0.8", changefreq: "daily" },
  { path: "/#beton-kesish", priority: "0.8", changefreq: "daily" },
  { path: "/#beton-teshish", priority: "0.8", changefreq: "daily" },
  { path: "/#teshish", priority: "0.8", changefreq: "daily" },
  { path: "/#burlash", priority: "0.8", changefreq: "daily" },
  { path: "/#utilities-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#demolition", priority: "0.7", changefreq: "weekly" },

  // Location-based keywords - HIGH PRIORITY
  { path: "/#tashkent", priority: "0.8", changefreq: "daily" },
  { path: "/#toshkent", priority: "0.8", changefreq: "daily" },
  { path: "/#gijduvon", priority: "0.9", changefreq: "daily" },
  { path: "/#gijduvon-burgulash", priority: "0.9", changefreq: "daily" },
  { path: "/#buxoro", priority: "0.8", changefreq: "weekly" },

  // Service-specific keywords - MEDIUM PRIORITY
  { path: "/#concrete-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#brick-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#water-pipe-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#electrical-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#sewer-drilling", priority: "0.7", changefreq: "weekly" },

  // Long-tail keywords for better ranking
  { path: "/#professional-drilling", priority: "0.8", changefreq: "weekly" },
  { path: "/#high-quality-drilling", priority: "0.8", changefreq: "weekly" },
  { path: "/#fast-drilling", priority: "0.7", changefreq: "weekly" },
  { path: "/#free-consultation", priority: "0.7", changefreq: "weekly" },
  { path: "/#15-years-experience", priority: "0.7", changefreq: "weekly" },
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
