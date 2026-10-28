import React from 'react';
import Link from 'next/link';

export default function MarketplaceDisclaimer() {
  return (
    <section className="bg-[#f8fafc] border-t border-gray-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div
          className="max-w-5xl mx-auto text-left text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal space-y-2.5"
          style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
        >
          <p className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">
            Regulatory & Platform Disclaimer
          </p>
          <p>
            CopyM is not a registered broker-dealer, funding portal, underwriter, investment bank, investment adviser, or investment manager. CopyM does not provide brokerage services, investment banking services, underwriting services, investment recommendations, or investment advice to any person. CopyM does not participate in the negotiation or execution of secondary market transactions for the purchase or sale of securities. CopyM does not, at any time, have possession or control of investor funds or securities in connection with such transactions.
          </p>
          <p>
            CopyM operates as a technology platform focused on distributed ledger technology to improve efficiency, accessibility, and transparency in financial technologies. All activities are subject to applicable regulatory requirements and eligibility rules. Please review our{' '}
            <Link
              href="/terms-of-services"
              className="text-[#15a36e] font-semibold underline hover:text-[#108358] transition-colors"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
