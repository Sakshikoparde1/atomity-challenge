"use client";

export function SkeletonMetricCard() {
  return (
    <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px", minBlockSize: "200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="shimmer" style={{ blockSize: "20px", inlineSize: "72px" }} />
        <div className="shimmer" style={{ blockSize: "20px", inlineSize: "40px" }} />
      </div>
      <div className="shimmer" style={{ blockSize: "36px", inlineSize: "120px" }} />
      <div className="shimmer" style={{ blockSize: "12px", inlineSize: "80px" }} />
      <div style={{ marginBlockStart: "auto", paddingBlockStart: "14px", borderTop: "1px solid var(--color-border)" }}>
        <div className="shimmer" style={{ blockSize: "12px", inlineSize: "90%" }} />
      </div>
    </div>
  );
}

export function SkeletonInsightCard() {
  return (
    <div className="insight-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "18px 22px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="shimmer" style={{ blockSize: "18px", inlineSize: "64px" }} />
        <div className="shimmer" style={{ blockSize: "20px", inlineSize: "200px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
        <div className="shimmer" style={{ blockSize: "22px", inlineSize: "90px" }} />
        <div className="shimmer" style={{ blockSize: "12px", inlineSize: "70px" }} />
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr>
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} style={{ padding: "13px 12px", borderBottom: "1px solid var(--color-border)" }}>
          <div className="shimmer" style={{ blockSize: "14px", inlineSize: i === 0 ? "90px" : "60px", marginInlineStart: i === 0 ? "0" : "auto" }} />
        </td>
      ))}
    </tr>
  );
}
