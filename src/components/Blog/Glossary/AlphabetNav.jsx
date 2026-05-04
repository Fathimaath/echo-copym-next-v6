"use client";
import React from 'react';

/**
 * AlphabetNav Component
 * A-Z navigation for glossary index
 * Scrollable on mobile, full row on desktop
 */
export default function AlphabetNav({ selectedLetter, onSelectLetter }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelectLetter(letter)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-bold transition-all duration-300 ${
            selectedLetter === letter
              ? 'bg-[#15a36e] text-white shadow-md shadow-[#15a36e]/20'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
