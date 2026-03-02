'use client';

import { useState } from 'react';
import type { Word } from '@/types';

interface WordCardProps {
  word: Word;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSpeak: (text: string, lang?: string) => void;
}

export default function WordCard({
  word,
  isCompleted,
  onToggleComplete,
  onSpeak,
}: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="perspective cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative preserve-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ minHeight: '280px' }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-400 mb-2">
              {word.partOfSpeech}
            </span>
            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              {word.word}
            </h2>
            <p className="text-lg text-slate-500 mb-4">{word.pronunciation}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(word.word);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
              aria-label="발음 듣기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
            </button>
            <p className="text-sm text-slate-400 mt-4">
              탭하여 뜻 보기
            </p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-400 mb-1">
              {word.partOfSpeech}
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {word.word}
            </h2>
            <p className="text-2xl font-semibold text-blue-500 mb-4">
              {word.meaning}
            </p>
            <div className="bg-slate-50 rounded-xl p-4 w-full text-center mb-3">
              <p className="text-sm text-slate-700 mb-1">
                &ldquo;{word.exampleEn}&rdquo;
              </p>
              <p className="text-sm text-slate-500">{word.exampleKo}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(word.exampleEn);
              }}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                <path d="M18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              </svg>
              예문 듣기
            </button>
            <p className="text-sm text-slate-400 mt-3">
              탭하여 단어로 돌아가기
            </p>
          </div>
        </div>
      </div>

      {/* Complete toggle button - outside the card */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={onToggleComplete}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            isCompleted
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
          }`}
        >
          {isCompleted ? '학습 완료' : '학습 완료로 표시'}
        </button>
      </div>
    </div>
  );
}
