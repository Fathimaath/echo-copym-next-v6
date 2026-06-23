import { MetadataRoute } from 'next';
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/static/'],
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://copym.xyz/sitemap.xml',
  };
}

// AI-readable site guide:
// llms.txt: https://copym.xyz/llms.txt
