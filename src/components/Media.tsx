/* Media placeholders — stylized stand-ins for the KTO scene banner and Kakao map.
   No real API keys in the prototype; these mirror the mockup look.
   Production: swap RegionBanner for the KTO photo (region.photo_url) and
   MapPlaceholder for a real Kakao Maps embed (keep the same outer box +
   scale-bar overlay). Ported from media.jsx. */
import type { MapVariant } from "../types";

/* ── Region banner: palette gradient + floating beach-umbrella glyph.
      If photoUrl is provided (KTO firstimage via backend proxy), show it. ── */
export function RegionBanner({ height = 150, photoUrl }: { height?: number; photoUrl?: string }) {
  if (photoUrl) {
    return (
      <div style={{ position: "relative", height, overflow: "hidden" }}>
        <img
          src={photoUrl}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.18) 100%)",
          }}
        />
      </div>
    );
  }
  return (
    <div style={{ position: "relative", height, background: "var(--grad)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,.10) 100%)",
        }}
      />
      {/* beach umbrella + islet */}
      <svg
        viewBox="0 0 120 120"
        width="84"
        height="84"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-54%)",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,.18))",
        }}
      >
        <ellipse cx="60" cy="92" rx="34" ry="11" fill="#F4D58A" />
        <ellipse cx="60" cy="92" rx="34" ry="11" fill="#000" opacity="0.04" />
        <path
          d="M18 95 q 42 16 84 0"
          stroke="#7FE0E6"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        <rect x="58.5" y="40" width="3" height="50" rx="1.5" fill="#C9762F" />
        <path
          d="M60 38 a30 22 0 0 1 30 16 q-15-6-30 0 q-15-6-30 0 a30 22 0 0 1 30-16Z"
          fill="#FF6F61"
        />
        <path d="M60 38 q9 8 12 16 q-6-2.4-12 0 Z" fill="#FFF4E8" />
        <path d="M60 38 q-9 8-12 16 q6-2.4 12 0 Z" fill="#FFF4E8" />
        <circle cx="60" cy="38" r="3" fill="#FFCC4D" />
      </svg>
    </div>
  );
}

/* ── Realistic-ish Kakao map placeholder ── */
type Variant = {
  water: "br" | "tr" | "bottom";
  road: "diagH" | "highway" | "diag";
  main: { x: number; y: number };
  pois: [number, number][];
};

const MAP_VARIANTS: Record<MapVariant, Variant> = {
  a: {
    water: "br",
    road: "diagH",
    main: { x: 0.5, y: 0.52 },
    pois: [
      [0.28, 0.34],
      [0.62, 0.3],
      [0.74, 0.58],
      [0.4, 0.7],
    ],
  },
  b: {
    water: "bottom",
    road: "highway",
    main: { x: 0.55, y: 0.6 },
    pois: [
      [0.32, 0.66],
      [0.7, 0.5],
      [0.46, 0.42],
    ],
  },
  c: {
    water: "tr",
    road: "diag",
    main: { x: 0.52, y: 0.55 },
    pois: [
      [0.3, 0.4],
      [0.68, 0.36],
      [0.6, 0.66],
      [0.78, 0.5],
    ],
  },
};

export function MapPlaceholder({
  variant = "a",
  scale = "250m",
  height = 160,
}: {
  variant?: MapVariant;
  scale?: string;
  height?: number;
}) {
  const v = MAP_VARIANTS[variant] ?? MAP_VARIANTS.a;
  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: "var(--r-md)",
        overflow: "hidden",
        border: "1px solid var(--border-2)",
      }}
    >
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: "block", position: "absolute", inset: 0 }}
      >
        <rect width="400" height="200" fill="#F2F3EF" />
        {/* parks / green */}
        <path d="M250 8 q40 6 60 40 q-30 18-70 8 q-6-30 10-48Z" fill="#DCEBD0" />
        <ellipse cx="60" cy="40" rx="40" ry="24" fill="#DCEBD0" opacity="0.8" />
        {/* water */}
        {v.water === "br" && <path d="M300 200 Q 330 150 400 140 L400 200 Z" fill="#BFE0EA" />}
        {v.water === "tr" && <path d="M300 0 Q 350 50 400 60 L400 0 Z" fill="#BFE0EA" />}
        {v.water === "bottom" && (
          <path d="M0 168 Q 200 150 400 168 L400 200 L0 200 Z" fill="#BFE0EA" />
        )}
        {/* major (yellow) road */}
        {v.road === "diagH" && (
          <path d="M-10 150 L410 60" stroke="#FBD56B" strokeWidth="11" fill="none" />
        )}
        {v.road === "highway" && (
          <path d="M-10 110 L410 96" stroke="#FBD56B" strokeWidth="13" fill="none" />
        )}
        {v.road === "diag" && (
          <path d="M-10 60 L410 150" stroke="#FBD56B" strokeWidth="11" fill="none" />
        )}
        {/* minor roads */}
        <g stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M120 -10 L150 210" />
          <path d="M-10 120 L410 132" />
          <path d="M260 -10 L300 210" />
        </g>
        <g stroke="#E6E7E0" strokeWidth="1.2" fill="none">
          <path d="M120 -10 L150 210" />
          <path d="M-10 120 L410 132" />
        </g>
        {/* faint POI label ticks */}
        <g fill="#C7C8BE">
          <rect x="40" y="150" width="26" height="5" rx="2.5" />
          <rect x="320" y="40" width="30" height="5" rx="2.5" />
        </g>
      </svg>

      {/* POI dots (secondary) */}
      {v.pois.map(([x, y], i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            transform: "translate(-50%,-50%)",
            width: 9,
            height: 9,
            borderRadius: 999,
            background: "#9AA0A6",
            border: "2px solid #fff",
            boxShadow: "0 1px 3px rgba(0,0,0,.25)",
          }}
        />
      ))}
      {/* main marker (teardrop, brand gradient) */}
      <span
        style={{
          position: "absolute",
          left: `${v.main.x * 100}%`,
          top: `${v.main.y * 100}%`,
          transform: "translate(-50%,-100%)",
        }}
      >
        <svg width="26" height="30" viewBox="0 0 24 30">
          <defs>
            <linearGradient id={"mk" + variant} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--teal-500)" />
              <stop offset="1" stopColor="var(--teal-700)" />
            </linearGradient>
          </defs>
          <path
            d="M12 30C12 30 22 18 22 11A10 10 0 1 0 2 11C2 18 12 30 12 30Z"
            fill={`url(#mk${variant})`}
            stroke="#fff"
            strokeWidth="2"
          />
          <circle cx="12" cy="11" r="3.6" fill="#fff" />
        </svg>
      </span>

      {/* scale bar + kakao wordmark */}
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span
            style={{
              width: 46,
              height: 7,
              borderLeft: "2px solid #555",
              borderRight: "2px solid #555",
              borderBottom: "2px solid #555",
            }}
          />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#555" }}>{scale}</span>
        </span>
        <span
          style={{ fontSize: 12.5, fontWeight: 800, color: "#3C4043", letterSpacing: "-0.02em" }}
        >
          kakao
        </span>
      </div>
    </div>
  );
}
