"use client";
import React, { useState } from 'react';
import { generateFAQSchema } from '@/utils/seo';

export const securityFaqs = [
  {
    question: "Does CopyM hold investor funds or assets?",
    answer: "No. CopyM is purely a technology infrastructure provider. We never take possession, custody, or control of investor funds or securities. Custody is handled exclusively by regulated institutional custodians or client-managed MPC self-custody systems."
  },
  {
    question: "Who performs KYC and investor verification?",
    answer: "Automated identity, sanctions, and AML checks run through integrated certified providers. Final compliance verification, onboarding approval, and investor classification remain under the governance of the issuer and its licensed partners."
  },
  {
    question: "How are transfer restrictions enforced?",
    answer: "Transfer restrictions are enforced directly on-chain at the smart contract level using the ERC-3643 standard. Every transaction checks the permission registry; unverified or ineligible wallets are automatically rejected by the contract code."
  },
  {
    question: "Can an independent smart contract audit be included in deployment?",
    answer: "Yes. An independent third-party smart contract audit from a reputable blockchain security firm can be commissioned and included as part of any enterprise white-label deployment."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left flex justify-between items-start py-5 sm:py-6 group cursor-pointer"
      >
        <h3
          className="pr-4 flex-1 text-base sm:text-lg md:text-xl font-bold text-black"
          style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
        >
          {question}
        </h3>
        <div className="flex-shrink-0 pt-1 transition-transform duration-300">
          <svg
            className={`w-5 h-5 text-[#15a36e] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p
          className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal"
          style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function SecurityFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqSchema = generateFAQSchema(securityFaqs);

  return (
    <section className="py-16 sm:py-20 bg-white text-black">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Security &amp; Compliance <span className="text-[#15a36e]">FAQ</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Common questions from compliance and due-diligence teams.
          </p>
        </div>

        {/* FAQs */}
        <div className="divide-y divide-gray-200">
          {securityFaqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
