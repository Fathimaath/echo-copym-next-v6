import type { Metadata } from "next";
import { Palanquin } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { generateCoreSchema } from "@/utils/seo";

const Footer = dynamic(() => import("@/components/Footer"));

const palanquin = Palanquin({
  variable: "--font-palanquin",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://copym.xyz"),
  title: "CopyM - Complete Tokenization Platform",
  description: "CopyM is the complete tokenization platform for real-world assets.",
  openGraph: {
    title: "CopyM - Complete Tokenization Platform",
    description: "CopyM is the complete tokenization platform for real-world assets.",
    url: "https://copym.xyz/",
    type: "website",
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
    title: "CopyM - Complete Tokenization Platform",
    description: "CopyM is the complete tokenization platform for real-world assets.",
    images: ["https://copym.xyz/assets/copym/png/Copym-01-1.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coreSchema = generateCoreSchema();

  return (
    <html
      lang="en"
      className={`${palanquin.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="ywTFKs9vltUreS6Hi6x4CXmLhGoICESwd6j5SDUUbS1w" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(coreSchema) }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PGWCLH5N');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGWCLH5N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-grow relative overflow-x-hidden pt-0 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
