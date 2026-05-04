"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Critical() {
    const criticalItems = [
        {
            image: "/assets/Images/icons/privacyai1.png",
            title: "Enables regulated asset tokenization"
        },
        {
            image: "/assets/Images/icons/privacyai2.png",
            title: "Protects both investor and issuer data"
        },
        {
            image: "/assets/Images/icons/privacyai3.png",
            title: "Supports enterprise and institutional adoption with stricter privacy requirements"
        },
        {
            image: "/assets/Images/icons/privacyai4.png",
            title: "Prevents sensitive information from being permanently exposed on public ledgers"
        }
    ];

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 pb-20 sm:pb-32 overflow-hidden">
            <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center relative w-full mb-10 sm:mb-12 md:mb-16">
                    <div className="relative w-fit mx-auto">
                        <h2 className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase leading-tight pb-2 text-center" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            <span className="text-black">Why </span>
                            <span className="text-[#10b981]">Privacy AI</span>
                            <span className="text-black"> is critical ?</span>
                        </h2>
                    </div>

                    <p
                        className="text-sm sm:text-base md:text-lg lg:text-sm text-black leading-relaxed mt-6 max-w-4xl mb-12 text-center mx-auto"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        Master the markets with AI-driven insights, predictive alerts, and real-time intelligence <br className="hidden sm:block" /> that give you the edge in crypto trading
                    </p>
                </div>

                {/* List of Items */}
                <div className="flex flex-col gap-4 sm:gap-6">
                    {criticalItems.map((item, index) => (
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
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain object-left-bottom transition-transform duration-500 scale-90 sm:scale-100 translate-y-2 sm:translate-y-4 -translate-x-1 sm:-translate-x-2"
                                />
                            </div>

                            {/* Text Container */}
                            <div className="flex-1 px-4 sm:px-6 md:px-8 flex items-center">
                                <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-normal tracking-wide" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    {index === 0 ? (
                                        <>
                                            Enables regulated asset tokenization <span className="font-bold">without sacrificing confidentiality</span>
                                        </>
                                    ) : (
                                        item.title
                                    )}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
