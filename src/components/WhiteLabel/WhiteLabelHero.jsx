"use client";
import React from 'react';
import Link from 'next/link';
import Image from '@/components/Image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function WhiteLabelHero() {
  return (
    <section className="relative bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-[#15a36e]/20 via-[#15a36e]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Institutional Infrastructure</span>
          </div>
        </motion.div>

        {/* H1 & Subheading */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Launch your own tokenization platform,{' '}
            <span className="text-[#15a36e]">under your brand</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            CopyM&apos;s white-label infrastructure gives banks, wealth platforms and asset managers the issuance, onboarding, custody and reporting rails to run a branded tokenized-asset platform.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10"
          >
            <Link
              href="/signup/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_25px_rgba(21,163,110,0.5)] transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>Book a demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#whats-included"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold text-sm sm:text-base transition-all duration-300"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>See what&apos;s included</span>
              <ChevronDown className="w-4 h-4 text-[#15a36e]" />
            </a>
          </motion.div>
        </div>

        {/* Visual: Admin console & Investor portal screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto mt-6"
        >
          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Window bar */}
            <div className="bg-[#0b0f17] px-4 sm:px-6 py-3 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-0.5 rounded-md bg-neutral-800/80 text-neutral-400 text-xs font-mono">
                  <span className="text-[#15a36e]">https://</span>portal.yourbrand.com/admin
                </div>
              </div>

              {/* Illustrative data badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800/90 border border-neutral-700/80 text-xs font-medium text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15a36e]" />
                Illustrative data
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative bg-neutral-950">
              <Image
                src="/assets/Images/dashboard_screen.png"
                alt="CopyM White-Label Admin Console and Investor Portal"
                className="w-full h-auto object-cover block opacity-95"
                priority={true}
              />
            </div>
          </div>

          {/* Subtext */}
          <p
            className="text-center text-xs text-neutral-500 mt-3 font-medium"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Illustrative data &mdash; Branded Admin Console & Investor Interface
          </p>
        </motion.div>

      </div>
    </section>
  );
}
