import React from 'react';
const logoAndIcons = '/images/logoandicons.png';

export default function AuditSection() {
  return (
    <section className="relative w-full overflow-visible">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>

      <div className="relative z-10 py-6 sm:py-10 md:py-12 lg:py-14 pb-0 sm:pb-4 md:pb-6 lg:pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="flex justify-center mb-3 sm:mb-4">
              <h2 className="inline-flex items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="text-[#15a36e]">SECURE & </span>
                <span className="text-black">AUDITED</span>
              </h2>
            </div>
            <p className="text-sm text-black font-normal leading-relaxed tracking-wide mt-3 sm:mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Pre-audited smart contracts designed for secure, verifiable deployment across established blockchain networks

            </p>
          </div>
        </div>

        {/* Logo and Icons Image - Full Width */}
        <div className="w-full flex justify-center items-center py-0 sm:py-2 md:py-3 lg:py-4 overflow-hidden mt-4 sm:mt-6 md:mt-8">
          <img
            src={logoAndIcons}
            alt="Secure & Audited - Blockchain Networks"
            loading="lazy"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Legend */}
          <div className="flex justify-center items-center space-x-8 mt-0 sm:mt-12">
          </div>
        </div>
      </div>
    </section>
  );
}