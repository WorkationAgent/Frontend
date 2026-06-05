/* Real Kakao Maps embed (build spec §5.3 / §6.1).
   - 숙소(center)는 강조 핀(틸·라벨)으로 중심에 둔다.
   - 작업/로컬/생활 장소는 source별 색 핀(CustomOverlay)으로 표시.
   - 하단에 색 범례.
   - SDK 미로드/키 없음/도메인 미등록 등 실패 시 MapPlaceholder로 폴백.

   재사용 컴포넌트: center + points[] + 핀색 매핑만 주면 된다. */
import { useEffect, useRef } from "react";
import type { MapPoint, MapPointKind, MapVariant } from "../types";
import { useKakaoLoader } from "../hooks/useKakaoLoader";
import { MapPlaceholder } from "./Media";

// 핀 색 = 섹션/카테고리 색(--cat-*)과 동일하게 통일. 숙소(stay)만 고유색.
const PIN_COLOR: Record<MapPointKind, string> = {
  stay: "var(--pin-stay)",
  work: "var(--cat-work)",
  local: "var(--cat-local)",
  living: "var(--cat-living)",
};

const LEGEND: { kind: MapPointKind; label: string }[] = [
  { kind: "stay", label: "숙소" },
  { kind: "work", label: "작업" },
  { kind: "local", label: "로컬" },
  { kind: "living", label: "생활" },
];

/** HTML for a CustomOverlay marker. Stay = larger ringed pin with a label chip. */
function markerHtml(point: MapPoint): string {
  const color = PIN_COLOR[point.kind];
  if (point.kind === "stay") {
    // 라벨 칩 + 집 아이콘이 든 물방울(teardrop) 핀
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;">
        <span style="padding:3px 10px;border-radius:999px;background:${color};color:#fff;font-size:11.5px;font-weight:800;letter-spacing:-0.02em;box-shadow:0 2px 8px rgba(0,0,0,.28);font-family:Pretendard,sans-serif;">${escapeHtml(point.name)}</span>
        <svg width="40" height="48" viewBox="0 0 40 48" style="display:block;filter:drop-shadow(0 4px 6px rgba(0,0,0,.32));">
          <path d="M20 2C11.2 2 4 9.2 4 18c0 11.1 16 28 16 28s16-16.9 16-28C36 9.2 28.8 2 20 2Z" fill="${color}" stroke="#fff" stroke-width="2.5"/>
          <circle cx="20" cy="18" r="9.5" fill="#fff"/>
          <g transform="translate(20,18)" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M-5 0.6 L0 -4.2 L5 0.6"/>
            <path d="M-3.6 -0.4 V4.4 H3.6 V-0.4"/>
          </g>
        </svg>
      </div>`;
  }
  return `
    <div title="${escapeHtml(point.name)}" style="width:13px;height:13px;border-radius:999px;background:${color};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:default;"></div>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export function KakaoMap({
  center,
  points,
  radiusM,
  height = 180,
  fallbackVariant = "a",
  fallbackScale = "250m",
}: {
  center: { lat: number; lng: number };
  points: MapPoint[];
  /** 검색 반경(m). 있으면 숙소 중심에 반경 원을 그린다. */
  radiusM?: number;
  height?: number;
  fallbackVariant?: MapVariant;
  fallbackScale?: string;
}) {
  const { loaded, error } = useKakaoLoader();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || error || !ref.current || !window.kakao?.maps) return;
    const kakao = window.kakao;
    const stay: MapPoint = { name: "숙소", kind: "stay", lat: center.lat, lng: center.lng };
    const all = [...points.filter((p) => p.kind !== "stay"), stay];

    const map = new kakao.maps.Map(ref.current, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 5,
    });
    map.setDraggable(true);
    map.setZoomable(true);

    const bounds = new kakao.maps.LatLngBounds();
    const overlays: unknown[] = [];
    all.forEach((p) => {
      const pos = new kakao.maps.LatLng(p.lat, p.lng);
      bounds.extend(pos);
      const overlay = new kakao.maps.CustomOverlay({
        position: pos,
        content: markerHtml(p),
        yAnchor: p.kind === "stay" ? 1 : 0.5,
        xAnchor: 0.5,
        zIndex: p.kind === "stay" ? 10 : 1,
      });
      overlay.setMap(map);
      overlays.push(overlay);
    });

    // 검색 반경 원 — 숙소 중심. 팔레트의 --pin-stay 색을 따른다.
    // (kakao SDK는 untyped이므로 any로 둔다)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let circle: any = null;
    if (radiusM && radiusM > 0) {
      const stayColor =
        getComputedStyle(document.documentElement).getPropertyValue("--pin-stay").trim() ||
        "#3b6fe0";
      circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(center.lat, center.lng),
        radius: radiusM,
        strokeWeight: 2,
        strokeColor: stayColor,
        strokeOpacity: 0.85,
        strokeStyle: "shortdash",
        fillColor: stayColor,
        fillOpacity: 0.07,
      });
      circle.setMap(map);
      const cb = circle.getBounds() as {
        getSouthWest: () => unknown;
        getNorthEast: () => unknown;
      };
      bounds.extend(cb.getSouthWest());
      bounds.extend(cb.getNorthEast());
    }

    // Fit all points (+circle); relayout guards against 0-size container at mount.
    const fit = () => {
      map.relayout();
      if (all.length > 1 || circle) map.setBounds(bounds, 10, 10, 10, 10);
      else map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
    };
    fit();
    const t = window.setTimeout(fit, 60);

    return () => {
      window.clearTimeout(t);
      overlays.forEach((o) => (o as { setMap: (m: unknown) => void }).setMap(null));
      if (circle) circle.setMap(null);
    };
  }, [loaded, error, center, points, radiusM]);

  if (error) {
    return <MapPlaceholder variant={fallbackVariant} scale={fallbackScale} height={height} />;
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={ref}
        style={{
          height,
          borderRadius: "var(--r-md)",
          overflow: "hidden",
          border: "1px solid var(--border-2)",
          background: "var(--surface-2)",
        }}
      />
      {/* color legend */}
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          display: "flex",
          gap: 10,
          padding: "6px 10px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 2px 8px rgba(0,0,0,.12)",
          backdropFilter: "blur(4px)",
        }}
      >
        {LEGEND.map((l) => (
          <span key={l.kind} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 999,
                background: PIN_COLOR[l.kind],
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-2)", whiteSpace: "nowrap" }}>
              {l.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
