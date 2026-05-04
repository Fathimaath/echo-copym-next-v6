"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { generateFAQSchema } from '@/utils/seo';

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
            textAlign: 'left',
            fontFamily: 'Palanquin, sans-serif'
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
            lineHeight: '1.6',
            fontFamily: 'Palanquin, sans-serif'
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
      question: "What is Copym and how does it work?",
      answer: "Copym is a compliance-first platform designed to structure, tokenize, and manage real-world assets through secure on-chain entitlement frameworks. The platform connects asset owners, investors, and infrastructure partners within a unified system that supports asset structuring, issuance, participation, and lifecycle management. Copym provides the underlying infrastructure and tools. All participation decisions remain with the user."
    },
    {
      question: "What asset classes are available on Copym?",
      answer: "Copym supports structured participation across multiple real-world asset classes, including real estate, precious metals, fine art, carbon credits, and other alternative assets. Each asset listed on Copym follows defined structuring, disclosure, and entitlement frameworks. Availability may vary based on jurisdiction, eligibility, and regulatory requirements."
    },
    {
      question: "How does entitlement work on Copym?",
      answer: "Entitlement on Copym represents a defined set of rights and conditions linked to a specific real-world asset structure. These entitlements are recorded and managed through on-chain smart contracts rather than direct legal ownership of the underlying asset. This approach provides transparency, traceability, and enforceable rules aligned with the asset's structure and documentation."
    },
    {
      question: "How secure is Copym's infrastructure?",
      answer: "Copym operates on pre-audited smart contract infrastructure. All core contracts undergo independent security reviews prior to deployment and are implemented across established blockchain networks. On-chain records provide transparency, while governance controls and deployment standards are designed to prioritize integrity, verification, and controlled execution."
    },
    {
      question: "What are the benefits of using Copym?",
      answer: "Copym provides a structured environment for real-world asset participation, offering: Compliance-first asset structuring and tokenization, Transparent on-chain entitlement and lifecycle visibility, Access to multiple asset classes through a single platform, Pre-audited smart contract infrastructure, Unified experience across web and mobile platforms. Copym focuses on infrastructure, transparency, and control."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <section className="relative py-8 sm:py-10 md:py-14 lg:pt-6 pb-0 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="relative w-fit mx-auto mb-3 sm:mb-4">
            <h2
              className="inline-flex items-baseline gap-1 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold pb-1"
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
        <div className="flex justify-center mt-8">
          <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center relative overflow-hidden">
            {/* Background Pattern - subtle */}
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="#15a36e" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,34.3C59,45.5,47.1,54.2,35.1,61.8C23.1,69.4,11,75.9,-0.6,77.2C-12.2,78.5,-24.7,74.6,-36.4,68.5C-48.1,62.4,-59,54.1,-67.6,43.5C-76.2,32.9,-82.5,20,-83.1,6.8C-83.7,-6.4,-78.6,-19.9,-70.4,-31.4C-62.2,-42.9,-50.9,-52.4,-39.3,-59.3C-27.7,-66.2,-15.8,-70.5,-2.6,-69.5C10.6,-68.5,23.6,-62.2,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-base sm:text-lg md:text-xl text-white mb-5 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Still have questions about structuring, tokenization, or onboarding?
              </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 sm:px-8 sm:py-3 font-bold bg-gradient-to-r from-[#23BD83] to-[#109261] text-white rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all max-w-[280px] sm:max-w-none mx-auto sm:mx-0"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              <span className="text-sm sm:text-base">Speak With Our Team</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#109261]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
