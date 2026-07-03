"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// Removed invalid mp4 import that caused Vite error.

export default function Hero() {
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(true);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setVideoOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVideoOpen]);

  // Trap focus in modal and prevent body scroll only on desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isVideoOpen) {
      if (!isMobile) {
        document.body.style.overflow = 'hidden';
      }
      // Focus close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  return (
    <div className="relative">
      {/* ====== BACKGROUND VIDEO ====== */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <video
          autoPlay={shouldAutoplay}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/Images/heroimage.webp"
          className="w-full h-full object-cover"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            minHeight: '100vh',
            minHeight: '-webkit-fill-available',
            height: 'auto',
          }}
        >
          <source src="/assets/videos/hero-section-video-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/assets/videos/hero-section-video.webm" type="video/webm" />
          <source src="/assets/videos/hero-section-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ====== HERO CONTENT - CENTERED ====== */}
      <div className="relative z-10 w-full min-h-screen md:h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12"
        style={{ minHeight: '100vh', minHeight: '-webkit-fill-available' }}>
        <div className="max-w-4xl w-full text-center">
          {/* ====== HEADLINE ====== */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white mb-4 sm:mb-6 uppercase text-center"
            style={{
              fontFamily: 'Palanquin, sans-serif',
              lineHeight: '1.25',
              letterSpacing: '-0.01em'
            }}
          >
            Tokenize and access <span className="text-[#15a36e]">real-world assets</span> <br className="hidden md:block" /> <span className="text-[#15a36e]">with</span> built-in compliance
          </h1>

          {/* ====== DESCRIPTION ====== */}
          <p
            className="text-sm sm:text-base md:text-base lg:text-lg text-white mb-4 sm:mb-6 font-normal"
            style={{
              fontFamily: 'Palanquin, sans-serif',
              lineHeight: '1.625',
              opacity: 0.9
            }}
          >
            A compliant, AI-powered marketplace enabling on-chain entitlement to real estate, commodities, <br className="hidden md:block" />
            carbon credits, and alternative assets, and more.
          </p>

          <p
            className="text-center text-sm sm:text-base md:text-lg text-white mb-3 sm:mb-4 font-normal"
            style={{
              fontFamily: 'Palanquin, sans-serif',
              lineHeight: '1.5'
            }}
          >
            <span className="font-bold border-b border-[#15a36e]">ASSET OWNERS</span> – Launch RWAs, tokenized assets faster built-in compliance, on-chain entitlement, custody, and institutional-grade infrastructure.
          </p>

          {/* ====== FOR INVESTORS ====== */}
          <p
            className="text-center text-sm sm:text-base md:text-lg text-white mb-8 sm:mb-10 md:mb-12 font-normal"
            style={{
              fontFamily: 'Palanquin, sans-serif',
              lineHeight: '1.5'
            }}
          >
            <span className="font-bold border-b border-[#15a36e]">INVESTORS</span> – Own exclusive real-world assets with transparent entitlements, settlement, and Gas-free transactions.
          </p>

          {/* ====== BUTTONS (SIDE BY SIDE) ====== */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
            <a
              href="https://copymlaunchpad.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md w-auto sm:min-w-[200px]"
              style={{
                fontFamily: 'Palanquin, sans-serif',
                background: 'linear-gradient(to right, #23BD83, #109261)'
              }}
            >
              Explore the Platform
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center ml-1">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#109261]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </a>

          </div>
        </div>
      </div>


      {/* ====== VIDEO MODAL ====== */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded p-1 transition-all"
                aria-label="Close video modal"
              >
                <X size={32} />
              </button>
              <h2 id="video-modal-title" className="sr-only">How It Works Video</h2>
              <video
                controls
                autoPlay
                className="w-full h-full rounded-lg shadow-lg"
                onError={(e) => {
                  console.error('Video failed to load:', e);
                }}
              >
                <source src="/assets/videos/how-it-works.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
