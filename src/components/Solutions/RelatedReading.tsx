"use client";
import React from 'react';
import Link from 'next/link';
import { BookOpen, FileText, ArrowRight } from 'lucide-react';

export interface RelatedReadingItem {
  type?: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

export interface RelatedReadingProps {
  title?: string;
  subtitle?: string;
  items?: RelatedReadingItem[];
}

export default function RelatedReading({
  title = "Related reading",
  subtitle = "Learn more about asset tokenization standards, mechanics and regulatory frameworks.",
  items = []
}: RelatedReadingProps) {
  return (
    <section className="relative py-14 sm:py-20 bg-neutral-50 text-black border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#15a36e]" />
              <span>Knowledge Base</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {title}
            </h2>
            <p
              className="mt-1 text-sm text-gray-600 font-normal"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {subtitle}
            </p>
          </div>
          <Link
            href="/glossary/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15a36e] hover:text-[#128a5c] transition-colors"
          >
            <span>Explore all glossary terms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reading Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isGlossary = item.type === 'glossary';
            const Icon = isGlossary ? FileText : BookOpen;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-2xl bg-white border border-gray-200 p-6 flex flex-col justify-between hover:border-[#15a36e]/50 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      <Icon className="w-3 h-3 text-[#15a36e]" />
                      <span>{item.category || (isGlossary ? "Glossary Term" : "Article")}</span>
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-[#15a36e] transition-colors">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <h3
                    className="text-base sm:text-lg font-bold text-black mb-2 group-hover:text-[#15a36e] transition-colors"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#15a36e]">
                  <span>Read entry</span>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
