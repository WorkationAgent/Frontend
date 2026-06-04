import { useState } from 'react'
import type { EvaluatedItem } from '../types'

interface EvaluationSectionProps {
  title: string
  color: string
  bgColor: string
  items: EvaluatedItem[]
  summary?: string
  score?: number
}

function StarBar({ rating }: { rating: number }) {
  const filled = Math.round(Math.max(0, Math.min(5, rating)))
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: 12,
            color: i < filled ? '#F59E0B' : '#E5E7EB',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function EvaluationSection({
  title,
  color,
  bgColor,
  items,
  summary,
  score,
}: EvaluationSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      style={{
        borderRadius: 10,
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: bgColor,
          border: 'none',
          cursor: 'pointer',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: color,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, color }}>
            {title}
          </span>
          {score !== undefined && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color,
                backgroundColor: '#fff',
                padding: '1px 8px',
                borderRadius: 10,
                border: `1px solid ${color}`,
                opacity: 0.9,
              }}
            >
              {Math.round(score)}점
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color, opacity: 0.7, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          ▲
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div style={{ padding: '14px 16px' }}>
          {summary && (
            <p
              style={{
                fontSize: 13,
                color: '#5F5E5A',
                lineHeight: 1.6,
                marginBottom: 12,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {summary}
            </p>
          )}

          {items.length === 0 && (
            <p style={{ fontSize: 13, color: '#888780', textAlign: 'center', padding: '8px 0' }}>
              정보 없음
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2C2C2A' }}>
                    {item.name}
                  </span>
                  {item.rating !== undefined && <StarBar rating={item.rating} />}
                </div>
                {item.description && (
                  <p style={{ fontSize: 12, color: '#5F5E5A', lineHeight: 1.55, margin: 0 }}>
                    {item.description}
                  </p>
                )}
                {item.distance_text && (
                  <span style={{ fontSize: 11, color: '#888780' }}>
                    📍 {item.distance_text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
