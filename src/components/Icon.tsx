/* Icon set — stroke-based 24×24 line icons. Only icons actually used in the UI. */
import type { CSSProperties } from "react";

export type IconName =
  | "check"
  | "warn"
  | "spark"
  | "pin"
  | "compass"
  | "chevron"
  | "work"
  | "living"
  | "local"
  | "won"
  | "phone"
  | "link";

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
}

export function Icon({ name, size = 16, stroke = 1.7, style }: IconProps) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style,
  };
  switch (name) {
    case "check":
      return (
        <svg {...p}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case "warn":
      return (
        <svg {...p}>
          <path d="M12 9v4M12 17h.01M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...p}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...p}>
          <path d="M3 11l8-7 8 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "work":
      return (
        <svg {...p}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
        </svg>
      );
    case "living":
      return (
        <svg {...p}>
          <path d="M4 9.5 12 4l8 5.5M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
          <path d="M9.5 20v-5h5v5" />
        </svg>
      );
    case "local":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "won":
      return (
        <svg {...p}>
          <path d="M4 7l3 10 3-8 2 8 3-10M3.5 11h17" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h3l1.6 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.6V18a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 5 4Z" />
        </svg>
      );
    case "link":
      return (
        <svg {...p}>
          <path d="M14 7h3a4 4 0 0 1 0 8h-3M10 17H7a4 4 0 0 1 0-8h3M8.5 12h7" />
        </svg>
      );
    default:
      return null;
  }
}
