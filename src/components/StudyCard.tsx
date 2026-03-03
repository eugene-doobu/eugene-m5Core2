import { memo } from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';

interface StudyCardProps {
  href: string;
  nameKo: string;
  description: string;
  icon: string;
  wordCount: number;
  progressRate: number;
}

export default memo(function StudyCard({
  href,
  nameKo,
  description,
  icon,
  wordCount,
  progressRate,
}: StudyCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{nameKo}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>단어 {wordCount}개</span>
        </div>
        <ProgressBar percentage={progressRate} label="학습 진행률" size="sm" />
      </div>
    </Link>
  );
})
