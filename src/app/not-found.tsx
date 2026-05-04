import type { Metadata } from 'next';
import NotFoundClient from '@/components/NotFoundClient';

export const metadata: Metadata = {
  title: '404 - Page Not Found | CopyM',
  description: 'The page you\'re looking for doesn\'t exist. Return to CopyM\'s tokenization platform.',
  robots: 'noindex',
  openGraph: {
    title: '404 - Page Not Found | CopyM',
    description: 'The page you\'re looking for doesn\'t exist.',
    type: 'website',
  }
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
