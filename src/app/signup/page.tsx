import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DownloadHero = dynamic(() => import('@/components/DownloadHero'));
const DownloadFormSection = dynamic(() => import('@/components/DownloadFormSection'));
const DownloadCTA = dynamic(() => import('@/components/DownloadCTA'));
const SignupFAQ = dynamic(() => import('@/components/SignupFAQ'));

export const metadata: Metadata = {
    title: 'Get Early Access | CopyM Tokenization Platform',
    description: 'Sign up for early access to CopyM — the complete tokenization platform for real-world assets. Be the first to know when we launch.',
    alternates: {
        canonical: 'https://copym.xyz/signup/',
    },
    robots: 'index, follow',
    openGraph: {
        title: 'Get Early Access | CopyM Tokenization Platform',
        description: 'Sign up for early access to CopyM — the complete tokenization platform for real-world assets.',
        url: 'https://copym.xyz/signup/',
        type: 'website',
        images: [
            {
                url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
                width: 1200,
                height: 630,
                alt: 'CopyM Early Access',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Get Early Access | CopyM Tokenization Platform',
        description: 'Sign up for early access to CopyM — the complete tokenization platform for real-world assets.',
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
