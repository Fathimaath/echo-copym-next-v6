"use client";
import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import Link from "next/link";

export default function FinalCTA() {
  const analyticsFeatures = [
    'ROI Tracking & Performance Analytics',
    'SEC Compliance & Tax Reporting',
    'Investor Behavior & Demographics',
    'Market Trends & Competitive Analysis'
  ];

  return (
    <section className="relative pb-8 sm:pb-12 md:pb-16 lg:pb-20 pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent rounded-t-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Column: Analytics Features */}


          {/* Right Column: Final CTA */}

        </div>
      </div>
    </section>
  );
}
