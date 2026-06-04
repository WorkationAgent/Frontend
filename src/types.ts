/* View-model types — the shapes the screens/cards actually render.
   These mirror the design prototype's data (data.js) and the build spec §7.
   The API layer (src/api/client.ts) is responsible for mapping the backend's
   FastAPI/LangGraph payloads (output.py / state.py) into these shapes, so the
   UI never has to know about backend field names. */

export type MapVariant = "a" | "b" | "c";

/* ── Step 1: parsed conditions (purple chips) ───────────────── */
export interface ParsedConditions {
  must_have: string[]; // 필수 조건
  preferences: string[]; // 그 외 해석된 선호
}

/* ── Step 2: 후보 지역 ───────────────────────────────────────── */
export interface RegionCandidate {
  id: string;
  name: string; // "강원도 양양 서림천 생활권"
  living_area: string; // 생활권
  description: string;
  tags: string[];
  match_summary: string; // ✓ 매칭 요약 (paragraph)
  weaknesses: string[]; // − 약점
  is_best?: boolean; // 가장 적합
  /** KTO 대표 사진 (백엔드 프록시). 없으면 그라데이션 배너로 대체. */
  photo_url?: string;
  /** 지역 중심 좌표 (카카오맵 마커용, 추후 실연동). */
  center?: { lat: number; lng: number };
}

/* ── Step 3: 숙소 결과 ───────────────────────────────────────── */
export type SectionKind = "work" | "living" | "local";

/* 지도 핀. kind = 색 구분 기준 (숙소=틸 / 작업=코랄 / 로컬=앰버 / 생활=핑크).
   백엔드 MapPoint.category(stay/infra/experience)+source(work/living/local)를
   이 단일 kind로 매핑해 내려준다 (build spec §11-3). */
export type MapPointKind = "stay" | "work" | "living" | "local";

export interface MapPoint {
  name: string;
  kind: MapPointKind;
  lat: number;
  lng: number;
  description?: string;
}

export interface EvaluatedItem {
  name: string;
  sub: string; // 짧은 설명 / 거리·이동시간 ("차 8분, 좌석 보통")
  rating: number; // 0–5 (별점)
}

export interface EvaluationSection {
  score: number; // 0–100
  summary: string;
  items: EvaluatedItem[];
}

export interface CategoryScores {
  work: number;
  living: number;
  local: number;
}

export interface AccommodationResult {
  rank: number; // 1,2,3 — 1위가 왼쪽
  overall_score: number; // 종합 (Planner, 0–100)
  name: string;
  address: string;
  /** 숙소(강조 핀) 좌표 = 지도 중심. */
  center: { lat: number; lng: number };
  /** 작업/로컬/생활 장소들 — 색별 핀으로 표시. */
  map_points: MapPoint[];
  /** SDK 로드 실패 시 보여줄 플레이스홀더 설정 (폴백 전용). */
  map?: { variant: MapVariant; scale: string };
  category_scores: CategoryScores;
  sections: Record<SectionKind, EvaluationSection>;
}

/* ── API responses (view-model) ─────────────────────────────── */
export interface PlanResponse {
  thread_id?: string; // LangGraph 체크포인트 세션 (resume 방식일 때)
  parsed: ParsedConditions;
  candidate_regions: RegionCandidate[];
}

export interface RecommendResponse {
  recommended_region: string; // "제주 구좌읍 세화리 생활권"
  results_subtitle: string;
  candidates: AccommodationResult[]; // rank 순
}
