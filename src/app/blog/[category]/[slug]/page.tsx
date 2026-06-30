import React from 'react';
import { fetchBlogPosts, fetchBlogPostBySlug, transformApiPost } from '@/services/blogApi';
import { generateBlogPostSchema, generateBreadcrumbSchema, generateFAQSchema, getSocialImageUrl } from '@/utils/seo';
import BlogArticleBody from '@/components/Blog/BlogArticleBody';
import BlogPostSidebars from '@/components/Blog/BlogPostSidebars';
import Breadcrumbs from '@/components/Blog/Breadcrumbs';
import RelatedPosts from '@/components/Blog/RelatedPosts';

// Static export — page content is baked at build time
// Rebuild + re-upload out/ when new posts are published

// All pages are pre-built via generateStaticParams — no dynamic params needed
export const dynamicParams = false;

// Pre-build pages for BOTH static and API posts so admin-created posts have HTML files
export async function generateStaticParams() {
  const slugs: { category: string; slug: string }[] = [];

  // Fetch API slugs so admin-created posts get pre-built HTML files
  try {
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (result?.data?.length) {
      result.data.forEach((post: any) => {
        const t: any = transformApiPost(post);
        slugs.push({
          category: (t.category || '').toLowerCase().replace(/\s+/g, '-') || 'general',
          slug: t.slug,
        });
      });
    }
  } catch {
    // API not available during build — only dynamic routes will work on server mode
  }

  return slugs;
}

// Generate dynamic SEO tags for each blog post
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  let article: any = null;

  try {
    const apiPost = await fetchBlogPostBySlug(slug);
    article = transformApiPost(apiPost);
  } catch (error) {
    article = null;
  }

  if (!article) {
    // Use URL params as fallback so tab title isn't "Post Not Found"
    const title = slug
      .split('-')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${title} | CopyM`,
      description: `Read about ${title.toLowerCase()} on CopyM's blog.`
    };
  }

  const baseUrl = 'https://copym.xyz';
  const cat = (article.category || '').toLowerCase().replace(/\s+/g, '-') || 'general';
  const postUrl = `${baseUrl}/blog/${cat}/${article.slug}/`;

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
      publishedTime: article.dateISO || article.date,
      modifiedTime: article.updatedDateISO || article.updatedDate || article.dateISO || article.date,
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
    article = null;
  }

  const baseUrl = 'https://copym.xyz';
  let schemaData = null;
  let faqSchema = null;
  let breadcrumbData = null;
  let relatedPosts: any[] = [];
  let youMayAlsoLike: any[] = [];

  if (article) {
    const cat = (article.category || '').toLowerCase().replace(/\s+/g, '-') || 'general';
    const postUrl = `${baseUrl}/blog/${cat}/${article.slug}/`;
    
    // Calculate related posts on server for better SEO (internal linking)
    let allPosts: any[] = [];
    try {
      const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
      if (result?.data) {
        allPosts = result.data.map((p: any) => transformApiPost(p));
      }
    } catch {
      allPosts = [];
    }
    const sameCategoryPosts = allPosts.filter((p: any) => p.category === article.category && p.slug !== slug);
    const otherPosts = allPosts.filter((p: any) => p.category !== article.category);
    relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

    const usedSlugs = new Set(relatedPosts.map((p: any) => p.slug));
    usedSlugs.add(slug);
    youMayAlsoLike = allPosts.filter((p: any) => !usedSlugs.has(p.slug)).slice(0, 3);

    // @ts-ignore
    schemaData = generateBlogPostSchema({
      title: article.title,
      description: article.excerpt,
      image: getSocialImageUrl(article.image),
      publishedDate: article.dateISO || article.date,
      modifiedDate: article.updatedDateISO || article.updatedDate || article.dateISO || article.date,
      url: postUrl,
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
      { label: article.category || 'Category', path: `/blog/${cat}/` },
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
      {article?.image && (
        <link rel="preload" href={article.image} as="image" />
      )}

      {!article ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
            <p className="text-gray-600">The article you are looking for does not exist.</p>
          </div>
        </div>
      ) : (
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Breadcrumbs - fixed on desktop, static on mobile */}
        <div className="pt-28 sm:pt-32 pb-4 lg:pb-8 lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bg-gray-50 lg:z-40">
          <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
            <Breadcrumbs items={[
              { label: 'Home', path: '/' },
              { label: 'Blog', path: '/blog' },
              { label: article?.category, path: `/blog/${(article?.category || '').toLowerCase().replace(/\s+/g, '-')}/` },
              { label: article?.title }
            ]} />
          </div>
        </div>

        {/* Spacer for desktop fixed breadcrumbs */}
        <div className="hidden lg:block h-28"></div>

        {/* Main Content Layout */}
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Middle Column: Main Content (server-rendered) */}
            {article && (
              <main className="flex-1 min-w-0 lg:order-2">
                <BlogArticleBody article={article} relatedPosts={relatedPosts} youMayAlsoLike={youMayAlsoLike} />
              </main>
            )}

            {/* Sidebars (client component for scroll spy, TOC, share) */}
            {article && (
              <BlogPostSidebars article={article} youMayAlsoLike={youMayAlsoLike} />
            )}

          </div>
        </div>

        {/* Related Posts - Full Width Section */}
        <section className="bg-gray-50 py-6 sm:py-8">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
            <RelatedPosts posts={relatedPosts} title="Related Articles" />
          </div>
        </section>
      </div>
      )}
    </>
  );
}
