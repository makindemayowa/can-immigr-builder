import { Question } from "@/lib/checklist/types";
import { Button } from "@/components/ui/Button";
import { ChecklistProgress } from "./ChecklistProgress";

interface QuestionStepProps {
  question: Question;
  stepNumber: number;
  totalSteps: number;
  onAnswer: (questionId: string, value: boolean) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionStep({
  question,
  stepNumber,
  totalSteps,
  onAnswer,
  onBack,
  canGoBack,
}: QuestionStepProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <ChecklistProgress current={stepNumber} total={totalSteps} />

      <div className="flex flex-col gap-3 py-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
          {question.text}
        </p>
        {question.helpText && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {question.helpText}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onAnswer(question.id, true)}
          className="flex flex-col items-center gap-1 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hocus:border-green-500 dark:hocus:border-green-500 hocus:bg-green-50 dark:hocus:bg-green-950 transition-all text-gray-800 dark:text-gray-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          <span className="text-2xl" aria-hidden>✓</span>
          Yes
        </button>
        <button
          onClick={() => onAnswer(question.id, false)}
          className="flex flex-col items-center gap-1 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hocus:border-red-500 dark:hocus:border-red-500 hocus:bg-red-50 dark:hocus:bg-red-950 transition-all text-gray-800 dark:text-gray-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <span className="text-2xl" aria-hidden>✗</span>
          No
        </button>
      </div>

      {canGoBack && (
        <div className="flex justify-start">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        </div>
      )}
    </div>
  );
}
