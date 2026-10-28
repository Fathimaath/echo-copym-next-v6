"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, Building2, Leaf, Sparkles } from 'lucide-react';
import Image from '@/components/Image';

const BADGE_ICONS = {
  building: Building2,
  leaf: Leaf,
  default: Sparkles,
};

export interface PreviewStat {
  label: string;
  value: string;
}

export interface SolutionHeroProps {
  badge?: string;
  badgeIconType?: 'building' | 'leaf' | 'default';
  title: string;
  titleHighlight?: string;
  subheading: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  previewTitle?: string;
  previewSubtitle?: string;
  previewStats?: PreviewStat[];
  previewImage?: string;
  previewTag?: string;
}

export default function SolutionHero({
  badge,
  badgeIconType,
  title,
  titleHighlight,
  subheading,
  primaryButtonText = "Book a demo",
  primaryButtonHref = "/signup/",
  secondaryButtonText = "See the platform",
  secondaryButtonHref = "/tokenization/",
  previewTitle,
  previewSubtitle,
  previewStats = [],
  previewImage,
  previewTag = "Illustrative data"
}: SolutionHeroProps) {
  const BadgeIcon = badgeIconType ? (BADGE_ICONS[badgeIconType] || BADGE_ICONS.default) : null;
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-b from-[#0a0f0d] via-black to-black text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-gradient-to-br from-[#15a36e]/20 via-emerald-950/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#15a36e]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Eyebrow Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/30 text-[#15a36e] text-xs sm:text-sm font-semibold tracking-wide">
                {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                <span>{badge}</span>
              </div>
            )}

            {/* H1 Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {title}{" "}
              {titleHighlight && (
                <span className="text-[#15a36e]">{titleHighlight}</span>
              )}
            </h1>

            {/* Subheading */}
            <p
              className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {subheading}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href={primaryButtonHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#15a36e] hover:bg-[#128a5c] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95 group cursor-pointer"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                <span>{secondaryButtonText}</span>
              </Link>
            </div>

            {/* Trust badge note */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#15a36e] flex-shrink-0" />
              <span>Permissioned ERC-3643 smart contracts with on-chain transfer restrictions</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Card / Visual Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-neutral-800/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-neutral-400 font-mono">Console Preview</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#15a36e]/20 text-[#15a36e] border border-[#15a36e]/30">
                  {previewTag}
                </span>
              </div>

              {/* Main Visual */}
              <div className="mt-4 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{previewTitle}</h4>
                    <p className="text-xs text-neutral-400">{previewSubtitle}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#15a36e] animate-pulse" />
                </div>

                {previewImage ? (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden my-3 border border-neutral-800">
                    <Image
                      src={previewImage}
                      alt={previewTitle || "Solution preview"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                ) : null}

                {/* Stat pills */}
                {previewStats && previewStats.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-800/80">
                    {previewStats.map((stat, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
                        <div className="text-[11px] text-neutral-400">{stat.label}</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Security check footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/50">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15a36e]" />
                  <span>Audit Trail Active</span>
                </span>
                <span className="text-neutral-400 text-[11px]">ERC-3643 Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
