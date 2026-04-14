"use client";

import { useState, useEffect } from "react";

const LOADING_STEPS = [
  "Scanning transactions...",
  "Computing fees...",
  "Finding your favorite contract...",
  "Calculating biggest transfer...",
  "Locating your first transaction...",
  "Building your Wrapped card...",
];

interface StatsLoaderProps {
  isLoading: boolean;
  error: string | null;
}

export function StatsLoader({ isLoading, error }: StatsLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (error) {
    return (
      <div className="stats-loader stats-loader-error">
        <div className="stats-loader-terminal">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-error">{error}</span>
        </div>
      </div>
    );
  }

  if (!isLoading) return null;

  return (
    <div className="stats-loader">
      <div className="stats-loader-terminal">
        {LOADING_STEPS.slice(0, currentStep + 1).map((step, i) => (
          <div key={step} className="terminal-line">
            <span className="terminal-prompt">&gt;</span>
            <span
              className={
                i === currentStep ? "terminal-active" : "terminal-done"
              }
            >
              {step}
            </span>
            {i < currentStep && (
              <span className="terminal-check"> ✓</span>
            )}
            {i === currentStep && (
              <span className="terminal-cursor">_</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
