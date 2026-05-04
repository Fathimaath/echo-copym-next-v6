"use client";
import React from 'react';
import Link from "next/link";
import Image from '../Image';

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
          return `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${cleanContent}</span></li>`;
        }
      );
      return `<ul class="space-y-2"${ulAttrs}>${items}</ul>`;
    }
  );
  
  // Transform <ol><li> to custom format with numbered circles
  let counter = 0;
  html = html.replace(
    /<ol([^>]*)>([\s\S]*?)<\/ol>/gi,
    (match, olAttrs, innerContent) => {
      counter = 0;
      const items = innerContent.replace(
        /<li[^>]*>([\s\S]*?)<\/li>/gi,
        (liMatch, content) => {
          counter++;
          // Strip <p> tags from content
          const cleanContent = content.replace(/<\/?p[^>]*>/gi, '');
          return `<li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs flex items-center justify-center mt-0.5 flex-shrink-0 font-medium">${counter}</span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${cleanContent}</span></li>`;
        }
      );
      return `<ol class="space-y-2"${olAttrs}>${items}</ol>`;
    }
  );
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CTABlock({ block }) {
  return (
    <div className="blog-block blog-cta">
      {block.title && (
        <h3 className="blog-cta__title">{block.title}</h3>
      )}
      {block.content && (
        <p className="blog-cta__text">{block.content}</p>
      )}
      {block.caption && (
        <Link href="/tokenization" className="blog-cta__btn">
          {block.caption}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
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
  return (
    <div className="blog-block blog-quote">
      <p className="blog-quote__text">{block.content}</p>
      {block.title && (
        <div className="blog-quote__author">
          <div className="blog-quote__avatar">
            {block.title.charAt(0)}
          </div>
          <div>
            <div className="blog-quote__name">{block.title}</div>
            <div className="blog-quote__role">{block.role || ''}</div>
          </div>
        </div>
      )}
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
      {block.caption && <caption>{block.caption}</caption>}
      <table>
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
      <ul>
        {sources.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} className="blog-source__link" target="_blank" rel="noopener noreferrer">
                {s.title || s.url}
              </a>
            ) : (
              <span>{s.title}</span>
            )}
          </li>
        ))}
      </ul>
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
      default:
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }
  };

  return (
    <div className="blog-content">
      {contentBlocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BlogContentRenderer;
