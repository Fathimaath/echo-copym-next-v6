import React from 'react';
import { FiZap } from 'react-icons/fi';

/**
 * FastFactBlock Component
 * Quick fact/highlight box
 */
export default function FastFactBlock({ title = "Fast Fact", children }) {
  return (
    <div className="my-8 bg-gradient-to-br from-[#15a36e]/10 to-white rounded-xl p-5 border border-[#15a36e]/20">
      <div className="flex items-center gap-2 mb-3">
        <FiZap className="w-5 h-5 text-[#15a36e]" />
        <h4 
          className="font-bold text-[#15a36e]"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {title}
        </h4>
      </div>
      <div 
        className="text-sm sm:text-base text-gray-800 leading-relaxed"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        {children}
      </div>
    </div>
  );
}
