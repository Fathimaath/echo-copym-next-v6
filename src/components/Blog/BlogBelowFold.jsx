"use client";
import React from 'react';
import Link from 'next/link';
import DisclaimerBlock from './DisclaimerBlock';

export default function BlogBelowFold({ article, relatedPosts, youMayAlsoLike }) {
  return (
    <>
      {/* Author & Reviewer Section */}
      <section className="my-8 sm:my-12">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <AuthorCard author={article.authorData} name={article.author} />
          {article.reviewer && <ReviewerCard reviewer={article.reviewer} />}
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Mobile Only - You May Also Like & Newsletter */}
      <div className="lg:hidden mt-12 space-y-8">
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
        <NewsletterBlock />
      </div>

      {/* Disclaimer */}
      <DisclaimerBlock>
        {article.disclaimer}
      </DisclaimerBlock>
    </>
  );
}

function AuthorCard({ author, name }) {
  const authorObj = author || { name: typeof name === 'string' ? name : 'CopyM Team', role: '' };
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col" style={{ boxShadow: '0px 4px 48.9px 0px #BDE3D5' }}>
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {authorObj?.avatar ? (
              <img src={authorObj.avatar} alt={authorObj.name} className="w-full h-full rounded-lg object-cover" />
            ) : (
              <span className="text-xl font-bold text-[#15a36e]">{authorObj?.name?.charAt(0) || 'C'}</span>
            )}
          </div>
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
      <div className="h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"></div>
    </div>
  );
}

function ReviewerCard({ reviewer }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col" style={{ boxShadow: '0px 4px 48.9px 0px #BDE3D5' }}>
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {reviewer.avatar ? (
              <img src={reviewer.avatar} alt={reviewer.name} className="w-full h-full rounded-lg object-cover" />
            ) : (
              <span className="text-xl font-bold text-[#15a36e]">{reviewer.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15a36e] block mb-1">Reviewed By</span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              {reviewer.name}
            </h4>
            <p className="text-xs text-gray-500 mb-3 !mb-3">{reviewer.role}</p>
            <p className="text-sm text-gray-600 leading-relaxed !mb-0">{reviewer.bio}</p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"></div>
    </div>
  );
}

function NewsletterBlock() {
  return (
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
        <button className="w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group">
          Subscribe Now
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
