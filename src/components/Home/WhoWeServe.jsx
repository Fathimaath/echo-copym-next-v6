"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';
import NewsletterModal from '@/components/NewsletterModal';
const assetsImage = '/images/assets.avif';
const investorsImage = '/images/investors.avif';
const partnersImage = '/images/partners.avif';
const investorsMobileImage = '/images/investersmobile.avif';
const partnersMobileImage = '/images/partnersmobile.avif';

const WhoWeServe = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section className="relative w-full bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <div className="relative w-fit mx-auto">
            <h2 className="inline-flex text-center justify-center items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-black">WHO WE </span>
              <span className="text-[#15a36e]">SERVE</span>
            </h2>

          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-sm text-black font-normal leading-relaxed tracking-wide mt-3 sm:mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            Copym enables the real-world asset ecosystem by connecting issuers, investors, and infrastructure partners through a secure, compliance-first platform.
          </p>
        </motion.div>

        {/* 3-Card Grid Layout */}
        {/* Keep all horizontal gaps (left/right gutter, between 2-right cards, and main column gap) equal */}
        <div className="grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-x-4 lg:gap-y-4">
          {/* Left Card - Large (tall + wide) - Asset Owners & Institutions */}
          <div className="lg:col-span-3 lg:row-span-2 bg-black px-3 sm:px-4 lg:px-4 py-4 sm:py-5 lg:py-6 border border-gray-800 flex flex-col rounded-lg overflow-hidden">
            {/* Large Image - Dominant Visual */}
            <div className="mb-4 sm:mb-5 lg:mb-6 flex items-start justify-center min-h-[180px] sm:min-h-[220px] lg:min-h-[300px] -mt-2 sm:-mt-3 lg:-mt-4">
              <Image
                src={assetsImage}
                alt="Asset Owners & Institutions"
                className="w-full h-full"
                style={{ objectFit: 'cover', transform: 'scale(1.05)' }}
              />
            </div>

            {/* Text Content Container with Padding */}
            <div className="flex flex-col px-4 sm:px-0 sm:pl-10 lg:pl-12">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-base sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white mb-2 lg:mb-2.5"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Asset Owners & Institutions
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-sm mb-3 lg:mb-3.5 whitespace-normal"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Structure, launch, and manage tokenized real-world assets with institutional-grade controls and regulatory alignment.
              </motion.p>

              {/* Bullet Points */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-1.5 sm:space-y-2 mb-4 lg:mb-4"
              >
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Real estate, private credit, funds, and commodities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    On-chain entitlement and asset lifecycle management
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    White-label investor access and distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Reporting, disclosures, and liquidity enablement
                  </span>
                </li>
              </motion.ul>

              {/* Learn More Button */}
              <button onClick={() => setModalOpen(true)} className="group inline-flex items-center justify-between min-w-[120px] sm:min-w-[150px] bg-black border border-white/40 rounded-full p-1 hover:bg-white/10 transition-all duration-300 w-fit self-center lg:self-start" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="pl-3 sm:pl-4 pr-2 text-white font-semibold text-xs sm:text-base">
                  Learn More
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Top-Right Card - Investors */}
          <div className="lg:col-span-4 lg:row-span-1 bg-black px-3 sm:px-4 lg:px-4 py-4 sm:py-5 lg:py-4 border border-gray-800 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 h-full overflow-hidden rounded-lg">
            {/* Image on Top (Mobile) / Right (Desktop) */}
            <div className="w-full lg:w-auto lg:flex-1 flex items-center justify-center lg:justify-end lg:order-2 min-h-[180px] sm:min-h-[220px] lg:min-h-[140px] -mt-2 sm:-mt-3 lg:mt-0">
              {/* Mobile Image */}
              <Image
                src={investorsMobileImage}
                alt="Investors"
                className="lg:hidden w-full h-full max-h-[300px] lg:max-h-[360px] object-contain"
              />
              {/* Desktop Image */}
              <Image
                src={investorsImage}
                alt="Investors"
                className="hidden lg:block w-auto h-auto max-h-[240px] object-cover object-center transform scale-125"
              />
            </div>

            {/* Content Below (Mobile) / Left (Desktop) */}
            <div className="flex-1 lg:max-w-[60%] lg:order-1 flex flex-col justify-center px-4 sm:px-0 sm:pl-10 lg:pl-12">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-base sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white mb-1.5 lg:mb-1.5"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Investors
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-sm mb-2 lg:mb-2 whitespace-normal"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Access structured real-world asset exposure through a transparent, secure, and regulated environment.
              </motion.p>

              {/* Bullet Points */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-1 sm:space-y-1 mb-4 lg:mb-4"
              >
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Fractional participation in vetted asset structures
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed whitespace-nowrap" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Efficient execution with gas-free settlement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Portfolio visibility and automated allocation tools
                  </span>
                </li>
              </motion.ul>

              {/* Learn More Button */}
              <button onClick={() => setModalOpen(true)} className="group inline-flex items-center justify-between min-w-[120px] sm:min-w-[150px] bg-black border border-white/40 rounded-full p-1 hover:bg-white/10 transition-all duration-300 w-fit self-center lg:self-start" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="pl-3 sm:pl-4 pr-2 text-white font-semibold text-xs sm:text-base">
                  Learn More
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg
                    className="w-4 h-4 sm:w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom-Right Card - Partners */}
          <div className="lg:col-span-4 lg:row-span-1 bg-black px-3 sm:px-4 lg:px-4 py-4 sm:py-5 lg:py-6 border border-gray-800 flex flex-col lg:flex-row items-center gap-3 lg:gap-4 h-full overflow-hidden rounded-lg">
            {/* Image on Top (Mobile) / Left (Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start min-h-[180px] sm:min-h-[220px] lg:min-h-[160px] flex-shrink-0 -mt-2 sm:-mt-3 lg:mt-0">
              {/* Mobile Image */}
              <Image
                src={partnersMobileImage}
                alt="Partners"
                className="lg:hidden w-full h-full max-h-[300px] lg:max-h-[360px] object-contain"
              />
              {/* Desktop Image */}
              <Image
                src={partnersImage}
                alt="Partners"
                className="hidden lg:block w-auto h-auto max-h-[240px] object-cover object-center transform scale-125 translate-x-2 translate-y-10"
              />
            </div>

            {/* Content on Right */}
            <div className="flex-1 lg:max-w-[50%] flex flex-col justify-center px-4 sm:px-0 sm:pl-10 lg:pl-12">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-base sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white mb-2 lg:mb-2.5"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Partners
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-sm mb-3 lg:mb-3.5"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                Power the real-world asset ecosystem by integrating trusted infrastructure and services.
              </motion.p>

              {/* Bullet Points */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-1.5 sm:space-y-2 mb-4 lg:mb-4"
              >
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Custody, wallet, and settlement integrations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Identity, compliance, and data providers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-xs font-normal">•</span>
                  <span className="text-xs sm:text-sm text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    Network operators and ecosystem partners
                  </span>
                </li>
              </motion.ul>

              {/* Learn More Button */}
              <button onClick={() => setModalOpen(true)} className="group inline-flex items-center justify-between min-w-[120px] sm:min-w-[150px] bg-black border border-white/40 rounded-full p-1 hover:bg-white/10 transition-all duration-300 w-fit self-center lg:self-start" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="pl-3 sm:pl-4 pr-2 text-white font-semibold text-xs sm:text-base">
                  Learn More
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg
                    className="w-4 h-4 sm:w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <NewsletterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default WhoWeServe;