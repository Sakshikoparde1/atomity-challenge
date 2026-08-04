"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ClusterRow } from "@/hooks/useClusterData";

interface ClusterTableProps {
  rows: ClusterRow[];
}

const cols = ["Cluster", "CPU", "RAM", "Storage", "Network", "GPU", "Efficiency", "Total"];

export default function ClusterTable({ rows }: ClusterTableProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--radius-md)" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}
        aria-label="Cluster cost breakdown"
      >
        <thead>
          <tr>
            {cols.map(col => (
              <th
                key={col}
                scope="col"
                style={{
                  padding: "8px 12px",
                  textAlign: col === "Cluster" ? "left" : "right",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid var(--color-border)",
                  whiteSpace: "nowrap",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
              onMouseEnter={() => setActive(row.id)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: active === row.id ? "rgba(91,206,160,0.06)" : "transparent",
                transition: "background 0.15s ease",
              }}
            >
              <th scope="row" style={{ padding: "13px 12px", fontWeight: 700, color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", textAlign: "left", whiteSpace: "nowrap" }}>
                {row.name}
              </th>
              {[row.cpu, row.ram, row.storage, row.network, row.gpu].map((val, j) => (
                <td key={j} style={{ padding: "13px 12px", textAlign: "right", color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                  {val}
                </td>
              ))}

              {/* Efficiency with mini bar */}
              <td style={{ padding: "13px 12px", textAlign: "right", borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                  <div style={{ inlineSize: "40px", blockSize: "4px", borderRadius: "2px", background: "var(--color-border)", overflow: "hidden" }}>
                    <div style={{ inlineSize: `${row.efficiency}%`, blockSize: "100%", background: "var(--color-accent-primary)", borderRadius: "2px" }} />
                  </div>
                  <span style={{
                    fontWeight: 700,
                    fontSize: "var(--text-xs)",
                    color: row.efficiency >= 40 ? "var(--color-accent-success)" : "var(--color-accent-warning)",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {row.efficiency}%
                  </span>
                </div>
              </td>

              {/* Total */}
              <td style={{ padding: "13px 12px", textAlign: "right", fontWeight: 900, color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                {row.total}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
