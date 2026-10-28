"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import Image from '@/components/Image';

const copymResponsibilities = [
  "Core platform technology and white-label infrastructure",
  "End-to-end technical deployment and sandbox staging",
  "Smart contract engineering and transfer rule engines",
  "Custody, identity (KYC/AML) and API integrations",
  "Platform updates, security patches and SLA maintenance",
  "Administrator and technical operations support"
];

const clientResponsibilities = [
  "Regulatory licences and supervisory approvals (e.g., VARA, SCA, ADGM or DFSA)",
  "Legal structuring of underlying real-world assets and offerings",
  "Custody of client assets through licensed custodians or qualified partners",
  "Investor relationships, commercial terms, and client communications",
  "Distribution, capital raising, and primary/secondary market participation rules"
];

export default function WhoDoesWhat() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Who Does <span className="text-[#15a36e]">What</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            A clear division of responsibilities: CopyM delivers the technology layer, while you and your licensed partners handle regulatory and commercial activities.
          </p>
        </div>

        {/* 2 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CopyM Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-[#15a36e]/30 bg-emerald-50/20 p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-transparent flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/icons/Tokenization/tiicon1.png"
                    alt="CopyM Technology Provider"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    CopyM
                  </h3>
                  <span className="text-xs text-[#15a36e] font-semibold uppercase tracking-wider">Technology Provider</span>
                </div>
              </div>

              <ul className="space-y-3.5">
                {copymResponsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#15a36e] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Client Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-transparent flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/icons/Tokenization/tiicon2.png"
                    alt="You & Licensed Partners"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    You &amp; Licensed Partners
                  </h3>
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Issuer &amp; Operator</span>
                </div>
              </div>

              <ul className="space-y-3.5">
                {clientResponsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Note under the columns */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 max-w-5xl mx-auto rounded-xl p-4 bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900"
        >
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Regulatory note:</strong> Regulatory licences and approvals are not included in the platform and remain the responsibility of the client and its licensed partners.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
