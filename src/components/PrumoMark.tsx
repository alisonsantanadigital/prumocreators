interface PrumoMarkProps {
  className?: string;
}

/**
 * Monograma arquitetônico contemporâneo da Prumo Creators:
 * coluna estrutural vertical, arco geométrico "P" e ponto de prumo dourado.
 */
export function PrumoMark({ className = 'w-6 h-6' }: PrumoMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="5" y="4" width="4.5" height="28" fill="currentColor" />
      <path
        d="M13 4H23.2C28.4 4 31.5 6.9 31.5 11.6C31.5 16.3 28.4 19.2 23.2 19.2H13V15H22.6C25.4 15 27 13.7 27 11.6C27 9.5 25.4 8.2 22.6 8.2H13V4Z"
        fill="currentColor"
      />
      <rect x="13" y="25.5" width="6.5" height="6.5" fill="#A58A58" />
    </svg>
  );
}
