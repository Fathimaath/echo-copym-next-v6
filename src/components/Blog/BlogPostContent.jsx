"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Twitter, Linkedin, Mail, Facebook, Link2, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import RelatedPosts from './RelatedPosts';
import BlogContentRenderer from './BlogContentRenderer';
import Image from '../Image';
import { fetchBlogPostBySlug, fetchBlogPosts, transformApiPost } from '@/services/blogApi';

const BlogBelowFold = dynamic(() => import('./BlogBelowFold'), { ssr: false });

export default function BlogPostContent({ slug, initialArticle, initialRelatedPosts }) {
  const router = useRouter();
  const [article, setArticle] = useState(initialArticle || null);
  const [loading, setLoading] = useState(!initialArticle);
  const [relatedPosts, setRelatedPosts] = useState(initialRelatedPosts || []);
  const [youMayAlsoLike, setYouMayAlsoLike] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [leftSidebarFixed, setLeftSidebarFixed] = useState(true);
  const [rightSidebarFixed, setRightSidebarFixed] = useState(true);
  const [expandedHeadings, setExpandedHeadings] = useState([]);

  const mainContentRef = useRef(null);
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

  // Normalize author data (API posts have authorData, static posts have author string)
  const authorObj = article ? (
    article.authorData || {
      name: typeof article.author === 'string' ? article.author : 'CopyM Team',
      role: '',
      bio: ''
    }
  ) : null;

  // Fetch all posts from API for related posts calculation
  const fetchAllPosts = async () => {
    try {
      const result = await fetchBlogPosts({ category: '', search: '', page: 1, limit: 100 });
      if (result?.data) {
        return result.data.map(p => transformApiPost(p));
      }
    } catch {}
    return [];
  };

  // Calculate related and alsoLike from a pool of posts
  const computeRelated = (currentArticle, allPosts, currentSlug) => {
    const sameCategory = allPosts.filter(p => p.category === currentArticle.category && p.slug !== currentSlug);
    const other = allPosts.filter(p => p.category !== currentArticle.category);
    const related = [...sameCategory, ...other].slice(0, 3);
    const usedSlugs = new Set(related.map(p => p.slug));
    usedSlugs.add(currentSlug);
    const alsoLike = allPosts.filter(p => !usedSlugs.has(p.slug)).slice(0, 3);
    return { related, alsoLike };
  };

  // Find article by slug
  useEffect(() => {
    const fetchPost = async () => {
      if (initialArticle && initialArticle.slug === slug) {
        if (initialRelatedPosts && initialRelatedPosts.length > 0) {
          setRelatedPosts(initialRelatedPosts);
          const usedSlugs = new Set(initialRelatedPosts.map(p => p.slug));
          usedSlugs.add(slug);
          const allPosts = await fetchAllPosts();
          const alsoLike = allPosts.filter(p => !usedSlugs.has(p.slug)).slice(0, 3);
          setYouMayAlsoLike(alsoLike);
        } else {
          const allPosts = await fetchAllPosts();
          // If API returned nothing, fallback with the article itself
          const pool = allPosts.length > 0 ? allPosts : [initialArticle];
          const { related, alsoLike } = computeRelated(initialArticle, pool, slug);
          setRelatedPosts(related);
          setYouMayAlsoLike(alsoLike);
        }
        return;
      }

      // Full fetch
      if (!article || article.slug !== slug) {
        setLoading(true);
      } else {
        return;
      }

      try {
        const apiPost = await fetchBlogPostBySlug(slug);
        const transformedPost = transformApiPost(apiPost);
        setArticle(transformedPost);

        const allPosts = await fetchAllPosts();
        const pool = allPosts.length > 0 ? allPosts : [transformedPost];
        const { related, alsoLike } = computeRelated(transformedPost, pool, slug);
        setRelatedPosts(related);
        setYouMayAlsoLike(alsoLike);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
        fetchPost();
    }
  }, [slug, initialArticle, router]);

  // Unified scroll handler with rAF throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Sidebar fixed/absolute switching
        if (mainContentRef.current) {
          const mainRect = mainContentRef.current.getBoundingClientRect();
          const mainContentEnd = mainRect.bottom < window.innerHeight;
          setLeftSidebarFixed(!mainContentEnd);
          setRightSidebarFixed(!mainContentEnd);
        }

        // Scroll spy for active section highlighting
        if (article) {
          const offset = 200;
          const headings = article.headings || [];
          let currentId = '';
          for (const h of headings) {
            const el = document.getElementById(h.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= offset) {
                currentId = h.id;
              }
            }
          }
          setActiveSection(currentId);
        }

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleShare = (platform) => {
    const shareUrl = window.location.href; // Get URL cleanly on interaction
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      return;
    }

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  // Show loading state while article loads
  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15a36e] mx-auto mb-4"></div>
          <p className="text-gray-600 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Breadcrumbs - fixed on desktop, static on mobile */}
      <div className="pt-28 sm:pt-32 pb-4 lg:pb-8 lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bg-gray-50 lg:z-40">
        <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: article.category, path: `/blog/${article.category.toLowerCase().replace(/\s+/g, '-')}/` },
            { label: article.title }
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
                {article.headings?.map((item, idx) => {
                  if (item.level === 3) {
                    // Skip level 3 headings in main loop - they're rendered with their parent
                    return null;
                  }

                  // Find immediate subheadings (level 3) that come after this heading
                  const subheadings = [];
                  for (let i = idx + 1; i < article.headings.length; i++) {
                    if (article.headings[i].level === 3) {
                      subheadings.push(article.headings[i]);
                    } else if (article.headings[i].level === 2) {
                      break; // Stop at next level 2 heading
                    }
                  }

                  const hasSubheadings = subheadings.length > 0;
                  const isExpanded = expandedHeadings.includes(item.id);

                  const scrollToHeading = (id) => {
                    const el = document.getElementById(id);
                    if (el) {
                      const yOffset = -170; // Offset for fixed navbar + breadcrumbs
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  };

                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          scrollToHeading(item.id);
                          setActiveSection(item.id);
                          // Close all other expanded H2s, toggle current if it has subheadings
                          if (hasSubheadings) {
                            setExpandedHeadings(prev =>
                              prev.includes(item.id) ? [] : [item.id]
                            );
                          } else {
                            setExpandedHeadings([]);
                          }
                        }}
                        className={`w-full text-left block text-sm transition-colors ${
                          activeSection === item.id
                            ? 'text-[#15a36e] font-semibold'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                      >
                        {item.title}
                      </button>
                      {hasSubheadings && isExpanded && (
                        <ul className="mt-2 space-y-1.5 ml-3 border-l-2 border-gray-200 pl-3">
                          {subheadings.map((sub) => (
                            <li key={sub.id}>
                              <a
                                href={`#${sub.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const el = document.getElementById(sub.id);
                                  if (el) {
                                    const yOffset = -170;
                                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                  }
                                  setActiveSection(sub.id);
                                }}
                                className="block text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
                                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                              >
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {sub.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-8" />

            {/* Share */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Share</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Copy Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Column: Main Content (Scrollable) */}
        <main ref={mainContentRef} className="flex-1 min-w-0">
          <article>
            {/* Article Header */}
            <header className="mb-8 sm:mb-10 lg:mb-12 pt-8 lg:pt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 uppercase tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed !mb-8" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                  {article.subtitle}
                </p>
              )}

              {/* Author, Category & Meta Row */}
              <div className="flex flex-wrap items-center gap-3 py-5 border-y border-gray-100 mb-7">
                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#15a36e]/20 flex items-center justify-center flex-shrink-0">
                    {authorObj?.avatar ? (
                      <Image src={authorObj.avatar} alt={authorObj.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-[#15a36e]">{authorObj?.name?.charAt(0) || 'C'}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      {authorObj?.name || 'CopyM Team'}
                    </p>
                    <p className="text-xs text-gray-500 !mb-0">{authorObj?.role || 'Research Team'}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

                {/* Category */}
                <span className="bg-[#15a36e]/10 text-[#15a36e] px-3.5 py-1.5 text-xs font-semibold rounded" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                  {article.category}
                </span>

                {/* Date & Read Time */}
                <div className="flex items-center gap-3.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              {article.image && (
                <div className="rounded-xl overflow-hidden mb-10">
                  <Image src={article.image} alt={article.title} className="w-full h-40 sm:h-56 md:h-72 lg:h-96 object-cover" />
                </div>
              )}
            </header>

            {/* Article Body */}
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {/* Render contentBlocks as React components (admin posts) */}
              {article.contentBlocks && article.contentBlocks.length > 0 ? (
                <BlogContentRenderer contentBlocks={article.contentBlocks} />
              ) : (
                /* Fallback for static posts without contentBlocks */
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              )}
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
                .prose h2 {
                  font-size: 1.5rem !important;
                }
              }
              @media (min-width: 1024px) {
                .prose h2 {
                  font-size: 1.75rem !important;
                }
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
                .prose h3 {
                  font-size: 1.25rem !important;
                }
              }
              .prose p {
                color: #374151 !important;
                line-height: 1.75 !important;
                margin-bottom: 1.25rem !important;
                font-size: 0.9rem !important;
              }
              @media (min-width: 640px) {
                .prose p {
                  font-size: 1rem !important;
                }
              }
              @media (min-width: 1024px) {
                .prose p {
                  font-size: 1.1rem !important;
                }
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
              /* Hide scrollbar for left sidebar TOC */
              .overflow-y-auto {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
              }
              .overflow-y-auto::-webkit-scrollbar {
                display: none !important;
              }

              /* ============================================
                 INSERTABLE CONTENT BLOCKS
                 ============================================ */

              /* --- Base block style --- */
              .blog-block {
                margin: 2.5rem 0 !important;
                border-radius: 1rem !important;
                overflow: hidden !important;
                font-family: var(--font-palanquin), 'Palanquin', sans-serif !important;
              }

              /* --- CTA Block --- */
              .blog-cta {
                background: #ffffff !important;
                border: 2px solid #e5e7eb !important;
                border-left: 2px solid #e5e7eb !important;
                border-radius: 1rem !important;
                padding: 2rem 1.5rem !important;
                position: relative !important;
                overflow: hidden !important;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06) !important;
                text-align: center !important;
              }
              .blog-cta h3,
              .blog-cta__title {
                color: #000000 !important;
                border-left: none !important;
                padding-left: 0 !important;
                font-size: 1.25rem !important;
                font-weight: 700 !important;
                margin: 0 0 0.5rem !important;
                line-height: 1.3 !important;
              }
              .blog-cta__text {
                color: #6b7280 !important;
                font-size: 0.9rem !important;
                line-height: 1.6 !important;
                margin: 0 0 1.25rem !important;
              }
              .blog-cta__btn {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.5rem !important;
                background: #15a36e !important;
                color: #fff !important;
                font-weight: 600 !important;
                font-size: 0.875rem !important;
                padding: 0.625rem 1.5rem !important;
                border-radius: 9999px !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
                border: none !important;
                box-shadow: 0 4px 12px rgba(21, 163, 110, 0.3) !important;
              }
              .blog-cta__btn:hover {
                background: #12a062 !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 20px rgba(21, 163, 110, 0.4) !important;
              }

              /* --- Fast Fact / Key Fact Block --- */
              .blog-fast-fact {
                background: #f0fdf7 !important;
                border-left: 4px solid #15a36e !important;
                padding: 1.25rem 1.5rem !important;
              }
              .blog-fast-fact__label {
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #15a36e !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-fast-fact__value {
                color: #111827 !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                line-height: 1.5 !important;
                margin: 0 !important;
              }
              @media (min-width: 640px) {
                .blog-fast-fact__value {
                  font-size: 1.125rem !important;
                }
              }

              /* --- Quote Block --- */
              .blog-quote {
                background: #fafafa !important;
                border-left: 4px solid #15a36e !important;
                padding: 1.5rem 2rem !important;
                position: relative !important;
              }
              .blog-quote::before {
                content: '\\201C' !important;
                position: absolute !important;
                top: 0.5rem !important;
                left: 1rem !important;
                font-size: 4rem !important;
                color: rgba(21, 163, 110, 0.1) !important;
                line-height: 1 !important;
              }
              .blog-quote__text {
                color: #1f2937 !important;
                font-size: 0.95rem !important;
                font-style: italic !important;
                line-height: 1.7 !important;
                margin: 0 0 1rem !important;
                position: relative;
                z-index: 1;
              }
              @media (min-width: 640px) {
                .blog-quote__text {
                  font-size: 1.05rem !important;
                }
              }
              .blog-quote__author {
                display: flex !important;
                align-items: center !important;
                gap: 0.75rem !important;
              }
              .blog-quote__avatar {
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                background: rgba(21, 163, 110, 0.15) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                color: #15a36e !important;
                font-weight: 700 !important;
                font-size: 1rem !important;
                flex-shrink: 0 !important;
              }
              .blog-quote__avatar img {
                width: 100% !important;
                height: 100% !important;
                border-radius: 50% !important;
                object-fit: cover !important;
              }
              .blog-quote__name {
                font-weight: 600 !important;
                font-size: 0.875rem !important;
                color: #111827 !important;
              }
              .blog-quote__role {
                font-size: 0.75rem !important;
                color: #6b7280 !important;
              }

              /* --- Callout Block --- */
              .blog-callout {
                padding: 1.25rem 1.5rem !important;
              }
              .blog-callout__content {
                width: 100% !important;
              }
              .blog-callout__title {
                font-weight: 700 !important;
                font-size: 0.875rem !important;
                margin: 0 0 0.25rem !important;
              }
              .blog-callout__text {
                font-size: 0.875rem !important;
                line-height: 1.6 !important;
                margin: 0 !important;
              }

              /* Callout variants */
              .blog-callout--info {
                background: #eff6ff !important;
                border-left: 4px solid #3b82f6 !important;
              }
              .blog-callout--info .blog-callout__title { color: #1e40af !important; }
              .blog-callout--info .blog-callout__text { color: #1e3a5f !important; }

              .blog-callout--warning {
                background: #fefce8 !important;
                border-left: 4px solid #eab308 !important;
              }
              .blog-callout--warning .blog-callout__title { color: #854d0e !important; }
              .blog-callout--warning .blog-callout__text { color: #713f12 !important; }

              .blog-callout--note {
                background: #f5f3ff !important;
                border-left: 4px solid #8b5cf6 !important;
              }
              .blog-callout--note .blog-callout__title { color: #5b21b6 !important; }
              .blog-callout--note .blog-callout__text { color: #4c1d95 !important; }

              .blog-callout--success {
                background: #f0fdf7 !important;
                border-left: 4px solid #15a36e !important;
              }
              .blog-callout--success .blog-callout__title { color: #065f46 !important; }
              .blog-callout--success .blog-callout__text { color: #064e3b !important; }

              /* --- Table Block --- */
              .blog-table {
                border: 1px solid #e5e7eb !important;
                border-radius: 0.75rem !important;
                overflow: hidden !important;
              }
              @media (max-width: 1023px) {
                .blog-table {
                  overflow-x: auto !important;
                  -webkit-overflow-scrolling: touch !important;
                  /* Hide scrollbar visually */
                  -ms-overflow-style: none !important;
                  scrollbar-width: none !important;
                }
                .blog-table::-webkit-scrollbar {
                  display: none !important;
                }
                .blog-table table {
                  min-width: 600px !important;
                }
              }
              .blog-table table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 0 !important;
                font-size: 0.875rem !important;
              }
              .blog-table thead {
                background: #f9fafb !important;
              }
              .blog-table th {
                color: #111827 !important;
                font-weight: 600 !important;
                text-align: left !important;
                padding: 0.875rem 1rem !important;
                border-bottom: 2px solid #e5e7eb !important;
              }
              .blog-table td {
                color: #4b5563 !important;
                padding: 0.75rem 1rem !important;
                border-bottom: 1px solid #f3f4f6 !important;
              }
              .blog-table tbody tr:last-child td {
                border-bottom: none !important;
              }
              .blog-table tbody tr:hover {
                background: #f9fafb !important;
              }

              /* --- Image + Caption Block --- */
              .blog-image {
                margin: 2rem 0 !important;
                border-radius: 0.75rem !important;
                overflow: hidden !important;
                background: #f9fafb !important;
              }
              .blog-image img {
                width: 100% !important;
                height: auto !important;
                display: block !important;
              }
              .blog-image__caption {
                padding: 0.75rem 1rem !important;
                font-size: 0.8rem !important;
                color: #6b7280 !important;
                text-align: center !important;
                font-style: italic !important;
                border-top: 1px solid #e5e7eb !important;
              }

              /* --- Source / Reference Block --- */
              .blog-source {
                background: #f9fafb !important;
                border-left: 4px solid #d1d5db !important;
                padding: 1rem 1.25rem !important;
                margin: 2rem 0 !important;
              }
              .blog-source__title {
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #6b7280 !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-source__link {
                color: #15a36e !important;
                font-size: 0.85rem !important;
                text-decoration: underline !important;
                word-break: break-all !important;
                transition: color 0.2s !important;
              }
              .blog-source__link:hover {
                color: #0e7a4f !important;
              }

              /* --- Related Article Inline Block --- */
              .blog-related-article {
                background: linear-gradient(135deg, #f0fdf7 0%, #ffffff 100%) !important;
                border: 1px solid rgba(21, 163, 110, 0.2) !important;
                border-radius: 0.75rem !important;
                padding: 1.25rem 1.5rem !important;
                transition: all 0.3s ease !important;
              }
              .blog-related-article:hover {
                border-color: rgba(21, 163, 110, 0.4) !important;
                box-shadow: 0 4px 24px rgba(21, 163, 110, 0.08) !important;
              }
              .blog-related-article__label {
                display: inline-flex !important;
                align-items: center !important;
                gap: 0.375rem !important;
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #15a36e !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-related-article__title {
                color: #111827 !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                margin: 0 0 0.25rem !important;
                text-decoration: none !important;
                transition: color 0.2s !important;
              }
              .blog-related-article__title:hover {
                color: #15a36e !important;
              }
              .blog-related-article__meta {
                font-size: 0.75rem !important;
                color: #9ca3af !important;
              }

              /* --- Responsive --- */
              @media (max-width: 768px) {
                .blog-cta { padding: 1.5rem 1rem !important; }
                .blog-cta__title { font-size: 1.1rem !important; }
                .blog-quote { padding: 1.25rem 1rem !important; }
                .blog-quote::before { font-size: 3rem !important; }
                .blog-fast-fact { padding: 1rem 1.25rem !important; }
                .blog-table table { font-size: 0.8rem !important; }
              }
            `}</style>

            <BlogBelowFold article={article} relatedPosts={relatedPosts} youMayAlsoLike={youMayAlsoLike} />
          </article>
        </main>

        {/* Right Column: Sidebar */}
        <aside ref={rightSidebarRef} className="hidden lg:block w-[280px] flex-shrink-0">
          <div className={rightSidebarFixed ? 'fixed right-[24px] sm:right-[48px] md:right-[64px] lg:right-[96px] xl:right-[128px] top-[220px] w-[280px]' : ''}>
            <div className="space-y-4 pb-8">
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                You May Also Like
              </h4>
              <div className="space-y-2">
                {youMayAlsoLike.map((post) => (
                  <Link
                    key={post.id || post.slug}
                    href={`/blog/${post.category?.toLowerCase().replace(/\s+/g, '-')}/${post.slug}`}
                    className="group block py-2 border-b border-gray-100 hover:border-[#15a36e] transition-colors last:border-0"
                  >
                    <span className="text-xs font-semibold text-[#15a36e]" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      {post.category}
                    </span>
                    <h5 className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-[#15a36e] transition-colors" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      {post.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-0.5 !mb-0">{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>
            {/* Newsletter CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0E0C15] to-[#1a1a1a] p-5 rounded-2xl border border-[#15a36e]/30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#15a36e]/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#15a36e] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#15a36e]/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      Subscribe to Newsletter
                    </h4>
                    <p className="text-xs text-gray-400 !mb-0">Get latest updates & insights</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Subscribe Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        </div>
      </div>

      {/* Related Posts - Full Width Section */}
      <section className="bg-gray-50 py-6 sm:py-8">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <RelatedPosts posts={relatedPosts} title="Related Articles" />
        </div>
      </section>
    </div>
  );
}
