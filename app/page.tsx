import OptimizationSection from "@/components/OptimizationSection";
import GridBackground from "@/components/GridBackground";

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
          inlineSize: "100%",
          blockSize: "60px",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(244, 241, 235, 0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <a href="/" aria-label="Atomity home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.png" alt="" aria-hidden="true" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Atomity
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 32px)" }}>
          {["Pricing", "Blog", "Team", "Partners"].map(item => (
            <a
              key={item}
              href="#"
              style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", fontWeight: 500, textDecoration: "none" }}
            >
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          paddingBlock: "clamp(80px, 10vw, 140px)",
          paddingInline: "clamp(24px, 5vw, 80px)",
          minBlockSize: "80vh",
        }}
      >
        <GridBackground />

        <div style={{ position: "relative", zIndex: 1, maxInlineSize: "860px", marginInline: "auto", width: "100%" }}>
          <h1
            id="hero-heading"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            The control layer
            <br />
            for{" "}
            <span className="highlight-box">sovereign</span>
            <br />
            <span style={{ color: "var(--color-text-secondary)" }}>cloud decisions</span>
          </h1>

          <p
            style={{
              marginBlockStart: "clamp(20px, 3vw, 32px)",
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              maxInlineSize: "46ch",
              marginInline: "auto",
            }}
          >
            Atomity helps teams decide where every workload should run, prove why, and keep it optimized across clouds.
          </p>
        </div>
      </section>

      {/* ── Feature section ── */}
      <OptimizationSection />

      {/* ── Footer ── */}
      <footer
        role="contentinfo"
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(24px, 5vw, 80px)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/logo.png" alt="" aria-hidden="true" style={{ width: "18px", height: "18px", objectFit: "contain", opacity: 0.35 }} />
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 900, color: "var(--color-text-muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Atomity
          </span>
        </div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
          © 2025 Atomity · Cloud Optimization Platform
        </p>
      </footer>

    </main>
  );
}
