// src/utils/seo.js - Enhanced SEO helper functions
export const generateMetaTags = (
  title,
  description,
  keywords,
  options = {}
) => {
  // Update page title
  document.title = title;

  // Update meta description
  updateMetaTag("name", "description", description);

  // Update meta keywords
  updateMetaTag("name", "keywords", keywords);

  // Update Open Graph tags for social media
  updateMetaTag("property", "og:title", title);
  updateMetaTag("property", "og:description", description);
  updateMetaTag("property", "og:type", options.type || "website");
  updateMetaTag(
    "property",
    "og:url",
    options.canonical || window.location.href
  );
  updateMetaTag("property", "og:site_name", "Seven Smile Tour And Ticket");

  // Add Open Graph image
  if (options.image) {
    updateMetaTag("property", "og:image", options.image);
    updateMetaTag("property", "og:image:alt", options.imageAlt || title);
    updateMetaTag("property", "og:image:width", "1200");
    updateMetaTag("property", "og:image:height", "630");
  }

  // Update Twitter Card tags
  updateMetaTag("name", "twitter:card", "summary_large_image");
  updateMetaTag("name", "twitter:title", title);
  updateMetaTag("name", "twitter:description", description);
  if (options.image) {
    updateMetaTag("name", "twitter:image", options.image);
  }

  // Add additional meta tags for tours
  if (options.price) {
    updateMetaTag("name", "product:price:amount", options.price);
    updateMetaTag("name", "product:price:currency", "THB");
  }

  if (options.rating) {
    updateMetaTag("name", "rating", options.rating);
  }

  // Add geo tags for local SEO
  updateMetaTag("name", "geo.region", "TH");
  updateMetaTag("name", "geo.placename", options.location || "Thailand");

  // Add canonical URL
  updateCanonicalUrl(options.canonical || window.location.href);
};

// Helper function to update meta tags
const updateMetaTag = (attributeName, attributeValue, content) => {
  if (!content) return;

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

    // Clean up old structured data scripts (keep only latest 5)
    const allStructuredDataScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    if (allStructuredDataScripts.length > 5) {
      const oldestScripts = Array.from(allStructuredDataScripts).slice(0, -5);
      oldestScripts.forEach((script) => script.remove());
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }
};

// ✅ Enhanced Tour-specific structured data generator
export const generateTourStructuredData = (tour) => {
  if (!tour) return;

  const baseUrl = "https://www.sevensmiletour.com";
  const tourUrl = `${baseUrl}/tours/${tour.destination}/${tour.slug}`;

  // Main Tour Product Schema
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": tourUrl,
    name: tour.title,
    description: tour.description,
    url: tourUrl,
    image: tour.heroImage?.startsWith("http")
      ? tour.heroImage
      : `${baseUrl}${tour.heroImage}`,

    // Location information
    touristType: ["Family", "Couple", "Friends", "Solo"],
    itinerary: (tour.itinerary || []).map((item, index) => ({
      "@type": "Action",
      "@id": `${tourUrl}#itinerary-${index + 1}`,
      name: item.activity,
      description: item.description,
      startTime: item.time,
    })),

    // Provider information
    provider: {
      "@type": "TravelAgency",
      name: "Seven Smile Tour And Ticket",
      url: baseUrl,
      telephone: "+66-95-265-5516",
      email: "sevensmiletour@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "33 ถ.มหาราช ซอย 8",
        addressLocality: "กระบี่",
        addressRegion: "กระบี่",
        postalCode: "81000",
        addressCountry: "TH",
      },
    },

    // Offers and pricing
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 year from now
      seller: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
      },
    },

    // Duration
    duration: tour.duration,

    // Location served
    areaServed: {
      "@type": "Place",
      name: tour.location,
      addressCountry: "TH",
    },

    // Reviews and ratings
    ...(tour.rating &&
      tour.reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating,
          reviewCount: tour.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),

    // Gallery images
    ...(tour.gallery &&
      tour.gallery.length > 0 && {
        photo: tour.gallery.map((img) => ({
          "@type": "ImageObject",
          url: img.src?.startsWith("http") ? img.src : `${baseUrl}${img.src}`,
          caption: img.caption,
          description: img.alt,
        })),
      }),
  };

  generateStructuredData(tourSchema);

  // Additional Product Schema for e-commerce
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${tourUrl}#product`,
    name: tour.title,
    description: tour.description,
    image: tour.heroImage?.startsWith("http")
      ? tour.heroImage
      : `${baseUrl}${tour.heroImage}`,
    category: "Travel Package",
    brand: {
      "@type": "Brand",
      name: "Seven Smile Tour",
    },
    offers: {
      "@type": "Offer",
      url: tourUrl,
      priceCurrency: "THB",
      price: tour.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Seven Smile Tour And Ticket",
      },
    },
    ...(tour.rating &&
      tour.reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating,
          reviewCount: tour.reviewCount,
          bestRating: 5,
        },
      }),
  };

  generateStructuredData(productSchema);
};

// ✅ Generate review structured data
export const generateReviewSchema = (reviews, tour) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return;

  const baseUrl = "https://www.sevensmiletour.com";
  const tourUrl = `${baseUrl}/tours/${tour.destination}/${tour.slug}`;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${tourUrl}#reviews`,
    name: tour.title,
    review: reviews.map((review, index) => ({
      "@type": "Review",
      "@id": `${tourUrl}#review-${index + 1}`,
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.comment,
      datePublished: review.date,
    })),
  };

  generateStructuredData(reviewSchema);
};

// ✅ Generate FAQ schema for tour pages
export const generateTourFAQSchema = (faqs, tour) => {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://www.sevensmiletour.com/tours/${tour.destination}/${tour.slug}#faq`,
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `https://www.sevensmiletour.com/tours/${tour.destination}/${
        tour.slug
      }#faq-${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  generateStructuredData(faqSchema);
};

// ✅ Generate breadcrumb schema
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

// ✅ Generate local business schema for contact pages
export const generateLocalBusinessSchema = () => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://www.sevensmiletour.com#business",
    name: "Seven Smile Tour And Ticket",
    url: "https://www.sevensmiletour.com",
    logo: "https://www.sevensmiletour.com/images/logo.png",
    description:
      "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ โดยทีมงานมืออาชีพ",

    address: {
      "@type": "PostalAddress",
      streetAddress: "33 ถ.มหาราช ซอย 8",
      addressLocality: "กระบี่",
      addressRegion: "กระบี่",
      postalCode: "81000",
      addressCountry: "TH",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "8.0863",
      longitude: "98.9063",
    },

    telephone: ["+66-95-265-5516", "+66-82-253-6662", "+66-83-969-1300"],
    email: "sevensmiletour@gmail.com",

    openingHours: ["Mo-Sa 08:00-17:00"],
    priceRange: "$",

    areaServed: [
      { "@type": "Place", name: "ภูเก็ต" },
      { "@type": "Place", name: "กระบี่" },
      { "@type": "Place", name: "พังงา" },
      { "@type": "Place", name: "ประเทศไทย" },
      { "@type": "Place", name: "ต่างประเทศ" },
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
            description: "ทัวร์ในจังหวัดภูเก็ต เกาะราชา เจมส์บอนด์",
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

// ✅ Generate website schema for homepage
export const generateWebsiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.sevensmiletour.com#website",
    name: "Seven Smile Tour And Ticket",
    url: "https://www.sevensmiletour.com",
    description:
      "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ",

    publisher: {
      "@type": "Organization",
      "@id": "https://www.sevensmiletour.com#business",
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
  };

  generateStructuredData(websiteData);
};

// ✅ SEO-optimized image alt text generator
export const generateImageAlt = (tourName, location, imageType = "") => {
  const baseAlt = `${tourName} ${location}`;
  return imageType ? `${baseAlt} ${imageType}` : baseAlt;
};

// ✅ Clean up meta tags on page unload
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

// ✅ Add hreflang for multilingual SEO (future use)
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

// ✅ Generate robots meta tag
export const setRobotsTag = (content = "index, follow") => {
  updateMetaTag("name", "robots", content);
};

// ✅ Set viewport for mobile SEO
export const setViewport = (
  content = "width=device-width, initial-scale=1.0"
) => {
  updateMetaTag("name", "viewport", content);
};

// ✅ Add organization schema
export const generateOrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.sevensmiletour.com#organization",
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
      streetAddress: "33 ถ.มหาราช ซอย 8",
      addressLocality: "กระบี่",
      addressRegion: "กระบี่",
      postalCode: "81000",
      addressCountry: "TH",
    },
  };

  generateStructuredData(organizationData);
};
