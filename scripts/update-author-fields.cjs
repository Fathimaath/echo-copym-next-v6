const https = require('https');

const API_KEY = 'copym-blog-token-change-me';

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

  console.log('Fetching existing posts from server...');
  const existing = await apiRequest('GET', '/admin/blog-posts');
  const serverPosts = existing.data?.data || [];
  console.log(`Found ${serverPosts.length} posts on server.\n`);

  let updated = 0;
  let notFound = 0;

  for (const post of blogPosts) {
    const serverPost = serverPosts.find(p => p.slug === post.slug);
    if (!serverPost) {
      console.log(`[${post.id}] NOT FOUND on server — "${post.title}"`);
      notFound++;
      continue;
    }

    const payload = {
      authorRole: post.authorRole || '',
      authorBio: post.authorBio || '',
    };

    try {
      process.stdout.write(`[${post.id}] Updating "${post.title}"... `);
      const result = await apiRequest('PATCH', `/admin/blog-posts/${serverPost.id}`, payload);
      if (result.status >= 200 && result.status < 300) {
        console.log(`✓ Role: "${payload.authorRole}"`);
        updated++;
      } else {
        console.log(`✗ Failed (${result.status}): ${result.data?.error || JSON.stringify(result.data).slice(0, 200)}`);
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
    }
  }

  console.log(`\nDone! Updated: ${updated}, Not found: ${notFound}`);
}

main().catch(console.error);
