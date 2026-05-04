"use client";
// src/pages/TokenizationHub/sections/TokenDistribution.jsx

import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component

export default function TokenDistribution() {
  const features = [
    {
      title: "Global Distribution",
      description: "Reach investors worldwide with automated compliance and multi-jurisdictional support."
    },
    {
      title: "Investor Onboarding",
      description: "Streamlined KYC/AML verification with instant investor qualification and onboarding."
    },
    {
      title: "Liquidity Management",
      description: "Automated market making and liquidity provision for seamless trading experience."
    },
    {
      title: "Regulatory Compliance",
      description: "Built-in compliance frameworks ensuring adherence to global securities regulations."
    }
  ];

  return (
    <section className="bg-black pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative w-fit mx-auto mb-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <span className="text-white">TOKEN </span>
              <span className="text-[#15a36e]">DISTRIBUTION</span>
            </h2>

          </div>

          <p
            className="text-sm sm:text-base md:text-lg text-white font-normal leading-relaxed mt-6 max-w-4xl mx-auto"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            Reach global investors with automated compliance, seamless onboarding, <br className="hidden sm:block" /> and intelligent liquidity management.
          </p>
        </div>

        {/* Features Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between mt-6 sm:mt-8 md:mt-10 gap-12 lg:gap-20">

          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-2xl mx-auto lg:max-w-none">
              <Image
                src="/assets/Images/icons/distributionew.png"
                alt="Token Distribution Network"
                className="w-full h-full object-contain scale-[1.6] -translate-y-12 sm:translate-y-0 sm:scale-110 lg:scale-150 lg:-translate-y-8 transform-gpu"
              />
            </div>
          </div>

          {/* Right Column - Features List */}
          <div className="w-full lg:w-1/2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col pt-2 pb-6 relative"
              >
                <div className="flex-1">
                  <h3
                    className="text-white font-bold text-lg sm:text-xl mb-1.5"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/70 text-sm sm:text-base leading-relaxed"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    {feature.description}
                  </p>
                </div>
                {index !== features.length - 1 && (
                  <div
                    className="absolute bottom-0 left-0 w-full h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, #15A36E 50%, transparent 100%)'
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}