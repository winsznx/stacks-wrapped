"use client";

import { useEffect, useState } from "react";
import { Spinner } from "../ui/Spinner";

const MESSAGES = [
  "Fetching your Stacks transaction history...",
  "Calculating total STX moved...",
  "Analyzing contract interactions...",
  "Finding your favorite protocol...",
  "Almost ready for your 2024 reveal...",
];

export function StatsLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6 min-h-[400px]">
      <div className="relative">
        <Spinner size="lg" className="text-white/20" />
        <Spinner size="lg" className="absolute inset-0 text-white animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-medium text-white text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {MESSAGES[index]}
        </p>
        <p className="text-sm text-white/40">This might take a moment if you're an OG</p>
      </div>
    </div>
  );
}
