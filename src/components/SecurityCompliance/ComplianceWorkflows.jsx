"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const workflows = [
  {
    icon: '/icons/Tokenization/tiicon3.png',
    title: "Identity and KYC/KYB/AML checks",
    desc: "Streamlined verification workflows for individual investors and corporate entities, including automated PEP & sanctions screening, document verification, and liveness detection."
  },
  {
    icon: '/icons/Tokenization/ticon1.avif',
    title: "Investor eligibility rules",
    desc: "Dynamic qualification checks configuring who can participate based on accreditation status, minimum investment amounts, and jurisdictional compliance criteria."
  },
  {
    icon: '/icons/Tokenization/shield.avif',
    title: "On-chain transfer restrictions (ERC-3643)",
    desc: "Token standards embedded with conditional transfer rules. Tokens can only be sent, received, or held by verified wallet addresses that satisfy active compliance parameters."
  },
  {
    icon: '/icons/Tokenization/ticon4.avif',
    title: "Audit trail and compliance reporting",
    desc: "Complete chronological history of all investor onboarding decisions, administrative approvals, token mints, burns, and transfers for regulatory examination."
  }
];

export default function ComplianceWorkflows() {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0d14] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Compliance <span className="text-[#15a36e]">Workflows</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-400 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            How the CopyM platform automates participant verification, eligibility enforcement, and regulatory compliance.
          </p>
        </div>

        {/* 4 Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {workflows.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 hover:border-[#15a36e]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-5 flex-shrink-0 flex items-center justify-start">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
