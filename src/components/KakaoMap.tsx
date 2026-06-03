import { useEffect, useRef } from 'react'
import type { MapPoint } from '../types'
import { useKakaoLoader } from '../hooks/useKakaoLoader'
import { theme } from '../theme'

interface KakaoMapProps {
  center: { lat: number; lng: number }
  points?: MapPoint[]
  height?: number
}

function getMarkerColor(point: MapPoint): string {
  if (point.category === 'stay') return theme.brand.main
  const src = point.source
  if (src === 'work') return theme.work.main
  if (src === 'living') return theme.living.main
  if (src === 'local') return theme.local.main
  return theme.neutral.tertiary
}

function createMarkerHtml(color: string, isMain = false): string {
  const size = isMain ? 18 : 12
  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    "></div>
  `
}

export default function KakaoMap({ center, points = [], height = 200 }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const isLoaded = useKakaoLoader()

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return

    const kakao = window.kakao
    if (!kakao?.maps) return

    try {
      const latLng = new kakao.maps.LatLng(center.lat, center.lng)
      const map = new kakao.maps.Map(containerRef.current, {
        center: latLng,
        level: 5,
      })
      mapRef.current = map

      // Center marker (stay)
      const centerOverlay = new kakao.maps.CustomOverlay({
        position: latLng,
        content: createMarkerHtml(theme.brand.main, true),
        yAnchor: 0.5,
        xAnchor: 0.5,
      })
      centerOverlay.setMap(map)

      // Additional points
      points.forEach((point) => {
        if (point.latitude === center.lat && point.longitude === center.lng) return
        const pos = new kakao.maps.LatLng(point.latitude, point.longitude)
        const color = getMarkerColor(point)
        const overlay = new kakao.maps.CustomOverlay({
          position: pos,
          content: createMarkerHtml(color, point.category === 'stay'),
          yAnchor: 0.5,
          xAnchor: 0.5,
        })
        overlay.setMap(map)
      })
    } catch (err) {
      console.warn('[KakaoMap] init error:', err)
    }
  }, [isLoaded, center.lat, center.lng, points])

  // Legend (only show when there are multiple types)
  const hasStayPoints = points.some((p) => p.category === 'stay')
  const hasWorkPoints = points.some((p) => p.source === 'work')
  const hasLocalPoints = points.some((p) => p.source === 'local')
  const hasLivingPoints = points.some((p) => p.source === 'living')
  const showLegend = hasStayPoints || hasWorkPoints || hasLocalPoints || hasLivingPoints

  return (
    <div style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height }} />

      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.neutral.pageBg,
            fontSize: 12,
            color: theme.neutral.tertiary,
          }}
        >
          지도 로딩 중...
        </div>
      )}

      {isLoaded && showLegend && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            display: 'flex',
            gap: 8,
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 10,
            backdropFilter: 'blur(4px)',
          }}
        >
          {hasStayPoints && (
            <LegendItem color={theme.brand.main} label="숙소" />
          )}
          {hasWorkPoints && (
            <LegendItem color={theme.work.main} label="워크" />
          )}
          {hasLocalPoints && (
            <LegendItem color={theme.local.main} label="로컬" />
          )}
          {hasLivingPoints && (
            <LegendItem color={theme.living.main} label="리빙" />
          )}
        </div>
      )}
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span style={{ color: '#5F5E5A', fontWeight: 500 }}>{label}</span>
    </div>
  )
}
