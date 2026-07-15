"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component

export default function TradableAssets() {
    const assets = [
        {
            image: "/assets/Images/icons/tradee1.png",
            title: "REAL-WORLD ASSETS",
            description: "Tokenized entitlement to institutional real-world entitlement grade assets."
        },
        {
            image: "/assets/Images/icons/tradee2.png",
            title: "REVENUE-SHARING ASSETS",
            description: "Tokenized participation in institutional global business revenue streams."
        },
        {
            image: "/assets/Images/icons/tradee3.png",
            title: "BRAND & IP ASSETS",
            description: "Tokenized entitlement within institutional global brands and digital assets."
        },
        {
            image: "/assets/Images/icons/tradee4.png",
            title: "CUSTOM TOKENIZED ASSETS",
            description: "Tokenized structures designed with institutional global strategic partners."
        }
    ];

    return (
        <section className="w-full bg-white py-10 sm:py-12 pb-0 sm:pb-0 overflow-hidden">
            <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <div className="relative w-fit mb-4 mx-auto">
                        <h2 className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase leading-tight pb-2 !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                            <span className="text-black">What you can trade on</span> <span className="text-[#10b981]">CopyM</span> <span className="text-black">?</span>
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-sm font-normal text-black leading-relaxed max-w-4xl mx-auto !mb-0" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Master the markets with AI-driven insights, predictive alerts, and real-time intelligence <br className="hidden sm:block" />
                        that give you the edge in crypto trading
                    </p>
                </div>

                {/* List of Assets */}
                <div className="flex flex-col gap-4 sm:gap-6">
                    {assets.map((asset, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-black text-white rounded-lg overflow-hidden flex items-center h-24 sm:h-24 md:h-32 lg:h-40 group"
                        >
                            {/* Image Container */}
                            <div className="w-[35%] sm:w-[30%] md:w-[25%] h-full relative overflow-hidden flex items-end justify-start bg-black">
                                <Image
                                    src={asset.image}
                                    alt={asset.title}
                                    className="w-full h-full object-contain object-left-bottom transition-transform duration-500 scale-90 sm:scale-100 translate-y-2 sm:translate-y-4 -translate-x-1 sm:-translate-x-2"
                                />
                            </div>

                            {/* Text Container */}
                            <div className="flex-1 px-2 sm:px-6 md:px-8 flex flex-col justify-center">
                                <h3 className="text-[11px] sm:text-base md:text-lg lg:text-2xl font-bold tracking-wider mb-1.5 sm:mb-4 text-white" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    {asset.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide leading-tight sm:leading-relaxed" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                                    {asset.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
