"use client";
import React from "react";
import { GiRoundStar } from "react-icons/gi";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from '@/components/Image'; // Import our AVIF-compatible Image component
const bitcoinflyImage = '/images/bitcoinfly.png';

// 3D Phone Component
const Phone3D = ({ image, rotation = "", additionalTransform = "", phoneColor = "blue" }) => {
  const colorStyles = {
    blue: {
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)',
      glowColor: 'via-blue-300'
    },

  };

  const currentColor = colorStyles[phoneColor];

  return (
    <div
      className={`relative w-[180px] h-[380px] md:w-[240px] md:h-[500px] transition-all duration-700 hover:scale-105 ${rotation}`}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Phone Container */}
      {/* Phone Screen */}
      <div className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] p-1">
        <div className="w-full h-full rounded-[1.3rem] md:rounded-[2.3rem] overflow-hidden">
          <Image
            src={image}
            alt="App Interface"
            className="w-full h-full object-cover rounded-[2.3rem]"
          />
        </div>
      </div>
      {/* Phone Reflection/Glow Effect */}
    </div>
  );
};

// Features Grid Component
const FeaturesGrid = () => {
  const features = [
    {
      title: "Decentralized Investments",
      description: "Invest in real-world assets like luxury real estate and art via blockchain.",
      stats: "10+ Active"
    },
    {
      title: "Real-Time Portfolio Tracking",
      description: "Monitor your investments with live price updates and performance analytics.",
      stats: "Real Time"
    },
    {
      title: "AI-Powered Recommendations",
      description: "Get personalized entitlement suggestions based on your goals and risk profile.",
      stats: "100% Compliant"
    },
    {
      title: "Secure Wallet Integration",
      description: "Seamlessly connect your wallet for fast, secure transactions.",
      stats: "24/7 Support"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {features.map((feature, index) => {
        const headerHeight = '48px';
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
              borderBottom: '2px solid #7DD1B2'
            }}>
              <h3 className="dm-sans" style={{
                fontSize: 'clamp(14px, 2vw, 18px)',
                fontWeight: 600,
                textAlign: 'center',
                color: '#000',
                margin: '0'
              }}>{feature.title}</h3>
            </div>

            {/* Grey Content Area */}
            <div style={{
              padding: '12px 16px',
              background: '#f0f5f3',
              position: 'relative'
            }}
              className="sm:p-[15px_20px]"
            >
              <p className="dm-sans" style={{
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                textAlign: 'left',
                color: '#000',
                lineHeight: '1.4',
                margin: '0 0 20px 0'
              }}>
                {feature.description}
              </p>



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
  );
};

// Store Download Button Component
const StoreDownloadButton = ({ store, rating, downloads, qrCode, logo, bgColor, textColor, position }) => {
  const getStoreIcon = () => {
    if (store === "Google Play") {
      return <Image src="/assets/Images/android.png" alt="Android" className="w-4 h-4" />;
    } else if (store === "App Store") {
      return <Image src="/assets/Images/apple-black-logo.png" alt="Apple" className="w-4 h-4" />;
    }
    return <div className="w-4 h-4 bg-gray-800 rounded"></div>;
  };

  return (
    <motion.div
      className={`flex flex-col items-center ${position === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`}
      initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* QR Code */}
      <div className="mb-1 p-1 bg-white rounded-md shadow-sm">
        <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
          <QrCodeIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Store Button */}
      <div className={`${bgColor} ${textColor} rounded-full p-1.5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
        <div className="flex items-center space-x-1.5">
          {/* Store Logo */}
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            {getStoreIcon()}
          </div>

          {/* Store Info */}
          <div className="flex flex-col">
            <span className="text-xs opacity-80">Download on</span>
            <span className="font-semibold text-xs">{store}</span>
          </div>

          <span className="text-xs">→</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-1 flex items-center space-x-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <GiRoundStar key={i} className={`w-2.5 h-2.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-600 ml-1">{rating}.0</span>
      </div>

      {/* Downloads */}
      <span className="text-xs text-gray-500">{downloads}</span>
    </motion.div>
  );
};

export default function AppPeekSection() {
  return (
    <section className="relative bg-white pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      {/* Main Content with Curved Background - HomePage Style */}


      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6 dm-sans px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#15a36e]">PEEK INTO OUR </span>
            <span className="text-black">WEB3 </span>
            <span className="text-[#15a36e]">INVESTMENT HUB</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience our platform's features through an immersive journey
          </motion.p>
        </div>

        {/* Two Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-8">

          {/* Left Grid - Phone Mockup */}
          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="flex justify-center items-center relative mb-6">
              {/* Bitcoin Fly Background */}
              <div
                className="absolute inset-0 flex justify-center items-center z-10"
                style={{
                  width: '150%',
                  height: '150%',
                  left: '-40%',
                  top: '-25%',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }}
              >
                <Image
                  src={bitcoinflyImage}
                  alt="Background"
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'none',

                    mixBlendMode: 'normal'
                  }}
                />
              </div>

              {/* Phone Image Only */}
              <div className="flex justify-center items-center relative z-20">
                <div className="relative rounded-[2.3rem] p-0.5">
                  <Image
                    src="/assets/Images/mobile-ads.png"
                    alt="App Interface"
                    className="w-[150px] h-[320px] sm:w-[180px] sm:h-[380px] md:w-[240px] md:h-[500px] object-cover rounded-[2.3rem] block"
                    style={{
                      filter: 'none',
                      opacity: 4,
                      mixBlendMode: 'normal',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </div>
            </div>


          </div>

          {/* Right Grid - Features */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 3, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8 text-center lg:text-left"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 sm:mb-4 dm-sans">
                <span className="text-[#15a36e]">Powerful </span>
                <span className="text-black">Features</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                Everything you need for modern entitlement management
              </p>
            </motion.div>

            <FeaturesGrid />
          </div>
        </div>
      </div>

    </section>
  );
}