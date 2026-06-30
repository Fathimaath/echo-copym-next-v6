import type { Metadata } from 'next';
import NotFoundClient from '@/components/NotFoundClient';

export const metadata: Metadata = {
  title: '404 - Page Not Found | CopyM',
  description: 'The page you\'re looking for doesn\'t exist. Return to CopyM\'s tokenization platform.',
  robots: 'noindex',
  openGraph: {
    title: '404 - Page Not Found | CopyM',
    description: 'The page you\'re looking for doesn\'t exist. Return to CopyM\'s tokenization platform.',
    url: 'https://copym.xyz/404/',
    type: 'website',
    images: [
      {
        url: 'https://copym.xyz/assets/copym/png/Copym-01-1.png',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found | CopyM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page Not Found | CopyM',
    description: 'The page you\'re looking for doesn\'t exist. Return to CopyM\'s tokenization platform.',
    images: ['https://copym.xyz/assets/copym/png/Copym-01-1.png'],
  },
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
