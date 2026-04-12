import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0a0a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: "#00ff94",
            fontSize: 100,
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          {"_"}
        </span>
      </div>
    ),
    { ...size }
  );
}
