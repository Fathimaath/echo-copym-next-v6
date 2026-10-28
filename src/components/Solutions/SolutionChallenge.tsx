"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Globe2, FileSpreadsheet, CopyX, HelpCircle, type LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  spreadsheet: FileSpreadsheet,
  clock: Clock,
  globe: Globe2,
  doubleCount: CopyX,
  fragmented: FileSpreadsheet,
  opaque: HelpCircle,
  default: AlertTriangle,
};

export interface ChallengeCard {
  iconType: string;
  title: string;
  description: string;
  impact?: string;
}

export interface SolutionChallengeProps {
  title?: string;
  subtitle?: string;
  cards?: ChallengeCard[];
}

export default function SolutionChallenge({
  title = "The challenge",
  subtitle = "Traditional operational models create severe friction for asset issuers and institutional investors.",
  cards = []
}: SolutionChallengeProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Legacy Market Bottlenecks</span>
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

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const IconComponent = ICON_MAP[card.iconType] || ICON_MAP.default;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-neutral-50/70 border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-100/60 border border-red-200/60 flex items-center justify-center mb-5 text-red-600 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-black mb-2.5 leading-snug"
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
                {card.impact && (
                  <div className="mt-6 pt-4 border-t border-gray-200/70 text-xs text-red-700/90 font-medium">
                    {card.impact}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
