import React from 'react';
import { FiCheck } from 'react-icons/fi';

/**
 * ChecklistBlock Component
 * Styled checklist for steps/requirements
 */
export default function ChecklistBlock({ items = [] }) {
  return (
    <div className="my-8 bg-gray-50 rounded-xl p-5 border border-black/5">
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#15a36e] flex items-center justify-center mt-0.5">
              <FiCheck className="w-3 h-3 text-white" />
            </div>
            <span 
              className="text-sm sm:text-base text-gray-800 leading-relaxed"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
