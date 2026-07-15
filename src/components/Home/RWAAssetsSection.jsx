"use client";
import React, { useState, useRef } from 'react';
import Link from "next/link";
import Image from '@/components/Image'; // Import our AVIF-compatible Image component
const maskcard1 = '/images/Maskcard1.avif';
const maskcard2 = '/images/Maskcard2.avif';
const maskcard3 = '/images/Maskcard3.avif';
const maskcard4 = '/images/Maskcard4.avif';
import SectionContainer from '@/components/Layout/SectionContainer';
import SectionHeader from '@/components/Layout/SectionHeader';


const TokenizeAssetsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.55;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };


  const assets = [
    {
      id: 1,
      title: "Gold & Metals",
      description: "Tokenized exposure to gold and precious metals, with transparent pricing and secure custody.",
      image: maskcard1,
      roi: "82%"
    },
    {
      id: 2,
      title: "Fine Art",
      description: "Fractional access to curated fine art, structured for long-term value and verified provenance.",
      image: maskcard2,
      roi: "68%"
    },
    {
      id: 3,
      title: "Carbon Credits",
      description: "Digitized carbon instruments backed by verified registries—built for traceability and impact reporting.",
      image: maskcard3,
      roi: "91%"
    },
    {
      id: 4,
      title: "Real Estate",
      description: "Digitized real estate offerings with fractional ownership, governance, and distribution readiness.",
      image: maskcard4,
      roi: "76%"
    }
  ];

  return (
    <SectionContainer padding="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
      <SectionHeader
        title="EXPLORE TOKENIZED ASSET CLASSES"
        subtitle={
          <span className="max-w-3xl mx-auto block">
            Gold, real estate, carbon credits, and more—structured into investable digital products.
          </span>
        }
        highlightWords={["EXPLORE", "TOKENIZED"]}
      />

      {/* Assets Grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 gap-4 lg:gap-6 w-full -mx-6 px-6 pb-8 lg:mx-0 lg:px-0 lg:pb-0"
      >
        {assets?.map((asset, index) => {
          return (
            <div
              key={asset?.id}
              className="relative w-full h-full min-w-[50vw] sm:min-w-[45vw] lg:min-w-0 snap-center"
            >
              {/* Asset Card */}
              <div
                className="rounded-lg p-3 sm:p-4 lg:p-5 flex flex-col h-full min-h-[350px] sm:min-h-[420px] lg:min-h-[480px] relative shadow-sm border border-black/[0.03]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(251, 251, 251, 1), rgba(240, 240, 240, 1))'
                }}
              >
                {/* Floating ROI/APR Badge - Top Right */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  {/* ROI Badge */}
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#dcfce7] border border-[#bbf7d0]/50 shadow-sm">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2L10.5 9.5H1.5L6 2Z" fill="#15a36e" />
                    </svg>
                    <span className="text-xs sm:text-sm font-bold text-[#15a36e]" style={{ fontFamily: 'Palanquin, sans-serif' }}>{asset?.roi}</span>

                  </div>


                </div>

                {/* Asset Image - Top, Centered - Fixed Height */}
                <div className="flex items-center justify-center mt-4 sm:mt-10 lg:mt-12 mb-6 sm:mb-4 lg:mb-5 h-[100px] sm:h-[140px] md:h-[160px] lg:h-[180px]">
                  <Image
                    src={asset?.image}
                    alt={asset?.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Asset Info - Below Image */}
                <div className="flex flex-col flex-grow text-center sm:text-left space-y-1.5">
                  {/* Title - Fixed Height */}
                  <h3
                    className="text-lg sm:text-2xl lg:text-[23px] font-bold text-black min-h-[48px] sm:min-h-[56px] lg:min-h-[64px] flex items-center"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {asset?.title}
                  </h3>

                  {/* Description - Fixed Height */}
                  <p
                    className="text-[12px] sm:text-sm text-black leading-snug flex-grow text-left"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    {asset?.description}
                  </p>

                  {/* Know More Button - Filled Design */}
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <Link href="/marketplace" className="group inline-flex items-center justify-between min-w-[90px] sm:min-w-[130px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#15a36e] rounded-full p-1 transition-all duration-300 w-fit cursor-pointer">
                       <span className="pl-2.5 pr-1 text-white font-semibold text-xs sm:text-xs" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                         Learn More
                       </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center transition-all duration-300">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15a36e]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots - Mobile Only */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        {assets.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#15a36e] w-4' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default TokenizeAssetsSection;
