"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
  highlightWords = [],
  underline = true,
  alignment = 'center',
  className = ''
}) => {
  const getTitleWithHighlights = (title) => {
    if (!highlightWords || highlightWords.length === 0) {
      return title;
    }

    const words = title.split(/(\s+)/);
    return words.map((word, index) => {
      // Strip punctuation for matching (e.g., "EARN," becomes "EARN")
      const cleanWord = word.trim().replace(/[.,!?;:]/g, "").toUpperCase();

      if (cleanWord === ">>") {
        return (
          <span key={index} className="self-center text-[0.6em]">
            {word}
          </span>
        );
      }

      if (highlightWords.includes(cleanWord)) {
        return (
          <span key={index} className="text-[#15a36e]">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`
        ${alignment === 'center' ? 'text-center' : 'text-left'}
        mb-8 sm:mb-10 md:mb-12
        ${className}
        md:scroll-smooth
      `}
    >
      <div className={`relative w-fit ${alignment === 'center' ? 'mx-auto' : ''}`}>
        <h2
          className={`text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1 text-black ${alignment === 'center' ? 'text-center' : ''}`}
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {getTitleWithHighlights(title)}
        </h2>
      </div>
      {subtitle && (
        <p className={`text-sm ${alignment === 'center' ? 'text-center' : 'text-left'} text-black font-normal leading-relaxed tracking-wide mt-3 sm:mt-4`} style={{ fontFamily: 'Palanquin, sans-serif' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;