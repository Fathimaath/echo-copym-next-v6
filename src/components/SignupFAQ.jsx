"use client";
import React, { useState } from 'react';
import { generateFAQSchema } from '@/utils/seo';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="transition-all duration-300 border-b border-black/10" style={{ overflow: 'hidden' }}>
      <button onClick={onToggle} className="w-full text-left flex justify-between items-start py-4 sm:py-5 group">
        <h3 className="pr-4 flex-1" style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 600, color: '#000', textAlign: 'left', fontFamily: 'Palanquin, sans-serif' }}>
          {question}
        </h3>
        <div className="flex-shrink-0 pt-1 transition-transform duration-300">
          {isOpen ? (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10L12 0H0L6 10Z" fill="black" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6L0 0V12L10 6Z" fill="black" />
            </svg>
          )}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', color: '#000', textAlign: 'left', lineHeight: '1.6', fontFamily: 'Palanquin, sans-serif' }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function SignupFAQ() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What is CopyM and how does it work?",
      answer: "CopyM provides technology infrastructure for tokenizing real-world assets: issuance, investor onboarding and eligibility workflows, custody integration, lifecycle management and reporting — including under a client’s own brand. Regulated activities are carried out by licensed partners where legally permitted."
    },
    {
      question: "When will the CopyM platform launch?",
      answer: "The CopyM platform infrastructure is currently live for pilot issuance, partner integrations and live walkthroughs. We are actively onboarding asset issuers, institutional platforms, and infrastructure partners. Book a demo to see the platform in action and discuss your project timeline."
    },
    {
      question: "Which assets can be tokenized on the platform?",
      answer: "Real estate, commodities such as gold, carbon credits, fine art and collectibles, and private credit structures. What can be offered, and to whom, depends on the jurisdiction and the licences held by the issuer and its partners."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="text-center mb-10">
          <div className="relative w-fit mx-auto mb-3 sm:mb-4">
            <h2 className="inline-flex items-baseline gap-1 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-[#15a36e] uppercase">FAQ'</span><span className="text-black">s</span>
            </h2>
          </div>
        </div>

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
      </div>
    </section>
  );
}
