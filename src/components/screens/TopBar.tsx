/* App-wide top bar: brand · stepper · menu. Ported from screens.jsx (TopBar). */
import { Icon } from "../Icon";
import { Stepper } from "../primitives";

export const MAXW = 1140;

export function TopBar({ step }: { step: number }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(244,241,232,0.82)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-2)",
      }}
    >
      <div
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "13px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              background: "var(--grad)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Wokation Agent
          </span>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Stepper current={step} />
        </div>
        <button
          aria-label="더보기"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            color: "var(--ink-3)",
            display: "grid",
            placeItems: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border-2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Icon name="dots" size={18} stroke={2.4} />
        </button>
      </div>
    </header>
  );
}
