import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

/**
 * DisclaimerBlock Component
 * Legal/financial disclaimer for articles
 */
export default function DisclaimerBlock({
  title = "Disclaimer",
  children
}) {
  return (
    <div className="my-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <FiAlertCircle className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <h4
            className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            {title}
          </h4>
          <div
            className="text-xs sm:text-sm text-gray-600 leading-relaxed"
            style={{ fontFamily: 'Palanquin, sans-serif' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
