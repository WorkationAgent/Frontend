/* Single source of truth for backend calls (build spec §2, §8).
   Flip USE_MOCK to false to hit the real FastAPI/LangGraph backend.

   Contract (proposed, §8 — interrupt/resume via thread_id):
     POST /api/plan           { text }                  -> PlanResponse
     POST /api/select-region  { thread_id, region_id }  -> RecommendResponse

   When wiring the real backend, this module is the ONLY place that needs to
   change: map output.py / state.py payloads into the view-model types.

   Map data note (build spec §11-3): backend MapPoint has category
   (stay/infra/experience) + source (work/living/local). Collapse those into the
   view-model's MapPoint.kind (stay | work | living | local) here, and set each
   AccommodationResult.center to the 숙소 coordinate. KTO 사진은 백엔드 프록시가
   region.photo_url로 내려주면 RegionBanner가 자동으로 사용한다 (§6.2). */
import type { PlanResponse, RecommendResponse } from "../types";
import { MOCK_PLAN_RESPONSE, MOCK_RECOMMEND_RESPONSE } from "../data/mock";

const USE_MOCK = false; // ← set false once the backend endpoints are live
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // 백엔드 detail 메시지 파싱 시도
    try {
      const data = await res.json();
      const detail = data?.detail;
      if (typeof detail === "string") throw new Error(detail);
    } catch (e) {
      if (e instanceof Error && e.message !== "Unexpected end of JSON input") throw e;
    }
    throw new Error(`요청에 실패했습니다. (${res.status})`);
  }
  return (await res.json()) as T;
}

/** Step 1 → 2: submit free-text, get parsed conditions + candidate regions. */
export async function plan(text: string): Promise<PlanResponse> {
  if (USE_MOCK) {
    await delay(1900);
    return MOCK_PLAN_RESPONSE;
  }
  return postJSON<PlanResponse>("/api/plan", { text });
}

/** Step 2 → 3: pick a region (resume the graph), get accommodation results. */
export async function selectRegion(
  regionId: string,
  threadId?: string,
): Promise<RecommendResponse> {
  if (USE_MOCK) {
    await delay(2100);
    return MOCK_RECOMMEND_RESPONSE;
  }
  return postJSON<RecommendResponse>("/api/select-region", {
    thread_id: threadId,
    region_id: regionId,
  });
}
