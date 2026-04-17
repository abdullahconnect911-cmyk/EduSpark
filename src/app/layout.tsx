import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingElements from '@/components/layout/FloatingElements';
import Providers from '@/components/layout/Providers';

export const metadata: Metadata = {
  title: 'EduSpark International Study – Your Gateway to Global Education',
  description: 'Expert education consultancy helping Bangladeshi students study in Malaysia, UK, USA, Australia, Canada and Europe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingElements />
        </Providers>
      </body>
    </html>
  );
}
