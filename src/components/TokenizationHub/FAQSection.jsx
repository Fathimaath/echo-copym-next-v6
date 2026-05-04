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
      question: "How does the tokenization process work on CopyM?",
      answer: "CopyM's tokenization process involves four key steps: Asset Onboarding (legal structuring and documentation), Smart Contract Deployment (creating secure blockchain tokens), Compliance Verification (KYC/AML and regulatory checks), and Token Distribution (issuing fractional entitlemententent to investors). The entire process is streamlined and typically takes 2-4 weeks."
    },
    {
      question: "What types of assets can be tokenized on the platform?",
      answer: "CopyM supports tokenization of diverse real-world assets including real estate properties, debt instruments, commodities (gold, silver, oil), art and collectibles, infrastructure projects, and carbon credits. Each asset class is legally structured and compliant with relevant regulations."
    },
    {
      question: "How does CopyM ensure regulatory compliance for tokenized assets?",
      answer: "We work with legal partners to ensure all tokenized assets comply with securities regulations, implement robust KYC/AML procedures for all participants, maintain proper custody arrangements through regulated partners, and provide transparent on-chain documentation. All offerings are structured to meet local and international compliance requirements."
    },
    {
      question: "What token management features does CopyM provide?",
      answer: "CopyM offers comprehensive token management including real-time portfolio tracking, automated dividend and yield distribution, secondary market trading capabilities, transparent entitlemententent records on blockchain, and detailed reporting for tax and compliance purposes. Asset owners can monitor and manage their tokenized assets through an intuitive dashboard."
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
              className="inline-flex items-baseline gap-1 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold pb-1 uppercase"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span className="text-[#15a36e]">FAQ'</span><span className="text-black">s</span>
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
