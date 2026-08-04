"use client";

import { motion } from "framer-motion";

interface CloudNodeProps {
  name: string;
  icon: React.ReactNode;
  delay?: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function CloudNode({ name, icon, delay = 0, position }: CloudNodeProps) {
  const isLeft = position.includes("left");
  const isTop = position.includes("top");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: isTop ? "column" : "column-reverse",
        alignItems: isLeft ? "flex-start" : "flex-end",
        gap: "10px",
      }}
    >
      {/* Hexagon node */}
      <div
        style={{
          width: "clamp(72px, 10vw, 96px)",
          height: "clamp(72px, 10vw, 96px)",
          border: "2px solid var(--color-accent-primary)",
          borderRadius: "24% 20% 24% 20% / 20% 24% 20% 24%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(91,206,160,0.06)",
          transition: "background 0.2s ease",
        }}
      >
        {icon}
      </div>

      {/* Provider label */}
      <div
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          textAlign: isLeft ? "left" : "right",
        }}
      >
        {name}
      </div>
    </motion.div>
  );
}
