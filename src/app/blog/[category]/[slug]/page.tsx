import React from 'react';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';
import { fetchBlogPostBySlug, transformApiPost } from '@/services/blogApi';
import { generateBlogPostSchema, generateBreadcrumbSchema, generateFAQSchema, getSocialImageUrl } from '@/utils/seo';

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
  const postUrl = `${baseUrl}/blog/${article.category?.toLowerCase().replace(/\s+/g, '-')}/${article.slug}/`;

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
      images: [
        {
          url: getSocialImageUrl(article.image),
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [getSocialImageUrl(article.image)],
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
  let faqSchema = null;
  let breadcrumbData = null;
  let relatedPosts: any[] = [];

  if (article) {
    const postUrl = `${baseUrl}/blog/${article.category?.toLowerCase().replace(/\s+/g, '-')}/${article.slug}/`;
    
    // Calculate related posts on server for better SEO (internal linking)
    const allPosts = [...staticBlogPosts];
    const sameCategoryPosts = allPosts.filter(p => p.category === article.category && p.slug !== slug);
    const otherPosts = allPosts.filter(p => p.category !== article.category);
    relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

    // @ts-ignore
    schemaData = generateBlogPostSchema({
      title: article.title,
      description: article.excerpt,
      image: getSocialImageUrl(article.image),
      publishedDate: article.date,
      modifiedDate: article.updatedDate || article.date,
      author: typeof article.author === 'string' ? article.author : article.authorData?.name || 'CopyM Team',
      url: postUrl,
      reviewer: article.reviewer,
      category: article.category,
    });

    // Generate FAQ schema if available
    if (article.faqs && article.faqs.length > 0) {
      // @ts-ignore
      faqSchema = generateFAQSchema(article.faqs);
    }

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      )}
      {/* @ts-ignore */}
      <BlogPostContent slug={slug} initialArticle={article} initialRelatedPosts={relatedPosts} />
    </>
  );
}
