"use client";
import React from 'react';
import { motion } from 'framer-motion';
import GroupedImages from '/assets/copym/png/Grouped-images.png';
import Image from '@/components/Image';

export default function PlatformFeatures() {
  return (
    <section className="relative bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase mb-3 sm:mb-4 md:mb-5" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            <span className="text-black">PLATFORM </span>
            <span className="text-[#15a36e]">FEATURES</span>
          </h2>
        </div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center items-center px-4"
        >
          <Image
            src={GroupedImages}
            alt="Platform Features"
            className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl h-auto object-contain transform scale-[1.15]"
          />
        </motion.div>
      </div>
    </section>
  );
}

