"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';

export default function SecurityHero() {
  return (
    <section className="relative bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-[#15a36e]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Due Diligence &amp; Governance</span>
          </div>
        </motion.div>

        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Security and compliance,{' '}
            <span className="text-[#15a36e]">built into every workflow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            What CopyM&apos;s platform does to verify participants, enforce transfer rules and protect data &mdash; and what licensed partners handle.
          </motion.p>

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

            <Link
              href="/contact/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold text-sm sm:text-base transition-all duration-300"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <Mail className="w-4 h-4 text-[#15a36e]" />
              <span>Contact us</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
