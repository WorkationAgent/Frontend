import type { AccommodationResult } from '../types'
import { theme } from '../theme'
import KakaoMap from './KakaoMap'
import ScoreBadge from './ScoreBadge'
import EvaluationSection from './EvaluationSection'

interface AccommodationCardProps {
  acc: AccommodationResult
}

const RANK_LABELS: Record<number, string> = { 1: '1위', 2: '2위', 3: '3위' }
const RANK_COLORS: Record<number, string> = {
  1: '#D97706',
  2: '#6B7280',
  3: '#92400E',
}

function CategoryScoreBar({
  label,
  score,
  color,
}: {
  label: string
  score: number
  color: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, color: theme.neutral.secondary, width: 42, flexShrink: 0 }}>
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(0,0,0,0.07)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, score))}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 3,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color, width: 28, textAlign: 'right', flexShrink: 0 }}>
        {Math.round(score)}
      </span>
    </div>
  )
}

export default function AccommodationCard({ acc }: AccommodationCardProps) {
  const isFirst = acc.rank === 1
  const rankColor = RANK_COLORS[acc.rank] ?? '#6B7280'

  // stay point = accommodation itself
  const stayPoint = {
    name: acc.name,
    category: 'stay' as const,
    latitude: acc.map_points.find((p) => p.category === 'stay')?.latitude ?? 0,
    longitude: acc.map_points.find((p) => p.category === 'stay')?.longitude ?? 0,
  }

  const mapCenter =
    stayPoint.latitude !== 0
      ? { lat: stayPoint.latitude, lng: stayPoint.longitude }
      : { lat: 37.5665, lng: 126.978 }

  return (
    <div
      style={{
        backgroundColor: theme.neutral.cardBg,
        borderRadius: 12,
        overflow: 'hidden',
        border: isFirst ? `2px solid ${theme.brand.main}` : `1px solid ${theme.neutral.border}`,
        boxShadow: isFirst
          ? '0 4px 24px rgba(29,158,117,0.15)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 20px',
          backgroundColor: isFirst ? theme.brand.bg : theme.neutral.pageBg,
          borderBottom: `1px solid ${theme.neutral.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* Rank badge */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: rankColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {RANK_LABELS[acc.rank] ?? `${acc.rank}위`}
        </div>

        {/* Name & location */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.neutral.primary,
              marginBottom: 3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {acc.name}
          </h3>
          {acc.location_text && (
            <p
              style={{
                fontSize: 12,
                color: theme.neutral.secondary,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {acc.location_text}
            </p>
          )}
        </div>

        {/* Score */}
        <ScoreBadge score={acc.overall_score} size="lg" />
      </div>

      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Kakao Map */}
        <div style={{ borderRadius: 8, overflow: 'hidden' }}>
          <KakaoMap center={mapCenter} points={acc.map_points} height={180} />
        </div>

        {/* Matched conditions */}
        {acc.matched_conditions.length > 0 && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: theme.neutral.tertiary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              매칭 조건
            </p>
            {acc.matched_conditions.slice(0, 3).map((cond, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                <span style={{ color: theme.brand.main, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: theme.brand.text, lineHeight: 1.5 }}>{cond}</span>
              </div>
            ))}
          </div>
        )}

        {/* Category score bars */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: theme.neutral.tertiary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            카테고리 점수
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {acc.category_scores.work !== undefined && (
              <CategoryScoreBar label="Work" score={acc.category_scores.work} color={theme.work.main} />
            )}
            {acc.category_scores.living !== undefined && (
              <CategoryScoreBar label="Living" score={acc.category_scores.living} color={theme.living.main} />
            )}
            {acc.category_scores.local !== undefined && (
              <CategoryScoreBar label="Local" score={acc.category_scores.local} color={theme.local.main} />
            )}
          </div>
        </div>

        {/* Evaluation sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <EvaluationSection
            title="Work Environment"
            color={theme.work.text}
            bgColor={theme.work.bg}
            items={acc.work_environment}
            summary={acc.work_summary}
            score={acc.category_scores.work}
          />
          <EvaluationSection
            title="Living Elements"
            color={theme.living.text}
            bgColor={theme.living.bg}
            items={acc.living_elements}
            summary={acc.living_summary}
            score={acc.category_scores.living}
          />
          <EvaluationSection
            title="Local Experiences"
            color={theme.local.text}
            bgColor={theme.local.bg}
            items={acc.local_experiences}
            summary={acc.local_summary}
            score={acc.category_scores.local}
          />
        </div>

        {/* Accommodation info */}
        {acc.accommodation_info && (
          <div
            style={{
              backgroundColor: theme.neutral.pageBg,
              borderRadius: 8,
              padding: '12px 14px',
              fontSize: 13,
              color: theme.neutral.secondary,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {acc.accommodation_info.price && (
              <div style={{ display: 'flex', gap: 6 }}>
                <span>💰</span>
                <span>{acc.accommodation_info.price}</span>
              </div>
            )}
            {acc.accommodation_info.phone && (
              <div style={{ display: 'flex', gap: 6 }}>
                <span>📞</span>
                <a href={`tel:${acc.accommodation_info.phone}`} style={{ color: theme.brand.main }}>
                  {acc.accommodation_info.phone}
                </a>
              </div>
            )}
            {acc.accommodation_info.homepage && (
              <div style={{ display: 'flex', gap: 6 }}>
                <span>🌐</span>
                <a
                  href={acc.accommodation_info.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.brand.main, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {acc.accommodation_info.homepage}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Cons */}
        {acc.cons && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ color: theme.caution.main, flexShrink: 0 }}>⚠</span>
            <span style={{ fontSize: 13, color: theme.caution.text, lineHeight: 1.5 }}>
              {acc.cons}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
