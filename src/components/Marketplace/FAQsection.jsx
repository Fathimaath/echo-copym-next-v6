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

export default function FAQsection() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "How do I start investing on the marketplace?",
      answer: "Create an account, complete KYC in minutes, connect a wallet (or use custodial onboarding), and browse assets. Each listing shows minimum entitlement, risk band, and expected ROI."
    },
    {
      question: "What currencies and wallets are supported?",
      answer: "We support USDC on major chains and popular wallets like MetaMask and WalletConnect. Custodial wallets are available for beginners—fund with card or bank transfer."
    },
    {
      question: "Are these assets really backed by real-world value?",
      answer: "Yes. All listings are legally structured and backed by off-chain asset documentation. Title, custody and cash flows are handled by regulated partners with on-chain proofs where available."
    },
    {
      question: "Can I sell my position later?",
      answer: "Many offerings enable secondary trading during open windows. Liquidity varies by asset class. Check each listing's 'Liquidity & Exit' section for specific rules and timelines."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <section className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-8 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="relative w-fit mx-auto mb-3 sm:mb-4">
            <h2
              className="inline-flex items-baseline gap-1 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold pb-1 !mb-0"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
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
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-[34px] py-[10px] font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base border-2 border-emerald-500 bg-[#1ab87d] text-white rounded-full"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}


