import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph card, generated at build time. Code-drawn rather than a committed
 * raster, so it always matches the current name and role.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#080b12",
          padding: "80px",
          borderBottom: "16px solid #2dd4bf",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#2dd4bf",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 82,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            color: "#94a3b8",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          Robotics · Embedded Systems · Industrial Automation · Control Systems
        </div>
      </div>
    ),
    size,
  );
}
