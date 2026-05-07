import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/contexts/LangContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'S.P. Madrid Dubai — Debt Recovery Excellence in the Gulf',
  description:
    'SPM Dubai delivers DIFC-regulated receivables management and cross-border debt recovery — AED 2.1B+ recovered across 14+ countries with zero regulatory violations.',
  keywords: [
    'debt recovery Dubai',
    'receivables management DIFC',
    'cross-border debt collection UAE',
    'DFSA regulated recovery',
    'SPM Dubai',
    'S.P. Madrid Dubai',
    'Gulf debt recovery',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'S.P. Madrid Dubai',
    title: 'S.P. Madrid Dubai — DIFC Debt Recovery Excellence',
    description:
      'AED 2.1B+ recovered across 14+ countries. DIFC-regulated, ISO-certified cross-border receivables management from Aspin Commercial Tower.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S.P. Madrid Dubai — DIFC Debt Recovery',
    description: 'AED 2.1B+ recovered across 14+ countries. DIFC-regulated receivables management.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://madrid-dubai.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable} h-full`}>
      <head>
        {/* Prevent flash of wrong theme OR language direction */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');var l=localStorage.getItem('lang');if(l==='ar'){document.documentElement.setAttribute('lang','ar');document.documentElement.setAttribute('dir','rtl');}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased"><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
