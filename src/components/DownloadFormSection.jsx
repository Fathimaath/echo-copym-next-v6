"use client";
import React from 'react';
import SignupForm from './SignupForm';
import { motion } from 'framer-motion';
import { Rocket, Bell, Gem, MessageSquareText, Sparkles } from 'lucide-react';

const reasons = [
    { icon: Rocket, title: 'Tailored Walkthrough', desc: 'Tour the admin console, asset issuance workflows, and investor eligibility configuration.' },
    { icon: Sparkles, title: 'Asset Structuring', desc: 'Discuss your specific asset class, token economics, and jurisdictional requirements with our team.' },
    { icon: Gem, title: 'White-Label Solutions', desc: 'Explore how you can run the issuance and management platform fully under your own brand.' },
    { icon: Bell, title: 'Custody & Compliance', desc: 'Review integration with regulated custodians, KYC/AML partners, and transfer rules.' },
    { icon: MessageSquareText, title: 'Direct Expert Q&A', desc: 'Get clear answers to technical, commercial, and operational questions from platform specialists.' },
];

export default function DownloadFormSection() {
    return (
        <section className="w-full bg-white relative overflow-hidden py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-16 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black uppercase mb-2"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            Book a{' '}
                            <span className="text-[#15a36e]">Demo</span>
                        </h2>
                        <p
                            className="text-sm text-black/60 mb-8"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            Fill in your details to schedule a platform walkthrough with our team
                        </p>
                        <SignupForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full flex flex-col lg:col-span-1"
                    >
                        <h3
                            className="text-sm font-bold text-black uppercase mb-2"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            What to <span className="text-[#15a36e]">Expect</span>
                        </h3>
                        <p
                            className="text-xs text-black/60 mb-6"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            In your personalized 30-minute walkthrough
                        </p>
                        <div className="relative flex-1 pb-4">
                            <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#15a36e] to-[#15a36e]/20" />
                            <ul className="space-y-5">
                                {reasons.map(({ icon: Icon, title, desc }, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="relative z-10 w-6 h-6 bg-white border-2 border-[#15a36e] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon className="w-3 h-3 text-[#15a36e]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-black" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                                {title}
                                            </p>
                                            <p className="text-xs text-black/50" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                                {desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* What Happens Next Section */}
                <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-100">
                    <div className="text-center mb-10 sm:mb-12">
                        <h3
                            className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            What happens <span className="text-[#15a36e]">next</span>
                        </h3>
                        <p
                            className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            Three clear steps from your initial request to deployment scoping
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Step 1 */}
                        <div className="bg-gray-50/80 rounded-2xl p-6 sm:p-7 border border-gray-100 relative transition-transform duration-300 hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-full bg-[#15a36e] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                    1
                                </span>
                                <span className="text-xs font-semibold text-[#15a36e] uppercase tracking-wider">Step 01</span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-black mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                1. We review your project
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                Our team analyzes your asset type, target investor profile, and jurisdiction to tailor the discussion.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gray-50/80 rounded-2xl p-6 sm:p-7 border border-gray-100 relative transition-transform duration-300 hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-full bg-[#15a36e] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                    2
                                </span>
                                <span className="text-xs font-semibold text-[#15a36e] uppercase tracking-wider">Step 02</span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-black mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                2. A 30-minute platform walkthrough
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                Live guided tour through the admin console, asset issuance workflows, investor eligibility, and transfer controls.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gray-50/80 rounded-2xl p-6 sm:p-7 border border-gray-100 relative transition-transform duration-300 hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-full bg-[#15a36e] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                    3
                                </span>
                                <span className="text-xs font-semibold text-[#15a36e] uppercase tracking-wider">Step 03</span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-black mb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                3. Scoping for your use case
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                We align on white-label branding, custody integration, smart contract parameters, and project timelines.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
