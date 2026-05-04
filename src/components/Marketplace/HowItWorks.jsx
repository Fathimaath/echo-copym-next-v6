"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Using existing image imports - would ideally use specific product images but staying within project assets
const tiicon1 = '/icons/Tokenization/tiicon1.png';
const tiicon2 = '/icons/Tokenization/tiicon2.png';
const tiicon3 = '/icons/Tokenization/tiicon3.png';
const tiicon4 = '/icons/Tokenization/tiicon4.png';
const ticon4 = '/icons/Tokenization/ticon4.png';
const smallp2 = "/assets/Images/smallp2.png";

export default function HowItWorks() {


    const steps = [
        {
            id: "fraction",
            title: "Fractional Ownership",
            description: "Each asset is divided into programmable tokens, allowing participants to invest in fractions instead of purchasing the entire asset.",
            icon: tiicon1,

        },
        {
            id: "secure",
            title: "Regulated Custodial",
            description: "Regulated custody delivers compliant asset protection via licensed institutions, rigorous audits, and jurisdictional regulatory oversight.",
            icon: smallp2,
            watermark: ""
        },
        {
            id: "trade-settle",
            title: "Buy, Trade & Settlement\u00A0",
            description: "Participate in a transparent marketplace where entitlement and returns are automated through smart contracts.",
            icon: tiicon4,
            watermark: ""
        },
        {
            id: "trust",
            title: "Compliance-First",
            description: "KYC, asset verification and regulatory safeguards are embedded by design, ensuring every transaction is built on trust.",
            icon: tiicon3,

        }
    ];

    // Determine which cards to show
    const visibleSteps = steps;

    return (
        <section className="w-full bg-black py-12 md:py-20 lg:pt-32 lg:pb-12 overflow-hidden relative">
            {/* Main Background Header Removed */}



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
                {/* Header */}


                {/* Staggered Grid Container */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
                    {/* Shared Background Watermark "MARKETPLACE" */}
                    <div className="relative order-4 md:absolute md:top-1/2 md:-translate-y-1/2 md:top-[640px] md:translate-y-0 lg:top-[640px] xl:top-[470px] md:-left-20 w-full flex justify-start md:block pointer-events-none select-none z-0 overflow-visible opacity-50 md:pl-20">
                        <span
                            className="uppercase tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-center text-[40px] md:text-[90px] lg:text-[130px] leading-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #10b981 0%, #059669 60%, rgba(0,0,0,0) 100%)',
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 800
                            }}
                        >
                            MARKETPLACE
                        </span>
                    </div>

                    {/* REGULATED Watermark */}
                    <div className="relative order-2 md:absolute md:top-0 md:translate-y-0 md:right-0 w-full flex justify-end md:block text-right pointer-events-none select-none z-0 overflow-visible opacity-50 md:pr-20">
                        <span
                            className="uppercase tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-center text-[40px] md:text-[90px] lg:text-[130px] leading-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #10b981 0%, #059669 60%, rgba(0,0,0,0) 100%)',
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 800
                            }}
                        >
                            REGULATED
                        </span>
                    </div>

                    {/* FRAMEWORK Watermark */}
                    <div className="relative order-6 md:absolute md:bottom-0 md:top-auto md:translate-y-0 md:left-0 w-full flex justify-start md:block text-left pointer-events-none select-none z-0 overflow-visible opacity-50 md:pr-20">
                        <span
                            className="uppercase tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-center text-[40px] md:text-[90px] lg:text-[130px] leading-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #10b981 0%, #059669 60%, rgba(0,0,0,0) 100%)',
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 800
                            }}
                        >
                            FRAMEWORK
                        </span>
                    </div>
                    <AnimatePresence mode="popLayout">
                        {visibleSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                className={`relative flex flex-col group ${index % 2 === 0 ? 'items-start' : 'items-end'} 
                                    ${index === 0 ? 'order-1 md:items-start lg:mt-[-40px]' :
                                        index === 1 ? 'order-3 md:items-end md:mt-24 lg:items-start lg:mt-[500px] xl:mt-[750px]' :
                                            index === 2 ? 'order-5 md:mt-32 md:items-start md:mt-36 lg:items-start lg:mt-20 xl:mt-40' :
                                                'order-7 md:items-end md:mt-24 lg:items-center lg:mt-[350px] xl:mt-[600px]'}`}
                            >
                                {/* Card Wrapper - Side-by-side for cards 2 & 3 on large screens */}
                                <div className={`relative z-10 w-full ${index % 2 === 0 ? 'ml-0 mr-auto' : 'mr-0 ml-auto'} sm:mx-auto max-w-[240px] sm:max-w-[380px] lg:max-w-full 
                                    ${index === 1 ? 'lg:flex lg:flex-row-reverse lg:items-center lg:gap-10 lg:mx-0 lg:translate-x-[-10%]' :
                                        index === 2 ? 'lg:flex lg:flex-row lg:items-center lg:gap-10 lg:mx-0 lg:translate-x-[20%]' :
                                            index === 3 ? 'lg:flex lg:flex-col-reverse lg:items-center' : ''}`}>

                                    {/* Visual Group - Constrains width of image/watermark for small cards */}
                                    <div className={`relative w-full mb-4 ${[1, 2].includes(index) ? `max-w-[140px] lg:max-w-[150px] ${index === 1 ? 'ml-auto mr-0' : 'ml-0 mr-auto'} lg:mx-0` : `max-w-[240px] sm:max-w-[380px] lg:max-w-full ${index === 3 ? 'ml-auto mr-0' : 'ml-0 mr-auto'}`} ${[1, 2].includes(index) ? 'lg:mb-0 lg:shrink-0' : ''} ${index === 3 ? 'lg:mb-0' : ''}`}>



                                        {/* Card Body */}

                                        {/* Outer Container with gap - Dark Glass Theme (Ultra transparent to show watermark) */}
                                        <div className={`relative aspect-[4/5] bg-zinc-900/10 backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-5 transition-transform duration-500 flex items-center justify-center w-full`}>
                                            {/* Inner box - Subtle glass gradient */}
                                            <div className="w-[75%] h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-[1rem] relative overflow-visible">
                                                {/* Logo Only - positioned conditionally */}
                                                <div className={`absolute z-20 ${[1, 2].includes(index) ? '-bottom-4 -left-4 sm:-bottom-5 sm:-left-5' : '-top-4 -right-4 sm:-top-5 sm:-right-5'}`}>
                                                    <div className={`${[1, 2].includes(index) ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-20 h-20 sm:w-24 sm:h-24'} transition-all duration-300 hover:scale-110 drop-shadow-xl`}>
                                                        <img
                                                            src="/assets/copym/png/Copym-05.png"
                                                            alt="Add"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </div>
                                                {/* Custom Radial Gradient Shadow - Increased Spreading Emerald */}
                                                <div
                                                    className={`absolute rounded-full blur-3xl opacity-50 ${[0, 3].includes(index) ? 'w-64 h-64' : 'w-52 h-52'}`}
                                                    style={{
                                                        background: 'radial-gradient(circle, #1C9065 0%, #088557 50%, rgba(0,0,0,0) 80%)'
                                                    }}
                                                ></div>
                                                <img
                                                    src={step.icon}
                                                    alt={step.title}
                                                    className={`relative z-10 object-contain drop-shadow-2xl transition-all duration-500 ${index === 0 ? 'w-36 h-36 -translate-y-6' : (index === 3 ? 'w-44 h-44' : 'w-32 h-32')} ${index === 3 ? 'translate-x-4' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title & Description */}
                                    <div className={`pl-0 pr-0 w-fit max-w-full flex flex-col text-left items-start sm:pr-6 ${index === 3 ? 'lg:mb-6' : ''}`}>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 whitespace-nowrap" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium text-justify tracking-tight hyphens-auto" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                            {step.description}
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section >
    );
}
