/* Step 2 — region selection (human-in-the-loop). Ported from screens.jsx. */
import type { PlanResponse, RegionCandidate } from "../../types";
import { ConditionChips } from "../primitives";
import { RegionCard } from "../RegionCard";
import { MAXW } from "./TopBar";

export function RegionSelectScreen({
  plan,
  onSelect,
}: {
  plan: PlanResponse;
  onSelect: (region: RegionCandidate) => void;
}) {
  const chips = [...plan.parsed.must_have, ...plan.parsed.preferences];
  return (
    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "26px 24px 90px" }}>
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <ConditionChips label="입력 조건" items={chips} />
      </div>
      <div className="grid-cards" style={{ alignItems: "stretch" }}>
        {plan.candidate_regions.map((r, i) => (
          <RegionCard key={r.id} region={r} index={i} onSelect={() => onSelect(r)} />
        ))}
      </div>
    </div>
  );
}
