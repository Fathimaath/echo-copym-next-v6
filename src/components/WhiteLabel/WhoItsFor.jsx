"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

const targets = [
  {
    icon: '/icons/Tokenization/tiicon1.png',
    title: "Banks & private banks",
    description: "Offer tokenized assets to clients without building the stack in-house."
  },
  {
    icon: '/icons/Tokenization/tiicon2.png',
    title: "Wealth platforms & family offices",
    description: "Give clients access to tokenized private-market products through your own portal."
  },
  {
    icon: '/icons/Tokenization/ticon5.avif',
    title: "Licensed exchanges & brokers",
    description: "Add tokenized-asset issuance and onboarding alongside your existing licence."
  },
  {
    icon: '/icons/Tokenization/ticon6.avif',
    title: "Asset managers & issuers",
    description: "Run your own tokenized funds or asset programmes end to end."
  }
];

export default function WhoItsFor() {
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
              Who It&apos;s <span className="text-[#15a36e]">For</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Built for institutions and licensed operators launching scalable real-world asset solutions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 sm:p-7 bg-[#f9fafb] border border-gray-200/80 hover:border-[#15a36e]/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-4 sm:mb-5 flex items-center justify-start flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <h3
                  className="text-lg font-bold text-black mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
