import React from 'react';

const investorGroups = [
  { name: 'Institutional', value: 45, color: '#3B82F6' },
  { name: 'Retail', value: 30, color: '#10B981' },
  { name: 'Accredited', value: 25, color: '#F59E0B' }
];

export default function IssuerSection() {
  return (
    <section className="bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative w-fit mx-auto mb-4">
            <h2 className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight uppercase pb-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
              <span className="text-[#15a36e]">TOKENIZE</span> REAL ASSETS
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-sm font-normal text-black leading-relaxed max-w-4xl mx-auto text-justify md:text-center tracking-tighter" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif', hyphens: 'auto' }}>
            Digitizing real-world assets on the blockchain to unlock transparent entitlementent, automated settlement <br className="hidden md:block" /> and global access to institutional-grade asset opportunities.</p>
        </div>

        {/* Grid Layout - Same as WhoWeServe: lg:grid-cols-7 with 3 left, 4 right split */}
        <div className="grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-x-4 lg:gap-y-4">

          {/* Left Card - Full Height (3 columns, 2 rows) */}
          <div className="lg:col-span-3 lg:row-span-2 bg-black rounded-lg p-6 sm:p-8 flex flex-col justify-between">
            {/* Image at top */}
            <div className="flex justify-center mb-4 sm:mb-6 flex-1 items-center overflow-hidden">
              <img
                src="/assets/Images/3cubes.png"
                alt="Tokenization"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text at bottom */}
            <div className="text-center">
              <h3
                className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                We can Tokenize any assets
              </h3>
              <p
                className="text-white/80 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Transform any real-world asset into digital tokens with our secure blockchain platform
              </p>
            </div>
          </div>

          {/* Top Right Card (4 columns, 1 row) */}
          <div className="lg:col-span-4 lg:row-span-1 bg-black rounded-lg p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Image on top (mobile) / right (desktop) */}
            <div className="flex justify-center lg:justify-end items-center lg:order-2">
              <img
                src="/assets/Images/coin.png"
                alt="Token Management"
                className="w-32 sm:w-40 md:w-48 h-auto object-contain"
              />
            </div>

            {/* Text below (mobile) / left (desktop) */}
            <div className="flex-1 text-center lg:text-left lg:order-1">
              <h3
                className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                One simple token management interface
              </h3>

              {/* Payment fields */}
              <div className="space-y-3">
                <div
                  className="p-3 flex justify-between items-center relative"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.8)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(to right, #615b5bff, #615b5bff), linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <span className="text-white text-base font-medium">Payment Amount</span>
                  <span className="text-[#15a36e] font-bold text-base">123 USDC</span>
                </div>
                <div
                  className="p-3 flex justify-between items-center relative"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.8)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(to right, #615b5bff, #615b5bff), linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <span className="text-white text-base font-medium">Transfers</span>
                  <span className="text-[#15a36e] font-bold text-base">123 USDC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Card (4 columns, 1 row) */}
          <div className="lg:col-span-4 lg:row-span-1 bg-black rounded-lg p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Image on left */}
            <div className="flex justify-center lg:justify-start items-center flex-shrink-0">
              <img
                src="/assets/Images/globe.png"
                alt="Global Distribution"
                className="w-40 sm:w-48 md:w-56 h-auto object-contain"
              />
            </div>

            {/* Text on right */}
            <div className="flex-1 text-center lg:text-left">
              <h3
                className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-3"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                We can Tokenize any assets
              </h3>
              <p
                className="text-white/80 text-sm sm:text-base leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Transform any real-world asset into digital tokens with our secure blockchain platform
              </p>

              {/* Investor groups */}
              <div className="space-y-2 flex flex-col items-center lg:items-start">
                {investorGroups.map((group) => (
                  <div key={group.name} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-28 sm:w-32 flex-shrink-0">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: group.color }}
                      ></div>
                      <span className="text-white text-sm">{group.name}</span>
                    </div>
                    <span className="text-[#15a36e] font-semibold text-sm">{group.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}