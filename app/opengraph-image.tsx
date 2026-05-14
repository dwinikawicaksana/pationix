import { ImageResponse } from "next/og";

export const alt = "Paitonix — Digital Product Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #020617 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)",
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%)",
          }}
        />

        {/* Logo mark + name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "white",
              boxShadow: "0 0 40px rgba(14,165,233,0.45)",
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "white",
              letterSpacing: -2,
            }}
          >
            Paitonix
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#7dd3fc",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Digital Product Studio
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          Websites · Mobile Apps · AI-Powered Products
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #0ea5e9, transparent)",
            margin: "32px 0 20px",
          }}
        />

        {/* URL */}
        <div
          style={{
            fontSize: 18,
            color: "#475569",
            letterSpacing: 3,
          }}
        >
          paitonix.com
        </div>
      </div>
    ),
    { ...size },
  );
}
