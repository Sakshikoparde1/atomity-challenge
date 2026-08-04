"use client";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "neutral";
}

const styles: Record<string, React.CSSProperties> = {
  default: { background: "rgba(91,206,160,0.12)", color: "#3daa7e", border: "1px solid rgba(91,206,160,0.3)" },
  success: { background: "rgba(61,170,126,0.1)", color: "#3daa7e", border: "1px solid rgba(61,170,126,0.25)" },
  warning: { background: "rgba(201,123,46,0.1)", color: "#c97b2e", border: "1px solid rgba(201,123,46,0.25)" },
  error: { background: "rgba(201,64,64,0.08)", color: "#c94040", border: "1px solid rgba(201,64,64,0.2)" },
  neutral: { background: "rgba(0,0,0,0.05)", color: "#5a5a5a", border: "1px solid rgba(0,0,0,0.1)" },
};

export default function Badge({ label, variant = "neutral" }: BadgeProps) {
  return (
    <span
      style={{
        ...styles[variant],
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: "999px",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}
