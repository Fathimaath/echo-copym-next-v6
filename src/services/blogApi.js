const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Convert admin <img ... data-caption="..."> markup into a real
 * <figure class="blog-image">...<figcaption>...</figcaption></figure>
 * so image captions render on the web (works for existing + new posts).
 */
function enhanceContentImages(html = '') {
  if (!html) return html;

  return html.replace(
    /<img([^>]*?)\sdata-caption="([^"]*)"([^>]*?)>/gi,
    (match, before, caption, after) => {
      const clean = caption.trim();
      if (!clean) return match;
      const attrs = `${before}${after}`.replace(/\/\s*$/, '').trim();
      return `<figure class="blog-block blog-image"><img ${attrs}>` +
        `<figcaption class="blog-image__caption">${clean}</figcaption></figure>`;
    }
  );
}

/**
 * Ensure FAQ accordion markup includes the section heading, even for posts
 * saved before the heading was added to the FAQ block's renderHTML.
 */
function ensureFaqHeading(html = '') {
  if (!html) return html;
  return html.replace(
    /<div class="blog-block blog-faq-accordion">(?!<h3 class="blog-faq-heading">)/g,
    '<div class="blog-block blog-faq-accordion"><h3 class="blog-faq-heading">Frequently Asked Questions</h3>'
  );
}

/**
 * Group consecutive .blog-embed blocks into a "From the Community" wrapper,
 * matching the admin preview's enhancePreviewHtml behavior.
 *
 * Behavior:
 *  - 1 embed => 1 wrapper with "From the Community" heading + 1 horizontal card.
 *  - 2+ consecutive embeds => 1 wrapper with 1 heading + stacked alternating cards.
 *  - Non-consecutive embeds => separate wrappers, each with their own heading.
 */
function groupCommunityBlocks(html = '') {
  if (!html || html.indexOf('blog-embed') === -1) return html;

  try {
    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const children = Array.from(doc.body.children);
      const runs = [];
      let current = null;

      for (const child of children) {
        if (child.classList && child.classList.contains('blog-embed')) {
          if (!current) current = [];
          current.push(child);
        } else {
          if (current) {
            runs.push(current);
            current = null;
          }
        }
      }
      if (current) runs.push(current);

      for (const run of runs) {
        const wrap = doc.createElement('div');
        wrap.className = run.length > 1
          ? 'blog-community blog-community--row'
          : 'blog-community blog-community--single';

        const heading = doc.createElement('div');
        heading.className = 'blog-community__heading';
        heading.textContent = 'From the Community';

        doc.body.insertBefore(wrap, run[0]);
        wrap.appendChild(heading);

        if (run.length > 1) {
          const row = doc.createElement('div');
          row.className = 'blog-community__row';
          wrap.appendChild(row);
          run.forEach(block => row.appendChild(block));
        } else {
          wrap.appendChild(run[0]);
        }
      }
      return doc.body.innerHTML;
    }
  } catch (_e) { /* fallthrough to Node.js manual parser */ }

  // ---- Server / Node.js manual parser (correct consecutive grouping) ----
  const result = [];
  let i = 0;
  const len = html.length;
  let run = [];

  function isEmbedDivAt(pos) {
    // The opening tag can be long (data-embed-url/title/description), so we
    // only need to match the tag name + class attribute, not the closing ">".
    const m = html.slice(pos, pos + 2000).match(/^<div\b[^>]*?\bclass="([^"]*)"/i);
    if (!m) return null;
    return m[1].split(/\s+/).includes('blog-embed') ? m[0] : null;
  }

  function parseMatchingDiv(pos) {
    let depth = 0;
    let j = pos;
    while (j < len) {
      if (html.slice(j, j + 4) === '<div' && (html[j + 4] === ' ' || html[j + 4] === '>' || html[j + 4] === '\n' || html[j + 4] === '/')) {
        depth++;
        j += 4;
        continue;
      }
      if (html.slice(j, j + 6) === '</div>') {
        depth--;
        j += 6;
        if (depth === 0) return j;
        continue;
      }
      j++;
    }
    return len;
  }

  function flushRun(buf) {
    if (buf.length === 0) return;
    const cls = buf.length > 1
      ? 'blog-community blog-community--row'
      : 'blog-community blog-community--single';
    result.push(`<div class="${cls}">`);
    result.push('<div class="blog-community__heading">From the Community</div>');
    if (buf.length > 1) {
      result.push('<div class="blog-community__row">');
      result.push(buf.join(''));
      result.push('</div>');
    } else {
      result.push(buf[0]);
    }
    result.push('</div>');
  }

  while (i < len) {
    // Skip whitespace
    const wsMatch = html.slice(i).match(/^\s+/);
    if (wsMatch) {
      result.push(html.slice(i, i + wsMatch[0].length));
      i += wsMatch[0].length;
      continue;
    }
    const opener = isEmbedDivAt(i);
    if (opener) {
      const endIdx = parseMatchingDiv(i);
      run.push(html.slice(i, endIdx));
      i = endIdx;
    } else {
      if (run.length > 0) {
        flushRun(run);
        run = [];
      }
      // Consume one tag-or-text chunk to avoid per-char slowdown
      const tagMatch = html.slice(i).match(/^<[\s\S]*?>/);
      if (tagMatch) {
        result.push(tagMatch[0]);
        i += tagMatch[0].length;
      } else {
        // Consume until next '<'
        const next = html.indexOf('<', i);
        if (next === -1) {
          result.push(html.slice(i));
          i = len;
        } else {
          result.push(html.slice(i, next));
          i = next;
        }
      }
    }
  }
  if (run.length > 0) flushRun(run);
  return result.join('');
}

const DISCLAIMER_ICON_SVG = `<svg class="blog-disclaimer__icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

/**
 * Inject the gray icon-circle UI into old saved Disclaimer markup that lacks it,
 * so disclaimers match the current design on the web (works for existing + new posts).
 */
function enhanceDisclaimer(html = '') {
  if (!html || html.indexOf('blog-disclaimer') === -1) return html;
  return html.replace(
    /<div class="blog-block blog-disclaimer">\s*(<div class="blog-disclaimer-header">[\s\S]*?<\/div>)\s*(<p>[\s\S]*?<\/p>)\s*<\/div>/g,
    (match, header, body) => {
      return `<div class="blog-block blog-disclaimer">
        <div class="blog-disclaimer__inner">
          <div class="blog-disclaimer__icon">${DISCLAIMER_ICON_SVG}</div>
          <div class="blog-disclaimer__body">
            ${header}
            ${body}
          </div>
        </div>
      </div>`;
    }
  );
}

const EMBED_ICON_SVGS = {
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.57a3.02 3.02 0 0 0 2.12-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>',
  vimeo: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.184-1.057 2.351-2.097 3.508-3.128 1.582-1.387 2.767-2.111 3.558-2.17 1.869-.185 3.021 1.098 3.455 3.848.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
};

const EMBED_PLAY_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const EMBED_ARROW_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>';

const EMBED_PROVIDER_MAP = {
  youtube: { name: 'YouTube', cta: 'Watch' },
  vimeo: { name: 'Vimeo', cta: 'Watch' },
  twitter: { name: 'X (Twitter)', cta: 'View on X' },
  x: { name: 'X (Twitter)', cta: 'View on X' },
  linkedin: { name: 'LinkedIn', cta: 'View on LinkedIn' },
  iframe: { name: 'Website', cta: 'Visit Site' },
  external: { name: '', cta: 'Visit Site' },
};

function escHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeEmbedCode(type, code) {
  const trimmed = String(code || '').trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (type === 'twitter' || type === 'x') {
    return trimmed ? `https://twitter.com/x/status/${trimmed}` : '';
  }
  if (type === 'youtube' && /^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/watch?v=${trimmed}`;
  }
  if (type === 'vimeo' && /^\d+$/.test(trimmed)) {
    return `https://vimeo.com/${trimmed}`;
  }
  return trimmed;
}

/**
 * Build the shared rich embed preview card markup (thumbnail, title,
 * description, author + provider badge and CTA). Rendered identically on
 * the admin preview and the published website. Falls back to a simple
 * "View on <provider>" card when no metadata is available.
 */
function embedCardHtml(type, code, meta = {}) {
  const provider = EMBED_PROVIDER_MAP[type] || EMBED_PROVIDER_MAP.external;
  const href = normalizeEmbedCode(type, code);
  const title = meta.title || '';
  const description = meta.description || '';
  const thumbnail = meta.thumbnail || '';
  const author = meta.author || '';
  const providerName = meta.providerName || provider.name;
  const cta = meta.cta || provider.cta;
  const iconKey = EMBED_ICON_SVGS[type] ? type : 'external';
  const icon = EMBED_ICON_SVGS[iconKey];
  const hasThumb = !!thumbnail;

  const media = hasThumb
    ? `<span class="blog-embed-preview__media"><img class="blog-embed-preview__thumb" src="${escHtml(thumbnail)}" alt="" loading="lazy" referrerpolicy="no-referrer" /></span>`
    : `<span class="blog-embed-preview__media blog-embed-preview__media--fallback"><span class="blog-embed-preview__fallback-icon">${icon}</span></span>`;
  const badge = hasThumb
    ? `<span class="blog-embed-preview__badge"><span class="blog-embed-preview__icon">${icon}</span><span class="blog-embed-preview__provider">${escHtml(providerName)}</span></span>`
    : '';
  const desc = description
    ? `<span class="blog-embed-preview__desc">${escHtml(description)}</span>`
    : '';
  const ctaIcon = (type === 'youtube' || type === 'vimeo') ? EMBED_PLAY_ICON_SVG : EMBED_ARROW_ICON_SVG;

  return `<div class="blog-block blog-embed blog-embed--${type}">
    <a class="blog-embed-preview" href="${escHtml(href)}" target="_blank" rel="noopener noreferrer">
      <span class="blog-embed-preview__media-wrap">${media}${badge}</span>
      <span class="blog-embed-preview__body">
        <span class="blog-embed-preview__title">${escHtml(title || `View on ${providerName}`)}</span>
        ${desc}
        <span class="blog-embed-preview__footer">
          <span class="blog-embed-preview__author">${escHtml(author)}</span>
          <span class="blog-embed-preview__cta">${ctaIcon}${escHtml(cta)}</span>
        </span>
      </span>
    </a>
  </div>`;
}

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

      case 'cta': {
        const ctaTarget = block.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<div class="blog-block blog-cta">
          <h3 class="blog-cta__title">${block.title || ''}</h3>
          <p class="blog-cta__text">${block.content || ''}</p>
          ${block.caption ? `<a href="${block.buttonLink || '#'}" class="blog-cta__btn"${ctaTarget}>${block.caption}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </a>` : ''}
        </div>`;
      }

      case 'fastfact':
        return `<div class="blog-block blog-fast-fact">
          <div class="blog-fast-fact__label">Fast Fact</div>
          <p class="blog-fast-fact__value">${block.content || ''}</p>
        </div>`;

      case 'quote': {
        const qAvatar = block.avatar ? `<img class="blog-quote__avatar" src="${block.avatar}" alt="${block.author || 'Quote author'}" />` : '';
        const qMeta = [
          block.author ? `<span class="blog-quote__author">${block.author}</span>` : '',
          block.role ? `<span class="blog-quote__role">${block.role}</span>` : '',
          block.url ? `<a class="blog-quote__url" href="${block.url}" target="_blank" rel="noopener noreferrer">${block.url}</a>` : ''
        ].join('');
        return `<div class="blog-block blog-quote">
          <div class="blog-quote__inner">
            ${qAvatar}
            <div class="blog-quote__content">
              <blockquote class="blog-quote__text">${block.content || ''}</blockquote>
              ${qMeta ? `<figcaption class="blog-quote__meta">${qMeta}</figcaption>` : ''}
            </div>
          </div>
        </div>`;
      }

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

      case 'source': {
        const sources = block.sources || [];
        const sourceItems = sources.map(s => {
          const title = s.title || s.url || 'Untitled source';
          const pub = s.publisher ? `<span class="blog-source__publisher">${s.publisher}</span>` : '';
          const date = s.date ? `<span class="blog-source__date">${s.date}</span>` : '';
          const link = s.url
            ? `<a href="${s.url}" class="blog-source__link" target="_blank" rel="noopener noreferrer">${title}</a>`
            : `<span>${title}</span>`;
          return `<li class="blog-source__item">${link}${pub}${date}</li>`;
        }).join('');
        return `<div class="blog-block blog-source">
          <div class="blog-source__title">Sources</div>
          <ul class="blog-source__list">${sourceItems}</ul>
        </div>`;
      }

      case 'video': {
        const vSrc = block.src || block.url || '';
        const vCaption = block.caption || '';
        const vMode = block.displayMode === 'full' ? ' blog-video--full' : '';
        const vLabel = block.accessibilityText ? ` aria-label="${block.accessibilityText}"` : '';
        return `<figure class="blog-block blog-video${vMode}">
          <video src="${vSrc}" controls preload="metadata"${vLabel}${vCaption ? ` title="${vCaption}"` : ''}></video>
          ${vCaption ? `<figcaption>${vCaption}</figcaption>` : ''}
        </figure>`;
      }

      case 'embed': {
        const eType = block.embedType || 'youtube';
        const eCode = block.embedCode || block.code || '';
        const meta = {
          title: block.embedTitle || '',
          description: block.embedDescription || '',
          thumbnail: block.embedThumbnail || '',
          author: block.embedAuthor || '',
          providerName: block.embedProvider || '',
          cta: block.embedCta || '',
        };
        return embedCardHtml(eType, eCode, meta);
      }

      case 'gallery': {
        const images = block.images || [];
        const galleryItems = images.map(img =>
          `<div class="blog-gallery-item">
            <img src="${img.url || img.imageUrl || ''}" alt="${img.caption || ''}" />
            ${img.caption ? `<div class="blog-gallery-caption">${img.caption}</div>` : ''}
          </div>`
        ).join('');
        return `<div class="blog-block blog-gallery">
          <div class="blog-gallery-grid">${galleryItems}</div>
        </div>`;
      }

      case 'keytakeaways': {
        const items = block.items || [];
        const itemsHtml = items.filter(Boolean).map(item => `<li>${item}</li>`).join('');
        return `<div class="blog-block blog-key-takeaways">
          <div class="blog-key-takeaways__title">Key Takeaways</div>
          <ul>${itemsHtml}</ul>
        </div>`;
      }

      case 'faq': {
        const faqItems = block.items || [];
        const faqHtml = faqItems.map(item =>
          `<div class="blog-faq-item">
            <div class="blog-faq-question">${item.question || ''}</div>
            <div class="blog-faq-answer">${item.answer || ''}</div>
          </div>`
        ).join('');
        return `<div class="blog-block blog-faq-accordion"><h3 class="blog-faq-heading">Frequently Asked Questions</h3>${faqHtml}</div>`;
      }

      case 'disclaimer': {
        return `<div class="blog-block blog-disclaimer">
          <div class="blog-disclaimer__inner">
            <div class="blog-disclaimer__icon">${DISCLAIMER_ICON_SVG}</div>
            <div class="blog-disclaimer__body">
              <div class="blog-disclaimer-header">Disclaimer</div>
              <p>${block.content || ''}</p>
            </div>
          </div>
        </div>`;
      }

      case 'downloadLink':
        return `<div class="blog-block blog-button">
          <a href="${block.fileUrl || block.url || '#'}" class="blog-button__link">${block.linkText || block.buttonText || 'Click Here'}</a>
        </div>`;

      case 'relatedArticle':
        return `<div class="blog-block blog-related-article">
          <span class="blog-related-article__label">Related Article</span>
          <a href="${block.url || ''}" class="blog-related-article__link">${block.title || block.url || ''}</a>
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

  // Server-side safe approach: Use regex if DOMParser isn't available
  if (typeof window === 'undefined') {
    const headings = [];
    const headingRegex = /<(h[23])(?:\s+id="([^"]*)")?>([\s\S]*?)<\/h[23]>/gi;
    let match;
    let modifiedHtml = html;

    while ((match = headingRegex.exec(html)) !== null) {
      const [fullMatch, tag, existingId, rawText] = match;
      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      const title = rawText.replace(/<[^>]*>/g, '').trim();
      const id = existingId || title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      headings.push({ id, title, level });
      
      if (!existingId) {
        // This is a simple replacement and might be fragile for complex HTML, 
        // but for server-side SEO it's better than crashing.
        modifiedHtml = modifiedHtml.replace(fullMatch, `<${tag} id="${id}">${rawText}</${tag}>`);
      }
    }

    return { headings, content: modifiedHtml };
  }

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
      if (typeof window === 'undefined') {
        // Server-side regex fallback
        const headingRegex = /<(h[123])(?:\s+id="([^"]*)")?>([\s\S]*?)<\/h[123]>/gi;
        let match;
        let modifiedContent = block.content;
        while ((match = headingRegex.exec(block.content)) !== null) {
          const [fullMatch, tag, existingId, rawText] = match;
          const level = tag.toLowerCase() === 'h1' ? 1 : (tag.toLowerCase() === 'h2' ? 2 : 3);
          const title = rawText.replace(/<[^>]*>/g, '').trim();
          
          if (!title) continue;

          let id = existingId || title.toLowerCase()
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

          if (level === 2 || level === 3) {
            headings.push({ id, title, level });
          }

          // Add ID to the heading element so TOC scroll works
          if (!existingId) {
            modifiedContent = modifiedContent.replace(fullMatch, `<${tag} id="${id}">${rawText}</${tag}>`);
          }
        }
        block.content = modifiedContent;
      } else {
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

  // Turn admin <img data-caption="..."> into a real figure + figcaption so
  // captions render on the web for both existing and new posts
  content = enhanceContentImages(content);

  // Ensure FAQ accordion blocks show the "Frequently Asked Questions" heading,
  // even for posts saved before the heading existed
  content = ensureFaqHeading(content);

  // Ensure old saved Disclaimer markup gets the gray icon-circle UI
  content = enhanceDisclaimer(content);

  // Group consecutive embeds into a "From the Community" wrapper with heading
  content = groupCommunityBlocks(content);

  return {
    id: apiPost.id,
    title: apiPost.title,
    subtitle: apiPost.subtitle || '',
    excerpt: apiPost.excerpt || '',
    category: apiPost.category,
    date: apiPost.publishedAt ? new Date(apiPost.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : '',
    dateISO: apiPost.publishedAt || null,
    updatedDate: apiPost.updatedAt ? new Date(apiPost.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : null,
    updatedDateISO: apiPost.updatedAt || null,
    readTime: apiPost.readTime ? `${apiPost.readTime} min read` : '5 min read',

    // Author (string for PostCard)
    author: apiPost.authorName || 'CopyM Team',
    // Author details (object for BlogPost)
    authorData: {
      name: apiPost.authorName || 'CopyM Team',
      role: apiPost.authorRole || '',
      bio: apiPost.authorBio || ''
    },
    // Reviewer details (object for BlogPost editorial credit)
    reviewerData: apiPost.reviewerName ? {
      name: apiPost.reviewerName,
      role: apiPost.reviewerRole || '',
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
