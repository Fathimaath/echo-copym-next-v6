import React from 'react';
import Hero from './Hero';
import TradableAssets from './TradableAssets';
import WhyItMatters from './WhyItMatters';
import HowItWorks from './HowItWorks';
import FAQsection from './FAQsection';
import MarketplaceDisclaimer from './MarketplaceDisclaimer';

export default function MarketplaceContent() {
  return (
    <>
      <Hero />
      <TradableAssets />
      <WhyItMatters />
      <HowItWorks />
      <FAQsection />
      <MarketplaceDisclaimer />
    </>
  );
}
