/* Step 1 — free-text input. Ported from screens.jsx (InputScreen).
   The parsed-condition chips here are a live preview of how the request will be
   interpreted; the authoritative parsed conditions come back from /api/plan. */
import { useState } from "react";
import { Icon } from "../Icon";
import { ConditionChips } from "../primitives";
import { MOCK_PARSED, PLACEHOLDER_TEXT } from "../../data/mock";

export function InputScreen({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const chips = [...MOCK_PARSED.must_have, ...MOCK_PARSED.preferences];
  const hasText = text.trim().length > 0;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "min(9vh, 88px) 24px 80px" }}>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 26 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "var(--grad)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 18,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(44,85,184,.26)",
          }}
        >
          <Icon name="spark" size={14} stroke={2.2} /> AI 워케이션 플래너
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.25,
          }}
        >
          어떤 워케이션·촌캉스를
          <br />
          원하세요?
        </h1>
        <p
          style={{
            margin: "12px auto 0",
            maxWidth: 460,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            textWrap: "pretty",
          }}
        >
          편하게 적어 주세요. 조건을 해석해서 어울리는 지역과 숙소를 찾아 드려요.
        </p>
      </div>

      <div
        className="fade-up"
        style={{
          animationDelay: "80ms",
          background: "var(--surface)",
          borderRadius: "var(--r-xl)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
          padding: 18,
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDER_TEXT}
          rows={4}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            fontSize: 15.5,
            lineHeight: 1.6,
            color: "var(--ink)",
            background: "transparent",
            letterSpacing: "-0.01em",
          }}
        />
        <div style={{ height: 1, background: "var(--border-2)", margin: "6px 0 14px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{ minHeight: 28, transition: "opacity .3s ease", opacity: hasText ? 1 : 0.32 }}
          >
            <ConditionChips label="해석된 조건" items={chips} />
          </div>
          <button
            onClick={() => onSubmit(text)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: "var(--r-md)",
              fontSize: 14.5,
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "nowrap",
              background: "var(--grad)",
              boxShadow: "0 8px 20px rgba(44,85,184,.30)",
              transition: "transform .15s ease, filter .2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.filter = "brightness(1.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <Icon name="spark" size={16} stroke={2.2} /> 추천받기
          </button>
        </div>
      </div>

      <p
        className="fade-in"
        style={{
          animationDelay: "200ms",
          textAlign: "center",
          marginTop: 18,
          fontSize: 12.5,
          color: "var(--ink-3)",
        }}
      >
        예시를 그대로 두고 <b style={{ color: "var(--ink-2)" }}>추천받기</b>를 눌러도 데모가 진행돼요.
      </p>
    </div>
  );
}
