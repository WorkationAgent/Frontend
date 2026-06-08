/* Primitives — chips, stepper, score badges, category bars.
   Ported faithfully from primitives.jsx (inline-style design system). */
import { Icon } from "./Icon";

/* ── Lavender chip used for parsed conditions ── */
type ChipTone = "lav" | "ghost";
export function Chip({
  children,
  tone = "lav",
}: {
  children: React.ReactNode;
  tone?: ChipTone;
}) {
  const tones: Record<ChipTone, { bg: string; color: string; border?: string }> = {
    lav: { bg: "var(--lav-bg)", color: "var(--lav-text)" },
    ghost: { bg: "transparent", color: "var(--ink-3)", border: "1px solid var(--border)" },
  };
  const t = tones[tone] ?? tones.lav;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 11px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        background: t.bg,
        color: t.color,
        border: t.border ?? "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function ConditionChips({ items, label }: { items: string[]; label?: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
      {label && (
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-3)", marginRight: 2 }}>
          {label}
        </span>
      )}
      {items.map((c, i) => (
        <Chip key={i}>{c}</Chip>
      ))}
    </div>
  );
}

/* ── Top step indicator: done = check, current = filled, future = grey ── */
export function Stepper({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "조건 입력" },
    { n: 2, label: "지역 선택" },
    { n: 3, label: "숙소 추천" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} style={{ display: "contents" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  background: done || active ? "var(--grad)" : "var(--border-2)",
                  color: done || active ? "#fff" : "var(--ink-3)",
                  boxShadow: active ? "0 0 0 4px var(--teal-100)" : "none",
                  transition: "all .3s ease",
                }}
              >
                {done ? <Icon name="check" size={13} stroke={2.6} /> : s.n}
              </span>
              <span
                style={{
                  fontSize: 14.5,
                  fontWeight: active ? 700 : 600,
                  whiteSpace: "nowrap",
                  color: active ? "var(--ink)" : done ? "var(--ink-2)" : "var(--ink-3)",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                style={{
                  width: 26,
                  height: 2,
                  borderRadius: 2,
                  background: done ? "var(--teal-100)" : "var(--border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Big circular overall score with /100 ── */
export function ScoreCircle({ value }: { value: number }) {
  return (
    <span
      style={{
        width: 58,
        height: 58,
        borderRadius: 999,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--grad)",
        color: "#fff",
        lineHeight: 1,
        boxShadow: "0 4px 14px rgba(44,85,184,.30)",
      }}
    >
      <span
        style={{
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>/ 100</span>
    </span>
  );
}

/* ── Rank medal circle: 1위 amber · 2위 slate · 3위 bronze ── */
export function RankCircle({ rank }: { rank: number }) {
  const bg = rank === 1 ? "var(--rank-1)" : rank === 2 ? "var(--rank-2)" : "var(--rank-3)";
  return (
    <span
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        background: bg,
        color: "#fff",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        boxShadow: "0 2px 8px rgba(38,48,43,.18)",
      }}
    >
      {rank}위
    </span>
  );
}

/* ── Category score bar (work/living/local fixed colors) ── */
export function CategoryBar({
  label,
  value,
  color,
  skipped,
}: {
  label: string;
  value: number;
  color: string;
  skipped?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "58px 1fr 30px",
        alignItems: "center",
        gap: 12,
        opacity: skipped ? 0.55 : 1,
      }}
    >
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)" }}>{label}</span>
      <span
        style={{
          height: 7,
          borderRadius: 999,
          background: "var(--border-2)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            height: "100%",
            width: skipped ? "0%" : `${value}%`,
            background: color,
            borderRadius: 999,
          }}
        />
      </span>
      <span
        style={{
          fontSize: 14.5,
          fontWeight: 800,
          color: skipped ? "var(--ink-3)" : color,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {skipped ? "—" : value}
      </span>
    </div>
  );
}
