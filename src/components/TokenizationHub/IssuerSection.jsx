import React from 'react';
import Image from '@/components/Image';

export default function IssuerSection() {
  return (
    <section className="bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative w-fit mx-auto mb-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              One console for{' '}
              <span className="text-[#15a36e]">issuance, investors and compliance</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base md:text-lg font-normal text-neutral-600 leading-relaxed max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Configure tokens for different asset types and investor categories.
          </p>
        </div>

        {/* Admin Console Screenshot Mock Frame */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl sm:rounded-2xl border border-neutral-200/90 shadow-2xl overflow-hidden bg-neutral-900/5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(21,163,110,0.15)]">

            {/* Window Chrome / Browser Top Bar */}
            <div className="bg-[#0f172a] px-4 sm:px-6 py-3 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ef4444]/90 inline-block"></span>
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#f59e0b]/90 inline-block"></span>
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#10b981]/90 inline-block"></span>
                </div>
                <div className="hidden sm:flex items-center gap-2 ml-3 px-3 py-1 rounded-md bg-neutral-800/80 text-neutral-300 text-xs font-mono">
                  <span className="text-[#15a36e]">https://</span>issuer.copym.xyz/console
                </div>
              </div>

              {/* Pill Badge: Illustrative data */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800/90 border border-neutral-700/80 text-xs font-medium text-neutral-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15a36e]"></span>
                Illustrative data
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative bg-white">
              <Image
                src="/assets/Images/dashboard_screen.png"
                alt="CopyM Admin Console — One console for issuance, investors and compliance"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>

          {/* Subtext label */}
          <p
            className="text-center text-xs sm:text-sm text-neutral-500 mt-3 font-medium"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Illustrative data
          </p>
        </div>

      </div>
    </section>
  );
}