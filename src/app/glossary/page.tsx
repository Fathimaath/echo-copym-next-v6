import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';
import { glossaryTerms } from '@/data/glossaryTerms';
import GlossaryClient from '@/components/Glossary/GlossaryClient';

// Static SEO metadata for the Glossary page
export const metadata: Metadata = {
  title: 'Glossary | CopyM',
  description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
  alternates: {
    canonical: 'https://copym.xyz/glossary/',
  },
  openGraph: {
    title: 'Glossary | CopyM',
    description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
    url: 'https://copym.xyz/glossary/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Glossary - RWA Tokenization Terms & Definitions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossary | CopyM',
    description: 'Comprehensive glossary of terms related to real-world asset tokenization, blockchain, DeFi, and digital assets.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default async function GlossaryPage() {
  const schemaData = generateWebPageSchema({
    name: 'Glossary | CopyM',
    description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
    url: 'https://copym.xyz/glossary/',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Glossary', path: '/glossary' }
  ]);

  return (
    <div className="glossary-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <GlossaryClient initialTerms={glossaryTerms} initialLetter={null} />
      </Suspense>
    </div>
  );
}
