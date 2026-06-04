/* Curated travel palettes with gradient + aurora support, ported from the
   Claude Design handoff (palettes.js). The Aurora default is already seeded in
   theme.css for first paint; call applyPalette() to switch at runtime.

   Switching re-sets every CSS custom property the design reads from. */

export type PaletteName =
  | "에메랄드"
  | "오로라"
  | "코랄 리프"
  | "프리즘"
  | "아이시 블루"
  | "세이지 코스트"
  | "선셋 듄";

type Palette = Record<string, string>;

export const PALETTES: Record<PaletteName, Palette> = {
  에메랄드: {
    bg: "#F1F5F1", surface: "#FFFFFF", "surface-2": "#F6FAF6",
    ink: "#1B2A23", "ink-2": "#47564D", "ink-3": "#85938A",
    border: "#DEE8E0", "border-2": "#E9F0EA",
    "teal-700": "#147A56", "teal-600": "#1A9E6E", "teal-500": "#27B27E",
    "teal-100": "#D3EEE1", "teal-50": "#E9F7F0",
    sage: "#9DD0B5", "sage-soft": "#D3EEE1",
    "lav-text": "#5560C8", "lav-bg": "#E7E9FA",
    "pin-stay": "#1A9E6E", "pin-work": "#DD6235", "pin-local": "#D9982F", "pin-life": "#8A6BF0",
    good: "#1A9E6E", warn: "#DD6235",
    grad: "linear-gradient(120deg, #149E73 0%, #28B07E 55%, #41C28A 100%)",
    aurora:
      "radial-gradient(circle at 8% 6%, rgba(20,158,115,.16), transparent 42%), radial-gradient(circle at 94% 4%, rgba(65,194,138,.13), transparent 40%)",
  },
  오로라: {
    bg: "#EEF1F8", surface: "#FFFFFF", "surface-2": "#F7F9FD",
    ink: "#1E2433", "ink-2": "#495069", "ink-3": "#8A90A6",
    border: "#E0E4EF", "border-2": "#ECEFF7",
    "teal-700": "#2C55B8", "teal-600": "#3B6FE0", "teal-500": "#5A86F0",
    "teal-100": "#DCE6FB", "teal-50": "#EEF3FE",
    sage: "#A9C0E6", "sage-soft": "#DCE6FB",
    "lav-text": "#5560C8", "lav-bg": "#E7E9FA",
    "pin-stay": "#3B6FE0", "pin-work": "#FF6F7D", "pin-local": "#28C0C8", "pin-life": "#8A6BF0",
    good: "#1FA89F", warn: "#E07A5F",
    grad: "linear-gradient(120deg, #2E7CF6 0%, #6E5BE6 52%, #2BC4C9 100%)",
    aurora:
      "radial-gradient(circle at 8% 6%, rgba(46,124,246,.20), transparent 42%), radial-gradient(circle at 94% 2%, rgba(110,91,230,.18), transparent 40%), radial-gradient(circle at 72% 96%, rgba(43,196,201,.16), transparent 46%)",
  },
  "코랄 리프": {
    bg: "#ECF3F3", surface: "#FFFFFF", "surface-2": "#F6FAFA",
    ink: "#182A2D", "ink-2": "#45595C", "ink-3": "#82959A",
    border: "#DBE7E6", "border-2": "#E8F0EF",
    "teal-700": "#0E7886", "teal-600": "#129BAA", "teal-500": "#2BB3C0",
    "teal-100": "#D2EEF1", "teal-50": "#EAF7F9",
    sage: "#9AD0CF", "sage-soft": "#D2EEF1",
    "lav-text": "#C25B72", "lav-bg": "#FBE7EC",
    "pin-stay": "#129BAA", "pin-work": "#FF6F7D", "pin-local": "#FFB14E", "pin-life": "#7E78E0",
    good: "#129BAA", warn: "#E07A5F",
    grad: "linear-gradient(120deg, #0F93A6 0%, #36C0C4 46%, #FF7E8A 100%)",
    aurora:
      "radial-gradient(circle at 8% 6%, rgba(18,155,170,.20), transparent 42%), radial-gradient(circle at 94% 6%, rgba(255,111,125,.17), transparent 40%), radial-gradient(circle at 62% 96%, rgba(126,120,224,.13), transparent 46%)",
  },
  프리즘: {
    bg: "#F0F1F8", surface: "#FFFFFF", "surface-2": "#F8F8FD",
    ink: "#232536", "ink-2": "#4E5066", "ink-3": "#8F90A6",
    border: "#E4E4F0", "border-2": "#EFEFF7",
    "teal-700": "#5149C0", "teal-600": "#6E6BE6", "teal-500": "#8A86F0",
    "teal-100": "#E4E2FB", "teal-50": "#F1F0FE",
    sage: "#B9B6EC", "sage-soft": "#E4E2FB",
    "lav-text": "#6E6BE6", "lav-bg": "#ECEBFB",
    "pin-stay": "#6E6BE6", "pin-work": "#FF7E8A", "pin-local": "#FFB04E", "pin-life": "#34C0C8",
    good: "#1FA89F", warn: "#E07A5F",
    grad: "linear-gradient(120deg, #5B8DEF 0%, #8E6FE6 38%, #E96FB0 72%, #FF8A6B 100%)",
    aurora:
      "radial-gradient(circle at 6% 8%, rgba(91,141,239,.18), transparent 40%), radial-gradient(circle at 42% 0%, rgba(142,111,230,.16), transparent 38%), radial-gradient(circle at 80% 4%, rgba(233,111,176,.16), transparent 40%), radial-gradient(circle at 96% 64%, rgba(255,138,107,.14), transparent 44%)",
  },
  "아이시 블루": {
    bg: "#EEF2F8", surface: "#FFFFFF", "surface-2": "#F7FAFD",
    ink: "#1B2738", "ink-2": "#46546B", "ink-3": "#8893A6",
    border: "#DFE5EF", "border-2": "#EBEFF7",
    "teal-700": "#1F66B8", "teal-600": "#2F86E6", "teal-500": "#4FA0F0",
    "teal-100": "#D8E8FB", "teal-50": "#EDF4FE",
    sage: "#A6C8E6", "sage-soft": "#D8E8FB",
    "lav-text": "#4E72C0", "lav-bg": "#E6ECFA",
    "pin-stay": "#2F86E6", "pin-work": "#FF6F7D", "pin-local": "#2BC4C9", "pin-life": "#8A6BF0",
    good: "#1FA89F", warn: "#E07A5F",
    grad: "linear-gradient(135deg, #2F86E6 0%, #4FB6E6 60%, #2BC4C9 100%)",
    aurora:
      "radial-gradient(circle at 8% 6%, rgba(47,134,230,.18), transparent 42%), radial-gradient(circle at 94% 8%, rgba(79,182,230,.16), transparent 40%), radial-gradient(circle at 60% 96%, rgba(43,196,201,.12), transparent 46%)",
  },
  "세이지 코스트": {
    bg: "#F4F1E8", surface: "#FFFFFF", "surface-2": "#FBFAF4",
    ink: "#26302B", "ink-2": "#515B54", "ink-3": "#8A938B",
    border: "#E6E2D5", "border-2": "#EFEBDF",
    "teal-700": "#195443", "teal-600": "#1F6F5C", "teal-500": "#2E8570",
    "teal-100": "#DCEAE4", "teal-50": "#ECF3EF",
    sage: "#A7C4A0", "sage-soft": "#DCE7D6",
    "lav-text": "#6657A8", "lav-bg": "#ECE9F7",
    "pin-stay": "#1F6F5C", "pin-work": "#E07A5F", "pin-local": "#E2A33C", "pin-life": "#D389A6",
    good: "#2E8570", warn: "#B47A33",
    grad: "linear-gradient(120deg, #1F6F5C 0%, #3E9E86 100%)",
    aurora:
      "radial-gradient(circle at 12% 8%, rgba(167,196,160,.18), transparent 40%), radial-gradient(circle at 88% 4%, rgba(46,133,112,.10), transparent 36%)",
  },
  "선셋 듄": {
    bg: "#F8F1E8", surface: "#FFFFFF", "surface-2": "#FCF7EF",
    ink: "#322822", "ink-2": "#5E5249", "ink-3": "#998C7E",
    border: "#ECE1D4", "border-2": "#F2E9DD",
    "teal-700": "#A04D2C", "teal-600": "#C2633C", "teal-500": "#D27C50",
    "teal-100": "#F4DFCF", "teal-50": "#FAEFE5",
    sage: "#C4A878", "sage-soft": "#EADFCB",
    "lav-text": "#8A5B72", "lav-bg": "#F4E7EC",
    "pin-stay": "#C2633C", "pin-work": "#5E8C86", "pin-local": "#D9A441", "pin-life": "#B07BA0",
    good: "#4E8A6B", warn: "#B4682F",
    grad: "linear-gradient(120deg, #C2633C 0%, #E0A155 100%)",
    aurora:
      "radial-gradient(circle at 10% 6%, rgba(194,99,60,.14), transparent 40%), radial-gradient(circle at 90% 8%, rgba(217,164,65,.13), transparent 38%)",
  },
};

export const PALETTE_NAMES: PaletteName[] = [
  "에메랄드",
  "오로라",
  "코랄 리프",
  "프리즘",
  "아이시 블루",
  "세이지 코스트",
  "선셋 듄",
];

export const DEFAULT_PALETTE: PaletteName = "오로라";

export const RADIUS_PRESETS = {
  작게: { sm: "5px", md: "8px", lg: "11px", xl: "15px" },
  보통: { sm: "8px", md: "12px", lg: "16px", xl: "22px" },
  크게: { sm: "11px", md: "16px", lg: "22px", xl: "28px" },
} as const;

export type RadiusName = keyof typeof RADIUS_PRESETS;

/** Apply a palette by setting every CSS custom property it defines. */
export function applyPalette(name: PaletteName): void {
  const p = PALETTES[name] ?? PALETTES[DEFAULT_PALETTE];
  const root = document.documentElement;
  Object.keys(p).forEach((k) => root.style.setProperty("--" + k, p[k]));
}

/** Apply a corner-radius preset. */
export function applyRadius(key: RadiusName): void {
  const r = RADIUS_PRESETS[key] ?? RADIUS_PRESETS["보통"];
  Object.keys(r).forEach((k) => root().style.setProperty("--r-" + k, r[k as keyof typeof r]));
}
function root() {
  return document.documentElement;
}
