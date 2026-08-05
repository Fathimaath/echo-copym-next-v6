import React from 'react';
import Image from '../Image';
import FaqBlock from './FaqBlock';
import { AlertCircle } from 'lucide-react';

/**
 * BlogContentRenderer - renders contentBlocks array as React components
 * Uses the SAME CSS classes defined in BlogPost.jsx <style> tag
 * so admin-created posts look IDENTICAL to static posts
 */

function HeadingBlock({ block }) {
  const { type, content } = block;
  const id = content
    ?.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  if (type === 'h1') {
    return (
      <h1 id={id}>
        {content}
      </h1>
    );
  }

  if (type === 'h2') {
    return (
      <h2 id={id}>
        {content}
      </h2>
    );
  }

  if (type === 'h3') {
    return (
      <h3 id={id}>
        {content}
      </h3>
    );
  }

  return null;
}

function ParagraphBlock({ block }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.content || '' }}
    />
  );
}

function TextBlock({ block }) {
  // Rich text from Quill editor — already full HTML
  // Convert <ul>/<ol> to custom styled format matching static posts
  let html = block.content || '';
  
  // Transform <ul><li> to custom dot span format
  html = html.replace(
    /<ul([^>]*)>([\s\S]*?)<\/ul>/gi,
    (match, ulAttrs, innerContent) => {
      const items = innerContent.replace(
        /<li[^>]*>([\s\S]*?)<\/li>/gi,
        (liMatch, content) => {
          // Strip <p> tags from content to avoid spacing issues
          const cleanContent = content.replace(/<\/?p[^>]*>/gi, '');
          return `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${cleanContent}</span></li>`;
        }
      );
      return `<ul class="space-y-2"${ulAttrs}>${items}</ul>`;
    }
  );
  
  // Transform <ol><li> to bullet point style (same as ul)
  html = html.replace(
    /<ol([^>]*)>([\s\S]*?)<\/ol>/gi,
    (match, olAttrs, innerContent) => {
      const items = innerContent.replace(
        /<li[^>]*>([\s\S]*?)<\/li>/gi,
        (liMatch, content) => {
          const cleanContent = content.replace(/<\/?p[^>]*>/gi, '');
          return `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${cleanContent}</span></li>`;
        }
      );
      return `<ul class="space-y-2"${olAttrs}>${items}</ul>`;
    }
  );
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CTABlock({ block }) {
  const target = block.newTab ? '_blank' : undefined;
  return (
    <div className="blog-block blog-cta">
      {block.title && (
        <h3 className="blog-cta__title">{block.title}</h3>
      )}
      {block.content && (
        <p className="blog-cta__text">{block.content}</p>
      )}
      {block.caption && (
        <a href={block.buttonLink || '#'} className="blog-cta__btn" target={target} rel={target ? 'noopener noreferrer' : undefined}>
          {block.caption}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      )}
    </div>
  );
}

function FastFactBlock({ block }) {
  return (
    <div className="blog-block blog-fast-fact">
      <div className="blog-fast-fact__label">
        Fast Fact
      </div>
      <p className="blog-fast-fact__value">{block.content}</p>
    </div>
  );
}

function QuoteBlock({ block }) {
  const meta = [];
  if (block.author) meta.push(<span key="a" className="blog-quote__author">{block.author}</span>);
  if (block.role) meta.push(<span key="r" className="blog-quote__role">{block.role}</span>);
  if (block.url) meta.push(<a key="u" className="blog-quote__url" href={block.url} target="_blank" rel="noopener noreferrer">{block.url}</a>);

  return (
    <div className="blog-block blog-quote">
      <div className="blog-quote__inner">
        {block.avatar && (
          <Image className="blog-quote__avatar" src={block.avatar} alt={block.author || 'Quote author'} />
        )}
        <div className="blog-quote__content">
          <blockquote className="blog-quote__text">{block.content}</blockquote>
          {meta.length > 0 && (
            <figcaption className="blog-quote__meta">{meta}</figcaption>
          )}
        </div>
      </div>
    </div>
  );
}

function CalloutBlock({ block }) {
  const variant = block.variant || 'info';

  // Capitalize variant name for display (info -> Info, warning -> Warning)
  const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <div className={`blog-block blog-callout blog-callout--${variant}`}>
      <div className="blog-callout__content">
        {(block.title || variantLabel) && (
          <div className="blog-callout__title">{block.title || variantLabel}</div>
        )}
        <p className="blog-callout__text">{block.content}</p>
      </div>
    </div>
  );
}

function TableBlock({ block }) {
  const headers = block.headers || [];
  const rows = block.rows || [];

  return (
    <div className="blog-block blog-table">
      <table>
        {block.caption && <caption>{block.caption}</caption>}
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageBlock({ block }) {
  return (
    <div className="blog-block blog-image">
      {block.imageUrl ? (
        <Image
          src={block.imageUrl}
          alt={block.caption || ''}
        />
      ) : null}
      {block.caption && (
        <div className="blog-image__caption">{block.caption}</div>
      )}
    </div>
  );
}

function SourceBlock({ block }) {
  const sources = block.sources || [];

  if (sources.length === 0) return null;

  return (
    <div className="blog-block blog-source">
      <div className="blog-source__title">Sources</div>
      <ul className="blog-source__list">
        {sources.map((s, i) => (
          <li key={i} className="blog-source__item">
            {s.url ? (
              <a href={s.url} className="blog-source__link" target="_blank" rel="noopener noreferrer">
                {s.title || s.url}
              </a>
            ) : (
              <span>{s.title}</span>
            )}
            {s.publisher && <span className="blog-source__publisher">{s.publisher}</span>}
            {s.date && <span className="blog-source__date">{s.date}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VideoBlock({ block }) {
  const src = block.src || block.url || '';
  const caption = block.caption || '';
  const accessibilityText = block.accessibilityText || '';
  const displayMode = block.displayMode || 'standard';

  return (
    <figure className={`blog-block blog-video${displayMode === 'full' ? ' blog-video--full' : ''}`}>
      <video
        src={src}
        controls
        preload="metadata"
        aria-label={accessibilityText || undefined}
        title={caption || undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const EMBED_PROVIDERS = {
  youtube: { name: 'YouTube', cta: 'Watch' },
  vimeo: { name: 'Vimeo', cta: 'Watch' },
  twitter: { name: 'X (Twitter)', cta: 'View on X' },
  x: { name: 'X (Twitter)', cta: 'View on X' },
  linkedin: { name: 'LinkedIn', cta: 'View on LinkedIn' },
  iframe: { name: 'Website', cta: 'Visit Site' },
  external: { name: '', cta: 'Visit Site' },
};

function EmbedProviderIcon({ type }) {
  const cls = 'blog-embed-preview__icon';
  const svgProps = { className: cls, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (type === 'youtube') {
    return (
      <svg {...svgProps}>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.57a3.02 3.02 0 0 0 2.12-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
      </svg>
    );
  }
  if (type === 'vimeo') {
    return (
      <svg {...svgProps}>
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.184-1.057 2.351-2.097 3.508-3.128 1.582-1.387 2.767-2.111 3.558-2.17 1.869-.185 3.021 1.098 3.455 3.848.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z" />
      </svg>
    );
  }
  if (type === 'x' || type === 'twitter') {
    return (
      <svg {...svgProps}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg {...svgProps}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    );
  }
  return (
    <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function normalizeEmbedHref(type, code) {
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

function decodeEntities(value) {
  return String(value == null ? '' : value)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#\d+/g, m => String.fromCharCode(parseInt(m.replace(/[^\d]/g, ''), 10)));
}

function EmbedBlock({ block }) {
  const type = block.embedType || block.platform || 'youtube';
  const code = block.embedCode || block.code || '';
  const meta = {
    title: block.embedTitle || '',
    description: block.embedDescription || '',
    thumbnail: decodeEntities(block.embedThumbnail || ''),
    author: block.embedAuthor || '',
    providerName: block.embedProvider || '',
    cta: block.embedCta || '',
  };
  const provider = EMBED_PROVIDERS[type] || EMBED_PROVIDERS.external;
  const href = normalizeEmbedHref(type, code);
  const providerName = meta.providerName || provider.name;
  const cta = meta.cta || provider.cta;
  const hasThumb = !!meta.thumbnail;
  const iconType = type === 'x' ? 'x' : (EMBED_PROVIDERS[type] ? type : 'external');
  const ctaIcon = type === 'youtube' || type === 'vimeo'
    ? <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>;

  return (
    <div className={`blog-block blog-embed blog-embed--${type}`}>
      <a className="blog-embed-preview" href={href} target="_blank" rel="noopener noreferrer">
        <span className="blog-embed-preview__media-wrap">
          {hasThumb ? (
            <span className="blog-embed-preview__media">
              <img className="blog-embed-preview__thumb" src={meta.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" onError={e => { e.currentTarget.closest('.blog-embed-preview__media')?.classList.add('blog-embed-preview__media--broken'); e.currentTarget.remove(); }} />
            </span>
          ) : (
            <span className="blog-embed-preview__media blog-embed-preview__media--fallback">
              <span className="blog-embed-preview__fallback-icon">
                <EmbedProviderIcon type={iconType} />
              </span>
            </span>
          )}
          {hasThumb && (
            <span className="blog-embed-preview__badge">
              <EmbedProviderIcon type={iconType} />
              <span className="blog-embed-preview__provider">{providerName}</span>
            </span>
          )}
        </span>
        <span className="blog-embed-preview__body">
          <span className="blog-embed-preview__title">{meta.title || `View on ${providerName}`}</span>
          {meta.description && <span className="blog-embed-preview__desc">{meta.description}</span>}
          <span className="blog-embed-preview__footer">
            <span className="blog-embed-preview__author">{meta.author || ''}</span>
            <span className="blog-embed-preview__cta">{ctaIcon}{cta}</span>
          </span>
        </span>
      </a>
    </div>
  );
}

function GalleryBlock({ block }) {
  const images = block.images || [];
  if (images.length === 0) return null;

  return (
    <div className="blog-block blog-gallery">
      <div className="blog-gallery-grid">
        {images.map((img, i) => (
          <div className="blog-gallery-item" key={i}>
            <Image src={img.url || img.imageUrl || ''} alt={img.caption || ''} />
            {img.caption && <div className="blog-gallery-caption">{img.caption}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawaysBlock({ block }) {
  const items = block.items || [];
  if (items.length === 0) return null;

  return (
    <div className="blog-block blog-key-takeaways">
      <div className="blog-key-takeaways__title">Key Takeaways</div>
      <ul>
        {items.filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function DisclaimerBlock({ block }) {
  return (
    <div className="blog-block blog-disclaimer">
      <div className="blog-disclaimer__inner">
        <div className="blog-disclaimer__icon">
          <AlertCircle className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="blog-disclaimer-header">Disclaimer</div>
          <p>{block.content}</p>
        </div>
      </div>
    </div>
  );
}

function ButtonBlock({ block }) {
  const url = block.fileUrl || block.url || '#';
  const text = block.linkText || block.buttonText || 'Click Here';

  return (
    <div className="blog-block blog-button">
      <a href={url} className="blog-button__link">
        {text}
      </a>
    </div>
  );
}

function RelatedArticleBlock({ block }) {
  return (
    <div className="blog-block blog-related-article">
      <span className="blog-related-article__label">Related Article</span>
      <a href={block.url} className="blog-related-article__link">{block.title || block.url}</a>
    </div>
  );
}

// =====================
// MAIN RENDERER
// =====================

const BlogContentRenderer = ({ contentBlocks }) => {
  if (!contentBlocks || contentBlocks.length === 0) return null;

  const renderBlock = (block, index) => {
    const key = block.id || `block-${index}`;

    switch (block.type) {
      case 'h1':
      case 'h2':
      case 'h3':
        return <HeadingBlock key={key} block={block} />;
      case 'paragraph':
        return <ParagraphBlock key={key} block={block} />;
      case 'text':
        return <TextBlock key={key} block={block} />;
      case 'cta':
        return <CTABlock key={key} block={block} />;
      case 'fastfact':
        return <FastFactBlock key={key} block={block} />;
      case 'quote':
        return <QuoteBlock key={key} block={block} />;
      case 'callout':
        return <CalloutBlock key={key} block={block} />;
      case 'table':
        return <TableBlock key={key} block={block} />;
      case 'image':
        return <ImageBlock key={key} block={block} />;
      case 'source':
        return <SourceBlock key={key} block={block} />;
      case 'video':
        return <VideoBlock key={key} block={block} />;
      case 'embed':
        return <EmbedBlock key={key} block={block} />;
      case 'gallery':
        return <GalleryBlock key={key} block={block} />;
      case 'keytakeaways':
        return <KeyTakeawaysBlock key={key} block={block} />;
      case 'faq':
        return <FaqBlock key={key} items={block.items} />;
      case 'disclaimer':
        return <DisclaimerBlock key={key} block={block} />;
      case 'downloadLink':
        return <ButtonBlock key={key} block={block} />;
      case 'relatedArticle':
        return <RelatedArticleBlock key={key} block={block} />;
      default:
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }
  };

  // Group consecutive embed blocks into a "From the Community" section,
  // matching the admin preview and the HTML-content path (blogApi.js).
  const items = [];
  let run = [];
  const flush = () => {
    if (run.length === 0) return;
    const firstIndex = run[0].index;
    const groupKey = `community-${firstIndex}`;
    if (run.length === 1) {
      items.push(
        <div className="blog-community blog-community--single" key={groupKey}>
          <div className="blog-community__heading">From the Community</div>
          {renderBlock(run[0].block, firstIndex)}
        </div>
      );
    } else {
      items.push(
        <div className="blog-community blog-community--row" key={groupKey}>
          <div className="blog-community__heading">From the Community</div>
          <div className="blog-community__row">
            {run.map(({ block, index }) => renderBlock(block, index))}
          </div>
        </div>
      );
    }
    run = [];
  };

  contentBlocks.forEach((block, index) => {
    if (block.type === 'embed') {
      run.push({ block, index });
    } else {
      flush();
      items.push(renderBlock(block, index));
    }
  });
  flush();

  return (
    <div className="blog-content">
      {items}
    </div>
  );
};

export default BlogContentRenderer;
