'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import WordCard from '@/components/WordCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { useTTS } from '@/hooks/useTTS';
import { wordbooks, getWordbookLevels, getWordsByLevel } from '@/data';

function LevelLearnContent({
  wordbookId,
  levelNameKo,
  words,
}: {
  wordbookId: string;
  levelNameKo: string;
  words: import('@/types').Word[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isCompleted, toggleWord, getProgressRate } = useProgress();
  const { speak, isAvailable: ttsAvailable } = useTTS();

  const currentWord = words[currentIndex];
  const wordIds = words.map((w) => w.id);
  const progressRate = getProgressRate(wordIds);

  const goNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/learn/${wordbookId}`}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="뒤로 가기"
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
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">{levelNameKo}</h1>
          <p className="text-sm text-slate-500">
            {currentIndex + 1} / {words.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar percentage={progressRate} label="학습 진행률" />
      </div>

      {/* Word Card */}
      <WordCard
        key={currentWord.id}
        word={currentWord}
        isCompleted={isCompleted(currentWord.id)}
        onToggleComplete={() => toggleWord(currentWord.id)}
        onSpeak={speak}
        ttsAvailable={ttsAvailable}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 max-w-md mx-auto">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          이전
        </button>

        {/* Word dots */}
        <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
          {words.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : isCompleted(w.id)
                    ? 'bg-green-400'
                    : 'bg-slate-300'
              }`}
              aria-label={`단어 ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex === words.length - 1}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
            currentIndex === words.length - 1
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default function LevelLearnPage() {
  const params = useParams();
  const wordbookId = params.wordbook as string;
  const levelId = params.level as string;

  const wb = wordbooks.find((w) => w.id === wordbookId);
  const levels = getWordbookLevels(wordbookId);
  const level = levels.find((l) => l.id === levelId);
  const words = getWordsByLevel(wordbookId, levelId);

  if (!wb || !level || words.length === 0) {
    notFound();
  }

  return (
    <LevelLearnContent
      wordbookId={wordbookId}
      levelNameKo={level.nameKo}
      words={words}
    />
  );
}
