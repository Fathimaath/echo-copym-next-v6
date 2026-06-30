import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossaryTerms } from '@/data/glossaryTerms';
import { fetchBlogPosts, transformApiPost } from '@/services/blogApi';
import GlossaryTermClient from '@/components/Glossary/GlossaryTermClient';
import { getSocialImageUrl } from '@/utils/seo';

// Helper function to find term by slug
const findTermBySlug = (slug: string) => {
  return glossaryTerms.find(term => term.slug === slug);
};

// Generate headings for scroll-spy
const generateHeadings = (term: any) => {
  return [
    { id: 'about', title: `About ${term.term}`, level: 2 },
    { id: 'key-characteristics', title: 'Key Characteristics', level: 2 },
    { id: 'why-it-matters', title: 'Why It Matters', level: 2 },
    { id: 'examples', title: 'Examples', level: 2 },
    { id: 'related-articles', title: 'Related Articles', level: 2 },
  ];
};

const getDetailedExplanation = (term: any) => `
  <p class="mb-6 text-base sm:text-lg text-gray-700 leading-relaxed">${term.description} This concept is fundamental to understanding blockchain technology and digital asset ecosystems.</p>

  <h3 id="key-characteristics" class="text-base sm:text-lg font-bold text-gray-900 mt-8 mb-4">Key Characteristics</h3>
  <ul class="space-y-3 mb-6">
    <li class="flex items-start gap-3">
      <span class="w-1.5 h-1.5 bg-[#15a36e] rounded-full mt-2 flex-shrink-0"></span>
      <span class="text-gray-700"><strong class="text-gray-900">Digital-first:</strong> Exists primarily in digital form on blockchain networks</span>
    </li>
    <li class="flex items-start gap-3">
      <span class="w-1.5 h-1.5 bg-[#15a36e] rounded-full mt-2 flex-shrink-0"></span>
      <span class="text-gray-700"><strong class="text-gray-900">Verifiable:</strong> Can be authenticated through cryptographic methods</span>
    </li>
    <li class="flex items-start gap-3">
      <span class="w-1.5 h-1.5 bg-[#15a36e] rounded-full mt-2 flex-shrink-0"></span>
      <span class="text-gray-700"><strong class="text-gray-900">Transferable:</strong> Can be sent, received, and traded across networks</span>
    </li>
    <li class="flex items-start gap-3">
      <span class="w-1.5 h-1.5 bg-[#15a36e] rounded-full mt-2 flex-shrink-0"></span>
      <span class="text-gray-700"><strong class="text-gray-900">Secure:</strong> Protected by cryptographic algorithms</span>
    </li>
  </ul>

  <p class="mb-6 text-gray-700 leading-relaxed">${term.term} plays a crucial role in the modern digital economy. As blockchain technology continues to evolve, concepts like ${term.term.toLowerCase()} have become increasingly important for investors, developers, and enthusiasts to understand.</p>

  <div class="blog-block blog-fast-fact">
    <div class="blog-fast-fact__label">Fast Fact</div>
    <p class="blog-fast-fact__value">The global market for ${term.term.toLowerCase()} is expected to grow significantly as blockchain adoption accelerates.</p>
  </div>

  <h3 id="why-it-matters" class="text-base sm:text-lg font-bold text-gray-900 mt-8 mb-4">Why It Matters</h3>
  <p class="mb-4 text-gray-700 leading-relaxed">Understanding ${term.term} is essential for anyone looking to participate in the digital asset ecosystem. Whether you're an investor, developer, or simply curious about blockchain technology, grasping this concept will help you navigate the space more effectively.</p>

  <div class="blog-block blog-quote">
    <p class="blog-quote__text">"${term.term} represents a paradigm shift in how we think about ownership, value transfer, and trust in the digital age."</p>
    <div class="blog-quote__author">
      <div class="blog-quote__avatar">C</div>
      <div>
        <div class="blog-quote__name">CopyM Team</div>
        <div class="blog-quote__role">Research & Education</div>
      </div>
    </div>
  </div>

  <p class="mb-6 text-gray-700 leading-relaxed">The practical applications of ${term.term} extend far beyond simple definitions. Real-world implementations are already transforming industries and creating new opportunities for innovation and growth.</p>

  <div class="blog-block blog-callout blog-callout--warning">
    <div class="blog-callout__title">Important Notice</div>
    <p class="blog-callout__text">Always verify regulatory requirements in your jurisdiction before engaging with ${term.term.toLowerCase()}.</p>
  </div>

  <p class="mb-6 text-gray-700 leading-relaxed">The table below outlines the key aspects of ${term.term.toLowerCase()} for better understanding.</p>

  <div class="blog-block blog-table">
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Type</td>
          <td>Digital Asset / Blockchain Concept</td>
        </tr>
        <tr>
          <td>Market Growth</td>
          <td>Projected significant growth through 2030</td>
        </tr>
        <tr>
          <td>Adoption</td>
          <td>Increasing among institutions and retail investors</td>
        </tr>
        <tr>
          <td>Regulatory Status</td>
          <td>Varies by jurisdiction</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="mb-6 text-gray-700 leading-relaxed">As the ecosystem continues to mature, staying informed about developments and best practices will be key to success in leveraging ${term.term.toLowerCase()} effectively.</p>

  <p class="mb-6 text-gray-700 leading-relaxed">For more detailed information and the latest updates, check out our related blog posts and research articles below.</p>

  <div class="blog-block blog-source">
    <div class="blog-source__title">Sources</div>
    <a href="/blog" class="blog-source__link">Understanding Real-World Asset Tokenization - CopyM Blog</a>
  </div>
`;

const getExamples = (term: any) => [
  { text: `${term.term} is commonly used in blockchain networks for recording transactions.`, id: 'example-1' },
  { text: `Many platforms now support ${term.term.toLowerCase()} as part of their core functionality.`, id: 'example-2' },
  { text: `Understanding ${term.term.toLowerCase()} helps investors make more informed decisions.`, id: 'example-3' }
];

const getRelatedTerms = (currentTerm: any) => {
  const sameLetter = glossaryTerms.filter((t: any) => t.letter === currentTerm.letter && t.slug !== currentTerm.slug);
  return sameLetter.slice(0, 6).map((t: any) => ({ term: t.term, slug: t.slug }));
};

const getRelatedArticles = async (term: any) => {
  const termLower = term.term.toLowerCase();
  const termWords = termLower.replace(/-/g, ' ').split(' ').filter((w: string) => w.length > 2);
  
  try {
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (!result?.data?.length) return [];
    const posts = result.data.map(transformApiPost);
    
    const scoredPosts = posts.map((post: any) => {
      let score = 0;
      const titleLower = post.title.toLowerCase();
      const excerptLower = post.excerpt.toLowerCase();
      
      termWords.forEach((word: string) => {
        if (titleLower.includes(word)) score += 10;
        if (excerptLower.includes(word)) score += 5;
      });
      
      if (titleLower.includes(termLower)) score += 20;
      if (excerptLower.includes(termLower)) score += 10;
      
      return { ...post, score };
    });
    
    const topPosts = scoredPosts
      .filter((post: any) => post.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3);
    
    if (topPosts.length < 3) {
      const usedIds = new Set(topPosts.map((p: any) => p.id));
      const recentPosts = posts
        .filter((p: any) => !usedIds.has(p.id))
        .slice(0, 3 - topPosts.length);
      topPosts.push(...recentPosts);
    }
    
    return topPosts.map((post: any) => ({
      title: post.title,
      slug: post.slug,
      category: post.category,
      image: post.image,
      description: post.excerpt,
      date: post.date,
      readTime: post.readTime
    }));
  } catch {
    return [];
  }
};

// Generate extended term data
const getExtendedTermData = async (term: any) => {
  if (!term) return null;

  return {
    ...term,
    pronunciation: `/${term.term.toLowerCase().replace(/ /g, '-')}/`,
    partOfSpeech: "noun",
    fullDefinition: term.description,
    detailedExplanation: getDetailedExplanation(term),
    examples: getExamples(term),
    relatedTerms: getRelatedTerms(term),
    relatedArticles: await getRelatedArticles(term),
    lastUpdated: "March 20, 2026",
    headings: generateHeadings(term)
  };
};

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = findTermBySlug(slug);

  if (!term) {
    return {
      title: 'Term Not Found',
      openGraph: {
        title: 'Term Not Found | CopyM Glossary',
        description: 'The requested glossary term could not be found.',
        url: `https://copym.xyz/glossary/${slug}/`,
        type: 'website',
        images: [{ url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png', width: 1200, height: 630, alt: 'CopyM Glossary' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Term Not Found | CopyM Glossary',
        description: 'The requested glossary term could not be found.',
        images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
      },
    };
  }

  const baseUrl = 'https://copym.xyz';

  return {
    title: `${term.term} - Definition & Explanation | CopyM Glossary`,
    description: term.description,
    alternates: {
      canonical: `${baseUrl}/glossary/${slug}/`,
    },
    robots: "index, follow",
    openGraph: {
      title: `${term.term} - Definition & Explanation | CopyM Glossary`,
      description: term.description,
      url: `${baseUrl}/glossary/${slug}/`,
      type: 'article',
      images: [
        {
          url: getSocialImageUrl('/assets/copym/png/Copym-01-1.png'),
          width: 1200,
          height: 630,
          alt: `${term.term} | CopyM Glossary`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${term.term} - Definition & Explanation | CopyM Glossary`,
      description: term.description,
      images: [getSocialImageUrl('/assets/copym/png/Copym-01-1.png')],
    },
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const foundTerm = findTermBySlug(slug);

  if (!foundTerm) {
    notFound();
  }

  const termData = await getExtendedTermData(foundTerm);

  // DefinedTerm Schema
  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": foundTerm.term,
    "description": foundTerm.description,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "CopyM Glossary",
      "url": "https://copym.xyz/glossary/"
    },
    "termCode": foundTerm.slug
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://copym.xyz/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Glossary",
        "item": "https://copym.xyz/glossary/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": foundTerm.term,
        "item": `https://copym.xyz/glossary/${slug}/`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* @ts-ignore */}
      <GlossaryTermClient termData={termData} slug={slug} />
    </>
  );
}
