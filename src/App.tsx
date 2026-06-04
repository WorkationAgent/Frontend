import { useReducer, useCallback } from 'react'
import type { AppState, AppStep, ParsedConditions, RegionCandidate, RecommendResponse } from './types'
import { planRequest, selectRegion } from './api/client'
import { theme } from './theme'
import Stepper from './components/Stepper'
import InputScreen from './components/InputScreen'
import LoadingScreen from './components/LoadingScreen'
import RegionSelectScreen from './components/RegionSelectScreen'
import ResultsScreen from './components/ResultsScreen'

// ─── State ───────────────────────────────────────────────────────────────────

const initialState: AppState = {
  step: 'input',
  threadId: null,
  parsed: null,
  candidateRegions: [],
  recommendResponse: null,
  error: null,
}

type Action =
  | { type: 'SUBMIT' }
  | {
      type: 'PLAN_RESPONSE'
      threadId: string
      parsed: ParsedConditions
      candidateRegions: RegionCandidate[]
    }
  | { type: 'SELECT_REGION' }
  | { type: 'RECOMMEND_RESPONSE'; recommendResponse: RecommendResponse }
  | { type: 'ERROR'; message: string }
  | { type: 'RESET' }

function stepForAction(action: Action, _state: AppState): AppStep {
  switch (action.type) {
    case 'SUBMIT':
      return 'loading-regions'
    case 'PLAN_RESPONSE':
      return 'select-region'
    case 'SELECT_REGION':
      return 'loading-results'
    case 'RECOMMEND_RESPONSE':
      return 'results'
    case 'ERROR':
    case 'RESET':
      return 'input'
    default:
      return _state.step
  }
}

function reducer(state: AppState, action: Action): AppState {
  const step = stepForAction(action, state)
  switch (action.type) {
    case 'SUBMIT':
      return { ...state, step, error: null }
    case 'PLAN_RESPONSE':
      return {
        ...state,
        step,
        threadId: action.threadId,
        parsed: action.parsed,
        candidateRegions: action.candidateRegions,
        error: null,
      }
    case 'SELECT_REGION':
      return { ...state, step, error: null }
    case 'RECOMMEND_RESPONSE':
      return { ...state, step, recommendResponse: action.recommendResponse, error: null }
    case 'ERROR':
      return { ...initialState, error: action.message }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ─── Stepper helper ──────────────────────────────────────────────────────────

function stepperIndex(step: AppStep): number {
  if (step === 'input' || step === 'loading-regions') return 0
  if (step === 'select-region' || step === 'loading-results') return 1
  return 2
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = useCallback(async (text: string) => {
    dispatch({ type: 'SUBMIT' })
    try {
      const res = await planRequest(text)
      dispatch({
        type: 'PLAN_RESPONSE',
        threadId: res.thread_id,
        parsed: res.parsed,
        candidateRegions: res.candidate_regions,
      })
    } catch (err) {
      dispatch({ type: 'ERROR', message: err instanceof Error ? err.message : String(err) })
    }
  }, [])

  const handleSelectRegion = useCallback(
    async (regionId: string) => {
      if (!state.threadId) return
      dispatch({ type: 'SELECT_REGION' })
      try {
        const res = await selectRegion(state.threadId, regionId)
        dispatch({ type: 'RECOMMEND_RESPONSE', recommendResponse: res })
      } catch (err) {
        dispatch({ type: 'ERROR', message: err instanceof Error ? err.message : String(err) })
      }
    },
    [state.threadId],
  )

  const handleReset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const currentStepIndex = stepperIndex(state.step)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.neutral.pageBg,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: theme.neutral.cardBg,
          borderBottom: `1px solid ${theme.neutral.border}`,
          padding: '0 32px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={handleReset}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: theme.brand.main,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '-0.3px',
          }}
        >
          Wokation Agent
        </button>
        <Stepper currentStep={currentStepIndex} />
      </header>

      {/* Error Banner */}
      {state.error && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            borderBottom: '1px solid #FCA5A5',
            padding: '12px 32px',
            color: '#991B1B',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>오류가 발생했습니다:</span>
          <span>{state.error}</span>
          <button
            onClick={handleReset}
            style={{
              marginLeft: 'auto',
              color: '#991B1B',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            처음으로 돌아가기
          </button>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {state.step === 'input' && (
          <InputScreen onSubmit={handleSubmit} parsed={state.parsed} />
        )}

        {state.step === 'loading-regions' && (
          <LoadingScreen message="조건을 분석하고 후보 지역을 찾는 중이에요..." />
        )}

        {state.step === 'select-region' && state.parsed && (
          <RegionSelectScreen
            parsed={state.parsed}
            regions={state.candidateRegions}
            onSelect={handleSelectRegion}
          />
        )}

        {state.step === 'loading-results' && (
          <LoadingScreen message="선택한 지역의 숙소를 평가하는 중이에요..." />
        )}

        {state.step === 'results' && state.recommendResponse && (
          <ResultsScreen response={state.recommendResponse} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}
