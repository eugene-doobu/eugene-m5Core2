import type { Word, Category, Wordbook, WordbookConfig } from '@/types';
import config from '../../wordbook.config.json';

const typedConfig = config as unknown as WordbookConfig;

const wordbooks: Wordbook[] = typedConfig.wordbooks;

function getWordbookLevels(wordbookId: string): Category[] {
  const wb = wordbooks.find((w) => w.id === wordbookId);
  return wb?.levels ?? [];
}

// 데이터 캐시: 한번 로딩된 레벨 데이터를 메모리에 유지
const wordDataCache: Record<string, Word[]> = {};

async function getWordsByLevel(wordbookId: string, levelId: string): Promise<Word[]> {
  const key = `${wordbookId}/${levelId}`;
  if (wordDataCache[key]) return wordDataCache[key];

  try {
    const data = await import(`./${wordbookId}/words-${levelId}.json`);
    wordDataCache[key] = (data.default ?? data) as Word[];
    return wordDataCache[key];
  } catch {
    return [];
  }
}

async function getAllWordsForWordbook(wordbookId: string): Promise<Word[]> {
  const levels = getWordbookLevels(wordbookId);
  const results = await Promise.all(
    levels.map((level) => getWordsByLevel(wordbookId, level.id))
  );
  return results.flat();
}

async function getAllWords(): Promise<Word[]> {
  const results = await Promise.all(
    wordbooks.map((wb) => getAllWordsForWordbook(wb.id))
  );
  return results.flat();
}

export {
  wordbooks,
  getWordbookLevels,
  getWordsByLevel,
  getAllWordsForWordbook,
  getAllWords,
};
