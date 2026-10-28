// src/pages/TokenizationHub/sections/TokenizationProcess.jsx

import React from 'react';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component
const ticon1 = '/icons/Tokenization/ticon1.avif';
const ticon2 = '/icons/Tokenization/ticon2.avif';
const ticon3 = '/icons/Tokenization/ticon3.avif';
const ticon4 = '/icons/Tokenization/ticon4.avif';
const ticon5 = '/icons/Tokenization/ticon5.avif';
const ticon6 = '/icons/Tokenization/ticon6.avif';

export default function TokenizationProcess() {
  // Checklist Item 32: “Why tokenize?” cards
  // Keep all six cards and rewrite these four. “Increased accessibility” becomes “Broader distribution”.
  const whyTokenizeFeatures = [
    {
      title: "Programmable terms",
      description: "Program compliance rules and ownership terms required for diverse asset and investor classifications via digital contracts.",
      icon: ticon1
    },
    {
      title: "Broader distribution",
      description: "Reach eligible investors across jurisdictions through compliant onboarding.",
      icon: ticon2
    },
    {
      title: "Global reach",
      description: "Connect assets with eligible investors in several jurisdictions, subject to local rules.",
      icon: ticon3
    },
    {
      title: "Fractional Ownership",
      description: "Enable investors to own portions of high-value assets improving market liquidity and diversifying their asset portfolios.",
      icon: ticon6
    },
    {
      title: "Faster settlement",
      description: "Token transfers settle on-chain, reducing reconciliation between parties.",
      icon: ticon5
    },
    {
      title: "Greater transparency",
      description: "Investors and administrators see holdings, transfers and asset documents in real time.",
      icon: ticon4
    }
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="relative w-fit mx-auto mb-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span className="text-black">WHY </span>
              <span className="text-[#15a36e]">TOKENIZE</span>
              <span className="text-black"> ?</span>
            </h2>
          </div>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-sm text-black leading-relaxed mt-6 max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Tokenization unlocks liquidity, broadens investor access, and enables transparent, <br />programmable ownership of real-world assets
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {whyTokenizeFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-4 sm:mb-6 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3
                className="text-[#15a36e] font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-black text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}