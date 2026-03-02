'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { wordbooks, getWordbookLevels, getWordsByLevel, getAllWordsForWordbook } from '@/data';

export default function WordbookLearnPage() {
  const params = useParams();
  const wordbookId = params.wordbook as string;

  const wb = wordbooks.find((w) => w.id === wordbookId);
  if (!wb) {
    notFound();
  }

  const { getProgressRate } = useProgress();
  const levels = getWordbookLevels(wordbookId);
  const wbWords = getAllWordsForWordbook(wordbookId);
  const wbWordIds = wbWords.map((w) => w.id);
  const totalProgress = getProgressRate(wbWordIds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/learn"
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{wb.nameKo}</h1>
          <p className="text-slate-500">레벨을 선택하여 학습을 시작하세요.</p>
        </div>
      </div>

      <div className="mb-8">
        <ProgressBar percentage={totalProgress} label="전체 진행률" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {levels.map((level) => {
          const words = getWordsByLevel(wordbookId, level.id);
          const wordIds = words.map((w) => w.id);
          return (
            <CategoryCard
              key={level.id}
              wordbookId={wordbookId}
              id={level.id}
              nameKo={level.nameKo}
              description={level.description}
              icon={level.icon}
              wordCount={words.length}
              progressRate={getProgressRate(wordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
