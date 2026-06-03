import type { ParsedConditions } from '../types'
import { theme } from '../theme'

interface ConditionChipsProps {
  parsed: ParsedConditions
}

export default function ConditionChips({ parsed }: ConditionChipsProps) {
  if (!parsed.must_have.length && !parsed.preferences.length) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {parsed.must_have.map((item) => (
        <span
          key={item}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: theme.chip.bg,
            color: theme.chip.text,
            border: `1.5px solid ${theme.chip.main}`,
          }}
        >
          {item}
        </span>
      ))}
      {parsed.preferences.map((item) => (
        <span
          key={item}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 400,
            backgroundColor: theme.neutral.cardBg,
            color: theme.neutral.secondary,
            border: `1.5px solid ${theme.neutral.border}`,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
