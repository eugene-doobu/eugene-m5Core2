import type { Word, Category, Wordbook, WordbookConfig } from '@/types';
import config from '../../wordbook.config.json';

const wordFilesContext = require.context('./', true, /\/words-.*\.json$/);

// Parse keys like "./frequency-english/words-level-1.json" → { wordbookId, levelId }
const wordData: Record<string, Record<string, Word[]>> = {};
wordFilesContext.keys().forEach((key: string) => {
  const match = key.match(/^\.\/(.+)\/words-(.+)\.json$/);
  if (match) {
    const [, wordbookId, levelId] = match;
    if (!wordData[wordbookId]) {
      wordData[wordbookId] = {};
    }
    wordData[wordbookId][levelId] = wordFilesContext(key) as Word[];
  }
});

const typedConfig = config as unknown as WordbookConfig;

const wordbooks: Wordbook[] = typedConfig.wordbooks
  .filter((wb) => wordData[wb.id] !== undefined)
  .map((wb) => ({
    ...wb,
    levels: wb.levels.filter((level) => wordData[wb.id]?.[level.id] !== undefined),
  }));

function getWordbookLevels(wordbookId: string): Category[] {
  const wb = wordbooks.find((w) => w.id === wordbookId);
  return wb?.levels ?? [];
}

function getWordsByLevel(wordbookId: string, levelId: string): Word[] {
  return wordData[wordbookId]?.[levelId] ?? [];
}

function getAllWordsForWordbook(wordbookId: string): Word[] {
  const levels = getWordbookLevels(wordbookId);
  return levels.flatMap((level) => getWordsByLevel(wordbookId, level.id));
}

const allWords: Word[] = wordbooks.flatMap((wb) => getAllWordsForWordbook(wb.id));

export {
  wordbooks,
  getWordbookLevels,
  getWordsByLevel,
  getAllWordsForWordbook,
  allWords,
};
