"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const securityBlocks = [
  {
    icon: '/icons/Tokenization/tiicon1.png',
    title: "Custody model",
    desc: "Flexible custody architectures supporting either multi-party computation (MPC) self-custody or direct API integration with regulated institutional custodians."
  },
  {
    icon: '/icons/Tokenization/shield.avif',
    title: "Key management & transaction policies",
    desc: "Policy-based transaction signing requiring multi-signature quorums, time-locks, and dual-control approval workflows for all sensitive operations."
  },
  {
    icon: '/icons/Tokenization/ticon3.avif',
    title: "Hosting & infrastructure",
    desc: "Tier-4 ISO-certified cloud infrastructure featuring automated redundancy, DDoS mitigation, network isolation, and continuous vulnerability monitoring."
  },
  {
    icon: '/icons/Tokenization/ticon4.avif',
    title: "Encrypted document storage",
    desc: "AES-256 bit encryption at rest and TLS 1.3 in transit for all asset prospectuses, investor documentation, and confidential compliance records."
  },
  {
    icon: '/icons/Tokenization/tiicon4.png',
    title: "Role-based access (RBAC)",
    desc: "Granular separation of duties across administrators, compliance officers, and auditors, enforced with mandatory multi-factor authentication (MFA)."
  }
];

export default function SecurityArchitecture() {
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
              Platform <span className="text-[#15a36e]">Security Model</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Institutional defense-in-depth security protecting infrastructure, cryptographic keys, and investor data.
          </p>
        </div>

        {/* 5 Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {securityBlocks.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#f9fafb] border border-gray-200/90 rounded-2xl p-6 sm:p-7 hover:border-[#15a36e]/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
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
                    className="text-lg font-bold text-black mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal"
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
