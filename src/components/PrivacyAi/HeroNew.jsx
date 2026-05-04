"use client";
import React from 'react';
import { motion } from 'framer-motion';
const privacyaiHero = '/images/privacyaihero.png';

export default function HeroNew() {
  return (
    <section className="relative overflow-hidden min-h-[500px] h-[60vh] sm:h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={privacyaiHero}
          alt="Privacy AI Hero background"
          className="w-full h-full object-cover scale-[1.05] sm:scale-100 translate-x-0"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Hero Content - Center aligned vertically */}
      <div className="relative z-10 w-full h-full flex items-center justify-start pt-32 sm:pt-0 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-2xl w-full text-left"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 uppercase tracking-tight">
            <span className="text-[#10b981] block">PRIVACY <span className="text-white">AI</span></span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-lg leading-relaxed">
            Privacy AI is CopyM's intelligent privacy layer. It protects sensitive asset, user and transaction data while enabling compliant tokenization on public and hybrid blockchains.
          </p>
        </motion.div>
      </div>
    </section>
  );
}