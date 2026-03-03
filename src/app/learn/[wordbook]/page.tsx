'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import ProgressBar from '@/components/ProgressBar';
import { ChevronLeftIcon } from '@/components/icons';
import { useProgress } from '@/hooks/useProgress';
import { wordbooks, getWordbookLevels, getWordsByLevel } from '@/data';

export default function WordbookLearnPage() {
  const params = useParams();
  const wordbookId = params.wordbook as string;

  const { getProgressRate } = useProgress();

  const wb = wordbooks.find((w) => w.id === wordbookId);
  if (!wb) {
    notFound();
  }

  const levels = getWordbookLevels(wordbookId);
  const [wordIdsByLevel, setWordIdsByLevel] = useState<Record<string, string[]>>({});

  useEffect(() => {
    async function loadWordIds() {
      const entries = await Promise.all(
        levels.map(async (level) => {
          const words = await getWordsByLevel(wordbookId, level.id);
          return [level.id, words.map((w) => w.id)] as const;
        })
      );
      setWordIdsByLevel(Object.fromEntries(entries));
    }
    loadWordIds();
  }, [wordbookId, levels]);

  const allWbWordIds = Object.values(wordIdsByLevel).flat();
  const totalProgress = getProgressRate(allWbWordIds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/learn"
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon />
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
          const levelWordIds = wordIdsByLevel[level.id] ?? [];
          return (
            <CategoryCard
              key={level.id}
              wordbookId={wordbookId}
              id={level.id}
              nameKo={level.nameKo}
              description={level.description}
              icon={level.icon}
              wordCount={levelWordIds.length}
              progressRate={getProgressRate(levelWordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
