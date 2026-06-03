import { useState } from 'react'
import type { RecommendResponse } from '../types'
import { theme } from '../theme'
import AccommodationCard from './AccommodationCard'

interface ResultsScreenProps {
  response: RecommendResponse
  onReset: () => void
}

export default function ResultsScreen({ response, onReset }: ResultsScreenProps) {
  const sorted = [...response.candidates].sort((a, b) => a.rank - b.rank)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={{ padding: '0 0 64px 0' }}>
      {/* Region Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.brand.main} 0%, ${theme.brand.text} 100%)`,
          padding: '36px 32px',
          marginBottom: 36,
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6, fontWeight: 500 }}>
            추천 지역 및 생활권
          </p>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.4px',
              marginBottom: 8,
            }}
          >
            {response.recommended_region}
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
            해당 지역에서 선별된 숙소 {sorted.length}곳을 종합 점수 순으로 정렬했어요
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {sorted.map((acc) => (
            <AccommodationCard key={acc.accommodation_id} acc={acc} />
          ))}
        </div>

        {/* Reset button */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            onClick={onReset}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: '14px 40px',
              borderRadius: 12,
              border: `2px solid ${theme.brand.main}`,
              backgroundColor: isHovered ? theme.brand.main : 'transparent',
              color: isHovered ? '#fff' : theme.brand.main,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            다시 검색하기
          </button>
        </div>
      </div>
    </div>
  )
}
