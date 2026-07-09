"use client";
import React from 'react';
import SignupForm from './SignupForm';
import { motion } from 'framer-motion';
import { Rocket, Bell, Gem, MessageSquareText, Sparkles } from 'lucide-react';

const reasons = [
    { icon: Rocket, title: 'Priority Access', desc: 'Be among the first when the platform launches. Get early entry and start exploring CopyM before the general public.' },
    { icon: Bell, title: 'Exclusive Updates', desc: 'Receive product announcements before anyone else. Stay informed with insider news and feature previews.' },
    { icon: Gem, title: 'Early Adopter Benefits', desc: 'Get access to special pricing and perks. Enjoy incentives reserved exclusively for our earliest supporters.' },
    { icon: MessageSquareText, title: 'Shape the Roadmap', desc: 'Your feedback helps us build what matters. Influence the features and direction of the platform.' },
    { icon: Sparkles, title: 'First to Tokenize', desc: 'Be the earliest to launch real-world assets on CopyM. Get ahead of the market and establish your presence first.' },
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
                            Get Early{' '}
                            <span className="text-[#15a36e]">Access</span>
                        </h2>
                        <p
                            className="text-sm text-black/60 mb-8"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            Fill in your details to join the waitlist
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
                            Why Join <span className="text-[#15a36e]">Early?</span>
                        </h3>
                        <p
                            className="text-xs text-black/60 mb-6"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            What you&apos;ll get as an early adopter
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
            </div>
        </section>
    );
}
