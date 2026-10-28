"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function DownloadHero() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/Images/signup-hero6.avif)', backgroundPosition: 'right -80px top -30px', backgroundSize: 'auto 120%' }}
      />
      {/* Gradient overlay: dark on left, transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, black 0%, black 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.1) 88%, transparent 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[400px] sm:min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl text-left"
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            <span className="text-white block">Book a </span>
            <span className="text-[#10b981] block">Platform </span>
            <span className="text-white block">Demo</span>
          </h1>
          <p
            className="text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-lg"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Talk to our team about your asset, your investors and your timeline. See CopyM&apos;s tokenization infrastructure and white-label console in action.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
