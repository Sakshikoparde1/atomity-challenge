"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import type { Metric } from "@/hooks/useMetrics";

interface MetricCardProps {
  metric: Metric;
  index: number;
}

const positiveDown = ["Cost", "Waste", "Alerts"];

function changeColor(m: Metric): string {
  const good = positiveDown.includes(m.category) ? m.trend === "down" : m.trend === "up";
  return good ? "var(--color-accent-success)" : "var(--color-accent-error)";
}

const categoryColor: Record<string, string> = {
  Cost:           "var(--color-accent-warning)",
  Optimization:   "var(--color-accent-success)",
  Infrastructure: "var(--color-accent-primary)",
  Waste:          "var(--color-accent-error)",
  Performance:    "var(--color-accent-primary)",
  Alerts:         "var(--color-accent-error)",
};

export default function MetricCard({ metric, index }: MetricCardProps) {
  const color = changeColor(metric);
  const accent = categoryColor[metric.category] ?? "var(--color-accent-primary)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card"
      style={{
        padding: "clamp(20px, 2.5vw, 28px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minBlockSize: "200px",
      }}
      aria-label={`${metric.title}: ${metric.value}`}
    >
      {/* Top accent stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accent} 40%, transparent)`,
        }}
      />

      {/* Category + change */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBlockEnd: "var(--space-md)" }}>
        <span className="pill pill-ghost" style={{ color: accent, borderColor: `${accent}33`, background: `${accent}12` }}>
          {metric.category}
        </span>
        <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
          {metric.change}
        </span>
      </div>

      {/* Big number */}
      <AnimatedNumber
        value={metric.value}
        className="card-value"
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--color-text-primary)",
          fontVariantNumeric: "tabular-nums",
        } as React.CSSProperties}
      />

      {/* Label */}
      <p
        className="card-label"
        style={{
          marginBlockStart: "var(--space-xs)",
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-text-secondary)",
        }}
      >
        {metric.title}
      </p>

      {/* Divider + description */}
      <div style={{ marginBlockStart: "auto", paddingBlockStart: "var(--space-md)", borderTop: "1px solid var(--color-border)" }}>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.55 }}>
          {metric.description}
        </p>
      </div>
    </motion.article>
  );
}
