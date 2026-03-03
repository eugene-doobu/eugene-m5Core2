'use client';

import { memo, useState } from 'react';
import type { Word } from '@/types';
import { SpeakerIcon } from './icons';

interface WordCardProps {
  word: Word;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSpeak: (text: string, lang?: string) => void;
  ttsAvailable?: boolean;
}

export default memo(function WordCard({
  word,
  isCompleted,
  onToggleComplete,
  onSpeak,
  ttsAvailable = false,
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
            {ttsAvailable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(word.word);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                aria-label="발음 듣기"
              >
                <SpeakerIcon />
              </button>
            )}
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
            {ttsAvailable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(word.exampleEn);
                }}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <SpeakerIcon className="w-4 h-4" />
                예문 듣기
              </button>
            )}
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
})
