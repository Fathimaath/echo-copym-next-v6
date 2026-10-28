"use client";
import React, { useState, useCallback } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { FaXTwitter, FaLinkedin, FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa6';
import Link from 'next/link';
import Image from './Image';

// Checklist Item 23: Social media links
const SOCIAL_LINKS = [
  {
    name: 'X',
    label: 'CopyM on X',
    href: 'https://x.com/CopyM_RWA',
    icon: FaXTwitter,
  },
  {
    name: 'LinkedIn',
    label: 'CopyM on LinkedIn',
    href: 'https://linkedin.com/company/copym',
    icon: FaLinkedin,
  },
  {
    name: 'Instagram',
    label: 'CopyM on Instagram',
    href: 'https://www.instagram.com/copym.xyz',
    icon: FaInstagram,
  },
  {
    name: 'Telegram',
    label: 'CopyM on Telegram',
    href: 'https://t.me/copym_rwa',
    icon: FaTelegram,
  },
  {
    name: 'Facebook',
    label: 'CopyM on Facebook',
    href: 'https://www.facebook.com/copym.xyz/',
    icon: FaFacebook,
  },
];

// Checklist Item 22: Four-column navigation structure
const FOOTER_COLUMNS = [
  {
    title: 'PLATFORM',
    links: [
      { label: 'Platform overview', href: '/tokenization/' },
      { label: 'White-label platform', href: '/white-label/' },
      { label: 'Security & compliance', href: '/security-compliance/' },
      { label: 'Marketplace module', href: '/marketplace/' },
    ],
  },
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'Real estate', href: '/solutions/real-estate/' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Glossary', href: '/glossary/' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Terms of Service', href: '/terms-of-services/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
    ],
  },
];

function NavColumn({ title, links }) {
  return (
    <div>
      <div className="relative w-fit mb-3">
        <h3
          className="uppercase tracking-wider text-xs lg:text-sm text-[#15a36e] font-semibold pb-1"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {title}
        </h3>
        <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }} />
      </div>
      <ul className="space-y-1.5 lg:space-y-2">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-gray-300 hover:text-[#15a36e] text-xs sm:text-sm transition-colors block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e] rounded"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'http://localhost/copym-blog-api/api';

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
      const res = await fetch(`${API_URL}/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true, source: 'footer' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
      setStatus('success');
      setSuccessMsg(data.message || 'Subscribed successfully!');
      setEmail('');
      setConsent(false);
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'newsletter_submit', email });
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }, [email, consent, API_URL]);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-10 sm:pt-12 md:pt-16 pb-8">
        {/* Main Grid: Brand info, 4 Nav Columns, Newsletter */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_2fr_1.4fr] lg:gap-x-12 xl:gap-x-16">
          {/* Column 1: Logo + Description + Social Links */}
          <div className="flex flex-col mb-8 lg:mb-0">
            <Link
              href="/"
              className="inline-block mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e] rounded"
            >
              <Image
                loading="lazy"
                src="/assets/copym/png/Copym-01-1.png"
                alt="CopyM Logo"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p
              className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 max-w-sm"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              Investing for outliers. Build wealth with our modern ownership platform designed for the next generation.
            </p>
            {/* Social Icons matching Item 23 */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {SOCIAL_LINKS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="p-2 text-gray-300 hover:text-[#15a36e] transition-colors rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e]"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columns 2-5: The 4 Navigation Columns (Platform, Resources, Company, Legal) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 xl:gap-8 mb-8 lg:mb-0 lg:pt-1">
            {FOOTER_COLUMNS.map((col) => (
              <NavColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="mt-4 lg:mt-1">
            <div className="flex flex-col space-y-3">
              <div>
                <div className="relative w-fit mb-2 lg:mb-3">
                  <h3
                    className="uppercase tracking-wider text-xs lg:text-sm text-[#15a36e] font-semibold pb-1"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    JOIN OUR NEWSLETTER
                  </h3>
                  <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }} />
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  To know more subscribe to our newsletter
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-sm" noValidate>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  aria-hidden="true"
                />

                <label
                  htmlFor="footer-newsletter-email"
                  className="block text-xs font-semibold text-gray-300 text-left mb-1.5"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  Email Address
                </label>
                <div
                  className="flex items-center overflow-hidden w-full bg-white rounded-full border border-transparent focus-within:border-[#15a36e]"
                  style={{ height: '40px' }}
                >
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your E-Mail Address"
                    disabled={status === 'loading'}
                    aria-label="Enter your email address"
                    className="flex-1 h-full px-4 text-black text-sm bg-transparent placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Subscribe to newsletter"
                    className="h-full flex items-center justify-center bg-[#15a36e] text-white hover:bg-[#128a5c] transition px-4 sm:px-5 disabled:opacity-70 font-semibold text-xs sm:text-sm whitespace-nowrap"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>

                {/* Consent checkbox */}
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === 'loading'}
                    className="mt-0.5 accent-[#15a36e]"
                  />
                  <span className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    I agree to the{' '}
                    <Link href="/privacy-policy/" className="text-[#15a36e] underline hover:no-underline">
                      Privacy Policy
                    </Link>
                    {' '}and consent to receive updates.
                  </span>
                </label>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-1.5 text-[#15a36e] text-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>{successMsg}</span>
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

        {/* Bottom Line & Legal Disclaimers */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-start justify-start space-y-4">
          {/* Checklist Item 22 Bottom Line */}
          <p
            className="text-gray-300 text-xs sm:text-sm text-left font-medium leading-relaxed"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            © 2026 CopyM Limited · Licensed by Masdar City Free Zone, Licence No. MC 14225 · Smart Station, First Floor, Incubator Building, Masdar City, Abu Dhabi, UAE
          </p>

          {/* Technology Platform Disclaimer */}
          <p
            className="text-gray-500 text-[11px] sm:text-xs text-left max-w-5xl leading-relaxed"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            CopyM is not a registered broker-dealer, funding portal, underwriter, investment bank, investment adviser, or investment manager. CopyM does not provide brokerage services, investment banking services, underwriting services, investment recommendations, or investment advice to any person. CopyM does not participate in the negotiation or execution of secondary market transactions for the purchase or sale of securities. CopyM does not, at any time, have possession or control of investor funds or securities in connection with such transactions. CopyM operates as a technology platform focused on distributed ledger technology to improve efficiency, accessibility, and transparency in financial technologies and T & C apply.
          </p>
        </div>
      </div>

      {/* Right Side Ellipse Gradient Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[120%] sm:w-[90%] md:w-[80%] lg:w-[50%] translate-x-[20%] translate-y-[20%] opacity-80 md:opacity-90 origin-bottom-right transform scale-150">
          <Image
            src="/assets/Images/icons/Ellipse.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </footer>
  );
}