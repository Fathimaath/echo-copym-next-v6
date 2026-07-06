"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Typeform from "../Contact/Typeform";
import { GiTargetArrows, GiBinoculars } from "react-icons/gi";

// Dynamically import LeafletMap to prevent SSR window is not defined errors
const LeafletMap = dynamic(() => import('../LeafletMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[300px] sm:min-h-[600px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Map...</div>
});

// Animated Counter Component
const CounterCard = ({ stat, index }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const endValue = stat.value;

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                // Ease out cubic for smooth deceleration
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(easeOut * endValue));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="text-center relative"
        >
            {/* Vertical divider line on left (except first item) */}
            {index > 0 && (
                <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, #15a36e 50%, transparent 100%)'
                    }}
                ></div>
            )}
            <div className="flex flex-col items-center">
                <span
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#15a36e]"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                    {stat.prefix}{count}{stat.suffix}
                </span>
                <span className="text-base text-black mt-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                    {stat.label}
                </span>
            </div>
        </motion.div>
    );
};

export default function AboutUsClient() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            {/* Unified Company Overview Section */}
            <section className="py-10 lg:py-16 bg-white overflow-hidden" id="company-overview">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:gap-8 mb-2 lg:mb-4">
                        {/* Accordion / Interactive List */}
                        <div className="flex flex-col gap-4 sm:gap-6 pt-4">
                            {[
                                {
                                    id: 0,
                                    title: "Our Mission",
                                    icon: GiTargetArrows,
                                    heading: <>Democratizing <span className="text-[#15a36e]">Investment</span></>,
                                    text: "To make asset entitlement borderless, transparent, and universally accessible through blockchain innovation. We democratize access to entitlement opportunities by enabling fractional entitlement of premium assets, making it possible for anyone to invest in real estate, commodities, and valuable assets with as little as $100."
                                },
                                {
                                    id: 1,
                                    title: "Our Vision",
                                    icon: GiBinoculars,
                                    heading: <>Borderless <span className="text-[#15a36e]">Future</span></>,
                                    text: "We see a future where any asset, anywhere, can be owned, traded, and verified instantly. Through our platform, we envision a future where everyone has access to premium entitlement opportunities, creating a more inclusive and prosperous global economy where wealth generation is not limited by geography or traditional barriers."
                                }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex flex-col rounded-[24px] transition-all duration-300 border bg-white overflow-hidden ${activeTab === item.id
                                        ? 'border-gray-200 shadow-lg'
                                        : 'border-transparent hover:bg-gray-50 shadow-md'
                                        }`}
                                >
                                    <button
                                        onClick={() => setActiveTab(activeTab === item.id ? null : item.id)} // Toggle behavior
                                        className="flex items-center justify-between p-8 sm:p-12 w-full text-left"
                                    >
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === item.id ? 'text-[#15a36e]' : 'text-black'}`} />
                                            <span className="text-xl sm:text-2xl font-medium text-black" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${activeTab === item.id ? 'bg-[#15a36e] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className={`transform transition-transform duration-300 ${activeTab === item.id ? 'rotate-180' : 'rotate-0'}`}
                                            >
                                                <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Dropdown Content */}
                                    <AnimatePresence>
                                        {activeTab === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-8 sm:px-12 pb-8 pt-0">
                                                    <div className="w-full h-px bg-gray-100 mb-6"></div>
                                                    <div className="flex flex-col gap-4 items-start text-left md:items-center md:text-center">
                                                        <h2 className="text-2xl sm:text-3xl font-bold text-black leading-tight text-left md:text-center" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                            {item.heading}
                                                        </h2>
                                                        <p className="text-base text-gray-600 leading-relaxed text-left md:text-center" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM: Logo and Quote - No Image */}
                    <div className="relative mt-0 w-full">
                        <div className="flex flex-col items-center justify-center pt-0 pb-6 md:pb-8">
                            {/* Company Logo */}
                            <div className="-mb-10 sm:-mb-14 relative w-32 h-32 sm:w-60 sm:h-60">
                                <Image
                                    src="/assets/copym/png/Copym-01-1.avif"
                                    alt="Copym Logo"
                                    fill
                                    sizes="(max-width: 640px) 128px, 240px"
                                    className="object-contain"
                                />
                            </div>

                            {/* CEO Quote */}
                            <div className="max-w-4xl mx-auto text-left sm:text-center px-8">
                                <p className="text-black text-lg sm:text-3xl md:text-4xl font-medium leading-tight mb-4" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    “A seamless real-world asset ecosystem—transparent chains, responsible custody, sustainable markets.”
                                </p>
                                <p className="text-[#15a36e] font-bold text-lg" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    — Kuldeep Mahindrkar, <span className="text-black font-normal">CEO, Copym</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Live Stats Counter */}
            <section className="py-6 lg:py-8 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { value: 70, suffix: "", prefix: "+", label: "Blockchains" },
                            { value: 5, suffix: "", prefix: "+", label: "Countries Associated" },
                            { value: 200, suffix: "k", prefix: "+", label: "Beneficial Ownership" }
                        ].map((stat, index) => (
                            <CounterCard key={index} stat={stat} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Core Values */}
            <section className="py-6 lg:py-8 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:gap-8">
                        {/* TOP: Heading & Description - Centered */}
                        <div className="w-full text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-fit mb-2">
                                    <h2 className="text-base sm:text-lg md:text-xl lg:text-4xl font-bold leading-tight text-black pb-4 uppercase" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                        Our <span className="text-[#15a36e]">Core</span> Values
                                    </h2>
                                </div>
                                <p className="text-base text-black leading-relaxed max-w-3xl mb-2 mx-auto" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    We believe in building a transparent, secure, and inclusive financial future. Our values drive every decision we make, ensuring we empower investors and asset owners alike.
                                </p>
                            </motion.div>
                        </div>

                        {/* BOTTOM: Value Cards - Horizontal Row */}
                        <div className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: "Integrity",
                                        description: "We operate with complete transparency and ethical practices in all our dealings.",
                                    },
                                    {
                                        title: "Security",
                                        description: "Enterprise-grade security measures protect every transaction and asset on our platform.",
                                    },
                                    {
                                        title: "Innovation",
                                        description: "We continuously push the boundaries of what's possible in asset tokenization.",
                                    }
                                ].map((value, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.15 }}
                                        viewport={{ once: true }}
                                        className="p-8 relative"
                                    >
                                        {/* Vertical Gradient Divider (Desktop) */}
                                        {index > 0 && (
                                            <div
                                                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-24"
                                                style={{
                                                    background: 'linear-gradient(to bottom, transparent 0%, #15a36e 50%, transparent 100%)'
                                                }}
                                            ></div>
                                        )}

                                        {/* Horizontal Gradient Divider (Mobile) */}
                                        {index > 0 && (
                                            <div
                                                className="block sm:hidden absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]"
                                                style={{
                                                    background: 'linear-gradient(to right, transparent 0%, #15a36e 50%, transparent 100%)'
                                                }}
                                            ></div>
                                        )}

                                        <div className="flex flex-col gap-4 text-center">
                                            <h3 className={`text-xl font-bold ${value.title === 'Security' ? 'text-[#15a36e]' : 'text-black'}`} style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                {value.title}
                                            </h3>
                                            <p className="leading-relaxed text-sm text-black" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                {value.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Company Timeline */}
            <section className="relative bg-black pt-8 pb-32 lg:pt-12 lg:pb-40 overflow-hidden" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col gap-8 lg:gap-10">
                        {/* TOP: Heading & Description - Centered */}
                        <div className="w-full text-left sm:text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-fit mb-4 sm:mb-6 lg:mb-8">
                                    <h2 className="text-base sm:text-lg md:text-xl lg:text-4xl font-bold leading-tight text-white pb-4 uppercase" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                        Company <span className="text-[#15a36e]">Timeline</span>
                                    </h2>
                                </div>
                                <p className="text-base text-white leading-relaxed w-full mx-auto text-justify sm:text-center tracking-tighter hyphens-auto" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    Our journey reflects growth, innovation, and a commitment to delivering value at every stage. From humble beginnings to becoming a trusted name in our tokenization industry. <br className="hidden sm:block" />Each milestone is more than progress—it's a promise to stay ahead, listen to our community, and turn challenges into opportunities. <br className="hidden sm:block" />What began as a vision has grown into a movement built on entitlement and opportunity.
                                </p>
                            </motion.div>
                        </div>

                        {/* BOTTOM: Timeline Image */}
                        <div className="w-full relative mt-0 sm:-mt-36 h-[400px] sm:h-[600px] lg:h-[800px]">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src="/images/timeline.avif"
                                    alt="Company Timeline"
                                    fill
                                    sizes="100vw"
                                    className="object-contain scale-[1.8] sm:scale-125"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9: Contact Form */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <div className="relative w-fit mb-4 mx-auto">
                            <h2
                                className="text-base sm:text-lg md:text-xl lg:text-4xl font-bold uppercase pb-4 leading-tight"
                                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                            >
                                <span className="text-black">GET IN </span>
                                <span className="text-[#15a36e]">TOUCH</span>
                            </h2>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.1)]"
                    >
                        <div className="relative bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
                            <Typeform />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 11: Contact Info and Map Grid */}
            <section className="relative pt-0 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-12">
                        {/* Top: Email and Address Row */}
                        <div className="w-full max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 relative">
                                {/* Email Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-transparent p-4 relative flex justify-center sm:justify-end sm:pr-12"
                                >
                                    <div className="flex items-center gap-4 w-full max-w-[300px] sm:max-w-none justify-start">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex items-center justify-center flex-shrink-0">
                                            <Image
                                                src="/assets/Images/email.avif"
                                                alt="Email"
                                                fill
                                                sizes="(max-width: 640px) 48px, 64px"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                E-MAIL ID :
                                            </h3>
                                            <p className="text-sm sm:text-base text-black font-medium" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                support@copym.xyz
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Vertical Gradient Divider */}
                                <div
                                    className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-16"
                                    style={{
                                        background: 'linear-gradient(to bottom, transparent 0%, #15a36e 50%, transparent 100%)'
                                    }}
                                ></div>

                                {/* Horizontal Gradient Divider (Mobile) */}
                                <div
                                    className="block sm:hidden w-48 h-[1px] mx-auto my-4"
                                    style={{ background: 'linear-gradient(to right, transparent 0%, #15a36e 50%, transparent 100%)' }}
                                ></div>

                                {/* Address Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-transparent p-4 relative flex justify-center sm:justify-start sm:pl-12"
                                >
                                    <div className="flex items-center gap-4 w-full max-w-[300px] sm:max-w-none justify-start">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex items-center justify-center flex-shrink-0">
                                            <Image
                                                src="/assets/Images/address.avif"
                                                alt="Address"
                                                fill
                                                sizes="(max-width: 640px) 48px, 64px"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-row items-baseline gap-2">
                                            <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                ADDRESS :
                                            </h3>
                                            <p className="text-[10px] sm:text-base text-black font-medium text-left whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                Smart Station, First Floor, Incubator Building,<br className="hidden sm:block" /> Masdar City, Abu Dhabi, UAE.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom: Map */}
                        <div className="w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.1)] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
                            >
                                <LeafletMap
                                    center={[24.4326, 54.6152]}
                                    zoom={14}
                                    markerPosition={[24.4326, 54.6152]}
                                    popupText="Copym Headquarters - Masdar City, Abu Dhabi"
                                />

                                {/* Floating Info Card */}
                                <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 md:top-4 md:left-4 z-[500] bg-white rounded-lg sm:rounded-xl shadow-xl border border-gray-100 max-w-[140px] sm:max-w-[180px] md:max-w-[240px] p-1.5 sm:p-2 md:p-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="relative w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 flex-shrink-0">
                                            <Image
                                                src="/assets/copym/png/Copym-01-1.avif"
                                                alt="Copym"
                                                fill
                                                sizes="(max-width: 640px) 36px, (max-width: 768px) 48px, 64px"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight truncate" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                Copym Global
                                            </h4>
                                            <p className="text-[7px] sm:text-[9px] md:text-[11px] text-gray-500 mt-0 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                                Masdar City, Abu Dhabi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
