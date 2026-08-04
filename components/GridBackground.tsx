"use client";

// Subtle grid lines background matching Atomity's visual style
export default function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="grid-bg absolute inset-0 opacity-100" />
      {/* Soft radial fade at center */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,206,160,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to top, var(--color-bg-primary), transparent)" }}
      />
    </div>
  );
}
