"use client";

import { useEffect } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-page-content">
        <h1 className="error-page-title">Something went wrong</h1>
        <Alert tone="error">{error.message}</Alert>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
