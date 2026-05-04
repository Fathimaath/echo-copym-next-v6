"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[500px] h-[60vh] sm:h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/Images/heroblog5.png"
          alt="Blog hero background"
          className="w-full h-full object-cover object-right"
        />
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-2xl w-full text-left"
        >
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-none mb-4 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            <span className="text-white block">INSIGHTS </span>
            <span className="text-[#10b981] block">& UPDATES </span>
            <span className="text-white block">ON RWA TOKENIZATION</span>
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-lg leading-snug"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Explore product updates, market commentary, and educational insights on real-world asset tokenization and digital asset infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
