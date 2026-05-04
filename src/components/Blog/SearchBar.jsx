"use client";
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

/**
 * SearchBar Component
 * Search input for blog/glossary
 */
export default function SearchBar({ 
  placeholder = "Search...", 
  onSearch,
  initialValue = "" 
}) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-3 pl-12 rounded-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#15a36e] focus:ring-2 focus:ring-[#15a36e]/20 transition-all"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      />
      <button
        type="submit"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#15a36e] transition-colors"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </form>
  );
}
