"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export interface WorkflowStep {
  title: string;
  description: string;
  tag?: string;
}

export interface SolutionWorkflowProps {
  title?: string;
  subtitle?: string;
  steps?: WorkflowStep[];
  highlightLine?: string;
}

export default function SolutionWorkflow({
  title = "How CopyM supports it",
  subtitle = "End-to-end infrastructure from asset intake and smart contracts to compliant investor onboarding and lifecycle management.",
  steps = [],
  highlightLine
}: SolutionWorkflowProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-neutral-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#15a36e]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15a36e]/15 border border-[#15a36e]/30 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured 4-Step Workflow</span>
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

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between hover:border-[#15a36e]/40 transition-all duration-300 group"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#15a36e]/15 border border-[#15a36e]/30 flex items-center justify-center text-sm font-bold text-[#15a36e] group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block text-neutral-600 group-hover:text-[#15a36e] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <h3
                  className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#15a36e] transition-colors"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {step.description}
                </p>
              </div>

              {step.tag && (
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-[#15a36e]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.tag}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Highlight line under steps if provided */}
        {highlightLine && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#15a36e]/10 via-[#15a36e]/5 to-transparent border border-[#15a36e]/30 flex items-start sm:items-center gap-3 max-w-4xl mx-auto"
          >
            <ShieldCheck className="w-5 h-5 text-[#15a36e] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p
              className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              {highlightLine}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
