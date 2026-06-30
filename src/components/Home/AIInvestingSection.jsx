"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from '../Image'; // Import our AVIF-compatible Image component
const ellipse = '/SVG/mixedellipse.svg';


export default function AIInvestingSection() {
  useEffect(() => {
    // MOBILE-ONLY: Dynamic adjustments for AI Investing section only
    if (window.innerWidth <= 768) {
      const adjustForMobile = () => {
        const centralContainer = document.querySelector('.central-container');
        if (centralContainer) {
          // Adjust scale based on screen width
          const screenWidth = window.innerWidth;
          const scale = Math.min(screenWidth / 375, 1); // 375px as baseline
          centralContainer.style.transform = `scale(${Math.max(scale, 0.6)})`;
        }

        // Ensure proper touch targets for mobile
        const infoBoxes = document.querySelectorAll('.info-box');
        infoBoxes.forEach(box => {
          const rect = box.getBoundingClientRect();
          if (rect.width < 100) { // Minimum touch area for info boxes
            box.style.minWidth = '100px';
          }
        });
      };

      adjustForMobile();

      // Listen for window resize to maintain mobile adjustments
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          adjustForMobile();
        } else {
          // Reset style for desktop if needed
          const centralContainer = document.querySelector('.central-container');
          if (centralContainer) {
            centralContainer.style.transform = '';
          }
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="ai-investing-section w-full bg-black pt-12 sm:pt-12 md:pt-12 lg:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-x-hidden relative">
      <style>{`
        /* MOBILE-ONLY: AI Investing Section */
        /* MOBILE-ONLY: AI Investing Section */
        @media (max-width: 768px) {
          .ai-investing-section {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          
          .ai-investing-title {
            font-size: clamp(1.2rem, 4vw, 1.8rem) !important;
            margin-bottom: 1rem;
          }
          
          .ai-investing-subtitle {
            font-size: clamp(0.8rem, 3vw, 1rem) !important;
            line-height: 1.4;
            margin-bottom: 1.5rem;
          }

          .central-container {
            margin-top: 0rem;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform-origin: center center;
          }

          .info-box {
            width: clamp(90px, 30vw, 140px); /* Reduced width for mobile */
            padding: 0;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 40;
            display: flex;
            align-items: center;
          }

          .info-box-left {
            left: 0 !important; /* Pin to edges to maximize space */
            padding-left: 2%; 
            justify-content: flex-end;
          }

          .info-box-right {
            right: 0 !important;
            padding-right: 2%;
            justify-content: flex-start;
          }

          .info-box-text {
            font-size: clamp(7px, 2.2vw, 10px) !important;
            line-height: 1.2;
            font-weight: 500 !important;
            min-width: 0; /* Allow shrinking */
            padding-top: clamp(20px, 5vw, 24px) !important; /* Move text further down to align first line with vector */
          }

          .info-box-text span {
            font-weight: 800 !important;
          }

          .connector-line {
            width: clamp(20px, 6vw, 40px) !important;
            transform: translateY(1px) !important;
          }

          .central-visual {
            transform: none !important;
            position: relative;
            z-index: 30;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .central-image {
            width: clamp(110px, 35vw, 160px) !important; /* Significantly smaller to fit inside ellipse */
            height: auto !important;
            transform: translateY(12px) !important; /* Slightly moved down */
            object-fit: contain;
          }

          .ellipse-container {
             transform: none !important; /* Reset desktop shift for mobile */
             align-items: center;
          }

          .ai-investing-cta-group {
            padding-top: 1.5rem !important;
            gap: 1rem !important;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 !mb-0">
          <div className="relative w-fit mx-auto mb-2 sm:mb-3 !mb-0">
            <h2 className="ai-investing-title flex flex-col items-center gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1 !mb-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-[#15a36e]">CORA AI</span>
              <span className="text-white">YOUR INTELLIGENT EDGE IN REAL-WORLD ASSETS</span>
            </h2>
          </div>
          <p className="ai-investing-subtitle text-sm text-white font-normal leading-relaxed tracking-wide mt-3 sm:mt-4 !mb-0 max-w-3xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            Turn complex asset data into clear insights. Cora AI helps you analyze opportunities, understand risks, <br className="hidden sm:block" />
            and make confident decisions across real-world assets.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">

          {/* Item 1: The Blue Sphere with Info Boxes */}
          <div className="central-container relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex justify-center items-center -mt-6 sm:-mt-12 md:-mt-16">
            {/* Background Ellipse for depth */}
            <div className="ellipse-container absolute inset-0 flex items-center justify-center -z-10 translate-y-10 md:translate-y-14 lg:translate-y-18" suppressHydrationWarning>
              <img
                src={ellipse}
                alt=""
                loading="lazy"
                className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] opacity-60"
              />
            </div>

            {/* Left Info Box - Text Only */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="info-box info-box-left absolute left-0 sm:left-[2%] lg:left-[3%] xl:left-[8%] top-1/2 -translate-y-1/2 z-20 w-[110px] sm:w-[240px] lg:w-[320px] flex items-center justify-end translate-y-2 md:translate-y-4 lg:translate-y-6"
            >
              <p className="info-box-text text-[10px] sm:text-[11px] lg:text-[13px] text-white font-medium leading-relaxed text-right pr-1 sm:pr-4 translate-y-3 !mb-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="text-[#15a36e] font-bold">Cora AI</span> is Copym’s intelligence layer, designed to simplify real-world asset participation through data-driven insights.
              </p>
              {/* Left Connector Line */}
              <img
                src="/assets/svg/leftvector.svg"
                alt=""
                loading="lazy"
                className="connector-line w-[40px] sm:w-[80px] lg:w-[100px] h-auto flex-shrink-0 translate-y-2 -translate-x-2.5"
              />
            </motion.div>

            {/* Central Visual - Restored to Image-based Sphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="central-visual absolute left-1/2 -translate-x-1/2 z-30"
            >
              <Image
                src="/assets/Images/cora-ai.avif"
                alt="Cora AI"
                className="central-image w-[180px] sm:w-[280px] md:w-[340px] lg:w-[420px] h-auto object-contain translate-y-12"
              />
            </motion.div>

            {/* Right Info Box - Restored Pill Style */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="info-box info-box-right absolute right-[2%] sm:right-[2%] lg:right-[4%] xl:right-[8%] top-1/2 -translate-y-1/2 z-20 w-[110px] sm:w-[240px] lg:w-[320px] flex items-center justify-start translate-y-2 md:translate-y-4 lg:translate-y-6"
            >
              {/* Right Connector Line */}
              <img
                src="/assets/svg/rightvectorr.svg"
                alt=""
                loading="lazy"
                className="connector-line w-[40px] sm:w-[80px] lg:w-[100px] h-auto flex-shrink-0 translate-y-1.5"
              />
              <p className="info-box-text text-[10px] sm:text-[11px] lg:text-[13px] text-white font-medium leading-relaxed text-left pl-1 sm:pl-4 translate-y-3 !mb-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Advanced analytics transforming market signals, asset data, and portfolio context into <span className="text-[#15a36e] font-bold">actionable intelligence.</span>
              </p>
            </motion.div>
          </div>

          {/* CTA Group: Grouped Heading and Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="ai-investing-cta-group w-full flex flex-col items-center gap-4 sm:gap-6 pt-10 sm:pt-4 md:pt-6 lg:pt-8 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10"
          >
            {/* Item 2: Bold Heading */}
            <h2 className="ai-investing-bottom-heading text-base sm:text-lg md:text-xl lg:text-[24px] font-bold text-white leading-tight tracking-wide text-center z-10 !mb-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Think Smarter. Decide Better.
            </h2>

            {/* Item 3: Cora AI Assistant Badge */}
            <div className="cora-ai-badge rounded-[2rem] bg-gradient-to-r from-[#179572] via-[#2A867F] to-[#236594] bg-clip-padding p-[1px] cursor-pointer hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 sm:gap-2.5 px-5 py-2 sm:px-8 sm:py-3 min-w-fit rounded-[2rem] bg-black/40 backdrop-blur-xl shadow-sm">
                <div className="relative">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </div>
                <span className="text-white font-medium text-[clamp(12px,4vw,16px)] sm:text-base tracking-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  Try CORA AI
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}