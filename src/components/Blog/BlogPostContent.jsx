"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTwitter, FiLinkedin, FiMail, FiFacebook, FiLink, FiCalendar, FiClock, FiUser, FiChevronRight } from 'react-icons/fi';
import DisclaimerBlock from './DisclaimerBlock';
import RelatedPosts from './RelatedPosts';
import Breadcrumbs from './Breadcrumbs';
import BlogContentRenderer from './BlogContentRenderer';
import { fetchBlogPostBySlug, transformApiPost } from '@/services/blogApi';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';

export default function BlogPostContent({ slug, initialArticle }) {
  const router = useRouter();
  const [article, setArticle] = useState(initialArticle || null);
  const [loading, setLoading] = useState(!initialArticle);
  const [relatedPosts, setRelatedPosts] = useState([]);
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

  // Find article by slug
  useEffect(() => {
    const fetchPost = async () => {
      // 1. If we have SSR data, use it to populate everything and SKIP fetch
      if (initialArticle && initialArticle.slug === slug) {
        setArticle(initialArticle);
        setLoading(false);
        
        // Calculate related posts using the initial data
        const allPosts = [...staticBlogPosts];
        // If it's an admin post not in static list, add it for calculations
        if (!allPosts.some(p => p.slug === initialArticle.slug)) {
          allPosts.push(initialArticle);
        }
        
        const sameCategoryPosts = allPosts.filter(p => p.category === initialArticle.category && p.slug !== slug);
        const otherPosts = allPosts.filter(p => p.category !== initialArticle.category);
        const allRelated = [...sameCategoryPosts, ...otherPosts].slice(0, 3);
        setRelatedPosts(allRelated);

        const usedSlugs = new Set(allRelated.map(p => p.slug));
        usedSlugs.add(slug);
        const alsoLike = allPosts.filter(p => !usedSlugs.has(p.slug)).slice(0, 3);
        setYouMayAlsoLike(alsoLike);
        
        return; // Success, no need to fetch
      }

      // 2. Otherwise, perform full fetch (e.g. client-side navigation)
      if (!article || article.slug !== slug) {
        setLoading(true);
      } else {
        return; 
      }

      try {
        // Try API first
        const apiPost = await fetchBlogPostBySlug(slug);
        const transformedPost = transformApiPost(apiPost);
        setArticle(transformedPost);

        const allPosts = [transformedPost, ...staticBlogPosts.filter(p => p.slug !== transformedPost.slug)];
        const sameCategoryPosts = allPosts.filter(p => p.category === transformedPost.category && p.slug !== slug);
        const otherPosts = allPosts.filter(p => p.category !== transformedPost.category);
        const allRelated = [...sameCategoryPosts, ...otherPosts].slice(0, 3);
        setRelatedPosts(allRelated);

        const usedSlugs = new Set(allRelated.map(p => p.slug));
        usedSlugs.add(slug);
        const alsoLike = allPosts.filter(p => !usedSlugs.has(p.slug)).slice(0, 3);
        setYouMayAlsoLike(alsoLike);
      } catch (error) {
        // Fallback to static posts
        const staticPost = staticBlogPosts.find(p => p.slug === slug);
        if (staticPost) {
          setArticle(staticPost);
          const allPosts = staticBlogPosts.filter(p => p.slug !== slug);
          const sameCategoryPosts = allPosts.filter(p => p.category === staticPost.category);
          const otherPosts = allPosts.filter(p => p.category !== staticPost.category);
          const allRelated = [...sameCategoryPosts, ...otherPosts].slice(0, 3);
          setRelatedPosts(allRelated);

          const usedSlugs = new Set(allRelated.map(p => p.slug));
          usedSlugs.add(slug);
          const alsoLike = allPosts.filter(p => !usedSlugs.has(p.slug)).slice(0, 3);
          setYouMayAlsoLike(alsoLike);
        } else {
          console.error('Failed to fetch post:', error);
          router.push('/blog');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
        fetchPost();
    }
  }, [slug, initialArticle, router]);

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

  // Enable wheel scrolling for left sidebar
  useEffect(() => {
    const leftSidebarEl = leftSidebarRef.current?.querySelector('div');

    if (leftSidebarEl && leftSidebarFixed) {
      const handleWheel = (e) => {
        e.stopPropagation();
      };

      leftSidebarEl.addEventListener('wheel', handleWheel, { passive: true });
      return () => leftSidebarEl.removeEventListener('wheel', handleWheel);
    }
  }, [leftSidebarFixed]);

  // Handle scroll spy for active section highlighting
  useEffect(() => {
    if (!article) return;

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

    article.headings?.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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
      {/* Breadcrumbs - Sticky on desktop, static on mobile */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-gray-50 z-40 pt-28">
        <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pb-8">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: article.category, path: `/blog?category=${article.category.toLowerCase()}` },
            { label: article.title }
          ]} />
        </div>
      </div>

      {/* Mobile Breadcrumbs - Static */}
      <div className="lg:hidden pt-28 sm:pt-32 pb-4">
        <div className="px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: article.category, path: `/blog?category=${article.category.toLowerCase()}` },
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
                      const yOffset = -120; // Offset for fixed header/breadcrumbs
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
                                    const yOffset = -120;
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
                  <FiTwitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <FiLinkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share on Facebook"
                >
                  <FiFacebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Share via Email"
                >
                  <FiMail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Copy Link"
                >
                  <FiLink className="w-4 h-4" />
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
                      <img src={authorObj.avatar} alt={authorObj.name} className="w-full h-full rounded-full object-cover" />
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
                    <FiCalendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              {article.image && (
                <div className="rounded-xl overflow-hidden mb-10">
                  <img src={article.image} alt={article.title} className="w-full h-40 sm:h-56 md:h-72 lg:h-96 object-cover" />
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
              /* Custom scrollbar for left sidebar */
              .overflow-y-auto::-webkit-scrollbar {
                width: 4px;
              }
              .overflow-y-auto::-webkit-scrollbar-track {
                background: transparent;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 2px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
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

            {/* Author & Reviewer Section - CopyM Style */}
            <section className="my-8 sm:my-12">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Author Card */}
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col" style={{ boxShadow: '0px 4px 48.9px 0px #BDE3D5' }}>
                  <div className="p-4 sm:p-6 flex-1">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {authorObj?.avatar ? (
                          <img src={authorObj.avatar} alt={authorObj.name} className="w-full h-full rounded-lg object-cover" />
                        ) : (
                          <span className="text-xl font-bold text-[#15a36e]">{authorObj?.name?.charAt(0) || 'C'}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#15a36e] block mb-1">Written By</span>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                          {authorObj?.name || 'CopyM Team'}
                        </h4>
                        <p className="text-xs text-gray-500 mb-3 !mb-3">{authorObj?.role || 'Research Team'}</p>
                        <p className="text-sm text-gray-600 leading-relaxed !mb-0">{authorObj?.bio || 'Our research team analyzes market trends and emerging technologies in blockchain and tokenization.'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"></div>
                </div>

                {/* Reviewer Card */}
                {article.reviewer && (
                  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col" style={{ boxShadow: '0px 4px 48.9px 0px #BDE3D5' }}>
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {article.reviewer.avatar ? (
                            <img src={article.reviewer.avatar} alt={article.reviewer.name} className="w-full h-full rounded-lg object-cover" />
                          ) : (
                            <span className="text-xl font-bold text-[#15a36e]">{article.reviewer.name.charAt(0)}</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#15a36e] block mb-1">Reviewed By</span>
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                            {article.reviewer.name}
                          </h4>
                          <p className="text-xs text-gray-500 mb-3 !mb-3">{article.reviewer.role}</p>
                          <p className="text-sm text-gray-600 leading-relaxed !mb-0">{article.reviewer.bio}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"></div>
                  </div>
                )}
              </div>
            </section>

            {/* FAQ Section - Simple Inline Style */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="my-8 sm:my-12">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 uppercase" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {article.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-4 sm:pb-6 last:border-0 last:pb-0">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        {faq.question}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* End-of-Article CTA */}
            <section className="mt-12">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-8 md:p-10 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#15a36e" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,34.3C59,45.5,47.1,54.2,35.1,61.8C23.1,69.4,11,75.9,-0.6,77.2C-12.2,78.5,-24.7,74.6,-36.4,68.5C-48.1,62.4,-59,54.1,-67.6,43.5C-76.2,32.9,-82.5,20,-83.1,6.8C-83.7,-6.4,-78.6,-19.9,-70.4,-31.4C-62.2,-42.9,-50.9,-52.4,-39.3,-59.3C-27.7,-66.2,-15.8,-70.5,-2.6,-69.5C10.6,-68.5,23.6,-62.2,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left max-w-2xl">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Start Your Tokenization Journey
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Join leading institutions using our platform <br className="hidden sm:block" />
                        for digital asset issuance.
                      </p>
                    </div>
                    <Link href="/tokenization" className="group inline-flex items-center justify-between min-w-[140px] sm:min-w-[160px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#12a062] rounded-full p-1 transition-all duration-300" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                      <span className="pl-3 pr-2 text-white font-semibold text-xs sm:text-sm">
                        Know More
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Only - Read Also & Newsletter */}
            <div className="lg:hidden mt-12 space-y-8">
              {/* Read Also */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                  You May Also Like
                </h4>
                <div className="space-y-3">
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
                {/* Decorative glow */}
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

                  <button className="w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Subscribe Now
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <DisclaimerBlock>
              {article.disclaimer}
            </DisclaimerBlock>
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
              {/* Decorative glow */}
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
