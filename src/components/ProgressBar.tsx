interface ProgressBarProps {
  percentage: number;
  label?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({
  percentage,
  label,
  size = 'md',
}: ProgressBarProps) {
  const height = size === 'sm' ? 'h-2' : 'h-3';

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500">{label}</span>
          <span className="text-xs font-semibold text-blue-500">
            {percentage}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-200 rounded-full ${height}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`bg-blue-500 ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
