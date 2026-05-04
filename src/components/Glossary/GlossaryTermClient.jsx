'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiLink, FiCalendar, FiClock, FiTwitter, FiLinkedin, FiMail, FiFacebook } from 'react-icons/fi';
import Breadcrumbs from '@/components/Blog/Breadcrumbs';

export default function GlossaryTermClient({ termData, slug }) {
  const [activeSection, setActiveSection] = useState('');
  const [leftSidebarFixed, setLeftSidebarFixed] = useState(true);
  const [rightSidebarFixed, setRightSidebarFixed] = useState(true);

  const mainContentRef = useRef(null);
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle scroll spy and sidebar fixed/absolute switching
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const mainRect = mainContentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const mainContentEnd = mainRect.bottom < windowHeight;
        setLeftSidebarFixed(!mainContentEnd);
        setRightSidebarFixed(!mainContentEnd);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll spy for active section highlighting
  useEffect(() => {
    if (!termData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    termData.headings?.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [termData]);

  const handleShare = (platform) => {
    if (!shareUrl) return;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(termData.term)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(termData.term)}&body=${encodeURIComponent(shareUrl)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      return;
    }

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!termData) return null;

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Breadcrumbs - Sticky on desktop, static on mobile */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-gray-50 z-40 pt-28">
        <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pb-8">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Glossary', path: '/glossary' },
            { label: termData.term }
          ]} />
        </div>
      </div>

      {/* Mobile Breadcrumbs - Static */}
      <div className="lg:hidden pt-28 sm:pt-32 pb-4">
        <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Glossary', path: '/glossary' },
            { label: termData.term }
          ]} />
        </div>
      </div>

      {/* Spacer for desktop fixed breadcrumbs */}
      <div className="hidden lg:block h-28"></div>

      {/* Main Content Layout */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Column: Table of Contents */}
          <aside ref={leftSidebarRef} className="hidden lg:block w-[200px] flex-shrink-0">
            <div className={leftSidebarFixed ? 'fixed left-[24px] sm:left-[48px] md:left-[64px] lg:left-[96px] xl:left-[128px] top-[220px] w-[200px] max-h-[calc(100vh-240px)] overflow-y-auto touch-auto' : 'max-h-[calc(100vh-240px)] overflow-y-auto touch-auto'} style={leftSidebarFixed ? { WebkitOverflowScrolling: 'touch' } : {}}>
              <div className="space-y-8 pb-8">
                <h3 className="text-sm font-bold mb-6 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Table of Contents</h3>
                <nav className="space-y-5">
                  {termData.headings?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToHeading(item.id);
                        setActiveSection(item.id);
                      }}
                      className={`w-full text-left block text-sm transition-colors ${activeSection === item.id
                          ? 'text-[#15a36e] font-semibold'
                          : 'text-gray-500 hover:text-gray-900'
                        }`}
                      style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>

                {/* Divider */}
                <hr className="border-gray-200 my-8" />

                {/* Share */}
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Share</h4>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"><FiTwitter className="w-4 h-4" /></button>
                    <button onClick={() => handleShare('linkedin')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"><FiLinkedin className="w-4 h-4" /></button>
                    <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"><FiFacebook className="w-4 h-4" /></button>
                    <button onClick={() => handleShare('email')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"><FiMail className="w-4 h-4" /></button>
                    <button onClick={() => handleShare('copy')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"><FiLink className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Middle Column: Main Content (Scrollable) */}
          <main ref={mainContentRef} className="flex-1 min-w-0">
            <article>
              {/* Term Header */}
              <header className="mb-12 pt-8 lg:pt-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <Link
                    href={`/glossary?letter=${termData.letter}`}
                    className="px-2.5 py-1 sm:px-3 sm:py-1 bg-[#15a36e]/10 text-[#15a36e] text-xs font-bold rounded-full uppercase tracking-wide hover:bg-[#15a36e] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {termData.letter}
                  </Link>
                  <Link
                    href="/glossary"
                    className="px-2.5 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide hover:bg-[#15a36e] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Glossary
                  </Link>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 uppercase tracking-tight text-gray-900 break-words" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                  {termData.term}
                </h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-base md:text-lg italic font-mono bg-gray-50 px-2 py-1 rounded break-all">{termData.pronunciation}</span>
                  <span className="text-sm italic text-gray-300">•</span>
                  <span className="text-sm italic">{termData.partOfSpeech}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 py-5 border-y border-gray-100 mb-7">
                  <div className="flex items-center gap-3.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5" />
                      Updated: {termData.lastUpdated}
                    </span>
                  </div>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  {termData.fullDefinition}
                </p>
              </header>

              <hr className="border-gray-200 mb-10" />

              {/* Content Sections */}
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  id="about"
                >
                  <h2 id="about-heading" className="text-2xl font-bold text-gray-900 mt-8 mb-4">About {termData.term}</h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: termData.detailedExplanation }}
                  />
                </motion.section>

                {termData.examples && termData.examples.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    id="examples"
                    className="mt-12"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4 sm:mb-6">Examples</h2>
                    <div className="space-y-4">
                      {termData.examples.map((example, index) => (
                        <div key={example.id || index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#15a36e] flex items-center justify-center text-white font-bold text-[10px] mt-2">
                            {index + 1}
                          </span>
                          <p className="text-base text-gray-700 leading-relaxed pt-1 flex-1">{example.text || example}</p>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Mobile Only Sidebars */}
                <div className="lg:hidden mt-10 mb-10 space-y-8">
                  {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Related Terms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {termData.relatedTerms.map((related) => (
                          <Link
                            key={related.slug}
                            href={`/glossary/${related.slug}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#15a36e] hover:text-white border border-gray-300 hover:border-[#15a36e] rounded-lg text-sm font-medium text-gray-700 transition-all duration-300"
                          >
                            <FiLink className="w-3.5 h-3.5" />
                            {related.term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      Quick Info
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Letter</span>
                        <Link
                          href={`/glossary?letter=${termData.letter}`}
                          className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg hover:bg-[#15a36e] hover:text-white transition-all duration-300"
                        >
                          {termData.letter}
                        </Link>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Category</span>
                        <Link
                          href="/glossary"
                          className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg hover:bg-[#15a36e] hover:text-white transition-all duration-300"
                        >
                          Glossary
                        </Link>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Updated</span>
                        <span className="text-sm font-semibold text-gray-900">{termData.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {termData.relatedArticles && (
                  <motion.section id="related-articles" className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {termData.relatedArticles.map((article, index) => (
                        <Link key={index} href={`/blog/${article.slug}`} className="group">
                          <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-100 mb-3">
                            <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-[#15a36e]">{article.title}</h4>
                        </Link>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>

              <motion.div className="mt-10">
                <div className="blog-block blog-cta">
                  <h3 className="blog-cta__title">Ready to Learn More?</h3>
                  <p className="blog-cta__text">Explore our comprehensive guides on {termData.term.toLowerCase()} and start your journey today.</p>
                  <Link href="/blog" className="blog-cta__btn">Explore Resources</Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Disclaimer</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    This content is for informational and educational purposes only and does not constitute financial, legal, or investment advice. The information provided is based on generally accepted definitions and may vary depending on context. Always conduct your own research and consult with qualified professionals before making any investment or financial decisions.
                  </p>
                </div>
              </motion.div>
            </article>
          </main>

          {/* Right Column: Sidebar */}
          <aside ref={rightSidebarRef} className="hidden lg:block w-[240px] flex-shrink-0">
            <div className={rightSidebarFixed ? 'fixed right-[24px] sm:right-[48px] md:right-[64px] lg:right-[96px] xl:right-[128px] top-[220px] w-[240px]' : ''}>
              <div className="space-y-4 pb-4">
                {/* Related Terms */}
                {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      Related Terms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {termData.relatedTerms.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/glossary/${related.slug}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#15a36e] hover:text-white border border-gray-200 hover:border-[#15a36e] rounded text-xs font-medium text-gray-700 transition-all duration-300"
                        >
                          <FiLink className="w-3 h-3" />
                          {related.term}
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-200 my-4" />
                  </>
                )}

                {/* Quick Info */}
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    Quick Info
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500">Letter</span>
                      <Link
                        href={`/glossary?letter=${termData.letter}`}
                        className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded hover:bg-[#15a36e] hover:text-white transition-all duration-300"
                      >
                        {termData.letter}
                      </Link>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500">Category</span>
                      <Link
                        href="/glossary"
                        className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded hover:bg-[#15a36e] hover:text-white transition-all duration-300"
                      >
                        Glossary
                      </Link>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-xs text-gray-500">Updated</span>
                      <span className="text-xs font-semibold text-gray-900">{termData.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 my-4" />

                {/* Newsletter Subscription */}
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    Subscribe for Updates
                  </h4>
                  <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    Get the latest glossary updates delivered to your inbox.
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#15a36e] focus:ring-1 focus:ring-[#15a36e]/20 transition-all"
                      style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#15a36e] hover:bg-[#128a5c] text-white py-2 rounded font-semibold text-xs transition-colors"
                      style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .prose h2 {
          color: #111827 !important;
          font-weight: 700 !important;
          font-size: 1.25rem !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          padding-bottom: 0.5rem !important;
          border-bottom: 2px solid #e5e7eb !important;
          letter-spacing: -0.025em !important;
          text-transform: uppercase !important;
        }
        @media (min-width: 640px) {
          .prose h2 { font-size: 1.5rem !important; }
        }
        @media (min-width: 1024px) {
          .prose h2 { font-size: 1.75rem !important; }
        }
        .prose h3 {
          color: #15a36e !important;
          font-weight: 600 !important;
          font-size: 1.1rem !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
          padding-left: 0.75rem !important;
          border-left: 3px solid #15a36e !important;
          letter-spacing: -0.01em !important;
        }
        @media (min-width: 640px) {
          .prose h3 { font-size: 1.25rem !important; }
        }
        .prose p {
          color: #374151 !important;
          line-height: 1.8 !important;
          margin-bottom: 1.25rem !important;
          font-size: 1rem !important;
        }
        .prose ul {
          margin-top: 0.75rem !important;
          margin-bottom: 1.25rem !important;
          padding-left: 0 !important;
        }
        .prose li {
          color: #4b5563 !important;
          margin-bottom: 0.625rem !important;
          line-height: 1.6 !important;
        }
        .prose strong {
          color: #1f2937 !important;
          font-weight: 600 !important;
        }
        .overflow-y-auto::-webkit-scrollbar { width: 4px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #9ca3af; }

        .blog-block { margin: 2rem 0; border-radius: 0.5rem; overflow: hidden; font-family: 'var(--font-palanquin)', Palanquin, sans-serif; }
        .blog-fast-fact { background: #f0fdf7; border-left: 4px solid #15a36e; padding: 1.25rem 1.5rem; }
        .blog-fast-fact__label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #15a36e; margin-bottom: 0.5rem; }
        .blog-fast-fact__value { color: #111827; font-size: 1.1rem; font-weight: 600; line-height: 1.5; margin: 0; }
        .blog-quote { background: #fafafa; border-left: 4px solid #15a36e; padding: 1.5rem 2rem; position: relative; }
        .blog-quote::before { content: '\\201C'; position: absolute; top: 0.5rem; left: 1rem; font-size: 4rem; color: rgba(21, 163, 110, 0.1); line-height: 1; }
        .blog-quote__text { color: #1f2937; font-size: 1.05rem; font-style: italic; line-height: 1.7; margin: 0 0 1rem; position: relative; z-index: 1; }
        .blog-quote__author { display: flex; align-items: center; gap: 0.75rem; }
        .blog-quote__avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(21, 163, 110, 0.15); display: flex; align-items: center; justify-content: center; color: #15a36e; font-weight: 700; font-size: 1.2rem; }
        .blog-quote__name { color: #111827; font-weight: 700; font-size: 0.9rem; }
        .blog-quote__role { color: #6b7280; font-size: 0.8rem; }
        .blog-callout { padding: 1.25rem 1.5rem; border-left: 4px solid; display: flex; gap: 1rem; align-items: flex-start; }
        .blog-callout--warning { background: #fffbeb; border-color: #f59e0b; }
        .blog-callout__title { font-weight: 700; margin-bottom: 0.25rem; font-size: 1rem; }
        .blog-callout--warning .blog-callout__title { color: #b45309; }
        .blog-callout__text { color: #4b5563; font-size: 0.95rem; margin: 0; line-height: 1.6; }
        .blog-table { overflow-x: auto; margin: 2rem 0; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
        .blog-table table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; }
        .blog-table th { background: #f9fafb; padding: 1rem 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; }
        .blog-table td { padding: 1rem 1.25rem; border-bottom: 1px solid #e5e7eb; color: #374151; }
        .blog-table tr:last-child td { border-bottom: none; }
        .blog-source { background: #f9fafb; padding: 1.25rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; margin-top: 3rem; }
        .blog-source__title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 0.75rem; }
        .blog-source__link { display: inline-flex; align-items: center; gap: 0.5rem; color: #15a36e; font-weight: 600; font-size: 0.9rem; text-decoration: none; word-break: break-all; }
        .blog-source__link:hover { color: #128a5c; text-decoration: underline; }

        /* --- CTA Block --- */
        .blog-cta {
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        .blog-cta h3,
        .blog-cta__title {
          color: #000000;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }
        .blog-cta__text {
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0 0 1.25rem;
        }
        .blog-cta__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #15a36e;
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.625rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 12px rgba(21, 163, 110, 0.3);
        }
        .blog-cta__btn:hover {
          background: #12a062;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(21, 163, 110, 0.4);
        }

        /* --- Responsive --- */
        @media (max-width: 768px) {
          .blog-cta { padding: 1.5rem 1rem; }
          .blog-cta__title { font-size: 1.1rem; }
          .blog-quote { padding: 1.25rem 1rem; }
          .blog-quote::before { font-size: 3rem; }
          .blog-fast-fact { padding: 1rem 1.25rem; }
        }
      `}</style>
    </div>
  );
}
