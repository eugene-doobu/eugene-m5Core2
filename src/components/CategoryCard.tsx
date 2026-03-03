import StudyCard from './StudyCard';

interface CategoryCardProps {
  wordbookId: string;
  id: string;
  nameKo: string;
  description: string;
  icon: string;
  wordCount: number;
  progressRate: number;
}

export default function CategoryCard({
  wordbookId,
  id,
  nameKo,
  description,
  icon,
  wordCount,
  progressRate,
}: CategoryCardProps) {
  return (
    <StudyCard
      href={`/learn/${wordbookId}/${id}`}
      nameKo={nameKo}
      description={description}
      icon={icon}
      wordCount={wordCount}
      progressRate={progressRate}
    />
  );
}
