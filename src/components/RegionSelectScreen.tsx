import type { ParsedConditions, RegionCandidate } from '../types'
import { theme } from '../theme'
import ConditionChips from './ConditionChips'
import RegionCard from './RegionCard'

interface RegionSelectScreenProps {
  parsed: ParsedConditions
  regions: RegionCandidate[]
  onSelect: (regionId: string) => void
}

export default function RegionSelectScreen({
  parsed,
  regions,
  onSelect,
}: RegionSelectScreenProps) {
  return (
    <div style={{ padding: '48px 32px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: theme.neutral.primary,
            marginBottom: 12,
            letterSpacing: '-0.4px',
          }}
        >
          어느 지역으로 가볼까요?
        </h2>
        <p style={{ fontSize: 15, color: theme.neutral.secondary, marginBottom: 16 }}>
          입력하신 조건을 바탕으로 후보 지역 3곳을 선정했어요
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ConditionChips parsed={parsed} />
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {regions.map((region) => (
          <RegionCard
            key={region.id}
            region={region}
            onSelect={() => onSelect(region.id)}
          />
        ))}
      </div>
    </div>
  )
}
