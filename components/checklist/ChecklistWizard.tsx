"use client";

import { useReducer } from "react";
import { filterQuestions, evaluateAnswers } from "@/lib/checklist/rules";
import { AppType, Answers, WizardAction, WizardState } from "@/lib/checklist/types";
import { Header } from "@/components/layout/Header";
import { LandingHero } from "./LandingHero";
import { AppTypeSelector } from "./AppTypeSelector";
import { QuestionStep } from "./QuestionStep";
import { ResultsPanel } from "./ResultsPanel";

const INITIAL_STATE: WizardState = {
  phase: "landing",
  appType: null,
  activeQuestions: [],
  currentStep: 0,
  answers: {},
  result: null,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "START":
      return { ...INITIAL_STATE, phase: "wizard", currentStep: 0 };

    case "SELECT_APP_TYPE":
      return {
        ...state,
        appType: action.appType,
        activeQuestions: action.questions,
        currentStep: 1,
        answers: {},
      };

    case "ANSWER": {
      const answers: Answers = { ...state.answers, [action.questionId]: action.value };
      const isLast = state.currentStep === state.activeQuestions.length;
      if (isLast) {
        const result = evaluateAnswers(state.activeQuestions, answers);
        return { ...state, answers, phase: "results", result };
      }
      return { ...state, answers, currentStep: state.currentStep + 1 };
    }

    case "BACK": {
      if (state.currentStep <= 1) {
        return { ...INITIAL_STATE, phase: "wizard", currentStep: 0 };
      }
      const prevQuestionId = state.activeQuestions[state.currentStep - 1]?.id;
      const answers = { ...state.answers };
      if (prevQuestionId) delete answers[prevQuestionId];
      return { ...state, answers, currentStep: state.currentStep - 1 };
    }

    case "SHOW_RESULTS":
      return { ...state, phase: "results", result: action.result };

    case "RESTART":
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function ChecklistWizard() {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_STATE);

  function handleSelectAppType(appType: AppType) {
    dispatch({ type: "SELECT_APP_TYPE", appType, questions: filterQuestions(appType) });
  }

  function handleAnswer(questionId: string, value: boolean) {
    dispatch({ type: "ANSWER", questionId, value });
  }

  function handleBack() {
    dispatch({ type: "BACK" });
  }

  const currentQuestion =
    state.phase === "wizard" && state.currentStep >= 1
      ? state.activeQuestions[state.currentStep - 1]
      : null;

  const isHome = state.phase === "landing";
  const showBack = state.phase === "wizard" && state.currentStep === 0;

  return (
    <>
      <Header onHome={isHome ? undefined : () => dispatch({ type: "RESTART" })} />
      {showBack && (
        <div className="fixed top-14 inset-x-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto h-10 flex items-center">
            <button
              onClick={() => dispatch({ type: "RESTART" })}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hocus:text-gray-900 dark:hocus:text-white transition-colors"
            >
              <span aria-hidden>&#8592;</span>
              Back
            </button>
          </div>
        </div>
      )}
      <div className={`min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 flex flex-col items-center justify-center pb-16 px-4 ${showBack ? "pt-32" : "pt-24"}`}>
      {state.phase === "landing" && (
        <LandingHero onStart={() => dispatch({ type: "START" })} />
      )}

      {state.phase === "wizard" && state.currentStep === 0 && (
        <AppTypeSelector onSelect={handleSelectAppType} />
      )}

      {state.phase === "wizard" && currentQuestion && (
        <QuestionStep
          question={currentQuestion}
          stepNumber={state.currentStep}
          totalSteps={state.activeQuestions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          canGoBack={state.currentStep > 1}
        />
      )}

      {state.phase === "results" && state.result && state.appType && (
        <ResultsPanel
          appType={state.appType}
          result={state.result}
          onRestart={() => dispatch({ type: "RESTART" })}
        />
      )}
    </div>
    </>
  );
}
