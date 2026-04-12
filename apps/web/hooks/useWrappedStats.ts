"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WrappedStats, computeWrappedStats } from "@winsznx/stacks-wrapped-parser";
import { fetchAllTransactions } from "@/lib/hiro-api";

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
  const lastFetchedAddress = useRef<string>("");

  const fetchStats = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const txs = await fetchAllTransactions(address);
      const computed = computeWrappedStats(txs);
      setStats(computed);
      lastFetchedAddress.current = address;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch transaction data";
      setError(message);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (address && address !== lastFetchedAddress.current) {
      fetchStats();
    }
  }, [address, fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}
