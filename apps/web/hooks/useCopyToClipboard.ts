"use client";

import { useCallback, useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export function useCopyToClipboard(resetMs: number = 2000) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), resetMs);
    return () => clearTimeout(timer);
  }, [copied, resetMs]);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    const success = await copyToClipboard(text);
    if (success) setCopied(true);
    return success;
  }, []);

  return { copied, copy };
}
