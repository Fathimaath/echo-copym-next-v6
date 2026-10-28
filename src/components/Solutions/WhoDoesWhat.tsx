"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldAlert, Cpu, Building, Briefcase, Landmark, type LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  copym: Cpu,
  client: Building,
  licensed: Briefcase,
  registries: Landmark,
};

export interface WhoDoesWhatColumn {
  roleSubtitle?: string;
  title: string;
  summary: string;
  responsibilities: string[];
  isHighlight?: boolean;
  iconType?: string;
}

export interface WhoDoesWhatProps {
  title?: string;
  subtitle?: string;
  columns?: WhoDoesWhatColumn[];
  disclaimerNote?: string;
}

export default function WhoDoesWhat({
  title = "Who does what",
  subtitle = "Clear division of responsibilities between technology infrastructure, asset ownership, and regulatory licensing.",
  columns = [],
  disclaimerNote
}: WhoDoesWhatProps) {
  const colCount = columns.length;
  const gridClass = colCount === 2 
    ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" 
    : "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto";

  return (
    <section className="relative py-16 sm:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Operational Boundary</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {title}
          </h2>
          <p
            className="mt-3 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            {subtitle}
          </p>
        </div>

        {/* Columns Grid */}
        <div className={gridClass}>
          {columns.map((col, idx) => {
            const Icon = (col.iconType && ICON_MAP[col.iconType]) || Cpu;
            const isCopyM = col.isHighlight || idx === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                  isCopyM
                    ? "bg-gradient-to-b from-[#15a36e]/15 via-neutral-900 to-neutral-950 border-[#15a36e]/40 shadow-xl shadow-emerald-950/20"
                    : "bg-neutral-950/80 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCopyM
                          ? "bg-[#15a36e]/20 text-[#15a36e] border border-[#15a36e]/30"
                          : "bg-white/10 text-neutral-300 border border-white/15"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        {col.roleSubtitle || "Role & Scope"}
                      </span>
                      <h3
                        className="text-base sm:text-lg font-bold text-white"
                        style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                      >
                        {col.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-normal"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {col.summary}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-neutral-800">
                    {col.responsibilities.map((item, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isCopyM ? "text-[#15a36e]" : "text-neutral-400"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer Note Under Columns */}
        {disclaimerNote && (
          <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 max-w-4xl mx-auto flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500/90 flex-shrink-0 mt-0.5" />
            <p
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {disclaimerNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
