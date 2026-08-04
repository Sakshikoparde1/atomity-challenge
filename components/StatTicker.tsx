"use client";

import AnimatedNumber from "./AnimatedNumber";

const stats = [
  { value: "$84,320", label: "Monthly Spend" },
  { value: "14",      label: "Active Clusters" },
  { value: "70%",     label: "Max Savings" },
  { value: "38%",     label: "Idle Resources" },
];

export default function StatTicker() {
  return (
    <div
      style={{
        paddingBlock: "clamp(20px, 3vw, 28px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg-primary)",
      }}
    >
      <div
        style={{
          maxInlineSize: "1100px",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "clamp(16px, 3vw, 0px)",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              paddingInline: i > 0 ? "clamp(16px, 3vw, 32px)" : "0",
              borderInlineStart: i > 0 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <AnimatedNumber
              value={stat.value}
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                fontVariantNumeric: "tabular-nums",
              } as React.CSSProperties}
            />
            <span style={{
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
