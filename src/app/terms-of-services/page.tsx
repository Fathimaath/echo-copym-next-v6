import type { Metadata } from 'next';
import TermsOfServiceClient from '../../components/Legal/TermsOfService';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

export const metadata: Metadata = {
    title: 'Terms of Service | CopyM',
    description: 'Read the Terms of Service for using the CopyM tokenization platform. Understand the rules, guidelines, and legal terms governing our services.',
    alternates: {
        canonical: 'https://copym.xyz/terms-of-services/',
    },
    robots: "index, follow",
    openGraph: {
        title: 'Terms of Service | CopyM',
        description: 'Read the Terms of Service for using the CopyM tokenization platform.',
        url: 'https://copym.xyz/terms-of-services/',
        type: 'website',
        images: [
            {
                url: '/assets/copym/png/Copym-01-1.png',
                width: 1200,
                height: 630,
                alt: 'Terms of Service | CopyM',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service | CopyM',
        description: 'Read the Terms of Service for using the CopyM tokenization platform.',
        images: ['/assets/copym/png/Copym-01-1.png'],
    }
};

export default function TermsOfServicePage() {
    const schemaData = generateWebPageSchema({
        name: 'Terms of Service | CopyM',
        description: 'Read the Terms of Service for using the CopyM tokenization platform. Understand the rules, guidelines, and legal terms governing our services.',
        url: 'https://copym.xyz/terms-of-services/',
    });

    const breadcrumbData = generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Terms of Service', path: '/terms-of-services' }
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
            <TermsOfServiceClient />
        </>
    );
}
