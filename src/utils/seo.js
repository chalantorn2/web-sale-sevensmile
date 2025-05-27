// Enhanced SEO helper functions
export const generateMetaTags = (title, description, keywords) => {
  // Update page title
  document.title = title;

  // Update meta description
  updateMetaTag("name", "description", description);

  // Update meta keywords
  updateMetaTag("name", "keywords", keywords);

  // Update Open Graph tags for social media
  updateMetaTag("property", "og:title", title);
  updateMetaTag("property", "og:description", description);
  updateMetaTag("property", "og:type", "website");
  updateMetaTag("property", "og:url", window.location.href);
  updateMetaTag("property", "og:site_name", "Seven Smile Tour And Ticket");

  // Update Twitter Card tags
  updateMetaTag("name", "twitter:card", "summary_large_image");
  updateMetaTag("name", "twitter:title", title);
  updateMetaTag("name", "twitter:description", description);

  // Add canonical URL
  updateCanonicalUrl(window.location.href);
};

// Helper function to update meta tags
const updateMetaTag = (attributeName, attributeValue, content) => {
  let metaTag = document.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );
  if (metaTag) {
    metaTag.setAttribute("content", content);
  } else {
    metaTag = document.createElement("meta");
    metaTag.setAttribute(attributeName, attributeValue);
    metaTag.setAttribute("content", content);
    document.head.appendChild(metaTag);
  }
};

// Update canonical URL
const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", url);
  } else {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    document.head.appendChild(canonical);
  }
};

// Enhanced structured data with better error handling
export const generateStructuredData = (data) => {
  try {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data, null, 2);

    // Add unique ID to prevent duplicates
    const scriptId = `structured-data-${Date.now()}`;
    script.id = scriptId;

    document.head.appendChild(script);

    // Clean up old structured data scripts (keep only latest 3)
    const allStructuredDataScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    if (allStructuredDataScripts.length > 3) {
      const oldestScripts = Array.from(allStructuredDataScripts).slice(0, -3);
      oldestScripts.forEach((script) => script.remove());
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }
};

// Generate local business schema for contact pages
export const generateLocalBusinessSchema = () => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Seven Smile Tour And Ticket",
    url: "https://www.sevensmiletour.com",
    logo: "https://www.sevensmiletour.com/images/logo.png",
    description:
      "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ โดยทีมงานมืออาชีพ",
    address: {
      "@type": "PostalAddress",
      streetAddress: "83 ถ.พังงา",
      addressLocality: "ภูเก็ต",
      addressRegion: "ภูเก็ต",
      postalCode: "83000",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.8804911",
      longitude: "98.3883034",
    },
    telephone: ["+66-95-265-5516", "+66-82-253-6662"],
    email: "sevensmiletour@gmail.com",
    openingHours: ["Mo-Sa 08:00-17:00"],
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Place",
        name: "ภูเก็ต",
      },
      {
        "@type": "Place",
        name: "กระบี่",
      },
      {
        "@type": "Place",
        name: "พังงา",
      },
    ],
    sameAs: [
      "https://www.facebook.com/sevensmiletravel",
      "https://www.instagram.com/sevensmiletour",
      "https://line.me/R/ti/p/@sevensmile",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ทัวร์แพ็คเกจ",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ทัวร์กระบี่",
            description: "ทัวร์ในจังหวัดกระบี่ 4 เกาะ เกาะพีพี",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ทัวร์ภูเก็ต",
            description: "ทัวร์ในจังหวัดภูเก็ต เกาะพีพี เจมส์บอนด์",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ทัวร์พังงา",
            description: "ทัวร์ในจังหวัดพังงา เกาะสิมิลัน เกาะสุรินทร์",
          },
        },
      ],
    },
  };

  generateStructuredData(localBusinessData);
};

// Generate organization schema
export const generateOrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Seven Smile Tour And Ticket",
    url: "https://www.sevensmiletour.com",
    logo: "https://www.sevensmiletour.com/images/logo.png",
    description:
      "บริษัททัวร์ชั้นนำในภูเก็ต ให้บริการทัวร์ในประเทศ ทัวร์ต่างประเทศ และตั๋วเครื่องบิน",
    foundingDate: "2010",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+66-95-265-5516",
        contactType: "customer service",
        areaServed: "TH",
        availableLanguage: ["Thai", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+66-82-253-6662",
        contactType: "sales",
        areaServed: "TH",
        availableLanguage: ["Thai"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/sevensmiletravel",
      "https://www.instagram.com/sevensmiletour",
      "https://line.me/R/ti/p/@sevensmile",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "83 ถ.พังงา",
      addressLocality: "ภูเก็ต",
      addressRegion: "ภูเก็ต",
      postalCode: "83000",
      addressCountry: "TH",
    },
  };

  generateStructuredData(organizationData);
};

// Generate website schema for homepage
export const generateWebsiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Seven Smile Tour And Ticket",
    url: "https://www.sevensmiletour.com",
    description:
      "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ",
    publisher: {
      "@type": "Organization",
      name: "Seven Smile Tour And Ticket",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.sevensmiletour.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "ทัวร์ยอดนิยม",
      description: "รายการทัวร์ยอดนิยมของ Seven Smile Tour",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ทัวร์กระบี่ 4 เกาะ",
          url: "https://www.sevensmiletour.com/tours/krabi/four-islands-speedboat",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ทัวร์เกาะพีพี",
          url: "https://www.sevensmiletour.com/tours/krabi/phi-phi-speedboat",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "ทัวร์ 7 เกาะ ชมพระอาทิตย์ตก",
          url: "https://www.sevensmiletour.com/tours/krabi/sunset-bbq-tour",
        },
      ],
    },
  };

  generateStructuredData(websiteData);
};

// SEO-optimized image alt text generator
export const generateImageAlt = (tourName, location, imageType = "") => {
  const baseAlt = `${tourName} ${location}`;
  return imageType ? `${baseAlt} ${imageType}` : baseAlt;
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };

  generateStructuredData(breadcrumbData);
};

// Generate FAQ schema
export const generateFAQSchema = (faqs) => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  generateStructuredData(faqData);
};

// Clean up meta tags on page unload
export const cleanupSEO = () => {
  // Remove dynamic structured data
  const structuredDataScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  structuredDataScripts.forEach((script) => {
    if (script.id && script.id.startsWith("structured-data-")) {
      script.remove();
    }
  });
};

// Add hreflang for multilingual SEO (future use)
export const addHreflang = (languages) => {
  // Remove existing hreflang links
  const existingHreflang = document.querySelectorAll("link[hreflang]");
  existingHreflang.forEach((link) => link.remove());

  // Add new hreflang links
  languages.forEach((lang) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = lang.code;
    link.href = lang.url;
    document.head.appendChild(link);
  });
};

// Generate review schema for tour pages
export const generateReviewSchema = (reviews, aggregateRating) => {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: document.title,
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.comment,
      datePublished: review.date,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.rating,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  generateStructuredData(reviewData);
};
