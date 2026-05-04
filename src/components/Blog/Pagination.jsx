"use client";
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from "next/link";

/**
 * Pagination Component
 * SEO-friendly visible page navigation for blog listing
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl = '/blog'
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-[#15a36e] hover:text-white'
        }`}
        style={{ fontFamily: 'Palanquin, sans-serif' }}
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                page === currentPage
                  ? 'bg-[#15a36e] text-white shadow-md shadow-[#15a36e]/20'
                  : 'text-gray-700 hover:bg-[#15a36e] hover:text-white'
              }`}
              style={{ fontFamily: 'Palanquin, sans-serif' }}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-[#15a36e] hover:text-white'
        }`}
        style={{ fontFamily: 'Palanquin, sans-serif' }}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
