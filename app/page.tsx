import OptimizationSection from "@/components/OptimizationSection";
import GridBackground from "@/components/GridBackground";
import StatTicker from "@/components/StatTicker";

export default function Home() {
  return (
    <main style={{ minBlockSize: "100vh", background: "var(--color-bg-primary)" }}>

      {/* ── Navbar ── */}
      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          blockSize: "56px",
          paddingInline: "clamp(24px, 5vw, 80px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(244,241,235,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <a href="/" aria-label="Atomity home" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <img src="/logo.png" alt="" aria-hidden="true" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Atomity
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 28px)" }}>
          {(["Pricing", "Blog", "Team", "Partners"] as const).map(item => (
            <a key={item} href="#" style={{ fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-text-secondary)", textDecoration: "none", letterSpacing: "0.02em" }}>
              {item}
            </a>
          ))}
          <button className="btn-primary">Try Now</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        aria-labelledby="hero-heading"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minBlockSize: "72vh",
          paddingBlock: "clamp(80px, 10vw, 120px)",
          paddingInline: "clamp(24px, 5vw, 80px)",
        }}
      >
        <GridBackground />
        <div style={{ position: "relative", zIndex: 1, maxInlineSize: "820px", marginInline: "auto", width: "100%" }}>
          <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBlockEnd: "20px" }}>
            Kubernetes Cost Intelligence
          </p>
          <h1
            id="hero-heading"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            Every cluster.
            <br />
            <span className="highlight-box">Every cloud.</span>
            <br />
            <span style={{ color: "var(--color-text-secondary)" }}>One view.</span>
          </h1>
          <p style={{
            marginBlockStart: "clamp(20px, 3vw, 28px)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxInlineSize: "44ch",
            marginInline: "auto",
          }}>
            Instantly visualize spend across all Kubernetes concepts. Join in-cluster costs with out-of-cluster cloud spend for a comprehensive, unified view.
          </p>
        </div>
      </section>

      {/* ── Animated stat ticker ── */}
      <StatTicker />

      {/* ── Main feature section (the deliverable) ── */}
      <OptimizationSection />

      {/* ── Footer ── */}
      <footer
        role="contentinfo"
        style={{
          paddingBlock: "clamp(20px, 3vw, 32px)",
          paddingInline: "clamp(24px, 5vw, 80px)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/logo.png" alt="" aria-hidden="true" style={{ width: "16px", height: "16px", objectFit: "contain", opacity: 0.3 }} />
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 900, color: "var(--color-text-muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Atomity</span>
        </div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>© 2025 Atomity · Cloud Optimization Platform</p>
      </footer>

    </main>
  );
}
