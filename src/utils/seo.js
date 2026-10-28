// SEO metadata utilities

export const SITE_URL = 'https://copym.xyz/';
export const SITE_NAME = 'CopyM';
export const DEFAULT_IMAGE = `${SITE_URL}assets/og/og-home.png`;
export const TWITTER_HANDLE = '@CopyM_RWA';

export const PAGE_OG_MAP = {
  '/': 'assets/og/og-home.png',
  '/tokenization/': 'assets/og/og-tokenization.png',
  '/white-label/': 'assets/og/og-white-label.png',
  '/solutions/real-estate/': 'assets/og/og-solutions-real-estate.png',
  '/solutions/carbon-credits/': 'assets/og/og-solutions-carbon-credits.png',
  '/security-compliance/': 'assets/og/og-security-compliance.png',
  '/marketplace/': 'assets/og/og-marketplace.png',
  '/about/': 'assets/og/og-about.png',
  '/signup/': 'assets/og/og-signup.png',
  '/contact/': 'assets/og/og-contact.png',
  '/blog/': 'assets/og/og-blog.png',
  '/glossary/': 'assets/og/og-glossary.png',
};

// Helper to convert .avif to .png for SEO/Social sharing as .avif is not widely supported in meta tags
export const getSocialImageUrl = (imageUrl, path = '') => {
  if (!imageUrl) {
    if (path && PAGE_OG_MAP[path]) {
      return `${SITE_URL}${PAGE_OG_MAP[path]}`;
    }
    return DEFAULT_IMAGE;
  }
  if (imageUrl.startsWith('http')) return imageUrl;
  
  // Convert relative path to absolute
  const absUrl = imageUrl.startsWith('/') ? `${SITE_URL}${imageUrl.substring(1)}` : `${SITE_URL}${imageUrl}`;
  
  // Swap .avif for .png if it's an internal asset
  if (absUrl.toLowerCase().endsWith('.avif')) {
    return absUrl.substring(0, absUrl.length - 5) + '.png';
  }
  
  return absUrl;
};

export function generatePageSEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  schema = null,
} = {}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Complete Tokenization Platform`;
  
  // Ensure path starts with / and ends with / if not empty
  let cleanPath = canonical || '';
  if (cleanPath && !cleanPath.endsWith('/')) {
    cleanPath = cleanPath + '/';
  }
  if (cleanPath && !cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  const pageUrl = `${SITE_URL}${cleanPath.replace(/^\//, '')}`;
  const defaultPageOg = PAGE_OG_MAP[cleanPath] ? `${SITE_URL}${PAGE_OG_MAP[cleanPath]}` : DEFAULT_IMAGE;
  const ogImage = image ? getSocialImageUrl(image, cleanPath) : defaultPageOg;

  return {
    title: pageTitle,
    meta: {
      description: description,
      canonical: pageUrl,
      robots: { content: 'index, follow' },
      og: {
        title: title || SITE_NAME,
        description: description,
        type: type,
        url: pageUrl,
        image: ogImage,
        siteName: SITE_NAME,
      },
      twitter: {
        card: ogImage ? 'summary_large_image' : 'summary',
        title: title || SITE_NAME,
        description: description,
        image: ogImage,
        handle: TWITTER_HANDLE,
      },
      article: publishedTime || modifiedTime ? {
        publishedTime,
        modifiedTime,
        author,
        section,
        tags,
      } : null,
    },
    schema,
  };
}

export function generateBlogPostSchema({
  title,
  description,
  image,
  publishedDate,
  modifiedDate,
  url,
  category,
}) {
  // Evergreen guides (e.g. /blog/news/gold-tokenization-guide/ or articles with "guide" in title/slug)
  // should use BlogPosting schema instead of NewsArticle even if filed under news category.
  const isGuide = (url && /guide/i.test(url)) || (title && /guide/i.test(title));
  const isNews = !isGuide && category?.toLowerCase().includes('news');
  const schemaType = isNews ? "NewsArticle" : "BlogPosting";
  
  const imageUrl = getSocialImageUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${url}#article`,
    "headline": title,
    "description": description,
    "image": [imageUrl],
    "datePublished": publishedDate ? new Date(publishedDate).toISOString() : new Date().toISOString(),
    "dateModified": modifiedDate ? new Date(modifiedDate).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "@id": "https://copym.xyz/#organization",
      "name": "CopyM"
    },
    "publisher": {
      "@id": "https://copym.xyz/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "isAccessibleForFree": true,
    "inLanguage": "en"
  };
}

export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const itemPath = item.path.endsWith('/') || item.path === '' ? item.path : `${item.path}/`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `${SITE_URL}${itemPath.replace(/^\//, '')}`,
      };
    }),
  };
}

export function generateServiceSchema({
  name,
  serviceType = 'Financial Technology Infrastructure',
  description,
  url,
  providerName = 'CopyM Limited',
  areaServed = 'Global',
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "serviceType": serviceType,
    "description": description,
    "provider": {
      "@type": "Organization",
      "@id": "https://copym.xyz/#organization",
      "name": providerName,
      "url": "https://copym.xyz/"
    },
    "url": url,
    "areaServed": areaServed
  };
}

export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": "https://copym.xyz/#organization",
    "name": "CopyM",
    "legalName": "CopyM Limited",
    "url": "https://copym.xyz/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://copym.xyz/assets/copym/png/Copym-01-1.png",
      "width": 1200,
      "height": 630
    },
    "identifier": "Masdar City Free Zone Licence No. MC 14225",
    "taxID": "MC 14225",
    "vatID": "MC 14225",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Smart Station, First Floor, Incubator Building, Masdar City",
      "addressLocality": "Abu Dhabi",
      "addressCountry": "AE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@copym.xyz",
      "contactType": "customer support"
    },
    "sameAs": [
      "https://x.com/CopyM_RWA",
      "https://linkedin.com/company/copym",
      "https://www.instagram.com/copym.xyz",
      "https://t.me/copym_rwa",
      "https://www.facebook.com/copym.xyz/"
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": "https://copym.xyz/#website",
    "name": "CopyM",
    "url": "https://copym.xyz/",
    "publisher": {
      "@id": "https://copym.xyz/#organization"
    }
  };
}

export function generateCoreSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebsiteSchema()
    ]
  };
}

export function generateWebPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@id": "https://copym.xyz/#website"
    },
    "about": {
      "@id": "https://copym.xyz/#organization"
    }
  };
}

export function generateCollectionPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url
  };
}

export function generateDefinedTermSchema({ term, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term,
    "description": description,
    "url": url
  };
}
