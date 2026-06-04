/* Step 3 — Accommodation result card + collapsible evaluation sections.
   Ported from cards.jsx (AccommodationCard + AccordionSection). */
import { useState } from "react";
import type { AccommodationResult, EvaluationSection, SectionKind } from "../types";
import { Icon } from "./Icon";
import { KakaoMap } from "./KakaoMap";
import { CategoryBar, RankCircle, ScoreCircle, StarRating } from "./primitives";

const SECTION_META: Record<SectionKind, { title: string; color: string; bg: string }> = {
  work: { title: "Work Environment", color: "var(--cat-work)", bg: "var(--cat-work-bg)" },
  living: { title: "Living Elements", color: "var(--cat-living)", bg: "var(--cat-living-bg)" },
  local: { title: "Local Experiences", color: "var(--cat-local)", bg: "var(--cat-local-bg)" },
};

function AccordionSection({ kind, data }: { kind: SectionKind; data: EvaluationSection }) {
  const [open, setOpen] = useState(true);
  const m = SECTION_META[kind];
  return (
    <div
      style={{
        borderRadius: "var(--r-md)",
        border: "1px solid var(--border-2)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "12px 14px",
          background: m.bg,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, minWidth: 0 }}>
          <span
            style={{ width: 9, height: 9, borderRadius: 999, background: m.color, flexShrink: 0 }}
          />
          <span
            style={{ fontSize: 14.5, fontWeight: 800, color: m.color, whiteSpace: "nowrap" }}
          >
            {m.title}
          </span>
          <span
            style={{
              padding: "2px 9px",
              borderRadius: 999,
              border: `1px solid ${m.color}`,
              color: m.color,
              fontSize: 11.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {data.score}점
          </span>
        </span>
        <span
          style={{
            color: m.color,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform .2s ease",
            flexShrink: 0,
          }}
        >
          <Icon name="chevron" size={18} stroke={2.4} />
        </span>
      </button>
      {open && (
        <div
          className="fade-in"
          style={{
            padding: "14px 15px 16px",
            background: "var(--surface)",
            display: "flex",
            flexDirection: "column",
            gap: 13,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              textWrap: "pretty",
            }}
          >
            {data.summary}
          </p>
          <div style={{ height: 1, background: "var(--border-2)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {data.items.map((it, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                    {it.name}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>
                    {it.sub}
                  </div>
                </div>
                <span style={{ marginTop: 1 }}>
                  <StarRating value={it.rating} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AccommodationCard({ acc, index }: { acc: AccommodationResult; index: number }) {
  const best = acc.rank === 1;
  const cs = acc.category_scores;
  return (
    <div
      className="fade-up"
      style={{
        animationDelay: `${index * 90}ms`,
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        borderRadius: "var(--r-lg)",
        border: best ? "2px solid var(--teal-600)" : "1px solid var(--border)",
        boxShadow: best ? "var(--shadow-lg)" : "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          padding: "16px 18px",
          background: best ? "var(--teal-50)" : "var(--surface)",
          borderBottom: "1px solid var(--border-2)",
        }}
      >
        <RankCircle rank={acc.rank} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 17.5,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            {acc.name}
          </h3>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.4 }}>
            {acc.address}
          </div>
        </div>
        <ScoreCircle value={acc.overall_score} />
      </div>

      <div
        style={{
          padding: "16px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <KakaoMap
          center={acc.center}
          points={acc.map_points}
          fallbackVariant={acc.map?.variant}
          fallbackScale={acc.map?.scale}
        />

        {/* category scores */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-3)" }}>카테고리 점수</div>
          <CategoryBar label="Work" value={cs.work} color="var(--cat-work)" />
          <CategoryBar label="Living" value={cs.living} color="var(--cat-living)" />
          <CategoryBar label="Local" value={cs.local} color="var(--cat-local)" />
        </div>

        {/* accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <AccordionSection kind="work" data={acc.sections.work} />
          <AccordionSection kind="living" data={acc.sections.living} />
          <AccordionSection kind="local" data={acc.sections.local} />
        </div>
      </div>
    </div>
  );
}
