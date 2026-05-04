// src/pages/PrivacyAi/sections/HowItWorks.jsx

import React from 'react';
const tiicon2 = '/icons/Tokenization/tiicon2.png';
const tiicon3 = '/icons/Tokenization/tiicon3.png';
const smallp1 = "/assets/Images/smallp1.png";
const smallp2 = "/assets/Images/smallp2.png";
const smallp3 = "/assets/Images/smallp3.png";
import Image from 'next/image';

export default function HowItWorks() {
  const privacyAiFeatures = [
    {
      title: "Intelligent Data Segmentation",
      description: "Data is classified as public, confidential or restricted. Only cryptographic proofs and essential metadata are written on-chain.",
      icon: smallp1
    },
    {
      title: "Privacy-Preserving Verification",
      description: "Eligibility, entitlement and compliance are verified without exposing sensitive personal or business information.",
      icon: smallp2
    },
    {
      title: "AI-Driven Access Control",
      description: "Access rights adapt dynamically based on role, jurisdiction, asset type and transaction context.",
      icon: smallp3
    },
    {
      title: "Continuous Risk Monitoring",
      description: "AI monitors patterns across transactions to detect anomalies, prevent leakage and reinforce fraud prevention.",
      icon: tiicon2
    },
    {
      title: "Off-Chain Intelligence, On-Chain Trust",
      description: "Sensitive data is processed securely off-chain, while hashes and proofs on-chain guarantee integrity and auditability.",
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
              <span className="text-black">How </span>
              <span className="text-[#15a36e]">Privacy AI</span>
              <span className="text-black"> works ?</span>
            </h2>
          </div>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-sm text-black leading-relaxed mt-6 max-w-4xl text-center mx-auto"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            Master the markets with AI-driven insights, predictive alerts, and real-time intelligence <br className="hidden sm:block" /> that give you the edge in crypto trading
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {privacyAiFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                {/* Icon Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image src={feature.icon} alt={feature.title} width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                </div>

                {/* Title */}
                <h3
                  className="text-[#15a36e] font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-black text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
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
