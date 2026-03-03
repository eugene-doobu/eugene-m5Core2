'use client';

import { useState, useEffect } from 'react';
import WordbookCard from '@/components/WordbookCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { wordbooks, getAllWordsForWordbook } from '@/data';
import { appConfig } from '@/lib/config';

export default function LearnPage() {
  const { getProgressRate } = useProgress();
  const [wordIdsByWordbook, setWordIdsByWordbook] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWordIds() {
      const entries = await Promise.all(
        wordbooks.map(async (wb) => {
          const words = await getAllWordsForWordbook(wb.id);
          return [wb.id, words.map((w) => w.id)] as const;
        })
      );
      setWordIdsByWordbook(Object.fromEntries(entries));
      setLoading(false);
    }
    loadWordIds();
  }, []);

  const allWordIds = Object.values(wordIdsByWordbook).flat();
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
          const wbWordIds = wordIdsByWordbook[wb.id] ?? [];
          return (
            <WordbookCard
              key={wb.id}
              id={wb.id}
              nameKo={wb.nameKo}
              description={wb.description}
              icon={wb.icon}
              totalWordCount={loading ? 0 : wbWordIds.length}
              progressRate={getProgressRate(wbWordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
