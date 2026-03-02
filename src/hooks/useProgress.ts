'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Progress } from '@/types';

const STORAGE_KEY = 'english-study-progress';

function getInitialProgress(): Progress {
  if (typeof window === 'undefined') {
    return { completedWords: [], lastStudied: null };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return { completedWords: [], lastStudied: null };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(getInitialProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleWord = useCallback((wordId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedWords.includes(wordId);
      return {
        completedWords: isCompleted
          ? prev.completedWords.filter((id) => id !== wordId)
          : [...prev.completedWords, wordId],
        lastStudied: new Date().toISOString(),
      };
    });
  }, []);

  const isCompleted = useCallback(
    (wordId: string) => progress.completedWords.includes(wordId),
    [progress.completedWords]
  );

  const getProgressRate = useCallback(
    (wordIds: string[]) => {
      if (wordIds.length === 0) return 0;
      const completed = wordIds.filter((id) =>
        progress.completedWords.includes(id)
      ).length;
      return Math.round((completed / wordIds.length) * 100);
    },
    [progress.completedWords]
  );

  return { progress, toggleWord, isCompleted, getProgressRate };
}
