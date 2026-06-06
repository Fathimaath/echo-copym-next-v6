import { MetadataRoute } from 'next';
export const dynamic = "force-static";
import { glossaryTerms } from '@/data/glossaryTerms';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://copym.xyz';

  // Static routes
  const staticRoutes = [
    '/',
    '/about/',
    '/marketplace/',
    '/tokenization/',
    '/terms-of-services/',
    '/blog/',
    '/glossary/',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  // Dynamic Glossary routes
  const glossaryRoutes = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Collect all blog posts (static + API)
  const allBlogPosts = new Map<string, { category: string; updatedDate?: string; date?: string }>();

  // Add static posts
  staticBlogPosts.forEach((post) => {
    const cat = (post.category || '').toLowerCase().replace(/\s+/g, '-') || 'general';
    allBlogPosts.set(post.slug, { category: cat, updatedDate: post.updatedDate, date: post.date });
  });

  // Also fetch API posts so admin-created posts appear in sitemap
  try {
    const { fetchBlogPosts, transformApiPost } = await import('@/services/blogApi');
    const result: any = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
    if (result?.data?.length) {
      result.data.forEach((post: any) => {
        const t: any = transformApiPost(post);
        if (!allBlogPosts.has(t.slug)) {
          const cat = (t.category || '').toLowerCase().replace(/\s+/g, '-') || 'general';
          allBlogPosts.set(t.slug, { category: cat, date: t.date, updatedDate: t.updatedDate });
        }
      });
    }
  } catch {
    // API not available — only static posts in sitemap
  }

  // Dynamic Blog routes
  const blogRoutes = Array.from(allBlogPosts.entries()).map(([slug, meta]) => ({
    url: `${baseUrl}/blog/${meta.category}/${slug}/`,
    lastModified: new Date(meta.updatedDate || meta.date || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...glossaryRoutes, ...blogRoutes];
}
