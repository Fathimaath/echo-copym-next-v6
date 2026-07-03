"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import SectionContainer from '@/components/Layout/SectionContainer';
import SectionHeader from '@/components/Layout/SectionHeader';
import bigInvestmentAnimation from '@/../public/lotties/bigInvestment.json';
import tradeAnytimeAnimation from '@/../public/lotties/tradeanytime.json';
import exploreAnimation from '@/../public/lotties/explore.json';
import earnWithoutHassleAnimation from '@/../public/lotties/earnwithoutahassle.json';

const FeatureSection = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lottieRefs = useRef([]);
  const cardRefs = useRef([]);

  const setLottieRef = useCallback((index) => (el) => {
    lottieRefs.current[index] = el;
  }, []);

  const setCardRef = useCallback((index) => (el) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (event) => setPrefersReducedMotion(event.matches);
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          const lottie = lottieRefs.current[i];
          if (!lottie) return;
          if (entry.isIntersecting) {
            lottie.play();
          } else {
            lottie.pause();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(card);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [prefersReducedMotion]);

  const cards = [
    {
      animation: bigInvestmentAnimation,
      heading: 'Explore curated real-world assets',
      text: 'From property and gold to private credit and art, CORA AI helps you discover opportunities and summarize key risks – so you can decide faster.',
      reverse: false,
      delay: 0.1,
    },
    {
      animation: tradeAnytimeAnimation,
      heading: 'Access fractional RWAs',
      text: 'Start with smaller amounts and gain exposure to curated real-world assets – backed by transparent on-chain entitlements and built-in compliance.',
      reverse: true,
      delay: 0.2,
    },
    {
      animation: earnWithoutHassleAnimation,
      heading: 'Trade anytime, anywhere',
      text: 'Buy and sell eligible positions with streamlined settlement and a built-in wallet experience – designed for compliant access and smooth portfolio management.',
      reverse: false,
      delay: 0.3,
    },
    {
      animation: exploreAnimation,
      heading: 'Invest with clarity, not complexity',
      text: 'CORA AI helps you discover opportunities, summarize risks, and monitor positions – while compliance and onboarding are built into the platform.',
      reverse: true,
      delay: 0.4,
    },
  ];
  return (
    <SectionContainer padding="pt-12 pb-26 sm:py-20 md:py-24 lg:py-26 text-center" bgColor="bg-white" maxWidth="max-w-10xl">
      {/* Main Heading */}
      <SectionHeader
        title="EXPLORE → OWN → TRADE → EARN"
        highlightWords={['OWN', 'EARN']}
        alignment="center"
      />

      <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
        {cards.map((card, i) => (
          <motion.div
            key={card.heading}
            ref={setCardRef(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: card.delay }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${card.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:justify-center items-center gap-6 md:gap-10 lg:gap-16`}
          >
            <div className="w-full md:w-auto flex justify-center">
              <div
                className="w-[280px] sm:w-[220px] md:w-[360px] min-h-[180px] sm:min-h-[200px] md:h-[360px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
                style={{
                  boxShadow: '0px 4px 48.9px 0px rgba(189, 227, 213, 1)',
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, rgba(240,240,240,0.9), rgba(250,250,250,1))',
                }}
              >
                <Lottie
                  lottieRef={setLottieRef(i)}
                  animationData={card.animation}
                  loop={!prefersReducedMotion}
                  autoplay={!prefersReducedMotion}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="w-full md:w-auto lg:w-auto text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-1 sm:mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {card.heading}
              </h3>
              <p className="text-sm md:text-lg text-black leading-normal max-w-xl md:mx-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default FeatureSection;