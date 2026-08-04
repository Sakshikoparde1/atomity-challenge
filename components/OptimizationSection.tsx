"use client";

import { motion } from "framer-motion";
import { useClusterData, useResourceBars } from "@/hooks/useClusterData";
import { SkeletonTableRow } from "./SkeletonCard";

/* ── Animated bar chart ── */
function BarChart({ bars }: { bars: { label: string; value: number; amount: string }[] }) {
  return (
    <div
      role="img"
      aria-label="Resource cost breakdown by type"
      style={{ display: "flex", alignItems: "flex-end", gap: "clamp(6px, 1.5vw, 16px)", blockSize: "clamp(120px, 16vw, 160px)" }}
    >
      {bars.map((bar, i) => (
        <div key={bar.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div className="bar-track" style={{ width: "100%", maxInlineSize: "48px", blockSize: "clamp(110px, 14vw, 148px)" }}>
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", blockSize: `${bar.value}%`, background: "var(--color-accent)", borderRadius: "3px 3px 0 0", transformOrigin: "bottom" }}
            />
          </div>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center" }}>
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Cluster table ── */
function ClusterTable({ rows }: { rows: ReturnType<typeof useClusterData>["data"] }) {
  if (!rows) return null;
  const cols = ["Cluster", "CPU", "RAM", "Storage", "Network", "GPU", "Efficiency", "Total"];
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }} aria-label="Cluster cost breakdown">
        <thead>
          <tr>
            {cols.map(col => (
              <th key={col} scope="col" style={{ padding: "8px 12px", textAlign: col === "Cluster" ? "left" : "right", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id}
              className="cluster-row"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            >
              <th scope="row" style={{ padding: "12px", fontWeight: 700, color: "var(--color-text-primary)", textAlign: "left", whiteSpace: "nowrap" }}>{row.name}</th>
              {[row.cpu, row.ram, row.storage, row.network, row.gpu].map((v, j) => (
                <td key={j} style={{ padding: "12px", textAlign: "right", color: "var(--color-text-secondary)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{v}</td>
              ))}
              <td style={{ padding: "12px", textAlign: "right", whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 700, fontSize: "var(--text-xs)", color: row.efficiency >= 40 ? "var(--color-green)" : "var(--color-amber)", fontVariantNumeric: "tabular-nums" }}>
                  {row.efficiency}%
                </span>
              </td>
              <td style={{ padding: "12px", textAlign: "right", fontWeight: 900, color: "var(--color-text-primary)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{row.total}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OptimizationSection() {
  const { data: clusters, isLoading: cLoading, isError: cError } = useClusterData();
  const { data: bars, isLoading: bLoading } = useResourceBars();

  return (
    <section
      aria-labelledby="cost-breakdown-heading"
      style={{ paddingBlock: "clamp(64px, 8vw, 100px)", paddingInline: "clamp(24px, 5vw, 80px)", background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}
    >
      <div style={{ maxInlineSize: "1100px", marginInline: "auto" }}>

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBlockEnd: "clamp(10px, 2vw, 16px)" }}
        >
          <span className="step-badge">01</span>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Cost Visibility
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBlockEnd: "clamp(40px, 5vw, 64px)" }}
        >
          <h2 id="cost-breakdown-heading" style={{ fontSize: "var(--text-3xl)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", textTransform: "uppercase", color: "var(--color-text-primary)", marginBlockEnd: "14px" }}>
            Instant cluster
            <br />
            <span className="highlight-box">cost breakdown</span>
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: 1.65, maxInlineSize: "52ch" }}>
            Visualize spend across CPU, RAM, storage, network and GPU — aggregated by cluster, namespace or workload. Up to <strong style={{ color: "var(--color-green)" }}>70% savings</strong> identified automatically.
          </p>
        </motion.div>

        {/* ── Two column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "clamp(24px, 4vw, 48px)", alignItems: "start" }}>

          {/* ── LEFT: Bar chart card ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="data-card" style={{ padding: "clamp(20px, 3vw, 28px)" }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlockEnd: "clamp(16px, 2.5vw, 24px)", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span className="pill pill-outline">Last 30 Days</span>
                  <span className="pill pill-green">All Clusters</span>
                </div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600 }}>Resource breakdown</span>
              </div>

              {/* Chart */}
              {bLoading
                ? <div className="shimmer" style={{ blockSize: "clamp(120px, 16vw, 160px)", borderRadius: "6px" }} />
                : bars && <BarChart bars={bars} />
              }

              {/* Totals row */}
              {bars && !bLoading && (
                <div style={{ display: "flex", gap: "clamp(12px, 2vw, 24px)", flexWrap: "wrap", marginBlockStart: "20px", paddingBlockStart: "16px", borderTop: "1px solid var(--color-border)" }}>
                  {bars.slice(0, 3).map(bar => (
                    <div key={bar.label}>
                      <p style={{ fontSize: "var(--text-lg)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{bar.amount}</p>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{bar.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Savings callout ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{ marginBlockStart: "16px", padding: "20px 24px", border: "1px solid var(--color-accent-border)", borderRadius: "var(--radius-lg)", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}
            >
              <div>
                <p style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--color-green)", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>$61.2k</p>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBlockStart: "2px" }}>Savings identified this month</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="status-dot dot-green" />
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>4 recommendations active</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="status-dot dot-green" />
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Auto-detected across 14 clusters</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Cluster table card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="data-card" style={{ padding: "clamp(20px, 3vw, 28px)" }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlockEnd: "16px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-primary)" }}>Cluster Spend</h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBlockStart: "2px" }}>Aggregated by cluster · 30 days</p>
                </div>
                <span className="pill pill-dark">Live</span>
              </div>

              {/* Table */}
              {cLoading ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>{Array.from({ length: 4 }).map((_, i) => <SkeletonTableRow key={i} />)}</tbody>
                </table>
              ) : cError ? (
                <p style={{ textAlign: "center", padding: "24px", color: "var(--color-red)", fontSize: "var(--text-sm)" }}>Failed to load cluster data.</p>
              ) : (
                <ClusterTable rows={clusters} />
              )}

              {/* Total */}
              {clusters && !cLoading && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--text-base)", paddingBlockStart: "12px", marginBlockStart: "2px", borderTop: "2px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total</span>
                    <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>$19,650</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Step 02: Optimization insights ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBlockStart: "clamp(56px, 7vw, 80px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBlockEnd: "12px" }}>
            <span className="step-badge">02</span>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Optimization Insights
            </span>
          </div>

          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--color-text-primary)", marginBlockEnd: "24px" }}>
            AI-generated savings roadmap
          </h2>

          {/* Insight rows */}
          {[
            { tag: "Compute",  title: "Right-size over-provisioned nodes",        savings: "$18,400/mo", status: "dot-green" },
            { tag: "Storage",  title: "Remove unused persistent volumes",          savings: "$4,200/mo",  status: "dot-green" },
            { tag: "Clusters", title: "Consolidate low-utilization clusters",      savings: "$22,100/mo", status: "dot-amber" },
            { tag: "Pricing",  title: "Optimize spot instance mix",                savings: "$16,500/mo", status: "dot-amber" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "clamp(12px, 3vw, 32px)",
                padding: "clamp(14px, 2vw, 18px) clamp(16px, 2.5vw, 22px)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderInlineStart: "3px solid var(--color-accent)",
                marginBlockEnd: "8px",
                transition: "border-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minInlineSize: 0 }}>
                <span className={`status-dot ${item.status}`} />
                <div>
                  <span className="pill pill-ghost" style={{ marginBlockEnd: "4px", display: "inline-flex" }}>{item.tag}</span>
                  <p style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>{item.title}</p>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "var(--text-lg)", fontWeight: 900, color: "var(--color-green)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{item.savings}</p>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>potential / mo</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
