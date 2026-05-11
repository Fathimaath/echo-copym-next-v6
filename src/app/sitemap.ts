import { MetadataRoute } from 'next';
export const dynamic = "force-static";
import { glossaryTerms } from '@/data/glossaryTerms';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://copym.xyz/';

  // Static routes
  const staticRoutes = [
    '',
    'about/',
    'marketplace/',
    'tokenization/',
    'terms-of-services/',
    'blog/',
    'glossary/',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/' ? 1 : 0.8,
  }));

  // Dynamic Glossary routes
  const glossaryRoutes = glossaryTerms.map((term) => ({
    url: `${baseUrl}glossary/${term.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}blog/${post.category.toLowerCase().replace(/\s+/g, '-')}/${post.slug}/`,
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...glossaryRoutes, ...blogRoutes];
}
