"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg sm:max-w-xl md:max-w-2xl px-4"
      >
        {/* 404 Number */}
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#15a36e] to-emerald-600 mb-4 sm:mb-6 md:mb-8">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-xl mx-auto" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-between min-w-[130px] sm:min-w-[140px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#12a062] rounded-full p-1 transition-all duration-300"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            <span className="pl-3 pr-2 text-white font-semibold text-sm sm:text-base">
              Go Home
            </span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#15a36e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm sm:text-base hover:border-[#15a36e] hover:text-[#15a36e] transition-all duration-300"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Read Blog
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
