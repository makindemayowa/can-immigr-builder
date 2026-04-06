import { Severity } from "@/lib/checklist/types";

const SEVERITY_CLASSES: Record<Severity | "none", string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  none: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
};

interface BadgeProps {
  severity: Severity | "none";
  label: string;
  className?: string;
}

export function Badge({ severity, label, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        SEVERITY_CLASSES[severity],
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
