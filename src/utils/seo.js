// Helper functions for SEO
export const generateMetaTags = (title, description, keywords) => {
  // Update page title
  document.title = title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  } else {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", description);
    document.head.appendChild(metaDescription);
  }

  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute("content", keywords);
  } else {
    metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    metaKeywords.setAttribute("content", keywords);
    document.head.appendChild(metaKeywords);
  }
};

export const generateStructuredData = (data) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);

  // Remove any existing structured data
  const existingScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingScripts.forEach((script) => script.remove());

  document.head.appendChild(script);
};
