import type { Metadata } from "next";
import { Palanquin, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { generateWebsiteSchema } from "@/utils/seo";

const palanquin = Palanquin({
  variable: "--font-palanquin",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://copym.xyz"),
  title: "CopyM - Complete Tokenization Platform",
  description: "CopyM is the complete tokenization platform for real-world assets.",
  openGraph: {
    images: [
      {
        url: "https://copym.xyz/assets/copym/png/Copym-01-1.png",
        width: 1200,
        height: 630,
        alt: "CopyM - Complete Tokenization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://copym.xyz/assets/copym/png/Copym-01-1.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CopyM",
    "url": "https://copym.xyz/",
    "logo": "https://copym.xyz/assets/copym/png/Copym-01-1.png",
    "sameAs": [
      "https://twitter.com/copym",
      "https://linkedin.com/company/copym"
    ]
  };

  const websiteSchema = generateWebsiteSchema();

  return (
    <html
      lang="en"
      className={`${palanquin.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow relative overflow-x-hidden pt-0 sm:pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
