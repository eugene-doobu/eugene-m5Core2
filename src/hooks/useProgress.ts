'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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

  const completedSet = useMemo(
    () => new Set(progress.completedWords),
    [progress.completedWords]
  );

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
    (wordId: string) => completedSet.has(wordId),
    [completedSet]
  );

  const getProgressRate = useCallback(
    (wordIds: string[]) => {
      if (wordIds.length === 0) return 0;
      const completed = wordIds.filter((id) => completedSet.has(id)).length;
      return Math.round((completed / wordIds.length) * 100);
    },
    [completedSet]
  );

  return { progress, toggleWord, isCompleted, getProgressRate };
}
