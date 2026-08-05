'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Check, Loader2, AlertCircle } from 'lucide-react';

export default function BlogBelowFold({ article, relatedPosts, youMayAlsoLike }) {
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState('idle');
  const [nlSuccessMsg, setNlSuccessMsg] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'http://localhost/copym-blog-api/api';

  const handleNlSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlStatus('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail, consent: true, source: 'blog' }),
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
  return (
    <>
      {/* Mobile Only - You May Also Like & Newsletter */}
      <div className="lg:hidden mt-12 space-y-8">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
            You May Also Like
          </h4>
          <div className="space-y-3">
            {youMayAlsoLike.map((post) => (
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
              <div className="flex items-center gap-2 text-[#15a36e] py-2.5">
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
                  className="w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {nlStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe Now
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>
  );
}

