import type { Metadata } from 'next';
import PrivacyPolicyClient from '../../components/Legal/PrivacyPolicy';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

export const metadata: Metadata = {
    title: 'Privacy Policy | CopyM',
    description: 'Read the Privacy Policy for the CopyM tokenization platform. Learn what personal data we collect, how we use it, and the rights you have over it.',
    alternates: {
        canonical: 'https://copym.xyz/privacy-policy/',
    },
    robots: "index, follow",
    openGraph: {
        title: 'Privacy Policy | CopyM',
        description: 'Read the Privacy Policy for the CopyM tokenization platform.',
        url: 'https://copym.xyz/privacy-policy/',
        type: 'website',
        images: [
            {
                url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
                width: 1200,
                height: 630,
                alt: 'Privacy Policy | CopyM',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | CopyM',
        description: 'Read the Privacy Policy for the CopyM tokenization platform.',
        images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
    }
};

export default function PrivacyPolicyPage() {
    const schemaData = generateWebPageSchema({
        name: 'Privacy Policy | CopyM',
        description: 'Read the Privacy Policy for the CopyM tokenization platform. Learn what personal data we collect, how we use it, and the rights you have over it.',
        url: 'https://copym.xyz/privacy-policy/',
    });

    const breadcrumbData = generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Privacy Policy', path: '/privacy-policy' }
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
            <PrivacyPolicyClient />
        </>
    );
}
