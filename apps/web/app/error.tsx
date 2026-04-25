"use client";

import { useEffect } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { classifyError } from "@/lib/errors";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const category = classifyError(error);

  useEffect(() => {
    console.error("[ErrorBoundary]", category, error);
  }, [error, category]);

  return (
    <main className="error-page">
      <div className="error-page-content">
        <h1 className="error-page-title">Something went wrong</h1>
        <Alert variant="error">{error.message}</Alert>
        {category === "network" && (
          <p className="error-hint">Check your internet connection and try again.</p>
        )}
        {category === "rate_limit" && (
          <p className="error-hint">Too many requests. Please wait a moment.</p>
        )}
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
