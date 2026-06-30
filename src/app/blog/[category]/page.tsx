import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { fetchBlogPosts, transformApiPost } from '@/services/blogApi';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

const BlogContent = dynamic(() => import('@/components/Blog/BlogContent'));

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  const slugs: { category: string }[] = [];

  try {
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (result?.data?.length) {
      const seen = new Set<string>();
      result.data.forEach((post: any) => {
        const cat = (post.category || '').trim();
        if (cat && !seen.has(slugify(cat))) {
          seen.add(slugify(cat));
          slugs.push({ category: slugify(cat) });
        }
      });
    }
  } catch {}

  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  let categoryName = category.replace(/-/g, ' ');
  try {
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (result?.data?.length) {
      const match = result.data.find((post: any) => {
        const cat = (post.category || '').trim();
        return cat && slugify(cat) === category;
      });
      if (match) categoryName = match.category.trim();
    }
  } catch {}

  const title = `${categoryName} Articles | CopyM Blog`;
  const description = `Browse articles about ${categoryName.toLowerCase()} on CopyM's blog.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://copym.xyz/blog/${category}/`,
    },
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: `https://copym.xyz/blog/${category}/`,
      type: 'website',
      images: [
        {
          url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  let initialApiPosts: any[] = [];
  let categoryName = category.replace(/-/g, ' ');

  try {
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (result?.data?.length) {
      initialApiPosts = result.data.map((post: any) => transformApiPost(post));

      const match = result.data.find((post: any) => {
        const cat = (post.category || '').trim();
        return cat && slugify(cat) === category;
      });
      if (match) {
        categoryName = match.category.trim();
      }
    }
  } catch {}

  const schemaData = generateWebPageSchema({
    name: `${categoryName} Articles | CopyM Blog`,
    description: `Browse articles about ${categoryName.toLowerCase()} on CopyM's blog.`,
    url: `https://copym.xyz/blog/${category}/`,
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: categoryName, path: `/blog/${category}` },
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
      <BlogContent initialApiPosts={initialApiPosts} initialCategory={categoryName} />
    </>
  );
}
