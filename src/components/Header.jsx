"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  LayoutGrid, 
  BookOpen, 
  FileText, 
  Users, 
  Mail, 
  ChevronDown, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  Building2,
  Leaf
} from 'lucide-react';
import Image from './Image';

// Styled icon wrapper with green accent
const NavIcon = ({ icon: Icon, className = "" }) => (
  <div className={`w-10 h-10 rounded-lg bg-[#15a36e]/10 border border-[#15a36e]/20 flex items-center justify-center flex-shrink-0 group-hover/item:scale-105 group-hover/item:border-[#15a36e]/40 transition-all ${className}`}>
    <Icon className="w-5 h-5 text-[#15a36e]" />
  </div>
);

// Navigation definition matching Checklist Items 21, 41, 42, 43, 44.
const NAV_SECTIONS = [
  {
    label: "Platform",
    id: "platform",
    items: [
      {
        heading: "Platform overview",
        description: "Issue, onboard and manage tokenized assets",
        path: "/tokenization/",
        icon: Layers
      },
      {
        heading: "White-label platform",
        description: "Run under your own brand and domain",
        path: "/white-label/",
        icon: LayoutDashboard
      },
      {
        heading: "Marketplace module",
        description: "Permissioned marketplace infrastructure",
        path: "/marketplace/",
        icon: LayoutGrid
      },
      {
        heading: "Security & compliance",
        description: "Identity, custody and transfer rules",
        path: "/security-compliance/",
        icon: ShieldCheck
      }
    ]
  },
  {
    label: "Solutions",
    id: "solutions",
    items: [
      {
        heading: "Real estate",
        description: "SPV ownership records, distributions and reporting",
        path: "/solutions/real-estate/",
        icon: Building2
      }
    ]
  },
  {
    label: "Resources",
    id: "resources",
    items: [
      {
        heading: "Blog",
        description: "Insights on RWA tokenization",
        path: "/blog/",
        icon: BookOpen
      },
      {
        heading: "Glossary",
        description: "Key terms explained",
        path: "/glossary/",
        icon: FileText
      }
    ]
  },
  {
    label: "Company",
    id: "company",
    items: [
      {
        heading: "About",
        description: "Our background, team and story",
        path: "/about/",
        icon: Users
      },
      {
        heading: "Contact",
        description: "Get in touch with our team",
        path: "/contact/",
        icon: Mail
      }
    ]
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close menus on route navigation or escape
  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  // Keyboard navigation & Outside click handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll detection logic (preserve existing behavior)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

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

  // Hover helpers with small debounce to prevent accidental closes
  const handleMouseEnter = (label) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleDropdown = (label) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  return (
    <>
      {/* Full Width Fixed Header */}
      <nav
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-transform duration-300 ease-in-out"
        style={{
          top: 'env(safe-area-inset-top, 0px)',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          willChange: 'transform',
          WebkitTransform: isVisible ? 'translateZ(0)' : 'translateY(-100%) translateZ(0)',
        }}
      >
        <div
          className={`
            pointer-events-auto
            relative w-full
            px-3 py-3 sm:px-6 lg:py-[6px]
            border-b border-white/10
            flex items-center justify-between
            transition-all duration-300 backdrop-blur-md
            ${isScrolled
              ? 'bg-[#0e0e0e]/95 shadow-lg shadow-black/30'
              : 'bg-[#0e0e0e]/85 shadow-md'
            }
          `}
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeAllMenus}
            className="flex items-center flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e] rounded-lg"
          >
            <Image
              src="/assets/copym/png/Copym-02-1.png"
              alt="CopyM Logo"
              className="w-auto h-[48px] sm:h-[56px] object-contain"
              style={{ maxWidth: 160 }}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_SECTIONS.map((section) => {
              const isOpen = activeDropdown === section.label;
              return (
                <div
                  key={section.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown(section.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`desktop-menu-${section.id}`}
                    className={`text-gray-300 font-medium text-sm lg:text-base hover:text-white transition-colors duration-200 py-2 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e] rounded-md ${
                      isOpen ? 'text-white' : ''
                    }`}
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${
                        isOpen ? 'rotate-180 text-[#15a36e] opacity-100' : ''
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown Card */}
                  <AnimatePresence>
                    {isOpen && (
                      <>
                        {/* Bridge gap */}
                        <div className="absolute top-full left-0 w-full h-3 bg-transparent" />

                        <motion.div
                          id={`desktop-menu-${section.id}`}
                          role="menu"
                          aria-label={`${section.label} menu`}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[360px] bg-[#0e0e0e] rounded-2xl overflow-hidden z-[101] shadow-2xl border border-white/10"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                          {/* Ambient Glow */}
                          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#15a36e]/25 blur-[60px] rounded-full pointer-events-none" />
                          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#15a36e]/20 blur-[60px] rounded-full pointer-events-none" />

                          <div className="relative p-4 z-10 space-y-1">
                            <div className="px-3 pt-1 pb-2 border-b border-white/10 mb-2">
                              <span className="text-[11px] font-bold text-[#15a36e] uppercase tracking-wider">
                                {section.label}
                              </span>
                            </div>

                            {section.items.map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                role="menuitem"
                                onClick={closeAllMenus}
                                className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e]"
                              >
                                <NavIcon icon={item.icon} />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-white text-sm group-hover/item:text-[#15a36e] transition-colors">
                                    {item.heading}
                                  </h4>
                                  <p className="text-xs text-gray-400 leading-snug mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side: Primary CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Primary CTA - Visible on ALL screen sizes */}
            <Link
              href="/signup/"
              onClick={closeAllMenus}
              className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 rounded-full text-white bg-[#15a36e] hover:bg-[#128a5c] transition-all duration-300 active:scale-95 shadow-[0_0_16px_rgba(21,163,110,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex-shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-[#15a36e] stroke-[3]" />
              </span>
              <span className="font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap">
                Book a demo
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden text-gray-300 hover:text-white transition-colors p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e]"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) setMobileDropdownOpen(null);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop Overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              role="button"
              tabIndex={0}
              aria-label="Close mobile menu"
              onClick={closeAllMenus}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeAllMenus();
                }
              }}
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              className="absolute top-0 right-0 w-[85vw] sm:w-[380px] h-full bg-[#0e0e0e] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className="flex items-center"
                >
                  <Image
                    src="/assets/copym/png/Copym-02-1.png"
                    alt="CopyM Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
                </Link>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e]"
                  onClick={closeAllMenus}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Primary CTA */}
              <div className="p-5 pb-2">
                <Link
                  href="/signup/"
                  onClick={closeAllMenus}
                  className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full text-white bg-[#15a36e] shadow-[0_0_16px_rgba(21,163,110,0.35)] active:scale-[0.98] transition-all duration-300 font-bold text-sm tracking-wide"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white flex-shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 text-[#15a36e] stroke-[3]" />
                  </span>
                  <span>Book a demo</span>
                </Link>
              </div>

              {/* Mobile Accordion Nav Items */}
              <div className="px-3 py-2 flex-1">
                {NAV_SECTIONS.map((section) => {
                  const isOpen = mobileDropdownOpen === section.label;
                  return (
                    <div key={section.label} className="border-b border-white/5 last:border-b-0">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-3 py-3.5 text-gray-300 font-medium hover:text-white transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15a36e] rounded-lg"
                        aria-expanded={isOpen}
                        onClick={() => {
                          setMobileDropdownOpen(isOpen ? null : section.label);
                        }}
                      >
                        <span className="text-base font-semibold">{section.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#15a36e]" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Links */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white/[0.03] mx-1 rounded-xl mb-2"
                          >
                            <div className="p-2 space-y-1">
                              {section.items.map((subItem) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <Link
                                    key={subItem.path}
                                    href={subItem.path}
                                    onClick={closeAllMenus}
                                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
                                  >
                                    <div className="w-8 h-8 rounded-md bg-[#15a36e]/10 border border-[#15a36e]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#15a36e]/40">
                                      <SubIcon className="w-4 h-4 text-[#15a36e]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-semibold text-white group-hover:text-[#15a36e] transition-colors">
                                        {subItem.heading}
                                      </div>
                                      <p className="text-xs text-gray-400 leading-snug mt-0.5">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer Info */}
              <div className="px-5 py-4 border-t border-white/10 text-xs text-gray-500">
                © {new Date().getFullYear()} CopyM Limited
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
