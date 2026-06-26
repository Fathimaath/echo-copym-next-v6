import React from 'react';
import Link from "next/link";
import Image from '../Image';

const ContentBlocks = {};

/* ==============================
   1. CTA BLOCK
   ============================== */
ContentBlocks.CTA = ({ title, text, buttonText, buttonLink, variant = 'default' }) => {
  const variants = {
    default: 'bg-gradient-to-r from-[#0E0C15] to-[#1a1a1a] border-[#15a36e]/30',
    green: 'bg-gradient-to-r from-[#15a36e] to-emerald-600 border-[#15a36e]/50',
    light: 'bg-white border-gray-200 shadow-lg',
  };

  return (
    <div className={`blog-block blog-cta ${variants[variant]}`}>
      <h3 className="blog-cta__title">{title}</h3>
      <p className="blog-cta__text">{text}</p>
      {buttonLink.startsWith('/') ? (
        <Link href={buttonLink} className="blog-cta__btn">
          {buttonText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      ) : (
        <a href={buttonLink} className="blog-cta__btn" target="_blank" rel="noopener noreferrer">
          {buttonText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      )}
    </div>
  );
};

/* ==============================
   2. FAST FACT / KEY FACT BLOCK
   ============================== */
ContentBlocks.FastFact = ({ label = 'Fast Fact', value }) => (
  <div className="blog-block blog-fast-fact">
    <div className="blog-fast-fact__label">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
      {label}
    </div>
    <p className="blog-fast-fact__value">{value}</p>
  </div>
);

/* ==============================
   3. QUOTE BLOCK
   ============================== */
ContentBlocks.Quote = ({ text, author, role, avatar }) => (
  <div className="blog-block blog-quote">
    <p className="blog-quote__text">{text}</p>
    <div className="blog-quote__author">
      <div className="blog-quote__avatar">
        {avatar ? <Image src={avatar} alt={author} /> : author?.charAt(0)}
      </div>
      <div>
        <div className="blog-quote__name">{author}</div>
        <div className="blog-quote__role">{role}</div>
      </div>
    </div>
  </div>
);

/* ==============================
   4. CALLOUT BLOCK
   ============================== */
ContentBlocks.Callout = ({ variant = 'info', title, text, icon }) => {
  const icons = {
    info: (
      <svg className="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    note: (
      <svg className="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className={`blog-block blog-callout blog-callout--${variant}`}>
      {icon || icons[variant]}
      <div className="blog-callout__content">
        {title && <div className="blog-callout__title">{title}</div>}
        <p className="blog-callout__text">{text}</p>
      </div>
    </div>
  );
};

/* ==============================
   5. TABLE BLOCK
   ============================== */
ContentBlocks.Table = ({ headers, rows, caption }) => (
  <div className="blog-block blog-table">
    <table>
      {caption && <caption className="text-sm text-gray-500 pb-2 text-left">{caption}</caption>}
      <thead>
        <tr>
          {headers.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => <td key={j}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ==============================
   6. IMAGE + CAPTION BLOCK
   ============================== */
ContentBlocks.Image = ({ src, alt, caption }) => (
  <div className="blog-block blog-image">
    <Image src={src} alt={alt || ''} />
    {caption && <div className="blog-image__caption">{caption}</div>}
  </div>
);

/* ==============================
   7. SOURCE / REFERENCE BLOCK
   ============================== */
ContentBlocks.Source = ({ title = 'Source', sources }) => (
  <div className="blog-block blog-source">
    <div className="blog-source__title">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      {title}
    </div>
    {Array.isArray(sources) ? (
      <ul className="m-0 space-y-1">
        {sources.map((s, i) => (
          <li key={i}>
            <a href={s.url} className="blog-source__link" target="_blank" rel="noopener noreferrer">{s.label || s.url}</a>
          </li>
        ))}
      </ul>
    ) : (
      <a href={sources.url} className="blog-source__link" target="_blank" rel="noopener noreferrer">
        {sources.label || sources.url}
      </a>
    )}
  </div>
);

/* ==============================
   8. RELATED ARTICLE INLINE BLOCK
   ============================== */
ContentBlocks.RelatedArticle = ({ title, slug, category, date }) => (
  <Link href={`/blog/${slug}`} className="blog-block blog-related-article">
    <div className="blog-related-article__label">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      Related Article
    </div>
    <div className="blog-related-article__title">{title}</div>
    <div className="blog-related-article__meta">
      {category && <span>{category}</span>}
      {category && date && <span> • </span>}
      {date && <span>{date}</span>}
    </div>
  </Link>
);

export default ContentBlocks;
