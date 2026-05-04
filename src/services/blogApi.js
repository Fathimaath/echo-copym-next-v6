"use client";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetch all published blog posts
 * @param {Object} options - Query parameters
 * @param {string} options.category - Filter by category
 * @param {string} options.search - Search in title/content
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Posts per page (default: 10)
 * @returns {Promise<Array>} Array of blog posts
 */
export async function fetchBlogPosts({ category, search, page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (search) params.set('search', search);
  params.set('page', page);
  params.set('limit', limit);

  const response = await fetch(`${API_BASE_URL}/api/blog-posts?${params}`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error('Failed to fetch blog posts');
  }

  return result;
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>} Blog post data
 */
export async function fetchBlogPostBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/api/blog-posts/${slug}`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error('Failed to fetch blog post');
  }

  return result.data;
}

/**
 * Convert contentBlocks JSON to HTML string (used as fallback + for static posts)
 * @param {Array} blocks - Content blocks from admin
 * @returns {string} HTML string
 */
function contentBlocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return '';

  return blocks.map(block => {
    switch (block.type) {
      case 'h1':
        return `<h1 id="${(block.content || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}">${block.content || ''}</h1>`;

      case 'h2':
        return `<h2 id="${(block.content || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}">${block.content || ''}</h2>`;

      case 'h3':
        return `<h3 id="${(block.content || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}">${block.content || ''}</h3>`;

      case 'paragraph':
        return block.content || '';

      case 'text':
        // Rich text from Quill editor — already HTML
        return block.content || '';

      case 'cta':
        return `<div class="blog-block blog-cta">
          <h3 class="blog-cta__title">${block.title || ''}</h3>
          <p class="blog-cta__text">${block.content || ''}</p>
          ${block.caption ? `<a href="#" class="blog-cta__btn">${block.caption}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </a>` : ''}
        </div>`;

      case 'fastfact':
        return `<div class="blog-block blog-fast-fact">
          <div class="blog-fast-fact__label">Fast Fact</div>
          <p class="blog-fast-fact__value">${block.content || ''}</p>
        </div>`;

      case 'quote':
        return `<div class="blog-block blog-quote">
          <p class="blog-quote__text">${block.content || ''}</p>
          <div class="blog-quote__author">
            <div class="blog-quote__avatar">${(block.title || '?').charAt(0)}</div>
            <div>
              <div class="blog-quote__name">${block.title || ''}</div>
              <div class="blog-quote__role"></div>
            </div>
          </div>
        </div>`;

      case 'callout':
        return `<div class="blog-block blog-callout blog-callout--${block.variant || 'info'}">
          <div class="blog-callout__content">
            <div class="blog-callout__title">${block.title || block.variant || 'Note'}</div>
            <p class="blog-callout__text">${block.content || ''}</p>
          </div>
        </div>`;

      case 'table':
        const headers = (block.headers || []).map(h => `<th>${h}</th>`).join('');
        const rows = (block.rows || []).map(row =>
          `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('');
        return `<div class="blog-block blog-table"><table>
          ${block.caption ? `<caption>${block.caption}</caption>` : ''}
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table></div>`;

      case 'image':
        return `<div class="blog-block blog-image">
          <img src="${block.imageUrl || ''}" alt="${block.caption || ''}" />
          ${block.caption ? `<div class="blog-image__caption">${block.caption}</div>` : ''}
        </div>`;

      case 'source':
        const sources = block.sources || [];
        const sourceLinks = sources.map(s =>
          `<li><a href="${s.url || '#'}" class="blog-source__link">${s.title || s.url || 'Source'}</a></li>`
        ).join('');
        return `<div class="blog-block blog-source">
          <div class="blog-source__title">Sources</div>
          <ul>${sourceLinks}</ul>
        </div>`;

      default:
        return '';
    }
  }).join('');
}

/**
 * Extract headings (H2, H3) from HTML content and ensure they have IDs
 * @param {string} html - Post content HTML
 * @returns {Object} { headings: Array, content: string (with IDs added) }
 */
export function extractHeadings(html) {
  if (!html) return { headings: [], content: '' };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = [];

  doc.querySelectorAll('h2, h3').forEach((el) => {
    const level = el.tagName === 'H2' ? 2 : 3;
    // Ensure ID exists for scrolling
    let id = el.id;
    if (!id) {
      id = el.textContent.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .trim();
      el.id = id; // Add ID back to the DOM element
    }

    headings.push({
      id,
      title: el.textContent.trim(),
      level
    });
  });

  return {
    headings,
    content: doc.body.innerHTML // Return HTML with IDs included
  };
}

/**
 * Extract headings from contentBlocks array
 * Handles both:
 *  - Separate heading blocks: { type: "h2", content: "Text" }
 *  - Headings inside text blocks HTML: { type: "text", content: "<h2>...</h2><p>...</p>" }
 * @param {Array} blocks - Content blocks from admin
 * @returns {Array} Array of { id, title, level }
 */
export function extractHeadingsFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];

  const headings = [];

  blocks.forEach(block => {
    // Case 1: Separate heading blocks
    if (['h1', 'h2', 'h3'].includes(block.type) && block.content) {
      const level = parseInt(block.type.charAt(1), 10);
      const id = block.content.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      if (level === 2 || level === 3) {
        headings.push({ id, title: block.content.trim(), level });
      }
    }

    // Case 2: Headings inside text block HTML (from Quill)
    if (block.type === 'text' && block.content && block.content.includes('<h')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(block.content, 'text/html');
      const headingElements = doc.querySelectorAll('h1, h2, h3');

      headingElements.forEach(el => {
        const tagName = el.tagName.toLowerCase();
        const levelMap = { 'h1': 1, 'h2': 2, 'h3': 3 };
        const level = levelMap[tagName] || 2;
        const title = el.textContent.trim();

        if (!title) return;

        let id = title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();

        // Ensure unique IDs
        let counter = 1;
        let uniqueId = id;
        while (headings.some(h => h.id === uniqueId)) {
          uniqueId = `${id}-${counter++}`;
        }
        id = uniqueId;

        // Add ID to the element in the block content so scroll works
        el.setAttribute('id', id);

        if (level === 2 || level === 3) {
          headings.push({ id, title, level });
        }
      });

      // Update block content with IDs added to headings
      block.content = doc.body.innerHTML;
    }
  });

  return headings;
}

/**
 * Transform API post to match frontend format
 * @param {Object} apiPost - Post from API
 * @returns {Object} Transformed post
 */
export function transformApiPost(apiPost) {
  // Parse FAQs (DB stores as JSON string in 'faq' field)
  let faqs = [];
  try {
    faqs = typeof apiPost.faq === 'string' ? JSON.parse(apiPost.faq) : (apiPost.faq || []);
  } catch (e) {
    console.error('Failed to parse FAQs:', e);
  }

  // Handle contentBlocks (from admin dashboard)
  let contentBlocks = apiPost.contentBlocks || [];
  let content = ''; // HTML string for fallback
  let headings = [];

  if (contentBlocks.length > 0) {
    // New approach: use contentBlocks array for React rendering
    headings = extractHeadingsFromBlocks(contentBlocks);

    // Also generate HTML string for fallback (e.g., if React rendering fails)
    content = contentBlocksToHtml(contentBlocks);
  } else if (apiPost.content) {
    // Legacy fallback: plain text content (no longer using broken textToHtml)
    content = apiPost.content;
    const extracted = extractHeadings(content);
    headings = extracted.headings;
    content = extracted.content;
  }

  return {
    id: apiPost.id,
    title: apiPost.title,
    subtitle: apiPost.subtitle || '',
    excerpt: apiPost.excerpt || '',
    category: apiPost.category,
    date: apiPost.publishedAt ? new Date(apiPost.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : '',
    updatedDate: apiPost.updatedAt ? new Date(apiPost.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : null,
    readTime: apiPost.readTime ? `${apiPost.readTime} min read` : '5 min read',

    // Author (string for PostCard)
    author: apiPost.authorName || 'CopyM Team',
    // Author details (object for BlogPost)
    authorData: {
      name: apiPost.authorName || 'CopyM Team',
      role: apiPost.authorRole || '',
      bio: apiPost.authorBio || ''
    },

    // Reviewer details (E-E-A-T)
    reviewer: apiPost.reviewerName ? {
      name: apiPost.reviewerName,
      role: apiPost.reviewerRole || 'Reviewer',
      bio: apiPost.reviewerBio || ''
    } : null,

    slug: apiPost.slug,
    featured: apiPost.featured || false,
    featuredPriority: apiPost.featuredPriority || 0,

    // Images
    image: apiPost.imageUrl || '/assets/Images/blogfeatured.avif',
    ogImage: apiPost.ogImage || apiPost.imageUrl,

    // SEO
    seoTitle: apiPost.seoTitle || apiPost.title,
    seoDescription: apiPost.seoDescription || apiPost.excerpt,

    // Content: both HTML string (fallback) AND contentBlocks array (React rendering)
    content: content, // HTML string for dangerouslySetInnerHTML fallback
    contentBlocks: contentBlocks, // Array of block objects for React rendering
    tags: apiPost.tags ? apiPost.tags.split(',').map(t => t.trim()) : [],
    headings: headings, // TOC headings
    faqs: faqs,
    disclaimer: apiPost.disclaimer || '',
    viewCount: apiPost.viewCount || 0,
  };
}
