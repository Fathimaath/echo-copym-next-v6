"use client";
import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: 'Enterprise Security',
        description: 'End-to-end encryption with hardware-backed key management. Your assets and data are protected at every layer.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'RWA Tokenization',
        description: 'Tokenize real-world assets — real estate, commodities, art, and more — with built-in compliance and institutional-grade infrastructure.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Built-In Compliance',
        description: 'Stay compliant with automated KYC/AML, regulatory reporting, and jurisdiction-aware smart contracts from day one.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Asset Marketplace',
        description: 'Access a liquid marketplace where institutional and retail investors can discover, trade, and manage tokenized assets.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
        title: 'Multi-Asset Support',
        description: 'Tokenize and manage any real-world asset — real estate, commodities, art, equity, and more from one dashboard.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-[#15a36e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: 'AI-Powered Insights',
        description: 'Leverage AI-driven analytics for portfolio optimization, risk assessment, and market intelligence across all asset classes.',
    },
];

export default function DownloadFeatures() {
    return (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#15a36e] mb-4">
                        Why CopyM
                    </p>
                    <h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black uppercase"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        The Complete{' '}
                        <span className="text-[#15a36e]">Platform</span>
                    </h2>
                    <p
                        className="text-sm sm:text-base text-black/60 max-w-2xl mx-auto mt-4"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        Everything you need to tokenize, manage, and trade real-world assets — all in one place.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(251,251,251,1), rgba(240,240,240,1))',
                                border: '1px solid rgba(0,0,0,0.03)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            }}
                        >
                            <div className="w-12 h-12 bg-[#15a36e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#15a36e]/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3
                                className="text-base sm:text-lg font-bold text-black mb-2"
                                style={{ fontFamily: 'Palanquin, sans-serif' }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                className="text-sm text-black/60 leading-relaxed"
                                style={{ fontFamily: 'Palanquin, sans-serif' }}
                            >
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
