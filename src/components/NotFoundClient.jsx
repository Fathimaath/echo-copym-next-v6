"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFoundClient() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-8">
      <div className="text-center max-w-lg">
        <h1 className="text-[120px] sm:text-[140px] font-bold leading-none text-gray-200 select-none">
          404
        </h1>

        <div className="w-16 h-0.5 bg-[#15a36e] rounded-full mx-auto mt-2 mb-4" />

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15a36e] text-white font-medium shadow-sm hover:bg-[#128a5c] transition text-sm"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition text-sm"
          >
            Read Blog
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition text-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
