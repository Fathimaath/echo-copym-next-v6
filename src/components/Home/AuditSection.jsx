import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from '../Image';
const logoAndIcons = '/images/logoandicons.png';

// Checklist Item 28: Security block
// WHERE: Homepage — “SECURE & AUDITED”
// GRAPHICS: Make the graphic block more compact and thinner
// LINK: Security & compliance → /security-compliance/ (once the page is live)
export default function AuditSection() {
  return (
    <section className="relative w-full overflow-visible">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-visible pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-10 pb-2 sm:pb-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-5 md:mb-6">
            <div className="flex justify-center mb-2 sm:mb-3">
              <h2 className="inline-flex items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="text-[#15a36e]">SECURE & </span>
                <span className="text-black">AUDITED</span>
              </h2>
            </div>
            <p className="text-sm text-black font-normal leading-relaxed tracking-wide mt-2 sm:mt-3 max-w-2xl mx-auto" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Pre-audited smart contracts designed for secure, verifiable deployment across established blockchain networks
            </p>

            {/* Checklist Item 28: Security & compliance link */}
            <div className="mt-3 sm:mt-4 flex justify-center">
              <Link
                href="/security-compliance/"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15a36e] hover:text-[#109261] transition-all"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                <span>Security & compliance</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Logo and Icons Image - Compact and Thinner Graphic Block */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 flex justify-center items-center py-0 sm:py-1 overflow-hidden mt-2 sm:mt-3">
          <Link
            href="/security-compliance/"
            className="block w-full cursor-pointer hover:opacity-95 transition-opacity"
            aria-label="Security and compliance blockchain networks"
          >
            <Image
              src={logoAndIcons}
              alt="Secure & Audited - Blockchain Networks"
              className="w-full h-auto max-h-[140px] sm:max-h-[175px] md:max-h-[200px] lg:max-h-[220px] object-contain mx-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
