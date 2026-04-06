import { ALL_QUESTIONS } from "./questions";
import { Answers, AppType, FlagCategory, Question, RiskFlag, RiskResult, Severity } from "./types";

const FLAG_COPY: Record<string, { label: string; fix: string }> = {
  passport_valid: {
    label: "No valid passport",
    fix: "Renew your passport before applying. It must be valid for at least 6 months beyond your planned stay.",
  },
  language_test: {
    label: "Missing language test results",
    fix: "Book IELTS General Training or CELPIP (English) or TEF Canada (French). Results must be less than 2 years old.",
  },
  proof_of_funds: {
    label: "Insufficient or missing proof of funds",
    fix: "Gather 6-month bank statements. Express Entry single applicants need ~CAD $13,310 minimum.",
  },
  consistent_names: {
    label: "Name inconsistencies across documents",
    fix: "Ensure your name matches exactly across your passport, bank statements, and credentials. Add a statutory declaration if names legally differ.",
  },
  history_gaps: {
    label: "Unexplained gaps in employment or personal history",
    fix: "Write a letter explaining each gap of 6+ months. Officers treat unexplained gaps as a red flag.",
  },
  eca: {
    label: "Missing Educational Credential Assessment (ECA)",
    fix: "Apply for an ECA through WES, ICAS, or another IRCC-approved organization. Processing takes 7–20 business days.",
  },
  work_experience: {
    label: "Insufficient skilled work experience",
    fix: "You need at least 1 year of NOC TEER 0–3 experience in the last 10 years. Gather reference letters on company letterhead.",
  },
  ee_profile: {
    label: "Express Entry profile not yet created",
    fix: "Create your Express Entry profile in the IRCC portal to receive an Invitation to Apply (ITA).",
  },
  letter_of_acceptance: {
    label: "Missing Letter of Acceptance from a DLI",
    fix: "You must have an acceptance letter from a Designated Learning Institution before applying for a study permit.",
  },
  ties_home_country: {
    label: "Weak demonstrated ties to home country",
    fix: "Provide evidence of ties: property ownership documents, family obligation letter, or an employer letter confirming your return.",
  },
  sop: {
    label: "Missing Statement of Purpose (SOP)",
    fix: "Write a clear SOP covering: why this program, why Canada, your career plan, and how you plan to return home after studies.",
  },
  inadmissibility: {
    label: "Potential inadmissibility: criminal record or medical condition",
    fix: "Consult a registered immigration consultant (RCIC) or lawyer. You may need a Temporary Resident Permit or Rehabilitation application.",
  },
  prior_refusals: {
    label: "Prior visa refusal(s): increases officer scrutiny",
    fix: "You must disclose all prior refusals. Address each refusal in a cover letter explaining what has changed since then.",
  },
  refusal_disclosure: {
    label: "Prior refusals not fully disclosed: misrepresentation risk",
    fix: "Non-disclosure of refusals is treated as misrepresentation and can result in a 5-year ban. Disclose all refusals immediately.",
  },
  funds_traceable: {
    label: "Funds may not be clearly traceable",
    fix: "Provide source-of-funds documentation for any large deposits: pay slips, sale agreements, gift letters from family. Officers reject unexplained lump sums.",
  },
  funds_control: {
    label: "Unclear ownership or control of funds",
    fix: "If funds are from a sponsor, attach a notarized gift/sponsorship letter plus the sponsor's bank statements and proof of relationship.",
  },
  doc_authenticity: {
    label: "Document authenticity concern",
    fix: "Ensure all documents are genuine and unaltered. Inconsistencies between documents trigger misrepresentation reviews. Cross-check all names, dates, and figures.",
  },
  medical_exam: {
    label: "Medical exam not yet arranged",
    fix: "Check IRCC's designated panel physician list and book an appointment. Some programs/nationalities require upfront medical clearance.",
  },
  police_clearance: {
    label: "Police clearance certificate(s) missing",
    fix: "Obtain PCCs from all countries where you lived for 6+ months. Allow extra time, as some countries take 4-8 weeks to issue.",
  },
  app_completeness: {
    label: "Application forms may be incomplete or unsigned",
    fix: "Review every form using the official IRCC checklist. Missing signatures or dates are automatic grounds for return.",
  },
  officer_perspective: {
    label: "Application may leave credibility gaps for the reviewing officer",
    fix: "Write a cover letter proactively addressing anything that could raise doubt: unusual study choice, funding source, career gap, or prior refusal.",
  },
  reference_letter_quality: {
    label: "Reference letters may not satisfy NOC requirements",
    fix: "Letters must be on company letterhead, signed by a direct supervisor, and include: job title, start/end dates, salary, weekly hours, and a description of duties matching the NOC code.",
  },
  crs_competitiveness: {
    label: "CRS score may be below recent draw cutoffs",
    fix: "Check the latest IRCC draw results. Consider improving your score: retake language tests, get a provincial nomination (PNP), or upgrade credentials.",
  },
  purpose_credibility: {
    label: "Program choice may not appear credible given your background",
    fix: "In your SOP, draw a clear line from your past education → this program → a specific career goal in your home country. The more logical the progression, the more credible the application.",
  },
  genuine_student: {
    label: "Genuine student intent not clearly demonstrated",
    fix: "Your SOP must clearly explain how this Canadian program advances your career and why you will return home. Generic statements do not satisfy officers.",
  },
};

export function filterQuestions(appType: AppType): Question[] {
  return ALL_QUESTIONS.filter((q) => q.appTypes.includes(appType));
}

const BOOST_LABELS: Record<string, string> = {
  travel_history: "Strong international travel history: boosts officer credibility assessment",
  tuition_paid: "First-year tuition paid: demonstrates genuine student intent",
  pof_exemption_check: "Aware of proof-of-funds exemption (job offer / CEC): reduces unnecessary flags",
};

function computeSeverity(weight: 1 | 2 | 3): Severity {
  if (weight === 3) return "high";
  if (weight === 2) return "medium";
  return "low";
}

function computeCategory(question: Question): FlagCategory {
  return question.category ?? "risk_flag";
}

function isFlagged(question: Question, answer: boolean): boolean {
  if (question.flagOnYes && answer === true) return true;
  return question.flagOnNo && answer === false;
}

export function evaluateAnswers(questions: Question[], answers: Answers): RiskResult {
  const flags: RiskFlag[] = [];
  const missingDocs: string[] = [];
  const boosts: string[] = [];
  let totalWeight = 0;
  let passingWeight = 0;

  for (const question of questions) {
    // boostOnYes questions don't count toward total weight (they're optional upside)
    if (!question.boostOnYes) {
      totalWeight += question.weight;
    }
    const answer = answers[question.id];

    if (answer === undefined) continue;

    if (question.boostOnYes && answer === true) {
      boosts.push(BOOST_LABELS[question.id] ?? question.text);
      continue;
    }

    if (isFlagged(question, answer)) {
      const copy = FLAG_COPY[question.id];
      flags.push({
        questionId: question.id,
        label: copy?.label ?? question.text,
        severity: computeSeverity(question.weight),
        category: computeCategory(question),
        fix: copy?.fix ?? "Consult an immigration professional.",
      });
      if (question.missingDocLabel && answer === false) {
        missingDocs.push(question.missingDocLabel);
      }
    } else if (!question.boostOnYes) {
      passingWeight += question.weight;
    }
  }

  const score = totalWeight > 0 ? Math.round((passingWeight / totalWeight) * 100) : 100;

  return { score, flags, missingDocs, boosts };
}
