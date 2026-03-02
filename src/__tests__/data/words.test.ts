import wordsLevel1 from '@/data/words-level-1.json';
import wordsLevel2 from '@/data/words-level-2.json';
import wordsLevel3 from '@/data/words-level-3.json';
import wordsLevel4 from '@/data/words-level-4.json';
import type { Word } from '@/types';

const allLevels = [
  { name: 'Level 1', words: wordsLevel1 as Word[] },
  { name: 'Level 2', words: wordsLevel2 as Word[] },
  { name: 'Level 3', words: wordsLevel3 as Word[] },
  { name: 'Level 4', words: wordsLevel4 as Word[] },
];

const allWords: Word[] = allLevels.flatMap((l) => l.words);

describe('Word data integrity', () => {
  test('total word count is 270', () => {
    expect(allWords.length).toBe(270);
  });

  test('no duplicate IDs across all levels', () => {
    const ids = allWords.map((w) => w.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('no duplicate words across all levels', () => {
    const words = allWords.map((w) => w.word);
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(words.length);
  });

  describe.each(allLevels)('$name', ({ words }) => {
    test('has at least 60 words', () => {
      expect(words.length).toBeGreaterThanOrEqual(60);
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

    test('IDs follow the level prefix pattern', () => {
      words.forEach((word) => {
        expect(word.id).toMatch(/^lv\d+-\d{3}$/);
      });
    });

    test('pronunciation is in IPA format (starts with /)', () => {
      words.forEach((word) => {
        expect(word.pronunciation).toMatch(/^\/.+\/$/);
      });
    });

    test('example sentences are non-empty strings', () => {
      words.forEach((word) => {
        expect(word.exampleEn.length).toBeGreaterThan(3);
        expect(word.exampleKo.length).toBeGreaterThan(1);
      });
    });
  });
});
