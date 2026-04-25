"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1.5rem", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Critical Error</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "400px", textAlign: "center" }}>{error.message}</p>
          {error.digest && <code style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>Digest: {error.digest}</code>}
          <button onClick={reset} style={{ padding: "0.75rem 1.5rem", background: "#fff", color: "#000", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
            Reload Application
          </button>
        </main>
      </body>
    </html>
  );
}
