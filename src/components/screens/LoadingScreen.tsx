/* Transition loading screen (Step1→2, Step2→3). Ported from screens.jsx.
   The lit step is a cosmetic progress animation; wire it to backend SSE later
   (build spec §5.4) to reflect real worker completion. */
import { useEffect, useState } from "react";
import { Icon } from "../Icon";

export type LoadingVariant = "toRegion" | "toResults";

export function LoadingScreen({ variant }: { variant: LoadingVariant }) {
  const isResults = variant === "toResults";
  const steps = isResults
    ? ["작업 환경 평가", "생활 인프라 평가", "로컬 경험 평가"]
    : ["조건 해석", "후보 지역 탐색", "지역별 매칭"];
  const title = isResults ? "숙소를 평가하고 있어요" : "어울리는 지역을 찾고 있어요";
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLit((n) => (n + 1) % (steps.length + 1)), 620);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "40px 24px" }}>
      <div className="fade-up" style={{ textAlign: "center" }}>
        <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 22px" }}>
          <span
            style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--border-2)" }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background:
                "conic-gradient(from 0deg, transparent 0deg, var(--teal-500) 250deg, var(--teal-600) 360deg)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
              animation: "spin .9s linear infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "var(--teal-600)",
            }}
          >
            <Icon name={isResults ? "compass" : "pin"} size={24} stroke={2} />
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        <p style={{ margin: "8px 0 24px", fontSize: 14, color: "var(--ink-2)" }}>
          에이전트가 데이터를 모으는 중이에요…
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 260,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          {steps.map((s, i) => {
            const done = i < lit;
            const active = i === lit;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: done || active ? 1 : 0.4,
                  transition: "opacity .3s ease",
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: done ? "var(--teal-600)" : "transparent",
                    border: done ? "none" : "2px solid var(--border)",
                    color: "#fff",
                  }}
                >
                  {done && <Icon name="check" size={11} stroke={3} />}
                  {active && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: "var(--teal-600)",
                        animation: "pulseDot 1s ease infinite",
                      }}
                    />
                  )}
                </span>
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: done ? "var(--ink)" : "var(--ink-2)" }}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
