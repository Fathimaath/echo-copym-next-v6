"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from '@/components/Image';

export default function AssetSolutionsStrip() {
  return (
    <section className="relative py-12 sm:py-16 bg-neutral-50 border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Tailored Solutions</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Purpose-built for your asset class
            </h2>
            <p
              className="mt-1 text-sm text-gray-600 font-normal max-w-2xl"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Explore how CopyM configures issuance, transfer rules, and reporting for specific real-world asset classes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real Estate Solution Card */}
          <Link
            href="/solutions/real-estate/"
            className="group rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 flex flex-col justify-between hover:border-[#15a36e]/50 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-4 flex-shrink-0 flex items-center justify-start group-hover:scale-105 transition-transform">
                <Image
                  src="/icons/Tokenization/tiicon1.png"
                  alt="Real Estate Tokenization"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold text-black mb-2 group-hover:text-[#15a36e] transition-colors"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Real Estate Tokenization
              </h3>
              <p
                className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                SPV ownership records, automated rental cash-flow distributions, and on-chain shareholder registries on compliance-aware rails.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#15a36e]">
              <span>Explore real estate infrastructure</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Carbon Credits Solution Card */}
          <Link
            href="/solutions/carbon-credits/"
            className="group rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 flex flex-col justify-between hover:border-[#15a36e]/50 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-4 flex-shrink-0 flex items-center justify-start group-hover:scale-105 transition-transform">
                <Image
                  src="/icons/Tokenization/tiicon2.png"
                  alt="Carbon Credit Tokenization"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold text-black mb-2 group-hover:text-[#15a36e] transition-colors"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Carbon Credit Tokenization
              </h3>
              <p
                className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                1:1 registry serial-number mapping, anti-double-counting controls, verified on-chain retirement, and audit-ready ESG reporting.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#15a36e]">
              <span>Explore carbon credit infrastructure</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
