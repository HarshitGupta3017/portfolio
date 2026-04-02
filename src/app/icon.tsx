import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Next.js App Router file-based icon convention.
 * This file generates /icon.png and is automatically linked as <link rel="icon">.
 * It takes precedence over metadata.icons and is served fresh (no browser cache surprise).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#020408",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        {/* Corner brackets — top-left */}
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            width: 5,
            height: 5,
            borderTop: "1.2px solid #00ff41",
            borderLeft: "1.2px solid #00ff41",
          }}
        />
        {/* Corner brackets — top-right */}
        <div
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 5,
            height: 5,
            borderTop: "1.2px solid #00ff41",
            borderRight: "1.2px solid #00ff41",
          }}
        />
        {/* Corner brackets — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            left: 3,
            width: 5,
            height: 5,
            borderBottom: "1.2px solid #00ff41",
            borderLeft: "1.2px solid #00ff41",
          }}
        />
        {/* Corner brackets — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            width: 5,
            height: 5,
            borderBottom: "1.2px solid #00ff41",
            borderRight: "1.2px solid #00ff41",
          }}
        />
        {/* HG text */}
        <div
          style={{
            display: "flex",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <span style={{ color: "#00ff41", fontSize: 13, fontWeight: 900 }}>H</span>
          <span style={{ color: "#00f0ff", fontSize: 13, fontWeight: 900 }}>G</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
