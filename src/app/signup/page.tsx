import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DownloadHero = dynamic(() => import('@/components/DownloadHero'));
const DownloadFormSection = dynamic(() => import('@/components/DownloadFormSection'));
const DownloadCTA = dynamic(() => import('@/components/DownloadCTA'));
const SignupFAQ = dynamic(() => import('@/components/SignupFAQ'));

export const metadata: Metadata = {
    title: 'Book a Demo | CopyM',
    description: 'Book a demo of CopyM’s tokenization infrastructure and white-label platform.',
    alternates: {
        canonical: 'https://copym.xyz/signup/',
    },
    robots: 'index, follow',
    openGraph: {
        title: 'Book a Demo | CopyM',
        description: 'Book a demo of CopyM’s tokenization infrastructure and white-label platform.',
        url: 'https://copym.xyz/signup/',
        type: 'website',
        images: [
            {
                url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
                width: 1200,
                height: 630,
                alt: 'Book a Demo | CopyM',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Book a Demo | CopyM',
        description: 'Book a demo of CopyM’s tokenization infrastructure and white-label platform.',
        images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
    }
};

export default function SignupPage() {
    return (
        <>
            <DownloadHero />
            <DownloadFormSection />
            <DownloadCTA />
            <SignupFAQ />
        </>
    );
}
