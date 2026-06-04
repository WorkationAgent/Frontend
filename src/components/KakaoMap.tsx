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

const PIN_COLOR: Record<MapPointKind, string> = {
  stay: "var(--pin-stay)",
  work: "var(--pin-work)",
  local: "var(--pin-local)",
  living: "var(--pin-life)",
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
    return `
      <div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;">
        <span style="padding:3px 9px;border-radius:999px;background:${color};color:#fff;font-size:11.5px;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,.25);font-family:Pretendard,sans-serif;">${escapeHtml(point.name)}</span>
        <span style="width:18px;height:18px;border-radius:999px;background:${color};border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);"></span>
      </div>`;
  }
  return `
    <div title="${escapeHtml(point.name)}" style="transform:translate(-50%,-50%);width:13px;height:13px;border-radius:999px;background:${color};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:default;"></div>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export function KakaoMap({
  center,
  points,
  height = 180,
  fallbackVariant = "a",
  fallbackScale = "250m",
}: {
  center: { lat: number; lng: number };
  points: MapPoint[];
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

    // Fit all points; relayout guards against 0-size container at mount.
    const fit = () => {
      map.relayout();
      if (all.length > 1) map.setBounds(bounds, 36, 36, 36, 36);
      else map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
    };
    fit();
    const t = window.setTimeout(fit, 60);

    return () => {
      window.clearTimeout(t);
      overlays.forEach((o) => (o as { setMap: (m: unknown) => void }).setMap(null));
    };
  }, [loaded, error, center, points]);

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
