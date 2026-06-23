const https = require('https');
const http = require('http');

const API_BASE = 'https://blog-api.copym.xyz';
const API_KEY = 'copym-blog-token-change-me';

function parseReadTime(str) {
  if (!str) return 5;
  const m = str.match(/(\d+)/);
  return m ? parseInt(m[1]) : 5;
}

function apiRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'blog-api.copym.xyz',
      path: '/api' + path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    };
    if (body) options.headers['Content-Length'] = Buffer.byteLength(body);

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => (responseData += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseData) });
        } catch {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  const { blogPosts } = await import('../src/data/blogPosts.js');

  // First, get existing posts to avoid slug conflicts
  console.log('Checking existing posts on the server...');
  const existing = await apiRequest('GET', '/admin/blog-posts', null);
  const existingSlugs = new Set((existing.data?.data || []).map(p => p.slug));
  console.log(`Found ${existingSlugs.size} existing posts on server.\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of blogPosts) {
    if (existingSlugs.has(post.slug)) {
      console.log(`[${post.id}] SKIP — "${post.title}" (slug already exists: "${post.slug}")`);
      skipped++;
      continue;
    }

    const payload = {
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle || '',
      content: post.content || '',
      contentBlocks: null,
      excerpt: post.excerpt || '',
      authorName: post.author || 'CopyM Team',
      authorRole: post.authorRole || '',
      authorBio: post.authorBio || '',
      reviewerName: post.reviewer?.name || '',
      reviewerRole: post.reviewer?.role || '',
      reviewerBio: post.reviewer?.bio || '',
      imageUrl: post.image || '',
      category: post.category || '',
      tags: post.tags || '',
      status: 'PUBLISHED',
      featured: !!post.featured,
      featuredPriority: post.featuredPriority || 0,
      readTime: parseReadTime(post.readTime),
      seoTitle: post.title,
      seoDescription: post.excerpt || post.subtitle || '',
      ogImage: post.image || '',
      disclaimer: post.disclaimer || '',
      faq: post.faqs && post.faqs.length > 0 ? post.faqs : null,
      publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    };

    try {
      process.stdout.write(`[${post.id}] Creating "${post.title}"... `);
      const result = await apiRequest('POST', '/admin/blog-posts', payload);
      if (result.status >= 200 && result.status < 300) {
        const newId = result.data?.data?.id || '?';
        console.log(`✓ Created (ID: ${newId})`);
        created++;
      } else {
        console.log(`✗ Failed (${result.status}): ${result.data?.error || JSON.stringify(result.data).slice(0, 200)}`);
        failed++;
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);
