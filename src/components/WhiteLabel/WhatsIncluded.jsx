"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const modules = [
  {
    icon: '/icons/Tokenization/tiicon3.png',
    title: "Investor onboarding & compliance",
    description: "KYC/AML, identity and eligibility workflows."
  },
  {
    icon: '/icons/Tokenization/tiicon1.png',
    title: "Token issuance",
    description: "Permissioned tokens (ERC-3643) with transfer rules enforced on-chain."
  },
  {
    icon: '/icons/Tokenization/ticon6.avif',
    title: "Custody & wallets",
    description: "MPC self-custody or an institutional custodian, with policy-based transaction controls."
  },
  {
    icon: '/icons/Tokenization/tiicon4.png',
    title: "Admin console",
    description: "Issuance, investor and compliance management with a full audit trail."
  },
  {
    icon: '/icons/Tokenization/tiicon2.png',
    title: "Investor portal",
    description: "Web, iOS and Android in your brand: holdings, transactions and statements."
  },
  {
    icon: '/icons/Tokenization/ticon4.avif',
    title: "Reporting",
    description: "Operational reports and audit logs for administrators and auditors."
  }
];

const roadmapItems = [
  { icon: '/icons/Tokenization/ticon3.avif', label: "Marketplace modules" },
  { icon: '/icons/Tokenization/ticon11.avif', label: "ESG & sustainability data" },
  { icon: '/icons/Tokenization/distribution.avif', label: "Supply-chain traceability" }
];

export default function WhatsIncluded() {
  return (
    <section id="whats-included" className="py-16 sm:py-20 md:py-24 bg-[#0a0d14] text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              What&apos;s <span className="text-[#15a36e]">Included</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-400 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            A modular, full-stack tokenization suite tailored to enterprise operational and regulatory requirements.
          </p>
        </div>

        {/* 6 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-7 hover:border-[#15a36e]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(21,163,110,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-transparent mb-4 flex items-center justify-start flex-shrink-0">
                  <Image
                    src={mod.icon}
                    alt={mod.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {mod.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {mod.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* On the roadmap row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 pt-8 border-t border-neutral-800/80 bg-neutral-900/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#15a36e] animate-pulse" />
            <span
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              On the roadmap:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            {roadmapItems.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-xs text-neutral-300"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Image src={item.icon} alt={item.label} className="w-4 h-4 object-contain" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
