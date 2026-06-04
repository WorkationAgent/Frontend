/* App — flow state machine (build spec §3):
     input → (loadingRegion) → region → (loadingResults) → results
   Uses useReducer per §2. All backend calls go through src/api/client.ts.
   Deep-link #region / #results jumps straight to a phase (review convenience). */
import { useEffect, useReducer } from "react";
import * as api from "./api/client";
import type { PlanResponse, RecommendResponse, RegionCandidate } from "./types";
import { TopBar } from "./components/screens/TopBar";
import { InputScreen } from "./components/screens/InputScreen";
import { LoadingScreen } from "./components/screens/LoadingScreen";
import { RegionSelectScreen } from "./components/screens/RegionSelectScreen";
import { ResultsScreen } from "./components/screens/ResultsScreen";
import { MOCK_PLAN_RESPONSE, MOCK_RECOMMEND_RESPONSE } from "./data/mock";

type Phase = "input" | "loadingRegion" | "region" | "loadingResults" | "results";

interface State {
  phase: Phase;
  threadId?: string;
  plan?: PlanResponse;
  results?: RecommendResponse;
  error?: string;
}

type Action =
  | { type: "submit" }
  | { type: "planLoaded"; plan: PlanResponse }
  | { type: "selectRegion" }
  | { type: "resultsLoaded"; results: RecommendResponse }
  | { type: "restart" }
  | { type: "error"; message: string };

const STEP_FOR_PHASE: Record<Phase, number> = {
  input: 1,
  loadingRegion: 1,
  region: 2,
  loadingResults: 2,
  results: 3,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "submit":
      return { ...state, phase: "loadingRegion", error: undefined };
    case "planLoaded":
      return { ...state, phase: "region", plan: action.plan, threadId: action.plan.thread_id };
    case "selectRegion":
      return { ...state, phase: "loadingResults", error: undefined };
    case "resultsLoaded":
      return { ...state, phase: "results", results: action.results };
    case "restart":
      return { phase: "input" };
    case "error":
      return { ...state, error: action.message };
    default:
      return state;
  }
}

function initialState(): State {
  // Deep-link for review: #region / #results preload mock data.
  const hash = window.location.hash;
  if (hash === "#region") return { phase: "region", plan: MOCK_PLAN_RESPONSE };
  if (hash === "#results") return { phase: "results", results: MOCK_RECOMMEND_RESPONSE };
  return { phase: "input" };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [state.phase]);

  async function handleSubmit(text: string) {
    dispatch({ type: "submit" });
    try {
      const plan = await api.plan(text);
      dispatch({ type: "planLoaded", plan });
    } catch (e) {
      dispatch({ type: "error", message: String(e) });
    }
  }

  async function handleSelectRegion(region: RegionCandidate) {
    dispatch({ type: "selectRegion" });
    try {
      const results = await api.selectRegion(region.id, state.threadId);
      dispatch({ type: "resultsLoaded", results });
    } catch (e) {
      dispatch({ type: "error", message: String(e) });
    }
  }

  function handleRestart() {
    dispatch({ type: "restart" });
  }

  return (
    <div className="app-bg">
      <TopBar step={STEP_FOR_PHASE[state.phase]} />
      <main key={state.phase} className="fade-in">
        {state.phase === "input" && <InputScreen onSubmit={handleSubmit} />}
        {state.phase === "loadingRegion" && <LoadingScreen variant="toRegion" />}
        {state.phase === "region" && state.plan && (
          <RegionSelectScreen plan={state.plan} onSelect={handleSelectRegion} />
        )}
        {state.phase === "loadingResults" && <LoadingScreen variant="toResults" />}
        {state.phase === "results" && state.results && (
          <ResultsScreen results={state.results} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
