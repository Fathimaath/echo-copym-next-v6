"use client";
import React from 'react';
import Link from "next/link";
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionContainer from '@/components/Layout/SectionContainer';

/**
 * BrowseByTopic Component
 * Topic clusters to improve discoverability and internal linking
 */
export default function BrowseByTopic({ topics = [], title = "Browse by Topic" }) {
  // Default topics if none provided
  const defaultTopics = [
    {
      id: 1,
      name: "Tokenization",
      description: "Real-world asset tokenization fundamentals and guides",
      color: "from-[#15a36e] to-emerald-600",
      postCount: 12,
      slug: "/blog?topic=tokenization"
    },
    {
      id: 2,
      name: "Compliance & Regulation",
      description: "Regulatory frameworks, KYC/AML, and compliance guides",
      color: "from-blue-500 to-indigo-600",
      postCount: 8,
      slug: "/blog?topic=compliance"
    },
    {
      id: 3,
      name: "Market Insights",
      description: "RWA market trends, analysis and investment insights",
      color: "from-purple-500 to-pink-600",
      postCount: 15,
      slug: "/blog?topic=markets"
    },
    {
      id: 4,
      name: "AI & Technology",
      description: "CORA AI, blockchain tech, and platform updates",
      color: "from-orange-500 to-red-600",
      postCount: 6,
      slug: "/blog?topic=technology"
    },
    {
      id: 5,
      name: "Investment Strategies",
      description: "Portfolio diversification and investment guides",
      color: "from-cyan-500 to-teal-600",
      postCount: 10,
      slug: "/blog?topic=strategies"
    }
  ];

  const displayTopics = topics.length > 0 ? topics : defaultTopics;

  return (
    <SectionContainer padding="py-16" bgColor="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {title}
        </h2>
        <p
          className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          Explore content by topic clusters to find exactly what you're looking for
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href={topic.slug}
              className="group block h-full"
            >
              <div className="h-full bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#15a36e]/30 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-2xl font-bold">
                    {topic.name.charAt(0)}
                  </span>
                </div>

                {/* Topic Name */}
                <h3
                  className="text-lg font-bold text-black mb-2 group-hover:text-[#15a36e] transition-colors"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {topic.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-gray-600 leading-relaxed mb-4"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {topic.description}
                </p>

                {/* Post Count & Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {topic.postCount} {topic.postCount === 1 ? 'article' : 'articles'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#15a36e] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Explore
                    <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
