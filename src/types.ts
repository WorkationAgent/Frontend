export interface PlanRequest {
  text: string
}

export interface ParsedConditions {
  must_have: string[]
  preferences: string[]
}

export interface RegionCandidate {
  id: string
  name: string
  living_area: string
  description: string
  tags: string[]
  match_reasons: string[]
  weaknesses: string[]
  is_best?: boolean
  center?: { lat: number; lng: number }
  photo_url?: string
}

export interface PlanResponse {
  thread_id: string
  parsed: ParsedConditions
  candidate_regions: RegionCandidate[]
}

export type MapPointCategory = 'stay' | 'infra' | 'experience'
export type EvalSource = 'work' | 'living' | 'local'

export interface MapPoint {
  name: string
  category: MapPointCategory
  source?: EvalSource
  latitude: number
  longitude: number
  description?: string
}

export interface EvaluatedItem {
  name: string
  rating?: number
  description?: string
  distance_text?: string
}

export interface CategoryScores {
  work?: number
  living?: number
  local?: number
}

export interface AccommodationResult {
  rank: number
  overall_score: number
  category_scores: CategoryScores
  name: string
  accommodation_id: string
  location_text?: string
  map_points: MapPoint[]
  matched_conditions: string[]
  work_summary?: string
  living_summary?: string
  local_summary?: string
  work_environment: EvaluatedItem[]
  living_elements: EvaluatedItem[]
  local_experiences: EvaluatedItem[]
  accommodation_info?: { price?: string; phone?: string; homepage?: string }
  cons?: string
}

export interface RecommendResponse {
  recommended_region: string
  candidates: AccommodationResult[]
}

export type AppStep =
  | 'input'
  | 'loading-regions'
  | 'select-region'
  | 'loading-results'
  | 'results'

export interface AppState {
  step: AppStep
  threadId: string | null
  parsed: ParsedConditions | null
  candidateRegions: RegionCandidate[]
  recommendResponse: RecommendResponse | null
  error: string | null
}
