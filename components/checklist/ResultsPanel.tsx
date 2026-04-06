import { AppType, FlagCategory, RiskFlag, RiskResult, Severity } from "@/lib/checklist/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const SEVERITY_ORDER: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
const CATEGORY_ORDER: Record<FlagCategory, number> = { hard_fail: 0, risk_flag: 1, weakness: 2 };

const CATEGORY_LABELS: Record<FlagCategory, string> = {
  hard_fail: "Likely Rejection",
  risk_flag: "Needs Review",
  weakness: "Reduces Approval Odds",
};

const APP_TYPE_LABELS: Record<AppType, string> = {
  "express-entry": "Express Entry",
  "study-permit": "Study Permit",
};

function ScoreMeter({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-green-600 dark:text-green-400" :
    score >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                  "text-red-600 dark:text-red-400";

  const label =
    score >= 80 ? "Ready to Submit" :
    score >= 60 ? "Needs Fixes" :
                  "High Risk";

  const labelColor =
    score >= 80 ? "none" as const :
    score >= 60 ? "medium" as const :
                  "high" as const;

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <span className={`text-6xl font-bold tabular-nums ${color}`}>{score}</span>
      <span className="text-sm text-gray-400 dark:text-gray-500">Readiness Score / 100</span>
      <Badge severity={labelColor} label={label} />
    </div>
  );
}

const CATEGORY_BADGE_SEVERITY: Record<FlagCategory, Severity | "none"> = {
  hard_fail: "high",
  risk_flag: "medium",
  weakness: "low",
};

function FlagItem({ flag }: { flag: RiskFlag }) {
  return (
    <li className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <Badge
          severity={CATEGORY_BADGE_SEVERITY[flag.category]}
          label={CATEGORY_LABELS[flag.category]}
          className="mt-0.5 shrink-0"
        />
        <p className="font-medium text-gray-900 dark:text-white text-sm">{flag.label}</p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 pl-0 leading-relaxed">{flag.fix}</p>
    </li>
  );
}

interface ResultsPanelProps {
  appType: AppType;
  result: RiskResult;
  onRestart: () => void;
}

export function ResultsPanel({ appType, result, onRestart }: ResultsPanelProps) {
  const sortedFlags = [...result.flags].sort((a, b) => {
    const catDiff = CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category];
    if (catDiff !== 0) return catDiff;
    return SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
          {APP_TYPE_LABELS[appType]} · Checklist Results
        </p>
        <ScoreMeter score={result.score} />
      </div>

      {result.missingDocs.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Missing Documents ({result.missingDocs.length})
          </h3>
          <ul className="flex flex-col gap-1.5">
            {result.missingDocs.map((doc) => (
              <li key={doc} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-red-500" aria-hidden>✗</span>
                {doc}
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.boosts.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Confidence Boosters ({result.boosts.length})
          </h3>
          <ul className="flex flex-col gap-1.5">
            {result.boosts.map((boost) => (
              <li key={boost} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 shrink-0" aria-hidden>+</span>
                {boost}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sortedFlags.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Risk Flags ({sortedFlags.length})
          </h3>
          <ul className="flex flex-col gap-3">
            {sortedFlags.map((flag) => (
              <FlagItem key={flag.questionId} flag={flag} />
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 rounded-lg px-4 py-3">
          No risk flags detected. Review with an RCIC for a professional assessment before submitting.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <Button size="lg" disabled className="w-full opacity-60 cursor-not-allowed">
          Upload Documents for Deep Analysis (coming soon)
        </Button>
        <Button variant="ghost" size="md" onClick={onRestart} className="w-full">
          Start Over
        </Button>
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600">
        This is a pre-check tool, not legal advice. For complex situations, consult a registered immigration consultant (RCIC).
      </p>
    </div>
  );
}
