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
            question: "What is Zero Gas and how does it work?",
            answer: "Zero Gas is CopyM's innovative gasless transaction technology that eliminates the need for users to hold native blockchain tokens for transaction fees. We sponsor gas fees on behalf of users, making blockchain interactions as simple as traditional web applications."
        },
        {
            question: "Do I need to hold cryptocurrency to use Zero Gas?",
            answer: "No, you don't need to hold any cryptocurrency for gas fees. Zero Gas allows you to interact with blockchain applications using just your email or social login. All transaction fees are handled automatically in the background."
        },
        {
            question: "Is Zero Gas secure?",
            answer: "Absolutely. Zero Gas uses industry-standard meta-transaction protocols and secure relayers to process transactions. Your assets and private keys remain under your control at all times, while we handle the gas fee sponsorship securely."
        },
        {
            question: "Which blockchains support Zero Gas?",
            answer: "Zero Gas currently supports major EVM-compatible chains including Ethereum, Polygon, BSC, and Arbitrum. We're continuously expanding support to additional networks based on user demand and ecosystem growth."
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
