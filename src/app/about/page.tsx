import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AboutUsHero from '../../components/AboutUs/AboutUsHero';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';

const AboutUsClient = dynamic(() => import('../../components/AboutUs/AboutUsClient'));

export const metadata: Metadata = {
    title: 'About Us | CopyM',
    description: 'Learn about CopyM - the complete tokenization platform for real-world assets. Discover our mission, team, and vision for democratizing investments.',
    alternates: {
        canonical: 'https://copym.xyz/about/',
    },
    robots: 'index, follow',
    openGraph: {
        title: 'About Us | CopyM',
        description: 'Learn about CopyM - the complete tokenization platform for real-world assets. Discover our mission, team, and vision for democratizing investments.',
        url: 'https://copym.xyz/about/',
        type: 'website',
        images: [
            {
                url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
                width: 1200,
                height: 630,
                alt: 'About Us | CopyM',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | CopyM',
        description: 'Learn about CopyM - the complete tokenization platform for real-world assets. Discover our mission, team, and vision for democratizing investments.',
        images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
    }
};

export default function AboutUsPage() {
    const schemaData = generateWebPageSchema({
        name: "About Us | CopyM",
        description: "Learn about CopyM - the complete tokenization platform for real-world assets. Discover our mission, team, and vision for democratizing investments.",
        url: "https://copym.xyz/about/"
    });

    const breadcrumbData = generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' }
    ]);

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <AboutUsHero />
            <AboutUsClient />
        </div>
    );
}
