"use client";
import React from 'react';
import Link from "next/link";
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumbs Component
 * Shows navigation hierarchy to help users understand their location
 * Example: Home > Blog > Education > Article Title
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center flex-wrap gap-1 text-xs sm:text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.path || index}>
            {/* Separator */}
            {index > 0 && (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
            )}

            {isLast ? (
              <span className="text-gray-500 font-medium truncate max-w-[150px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.path}
                className="text-[#15a36e] hover:text-[#128a5c] transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
