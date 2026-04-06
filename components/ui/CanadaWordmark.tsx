interface CanadaWordmarkProps {
  flagOnly?: boolean;
}

export function CanadaWordmark({ flagOnly = false }: CanadaWordmarkProps) {
  if (flagOnly) return <CanadaFlagSVG />;

  return (
    <div className="flex items-center gap-3">
      <CanadaFlagSVG />
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-bold text-gray-900 dark:text-white font-lato tracking-tight">
          Government of Canada
        </span>
        <span className="text-[11px] text-gray-600 dark:text-gray-400 font-noto italic">
          Gouvernement du Canada
        </span>
      </div>
    </div>
  );
}

function CanadaFlagSVG() {
  return (
    <svg
      viewBox="0 0 100 50"
      width="48"
      height="24"
      aria-label="Canadian flag"
      role="img"
      className="shrink-0"
    >
      <rect x="0" y="0" width="25" height="50" fill="#cc0000" />
      <rect x="25" y="0" width="50" height="50" fill="#ffffff" />
      <rect x="75" y="0" width="25" height="50" fill="#cc0000" />
      <path
        fill="#cc0000"
        d="M50,8 L52,17 L61,14 L57,22 L66,24 L59,29 L61,38 L50,34 L39,38 L41,29 L34,24 L43,22 L39,14 L48,17 Z"
      />
      <rect x="48" y="34" width="4" height="8" fill="#cc0000" />
    </svg>
  );
}
