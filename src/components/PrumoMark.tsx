interface PrumoMarkProps {
  className?: string;
}

/**
 * Emblema arquitetônico geométrico da Prumo Creators:
 * eixo vertical de prumo com peso losangular em equilíbrio.
 */
export function PrumoMark({ className = 'w-6 h-10' }: PrumoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 56"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line x1="16" y1="2" x2="16" y2="38" stroke="#A58A58" strokeWidth="1" />
      <line x1="6" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="1" />
      <polygon
        points="16,30 23,41 16,52 9,41"
        stroke="currentColor"
        strokeWidth="1.15"
        fill="none"
      />
      <circle cx="16" cy="41" r="1.5" fill="#A58A58" />
    </svg>
  );
}
