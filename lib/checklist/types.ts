export type AppType = "express-entry" | "study-permit";

export type Severity = "high" | "medium" | "low";

/** hard_fail = likely rejection; risk_flag = review needed; weakness = reduces approval odds */
export type FlagCategory = "hard_fail" | "risk_flag" | "weakness";

export type WizardPhase = "landing" | "wizard" | "results";

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  appTypes: AppType[];
  /** weight 1–3; drives severity and score deduction */
  weight: 1 | 2 | 3;
  /** if true, answering "no" triggers a risk flag */
  flagOnNo: boolean;
  /** if true, answering "yes" triggers a risk flag (e.g. prior refusals) */
  flagOnYes?: boolean;
  /** if true, answering "yes" adds a confidence boost entry */
  boostOnYes?: boolean;
  category?: FlagCategory;
  missingDocLabel?: string;
}

export interface RiskFlag {
  questionId: string;
  label: string;
  severity: Severity;
  category: FlagCategory;
  fix: string;
}

export interface RiskResult {
  score: number;
  flags: RiskFlag[];
  missingDocs: string[];
  boosts: string[];
}

export type Answers = Record<string, boolean>;

export type WizardAction =
  | { type: "START" }
  | { type: "SELECT_APP_TYPE"; appType: AppType; questions: Question[] }
  | { type: "ANSWER"; questionId: string; value: boolean }
  | { type: "BACK" }
  | { type: "SHOW_RESULTS"; result: RiskResult }
  | { type: "RESTART" };

export interface WizardState {
  phase: WizardPhase;
  appType: AppType | null;
  activeQuestions: Question[];
  currentStep: number;
  answers: Answers;
  result: RiskResult | null;
}
