import { useState } from 'react'
import type { RegionCandidate } from '../types'
import { theme } from '../theme'
import KakaoMap from './KakaoMap'

interface RegionCardProps {
  region: RegionCandidate
  onSelect: () => void
}

export default function RegionCard({ region, onSelect }: RegionCardProps) {
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div
      style={{
        backgroundColor: theme.neutral.cardBg,
        borderRadius: 12,
        overflow: 'hidden',
        border: region.is_best ? `2px solid ${theme.brand.main}` : `1px solid ${theme.neutral.border}`,
        boxShadow: region.is_best
          ? `0 4px 24px rgba(29,158,117,0.15)`
          : '0 2px 12px rgba(0,0,0,0.06)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Best badge */}
      {region.is_best && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: theme.brand.main,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 20,
            zIndex: 10,
            letterSpacing: '0.3px',
          }}
        >
          가장 적합
        </div>
      )}

      {/* Photo */}
      <div style={{ height: 180, overflow: 'hidden', flexShrink: 0 }}>
        {region.photo_url ? (
          <img
            src={region.photo_url}
            alt={region.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${theme.brand.main} 0%, ${theme.brand.text} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 40 }}>🏖️</span>
          </div>
        )}
      </div>

      <div style={{ padding: '20px' }}>
        {/* Name & living area */}
        <div style={{ marginBottom: 12 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: theme.neutral.primary,
              marginBottom: 4,
            }}
          >
            {region.name}
          </h3>
          <p style={{ fontSize: 13, color: theme.neutral.secondary }}>{region.living_area}</p>
        </div>

        {/* Kakao Map — 좌표 있을 때만 표시 */}
        {(() => {
          const center = region.center
          if (!center) return null
          return (
            <div style={{ marginBottom: 14, borderRadius: 8, overflow: 'hidden' }}>
              <KakaoMap
                center={center}
                points={[{ name: region.name, category: 'stay', latitude: center.lat, longitude: center.lng }]}
                height={140}
              />
            </div>
          )
        })()}

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            color: theme.neutral.secondary,
            lineHeight: 1.65,
            marginBottom: 12,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {region.description}
        </p>

        {/* Tags */}
        {region.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {region.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 20,
                  backgroundColor: theme.neutral.pageBg,
                  color: theme.neutral.secondary,
                  border: `1px solid ${theme.neutral.border}`,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Match reasons */}
        {region.match_reasons.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            {region.match_reasons.map((reason, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <span style={{ color: theme.brand.main, fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                  ✓
                </span>
                <span style={{ fontSize: 13, color: theme.brand.text, lineHeight: 1.5 }}>
                  {reason}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Weaknesses */}
        {region.weaknesses.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {region.weaknesses.map((w, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <span style={{ color: theme.caution.main, fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                  ⚠
                </span>
                <span style={{ fontSize: 13, color: theme.caution.text, lineHeight: 1.5 }}>
                  {w}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Select button */}
        <button
          onClick={onSelect}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: `2px solid ${theme.brand.main}`,
            backgroundColor: btnHovered ? theme.brand.main : 'transparent',
            color: btnHovered ? '#fff' : theme.brand.main,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          이 지역 선택
        </button>
      </div>
    </div>
  )
}
