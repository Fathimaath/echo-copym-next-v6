"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export interface SolutionCTAProps {
  heading?: string;
  subheading?: string;
  regulatoryText?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryHref?: string;
  secondaryText?: string;
}

export default function SolutionCTA({
  heading = "Ready to scope your platform?",
  subheading,
  regulatoryText,
  buttonText = "Book a demo",
  buttonHref = "/signup/",
  secondaryHref = "/contact/",
  secondaryText = "Contact us"
}: SolutionCTAProps) {
  return (
    <section className="relative py-20 sm:py-28 bg-black text-white overflow-hidden">
      {/* Background glow and gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#15a36e]/20 via-emerald-950/20 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15a36e]/15 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Institutional Onboarding</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
        >
          {heading}
        </h2>

        {subheading && (
          <p
            className="text-base sm:text-lg text-neutral-300 font-normal max-w-2xl mx-auto mb-6"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {subheading}
          </p>
        )}

        {regulatoryText && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs sm:text-sm text-neutral-400 flex items-start gap-2.5 text-left">
            <ShieldCheck className="w-4 h-4 text-[#15a36e] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{regulatoryText}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href={buttonHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-emerald-500/20 active:scale-95 group cursor-pointer"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-base transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>{secondaryText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
