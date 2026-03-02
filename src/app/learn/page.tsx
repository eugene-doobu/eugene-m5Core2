'use client';

import WordbookCard from '@/components/WordbookCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { wordbooks, getAllWordsForWordbook, allWords } from '@/data';
import { appConfig } from '@/lib/config';

export default function LearnPage() {
  const { getProgressRate } = useProgress();

  const allWordIds = allWords.map((w) => w.id);
  const totalProgress = getProgressRate(allWordIds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        {appConfig.app.nav.learn}
      </h1>
      <p className="text-slate-500 mb-6">단어집을 선택하여 학습을 시작하세요.</p>

      <div className="mb-8">
        <ProgressBar percentage={totalProgress} label="전체 진행률" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {wordbooks.map((wb) => {
          const wbWords = getAllWordsForWordbook(wb.id);
          const wbWordIds = wbWords.map((w) => w.id);
          return (
            <WordbookCard
              key={wb.id}
              id={wb.id}
              nameKo={wb.nameKo}
              description={wb.description}
              icon={wb.icon}
              totalWordCount={wbWords.length}
              progressRate={getProgressRate(wbWordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
