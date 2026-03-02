import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '영어단어 학습',
  description: '빈도 기반 영어 단어 학습 웹 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-slate-50">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
