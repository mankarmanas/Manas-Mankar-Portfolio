"use client";

export default function MobilePreview() {
  return (
    <div style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "32px 20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <h1 style={{
        color: "#6366f1",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "24px",
        opacity: 0.8,
      }}>
        📱 iPhone 16 Pro Max — Mobile Preview
      </h1>

      {/* Phone shell */}
      <div style={{
        position: "relative",
        width: "460px",
        background: "#1a1a1a",
        borderRadius: "56px",
        padding: "14px",
        boxShadow: "0 0 0 1px #333, 0 0 0 3px #1a1a1a, 0 0 0 4px #444, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(99,102,241,0.15)",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: "22px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110px",
          height: "32px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
        }}>
          {/* camera dot */}
          <div style={{ width: "10px", height: "10px", background: "#1a1a2e", borderRadius: "50%", border: "2px solid #222" }} />
          {/* speaker */}
          <div style={{ width: "44px", height: "5px", background: "#111", borderRadius: "3px" }} />
        </div>

        {/* Screen */}
        <div style={{
          width: "432px",
          height: "936px",
          borderRadius: "44px",
          overflow: "hidden",
          background: "#000",
          position: "relative",
        }}>
          <iframe
            src="http://localhost:3000/"
            title="Mobile Preview"
            style={{
              width: "430px",
              height: "932px",
              border: "none",
              display: "block",
              margin: "2px auto 0",
            }}
          />
        </div>

        {/* Side buttons */}
        {/* Power */}
        <div style={{ position: "absolute", right: "-5px", top: "160px", width: "4px", height: "72px", background: "#2a2a2a", borderRadius: "3px" }} />
        {/* Vol up */}
        <div style={{ position: "absolute", left: "-5px", top: "130px", width: "4px", height: "44px", background: "#2a2a2a", borderRadius: "3px" }} />
        {/* Vol down */}
        <div style={{ position: "absolute", left: "-5px", top: "186px", width: "4px", height: "44px", background: "#2a2a2a", borderRadius: "3px" }} />
        {/* Silent */}
        <div style={{ position: "absolute", left: "-5px", top: "86px", width: "4px", height: "28px", background: "#2a2a2a", borderRadius: "3px" }} />
      </div>

      <p style={{ marginTop: "20px", color: "#555", fontSize: "11px", letterSpacing: "0.1em" }}>
        430 × 932px · scroll inside the frame
      </p>
    </div>
  );
}
