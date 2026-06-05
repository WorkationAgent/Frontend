/* Step 3 — Accommodation result card + collapsible evaluation sections.
   Ported from cards.jsx (AccommodationCard + AccordionSection). */
import { useState } from "react";
import type { AccommodationResult, EvaluationSection, SectionKind } from "../types";
import { Icon } from "./Icon";
import { KakaoMap } from "./KakaoMap";
import { CategoryBar, RankCircle, ScoreCircle } from "./primitives";

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
          <span style={{ color: m.color, display: "inline-flex", flexShrink: 0 }}>
            <Icon name={kind} size={17} stroke={2} />
          </span>
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
                {it.distance_text && (
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                      padding: "3px 9px",
                      borderRadius: 999,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border-2)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--ink-2)",
                      whiteSpace: "nowrap",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {it.distance_text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AccommodationCard({
  acc,
  index,
  matchedConditions,
}: {
  acc: AccommodationResult;
  index: number;
  matchedConditions?: string[];
}) {
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
        {/* 사용자 조건과 맞는 부분 (지도 위) */}
        {matchedConditions && matchedConditions.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {matchedConditions.map((c, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-2)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink-2)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "var(--good)", display: "inline-flex", flexShrink: 0 }}>
                  <Icon name="check" size={13} stroke={2.6} />
                </span>
                {c}
              </span>
            ))}
          </div>
        )}

        <KakaoMap
          center={acc.center}
          points={acc.map_points}
          radiusM={acc.search_radius_m}
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

        {/* 숙소 기본정보 (가격 · 연락처 · 홈페이지) */}
        <AccommodationInfo info={acc.accommodation_info} />
      </div>
    </div>
  );
}

function AccommodationInfo({
  info,
}: {
  info?: { price?: string; phone?: string; homepage?: string };
}) {
  if (!info || (!info.price && !info.phone && !info.homepage)) return null;
  const href = info.homepage
    ? info.homepage.startsWith("http")
      ? info.homepage
      : `https://${info.homepage}`
    : undefined;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 9,
        padding: "13px 15px",
        borderRadius: "var(--r-md)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-2)",
      }}
    >
      {info.price && <InfoRow icon="won" text={info.price} />}
      {info.phone && <InfoRow icon="phone" text={info.phone} />}
      {info.homepage && <InfoRow icon="link" text={info.homepage} href={href} />}
    </div>
  );
}

function InfoRow({
  icon,
  text,
  href,
}: {
  icon: "won" | "phone" | "link";
  text: string;
  href?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
      <span style={{ color: "var(--ink-3)", display: "inline-flex", flexShrink: 0 }}>
        <Icon name={icon} size={15} stroke={1.9} />
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--teal-700)",
            textDecoration: "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </a>
      ) : (
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink-2)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
