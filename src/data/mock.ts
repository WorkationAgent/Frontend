/* Mock data for the 워케이션/촌캉스 추천 프로토타입.
   Ported from the design prototype (data.js). In production these objects come
   from /api/plan and /api/select-region via src/api/client.ts. */
import type {
  ParsedConditions,
  PlanResponse,
  RecommendResponse,
  RegionCandidate,
} from "../types";

export const PLACEHOLDER_TEXT =
  "예) 일주일 정도 바다 근처에서 일하면서 쉬고 싶어요. 반려견과 함께 조용한 해변을 산책하고, 관광지처럼 붐비지 않는 자연친화적인 동네였으면 좋겠어요.";

export const MOCK_PARSED: ParsedConditions = {
  must_have: ["바다 근처", "조용한 환경", "반려견 동반"],
  preferences: ["자연친화적", "7박"],
};

const MOCK_REGIONS: RegionCandidate[] = [
  {
    id: "yangyang",
    name: "강원도 양양 서림천 생활권",
    living_area: "강원도 양양 서림천 생활권",
    description:
      "바다 근처 조용한 환경과 자연친화적인 분위기를 제공하며, 반려견과 함께 산책하기 좋은 해변과 숲이 인접해 있어 일주일간 편안한 휴식을 보낼 수 있습니다. 관광지나 혼잡한 장소와 거리가 멀어 필수 조건에…",
    tags: [
      "바다",
      "조용한 마을",
      "조용한 해변 산책로",
      "자연 친화적 마을",
      "반려견 동반 가능한 숙소 다수",
    ],
    match_summary:
      "바다 근처 조용한 환경과 자연친화적인 분위기를 제공하며, 반려견과 함께 산책하기 좋은 해변과 숲이 인접해 있어 일주일간 편안한 휴식을 보낼 수 있습니다. 관광지나 혼잡한 장소와 거리가 멀어 필수 조건에 부합합니다.",
    weaknesses: ["대중교통 접근성 제한적일 수 있음"],
    is_best: true,
  },
  {
    id: "sehwa",
    name: "제주 구좌읍 세화리 생활권",
    living_area: "제주 구좌읍 세화리 생활권",
    description:
      "조용하고 자연친화적인 바닷가 마을로, 반려견이 함께 생활하기 좋으며 관광객의 혼잡함이 적어 휴식에 적합합니다. 카페와 로컬 상점이 있어 생활 편의성도 높습니다.",
    tags: ["바다", "감성동네", "로컬 카페 밀집", "바다 산책로", "조용한 분위기"],
    match_summary:
      "조용하고 자연친화적인 바닷가 마을로, 반려견이 함께 생활하기 좋으며 관광객의 혼잡함이 적어 휴식에 적합합니다. 카페와 로컬 상점이 있어 생활 편의성도 높습니다.",
    weaknesses: ["공유오피스 부족", "뚜벅이 이동 제약"],
  },
  {
    id: "boseong",
    name: "전라남도 보성군 마늑면 생활권",
    living_area: "전라남도 보성군 마늑면 생활권",
    description:
      "바다와 인접한 한적한 지역으로 조용하며 자연친화적 분위기를 제공합니다. 반려견 동반이 가능하고 관광지와 멀리 떨어져 있어 휴식에 최적의 환경입니다.",
    tags: [
      "바다 근처",
      "한적한 농어촌",
      "조용한 농어촌 마을",
      "자연과 바다로 둘러싸인 환경",
      "반려견 산책에 적합한 개방 공간",
    ],
    match_summary:
      "바다와 인접한 한적한 지역으로 조용하며 자연친화적 분위기를 제공합니다. 반려견 동반이 가능하고 관광지와 멀리 떨어져 있어 휴식에 최적의 환경입니다.",
    weaknesses: ["대중교통 이용 불편", "상업 시설 적음"],
  },
];

export const MOCK_PLAN_RESPONSE: PlanResponse = {
  parsed: MOCK_PARSED,
  candidate_regions: MOCK_REGIONS,
};

export const MOCK_RECOMMEND_RESPONSE: RecommendResponse = {
  recommended_region: "제주 구좌읍 세화리 생활권",
  results_subtitle: "해당 지역에서 선별된 숙소 3곳을 종합 점수 순으로 정렬했어요",
  matched_conditions: ["바다 근처", "조용한 환경", "반려견 동반", "자연친화적"],
  candidates: [
    {
      rank: 1,
      overall_score: 78,
      name: "라마다제주함덕호텔",
      address: "제주특별자치도 제주시 조천읍 신북로 470",
      accommodation_info: {
        price: "1박 12만원~",
        phone: "064-702-9000",
        homepage: "ramadajeju.co.kr",
      },
      center: { lat: 33.543, lng: 126.669 },
      search_radius_m: 1500,
      matched_conditions: ["바다 도보 5분", "조용한 환경", "반려견 동반 가능"],
      map_points: [
        { name: "함덕 코워킹 카페", kind: "work", lat: 33.5418, lng: 126.6705 },
        { name: "GS25 함덕라마다점", kind: "living", lat: 33.5435, lng: 126.6698 },
        { name: "함덕농협하나로마트 중앙점", kind: "living", lat: 33.5448, lng: 126.6672 },
        { name: "함덕바른한의원", kind: "living", lat: 33.544, lng: 126.671 },
        { name: "함덕해수욕장", kind: "local", lat: 33.5436, lng: 126.6695 },
        { name: "조천함덕해안도로", kind: "local", lat: 33.546, lng: 126.665 },
        { name: "카페봄봄 함덕점", kind: "local", lat: 33.541, lng: 126.6715 },
      ],
      map: { variant: "a", scale: "250m" },
      category_scores: { work: 60, living: 82, local: 84 },
      sections: {
        work: {
          score: 60,
          summary:
            "반려견 동반이 가능한 조용한 숙소로, 바다 근처 산책 환경과 편안하게 머물 수 있는 작업 공간을 갖추고 있습니다.",
          items: [
            { name: "숙소 작업 공간", sub: "조용하고 편안한 책상", distance_text: "숙소 내" },
            { name: "함덕 코워킹 카페", sub: "좌석 보통, 콘센트 있음", distance_text: "차 8분" },
          ],
        },
        living: {
          score: 82,
          summary:
            "편의점과 재래시장 등 식료품점이 가까워 생활이 편리하며, 의료시설과 다양한 생활서비스가 근접해 있어 안심할 수 있습니다. 다만 버스 정류장은 다소 떨어져 있습니다.",
          items: [
            { name: "GS25 함덕라마다점", sub: "생활 편의점", distance_text: "도보 2분" },
            { name: "함덕농협하나로마트 중앙점", sub: "신선한 식료품 구매 가능", distance_text: "도보 9분" },
            { name: "함덕바른한의원", sub: "근접 의료 시설", distance_text: "도보 6분" },
            { name: "회춘 주차장", sub: "편리한 주차 공간", distance_text: "도보 3분" },
          ],
        },
        local: {
          score: 84,
          summary:
            "함덕해수욕장과 조천함덕해안도로 등 시그니처 명소가 도보 거리에 있어 자연과 바다를 가까이에서 매일 접할 수 있습니다.",
          items: [
            { name: "함덕해수욕장 (함덕 서우봉 해변)", sub: "대표 해변 및 산책로", distance_text: "도보 5분" },
            { name: "조천함덕해안도로", sub: "아름다운 해안선 도보 코스", distance_text: "도보 12분" },
            { name: "카페봄봄 함덕점", sub: "분위기 좋은 카페", distance_text: "도보 7분" },
          ],
        },
      },
    },
    {
      rank: 2,
      overall_score: 70,
      name: "아망뜨펜션(제주)",
      address: "제주특별자치도 서귀포시 표선면 민속해안로 11",
      accommodation_info: {
        phone: "064-787-1234",
      },
      center: { lat: 33.3245, lng: 126.843 },
      search_radius_m: 2500,
      matched_conditions: ["전용 작업공간 우수", "자연친화적 입지", "반려견 동반 가능"],
      map_points: [
        { name: "표선 감성 카페", kind: "work", lat: 33.326, lng: 126.841 },
        { name: "CU 표선가마리점", kind: "living", lat: 33.327, lng: 126.84 },
        { name: "표선119센터", kind: "living", lat: 33.33, lng: 126.836 },
        { name: "제주허브동산", kind: "local", lat: 33.336, lng: 126.829 },
        { name: "표선해수욕장", kind: "local", lat: 33.3235, lng: 126.8455 },
        { name: "솔옆수 카페", kind: "local", lat: 33.328, lng: 126.842 },
      ],
      map: { variant: "b", scale: "500m" },
      category_scores: { work: 85, living: 65, local: 86 },
      sections: {
        work: {
          score: 85,
          summary:
            "반려견 동반이 가능한 숙소로 업무 인프라가 충분하고, 바다 근처의 조용하고 편안한 작업 공간 환경을 제공합니다.",
          items: [
            { name: "숙소 전용 워크데스크", sub: "넓고 조용한 작업 공간", distance_text: "숙소 내" },
            { name: "표선 감성 카페", sub: "콘센트·좌석 여유", distance_text: "차 5분" },
          ],
        },
        living: {
          score: 65,
          summary:
            "편의점이 근처에 있으나 대중교통과 의료 시설은 부족하여 긴급 상황 시 불편할 수 있습니다. 조용하고 자연친화적 환경에서 휴식하기 적합합니다.",
          items: [
            { name: "CU 표선가마리점", sub: "근거리 편의점", distance_text: "도보 4분" },
            { name: "표선119센터", sub: "긴급 서비스", distance_text: "차 7분" },
          ],
        },
        local: {
          score: 86,
          summary:
            "표선해수욕장과 제주허브동산 등 자연 친화 명소가 인근에 있으며, 다양한 산책로와 분위기 좋은 카페가 있습니다.",
          items: [
            { name: "제주허브동산", sub: "테마파크 및 식물원", distance_text: "차 6분" },
            { name: "표선해수욕장", sub: "조용한 해변", distance_text: "도보 8분" },
            { name: "솔옆수 카페", sub: "지역 유명 카페", distance_text: "차 4분" },
          ],
        },
      },
    },
    {
      rank: 3,
      overall_score: 65,
      name: "샐리스제주호텔",
      address: "제주특별자치도 제주시 애월읍 고내로 46",
      accommodation_info: {
        phone: "064-799-5678",
        homepage: "sallys-jeju.com",
      },
      center: { lat: 33.4715, lng: 126.306 },
      search_radius_m: 3000,
      matched_conditions: ["바다 근처", "한적한 동네", "조용한 휴식"],
      map_points: [
        { name: "애월 카페거리", kind: "work", lat: 33.464, lng: 126.312 },
        { name: "CU 제주고내리점", kind: "living", lat: 33.471, lng: 126.3075 },
        { name: "애월보건지소", kind: "living", lat: 33.467, lng: 126.33 },
        { name: "애월119안전센터", kind: "living", lat: 33.466, lng: 126.329 },
        { name: "고내포구", kind: "local", lat: 33.473, lng: 126.3045 },
        { name: "한담해변", kind: "local", lat: 33.4655, lng: 126.314 },
      ],
      map: { variant: "c", scale: "250m" },
      category_scores: { work: 40, living: 70, local: 80 },
      sections: {
        work: {
          score: 40,
          summary:
            "업무 인프라가 다소 부족하지만 조용하고 충실한 휴식 환경에 적합하며, 바다 근처에서 가볍게 작업하기 좋습니다.",
          items: [
            { name: "숙소 와이파이", sub: "속도 보통", distance_text: "숙소 내" },
            { name: "애월 카페거리", sub: "바다 전망 카페 밀집", distance_text: "차 10분" },
          ],
        },
        living: {
          score: 70,
          summary:
            "편의점과 생활 서비스가 근처에 있으나 교통 인프라 부재로 이동에 불편함이 예상되며 의료 시설도 거리가 있습니다.",
          items: [
            { name: "CU 제주고내리점", sub: "생활 편의 편의점", distance_text: "도보 3분" },
            { name: "애월보건지소", sub: "의료 서비스", distance_text: "차 8분" },
            { name: "애월119안전센터", sub: "긴급 서비스", distance_text: "차 9분" },
          ],
        },
        local: {
          score: 80,
          summary:
            "애월읍 바닷가에 위치해 해안 포구와 한담해변 등 자연 경관 체험이 가능하고 조용한 휴식에 적합합니다.",
          items: [
            { name: "고내포구", sub: "해안 관광명소", distance_text: "도보 6분" },
            { name: "한담해변", sub: "조용한 해변 산책 코스", distance_text: "차 7분" },
          ],
        },
      },
    },
  ],
};
