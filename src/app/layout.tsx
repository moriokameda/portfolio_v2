import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BackgroundVideo } from '@/components/background-video';
import { Navigation } from '@/components/navigation';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mkame Portfolio',
  description: 'Mkameのポートフォリオサイトです。',
  icons: {
    icon: './icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundVideo />
        <Navigation />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
