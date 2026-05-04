"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import SectionContainer from '@/components/Layout/SectionContainer';
import SectionHeader from '@/components/Layout/SectionHeader';
import bigInvestmentAnimation from '@/../public/lotties/bigInvestment.json';
import tradeAnytimeAnimation from '@/../public/lotties/tradeanytime.json';
import exploreAnimation from '@/../public/lotties/explore.json';
import earnWithoutHassleAnimation from '@/../public/lotties/earnwithoutahassle.json';

const FeatureSection = () => {
  return (
    <SectionContainer padding="pt-12 pb-26 sm:py-20 md:py-24 lg:py-26 text-center" bgColor="bg-white" maxWidth="max-w-10xl">
      {/* Main Heading */}
      <SectionHeader
        title="EXPLORE → OWN → TRADE → EARN"
        highlightWords={['OWN', 'EARN']}
        alignment="center"
      />

      {/* Vertical Stack of 4 Sections - Reduced spacing for compactness */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
        {/* Section 1 - Explore curated real-world assets (Graphic Left) */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col md:flex-row md:justify-center items-center gap-6 md:gap-10 lg:gap-16"
         >
          {/* Graphic - Left */}
          <div className="w-full md:w-auto flex justify-center">
            <div
              className="w-[280px] sm:w-[220px] md:w-[360px] min-h-[180px] sm:min-h-[200px] md:h-[360px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: '0px 4px 48.9px 0px rgba(189, 227, 213, 1)',
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(240,240,240,0.9), rgba(250,250,250,1))',
              }}
            >
              <Lottie
                animationData={bigInvestmentAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content - Right */}
          <div className="w-full md:w-auto lg:w-auto text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-1 sm:mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Explore curated real-world assets
            </h3>
            <p className="text-sm md:text-lg text-black leading-normal max-w-xl md:mx-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              From property and gold to private credit and art, CORA AI helps you discover opportunities 
              and summarize key risks – so you can decide faster.
            </p>
          </div>
        </motion.div>

        {/* Section 2 - Access fractional RWAs(Graphic Right) */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col md:flex-row-reverse md:justify-center items-center gap-6 md:gap-10 lg:gap-16"
         >
          {/* Graphic - Right */}
          <div className="w-full md:w-auto flex justify-center">
            <div
              className="w-[280px] sm:w-[220px] md:w-[360px] min-h-[180px] sm:min-h-[200px] md:h-[360px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: '0px 4px 48.9px 0px rgba(189, 227, 213, 1)',
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(240,240,240,0.9), rgba(250,250,250,1))',
              }}
            >
              <Lottie
                animationData={tradeAnytimeAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content - Left */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-1 sm:mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Access fractional RWAs
            </h3>
            <p className="text-sm md:text-lg text-black leading-normal max-w-xl mx-auto md:mx-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Start with smaller amounts and gain exposure to curated real-world assets – backed by transparent on-chain entitlements and built-in compliance.
            </p>
          </div>
        </motion.div>

        {/* Section 3 -  Trade anytime, anywhere (Graphic Left) */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col md:flex-row md:justify-center items-center gap-6 md:gap-10 lg:gap-16"
         >
          {/* Graphic - Left */}
          <div className="w-full md:w-auto flex justify-center">
            <div
              className="w-[280px] sm:w-[220px] md:w-[360px] min-h-[180px] sm:min-h-[200px] md:h-[360px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: '0px 4px 48.9px 0px rgba(189, 227, 213, 1)',
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(240,240,240,0.9), rgba(250,250,250,1))',
              }}
            >
              <Lottie
                animationData={earnWithoutHassleAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content - Right */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-1 sm:mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Trade anytime, anywhere
            </h3>
            <p className="text-sm md:text-lg text-black leading-normal max-w-xl mx-auto md:mx-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Buy and sell eligible positions with streamlined settlement and a built-in wallet experience – designed for compliant access and smooth portfolio management.
            </p>
          </div>
        </motion.div>

        {/* Section 4 - Invest with clarity, not complexity (Graphic Right) */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col md:flex-row-reverse md:justify-center items-center gap-6 md:gap-10 lg:gap-16"
         >
          {/* Graphic - Right */}
          <div className="w-full md:w-auto flex justify-center">
            <div
              className="w-[280px] sm:w-[220px] md:w-[360px] min-h-[180px] sm:min-h-[200px] md:h-[360px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: '0px 4px 48.9px 0px rgba(189, 227, 213, 1)',
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(240,240,240,0.9), rgba(250,250,250,1))',
              }}
            >
              <Lottie
                animationData={exploreAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content - Left */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-1 sm:mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Invest with clarity, not complexity
            </h3>
            <p className="text-sm md:text-lg text-black leading-normal max-w-xl mx-auto md:mx-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              CORA AI helps you discover opportunities, summarize risks, and monitor positions – while compliance and onboarding are built into the platform.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default FeatureSection;