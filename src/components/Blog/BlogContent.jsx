"use client";
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SectionContainer from '@/components/Layout/SectionContainer';
import PostCard from './PostCard';
import Pagination from './Pagination';
import FeaturedSection from './FeaturedSection';
import Hero from './Hero';
import { fetchBlogPosts, transformApiPost } from '@/services/blogApi';

const CATEGORY_GLOSSARY = "Glossary";
const POSTS_PER_PAGE = 6;

export default function BlogContent({ initialApiPosts = [], initialCategory }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPosts, setApiPosts] = useState(initialApiPosts);
  const [loading, setLoading] = useState(false); // Start false because we have SSR data
  const postsRef = useRef(null);

  // Fetch ALL posts from API once on mount if SSR didn't provide them
  // Category filtering/search is done client-side only — never re-fetches on filter change
  const fetchAllPosts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchBlogPosts({
        category: '',
        search: '',
        page: 1,
        limit: 100
      });
      const transformedPosts = result.data.map(transformApiPost);
      setApiPosts(transformedPosts);
    } catch (error) {
      console.warn('API not available, using static posts only:', error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialApiPosts.length === 0) {
      fetchAllPosts();
    }
  }, [fetchAllPosts, initialApiPosts]);

  const allPosts = apiPosts;

  // Derive category chips dynamically from actual posts so they always match real data
  const categories = useMemo(() => {
    const unique = [...new Set(allPosts.map(p => p.category?.trim()).filter(Boolean))];
    return ["All", ...unique.sort(), CATEGORY_GLOSSARY];
  }, [allPosts]);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    if (allPosts.length === 0) return [];
    
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category?.trim() === selectedCategory;
      const matchesSearch = searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    if (category === CATEGORY_GLOSSARY) {
      router.push('/glossary');
    } else {
      setSelectedCategory(category);
      setCurrentPage(1);
    }
  };

  // Get featured posts (sorted by priority)
  const featuredPosts = useMemo(() => {
    return allPosts
      .filter(post => post.featured)
      .sort((a, b) => (a.featuredPriority || 99) - (b.featuredPriority || 99))
      .slice(0, 5);
  }, [allPosts]);

  // Get posts for the grid — include featured posts when filtering by a specific category
  const regularPosts = useMemo(() => {
    if (selectedCategory !== "All") {
      return filteredPosts;
    }
    return filteredPosts.filter(post => !post.featured);
  }, [filteredPosts, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll after state update - use longer delay for mobile rendering
    setTimeout(() => {
      const el = postsRef.current;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      {!loading && searchTerm === "" && (
        <FeaturedSection featuredPosts={featuredPosts} />
      )}

      {/* Blog Posts Grid */}
      <div ref={postsRef} id="posts-section">
        <SectionContainer padding="pt-16 pb-16" bgColor="bg-white">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative w-fit mx-auto mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              <span className="text-gray-900">ALL </span>
              <span className="text-[#15a36e]">POSTS</span>
            </h2>
          </div>
        </motion.div>

        {/* Search + Filter Header - Clean Vercel-style layout */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filters - Clean Pills */}
            <div className="flex flex-nowrap overflow-x-auto gap-1.5 sm:gap-2 justify-center w-full lg:w-auto" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex-shrink-0 px-2 sm:px-4 md:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category && category !== CATEGORY_GLOSSARY
                      ? 'bg-[#15a36e] text-white shadow-lg shadow-[#15a36e]/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar - Right Side */}
            <div className="relative w-full lg:w-auto lg:min-w-[350px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles, news..."
                className="w-full px-6 py-3 pl-12 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#15a36e] focus:ring-2 focus:ring-[#15a36e]/20 transition-all text-sm"
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
          </div>
        </div>

        {/* Post Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15a36e]"></div>
            <p className="mt-4 text-gray-600 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>Loading posts...</p>
          </div>
        ) : paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PostCard post={post} variant="standard" />
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 px-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              No posts found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              Try selecting a different category or search term
            </p>
          </motion.div>
        )}
      </SectionContainer>
      </div>

      {/* CTA Section - White Card with CTA Buttons */}
      <SectionContainer padding="py-16" bgColor="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
        >
          {/* CTA Banner - White Rectangular Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white px-6 py-12 sm:px-12 sm:py-16 shadow-[0_20px_60px_rgba(15,23,42,0.1)] border border-gray-100"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#15a36e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#15a36e]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="relative flex flex-col items-center text-center">
              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                <span className="text-gray-900">See How </span>
                <span className="text-[#15a36e]">It Works</span>
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-10 !mb-10" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                Explore our platform and discover how CopyM makes tokenization simple, secure, and accessible for everyone.
              </p>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Link
                  href="/tokenization"
                  className="group inline-flex items-center justify-between min-w-[160px] sm:min-w-[180px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#12a062] rounded-full p-1 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  <span className="pl-4 pr-2 text-white font-semibold text-sm sm:text-base">
                    Explore Platform
                  </span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                    <svg
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#15a36e]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
