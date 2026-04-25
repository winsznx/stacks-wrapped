"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WrappedStats, computeWrappedStats } from "@winsznx/stacks-wrapped-parser";
import { fetchAllTransactions } from "@/lib/hiro-api";
import { getErrorMessage, isAbortError } from "@/lib/errors";

interface UseWrappedStatsReturn {
  stats: WrappedStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWrappedStats(address: string): UseWrappedStatsReturn {
  const [stats, setStats] = useState<WrappedStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const lastFetchedAddress = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStats = useCallback(async () => {
    if (!address) return;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const txs = await fetchAllTransactions(address, controller.signal);
      if (!controller.signal.aborted) {
        const computed = computeWrappedStats(txs);
        setStats(computed);
        lastFetchedAddress.current = address;
      }
    } catch (err) {
      if (isAbortError(err)) return;
      setError(getErrorMessage(err));
      setStats(null);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address && address !== lastFetchedAddress.current) {
      fetchStats();
    }
    return () => abortControllerRef.current?.abort();
  }, [address, fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}
