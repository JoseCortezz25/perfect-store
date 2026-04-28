import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800']
});

const sodaFont = localFont({
  src: '../../public/Fonts/soda-font.ttf',
  variable: '--font-soda',
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Perfect Store',
  description: 'Quality control platform for digital display pieces'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${sodaFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
