import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/utils/seo';
import WhiteLabelHero from '@/components/WhiteLabel/WhiteLabelHero';
import WhoItsFor from '@/components/WhiteLabel/WhoItsFor';
import WhatsIncluded from '@/components/WhiteLabel/WhatsIncluded';
import YourBrandYourRules from '@/components/WhiteLabel/YourBrandYourRules';
import HowDeploymentWorks from '@/components/WhiteLabel/HowDeploymentWorks';
import WhoDoesWhat from '@/components/WhiteLabel/WhoDoesWhat';
import ArchitectureOverview from '@/components/WhiteLabel/ArchitectureOverview';
import SupportedNetworks from '@/components/WhiteLabel/SupportedNetworks';
import PricingSection from '@/components/WhiteLabel/PricingSection';
import WhiteLabelFAQ from '@/components/WhiteLabel/WhiteLabelFAQ';
import WhiteLabelCTA from '@/components/WhiteLabel/WhiteLabelCTA';

export const metadata: Metadata = {
  title: 'White-Label Tokenization Platform | CopyM',
  description: 'Launch a branded tokenization platform with CopyM: issuance, investor onboarding, custody integration and reporting — built for institutions and their licensed partners.',
  alternates: {
    canonical: 'https://copym.xyz/white-label/',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'White-Label Tokenization Platform | CopyM',
    description: 'Launch a branded tokenization platform with CopyM: issuance, investor onboarding, custody integration and reporting — built for institutions and their licensed partners.',
    url: 'https://copym.xyz/white-label/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/og/og-white-label.png',
        width: 1200,
        height: 630,
        alt: 'White-Label Tokenization Platform | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White-Label Tokenization Platform | CopyM',
    description: 'Launch a branded tokenization platform with CopyM: issuance, investor onboarding, custody integration and reporting — built for institutions and their licensed partners.',
    images: ['https://copym.xyz/assets/og/og-white-label.png'],
  },
};

export default function WhiteLabelPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'White-Label Tokenization Platform',
    serviceType: 'Financial Technology Infrastructure',
    description: 'Turnkey white-label tokenization platform for banks, wealth platforms, and asset managers to issue, onboard, and manage tokenized real-world assets under their own brand.',
    provider: {
      '@type': 'Organization',
      name: 'CopyM Limited',
      url: 'https://copym.xyz',
    },
    url: 'https://copym.xyz/white-label/',
    areaServed: 'Global',
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'White-Label Platform', path: '/white-label' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-black">
        {/* 1. Hero */}
        <WhiteLabelHero />

        {/* 2. Who it's for */}
        <WhoItsFor />

        {/* 3. What's included */}
        <WhatsIncluded />

        {/* 4. Your brand, your rules */}
        <YourBrandYourRules />

        {/* 5. How deployment works */}
        <HowDeploymentWorks />

        {/* 6. Who does what */}
        <WhoDoesWhat />

        {/* 7. Architecture at a glance */}
        <ArchitectureOverview />

        {/* 8. Supported networks */}
        <SupportedNetworks />

        {/* 9. Pricing */}
        <PricingSection />

        {/* 10. FAQ */}
        <WhiteLabelFAQ />

        {/* 11. Closing call to action */}
        <WhiteLabelCTA />
      </main>
    </>
  );
}
