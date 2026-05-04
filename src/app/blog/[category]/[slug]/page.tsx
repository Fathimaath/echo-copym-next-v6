import React from 'react';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';
import { fetchBlogPostBySlug, transformApiPost } from '@/services/blogApi';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/utils/seo';

// Revalidate this page every 60 seconds to ensure new admin posts appear automatically
export const revalidate = 60;

// Pre-render pages at build time using static data
export async function generateStaticParams() {
  if (!staticBlogPosts || !Array.isArray(staticBlogPosts)) {
    return [];
  }

  return staticBlogPosts.map((post) => ({
    category: post.category?.toLowerCase().replace(/\s+/g, '-'),
    slug: post.slug,
  }));
}

// Generate dynamic SEO tags for each blog post
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  let article: any = null;

  try {
    // Try fetching from API during build/SSR if available
    const apiPost = await fetchBlogPostBySlug(slug);
    article = transformApiPost(apiPost);
  } catch (error) {
    // Fallback to static post
    article = staticBlogPosts.find((p: any) => p.slug === slug);
  }

  if (!article) {
    return {
      title: 'Post Not Found | CopyM',
      description: 'The requested blog post could not be found.'
    };
  }

  const baseUrl = 'https://copym.xyz';
  const postUrl = `${baseUrl}/blog/${article.category?.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`;

  // Use the legacy SEO generator logic combined with Next.js format
  return {
    title: `${article.title} | CopyM`,
    description: article.excerpt,
    alternates: {
      canonical: postUrl,
    },
    robots: "index, follow",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedDate || article.date,
      authors: [typeof article.author === 'string' ? article.author : article.authorData?.name || 'CopyM Team'],
      section: article.category,
      images: article.image ? [
        {
          url: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
          alt: article.title,
        }
      ] : [
        {
          url: `${baseUrl}/assets/copym/png/Copym-01-1.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`] : [`${baseUrl}/assets/copym/png/Copym-01-1.png`],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  
  let article: any = null;
  try {
    const apiPost = await fetchBlogPostBySlug(slug);
    article = transformApiPost(apiPost);
  } catch (error) {
    article = staticBlogPosts.find((p: any) => p.slug === slug);
  }

  const baseUrl = 'https://copym.xyz';
  let schemaData = null;
  let breadcrumbData = null;

  if (article) {
    const postUrl = `${baseUrl}/blog/${article.category?.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`;
    // @ts-ignore
    schemaData = generateBlogPostSchema({
      title: article.title,
      description: article.excerpt,
      image: article.image?.startsWith('http') ? article.image : `${baseUrl}${article.image || '/assets/copym/png/Copym-01-1.png'}`,
      publishedDate: article.date,
      modifiedDate: article.updatedDate || article.date,
      author: typeof article.author === 'string' ? article.author : article.authorData?.name || 'CopyM Team',
      url: postUrl,
    });

    // @ts-ignore
    breadcrumbData = generateBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Blog', path: '/blog' },
      { label: article.category || 'Category', path: `/blog/${article.category?.toLowerCase().replace(/\s+/g, '-') || 'general'}` },
      { label: article.title, path: postUrl.replace(baseUrl, '') }
    ]);
  }

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      )}
      {/* @ts-ignore */}
      <BlogPostContent slug={slug} />
    </>
  );
}
