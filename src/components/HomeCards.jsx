import React from 'react';
import { GiArrowDunk } from 'react-icons/gi';
import Image from './Image'; // Import our AVIF-compatible Image component

// Image-based 3D-style icons from public assets
const PuzzleIcon = () => (
  <div className="text-center">
    <Image
      src="/assets/Images/icons/cs1.png"
      alt="Puzzle icon"
      className="w-40 -pt-6 h-21 drop-shadow-lg filter brightness-125 contrast-125 "
    />
  </div>
);

const House3DIcon = () => (
  <div className="text-center">
    <Image
      src="/assets/Images/icons/cs2.png"
      alt="3D house icon"
      className="w-40 -pt-6 h-21 drop-shadow-lg filter brightness-125 contrast-125"
    />
  </div>
);

const WorldwideIcon = () => (
  <div className="text-center">
    <Image
      src="/assets/Images/icons/cs3.png"
      alt="Worldwide icon"
      className="w-40 -pt-6 h-21 drop-shadow-lg filter brightness-125 contrast-125"
    />
  </div>
);

const GrowthChartIcon = () => (
  <div className="text-center">
    <Image
      src="/assets/Images/icons/cs4.png"
      alt="Growth chart icon"
      className="w-40 -pt-6 h-22 drop-shadow-lg filter brightness-125 contrast-125"
    />
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, ctaText, color }) => {
  return (
    <div className="text-center group flex flex-col items-center justify-start h-full">
      <div className="mb-8 flex justify-center items-center min-h-[5rem]">
        <Icon />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 leading-tight max-w-xs mx-auto">{title}</h3>
      <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs mx-auto">{description}</p>
      <button className="inline-flex items-center justify-center text-white font-semibold text-sm hover:text-white/80 transition-colors duration-200 mt-auto">
      
      </button>
    </div>
  );
};

export default function CurvedSectionDivider() {
  return (
    <section className="relative">
      {/* Main Content */}
      <div className="relative z-10 bg-gradient-to-br from-emerald-600 to-emerald-700 backdrop-blur-sm rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[4rem] rounded-b-[2rem] sm:rounded-b-[3rem] lg:rounded-b-[4rem] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-32 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 anton-regular leading-tight">
              <span className="text-white">Own. Earn. </span>
              <span className="text-black">Explore. Trade.</span>
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">
            <FeatureCard
              icon={PuzzleIcon}
              title="Own a Piece of Big Investments"
              description="Ever thought real estate, gold, or fine art was only for the rich? Not anymore. Start with small amounts and own a piece of high-value assets you actually care about."
              
              color="from-pink-500 to-teal-500"
            />
           
            <FeatureCard
              icon={WorldwideIcon}
              title="Explore a World of Assets"
              description="From property and gold to private equity and art—our AI picks out smart opportunities so you don't have to dig through endless research."
              
              color="from-pink-500 via-blue-500 to-green-500"
            />
            <FeatureCard
              icon={GrowthChartIcon}
              title="Trade Anytime, Anywhere"
              description="Want out? Sell instantly. Want in? Buy in seconds. With your built-in wallet, you can manage and trade smoothly—just like sending money to a friend."
              
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}