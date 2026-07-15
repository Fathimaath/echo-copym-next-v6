'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Book, ArrowRight } from 'lucide-react';
import SectionContainer from '@/components/Layout/SectionContainer';
import { glossaryTerms } from '@/data/glossaryTerms';
import GlossaryHero from './GlossaryHero';

export default function GlossaryClient({ initialTerms, initialLetter: serverLetter }) {
  const searchParams = useSearchParams();
  const initialLetter = serverLetter || searchParams.get('letter') || 'A';
  const [selectedLetter, setSelectedLetter] = useState(initialLetter);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [stickyBarHeight, setStickyBarHeight] = useState(0);
  const stickyNavRef = useRef(null);
  const filterSectionRef = useRef(null);

  // Scroll to filter section when coming from a term page with a letter param
  useEffect(() => {
    if (searchParams.get('letter') && filterSectionRef.current) {
      setTimeout(() => {
        filterSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [searchParams]);

  useEffect(() => {
    const navEl = stickyNavRef.current;
    if (!navEl) return;

    const navOriginalTop = navEl.getBoundingClientRect().top + window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsSticky(currentScrollY >= navOriginalTop);
        ticking = false;
      });
    };

    const calculateHeight = () => {
      setStickyBarHeight(navEl.offsetHeight);
    };

    calculateHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateHeight);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesLetter = selectedLetter === "ALL" || term.letter === selectedLetter;
    const matchesSearch = searchTerm === "" ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  // Group terms by letter
  const termsByLetter = filteredTerms.reduce((acc, term) => {
    if (!acc[term.letter]) {
      acc[term.letter] = [];
    }
    acc[term.letter].push(term);
    return acc;
  }, {});

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setSelectedLetter("ALL");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blog Button - Desktop & Tablet Only */}
      <div className="hidden lg:block absolute top-28 left-24 xl:left-32 z-50">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#15a36e] transition-colors duration-300 group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-semibold">Back to Blog</span>
        </Link>
      </div>

      {/* Hero Section */}
      <GlossaryHero />

      {/* Search + Alphabet Navigation */}
      <div ref={stickyNavRef} style={isSticky ? {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '9999',
        background: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      } : {}}>
        <SectionContainer padding="py-6 sm:py-8" bgColor="bg-white">
          <div ref={filterSectionRef} className="max-w-6xl mx-auto">
            {/* Search and Letters Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
              {/* Search Bar */}
              <div className="relative mb-6 sm:mb-8">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search glossary terms..."
                  className="w-full px-6 py-3 pl-12 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#15a36e] focus:ring-4 focus:ring-[#15a36e]/10 transition-all text-sm"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Alphabet Filter Pills */}
              <div className="flex flex-wrap lg:flex-nowrap gap-0.5 lg:gap-0 justify-center lg:justify-start">
                {['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                      if (letter !== 'ALL') setSearchTerm('');
                    }}
                    className={`px-2 py-1 lg:px-4 lg:py-2 rounded-full text-xs sm:text-xs lg:text-xs font-bold transition-all duration-300 ${
                      selectedLetter === letter
                        ? 'bg-[#15a36e] text-white shadow-lg shadow-[#15a36e]/30'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Spacer to prevent content jump when nav becomes fixed */}
      {isSticky && <div style={{ height: `${stickyBarHeight}px` }} />}

      {/* Terms List - Responsive */}
      <SectionContainer padding="pt-6 sm:pt-8 pb-12 sm:pb-16" bgColor="bg-white">
        {Object.keys(termsByLetter).length > 0 ? (
          <div className="space-y-8 sm:space-y-10 px-4 sm:px-6">
            {Object.entries(termsByLetter).map(([letter, terms]) => (
              <div key={letter}>
                {/* Letter Heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#15a36e] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-white">{letter}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Terms Grid - Clickable Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {terms.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="h-full"
                    >
                      <Link
                        href={`/glossary/${item.slug}`}
                        className="block bg-white rounded-xl p-4 border border-gray-200 hover:border-[#15a36e] hover:shadow-lg hover:shadow-[#15a36e]/10 transition-all duration-300 group h-full"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#15a36e] transition-colors line-clamp-2 flex-1" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                            {item.term}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#15a36e] group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                          {item.description}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 px-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Book className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              No terms found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              Try a different search term or letter
            </p>
          </motion.div>
        )}
      </SectionContainer>

      {/* Related Educational Content - Responsive */}
      <SectionContainer padding="py-12 sm:py-16" bgColor="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Want to Learn More?
          </h2>
          <p
            className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Explore our educational articles and insights for deeper understanding of blockchain and tokenization.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#15a36e] hover:bg-[#128a5c] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Visit Blog
            <Book className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
