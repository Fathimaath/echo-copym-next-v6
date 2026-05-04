import { generatePageSEO, generateWebPageSchema } from '@/utils/seo';
import Hero from "@/components/Home/Hero";
import LogoCarousel from "@/components/Home/LogoCarousel";
import TrackYourCrypto from "@/components/Home/TrackYourCrypto";
import AIInvestingSection from "@/components/Home/AIInvestingSection";
import RWAAssetsSection from "@/components/Home/RWAAssetsSection";
import NetworkShowcase from "@/components/Home/NetworkShowcase";
import AuditSection from "@/components/Home/AuditSection";
import FAQSection from "@/components/Home/FAQSection";
import CTASection from "@/components/Home/CTASection";
import SupportedAssets from "@/components/Home/SupportedAssets";
import FeatureSection from "@/components/Home/FeatureSection";
import WhoWeServe from "@/components/Home/WhoWeServe";
import ProductStackReview from "@/components/Home/ProductStackReview";
import TestimonialsSection from "@/components/Home/Testimonials";

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
