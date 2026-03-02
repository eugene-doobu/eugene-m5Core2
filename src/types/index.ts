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

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Wordbook {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  levels: Category[];
}

export interface WordbookConfig {
  app: {
    title: string;
    description: string;
    lang: string;
    logo: string;
    heroTitle: string;
    heroHighlight: string;
    heroDescription: string;
    startButtonText: string;
    features: Feature[];
    nav: {
      home: string;
      learn: string;
    };
  };
  wordbooks: Wordbook[];
}
