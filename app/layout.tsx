import './globals.css';
import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const display = Cinzel({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700'] });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MU Zylo | Season 22 custom MU Online server',
  description: 'MU Zylo: custom classes, world bosses, OSRS-style raids, rankings and a living economy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans"><Nav />{children}<Footer /></body>
    </html>
  );
}
