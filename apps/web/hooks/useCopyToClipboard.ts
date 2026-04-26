"use client";
import { useState, useCallback, useRef } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export function useCopyToClipboard(resetDelay = 2000): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback(async (text: string) => {
    const ok = await copyToClipboard(text);
    setCopied(ok);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), resetDelay);
  }, [resetDelay]);

  return [copied, copy];
}

// State reset logic improved
