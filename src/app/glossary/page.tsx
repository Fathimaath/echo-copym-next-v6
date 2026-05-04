import { Metadata } from 'next';
import React, { Suspense } from 'react';
import GlossaryClient from '@/components/Glossary/GlossaryClient';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

// Static SEO metadata for the Glossary page
export const metadata: Metadata = {
  title: 'Glossary | CopyM',
  description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
  alternates: {
    canonical: 'https://copym.xyz/glossary',
  },
  openGraph: {
    title: 'Glossary | CopyM',
    description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
    url: 'https://copym.xyz/glossary',
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

import { glossaryTerms } from '@/data/glossaryTerms';

export default async function GlossaryPage({ searchParams }: { searchParams: Promise<{ letter?: string }> }) {
  const resolvedParams = await searchParams;
  const initialLetter = resolvedParams.letter || 'A';

  const schemaData = generateWebPageSchema({
    name: 'Glossary | CopyM',
    description: 'Comprehensive glossary of terms related to real-world asset (RWA) tokenization, blockchain, DeFi, and digital assets.',
    url: 'https://copym.xyz/glossary',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Glossary', path: '/glossary' }
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
      {/* Remove outer Suspense to force server rendering of the main term list */}
      <GlossaryClient initialTerms={glossaryTerms} initialLetter={initialLetter} />
    </>
  );
}
