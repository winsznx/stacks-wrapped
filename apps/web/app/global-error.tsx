"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Application error</h1>
          <p>{error.message}</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
