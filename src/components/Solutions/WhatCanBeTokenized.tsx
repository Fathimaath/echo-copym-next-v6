"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Check } from 'lucide-react';
import Image from '@/components/Image';

const defaultIcons = [
  '/icons/Tokenization/tiicon1.png',
  '/icons/Tokenization/ticon6.avif',
  '/icons/Tokenization/tiicon2.png',
  '/icons/Tokenization/ticon1.avif',
  '/icons/Tokenization/shield.avif',
  '/icons/Tokenization/ticon5.avif'
];

export interface TokenizableItem {
  badge?: string;
  title: string;
  description: string;
  features?: string[];
  footerNote?: string;
  icon?: string;
}

export interface WhatCanBeTokenizedProps {
  title?: string;
  subtitle?: string;
  items?: TokenizableItem[];
  legalNote?: string;
  techLeadNote?: string;
}

export default function WhatCanBeTokenized({
  title = "What can be tokenized",
  subtitle,
  items = [],
  legalNote = "Subject to the legal structure, applicable regulations, and jurisdiction.",
  techLeadNote
}: WhatCanBeTokenizedProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/20 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Eligible Instrument Structures</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mt-3 text-sm sm:text-base text-gray-600 font-normal leading-relaxed"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#15a36e]/50 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent flex-shrink-0 flex items-center justify-start">
                    <Image
                      src={item.icon || defaultIcons[idx % defaultIcons.length]}
                      alt={item.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="text-lg sm:text-xl font-bold text-black mb-2"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-normal"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {item.description}
                </p>

                {item.features && item.features.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-gray-100">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#15a36e] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {item.footerNote && (
                <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  {item.footerNote}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer Note */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-xl bg-neutral-50 border border-gray-200 max-w-4xl mx-auto flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Regulatory notice: </span>
            {legalNote}
            {techLeadNote && (
              <span className="block mt-1 text-gray-500 text-xs">{techLeadNote}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
