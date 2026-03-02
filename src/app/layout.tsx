import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { appConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: appConfig.app.title,
  description: appConfig.app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={appConfig.app.lang}>
      <body className="antialiased min-h-screen bg-slate-50">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
