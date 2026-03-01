export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaning: string;
  exampleEn: string;
  exampleKo: string;
}

export interface Category {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
}

export interface Progress {
  completedWords: string[];
  lastStudied: string | null;
}
