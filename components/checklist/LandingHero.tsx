import { Button } from "@/components/ui/Button";

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto px-4">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
          Free Pre-Submission Audit
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
          Avoid visa{" "}
          <span className="text-red-700 dark:text-red-500">rejection.</span>
          {" "}Get an instant risk report in 2 minutes.
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          AI-powered checklist for Canadian immigration applications. Catch errors,
          missing documents, and risk flags in under 2 minutes.
        </p>
      </div>

      <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
        Check My Application Risk (Free)
      </Button>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
        {["No sign-up required", "2 minutes to complete", "Instant risk report"].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className="text-green-500" aria-hidden>✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500">
        <span>Express Entry</span>
        <span>·</span>
        <span>Study Permit</span>
        <span>·</span>
        <span className="opacity-50">Spousal Sponsorship (coming soon)</span>
      </div>
    </section>
  );
}
