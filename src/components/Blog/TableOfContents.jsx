"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * TableOfContents Component
 * Sticky navigation for long articles
 * Collapsible on mobile, sticky on desktop
 */
export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-170px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -170;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden mb-6">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold text-sm"
        style={{ fontFamily: 'Palanquin, sans-serif' }}
      >
        <span>Table of Contents</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile Dropdown */}
      <div className={`${isOpen ? 'block' : 'hidden'} mt-3`}>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <nav className="space-y-2">
            {headings.map(({ id, title, level }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block text-sm transition-colors ${
                  activeId === id
                    ? 'text-[#15a36e] font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } ${level === 3 ? 'pl-4' : ''}`}
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
