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

        {/* Middle Column: Main Content (Scrollable) */}
        <main ref={mainContentRef} className="flex-1 min-w-0 lg:order-2">
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



            <BlogBelowFold article={article} relatedPosts={relatedPosts} youMayAlsoLike={youMayAlsoLike} />
          </article>
        </main>

        {/* Left Column: Table of Contents */}
        <aside ref={leftSidebarRef} className="hidden lg:block w-[200px] flex-shrink-0 lg:order-1">
          <div className={leftSidebarFixed ? 'fixed left-[24px] sm:left-[48px] md:left-[64px] lg:left-[96px] xl:left-[128px] top-[220px] w-[200px] max-h-[calc(100vh-240px)] overflow-y-auto touch-auto' : 'max-h-[calc(100vh-240px)] overflow-y-auto touch-auto'} style={leftSidebarFixed ? { WebkitOverflowScrolling: 'touch' } : {}}>
            <div className="space-y-8 pb-8">
              <h3 className="text-sm font-bold mb-6 uppercase tracking-wide" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Table of Contents</h3>
              <nav className="space-y-5">
                {article.headings?.map((item, idx) => {
                  if (item.level === 3) {
                    return null;
                  }

                  const subheadings = [];
                  for (let i = idx + 1; i < article.headings.length; i++) {
                    if (article.headings[i].level === 3) {
                      subheadings.push(article.headings[i]);
                    } else if (article.headings[i].level === 2) {
                      break;
                    }
                  }

                  const hasSubheadings = subheadings.length > 0;
                  const isExpanded = expandedHeadings.includes(item.id);

                  const scrollToHeading = (id) => {
                    const el = document.getElementById(id);
                    if (el) {
                      const yOffset = -170;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  };

                  const handleToCClick = (id, hasSubs) => (e) => {
                    e.preventDefault();
                    scrollToHeading(id);
                    setActiveSection(id);
                    if (hasSubs) {
                      setExpandedHeadings(prev =>
                        prev.includes(id) ? [] : [id]
                      );
                    } else {
                      setExpandedHeadings([]);
                    }
                    history.replaceState(null, '', `#${id}`);
                  };

                  return (
                    <div key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={handleToCClick(item.id, hasSubheadings)}
                        className={`block text-sm transition-colors ${
                          activeSection === item.id
                            ? 'text-[#15a36e] font-semibold'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                      >
                        {item.title}
                      </a>
                      {hasSubheadings && isExpanded && (
                        <ul className="mt-2 space-y-1.5 ml-3 border-l-2 border-gray-200 pl-3">
                          {subheadings.map((sub) => (
                            <li key={sub.id}>
                              <a
                                href={`#${sub.id}`}
                                onClick={(e) => {
                                  const el = document.getElementById(sub.id);
                                  if (el) {
                                    const yOffset = -170;
                                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                  }
                                  setActiveSection(sub.id);
                                  history.replaceState(null, '', `#${sub.id}`);
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

        {/* Right Column: Sidebar */}
        <aside ref={rightSidebarRef} className="hidden lg:block w-[280px] flex-shrink-0 lg:order-3">
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
