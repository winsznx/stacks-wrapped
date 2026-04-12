import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff"
  ).then((res) => res.arrayBuffer());

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
          background: "#0a0a0f",
          fontFamily: "JetBrains Mono",
          position: "relative",
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,148,0.03) 2px, rgba(0,255,148,0.03) 4px)",
            display: "flex",
          }}
        />

        {/* Border glow */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "1px solid rgba(0,255,148,0.3)",
            borderRadius: 24,
            display: "flex",
          }}
        />

        {/* Terminal prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#00ff94", fontSize: 28 }}>&gt;_</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#e8e8f0",
              letterSpacing: "-0.02em",
            }}
          >
            STACKS{" "}
            <span style={{ color: "#00ff94" }}>WRAPPED</span>
          </span>

          <span
            style={{
              fontSize: 24,
              color: "#5a5a7a",
              fontStyle: "italic",
            }}
          >
            Your on-chain story, committed to the chain.
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          <span style={{ color: "#7b61ff", fontSize: 16 }}>
            stacks-wrapped.xyz
          </span>
          <span style={{ color: "#5a5a7a", fontSize: 16 }}>|</span>
          <span style={{ color: "#00ff94", fontSize: 16 }}>
            #StacksWrapped
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "JetBrains Mono",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
