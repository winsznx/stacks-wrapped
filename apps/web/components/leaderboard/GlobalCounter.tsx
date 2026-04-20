"use client";

import { useEffect, useState } from "react";

export function GlobalCounter({ count }: { count: number }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / Math.max(end, 1)) * 5;

    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(start);
      }
    }, Math.max(incrementTime, 20));

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold text-white tabular-nums">
        {displayCount.toLocaleString()}
      </span>
      <span className="text-sm text-white/50 uppercase tracking-widest mt-2">
        Total Wrapped Cards
      </span>
    </div>
  );
}
