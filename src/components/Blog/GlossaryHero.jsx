"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[500px] h-[60vh] sm:h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 [&>picture]:w-full [&>picture]:h-full [&>picture]:block">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Glossary Hero background"
          className="w-full h-full object-cover object-right sm:object-right scale-110 sm:scale-100 translate-y-12 sm:translate-y-0"
        />
      </div>

      {/* Dark Overlay - Gradually reducing from left to right */}
      <div className="absolute inset-0 z-1" style={{ background: 'linear-gradient(to right, black 0%, black 50%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)' }}></div>

      <div className="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-4xl w-full text-left mt-12 sm:mt-0"
        >
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 uppercase tracking-tight"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            <span className="text-white block mb-1">KNOWLEDGE </span>
            <span className="text-[#10b981] block">BASE </span>
            <span className="text-white block mt-1">TERMS & DEFINITIONS</span>
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-lg leading-relaxed"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            Your comprehensive reference for blockchain, tokenization, and digital asset terminology. From A to Z, master the language of Web3.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
