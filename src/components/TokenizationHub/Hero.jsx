"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import Image from '@/components/Image';
const tokenizationHero = '/images/tokenizationhero.avif';

// Checklist Item 31: Platform overview /tokenization/ — H1, intro and buttons
// WHERE: Top of the page — replaces “TOKENIZATION HUB EMPOWERING ASSET OWNERSHIP”
// H1: The platform to issue, onboard and manage tokenized assets
// INTRO: From asset onboarding to investor reporting, CopyM provides the technology layer for tokenized real-world assets, while licensed partners handle regulated activities where required.
// BUTTONS: Book a demo → /signup/ (link for signup: https://issuer.copym.xyz/) · See white-label → /white-label/
export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[580px] sm:min-h-screen sm:h-screen w-full bg-black flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 [&>picture]:w-full [&>picture]:h-full [&>picture]:block">
        <Image
          src={tokenizationHero}
          alt="CopyM tokenization platform overview - issue, onboard and manage tokenized real-world assets"
          className="w-full h-full object-cover object-right sm:object-right scale-110 sm:scale-100 translate-y-12 sm:translate-y-0"
        />
        {/* Subtle dark gradient overlay for optimal text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent z-[1]" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-start pt-32 sm:pt-0 pb-12 sm:pb-0 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-3xl w-full text-left"
        >
          {/* H1 Headline */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight mb-4 sm:mb-5 text-white"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            The platform to issue, onboard and manage <span className="text-[#15a36e]">tokenized assets</span>
          </h1>

          {/* Intro Description */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-normal tracking-wide max-w-2xl leading-relaxed mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            From asset onboarding to investor reporting, CopyM provides the technology layer for tokenized real-world assets, while licensed partners handle regulated activities where required.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Primary CTA: Book a demo */}
            <Link
              href="https://issuer.copym.xyz/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95 group cursor-pointer"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>Book a demo</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: See white-label */}
            <Link
              href="/white-label/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-sm sm:text-base transition-all duration-300 active:scale-95 group cursor-pointer"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>See white-label</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}