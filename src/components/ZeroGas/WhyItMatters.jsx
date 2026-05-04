// src/pages/Zerogas/sections/WhyItMatters.jsx

import React from 'react';
const tiicon1 = '/icons/Tokenization/tiicon1.png';
const tiicon2 = '/icons/Tokenization/tiicon2.png';
const tiicon3 = '/icons/Tokenization/tiicon3.png';
const tiicon4 = '/icons/Tokenization/tiicon4.png';
import Image from 'next/image';

export default function WhyItMatters() {
  const whyZeroGasFeatures = [
    {
      title: "Mass adoption",
      description: "Eliminates the single biggest friction point for new users - acquiring and managing gas tokens.",
      icon: tiicon4
    },
    {
      title: "Predictable costs",
      description: "Enterprises and institutions can onboard without volatile gas fees impacting their operational budgets.",
      icon: tiicon2
    },
    {
      title: "Higher participation and liquidity",
      description: "When users don't worry about gas, they operate more freely and frequently. This increases overall platform engagement.",
      icon: tiicon1
    },
    {
      title: "Ideal for real-world and regulated assets",
      description: "With zero gas, you can enforce strict access controls and compliance rules without penalizing authorized users.",
      icon: tiicon3
    }
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16">
          <div className="relative w-fit mb-4 mx-auto">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase text-center"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <span className="text-black">Why </span>
              <span className="text-[#15a36e]">Zero Gas</span>
              <span className="text-black"> matters ?</span>
            </h2>
          </div>

          <p
            className="text-sm sm:text-base md:text-lg text-black leading-relaxed mt-6 max-w-4xl text-center mx-auto"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            Zero gas fee execution is designed to make blockchain onboarding frictionless, ensuring that every user, <br className="hidden sm:block" /> from retail to institution, can operate without technical or fiscal barriers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {whyZeroGasFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                {/* Icon Circle */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image src={feature.icon} alt={feature.title} width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                </div>

                {/* Title */}
                <h3
                  className="text-[#15a36e] font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-black text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
