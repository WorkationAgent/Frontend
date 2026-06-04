/* Step 2 — Region candidate card. Ported from cards.jsx (RegionCard). */
import type { RegionCandidate } from "../types";
import { Icon } from "./Icon";
import { RegionBanner } from "./Media";

export function RegionCard({
  region,
  onSelect,
  index,
}: {
  region: RegionCandidate;
  onSelect: () => void;
  index: number;
}) {
  const best = region.is_best;
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
      <div style={{ position: "relative" }}>
        <RegionBanner photoUrl={region.photo_url} />
        {best && (
          <span
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.92)",
              color: "var(--teal-700)",
              fontSize: 12.5,
              fontWeight: 800,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,.12)",
            }}
          >
            가장 적합
          </span>
        )}
      </div>

      <div
        style={{
          padding: "20px 20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {region.name}
          </h3>
          <div
            style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-3)", marginTop: 5 }}
          >
            {region.living_area}
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.65,
            color: "var(--ink-2)",
            textWrap: "pretty",
          }}
        >
          {region.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {region.tags.map((t, i) => (
            <span
              key={i}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--ink-2)",
                whiteSpace: "nowrap",
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--border-2)", margin: "2px 0" }} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
          <span style={{ color: "var(--good)", marginTop: 2, flexShrink: 0 }}>
            <Icon name="check" size={16} stroke={2.6} />
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--ink)",
              textWrap: "pretty",
            }}
          >
            {region.match_summary}
          </p>
        </div>

        <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {region.weaknesses.map((w, i) => (
            <li
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 9, listStyle: "none" }}
            >
              <span style={{ color: "var(--warn)", marginTop: 1, flexShrink: 0 }}>
                <Icon name="warn" size={15} stroke={2.2} />
              </span>
              <span
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.45,
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
              >
                {w}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          style={{
            marginTop: "auto",
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 16px",
            borderRadius: "var(--r-md)",
            fontSize: 15,
            fontWeight: 700,
            whiteSpace: "nowrap",
            background: "var(--surface)",
            color: "var(--teal-700)",
            border: "1.5px solid var(--teal-600)",
            transition: "transform .15s ease, background .2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.background = "var(--teal-50)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "var(--surface)";
          }}
        >
          이 지역 선택
        </button>
      </div>
    </div>
  );
}
