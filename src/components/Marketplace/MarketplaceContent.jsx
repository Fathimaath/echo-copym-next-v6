"use client";

import React from 'react';
import Hero from './Hero';
import TradableAssets from './TradableAssets';
import WhyItMatters from './WhyItMatters';
import HowItWorks from './HowItWorks';
import FAQsection from './FAQsection';

export default function MarketplaceContent() {
  return (
    <>
      <Hero />
      <TradableAssets />
      <WhyItMatters />
      <HowItWorks />
      <FAQsection />
    </>
  );
}
