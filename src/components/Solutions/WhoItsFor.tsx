"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users2, CheckCircle2 } from 'lucide-react';
import Image from '@/components/Image';

const defaultIcons = [
  '/icons/Tokenization/tiicon1.png',
  '/icons/Tokenization/tiicon2.png',
  '/icons/Tokenization/ticon5.avif',
  '/icons/Tokenization/ticon6.avif',
];

export interface WhoItsForCard {
  title: string;
  description: string;
  benefit?: string;
  icon?: string;
}

export interface WhoItsForProps {
  title?: string;
  subtitle?: string;
  cards?: WhoItsForCard[];
}

export default function WhoItsFor({
  title = "Who it’s for",
  subtitle = "Engineered for institutional market participants, asset sponsors, and licensed intermediaries.",
  cards = []
}: WhoItsForProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/20 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-3">
            <Users2 className="w-3.5 h-3.5" />
            <span>Target Participants</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {title}
          </h2>
          <p
            className="mt-3 text-sm sm:text-base text-gray-600 font-normal leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {subtitle}
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-neutral-50/70 border border-gray-200/80 p-6 flex flex-col justify-between hover:border-[#15a36e]/40 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-4 flex-shrink-0 flex items-center justify-start">
                  <Image
                    src={card.icon || defaultIcons[idx % defaultIcons.length]}
                    alt={card.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-black mb-2"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {card.description}
                </p>
              </div>

              {card.benefit && (
                <div className="mt-5 pt-3 border-t border-gray-200/70 flex items-start gap-1.5 text-xs text-[#15a36e] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{card.benefit}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
