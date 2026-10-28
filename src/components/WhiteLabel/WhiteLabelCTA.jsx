"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WhiteLabelCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0d14] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
        
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#15a36e]/15 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Ready to scope your <span className="text-[#15a36e]">platform?</span>
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Talk to our team about your asset, your investors and your timeline. We&apos;ll prepare a customized walkthrough of the admin console and investor portal.
            </p>

            <Link
              href="/signup/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-[0_0_30px_rgba(21,163,110,0.5)] transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>Book a demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
