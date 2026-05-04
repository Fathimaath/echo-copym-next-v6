"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/Image'; // Import our AVIF-compatible Image component
const zerogashero = '/images/zerogashero.avif';

const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-[500px] h-[60vh] sm:h-screen w-full bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 flex justify-end">
                <Image
                    src={zerogashero}
                    alt="Zero Gas Hero"
                    className="w-full h-full object-cover object-right sm:object-right scale-105 sm:scale-100 translate-y-0 sm:translate-y-0"
                />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-start pt-56 sm:pt-0 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl lg:max-w-2xl w-full text-left"
                >
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 uppercase tracking-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        <span className="text-white block mb-1">ZERO GAS </span>
                        <span className="text-[#10b981] block">EXPERIENCE</span>
                        <span className="text-white block mt-1">BY DESIGN</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-lg leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        CopyM delivers zero-gas tokenization by abstracting blockchain fees through meta-transactions and sponsored execution.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
