"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const ctavdo = '/Videos/ctavdos.mp4';

// Checklist Item 30: Closing blocks
// WHERE: Homepage — replace the “The Future of Real-World Assets Starts Here” band
// LICENCE STRIP: CopyM Limited is licensed by Masdar City Free Zone, Abu Dhabi (Licence No. MC 14225).
// CALL TO ACTION: Planning a tokenization project? / Talk to our team about your asset, your investors and your timeline. / Button: Book a demo → /signup/
// NOTE: Use the Masdar City logo only with permission.
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
    <div className="w-full flex flex-col">
      {/* Licence Strip */}
      <div className="w-full bg-[#0a110e] border-y border-[#15a36e]/20 py-3 sm:py-3.5 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2 sm:gap-2.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#15a36e] flex-shrink-0" />
          <p
            className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed tracking-wide"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            CopyM Limited is licensed by Masdar City Free Zone, Abu Dhabi (Licence No. MC 14225).
          </p>
        </div>
      </div>

      {/* Call to Action Band */}
      <section className="relative w-full min-h-[380px] sm:min-h-[420px] lg:h-[60vh] overflow-hidden bg-black flex items-center justify-center">
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
          <div className="absolute inset-0 bg-black/50 z-[5]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-12 sm:py-16 md:py-20 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-tight"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              Planning a tokenization project?
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto font-normal"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              Talk to our team about your asset, your investors and your timeline.
            </p>
            <Link
              href="/signup/"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-100 text-black px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl group cursor-pointer"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <span className="text-sm sm:text-base md:text-lg">
                Book a demo
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#15a36e] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
