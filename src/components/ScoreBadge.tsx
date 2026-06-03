import { theme } from '../theme'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'lg'
}

export default function ScoreBadge({ score, size = 'sm' }: ScoreBadgeProps) {
  const rounded = Math.round(score)

  if (size === 'lg') {
    return (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: theme.brand.main,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{rounded}</span>
        <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85, marginTop: 2 }}>/ 100</span>
      </div>
    )
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.brand.bg,
        color: theme.brand.text,
        fontSize: 13,
        fontWeight: 700,
        padding: '2px 10px',
        borderRadius: 12,
        border: `1px solid ${theme.brand.main}`,
      }}
    >
      {rounded}점
    </span>
  )
}
