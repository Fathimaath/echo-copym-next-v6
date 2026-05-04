"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import Image from '@/components/Image';
const hsbcLogo = '/icons/Tokenization/logo-hsbc-red.avif';
const bnyLogo = '/icons/Tokenization/bnymellon.avif';

const insights = [
  {
    quote: "Tokenization is a key enabler for the future of digital capital markets, improving efficiency, transparency, and access.",
    name: "Sergio Ermotti",
    title: "CEO of UBS",

    logo: "/assets/svg/UBS_Logo_Semibold.svg",
  },
  {
    quote: "Tokenization has the potential to redefine how assets are issued, traded, and managed globally.",
    name: "Noel Quinn",
    title: "CEO of HSBC",

    logo: hsbcLogo,
  },
  {
    quote: "Digital assets and tokenization are becoming integral to the evolution of financial market infrastructure.",
    name: "Robin Vince",
    title: "CEO of BNY Mellon",
    logo: bnyLogo,
  },
  {
    quote: "Tokenization and blockchain technology are reshaping how value is represented and exchanged in the digital economy.",
    name: "Alfred Kelly",
    title: "Former CEO of Visa",
    company: "Visa",
    logo: "/assets/Images/mastercard.avif",
  },
  {
    quote: "The future of commerce will be powered by tokenized assets, real-time settlement, and programmable money.",
    name: "Michael Miebach",
    title: "CEO of Mastercard",
    logo: "/assets/Images/mastercard.avif",
  },
  {
    quote: "Tokenization will play a central role in how financial products are structured and distributed in the future.",
    name: "Abigail Johnson",
    title: "CEO of Fidelity Investments",
    logo: "/assets/Images/fidelity_logo_PNG1.avif",
  },
  {
    quote: "Blockchain-based tokenization represents a structural shift in the financial system rather than a passing trend.",
    name: "James Gorman",
    title: "Former CEO of Morgan Stanley",
    logo: "/assets/Images/Morgan_Stanley_(3).avif",
  },

  {
    quote: "Blockchain and tokenization are transforming how capital markets operate at a fundamental level.",
    name: "Ana Botín",
    title: "Executive Chair of Santander",
    logo: "/assets/Images/Santander_logo_PNG3.avif",
  },


];

function InsightCard({ insight }) {
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col gap-3 p-4 w-[300px] sm:w-[350px] md:w-[400px]"
    >
      {/* Brand Header - Priority to Logo */}
      <div className="flex items-center justify-start h-12 mb-2">
        {insight.logo ? (
          <div className={`${insight.name === "Alfred Kelly" || insight.title.includes("BNY Mellon") ? "w-48 h-14" : "w-24 h-8"} flex items-center justify-start`}>
            <Image
              src={insight.logo}
              alt={`${insight.company} logo`}
              className="w-full h-full object-contain object-left"
            />
          </div>
        ) : (
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            {insight.company}
          </h3>
        )}
      </div>

      {/* Quote - Smaller, refined typography */}
      <p className="text-base sm:text-lg text-[#222] leading-relaxed font-medium" style={{ fontFamily: 'Palanquin, sans-serif' }}>
        “{insight.quote}”
      </p>

      {/* Author Info - Smaller, compact */}
      <div className="pt-2 mt-auto">
        <p className="text-sm font-bold text-black" style={{ fontFamily: 'Palanquin, sans-serif' }}>
          {insight.name}
        </p>
        <p className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Palanquin, sans-serif' }}>
          {insight.title}
        </p>
      </div>
    </motion.div>
  );
}

/** Infinite scrolling row component */
function InfiniteScrollingRow({ items, duration = 60 }) {
  // Triple the items for seamless scroll
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-8 md:gap-12 px-6"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: duration,
        }}
      >
        {duplicatedItems.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative pt-8 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 mb-2">
        {/* Main Title */}
        <div className="text-center mb-6">
          <div className="relative w-fit mx-auto mb-3 sm:mb-4">
            <h2 className="inline-flex items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-[#15a36e] uppercase">INDUSTRY </span><span className="text-black">PERSPECTIVES</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 hidden md:block"></div>

        <InfiniteScrollingRow items={insights} duration={20} />
      </div>
    </section>
  );
}