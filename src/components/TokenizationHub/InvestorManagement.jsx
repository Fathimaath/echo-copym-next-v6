"use client";
// src/pages/TokenizationHub/sections/InvestorManagement.jsx

import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';
const cyclonebitcoinImage = '/images/cyclonebitcoin.png';

export default function InvestorManagement() {
  const features = [
    {
      title: "Investor Dashboard",
      description: "Comprehensive dashboard for tracking investments, returns, and portfolio performance.",
      stats: "10+ Active"
    },
    {
      title: "Portfolio Analytics",
      description: "Advanced analytics and reporting tools for entitlement performance tracking.",
      stats: "Real Time"
    },
    {
      title: "Compliance Management",
      description: "Automated compliance monitoring and regulatory reporting for all investors.",
      stats: "100% Compliant"
    },
    {
      title: "Communication Hub",
      description: "Integrated communication tools for investor updates and announcements.",
      stats: "24/7 Support"
    }
  ];

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent rounded-t-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase mb-3 sm:mb-4 md:mb-5" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            <span className="text-black">INVESTOR </span>
            <span className="text-[#15a36e]">MANAGEMENT</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-black leading-relaxed max-w-6xl mx-auto px-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            Comprehensive tools for managing investor relationships, compliance, and portfolio performance.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 sm:gap-10 lg:gap-12 items-center lg:items-start -mt-4 sm:-mt-6 lg:-mt-8">
          {/* Left Side: Image and Buttons */}
          <div className="flex flex-col items-center lg:items-start -mt-8 sm:-mt-12 lg:-mt-[124px]">
            {/* 3D Graphic Image */}
            <div className="mb-4 sm:mb-6 w-full max-w-[280px] sm:max-w-md lg:max-w-lg">
              <Image
                src={cyclonebitcoinImage}
                alt="Digital Asset Ecosystem"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Two Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 -mt-8 sm:-mt-12 lg:-mt-[100px] items-center w-full max-w-lg px-4">
              {/* MANAGE INVESTORS Button */}
              <button
                className="bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                MANAGE INVESTORS
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* LEARN MORE Button */}
              <button
                className="border-2 border-emerald-500 text-emerald-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-emerald-500 hover:text-white transition-all duration-300"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Side: Four Cards Stacked */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {features.map((feature, index) => {
              // Further reduced header height for horizontally long cards
              const headerHeight = '48px';
              // Further reduced SVG dimensions proportionally
              const svgWidth = index === 0 ? 50 : 48;
              const svgHeightTop = 18;
              const svgHeightBottom = 18;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    position: 'relative',
                    marginBottom: '16px',
                    background: '#e6f2ed',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    width: '100%'
                  }}
                >
                  {/* Green Header Bar with Heading */}
                  <div style={{
                    height: headerHeight,
                    background: 'rgba(179,255,227,0.4)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                  }}>
                    <h3 style={{
                      fontSize: 'clamp(14px, 2vw, 18px)',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#000',
                      margin: '0'
                    }}>{feature.title}</h3>
                  </div>

                  {/* Grey Content Area */}
                  <div style={{
                    padding: '15px 20px',
                    background: '#f0f5f3',
                    position: 'relative'
                  }}>
                    <p className="text-center lg:text-left" style={{
                      fontSize: 'clamp(12px, 1.5vw, 14px)',
                      color: '#000',
                      lineHeight: '1.4',
                      margin: '0 0 20px 0'
                    }}>
                      {feature.description}
                    </p>

                    {/* Status Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '41px',
                      background: '#fff',
                      padding: '3px 9px',
                      borderRadius: '20px',

                      fontSize: 'clamp(10px, 1.4vw, 13px)',
                      color: '#15a36e',

                      whiteSpace: 'nowrap'
                    }}>
                      {feature.stats}
                    </div>
                  </div>

                  {/* Straight Corner Lines - Top Right */}
                  <svg width={svgWidth} height={svgHeightTop} viewBox={`0 0 ${svgWidth} ${svgHeightTop}`} fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    style={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}>
                    <line x1="0" y1="2" x2={index === 0 ? "48" : "46"} y2="2" stroke="#7DD1B2" strokeWidth="3" />
                    <line x1={index === 0 ? "48" : "46"} y1="2" x2={index === 0 ? "48" : "46"} y2="18" stroke="#7DD1B2" strokeWidth="3" />
                  </svg>

                  {/* Straight Corner Lines - Top Left */}
                  <svg width={32} height={svgHeightTop} viewBox={`0 0 32 ${svgHeightTop}`} fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    style={{ position: 'absolute', top: '0', left: '0', zIndex: 1 }}>
                    <line x1="32" y1="2" x2="2" y2="2" stroke="#7DD1B2" strokeWidth="3" />
                    <line x1="2" y1="2" x2="2" y2="18" stroke="#7DD1B2" strokeWidth="3" />
                  </svg>

                  {/* Straight Corner Lines - Bottom Right */}
                  <svg width={svgWidth} height={svgHeightBottom} viewBox={`0 0 ${svgWidth} ${svgHeightBottom}`} fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: '0', right: '0', zIndex: 1 }}>
                    <line x1="0" y1="16" x2={index === 0 ? "48" : "46"} y2="16" stroke="#7DD1B2" strokeWidth="3" />
                    <line x1={index === 0 ? "48" : "46"} y1="16" x2={index === 0 ? "48" : "46"} y2="0" stroke="#7DD1B2" strokeWidth="3" />
                  </svg>

                  {/* Straight Corner Lines - Bottom Left */}
                  <svg width={32} height={svgHeightBottom} viewBox={`0 0 32 ${svgHeightBottom}`} fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: '0', left: '0', zIndex: 1 }}>
                    <line x1="32" y1="16" x2="2" y2="16" stroke="#7DD1B2" strokeWidth="3" />
                    <line x1="2" y1="16" x2="2" y2="0" stroke="#7DD1B2" strokeWidth="3" />
                  </svg>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}