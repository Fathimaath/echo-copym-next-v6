import React from 'react';
import { FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

function TradingMockup() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Top Buttons */}
      <div className="flex space-x-4 mb-16 z-10">
        <button className="flex items-center space-x-2 bg-white text-black font-semibold rounded-md px-5 py-2 shadow-md hover:shadow-lg transition-shadow">
          <span>Open Account</span>
          <FaExternalLinkAlt />
        </button>
        <button className="flex items-center space-x-2 bg-gray-900 text-white font-semibold rounded-md px-5 py-2 shadow-md hover:shadow-lg transition-shadow">
          <span>Download</span>
          <FaDownload />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative flex items-center justify-center w-full max-w-4xl">
        {/* Background Graph Line */}
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-0 w-full h-auto opacity-30 -translate-y-1/2 z-0"
        >
          <path
            d="M0 100 Q200 50 400 100 T800 100 T1200 100"
            stroke="#9CA3AF"
            strokeWidth="2"
            fill="none"
          />
          {/* Buy marker */}
          <circle cx="150" cy="100" r="4" fill="#9CA3AF" />
          {/* Sell marker */}
          <circle cx="1050" cy="100" r="4" fill="#9CA3AF" />
        </svg>

        {/* Buy label on background line */}
        <div className="absolute left-[12%] top-1/2 translate-y-4 text-gray-400 font-serif italic text-sm select-none z-0">
          Buy
        </div>

        {/* Sell label on background line */}
        <div className="absolute right-[12%] top-1/2 -translate-y-8 text-gray-400 font-serif italic text-sm select-none z-0">
          Sell
        </div>

        {/* Left Info Box */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-70 rounded-md px-4 py-3 shadow-lg z-10">
          <div className="text-gray-400 text-sm mb-1">Portfolio</div>
          <div className="text-green-500 font-mono font-semibold text-xs">+1.37%</div>
        </div>

        {/* Right Info Box */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-70 rounded-md px-4 py-3 shadow-lg text-right z-10">
          <div className="text-gray-400 text-sm mb-1">Profit</div>
          <div className="text-yellow-400 font-mono font-semibold text-xs">+69.90%</div>
        </div>

        {/* Phone Mockup Container - Tilted */}
        <div className="relative w-[280px] h-[560px] rounded-3xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-yellow-900/50 border border-gray-700 flex flex-col px-6 pt-12 pb-8 transform rotate-3 z-20" style={{ boxShadow: '0 0 40px rgba(255, 213, 79, 0.3)' }}>
          {/* Phone notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-7 bg-black rounded-full z-20 border border-gray-700"></div>

          {/* Apple Inc Header */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-white mb-1">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.365 1.43c-.68.82-1.42 2.02-1.24 3.2.13.8.83 1.7 1.5 2.25.9.75 2.1 1.3 3.3 1.1.1-.9.4-1.8.9-2.5-.9-.1-2.1-.6-3.4-2.05zM12.5 6.5c-3.3 0-6 2.7-6 6 0 3.3 2.7 6 6 6 3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-6z" />
              </svg>
              <div className="font-semibold text-white text-lg">Apple Inc</div>
            </div>
            <div className="text-gray-400 text-sm ml-7">AAPL</div>
          </div>

          {/* Graph Container */}
          <div className="relative flex-1 overflow-hidden">
            {/* Filled Graph with Gradient */}
            <svg
              viewBox="0 0 280 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full h-full"
            >
              <defs>
                <linearGradient id="graphFillGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#CDDC39" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Filled area under the curve */}
              <path
                d="M10 300 C40 250 80 350 120 320 C160 290 200 200 240 180 C280 160 270 100 270 80 L270 400 L10 400 Z"
                fill="url(#graphFillGradient)"
                filter="url(#glow)"
              />
              
              {/* Graph line */}
              <path
                d="M10 300 C40 250 80 350 120 320 C160 290 200 200 240 180 C280 160 270 100 270 80"
                stroke="#FFD54F"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* Price Display */}
            <div className="absolute bottom-8 left-4">
              <div className="text-white font-mono font-semibold text-2xl select-none mb-1">
                259.90
              </div>
              <div className="text-gray-400 font-mono text-xs select-none">
                24h High
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingMockup;
