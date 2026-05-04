"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import Image from '@/components/Image';

/**
 * FeaturedSection Component
 * Modern magazine-style layout with visual hierarchy
 */
export default function FeaturedSection({ featuredPosts = [] }) {
  if (!featuredPosts || featuredPosts.length === 0) return null;

  // First post is the main featured, rest are secondary
  const mainFeatured = featuredPosts[0];
  const secondaryFeatured = featuredPosts.slice(1, 4); // Show 3 secondary

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="relative w-fit mx-auto mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-black">FEATURED </span>
              <span className="text-[#15a36e]">STORIES</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured - Large Card (spans 8 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <FeaturedHeroCard post={mainFeatured} />
          </motion.div>

          {/* Secondary Featured - Stack of 3 (spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {secondaryFeatured.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <FeaturedSidebarCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FeaturedHeroCard - Large main featured card
 */
function FeaturedHeroCard({ post }) {
  const { title, excerpt, category, date, readTime, author, image, slug } = post;

  return (
    <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="group block">
      <article className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-black/5">
        {/* Image Background */}
        <div className="relative h-[350px] sm:h-[400px] w-full">
          <Image
            src={image || '/assets/Images/blogfeatured.avif'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />

          {/* Gradient Overlay - Left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

          {/* Content Overlay - Left Side */}
          <div className="absolute top-0 left-0 h-full w-full sm:w-[55%] lg:w-[45%] p-4 sm:p-6 md:p-8 flex flex-col justify-center">
            {/* 1. Category Chip */}
            <div className="mb-2 sm:mb-3">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-[#15a36e]/10 text-[#15a36e] text-[10px] sm:text-xs font-bold rounded-full backdrop-blur-sm" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {category}
              </span>
            </div>

            {/* 2. Title Heading (2 lines) */}
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2 group-hover:text-[#15a36e] transition-colors" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {title}
            </h3>

            {/* 3. Excerpt (3 lines) */}
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-3 sm:mb-4 line-clamp-3" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {excerpt}
            </p>

            {/* 4. Date & Read Time */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300 mb-3 sm:mb-4">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {readTime}
              </span>
            </div>

            {/* 5. Know More Button */}
            <span className="group inline-flex items-center justify-between min-w-[100px] sm:min-w-[110px] md:min-w-[125px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#15a36e] rounded-full p-0.5 sm:p-1 transition-all duration-300 w-fit cursor-pointer">
              <span className="pl-2 pr-1.5 sm:pl-2.5 sm:pr-2 text-white font-semibold text-[10px] sm:text-xs md:text-sm" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Know more
              </span>
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center transition-all duration-300">
                <svg
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 text-[#15a36e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/**
 * FeaturedSidebarCard - Smaller cards for sidebar
 */
function FeaturedSidebarCard({ post }) {
  const { title, excerpt, category, date, readTime, image, slug } = post;

  return (
    <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="group block">
      <article className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-black/5">
        <div className="flex gap-3 p-3">
          {/* Thumbnail Image - Smaller */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {image ? (
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center py-0.5 min-w-0">
            {/* Category Chip */}
            <span className="inline-block px-2.5 py-0.5 bg-[#15a36e]/10 text-[#15a36e] text-[10px] font-bold rounded-full mb-1.5 w-fit" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {category}
            </span>

            <h4 className="text-sm font-bold text-black leading-snug group-hover:text-[#15a36e] transition-colors line-clamp-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Arrow Indicator */}
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiArrowRight className="w-4 h-4 text-[#15a36e]" />
        </div>
      </article>
    </Link>
  );
}
