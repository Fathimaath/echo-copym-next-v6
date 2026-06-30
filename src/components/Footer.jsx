"use client";
import React, { useState, useCallback } from 'react';
import { Twitter, Linkedin, Instagram, Github, Check, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from './Image';

const productLinks = ['Carbon Credits', 'Real Estate', 'Commodities', 'Stocks & ETFs', 'Others'];
const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/' },
  { label: 'Press', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
const supportLinks = [
  { label: 'Terms of Services', href: '/terms-of-services' },
  { label: 'Help Centre', href: '/' },
  { label: 'Security', href: '/' },
  { label: 'Press', href: '/' },
  { label: 'API', href: '/' },
];

function NavColumn({ title, links, isExternal }) {
  return (
    <div>
      <div className="relative w-fit mb-2 lg:mb-3">
        <h3 className="uppercase tracking-wide text-xs sm:text-xs lg:text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
          {title}
        </h3>
        <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
      </div>
      <ul className="space-y-1 lg:space-y-2">
        {links.map((item) => {
          const label = typeof item === 'string' ? item : item.label;
          const href = typeof item === 'string' && isExternal ? '/' : typeof item === 'string' ? '/' : item.href;
          const actualHref = typeof item === 'string' ? (title === 'PRODUCT' ? '/marketplace' : (title === 'COMPANY' && item === 'About' ? '/about' : item === 'Blog' ? '/blog' : item === 'Contact' ? '/contact' : '/')) : item.href;
          return (
            <li key={label}>
              <Link
                href={actualHref}
                className="text-white hover:text-[#15a36e] text-xs sm:text-sm lg:text-base transition-colors whitespace-nowrap lg:whitespace-normal" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please agree to the privacy policy.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      // Simulate API call — backend will be connected later
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setConsent(false);
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'newsletter_submit', email });
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }, [email, consent]);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
        {/* Single responsive layout — no desktop/mobile duplication */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_1.8fr] lg:gap-x-12">
          {/* Logo + Description + Social */}
          <div className="flex flex-col lg:col-span-1">
            <div className="flex items-center mb-0">
              <Image
                loading="lazy"
                src="/assets/copym/png/Copym-01-1.png"
                alt="COPYM"
                className="h-12 sm:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white text-sm sm:text-base lg:text-base leading-relaxed translate-x-1 -mt-2 mb-2.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Investing for outliers. Build wealth with
              our modern entitlement platform designed
              for the next generation.
            </p>
            <div className="flex gap-5 mt-2 ml-1 mb-6 lg:mb-0">
              <a href="https://twitter.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><Twitter size={20} /></a>
              <a href="https://linkedin.com/company/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><Linkedin size={20} /></a>
              <a href="https://instagram.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><Instagram size={20} /></a>
              <a href="https://github.com/copym" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#15a36e] transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Navigation links — 3 columns on all screens, fills cols 2-4 on desktop */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 lg:gap-0 lg:col-span-3 lg:mt-5">
            <NavColumn title="PRODUCT" links={productLinks} />
            <NavColumn title="COMPANY" links={companyLinks} />
            <NavColumn title="SUPPORT" links={supportLinks} />
          </div>

          {/* Newsletter — fills column 5 on desktop */}
          <div className="lg:col-span-1 mt-8 lg:mt-5">
            <div className="flex flex-col space-y-3">
              <div>
                <div className="relative w-fit mb-2 lg:mb-3">
                  <h3 className="uppercase tracking-wide text-sm sm:text-sm lg:text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    JOIN OUR NEWS LETTER
                  </h3>
                  <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                </div>
                <p className="mt-2 lg:mt-2.5 text-base text-white leading-relaxed lg:whitespace-nowrap" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  To know more subscribe to our newsletter
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2 w-full lg:max-w-[360px]" noValidate>
                {/* Honeypot field — hidden from humans, visible to bots */}
                <input
                  type="text"
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  aria-hidden="true"
                />
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your E-Mail Address"
                    disabled={status === 'loading'}
                    className="flex-1 h-full focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:ring-inset placeholder:text-gray-400 disabled:opacity-50"
                    style={{
                      paddingLeft: '16px',
                      paddingRight: '8px',
                      color: '#000000',
                      fontSize: '16px',
                      background: 'transparent',
                      fontFamily: 'Palanquin, sans-serif',
                      borderRadius: '20px 0 0 20px',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-full flex items-center justify-center hover:opacity-90 transition whitespace-nowrap px-3 sm:px-4 md:px-6 disabled:opacity-70"
                    style={{
                      background: '#15a36e',
                      color: '#ffffff',
                      fontFamily: 'Palanquin, sans-serif',
                      borderRadius: '0 20px 20px 0',
                      fontSize: '16px',
                    }}
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-xs sm:text-sm md:text-base font-semibold">Subscribe</span>
                    )}
                  </button>
                </div>

                {/* Consent checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === 'loading'}
                    className="mt-0.5 accent-[#15a36e]"
                  />
                  <span className="text-xs sm:text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    I agree to the{' '}
                    <Link href="/terms-of-services" className="text-[#15a36e] underline hover:no-underline">
                      Privacy Policy
                    </Link>
                    {' '}and consent to receive updates.
                  </span>
                </label>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-1.5 text-[#15a36e] text-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>You're subscribed! Thank you.</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-1.5 text-red-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </form>
            </div>
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