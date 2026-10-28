import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/utils/seo';
import SecurityHero from '@/components/SecurityCompliance/SecurityHero';
import OurRole from '@/components/SecurityCompliance/OurRole';
import ComplianceWorkflows from '@/components/SecurityCompliance/ComplianceWorkflows';
import SecurityArchitecture from '@/components/SecurityCompliance/SecurityArchitecture';
import DataProtectionAndDisclosure from '@/components/SecurityCompliance/DataProtection';
import SecurityFAQ from '@/components/SecurityCompliance/SecurityFAQ';
import SecurityCTA from '@/components/SecurityCompliance/SecurityCTA';

export const metadata: Metadata = {
  title: 'Security & Compliance | CopyM',
  description: 'How CopyM’s tokenization infrastructure handles identity checks, transfer restrictions, custody integration and data protection — and where licensed partners take over.',
  alternates: {
    canonical: 'https://copym.xyz/security-compliance/',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Security & Compliance | CopyM',
    description: 'How CopyM’s tokenization infrastructure handles identity checks, transfer restrictions, custody integration and data protection — and where licensed partners take over.',
    url: 'https://copym.xyz/security-compliance/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/og/og-security-compliance.png',
        width: 1200,
        height: 630,
        alt: 'Security & Compliance | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Compliance | CopyM',
    description: 'How CopyM’s tokenization infrastructure handles identity checks, transfer restrictions, custody integration and data protection — and where licensed partners take over.',
    images: ['https://copym.xyz/assets/og/og-security-compliance.png'],
  },
};

export default function SecurityCompliancePage() {
  const webpageSchema = generateWebPageSchema({
    name: 'Security & Compliance | CopyM',
    description: 'How CopyM’s tokenization infrastructure handles identity checks, transfer restrictions, custody integration and data protection — and where licensed partners take over.',
    url: 'https://copym.xyz/security-compliance/',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Security & Compliance', path: '/security-compliance' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-black">
        {/* 1. Hero */}
        <SecurityHero />

        {/* 2. Our role */}
        <OurRole />

        {/* 3. Compliance workflows */}
        <ComplianceWorkflows />

        {/* 4. Security model */}
        <SecurityArchitecture />

        {/* 6 & 7. Data protection and Responsible disclosure */}
        <DataProtectionAndDisclosure />

        {/* 8. FAQ */}
        <SecurityFAQ />

        {/* 9. Closing call to action */}
        <SecurityCTA />
      </main>
    </>
  );
}
