// scripts/seo-optimize.js
// สคริปต์สำหรับ optimize SEO ก่อน deploy

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO Configuration
const SEO_CONFIG = {
  siteName: "Seven Smile Tour And Ticket",
  siteUrl: "https://www.sevensmiletour.com",
  defaultTitle:
    "Seven Smile Tour And Ticket | ทัวร์กระบี่ ทัวร์ภูเก็ต ทัวร์พังงา",
  defaultDescription:
    "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ โดยทีมงานมืออาชีพ มากกว่า 10 ปี",
  defaultKeywords:
    "ทัวร์กระบี่, ทัวร์ภูเก็ต, ทัวร์พังงา, ทัวร์ต่างประเทศ, ตั๋วเครื่องบิน, Seven Smile Tour",
  author: "Seven Smile Tour And Ticket",
  contactPhone: "+66-95-265-5516",
  contactEmail: "sevensmiletour@gmail.com",
  socialMedia: {
    facebook: "https://www.facebook.com/sevensmiletravel",
    instagram: "https://www.instagram.com/sevensmiletour",
    line: "https://line.me/R/ti/p/@sevensmile",
  },
};

// Tour data for SEO optimization
const TOUR_DATA = {
  krabi: [
    {
      slug: "four-islands-speedboat",
      title: "ทัวร์ 4 เกาะ กระบี่ One Day Trip",
      description:
        "สำรวจความงามของ 4 เกาะสุดฮิตในกระบี่ ด้วยเรือสปีดโบ๊ทสุดหรู",
      price: 1290,
      keywords: "ทัวร์ 4 เกาะ, กระบี่, เกาะปอดะ, ทะเลแหวก, เรือสปีดโบ๊ท",
    },
    {
      slug: "phi-phi-speedboat",
      title: "ทัวร์เกาะพีพี อ่าวมาหยา เกาะไผ่",
      description: "เยี่ยมชมเกาะพีพีที่มีชื่อเสียงระดับโลก อ่าวมาหยาสวยงาม",
      price: 1590,
      keywords: "ทัวร์เกาะพีพี, อ่าวมาหยา, เกาะไผ่, กระบี่",
    },
    {
      slug: "hong-island-speedboat",
      title: "ทัวร์เกาะห้อง มาดาม คาเงียน",
      description: "เที่ยวเกาะห้องที่มีความงามแบบธรรมชาติ ลากูนสีเขียวใส",
      price: 1390,
      keywords: "ทัวร์เกาะห้อง, มาดาม, คาเงียน, กระบี่",
    },
  ],
  phuket: [
    {
      slug: "phi-phi-speedboat",
      title: "ทัวร์เกาะพีพี มาหยา ลันตา",
      description: "ทัวร์เกาะพีพีจากภูเก็ต เยี่ยมชมอ่าวมาหยาและเกาะลันตา",
      price: 1690,
      keywords: "ทัวร์เกาะพีพี, ภูเก็ต, อ่าวมาหยา, เกาะลันตา",
    },
    {
      slug: "james-bond-speedboat",
      title: "ทัวร์เกาะเจมส์บอนด์ เขาตะปู",
      description: "สำรวจเกาะเจมส์บอนด์ในภาพยนตร์ดัง พร้อมเขาตะปูสุดงาม",
      price: 1490,
      keywords: "ทัวร์เจมส์บอนด์, เขาตะปู, ภูเก็ต, อ่าวพังงา",
    },
  ],
  "phang-nga": [
    {
      slug: "james-bond-speedboat",
      title: "ทัวร์อ่าวพังงา เขาตะปู ถ้ำลอด",
      description: "ทัวร์อ่าวพังงาที่มีชื่อเสียง เกาะเจมส์บอนด์ เขาตะปู",
      price: 1390,
      keywords: "ทัวร์อ่าวพังงา, เขาตะปู, เจมส์บอนด์, ถ้ำลอด",
    },
    {
      slug: "similan-speedboat",
      title: "ทัวร์เกาะสิมิลัน One Day Trip",
      description: "ดำน้ำชมปะการังสวยงามที่เกาะสิมิลัน สวรรค์ใต้น้ำ",
      price: 3290,
      keywords: "ทัวร์เกาะสิมิลัน, ดำน้ำ, ปะการัง, พังงา",
    },
  ],
};

// Main SEO optimization function
function optimizeSEO() {
  console.log("🚀 Starting SEO optimization...");

  try {
    // 1. Generate robots.txt
    generateRobotsTxt();

    // 2. Generate sitemap.xml
    generateSitemap();

    // 3. Generate meta tags for each page
    generateMetaTags();

    // 4. Optimize images (placeholder)
    optimizeImages();

    // 5. Generate structured data
    generateStructuredData();

    console.log("✅ SEO optimization completed successfully!");
  } catch (error) {
    console.error("❌ SEO optimization failed:", error);
    process.exit(1);
  }
}

// Generate robots.txt
function generateRobotsTxt() {
  console.log("📝 Generating robots.txt...");

  const robotsContent = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow important files
Allow: /images/
Allow: /css/
Allow: /js/

# Sitemap location
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;

  const distPath = path.join(__dirname, "..", "dist");
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  fs.writeFileSync(path.join(distPath, "robots.txt"), robotsContent);
  console.log("✅ robots.txt generated");
}

// Generate sitemap.xml
function generateSitemap() {
  console.log("🗺️ Generating sitemap.xml...");

  const now = new Date().toISOString();

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Homepage
  sitemapContent += `
  <url>
    <loc>${SEO_CONFIG.siteUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Main pages
  const mainPages = [
    { path: "/krabi", priority: "0.9", changefreq: "weekly" },
    { path: "/phuket", priority: "0.9", changefreq: "weekly" },
    { path: "/phang-nga", priority: "0.9", changefreq: "weekly" },
    { path: "/international", priority: "0.8", changefreq: "monthly" },
    { path: "/group-tour", priority: "0.8", changefreq: "monthly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
  ];

  mainPages.forEach((page) => {
    sitemapContent += `
  <url>
    <loc>${SEO_CONFIG.siteUrl}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Tour detail pages
  Object.entries(TOUR_DATA).forEach(([destination, tours]) => {
    tours.forEach((tour) => {
      sitemapContent += `
  <url>
    <loc>${SEO_CONFIG.siteUrl}/tours/${destination}/${tour.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  });

  sitemapContent += `
</urlset>`;

  const distPath = path.join(__dirname, "..", "dist");
  fs.writeFileSync(path.join(distPath, "sitemap.xml"), sitemapContent);
  console.log("✅ sitemap.xml generated");
}

// Generate meta tags optimization
function generateMetaTags() {
  console.log("🏷️ Generating meta tags optimization...");

  const metaOptimizations = {
    homepage: {
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
      keywords: SEO_CONFIG.defaultKeywords,
      canonical: SEO_CONFIG.siteUrl,
    },

    krabi: {
      title: "ทัวร์กระบี่ 4 เกาะ เกาะพีพี ราคาดี | Seven Smile Tour",
      description:
        "ทัวร์กระบี่ 4 เกาะ เกาะพีพี เกาะห้อง ราคาเริ่มต้น 1,290 บาท พร้อมรถรับส่ง อาหาร ไกด์ ประกันภัย จองออนไลน์ได้ทันที",
      keywords:
        "ทัวร์กระบี่, ทัวร์ 4 เกาะ, ทัวร์เกาะพีพี, ทัวร์เกาะห้อง, กระบี่ one day trip",
      canonical: `${SEO_CONFIG.siteUrl}/krabi`,
    },

    phuket: {
      title: "ทัวร์ภูเก็ต เกาะพีพี เจมส์บอนด์ ราคาดี | Seven Smile Tour",
      description:
        "ทัวร์ภูเก็ต เกาะพีพี เจมส์บอนด์ เกาะราชา ราคาเริ่มต้น 1,490 บาท รวมรถรับส่ง อาหาร ไกด์ ประกันภัย",
      keywords:
        "ทัวร์ภูเก็ต, ทัวร์เกาะพีพี, ทัวร์เจมส์บอนด์, ทัวร์เกาะราชา, ภูเก็ต one day trip",
      canonical: `${SEO_CONFIG.siteUrl}/phuket`,
    },

    phangnga: {
      title: "ทัวร์พังงา เกาะสิมิลัน เจมส์บอนด์ ราคาดี | Seven Smile Tour",
      description:
        "ทัวร์พังงา เกาะสิมิลัน อ่าวพังงา เจมส์บอนด์ ราคาเริ่มต้น 1,390 บาท ดำน้ำชมปะการัง สวยงาม",
      keywords: "ทัวร์พังงา, ทัวร์เกาะสิมิลัน, ทัวร์อ่าวพังงา, ดำน้ำ, ปะการัง",
      canonical: `${SEO_CONFIG.siteUrl}/phang-nga`,
    },
  };

  // Save meta optimizations to JSON file for use in build process
  const metaPath = path.join(
    __dirname,
    "..",
    "src",
    "utils",
    "meta-optimizations.json"
  );
  fs.writeFileSync(metaPath, JSON.stringify(metaOptimizations, null, 2));
  console.log("✅ Meta tags optimization data generated");
}

// Optimize images (placeholder for future implementation)
function optimizeImages() {
  console.log("🖼️ Image optimization (placeholder)...");

  // TODO: Implement image optimization
  // - Compress images
  // - Generate WebP versions
  // - Add proper alt texts
  // - Lazy loading attributes

  console.log("✅ Image optimization completed");
}

// Generate structured data
function generateStructuredData() {
  console.log("📊 Generating structured data...");

  const structuredData = {
    organization: {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.defaultDescription,
      telephone: SEO_CONFIG.contactPhone,
      email: SEO_CONFIG.contactEmail,
      address: {
        "@type": "PostalAddress",
        streetAddress: "33 ถ.มหาราช ซอย 8",
        addressLocality: "กระบี่",
        addressRegion: "กระบี่",
        postalCode: "81000",
        addressCountry: "TH",
      },
      sameAs: Object.values(SEO_CONFIG.socialMedia),
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    tours: Object.entries(TOUR_DATA).flatMap(([destination, tours]) =>
      tours.map((tour) => ({
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tour.title,
        description: tour.description,
        url: `${SEO_CONFIG.siteUrl}/tours/${destination}/${tour.slug}`,
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "THB",
        },
        provider: {
          "@type": "TravelAgency",
          name: SEO_CONFIG.siteName,
        },
      }))
    ),
  };

  // Save structured data to JSON file
  const structuredDataPath = path.join(
    __dirname,
    "..",
    "src",
    "utils",
    "structured-data.json"
  );
  fs.writeFileSync(structuredDataPath, JSON.stringify(structuredData, null, 2));
  console.log("✅ Structured data generated");
}

// Generate performance optimization hints
function generatePerformanceHints() {
  console.log("⚡ Generating performance optimization hints...");

  const performanceHints = {
    critical_css: [
      "Load critical CSS inline",
      "Defer non-critical CSS",
      "Use CSS containment",
    ],
    javascript: [
      "Code splitting implemented",
      "Dynamic imports for routes",
      "Tree shaking enabled",
    ],
    images: [
      "Use WebP format when possible",
      "Implement lazy loading",
      "Responsive images with srcset",
    ],
    fonts: [
      "Use font-display: swap",
      "Preload critical fonts",
      "Subset fonts for Thai language",
      "Use system fonts as fallback",
    ],
    caching: [
      "Set proper cache headers",
      "Use service worker for caching",
      "CDN for static assets",
    ],
    compression: [
      "Enable GZIP compression",
      "Use Brotli compression",
      "Minify HTML, CSS, JS",
    ],
  };

  const hintsPath = path.join(
    __dirname,
    "..",
    "dist",
    "performance-hints.json"
  );
  fs.writeFileSync(hintsPath, JSON.stringify(performanceHints, null, 2));
  console.log("✅ Performance hints generated");
}

// Generate security headers
function generateSecurityConfig() {
  console.log("🔒 Generating security configuration...");

  const securityHeaders = {
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.sevensmiletour.com",
      "media-src 'self'",
      "object-src 'none'",
      "frame-src 'none'",
    ].join("; "),

    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };

  const securityPath = path.join(
    __dirname,
    "..",
    "dist",
    "security-headers.json"
  );
  fs.writeFileSync(securityPath, JSON.stringify(securityHeaders, null, 2));
  console.log("✅ Security configuration generated");
}

// Main execution
function main() {
  console.log("🎯 SEO & Performance Optimization for Production");
  console.log("================================================");

  optimizeSEO();
  generatePerformanceHints();
  generateSecurityConfig();

  console.log("\n🎉 All optimizations completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Upload dist folder to HostAtom");
  console.log("2. Place .htaccess in root directory");
  console.log("3. Test website functionality");
  console.log("4. Run SEO audit with Google PageSpeed Insights");
  console.log("5. Submit sitemap to Google Search Console");
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { optimizeSEO, generatePerformanceHints, generateSecurityConfig };
