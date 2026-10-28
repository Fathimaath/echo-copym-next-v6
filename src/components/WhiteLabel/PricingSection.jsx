"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const pricingIncludes = [
  "Custom white-label branding across admin console and user interfaces",
  "Dedicated deployment environment and institutional integrations",
  "Tailored smart contract parameterization and transfer rule configuration",
  "Enterprise SLA maintenance, ongoing software upgrades, and technical support"
];

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0d14] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#15a36e]/10 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-4">
              Institutional Pricing
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Enterprise Setup &amp; Modular Licensing
            </h2>
            <p
              className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Enterprise setup plus a monthly licence, scoped to your modules and integrations. Book a demo for a proposal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left mb-8">
              {pricingIncludes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#15a36e] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/signup/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_25px_rgba(21,163,110,0.4)] transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>Book a demo for a proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
