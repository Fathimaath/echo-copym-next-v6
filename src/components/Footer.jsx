"use client";
import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import Image from './Image'; // Import our new AVIF-compatible Image component

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
        {/* Desktop Layout (Large Screens) */}
        <div className="hidden lg:grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_1.8fr] gap-x-12 items-start">
          {/* Left Side - Logo, Description */}
          <div className="flex flex-col">
            <div className="flex items-center mb-0">
              <Image
                loading="lazy"
                src="/assets/copym/png/Copym-01-1.png"
                alt="COPYM"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white text-base leading-relaxed translate-x-1 -mt-2 mb-2.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Investing for outliers. Build wealth with<br />
              our modern entitlement platform designed<br />
              for the next generation.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-5 mt-2 ml-1">
              <a href="https://twitter.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaTwitter size={20} /></a>
              <a href="https://linkedin.com/company/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaLinkedin size={20} /></a>
              <a href="https://instagram.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaInstagram size={20} /></a>
              <a href="https://github.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col mt-5">
            <div className="relative w-fit mb-3">
              <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                PRODUCT
              </h3>
              <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
            </div>
            <ul className="space-y-2">
              {['Carbon Credits', 'Real Estate', "Commodities", 'Stocks & ETFs', 'Others'].map((item) => (
                <li key={item}>
                  <Link
                    href="/marketplace"
                    className="text-white hover:text-[#15a36e] text-base transition-colors" style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col mt-5">
            <div className="relative w-fit mb-3">
              <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                COMPANY
              </h3>
              <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
            </div>
            <ul className="space-y-2">
              {['About', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => {
                const href = item === 'About' ? '/about' : item === 'Blog' ? '/blog' : item === 'Contact' ? '/contact' : '/';
                return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-white hover:text-[#15a36e] text-base transition-colors" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item}
                  </Link>
                </li>
                );
              })}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col mt-5">
            <div className="relative w-fit mb-3">
              <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                SUPPORT
              </h3>
              <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
            </div>
            <ul className="space-y-2">
              {['Terms of Services', 'Help Centre', 'Security', 'Press', 'API'].map((item) => {
                const href = item === 'Terms of Services' ? '/terms-of-services' : '/';
                return (
                <li key={item}>
                    <Link
                      href={href}
                      className="text-white hover:text-[#15a36e] text-base transition-colors" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    >
                      {item}
                    </Link>
                </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter Section - Right side */}
          <div className="flex flex-col space-y-3 mt-5">
            <div>
              <div className="relative w-fit mb-3">
                <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  JOIN OUR NEWS LETTER
                </h3>
                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
              </div>
              <p className="mt-2.5 text-base text-white leading-relaxed whitespace-nowrap" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                To know more subscribe to our newsletter
              </p>
            </div>
            <form className="space-y-2">
              <div
                className="flex items-center overflow-hidden w-full max-w-[360px]"
                style={{
                  height: '36px',
                  background: '#ffffff',
                  borderRadius: '18px',
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your E-Mail Address"
                  className="flex-1 h-full focus:outline-none rounded-l-[18px] placeholder:text-gray-400"
                  style={{
                    paddingLeft: '12px',
                    paddingRight: '8px',
                    color: '#000000',
                    fontSize: '12px',
                    background: 'transparent',
                    fontFamily: 'Palanquin, sans-serif',
                  }}
                />
                <button
                  type="submit"
                  className="h-full flex items-center justify-center hover:opacity-90 transition rounded-r-[18px] whitespace-nowrap px-4 min-w-[100px]"
                  style={{
                    background: '#15a36e',
                    color: '#ffffff',
                    fontFamily: 'Palanquin, sans-serif',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Subscribe
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile & Tablet Layout (<Large Screens) */}
        <div className="lg:hidden space-y-1">
          {/* Logo and Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <Image
                loading="lazy"
                src="/assets/copym/png/Copym-01-1.png"
                alt="COPYM"
                className="h-12 sm:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white text-sm sm:text-base leading-relaxed mb-4" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Investing for outliers. Build wealth with
              our modern entitlement platform designed
              for the next generation.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-5 mb-6 ml-1">
              <a href="https://twitter.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaTwitter size={20} /></a>
              <a href="https://linkedin.com/company/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaLinkedin size={20} /></a>
              <a href="https://instagram.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaInstagram size={20} /></a>
              <a href="https://github.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>

          {/* Navigation Links - 3 columns */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {/* Product Links */}
            <div>
              <div className="relative w-fit mb-2">
                <h3 className="uppercase tracking-wide text-xs sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  PRODUCT
                </h3>
                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
              </div>
              <ul className="space-y-1">
                {['Carbon Credits', 'Real Estate', "Commodities", 'Stocks & ETFs', 'Others'].map((item) => (
                  <li key={item}>
                    <Link
                      href="/marketplace"
                      className="text-white hover:text-[#15a36e] text-xs sm:text-sm transition-colors whitespace-nowrap" style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <div className="relative w-fit mb-2">
                <h3 className="uppercase tracking-wide text-xs sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  COMPANY
                </h3>
                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
              </div>
              <ul className="space-y-1">
                {['About', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => {
                  const href = item === 'About' ? '/about' : item === 'Blog' ? '/blog' : item === 'Contact' ? '/contact' : '/';
                  return (
                  <li key={item}>
                    <Link
                      href={href}
                      className="text-white hover:text-[#15a36e] text-xs sm:text-sm transition-colors whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    >
                      {item}
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <div className="relative w-fit mb-2">
                <h3 className="uppercase tracking-wide text-xs sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  SUPPORT
                </h3>
                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
              </div>
              <ul className="space-y-1">
                {['Terms of Services', 'Help Centre', 'Security', 'Press', 'API'].map((item) => {
                  const href = item === 'Terms of Services' ? '/terms-of-services' : '/';
                  return (
                  <li key={item}>
                      <Link
                        href={href}
                        className="text-white hover:text-[#15a36e] text-xs sm:text-sm transition-colors whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                      >
                        {item}
                      </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>


        {/* Newsletter Section - Mobile & Tablet only */}
        <div className="lg:hidden mt-8">
          <div className="flex flex-col space-y-3">
            <div>
              <div className="relative w-fit mb-2">
                <h3 className="uppercase tracking-wide text-sm sm:text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  JOIN OUR NEWS LETTER
                </h3>
                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
              </div>
              <p className="mt-2 text-base text-white leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                To know more subscribe to our newsletter
              </p>
            </div>
            <form className="space-y-2 w-full">
              <div
                className="flex items-center overflow-hidden w-full"
                style={{
                  height: '40px',
                  background: '#ffffff',
                  borderRadius: '20px',
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your E-Mail Address"
                  className="flex-1 h-full focus:outline-none rounded-l-[20px] placeholder:text-gray-400"
                  style={{
                    paddingLeft: '16px',
                    paddingRight: '8px',
                    color: '#000000',
                    fontSize: '16px',
                    background: 'transparent',
                    fontFamily: 'Palanquin, sans-serif',
                  }}
                />
                <button
                  type="submit"
                  className="h-full flex items-center justify-center hover:opacity-90 transition rounded-r-[20px] whitespace-nowrap px-3 sm:px-4 md:px-6"
                  style={{
                    background: '#15a36e',
                    color: '#ffffff',
                    fontFamily: 'Palanquin, sans-serif',
                  }}
                >
                  <span
                    className="text-xs sm:text-sm md:text-base font-semibold"
                  >
                    Subscribe
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright and Disclaimer Section */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col items-start justify-start space-y-6">
          <p className="text-gray-400 text-sm sm:text-base text-left" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            &copy; 2026 COPYM. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs sm:text-xs text-left max-w-5xl leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
            Copym is not a registered broker-dealer, funding portal, underwriter, entitlement bank, entitlement adviser, or entitlement manager. Copym does not provide brokerage services, entitlement banking services, underwriting services, entitlement recommendations, or entitlement advice to any person. Copym does not participate in the negotiation or execution of secondary market transactions for the purchase or sale of securities. Copym does not, at any time, have possession or control of investor funds or securities in connection with such transactions. Copym operates as a technology platform focused on distributed ledger technology to improve efficiency, accessibility, and transparency in financial technologies and T & C apply.
          </p>
        </div>

      </div>

      {/* Right Side Ellipse Gradient - Absolute positioned */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Zoomed in from right bottom */}
        <div className="absolute right-0 bottom-0 w-[120%] sm:w-[90%] md:w-[80%] lg:w-[50%] translate-x-[20%] translate-y-[20%] opacity-80 md:opacity-90 origin-bottom-right transform scale-150">
          <Image
            src="/assets/Images/icons/Ellipse.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

    </footer >
  );
}