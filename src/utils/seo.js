// SEO metadata utilities

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://copym.xyz';
const SITE_NAME = 'CopyM';
const DEFAULT_IMAGE = '/assets/copym/png/Copym-01-1.png';
const TWITTER_HANDLE = '@copym';

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
  const pageUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_IMAGE}`;

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
  author,
  reviewer,
  url,
  faqs,
}) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image ? [image] : [],
    "url": url,
    "datePublished": publishedDate ? new Date(publishedDate).toISOString() : new Date().toISOString(),
    "dateModified": modifiedDate ? new Date(modifiedDate).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": author || SITE_NAME,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (reviewer) {
    schemaOrg.reviewedBy = {
      "@type": "Organization",
      "name": reviewer,
    };
  }

  return schemaOrg;
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
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${SITE_URL}${item.path}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": DEFAULT_IMAGE,
    "description": "CopyM is the complete tokenization platform for real-world assets. Secure, compliant, and accessible digital asset marketplace.",
    "sameAs": [
      "https://twitter.com/copym",
      "https://linkedin.com/company/copym"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@copym.xyz"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Complete tokenization platform for real-world assets",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateWebPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
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
