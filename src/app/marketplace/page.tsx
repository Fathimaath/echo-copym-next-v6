import type { Metadata } from 'next';
import MarketplaceContent from '@/components/Marketplace/MarketplaceContent';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Tokenized Asset Marketplace | Copym',
  description: 'Browse and invest in tokenized real-world assets on Copym\'s regulated marketplace.',
  alternates: {
    canonical: 'https://copym.xyz/marketplace',
  },
  openGraph: {
    title: 'Tokenized Asset Marketplace | Copym',
    description: 'Browse and invest in tokenized real-world assets on Copym\'s regulated marketplace.',
    url: 'https://copym.xyz/marketplace',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Tokenized Asset Marketplace | Copym',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokenized Asset Marketplace | Copym',
    description: 'Browse and invest in tokenized real-world assets on Copym\'s regulated marketplace.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function MarketplacePage() {
  const schemaData = generateWebPageSchema({
    name: 'Tokenized Asset Marketplace | Copym',
    description: "Browse and invest in tokenized real-world assets on Copym's regulated marketplace.",
    url: 'https://copym.xyz/marketplace',
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
