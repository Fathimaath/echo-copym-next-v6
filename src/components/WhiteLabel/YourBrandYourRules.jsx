"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const pillars = [
  {
    icon: '/icons/Tokenization/ticon2.avif',
    title: "Your domain, logo, colours and interface",
    desc: "A fully branded experience across web, iOS, and Android. Your clients interact exclusively with your brand, on your primary or dedicated sub-domain."
  },
  {
    icon: '/icons/Tokenization/ticon1.avif',
    title: "Eligibility and transfer rules set per asset and jurisdiction",
    desc: "Granular on-chain and off-chain rule engines. Configure whitelists, accreditation criteria, lock-ups, and transfer restrictions according to your legal structuring."
  },
  {
    icon: '/icons/Tokenization/shield.avif',
    title: "Your investor relationships and data stay yours",
    desc: "CopyM provides technology infrastructure only. You maintain full ownership of investor records, client communications, and customer relationships with zero platform lock-in."
  }
];

export default function YourBrandYourRules() {
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
              Your Brand, <span className="text-[#15a36e]">Your Rules</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Complete institutional control over customer touchpoints, compliance parameters, and proprietary data.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/80 rounded-2xl p-7 sm:p-8 hover:border-[#15a36e]/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-6 flex-shrink-0 flex items-center justify-start">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-black mb-3 leading-snug"
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
