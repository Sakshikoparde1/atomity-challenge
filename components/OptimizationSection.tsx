"use client";

import { motion } from "framer-motion";
import { useClusterData, useResourceBars } from "@/hooks/useClusterData";
import ResourceBarChart from "./ResourceBarChart";
import ClusterTable from "./ClusterTable";
import { SkeletonMetricCard, SkeletonTableRow } from "./SkeletonCard";

/* ── Cloud provider icons ── */
function AwsSvg() {
  return (
    <svg width="38" height="24" viewBox="0 0 80 28" aria-label="Amazon Web Services" role="img">
      <text x="0" y="22" fontSize="26" fontWeight="900" fill="var(--color-text-primary)" fontFamily="Arial Black, sans-serif">aws</text>
      <path d="M6 27 Q40 32 74 27" stroke="#FF9900" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function AzureSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-label="Microsoft Azure" role="img" fill="none">
      <polygon points="14,2 26,24 2,24" stroke="#0078D4" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon points="14,8 22,22 6,22" fill="#0078D4" opacity="0.25"/>
    </svg>
  );
}
function GcpSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-label="Google Cloud Platform" role="img" fill="none">
      <circle cx="14" cy="14" r="8" stroke="#4285F4" strokeWidth="2"/>
      <circle cx="14" cy="14" r="4" fill="#34A853"/>
      <circle cx="6"  cy="10" r="2.5" fill="#EA4335"/>
      <circle cx="22" cy="10" r="2.5" fill="#FBBC04"/>
    </svg>
  );
}
function OnPremSvg() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" aria-label="On-Premise infrastructure" role="img" fill="none">
      <rect x="2" y="6" width="24" height="12" rx="2" stroke="var(--color-text-secondary)" strokeWidth="2"/>
      <circle cx="8"  cy="12" r="2" fill="var(--color-accent-primary)"/>
      <circle cx="14" cy="12" r="2" fill="var(--color-accent-primary)" opacity="0.5"/>
      <circle cx="20" cy="12" r="2" fill="var(--color-accent-primary)" opacity="0.25"/>
      <line x1="9"  y1="2" x2="9"  y2="6" stroke="var(--color-text-muted)" strokeWidth="2"/>
      <line x1="19" y1="2" x2="19" y2="6" stroke="var(--color-text-muted)" strokeWidth="2"/>
    </svg>
  );
}

interface CloudNodeProps {
  name: string;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
  delay: number;
  dir: "left" | "right";
}

function CloudNode({ name, icon, borderColor, bgColor, delay, dir }: CloudNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
    >
      <div
        style={{
          inlineSize: "clamp(64px, 9vw, 84px)",
          blockSize: "clamp(64px, 9vw, 84px)",
          border: `2px solid ${borderColor}`,
          borderRadius: "24% 20% 24% 20% / 20% 24% 20% 24%",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-primary)", textAlign: "center" }}>
        {name}
      </span>
    </motion.div>
  );
}

function DotLine({ horizontal }: { horizontal?: boolean }) {
  return (
    <div style={{
      flex: 1,
      borderTop: horizontal ? "2px dashed rgba(91,206,160,0.3)" : "none",
      borderLeft: !horizontal ? "2px dashed rgba(91,206,160,0.3)" : "none",
      minInlineSize: horizontal ? "16px" : "auto",
      minBlockSize: !horizontal ? "16px" : "auto",
    }} />
  );
}

export default function OptimizationSection() {
  const { data: clusters, isLoading: cLoading, isError: cError } = useClusterData();
  const { data: bars, isLoading: bLoading } = useResourceBars();

  return (
    <section
      aria-labelledby="cost-visibility-heading"
      style={{
        paddingBlock: "clamp(60px, 8vw, 100px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxInlineSize: "1100px", marginInline: "auto" }}>

        {/* ── Section heading ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBlockEnd: "clamp(40px, 6vw, 64px)" }}
        >
          <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBlockEnd: "10px" }}>
            Unified Cost Visibility
          </p>
          <h2
            id="cost-visibility-heading"
            style={{ fontSize: "var(--text-3xl)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", textTransform: "uppercase", color: "var(--color-text-primary)", marginBlockEnd: "14px" }}
          >
            Every cluster.{" "}
            <span className="highlight-box">Every cloud.</span>
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: 1.65, maxInlineSize: "50ch" }}>
            Join in-cluster compute and memory costs with out-of-cluster spend from AWS, Azure, GCP and on-premise infrastructure — unified in one view.
          </p>
        </motion.header>

        {/* ── Multi-cloud topology ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gridTemplateRows: "auto 1fr auto",
            gap: "clamp(10px, 2vw, 18px)",
            alignItems: "center",
            justifyItems: "center",
            marginBlockEnd: "clamp(40px, 6vw, 64px)",
          }}
        >
          {/* Row 1 */}
          <CloudNode name="AWS" icon={<AwsSvg />} borderColor="var(--color-accent-primary)" bgColor="var(--color-accent-bg)" delay={0.1} dir="left" />
          <DotLine horizontal />
          <CloudNode name="Azure" icon={<AzureSvg />} borderColor="#0078D4" bgColor="rgba(0,120,212,0.06)" delay={0.15} dir="right" />

          {/* Row 2 */}
          <DotLine />

          {/* Centre chart card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              background: "var(--color-bg-card)",
              border: "2px solid var(--color-accent-primary)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(20px, 3vw, 32px)",
              boxShadow: "0 8px 32px rgba(91,206,160,0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBlockEnd: "clamp(16px, 2.5vw, 24px)" }}>
              <span className="pill pill-outline">Last 30 Days</span>
              <span className="pill pill-green">All Clusters</span>
            </div>
            {bLoading
              ? <div className="shimmer" style={{ blockSize: "clamp(130px, 18vw, 180px)", borderRadius: "8px" }} />
              : bars && <ResourceBarChart bars={bars} />
            }
          </motion.div>

          <DotLine />

          {/* Row 3 */}
          <CloudNode name="Google Cloud" icon={<GcpSvg />} borderColor="#4285F4" bgColor="rgba(66,133,244,0.06)" delay={0.25} dir="left" />
          <DotLine horizontal />
          <CloudNode name="On-Premise" icon={<OnPremSvg />} borderColor="var(--color-border-dark)" bgColor="var(--color-bg-card)" delay={0.3} dir="right" />
        </div>

        {/* ── Cluster breakdown table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(20px, 3vw, 32px)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Table header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBlockEnd: "var(--space-lg)" }}>
            <div>
              <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBlockEnd: "4px" }}>
                Cost Breakdown
              </p>
              <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
                Cluster-level spend
              </h3>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="pill pill-outline">Last 30 Days</span>
              <span className="pill pill-green">By Cluster</span>
            </div>
          </div>

          {cLoading ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>{Array.from({ length: 4 }).map((_, i) => <SkeletonTableRow key={i} />)}</tbody>
            </table>
          ) : cError ? (
            <p style={{ textAlign: "center", padding: "32px", color: "var(--color-accent-error)", fontSize: "var(--text-base)" }}>
              Failed to load cluster data.
            </p>
          ) : clusters && (
            <>
              <ClusterTable rows={clusters} />
              {/* Grand total */}
              <div style={{ display: "flex", justifyContent: "flex-end", paddingBlockStart: "var(--space-md)", marginBlockStart: "4px", borderTop: "2px solid var(--color-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Total
                  </span>
                  <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                    $19,650
                  </span>
                </div>
              </div>
            </>
          )}
        </motion.div>

      </div>
    </section>
  );
}
