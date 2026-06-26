import React from 'react';
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Image from '../Image';

/**
 * PostCard Component
 * Displays a blog post summary in card format
 * Used in blog listing, related posts, featured posts
 */
export default function PostCard({ 
  post, 
  variant = 'standard', // 'standard' | 'featured' | 'compact' | 'horizontal'
  index = 0 
}) {
  const {
    title,
    excerpt,
    category,
    date,
    readTime,
    author,
    image,
    slug
  } = post;

  // Standard Card (Grid)
  if (variant === 'standard') {
    // No text overlay on any images
    const hasTextOverlay = false;
    // Check if this post has a custom image position (default: object-center)
    const imagePosition = post.imagePosition || 'object-center';

    return (
      <article
        className="bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      >
        <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block">
          {/* Image */}
          <div className="relative w-full h-48 sm:h-56 md:h-60 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
            {image ? (
              <>
                <img
                  src={image}
                  alt={title}
                  className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-110`}
                />
                {hasTextOverlay && (
                  <div className="absolute left-0 top-0 bottom-0 w-full sm:w-1/2 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center p-4">
                    <h3
                      className="text-white text-sm sm:text-base font-medium leading-tight line-clamp-3"
                      style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                      {title}
                    </h3>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#15a36e]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 mb-2 sm:mb-3 flex-wrap">
              <span className="text-[#15a36e] font-semibold whitespace-nowrap">
                {category === 'Product Updates' ? 'Updates' : category}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {readTime}
              </span>
            </div>

            <h3
              className="text-base sm:text-lg font-bold text-black mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#15a36e] transition-colors"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#15a36e]/20 flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#15a36e]" />
                </div>
                <span className="text-xs text-gray-600" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {author}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[#15a36e] font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
                Read
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Dark Card (Grid) - Black background like Marketplace
  if (variant === 'dark') {
    return (
      <article
        className="bg-black rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:border-[#15a36e]/30 transition-all duration-300 group cursor-pointer"
      >
        <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block">
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#15a36e]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 flex-wrap">
              <span className="text-[#15a36e] font-semibold whitespace-nowrap">
                {category === 'Product Updates' ? 'Updates' : category}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>

            <h3
              className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#15a36e] transition-colors"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#15a36e]/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-[#15a36e]" />
                </div>
                <span className="text-xs text-gray-400" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {author}
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[#15a36e] font-semibold text-sm group-hover:gap-2.5 transition-all">
                Read
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Featured Card (Large)
  if (variant === 'featured') {
    return (
      <article className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-black/5 shadow-lg">
        <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-[#15a36e]/10 to-[#15a36e]/5 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#15a36e]/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-[#15a36e] text-white text-sm font-bold rounded-full" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Featured
                  </span>
                </div>
              )}
            </div>
            
            {/* Content Side */}
            <div className="flex flex-col justify-center p-6 lg:p-8">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="px-3 py-1 bg-[#15a36e]/10 text-[#15a36e] font-bold rounded-full" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </span>
              </div>
              
              <h2 
                className="text-2xl sm:text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                {title}
              </h2>
              
              <p className="text-base text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#15a36e]/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#15a36e]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                      {author}
                    </p>
                  </div>
                </div>
                
                <span className="inline-flex items-center gap-2 text-[#15a36e] font-semibold hover:gap-3 transition-all group/link">
                  Read Article
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Compact Card (Small)
  if (variant === 'compact') {
    return (
      <article className="bg-white rounded-lg overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group">
        <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block p-4">
          <div className="flex items-start gap-3">
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
              {image ? (
                <Image src={image} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#15a36e]" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {category}
              </span>
              <h4
                className="text-sm font-bold text-black mt-1 line-clamp-2 group-hover:text-[#15a36e] transition-colors"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                {title}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Horizontal Card (for sidebar featured)
  if (variant === 'horizontal') {
    return (
      <article className="bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
        <Link href={`/blog/${category?.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block">
          <div className="flex flex-col">
            {/* Image */}
            <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#15a36e]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#15a36e] text-xs font-bold rounded-full" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4
                  className="text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-[#15a36e] transition-colors"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {excerpt}
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return null;
}
