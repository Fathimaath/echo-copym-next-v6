"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
const ctavdo = '/Videos/ctavdos.mp4';

export default function CTASection() {
  const [shouldAutoplay, setShouldAutoplay] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateShouldAutoplay = () => {
      setShouldAutoplay(!mediaQuery.matches);
    };

    updateShouldAutoplay();
    mediaQuery.addEventListener('change', updateShouldAutoplay);

    return () => {
      mediaQuery.removeEventListener('change', updateShouldAutoplay);
    };
  }, []);
    return (
        <section className="relative w-full h-[40vh] sm:h-[45vh] lg:h-[80vh] overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay={shouldAutoplay}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/Videos/ctavdos-poster.webp"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="w-full h-full object-cover"
                >
                    <source src="/Videos/ctavdos-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
                    <source src={ctavdo} type="video/mp4" />
                </video>
                {/* Dark Overlay for better text legibility */}
                <div className="absolute inset-0 bg-black/40 z-[5]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight max-w-4xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        The Future of Real-World Assets Starts Here
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        A compliance-first platform for structuring, tokenization, and secure on-chain access across real-world asset markets.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white px-5 py-1.5 sm:px-8 sm:py-2.5 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 rounded-full group"
                    >
                        <span className="text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            Request Access
                        </span>
                        <ArrowUpRight className="text-lg sm:text-xl text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
