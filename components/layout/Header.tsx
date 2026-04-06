"use client";

import { CanadaWordmark } from "@/components/ui/CanadaWordmark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onHome?: () => void;
}

export function Header({ onHome }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <button
          onClick={onHome}
          disabled={!onHome}
          className="flex items-center gap-3 disabled:cursor-default"
          aria-label="Go to home"
        >
          <CanadaWordmark flagOnly />
          <span className="font-lato font-bold text-gc-red dark:text-red-500 text-base tracking-tight">
            IRCC Pre-Check
          </span>
        </button>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 font-noto">
            Immigration pre-submission audit
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
