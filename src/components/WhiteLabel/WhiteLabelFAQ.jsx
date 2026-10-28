"use client";
import React, { useState } from 'react';
import { generateFAQSchema } from '@/utils/seo';

export const whiteLabelFaqs = [
  {
    question: "Can we use our own brand and domain?",
    answer: "Yes. The admin console and investor portal run on your domain with your branding."
  },
  {
    question: "Do we need our own licence?",
    answer: "Usually, yes: offering tokenized assets to investors is regulated in most jurisdictions. CopyM provides the technology; licences and approvals stay with you and your partners."
  },
  {
    question: "Which custody models are supported?",
    answer: "MPC self-custody, or integration with an institutional custodian."
  },
  {
    question: "Can we start with one asset class?",
    answer: "Yes. Modules and rules are configured per programme, so you can start with one asset type and add others later."
  },
  {
    question: "Are the smart contracts audited?",
    answer: "An independent smart-contract audit can be included in the deployment."
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

export default function WhiteLabelFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqSchema = generateFAQSchema(whiteLabelFaqs);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white text-black">
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
              Frequently Asked <span className="text-[#15a36e]">Questions</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Everything you need to know about our white-label platform and integration models.
          </p>
        </div>

        {/* FAQs */}
        <div className="divide-y divide-gray-200">
          {whiteLabelFaqs.map((faq, idx) => (
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
