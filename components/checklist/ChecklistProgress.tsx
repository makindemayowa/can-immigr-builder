interface ChecklistProgressProps {
  current: number;
  total: number;
}

export function ChecklistProgress({ current, total }: ChecklistProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-red-600 dark:bg-red-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
