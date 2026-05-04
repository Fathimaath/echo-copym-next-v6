"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { generateFAQSchema } from "@/utils/seo";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div
            className="transition-all duration-300 border-b border-black/10"
            style={{
                overflow: 'hidden'
            }}
        >
            <button
                onClick={onToggle}
                className="w-full text-left flex justify-between items-start py-4 sm:py-5 group"
            >
                <h3
                    className="pr-4 flex-1"
                    style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        fontWeight: 600,
                        color: '#000',
                        textAlign: 'left'
                    }}
                >
                    {question}
                </h3>
                <div className="flex-shrink-0 pt-1 transition-transform duration-300">
                    {isOpen ? (
                        <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 10L12 0H0L6 10Z" fill="black" />
                        </svg>
                    ) : (
                        <svg
                            width="10"
                            height="12"
                            viewBox="0 0 10 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 6L0 0V12L10 6Z" fill="black" />
                        </svg>
                    )}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
            >
                <p
                    style={{
                        fontSize: 'clamp(14px, 1.8vw, 18px)',
                        color: '#000',
                        textAlign: 'left',
                        lineHeight: '1.6'
                    }}
                >
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQSection() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const faqs = [
        {
            question: "What is Privacy AI and how does it protect my data?",
            answer: "Privacy AI is CopyM's advanced privacy-preserving technology that uses secure multi-party computation and zero-knowledge proofs to analyze data without exposing sensitive information. Your data remains encrypted and private throughout the entire process."
        },
        {
            question: "How does Privacy AI work with blockchain transactions?",
            answer: "Privacy AI integrates seamlessly with blockchain networks to provide confidential transaction processing. It ensures that transaction details, wallet balances, and user identities remain private while maintaining the integrity and verifiability of the blockchain."
        },
        {
            question: "Is Privacy AI compliant with data protection regulations?",
            answer: "Yes, Privacy AI is designed to be fully compliant with GDPR, CCPA, and other major data protection regulations. It enables you to leverage AI and blockchain technology while maintaining regulatory compliance and user privacy."
        },
        {
            question: "Can I integrate Privacy AI into my existing systems?",
            answer: "Absolutely. Privacy AI offers flexible APIs and SDKs that can be integrated into your existing infrastructure. Our team provides comprehensive documentation and support to ensure smooth integration with minimal disruption to your operations."
        }
    ];

    return (
        <section className="relative py-8 sm:py-10 md:py-14 lg:pt-20 pb-12 sm:pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                {/* Section Header */}
                <div className="text-left mb-2">
                    <div className="relative w-fit mb-3 sm:mb-4">
                        <h2
                            className="inline-flex items-baseline gap-1 text-base sm:text-lg md:text-xl lg:text-4xl font-bold pb-1"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            <span className="text-[#15a36e] uppercase">FAQ'</span><span className="text-black">s</span>
                        </h2>
                    </div>

                </div>

                {/* FAQ List */}
                <div>
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFAQ === index}
                            onToggle={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                        />
                    ))}
                </div>

                {/* Contact Button */}
                <div className="flex justify-center mt-8">
                    <Link
                        href="/about"
                        className="inline-flex items-center justify-center px-[34px] py-[10px] font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base border-2 border-emerald-500 bg-[#1ab87d] text-white rounded-full"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                        Contact Our Team
                    </Link>
                </div>
            </div>
        </section>
    );
}
