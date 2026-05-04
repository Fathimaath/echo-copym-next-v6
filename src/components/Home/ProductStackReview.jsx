"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import productStackAnimation from '@/../public/lotties/prodctstackreview.json';

const ProductStackReview = () => {
  const headingRef = useRef(null);
  const lottieRef = useRef(null);
  const [headingLeft, setHeadingLeft] = useState(0);
  const [containerLeft, setContainerLeft] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.4);
    }
  }, []);

  return (
    <section className="relative w-full bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10"
        >
          <div className="relative w-fit mx-auto" ref={headingRef}>
            <h2 className="inline-flex items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-black">BUILT FOR</span>
              <span className="text-[#15a36e]">REAL-WORLD ASSETS</span>
            </h2>
          </div>
          <p className="text-sm text-black font-normal leading-relaxed tracking-wide mt-3 sm:mt-4" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            Infrastructure designed for compliant issuance, access, and lifecycle management.
          </p>
        </motion.div>
        {/* Lottie Animation */}
        <div className="w-full flex justify-center items-center overflow-visible">
          <div
            className="w-[125%] sm:w-[85%] relative"
            style={{
              transformOrigin: 'left center',
              marginTop: isDesktop ? '-20px' : '0px',
              marginLeft: isDesktop ? '-30px' : '0px',
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={productStackAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductStackReview;
