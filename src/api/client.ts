import type { PlanResponse, RecommendResponse } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export async function planRequest(text: string): Promise<PlanResponse> {
  const res = await fetch(`${BASE}/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText)
    throw new Error(`planRequest failed (${res.status}): ${errText}`)
  }
  return res.json() as Promise<PlanResponse>
}

export async function selectRegion(
  threadId: string,
  regionId: string,
): Promise<RecommendResponse> {
  const res = await fetch(`${BASE}/select-region`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ thread_id: threadId, region_id: regionId }),
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText)
    throw new Error(`selectRegion failed (${res.status}): ${errText}`)
  }
  return res.json() as Promise<RecommendResponse>
}
