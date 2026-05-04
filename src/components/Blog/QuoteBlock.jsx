import React from 'react';

/**
 * QuoteBlock Component
 * Highlighted quote box for expert statements
 */
export default function QuoteBlock({ 
  quote, 
  author, 
  role,
  variant = 'default' // 'default' | 'bordered'
}) {
  if (variant === 'bordered') {
    return (
      <div className="my-8 pl-6 border-l-4 border-[#15a36e]">
        <p 
          className="text-lg sm:text-xl italic text-gray-800 leading-relaxed mb-3"
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          "{quote}"
        </p>
        {author && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-black">— {author}</span>
            {role && <span className="text-gray-500">, {role}</span>}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="my-8 bg-gradient-to-br from-[#15a36e]/5 to-white rounded-2xl p-6 sm:p-8 border border-[#15a36e]/20">
      <svg className="w-10 h-10 text-[#15a36e]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p 
        className="text-lg sm:text-xl italic text-gray-800 leading-relaxed mb-4"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        "{quote}"
      </p>
      {author && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-black">— {author}</span>
          {role && <span className="text-gray-500">, {role}</span>}
        </p>
      )}
    </div>
  );
}
