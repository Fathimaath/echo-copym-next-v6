import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

const MarketplaceContent = dynamic(() => import('@/components/Marketplace/MarketplaceContent'));

export const metadata: Metadata = {
  title: 'Tokenized Asset Marketplace | CopyM',
  description: 'Browse and invest in tokenized real-world assets on CopyM\'s compliance-aware marketplace.',
  alternates: {
    canonical: 'https://copym.xyz/marketplace/',
  },
  openGraph: {
    title: 'Tokenized Asset Marketplace | CopyM',
    description: 'Browse and invest in tokenized real-world assets on CopyM\'s compliance-aware marketplace.',
    url: 'https://copym.xyz/marketplace/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Tokenized Asset Marketplace | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokenized Asset Marketplace | CopyM',
    description: 'Browse and invest in tokenized real-world assets on CopyM\'s compliance-aware marketplace.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function MarketplacePage() {
  const schemaData = generateWebPageSchema({
    name: 'Tokenized Asset Marketplace | CopyM',
    description: "Browse and invest in tokenized real-world assets on CopyM's compliance-aware marketplace.",
    url: 'https://copym.xyz/marketplace/',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Marketplace', path: '/marketplace' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <MarketplaceContent />
    </>
  );
}
