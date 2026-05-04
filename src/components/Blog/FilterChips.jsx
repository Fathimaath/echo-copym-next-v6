"use client";
import React from 'react';
import { useRouter } from "next/navigation";

/**
 * FilterChips Component
 * Category filter buttons/tabs for blog listing
 * Horizontal scrollable on mobile, full row on desktop
 * Glossary chip navigates to glossary page
 */
export default function FilterChips({
  categories = [],
  selectedCategory,
  onSelectCategory
}) {
  const navigate = useRouter();

  const handleCategoryClick = (category) => {
    if (category === 'Glossary') {
      // Navigate to glossary page
      navigate('/glossary');
    } else {
      // Filter blog posts
      onSelectCategory(category);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-black text-white shadow-lg shadow-black/20'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          style={{ fontFamily: 'Palanquin, sans-serif' }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
