import fs from 'fs';
import path from 'path';
import type { Word, WordbookConfig } from '@/types';

const config: WordbookConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../../wordbook.config.json'), 'utf-8')
);

const allLevelsByWordbook = config.wordbooks.map((wb) => {
  const wbDir = path.join(__dirname, `../../data/${wb.id}`);
  const levels = wb.levels.map((level) => {
    const filePath = path.join(wbDir, `words-${level.id}.json`);
    const words: Word[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { name: level.nameKo, words };
  });
  return { wordbookName: wb.nameKo, wordbookId: wb.id, levels, wbDir };
});

const allWords: Word[] = allLevelsByWordbook.flatMap((wb) =>
  wb.levels.flatMap((l) => l.words)
);

describe('Word data integrity', () => {
  test('has at least one wordbook with words', () => {
    expect(allLevelsByWordbook.length).toBeGreaterThan(0);
    expect(allWords.length).toBeGreaterThan(0);
  });

  test('no duplicate IDs across all wordbooks', () => {
    const ids = allWords.map((w) => w.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('no duplicate words within each wordbook', () => {
    allLevelsByWordbook.forEach(({ levels }) => {
      const words = levels.flatMap((l) => l.words).map((w) => w.word);
      const uniqueWords = new Set(words);
      expect(uniqueWords.size).toBe(words.length);
    });
  });

  test('every wordbook in config has a corresponding data directory', () => {
    config.wordbooks.forEach((wb) => {
      const wbDir = path.join(__dirname, `../../data/${wb.id}`);
      expect(fs.existsSync(wbDir)).toBe(true);
    });
  });

  test('every level in config has a corresponding data file', () => {
    config.wordbooks.forEach((wb) => {
      wb.levels.forEach((level) => {
        const filePath = path.join(__dirname, `../../data/${wb.id}/words-${level.id}.json`);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe.each(
    allLevelsByWordbook.flatMap((wb) =>
      wb.levels.map((l) => ({ name: `${wb.wordbookName} > ${l.name}`, words: l.words }))
    )
  )('$name', ({ words }) => {
    test('has at least 1 word', () => {
      expect(words.length).toBeGreaterThanOrEqual(1);
    });

    test('every word has all required fields', () => {
      words.forEach((word) => {
        expect(word.id).toBeTruthy();
        expect(word.word).toBeTruthy();
        expect(word.pronunciation).toBeTruthy();
        expect(word.partOfSpeech).toBeTruthy();
        expect(word.meaning).toBeTruthy();
        expect(word.exampleEn).toBeTruthy();
        expect(word.exampleKo).toBeTruthy();
      });
    });

    test('pronunciation is in IPA format (starts with /)', () => {
      words.forEach((word) => {
        expect(word.pronunciation).toMatch(/^\/.+\/$/);
      });
    });

    test('example sentences have meaningful length', () => {
      words.forEach((word) => {
        expect(word.exampleEn.length).toBeGreaterThan(10);
        expect(word.exampleKo.length).toBeGreaterThan(3);
      });
    });
  });
});
