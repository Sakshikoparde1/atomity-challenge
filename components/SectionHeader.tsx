"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export default function SectionHeader({ eyebrow, title, highlight, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBlockEnd: "clamp(40px, 5vw, 64px)" }}
    >
      <p
        style={{
          fontSize: "var(--font-size-xs)",
          fontWeight: 700,
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBlockEnd: "12px",
        }}
      >
        {eyebrow}
      </p>

      <h2
        style={{
          fontSize: "var(--font-size-3xl)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          marginBlockEnd: "16px",
        }}
      >
        {title}{" "}
        <span className="highlight-box">{highlight}</span>
      </h2>

      <p
        style={{
          fontSize: "var(--font-size-base)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
          maxInlineSize: "52ch",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
