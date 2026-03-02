'use client';

import CategoryCard from '@/components/CategoryCard';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import type { Category, Word } from '@/types';

import wordsLevel1 from '@/data/words-level-1.json';
import wordsLevel2 from '@/data/words-level-2.json';
import wordsLevel3 from '@/data/words-level-3.json';
import wordsLevel4 from '@/data/words-level-4.json';

const levels: Category[] = [
  {
    id: 'level-1',
    name: 'Level 1',
    nameKo: 'Lv.1 입문',
    description: '가장 기본이 되는 필수 단어 68개',
    icon: '\u{1F331}',
  },
  {
    id: 'level-2',
    name: 'Level 2',
    nameKo: 'Lv.2 초급',
    description: '일상에서 바로 쓰는 단어 68개',
    icon: '\u{1F33F}',
  },
  {
    id: 'level-3',
    name: 'Level 3',
    nameKo: 'Lv.3 중급',
    description: '회화와 실용 표현 단어 69개',
    icon: '\u{1F333}',
  },
  {
    id: 'level-4',
    name: 'Level 4',
    nameKo: 'Lv.4 중고급',
    description: '표현력을 넓히는 단어 65개',
    icon: '\u{1F332}',
  },
];

const wordMap: Record<string, Word[]> = {
  'level-1': wordsLevel1,
  'level-2': wordsLevel2,
  'level-3': wordsLevel3,
  'level-4': wordsLevel4,
};

export default function LearnPage() {
  const { getProgressRate } = useProgress();

  const allWordIds = [
    ...wordsLevel1,
    ...wordsLevel2,
    ...wordsLevel3,
    ...wordsLevel4,
  ].map((w) => w.id);
  const totalProgress = getProgressRate(allWordIds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">학습하기</h1>
      <p className="text-slate-500 mb-6">레벨을 선택하여 학습을 시작하세요.</p>

      <div className="mb-8">
        <ProgressBar percentage={totalProgress} label="전체 진행률" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {levels.map((level) => {
          const words = wordMap[level.id] || [];
          const wordIds = words.map((w) => w.id);
          return (
            <CategoryCard
              key={level.id}
              id={level.id}
              nameKo={level.nameKo}
              description={level.description}
              icon={level.icon}
              wordCount={words.length}
              progressRate={getProgressRate(wordIds)}
            />
          );
        })}
      </div>
    </div>
  );
}
