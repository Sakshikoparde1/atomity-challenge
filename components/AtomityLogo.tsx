"use client";

interface AtomityLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Atomity "A" mark — custom SVG recreated from brand identity.
 * Features: wide bold A, rounded apex, triangular counter, diagonal crossbar cut on right leg.
 */
export default function AtomityLogo({ size = 32, color = "currentColor", className }: AtomityLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Atomity logo"
      role="img"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M100 8
          C108 8 114 13 117 20
          L197 195
          C200 202 196 210 189 210
          L148 210
          C144 210 141 207 139 203
          L130 182
          L70 182
          L61 203
          C59 207 56 210 52 210
          L11 210
          C4 210 0 202 3 195
          L83 20
          C86 13 92 8 100 8
          Z

          M100 55
          L74 126
          L126 126
          L100 55
          Z

          M126 126
          L148 210
          L130 182
          L116 145
          Z
        "
        fill={color}
      />
    </svg>
  );
}
