import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

const MarketplaceContent = dynamic(() => import('@/components/Marketplace/MarketplaceContent'));

export const metadata: Metadata = {
  title: 'Marketplace Module | CopyM',
  description: 'Permissioned marketplace infrastructure that licensed operators can run under their own brand, with eligibility checks and transfer rules built in.',
  alternates: {
    canonical: 'https://copym.xyz/marketplace/',
  },
  openGraph: {
    title: 'Marketplace Module | CopyM',
    description: 'Permissioned marketplace infrastructure that licensed operators can run under their own brand, with eligibility checks and transfer rules built in.',
    url: 'https://copym.xyz/marketplace/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Marketplace Module | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Module | CopyM',
    description: 'Permissioned marketplace infrastructure that licensed operators can run under their own brand, with eligibility checks and transfer rules built in.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function MarketplacePage() {
  const schemaData = generateWebPageSchema({
    name: 'Marketplace Module | CopyM',
    description: 'Permissioned marketplace infrastructure that licensed operators can run under their own brand, with eligibility checks and transfer rules built in.',
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
