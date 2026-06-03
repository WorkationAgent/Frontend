import { theme } from '../theme'

interface StepperProps {
  currentStep: number // 0-based index
}

const STEPS = ['조건 입력', '지역 선택', '숙소 추천']

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((label, idx) => {
        const isDone = idx < currentStep
        const isCurrent = idx === currentStep
        const isAfter = idx > currentStep

        const circleStyle: React.CSSProperties = {
          width: 24,
          height: 24,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          transition: 'all 0.2s',
          ...(isDone
            ? { backgroundColor: theme.brand.main, color: '#fff', border: 'none' }
            : isCurrent
              ? { backgroundColor: theme.brand.main, color: '#fff', border: 'none' }
              : {
                  backgroundColor: 'transparent',
                  color: theme.neutral.tertiary,
                  border: `2px solid ${theme.neutral.tertiary}`,
                }),
        }

        const labelStyle: React.CSSProperties = {
          fontSize: 12,
          fontWeight: isCurrent ? 600 : 400,
          color: isAfter ? theme.neutral.tertiary : theme.neutral.primary,
          marginLeft: 6,
          whiteSpace: 'nowrap',
        }

        const connectorStyle: React.CSSProperties = {
          width: 32,
          height: 1,
          backgroundColor: idx < currentStep ? theme.brand.main : theme.neutral.border,
          flexShrink: 0,
          transition: 'background-color 0.2s',
        }

        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={circleStyle}>
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span style={labelStyle}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && <div style={{ ...connectorStyle, margin: '0 8px' }} />}
          </div>
        )
      })}
    </div>
  )
}
