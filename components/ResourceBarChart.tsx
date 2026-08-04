"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ResourceBar } from "@/hooks/useClusterData";

interface Props { bars: ResourceBar[]; }

export default function ResourceBarChart({ bars }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const reduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Resource cost breakdown: CPU, GPU, RAM, PV, Network, Cloud"
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "clamp(8px, 2vw, 20px)",
        blockSize: "clamp(130px, 18vw, 180px)",
        paddingBlockEnd: "4px",
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={bar.label}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 }}
        >
          {/* Track */}
          <div
            style={{
              width: "100%",
              maxInlineSize: "52px",
              background: "rgba(91,206,160,0.12)",
              borderRadius: "5px 5px 0 0",
              blockSize: "clamp(120px, 16vw, 160px)",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            {/* Animated fill */}
            <motion.div
              initial={{ scaleY: reduced ? 1 : 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                blockSize: `${bar.value}%`,
                background: "var(--color-accent-primary)",
                borderRadius: "5px 5px 0 0",
                transformOrigin: "bottom",
              }}
            />
          </div>

          {/* Label */}
          <span style={{
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}>
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}
