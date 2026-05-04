"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component
const privacyaiHero = '/images/privacyaihero.png';

const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-[500px] h-[60vh] sm:h-screen w-full bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={privacyaiHero}
                    alt="Privacy AI Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-start pt-32 sm:pt-40 md:pt-48 lg:pt-60">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl lg:max-w-2xl w-full text-left"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 uppercase tracking-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        <span className="text-white block mb-1">PRIVACY AI</span>
                        <span className="text-[#10b981] block">INTELLIGENT</span>
                        <span className="text-white block mt-1">PRIVACY LAYER</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light tracking-wide max-w-lg leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        Privacy AI is CopyM's intelligent privacy layer. It protects sensitive asset, user and transaction data while enabling compliant tokenization on public and hybrid blockchains.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
