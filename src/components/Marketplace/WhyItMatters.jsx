"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Gem,
    Trophy,
    Leaf,
    Palette,
    Package,
    ExternalLink,
    MapPin,
    Layers,
    ShieldCheck,
    CheckCircle2,
    Heart,
    TrendingUp,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component

// Import images
const artsImg = '/images/marketplacesimg/arts.jpg';
const commoditiesImg = '/images/marketplacesimg/commodities.jpeg';
const realEstateImg = '/images/marketplacesimg/realestatee.png';
const sportsImg = '/images/marketplacesimg/sports.jpg';
const carbonCreditsImg = '/images/marketplacesimg/carbon credits.jpeg';
const luxuryBuildingImg = '/images/marketplacesimg/luxurybuilding.jpeg';
const downloadImg = '/images/marketplacesimg/download (15).jpeg';
const amazonRainforestIcon = '/icons/Tokenization/amazonrainforest.jpeg';
const oilIcon = '/icons/Tokenization/oil.jpeg';
const goldReserveImg = '/images/gold.jpeg';
const premiumOfficeBuildingImg = '/images/premium-building-office.jpeg';

// Import Category Logos
import manchesterLogo from '@/assets/logos/manchester_united.png';
import louvreLogo from '@/assets/logos/louvre.png';
import emaarLogo from '@/assets/logos/emaar.png';
import barrickLogo from '@/assets/logos/barrick_gold.png';

// Import specific logos for categories
import louvrePng from '@/components/Home/Musée du Louvre.png';
import barrickSvg from '@/components/Home/barrick.svg';


const categories = [
    {
        id: 'art',
        name: 'Art',
        icon: <Palette className="w-4 h-4" />,
        logo: louvrePng,
        image: artsImg,
        title: "Tokenized Fine Art",
        description: (
            <>
                Own fractions of masterpiece artworks from renowned artists.<br />
                Democratizing access to the exclusive world of fine art<br />
                investments.
            </>
        ),
        benefits: ["Fractional Ownership", "Blue-Chip Art Access", "Secure Provenance"],
        features: [
            { label: 'Token standard', value: 'ERC-3643' },
            { label: 'Registry', value: 'Registry-linked' },
            { label: 'Access', value: 'KYC-gated' }
        ],
        topics: ['Paintings', 'Sculptures', 'Digital Art'],
        cardTitle: "Renaissance Art Collections",
        badges: [
            { label: 'Blue-Chip Masterpieces', icon: <Palette className="w-4 h-4" />, top: '20%', left: '5%' },
            { label: 'Verified Authenticity', icon: <ShieldCheck className="w-4 h-4" />, top: '45%', right: '5%' },
        ],
        assets: [
            {
                name: "Renaissance-era art",
                location: "Europe",
                description: "Illustrative example of fractional ownership in historic fine art.",
                image: "/assets/Images/art2.jpg"
            },
            {
                name: "Modern abstract collection",
                location: "Europe",
                description: "Illustrative example of fractional ownership in contemporary art.",
                image: "/assets/Images/art3.jpg"
            }
        ]
    },
    {
        id: 'commodities',
        name: 'Commodities',
        icon: <Package className="w-4 h-4" />,
        logo: barrickSvg,
        image: commoditiesImg,
        title: "Tokenized Commodities",
        description: "Direct access to global commodities markets through tokenized assets. From precious metals to energy resources, diversify your portfolio.",
        benefits: ["Inflation Hedge", "Global Markets", "Direct Exposure"],
        features: [
            { label: 'Token standard', value: 'ERC-3643' },
            { label: 'Registry', value: 'Registry-linked' },
            { label: 'Access', value: 'KYC-gated' }
        ],
        topics: ['Gold', 'Silver', 'Oil & Gas'],
        cardTitle: "Asset-Backed Reserves",
        badges: [
            { label: 'Hard Asset Backing', icon: <Package className="w-4 h-4" />, top: '15%', left: '5%' },
            { label: 'Global Market Access', icon: <MapPin className="w-4 h-4" />, top: '45%', right: '5%' },
        ],
        assets: [
            {
                name: 'Precious metals reserves',
                location: 'Switzerland',
                description: "Illustrative example of tokenized precious-metal reserves.",
                image: goldReserveImg
            },
            {
                name: 'Energy resources',
                location: 'North America',
                description: "Illustrative example of tokenized energy production assets.",
                image: oilIcon
            }
        ]
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        icon: <Building2 className="w-4 h-4" />,
        logo: '/assets/Images/compass.png',
        image: realEstateImg,
        title: "Tokenized institutional Real Estate",
        description: "Access institutional-grade property exposure with fractional ownership and streamlined transfer, without the traditional barriers to entry.",
        benefits: ["Fractional Ownership", "Rental Income", "Highly Liquid Market"],
        features: [
            { label: 'Token standard', value: 'ERC-3643' },
            { label: 'Registry', value: 'Registry-linked' },
            { label: 'Access', value: 'KYC-gated' }
        ],
        topics: ['Apartment', 'House', 'Villa'],
        cardTitle: "Premium Property Portfolios",
        badges: [
            { label: 'Institutional Real Estate', icon: <Building2 className="w-4 h-4" />, top: '10%', left: '5%' },
            { label: 'Verified Ownership', icon: <ShieldCheck className="w-4 h-4" />, top: '45%', right: '5%' },

        ],
        assets: [
            {
                name: 'Residential portfolio',
                location: 'United States',
                description: "Illustrative example of fractional ownership in residential property.",
                image: luxuryBuildingImg
            },
            {
                name: 'Commercial property',
                location: 'United States',
                description: "Illustrative example of tokenized commercial real estate.",
                image: premiumOfficeBuildingImg
            }
        ]
    },
    {
        id: 'sports',
        name: 'Sports',
        icon: <Trophy className="w-4 h-4" />,
        logo: manchesterLogo,
        image: sportsImg,
        title: "Professional Sports Assets",
        description: "Invest in tokenized sports assets including team shares, athlete contracts, and stadium infrastructure. A new frontier in fan engagement and ownership.",
        benefits: ["Fan Ownership", "Revenue Sharing", "Global Access"],
        features: [
            { label: 'Token standard', value: 'ERC-3643' },
            { label: 'Registry', value: 'Registry-linked' },
            { label: 'Access', value: 'KYC-gated' }
        ],
        topics: ['Teams', 'Athletes', 'Stadiums'],
        cardTitle: "Sports Franchise Ownership",
        badges: [
            { label: 'Sports Franchise', icon: <Trophy className="w-4 h-4" />, top: '25%', left: '5%' },
            { label: 'Revenue Sharing', icon: <TrendingUp className="w-4 h-4" />, top: '45%', right: '5%' },
        ],
        assets: [
            {
                name: "Professional sports team",
                location: "Europe",
                description: "Illustrative example of tokenized participation in a sports club.",
                image: "/assets/Images/teams.jpg"
            },
            {
                name: "Stadium infrastructure",
                location: "Europe",
                description: "Illustrative example of a tokenized stadium project.",
                image: "/assets/Images/stadium.jpg"
            }
        ]
    },
    {
        id: 'carbon-credits',
        name: 'Carbon Credits',
        icon: <Leaf className="w-4 h-4" />,
        logo: null,
        image: carbonCreditsImg,
        title: "Carbon Credits",
        cardTitle: "Renewable Energy Carbon Credits",
        description: "Transparent digital carbon assets backed by real-world climate action. Designed for accountability, traceability, and global environmental progress.",
        benefits: ["ESG Compliant", "Verified Offsets", "Traceable Impact"],
        features: [
            { label: 'Token standard', value: 'ERC-3643' },
            { label: 'Registry', value: 'Registry-linked' },
            { label: 'Access', value: 'KYC-gated' }
        ],
        topics: ['Forest', 'Solar', 'Wind'],
        badges: [
            { label: 'Verified Carbon Credit', icon: <Leaf className="w-4 h-4" />, top: '20%', left: '5%' },
            { label: 'Climate Impact', icon: <ShieldCheck className="w-4 h-4" />, top: '45%', right: '5%' },
        ],
        assets: [
            {
                name: "Nature-based projects",
                location: "Global",
                description: "Illustrative example of tokenized nature-based carbon projects.",
                image: amazonRainforestIcon
            }
            ,
            {
                name: "Renewable energy projects",
                location: "Global",
                description: "Illustrative example of tokenized renewable energy generation.",
                image: "/assets/Images/SOLAR-FARM.jpg"
            }
        ]
    }
];

export default function WhyItMatters() {
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            className="w-full py-6 md:py-12 overflow-hidden relative bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header at the top */}
                <div className="mb-6 md:mb-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-fit mb-4 mx-auto"
                    >
                        <h2 className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase leading-tight pb-2 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                            <span className="text-[#10b981]">Asset</span> <span className="text-black">Spotlights</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-sm sm:text-base md:text-lg lg:text-sm text-black font-medium max-w-4xl mx-auto leading-relaxed px-4 !mb-0"
                        style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                    >
                        Unlocking the trillion-dollar potential of Real-World Assets with institutional-grade infrastructure. <br className="hidden md:block" />
                        Capitalize on unparalleled liquidity, compliance, and global reach.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mt-6"
                    >
                        <Link
                            href="#featured-assets"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 min-w-[180px] sm:min-w-[200px] justify-center"
                            style={{
                                fontFamily: 'Palanquin, sans-serif',
                                background: 'linear-gradient(to right, #23BD83, #109261)'
                            }}
                        >
                            EXPLORE MORE
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center ml-1">
                                <svg
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#109261]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Category Tags Bar */}
                <div id="featured-assets" className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-5 px-2 overflow-x-auto pb-2 hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat)}
                            className="group flex items-center transition-transform duration-300 hover:scale-[1.02] mb-1 flex-shrink-0"
                            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                        >
                            {/* Icon Circle - Straight Right Edge */}
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-l-full rounded-r-none flex items-center justify-center transition-all duration-300 border-r-0 shadow-2xl
                                ${activeTab.id === cat.id
                                    ? 'bg-[#10b981] text-white'
                                    : 'bg-white text-gray-400 group-hover:text-gray-600'}`}>
                                {React.cloneElement(cat.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                            </div>

                            {/* Text Pill - Straight Left Edge */}
                            <div className={`px-4 sm:px-6 py-0.5 sm:py-1 rounded-r-full rounded-l-none text-xs sm:text-[12px] font-bold transition-all duration-300 border-l-0 shadow-2xl flex items-center justify-center h-8 sm:h-10 min-w-[60px] sm:min-w-[80px]
                                ${activeTab.id === cat.id
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600'}`}>
                                {cat.name}
                            </div>
                        </button>
                    ))}
                </div>



                {/* Main Content: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">

                    {/* Left Column: Visual Card - Aligned Top */}
                    <div className="relative flex justify-center lg:justify-end items-center lg:col-span-6 lg:pr-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-[320px] md:max-w-[350px] rounded-lg overflow-visible shadow-xl bg-white p-2"
                            >
                                <div className="relative">
                                    <div className="w-full aspect-[10/9] rounded-lg overflow-hidden relative">
                                        <Image
                                            src={activeTab.image}
                                            alt={activeTab.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 scale-100"
                                            style={{
                                                objectPosition: ['carbon-credits', 'sports'].includes(activeTab.id) ? '20% center' : 'center center'
                                            }}
                                        />

                                        {/* Overlay Heart Button */}
                                        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                            <Heart className="w-5 h-5 text-gray-400" />
                                        </button>

                                        {/* Decorative Overlay for premium feel */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                </div>

                                {/* Bottom Bar - Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="px-2 pt-2 pb-2"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        {/* Title Row */}
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                {activeTab.cardTitle || activeTab.title}
                                            </h3>
                                        </div>

                                        {/* Illustrative Label */}
                                        <div className="pl-1 mt-1 mb-1">
                                            <span className="inline-flex items-center rounded-full bg-black text-white px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">
                                                Illustrative — not a live offering
                                            </span>
                                        </div>

                                        {/* Platform Features Row */}
                                        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
                                            {(activeTab.features || []).map((feature, idx) => (
                                                <div key={idx} className="border border-gray-200 rounded-lg p-1.5 min-w-[80px] flex-1">
                                                    <p className="text-xs sm:text-[10px] text-gray-400 font-bold whitespace-nowrap mb-0.5">{feature.label}</p>
                                                    <p className="text-xs sm:text-[11px] font-bold text-gray-800 truncate">{feature.value}</p>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                </motion.div>

                                {/* Visual Data Badges */}
                                {activeTab.badges.map((badge, idx) => (
                                    <motion.div
                                        key={`${activeTab.id}-badge-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.5 + (idx * 0.2),
                                            duration: 0.8,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            repeatDelay: 4 + Math.random() * 3
                                        }}
                                        className="absolute z-10 bg-white/40 backdrop-blur-xl rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/60 flex items-center gap-2 sm:gap-3 min-w-[120px] sm:min-w-[180px]"
                                        style={{
                                            top: badge.top ? (isMobile ? `calc(${badge.top} + ${badge.top.includes('-') ? '5%' : '2%'})` : badge.top) : undefined,
                                            left: badge.left ? (isMobile ? `calc(${badge.left} + ${badge.left.includes('-') ? '8%' : '5%'})` : badge.left) : undefined,
                                            right: badge.right ? (isMobile ? `calc(${badge.right} + ${badge.right.includes('-') ? '8%' : '5%'})` : badge.right) : undefined,
                                            bottom: badge.bottom ? (isMobile ? `calc(${badge.bottom} + ${badge.bottom.includes('-') ? '5%' : '2%'})` : badge.bottom) : undefined,
                                        }}
                                    >
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white/60 flex items-center justify-center shadow-inner shrink-0">
                                            <span className="text-[#2563eb] scale-75 sm:scale-90">{badge.icon}</span>
                                        </div>
                                        <p className="text-xs sm:text-xs font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>{badge.label}</p>
                                    </motion.div>
                                ))}


                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-3"
                            >
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-md text-xs sm:text-xs font-bold uppercase tracking-wider">
                                        {activeTab.icon}
                                        <span>Market Insight</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                        {activeTab.title}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                        {activeTab.description}
                                    </p>
                                </div>



                                {/* Asset Cards - Only show if assets exist */}
                                {activeTab.assets && activeTab.assets.length > 0 && (
                                    <div className="space-y-3 pt-1">
                                        <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-[0.15em]">Featured Assets</h4>
                                        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-[340px] sm:max-w-lg lg:max-w-none mx-auto lg:mx-0">
                                            {activeTab.assets.map((asset, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + (idx * 0.15), duration: 0.5 }}
                                                    className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                >
                                                    {/* Top Image Area - Reduced Height */}
                                                    <div className="relative h-28 sm:h-24 w-full">
                                                        <Image
                                                            src={asset.image}
                                                            alt={asset.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    {/* Content Area - Reduced Padding */}
                                                    <div className="pt-4 sm:pt-5 px-2 sm:px-3 pb-2 sm:pb-3">
                                                        {/* Header Row: Title */}
                                                        <div className="flex flex-col mb-1 sm:mb-1.5">
                                                            <h5 className="font-bold text-xs sm:text-[10px] lg:text-sm text-gray-900 leading-tight whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                                {asset.name}
                                                            </h5>
                                                        </div>

                                                        {/* Description - Reduced Margin & Size */}
                                                        <p className="text-gray-500 text-xs sm:text-xs font-medium leading-relaxed mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                            {asset.description || "Illustrative example of a tokenized real-world asset."}
                                                        </p>

                                                        {/* Footer Row: Tags */}
                                                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                                            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full bg-[#ecf6ff] text-[#2563eb] text-xs sm:text-[9px] font-bold transition-colors hover:bg-blue-100">
                                                                {React.cloneElement(activeTab.icon, { className: "w-1.5 h-1.5 sm:w-2 sm:h-2" })}
                                                                {activeTab.name}
                                                            </span>
                                                            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-[9px] font-bold transition-colors hover:bg-gray-200">
                                                                <MapPin className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
                                                                {asset.location.split(',').pop().trim()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Pagination Dots - Mobile Only */}
                                        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
                                            {[1, 2].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#10b981]' : 'bg-gray-300'}`}
                                                />
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* Terms & Conditions - Centered at Bottom */}
                <div className="text-center mt-6 md:mt-8 mb-4 px-4">
                    <div className="text-[#98a2b3] text-xs sm:text-xs leading-relaxed max-w-6xl mx-auto font-medium" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        <p className="mb-0.5">

                            CopyM does not provide brokerage services, investment banking services, underwriting services, investment recommendations, or investment advice to any person.
                        </p>
                        <p>
                            CopyM operates as a technology platform focused on distributed ledger technology to improve efficiency, accessibility, and transparency in financial technologies T & C apply.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}