"use client";
import React from 'react';
import Link from "next/link";
import { FiArrowRight } from 'react-icons/fi';

/**
 * RelatedPosts Component
 * Shows related articles at end of post
 */
export default function RelatedPosts({ posts = [], title = "Related Articles" }) {
  if (!posts || posts.length === 0) {
    return (
      <section>
        <h3
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-gray-500 italic" style={{ fontFamily: 'Palanquin, sans-serif' }}>
          More articles coming soon...
        </p>
      </section>
    );
  }

  return (
    <section>
      <h3
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <article
            key={post.id || index}
            className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#15a36e] hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/blog/${post.category?.toLowerCase().replace(/\s+/g, '-')}/${post.slug}`} className="block">
              {/* Image */}
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4">
                <span className="text-xs font-semibold text-[#15a36e]" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  {post.category}
                </span>
                <h4
                  className="text-sm font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-[#15a36e] transition-colors"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {post.title}
                </h4>
                {post.excerpt && (
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1 text-[#15a36e] font-semibold group-hover:gap-2 transition-all">
                    Read
                    <FiArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
