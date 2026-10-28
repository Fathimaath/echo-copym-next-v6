"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const layers = [
  {
    num: "01",
    icon: '/icons/Tokenization/tiicon3.png',
    title: "Identity & Compliance",
    desc: "Investor onboarding, KYC/KYB checks, accreditation status, and jurisdictional eligibility screening."
  },
  {
    num: "02",
    icon: '/icons/Tokenization/ticon1.avif',
    title: "Workflows & Rules",
    desc: "Configurable business logic, minting approvals, cap table management, and corporate actions."
  },
  {
    num: "03",
    icon: '/icons/Tokenization/ticon6.avif',
    title: "Token Layer (Chain-Agnostic)",
    desc: "ERC-3643 permissioned token contracts with on-chain transfer restrictions and automated compliance."
  },
  {
    num: "04",
    icon: '/icons/Tokenization/tiicon1.png',
    title: "Custody & Wallets",
    desc: "Integration with institutional qualified custodians or MPC self-custody with policy-based multi-sig controls."
  },
  {
    num: "05",
    icon: '/icons/Tokenization/ticon4.avif',
    title: "Secure Storage & Reporting",
    desc: "Encrypted document storage, automated audit logs, tax reports, and real-time administrator analytics."
  }
];

export default function ArchitectureOverview() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0d14] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Architecture <span className="text-[#15a36e]">at a Glance</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-400 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            A high-level five-tier architecture designed for enterprise reliability, compliance, and multi-chain compatibility.
          </p>
        </div>

        {/* 5 Layer Architecture Diagram */}
        <div className="max-w-4xl mx-auto space-y-4">
          {layers.map((layer, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#15a36e]/60 transition-all duration-300 relative group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-transparent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src={layer.icon}
                      alt={layer.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#15a36e] font-bold">Layer {layer.num}</span>
                      <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        {layer.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap pl-4">
                  Tier {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
