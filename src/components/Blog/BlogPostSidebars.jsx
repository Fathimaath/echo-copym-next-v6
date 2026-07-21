"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Mail, Facebook, Link2, Check, Loader2, AlertCircle } from 'lucide-react';

export default function BlogPostSidebars({ article, youMayAlsoLike }) {
  const [activeSection, setActiveSection] = useState('');
  const [sidebarFixed, setSidebarFixed] = useState(true);
  const [expandedHeadings, setExpandedHeadings] = useState([]);
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState('idle');
  const [nlSuccessMsg, setNlSuccessMsg] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'http://localhost/copym-blog-api/api';

  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

  const handleNlSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlStatus('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail, consent: true, source: 'blog-sidebar' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setNlStatus('success');
      setNlSuccessMsg(data.message || 'Subscribed!');
      setNlEmail('');
    } catch {
      setNlStatus('error');
    }
  }, [nlEmail, API_URL]);

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
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

  // Scroll spy + sidebar fixed/absolute switching
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sentinel = document.getElementById('article-end-sentinel');
        if (sentinel) {
          const rect = sentinel.getBoundingClientRect();
          setSidebarFixed(rect.top > window.innerHeight);
        }
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

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -170;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Left Column: Table of Contents */}
      <aside ref={leftSidebarRef} className="hidden lg:block w-[200px] flex-shrink-0 lg:order-1">
        <div className={sidebarFixed ? 'fixed left-[24px] sm:left-[48px] md:left-[64px] lg:left-[96px] xl:left-[128px] top-[220px] w-[200px] max-h-[calc(100vh-240px)] overflow-y-auto touch-auto' : 'max-h-[calc(100vh-240px)] overflow-y-auto touch-auto'} style={sidebarFixed ? { WebkitOverflowScrolling: 'touch' } : {}}>
          <div className="space-y-8 pb-8">
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wide">Table of Contents</h3>
            <nav className="space-y-5">
              {article.headings?.map((item, idx) => {
                if (item.level === 3) return null;

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

                const handleToCClick = (id, hasSubs) => (e) => {
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
                                scrollToHeading(sub.id);
                                setActiveSection(sub.id);
                                history.replaceState(null, '', `#${sub.id}`);
                              }}
                              className="block text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
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

          <hr className="border-gray-200 my-8" />

          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">Share</h4>
            <div className="flex items-center gap-2">
              <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
              <button onClick={() => handleShare('linkedin')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
              <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => handleShare('email')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all" aria-label="Share via Email"><Mail className="w-4 h-4" /></button>
              <button onClick={() => handleShare('copy')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all" aria-label="Copy Link"><Link2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Column: Sidebar */}
      <aside ref={rightSidebarRef} className="hidden lg:block w-[280px] flex-shrink-0 lg:order-3">
        <div className={sidebarFixed ? 'fixed right-[24px] sm:right-[48px] md:right-[64px] lg:right-[96px] xl:right-[128px] top-[220px] w-[280px]' : ''}>
          <div className="space-y-4 pb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              You May Also Like
            </h4>
            <div className="space-y-2">
              {youMayAlsoLike?.map((post) => (
                <Link
                  key={post.id || post.slug}
                  href={`/blog/${post.category?.toLowerCase().replace(/\s+/g, '-')}/${post.slug}`}
                  className="group block py-2 border-b border-gray-100 hover:border-[#15a36e] transition-colors last:border-0"
                >
                  <span className="text-xs font-semibold text-[#15a36e]">
                    {post.category}
                  </span>
                  <h5 className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-[#15a36e] transition-colors">
                    {post.title}
                  </h5>
                  <p className="text-xs text-gray-500 mt-0.5 !mb-0">{post.date}</p>
                </Link>
              ))}
            </div>
          </div>
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
                  <h4 className="text-base font-bold text-white">
                    Subscribe to Newsletter
                  </h4>
                  <p className="text-xs text-gray-400 !mb-0">Get latest updates & insights</p>
                </div>
              </div>
              {nlStatus === 'success' ? (
                <div className="flex items-center gap-2 text-[#15a36e] py-3">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-semibold">{nlSuccessMsg || 'Subscribed!'}</span>
                </div>
              ) : (
                <form onSubmit={handleNlSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#15a36e] focus:ring-1 focus:ring-[#15a36e] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={nlStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60"
                  >
                    {nlStatus === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe Now
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                  {nlStatus === 'error' && (
                    <div className="flex items-center gap-1.5 text-red-400 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Something went wrong. Try again.</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
