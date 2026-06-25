import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

const TokenizationContent = dynamic(() => import('@/components/TokenizationHub/TokenizationContent'));

export const metadata: Metadata = {
  title: 'Asset Tokenization Platform | Copym',
  description: 'Issue and manage compliant tokens backed by real estate, commodities, and more.',
  alternates: {
    canonical: 'https://copym.xyz/tokenization/',
  },
  openGraph: {
    title: 'Asset Tokenization Platform | Copym',
    description: 'Issue and manage compliant tokens backed by real estate, commodities, and more.',
    url: 'https://copym.xyz/tokenization/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Asset Tokenization Platform | Copym',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asset Tokenization Platform | Copym',
    description: 'Issue and manage compliant tokens backed by real estate, commodities, and more.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function TokenizationPage() {
  const schemaData = generateWebPageSchema({
    name: 'Asset Tokenization Platform | Copym',
    description: 'Issue and manage compliant tokens backed by real estate, commodities, and more.',
    url: 'https://copym.xyz/tokenization/',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <TokenizationContent />
    </>
  );
}
