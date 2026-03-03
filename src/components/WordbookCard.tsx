import StudyCard from './StudyCard';

interface WordbookCardProps {
  id: string;
  nameKo: string;
  description: string;
  icon: string;
  totalWordCount: number;
  progressRate: number;
}

export default function WordbookCard({
  id,
  nameKo,
  description,
  icon,
  totalWordCount,
  progressRate,
}: WordbookCardProps) {
  return (
    <StudyCard
      href={`/learn/${id}`}
      nameKo={nameKo}
      description={description}
      icon={icon}
      wordCount={totalWordCount}
      progressRate={progressRate}
    />
  );
}
