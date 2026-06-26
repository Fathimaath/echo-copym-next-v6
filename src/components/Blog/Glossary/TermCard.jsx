import React from 'react';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

/**
 * TermCard Component
 * Displays a glossary term with short definition
 */
export default function TermCard({ term, slug }) {
  return (
    <Link
      href={`/glossary/${slug}`}
      className="block bg-white rounded-xl p-5 border border-black/5 shadow-sm hover:shadow-md hover:border-[#15a36e]/30 transition-all duration-300 group"
    >
      <h4 
        className="text-lg font-bold text-black mb-2 group-hover:text-[#15a36e] transition-colors"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        {term}
      </h4>
      <p 
        className="text-sm text-gray-600 leading-relaxed line-clamp-2"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        {term} is a key concept in blockchain and asset tokenization...
      </p>
      <div className="flex items-center gap-1.5 mt-3 text-[#15a36e] text-sm font-semibold group-hover:gap-2.5 transition-all">
        Learn more
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
