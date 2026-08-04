"use client";

import { motion } from "framer-motion";
import Badge from "./Badge";
import type { Insight } from "@/hooks/useMetrics";

interface InsightCardProps {
  insight: Insight;
  index: number;
}

const tagVariant: Record<string, "default" | "success" | "warning" | "error" | "neutral"> = {
  Compute: "warning",
  Storage: "neutral",
  Clusters: "default",
  Pricing: "success",
};

export default function InsightCard({ insight, index }: InsightCardProps) {
  const variant = tagVariant[insight.tag] ?? "neutral";

  return (
    <motion.article
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="insight-card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "clamp(12px, 3vw, 32px)",
        padding: "clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px)",
      }}
      aria-label={`${insight.title} — saves ${insight.savings}`}
    >
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1, minInlineSize: 0 }}>
        <Badge label={insight.tag} variant={variant} />
        <h3
          style={{
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            lineHeight: 1.3,
          }}
        >
          {insight.title}
        </h3>
      </div>

      {/* Right */}
      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <p
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: 900,
            color: "var(--color-accent-success)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
          }}
        >
          {insight.savings}
        </p>
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBlockStart: "2px",
          }}
        >
          potential / mo
        </p>
      </div>
    </motion.article>
  );
}
