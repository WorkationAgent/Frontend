/* Step 3 — accommodation results. Ported from screens.jsx (ResultsScreen). */
import type { RecommendResponse } from "../../types";
import { Icon } from "../Icon";
import { AccommodationCard } from "../AccommodationCard";
import { MAXW } from "./TopBar";

export function ResultsScreen({
  results,
  onRestart,
}: {
  results: RecommendResponse;
  onRestart: () => void;
}) {
  return (
    <div>
      {/* full-bleed gradient banner */}
      <div
        className="fade-in"
        style={{ background: "var(--grad)", color: "#fff", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.06))",
          }}
        />
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "30px 24px 34px",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>추천 지역 및 생활권</div>
            <h1
              style={{
                margin: "6px 0 8px",
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {results.recommended_region}
            </h1>
            <p style={{ margin: 0, fontSize: 14.5, opacity: 0.92 }}>{results.results_subtitle}</p>
          </div>
          <button
            onClick={onRestart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "11px 16px",
              borderRadius: "var(--r-md)",
              fontSize: 13.5,
              fontWeight: 700,
              color: "#fff",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.45)",
              whiteSpace: "nowrap",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
          >
            <Icon name="spark" size={15} stroke={2} /> 처음으로 돌아가기
          </button>
        </div>
      </div>
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "28px 24px 90px" }}>
        <div className="grid-cards" style={{ alignItems: "start" }}>
          {results.candidates.map((a, i) => (
            <AccommodationCard
              key={a.rank}
              acc={a}
              index={i}
              matchedConditions={a.matched_conditions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
