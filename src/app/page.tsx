import dynamic from 'next/dynamic';
import { generateWebPageSchema } from '@/utils/seo';
import Hero from "@/components/Home/Hero";

const LogoCarousel = dynamic(() => import('@/components/Home/LogoCarousel'));
const FeatureSection = dynamic(() => import('@/components/Home/FeatureSection'));
const WhoWeServe = dynamic(() => import('@/components/Home/WhoWeServe'));
const ProductStackReview = dynamic(() => import('@/components/Home/ProductStackReview'));
const AIInvestingSection = dynamic(() => import('@/components/Home/AIInvestingSection'));
const RWAAssetsSection = dynamic(() => import('@/components/Home/RWAAssetsSection'));
const TrackYourCrypto = dynamic(() => import('@/components/Home/TrackYourCrypto'));
const AuditSection = dynamic(() => import('@/components/Home/AuditSection'));
const FAQSection = dynamic(() => import('@/components/Home/FAQSection'));
const TestimonialsSection = dynamic(() => import('@/components/Home/Testimonials'));
const CTASection = dynamic(() => import('@/components/Home/CTASection'));

export const metadata = {
  title: 'Copym – Complete Tokenization Platform for Real-World Assets',
  description: 'Full-stack platform for issuing, managing, and trading tokenized real-world assets.',
  alternates: {
    canonical: 'https://copym.xyz/',
  },
  openGraph: {
    title: 'Copym – Complete Tokenization Platform for Real-World Assets',
    description: 'Full-stack platform for issuing, managing, and trading tokenized real-world assets.',
    url: 'https://copym.xyz/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'CopyM - Complete Tokenization Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Tokenization Platform for Real-World Assets',
    description: 'CopyM is the complete tokenization platform for real-world assets. Secure, compliant, and accessible digital asset marketplace for RWA tokenization.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  }
};

export default function HomePage() {
  const schemaData = generateWebPageSchema({
    name: 'CopyM - Complete Tokenization Platform',
    description: 'CopyM is the complete tokenization platform for real-world assets.',
    url: 'https://copym.xyz/',
  });

  return (
    <div className="min-h-screen bg-white p-0 m-0 w-full">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Hero />
      <LogoCarousel />
      <FeatureSection />
      <WhoWeServe />
      <ProductStackReview />
      <AIInvestingSection />
      <RWAAssetsSection />
      <TrackYourCrypto />
      <AuditSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
