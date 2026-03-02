'use client';

import CategoryCard from '@/components/CategoryCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import type { Category, Word } from '@/types';

import wordsBasic from '@/data/words-basic.json';
import wordsConversation from '@/data/words-conversation.json';
import wordsDaily from '@/data/words-daily.json';
import wordsEssentialVerbs from '@/data/words-essential-verbs.json';
import wordsEssentialAdjectives from '@/data/words-essential-adjectives.json';
import wordsEssentialNouns from '@/data/words-essential-nouns.json';
import wordsEssentialAdverbs from '@/data/words-essential-adverbs.json';

const categories: Category[] = [
  {
    id: 'basic',
    name: 'Basic',
    nameKo: '기초 필수',
    description: '빈도 상위 핵심 단어 30개',
    icon: '\u{1F4D6}',
  },
  {
    id: 'conversation',
    name: 'Conversation',
    nameKo: '회화',
    description: '일상 회화 필수 단어 20개',
    icon: '\u{1F4AC}',
  },
  {
    id: 'daily',
    name: 'Daily',
    nameKo: '일상',
    description: '생활 속 자주 쓰는 단어 20개',
    icon: '\u{2615}',
  },
  {
    id: 'essential-verbs',
    name: 'Essential Verbs',
    nameKo: '필수 동사',
    description: '가장 많이 쓰이는 동사 50개',
    icon: '\u{1F3C3}',
  },
  {
    id: 'essential-adjectives',
    name: 'Essential Adjectives',
    nameKo: '필수 형용사',
    description: '가장 많이 쓰이는 형용사 50개',
    icon: '\u{1F308}',
  },
  {
    id: 'essential-nouns',
    name: 'Essential Nouns',
    nameKo: '필수 명사',
    description: '가장 많이 쓰이는 명사 50개',
    icon: '\u{1F4E6}',
  },
  {
    id: 'essential-adverbs',
    name: 'Essential Adverbs',
    nameKo: '필수 부사/접속사',
    description: '필수 부사·전치사·접속사 50개',
    icon: '\u{1F517}',
  },
];

const wordMap: Record<string, Word[]> = {
  basic: wordsBasic,
  conversation: wordsConversation,
  daily: wordsDaily,
  'essential-verbs': wordsEssentialVerbs,
  'essential-adjectives': wordsEssentialAdjectives,
  'essential-nouns': wordsEssentialNouns,
  'essential-adverbs': wordsEssentialAdverbs,
};

export default function LearnPage() {
  const { getProgressRate } = useProgress();

  const allWordIds = [
    ...wordsBasic,
    ...wordsConversation,
    ...wordsDaily,
    ...wordsEssentialVerbs,
    ...wordsEssentialAdjectives,
    ...wordsEssentialNouns,
    ...wordsEssentialAdverbs,
  ].map((w) => w.id);
  const totalProgress = getProgressRate(allWordIds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">학습하기</h1>
      <p className="text-slate-500 mb-6">카테고리를 선택하여 학습을 시작하세요.</p>

      <div className="mb-8">
        <ProgressBar percentage={totalProgress} label="전체 진행률" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const words = wordMap[cat.id] || [];
          const wordIds = words.map((w) => w.id);
          return (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              nameKo={cat.nameKo}
              description={cat.description}
              icon={cat.icon}
              wordCount={words.length}
              progressRate={getProgressRate(wordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
