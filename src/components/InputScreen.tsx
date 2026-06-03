import { useState } from 'react'
import type { ParsedConditions } from '../types'
import { theme } from '../theme'
import ConditionChips from './ConditionChips'

interface InputScreenProps {
  onSubmit: (text: string) => void
  parsed: ParsedConditions | null
}

export default function InputScreen({ onSubmit, parsed }: InputScreenProps) {
  const [text, setText] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 56px)',
        padding: '48px 24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 640 }}>
        {/* Title */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: theme.neutral.primary,
              marginBottom: 12,
              letterSpacing: '-0.5px',
            }}
          >
            워케이션, 어디서 할까요?
          </h1>
          <p
            style={{
              fontSize: 16,
              color: theme.neutral.secondary,
              lineHeight: 1.6,
            }}
          >
            원하는 조건을 자유롭게 입력하면,
            <br />
            최적의 지역과 숙소를 찾아드릴게요.
          </p>
        </div>

        {/* Textarea */}
        <div
          style={{
            backgroundColor: theme.neutral.cardBg,
            borderRadius: 12,
            border: `1.5px solid ${theme.neutral.border}`,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: 16,
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="일주일 정도 바다 근처에서 일하며 쉬고 싶어요. 카페나 코워킹 스페이스가 가까이 있으면 좋겠고, 저녁엔 신선한 해산물도 즐기고 싶어요."
            style={{
              width: '100%',
              minHeight: 140,
              padding: '20px',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              fontSize: 15,
              lineHeight: 1.7,
              color: theme.neutral.primary,
              backgroundColor: 'transparent',
              fontFamily: 'inherit',
            }}
          />
          <div
            style={{
              padding: '8px 20px 12px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <span style={{ fontSize: 12, color: theme.neutral.tertiary }}>
              {text.length}자 · Ctrl+Enter로 전송
            </span>
          </div>
        </div>

        {/* Parsed condition chips */}
        {parsed && (
          <div
            style={{
              marginBottom: 20,
              backgroundColor: theme.neutral.cardBg,
              borderRadius: 12,
              border: `1.5px solid ${theme.neutral.border}`,
              padding: '16px 20px',
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.neutral.tertiary,
                marginBottom: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              분석된 조건
            </p>
            <ConditionChips parsed={parsed} />
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 12,
            border: 'none',
            backgroundColor:
              !text.trim()
                ? '#CBD5E1'
                : isHovered
                  ? theme.brand.text
                  : theme.brand.main,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s',
            letterSpacing: '-0.2px',
          }}
        >
          추천받기
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: 12,
            color: theme.neutral.tertiary,
          }}
        >
          AI가 조건을 분석하고 최적의 지역 후보 3곳을 찾아드려요
        </p>
      </div>
    </div>
  )
}
