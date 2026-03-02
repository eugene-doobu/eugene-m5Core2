import Link from 'next/link';
import { appConfig } from '@/lib/config';

export default function Home() {
  const { heroTitle, heroHighlight, heroDescription, startButtonText, features } =
    appConfig.app;
  const lines = heroTitle.split('\n');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {lines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line.includes(heroHighlight) ? (
                <>
                  {line.split(heroHighlight)[0]}
                  <span className="text-blue-500">{heroHighlight}</span>
                  {line.split(heroHighlight)[1]}
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          {heroDescription.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <Link
          href="/learn"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-blue-500/25"
        >
          {startButtonText}
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-500">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
