import React from 'react';
import type { Metadata } from 'next';
import SolutionHero from '@/components/Solutions/SolutionHero';
import SolutionChallenge from '@/components/Solutions/SolutionChallenge';
import SolutionWorkflow from '@/components/Solutions/SolutionWorkflow';
import WhatCanBeTokenized from '@/components/Solutions/WhatCanBeTokenized';
import WhoDoesWhat from '@/components/Solutions/WhoDoesWhat';
import WhoItsFor from '@/components/Solutions/WhoItsFor';
import RelatedReading from '@/components/Solutions/RelatedReading';
import SolutionFAQ from '@/components/Solutions/SolutionFAQ';
import SolutionCTA from '@/components/Solutions/SolutionCTA';
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: 'Carbon Credit Tokenization Platform | CopyM',
  description:
    'Tokenize carbon credits with CopyM: registry serial-number mapping, retirement tracking and ESG reporting on compliance-aware infrastructure.',
  alternates: {
    canonical: 'https://copym.xyz/solutions/carbon-credits/',
  },
  openGraph: {
    title: 'Carbon Credit Tokenization Platform | CopyM',
    description:
      'Tokenize carbon credits with CopyM: registry serial-number mapping, retirement tracking and ESG reporting on compliance-aware infrastructure.',
    url: 'https://copym.xyz/solutions/carbon-credits/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/og/og-solutions-carbon-credits.png',
        width: 1200,
        height: 630,
        alt: 'Carbon Credit Tokenization Platform | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carbon Credit Tokenization Platform | CopyM',
    description:
      'Tokenize carbon credits with CopyM: registry serial-number mapping, retirement tracking and ESG reporting on compliance-aware infrastructure.',
    images: ['https://copym.xyz/assets/og/og-solutions-carbon-credits.png'],
  },
};

const CHALLENGE_CARDS = [
  {
    iconType: 'doubleCount',
    title: 'Double-counting risk between registry and trading records',
    description:
      'Without direct serial-number mapping, credits risk being pledged or claimed multiple times across disjointed trading venues, OTC desks, and corporate disclosures.',
    impact: 'Integrity concerns & greenwashing allegations',
  },
  {
    iconType: 'fragmented',
    title: 'Project data spread across PDFs, registries and spreadsheets',
    description:
      'Audit reports, verification sign-offs, and issuance certificates are fragmented across multiple portals, making it cumbersome for institutional buyers to audit.',
    impact: 'Extended due diligence & verification delays',
  },
  {
    iconType: 'opaque',
    title: 'Hard for buyers to check vintage, methodology and retirement status',
    description:
      'Corporate sustainability officers face extreme opacity verifying whether credits correspond to active, verified, and unretired registry serial numbers.',
    impact: 'Hesitant buyers & discounted secondary pricing',
  },
];

const WORKFLOW_STEPS = [
  {
    title: 'Map credits to registry serial numbers',
    description:
      'Issued credits held in an active registry account are immutably tied to their verified serial-number ranges on the CopyM platform.',
    tag: '1:1 Serial Mapping',
  },
  {
    title: 'Issue permissioned tokens carrying project data',
    description:
      'Smart contracts mint permissioned tokens embedding project ID, vintage, methodology, country, and quality attributes on-chain.',
    tag: 'Metadata Embedded',
  },
  {
    title: 'Onboard buyers through KYC/KYB checks',
    description:
      'Corporate and institutional buyers undergo rigorous compliance screening before receiving authorization to hold or trade tokens.',
    tag: 'KYC/KYB Verification',
  },
  {
    title: 'Track transfers & retirements for ESG reporting',
    description:
      'Monitor secondary transfers between whitelisted entities, execute on-chain retirements, and export audit-ready ESG sustainability reports.',
    tag: 'Audit-Ready Reporting',
  },
];

const TOKENIZABLE_INSTRUMENTS = [
  {
    badge: 'Avoidance & Removal',
    title: 'Active registry credits',
    description:
      'Issued carbon credits still active in an authorized registry account. Covering both nature-based (afforestation, blue carbon) and technology-based (direct air capture, biochar) projects.',
    features: [
      'Nature-based avoidance and removal projects',
      'Engineered carbon dioxide removal (CDR)',
      'Clean cookstoves and renewable energy offsets',
    ],
    footerNote: 'Only active, unretired registry credits are eligible for tokenization.',
  },
  {
    badge: 'On-Chain Metadata',
    title: 'Granular asset attributes',
    description:
      'Every token carries comprehensive cryptographic attributes directly in its contract metadata for complete transparency.',
    features: [
      'Designated registry name and project ID',
      'Exact serial-number range mapping',
      'Vintage year, methodology code, and country of origin',
    ],
    footerNote: 'All project data is immutable and verifiable against registry records.',
  },
  {
    badge: 'Integrity Rating',
    title: 'Quality & benchmark labels',
    description:
      'Where applicable, tokens record independent quality certifications and integrity benchmark labels.',
    features: [
      'Verified vintage and methodology credentials',
      'Audited project verification documentation',
      'Third-party validation status reports',
    ],
    footerNote: 'Enables tier-based corporate procurement policies.',
  },
];

const WHO_DOES_WHAT_COLUMNS = [
  {
    roleSubtitle: 'Technology Provider',
    title: 'CopyM',
    summary:
      'Provides the digital infrastructure for serial-number mapping, permissioned tokens, transfer controls, retirement tracking, and ESG reporting.',
    responsibilities: [
      'Cryptographic serial-number mapping and token minting',
      'ERC-3643 transfer rules and buyer whitelist enforcement',
      'Automated on-chain retirement and token burn logic',
      'ESG disclosure reports and audit trail generation',
      'API integration with corporate reporting consoles',
    ],
    isHighlight: true,
    iconType: 'copym',
  },
  {
    roleSubtitle: 'Standards & Verification',
    title: 'Registries & Developers',
    summary:
      'Perform project validation, methodology accreditation, credit issuance, and official registry retirement.',
    responsibilities: [
      'Project design, implementation, and carbon accounting',
      'Third-party validation and verification body (VVB) audits',
      'Credit issuance and account maintenance on official registry',
      'Official registry status updates and cancellation of serials',
    ],
    isHighlight: false,
    iconType: 'registries',
  },
  {
    roleSubtitle: 'Regulated Venues',
    title: 'Licensed Partners',
    summary:
      'Carry out carbon credit brokerage, execution, and commercial trading where these are regulated activities.',
    responsibilities: [
      'Marketplace brokerage and order book execution',
      'Trading venue licences and jurisdictional regulatory compliance',
      'Client fiat settlement and commercial trading agreements',
    ],
    isHighlight: false,
    iconType: 'licensed',
  },
];

const WHO_ITS_FOR_CARDS = [
  {
    title: 'Project Developers',
    description:
      'Connect verified carbon offset projects with global institutional liquidity through transparent serial tracking.',
    benefit: 'Direct buyer reach',
  },
  {
    title: 'Carbon Funds & Asset Managers',
    description:
      'Manage diversified portfolios of environmental assets with precise vintage, methodology, and price discovery.',
    benefit: 'Transparent portfolio ops',
  },
  {
    title: 'Corporate Net-Zero Buyers',
    description:
      'Procure and retire high-integrity carbon credits with verifiable provenance for Scope 1–3 greenhouse gas disclosures.',
    benefit: 'Unambiguous ESG claims',
  },
  {
    title: 'Licensed Carbon Marketplaces',
    description:
      'Integrate compliant settlement infrastructure and on-chain retirement proof into existing trading platforms.',
    benefit: 'Turnkey settlement rails',
  },
];

const RELATED_READING_ITEMS = [
  {
    type: 'blog',
    title: 'Carbon Credits & Blockchain Guide',
    description:
      'An in-depth exploration of how blockchain technology enhances traceability and mitigates double-counting in carbon markets.',
    href: '/blog/education/carbon-credits-blockchain-guide/',
    category: 'Educational Article',
  },
  {
    type: 'glossary',
    title: 'Carbon Credit',
    description:
      'A tradable certificate representing the right to emit one ton of CO2 or equivalent greenhouse gas.',
    href: '/glossary/carbon-credit/',
    category: 'Glossary Term',
  },
  {
    type: 'glossary',
    title: 'Tokenization',
    description:
      'The process of creating digital tokens that represent verified real-world assets on a distributed ledger.',
    href: '/glossary/tokenization/',
    category: 'Glossary Term',
  },
];

const FAQS = [
  {
    q: 'Does the token replace the registry record?',
    a: 'No. The registry remains the official legal record of credit issuance and ownership. Each CopyM token is cryptographically mapped to the specific serial numbers of credits held in an active registry account, acting as a digital representation for transfer efficiency and tracking.',
  },
  {
    q: 'How does the platform help prevent double counting?',
    a: 'Each unique registry serial number maps to exactly one token record. When a credit is retired on the registry, the matching token is automatically or administratively retired (burned) on-chain, ensuring the same credit cannot be claimed or transferred twice across different platforms.',
  },
  {
    q: 'Can tokenized carbon credits be traded?',
    a: 'Transfers are strictly limited to verified, whitelisted participants. Where secondary trading or brokerage is a regulated financial activity, it is conducted exclusively through licensed partners, subject to registry rules and applicable local laws.',
  },
  {
    q: 'How does retirement tracking work for corporate ESG reporting?',
    a: 'When an organization retires a tokenized credit for offsetting purposes, the token is permanently burned on-chain. The system generates an immutable retirement certificate referencing the exact registry serial range, project metadata, and beneficiary name, providing verifiable evidence for ESG auditors and regulators.',
  },
];

export default function CarbonCreditsSolutionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://copym.xyz/solutions/carbon-credits/#service',
        name: 'Carbon Credit Tokenization Infrastructure',
        serviceType: 'Carbon Credit Tokenization',
        provider: {
          '@type': 'Organization',
          name: 'CopyM Limited',
          url: 'https://copym.xyz',
        },
        description:
          'Tokenize carbon credits with CopyM: registry serial-number mapping, retirement tracking and ESG reporting on compliance-aware infrastructure.',
        areaServed: 'Global',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://copym.xyz',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Solutions',
            item: 'https://copym.xyz/tokenization/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Carbon Credit Tokenization',
            item: 'https://copym.xyz/solutions/carbon-credits/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <SolutionHero
        badge="Asset Solution · Carbon Credits"
        badgeIconType="leaf"
        title="Carbon credit tokenization"
        titleHighlight="infrastructure"
        subheading="Issue and manage tokenized carbon credits, each mapped to its registry serial number, with eligibility checks, retirement tracking and reporting built in."
        primaryButtonText="Book a demo"
        primaryButtonHref="/signup/"
        secondaryButtonText="See the platform"
        secondaryButtonHref="/tokenization/"
        previewTitle="Nature-Based Mangrove Restoration"
        previewSubtitle="Registry Mapped · Serial #00492-12093"
        previewImage="/images/Maskcard3.avif"
        previewStats={[
          { label: 'Standard', value: 'Verified Standard' },
          { label: 'Active Serials', value: '50,000 tCO2e' },
          { label: 'Vintage', value: '2023 - 2024' },
          { label: 'Quality Rating', value: 'CCP Eligible' },
        ]}
      />

      {/* 2. The challenge — three cards */}
      <SolutionChallenge
        title="The challenge"
        subtitle="Fragmented spreadsheets and opacity around retirement statuses compromise market confidence and slow down climate finance."
        cards={CHALLENGE_CARDS}
      />

      {/* 3. How CopyM supports it — four steps */}
      <SolutionWorkflow
        title="How CopyM supports it"
        subtitle="End-to-end lifecycle from registry serial mapping to permissioned token issuance, buyer onboarding, and verified retirement."
        steps={WORKFLOW_STEPS}
        highlightLine="When a credit is retired on the registry, its token is retired too — built to help prevent the same credit being sold or claimed twice."
      />

      {/* 4. What can be tokenized */}
      <WhatCanBeTokenized
        title="What can be tokenized"
        subtitle="Issued credits still active in a registry account across avoidance and removal project types."
        items={TOKENIZABLE_INSTRUMENTS}
        legalNote="Active avoidance and removal credits from nature-based and technology-based projects, subject to registry rules, the legal structure and jurisdiction."
        techLeadNote="Each token records the designated registry, project ID, serial-number range, vintage, methodology and country of origin."
      />

      {/* 5. Who does what */}
      <WhoDoesWhat
        title="Who does what"
        subtitle="A three-pillar model connecting technology, official standard registries, and licensed brokerage venues."
        columns={WHO_DOES_WHAT_COLUMNS}
        disclaimerNote="CopyM provides the technology. It doesn't operate a carbon registry or exchange, and doesn't trade or broker credits. Regulatory licences for carbon brokerage remain the responsibility of licensed partners."
      />

      {/* 6. Who it’s for */}
      <WhoItsFor
        title="Who it’s for"
        subtitle="Built for climate asset originators, corporate sustainability teams, and institutional trading desks."
        cards={WHO_ITS_FOR_CARDS}
      />

      {/* 7. Related reading */}
      <RelatedReading
        title="Related reading"
        subtitle="Guides and terminology on carbon credit tokenization, blockchain verification, and RWA infrastructure."
        items={RELATED_READING_ITEMS}
      />

      {/* 8. FAQ */}
      <SolutionFAQ
        title="Frequently asked questions"
        subtitle="Key questions on serial number mapping, double-counting mitigation, and corporate ESG reporting."
        faqs={FAQS}
      />

      {/* 9. Closing call to action */}
      <SolutionCTA
        heading="Ready to scope your carbon credit programme?"
        subheading="Explore how CopyM's tokenization rails bring serial-number traceability, anti-double counting controls, and automated retirement reporting to your portfolio."
        regulatoryText="CopyM Limited is based in Masdar City — Abu Dhabi's sustainability and technology hub — and licensed by Masdar City Free Zone (Licence No. MC 14225)."
        buttonText="Book a demo"
        buttonHref="/signup/"
      />
    </main>
  );
}
