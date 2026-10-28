import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

function escapeXml(unsafe: string = ''): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://copym.xyz';
  let posts: any[] = [];

  try {
    const filePath = path.join(process.cwd(), 'blog-posts-data.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      posts = JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Failed to load posts for RSS feed:', err);
    posts = [];
  }

  // Sort descending by publishedAt
  posts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

  const lastBuildDate = posts.length > 0 && posts[0].publishedAt
    ? new Date(posts[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const cat = (post.category || '').toLowerCase().replace(/\s+/g, '-') || 'general';
      const postUrl = `${baseUrl}/blog/${cat}/${post.slug}/`;
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString();
      const description = escapeXml(post.excerpt || post.seoDescription || post.title);
      const title = escapeXml(post.title);
      const category = escapeXml(post.category || 'Article');

      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${category}</category>
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CopyM Blog — Real-World Asset Tokenization</title>
    <link>${baseUrl}/blog/</link>
    <description>Institutional-grade tokenization infrastructure, asset workflows, and market insights for real-world assets.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=14400',
    },
  });
}
