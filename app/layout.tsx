import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIAIAI Consulting - Plataforma de Agentes de IA',
  description: 'Plataforma de agentes de IA para emprendedores LATAM. Tú enseñas. Ellos ejecutan. Tú creces.',
  keywords: ['IA', 'agentes', 'consultoría', 'automatización', 'LATAM', 'emprendedores'],
  authors: [{ name: 'AIAIAI Consulting', url: 'https://aiaiai.cl' }],
  creator: 'AIAIAI Consulting',
  publisher: 'AIAIAI Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aiaiai.cl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AIAIAI Consulting - Plataforma de Agentes de IA',
    description: 'Plataforma de agentes de IA para emprendedores LATAM. Tú enseñas. Ellos ejecutan. Tú creces.',
    url: 'https://aiaiai.cl',
    siteName: 'AIAIAI Consulting',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIAIAI Consulting - Plataforma de Agentes de IA',
    description: 'Plataforma de agentes de IA para emprendedores LATAM. Tú enseñas. Ellos ejecutan. Tú creces.',
    creator: '@aiaiai_consulting',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

/**
 * Root Layout Component
 * 
 * Features:
 * - Professional metadata and SEO
 * - Inter font for better readability
 * - Global CSS styles
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div id="root" className="h-full">
          {children}
        </div>
      </body>
    </html>
  );
}