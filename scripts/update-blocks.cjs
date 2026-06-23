// scripts/update-blocks.cjs
// Parses 12 hardcoded blog posts' HTML content into structured contentBlocks
// and updates them on the PHP API server so all special blocks (CTA, FastFact,
// Table, Quote, Callout, Image, Source) appear in the admin blog editor.

const http = require('http');
const https = require('https');

const API_BASE = process.env.API_BASE || 'https://blog-api.copym.xyz';
const API_KEY = process.env.API_KEY || 'copym-blog-token-change-me';

let blockIdCounter = Date.now();

function nextBlockId() {
  return String(++blockIdCounter);
}

function stripHtmlComments(str) {
  return str.replace(/<!--[\s\S]*?-->/g, '').trim();
}

function extractText(html, regex) {
  const m = regex.exec(html);
  if (m) return m[1].trim();
  return '';
}

function extractAll(html, regex) {
  const results = [];
  let m;
  const re = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  while ((m = re.exec(html)) !== null) {
    results.push(m[1] !== undefined ? m[1].trim() : m[0].trim());
  }
  return results;
}

// --- Parsing functions for each block type ---

function parseFastFact(innerHtml) {
  const content = extractText(innerHtml, /class="blog-fast-fact__value">([\s\S]*?)<\/p>/);
  if (!content) return null;
  return { type: 'fastfact', content };
}

function parseQuote(innerHtml) {
  const content = extractText(innerHtml, /class="blog-quote__text">([\s\S]*?)<\/p>/);
  const name = extractText(innerHtml, /class="blog-quote__name">([\s\S]*?)<\/div>/);
  if (!content) return null;
  return { type: 'quote', title: name || 'Anonymous', content };
}

function parseCallout(innerHtml, variant) {
  const title = extractText(innerHtml, /class="blog-callout__title">([\s\S]*?)<\/div>/);
  const content = extractText(innerHtml, /class="blog-callout__text">([\s\S]*?)<\/p>/);
  if (!content) return null;
  return { type: 'callout', variant: variant || 'info', title: title || variant || 'Note', content };
}

function parseTable(innerHtml) {
  const headers = extractAll(innerHtml, /<th>([\s\S]*?)<\/th>/);
  const rowMatches = [...innerHtml.matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  const rows = [];
  for (const rowMatch of rowMatches) {
    if (rowMatch[1].includes('<th>')) continue; // skip header row
    const cells = [...rowMatch[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => m[1].trim());
    if (cells.length > 0) rows.push(cells);
  }
  if (headers.length === 0) return null;
  return { type: 'table', caption: '', headers, rows };
}

function parseImage(innerHtml) {
  const imageUrl = extractText(innerHtml, /src="([^"]+)"/);
  const caption = extractText(innerHtml, /class="blog-image__caption">([\s\S]*?)<\/div>/);
  if (!imageUrl) return null;
  return { type: 'image', imageUrl, caption: caption || '' };
}

function parseCta(innerHtml) {
  const title = extractText(innerHtml, /class="blog-cta__title">([\s\S]*?)<\/h3>/);
  const content = extractText(innerHtml, /class="blog-cta__text">([\s\S]*?)<\/p>/);
  const btnMatch = innerHtml.match(/class="blog-cta__btn">([^<]*)/);
  const caption = btnMatch ? btnMatch[1].trim() : '';
  if (!title && !content) return null;
  return { type: 'cta', title: title || '', content: content || '', caption };
}

function parseSource(innerHtml) {
  const linkMatches = [...innerHtml.matchAll(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
  const sources = linkMatches.map(m => ({ title: m[2].trim(), url: m[1] }));
  if (sources.length === 0) return null;
  return { type: 'source', sources };
}

// --- Helper: find matching close div with nesting support ---

function findCloseDiv(html, openPos) {
  let depth = 1;
  let i = openPos;
  while (i < html.length && depth > 0) {
    if (html.startsWith('</div>', i)) {
      depth--;
      if (depth === 0) return i + 6;
      i += 6;
    } else if (i + 4 < html.length && html[i] === '<' && html[i + 1] === 'd' && html[i + 2] === 'i' && html[i + 3] === 'v' && (html[i + 4] === ' ' || html[i + 4] === '>')) {
      depth++;
      i += 5;
    } else {
      i++;
    }
  }
  return -1;
}

// --- Main HTML parser ---

function parseContentToBlocks(rawHtml) {
  // Remove key-takeaways div (no nested divs inside, so lazy regex works)
  const html = rawHtml.replace(/<div\s+id="key-takeaways"[\s\S]*?<\/div>/, '').trim();

  const blocks = [];
  let lastEnd = 0;
  let i = 0;

  while (i < html.length) {
    const slice = html.slice(i);
    const blockMatch = slice.match(/^<div\s+class="blog-block\s+blog-([\w-]+)(?:\s+blog-callout--([\w-]+))?"[^>]*>/);
    
    if (blockMatch) {
      const openTag = blockMatch[0];
      const blockType = blockMatch[1];
      const calloutVariant = blockMatch[2];
      const openTagEnd = i + openTag.length;

      // Text before this block
      const beforeText = stripHtmlComments(html.slice(lastEnd, i));
      if (beforeText) {
        blocks.push({ id: nextBlockId(), type: 'text', content: beforeText });
      }

      // Find matching close div with nesting support
      const closePos = findCloseDiv(html, openTagEnd);
      if (closePos === -1) { i++; continue; }

      const innerContent = html.slice(openTagEnd, closePos - 6);

      // Parse special block
      const normalizedType = blockType.replace(/-/g, '');
      let parsed = null;
      switch (normalizedType) {
        case 'fastfact': parsed = parseFastFact(innerContent); break;
        case 'quote':    parsed = parseQuote(innerContent); break;
        case 'callout':  parsed = parseCallout(innerContent, calloutVariant); break;
        case 'table':    parsed = parseTable(innerContent); break;
        case 'image':    parsed = parseImage(innerContent); break;
        case 'cta':      parsed = parseCta(innerContent); break;
        case 'source':   parsed = parseSource(innerContent); break;
      }

      if (parsed) {
        parsed.id = nextBlockId();
        blocks.push(parsed);
      }

      lastEnd = closePos;
      i = closePos;
    } else {
      i++;
    }
  }

  // Text after last block
  const afterText = stripHtmlComments(html.slice(lastEnd));
  if (afterText) {
    blocks.push({ id: nextBlockId(), type: 'text', content: afterText });
  }

  return blocks;
}

function parseReadTime(str) {
  if (!str) return 5;
  const m = str.match(/(\d+)/);
  return m ? parseInt(m[1]) : 5;
}

function apiRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : '';
    const url = new URL(path, API_BASE);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    };
    if (body) options.headers['Content-Length'] = Buffer.byteLength(body);

    const req = lib.request(options, (res) => {
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
  console.log('Importing blog posts...\n');
  const { blogPosts } = await import('../src/data/blogPosts.js');
  console.log(`Loaded ${blogPosts.length} blog posts.\n`);

  // Fetch existing posts to map slugs -> IDs
  console.log('Fetching existing posts from API...');
  const existingRes = await apiRequest('GET', '/api/admin/blog-posts?limit=50', null);
  const existingList = existingRes.data?.data || [];
  const slugToId = {};
  for (const p of existingList) {
    slugToId[p.slug] = p.id;
  }
  console.log(`Found ${existingList.length} existing posts on server.\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of blogPosts) {
    const postId = slugToId[post.slug];
    if (!postId) {
      console.log(`[${post.id}] SKIP — "${post.title}" not found on server (slug: ${post.slug})`);
      skipped++;
      continue;
    }

    // Parse HTML content into contentBlocks
    const contentBlocks = parseContentToBlocks(post.content);
    const textBlocks = contentBlocks.filter(b => b.type === 'text');
    const plainContent = textBlocks.map(b => b.content).join('\n\n');

    const payload = {
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle || '',
      content: plainContent,
      contentBlocks,
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
      process.stdout.write(`[${post.id}] Updating "${post.title}"... `);
      const result = await apiRequest('PUT', `/api/admin/blog-posts/${postId}`, payload);
      if (result.status >= 200 && result.status < 300) {
        const blockCount = contentBlocks.length;
        const specialCount = contentBlocks.filter(b => b.type !== 'text').length;
        console.log(`✓ Updated (ID: ${postId}, ${blockCount} blocks, ${specialCount} special)`);
        updated++;
      } else {
        console.log(`✗ Failed (${result.status}): ${result.data?.error || JSON.stringify(result.data).slice(0, 200)}`);
        failed++;
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);
