import React from 'react';
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

/**
 * CalloutBlock Component
 * Highlighted note/warning/success/info boxes
 */
export default function CalloutBlock({ 
  type = 'info', // 'info' | 'warning' | 'success' | 'note'
  title,
  children 
}) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <FiInfo className="w-5 h-5 text-blue-600" />,
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: <FiAlertTriangle className="w-5 h-5 text-amber-600" />,
      titleColor: 'text-amber-800',
      textColor: 'text-amber-700'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <FiCheckCircle className="w-5 h-5 text-green-600" />,
      titleColor: 'text-green-800',
      textColor: 'text-green-700'
    },
    note: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      icon: <FiAlertCircle className="w-5 h-5 text-gray-600" />,
      titleColor: 'text-gray-800',
      textColor: 'text-gray-700'
    }
  };

  const style = styles[type];

  return (
    <div className={`my-8 ${style.bg} rounded-xl p-5 border ${style.border}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold mb-2 ${style.titleColor}`} style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {title}
            </h4>
          )}
          <div className={`text-sm sm:text-base leading-relaxed ${style.textColor}`} style={{ fontFamily: 'Palanquin, sans-serif' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
