"use client";
import React, { useState, useEffect, cloneElement } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaDollarSign, FaHandshake, FaFileAlt, FaKey, FaFileAlt as FaReport, FaInfoCircle, FaEnvelope, FaDownload, FaChevronDown } from 'react-icons/fa';
import { HiCube, HiShieldCheck, HiLightningBolt, HiDocumentText, HiBookOpen, HiNewspaper } from 'react-icons/hi';
import { BsCurrencyBitcoin, BsShop } from 'react-icons/bs';
import Image from './Image'; // Import our new AVIF-compatible Image component
const tiicon4 = '/icons/Tokenization/tiicon4.avif';
const aboutush = '/images/aboutush.avif';
const tokencoinh = '/images/tokencoinh.avif';
const zerogash = '/images/zerogash.avif';
const parivaryaih = '/images/parivaryaih.avif';

// Styled icon component with green color
const StyledIcon = ({ icon: Icon, className = "" }) => (
  <div className={`w-10 h-10 flex items-center justify-center ${className}`}>
    <Icon className="w-6 h-6 text-[#15a36e]" />
  </div>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Background logic - works on all devices
          if (currentScrollY > 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // Hide/show logic with larger threshold on mobile
          const threshold = window.innerWidth < 1024 ? 20 : 5;

          if (currentScrollY > lastScrollY + threshold && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY - threshold) {
            setIsVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: "Product",
      path: "/marketplace",
      dropdown: [
        {
          icon: <StyledIcon icon={HiCube} />,
          heading: "Tokenization",
          description: "Learn how CopyM tokenizes real-world assets into digital securities.",
          path: "/tokenization"
        },
        {
          icon: <StyledIcon icon={FaDollarSign} />,
          heading: "Marketplace",
          description: "Discover entitlementt opportunities in a secure, compliant digital asset marketplace.",
          path: "/marketplace"
        }
      ]
    },
    {
      label: "Resources",
      path: "/blog",
      dropdown: [
        {
          icon: <StyledIcon icon={HiLightningBolt} />,
          heading: "Zero Gas",
          description: "Explore how CopyM can help Investors leverage tokenization to generate revenue",
          path: "/"  // Disabled redirect
        },
        {
          icon: <StyledIcon icon={HiShieldCheck} />,
          heading: "Privacy AI",
          description: "Explore how CopyM can help Investors leverage tokenization to generate revenue",
          path: "/"  // Disabled redirect
        },
        {
          icon: <StyledIcon icon={HiBookOpen} />,
          heading: "Blog",
          description: "Latest news, insights, and updates from CopyM.",
          path: "/blog"
        },
        {
          icon: <StyledIcon icon={HiNewspaper} />,
          heading: "Glossary",
          description: "Explore key terms and concepts in real-world asset tokenization.",
          path: "/glossary"
        },
        {
          icon: <StyledIcon icon={HiDocumentText} />,
          heading: "Document",
          description: "Access all important documents and resources.",
          path: "/"  // Disabled redirect
        }
      ]
    },
    {
      label: "About Us",
      path: "/about"

    }
  ];

  // Chevron icon for mobile dropdown open/close indicator
  function DropdownChevron({ open }) {
    return (
      <svg
        className={`transition-transform ml-2 w-3 h-3 inline-block ${open ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  return (
    <>
      {/* Full Width Header - Fixed to top with slide animation */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-transform duration-300 ease-in-out"
        style={{
          top: 'env(safe-area-inset-top, 0px)',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          willChange: 'transform',
          WebkitTransform: isVisible ? 'translateZ(0)' : 'translateY(-100%) translateZ(0)',
        }}
      >
        {/* Actual Header Container - Inner pointer events auto to allow clicking */}
        <div className={`
          pointer-events-auto
          relative w-full
          px-4 py-4 sm:px-6 lg:py-[6px]
          border border-white/10
          flex items-center justify-between
          transition-all duration-300 backdrop-blur-md
          ${isScrolled
            ? 'bg-[#0e0e0e]/90 shadow-lg shadow-black/20'
            : 'bg-[#0e0e0e]/80 shadow-md'
          }
        `} style={{ fontFamily: 'Palanquin, sans-serif' }}>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/copym/png/Copym-02-1.png"
              alt="CopyM Logo"
              className="w-auto h-[48px] sm:h-[56px] object-contain"
              style={{ maxWidth: 160 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.dropdown && setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.path}
                  className="text-gray-300 font-medium text-sm lg:text-base hover:text-white transition-colors duration-200 whitespace-nowrap py-2 flex items-center gap-1.5"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                  onClick={(e) => item.path === "#" && e.preventDefault()}
                >
                  {item.label}
                  {item.dropdown && (
                    <FaChevronDown
                      className={`w-2.5 h-2.5 transition-transform duration-200 ${hoveredItem === item.label ? 'rotate-180' : ''} opacity-70`}
                    />
                  )}
                </Link>

                {/* DESKTOP Dropdown */}
                <AnimatePresence>
                  {hoveredItem === item.label && item.dropdown && item.dropdown.length > 0 && (
                    <>
                      {/* Invisible Bridge to prevent closing when moving mouse */}
                      <div className="absolute top-full left-0 w-full h-8 bg-transparent"></div>

                      {/* Desktop Dropdown Card */}
                      <motion.div
                        className="absolute top-full left-0 mt-2 lg:bg-[#0e0e0e] rounded-2xl overflow-hidden z-[101] shadow-2xl border border-white/10"
                        style={{
                          width: 'max-content',
                          minWidth: '600px'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Green Glow/Shades - Spreaded & Transparent */}
                        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#15a36e]/40 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[#15a36e]/30 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

                        <div className="relative w-[600px] bg-transparent p-6 rounded-2xl z-10">
                          {/* Title */}
                          <div className="mb-4 pb-2 border-b border-white/10">
                            <h3 className="text-lg font-bold text-[#15a36e] uppercase tracking-wider" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                              {item.label}
                            </h3>
                          </div>

                          {/* Grid Layout for Resources */}
                          {item.label === "Resources" ? (
                            <div className="grid grid-cols-2 gap-4">
                              {/* Left Column: Zero Gas, Privacy AI */}
                              <div className="space-y-4 border-r border-white/20 pr-4">
                                {item.dropdown.slice(0, 2).map((dropdownItem, index) => (
                                  <Link
                                    key={index}
                                    href={dropdownItem.path || item.path}
                                    className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-colors group/item"
                                    onClick={() => setHoveredItem(null)}
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                      {dropdownItem.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-white text-sm mb-0.5 group-hover/item:text-[#15a36e] transition-colors">
                                        {dropdownItem.heading}
                                      </h4>
                                      <p className="text-xs text-gray-400 leading-snug">
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {/* Right Column: Blog, Glossary, Document */}
                              <div className="space-y-4">
                                {item.dropdown.slice(2).map((dropdownItem, index) => (
                                  <Link
                                    key={index + 2}
                                    href={dropdownItem.path || item.path}
                                    className={`flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-colors group/item ${index === 1 ? 'mt-2.5' : ''}`}
                                    onClick={() => setHoveredItem(null)}
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                      {dropdownItem.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-white text-sm mb-0.5 group-hover/item:text-[#15a36e] transition-colors">
                                        {dropdownItem.heading}
                                      </h4>
                                      <p className="text-xs text-gray-400 leading-snug">
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            /* Regular layout for other dropdowns */
                            <div className="space-y-4">
                              {item.dropdown.map((dropdownItem, index) => (
                                <Link
                                  key={index}
                                  href={dropdownItem.path || item.path}
                                  className="flex items-center gap-5 p-2 rounded-xl hover:bg-white/5 transition-colors group/item"
                                  onClick={() => setHoveredItem(null)}
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                    {dropdownItem.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white text-sm mb-0.5 group-hover/item:text-[#15a36e] transition-colors">
                                      {dropdownItem.heading}
                                    </h4>
                                    <p className="text-xs text-gray-400 leading-snug">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side: CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Link
              href="/download"
              className="hidden lg:flex items-center gap-2 bg-[#15a36e] hover:bg-[#128a5c] text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <FaDownload className="w-3 h-3" />
              <span>DOWNLOAD</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-300 hover:text-white transition-colors p-1"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) setMobileDropdownOpen(null);
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoClose className="h-6 w-6" /> : <GiHamburgerMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Slide-in Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => { setIsMenuOpen(false); setMobileDropdownOpen(null); }}
            />
            {/* Slide-out Panel */}
            <motion.div
              className="absolute top-0 right-0 w-[85vw] sm:w-[360px] h-full bg-[#0e0e0e] border-l border-white/10 shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src="/assets/copym/png/Copym-02-1.png"
                    alt="CopyM"
                    className="h-14 w-auto"
                  />
                </Link>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile CTA */}
              <div className="p-6 pb-2">
                <Link
                  href="/download"
                  className="flex w-full items-center justify-center gap-2 bg-[#15a36e] text-white px-5 py-3 rounded-full font-bold text-sm active:scale-95 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaDownload className="w-4 h-4" />
                  <span>DOWNLOAD APP</span>
                </Link>
              </div>

              {/* Mobile Navigation Items */}
              <div className="px-2">
                {navItems.map((item, idx) => {
                  const isDropdown = item.dropdown && item.dropdown.length > 0;
                  const open = isDropdown && mobileDropdownOpen === item.label;
                  return (
                    <div key={item.label} className="border-b border-white/5 last:border-b-0">
                      {isDropdown ? (
                        <div
                          className={`flex items-center px-4 py-4 text-gray-300 font-medium cursor-pointer ${open ? 'text-white' : ''}`}
                          onClick={() => {
                            setMobileDropdownOpen(mobileDropdownOpen === item.label ? null : item.label);
                          }}
                        >
                          <span className="flex-1 text-base">{item.label}</span>
                          <DropdownChevron open={open} />
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          className="flex items-center px-4 py-4 text-gray-300 font-medium cursor-pointer"
                          onClick={(e) => {
                            if (item.path === "#") {
                              e.preventDefault();
                              return;
                            }
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="flex-1 text-base">{item.label}</span>
                        </Link>
                      )}

                      {/* Dropdown Content */}
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white/5 mx-2 rounded-xl mb-2"
                          >
                            <div className="p-2 space-y-1">
                              {item.dropdown.map((sub, i) => (
                                <Link
                                  key={i}
                                  href={sub.path}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                  onClick={(e) => {
                                    if (sub.path === "#") {
                                      e.preventDefault();
                                      return;
                                    }
                                    setIsMenuOpen(false);
                                    setMobileDropdownOpen(null);
                                  }}
                                >
                                  <div className="w-12 h-12 flex items-center justify-center text-white text-xs">
                                    {cloneElement(sub.icon, {
                                      className: "w-12 h-12 object-contain"
                                    })}
                                  </div>
                                  <span className="text-sm font-medium">{sub.heading}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
