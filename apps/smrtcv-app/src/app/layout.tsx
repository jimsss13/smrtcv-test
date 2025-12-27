import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeaderWrapper, FooterWrapper } from './layout-wrappers';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart CV - The Future of Resumes',
  description: 'Create beautiful, AI-powered resumes in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <main className="min-h-screen">
            {children}
          </main>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </Providers>
      </body>
    </html>
  );
}