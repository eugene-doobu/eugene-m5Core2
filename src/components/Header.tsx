'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appConfig } from '@/lib/config';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-500">
            {appConfig.app.logo}
          </span>
          <span className="text-lg font-semibold text-slate-700">
            {appConfig.app.title}
          </span>
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'text-blue-500'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {appConfig.app.nav.home}
          </Link>
          <Link
            href="/learn"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/learn')
                ? 'text-blue-500'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {appConfig.app.nav.learn}
          </Link>
        </nav>
      </div>
    </header>
  );
}
