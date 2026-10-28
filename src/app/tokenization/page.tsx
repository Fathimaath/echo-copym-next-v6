import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateWebPageSchema, generateBreadcrumbSchema, generateServiceSchema } from '@/utils/seo';

const TokenizationContent = dynamic(() => import('@/components/TokenizationHub/TokenizationContent'));

export const metadata: Metadata = {
  title: 'Tokenization Platform | CopyM',
  description: 'CopyM’s tokenization platform helps issuers and institutions issue, onboard and manage tokenized real-world assets with compliance-aware workflows.',
  alternates: {
    canonical: 'https://copym.xyz/tokenization/',
  },
  openGraph: {
    title: 'Tokenization Platform | CopyM',
    description: 'CopyM’s tokenization platform helps issuers and institutions issue, onboard and manage tokenized real-world assets with compliance-aware workflows.',
    url: 'https://copym.xyz/tokenization/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/og/og-tokenization.png',
        width: 1200,
        height: 630,
        alt: 'Tokenization Platform | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokenization Platform | CopyM',
    description: 'CopyM’s tokenization platform helps issuers and institutions issue, onboard and manage tokenized real-world assets with compliance-aware workflows.',
    images: ['https://copym.xyz/assets/og/og-tokenization.png'],
  },
};

export default function TokenizationPage() {
  const schemaData = generateWebPageSchema({
    name: 'Tokenization Platform | CopyM',
    description: 'CopyM’s tokenization platform helps issuers and institutions issue, onboard and manage tokenized real-world assets with compliance-aware workflows.',
    url: 'https://copym.xyz/tokenization/',
  });

  const serviceSchema = generateServiceSchema({
    name: 'CopyM Tokenization Platform',
    serviceType: 'Real-World Asset Tokenization Infrastructure',
    description: 'End-to-end tokenization infrastructure for asset onboarding, smart contract issuance, investor eligibility verification, and secondary transfer controls.',
    url: 'https://copym.xyz/tokenization/',
    providerName: 'CopyM Limited',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Tokenization', path: '/tokenization' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <TokenizationContent />
    </>
  );
}
