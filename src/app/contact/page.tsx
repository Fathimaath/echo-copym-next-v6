import type { Metadata } from 'next';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/seo';
import ContactForm from '@/components/Contact/ContactForm';
import ContactMap from '@/components/Contact/ContactMap';

export const metadata: Metadata = {
  title: 'Contact Us | CopyM',
  description:
    'Get in touch with the CopyM team. Reach out for asset tokenization, partnerships, institutional offerings, or platform support.',
  alternates: {
    canonical: 'https://copym.xyz/contact/',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Contact Us | CopyM',
    description:
      'Connect with the CopyM team for tokenization inquiries, institutional partnerships, and platform access.',
    url: 'https://copym.xyz/contact/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: 'Contact CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | CopyM',
    description:
      'Connect with the CopyM team for tokenization inquiries, institutional partnerships, and platform access.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function ContactPage() {
  const schemaData = generateWebPageSchema({
    name: 'Contact Us | CopyM',
    description:
      'Get in touch with the CopyM team for asset tokenization, institutional partnerships, and platform support.',
    url: 'https://copym.xyz/contact/',
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
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

      {/* Hero Header */}
      <section className="relative overflow-hidden min-h-[320px] sm:min-h-[380px] w-full bg-black flex items-center">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#15a36e]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 w-full text-left">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            CONTACT <span className="text-[#10b981]">US</span>
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Reach our institutional team for asset tokenization, platform integrations, or general inquiries.
          </p>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <ContactMap />
        </div>
      </section>
    </div>
  );
}
