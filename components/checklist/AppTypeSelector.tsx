import { AppType } from "@/lib/checklist/types";

interface AppTypeCardProps {
  title: string;
  description: string;
  emoji: string;
  onClick: () => void;
}

function AppTypeCard({ title, description, emoji, onClick }: AppTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-left hocus:border-red-500 dark:hocus:border-red-500 hocus:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <span className="text-3xl" aria-hidden>{emoji}</span>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <span className="text-sm font-medium text-red-600 dark:text-red-400">
        Start checklist →
      </span>
    </button>
  );
}

interface AppTypeSelectorProps {
  onSelect: (appType: AppType) => void;
}

export function AppTypeSelector({ onSelect }: AppTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          What are you applying for?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Select the application type to get targeted questions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AppTypeCard
          emoji="🍁"
          title="Express Entry"
          description="Federal Skilled Worker, CEC, or FST: permanent residence pathway."
          onClick={() => onSelect("express-entry")}
        />
        <AppTypeCard
          emoji="🎓"
          title="Study Permit"
          description="Studying at a Designated Learning Institution (DLI) in Canada."
          onClick={() => onSelect("study-permit")}
        />
      </div>
    </div>
  );
}
