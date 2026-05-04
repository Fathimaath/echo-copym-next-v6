"use client";
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { generateFAQSchema } from "@/utils/seo";

/**
 * FAQAccordion Component
 * Expandable Q&A section for articles
 * Supports SEO-friendly FAQ schema
 */
export default function FAQAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <h3 
        className="text-xl font-bold text-black mb-6"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        Frequently Asked Questions
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl border border-black/5 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-100 transition-colors"
            >
              <span 
                className="text-sm sm:text-base font-semibold text-black pr-4"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                {faq.question}
              </span>
              <FiChevronDown 
                className={`w-5 h-5 text-[#15a36e] flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p 
                className="px-5 pb-4 text-sm sm:text-base text-gray-700 leading-relaxed"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
