import React from 'react';
import BlogContent from '@/components/Blog/BlogContent';
import { fetchBlogPosts, transformApiPost } from '@/services/blogApi';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

export const metadata = {
  title: 'Blog & Insights | CopyM',
  description: 'Stay updated with the latest news, insights, and educational content about digital asset tokenization, blockchain technology, and the future of finance.',
  alternates: {
    canonical: 'https://copym.xyz/blog',
  },
  openGraph: {
    title: 'Blog & Insights | CopyM',
    description: 'Stay updated with the latest news, insights, and educational content about digital asset tokenization, blockchain technology, and the future of finance.',
    url: 'https://copym.xyz/blog',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Blog & Insights | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | CopyM',
    description: 'Stay updated with the latest news, insights, and educational content about digital asset tokenization, blockchain technology, and the future of finance.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  }
};

// Revalidate this page every 60 seconds to ensure new admin posts appear automatically
export const revalidate = 60;

export default async function BlogPage() {
  let initialApiPosts: any[] = [];
  try {
    // @ts-ignore - Ignore JS module typing inference
    const result = (await fetchBlogPosts({ page: 1, limit: 100 })) as any;
    if (result && result.data && Array.isArray(result.data)) {
      initialApiPosts = result.data.map((post: any) => transformApiPost(post));
    }
  } catch (error) {
    console.warn('API not available during SSR, using static posts only');
  }

  const schemaData = generateWebPageSchema({
    name: 'Blog & Insights | CopyM',
    description: 'Stay updated with the latest news, insights, and educational content about digital asset tokenization, blockchain technology, and the future of finance.',
    url: 'https://copym.xyz/blog',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {/* @ts-ignore - Ignore JS component prop typing */}
      <BlogContent initialApiPosts={initialApiPosts} />
    </>
  );
}
